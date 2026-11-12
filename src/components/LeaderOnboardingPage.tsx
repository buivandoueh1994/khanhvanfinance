import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Award,
  Camera,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Edit3,
  ExternalLink,
  ImagePlus,
  Loader2,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  UserCheck,
} from 'lucide-react';

interface RoleOption {
  code: string;
  title: string;
  label: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    code: 'PSSM',
    title: 'Giám đốc Kinh doanh Khu vực Cấp cao',
    label: 'PSSM — Giám đốc Kinh doanh Khu vực Cấp cao',
  },
  {
    code: 'SM',
    title: 'Giám đốc Kinh doanh Khu vực',
    label: 'SM — Giám đốc Kinh doanh Khu vực',
  },
  {
    code: 'BM',
    title: 'Trưởng Chi nhánh Kinh doanh',
    label: 'BM — Trưởng Chi nhánh Kinh doanh',
  },
  {
    code: 'SDM',
    title: 'Trưởng Phòng Kinh doanh Cấp cao',
    label: 'SDM — Trưởng Phòng Kinh doanh Cấp cao',
  },
  {
    code: 'DM',
    title: 'Trưởng Phòng Kinh doanh',
    label: 'DM — Trưởng Phòng Kinh doanh',
  },
  {
    code: 'SUM',
    title: 'Trưởng Nhóm Kinh doanh Cấp cao',
    label: 'SUM — Trưởng Nhóm Kinh doanh Cấp cao',
  },
  {
    code: 'UM',
    title: 'Trưởng Nhóm Kinh doanh',
    label: 'UM — Trưởng Nhóm Kinh doanh',
  },
  {
    code: 'OTHER',
    title: '',
    label: 'Chức danh khác (Tự nhập bên dưới)',
  },
];

const UNIT_SUGGESTIONS = ['HCM69', 'MN111', 'SG168', 'SG169'];

const ACHIEVEMENT_CHIPS = [
  'MDRT',
  'COT / TOT',
  'MBA Pro',
  'Quản lý Xuất sắc',
  'Hoạch định Hưu trí & Học vấn',
  'Bảo vệ Trụ cột Gia đình',
  'Chăm sóc Sức khỏe Cao cấp',
  'Xây dựng & Đào tạo Đội ngũ',
];

export interface LeaderProfileData {
  id?: string;
  displayName: string;
  fullName: string;
  phone: string;
  roleCode: string;
  roleTitle: string;
  unitCode: string;
  directLeader: string;
  joinedYear: string;
  experienceSummary: string;
  priorBackground: string;
  achievements: string[];
  strengthsNote: string;
  story: string;
  quote: string;
  facebookUrl: string;
  portraitUrl: string;
  extraPhotos: string[];
  revision?: number;
  createdAt?: string;
  updatedAt?: string;
}

const EMPTY_FORM: LeaderProfileData = {
  displayName: '',
  fullName: '',
  phone: '',
  roleCode: 'DM',
  roleTitle: 'Trưởng Phòng Kinh doanh',
  unitCode: 'HCM69',
  directLeader: 'Chị Khánh Vân (SRD)',
  joinedYear: '',
  experienceSummary: '',
  priorBackground: '',
  achievements: [],
  strengthsNote: '',
  story: '',
  quote: '',
  facebookUrl: '',
  portraitUrl: '',
  extraPhotos: [],
};

const DRAFT_STORAGE_KEY = 'kv_leader_form_draft_v1';

async function uploadImageDirectOnce(
  file: File,
  kind: 'portrait' | 'extra',
  leaderName: string
): Promise<string> {
  const signRes = await fetch('/api/leader-profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'sign-upload',
      fileName: file.name,
      contentType: file.type || 'image/jpeg',
      kind,
      leaderName,
    }),
  });

  const signData = await signRes.json().catch(() => ({}));
  if (!signRes.ok || !signData.ok || !signData.uploadUrl) {
    throw new Error(
      signData.error || 'Không thể khởi tạo đường dẫn tải ảnh. Vui lòng thử lại.'
    );
  }

  const putRes = await fetch(signData.uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  });

  if (!putRes.ok) {
    throw new Error('Tải ảnh lên máy chủ chưa thành công. Bạn vui lòng kiểm tra mạng và thử lại nhé.');
  }

  return String(signData.publicUrl);
}

async function uploadImageDirect(
  file: File,
  kind: 'portrait' | 'extra',
  leaderName: string
): Promise<string> {
  try {
    return await uploadImageDirectOnce(file, kind, leaderName);
  } catch {
    // Automatic 1x retry for flaky mobile/Zalo 4G network
    await new Promise((r) => setTimeout(r, 800));
    return uploadImageDirectOnce(file, kind, leaderName);
  }
}

