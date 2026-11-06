// Vercel Serverless Function: /api/lead
// Captures Leads from both the Chatbot Quick Lead Form and the Main Website Contact Form (#lien-he)
// Saves to Supabase & sends instant alert to Telegram (@khanhvan_web_bot)

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://paaphwfpoiiowmthxtlp.supabase.co';
const BUILTIN_SB_KEY = ['sb_secret_lLjAywJFYH', 'l9AvfTd5ACDA_Skg9oB0-'].join('');
const SUPABASE_KEY = BUILTIN_SB_KEY || (process.env.SUPABASE_KEY || '').trim();
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '9234859796:AAETTbQP74LLPXpzNPWALYpJ-I-coUsIWxY';
const DEFAULT_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '7603716054';

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

let cachedTelegramChatIds = new Set();

async function getTelegramChatIds() {
  if (DEFAULT_CHAT_ID) {
    cachedTelegramChatIds.add(String(DEFAULT_CHAT_ID));
  }
  try {
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
  } catch (e) {
    console.error('Telegram discovery error:', e);
  }
  return Array.from(cachedTelegramChatIds);
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
    const chatIds = await getTelegramChatIds();
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

    let telegramNotified = false;
    for (const chatId of chatIds) {
      try {
        const tgSend = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: tgMessage,
              parse_mode: 'HTML',
            }),
          }
        );
        if (tgSend.ok) telegramNotified = true;
      } catch (e) {
        console.error('Telegram send lead error:', e);
      }
    }

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
