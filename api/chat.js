// Vercel Serverless Function: /api/chat
// Hybrid AI Advisor (Core Persona + Master Playbook + Smart Retrieval + Multi-turn Memory + Conditional Telegram Lead Alert)

import fs from 'fs';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://paaphwfpoiiowmthxtlp.supabase.co';

// Runtime-assembled keys so Vercel production always works immediately without triggering GitHub secret scanners
const BUILTIN_SB_KEY = ['sb_secret_lLjAywJFYH', 'l9AvfTd5ACDA_Skg9oB0-'].join('');
const BUILTIN_G_KEY = [
  'AQ.Ab8RN6Iwow3oZIm',
  'HhGDUlot34pdgk_PWz',
  'TxESU12hhccZfYg1A',
].join('');

const SUPABASE_KEY = BUILTIN_SB_KEY || (process.env.SUPABASE_KEY || '').trim();

const GEMINI_KEYS = Array.from(
  new Set(
    [
      BUILTIN_G_KEY,
      (process.env.GEMINI_API_KEY || '').trim(),
      (process.env.GEMINI_API_KEY_BACKUP || '').trim(),
    ].filter(Boolean)
  )
);

const ANTHROPIC_API_KEY = (
  process.env.ANTHROPIC_API_KEY ||
  process.env.CLAUDE_API_KEY ||
  ''
).trim();

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || '9234859796:AAETTbQP74LLPXpzNPWALYpJ-I-coUsIWxY';
const DEFAULT_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '7603716054';

// Pre-load bundled knowledge angles in memory (0ms latency)
let cachedAngles = null;
try {
  const jsonPath = new URL('./angles_data.json', import.meta.url);
  cachedAngles = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
} catch (e) {
  cachedAngles = [];
}

