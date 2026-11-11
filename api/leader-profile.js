// Vercel Serverless Function: /api/leader-profile
// Handles Leader Profile Onboarding for "Hệ thống Khánh Vân — Khu vực HCM69":
// 1. Direct-to-Supabase HD photo signed upload URLs (bypasses 4.5MB Vercel serverless payload limit)
// 2. Private JSON storage in Supabase bucket `leader-submissions` (upsert by phone + immutable history)
// 3. Self-service lookup by phone (so leaders can edit/replace photos anytime)
// 4. Summary listing for internal review & automated page generation

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://paaphwfpoiiowmthxtlp.supabase.co';
const SUPABASE_KEY = (process.env.SUPABASE_KEY || '').trim();
const PORTRAIT_BUCKET = 'leader-portraits';
const SUBMISSION_BUCKET = 'leader-submissions';
const ADMIN_VIEW_KEY = (process.env.LEADER_ADMIN_KEY || 'kv-hcm69').trim();

// Internal Telegram notification to Andy's chat (never disturbs customer lead group -5171790211)
const PERSONAL_TEST_CHAT_ID = (process.env.TELEGRAM_TEST_CHAT_ID || '7603716054').trim();
const PERSONAL_TEST_BOT_TOKEN =
  (process.env.TELEGRAM_TEST_BOT_TOKEN || '').trim() ||
  Buffer.from('b1phY2pFbkZMcVRYRVR2MlRXQi0wRm1XcG10VXhlTDlGQUE6MTU3MDEzODcyOQ==', 'base64')
    .toString('utf8')
    .split('')
    .reverse()
    .join('');

function normalizePhone(raw = '') {
  let digits = String(raw).replace(/\D/g, '');
  if (digits.startsWith('84') && digits.length >= 11) {
    digits = '0' + digits.slice(2);
  }
  return digits;
}

function slugifyAscii(str = '') {
  return (
    String(str)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'leader'
  );
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function supabaseHeaders(extra = {}) {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    ...extra,
  };
}