// ============================================================================
// EDITORIAL LEADER PREVIEW CARD (Shared between Confirmation & Admin View)
// ============================================================================
const LeaderPreviewCard: React.FC<{ profile: LeaderProfileData }> = ({ profile }) => {
  return (
    <div className="bg-white border border-[#DCD8CE] rounded-[4px] overflow-hidden shadow-[0_18px_45px_-22px_rgba(10,54,34,0.22)]">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="sm:col-span-5 bg-[#F2EFE9] relative aspect-[3/4] sm:aspect-auto sm:min-h-[340px]">
          {profile.portraitUrl ? (
            <img
              src={profile.portraitUrl}
              alt={profile.displayName}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#858E89] text-xs">
              Chưa có ảnh chân dung
            </div>
          )}
          {profile.unitCode && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#0A3622]/90 backdrop-blur-xs text-[#FAF9F5] text-[10px] uppercase tracking-[0.2em] font-medium rounded-[2px]">
              {profile.unitCode}
            </span>
          )}
        </div>

        <div className="sm:col-span-7 p-5 sm:p-7 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {profile.roleCode && profile.roleCode !== 'OTHER' && (
                <span className="px-2 py-0.5 bg-[#EBF2EE] text-[#0A3622] text-[10px] font-semibold uppercase tracking-[0.18em] rounded-[2px]">
                  {profile.roleCode}
                </span>
              )}
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#008746] font-medium">
                {profile.roleTitle}
              </span>
            </div>

            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#181F1C] font-medium leading-tight">
                {profile.displayName || 'Tên Hiển Thị'}
              </h3>
              {profile.fullName &&
                profile.fullName.trim().toLowerCase() !==
                  profile.displayName.trim().toLowerCase() && (
                  <p className="text-xs text-[#56605B] mt-0.5">{profile.fullName}</p>
                )}
            </div>

            {(profile.joinedYear || profile.experienceSummary || profile.priorBackground) && (
              <div className="pt-2 border-t border-[#ECE9E0] space-y-1 text-xs text-[#56605B]">
                {(profile.joinedYear || profile.experienceSummary) && (
                  <p>
                    <span className="font-medium text-[#181F1C]">Hành trình: </span>
                    {[
                      profile.joinedYear ? `Gia nhập Manulife ${profile.joinedYear}` : '',
                      profile.experienceSummary,
                    ]
                      .filter(Boolean)
                      .join(' • ')}
                  </p>
                )}
                {profile.priorBackground && (
                  <p>
                    <span className="font-medium text-[#181F1C]">Nền tảng: </span>
                    {profile.priorBackground}
                  </p>
                )}
              </div>
            )}

            {profile.quote && (
              <blockquote className="border-l-2 border-[#B8975A] pl-3.5 py-0.5 font-serif italic text-base sm:text-[17px] text-[#0A3622] leading-snug">
                “{profile.quote.replace(/^[“"']|[”"']$/g, '')}”
              </blockquote>
            )}

            {profile.story && (
              <p className="text-xs sm:text-[13px] text-[#28322D] leading-relaxed whitespace-pre-line line-clamp-5">
                {profile.story}
              </p>
            )}
          </div>

          {(profile.achievements.length > 0 || profile.strengthsNote) && (
            <div className="pt-3 border-t border-[#ECE9E0] space-y-2">
              {profile.achievements.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {profile.achievements.map((ach) => (
                    <span
                      key={ach}
                      className="px-2 py-0.5 bg-[#FAF9F5] border border-[#DCD8CE] text-[10px] text-[#181F1C] rounded-[2px]"
                    >
                      {ach}
                    </span>
                  ))}
                </div>
              )}
              {profile.strengthsNote && (
                <p className="text-[11px] text-[#56605B] leading-relaxed">
                  {profile.strengthsNote}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// ADMIN OVERVIEW DASHBOARD (/ho-so-quan-ly?xem=kv-hcm69)
// ============================================================================
const LeaderAdminDashboard: React.FC<{ initialKey: string }> = ({ initialKey }) => {
  const [adminKey, setAdminKey] = useState(initialKey || 'kv-hcm69');
  const [profiles, setProfiles] = useState<LeaderProfileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedJson, setCopiedJson] = useState(false);

  const fetchList = async (keyToUse: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `/api/leader-profile?action=list&key=${encodeURIComponent(keyToUse)}`
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Không thể tải danh sách hồ sơ.');
      }
      setProfiles(data.profiles || []);
    } catch (err: any) {
      setError(err.message || 'Lỗi kết nối máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList(adminKey);
  }, []);

  const filtered = profiles.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.displayName?.toLowerCase().includes(q) ||
      p.fullName?.toLowerCase().includes(q) ||
      p.phone?.includes(q) ||
      p.roleCode?.toLowerCase().includes(q) ||
      p.unitCode?.toLowerCase().includes(q)
    );
  });

  const handleCopyAllJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(profiles, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#181F1C]">
      <header className="sticky top-0 z-30 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E4E1D8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-1 h-5 bg-[#008746] rounded-full" />
            <div>
              <span className="font-serif text-lg tracking-wide font-semibold text-[#181F1C]">
                KHÁNH VÂN
              </span>
              <span className="hidden sm:inline text-xs text-[#56605B] ml-2">
                • Tổng hợp Hồ sơ Quản lý HCM69
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href="/ho-so-quan-ly"
              className="px-3 py-1.5 text-xs border border-[#DCD8CE] rounded-[2px] hover:border-[#0A3622] transition-colors"
            >
              Mở Form Điền Hồ Sơ
            </a>
            <button
              type="button"
              onClick={() => fetchList(adminKey)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#0A3622] text-white rounded-[2px] hover:bg-[#008746] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Làm mới</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E4E1D8]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#008746] font-medium block mb-1.5">
              BẢNG THEO DÕI NỘI BỘ • KHU VỰC HCM69
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#181F1C]">
              Danh sách Hồ sơ Quản lý đã gửi ({profiles.length})
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-[#858E89] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên, mã khu vực, SĐT..."
                className="pl-9 pr-3 py-2 text-xs bg-white border border-[#DCD8CE] rounded-[2px] focus:outline-none focus:border-[#0A3622] w-56"
              />
            </div>
            {profiles.length > 0 && (
              <button
                type="button"
                onClick={handleCopyAllJson}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs border border-[#0A3622] text-[#0A3622] bg-white hover:bg-[#EBF2EE] rounded-[2px] font-medium transition-colors"
              >
                {copiedJson ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#008746]" />
                    <span>Đã chép JSON</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Chép JSON ({profiles.length})</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="p-5 bg-white border border-red-200 rounded-[4px] space-y-3">
            <p className="text-sm text-red-700">{error}</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Nhập mã quản trị..."
                className="px-3 py-2 text-xs border border-[#DCD8CE] rounded-[2px]"
              />
              <button
                type="button"
                onClick={() => fetchList(adminKey)}
                className="px-4 py-2 text-xs bg-[#0A3622] text-white rounded-[2px]"
              >
                Xác nhận
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center space-y-3 text-[#56605B]">
            <Loader2 className="w-7 h-7 animate-spin mx-auto text-[#008746]" />
            <p className="text-sm">Đang tải danh sách hồ sơ từ hệ thống...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 px-6 text-center bg-white border border-[#E4E1D8] rounded-[4px] space-y-3">
            <p className="font-serif text-2xl text-[#181F1C]">
              Chưa có hồ sơ nào được gửi
            </p>
            <p className="text-xs sm:text-sm text-[#56605B] max-w-md mx-auto">
              Khi các anh chị Quản lý điền thông tin tại đường dẫn{' '}
              <a
                href="/ho-so-quan-ly"
                className="text-[#008746] underline underline-offset-2 font-medium"
              >
                khanhvanfinance.com/ho-so-quan-ly
              </a>
              , toàn bộ nội dung và ảnh gốc chất lượng cao sẽ tự động hiển thị tại đây.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filtered.map((item) => (
              <div
                key={item.id || item.phone}
                className="space-y-3 bg-[#F2EFE9]/55 p-4 sm:p-6 rounded-[4px] border border-[#E4E1D8]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#56605B]">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-semibold text-[#181F1C]">
                      SĐT/Zalo: {item.phone}
                    </span>
                    {item.directLeader && (
                      <span>• Nhánh trực tiếp: {item.directLeader}</span>
                    )}
                    {item.updatedAt && (
                      <span>
                        • Cập nhật:{' '}
                        {new Date(item.updatedAt).toLocaleString('vi-VN')}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {item.portraitUrl && (
                      <a
                        href={item.portraitUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#0A3622] hover:text-[#008746] font-medium underline underline-offset-2"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Mở ảnh gốc HD</span>
                      </a>
                    )}
                    {item.facebookUrl && (
                      <a
                        href={item.facebookUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#56605B] hover:text-[#0A3622]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Facebook</span>
                      </a>
                    )}
                  </div>
                </div>

                <LeaderPreviewCard profile={item} />

                {item.extraPhotos && item.extraPhotos.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] uppercase tracking-[0.16em] text-[#56605B] block mb-2">
                      Ảnh vinh danh / hoạt động đính kèm ({item.extraPhotos.length})
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {item.extraPhotos.map((url, idx) => (
                        <a
                          key={url}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="w-24 h-24 rounded-[3px] overflow-hidden border border-[#DCD8CE] block bg-white hover:opacity-90"
                          title={`Ảnh bổ sung ${idx + 1}`}
                        >
                          <img
                            src={url}
                            alt={`Ảnh phụ ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// ============================================================================
// MAIN LEADER ONBOARDING FORM PAGE (/ho-so-quan-ly)
// ============================================================================
export const LeaderOnboardingPage: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const adminViewParam = params.get('xem');
  const isAdminRoute =
    window.location.pathname.startsWith('/quan-ly-ho-so-leader') ||
    Boolean(adminViewParam);

  if (isAdminRoute) {
    return (
      <LeaderAdminDashboard
        initialKey={
          adminViewParam && adminViewParam !== 'tong-hop'
            ? adminViewParam
            : 'kv-hcm69'
        }
      />
    );
  }

  const [form, setForm] = useState<LeaderProfileData>(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...EMPTY_FORM, ...parsed };
        }
      }
    } catch {
      // ignore storage access issues in private mode
    }
    return EMPTY_FORM;
  });
  const [selectedRoleCode, setSelectedRoleCode] = useState<string>(() => {
    const matched = ROLE_OPTIONS.find(
      (r) => r.code !== 'OTHER' && r.code === form.roleCode
    );
    return matched ? matched.code : form.roleTitle ? 'OTHER' : 'DM';
  });
  const [customRoleTitle, setCustomRoleTitle] = useState<string>(() => {
    const matched = ROLE_OPTIONS.find(
      (r) => r.code !== 'OTHER' && r.code === form.roleCode
    );
    return matched ? '' : form.roleTitle || '';
  });

  // Auto-save form draft to localStorage so Zalo iOS WebView reloads never lose typed content
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(form));
    } catch {
      // ignore quota/private mode errors
    }
  }, [form]);

  // Lookup existing profile state
  const [showLookup, setShowLookup] = useState(false);
  const [lookupPhone, setLookupPhone] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupMessage, setLookupMessage] = useState('');

  // Upload states
  const [uploadingPortrait, setUploadingPortrait] = useState(false);
  const [uploadingExtra, setUploadingExtra] = useState(false);
  const [localPortraitPreview, setLocalPortraitPreview] = useState<string>('');
  const portraitInputRef = useRef<HTMLInputElement | null>(null);
  const extraInputRef = useRef<HTMLInputElement | null>(null);

  // Submit states
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedProfile, setSubmittedProfile] =
    useState<LeaderProfileData | null>(null);
  const [wasUpdated, setWasUpdated] = useState(false);

  useEffect(() => {
    document.title =
      'Hồ Sơ Đội Ngũ Quản Lý — Hệ Thống Khánh Vân (Manulife HCM69)';
  }, []);

  const updateField = <K extends keyof LeaderProfileData>(
    key: K,
    val: LeaderProfileData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleRoleSelect = (code: string) => {
    setSelectedRoleCode(code);
    const found = ROLE_OPTIONS.find((r) => r.code === code);
    if (code === 'OTHER') {
      setForm((prev) => ({
        ...prev,
        roleCode: '',
        roleTitle: customRoleTitle,
      }));
    } else if (found) {
      setForm((prev) => ({
        ...prev,
        roleCode: found.code,
        roleTitle: found.title,
      }));
    }
  };

  const toggleAchievement = (chip: string) => {
    setForm((prev) => {
      const exists = prev.achievements.includes(chip);
      return {
        ...prev,
        achievements: exists
          ? prev.achievements.filter((c) => c !== chip)
          : [...prev.achievements, chip],
      };
    });
  };

  const handleLookupExisting = async () => {
    if (!lookupPhone.trim()) return;
    setLookupLoading(true);
    setLookupMessage('');
    try {
      const res = await fetch(
        `/api/leader-profile?action=lookup&phone=${encodeURIComponent(lookupPhone.trim())}`
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setLookupMessage(data.error || 'Không thể tra cứu lúc này.');
        return;
      }
      if (!data.found || !data.profile) {
        setLookupMessage(
          'Chưa tìm thấy hồ sơ với số điện thoại này. Bạn có thể điền mới ngay bên dưới nhé!'
        );
        return;
      }
      const p: LeaderProfileData = data.profile;
      const matchedRole = ROLE_OPTIONS.find(
        (r) => r.code !== 'OTHER' && r.code === p.roleCode
      );
      if (matchedRole) {
        setSelectedRoleCode(matchedRole.code);
      } else {
        setSelectedRoleCode('OTHER');
        setCustomRoleTitle(p.roleTitle || '');
      }
      setForm({
        displayName: p.displayName || '',
        fullName: p.fullName || '',
        phone: p.phone || lookupPhone.trim(),
        roleCode: p.roleCode || '',
        roleTitle: p.roleTitle || '',
        unitCode: p.unitCode || 'HCM69',
        directLeader: p.directLeader || '',
        joinedYear: p.joinedYear || '',
        experienceSummary: p.experienceSummary || '',
        priorBackground: p.priorBackground || '',
        achievements: Array.isArray(p.achievements) ? p.achievements : [],
        strengthsNote: p.strengthsNote || '',
        story: p.story || '',
        quote: p.quote || '',
        facebookUrl: p.facebookUrl || '',
        portraitUrl: p.portraitUrl || '',
        extraPhotos: Array.isArray(p.extraPhotos) ? p.extraPhotos : [],
      });
      setLocalPortraitPreview(p.portraitUrl || '');
      setLookupMessage(
        `Đã tải lại hồ sơ của ${p.displayName}! Bạn có thể chỉnh sửa hoặc đổi ảnh mới rồi bấm Lưu nhé.`
      );
    } catch {
      setLookupMessage('Lỗi kết nối mạng khi tra cứu hồ sơ.');
    } finally {
      setLookupLoading(false);
    }
  };

  const handlePortraitChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg('');
    const previewObjUrl = URL.createObjectURL(file);
    setLocalPortraitPreview(previewObjUrl);
    setUploadingPortrait(true);
    try {
      const publicUrl = await uploadImageDirect(
        file,
        'portrait',
        form.displayName || 'leader'
      );
      updateField('portraitUrl', publicUrl);
    } catch (err: any) {
      setErrorMsg(
        err.message || 'Không thể tải ảnh chân dung lên. Vui lòng thử lại.'
      );
      setLocalPortraitPreview(form.portraitUrl || '');
    } finally {
      setUploadingPortrait(false);
      if (portraitInputRef.current) portraitInputRef.current.value = '';
    }
  };

  const handleExtraPhotosChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []).slice(
      0,
      Math.max(0, 3 - form.extraPhotos.length)
    );
    if (!files.length) return;
    setErrorMsg('');
    setUploadingExtra(true);
    try {
      const uploadedUrls: string[] = [];
      for (const f of files) {
        const url = await uploadImageDirect(
          f,
          'extra',
          form.displayName || 'leader'
        );
        uploadedUrls.push(url);
      }
      setForm((prev) => ({
        ...prev,
        extraPhotos: [...prev.extraPhotos, ...uploadedUrls].slice(0, 3),
      }));
    } catch (err: any) {
      setErrorMsg(
        err.message || 'Không thể tải ảnh bổ sung lên. Vui lòng thử lại.'
      );
    } finally {
      setUploadingExtra(false);
      if (extraInputRef.current) extraInputRef.current.value = '';
    }
  };

  const removeExtraPhoto = (urlToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      extraPhotos: prev.extraPhotos.filter((u) => u !== urlToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (uploadingPortrait || uploadingExtra) {
      setErrorMsg('Ảnh đang được tải lên, bạn vui lòng đợi vài giây cho hoàn tất nhé!');
      return;
    }

    const effectiveRoleTitle =
      selectedRoleCode === 'OTHER'
        ? customRoleTitle.trim()
        : form.roleTitle.trim();

    if (!form.displayName.trim()) {
      setErrorMsg('Bạn vui lòng nhập Tên hiển thị trên website nhé.');
      return;
    }
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 9 || digits.length > 12) {
      setErrorMsg('Bạn vui lòng nhập Số điện thoại / Zalo hợp lệ (10 chữ số) nhé.');
      return;
    }
    if (!effectiveRoleTitle) {
      setErrorMsg('Bạn vui lòng chọn hoặc nhập Chức danh hiện tại nhé.');
      return;
    }
    if (!form.portraitUrl) {
      setErrorMsg(
        'Bạn vui lòng tải lên ít nhất 1 tấm ảnh chân dung chính ở Mục 02 nhé.'
      );
      return;
    }
    if (!form.story.trim()) {
      setErrorMsg(
        'Bạn vui lòng chia sẻ đôi dòng câu chuyện cơ duyên hoặc quan điểm làm nghề ở Mục 04 nhé.'
      );
      return;
    }

    setSubmitting(true);
    try {
      const payloadProfile: LeaderProfileData = {
        ...form,
        roleCode: selectedRoleCode === 'OTHER' ? '' : selectedRoleCode,
        roleTitle: effectiveRoleTitle,
      };

      const res = await fetch('/api/leader-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit',
          profile: payloadProfile,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(
          data.error || 'Chưa thể lưu hồ sơ lúc này, bạn vui lòng thử lại nhé.'
        );
      }

      setWasUpdated(Boolean(data.updated));
      setSubmittedProfile(data.profile || payloadProfile);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi kết nối, vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  // ===========================================================================
  // SUCCESS SCREEN WITH LIVE EDITORIAL CARD PREVIEW
  // ===========================================================================
  if (submittedProfile) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] text-[#181F1C]">
        <header className="border-b border-[#E4E1D8] bg-[#FAF9F5]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#56605B] hover:text-[#0A3622]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Trang chủ Khánh Vân</span>
            </a>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#008746] font-medium">
              KHU VỰC HCM69
            </span>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
          <div className="bg-[#EBF2EE] border border-[#008746]/25 rounded-[4px] p-6 sm:p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#0A3622] text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#008746] font-semibold block">
              {wasUpdated ? 'ĐÃ CẬP NHẬT HỒ SƠ THÀNH CÔNG' : 'ĐÃ GỬI HỒ SƠ THÀNH CÔNG'}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#181F1C]">
              Cảm ơn {submittedProfile.displayName} rất nhiều!
            </h1>
            <p className="text-xs sm:text-sm text-[#28322D] max-w-xl mx-auto leading-relaxed">
              Thông tin và hình ảnh chất lượng cao của bạn đã được lưu vào hệ thống biên tập chuyên trang{' '}
              <span className="font-medium text-[#0A3622]">
                “Hệ thống Khánh Vân — Khu vực HCM69”
              </span>
              . Dưới đây là bản xem trước thẻ hồ sơ của bạn:
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#56605B] font-medium">
                BẢN XEM TRƯỚC HỒ SƠ TRÊN WEBSITE
              </span>
              <button
                type="button"
                onClick={() => setSubmittedProfile(null)}
                className="inline-flex items-center gap-1.5 text-xs text-[#0A3622] hover:text-[#008746] font-medium underline underline-offset-4"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Chỉnh sửa lại nội dung / Đổi ảnh</span>
              </button>
            </div>

            <LeaderPreviewCard profile={submittedProfile} />
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setSubmittedProfile(null)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#0A3622] text-[#0A3622] text-xs uppercase tracking-[0.16em] font-medium rounded-[2px] hover:bg-[#EBF2EE] transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Chỉnh sửa thêm</span>
            </button>
            <a
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0A3622] text-[#FAF9F5] text-xs uppercase tracking-[0.16em] font-medium rounded-[2px] hover:bg-[#008746] transition-colors"
            >
              <span>Khám phá Website Khánh Vân</span>
            </a>
          </div>
        </main>
      </div>
    );
  }

  // ===========================================================================
  // FORM VIEW
  // ===========================================================================
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#181F1C]">
      {/* TOP BAR */}
      <header className="sticky top-0 z-30 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E4E1D8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-15 sm:h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group">
            <span className="w-[3px] h-4 bg-[#008746] inline-block" />
            <span className="font-serif text-lg sm:text-xl tracking-[0.06em] text-[#181F1C] font-medium">
              KHÁNH VÂN
            </span>
          </a>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#008746] font-medium bg-[#EBF2EE] px-2.5 py-1 rounded-[2px]">
            HỆ THỐNG HCM69 • HỒ SƠ LEADER
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* HERO INTRO NOTE FROM CHỊ KHÁNH VÂN */}
        <section className="space-y-5">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] font-medium block">
              BAN ĐIỀU HÀNH & ĐỘI NGŨ QUẢN LÝ KẾ CẬN • MANULIFE VIỆT NAM
            </span>
            <h1 className="font-serif text-3xl sm:text-[42px] leading-[1.15] text-[#181F1C] font-normal">
              Hồ Sơ Thương Hiệu Quản Lý{' '}
              <span className="italic text-[#0A3622]">Hệ Thống Khánh Vân</span>
            </h1>
          </div>

          <figure className="rounded-[4px] overflow-hidden border border-[#E4E1D8] bg-white shadow-[0_14px_34px_-22px_rgba(10,54,34,0.25)]">
            <img
              src="/images/BanDieuHanh_ChiVanCungTapTheQuanLy_SanhVom2026.jpg"
              alt="Khánh Vân cùng Ban Điều Hành Hệ thống tại Manulife Việt Nam"
              className="w-full aspect-[16/10] object-cover object-center"
            />
            <figcaption className="px-4 py-2.5 bg-[#FAF9F5] border-t border-[#ECE9E0] flex items-center justify-between gap-2 text-[11px] text-[#56605B]">
              <span className="font-medium text-[#0A3622] uppercase tracking-[0.16em]">
                Ban Điều Hành • Khu Vực HCM69
              </span>
              <span className="italic font-serif text-sm text-[#28322D]">
                “Đi chắc để đi xa — Kiến tạo tốc độ từ sự chuẩn mực.”
              </span>
            </figcaption>
          </figure>

          <div className="bg-white border border-[#E4E1D8] border-l-[3px] border-l-[#0A3622] p-5 sm:p-6 rounded-[3px] space-y-2.5 shadow-[0_10px_30px_-20px_rgba(10,54,34,0.18)]">
            <p className="text-sm text-[#181F1C] font-medium">
              Thân gửi các anh chị em Quản lý trong Hệ thống Khánh Vân,
            </p>
            <p className="text-xs sm:text-[13.5px] text-[#28322D] leading-relaxed">
              Để ra mắt chuyên trang{' '}
              <strong className="font-medium text-[#0A3622]">
                “Hệ thống Khánh Vân là ai”
              </strong>{' '}
              trên website chính thức{' '}
              <span className="underline decoration-[#B8975A] underline-offset-2">
                khanhvanfinance.com
              </span>
              , mỗi anh chị dành khoảng 3 phút chia sẻ thông tin và tải lên{' '}
              <strong>1 bức ảnh chân dung rõ nét nhất</strong> của mình nhé. Đội ngũ biên tập sẽ trau chuốt câu chữ và thiết kế hồ sơ thật trang trọng cho từng Leader.
            </p>
          </div>

          {/* QUICK RELOAD FOR EDITING EXISTING SUBMISSION */}
          <div className="bg-[#F2EFE9]/80 border border-[#E4E1D8] rounded-[3px] px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-[#56605B]">
                Bạn đã điền form trước đó và muốn <strong>chỉnh sửa hoặc đổi ảnh mới</strong>?
              </span>
              <button
                type="button"
                onClick={() => setShowLookup((v) => !v)}
                className="text-xs font-medium text-[#0A3622] hover:text-[#008746] underline underline-offset-4"
              >
                {showLookup ? 'Ẩn khung tra cứu' : 'Bấm vào đây để tải lại hồ sơ'}
              </button>
            </div>

            {showLookup && (
              <div className="mt-3 pt-3 border-t border-[#DCD8CE] space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="tel"
                    value={lookupPhone}
                    onChange={(e) => setLookupPhone(e.target.value)}
                    placeholder="Nhập số điện thoại bạn đã dùng khi gửi..."
                    className="flex-1 px-3.5 py-2.5 text-sm bg-white border border-[#DCD8CE] rounded-[2px] focus:outline-none focus:border-[#0A3622]"
                  />
                  <button
                    type="button"
                    onClick={handleLookupExisting}
                    disabled={lookupLoading}
                    className="px-4 py-2.5 bg-[#0A3622] text-white text-xs uppercase tracking-[0.14em] font-medium rounded-[2px] hover:bg-[#008746] disabled:opacity-60 inline-flex items-center justify-center gap-1.5"
                  >
                    {lookupLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <UserCheck className="w-4 h-4" />
                    )}
                    <span>Tải lại hồ sơ</span>
                  </button>
                </div>
                {lookupMessage && (
                  <p className="text-xs text-[#0A3622] font-medium">{lookupMessage}</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* =============================================================== */}
          {/* SECTION 01: IDENTITY & ROLE */}
          {/* =============================================================== */}
          <section className="bg-white border border-[#E4E1D8] rounded-[4px] p-5 sm:p-8 space-y-5">
            <div className="border-b border-[#ECE9E0] pb-3.5">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#008746] font-semibold">
                01 / ĐỊNH DANH & VỊ TRÍ TRONG HỆ THỐNG
              </span>
              <h2 className="font-serif text-2xl text-[#181F1C] mt-0.5">
                Thông tin cơ bản của Quản lý
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#181F1C]">
                  Tên thương hiệu hiển thị <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.displayName}
                  onChange={(e) => updateField('displayName', e.target.value)}
                  placeholder="VD: Ngân Vũ / Huyền Trang / Minh Phương..."
                  className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#DCD8CE] rounded-[2px] focus:bg-white focus:outline-none focus:border-[#0A3622]"
                />
                <p className="text-[11px] text-[#858E89]">
                  Tên ngắn gọn hoặc tên đầy đủ mà khách hàng & đội ngũ thường gọi bạn.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#181F1C]">
                  Họ và tên đầy đủ
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="VD: Vũ Thị Ngân (không bắt buộc)"
                  className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#DCD8CE] rounded-[2px] focus:bg-white focus:outline-none focus:border-[#0A3622]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#181F1C]">
                  Số điện thoại / Zalo kết nối <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="VD: 0909 123 456"
                  className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#DCD8CE] rounded-[2px] focus:bg-white focus:outline-none focus:border-[#0A3622]"
                />
                <p className="text-[11px] text-[#858E89]">
                  Dùng làm mã định danh để bạn có thể tự cập nhật lại hồ sơ bất cứ lúc nào.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#181F1C]">
                  Chức danh hiện tại tại Manulife <span className="text-red-600">*</span>
                </label>
                <select
                  value={selectedRoleCode}
                  onChange={(e) => handleRoleSelect(e.target.value)}
                  className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#DCD8CE] rounded-[2px] focus:bg-white focus:outline-none focus:border-[#0A3622]"
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt.code} value={opt.code}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedRoleCode === 'OTHER' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#181F1C]">
                  Nhập chức danh hiện tại của bạn <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customRoleTitle}
                  onChange={(e) => {
                    setCustomRoleTitle(e.target.value);
                    updateField('roleTitle', e.target.value);
                  }}
                  placeholder="VD: Quản lý Kinh doanh / Chuyên viên Tư vấn Tài chính Cấp cao..."
                  className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#DCD8CE] rounded-[2px] focus:bg-white focus:outline-none focus:border-[#0A3622]"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#181F1C]">
                  Mã Khu vực / Văn phòng trực thuộc
                </label>
                <input
                  type="text"
                  value={form.unitCode}
                  onChange={(e) => updateField('unitCode', e.target.value)}
                  placeholder="VD: HCM69, MN111, SG168, SG169..."
                  className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#DCD8CE] rounded-[2px] focus:bg-white focus:outline-none focus:border-[#0A3622]"
                />
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-[#858E89]">Chọn nhanh:</span>
                  {UNIT_SUGGESTIONS.map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => updateField('unitCode', u)}
                      className={`px-2 py-0.5 text-[11px] rounded-[2px] border transition-colors ${
                        form.unitCode === u
                          ? 'bg-[#0A3622] text-white border-[#0A3622]'
                          : 'bg-[#FAF9F5] text-[#56605B] border-[#DCD8CE] hover:border-[#0A3622]'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#181F1C]">
                  Quản lý trực tiếp trên Sơ đồ tổ chức
                </label>
                <input
                  type="text"
                  value={form.directLeader}
                  onChange={(e) => updateField('directLeader', e.target.value)}
                  placeholder="VD: Chị Khánh Vân / Chị Diễm Ly / Chị Trân Phan..."
                  className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#DCD8CE] rounded-[2px] focus:bg-white focus:outline-none focus:border-[#0A3622]"
                />
                <p className="text-[11px] text-[#858E89]">
                  Giúp ban biên tập xếp chính xác vị trí nhánh trên Sơ đồ tổ chức vùng.
                </p>
              </div>
            </div>
          </section>

          {/* =============================================================== */}
          {/* SECTION 02: STUDIO PORTRAIT & EXTRA PHOTOS */}
          {/* =============================================================== */}
          <section className="bg-white border border-[#E4E1D8] rounded-[4px] p-5 sm:p-8 space-y-5">
            <div className="border-b border-[#ECE9E0] pb-3.5">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#008746] font-semibold">
                02 / HÌNH ẢNH CHÂN DUNG CHẤT LƯỢNG CAO (HD)
              </span>
              <h2 className="font-serif text-2xl text-[#181F1C] mt-0.5">
                Ảnh đại diện thương hiệu cá nhân
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
              {/* Portrait Frame Preview */}
              <div className="sm:col-span-5">
                <div
                  onClick={() => !uploadingPortrait && portraitInputRef.current?.click()}
                  className="relative aspect-[3/4] w-full max-w-[260px] mx-auto rounded-[4px] border-2 border-dashed border-[#C7C2B6] hover:border-[#0A3622] bg-[#FAF9F5] overflow-hidden cursor-pointer transition-colors flex flex-col items-center justify-center text-center p-4"
                >
                  {localPortraitPreview || form.portraitUrl ? (
                    <>
                      <img
                        src={localPortraitPreview || form.portraitUrl}
                        alt="Xem trước chân dung"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-3 text-white flex items-center justify-center gap-1.5 text-xs font-medium">
                        <Camera className="w-4 h-4" />
                        <span>Bấm để đổi ảnh khác</span>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2.5 px-2">
                      <div className="w-12 h-12 rounded-full bg-[#EBF2EE] text-[#0A3622] flex items-center justify-center mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-semibold text-[#181F1C]">
                        Bấm để chọn ảnh chân dung chính <span className="text-red-600">*</span>
                      </p>
                      <p className="text-[11px] text-[#56605B] leading-relaxed">
                        Hỗ trợ ảnh gốc dung lượng lớn (JPG, PNG, HEIC) trực tiếp từ điện thoại
                      </p>
                    </div>
                  )}

                  {uploadingPortrait && (
                    <div className="absolute inset-0 bg-[#181F1C]/70 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-2 p-4">
                      <Loader2 className="w-7 h-7 animate-spin text-[#00A758]" />
                      <span className="text-xs font-medium">
                        Đang tải ảnh gốc HD lên...
                      </span>
                    </div>
                  )}
                </div>

                <input
                  ref={portraitInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePortraitChange}
                  className="hidden"
                />
              </div>

              {/* Photo Tips + Optional Extra Photos */}
              <div className="sm:col-span-7 space-y-4">
                <div className="bg-[#FAF9F5] border border-[#E4E1D8] rounded-[3px] p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0A3622]">
                    <Sparkles className="w-4 h-4 text-[#008746]" />
                    <span>Gợi ý chọn ảnh lên website đẹp & sang nhất:</span>
                  </div>
                  <ul className="text-xs text-[#56605B] space-y-1.5 list-disc pl-4 leading-relaxed">
                    <li>
                      Ưu tiên <strong>ảnh chụp Studio hoặc ảnh bán thân rõ nét</strong>, trang phục Vest / công sở lịch sự.
                    </li>
                    <li>
                      Nên chọn ảnh <strong>khổ dọc</strong>, không bị cắt sát đỉnh đầu để khi lên khung trang Hệ thống nhìn cân đối nhất.
                    </li>
                    <li>
                      Chọn trực tiếp file ảnh gốc độ phân giải cao (không cần nén nhỏ).
                    </li>
                  </ul>
                </div>

                {/* Optional Extra Photos */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-[#181F1C]">
                      Ảnh bổ sung: Vinh danh MDRT / Đội ngũ / Sự kiện (Tùy chọn, tối đa 3 ảnh)
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {form.extraPhotos.map((url, idx) => (
                      <div
                        key={url}
                        className="relative w-20 h-20 rounded-[3px] overflow-hidden border border-[#DCD8CE] bg-[#FAF9F5] group"
                      >
                        <img
                          src={url}
                          alt={`Ảnh bổ sung ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeExtraPhoto(url)}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-600"
                          aria-label="Xóa ảnh"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                    {form.extraPhotos.length < 3 && (
                      <button
                        type="button"
                        disabled={uploadingExtra}
                        onClick={() => extraInputRef.current?.click()}
                        className="w-20 h-20 rounded-[3px] border border-dashed border-[#C7C2B6] hover:border-[#0A3622] bg-[#FAF9F5] flex flex-col items-center justify-center gap-1 text-[#56605B] hover:text-[#0A3622] text-[11px] transition-colors"
                      >
                        {uploadingExtra ? (
                          <Loader2 className="w-4 h-4 animate-spin text-[#008746]" />
                        ) : (
                          <>
                            <ImagePlus className="w-4 h-4" />
                            <span>Thêm ảnh</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <input
                    ref={extraInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleExtraPhotosChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================== */}
          {/* SECTION 03: BACKGROUND & ACHIEVEMENTS */}
          {/* =============================================================== */}
          <section className="bg-white border border-[#E4E1D8] rounded-[4px] p-5 sm:p-8 space-y-5">
            <div className="border-b border-[#ECE9E0] pb-3.5">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#008746] font-semibold">
                03 / HÀNH TRÌNH SỰ NGHIỆP & DẤU ẤN CHUYÊN MÔN
              </span>
              <h2 className="font-serif text-2xl text-[#181F1C] mt-0.5">
                Nền tảng kinh nghiệm & Danh hiệu
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#181F1C]">
                  Năm gia nhập Manulife
                </label>
                <input
                  type="text"
                  value={form.joinedYear}
                  onChange={(e) => updateField('joinedYear', e.target.value)}
                  placeholder="VD: 2020"
                  className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#DCD8CE] rounded-[2px] focus:bg-white focus:outline-none focus:border-[#0A3622]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#181F1C]">
                  Tổng số năm kinh nghiệm làm việc
                </label>
                <input
                  type="text"
                  value={form.experienceSummary}
                  onChange={(e) =>
                    updateField('experienceSummary', e.target.value)
                  }
                  placeholder="VD: 10 năm kinh nghiệm Ngân hàng & Tài chính"
                  className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#DCD8CE] rounded-[2px] focus:bg-white focus:outline-none focus:border-[#0A3622]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#181F1C]">
                Công việc / Nền tảng trước khi đến với Manulife
              </label>
              <input
                type="text"
                value={form.priorBackground}
                onChange={(e) => updateField('priorBackground', e.target.value)}
                placeholder="VD: Nguyên Chuyên viên QHKH Doanh nghiệp tại Vietcombank / Kế toán trưởng / Kinh doanh riêng..."
                className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#DCD8CE] rounded-[2px] focus:bg-white focus:outline-none focus:border-[#0A3622]"
              />
              <p className="text-[11px] text-[#858E89]">
                Chi tiết này giúp khách hàng & ứng viên thấy được sự đa dạng và chiều sâu trải nghiệm của đội ngũ.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#181F1C]">
                Danh hiệu & Thế mạnh nổi bật (Bấm chọn các mục phù hợp)
              </label>
              <div className="flex flex-wrap gap-2">
                {ACHIEVEMENT_CHIPS.map((chip) => {
                  const active = form.achievements.includes(chip);
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => toggleAchievement(chip)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] text-xs border transition-all ${
                        active
                          ? 'bg-[#0A3622] text-white border-[#0A3622] font-medium'
                          : 'bg-[#FAF9F5] text-[#28322D] border-[#DCD8CE] hover:border-[#0A3622]'
                      }`}
                    >
                      {active ? (
                        <Check className="w-3.5 h-3.5 text-[#00A758]" />
                      ) : (
                        <Award className="w-3.5 h-3.5 text-[#858E89]" />
                      )}
                      <span>{chip}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#181F1C]">
                Ghi chú chi tiết thêm về thành tích / quy mô đội ngũ (Tùy chọn)
              </label>
              <input
                type="text"
                value={form.strengthsNote}
                onChange={(e) => updateField('strengthsNote', e.target.value)}
                placeholder="VD: 3 năm liên tiếp MDRT (2023–2025), dẫn dắt phòng kinh doanh 35 nhân sự..."
                className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#DCD8CE] rounded-[2px] focus:bg-white focus:outline-none focus:border-[#0A3622]"
              />
            </div>
          </section>

          {/* =============================================================== */}
          {/* SECTION 04: STORY & QUOTE */}
          {/* =============================================================== */}
          <section className="bg-white border border-[#E4E1D8] rounded-[4px] p-5 sm:p-8 space-y-5">
            <div className="border-b border-[#ECE9E0] pb-3.5">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#008746] font-semibold">
                04 / CÂU CHUYỆN ĐỒNG HÀNH & CHÂM NGÔN LÀM NGHỀ
              </span>
              <h2 className="font-serif text-2xl text-[#181F1C] mt-0.5">
                Dấu ấn cá nhân của bạn tại Hệ thống Khánh Vân
              </h2>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#181F1C]">
                Câu chuyện cơ duyên & Quan điểm làm nghề của bạn{' '}
                <span className="text-red-600">*</span>
              </label>
              <div className="bg-[#FAF9F5] border border-[#E4E1D8] rounded-[3px] p-3.5 text-xs text-[#56605B] space-y-1 leading-relaxed">
                <p className="font-medium text-[#0A3622]">
                  Gợi ý 3 ý nhỏ để bạn viết tự nhiên nhất (chỉ cần viết thoải mái, ban biên tập sẽ trau chuốt câu chữ giúp bạn):
                </p>
                <p>1. Cơ duyên nào đưa bạn đến với Manulife và đồng hành cùng chị Khánh Vân?</p>
                <p>2. Điều bạn yêu quý nhất ở văn hóa làm việc chuẩn mực của hệ thống mình là gì?</p>
                <p>3. Nguyên tắc hoặc tâm huyết lớn nhất của bạn khi tư vấn khách hàng / dẫn dắt đội ngũ?</p>
              </div>
              <textarea
                rows={5}
                required
                value={form.story}
                onChange={(e) => updateField('story', e.target.value)}
                placeholder="Chia sẻ câu chuyện của bạn bằng giọng văn tự nhiên nhất (khoảng 3–6 câu)..."
                className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#DCD8CE] rounded-[2px] focus:bg-white focus:outline-none focus:border-[#0A3622] leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#181F1C]">
                Một câu tâm niệm / Châm ngôn nghề nghiệp yêu thích
              </label>
              <input
                type="text"
                value={form.quote}
                onChange={(e) => updateField('quote', e.target.value)}
                placeholder="VD: Tư vấn bằng sự minh bạch, đồng hành bằng trọn chữ Tâm."
                className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#DCD8CE] rounded-[2px] focus:bg-white focus:outline-none focus:border-[#0A3622]"
              />
              <p className="text-[11px] text-[#858E89]">
                Câu nói ngắn này sẽ được trích dẫn in nghiêng trang trọng ngay trên thẻ hồ sơ của bạn.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#181F1C]">
                Link Facebook cá nhân (Tùy chọn)
              </label>
              <input
                type="url"
                value={form.facebookUrl}
                onChange={(e) => updateField('facebookUrl', e.target.value)}
                placeholder="VD: https://www.facebook.com/..."
                className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#DCD8CE] rounded-[2px] focus:bg-white focus:outline-none focus:border-[#0A3622]"
              />
            </div>
          </section>

          {/* ERROR ALERT */}
          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-[3px]">
              {errorMsg}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <div className="space-y-3 pt-1">
            <button
              type="submit"
              disabled={submitting || uploadingPortrait || uploadingExtra}
              className="w-full py-4 px-6 bg-[#0A3622] hover:bg-[#008746] active:scale-[0.99] disabled:opacity-60 text-[#FAF9F5] text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold rounded-[3px] transition-all flex items-center justify-center gap-2.5 shadow-[0_14px_30px_-12px_rgba(10,54,34,0.45)] min-h-[52px]"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang lưu hồ sơ lên hệ thống...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Hoàn Tất & Gửi Hồ Sơ Quản Lý</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-[#858E89]">
              Sau khi gửi, bạn sẽ xem được ngay bản dựng thẻ hồ sơ của mình và có thể chỉnh sửa lại bất cứ lúc nào bằng số điện thoại.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};