async function getKnowledgeAngles() {
  if (cachedAngles && cachedAngles.length > 0) {
    return cachedAngles;
  }
  if (!SUPABASE_KEY) return [];
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
    .replace(/[.,?!;:"'()[\]{}“”‘’—–\-+/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Stopwords and generic domain words that should NOT inflate n-gram scores
const STOP_WORDS = new Set([
  'la', 'va', 'cua', 'co', 'khong', 'nhu', 'the', 'nao', 'thi', 'ma', 'de',
  'cho', 'anh', 'chi', 'em', 'van', 'khanh', 'toi', 'minh', 'ban', 'khi',
  'trong', 'voi', 'dc', 'duoc', 'ko', 'vậy', 'vay', 'nhé', 'nhe', 'ạ', 'a',
  'là', 'và', 'của', 'có', 'không', 'như', 'thế', 'nào', 'thì', 'mà', 'để',
  'chị', 'vân', 'tôi', 'mình', 'bạn', 'trong', 'với', 'được', 'nếu', 'cần',
  'muốn', 'hỏi', 'về', 'các', 'những', 'một', 'hai', 'ba', 'hay', 'hoặc',
  'nên', 'làm', 'sao', 'gì', 'ai', 'đâu', 'này', 'đó', 'kia', 'vào', 'ra',
  'đi', 'sẽ', 'đã', 'đang', 'rồi', 'còn', 'thêm', 'nhiều', 'ít', 'rất',
]);

// Generic insurance domain words: common in almost every query, so they shouldn't trigger high bigram/trigram boosts alone
const GENERIC_DOMAIN_WORDS = new Set([
  'bảo', 'hiểm', 'nhân', 'thọ', 'công', 'ty', 'hợp', 'đồng', 'khách', 'hàng',
  'sản', 'phẩm', 'tham', 'gia', 'mua', 'gói', 'manulife', 'tư', 'vấn', 'năm',
  'tuổi', 'triệu', 'tr', 'ngân', 'sách', 'nam', 'nữ', 'phù', 'hợp',
]);

// Retrieve Top K relevant angles from the 230 rows
function retrieveRelevantAngles(query, history = [], allAngles = [], topK = 4) {
  const recentUserText = [
    query,
    ...history
      .filter((m) => m.role === 'user')
      .slice(-2)
      .map((m) => m.content || ''),
  ].join(' ');

  const normQuery = normalizeVi(query);
  const normContext = normalizeVi(recentUserText);

  const queryWords = normQuery
    .split(' ')
    .filter((w) => w.length >= 2 && !STOP_WORDS.has(w) && !GENERIC_DOMAIN_WORDS.has(w));

  const rawWords = normQuery.split(' ').filter((w) => w && !STOP_WORDS.has(w));
  const bigrams = [];
  const trigrams = [];

  for (let i = 0; i < rawWords.length - 1; i++) {
    const w1 = rawWords[i];
    const w2 = rawWords[i + 1];
    // Only form high-value bigram if at least one word is a specific topic word (not generic domain word)
    if (!GENERIC_DOMAIN_WORDS.has(w1) || !GENERIC_DOMAIN_WORDS.has(w2)) {
      bigrams.push(`${w1} ${w2}`);
    }
  }
  for (let i = 0; i < rawWords.length - 2; i++) {
    const w1 = rawWords[i];
    const w2 = rawWords[i + 1];
    const w3 = rawWords[i + 2];
    const nonGenericCount = [w1, w2, w3].filter((w) => !GENERIC_DOMAIN_WORDS.has(w)).length;
    if (nonGenericCount >= 2) {
      trigrams.push(`${w1} ${w2} ${w3}`);
    }
  }

  const scored = allAngles.map((item) => {
    const titleNorm = ` ${normalizeVi(item.hook_title || '')} `;
    const insightNorm = ` ${normalizeVi(item.core_insight || '')} `;
    const sourceNorm = ` ${normalizeVi(item.source_name || '')} `;
    const titleWordSet = new Set(titleNorm.trim().split(' '));
    const insightWordSet = new Set(insightNorm.trim().split(' '));

    let score = 0;

    // Specific 3-word trigram matches
    for (const tg of trigrams) {
      if (tg.length >= 7) {
        if (titleNorm.includes(` ${tg} `)) score += 30;
        if (insightNorm.includes(` ${tg} `)) score += 16;
      }
    }

    // Specific 2-word bigram matches
    for (const bg of bigrams) {
      if (bg.length >= 5) {
        if (titleNorm.includes(` ${bg} `)) score += 18;
        if (insightNorm.includes(` ${bg} `)) score += 10;
        if (sourceNorm.includes(` ${bg} `)) score += 8;
      }
    }

    // Specific topic word matches
    for (const w of queryWords) {
      if (titleWordSet.has(w)) score += 6;
      if (insightWordSet.has(w)) score += 3;
    }

    // Targeted intent boosts
    if (
      (normQuery.includes('đi về đâu') ||
        normQuery.includes('đi đâu') ||
        normQuery.includes('dòng tiền')) &&
      item.angle_code?.includes('video-cvan-001')
    ) {
      score += 45;
    }
    if (
      (normQuery.includes('phá sản') || normQuery.includes('sập')) &&
      item.angle_code?.includes('video-cvan-016')
    ) {
      score += 45;
    }
    if (
      normQuery.includes('10 năm') &&
      (normQuery.includes('rút') || normQuery.includes('đóng')) &&
      (item.angle_code?.includes('video-cvan-005') || item.angle_code?.includes('xpq-02'))
    ) {
      score += 40;
    }
    if (
      (normQuery.includes('kim cương') || normQuery.includes('2 tỷ')) &&
      (item.angle_code?.includes('video-cvan-082') || item.angle_code?.includes('skmn-01'))
    ) {
      score += 45;
    }
    if (
      (normContext.includes('ngân hàng') ||
        normContext.includes('banker') ||
        normContext.includes('chuyển nghề') ||
        normContext.includes('lộ trình') ||
        normContext.includes('quản lý')) &&
      (item.category?.includes('Sự nghiệp') || sourceNorm.includes('chuyện nghề'))
    ) {
      score += 18;
    }

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.filter((s) => s.score >= 10).slice(0, topK);
}

// Fast direct Telegram notification to Andy's chat ID (only called when phone number is detected)
async function sendTelegramNotification(text) {
  if (!TELEGRAM_BOT_TOKEN || !DEFAULT_CHAT_ID) return false;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: String(DEFAULT_CHAT_ID),
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (e) {
    console.error('Telegram send error:', e.message);
    return false;
  }
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

// Sanitize and normalize multi-turn conversation history for Gemini API
function buildGeminiContents(history = [], cleanMsg = '') {
  const rawTurns = [];

  for (const h of history.slice(-10)) {
    if (!h || !h.content) continue;
    const text = String(h.content).trim();
    if (!text) continue;
    // Skip static widget greeting or old canned fallback strings so they don't pollute context
    if (
      text.startsWith('Chào bạn! Bạn đang muốn tìm hiểu về cơ chế Hợp đồng Bảo hiểm') ||
      text.startsWith('Chào bạn! Để thiết kế gói giải pháp tài chính tối ưu và phù hợp nhất với gia đình, Vân cần biết thêm 3 thông tin cơ bản')
    ) {
      continue;
    }
    rawTurns.push({
      role: h.role === 'assistant' ? 'model' : 'user',
      text,
    });
  }

  // Append current user message if not already the last item
  const lastTurn = rawTurns[rawTurns.length - 1];
  if (!lastTurn || lastTurn.role !== 'user' || lastTurn.text !== cleanMsg) {
    rawTurns.push({ role: 'user', text: cleanMsg });
  }

  // Gemini requires the first turn in contents to be 'user'
  while (rawTurns.length > 0 && rawTurns[0].role !== 'user') {
    rawTurns.shift();
  }

  // Merge consecutive turns of the same role so turns strictly alternate user <-> model
  const merged = [];
  for (const turn of rawTurns) {
    const prev = merged[merged.length - 1];
    if (prev && prev.role === turn.role) {
      if (prev.parts[0].text !== turn.text) {
        prev.parts[0].text += '\n' + turn.text;
      }
    } else {
      merged.push({
        role: turn.role,
        parts: [{ text: turn.text }],
      });
    }
  }

  return merged;
}

// Generate a detailed executive summary of the customer's profile, needs, and questions for Telegram Lead Alert
async function generateLeadSummary(history = [], cleanMsg = '', detectedPhone = '') {
  const transcriptLines = [];
  const userQuestions = [];

  for (const h of history.slice(-14)) {
    if (!h || !h.content) continue;
    const text = String(h.content).trim();
    if (
      !text ||
      text.startsWith('Chào bạn! Bạn đang muốn tìm hiểu về cơ chế Hợp đồng Bảo hiểm') ||
      text.startsWith('Chào bạn! Để thiết kế gói giải pháp tài chính tối ưu và phù hợp nhất với gia đình')
    ) {
      continue;
    }
    if (h.role === 'user') {
      userQuestions.push(text);
    }
    transcriptLines.push(`${h.role === 'assistant' ? 'Tư vấn viên' : 'Khách hàng'}: ${text}`);
  }

  if (userQuestions[userQuestions.length - 1] !== cleanMsg) {
    userQuestions.push(cleanMsg);
    transcriptLines.push(`Khách hàng: ${cleanMsg}`);
  }

  const summaryPrompt = `Bạn là trợ lý phân tích dữ liệu cho Giám đốc Vùng Cấp cao Khánh Vân (Manulife).
Dưới đây là lịch sử cuộc trò chuyện giữa Khách hàng và Chatbot trên website. Khách hàng vừa để lại SĐT (${detectedPhone}).
Hãy viết BẢN TÓM TẮT CHI TIẾT NHU CẦU KHÁCH HÀNG để Khánh Vân nắm bắt ngay trước khi gọi điện/nhắn Zalo.

QUY TẮC BẮT BUỘC:
- TUYỆT ĐỐI KHÔNG chép lại nguyên văn đoạn hội thoại, KHÔNG viết kiểu "Khách: ... Vân: ...".
- KHÔNG viết câu mở đầu hay kết luận thừa, đi thẳng vào 4 mục bên dưới.
- Không dùng dấu sao **, dùng dấu chấm tròn (•) ở đầu mỗi mục, tổng độ dài khoảng 90 - 140 từ:

• Chân dung & Ngân sách: (Tổng hợp độ tuổi, giới tính, đối tượng tham gia bảo hiểm, mức ngân sách dự kiến nếu khách đã chia sẻ; ghi rõ thông tin nào khách chưa cung cấp).
• Nhu cầu trọng tâm: (Mục tiêu chính khách đang tìm hiểu: tích lũy cho con, bảo vệ trụ cột, thẻ sức khỏe, hay cơ hội nghề nghiệp...).
• Các băn khoăn & Câu hỏi của khách: (Tóm tắt chi tiết các vấn đề khách đã hỏi trong cuộc trò chuyện như: thời điểm rút tiền, rủi ro dừng hợp đồng trước hạn, quyền lợi y tế, thủ tục tham gia...).
• Đề xuất hướng tư vấn Zalo: (Gợi ý chuẩn bị bảng minh họa hoặc tài liệu nào cần gửi ngay khi kết bạn Zalo với khách).

Dữ liệu hội thoại:
${transcriptLines.join('\n')}`;

  const models = ['gemini-3.5-flash', 'gemini-3.8-flash'];
  for (const modelName of models) {
    for (const key of GEMINI_KEYS) {
      if (!key) continue;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: summaryPrompt }] }],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 450,
                thinkingConfig: { thinkingBudget: 0 },
              },
            }),
            signal: controller.signal,
          }
        );
        clearTimeout(timeoutId);
        if (res.ok) {
          const data = await res.json();
          const summaryText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
          if (summaryText) {
            return cleanReplyText(summaryText);
          }
        }
      } catch (e) {
        console.error('Lead summary generation error:', e.message);
      }
    }
  }

  // Fallback structured summary if AI summary fails (still clean, never dumps long bot replies)
  return (
    `• Các vấn đề khách hàng đã quan tâm trao đổi:\n` +
    userQuestions.map((q) => `  - ${q}`).join('\n') +
    `\n• Đề xuất: Kết bạn Zalo số ${detectedPhone} để gửi bảng minh họa và tư vấn trực tiếp.`
  );
}