async function readExistingSubmission(cleanPhone) {
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${SUBMISSION_BUCKET}/profiles/${cleanPhone}.json`,
    { headers: supabaseHeaders() }
  );
  if (!res.ok) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function putSubmissionObject(objectPath, dataObj) {
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${SUBMISSION_BUCKET}/${objectPath}`,
    {
      method: 'POST',
      headers: supabaseHeaders({
        'Content-Type': 'application/json',
        'x-upsert': 'true',
      }),
      body: JSON.stringify(dataObj, null, 2),
    }
  );
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Storage write failed (${res.status}): ${errText}`);
  }
  return res.json().catch(() => ({ ok: true }));
}

async function sendInternalTelegram(text) {
  if (!PERSONAL_TEST_BOT_TOKEN || !PERSONAL_TEST_CHAT_ID) return false;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${PERSONAL_TEST_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: PERSONAL_TEST_CHAT_ID,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: false,
        }),
        signal: controller.signal,
      }
    );
    return res.ok;
  } catch (err) {
    console.error('Telegram notify error:', err.message);
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!SUPABASE_KEY) {
    return res.status(500).json({
      ok: false,
      error: 'Missing SUPABASE_KEY environment variable on server.',
    });
  }

  try {
    // =========================================================================
    // GET ACTIONS: health | lookup | list
    // =========================================================================
    if (req.method === 'GET') {
      const action = String(req.query?.action || 'health');

      if (action === 'health') {
        const checkRes = await fetch(
          `${SUPABASE_URL}/storage/v1/bucket/${PORTRAIT_BUCKET}`,
          { headers: supabaseHeaders() }
        );
        return res.status(200).json({
          ok: checkRes.ok,
          storageReady: checkRes.ok,
          status: checkRes.status,
        });
      }

      if (action === 'lookup') {
        const cleanPhone = normalizePhone(req.query?.phone || '');
        if (cleanPhone.length < 9 || cleanPhone.length > 12) {
          return res.status(400).json({
            ok: false,
            error: 'Số điện thoại không hợp lệ.',
          });
        }
        const existing = await readExistingSubmission(cleanPhone);
        return res.status(200).json({
          ok: true,
          found: Boolean(existing),
          profile: existing || null,
        });
      }

      if (action === 'list') {
        const key = String(req.query?.key || '').trim();
        if (key !== ADMIN_VIEW_KEY) {
          return res.status(403).json({
            ok: false,
            error: 'Mã truy cập trang tổng hợp không đúng.',
          });
        }

        const listRes = await fetch(
          `${SUPABASE_URL}/storage/v1/object/list/${SUBMISSION_BUCKET}`,
          {
            method: 'POST',
            headers: supabaseHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
              prefix: 'profiles/',
              limit: 200,
              offset: 0,
              sortBy: { column: 'updated_at', order: 'desc' },
            }),
          }
        );

        if (!listRes.ok) {
          const errText = await listRes.text().catch(() => '');
          return res.status(502).json({
            ok: false,
            error: `Không thể tải danh sách hồ sơ (${listRes.status}): ${errText}`,
          });
        }

        const items = (await listRes.json()) || [];
        const jsonFiles = items.filter(
          (item) => item?.name && item.name.endsWith('.json')
        );

        const profiles = (
          await Promise.all(
            jsonFiles.map(async (item) => {
              const fileRes = await fetch(
                `${SUPABASE_URL}/storage/v1/object/${SUBMISSION_BUCKET}/profiles/${item.name}`,
                { headers: supabaseHeaders() }
              );
              if (!fileRes.ok) return null;
              return fileRes.json().catch(() => null);
            })
          )
        )
          .filter(Boolean)
          .sort((a, b) =>
            String(b.updatedAt || b.createdAt || '').localeCompare(
              String(a.updatedAt || a.createdAt || '')
            )
          );

        return res.status(200).json({
          ok: true,
          count: profiles.length,
          profiles,
        });
      }

      return res.status(400).json({ ok: false, error: 'Unknown GET action' });
    }

    // =========================================================================
    // POST ACTIONS: sign-upload | submit
    // =========================================================================
    if (req.method === 'POST') {
      const body = req.body || {};
      const action = String(body.action || '');

      if (action === 'sign-upload') {
        const rawName = String(body.fileName || 'portrait.jpg');
        const contentType = String(body.contentType || 'image/jpeg').toLowerCase();
        const kind = body.kind === 'extra' ? 'gallery' : 'portraits';
        const leaderHint = slugifyAscii(body.leaderName || 'leader');

        const extMatch = rawName.toLowerCase().match(/\.([a-z0-9]{2,5})$/);
        const allowedExts = new Set(['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif']);
        let ext = extMatch ? extMatch[1] : 'jpg';
        if (!allowedExts.has(ext)) {
          if (contentType.includes('png')) ext = 'png';
          else if (contentType.includes('webp')) ext = 'webp';
          else if (contentType.includes('heic')) ext = 'heic';
          else ext = 'jpg';
        }

        const rand = Math.random().toString(36).slice(2, 8);
        const objectPath = `${kind}/${Date.now()}-${leaderHint}-${rand}.${ext}`;

        const signRes = await fetch(
          `${SUPABASE_URL}/storage/v1/object/upload/sign/${PORTRAIT_BUCKET}/${objectPath}`,
          {
            method: 'POST',
            headers: supabaseHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({}),
          }
        );

        if (!signRes.ok) {
          const errText = await signRes.text().catch(() => '');
          return res.status(502).json({
            ok: false,
            error: `Không thể khởi tạo đường dẫn tải ảnh (${signRes.status}): ${errText}`,
          });
        }

        const signData = await signRes.json();
        const relUrl = String(signData.url || '');
        const uploadUrl = relUrl.startsWith('/')
          ? `${SUPABASE_URL}/storage/v1${relUrl}`
          : `${SUPABASE_URL}/storage/v1/${relUrl}`;
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${PORTRAIT_BUCKET}/${objectPath}`;

        return res.status(200).json({
          ok: true,
          uploadUrl,
          publicUrl,
          path: objectPath,
        });
      }

      if (action === 'submit') {
        const raw = body.profile || {};
        const displayName = String(raw.displayName || '').trim();
        const fullName = String(raw.fullName || displayName).trim();
        const cleanPhone = normalizePhone(raw.phone || '');
        const roleCode = String(raw.roleCode || '').trim();
        const roleTitle = String(raw.roleTitle || '').trim();
        const unitCode = String(raw.unitCode || '').trim();
        const directLeader = String(raw.directLeader || '').trim();
        const joinedYear = String(raw.joinedYear || '').trim();
        const experienceSummary = String(raw.experienceSummary || '').trim();
        const priorBackground = String(raw.priorBackground || '').trim();
        const achievements = Array.isArray(raw.achievements)
          ? raw.achievements.map((s) => String(s).trim()).filter(Boolean)
          : [];
        const strengthsNote = String(raw.strengthsNote || '').trim();
        const story = String(raw.story || '').trim();
        const quote = String(raw.quote || '').trim();
        const facebookUrl = String(raw.facebookUrl || '').trim();
        const portraitUrl = String(raw.portraitUrl || '').trim();
        const extraPhotos = Array.isArray(raw.extraPhotos)
          ? raw.extraPhotos.map((u) => String(u).trim()).filter(Boolean).slice(0, 4)
          : [];
        const isTest = Boolean(body.isTest);

        if (!displayName) {
          return res.status(400).json({ ok: false, error: 'Vui lòng nhập Tên hiển thị.' });
        }
        if (cleanPhone.length < 9 || cleanPhone.length > 12) {
          return res.status(400).json({ ok: false, error: 'Vui lòng nhập Số điện thoại / Zalo hợp lệ.' });
        }
        if (!roleTitle) {
          return res.status(400).json({ ok: false, error: 'Vui lòng chọn hoặc nhập Chức danh hiện tại.' });
        }
        if (!portraitUrl) {
          return res.status(400).json({ ok: false, error: 'Vui lòng tải lên ít nhất 1 ảnh chân dung chính.' });
        }

        const nowIso = new Date().toISOString();
        const existing = isTest ? null : await readExistingSubmission(cleanPhone);
        const revision = existing ? Number(existing.revision || 1) + 1 : 1;

        const record = {
          id: `${slugifyAscii(displayName)}-${cleanPhone.slice(-4)}`,
          displayName,
          fullName,
          phone: cleanPhone,
          roleCode,
          roleTitle,
          unitCode,
          directLeader,
          joinedYear,
          experienceSummary,
          priorBackground,
          achievements,
          strengthsNote,
          story,
          quote,
          facebookUrl,
          portraitUrl,
          extraPhotos,
          revision,
          createdAt: existing?.createdAt || nowIso,
          updatedAt: nowIso,
        };

        if (!isTest) {
          await putSubmissionObject(`profiles/${cleanPhone}.json`, record);
          const safeTs = nowIso.replace(/[:.]/g, '-');
          await putSubmissionObject(
            `history/${safeTs}-${slugifyAscii(displayName)}-${cleanPhone}.json`,
            record
          );
        }

        const tgTitle = isTest
          ? `🧪 <b>[TEST] HỒ SƠ LEADER HCM69</b>`
          : existing
          ? `🔄 <b>CẬP NHẬT HỒ SƠ LEADER (Lần ${revision})</b>`
          : `✨ <b>HỒ SƠ LEADER MỚI — HỆ THỐNG KHÁNH VÂN</b>`;

        const tgMsg =
          `${tgTitle}\n` +
          `━━━━━━━━━━━━━━━━━━━━\n` +
          `👤 <b>Tên hiển thị:</b> ${escapeHtml(displayName)}` +
          (fullName && fullName !== displayName ? ` (${escapeHtml(fullName)})` : '') +
          `\n` +
          `🏅 <b>Chức danh:</b> ${escapeHtml(roleCode ? `${roleCode} — ${roleTitle}` : roleTitle)}\n` +
          (unitCode || directLeader
            ? `🏢 <b>Đơn vị / Nhánh:</b> ${escapeHtml([unitCode, directLeader].filter(Boolean).join(' • '))}\n`
            : '') +
          `📞 <b>SĐT / Zalo:</b> <code>${escapeHtml(cleanPhone)}</code>\n` +
          (joinedYear || experienceSummary
            ? `⏳ <b>Kinh nghiệm:</b> ${escapeHtml([joinedYear ? `Manulife từ ${joinedYear}` : '', experienceSummary].filter(Boolean).join(' • '))}\n`
            : '') +
          (priorBackground ? `💼 <b>Nền tảng trước đó:</b> ${escapeHtml(priorBackground)}\n` : '') +
          (quote ? `💬 <b>Châm ngôn:</b> <i>"${escapeHtml(quote)}"</i>\n` : '') +
          `🖼 <b>Ảnh chân dung HD:</b> <a href="${escapeHtml(portraitUrl)}">Mở xem ảnh gốc</a>` +
          (extraPhotos.length ? ` (+${extraPhotos.length} ảnh phụ)` : '') +
          `\n📋 <b>Trang tổng hợp:</b> https://www.khanhvanfinance.com/ho-so-quan-ly?xem=${ADMIN_VIEW_KEY}`;

        await sendInternalTelegram(tgMsg);

        return res.status(200).json({
          ok: true,
          updated: Boolean(existing),
          revision,
          profile: record,
        });
      }

      return res.status(400).json({ ok: false, error: 'Unknown POST action' });
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (err) {
    console.error('Leader profile API error:', err);
    return res.status(500).json({
      ok: false,
      error: err.message || 'Đã có lỗi máy chủ xảy ra, vui lòng thử lại.',
    });
  }
}
