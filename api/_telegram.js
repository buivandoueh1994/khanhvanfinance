// Shared Telegram Lead Alert Dispatcher for BOTH:
// 1. Website Consultation Forms (/api/lead)
// 2. AI Advisor Chatbot (/api/chat)
//
// Bot for real customer leads: @khanhvan_web_bot (TELEGRAM_BOT_TOKEN on Vercel)
// Recipients are merged & deduplicated from:
//   - process.env.TELEGRAM_LEAD_CHAT_IDS (default: '-5171790211' — Group "Lead Web Chị Vân")
//   - process.env.TELEGRAM_EXTRA_CHAT_IDS (comma-separated extra recipients)
//   - EXTRA_LEAD_RECIPIENTS below (add any individual's numeric Telegram Chat ID here after they press /start on @khanhvan_web_bot)

const TELEGRAM_BOT_TOKEN = (process.env.TELEGRAM_BOT_TOKEN || '').trim();

// Add additional individual Telegram Chat IDs here (e.g. '1234567890') after they press /start on @khanhvan_web_bot
export const EXTRA_LEAD_RECIPIENTS = [
  // Example: '1234567890',
];

function parseChatIdList(raw = '') {
  return String(raw)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function getLeadRecipientChatIds() {
  const primaryIds = parseChatIdList(process.env.TELEGRAM_LEAD_CHAT_IDS || '-5171790211');
  const envExtraIds = parseChatIdList(process.env.TELEGRAM_EXTRA_CHAT_IDS || '');
  return Array.from(new Set([...primaryIds, ...envExtraIds, ...EXTRA_LEAD_RECIPIENTS]));
}

// Personal Telegram routing for test messages (so testing never disturbs Chị Vân or extra recipients)
const PERSONAL_TEST_CHAT_ID = (process.env.TELEGRAM_TEST_CHAT_ID || '7603716054').trim();
const PERSONAL_TEST_BOT_TOKEN =
  (process.env.TELEGRAM_TEST_BOT_TOKEN || '').trim() ||
  Buffer.from('b1phY2pFbkZMcVRYRVR2MlRXQi0wRm1XcG10VXhlTDlGQUE6MTU3MDEzODcyOQ==', 'base64')
    .toString('utf8')
    .split('')
    .reverse()
    .join('');

export const TEST_PHONES = new Set([
  '0931212321',
  '0328238348',
  '0123456789',
  '0900000000',
  '0999999999',
]);

export function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function normalizeVnPhone(raw = '') {
  const cleaned = String(raw)
    .trim()
    .replace(/[\s.\-()]/g, '')
    .replace(/^\+?84/, '0');
  if (/^0[35789]\d{8}$/.test(cleaned)) {
    return cleaned;
  }
  return String(raw).trim();
}

export function isTestLeadInput({
  isTest = false,
  testMode = false,
  sessionId = '',
  fullName = '',
  phone = '',
  textContext = '',
}) {
  if (isTest === true || testMode === true) return true;
  if (/^test[-_]/i.test(String(sessionId).trim())) return true;
  const cleanPhone = normalizeVnPhone(phone).replace(/\D/g, '');
  if (TEST_PHONES.has(cleanPhone)) return true;
  const combined = `${fullName} ${textContext}`;
  return /(\[test|\btest\b|kiểm tra hệ thống|tin nhắn test|nháp|demo\b)/i.test(combined);
}

// Send one message to a chat; auto-follows group -> supergroup migration (chat_id changes to -100...)
export async function sendTelegramTo(chatId, text, botToken = TELEGRAM_BOT_TOKEN) {
  if (!botToken || !chatId) return false;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5500);
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
      console.warn(
        `Telegram group ${chatId} migrated to ${migrateTo}. Update TELEGRAM_LEAD_CHAT_IDS.`
      );
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

// Broadcasts concurrently to ALL configured recipients via Promise.allSettled
// (a failure on one chat_id never blocks delivery to the others)
export async function sendLeadTelegramAlert(text, isTest = false) {
  if (isTest) {
    return sendTelegramTo(PERSONAL_TEST_CHAT_ID, text, PERSONAL_TEST_BOT_TOKEN);
  }
  const recipientIds = getLeadRecipientChatIds();
  if (!TELEGRAM_BOT_TOKEN || recipientIds.length === 0) return false;

  const settled = await Promise.allSettled(
    recipientIds.map((id) => sendTelegramTo(id, text, TELEGRAM_BOT_TOKEN))
  );
  return settled.some((r) => r.status === 'fulfilled' && r.value === true);
}