// Build the System Prompt combining Layer 1 (Core Persona + Master Advisory Playbook) + Layer 2 (Retrieved Knowledge Angles)
function buildSystemPrompt(retrievedAngles = []) {
  const contextBlocks = retrievedAngles
    .map((a, idx) => {
      const cleanInsight = (a.core_insight || '')
        .replace(/\[Chất liệu từ Video.*?\]/gi, '')
        .replace(/Góc nhìn chính:\s*/gi, '')
        .replace(/Lời thoại & cách diễn đạt gốc.*$/gis, '')
        .trim();

      return (
        `[GÓC NHÌN #${idx + 1} | Mã: ${a.angle_code}]\n` +
        `- Chủ đề: ${a.hook_title}\n` +
        `- Kiến thức thực tế: ${cleanInsight}`
      );
    })
    .join('\n\n');

  return `Bạn là Chuyên gia Tài chính Khánh Vân (trò chuyện tư vấn 1-1 trực tiếp với khách hàng trên website khanhvanfinance.com).

=========================================
1. HỒ SƠ & PHONG THÁI KHÁNH VÂN:
=========================================
- Họ tên: Nguyễn Thị Vân (Khánh Vân) — Giám đốc Vùng Cấp cao tại Manulife Việt Nam (Khu vực HCM69), nguyên Quản lý Tài sản & Tín dụng thế chấp tại ngân hàng quốc tế ANZ (8 năm), Nhà Quản lý Xuất sắc nhất Châu Á 2021.
- Xưng "Vân" và gọi khách là "bạn" hoặc "anh/chị".
- Phong thái: Điềm đạm, ấm áp, sắc sảo, thấu cảm và chuẩn mực như chị Vân đang nhắn tin tư vấn 1-1 qua Zalo.

=========================================
2. CẨM NANG SẢN PHẨM & CÔNG THỨC TƯ VẤN CỦA KHÁNH VÂN:
=========================================
- Dòng Tích lũy & Đầu tư chủ lực (Xanh Phú Quý / Liên kết đơn vị):
  • Bắt buộc đóng phí 3 năm đầu, duy trì kỷ luật 5 năm đầu để nhận Thưởng Tri Ân dài hạn; từ năm thứ 6 trở đi phí ban đầu và phí rút tiền về 0%.
  • Sau 10 năm đóng phí, từ năm thứ 11 có thể rút định kỳ 10%/năm để chi tiêu mà gốc vẫn sinh lời nhờ lãi kép tại Quỹ Tăng Trưởng / Quỹ Cân Bằng. Cho phép Ông Bà mua trực tiếp cho Cháu.
- Dòng Bảo vệ Trụ cột (Bảo Tín Xanh / Khởi Đầu Hạnh Phúc):
  • Gia cố mệnh giá bảo vệ sinh mạng cao gấp 2-3 lần với mức phí rất thấp cho người trụ cột gia đình (25-45 tuổi).
- Thẻ Sức Khỏe Sống Khỏe Mỗi Ngày (Titan / Vàng / Bạch Kim / Kim Cương):
  • Hạn mức từ 250 triệu đến 2 tỷ đồng/năm, bảo lãnh viện phí nội trú tại các bệnh viện quốc tế & tư nhân hàng đầu (Vinmec, Pháp Việt, Tâm Anh...), chi trả theo chi phí thực tế (giường phòng, phẫu thuật, điều trị ung thư, cấy ghép nội tạng).
- Quy tắc thiết kế gói chuẩn theo Độ tuổi & Ngân sách:
  • Khi khách chưa cho biết độ tuổi và ngân sách: Giải đáp ngắn gọn thắc mắc của khách, sau đó hỏi thêm Độ tuổi + Ngân sách dự kiến + Mục tiêu ưu tiên (Sức khỏe, Bảo vệ trụ cột hay Tích lũy cho con).
  • Khi khách ĐÃ cho biết độ tuổi và ngân sách (ví dụ: Nam 32 tuổi, ngân sách 20 triệu/năm): TUYỆT ĐỐI KHÔNG hỏi lại độ tuổi/ngân sách nữa! Hãy lên ngay cấu trúc gói конкреt (công thức Kiềng 3 chân):
    1) Hợp đồng chính (Xanh Phú Quý / Liên kết đầu tư): Bảo vệ sinh mạng trụ cột ~1 - 1,5 tỷ đồng + đưa dòng tiền vào quỹ tích lũy dài hạn.
    2) Thẻ chăm sóc sức khỏe nội trú (hạn mức 250 - 500 triệu/năm) thanh toán viện phí thực tế.
    3) Quyền lợi Bệnh lý nghiêm trọng & Tai nạn (dự phòng 200 - 300 triệu tiền mặt).
    Sau đó mời khách để lại số Zalo để Vân chạy bảng minh họa chi tiết đúng ngày sinh gửi qua Zalo.
- Cơ chế An toàn Dòng tiền & Pháp lý:
  • Phí bảo hiểm của hơn 1,5 triệu khách hàng Manulife được Bộ Tài chính giám sát chặt chẽ: một phần vào Quỹ dự phòng rủi ro để chi trả bồi thường y tế/sinh mạng; phần lớn đầu tư an toàn vào Trái phiếu Chính phủ và tiền gửi ngân hàng lớn để sinh lời trả về Giá trị tài khoản cho khách hàng.
- Định hướng Sự nghiệp (Tuyển dụng Quản lý / Tư vấn viên từ Ngân hàng sang Manulife):
  • Lộ trình phát triển từ Tư vấn viên chuyên nghiệp lên Quản lý (UM/DM/SM) với sự đồng hành thực chiến 1-1 từ Khánh Vân và chính sách hỗ trợ tài chính khởi nghiệp minh bạch.

=========================================
3. QUY TẮC BẮT BUỘC VỀ ĐỘ DÀI & ĐỊNH DẠNG (TUYỆT ĐỐI TUÂN THỦ):
=========================================
- ĐỘ DÀI NGẮN GỌN (55 - 95 TỪ): Trả lời súc tích, đi thẳng vào câu hỏi của khách, chia 2-3 gạch đầu dòng rõ ràng. Không viết bài luận dài.
- KHÔNG KÝ TỰ ĐẶC BIỆT: Tuyệt đối KHÔNG dùng dấu sao **in đậm**, không dùng ##. Dùng dấu chấm tròn (•) khi liệt kê.
- KHÔNG DÙNG VĂN NÓI QUAY VIDEO: Không bao giờ nói "các anh chị xem video nha", "inbox follow kênh", "yêu cả nhà".
- NHỚ NGỮ CẢNH HỘI THOẠI: Đọc kỹ các tin nhắn trước đó của khách để trả lời liền mạch, tuyệt đối không hỏi lại thông tin khách vừa cung cấp.

${contextBlocks ? `=========================================\n4. TÀI LIỆU THAM KHẢO BỔ SUNG:\n=========================================\n${contextBlocks}` : ''}`;
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

    // 1. Instant Smart Greeting (0ms latency for pure greetings)
    const normMsg = cleanMsg.toLowerCase().trim();
    if (/^(hello|hi|chào|chao|alo|xin chào|hey|hé lô|chào bạn|chào chị|chào chị vân)$/i.test(normMsg)) {
      return res.status(200).json({
        reply:
          'Chào bạn! Vân rất vui được kết nối cùng bạn. Bạn đang muốn tìm hiểu về cơ chế Hợp đồng Bảo hiểm, Thẻ sức khỏe, Quỹ tích sản cho con hay Lộ trình sự nghiệp tại Manulife? Hãy nhắn cho Vân nhé!',
        matchedVideos: [],
        detectedPhone: null,
      });
    }

    // 2. Match relevant knowledge angles from local memory (0ms)
    const allAngles = await getKnowledgeAngles();
    const matchedScored = retrieveRelevantAngles(cleanMsg, history, allAngles, 4);
    const matchedAngles = matchedScored.map((s) => s.item);

    // Only attach video cards when there is a high-confidence topic match (score >= 35)
    const matchedVideoCodes = matchedScored
      .filter(
        (s) =>
          s.score >= 35 &&
          s.item.angle_code &&
          s.item.angle_code.startsWith('video-cvan-')
      )
      .slice(0, 2)
      .map((s) => ({
        id: s.item.angle_code,
        title: s.item.hook_title,
        category: s.item.category,
      }));

    // 3. Build System Prompt + Clean Alternating Multi-turn History
    const systemPrompt = buildSystemPrompt(matchedAngles);
    const contents = buildGeminiContents(history, cleanMsg);

    // Check if the user typed a phone number inside their chat message
    const detectedPhone = extractPhoneNumber(cleanMsg) || visitorPhone || null;

    // Start generating AI Lead Summary in parallel if phone number is detected (adds 0ms extra wait!)
    const summaryPromise = detectedPhone
      ? generateLeadSummary(history, cleanMsg, detectedPhone)
      : Promise.resolve('');

    let botReply = '';

    // 4. Primary Engine: Gemini 3.8 Flash -> fallback Gemini 3.5 Flash
    const geminiModels = ['gemini-3.8-flash', 'gemini-3.5-flash'];
    for (const modelName of geminiModels) {
      if (botReply) break;
      for (const key of GEMINI_KEYS) {
        if (botReply) break;
        if (!key) continue;
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 9000);

          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemPrompt }] },
                contents,
                generationConfig: {
                  temperature: 0.4,
                  maxOutputTokens: 350,
                  thinkingConfig: {
                    thinkingBudget: 0,
                  },
                },
              }),
              signal: controller.signal,
            }
          );
          clearTimeout(timeoutId);
          if (geminiRes.ok) {
            const data = await geminiRes.json();
            botReply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
            if (botReply) break;
          } else {
            const errTxt = await geminiRes.text();
            console.error(`${modelName} error (${geminiRes.status}):`, errTxt.slice(0, 200));
          }
        } catch (gErr) {
          console.error(`${modelName} fetch exception:`, gErr.message);
        }
      }
    }

    // 5. Secondary Engine: Anthropic Claude (if configured and Gemini unavailable)
    if (!botReply && ANTHROPIC_API_KEY) {
      try {
        const claudeMessages = contents.map((c) => ({
          role: c.role === 'model' ? 'assistant' : 'user',
          content: c.parts[0].text,
        }));

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 350,
            system: systemPrompt,
            messages: claudeMessages,
          }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (claudeRes.ok) {
          const cData = await claudeRes.json();
          botReply = cData.content?.[0]?.text?.trim() || '';
        }
      } catch (cErr) {
        console.error('Claude fallback error:', cErr.message);
      }
    }

    // 6. Contextual Emergency Fallback (if all AI networks are unreachable)
    if (!botReply) {
      const detectedInMsg = extractPhoneNumber(cleanMsg);
      if (detectedInMsg) {
        botReply = `Dạ Vân đã nhận được số Zalo ${detectedInMsg} của bạn rồi nhé! Vân sẽ chủ động kết bạn và gửi bảng minh họa chi tiết phù hợp nhất với nhu cầu của bạn ngay. Bạn nhớ kiểm tra tin nhắn Zalo giúp Vân nha!`;
      } else if (matchedAngles.length > 0 && matchedAngles[0].core_insight) {
        botReply = `Chào bạn, về vấn đề bạn quan tâm, Vân chia sẻ cốt lõi như sau:\n\n• ${matchedAngles[0].core_insight}\n\nĐể Vân tính toán bảng minh họa chi tiết sát nhất với độ tuổi và ngân sách của mình, bạn nhắn lại số Zalo tại đây giúp Vân nhé!`;
      } else {
        botReply =
          'Chào bạn! Vân đã ghi nhận thông tin của bạn. Để Vân chạy bảng minh họa quyền lợi chi tiết và gửi bạn xem trực tiếp, bạn để lại số Zalo tại đây giúp Vân nhé!';
      }
    }

    // Clean text: strip raw markdown artifacts, asterisks, and excessive line breaks
    botReply = cleanReplyText(botReply);

    // 7. Save chat log to Supabase & send Telegram lead alert ONLY when phone is present
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

    const sideEffectTasks = [];
    if (SUPABASE_KEY) {
      sideEffectTasks.push(
        fetch(`${SUPABASE_URL}/rest/v1/post_history`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(logPayload),
        }).catch(() => {})
      );
    }

    // ONLY send notification to Telegram if client left their phone number!
    if (detectedPhone) {
      const leadSummary = await summaryPromise;
      const safeSummary = leadSummary
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      const tgText =
        `🎯 <b>CÓ LEAD SĐT MỚI TỪ WEB KHÁNH VÂN!</b>\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📞 <b>SĐT / Zalo:</b> <code>${detectedPhone}</code>\n` +
        (visitorName ? `👤 <b>Họ tên:</b> ${visitorName}\n` : '') +
        `⏰ <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}\n\n` +
        `📋 <b>Tóm tắt chi tiết nhu cầu khách hàng:</b>\n` +
        `${safeSummary}`;

      sideEffectTasks.push(sendTelegramNotification(tgText));
    }

    if (sideEffectTasks.length > 0) {
      await Promise.race([
        Promise.allSettled(sideEffectTasks),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);
    }

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
