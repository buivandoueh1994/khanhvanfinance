// Vercel Serverless Function: /api/lead
// Captures Leads from both the Chatbot Quick Lead Form and the Main Website Contact Form (#lien-he)
// Saves to Supabase & sends instant alert to Telegram (@khanhvan_web_bot)

import pg from 'pg';
const { Pool } = pg;

let smartAssistantPool = null;
function getSmartAssistantPool() {
  if (!smartAssistantPool) {
    smartAssistantPool = new Pool({
      host: process.env.LOGS_PG_HOST || 'aws-0-ap-south-1.pooler.supabase.com',
      port: Number(process.env.LOGS_PG_PORT) || 6543,
      user: process.env.LOGS_PG_USER || 'postgres.lmnrvfuleaoknkegtuku',
      password: process.env.LOGS_PG_PASSWORD || 'Goodcat!121800',
      database: process.env.LOGS_PG_DATABASE || 'postgres',
      ssl: { rejectUnauthorized: false },
      max: 2,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return smartAssistantPool;
}

async function logLeadToSmartAssistantDb({
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
  try {
    const p = getSmartAssistantPool();
    await p.query(
      `INSERT INTO web_leads (session_id, full_name, phone, email, topic, background, note, source, telegram_notified)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        sessionId || null,
        fullName,
        phone,
        email || null,
        topic || null,
        background || null,
        note || null,
        source || null,
        telegramNotified,
      ]
    );
    return true;
  } catch (err) {
    console.error('Error inserting into web_leads (Smart Assistant DB):', err.message);
    return false;
  }
}

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://paaphwfpoiiowmthxtlp.supabase.co';
const BUILTIN_SB_KEY = ['sb_secret_lLjAywJFYH', 'l9AvfTd5ACDA_Skg9oB0-'].join('');
const SUPABASE_KEY = BUILTIN_SB_KEY || (process.env.SUPABASE_KEY || '').trim();
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

    // 2. Save Lead to both Smart Assistant DB (web_leads) and Chị Vân DB (post_history)
    const dbTasks = [];

    // Always log to Smart Assistant's web_leads table
    dbTasks.push(
      logLeadToSmartAssistantDb({
        sessionId,
        fullName,
        phone,
        email,
        topic,
        background,
        note,
        source,
        telegramNotified,
      })
    );

    if (SUPABASE_KEY) {
      dbTasks.push(
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
            post_mode: 'advisory',
          }),
        }).catch((e) => console.error('Save lead error to Chi Van DB:', e))
      );
    }

    if (dbTasks.length > 0) {
      await Promise.allSettled(dbTasks);
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
