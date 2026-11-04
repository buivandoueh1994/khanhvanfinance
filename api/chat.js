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

// Clean text: strip raw markdown artifacts (**bold**, headers, stray asterisks)
function cleanReplyText(text = '') {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/`{1,3}[^`]*`{1,3}/g, '')
    .replace(/^-\s+/gm, '• ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractPhoneNumber(str = '') {
  if (!str) return null;
  const clean = str.replace(/[\s.-]/g, '');
  const match = clean.match(/(?:\+84|0)(?:3|5|7|8|9)\d{8}\b/);
  return match ? match[0] : null;
}

// Build the System Prompt combining Layer 1 (Core Persona) + Layer 2 (Retrieved Knowledge Angles)
function buildSystemPrompt(retrievedAngles = []) {
  const contextBlocks = retrievedAngles
    .map(
      (a, idx) =>
        `[GÓC NHÌN #${idx + 1} | Mã: ${a.angle_code}]\n` +
        `- Chủ đề: ${a.hook_title}\n` +
        `- Luận điểm của Khánh Vân: ${a.core_insight}`
    )
    .join('\n\n');

  return `Bạn là Chuyên gia Tài chính Khánh Vân (trò chuyện trực tiếp với khách hàng trên website khanhvanfinance.com).

=========================================
HỒ SƠ & PHONG THÁI KHÁNH VÂN:
=========================================
- Họ tên: Nguyễn Thị Vân (Khánh Vân) — Giám đốc Vùng Cấp cao tại Manulife Việt Nam, nguyên Quản lý Tài sản & Tín dụng thế chấp ANZ Bank (8 năm), Nhà Quản lý Xuất sắc nhất Châu Á 2021.
- Xưng "Vân" và gọi khách là "bạn" hoặc "anh/chị". Giọng văn điềm đạm, ấm áp, chân thành, sắc sảo và tin cậy như một người chị cố vấn tận tâm.

=========================================
QUY TẮC BẮT BUỘC VỀ ĐỘ DÀI & ĐỊNH DẠNG TIN NHẮN (CỰC KỲ QUAN TRỌNG):
=========================================
1. ĐỘ DÀI NGẮN GỌN (50 - 90 TỪ):
   - Trả lời ngắn gọn, cô đọng, tự nhiên như chị Vân đang nhắn tin nhanh qua Zalo.
   - Đi thẳng vào trọng tâm câu trả lời, chia làm 2-3 ý gãy gọn. Tuyệt đối KHÔNG viết bài luận dài, không liệt kê lan man.

2. ĐỊNH DẠNG SẠCH SẼ - KHÔNG KÝ TỰ ĐẶC BIỆT:
   - TUYỆT ĐỐI KHÔNG dùng dấu sao **in đậm**, không dùng markdown ##, không dùng code.
   - Viết thuần chữ tiếng Việt tự nhiên, xuống dòng ngắt ý rõ ràng, dùng dấu gạch đầu dòng (-) hoặc dấu chấm tròn (•) khi liệt kê.

3. DỰA VÀO DỮ LIỆU THỰC TẾ & GỢI MỞ KẾT NỐI:
   - Dựa vào tài liệu thực chiến bên dưới để trả lời số liệu chính xác (ví dụ: quỹ bảo hiểm được Bộ Tài chính giám sát, chi trả thực tế, rút tiền sau 10-15 năm...).
   - Nếu khách cần tính toán dòng tiền hoặc rà soát hợp đồng cụ thể, gợi ý nhẹ nhàng: bạn có thể để lại số Zalo ngay tại đây để Vân hỗ trợ chi tiết hơn.

=========================================
DỮ LIỆU THỰC CHIẾN TỪ THƯ VIỆN KHÁNH VÂN:
=========================================
${contextBlocks || 'Sử dụng kiến thức tài chính thực tế của Khánh Vân.'}`;
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
    const geminiModels = [
      process.env.GEMINI_MODEL || 'gemini-3.8-flash',
      'gemini-3.5-flash-lite',
      'gemini-3.5-flash',
      'gemini-2.5-flash',
    ];
    for (const key of GEMINI_KEYS) {
      if (botReply) break;
      for (const model of geminiModels) {
        try {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
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
          console.error(`Gemini call error (${model}):`, err);
        }
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
        'Cảm ơn bạn đã đặt câu hỏi cho Khánh Vân. Bạn có thể để lại Số điện thoại hoặc Zalo ngay tại đây để Vân kiểm tra và tư vấn trực tiếp cho bạn nhé!';
    }

    // Clean text: strip raw markdown artifacts, asterisks, and excessive line breaks
    botReply = cleanReplyText(botReply);

    // 3. Check if the user typed a phone number inside their chat message!
    const detectedPhone = extractPhoneNumber(cleanMsg) || visitorPhone || null;

    // 4. Save Chat History to Chị Vân's Supabase DB (`paaphwfpoiiowmthxtlp`)
    const logPayload = {
      client_slug: 'khanh-van-chat',
      topic_key: `${sessionId}-${Date.now()}`,
      category: detectedPhone ? `LEAD_PHONE: ${detectedPhone}` : 'CHAT_LOG',
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

    const tasks = [];
    if (SUPABASE_KEY) {
      tasks.push(
        fetch(`${SUPABASE_URL}/rest/v1/post_history`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(logPayload),
        }).catch((e) => console.error('DB log error:', e))
      );
    }

    // ONLY send notification to Telegram if client left their phone number!
    // Format: SĐT + Tóm tắt toàn bộ đoạn hội thoại
    if (detectedPhone) {
      const historySnippet = history
        .slice(-4)
        .map((m) => `${m.role === 'user' ? 'Khách' : 'Vân'}: ${m.content}`)
        .join('\n');

      const fullSnippet = [
        historySnippet,
        `Khách: ${cleanMsg}`,
        `Vân: ${botReply}`,
      ]
        .filter(Boolean)
        .join('\n\n');

      const safeSnippet = fullSnippet
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      const tgText =
        `🎯 <b>CÓ LEAD SĐT MỚI TỪ WEB KHÁNH VÂN!</b>\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📞 <b>SĐT / Zalo:</b> <code>${detectedPhone}</code>\n` +
        (visitorName ? `👤 <b>Họ tên:</b> ${visitorName}\n` : '') +
        `⏰ <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}\n\n` +
        `📝 <b>Tóm tắt hội thoại khách hàng:</b>\n` +
        `<i>${safeSnippet}</i>`;

      tasks.push(sendTelegramNotification(tgText));
    }

    await Promise.allSettled(tasks);

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
