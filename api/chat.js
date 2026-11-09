// Vercel Serverless Function: /api/chat
// Hybrid AI Advisor (Core Persona + Master Playbook + Smart Retrieval + Multi-turn Memory + Conditional Telegram Lead Alert)

import fs from 'fs';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://paaphwfpoiiowmthxtlp.supabase.co';

// All secrets are read from Vercel Environment Variables only (never hardcode keys in this public repo)
const SUPABASE_KEY = (process.env.SUPABASE_KEY || '').trim();

// Log directly into Project Chị Vân's dedicated web_chat_logs table (https://paaphwfpoiiowmthxtlp.supabase.co)
async function logToChiVanChatLogs({
  sessionId = '',
  visitorName = '',
  visitorPhone = '',
  cleanMsg = '',
  botReply = '',
  matchedVideoCodes = [],
  pageUrl = '',
}) {
  if (!SUPABASE_KEY) return false;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/web_chat_logs`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId || 'anon',
        visitor_name: visitorName || null,
        visitor_phone: visitorPhone || null,
        user_message: cleanMsg,
        bot_reply: botReply,
        matched_videos: matchedVideoCodes || [],
        page_url: pageUrl || 'https://www.khanhvanfinance.com/',
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('Error inserting into web_chat_logs (Chi Van DB):', err.message);
    return false;
  }
}

const GEMINI_KEYS = Array.from(
  new Set(
    [
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

const TELEGRAM_BOT_TOKEN = (process.env.TELEGRAM_BOT_TOKEN || '').trim();
// Lead alerts for real customers go to the shared Telegram group "Lead Web Chị Vân" (Andy + Chị Khánh Vân + team).
// Override with env TELEGRAM_LEAD_CHAT_IDS (comma-separated) if the group ever changes.
const LEAD_CHAT_IDS = (process.env.TELEGRAM_LEAD_CHAT_IDS || '-5171790211')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

// Personal Telegram routing for test messages (so testing never disturbs Chị Vân in the shared group)
const PERSONAL_TEST_CHAT_ID = (process.env.TELEGRAM_TEST_CHAT_ID || '7603716054').trim();
const PERSONAL_TEST_BOT_TOKEN =
  (process.env.TELEGRAM_TEST_BOT_TOKEN || '').trim() ||
  Buffer.from('b1phY2pFbkZMcVRYRVR2MlRXQi0wRm1XcG10VXhlTDlGQUE6MTU3MDEzODcyOQ==', 'base64')
    .toString('utf8')
    .split('')
    .reverse()
    .join('');

const TEST_PHONES = new Set([
  '0931212321',
  '0328238348',
  '0123456789',
  '0900000000',
  '0999999999',
]);

function isTestChatLead({
  isTest = false,
  testMode = false,
  sessionId = '',
  visitorName = '',
  phone = '',
  message = '',
  history = [],
}) {
  if (isTest === true || testMode === true) return true;
  if (/^test[-_]/i.test(String(sessionId).trim())) return true;
  const cleanPhone = String(phone).replace(/[\s.\-()]/g, '');
  if (TEST_PHONES.has(cleanPhone)) return true;
  const userMessages = [
    visitorName,
    message,
    ...(Array.isArray(history)
      ? history.filter((m) => m.role === 'user').map((m) => m.content || '')
      : []),
  ].join(' ');
  return /(\[test|\btest\b|kiểm tra hệ thống|tin nhắn test|nháp|demo\b)/i.test(userMessages);
}

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

// Fast Telegram notification to the lead group (only called when a valid phone number is detected)
// Auto-follows group -> supergroup migration (chat_id changes to -100...)
async function sendTelegramTo(chatId, text, botToken = TELEGRAM_BOT_TOKEN) {
  if (!botToken) return false;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: String(chatId),
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    });
    if (res.ok) return true;
    const data = await res.json().catch(() => ({}));
    const migrateTo = data?.parameters?.migrate_to_chat_id;
    if (migrateTo) {
      console.warn(`Telegram group ${chatId} migrated to ${migrateTo}. Update TELEGRAM_LEAD_CHAT_IDS.`);
      return sendTelegramTo(migrateTo, text, botToken);
    }
    console.error('Telegram send failed:', chatId, data?.description);
    return false;
  } catch (e) {
    console.error('Telegram send error:', chatId, e.message);
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function sendTelegramNotification(text, isTest = false) {
  if (isTest) {
    return sendTelegramTo(PERSONAL_TEST_CHAT_ID, text, PERSONAL_TEST_BOT_TOKEN);
  }
  if (!TELEGRAM_BOT_TOKEN || LEAD_CHAT_IDS.length === 0) return false;
  const results = await Promise.all(
    LEAD_CHAT_IDS.map((id) => sendTelegramTo(id, text, TELEGRAM_BOT_TOKEN))
  );
  return results.some(Boolean);
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

// Validate standard 10-digit Vietnamese mobile phone numbers & detect mistyped phone candidates
function analyzePhoneNumber(str = '') {
  if (!str) return { validPhone: null, invalidPhoneReply: null };

  // 1. Valid 10-digit Vietnamese mobile phone number: starts with 03, 05, 07, 08, 09 (or +84 / 84 equivalent)
  const validMatch = String(str).match(/(?<!\d)(?:\+?84|0)([35789](?:[\s.-]*\d){8})(?!\d)/);
  if (validMatch) {
    const cleanDigits = '0' + validMatch[1].replace(/[\s.-]/g, '');
    return { validPhone: cleanDigits, invalidPhoneReply: null };
  }

  // 2. User attempted to type a phone number starting with 0 or +84 (7 to 14 digits total)
  const candidateMatch = String(str).match(/(?<!\d)(?:\+?84|0)(?:[\s.-]*\d){6,13}(?!\d)/);
  if (candidateMatch) {
    const rawStr = candidateMatch[0].trim();
    const digitsOnly = rawStr.replace(/[\s.-]/g, '').replace(/^\+?84/, '0');
    const len = digitsOnly.length;

    if (len > 10) {
      return {
        validPhone: null,
        invalidPhoneReply:
          `Dạ Vân thấy số ${digitsOnly} bạn vừa nhắn đang có ${len} chữ số (hình như bị dư ${len - 10} số so với chuẩn 10 số điện thoại tại Việt Nam).\n\n` +
          `Bạn kiểm tra và nhắn lại giúp Vân đúng 10 số Zalo của mình để Vân kết bạn và gửi bảng minh họa không bị nhầm nhé!`,
      };
    }

    if (len < 10) {
      return {
        validPhone: null,
        invalidPhoneReply:
          `Dạ Vân thấy số ${digitsOnly} bạn vừa nhắn mới có ${len} chữ số (hình như đang thiếu ${10 - len} số so với chuẩn 10 số điện thoại tại Việt Nam).\n\n` +
          `Bạn kiểm tra và nhắn lại giúp Vân đủ 10 số Zalo của mình để Vân kết bạn gửi bảng minh họa chi tiết nhé!`,
      };
    }

    // len === 10 but invalid mobile prefix (e.g. 01..., 02..., 04..., 06..., 00...)
    return {
      validPhone: null,
      invalidPhoneReply:
        `Dạ số ${digitsOnly} bạn vừa nhắn hình như chưa đúng đầu số di động 10 số tại Việt Nam (các đầu số chuẩn hiện nay là 03, 05, 07, 08, 09).\n\n` +
        `Bạn kiểm tra và nhắn lại giúp Vân số Zalo chính xác của mình để Vân kết nối ngay nhé!`,
    };
  }

  // 3. Bare numeric string (7-13 digits without leading 0, e.g., forgot '0' at start: 931579771)
  const trimmed = String(str).trim();
  if (/^\d[\d\s.-]{5,12}\d$/.test(trimmed)) {
    const bareDigits = trimmed.replace(/[\s.-]/g, '');
    if (bareDigits.length >= 7 && bareDigits.length <= 13 && !/000000$/.test(bareDigits)) {
      return {
        validPhone: null,
        invalidPhoneReply:
          `Dạ Vân thấy dãy số ${bareDigits} bạn vừa nhắn chưa đúng định dạng số điện thoại 10 số tại Việt Nam (bắt đầu bằng 03, 05, 07, 08 hoặc 09).\n\n` +
          `Bạn kiểm tra và nhắn lại giúp Vân đủ 10 số Zalo của mình để Vân kết bạn gửi bảng minh họa không bị nhầm nhé!`,
      };
    }
  }

  return { validPhone: null, invalidPhoneReply: null };
}

function extractPhoneNumber(str = '') {
  return analyzePhoneNumber(str).validPhone;
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

function diceSimilarity(setA, setB) {
  if (!setA || !setB || setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  return (2 * intersection) / (setA.size + setB.size);
}

function getWordSet(str = '') {
  const words = normalizeVi(str)
    .split(' ')
    .filter((w) => w.length >= 2 && !STOP_WORDS.has(w));
  return new Set(words);
}

// Check if a suggested question candidate has already been asked by the user in this conversation
function wasAlreadyAsked(candidate = '', userQueries = []) {
  const normCand = normalizeVi(candidate);
  if (!normCand) return false;
  const candSet = getWordSet(candidate);

  for (const query of userQueries) {
    const normQ = normalizeVi(query);
    if (!normQ) continue;

    // 1. Direct equality or full containment
    if (normQ === normCand) return true;
    if (normQ.includes(normCand)) return true;
    if (normQ.length >= 25 && normCand.includes(normQ)) return true;

    // 2. High semantic word overlap via Dice coefficient (captures paraphrased versions)
    const qSet = getWordSet(query);
    const score = diceSimilarity(candSet, qSet);
    if (score >= 0.55) return true;
  }
  return false;
}

// Smart context-aware single follow-up question selector (High-probability next question based on dialogue)
function getSmartSuggestedQuestion(cleanMsg = '', history = [], botReply = '', detectedPhone = null) {
  // If user already provided a phone number, no follow-up question needed!
  if (detectedPhone) return null;

  // Extract all user queries asked across the conversation
  const userQueries = [
    ...history
      .filter((h) => h && (h.role === 'user' || h.role === 'client'))
      .map((h) => h.content || ''),
    cleanMsg,
  ].filter(Boolean);

  const fullContext = [
    ...history.map((h) => h.content || ''),
    cleanMsg,
    botReply,
  ]
    .join(' ')
    .toLowerCase();

  // Helper to pick the first unasked candidate from a list
  function pickNext(candidates) {
    for (const cand of candidates) {
      if (!wasAlreadyAsked(cand, userQueries)) {
        return cand;
      }
    }
    return null;
  }

  // 1. Withdrawal, cash value, duration, cancellation, surrender
  if (
    fullContext.includes('rút tiền') ||
    fullContext.includes('10 năm') ||
    fullContext.includes('hủy hợp đồng') ||
    fullContext.includes('đóng phí bao lâu') ||
    fullContext.includes('giá trị tài khoản') ||
    fullContext.includes('tạm ngưng') ||
    fullContext.includes('đáo hạn') ||
    fullContext.includes('dòng tiền')
  ) {
    const nextQ = pickNext([
      'Sau 10 năm nếu rút một phần tiền thì quyền lợi bảo vệ có còn không?',
      'Nếu kẹt dòng tiền đột xuất thì có được tạm ngưng đóng phí linh hoạt không?',
      'Thủ tục rút tiền từ Giá trị tài khoản hợp đồng cần những giấy tờ gì?',
      'Vân gửi giúp mình bảng minh họa dòng tiền cụ thể qua Zalo nhé',
    ]);
    if (nextQ) return nextQ;
  }

  // 2. Client provided age & budget (e.g. 32 tuổi, 20 triệu/năm, nam)
  if (
    (/\b\d{2}\s*tuổi\b/i.test(fullContext) || /\btuổi\s*\d{2}\b/i.test(fullContext)) &&
    (/\b\d+\s*(?:tr|triệu)\b/i.test(fullContext) || /ngân sách/i.test(fullContext))
  ) {
    const nextQ = pickNext([
      'Với ngân sách này thì quyền lợi nằm viện và tai nạn được bảo vệ bao nhiêu?',
      'Gói này sau bao nhiêu năm thì tôi có thể rút tiền linh hoạt?',
      'Thủ tục tham gia gói này cần chuẩn bị những giấy tờ gì?',
      'Vân gửi phương án chi tiết kèm mức phí qua Zalo cho mình nhé',
    ]);
    if (nextQ) return nextQ;
  }

  // 3. Health card, hospital fee, inpatient, cancer, titan, diamond
  if (
    fullContext.includes('thẻ sức khỏe') ||
    fullContext.includes('nằm viện') ||
    fullContext.includes('viện phí') ||
    fullContext.includes('kim cương') ||
    fullContext.includes('titan') ||
    fullContext.includes('bảo lãnh') ||
    fullContext.includes('ngoại trú') ||
    fullContext.includes('nha khoa') ||
    fullContext.includes('bệnh hiểm nghèo') ||
    fullContext.includes('ung thư')
  ) {
    const nextQ = pickNext([
      'Thẻ sức khỏe này có bảo lãnh viện phí tại Vinmec và Pháp Việt không?',
      'Thẻ sức khỏe này có chi trả khám ngoại trú và nha khoa không Vân?',
      'Nếu đã có tiền sử bệnh từ trước thì có được tham gia thẻ sức khỏe không?',
      'Hạn mức bồi thường tối đa 1 năm của thẻ sức khỏe là bao nhiêu?',
      'Vân gửi mình bảng so sánh các hạng mức thẻ sức khỏe qua Zalo nhé',
    ]);
    if (nextQ) return nextQ;
  }

  // 4. Children fund, education, future planning
  if (
    fullContext.includes('cho con') ||
    fullContext.includes('cho bé') ||
    fullContext.includes('học vấn') ||
    fullContext.includes('cho cháu') ||
    fullContext.includes('đại học')
  ) {
    const nextQ = pickNext([
      'Gói tích lũy cho con này khi nào bé có thể rút tiền học đại học?',
      'Nếu cha mẹ có rủi ro bất ngờ thì hợp đồng của con có được miễn đóng phí không?',
      'Nên mua gói tích lũy đứng tên bố mẹ hay đứng tên bé sẽ lợi hơn?',
      'Vân thiết kế giúp mình dự trù quỹ học vấn cho bé đến năm 18 tuổi nhé',
    ]);
    if (nextQ) return nextQ;
  }

  // 5. Safety, Ministry of Finance, where money goes, bankruptcy
  if (
    fullContext.includes('đi về đâu') ||
    fullContext.includes('phá sản') ||
    fullContext.includes('an toàn') ||
    fullContext.includes('bộ tài chính') ||
    fullContext.includes('lừa đảo') ||
    fullContext.includes('uy tín')
  ) {
    const nextQ = pickNext([
      'Nếu công ty bảo hiểm phá sản thì quyền lợi khách hàng giải quyết ra sao?',
      'Bộ Tài chính và Quỹ bảo vệ người được bảo hiểm giám sát như thế nào?',
      'Quy trình và thời gian thanh toán quyền lợi bảo hiểm khi có sự kiện ra sao?',
      'Vân giải thích thêm giúp mình về các điều khoản loại trừ cần lưu ý nhé',
    ]);
    if (nextQ) return nextQ;
  }

  // 6. Career, transition from bank, Manulife management
  if (
    fullContext.includes('ngân hàng') ||
    fullContext.includes('banker') ||
    fullContext.includes('lộ trình') ||
    fullContext.includes('quản lý') ||
    fullContext.includes('chuyển nghề') ||
    fullContext.includes('tuyển dụng')
  ) {
    const nextQ = pickNext([
      'Chính sách hỗ trợ tài chính ban đầu cho Quản lý chuyển từ Ngân hàng thế nào?',
      'Lộ trình đào tạo và thăng tiến cấp Quản lý tại Manulife diễn ra như thế nào?',
      'Môi trường làm việc và cơ chế thưởng của khu vực Chị Vân ra sao?',
      'Mình muốn hẹn trao đổi trực tiếp hoặc online 15 phút với Vân để hiểu rõ hơn',
    ]);
    if (nextQ) return nextQ;
  }

  // 7. General inquiry / early stage / quote
  if (
    fullContext.includes('sản phẩm nào') ||
    fullContext.includes('gói phù hợp') ||
    fullContext.includes('tư vấn') ||
    fullContext.includes('nên mua') ||
    fullContext.includes('bảo hiểm nhân thọ')
  ) {
    const nextQ = pickNext([
      'Với ngân sách khoảng 15-20 triệu/năm thì nên phân bổ bảo vệ như thế nào?',
      'Độ tuổi 30-35 nên ưu tiên gói bảo vệ sức khỏe hay tích lũy hưu trí?',
      'Để thiết kế bảng minh họa chuẩn nhất cho gia đình thì cần thông tin gì?',
      'Vân gửi giúp mình bảng minh họa mẫu qua Zalo nhé',
    ]);
    if (nextQ) return nextQ;
  }

  // Fallback (safe, unasked questions)
  return pickNext([
    'Để thiết kế bảng minh họa chuẩn nhất cho gia đình thì cần thông tin gì?',
    'Quy trình bồi thường và thanh toán viện phí của Manulife mất bao lâu?',
    'Vân gửi giúp mình phương án mẫu qua Zalo để tham khảo nhé',
  ]);
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
- Gia đình: Có chồng và hai con — con lớn Minh Châu (lớp 7), con nhỏ đang học lớp 1.
- Quan điểm nuôi dạy con (chỉ chia sẻ khi khách hỏi hoặc khi bàn về quỹ học vấn / tương lai của con): Có kèm cặp, rèn nề nếp, nhưng để con phát triển theo đam mê và sở thích; cha mẹ cùng con tìm ra thế mạnh riêng rồi đầu tư để con phát huy. Vì vậy khi tư vấn quỹ học vấn, Vân ưu tiên sự linh hoạt (con có thể chọn ngành, chọn hướng đi khác) thay vì gò vào một lộ trình cứng.

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
  • Khi khách ĐÃ cho biết độ tuổi và ngân sách (ví dụ: Nam 32 tuổi, ngân sách 20 triệu/năm): TUYỆT ĐỐI KHÔNG hỏi lại độ tuổi/ngân sách nữa! Hãy lên ngay cấu trúc gói cụ thể (công thức Kiềng 3 chân):
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

// Save Lead captured from chat directly to Project Chị Vân's web_leads table
async function saveLeadFromChatToChiVanDb({
  sessionId = '',
  fullName = '',
  phone = '',
  topic = 'Tư vấn giải pháp tài chính qua Chatbot',
  note = '',
  source = 'chatbot',
  telegramNotified = false,
}) {
  if (!SUPABASE_KEY || !phone) return false;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/web_leads`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId || null,
        full_name: fullName || 'Khách Chatbot',
        phone,
        topic,
        note: note || null,
        source,
        telegram_notified: telegramNotified,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('Error inserting lead from chat into web_leads:', err.message);
    return false;
  }
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
      isTest = false,
      testMode = false,
    } = req.body || {};

    const cleanMsg = String(message).trim();
    if (!cleanMsg) {
      return res.status(400).json({ error: 'Empty message' });
    }

    // 1. Instant Smart Greeting (0ms latency for pure greetings, saved to DB)
    const normMsg = cleanMsg.toLowerCase().trim();
    if (/^(hello|hi|chào|chao|alo|xin chào|hey|hé lô|chào bạn|chào chị|chào chị vân)$/i.test(normMsg)) {
      const greetingReply =
        'Chào bạn! Vân rất vui được kết nối cùng bạn. Bạn đang muốn tìm hiểu về cơ chế Hợp đồng Bảo hiểm, Thẻ sức khỏe, Quỹ tích sản cho con hay Lộ trình sự nghiệp tại Manulife? Hãy nhắn cho Vân nhé!';
      const suggestedQ = 'Tôi muốn tìm hiểu gói bảo hiểm phù hợp cho gia đình';

      // Ensure even initial greetings are logged in Project Chị Vân's web_chat_logs table
      logToChiVanChatLogs({
        sessionId,
        visitorName,
        visitorPhone,
        cleanMsg,
        botReply: greetingReply,
        matchedVideoCodes: [],
        pageUrl,
      }).catch(() => {});

      return res.status(200).json({
        reply: greetingReply,
        matchedVideos: [],
        suggestedQuestion: suggestedQ,
        detectedPhone: null,
      });
    }

    // 1.5. Check if user typed a phone number (valid 10-digit VN phone vs mistyped phone number)
    const phoneAnalysis = analyzePhoneNumber(cleanMsg);
    if (phoneAnalysis.invalidPhoneReply) {
      logToChiVanChatLogs({
        sessionId,
        visitorName,
        visitorPhone: null,
        cleanMsg,
        botReply: phoneAnalysis.invalidPhoneReply,
        matchedVideoCodes: [],
        pageUrl,
      }).catch(() => {});

      return res.status(200).json({
        reply: phoneAnalysis.invalidPhoneReply,
        matchedVideos: [],
        suggestedQuestion: null,
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

    // Check if the user typed a valid 10-digit Vietnamese phone number inside their chat message
    const detectedPhone = phoneAnalysis.validPhone || visitorPhone || null;

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

    // 6. Compute smart contextual suggested follow-up question
    const suggestedQuestion = getSmartSuggestedQuestion(cleanMsg, history, botReply, detectedPhone);

    // 7. Save chat log to Project Chị Vân's web_chat_logs & Telegram Lead Alert in parallel
    const sideEffectTasks = [];

    // Always log directly to Project Chị Vân's web_chat_logs table
    sideEffectTasks.push(
      logToChiVanChatLogs({
        sessionId,
        visitorName,
        visitorPhone: detectedPhone || visitorPhone,
        cleanMsg,
        botReply,
        matchedVideoCodes,
        pageUrl,
      })
    );

    // ONLY send notification to Telegram & record in web_leads if client left their phone number!
    if (detectedPhone) {
      const testLead = isTestChatLead({
        isTest,
        testMode,
        sessionId,
        visitorName,
        phone: detectedPhone,
        message: cleanMsg,
        history,
      });

      const leadSummary = await summaryPromise;
      const safeSummary = leadSummary
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      const headerTitle = testLead
        ? `🧪 <b>[TEST CHATBOT - CHỈ GỬI RIÊNG CHO ANDY]</b>`
        : `🎯 <b>CÓ LEAD SĐT MỚI TỪ WEB KHÁNH VÂN!</b>`;

      const tgText =
        `${headerTitle}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📞 <b>SĐT / Zalo:</b> <code>${detectedPhone}</code>\n` +
        (visitorName ? `👤 <b>Họ tên:</b> ${visitorName}\n` : '') +
        `⏰ <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}\n\n` +
        `📋 <b>Tóm tắt chi tiết nhu cầu khách hàng:</b>\n` +
        `${safeSummary}`;

      sideEffectTasks.push(sendTelegramNotification(tgText, testLead));

      // Also save real leads cleanly into web_leads table (skip test leads so Chị Vân's DB stays clean)
      if (!testLead) {
        sideEffectTasks.push(
          saveLeadFromChatToChiVanDb({
            sessionId,
            fullName: visitorName,
            phone: detectedPhone,
            topic: 'Tư vấn giải pháp tài chính qua Chatbot',
            note: safeSummary,
            source: 'chatbot',
            telegramNotified: true,
          })
        );
      }
    }

    if (sideEffectTasks.length > 0) {
      await Promise.race([
        Promise.allSettled(sideEffectTasks),
        new Promise((resolve) => setTimeout(resolve, 5000)),
      ]);
    }

    return res.status(200).json({
      reply: botReply,
      matchedVideos: matchedVideoCodes,
      suggestedQuestion: suggestedQuestion || null,
      detectedPhone: detectedPhone || null,
    });
  } catch (err) {
    console.error('Chat API error:', err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}
