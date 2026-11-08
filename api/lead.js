// Vercel Serverless Function: /api/lead
// Captures Leads from both the Chatbot Quick Lead Form and the Main Website Contact Form (#lien-he)
// Saves to Supabase & sends instant alert to Telegram (@khanhvan_web_bot)

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://paaphwfpoiiowmthxtlp.supabase.co';
// All secrets are read from Vercel Environment Variables only (never hardcode keys in this public repo)
const SUPABASE_KEY = (process.env.SUPABASE_KEY || '').trim();
const TELEGRAM_BOT_TOKEN = (process.env.TELEGRAM_BOT_TOKEN || '').trim();
// Lead alerts go to the shared Telegram group "Lead Web Chị Vân" (Andy + Chị Khánh Vân + team).
// Override with env TELEGRAM_LEAD_CHAT_IDS (comma-separated) if the group ever changes.
const LEAD_CHAT_IDS = (process.env.TELEGRAM_LEAD_CHAT_IDS || '-5171790211')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

// Log directly into Project Chị Vân's dedicated web_leads table (https://paaphwfpoiiowmthxtlp.supabase.co)
async function logLeadToChiVanDb({
  sessionId = '',
  fullName = '',
  phone = '',
  email = '',
  topic = '',
  background = '',
  note = '',
  source = '',
  telegramNotified = false,
}) {
  if (!SUPABASE_KEY) return false;
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
        full_name: fullName,
        phone,
        email: email || null,
        topic: topic || null,
        background: background || null,
        note: note || null,
        source: source || null,
        telegram_notified: telegramNotified,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('Error inserting into web_leads (Chi Van DB):', err.message);
    return false;
  }
}

// Send one message to a chat; auto-follows group -> supergroup migration (chat_id changes to -100...)
async function sendTelegramTo(chatId, text) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
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
      return sendTelegramTo(migrateTo, text);
    }
    console.error('Telegram send lead failed:', chatId, data?.description);
    return false;
  } catch (e) {
    console.error('Telegram send lead error:', chatId, e.message);
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

export default async function handler(req, res) {
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
      sessionId = '',
      fullName = '',
      phone = '',
      email = '',
      topic = 'Tham vấn 1-1 cùng Khánh Vân',
      background = '',
      note = '',
      source = 'chatbot',
    } = req.body || {};

    if (!phone && !fullName) {
      return res.status(400).json({ error: 'Missing required lead fields' });
    }

    // 1. Send Telegram Alert
    const tgMessage =
      `🎯 <b>CÓ LEAD MỚI TỪ WEBSITE KHÁNH VÂN!</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 <b>Họ và tên:</b> ${fullName || 'Chưa điền'}\n` +
      `📞 <b>SĐT / Zalo:</b> <code>${phone}</code>\n` +
      (email ? `✉️ <b>Email:</b> ${email}\n` : '') +
      `📌 <b>Chủ đề quan tâm:</b> ${topic}\n` +
      (background ? `💼 <b>Lĩnh vực:</b> ${background}\n` : '') +
      (note ? `📝 <b>Ghi chú:</b> ${note}\n` : '') +
      `📍 <b>Nguồn:</b> ${source === 'contact_form' ? 'Form Liên Hệ Cuối Trang' : 'Chatbot Trợ Lý AI'}\n` +
      `⏰ <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`;

    const sendResults = await Promise.all(
      LEAD_CHAT_IDS.map((chatId) => sendTelegramTo(chatId, tgMessage))
    );
    const telegramNotified = sendResults.some(Boolean);

    // 2. Save Lead directly to Project Chị Vân's web_leads table
    await logLeadToChiVanDb({
      sessionId,
      fullName,
      phone,
      email,
      topic,
      background,
      note,
      source,
      telegramNotified,
    });

    return res.status(200).json({
      ok: true,
      telegramNotified,
    });
  } catch (err) {
    console.error('Lead API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
