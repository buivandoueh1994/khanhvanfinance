// Vercel Serverless Function: /api/lead
// Captures Leads from both the Chatbot Quick Lead Form and the Main Website Contact Form (#lien-he)
// Saves to Supabase & sends instant alert to Telegram (@khanhvan_web_bot)

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://paaphwfpoiiowmthxtlp.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '9234859796:AAETTbQP74LLPXpzNPWALYpJ-I-coUsIWxY';
const DEFAULT_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '7603716054';

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

    if (SUPABASE_KEY) {
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

    // 2. Save Lead to Chị Vân's Supabase DB (`paaphwfpoiiowmthxtlp`)
    if (SUPABASE_KEY) {
      await fetch(`${SUPABASE_URL}/rest/v1/post_history`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_slug: 'khanh-van-lead',
          topic_key: `${phone}-${Date.now()}`,
          category: 'WEB_LEAD',
          angle_summary: `${fullName} | ${phone} | ${topic}`,
          facebook_post: note || topic,
          website_article: JSON.stringify({
            fullName,
            phone,
            email,
            topic,
            background,
            note,
            source,
            telegramNotified,
          }),
          post_mode: 'advisory',
        }),
      }).catch((e) => console.error('Save lead error:', e));
    }

    return res.status(200).json({
      ok: true,
      telegramNotified,
    });
  } catch (err) {
    console.error('Lead API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
