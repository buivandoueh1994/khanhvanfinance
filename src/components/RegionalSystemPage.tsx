import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Building2,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Compass,
  ExternalLink,
  GitBranch,
  Layers,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import {
  INDUSTRY_CATEGORIES,
  IndustryCategoryKey,
  LeaderTierKey,
  REGIONAL_CULTURE_MOMENTS,
  REGIONAL_EXECUTIVE_HUBS,
  REGIONAL_LEADERS,
  REGIONAL_ORG_BRANCHES,
  RegionalLeader,
} from '../data/regionalLeaders';
import { VideoItem } from '../data/videos';
import { AiAdvisorWidget } from './AiAdvisorWidget';
import { trackEvent, trackLeadConversion } from '../utils/analytics';

const ZALO_URL = 'https://zalo.me/0931579771';
const FACEBOOK_URL = 'https://www.facebook.com/nguyen.t.van.9250?locale=vi_VN';
const PHONE_DISPLAY = '0931 579 771';
const INITIAL_COMPACT_COUNT = 12;

const FacebookBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V6.65c0-1.05.29-1.73 1.76-1.73Z" />
  </svg>
);

const MessengerBrandSvg: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    className={className}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 2.5C7.649 2.5 2.5 7.275 2.5 13.163c0 3.356 1.677 6.36 4.3 8.28v3.557l3.445-1.89c1.182.328 2.44.505 3.755.505 6.351 0 11.5-4.775 11.5-10.663C25.5 7.275 20.351 2.5 14 2.5z"
      fill="white"
    />
    <path
      d="M15.15 16.688l-2.955-3.15-5.765 3.15 6.34-6.726 3.025 3.15 5.695-3.15-6.34 6.726z"
      fill="url(#messenger-manulife-grad-regional)"
    />
    <defs>
      <linearGradient id="messenger-manulife-grad-regional" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00A758" />
        <stop offset="55%" stopColor="#008746" />
        <stop offset="100%" stopColor="#0A3622" />
      </linearGradient>
    </defs>
  </svg>
);

const SYSTEM_PILLARS = [
  {
    number: '01',
    icon: ShieldCheck,
    title: 'Minh Bạch Từ Trang Đầu Tiên',
    desc: 'Tư vấn bắt đầu từ việc cùng khách hàng đọc kỹ điều khoản loại trừ, thời gian chờ và chọn mức đóng phù hợp 10–15% thu nhập ổn định. Nền tảng ấy giúp toàn vùng giữ vị trí Top 1 toàn quốc về tỷ lệ duy trì hợp đồng.',
  },
  {
    number: '02',
    icon: Building2,
    title: 'Đội Ngũ Giàu Chuyên Môn Từ Nhiều Ngành',
    desc: 'Đội ngũ quản lý quy tụ những người trưởng thành từ Ngân hàng, Kế toán – Kiểm toán, Luật, Y tế, Giáo dục và Quản trị doanh nghiệp — mang đến góc nhìn hoạch định dòng tiền thực chất cho từng gia đình.',
  },
  {
    number: '03',
    icon: Compass,
    title: 'Luôn Có Hệ Thống Đồng Hành Phía Sau',
    desc: 'Mỗi gia đình khách hàng không làm việc với một tư vấn viên đơn lẻ, mà luôn có đội ngũ quản lý nhiều tầng của Vùng Khánh Vân cùng đồng hành và giám sát chất lượng tại Manulife Việt Nam.',
  },
];

interface LightboxState {
  src: string;
  tag: string;
  title: string;
  subtitle?: string;
}

