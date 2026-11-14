// Vercel Serverless Function: /api/lead
// Captures Leads from all Website Consultation Registration Forms (#lien-he, #dong-hanh, Article/Video CTAs, etc.)
// Saves to Supabase (web_leads) & broadcasts instant alert to all configured Telegram recipients (@khanhvan_web_bot)

import {
  escapeHtml,
  isTestLeadInput,
  normalizeVnPhone,
  sendLeadTelegramAlert,
} from './_telegram.js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://paaphwfpoiiowmthxtlp.supabase.co';
// All secrets are read from Vercel Environment Variables only (never hardcode keys in this public repo)
const SUPABASE_KEY = (process.env.SUPABASE_KEY || '').trim();

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
      source = 'contact_form',
      entryPoint = '',
      pageUrl = '',
      isTest = false,
      testMode = false,
    } = req.body || {};

    const cleanName = String(fullName || '').trim();
    const cleanPhone = normalizeVnPhone(phone);
    const cleanEmail = String(email || '').trim();
    const cleanNote = String(note || '').trim();
    const cleanEntryPoint = String(entryPoint || '').trim();

    if (!cleanPhone && !cleanName) {
      return res.status(400).json({ error: 'Missing required lead fields' });
    }

    const testLead = isTestLeadInput({
      isTest,
      testMode,
      sessionId,
      fullName: cleanName,
      phone: cleanPhone,
      textContext: `${topic} ${cleanNote}`,
    });

    const sourceLabel = cleanEntryPoint
      ? `Form Tư Vấn Web (${cleanEntryPoint})`
      : source === 'chatbot'
      ? 'Chatbot Trợ Lý AI'
      : 'Form Đăng Ký Tư Vấn Trên Web (#lien-he)';

    const zaloDigits = cleanPhone.replace(/\D/g, '');
    const zaloLinkHtml =
      /^0\d{9}$/.test(zaloDigits)
        ? ` • <a href="https://zalo.me/${zaloDigits}">Mở Zalo kết bạn</a>`
        : '';

    // 1. Broadcast Telegram Alert concurrently to all configured recipients
    // (Test leads -> Andy's personal Telegram only; Real leads -> all configured recipients)
    const headerTitle = testLead
      ? `🧪 <b>[TEST FORM WEB - CHỈ GỬI RIÊNG CHO ANDY]</b>`
      : `📋 <b>CÓ ĐĂNG KÝ TƯ VẤN MỚI TỪ FORM WEBSITE!</b>`;

    const tgMessage =
      `${headerTitle}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 <b>Họ và tên:</b> ${escapeHtml(cleanName || 'Chưa điền')}\n` +
      `📞 <b>SĐT / Zalo:</b> <code>${escapeHtml(cleanPhone)}</code>${zaloLinkHtml}\n` +
      (cleanEmail ? `✉️ <b>Email:</b> ${escapeHtml(cleanEmail)}\n` : '') +
      `📌 <b>Chủ đề quan tâm:</b> ${escapeHtml(topic)}\n` +
      (background ? `💼 <b>Lĩnh vực:</b> ${escapeHtml(background)}\n` : '') +
      (cleanNote ? `📝 <b>Lời nhắn:</b> ${escapeHtml(cleanNote)}\n` : '') +
      `📍 <b>Nguồn:</b> ${escapeHtml(sourceLabel)}\n` +
      (pageUrl ? `🔗 <b>Trang gửi:</b> ${escapeHtml(pageUrl)}\n` : '') +
      `⏰ <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`;

    const telegramNotified = await sendLeadTelegramAlert(tgMessage, testLead);

    // 2. Save real customer leads to Project Chị Vân's web_leads table (skip test leads to keep DB clean)
    if (!testLead) {
      const dbNote = [
        cleanEntryPoint ? `[Nguồn: ${cleanEntryPoint}]` : '',
        cleanNote,
      ]
        .filter(Boolean)
        .join(' ');

      await logLeadToChiVanDb({
        sessionId,
        fullName: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        topic,
        background,
        note: dbNote,
        source: source || 'contact_form',
        telegramNotified,
      });
    }

    return res.status(200).json({
      ok: true,
      telegramNotified,
      testMode: testLead,
    });
  } catch (err) {
    console.error('Lead API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
