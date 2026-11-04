// Vercel Serverless Function: /api/lead
// Captures Leads from both the Chatbot Quick Lead Form and the Main Website Contact Form (#lien-he)
// Saves to Supabase & sends instant alert to Telegram (@khanhvan_web_bot)

const SUPABASE_URL = 'https://paaphwfpoiiowmthxtlp.supabase.co';
const SUPABASE_KEY = 'sb_secret_R8Nwj96LVpDPfeDFvEbpXg_wGrNt3wS';
const LOGS_DB_URL = 'https://lmnrvfuleaoknkegtuku.supabase.co';
const LOGS_DB_KEY = 'sb_secret_x815XOTM2TqMCJfYSNYwaA_bm-sS61r';
const TELEGRAM_BOT_TOKEN = '9234859796:AAETTbQP74LLPXpzNPWALYpJ-I-coUsIWxY';

let cachedTelegramChatIds = new Set();

async function getTelegramChatIds() {
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
    await Promise.allSettled([
      fetch(`${SUPABASE_URL}/rest/v1/post_history`, {
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
          post_mode: source,
        }),
      }),
      fetch(`${LOGS_DB_URL}/rest/v1/web_leads`, {
        method: 'POST',
        headers: {
          apikey: LOGS_DB_KEY,
          Authorization: `Bearer ${LOGS_DB_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId || null,
          full_name: fullName,
          phone,
          email: email || null,
          topic,
          background: background || null,
          note: note || null,
          source,
          telegram_notified: telegramNotified,
        }),
      }),
    ]);

    return res.status(200).json({
      ok: true,
      telegramNotified,
    });
  } catch (err) {
    console.error('Lead API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