export const RegionalSystemPage: React.FC = () => {
  const [activeTier, setActiveTier] = useState<'ALL' | LeaderTierKey>('ALL');
  const [activeArea, setActiveArea] = useState<string>('ALL');
  const [activeIndustry, setActiveIndustry] = useState<'ALL' | IndustryCategoryKey>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllCompact, setShowAllCompact] = useState<boolean>(false);
  const [activeMobileOrgCode, setActiveMobileOrgCode] = useState<
    'HCM69' | 'SG168' | 'SG169' | 'MN111'
  >('HCM69');
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);
  const [activeModalPhotoIdx, setActiveModalPhotoIdx] = useState<number>(0);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // Inline concierge form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    topic: 'Hoạch định Bảo vệ & Tài chính Gia đình',
    background: '',
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Hệ Thống Vùng Khánh Vân — Ban Điều Hành & Đội Ngũ Quản Lý';
    window.scrollTo(0, 0);
  }, []);

  const tierCounts = useMemo(() => {
    return {
      ALL: REGIONAL_LEADERS.length,
      SM: REGIONAL_LEADERS.filter((l) => l.tierKey === 'SM').length,
      DM: REGIONAL_LEADERS.filter((l) => l.tierKey === 'DM').length,
      SUM: REGIONAL_LEADERS.filter((l) => l.tierKey === 'SUM').length,
      UM: REGIONAL_LEADERS.filter((l) => l.tierKey === 'UM').length,
      ADVISOR: REGIONAL_LEADERS.filter((l) => l.tierKey === 'ADVISOR').length,
    };
  }, []);

  const areaCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: REGIONAL_LEADERS.length };
    for (const l of REGIONAL_LEADERS) {
      counts[l.unitCode] = (counts[l.unitCode] || 0) + 1;
    }
    return counts;
  }, []);

  const industryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: REGIONAL_LEADERS.length };
    for (const l of REGIONAL_LEADERS) {
      counts[l.industryKey] = (counts[l.industryKey] || 0) + 1;
    }
    return counts;
  }, []);

  const hasActiveFilter =
    activeTier !== 'ALL' ||
    activeArea !== 'ALL' ||
    activeIndustry !== 'ALL' ||
    searchQuery.trim() !== '';

  const filteredLeaders = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return REGIONAL_LEADERS.filter((leader) => {
      if (activeTier !== 'ALL' && leader.tierKey !== activeTier) return false;
      if (activeArea !== 'ALL' && leader.unitCode !== activeArea) return false;
      if (activeIndustry !== 'ALL' && leader.industryKey !== activeIndustry) return false;
      if (!q) return true;
      const haystack = [
        leader.displayName,
        leader.fullName,
        leader.roleBadge,
        leader.roleTitle,
        leader.unitCode,
        leader.directLeader,
        leader.priorBackgroundShort,
        leader.priorBackgroundFull,
        leader.highlightNote,
        leader.quote,
        ...leader.badges,
        ...leader.specialties,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [activeTier, activeArea, activeIndustry, searchQuery]);

  const seniorFiltered = useMemo(
    () => filteredLeaders.filter((l) => l.isSeniorLeadership),
    [filteredLeaders]
  );

  const compactFiltered = useMemo(
    () => filteredLeaders.filter((l) => !l.isSeniorLeadership),
    [filteredLeaders]
  );

  const visibleCompactLeaders = useMemo(() => {
    if (hasActiveFilter || showAllCompact) return compactFiltered;
    return compactFiltered.slice(0, INITIAL_COMPACT_COUNT);
  }, [compactFiltered, hasActiveFilter, showAllCompact]);

  const hiddenCompactCount = compactFiltered.length - visibleCompactLeaders.length;

  const activeMobileBranch = useMemo(() => {
    return (
      REGIONAL_ORG_BRANCHES.find((b) => b.code === activeMobileOrgCode) ||
      REGIONAL_ORG_BRANCHES[0]
    );
  }, [activeMobileOrgCode]);

  const selectedLeader: RegionalLeader | null = useMemo(() => {
    if (!selectedLeaderId) return null;
    return REGIONAL_LEADERS.find((l) => l.id === selectedLeaderId) || null;
  }, [selectedLeaderId]);

  const modalPhotos = useMemo(() => {
    if (!selectedLeader) return [];
    return [
      {
        src: selectedLeader.portrait,
        caption: `${selectedLeader.displayName} — ${selectedLeader.roleTitle} (Khu vực ${selectedLeader.unitCode})`,
      },
      ...selectedLeader.gallery,
    ];
  }, [selectedLeader]);

  const openLeaderDossier = (leader: RegionalLeader) => {
    setSelectedLeaderId(leader.id);
    setActiveModalPhotoIdx(0);
    trackEvent('view_leader_dossier', {
      leader_id: leader.id,
      leader_name: leader.displayName,
      unit_code: leader.unitCode,
    });
  };

  const openLeaderById = (id?: string) => {
    if (!id) return;
    const found = REGIONAL_LEADERS.find((l) => l.id === id);
    if (found) openLeaderDossier(found);
  };

  const navigateLeaderModal = (direction: -1 | 1) => {
    if (!selectedLeader) return;
    const pool = filteredLeaders.length > 0 ? filteredLeaders : REGIONAL_LEADERS;
    const currentIndex = pool.findIndex((l) => l.id === selectedLeader.id);
    const baseIdx = currentIndex === -1 ? 0 : currentIndex;
    const nextIdx = (baseIdx + direction + pool.length) % pool.length;
    setSelectedLeaderId(pool[nextIdx].id);
    setActiveModalPhotoIdx(0);
  };

  // Lock body scroll & handle Esc / Left / Right keys when any modal is open
  useEffect(() => {
    if (!selectedLeader && !lightbox && !activeVideo) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightbox) {
          setLightbox(null);
        } else if (activeVideo) {
          setActiveVideo(null);
        } else {
          setSelectedLeaderId(null);
        }
      } else if (!lightbox && !activeVideo && selectedLeader) {
        if (e.key === 'ArrowRight') navigateLeaderModal(1);
        if (e.key === 'ArrowLeft') navigateLeaderModal(-1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const handleSelectAreaHub = (code: string) => {
    if (areaCounts[code]) {
      setActiveTier('ALL');
      setActiveIndustry('ALL');
      setActiveArea(code);
      setSearchQuery('');
      const el = document.getElementById('doi-ngu-quan-ly');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectIndustry = (key: 'ALL' | IndustryCategoryKey) => {
    setActiveIndustry((prev) => (prev === key && key !== 'ALL' ? 'ALL' : key));
  };

  const handleConnectFromLeader = (leader: RegionalLeader) => {
    setSelectedLeaderId(null);
    setSubmitted(false);
    setFormData((prev) => ({
      ...prev,
      note: prev.note
        ? prev.note
        : `Mong muốn kết nối tư vấn / trao đổi cùng Hệ thống Vùng Khánh Vân (quan tâm hồ sơ ${leader.displayName} — Khu vực ${leader.unitCode}).`,
    }));
    setTimeout(() => {
      const el = document.getElementById('ket-noi-vung');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const resetFilters = () => {
    setActiveTier('ALL');
    setActiveArea('ALL');
    setActiveIndustry('ALL');
    setSearchQuery('');
  };

  const anyModalOpen = Boolean(selectedLeader || lightbox || activeVideo);

  return (
    <div className="min-h-screen w-full max-w-[100vw] [overflow-x:clip] bg-[#FAF9F5] text-[#181F1C] selection:bg-[#0A3622] selection:text-white">
      {/* =================================================================== */}
      {/* STICKY EDITORIAL HEADER + MOBILE QUICK-JUMP CHAPTER STRIP */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E4E1D8]">
        <div className="max-w-6xl w-full min-w-0 mx-auto px-4 sm:px-8 h-14 sm:h-[68px] flex items-center justify-between gap-2.5 sm:gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 sm:gap-3 group min-w-0"
            title="Về trang chủ Khánh Vân"
          >
            <span className="w-[3px] h-5 bg-[#008746] inline-block shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-base sm:text-xl tracking-[0.06em] sm:tracking-[0.08em] text-[#181F1C] font-semibold leading-none truncate">
                KHÁNH VÂN
              </span>
              <span className="sm:hidden text-[9px] uppercase tracking-[0.12em] text-[#56605B] font-medium mt-1 truncate">
                Vùng Khánh Vân • Manulife
              </span>
              <span className="hidden sm:inline text-[9.5px] uppercase tracking-[0.2em] text-[#56605B] font-medium mt-1">
                Hệ Thống Vùng • Manulife Việt Nam
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.16em] font-medium text-[#56605B]">
            <a href="#tam-voc" className="hover:text-[#0A3622] transition-colors">
              01. Tổng quan
            </a>
            <a href="#cau-truc-vung" className="hover:text-[#0A3622] transition-colors">
              02. Sơ đồ Tổ chức Vùng
            </a>
            <a href="#doi-ngu-quan-ly" className="hover:text-[#0A3622] transition-colors">
              03. Đội ngũ ({REGIONAL_LEADERS.length})
            </a>
            <a href="#van-hoa-he-thong" className="hover:text-[#0A3622] transition-colors">
              04. Người dẫn dắt &amp; Văn hóa
            </a>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <a
              href="/"
              aria-label="Về trang chủ"
              className="inline-flex items-center justify-center gap-1.5 p-2 sm:px-3 sm:py-2 border border-[#DCD8CE] hover:border-[#0A3622] text-xs font-medium text-[#181F1C] rounded-[2px] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Trang chủ</span>
            </a>
            <a
              href="#ket-noi-vung"
              className="inline-flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-[11px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.14em] font-semibold rounded-[2px] transition-colors whitespace-nowrap"
            >
              <span>Kết nối</span>
              <span className="hidden sm:inline">Vùng</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Mobile Chapter Quick-Jump Bar */}
        <nav
          aria-label="Điều hướng nhanh các chương"
          className="lg:hidden border-t border-[#ECE9E0] bg-[#FAF9F5]/95"
        >
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-4 py-2 text-[11px] font-medium text-[#4A544F]">
            <a
              href="#tam-voc"
              className="shrink-0 px-2.5 py-1 rounded-[2px] bg-white border border-[#E4E1D8] active:bg-[#0A3622] active:text-white transition-colors"
            >
              01. Tổng quan
            </a>
            <a
              href="#cau-truc-vung"
              className="shrink-0 px-2.5 py-1 rounded-[2px] bg-white border border-[#E4E1D8] active:bg-[#0A3622] active:text-white transition-colors"
            >
              02. Sơ đồ Vùng
            </a>
            <a
              href="#doi-ngu-quan-ly"
              className="shrink-0 px-2.5 py-1 rounded-[2px] bg-[#EBF2EE] text-[#0A3622] font-semibold border border-[#008746]/30 transition-colors"
            >
              03. Đội ngũ ({REGIONAL_LEADERS.length})
            </a>
            <a
              href="#van-hoa-he-thong"
              className="shrink-0 px-2.5 py-1 rounded-[2px] bg-white border border-[#E4E1D8] active:bg-[#0A3622] active:text-white transition-colors"
            >
              04. Bản sắc &amp; Văn hóa
            </a>
            <a
              href="#ket-noi-vung"
              className="shrink-0 px-2.5 py-1 rounded-[2px] bg-white border border-[#E4E1D8] active:bg-[#0A3622] active:text-white transition-colors"
            >
              05. Kết nối
            </a>
          </div>
        </nav>
      </header>

      {/* =================================================================== */}
      {/* CHƯƠNG 01: TỔNG QUAN TỔ CHỨC & BAN ĐIỀU HÀNH */}
      {/* =================================================================== */}
      <section
        id="tam-voc"
        className="scroll-mt-28 sm:scroll-mt-20 pt-7 sm:pt-14 pb-10 sm:pb-16 border-b border-[#E4E1D8]"
      >
        <div className="max-w-6xl w-full min-w-0 mx-auto px-4 sm:px-8 space-y-8 sm:space-y-12">
          {/* Editorial Title & Lead */}
          <div className="max-w-4xl space-y-3 sm:space-y-4">
            <div className="inline-flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#008746] font-semibold">
              <span>01 / TỔNG QUAN TỔ CHỨC</span>
              <span className="w-6 sm:w-8 h-px bg-[#B8975A]" />
              <span className="text-[#56605B]">MANULIFE VIỆT NAM</span>
            </div>

            <h1 className="font-serif text-[32px] sm:text-6xl lg:text-[66px] leading-[1.12] sm:leading-[1.06] font-medium text-[#181F1C] tracking-[-0.01em]">
              Hệ Thống Vùng{' '}
              <span className="italic text-[#0A3622]">Khánh Vân</span>
            </h1>

            <p className="text-[14.5px] sm:text-lg text-[#28322D] font-normal leading-relaxed max-w-3xl">
              Hình thành từ năm 2018 trên nền tảng kỷ luật quản trị tài sản của ngân hàng quốc tế, Vùng Khánh Vân hôm nay có hơn 500 cộng sự cùng 64 quản lý kinh doanh tại 4 khu vực, chung một kim chỉ nam:{' '}
              <span className="font-medium text-[#0A3622] italic font-serif text-[17px] sm:text-2xl block sm:inline mt-1 sm:mt-0">
                “Đi chắc để đi xa — Kiến tạo tốc độ từ sự chuẩn mực.”
              </span>
            </p>
          </div>

          {/* Unobstructed Executive Board Portrait + Clean Caption Band + 4 Metrics */}
          <div className="bg-white border border-[#DCD8CE] rounded-[4px] overflow-hidden shadow-[0_24px_60px_-28px_rgba(10,54,34,0.22)]">
            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/BanDieuHanh_ChiVanCungTapTheQuanLy_SanhVom2026.jpg',
                  tag: 'BAN ĐIỀU HÀNH HỆ THỐNG VÙNG KHÁNH VÂN',
                  title:
                    'Giám đốc Vùng Cấp cao Khánh Vân cùng tập thể Quản lý nòng cốt tại Manulife Plaza',
                  subtitle:
                    'Những quản lý trưởng thành từ Ngân hàng, Kế toán – Kiểm toán, Luật, Y tế, Giáo dục và Quản trị doanh nghiệp.',
                })
              }
              className="cursor-zoom-in group"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/9] bg-[#F2EFE9] overflow-hidden">
                <img
                  fetchPriority="high"
                  decoding="async"
                  src="/images/BanDieuHanh_ChiVanCungTapTheQuanLy_SanhVom2026.jpg"
                  alt="Giám đốc Vùng Cấp cao Khánh Vân cùng Ban Điều Hành Hệ thống Vùng Khánh Vân"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700"
                />
                <span className="absolute top-3 right-3 sm:top-4 sm:right-4 inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/55 backdrop-blur-sm border border-white/25 rounded-[2px] text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] text-[#FAF9F5]">
                  <Camera className="w-3 h-3 text-[#E8D3A6]" />
                  <span>Phóng lớn</span>
                </span>
              </div>

              {/* Dedicated Unobstructed Editorial Caption Strip */}
              <figcaption className="bg-[#0A3622] text-[#FAF9F5] px-4 py-3.5 sm:px-7 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 border-b border-[#0A3622]">
                <div>
                  <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.2em] text-[#E8D3A6] font-bold block">
                    BAN ĐIỀU HÀNH HỆ THỐNG VÙNG KHÁNH VÂN
                  </span>
                  <p className="font-serif italic text-[14.5px] sm:text-xl text-[#FAF9F5] leading-snug mt-0.5">
                    Thế hệ quản lý bản lĩnh, chuyên môn sâu và làm nghề chuẩn mực tại Manulife Việt Nam
                  </p>
                </div>
                <span className="hidden md:inline-block text-[10.5px] uppercase tracking-[0.16em] text-[#B9C8C0] shrink-0">
                  Manulife Plaza • TP.HCM
                </span>
              </figcaption>
            </figure>

            {/* 4 Key Institutional Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#E4E1D8]">
              <div className="bg-[#FAF9F5] p-4 sm:p-7 space-y-0.5 sm:space-y-1">
                <span className="font-serif text-2xl sm:text-4xl text-[#0A3622] font-semibold block">
                  500+
                </span>
                <span className="text-[10.5px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#181F1C] font-bold block">
                  Nhân sự toàn vùng
                </span>
                <p className="text-[11px] sm:text-xs text-[#56605B] leading-snug">
                  Phát triển bền vững từ 2018
                </p>
              </div>

              <div className="bg-[#FAF9F5] p-4 sm:p-7 space-y-0.5 sm:space-y-1">
                <span className="font-serif text-2xl sm:text-4xl text-[#0A3622] font-semibold block">
                  64
                </span>
                <span className="text-[10.5px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#181F1C] font-bold block">
                  Quản lý kinh doanh
                </span>
                <p className="text-[11px] sm:text-xs text-[#56605B] leading-snug">
                  HCM69 • SG168 • SG169 • MN111
                </p>
              </div>

              <div className="bg-[#FAF9F5] p-4 sm:p-7 space-y-0.5 sm:space-y-1">
                <span className="font-serif text-2xl sm:text-4xl text-[#0A3622] font-semibold block">
                  Top 1
                </span>
                <span className="text-[10.5px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#181F1C] font-bold block">
                  Hai giải Quán quân
                </span>
                <p className="text-[11px] sm:text-xs text-[#56605B] leading-snug">
                  Doanh số FYP &amp; Tỷ lệ duy trì hợp đồng
                </p>
              </div>

              <div className="bg-[#FAF9F5] p-4 sm:p-7 space-y-0.5 sm:space-y-1">
                <span className="font-serif text-2xl sm:text-4xl text-[#0A3622] font-semibold block">
                  Châu Á
                </span>
                <span className="text-[10.5px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#181F1C] font-bold block">
                  Giải thưởng Quản lý
                </span>
                <p className="text-[11px] sm:text-xs text-[#56605B] leading-snug">
                  Nhà quản lý xuất sắc Châu Á
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHƯƠNG 02: SƠ ĐỒ TỔ CHỨC HỆ THỐNG VÙNG & BAN GIÁM ĐỐC 4 KHU VỰC */}
      {/* (Đẩy lên ngay sau phần Tổng quan theo yêu cầu) */}
      {/* =================================================================== */}
      <section
        id="cau-truc-vung"
        className="scroll-mt-28 sm:scroll-mt-20 py-12 sm:py-20 bg-[#F2EFE9]/60 border-b border-[#E4E1D8]"
      >
        <div className="max-w-[1220px] w-full min-w-0 mx-auto px-4 sm:px-8 space-y-10 sm:space-y-14">
          {/* 2A. SƠ ĐỒ TỔ CHỨC HỆ THỐNG VÙNG KHÁNH VÂN (Nằm ngay đầu Chương 02) */}
          <div className="bg-white border border-[#DCD8CE] rounded-[4px] p-4 sm:p-6 lg:p-7 shadow-[0_20px_50px_-30px_rgba(10,54,34,0.2)] space-y-5 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 sm:pb-5 border-b border-[#ECE9E0]">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#008746] font-bold">
                  <GitBranch className="w-3.5 h-3.5 shrink-0" />
                  <span>02 / SƠ ĐỒ TỔ CHỨC HỆ THỐNG VÙNG KHÁNH VÂN</span>
                </span>
                <h2 className="font-serif text-xl sm:text-3xl text-[#181F1C] font-semibold leading-snug">
                  Cấu trúc điều hành từ Giám đốc Vùng đến các nhánh chủ lực
                </h2>
              </div>
              <span className="text-[11px] text-[#56605B] bg-[#FAF9F5] border border-[#E4E1D8] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-[2px] self-start sm:self-auto">
                Chạm vào từng người để xem hồ sơ
              </span>
            </div>

            {/* Root Node: SRD Khánh Vân */}
            <div className="flex flex-col items-center">
              <div className="w-full sm:w-auto inline-flex items-center gap-3.5 sm:gap-4 px-4 py-3.5 sm:px-6 sm:py-4 bg-[#0A3622] text-[#FAF9F5] rounded-[4px] border-2 border-[#B8975A] shadow-[0_16px_36px_-18px_rgba(10,54,34,0.55)]">
                <img
                  decoding="async"
                  src="/images/leaders/avatars/khanh-van.jpg"
                  alt="Nguyễn Thị Vân (Khánh Vân) — Giám đốc Vùng Cấp cao"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover object-center border-2 border-[#E8D3A6] shadow-[0_6px_16px_rgba(0,0,0,0.3)] shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.24em] text-[#E8D3A6] font-bold block">
                    SENIOR REGIONAL DIRECTOR • SRD
                  </span>
                  <p className="font-serif text-lg sm:text-2xl font-semibold text-white leading-tight mt-0.5">
                    Nguyễn Thị Vân (Khánh Vân)
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#D7E2DC] mt-0.5 leading-snug">
                    Giám đốc Vùng Cấp cao • 4 Khu vực trực thuộc
                  </p>
                </div>
              </div>

              {/* =========================================================== */}
              {/* MOBILE & TABLET INTERACTIVE CONNECTED ORG TREE (< lg) */}
              {/* =========================================================== */}
              <div className="lg:hidden w-full flex flex-col items-center">
                <div className="w-[2px] h-4 bg-[#CDB98C]" />
                <div className="w-[78%] h-[2px] bg-[#CDB98C] relative">
                  <span className="w-2 h-2 rounded-full bg-[#B8975A] absolute -top-[3px] left-1/2 -translate-x-1/2" />
                </div>
                <div className="grid grid-cols-4 w-full">
                  {REGIONAL_ORG_BRANCHES.map((b) => (
                    <div key={`tick-${b.code}`} className="flex justify-center">
                      <div
                        className={`w-[2px] h-3 ${
                          activeMobileOrgCode === b.code ? 'bg-[#0A3622]' : 'bg-[#CDB98C]'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* 4 Connected Area Selector Nodes */}
                <div className="grid grid-cols-4 gap-1.5 w-full">
                  {REGIONAL_ORG_BRANCHES.map((b) => {
                    const isSelected = activeMobileOrgCode === b.code;
                    return (
                      <button
                        key={`tab-${b.code}`}
                        type="button"
                        onClick={() => setActiveMobileOrgCode(b.code)}
                        className={`py-2 px-1 rounded-[3px] border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0A3622] text-white border-[#B8975A] shadow-sm'
                            : 'bg-[#FAF9F5] text-[#28322D] border-[#DCD8CE]'
                        }`}
                      >
                        <span
                          className={`text-[11px] font-bold tracking-[0.08em] block ${
                            isSelected ? 'text-[#E8D3A6]' : 'text-[#0A3622]'
                          }`}
                        >
                          {b.code}
                        </span>
                        <span
                          className={`text-[9.5px] block truncate mt-0.5 ${
                            isSelected ? 'text-white/90' : 'text-[#56605B]'
                          }`}
                        >
                          {b.code === 'HCM69'
                            ? 'Hạt nhân'
                            : b.code === 'MN111'
                              ? 'Ngân Vũ'
                              : b.code === 'SG168'
                                ? 'M.Phương'
                                : 'H.Trang'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="w-[2px] h-3.5 bg-[#B8975A]" />

                {/* Selected Area Connected Branch Tree */}
                <div className="w-full rounded-[4px] border border-[#0A3622]/35 bg-[#FAF9F5] overflow-hidden">
                  <div
                    onClick={() => {
                      if (activeMobileBranch.headLeaderId) {
                        openLeaderById(activeMobileBranch.headLeaderId);
                      }
                    }}
                    className={`p-3.5 flex items-center justify-between gap-3 ${
                      activeMobileBranch.isCore
                        ? 'bg-[#0A3622] text-white'
                        : 'bg-white text-[#181F1C] border-b border-[#E4E1D8]'
                    } ${activeMobileBranch.headLeaderId ? 'cursor-pointer' : ''}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={activeMobileBranch.headAvatar}
                        alt={activeMobileBranch.headName}
                        className="w-14 h-14 rounded-full object-cover object-center border-2 border-[#B8975A] bg-[#EFECE5] shadow-sm shrink-0"
                      />
                      <div className="min-w-0">
                        <span
                          className={`text-[9.5px] uppercase tracking-[0.16em] font-bold block ${
                            activeMobileBranch.isCore ? 'text-[#E8D3A6]' : 'text-[#008746]'
                          }`}
                        >
                          {activeMobileBranch.areaLabel}
                        </span>
                        <p className="font-serif text-base font-semibold leading-snug">
                          {activeMobileBranch.headName}
                        </p>
                        <p
                          className={`text-[11px] leading-snug ${
                            activeMobileBranch.isCore ? 'text-[#D7E2DC]' : 'text-[#56605B]'
                          }`}
                        >
                          {activeMobileBranch.headRole}
                        </p>
                      </div>
                    </div>
                    {activeMobileBranch.headLeaderId && (
                      <span className="px-2 py-1 bg-[#EBF2EE] text-[#0A3622] text-[10px] font-semibold rounded-[2px] shrink-0">
                        Hồ sơ
                      </span>
                    )}
                  </div>

                  {/* Indented Visual Tree Spine for Sub-Branches */}
                  <div className="p-3.5 space-y-3">
                    {activeMobileBranch.keyManagers.length > 0 ? (
                      <div className="relative ml-3 pl-3.5 border-l-2 border-[#CDB98C] space-y-2.5">
                        {activeMobileBranch.keyManagers.map((mgr) => {
                          const clickable = Boolean(mgr.leaderId);
                          return (
                            <div
                              key={`mob-${activeMobileBranch.code}-${mgr.name}`}
                              onClick={() => openLeaderById(mgr.leaderId)}
                              className={`relative flex items-center gap-3 p-2.5 rounded-[3px] bg-white border border-[#E4E1D8] ${
                                clickable ? 'cursor-pointer active:border-[#0A3622]' : ''
                              }`}
                            >
                              <span className="w-3.5 h-[2px] bg-[#CDB98C] absolute -left-3.5 top-1/2 -translate-y-1/2" />
                              {mgr.avatar && (
                                <img
                                  src={mgr.avatar}
                                  alt={mgr.name}
                                  className="w-12 h-12 rounded-full object-cover object-center border-[1.5px] border-[#C9B78B] bg-[#EFECE5] shadow-[0_2px_6px_rgba(10,54,34,0.08)] shrink-0"
                                />
                              )}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1.5">
                                  <span className="text-[12.5px] font-bold text-[#181F1C] truncate">
                                    {mgr.name}
                                  </span>
                                  <span className="px-1.5 py-0.5 bg-[#EBF2EE] text-[#0A3622] text-[9.5px] font-bold uppercase tracking-[0.08em] rounded-[2px] shrink-0">
                                    {mgr.role}
                                  </span>
                                </div>
                                {mgr.subNote && (
                                  <p className="text-[11px] text-[#56605B] truncate mt-0.5">
                                    {mgr.subNote}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-3 rounded-[3px] bg-white border border-dashed border-[#DCD8CE] text-xs text-[#56605B] leading-relaxed">
                        Các nhánh Trưởng Phòng &amp; Trưởng Nhóm trực thuộc PSSM Ngân Vũ tại khu vực MN111.
                      </div>
                    )}

                    {activeMobileBranch.moreCountNote && (
                      <p className="text-[11px] text-[#56605B] leading-relaxed pt-1">
                        {activeMobileBranch.moreCountNote}
                      </p>
                    )}

                    {(areaCounts[activeMobileBranch.code] || 0) > 0 && (
                      <button
                        type="button"
                        onClick={() => handleSelectAreaHub(activeMobileBranch.code)}
                        className="w-full py-2.5 px-3 bg-[#0A3622] text-white rounded-[2px] text-[11px] font-semibold uppercase tracking-[0.14em] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>
                          Xem cả {areaCounts[activeMobileBranch.code]} hồ sơ {activeMobileBranch.code}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* =========================================================== */}
              {/* DESKTOP 4-COLUMN TREE CONNECTOR LINES (lg+) */}
              {/* =========================================================== */}
              <div className="hidden lg:flex flex-col items-center w-full">
                <div className="w-[2px] h-7 bg-[#CDB98C]" />
                <div className="w-[76%] h-[2px] bg-[#CDB98C] relative">
                  <span className="w-2 h-2 rounded-full bg-[#B8975A] absolute -top-[3px] left-1/2 -translate-x-1/2" />
                </div>
                <div className="grid grid-cols-4 w-full">
                  {[0, 1, 2, 3].map((idx) => (
                    <div key={idx} className="flex justify-center">
                      <div className="w-[2px] h-6 bg-[#CDB98C] relative">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A] absolute -bottom-1 left-1/2 -translate-x-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop 4 Connected Regional Branches */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-4 items-stretch">
              {REGIONAL_ORG_BRANCHES.map((branch) => {
                const count = areaCounts[branch.code] || 0;
                return (
                  <div
                    key={branch.code}
                    className={`rounded-[4px] border flex flex-col justify-between overflow-hidden ${
                      branch.isCore
                        ? 'bg-[#FAF9F5] border-[#0A3622]/45'
                        : 'bg-[#FAF9F5]/75 border-[#DCD8CE]'
                    }`}
                  >
                    <div>
                      <div
                        onClick={() => {
                          if (branch.headLeaderId) {
                            openLeaderById(branch.headLeaderId);
                          } else if (count > 0) {
                            handleSelectAreaHub(branch.code);
                          }
                        }}
                        className={`p-3.5 border-b flex items-center gap-3 ${
                          branch.isCore
                            ? 'bg-[#0A3622] text-white border-[#0A3622]'
                            : 'bg-white text-[#181F1C] border-[#E4E1D8]'
                        } ${branch.headLeaderId || count > 0 ? 'cursor-pointer hover:opacity-95' : ''}`}
                      >
                        <img
                          src={branch.headAvatar}
                          alt={branch.headName}
                          className="w-[62px] h-[62px] rounded-full object-cover object-center border-2 border-[#B8975A] bg-[#EFECE5] shadow-sm shrink-0"
                        />
                        <div className="min-w-0">
                          <span
                            className={`text-[9.5px] uppercase tracking-[0.16em] font-bold block ${
                              branch.isCore ? 'text-[#E8D3A6]' : 'text-[#008746]'
                            }`}
                          >
                            {branch.areaLabel}
                          </span>
                          <p className="font-serif text-[15.5px] font-semibold leading-snug">
                            {branch.headName}
                          </p>
                          <p
                            className={`text-[11px] leading-snug mt-0.5 ${
                              branch.isCore ? 'text-[#D7E2DC]' : 'text-[#56605B]'
                            }`}
                          >
                            {branch.headRole}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 space-y-2.5">
                        {branch.keyManagers.length > 0 ? (
                          branch.keyManagers.map((mgr) => {
                            const clickable = Boolean(mgr.leaderId);
                            return (
                              <div
                                key={`${branch.code}-${mgr.name}`}
                                onClick={() => openLeaderById(mgr.leaderId)}
                                className={`flex items-center gap-2.5 p-2.5 rounded-[3px] bg-white border border-[#E4E1D8] transition-colors ${
                                  clickable
                                    ? 'cursor-pointer hover:border-[#0A3622] group'
                                    : ''
                                }`}
                              >
                                {mgr.avatar && (
                                  <img
                                    src={mgr.avatar}
                                    alt={mgr.name}
                                    className="w-[52px] h-[52px] rounded-full object-cover object-center border-[1.5px] border-[#C9B78B] bg-[#EFECE5] shadow-[0_2px_8px_rgba(10,54,34,0.08)] shrink-0"
                                  />
                                )}
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-[12.5px] font-bold text-[#181F1C] group-hover:text-[#0A3622] truncate">
                                      {mgr.name}
                                    </span>
                                    <span className="px-1.5 py-0.5 bg-[#EBF2EE] text-[#0A3622] text-[9.5px] font-bold uppercase tracking-[0.06em] rounded-[2px] shrink-0">
                                      {mgr.role}
                                    </span>
                                  </div>
                                  {mgr.subNote && (
                                    <p className="text-[10.5px] text-[#56605B] truncate mt-0.5">
                                      {mgr.subNote}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="p-3 rounded-[3px] bg-white border border-dashed border-[#DCD8CE] text-xs text-[#56605B] leading-relaxed">
                            Các nhánh Trưởng Phòng &amp; Trưởng Nhóm trực thuộc PSSM Ngân Vũ tại khu vực MN111.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-3 pb-3.5 pt-1 space-y-2">
                      {branch.moreCountNote && (
                        <p className="text-[11px] text-[#56605B] leading-snug">
                          {branch.moreCountNote}
                        </p>
                      )}
                      {count > 0 && (
                        <button
                          type="button"
                          onClick={() => handleSelectAreaHub(branch.code)}
                          className="w-full py-2 px-3 bg-white hover:bg-[#0A3622] text-[#0A3622] hover:text-white border border-[#DCD8CE] hover:border-[#0A3622] rounded-[2px] text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Lọc xem {count} hồ sơ {branch.code}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2B. BAN GIÁM ĐỐC 4 KHU VỰC TRỰC THUỘC */}
          <div className="space-y-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div className="space-y-1.5 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-[10.5px] sm:text-[11px] uppercase tracking-[0.2em] text-[#008746] font-semibold">
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  <span>BAN GIÁM ĐỐC 4 KHU VỰC TRỰC THUỘC</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-4xl text-[#181F1C] font-medium leading-tight">
                  Bốn khu vực kinh doanh —{' '}
                  <span className="italic text-[#0A3622]">Một chuẩn mực chung</span>
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4A544F] max-w-md leading-relaxed">
                Từ HCM69 — đơn vị hạt nhân — mô hình quản trị chuyên nghiệp đã được nhân rộng sang SG168, SG169 và MN111.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex sm:hidden items-center justify-between text-[11px] text-[#56605B] font-medium">
                <span>4 Khu vực trực thuộc Vùng Khánh Vân</span>
                <span className="text-[#008746] font-semibold inline-flex items-center gap-1">
                  <span>Vuốt ngang</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory gap-3.5 sm:gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0 no-scrollbar">
                {REGIONAL_EXECUTIVE_HUBS.map((hub) => {
                  const memberCount = areaCounts[hub.code] || 0;
                  return (
                    <div
                      key={hub.code}
                      className={`w-[84vw] max-w-[310px] sm:w-auto sm:max-w-none shrink-0 snap-center rounded-[4px] p-4 sm:p-5 border flex flex-col justify-between gap-4 sm:gap-5 transition-all ${
                        hub.isCore
                          ? 'bg-[#0A3622] text-[#FAF9F5] border-[#0A3622] shadow-[0_20px_44px_-24px_rgba(10,54,34,0.6)]'
                          : 'bg-white text-[#181F1C] border-[#DCD8CE] hover:border-[#0A3622]/55 shadow-[0_12px_30px_-24px_rgba(10,54,34,0.16)]'
                      }`}
                    >
                      <div className="space-y-3.5 sm:space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] font-bold rounded-[2px] shrink-0 ${
                              hub.isCore
                                ? 'bg-[#E8D3A6]/20 text-[#E8D3A6] border border-[#E8D3A6]/35'
                                : 'bg-[#EBF2EE] text-[#0A3622]'
                            }`}
                          >
                            {hub.code}
                          </span>
                          <span
                            className={`text-[9.5px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.11em] font-medium text-right truncate ${
                              hub.isCore ? 'text-[#E8D3A6]' : 'text-[#56605B]'
                            }`}
                          >
                            {hub.scaleBadge}
                          </span>
                        </div>

                        <div
                          onClick={() => {
                            if (hub.leadProfileId) {
                              openLeaderById(hub.leadProfileId);
                            } else if (memberCount > 0) {
                              handleSelectAreaHub(hub.code);
                            }
                          }}
                          className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-[4px] border ${
                            hub.isCore
                              ? 'bg-white/[0.06] border-white/15'
                              : 'bg-[#FAF9F5] border-[#ECE9E0]'
                          } ${hub.leadProfileId || memberCount > 0 ? 'cursor-pointer hover:opacity-95' : ''}`}
                        >
                          {hub.coLeadPortrait ? (
                            <div className="flex -space-x-3 shrink-0">
                              <img
                                src={hub.leadPortrait}
                                alt={hub.leadName}
                                className="w-[58px] h-[58px] sm:w-16 sm:h-16 rounded-full object-cover object-center border-2 border-[#B8975A] bg-[#EFECE5] shadow-sm"
                              />
                              <img
                                src={hub.coLeadPortrait}
                                alt={hub.coLeadName || ''}
                                title={`${hub.coLeadName} — ${hub.coLeadRole}`}
                                className="w-[58px] h-[58px] sm:w-16 sm:h-16 rounded-full object-cover object-center border-2 border-[#FAF9F5] bg-[#EFECE5] shadow-sm"
                              />
                            </div>
                          ) : (
                            <img
                              src={hub.leadPortrait}
                              alt={hub.leadName}
                              className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full object-cover object-center border-2 border-[#B8975A] bg-[#EFECE5] shadow-[0_6px_16px_rgba(10,54,34,0.12)] shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <p
                              className={`font-serif text-[16px] sm:text-[17px] font-semibold leading-snug ${
                                hub.isCore ? 'text-white' : 'text-[#181F1C]'
                              }`}
                            >
                              {hub.leadName}
                            </p>
                            <p
                              className={`text-[10.5px] sm:text-[11px] font-medium leading-snug mt-0.5 ${
                                hub.isCore ? 'text-[#E8D3A6]' : 'text-[#008746]'
                              }`}
                            >
                              {hub.leadRole}
                            </p>
                            {hub.coLeadName && (
                              <p className="text-[10px] sm:text-[10.5px] text-[#D7E2DC] mt-0.5 leading-snug">
                                Cùng BM {hub.coLeadName}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h4
                            className={`font-serif text-lg sm:text-xl font-semibold leading-snug ${
                              hub.isCore ? 'text-white' : 'text-[#181F1C]'
                            }`}
                          >
                            {hub.title}
                          </h4>
                          <p
                            className={`text-xs leading-relaxed line-clamp-4 sm:line-clamp-none ${
                              hub.isCore ? 'text-[#D7E2DC]' : 'text-[#4A544F]'
                            }`}
                          >
                            {hub.description}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`pt-3 border-t flex items-center justify-between text-xs font-medium ${
                          hub.isCore
                            ? 'border-white/15 text-[#E8D3A6]'
                            : 'border-[#ECE9E0] text-[#0A3622]'
                        }`}
                      >
                        {memberCount > 0 ? (
                          <button
                            type="button"
                            onClick={() => handleSelectAreaHub(hub.code)}
                            className="w-full flex items-center justify-between cursor-pointer group"
                          >
                            <span>Xem {memberCount} hồ sơ khu vực</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        ) : (
                          <span className="text-[11px] text-[#56605B]">
                            Đang cập nhật hồ sơ trực tuyến
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHƯƠNG 03: DANH BẠ ĐỘI NGŨ PHÂN TẦNG & ĐA NỀN TẢNG */}
      {/* =================================================================== */}
      <section
        id="doi-ngu-quan-ly"
        className="scroll-mt-28 sm:scroll-mt-20 py-12 sm:py-24 border-b border-[#E4E1D8]"
      >
        <div className="max-w-6xl w-full min-w-0 mx-auto px-4 sm:px-8 space-y-7 sm:space-y-10">
          {/* Section Header */}
          <div className="space-y-2 sm:space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[10.5px] sm:text-[11px] uppercase tracking-[0.2em] text-[#008746] font-semibold">
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span>03 / ĐỘI NGŨ QUẢN LÝ &amp; CỐ VẤN • {REGIONAL_LEADERS.length} HỒ SƠ</span>
            </div>
            <h2 className="font-serif text-[26px] sm:text-5xl text-[#181F1C] font-medium leading-tight">
              Những Người Đồng Hành{' '}
              <span className="italic text-[#0A3622]">Tận Tâm &amp; Bản Lĩnh</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#4A544F] leading-relaxed">
              Mỗi người bước vào nghề từ một chuyên môn riêng — Ngân hàng, Kế toán – Chứng khoán, Luật, Giáo dục, Y Dược — nhưng gặp nhau ở chữ “Tâm” và sự minh bạch trong tư vấn. Chạm vào từng hồ sơ để đọc câu chuyện nghề của họ.
            </p>
          </div>

          {/* 3A. UNIFIED COMPACT FILTER & SEARCH PANEL */}
          <div className="bg-white border border-[#DCD8CE] rounded-[4px] p-3.5 sm:p-5 space-y-3 sm:space-y-4 shadow-[0_12px_32px_-24px_rgba(10,54,34,0.14)] min-w-0">
            {/* Row 1: Instant Search + Area Quick Chips */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative w-full md:w-80 order-1 md:order-2">
                <Search className="w-3.5 h-3.5 text-[#858E89] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên, Ngân hàng, Kế toán, Luật, Dược, MDRT..."
                  aria-label="Tìm kiếm quản lý theo tên, nền tảng hoặc danh hiệu"
                  className="w-full pl-8 pr-8 py-2 bg-[#FAF9F5] border border-[#DCD8CE] focus:border-[#0A3622] focus:bg-white rounded-[2px] text-[16px] sm:text-xs text-[#181F1C] placeholder:text-[#858E89] outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Xóa từ khóa tìm kiếm"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#858E89] hover:text-[#181F1C]"
                  >
                    <X className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar order-2 md:order-1">
                <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.14em] text-[#56605B] font-semibold inline-flex items-center gap-1 mr-0.5 shrink-0">
                  <MapPin className="w-3 h-3 text-[#008746]" />
                  <span>Khu vực:</span>
                </span>
                {(['ALL', 'HCM69', 'SG169', 'SG168'] as const).map((area) => {
                  const isActive = activeArea === area;
                  const label =
                    area === 'ALL'
                      ? `Tất cả (${areaCounts.ALL})`
                      : `${area} (${areaCounts[area] || 0})`;
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setActiveArea(area)}
                      className={`shrink-0 px-2.5 py-1 text-[11px] rounded-[2px] border transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#EBF2EE] text-[#0A3622] border-[#008746] font-bold'
                          : 'bg-white text-[#4A544F] border-[#DCD8CE] hover:border-[#0A3622]'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 2: Role Tier Horizontal Scroll Pills */}
            <div className="pt-2.5 border-t border-[#ECE9E0] flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
              {[
                {
                  key: 'ALL' as const,
                  mobileLabel: `Tất cả cấp bậc (${tierCounts.ALL})`,
                  desktopLabel: `Tất cả cấp bậc (${tierCounts.ALL})`,
                },
                {
                  key: 'SM' as const,
                  mobileLabel: `Giám đốc KV • SM (${tierCounts.SM})`,
                  desktopLabel: `Giám đốc Khu vực — SM (${tierCounts.SM})`,
                },
                {
                  key: 'DM' as const,
                  mobileLabel: `Trưởng Phòng • SDM/DM (${tierCounts.DM})`,
                  desktopLabel: `Trưởng Phòng — SDM/DM (${tierCounts.DM})`,
                },
                {
                  key: 'SUM' as const,
                  mobileLabel: `SUM (${tierCounts.SUM})`,
                  desktopLabel: `Trưởng Nhóm Cấp cao — SUM (${tierCounts.SUM})`,
                },
                {
                  key: 'UM' as const,
                  mobileLabel: `UM (${tierCounts.UM})`,
                  desktopLabel: `Trưởng Nhóm — UM (${tierCounts.UM})`,
                },
                {
                  key: 'ADVISOR' as const,
                  mobileLabel: `Cố vấn (${tierCounts.ADVISOR})`,
                  desktopLabel: `Cố vấn Cấp cao (${tierCounts.ADVISOR})`,
                },
              ].map((tab) => {
                const isActive = activeTier === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTier(tab.key)}
                    className={`shrink-0 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11.5px] sm:text-xs rounded-[2px] border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0A3622] text-[#FAF9F5] border-[#0A3622] font-semibold'
                        : 'bg-[#FAF9F5] text-[#4A544F] border-[#E4E1D8] hover:border-[#0A3622] hover:text-[#181F1C]'
                    }`}
                  >
                    <span className="sm:hidden">{tab.mobileLabel}</span>
                    <span className="hidden sm:inline">{tab.desktopLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Row 3: Prior Industry Horizontal Scroll on Mobile / Wrap on Desktop */}
            <div className="pt-2.5 border-t border-[#ECE9E0] space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] uppercase tracking-[0.15em] text-[#008746] font-bold">
                <Briefcase className="w-3 h-3 shrink-0" />
                <span>Nghề nghiệp trước khi đến Manulife:</span>
              </div>

              <div className="flex flex-nowrap md:flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto md:overflow-visible no-scrollbar">
                <button
                  type="button"
                  onClick={() => handleSelectIndustry('ALL')}
                  className={`shrink-0 px-2.5 sm:px-3 py-1.5 text-[11.5px] sm:text-xs rounded-[2px] border transition-colors cursor-pointer ${
                    activeIndustry === 'ALL'
                      ? 'bg-[#0A3622] text-white border-[#0A3622] font-semibold'
                      : 'bg-[#FAF9F5] text-[#28322D] border-[#DCD8CE] hover:border-[#0A3622]'
                  }`}
                >
                  Tất cả ngành ({industryCounts.ALL})
                </button>
                {INDUSTRY_CATEGORIES.map((cat) => {
                  const isSelected = activeIndustry === cat.key;
                  const count = industryCounts[cat.key] || 0;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => handleSelectIndustry(cat.key)}
                      className={`shrink-0 px-2.5 sm:px-3 py-1.5 text-[11.5px] sm:text-xs rounded-[2px] border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#0A3622] text-white border-[#0A3622] font-semibold'
                          : 'bg-[#FAF9F5] text-[#28322D] border-[#DCD8CE] hover:border-[#0A3622]'
                      }`}
                    >
                      <span className="md:hidden">
                        {cat.shortLabel} ({count})
                      </span>
                      <span className="hidden md:inline">
                        {cat.label} ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {hasActiveFilter && (
              <div className="flex items-center justify-between gap-2 text-xs text-[#4A544F] pt-1 border-t border-[#ECE9E0]">
                <span>
                  Hiển thị{' '}
                  <strong className="text-[#0A3622]">{filteredLeaders.length}</strong> /{' '}
                  {REGIONAL_LEADERS.length} hồ sơ
                </span>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[#008746] hover:underline font-semibold cursor-pointer"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            )}
          </div>

          {/* 3B. Empty State or Two-Tier Hierarchical Directory */}
          {filteredLeaders.length === 0 ? (
            <div className="bg-white border border-[#DCD8CE] rounded-[4px] p-8 sm:p-12 text-center space-y-3">
              <p className="font-serif text-xl sm:text-2xl text-[#181F1C]">
                Không tìm thấy hồ sơ phù hợp với bộ lọc hiện tại
              </p>
              <p className="text-xs text-[#56605B]">
                Hãy đặt lại bộ lọc để xem toàn bộ {REGIONAL_LEADERS.length} Quản lý &amp; Cố vấn của Vùng Khánh Vân.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0A3622] text-white text-xs uppercase tracking-[0.16em] font-semibold rounded-[2px] cursor-pointer"
              >
                Xem toàn bộ {REGIONAL_LEADERS.length} hồ sơ
              </button>
            </div>
          ) : (
            <div className="space-y-10 sm:space-y-14">
              {/* ============================================================= */}
              {/* TẦNG 1: BAN GIÁM ĐỐC KHU VỰC & TRƯỞNG PHÒNG KINH DOANH (SM • SDM • DM) */}
              {/* ============================================================= */}
              {seniorFiltered.length > 0 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2 pb-3 border-b border-[#DCD8CE]">
                    <div>
                      <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#008746] font-bold block">
                        LÃNH ĐẠO KHU VỰC &amp; PHÒNG KINH DOANH
                      </span>
                      <h3 className="font-serif text-xl sm:text-3xl text-[#181F1C] font-semibold mt-0.5">
                        Giám đốc Khu vực &amp; Trưởng Phòng ({seniorFiltered.length})
                      </h3>
                    </div>
                    <p className="text-xs text-[#56605B]">
                      Điều hành khu vực và các phòng kinh doanh chủ lực
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-7">
                    {seniorFiltered.map((leader) => (
                      <article
                        key={leader.id}
                        onClick={() => openLeaderDossier(leader)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openLeaderDossier(leader);
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`Xem hồ sơ chi tiết của ${leader.displayName} — ${leader.roleTitle}`}
                        className="group bg-white border border-[#DCD8CE] hover:border-[#0A3622]/65 rounded-[4px] overflow-hidden flex flex-row sm:flex-col justify-between shadow-[0_12px_32px_-24px_rgba(10,54,34,0.2)] hover:shadow-[0_24px_50px_-24px_rgba(10,54,34,0.28)] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0A3622]"
                      >
                        {/* Left Column on Mobile / Top Portrait on sm+ */}
                        <div className="w-[122px] sm:w-full min-h-[172px] sm:min-h-0 self-stretch shrink-0 relative sm:aspect-[3/4] bg-[#EFECE5] overflow-hidden">
                          <img
                            loading="lazy"
                            decoding="async"
                            src={leader.portrait}
                            alt={`${leader.displayName} (${leader.fullName}) — ${leader.roleTitle}`}
                            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                          />
                          <div className="hidden sm:block absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 via-black/15 to-transparent pointer-events-none" />

                          {/* Top Badges */}
                          <div className="absolute top-2 left-2 right-2 sm:top-3.5 sm:left-3.5 sm:right-3.5 flex items-center justify-between gap-1">
                            <span className="px-1.5 sm:px-2.5 py-0.5 bg-[#0A3622]/95 text-[#E8D3A6] text-[9px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.18em] font-bold rounded-[2px] border border-[#B8975A]/40">
                              {leader.roleBadge} • {leader.unitCode}
                            </span>
                            <span className="hidden sm:inline-block px-2 py-0.5 bg-[#FAF9F5]/95 backdrop-blur-sm text-[#0A3622] text-[10px] font-bold uppercase tracking-[0.12em] rounded-[2px] border border-[#DCD8CE]">
                              Từ {leader.joinedYear}
                            </span>
                          </div>

                          {/* Bottom Scale / Photo Pill */}
                          <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3.5 sm:right-3.5 flex items-center justify-between gap-1">
                            <span className="sm:hidden px-1.5 py-0.5 bg-[#FAF9F5]/95 text-[#0A3622] text-[9px] font-bold rounded-[2px]">
                              Từ {leader.joinedYear}
                            </span>
                            {leader.teamScaleBadge ? (
                              <span className="hidden sm:inline-block px-2.5 py-0.5 bg-[#FAF9F5]/95 text-[#0A3622] text-[10px] font-bold uppercase tracking-[0.12em] rounded-[2px] truncate max-w-full">
                                {leader.teamScaleBadge}
                              </span>
                            ) : (
                              <span className="hidden sm:inline-block" />
                            )}
                            {leader.gallery.length > 0 && (
                              <span className="hidden sm:inline-flex px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] tracking-[0.08em] rounded-[2px] items-center gap-1 shrink-0">
                                <Camera className="w-3 h-3 text-[#E8D3A6]" />
                                <span>{leader.gallery.length + 1} ảnh</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Right Column on Mobile / Body + Footer on sm+ */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between p-3.5 sm:p-6 gap-2.5 sm:gap-4">
                          <div className="space-y-2 sm:space-y-4">
                            <div className="space-y-0.5 sm:space-y-1">
                              <span className="text-[9.5px] sm:text-[11px] uppercase tracking-[0.08em] sm:tracking-[0.14em] text-[#008746] font-bold block leading-snug">
                                {leader.roleTitle}
                              </span>
                              <h4 className="font-serif text-[19px] sm:text-[27px] text-[#181F1C] group-hover:text-[#0A3622] font-semibold leading-tight transition-colors">
                                {leader.displayName}
                              </h4>
                              {leader.fullName !== leader.displayName && (
                                <p className="hidden sm:block text-xs text-[#56605B]">
                                  {leader.fullName}
                                </p>
                              )}
                            </div>

                            <div className="p-2 sm:p-3 bg-[#FAF9F5] border border-[#ECE9E0] rounded-[3px] space-y-0.5">
                              <span className="hidden sm:block text-[9.5px] uppercase tracking-[0.16em] text-[#56605B] font-semibold">
                                Trước khi đến Manulife
                              </span>
                              <p className="text-[11px] sm:text-xs font-medium text-[#181F1C] leading-snug line-clamp-2">
                                {leader.priorBackgroundShort}
                              </p>
                            </div>

                            <blockquote className="border-l-2 border-[#B8975A] pl-2.5 sm:pl-3 font-serif italic text-[12.5px] sm:text-[17px] text-[#0A3622] leading-snug line-clamp-2 sm:line-clamp-3">
                              “{leader.quote}”
                            </blockquote>
                          </div>

                          <div className="pt-2 sm:pt-3 border-t border-[#F0EDE6] space-y-2.5">
                            <div className="hidden sm:flex flex-wrap gap-1.5">
                              {leader.badges.slice(0, 3).map((badge) => (
                                <span
                                  key={badge}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#FAF9F5] border border-[#E4E1D8] text-[10.5px] font-medium text-[#28322D] rounded-[2px]"
                                >
                                  <Award className="w-2.5 h-2.5 text-[#008746] shrink-0" />
                                  <span>{badge}</span>
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-[#0A3622] group-hover:text-[#008746] transition-colors">
                              <span className="sm:hidden">Đọc hồ sơ chi tiết</span>
                              <span className="hidden sm:inline">Đọc câu chuyện &amp; hồ sơ chi tiết</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* TẦNG 2: ĐỘI NGŨ TRƯỞNG NHÓM CẤP CAO, TRƯỞNG NHÓM & CỐ VẤN */}
              {/* ============================================================= */}
              {compactFiltered.length > 0 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2 pb-3 border-b border-[#DCD8CE]">
                    <div>
                      <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#008746] font-bold block">
                        QUẢN LÝ NHÓM &amp; CỐ VẤN
                      </span>
                      <h3 className="font-serif text-xl sm:text-3xl text-[#181F1C] font-semibold mt-0.5">
                        Trưởng Nhóm Kinh doanh &amp; Cố vấn Cấp cao ({compactFiltered.length})
                      </h3>
                    </div>
                    <p className="text-xs text-[#56605B]">
                      Chạm vào từng thẻ để xem câu chuyện nghề và danh hiệu
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                    {visibleCompactLeaders.map((leader) => (
                      <article
                        key={leader.id}
                        onClick={() => openLeaderDossier(leader)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openLeaderDossier(leader);
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`Xem hồ sơ chi tiết của ${leader.displayName} — ${leader.roleTitle}`}
                        className="group bg-white border border-[#DCD8CE] hover:border-[#0A3622] rounded-[4px] overflow-hidden flex flex-col justify-between shadow-[0_10px_26px_-20px_rgba(10,54,34,0.18)] hover:shadow-[0_18px_36px_-20px_rgba(10,54,34,0.28)] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0A3622]"
                      >
                        <div>
                          <div className="relative aspect-[3/4] bg-[#EFECE5] overflow-hidden">
                            <img
                              loading="lazy"
                              decoding="async"
                              src={leader.portrait}
                              alt={`${leader.displayName} — ${leader.roleTitle}`}
                              className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />

                            <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1">
                              <span className="px-1.5 sm:px-2 py-0.5 bg-[#0A3622]/90 text-white text-[9px] sm:text-[9.5px] uppercase tracking-[0.08em] sm:tracking-[0.14em] font-bold rounded-[2px] truncate">
                                {leader.roleBadge} • {leader.unitCode}
                              </span>
                              <span className="hidden sm:inline-block px-1.5 py-0.5 bg-[#FAF9F5]/95 text-[#0A3622] text-[9.5px] font-semibold rounded-[2px] shrink-0">
                                {leader.joinedYear}
                              </span>
                            </div>

                            {leader.teamScaleBadge && (
                              <span className="absolute bottom-2 left-2 px-1.5 sm:px-2 py-0.5 bg-[#FAF9F5]/95 text-[#0A3622] text-[9px] sm:text-[9.5px] font-bold rounded-[2px] max-w-[90%] truncate">
                                {leader.teamScaleBadge}
                              </span>
                            )}
                          </div>

                          <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                            <div>
                              <span className="sm:hidden text-[9px] uppercase tracking-[0.05em] text-[#008746] font-bold block truncate">
                                {leader.tierKey === 'SUM'
                                  ? 'Trưởng Nhóm Cấp cao'
                                  : leader.tierKey === 'UM'
                                    ? 'Trưởng Nhóm KD'
                                    : 'Cố vấn Cấp cao'}
                              </span>
                              <span className="hidden sm:block text-[10px] uppercase tracking-[0.12em] text-[#008746] font-bold truncate">
                                {leader.roleTitle}
                              </span>
                              <h4 className="font-serif text-[15.5px] sm:text-[20px] text-[#181F1C] group-hover:text-[#0A3622] font-semibold leading-snug line-clamp-2 mt-0.5">
                                {leader.displayName}
                              </h4>
                            </div>

                            <p className="text-[11px] sm:text-xs text-[#4A544F] font-normal leading-snug line-clamp-2">
                              {leader.priorBackgroundShort}
                            </p>
                          </div>
                        </div>

                        <div className="px-3 sm:px-4 pb-3 pt-2 border-t border-[#F0EDE6] flex items-center justify-between text-[11px] font-semibold text-[#0A3622] group-hover:text-[#008746]">
                          <span>Xem hồ sơ</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Progressive Disclosure Expand / Collapse Button */}
                  {!hasActiveFilter && compactFiltered.length > INITIAL_COMPACT_COUNT && (
                    <div className="pt-3 sm:pt-4 flex flex-col items-center">
                      {!showAllCompact ? (
                        <button
                          type="button"
                          onClick={() => setShowAllCompact(true)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] font-bold rounded-[3px] shadow-[0_14px_30px_-16px_rgba(10,54,34,0.5)] transition-all cursor-pointer"
                        >
                          <span>
                            Xem đủ {REGIONAL_LEADERS.length} hồ sơ (+{hiddenCompactCount})
                          </span>
                          <ChevronDown className="w-4 h-4 text-[#E8D3A6] shrink-0" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setShowAllCompact(false);
                            const el = document.getElementById('doi-ngu-quan-ly');
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-[#FAF9F5] text-[#0A3622] border border-[#DCD8CE] hover:border-[#0A3622] text-xs uppercase tracking-[0.16em] font-semibold rounded-[3px] transition-colors cursor-pointer"
                        >
                          <span>Thu gọn danh sách</span>
                          <ChevronUp className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHƯƠNG 04: NGƯỜI SÁNG LẬP, CHUẨN MỰC VẬN HÀNH & VĂN HÓA HỆ THỐNG */}
      {/* (Đẩy phần Người Sáng Lập & Bản Sắc Chuẩn Mực Vận Hành xuống dưới) */}
      {/* =================================================================== */}
      <section
        id="van-hoa-he-thong"
        className="scroll-mt-28 sm:scroll-mt-20 py-12 sm:py-24 bg-[#F2EFE9]/45 border-b border-[#E4E1D8]"
      >
        <div className="max-w-6xl w-full min-w-0 mx-auto px-4 sm:px-8 space-y-12 sm:space-y-20">
          {/* 4A. NGƯỜI SÁNG LẬP & DẪN DẮT VÙNG + BẢN SẮC & CHUẨN MỰC VẬN HÀNH */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-stretch">
            {/* Founder Column */}
            <div className="lg:col-span-5 bg-white border border-[#DCD8CE] rounded-[4px] p-5 sm:p-8 flex flex-col justify-between gap-4 sm:gap-5 shadow-[0_12px_30px_-24px_rgba(10,54,34,0.16)]">
              <div className="space-y-4">
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <img
                    decoding="async"
                    src="/images/ChanDung_ChiVan_VestXanhNgoc_ThanhLich.jpg"
                    alt="Khánh Vân — Giám đốc Vùng Cấp cao Manulife Việt Nam"
                    className="w-16 h-20 sm:w-20 sm:h-24 rounded-[3px] object-cover object-top border border-[#DCD8CE] shrink-0"
                  />
                  <div className="space-y-0.5 sm:space-y-1 min-w-0">
                    <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.16em] text-[#008746] font-bold block">
                      04 / NGƯỜI SÁNG LẬP &amp; DẪN DẮT VÙNG
                    </span>
                    <h2 className="font-serif text-xl sm:text-[28px] text-[#181F1C] font-semibold leading-tight">
                      Khánh Vân
                    </h2>
                    <p className="text-[11.5px] sm:text-xs text-[#56605B] font-medium leading-snug">
                      Giám đốc Vùng Cấp cao (SRD) • Cựu Quản lý Tài sản ANZ Bank
                    </p>
                  </div>
                </div>

                <blockquote className="font-serif italic text-[16px] sm:text-[19px] text-[#0A3622] leading-relaxed border-l-2 border-[#B8975A] pl-3.5 sm:pl-4">
                  “Một hệ thống mạnh không được đo bằng những lời hứa hào nhoáng, mà bằng phẩm chất của người tư vấn đứng sau từng hợp đồng và tỷ lệ khách hàng vẫn an tâm đồng hành sau 5 năm, 10 năm, 20 năm.”
                </blockquote>

                <p className="text-xs sm:text-[13.5px] text-[#28322D] leading-relaxed">
                  Sau 8 năm làm Quản lý tại ngân hàng quốc tế ANZ, chị Khánh Vân bắt đầu lại từ con số 0 tại Manulife. Chị xây dựng vùng kinh doanh theo tiêu chuẩn khắt khe của ngành ngân hàng: chọn cộng sự tử tế, rèn nghiệp vụ thực chất và trao quyền để mỗi quản lý tỏa sáng bằng thế mạnh riêng.
                </p>
              </div>

              <div className="pt-3 border-t border-[#ECE9E0] flex flex-wrap items-center justify-between gap-2">
                <a
                  href="/#cau-chuyen"
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-[0.14em] text-[#0A3622] hover:text-[#008746] font-bold"
                >
                  <span>Đọc câu chuyện của Khánh Vân</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#56605B] hover:text-[#0A3622] font-medium"
                >
                  <FacebookBrandIcon className="w-3.5 h-3.5 text-[#008746]" />
                  <span>Facebook chính thức</span>
                </a>
              </div>
            </div>

            {/* 3 Core Cultural Pillars */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4 sm:gap-6">
              <div className="space-y-1.5">
                <span className="text-[10.5px] sm:text-[11px] uppercase tracking-[0.2em] text-[#008746] font-semibold block">
                  BẢN SẮC &amp; CHUẨN MỰC VẬN HÀNH
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-[#181F1C] font-medium leading-tight">
                  Ba trụ cột làm nên uy tín của{' '}
                  <span className="italic text-[#0A3622]">Vùng Khánh Vân</span>
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {SYSTEM_PILLARS.map((pillar) => {
                  const IconComp = pillar.icon;
                  return (
                    <div
                      key={pillar.number}
                      className="bg-white border border-[#E4E1D8] rounded-[4px] p-4 sm:p-6 flex items-start gap-3.5 sm:gap-4 hover:border-[#0A3622]/40 transition-colors"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[3px] bg-[#EBF2EE] text-[#0A3622] flex items-center justify-center shrink-0 mt-0.5">
                        <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[10.5px] font-bold tracking-[0.16em] text-[#B8975A] shrink-0">
                            {pillar.number}
                          </span>
                          <h4 className="font-serif text-lg sm:text-2xl text-[#181F1C] font-semibold leading-snug">
                            {pillar.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-[13.5px] text-[#4A544F] leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4B. VĂN HÓA ĐÀO TẠO & ĐỒNG HÀNH THỰC CHIẾN */}
          <div className="space-y-6 sm:space-y-8 pt-6 sm:pt-10 border-t border-[#DCD8CE]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2.5 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-[10.5px] sm:text-[11px] uppercase tracking-[0.2em] text-[#008746] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>VĂN HÓA ĐÀO TẠO &amp; ĐỒNG HÀNH THỰC CHIẾN</span>
                </div>
                <h3 className="font-serif text-[26px] sm:text-4xl text-[#181F1C] font-medium leading-tight">
                  Đằng sau mỗi hợp đồng là{' '}
                  <span className="italic text-[#0A3622]">một tập thể rèn nghề</span>
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4A544F] max-w-md leading-relaxed">
                Tại Hệ thống Vùng Khánh Vân, không ai phải bước đi một mình. Từ phòng huấn luyện nghiệp vụ mỗi sáng đến những buổi rà soát hồ sơ thực chiến, sự chuẩn mực được bồi đắp mỗi ngày.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex md:hidden items-center justify-between text-[11px] text-[#56605B] font-medium">
                <span>Chạm vào ảnh để phóng lớn</span>
                <span className="text-[#008746] font-semibold inline-flex items-center gap-1">
                  <span>Vuốt xem ảnh</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <div className="flex md:grid md:grid-cols-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-3.5 sm:gap-6 -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0 no-scrollbar">
                {REGIONAL_CULTURE_MOMENTS.map((item) => (
                  <figure
                    key={item.id}
                    onClick={() =>
                      setLightbox({
                        src: item.src,
                        tag: item.tag,
                        title: item.title,
                        subtitle: item.subtitle,
                      })
                    }
                    className={`w-[84vw] max-w-[320px] md:w-auto md:max-w-none shrink-0 snap-center ${item.spanClass} bg-white border border-[#DCD8CE] rounded-[4px] overflow-hidden flex flex-col justify-between group cursor-zoom-in shadow-[0_14px_34px_-24px_rgba(10,54,34,0.16)]`}
                  >
                    <div
                      className={`relative overflow-hidden bg-[#EAE7DF] aspect-[16/10] ${
                        item.aspectClass === 'aspect-[16/10]'
                          ? 'md:aspect-[16/10]'
                          : 'md:aspect-[4/3]'
                      }`}
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-700"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 sm:py-1 bg-[#FAF9F5]/95 backdrop-blur-sm text-[9px] sm:text-[9.5px] uppercase tracking-[0.18em] font-bold text-[#0A3622] rounded-[2px] border border-[#DCD8CE]">
                        {item.tag}
                      </span>
                    </div>
                    <figcaption className="p-4 sm:p-5 space-y-1 sm:space-y-1.5 bg-white flex-1">
                      <h4 className="font-serif text-base sm:text-xl text-[#181F1C] font-semibold leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#4A544F] leading-relaxed">
                        {item.subtitle}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHƯƠNG 05: ĐỐI THOẠI & KẾT NỐI TRỰC TIẾP CÙNG KHÁNH VÂN */}
      {/* (Chỉ hiển thị duy nhất SĐT/Zalo & Facebook chính thức của chị Khánh Vân) */}
      {/* =================================================================== */}
      <section
        id="ket-noi-vung"
        className="scroll-mt-28 sm:scroll-mt-20 py-12 sm:py-24 bg-[#0A3622] text-[#FAF9F5]"
      >
        <div className="max-w-6xl w-full min-w-0 mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left Column: Dual-Path Proposition + Khánh Vân Direct Channels */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="space-y-2.5 sm:space-y-3">
                <span className="inline-flex items-center gap-2 text-[10.5px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#E8D3A6] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>05 / ĐỒNG HÀNH CÙNG HỆ THỐNG VÙNG KHÁNH VÂN</span>
                </span>
                <h2 className="font-serif text-[26px] sm:text-5xl font-medium leading-tight text-white">
                  Điểm tựa tài chính gia đình — hoặc một{' '}
                  <span className="italic text-[#E8D3A6]">hành trình sự nghiệp mới</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#D7E2DC] leading-relaxed">
                  Mọi cuộc trò chuyện tại Vùng Khánh Vân đều bắt đầu bằng sự lắng nghe, không áp lực. Thông tin của bạn được bảo mật tuyệt đối, và chị Khánh Vân cùng Ban Điều Hành sẽ trực tiếp phản hồi.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-4 sm:p-5 rounded-[4px] bg-white/[0.06] border border-white/15 space-y-1.5">
                  <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.18em] text-[#E8D3A6] font-bold block">
                    DÀNH CHO KHÁCH HÀNG &amp; GIA ĐÌNH
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-white font-semibold">
                    Hoạch định Bảo vệ &amp; Gia sản
                  </h3>
                  <p className="text-xs text-[#D7E2DC] leading-relaxed">
                    Rà soát hợp đồng hiện có hoặc thiết kế giải pháp y tế, học vấn, hưu trí trong khoảng 10–15% thu nhập gia đình.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-[4px] bg-white/[0.06] border border-white/15 space-y-1.5">
                  <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.18em] text-[#E8D3A6] font-bold block">
                    DÀNH CHO NGƯỜI CHUYỂN NGÀNH
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-white font-semibold">
                    Lộ trình trở thành Quản lý
                  </h3>
                  <p className="text-xs text-[#D7E2DC] leading-relaxed">
                    Dành cho bạn đang làm Ngân hàng, Kế toán, Luật, Y tế hay Doanh nghiệp và tìm một môi trường làm nghề tử tế, đào tạo thực chất.
                  </p>
                </div>
              </div>

              {/* Official Channels of Khánh Vân ONLY */}
              <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B9C8C0] font-semibold block">
                    KẾT NỐI TRỰC TIẾP CHỊ KHÁNH VÂN (SRD)
                  </span>
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={ZALO_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="font-serif text-2xl text-[#E8D3A6] hover:text-white transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Zalo: {PHONE_DISPLAY}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-white/10 hover:bg-white/20 text-xs text-white transition-colors"
                    >
                      <FacebookBrandIcon className="w-3.5 h-3.5 text-[#E8D3A6]" />
                      <span>Facebook Khánh Vân</span>
                    </a>
                  </div>
                </div>

                <a
                  href="/"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#FAF9F5] hover:text-[#E8D3A6] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Về trang chủ</span>
                </a>
              </div>
            </div>

            {/* Right Column: Concierge Inquiry Form */}
            <div className="lg:col-span-6 bg-[#FAF9F5] text-[#181F1C] rounded-[4px] p-5 sm:p-9 border border-[#DCD8CE] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)]">
              {submitted ? (
                <div className="py-8 sm:py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#EBF2EE] text-[#008746] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#181F1C] font-semibold">
                    Cảm ơn bạn đã gửi lời nhắn
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A544F] max-w-md mx-auto leading-relaxed">
                    Chị Khánh Vân và Ban Điều Hành đã nhận được thông tin và sẽ liên hệ lại với bạn trong thời gian sớm nhất.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#DCD8CE] hover:border-[#0A3622] text-xs uppercase tracking-[0.16em] font-semibold rounded-[2px] cursor-pointer"
                  >
                    Gửi thêm nội dung khác
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                    trackLeadConversion({
                      source: 'contact_form',
                      topic: formData.topic,
                      phone: formData.phone,
                      textContext: `[Trang Vùng Khánh Vân] ${formData.fullName} ${formData.topic} ${formData.note}`,
                    });
                    fetch('/api/lead', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        fullName: formData.fullName,
                        phone: formData.phone,
                        email: formData.email,
                        topic: formData.topic,
                        background: formData.background,
                        note: `[Từ trang Hệ thống Vùng Khánh Vân] ${formData.note}`.trim(),
                        source: 'contact_form',
                      }),
                    }).catch(() => {});
                  }}
                  className="space-y-4 sm:space-y-5"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#008746] font-bold block">
                      ĐẶT LỊCH TRÒ CHUYỆN 1-1
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#181F1C] font-semibold">
                      Để lại thông tin kết nối
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-[0.14em] text-[#4A544F] font-semibold block">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="Nguyễn Văn A"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#DCD8CE] focus:border-[#0A3622] rounded-[2px] text-[16px] sm:text-sm text-[#181F1C] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-[0.14em] text-[#4A544F] font-semibold block">
                        Số điện thoại / Zalo *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="09xx xxx xxx"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#DCD8CE] focus:border-[#0A3622] rounded-[2px] text-[16px] sm:text-sm text-[#181F1C] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-[0.14em] text-[#4A544F] font-semibold block">
                      Nhu cầu bạn đang quan tâm
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) =>
                        setFormData({ ...formData, topic: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-white border border-[#DCD8CE] focus:border-[#0A3622] rounded-[2px] text-[16px] sm:text-sm text-[#181F1C] outline-none"
                    >
                      <option value="Hoạch định Bảo vệ & Tài chính Gia đình">
                        Hoạch định Bảo vệ &amp; Tài chính Gia đình
                      </option>
                      <option value="Rà soát Quyền lợi Hợp đồng Bảo hiểm Hiện hữu">
                        Rà soát Quyền lợi Hợp đồng Bảo hiểm Hiện hữu
                      </option>
                      <option value="Đối thoại Sự nghiệp & Lộ trình Quản lý Kế cận">
                        Trò chuyện về Sự nghiệp &amp; Lộ trình Quản lý
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-[0.14em] text-[#4A544F] font-semibold block">
                      Lời nhắn hoặc câu hỏi riêng (không bắt buộc)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.note}
                      onChange={(e) =>
                        setFormData({ ...formData, note: e.target.value })
                      }
                      placeholder="Chia sẻ ngắn gọn mong muốn của gia đình bạn hoặc lĩnh vực công việc hiện tại..."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#DCD8CE] focus:border-[#0A3622] rounded-[2px] text-[16px] sm:text-sm text-[#181F1C] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-xs uppercase tracking-[0.18em] font-bold rounded-[2px] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Gửi yêu cầu kết nối</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Institutional Footer (Khánh Vân Official Contact Only) */}
      <footer className="bg-[#072618] text-[#B9C8C0] py-8 pb-20 sm:pb-10 border-t border-white/10">
        <div className="max-w-6xl w-full min-w-0 mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A758] shrink-0" />
            <span>
              Hệ Thống Vùng Khánh Vân • Manulife Việt Nam (HCM69 • SG168 • SG169 • MN111)
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#8FA398]">
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Zalo Khánh Vân: {PHONE_DISPLAY}
            </a>
            <span>•</span>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook Khánh Vân
            </a>
          </div>
        </div>
      </footer>

      {/* =================================================================== */}
      {/* AI ADVISOR HYBRID CHATBOT OF KHÁNH VÂN + OFFICIAL ZALO/FB DOCK */}
      {/* =================================================================== */}
      <AiAdvisorWidget
        onOpenVideo={(video) => setActiveVideo(video)}
        hidden={anyModalOpen}
      />

      <aside
        aria-label="Kênh kết nối trực tiếp Khánh Vân"
        className={`fixed bottom-[calc(0.875rem+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] left-3.5 sm:left-6 z-40 flex flex-col gap-2.5 sm:gap-4 items-start pointer-events-auto select-none transition-all duration-300 ${
          anyModalOpen ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="group relative flex items-center justify-start">
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat trực tiếp qua Zalo với Khánh Vân: ${PHONE_DISPLAY}`}
            className="relative w-10 h-10 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center bg-gradient-to-br from-[#00A758] via-[#008746] to-[#0A3622] text-white shadow-[0_6px_20px_rgba(0,167,88,0.34)] hover:shadow-[0_10px_28px_rgba(0,167,88,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border-2 border-white"
          >
            <span className="manulife-halo absolute -inset-1 rounded-full bg-[#00A758]/35 pointer-events-none" />
            <span className="relative z-10 font-sans font-extrabold tracking-tight text-[11px] sm:text-[13.5px] text-white leading-none select-none">
              Zalo
            </span>
            <span className="absolute bottom-0 right-0 z-20 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#22C55E] border-2 border-white rounded-full" />
          </a>

          <div className="hidden md:flex items-center gap-2 px-3.5 py-2 ml-3.5 rounded-full bg-[#0A3622]/95 backdrop-blur-md text-[#FAF9F5] text-xs shadow-[0_8px_24px_rgba(10,54,34,0.24)] border border-[#00A758]/35 whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
            <span className="text-white/85">Chat Zalo Khánh Vân:</span>
            <strong className="font-medium tracking-wide text-white">{PHONE_DISPLAY}</strong>
          </div>
        </div>

        <div className="group relative flex items-center justify-start">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kết nối Facebook Khánh Vân"
            className="relative w-10 h-10 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center bg-gradient-to-br from-[#0D5C38] via-[#0A3622] to-[#062316] text-white shadow-[0_6px_20px_rgba(10,54,34,0.34)] hover:shadow-[0_10px_28px_rgba(0,135,70,0.48)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border-2 border-white"
          >
            <span className="manulife-halo-delayed absolute -inset-1 rounded-full bg-[#008746]/32 pointer-events-none" />
            <MessengerBrandSvg className="w-5 h-5 sm:w-[25px] sm:h-[25px] text-white relative z-10" />
            <span className="absolute bottom-0 right-0 z-20 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#22C55E] border-2 border-white rounded-full" />
          </a>

          <div className="hidden md:flex items-center gap-2 px-3.5 py-2 ml-3.5 rounded-full bg-[#0A3622]/95 backdrop-blur-md text-[#FAF9F5] text-xs shadow-[0_8px_24px_rgba(10,54,34,0.24)] border border-[#00A758]/35 whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
            <span className="text-white/85">Facebook chính thức:</span>
            <strong className="font-medium tracking-wide text-white">Khánh Vân</strong>
          </div>
        </div>
      </aside>

      {/* =================================================================== */}
      {/* EXECUTIVE LEADER DOSSIER MODAL (NO Individual FB/Phone — System CTA Only) */}
      {/* =================================================================== */}
      <AnimatePresence>
        {selectedLeader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedLeaderId(null)}
            className="fixed inset-0 z-50 bg-[#121815]/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.99 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`Hồ sơ chi tiết ${selectedLeader.displayName}`}
              className="relative w-full max-w-full sm:max-w-5xl max-h-[92vh] sm:max-h-[88vh] bg-[#FAF9F5] border-t sm:border border-[#DCD8CE] rounded-t-[14px] sm:rounded-[4px] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Sticky Top Bar */}
              <div className="px-3.5 sm:px-6 py-3 bg-white border-b border-[#E4E1D8] flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-[#56605B] min-w-0">
                  <span className="font-serif font-bold text-[#0A3622] shrink-0">
                    HỒ SƠ {selectedLeader.index}/{String(REGIONAL_LEADERS.length).padStart(2, '0')}
                  </span>
                  <span>•</span>
                  <span className="uppercase tracking-[0.12em] text-[10px] sm:text-[10.5px] font-bold text-[#181F1C] truncate">
                    {selectedLeader.unitCode}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => navigateLeaderModal(-1)}
                    title="Hồ sơ trước"
                    aria-label="Hồ sơ trước"
                    className="w-8 h-8 flex items-center justify-center border border-[#DCD8CE] hover:border-[#0A3622] rounded-[2px] text-[#181F1C] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateLeaderModal(1)}
                    title="Hồ sơ tiếp theo"
                    aria-label="Hồ sơ tiếp theo"
                    className="w-8 h-8 flex items-center justify-center border border-[#DCD8CE] hover:border-[#0A3622] rounded-[2px] text-[#181F1C] cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLeaderId(null)}
                    aria-label="Đóng hồ sơ"
                    className="ml-0.5 h-8 inline-flex items-center gap-1 px-2.5 sm:px-3 bg-[#181F1C] hover:bg-[#0A3622] text-white text-xs font-medium rounded-[2px] cursor-pointer transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Đóng</span>
                  </button>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="overflow-y-auto overscroll-contain flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Mobile & Tablet Compact Hero inside Modal */}
                  <div className="lg:hidden bg-white border-b border-[#E4E1D8] p-4 space-y-3">
                    <div className="flex items-start gap-3.5">
                      <div
                        onClick={() => {
                          const current = modalPhotos[activeModalPhotoIdx];
                          if (current) {
                            setLightbox({
                              src: current.src,
                              tag: `${selectedLeader.displayName.toUpperCase()} • KHU VỰC ${selectedLeader.unitCode}`,
                              title: current.caption,
                            });
                          }
                        }}
                        className="w-[106px] sm:w-[132px] aspect-[3/4] bg-[#EFECE5] rounded-[3px] overflow-hidden border border-[#DCD8CE] shrink-0 relative cursor-zoom-in"
                      >
                        <img
                          src={
                            modalPhotos[activeModalPhotoIdx]?.src ||
                            selectedLeader.portrait
                          }
                          alt={selectedLeader.displayName}
                          className="w-full h-full object-cover object-top"
                        />
                        <span className="absolute bottom-1.5 right-1.5 p-1 bg-black/60 text-white rounded-[2px]">
                          <Camera className="w-3 h-3 text-[#E8D3A6]" />
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2 py-0.5 bg-[#0A3622] text-[#E8D3A6] text-[10px] font-bold uppercase tracking-[0.14em] rounded-[2px]">
                            {selectedLeader.roleBadge} • {selectedLeader.unitCode}
                          </span>
                        </div>
                        <p className="text-[11px] uppercase tracking-[0.1em] text-[#008746] font-bold leading-snug">
                          {selectedLeader.roleTitle}
                        </p>
                        <h2 className="font-serif text-2xl sm:text-3xl text-[#181F1C] font-semibold leading-tight">
                          {selectedLeader.displayName}
                        </h2>
                        {selectedLeader.fullName !== selectedLeader.displayName && (
                          <p className="text-xs text-[#56605B]">
                            {selectedLeader.fullName}
                          </p>
                        )}
                        <p className="text-[11.5px] text-[#4A544F] pt-0.5 leading-snug">
                          {selectedLeader.tenureLabel}
                        </p>
                      </div>
                    </div>

                    {modalPhotos.length > 1 && (
                      <div className="pt-2.5 border-t border-[#ECE9E0] space-y-1.5">
                        <span className="text-[10px] uppercase tracking-[0.14em] text-[#56605B] font-semibold block">
                          Chọn ảnh chân dung &amp; hoạt động ({modalPhotos.length})
                        </span>
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                          {modalPhotos.map((photo, pIdx) => (
                            <button
                              key={photo.src}
                              type="button"
                              onClick={() => setActiveModalPhotoIdx(pIdx)}
                              className={`w-14 h-14 shrink-0 rounded-[2px] overflow-hidden border-2 transition-all cursor-pointer ${
                                activeModalPhotoIdx === pIdx
                                  ? 'border-[#008746]'
                                  : 'border-transparent opacity-70'
                              }`}
                            >
                              <img
                                src={photo.src}
                                alt=""
                                className="w-full h-full object-cover object-top"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Desktop Left Portrait & Gallery Column */}
                  <div className="hidden lg:flex lg:col-span-5 bg-[#EFECE5] p-6 border-r border-[#E4E1D8] flex-col justify-between gap-4">
                    <div className="space-y-3">
                      <div
                        onClick={() => {
                          const current = modalPhotos[activeModalPhotoIdx];
                          if (current) {
                            setLightbox({
                              src: current.src,
                              tag: `${selectedLeader.displayName.toUpperCase()} • KHU VỰC ${selectedLeader.unitCode}`,
                              title: current.caption,
                            });
                          }
                        }}
                        className="relative aspect-[3/4] bg-[#E4E1D8] rounded-[3px] overflow-hidden border border-[#DCD8CE] cursor-zoom-in group"
                      >
                        <img
                          src={
                            modalPhotos[activeModalPhotoIdx]?.src ||
                            selectedLeader.portrait
                          }
                          alt={selectedLeader.displayName}
                          className="w-full h-full object-cover object-top"
                        />
                        <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.14em] rounded-[2px] inline-flex items-center gap-1">
                          <Camera className="w-3 h-3 text-[#E8D3A6]" />
                          <span>Phóng lớn</span>
                        </span>
                      </div>

                      {modalPhotos[activeModalPhotoIdx]?.caption && (
                        <p className="text-[11px] text-[#4A544F] italic leading-snug">
                          {modalPhotos[activeModalPhotoIdx].caption}
                        </p>
                      )}
                    </div>

                    {modalPhotos.length > 1 && (
                      <div className="space-y-2 pt-2 border-t border-[#DCD8CE]">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#4A544F] font-semibold block">
                          Hình ảnh chân dung &amp; hoạt động ({modalPhotos.length})
                        </span>
                        <div className="grid grid-cols-4 gap-2">
                          {modalPhotos.map((photo, pIdx) => (
                            <button
                              key={photo.src}
                              type="button"
                              onClick={() => setActiveModalPhotoIdx(pIdx)}
                              className={`aspect-square rounded-[2px] overflow-hidden border-2 transition-all cursor-pointer ${
                                activeModalPhotoIdx === pIdx
                                  ? 'border-[#008746] ring-1 ring-[#008746]'
                                  : 'border-transparent opacity-70 hover:opacity-100'
                              }`}
                            >
                              <img
                                src={photo.src}
                                alt=""
                                className="w-full h-full object-cover object-top"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Editorial Dossier Column */}
                  <div className="lg:col-span-7 p-4 sm:p-8 space-y-5 sm:space-y-6 bg-[#FAF9F5]">
                    <div className="hidden lg:block space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-[#0A3622] text-[#FAF9F5] text-[11px] font-bold uppercase tracking-[0.16em] rounded-[2px]">
                          {selectedLeader.roleBadge}
                        </span>
                        <span className="text-xs uppercase tracking-[0.14em] text-[#008746] font-bold">
                          {selectedLeader.roleTitle}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-baseline gap-3">
                        <h2 className="font-serif text-3xl sm:text-4xl text-[#181F1C] font-semibold">
                          {selectedLeader.displayName}
                        </h2>
                        {selectedLeader.fullName !== selectedLeader.displayName && (
                          <span className="text-sm text-[#56605B]">
                            ({selectedLeader.fullName})
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 sm:p-4 bg-white border border-[#E4E1D8] rounded-[3px]">
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#56605B] font-semibold block">
                          Trước khi đến Manulife
                        </span>
                        <p className="text-xs font-medium text-[#181F1C] leading-snug">
                          {selectedLeader.priorBackgroundFull}
                        </p>
                      </div>

                      <div className="hidden sm:block space-y-0.5 sm:border-l sm:border-[#ECE9E0] sm:pl-3.5">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#56605B] font-semibold block">
                          Thâm niên &amp; Gắn bó
                        </span>
                        <p className="text-xs font-medium text-[#181F1C] leading-snug">
                          {selectedLeader.tenureLabel}
                        </p>
                      </div>

                      <div className="space-y-0.5 pt-2.5 border-t border-[#ECE9E0]">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#56605B] font-semibold block">
                          Khu vực &amp; Quản lý trực tiếp
                        </span>
                        <p className="text-xs font-semibold text-[#0A3622] leading-snug">
                          Khu vực {selectedLeader.unitCode} • {selectedLeader.directLeader}
                        </p>
                      </div>

                      <div className="space-y-0.5 pt-2.5 border-t border-[#ECE9E0] sm:border-l sm:pl-3.5">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#56605B] font-semibold block">
                          Dấu ấn nổi bật
                        </span>
                        <p className="text-xs font-semibold text-[#0A3622] leading-snug">
                          {selectedLeader.highlightNote}
                        </p>
                      </div>
                    </div>

                    <blockquote className="border-l-2 border-[#B8975A] pl-3.5 sm:pl-4 py-0.5 font-serif italic text-[17px] sm:text-2xl text-[#0A3622] leading-snug">
                      “{selectedLeader.quote}”
                    </blockquote>

                    <div className="space-y-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#008746] font-bold block">
                        CÂU CHUYỆN NGHỀ
                      </span>
                      <div className="space-y-3 text-[13px] sm:text-[14px] text-[#28322D] leading-[1.78]">
                        {selectedLeader.editorialBio.map((para, idx) => (
                          <p key={idx}>{para}</p>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E4E1D8] space-y-2.5">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#56605B] font-bold block">
                        DANH HIỆU &amp; THẾ MẠNH
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedLeader.badges.map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#EBF2EE] text-[#0A3622] text-[11px] font-semibold rounded-[2px]"
                          >
                            <Award className="w-3 h-3 text-[#008746] shrink-0" />
                            <span>{badge}</span>
                          </span>
                        ))}
                        {selectedLeader.specialties.map((spec) => (
                          <span
                            key={spec}
                            className="px-2.5 py-1 bg-white border border-[#DCD8CE] text-[11px] text-[#28322D] rounded-[2px]"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Desktop Action Button (System-Level Connection Only) */}
                    <div className="hidden sm:flex pt-4 border-t border-[#E4E1D8] items-center">
                      <button
                        type="button"
                        onClick={() => handleConnectFromLeader(selectedLeader)}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-xs uppercase tracking-[0.16em] font-bold rounded-[2px] transition-colors cursor-pointer"
                      >
                        <span>Đặt lịch trò chuyện cùng Vùng Khánh Vân</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Mobile Bottom CTA Bar inside Modal (System-Level Connection Only) */}
              <div className="sm:hidden px-3.5 py-3 bg-white border-t border-[#E4E1D8] flex items-center shrink-0">
                <button
                  type="button"
                  onClick={() => handleConnectFromLeader(selectedLeader)}
                  className="w-full py-3 px-4 bg-[#0A3622] text-[#FAF9F5] text-xs uppercase tracking-[0.14em] font-bold rounded-[2px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Đặt lịch trò chuyện</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* INLINE VIDEO MODAL (FOR VIDEOS OPENED FROM KHÁNH VÂN CHATBOT) */}
      {/* =================================================================== */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-[55] bg-[#121815]/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF9F5] border border-[#DCD8CE] rounded-[6px] overflow-hidden shadow-2xl max-w-[360px] sm:max-w-[680px] w-full flex flex-col sm:flex-row"
            >
              <div className="bg-black mx-auto shrink-0 w-[300px] h-[534px] sm:w-[320px] sm:h-[568px]">
                <iframe
                  src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                    activeVideo.url
                  )}&show_text=false&autoplay=false&mute=0&width=320&height=568`}
                  width="320"
                  height="568"
                  className="w-full h-full border-0 overflow-hidden"
                  scrolling="no"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={activeVideo.title}
                />
              </div>

              <div className="p-4 sm:p-6 flex flex-col justify-between gap-4 flex-1">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-[#008746] font-bold">
                      {activeVideo.folderShort}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveVideo(null)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#181F1C] text-white text-xs rounded-[2px] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Đóng</span>
                    </button>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#181F1C] font-semibold leading-snug">
                    {activeVideo.title}
                  </h3>
                  <p className="text-xs text-[#4A544F] leading-relaxed">
                    {activeVideo.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E4E1D8] flex flex-col gap-2">
                  <a
                    href={activeVideo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#0A3622] text-white text-xs uppercase tracking-[0.14em] font-semibold rounded-[2px]"
                  >
                    <span>Mở trên Facebook Khánh Vân</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* IMAGE LIGHTBOX MODAL */}
      {/* =================================================================== */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full space-y-3"
            >
              <div className="flex items-center justify-between gap-2 text-white/80 text-xs">
                <span className="uppercase tracking-[0.16em] text-[#E8D3A6] text-[10px] font-semibold truncate">
                  {lightbox.tag}
                </span>
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-[2px] cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Đóng</span>
                </button>
              </div>
              <div className="bg-black/40 rounded-[4px] overflow-hidden flex items-center justify-center max-h-[75vh]">
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>
              <div className="text-center space-y-1">
                <p className="font-serif text-base sm:text-xl text-white">
                  {lightbox.title}
                </p>
                {lightbox.subtitle && (
                  <p className="text-xs text-white/75 max-w-2xl mx-auto">
                    {lightbox.subtitle}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
