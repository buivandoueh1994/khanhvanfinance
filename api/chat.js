// Vercel Serverless Function: /api/chat
// Hybrid AI Advisor (Core Persona Prompt + Supabase Smart Retrieval + Telegram Alert + DB Logging)

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://paaphwfpoiiowmthxtlp.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const GEMINI_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_BACKUP,
].filter(Boolean);
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '9234859796:AAETTbQP74LLPXpzNPWALYpJ-I-coUsIWxY';
const DEFAULT_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '7603716054';

// In-memory cache across warm serverless invocations
let cachedAngles = null;
let cachedAnglesTime = 0;
let cachedTelegramChatIds = new Set();

async function getKnowledgeAngles() {
  const now = Date.now();
  if (cachedAngles && now - cachedAnglesTime < 10 * 60 * 1000) {
    return cachedAngles;
  }
  if (!SUPABASE_KEY) {
    return cachedAngles || [];
  }
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/knowledge_angles?select=id,angle_code,source_type,source_name,category,hook_title,core_insight,soft_sell_prompt&order=id.asc`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    if (res.ok) {
      cachedAngles = await res.json();
      cachedAnglesTime = now;
      return cachedAngles;
    }
  } catch (e) {
    console.error('Error fetching knowledge_angles:', e);
  }
  return cachedAngles || [];
}

// Normalize Vietnamese text for smart keyword + phrase matching
function normalizeVi(str = '') {
  return str
    .toLowerCase()
    .replace(/[.,?!;:"'()[\]{}“”‘’—–-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Retrieve Top K relevant angles from the 230 rows in Supabase
function retrieveRelevantAngles(query, history = [], allAngles = [], topK = 5) {
  const recentUserText = [
    query,
    ...history
      .filter((m) => m.role === 'user')
      .slice(-2)
      .map((m) => m.content || ''),
  ].join(' ');

  const normQuery = normalizeVi(query);
  const normContext = normalizeVi(recentUserText);

  const stopWords = new Set([
    'la', 'va', 'cua', 'co', 'khong', 'nhu', 'the', 'nao', 'thi', 'ma', 'de',
    'cho', 'anh', 'chi', 'em', 'van', 'khanh', 'toi', 'minh', 'ban', 'khi',
    'trong', 'voi', 'dc', 'duoc', 'ko', 'vậy', 'vay', 'nhé', 'nhe', 'ạ', 'a',
    'là', 'và', 'của', 'có', 'không', 'như', 'thế', 'nào', 'thì', 'mà', 'để',
    'cho', 'chị', 'vân', 'tôi', 'mình', 'bạn', 'trong', 'với', 'được', 'nếu',
    'cần', 'muốn', 'hỏi', 'về', 'các', 'những', 'một', 'hai', 'ba', 'hay',
    'hoặc', 'nên', 'làm', 'sao', 'gì', 'ai', 'đâu', 'này', 'đó', 'kia',
  ]);

  const queryWords = normQuery
    .split(' ')
    .filter((w) => w.length >= 2 && !stopWords.has(w));

  // Build 2-word and 3-word n-grams for high-precision Vietnamese compound word matching
  // (e.g. "xương cá", "vssid", "10 năm", "phá sản", "thẻ sức khỏe", "chuyển nghề")
  const bigrams = [];
  const trigrams = [];
  const rawWords = normQuery.split(' ').filter(Boolean);
  for (let i = 0; i < rawWords.length - 1; i++) {
    const bg = `${rawWords[i]} ${rawWords[i + 1]}`;
    if (!stopWords.has(rawWords[i]) || !stopWords.has(rawWords[i + 1])) {
      bigrams.push(bg);
    }
  }
  for (let i = 0; i < rawWords.length - 2; i++) {
    trigrams.push(`${rawWords[i]} ${rawWords[i + 1]} ${rawWords[i + 2]}`);
  }

  const scored = allAngles.map((item) => {
    const titleNorm = ` ${normalizeVi(item.hook_title || '')} `;
    const insightNorm = ` ${normalizeVi(item.core_insight || '')} `;
    const sourceNorm = ` ${normalizeVi(item.source_name || '')} `;
    const titleWordSet = new Set(titleNorm.trim().split(' '));
    const insightWordSet = new Set(insightNorm.trim().split(' '));

    let score = 0;

    // Exact 3-word trigram matches
    for (const tg of trigrams) {
      if (tg.length >= 7) {
        if (titleNorm.includes(` ${tg} `)) score += 30;
        if (insightNorm.includes(` ${tg} `)) score += 18;
      }
    }

    // Exact 2-word bigram matches (whole-word bounded)
    for (const bg of bigrams) {
      if (bg.length >= 5) {
        if (titleNorm.includes(` ${bg} `)) score += 20;
        if (insightNorm.includes(` ${bg} `)) score += 12;
        if (sourceNorm.includes(` ${bg} `)) score += 8;
      }
    }

    // Individual whole-word matches
    for (const w of queryWords) {
      if (titleWordSet.has(w)) score += 4;
      if (insightWordSet.has(w)) score += 2;
    }

    // Topic boosts
    if (
      (normContext.includes('ngân hàng') ||
        normContext.includes('banker') ||
        normContext.includes('chuyển nghề') ||
        normContext.includes('tuyển dụng') ||
        normContext.includes('đội ngũ') ||
        normContext.includes('tìm khách')) &&
      (item.category?.includes('Sự nghiệp') || sourceNorm.includes('chuyện nghề'))
    ) {
      score += 10;
    }

    // Slight preference for video-cvan items when strong matches are tied
    if (score >= 12 && item.angle_code?.startsWith('video-cvan-')) {
      score += 2;
    }

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topScored = scored.filter((s) => s.score >= 6).slice(0, topK);

  // If user asked a general greeting/bio question with 0 keyword hits, return top personal story angles
  if (topScored.length === 0) {
    return allAngles
      .filter((a) => a.source_type === 'personal_story' || a.angle_code === 'video-cvan-002-259894')
      .slice(0, 3)
      .map((item) => ({ item, score: 5 }));
  }

  return topScored;
}

// Discover Telegram Chat IDs from default + getUpdates + Supabase config
async function getTelegramChatIds() {
  if (DEFAULT_CHAT_ID) {
    cachedTelegramChatIds.add(String(DEFAULT_CHAT_ID));
  }
  try {
    // 1. Check getUpdates from Telegram Bot
    const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
    if (tgRes.ok) {
      const tgData = await tgRes.json();
      for (const upd of tgData.result || []) {
        const cid =
          upd.message?.chat?.id ||
          upd.edited_message?.chat?.id ||
          upd.callback_query?.message?.chat?.id;
        if (cid) cachedTelegramChatIds.add(String(cid));
      }
    }

    // 2. Check saved chat IDs in Supabase post_history (client_slug = 'telegram-config')
    const sbRes = await fetch(
      `${SUPABASE_URL}/rest/v1/post_history?client_slug=eq.telegram-config&select=topic_key&limit=10`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    if (sbRes.ok) {
      const rows = await sbRes.json();
      for (const r of rows) {
        if (r.topic_key) cachedTelegramChatIds.add(String(r.topic_key));
      }
    }

    // 3. Persist any newly discovered chat IDs into Supabase so they are never lost
    for (const cid of cachedTelegramChatIds) {
      await fetch(`${SUPABASE_URL}/rest/v1/post_history`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_slug: 'telegram-config',
          topic_key: String(cid),
          category: 'TELEGRAM_CHAT_ID',
          angle_summary: 'Auto-discovered Telegram Chat ID for notifications',
          post_mode: 'config',
        }),
      }).catch(() => {});
    }
  } catch (e) {
    console.error('Telegram discovery error:', e);
  }
  return Array.from(cachedTelegramChatIds);
}

async function sendTelegramNotification(text) {
  const chatIds = await getTelegramChatIds();
  if (chatIds.length === 0) return false;
  let sent = false;
  for (const chatId of chatIds) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      });
      if (res.ok) sent = true;
    } catch (e) {
      console.error('Telegram send error:', e);
    }
  }
  return sent;
}

// Build the System Prompt combining Layer 1 (Core Persona) + Layer 2 (Retrieved Knowledge Angles)
function buildSystemPrompt(retrievedAngles = []) {
  const contextBlocks = retrievedAngles
    .map(
      (a, idx) =>
        `[TÀI LIỆU THỰC CHIẾN #${idx + 1} | Mã: ${a.angle_code} | Nguồn: ${a.source_name}]\n` +
        `- Chủ đề: ${a.hook_title}\n` +
        `- Nội dung & Lập luận của Khánh Vân: ${a.core_insight}\n` +
        `- Hướng gợi mở: ${a.soft_sell_prompt || ''}`
    )
    .join('\n\n');

  return `Bạn là **Trợ lý Cố vấn AI của Chuyên gia Tài chính Khánh Vân** (hoặc đại diện trực tiếp cho góc nhìn của chị Khánh Vân trên website chính thức khanhvanfinance.com).

=========================================
TẦNG 1: HỒ SƠ & KHÍ CHẤT KHÁNH VÂN (CORE PERSONA)
=========================================
1. **Nhân thân & Uy tín:**
   - Họ tên: Nguyễn Thị Vân (Khánh Vân) — Giám đốc Vùng Cấp cao (Senior Regional Director) tại Manulife Việt Nam (từ 02/2018 đến nay).
   - Nền tảng tài chính: 8 năm làm việc tại Ngân hàng Quốc tế ANZ (2009–2017) ở khối Quản lý tài sản (Wealth Management) & Tín dụng thế chấp (Vô địch doanh số thế chấp toàn quốc ANZ năm 2017).
   - Thành tựu bảo hiểm & quản trị: Đại diện duy nhất tại Việt Nam đạt giải thưởng danh giá "Nhà Quản lý Xuất sắc nhất Châu Á 2021" (Asia Trusted Life Agent & Advisers Awards), trực tiếp ươm mầm 64 Quản lý cấp cao và dẫn dắt hệ thống hơn 500 nhân sự chuẩn mực, Top 1 tỷ lệ duy trì hợp đồng (K2).
   - Gia đình & Lối sống: Người phụ nữ trân trọng sự cân bằng bên chồng và hai con, kỷ luật rèn luyện thể thao, đọc sách quản trị và sống tỉnh thức.
   - Liên hệ trực tiếp: Zalo / Điện thoại **0931 579 771**.

2. **Phong cách & Giọng văn trả lời:**
   - Điềm đạm, sang trọng, minh bạch, sắc sảo về con số và pháp lý nhưng luôn ấm áp, thấu cảm như một người chị, một cố vấn gia sản tận tâm.
   - Xưng **"Vân"** (hoặc **"Trợ lý của chị Khánh Vân"**) và gọi người đối thoại là **"bạn"** hoặc **"anh/chị"**.
   - **Ngắn gọn, súc tích, dễ đọc trên điện thoại:** Trả lời khoảng 80–160 chữ, chia ý rõ ràng bằng gạch đầu dòng khi giải thích cơ chế tài chính/bồi thường. Không viết lan man dài dòng.

3. **Nguyên tắc vàng (Guardrails):**
   - Dựa chặt vào **[TẦNG 2: DỮ LIỆU THỰC CHIẾN TRích XUẤT TỪ SUPABASE]** bên dưới để trả lời đúng bằng số liệu, ví dụ thực tế (như quỹ dự phòng, thẻ sức khỏe Kim Cương 2 tỷ/năm, quy tắc kê khai trung thực VssID, cơ chế phí ban đầu giảm về 0% từ năm thứ 6, rút tiền linh hoạt sau 10-15 năm...).
   - Tuyệt đối KHÔNG hứa hẹn lãi suất đầu tư cam kết ảo, KHÔNG nói xấu công ty bảo hiểm khác, KHÔNG chẩn đoán y khoa thay bác sĩ.
   - Cuối câu trả lời, nếu khách hàng đang có tình huống cá nhân (muốn kiểm tra hợp đồng cũ, tính phí cho gia đình, hoặc tìm hiểu chuyển nghề từ Ngân hàng sang Manulife), hãy khéo léo mời họ **bấm nút "Đặt lịch tham vấn 1-1" hoặc để lại Số điện thoại / Zalo ngay trong khung chat** để Khánh Vân hỗ trợ trực tiếp.

=========================================
TẦNG 2: DỮ LIỆU THỰC CHIẾN TRUY XUẤT TỪ SUPABASE (RAG CONTEXT)
=========================================
${contextBlocks || 'Sử dụng kiến thức nền tảng của Khánh Vân tại Tầng 1.'}`;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      sessionId = 'anon-session',
      message = '',
      history = [],
      visitorName = '',
      visitorPhone = '',
      pageUrl = 'https://www.khanhvanfinance.com/',
    } = req.body || {};

    const cleanMsg = String(message).trim();
    if (!cleanMsg) {
      return res.status(400).json({ error: 'Empty message' });
    }

    // 1. Fetch 230 knowledge_angles and run Hybrid Retrieval
    const allAngles = await getKnowledgeAngles();
    const matchedScored = retrieveRelevantAngles(cleanMsg, history, allAngles, 5);
    const matchedAngles = matchedScored.map((s) => s.item);

    // Extract up to 2 high-confidence matched video codes (`video-cvan-...` with score >= 16)
    // so the frontend displays playable Video Cards only when genuinely relevant!
    const matchedVideoCodes = matchedScored
      .filter((s) => s.score >= 16 && s.item.angle_code && s.item.angle_code.startsWith('video-cvan-'))
      .slice(0, 2)
      .map((s) => ({
        id: s.item.angle_code,
        title: s.item.hook_title,
        category: s.item.category,
      }));

    // 2. Call Gemini with Multi-turn History + System Prompt
    const systemPrompt = buildSystemPrompt(matchedAngles);
    const contents = [];

    for (const h of history.slice(-6)) {
      if (!h.content) continue;
      contents.push({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(h.content) }],
      });
    }
    contents.push({
      role: 'user',
      parts: [{ text: cleanMsg }],
    });

    let botReply = '';
    for (const key of GEMINI_KEYS) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${key}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: systemPrompt }],
              },
              contents,
              generationConfig: {
                temperature: 0.45,
                maxOutputTokens: 650,
              },
            }),
          }
        );
        if (geminiRes.ok) {
          const data = await geminiRes.json();
          botReply =
            data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
          if (botReply) break;
        }
      } catch (err) {
        console.error('Gemini call error:', err);
      }
    }

    // Fallback: If Gemini did not respond, use Anthropic Claude (Claude Haiku)
    if (!botReply && ANTHROPIC_API_KEY) {
      try {
        const claudeMessages = [];
        for (const h of history.slice(-6)) {
          if (!h.content) continue;
          claudeMessages.push({
            role: h.role === 'assistant' ? 'assistant' : 'user',
            content: String(h.content),
          });
        }
        claudeMessages.push({ role: 'user', content: cleanMsg });

        const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 650,
            system: systemPrompt,
            messages: claudeMessages,
          }),
        });
        if (claudeRes.ok) {
          const cData = await claudeRes.json();
          botReply = cData.content?.[0]?.text?.trim() || '';
        }
      } catch (cErr) {
        console.error('Claude call error:', cErr);
      }
    }

    if (!botReply) {
      botReply =
        'Cảm ơn bạn đã đặt câu hỏi cho Khánh Vân. Với tình huống cụ thể này, bạn có thể để lại Số điện thoại / Zalo ngay tại đây hoặc nhắn trực tiếp cho Vân qua Zalo 0931 579 771 để Vân kiểm tra và tư vấn chi tiết nhất cho bạn nhé!';
    }

    // 3. Check if the user typed a phone number inside their chat message!
    const phoneMatch = cleanMsg.match(/(?:\+84|0)(?:3|5|7|8|9)\d{8}\b/);
    const detectedPhone = phoneMatch ? phoneMatch[0] : visitorPhone;

    // 4. Save Chat History to Chị Vân's Supabase DB (`paaphwfpoiiowmthxtlp`)
    // Try `web_chat_logs` first, and always log into `post_history` (`client_slug = 'khanh-van-chat'`)
    const logPayload = {
      client_slug: 'khanh-van-chat',
      topic_key: `${sessionId}-${Date.now()}`,
      category: detectedPhone ? `CHAT_HAS_PHONE: ${detectedPhone}` : 'CHAT_LOG',
      angle_summary: `[Khách: ${visitorName || 'Ẩn danh'} | SĐT: ${detectedPhone || 'Chưa có'}] Hỏi: ${cleanMsg.slice(0, 180)}`,
      facebook_post: cleanMsg,
      website_article: botReply,
      linkedin_post: JSON.stringify({
        sessionId,
        visitorName,
        visitorPhone: detectedPhone,
        matchedVideoCodes,
        matchedAngles: matchedAngles.map((a) => a.angle_code),
        pageUrl,
      }),
      post_mode: 'advisory',
    };

    // 4 & 5. Save Chat History to Supabase & Send Telegram Notification in parallel
    const tgText = detectedPhone
      ? `🔥 <b>LEAD SĐT TRONG KHUNG CHAT WEB KHÁNH VÂN</b>\n\n` +
        `👤 <b>Khách:</b> ${visitorName || 'Khách truy cập web'}\n` +
        `📞 <b>SĐT phát hiện:</b> <code>${detectedPhone}</code>\n` +
        `💬 <b>Tin nhắn khách:</b> ${cleanMsg}\n\n` +
        `🤖 <b>AI đã trả lời:</b> ${botReply.slice(0, 350)}...`
      : `💬 <b>TIN NHẮN CHATBOT MỚI (Web Khánh Vân)</b>\n\n` +
        `🗣 <b>Khách hỏi:</b> ${cleanMsg}\n\n` +
        `🤖 <b>AI trả lời:</b> ${botReply.slice(0, 300)}${botReply.length > 300 ? '...' : ''}`;

    await Promise.allSettled([
      fetch(`${SUPABASE_URL}/rest/v1/post_history`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logPayload),
      }),
      sendTelegramNotification(tgText),
    ]);

    return res.status(200).json({
      reply: botReply,
      matchedVideos: matchedVideoCodes,
      detectedPhone: detectedPhone || null,
    });
  } catch (err) {
    console.error('Chat API error:', err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}
