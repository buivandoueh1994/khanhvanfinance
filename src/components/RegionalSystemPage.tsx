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
import { trackEvent, trackLeadConversion } from '../utils/analytics';

const ZALO_URL = 'https://zalo.me/0931579771';
const PHONE_DISPLAY = '0931 579 771';
const INITIAL_COMPACT_COUNT = 12;

const SYSTEM_PILLARS = [
  {
    number: '01',
    icon: ShieldCheck,
    title: 'Minh Bạch Ngay Từ Trang Đầu Tiên',
    desc: 'Văn hóa tư vấn bắt đầu từ việc đọc kỹ điều khoản loại trừ, thời gian chờ và thiết kế đúng định mức 10–15% thu nhập ổn định — nền tảng giúp toàn vùng giữ vững vị trí Top 1 Toàn quốc về Tỷ lệ Duy trì Hợp đồng.',
  },
  {
    number: '02',
    icon: Building2,
    title: 'Hội Tụ Nhân Sự Có Nền Tảng Chuyên Môn Sâu',
    desc: 'Đội ngũ quản lý kế cận quy tụ những cá nhân trưởng thành từ Ngân hàng, Kế toán – Kiểm toán, Luật sư, Y tế, Giáo dục và Quản trị doanh nghiệp — mang đến góc nhìn hoạch định dòng tiền thực chất.',
  },
  {
    number: '03',
    icon: Compass,
    title: 'Cơ Chế Đồng Hành & Bảo Chứng Hệ Thống',
    desc: 'Mỗi gia đình khách hàng không làm việc với một tư vấn viên đơn lẻ, mà luôn có sự bảo chứng xuyên suốt của cấu trúc quản trị nhiều tầng thuộc Hệ thống Vùng Khánh Vân tại Manulife Việt Nam.',
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
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);
  const [activeModalPhotoIdx, setActiveModalPhotoIdx] = useState<number>(0);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

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

  // Lock body scroll & handle Esc / Left / Right keys when modal or lightbox is open
  useEffect(() => {
    if (!selectedLeader && !lightbox) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightbox) {
          setLightbox(null);
        } else {
          setSelectedLeaderId(null);
        }
      } else if (!lightbox && selectedLeader) {
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

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#181F1C] selection:bg-[#0A3622] selection:text-white">
      {/* =================================================================== */}
      {/* STICKY EDITORIAL HEADER */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E4E1D8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-3 group shrink-0"
            title="Về trang chủ Khánh Vân"
          >
            <span className="w-[3px] h-5 bg-[#008746] inline-block" />
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl tracking-[0.08em] text-[#181F1C] font-semibold leading-none">
                KHÁNH VÂN
              </span>
              <span className="text-[9.5px] uppercase tracking-[0.2em] text-[#56605B] font-medium mt-1">
                Hệ Thống Vùng • Manulife Việt Nam
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.16em] font-medium text-[#56605B]">
            <a href="#tam-voc" className="hover:text-[#0A3622] transition-colors">
              01. Tầm vóc
            </a>
            <a href="#cau-truc-vung" className="hover:text-[#0A3622] transition-colors">
              02. Cấu trúc &amp; Sơ đồ Vùng
            </a>
            <a href="#doi-ngu-quan-ly" className="hover:text-[#0A3622] transition-colors">
              03. Đội ngũ ({REGIONAL_LEADERS.length})
            </a>
            <a href="#van-hoa-he-thong" className="hover:text-[#0A3622] transition-colors">
              04. Văn hóa
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#DCD8CE] hover:border-[#0A3622] text-xs font-medium text-[#181F1C] rounded-[2px] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Trang chủ</span>
            </a>
            <a
              href="#ket-noi-vung"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-xs uppercase tracking-[0.14em] font-medium rounded-[2px] transition-colors"
            >
              <span>Kết nối Vùng</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* =================================================================== */}
      {/* CHƯƠNG 01: TẦM VÓC TỔ CHỨC & BAN ĐIỀU HÀNH */}
      {/* =================================================================== */}
      <section
        id="tam-voc"
        className="pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-[#E4E1D8]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
          {/* 1A. Editorial Title & Lead */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl space-y-4"
          >
            <div className="inline-flex flex-wrap items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-[#008746] font-semibold">
              <span>01 / TỔNG QUAN TỔ CHỨC</span>
              <span className="w-8 h-px bg-[#B8975A]" />
              <span className="text-[#56605B]">MANULIFE VIỆT NAM</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[66px] leading-[1.06] font-medium text-[#181F1C] tracking-[-0.01em]">
              Hệ Thống Vùng{' '}
              <span className="italic text-[#0A3622]">Khánh Vân</span>
            </h1>

            <p className="text-base sm:text-lg text-[#28322D] font-normal leading-relaxed max-w-3xl pt-1">
              Được kiến tạo từ năm 2018 trên nền tảng kỷ luật quản trị tài sản ngân hàng quốc tế, Hệ thống Vùng Khánh Vân là nơi hội tụ của hơn 500 nhân sự và 64 quản lý kinh doanh tại 4 khu vực trực thuộc cùng chung một kim chỉ nam:{' '}
              <span className="font-medium text-[#0A3622] italic font-serif text-xl sm:text-2xl">
                “Đi chắc để đi xa — Kiến tạo tốc độ từ sự chuẩn mực.”
              </span>
            </p>
          </motion.div>

          {/* 1B. Full-Width Framed Executive Board Portrait + Institutional Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white border border-[#DCD8CE] rounded-[4px] overflow-hidden shadow-[0_24px_60px_-28px_rgba(10,54,34,0.22)]"
          >
            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/BanDieuHanh_ChiVanCungTapTheQuanLy_SanhVom2026.jpg',
                  tag: 'BAN ĐIỀU HÀNH HỆ THỐNG VÙNG KHÁNH VÂN',
                  title:
                    'Giám đốc Vùng Cấp cao Khánh Vân cùng tập thể Quản lý nòng cốt tại Manulife Plaza',
                  subtitle:
                    'Thế hệ lãnh đạo kế cận trưởng thành từ Ngân hàng, Kế toán – Kiểm toán, Luật, Y tế, Giáo dục và Quản trị doanh nghiệp.',
                })
              }
              className="relative aspect-[16/10] sm:aspect-[16/9] bg-[#F2EFE9] overflow-hidden cursor-zoom-in group"
            >
              <img
                fetchPriority="high"
                decoding="async"
                src="/images/BanDieuHanh_ChiVanCungTapTheQuanLy_SanhVom2026.jpg"
                alt="Giám đốc Vùng Cấp cao Khánh Vân cùng Ban Điều Hành Hệ thống Vùng Khánh Vân"
                className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 bg-gradient-to-t from-[#181F1C]/85 via-[#181F1C]/35 to-transparent pointer-events-none" />
              <figcaption className="absolute bottom-4 left-4 right-4 sm:bottom-7 sm:left-8 sm:right-8 flex flex-wrap items-end justify-between gap-3 text-white">
                <div className="max-w-2xl">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#E8D3A6] font-semibold block">
                    BAN ĐIỀU HÀNH HỆ THỐNG VÙNG KHÁNH VÂN
                  </span>
                  <p className="font-serif italic text-lg sm:text-2xl text-[#FAF9F5] leading-snug mt-0.5">
                    Thế hệ lãnh đạo kế cận bản lĩnh, chuyên môn sâu và chuẩn mực tại Manulife Việt Nam
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-sm border border-white/25 rounded-[2px] text-[10px] uppercase tracking-[0.18em] text-[#FAF9F5]">
                  <Camera className="w-3 h-3 text-[#E8D3A6]" />
                  <span>Phóng lớn ảnh</span>
                </span>
              </figcaption>
            </figure>

            {/* 4 Key Institutional Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-[#E4E1D8] bg-[#FAF9F5]">
              <div className="p-5 sm:p-7 space-y-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#0A3622] font-semibold block">
                  500+
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#181F1C] font-bold block">
                  Nhân sự toàn vùng
                </span>
                <p className="text-xs text-[#56605B]">
                  Phát triển bền vững từ con số 0 (2018)
                </p>
              </div>

              <div className="p-5 sm:p-7 space-y-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#0A3622] font-semibold block">
                  64
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#181F1C] font-bold block">
                  Quản lý kinh doanh
                </span>
                <p className="text-xs text-[#56605B]">
                  4 khu vực: HCM69, SG168, SG169, MN111
                </p>
              </div>

              <div className="p-5 sm:p-7 space-y-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#0A3622] font-semibold block">
                  Top 1
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#181F1C] font-bold block">
                  Cú đúp Quán quân 2025
                </span>
                <p className="text-xs text-[#56605B]">
                  Dẫn đầu Doanh số FYP &amp; Tỷ lệ Duy trì HĐ
                </p>
              </div>

              <div className="p-5 sm:p-7 space-y-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#0A3622] font-semibold block">
                  Châu Á
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#181F1C] font-bold block">
                  Giải thưởng Quản lý
                </span>
                <p className="text-xs text-[#56605B]">
                  Nhà Quản lý Xuất sắc &amp; Đáng tin cậy Châu Á
                </p>
              </div>
            </div>
          </motion.div>

          {/* 1C. Regional Founder Note + 3 Operating Standards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch pt-2">
            {/* Founder Column */}
            <div className="lg:col-span-5 bg-[#F2EFE9]/90 border border-[#E4E1D8] rounded-[4px] p-6 sm:p-8 flex flex-col justify-between gap-5">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="/images/ChanDung_ChiVan_VestXanhNgoc_ThanhLich.jpg"
                    alt="Khánh Vân — Giám đốc Vùng Cấp cao Manulife Việt Nam"
                    className="w-20 h-24 rounded-[3px] object-cover object-top border border-[#DCD8CE] shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#008746] font-bold block">
                      NGƯỜI SÁNG LẬP &amp; DẪN DẮT VÙNG
                    </span>
                    <h2 className="font-serif text-2xl sm:text-[28px] text-[#181F1C] font-semibold leading-tight">
                      Khánh Vân
                    </h2>
                    <p className="text-xs text-[#56605B] font-medium leading-snug">
                      Giám đốc Vùng Cấp cao (SRD) • Cựu Quản lý Tài sản ANZ Bank
                    </p>
                  </div>
                </div>

                <blockquote className="font-serif italic text-lg sm:text-[19.5px] text-[#0A3622] leading-relaxed border-l-2 border-[#B8975A] pl-4">
                  “Một hệ thống mạnh không được đo bằng những lời hứa hào nhoáng, mà bằng phẩm chất của người tư vấn đứng sau từng hợp đồng và tỷ lệ khách hàng vẫn an tâm đồng hành sau 5 năm, 10 năm, 20 năm.”
                </blockquote>

                <p className="text-xs sm:text-[13.5px] text-[#28322D] leading-relaxed">
                  Rời vị trí Quản lý tại ngân hàng quốc tế ANZ sau 8 năm gắn bó để bắt đầu hành trình tại Manulife từ con số 0, chị Khánh Vân xây dựng vùng kinh doanh với tiêu chuẩn khắt khe của ngành ngân hàng: tuyển chọn những cộng sự tử tế, rèn luyện nghiệp vụ thực chất và trao quyền để mỗi quản lý tỏa sáng bằng chính thế mạnh riêng.
                </p>
              </div>

              <div className="pt-3 border-t border-[#DCD8CE]">
                <a
                  href="/#cau-chuyen"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#0A3622] hover:text-[#008746] font-bold"
                >
                  <span>Đọc trọn vẹn câu chuyện của Khánh Vân</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 3 Core Cultural Pillars */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#008746] font-semibold block">
                  BẢN SẮC &amp; CHUẨN MỰC VẬN HÀNH
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#181F1C] font-medium leading-tight">
                  Ba trụ cột làm nên uy tín của{' '}
                  <span className="italic text-[#0A3622]">Vùng Khánh Vân</span>
                </h3>
              </div>

              <div className="space-y-4">
                {SYSTEM_PILLARS.map((pillar) => {
                  const IconComp = pillar.icon;
                  return (
                    <div
                      key={pillar.number}
                      className="bg-white border border-[#E4E1D8] rounded-[4px] p-5 sm:p-6 flex items-start gap-4 hover:border-[#0A3622]/40 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-[3px] bg-[#EBF2EE] text-[#0A3622] flex items-center justify-center shrink-0 mt-0.5">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold tracking-[0.18em] text-[#B8975A]">
                            {pillar.number}
                          </span>
                          <h4 className="font-serif text-xl sm:text-2xl text-[#181F1C] font-semibold">
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
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHƯƠNG 02: BAN GIÁM ĐỐC 4 KHU VỰC & SƠ ĐỒ CẤU TRÚC VÙNG */}
      {/* =================================================================== */}
      <section
        id="cau-truc-vung"
        className="py-16 sm:py-24 bg-[#F2EFE9]/60 border-b border-[#E4E1D8]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#008746] font-semibold">
                <Layers className="w-3.5 h-3.5" />
                <span>02 / BAN GIÁM ĐỐC KHU VỰC &amp; SƠ ĐỒ HỆ THỐNG</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#181F1C] font-medium leading-tight">
                Bốn khu vực kinh doanh —{' '}
                <span className="italic text-[#0A3622]">Một chuẩn mực chung</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#4A544F] max-w-md leading-relaxed">
              Từ đơn vị hạt nhân HCM69, Hệ thống Vùng Khánh Vân nhân rộng mô hình quản trị chuyên nghiệp sang các khu vực SG168, SG169 và MN111 với đội ngũ Giám đốc Khu vực trực tiếp điều hành.
            </p>
          </div>

          {/* 2A. 4 Regional Executive Hub Cards with Real Portraits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REGIONAL_EXECUTIVE_HUBS.map((hub) => {
              const memberCount = areaCounts[hub.code] || 0;
              return (
                <div
                  key={hub.code}
                  className={`rounded-[4px] p-5 sm:p-6 border flex flex-col justify-between gap-5 transition-all ${
                    hub.isCore
                      ? 'bg-[#0A3622] text-[#FAF9F5] border-[#0A3622] shadow-[0_20px_44px_-24px_rgba(10,54,34,0.6)]'
                      : 'bg-white text-[#181F1C] border-[#DCD8CE] hover:border-[#0A3622]/55 shadow-[0_12px_30px_-24px_rgba(10,54,34,0.16)]'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Code & Scale Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`px-2.5 py-1 text-[10.5px] uppercase tracking-[0.2em] font-bold rounded-[2px] ${
                          hub.isCore
                            ? 'bg-[#E8D3A6]/20 text-[#E8D3A6] border border-[#E8D3A6]/35'
                            : 'bg-[#EBF2EE] text-[#0A3622]'
                        }`}
                      >
                        {hub.code}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-[0.14em] font-medium ${
                          hub.isCore ? 'text-[#E8D3A6]' : 'text-[#56605B]'
                        }`}
                      >
                        {hub.scaleBadge}
                      </span>
                    </div>

                    {/* Area Director Portrait(s) */}
                    <div
                      onClick={() => {
                        if (hub.leadProfileId) {
                          openLeaderById(hub.leadProfileId);
                        } else if (memberCount > 0) {
                          handleSelectAreaHub(hub.code);
                        }
                      }}
                      className={`flex items-center gap-3.5 p-2.5 rounded-[3px] border ${
                        hub.isCore
                          ? 'bg-white/[0.06] border-white/15'
                          : 'bg-[#FAF9F5] border-[#ECE9E0]'
                      } ${hub.leadProfileId || memberCount > 0 ? 'cursor-pointer hover:opacity-95' : ''}`}
                    >
                      <div className="flex -space-x-2.5 shrink-0">
                        <img
                          loading="lazy"
                          decoding="async"
                          src={hub.leadPortrait}
                          alt={hub.leadName}
                          className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#B8975A]"
                        />
                        {hub.coLeadPortrait && (
                          <img
                            loading="lazy"
                            decoding="async"
                            src={hub.coLeadPortrait}
                            alt={hub.coLeadName || ''}
                            title={`${hub.coLeadName} — ${hub.coLeadRole}`}
                            className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#FAF9F5]"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`font-serif text-lg font-semibold leading-tight truncate ${
                            hub.isCore ? 'text-white' : 'text-[#181F1C]'
                          }`}
                        >
                          {hub.leadName}
                        </p>
                        <p
                          className={`text-[11px] font-medium leading-snug mt-0.5 ${
                            hub.isCore ? 'text-[#E8D3A6]' : 'text-[#008746]'
                          }`}
                        >
                          {hub.leadRole}
                        </p>
                        {hub.coLeadName && (
                          <p className="text-[10.5px] text-[#D7E2DC] mt-0.5 truncate">
                            Cùng BM {hub.coLeadName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h3
                        className={`font-serif text-xl font-semibold leading-snug ${
                          hub.isCore ? 'text-white' : 'text-[#181F1C]'
                        }`}
                      >
                        {hub.title}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed ${
                          hub.isCore ? 'text-[#D7E2DC]' : 'text-[#4A544F]'
                        }`}
                      >
                        {hub.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Action */}
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

          {/* 2B. Interactive Visual Regional Org-Structure Diagram */}
          <div className="bg-white border border-[#DCD8CE] rounded-[4px] p-5 sm:p-8 lg:p-10 shadow-[0_20px_50px_-30px_rgba(10,54,34,0.2)] space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#ECE9E0]">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.2em] text-[#008746] font-bold">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>SƠ ĐỒ TỔ CHỨC HỆ THỐNG VÙNG KHÁNH VÂN</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#181F1C] font-semibold">
                  Cấu trúc điều hành từ Giám đốc Vùng đến các nhánh chủ lực
                </h3>
              </div>
              <span className="text-[11px] text-[#56605B] bg-[#FAF9F5] border border-[#E4E1D8] px-3 py-1.5 rounded-[2px] self-start sm:self-auto">
                Chạm vào từng Quản lý để đọc hồ sơ chi tiết
              </span>
            </div>

            {/* Root Node: SRD Khánh Vân */}
            <div className="flex flex-col items-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 bg-[#0A3622] text-[#FAF9F5] rounded-[4px] border-2 border-[#B8975A] shadow-[0_16px_36px_-18px_rgba(10,54,34,0.55)] text-center sm:text-left">
                <img
                  loading="lazy"
                  decoding="async"
                  src="/images/ChanDung_ChiVan_VestXanhNgoc_ThanhLich.jpg"
                  alt="Nguyễn Thị Vân (Khánh Vân) — Giám đốc Vùng Cấp cao"
                  className="w-16 h-16 rounded-full object-cover object-top border-2 border-[#E8D3A6] shrink-0"
                />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#E8D3A6] font-bold block">
                    SENIOR REGIONAL DIRECTOR • SRD
                  </span>
                  <p className="font-serif text-2xl font-semibold text-white leading-tight mt-0.5">
                    Nguyễn Thị Vân (Khánh Vân)
                  </p>
                  <p className="text-xs text-[#D7E2DC] mt-0.5">
                    Giám đốc Vùng Cấp cao • Điều hành 4 Khu vực Kinh doanh (500+ Nhân sự)
                  </p>
                </div>
              </div>

              {/* Desktop Tree Connector Lines */}
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
              {/* Mobile short connector */}
              <div className="lg:hidden w-[2px] h-5 bg-[#CDB98C]" />
            </div>

            {/* 4 Connected Regional Branches */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
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
                      {/* Branch Top Header */}
                      <div
                        onClick={() => {
                          if (branch.headLeaderId) {
                            openLeaderById(branch.headLeaderId);
                          } else if (count > 0) {
                            handleSelectAreaHub(branch.code);
                          }
                        }}
                        className={`p-4 border-b flex items-center gap-3 ${
                          branch.isCore
                            ? 'bg-[#0A3622] text-white border-[#0A3622]'
                            : 'bg-white text-[#181F1C] border-[#E4E1D8]'
                        } ${branch.headLeaderId || count > 0 ? 'cursor-pointer hover:opacity-95' : ''}`}
                      >
                        <img
                          loading="lazy"
                          decoding="async"
                          src={branch.headAvatar}
                          alt={branch.headName}
                          className="w-11 h-11 rounded-full object-cover object-top border-2 border-[#B8975A] shrink-0"
                        />
                        <div className="min-w-0">
                          <span
                            className={`text-[9.5px] uppercase tracking-[0.2em] font-bold block ${
                              branch.isCore ? 'text-[#E8D3A6]' : 'text-[#008746]'
                            }`}
                          >
                            {branch.areaLabel}
                          </span>
                          <p className="font-serif text-base font-semibold leading-tight truncate">
                            {branch.headName}
                          </p>
                          <p
                            className={`text-[11px] truncate ${
                              branch.isCore ? 'text-[#D7E2DC]' : 'text-[#56605B]'
                            }`}
                          >
                            {branch.headRole}
                          </p>
                        </div>
                      </div>

                      {/* Key Sub-Branches */}
                      <div className="p-3.5 space-y-2">
                        {branch.keyManagers.length > 0 ? (
                          branch.keyManagers.map((mgr) => {
                            const clickable = Boolean(mgr.leaderId);
                            return (
                              <div
                                key={`${branch.code}-${mgr.name}`}
                                onClick={() => openLeaderById(mgr.leaderId)}
                                className={`flex items-center gap-2.5 p-2 rounded-[3px] bg-white border border-[#E4E1D8] transition-colors ${
                                  clickable
                                    ? 'cursor-pointer hover:border-[#0A3622] group'
                                    : ''
                                }`}
                              >
                                {mgr.avatar && (
                                  <img
                                    loading="lazy"
                                    decoding="async"
                                    src={mgr.avatar}
                                    alt={mgr.name}
                                    className="w-9 h-9 rounded-full object-cover object-top border border-[#DCD8CE] shrink-0"
                                  />
                                )}
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold text-[#181F1C] group-hover:text-[#0A3622] truncate">
                                      {mgr.name}
                                    </span>
                                    <span className="px-1.5 py-0.5 bg-[#EBF2EE] text-[#0A3622] text-[9.5px] font-bold uppercase tracking-[0.1em] rounded-[2px] shrink-0">
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

                    {/* Branch Footer Note */}
                    <div className="px-3.5 pb-3.5 pt-1 space-y-2">
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
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHƯƠNG 03: DANH BẠ ĐỘI NGŨ PHÂN TẦNG & ĐA NỀN TẢNG */}
      {/* =================================================================== */}
      <section id="doi-ngu-quan-ly" className="py-16 sm:py-24 border-b border-[#E4E1D8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
          {/* Section Header */}
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#008746] font-semibold">
              <Users className="w-3.5 h-3.5" />
              <span>03 / HỒ SƠ ĐỘI NGŨ QUẢN LÝ &amp; CỐ VẤN ({REGIONAL_LEADERS.length} HỒ SƠ)</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#181F1C] font-medium leading-tight">
              Những Người Đồng Hành{' '}
              <span className="italic text-[#0A3622]">Tận Tâm &amp; Bản Lĩnh</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#4A544F] leading-relaxed">
              Mỗi Quản lý và Chuyên viên trong Hệ thống Vùng Khánh Vân bước vào nghề từ một nền tảng chuyên môn riêng biệt — từ Ngân hàng, Kế toán trưởng, Luật sư, Giáo viên đến Y tế — nhưng gặp nhau ở chữ “Tâm” và sự minh bạch pháp lý. Chạm vào bất kỳ hồ sơ nào để đọc trọn câu chuyện chuyển nghề.
            </p>
          </div>

          {/* 3A. Interactive Multi-Industry Talent Filter Strip */}
          <div className="bg-[#F2EFE9]/80 border border-[#DCD8CE] rounded-[4px] p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[3px] bg-[#0A3622] text-[#E8D3A6] flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#008746] font-bold block">
                    LỌC NHANH THEO NỀN TẢNG XUẤT THÂN TRƯỚC MANULIFE
                  </span>
                  <p className="text-xs text-[#28322D] font-medium">
                    Chọn lĩnh vực chuyên môn để tìm người đồng hành đồng điệu nhất với gia đình hoặc sự nghiệp của bạn:
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSelectIndustry('ALL')}
                className={`px-3 py-1.5 text-xs rounded-[2px] border transition-colors cursor-pointer ${
                  activeIndustry === 'ALL'
                    ? 'bg-[#0A3622] text-white border-[#0A3622] font-semibold'
                    : 'bg-white text-[#28322D] border-[#DCD8CE] hover:border-[#0A3622]'
                }`}
              >
                Tất cả ngành nghề ({industryCounts.ALL})
              </button>
              {INDUSTRY_CATEGORIES.map((cat) => {
                const isSelected = activeIndustry === cat.key;
                const count = industryCounts[cat.key] || 0;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => handleSelectIndustry(cat.key)}
                    className={`px-3 py-1.5 text-xs rounded-[2px] border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#0A3622] text-white border-[#0A3622] font-semibold'
                        : 'bg-white text-[#28322D] border-[#DCD8CE] hover:border-[#0A3622]'
                    }`}
                  >
                    {cat.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3B. Dual-Filter (Role Tier + Area) & Instant Search Toolbar */}
          <div className="bg-white border border-[#DCD8CE] rounded-[4px] p-4 sm:p-5 space-y-4 shadow-[0_12px_32px_-24px_rgba(10,54,34,0.14)]">
            {/* Row 1: Role Tier Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[
                { key: 'ALL' as const, label: `Tất cả cấp bậc (${tierCounts.ALL})` },
                {
                  key: 'SM' as const,
                  label: `Giám đốc Khu vực — SM (${tierCounts.SM})`,
                },
                {
                  key: 'DM' as const,
                  label: `Trưởng Phòng — SDM/DM (${tierCounts.DM})`,
                },
                {
                  key: 'SUM' as const,
                  label: `Trưởng Nhóm Cấp cao — SUM (${tierCounts.SUM})`,
                },
                {
                  key: 'UM' as const,
                  label: `Trưởng Nhóm — UM (${tierCounts.UM})`,
                },
                {
                  key: 'ADVISOR' as const,
                  label: `Cố vấn Cấp cao (${tierCounts.ADVISOR})`,
                },
              ].map((tab) => {
                const isActive = activeTier === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTier(tab.key)}
                    className={`shrink-0 px-3.5 py-2 text-xs rounded-[2px] border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0A3622] text-[#FAF9F5] border-[#0A3622] font-semibold'
                        : 'bg-[#FAF9F5] text-[#4A544F] border-[#E4E1D8] hover:border-[#0A3622] hover:text-[#181F1C]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Row 2: Area Filter Chips + Instant Search Input */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-[#ECE9E0]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10.5px] uppercase tracking-[0.16em] text-[#56605B] font-semibold inline-flex items-center gap-1 mr-1">
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
                      className={`px-2.5 py-1 text-[11px] rounded-[2px] border transition-colors cursor-pointer ${
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

              <div className="relative w-full md:w-80">
                <Search className="w-3.5 h-3.5 text-[#858E89] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên, Luật sư, Ngân hàng, Kế toán, MDRT..."
                  aria-label="Tìm kiếm quản lý theo tên, nền tảng hoặc danh hiệu"
                  className="w-full pl-8 pr-8 py-2 bg-[#FAF9F5] border border-[#DCD8CE] focus:border-[#0A3622] focus:bg-white rounded-[2px] text-xs text-[#181F1C] placeholder:text-[#858E89] outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Xóa từ khóa tìm kiếm"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#858E89] hover:text-[#181F1C]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {hasActiveFilter && (
              <div className="flex items-center justify-between text-xs text-[#4A544F] pt-1">
                <span>
                  Đang hiển thị{' '}
                  <strong className="text-[#0A3622]">{filteredLeaders.length}</strong> /{' '}
                  {REGIONAL_LEADERS.length} hồ sơ phù hợp
                </span>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[#008746] hover:underline font-semibold cursor-pointer"
                >
                  Đặt lại tất cả bộ lọc
                </button>
              </div>
            )}
          </div>

          {/* 3C. Empty State or Two-Tier Hierarchical Directory */}
          {filteredLeaders.length === 0 ? (
            <div className="bg-white border border-[#DCD8CE] rounded-[4px] p-12 text-center space-y-3">
              <p className="font-serif text-2xl text-[#181F1C]">
                Không tìm thấy hồ sơ phù hợp với bộ lọc hiện tại
              </p>
              <p className="text-xs text-[#56605B]">
                Bạn có thể đặt lại bộ lọc để xem toàn bộ {REGIONAL_LEADERS.length} Quản lý &amp; Cố vấn của Hệ thống Vùng Khánh Vân.
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
            <div className="space-y-14">
              {/* ============================================================= */}
              {/* TẦNG 1: BAN GIÁM ĐỐC KHU VỰC & TRƯỞNG PHÒNG KINH DOANH (SM • SDM • DM) */}
              {/* ============================================================= */}
              {seniorFiltered.length > 0 && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[#DCD8CE]">
                    <div>
                      <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#B8975A] font-bold block">
                        CẤP ĐỘ 01 • LÃNH ĐẠO KHU VỰC &amp; PHÒNG KINH DOANH
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#181F1C] font-semibold mt-0.5">
                        Giám đốc Khu vực &amp; Trưởng Phòng Kinh doanh ({seniorFiltered.length})
                      </h3>
                    </div>
                    <p className="text-xs text-[#56605B]">
                      Đội ngũ lãnh đạo trực tiếp điều hành khu vực và các phòng kinh doanh chủ lực
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                    {seniorFiltered.map((leader) => (
                      <motion.article
                        key={leader.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.4 }}
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
                        className="group bg-white border border-[#DCD8CE] hover:border-[#0A3622]/65 rounded-[4px] overflow-hidden flex flex-col justify-between shadow-[0_14px_38px_-24px_rgba(10,54,34,0.18)] hover:shadow-[0_24px_50px_-24px_rgba(10,54,34,0.28)] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0A3622]"
                      >
                        <div>
                          {/* Calibrated 3:4 Portrait */}
                          <div className="relative aspect-[3/4] bg-[#EFECE5] overflow-hidden">
                            <img
                              loading="lazy"
                              decoding="async"
                              src={leader.portrait}
                              alt={`${leader.displayName} (${leader.fullName}) — ${leader.roleTitle}`}
                              className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 via-black/15 to-transparent pointer-events-none" />

                            {/* Top Badges */}
                            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5">
                                <span className="px-2.5 py-0.5 bg-[#0A3622]/95 backdrop-blur-sm text-[#E8D3A6] text-[10px] uppercase tracking-[0.18em] font-bold rounded-[2px] border border-[#B8975A]/40">
                                  {leader.roleBadge} • {leader.unitCode}
                                </span>
                              </div>
                              <span className="px-2 py-0.5 bg-[#FAF9F5]/95 backdrop-blur-sm text-[#0A3622] text-[10px] font-bold uppercase tracking-[0.12em] rounded-[2px] border border-[#DCD8CE]">
                                Từ {leader.joinedYear}
                              </span>
                            </div>

                            {/* Bottom Scale / Photo Pill */}
                            <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between gap-2">
                              {leader.teamScaleBadge ? (
                                <span className="px-2.5 py-0.5 bg-[#FAF9F5]/95 text-[#0A3622] text-[10px] font-bold uppercase tracking-[0.12em] rounded-[2px]">
                                  {leader.teamScaleBadge}
                                </span>
                              ) : (
                                <span />
                              )}
                              {leader.gallery.length > 0 && (
                                <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] tracking-[0.08em] rounded-[2px] inline-flex items-center gap-1">
                                  <Camera className="w-3 h-3 text-[#E8D3A6]" />
                                  <span>{leader.gallery.length + 1} ảnh</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-5 sm:p-6 space-y-4">
                            <div className="space-y-1">
                              <span className="text-[11px] uppercase tracking-[0.14em] text-[#008746] font-bold block">
                                {leader.roleTitle}
                              </span>
                              <h4 className="font-serif text-[26px] sm:text-[28px] text-[#181F1C] group-hover:text-[#0A3622] font-semibold leading-tight transition-colors">
                                {leader.displayName}
                              </h4>
                              {leader.fullName !== leader.displayName && (
                                <p className="text-xs text-[#56605B]">
                                  {leader.fullName}
                                </p>
                              )}
                            </div>

                            {/* Prior Background Callout */}
                            <div className="p-3 bg-[#FAF9F5] border border-[#ECE9E0] rounded-[3px] space-y-0.5">
                              <span className="text-[9.5px] uppercase tracking-[0.16em] text-[#56605B] font-semibold block">
                                Nền tảng trước Manulife
                              </span>
                              <p className="text-xs font-medium text-[#181F1C] leading-snug line-clamp-2">
                                {leader.priorBackgroundShort}
                              </p>
                            </div>

                            {/* Signature Quote */}
                            <blockquote className="border-l-2 border-[#B8975A] pl-3 font-serif italic text-[17px] text-[#0A3622] leading-snug line-clamp-3">
                              “{leader.quote}”
                            </blockquote>
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-3 border-t border-[#F0EDE6] space-y-3">
                          <div className="flex flex-wrap gap-1.5">
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

                          <div className="flex items-center justify-between text-xs font-semibold text-[#0A3622] group-hover:text-[#008746] transition-colors">
                            <span>Đọc câu chuyện &amp; hồ sơ chi tiết</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* TẦNG 2: ĐỘI NGŨ TRƯỞNG NHÓM CẤP CAO, TRƯỞNG NHÓM & CỐ VẤN (COMPACT 4-COL) */}
              {/* ============================================================= */}
              {compactFiltered.length > 0 && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[#DCD8CE]">
                    <div>
                      <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#008746] font-bold block">
                        CẤP ĐỘ 02 • ĐỘI NGŨ QUẢN LÝ NHÓM &amp; CỐ VẤN CHUẨN QUỐC TẾ
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#181F1C] font-semibold mt-0.5">
                        Trưởng Nhóm Kinh doanh &amp; Cố vấn Cấp cao ({compactFiltered.length})
                      </h3>
                    </div>
                    <p className="text-xs text-[#56605B]">
                      Chạm vào từng thẻ để mở toàn bộ câu chuyện nghề và danh hiệu
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
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
                          {/* Calibrated 3:4 Portrait */}
                          <div className="relative aspect-[3/4] bg-[#EFECE5] overflow-hidden">
                            <img
                              loading="lazy"
                              decoding="async"
                              src={leader.portrait}
                              alt={`${leader.displayName} — ${leader.roleTitle}`}
                              className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />

                            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1">
                              <span className="px-2 py-0.5 bg-[#0A3622]/90 text-white text-[9.5px] uppercase tracking-[0.14em] font-bold rounded-[2px]">
                                {leader.roleBadge} • {leader.unitCode}
                              </span>
                              <span className="hidden sm:inline-block px-1.5 py-0.5 bg-[#FAF9F5]/95 text-[#0A3622] text-[9.5px] font-semibold rounded-[2px]">
                                {leader.joinedYear}
                              </span>
                            </div>

                            {leader.teamScaleBadge && (
                              <span className="absolute bottom-2 left-2.5 px-2 py-0.5 bg-[#FAF9F5]/95 text-[#0A3622] text-[9.5px] font-bold rounded-[2px] max-w-[90%] truncate">
                                {leader.teamScaleBadge}
                              </span>
                            )}
                          </div>

                          {/* Compact Body */}
                          <div className="p-3.5 sm:p-4 space-y-2">
                            <div>
                              <span className="text-[10px] uppercase tracking-[0.12em] text-[#008746] font-bold block truncate">
                                {leader.tierLabel}
                              </span>
                              <h4 className="font-serif text-lg sm:text-[21px] text-[#181F1C] group-hover:text-[#0A3622] font-semibold leading-snug truncate mt-0.5">
                                {leader.displayName}
                              </h4>
                            </div>

                            <p className="text-[11px] sm:text-xs text-[#28322D] font-medium leading-snug line-clamp-2 min-h-[2.5em]">
                              {leader.priorBackgroundShort}
                            </p>
                          </div>
                        </div>

                        <div className="px-3.5 sm:px-4 pb-3.5 pt-2.5 border-t border-[#F0EDE6] flex items-center justify-between text-[11px] font-semibold text-[#0A3622] group-hover:text-[#008746]">
                          <span>Xem hồ sơ</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Progressive Disclosure Expand / Collapse Button */}
                  {!hasActiveFilter && compactFiltered.length > INITIAL_COMPACT_COUNT && (
                    <div className="pt-4 flex flex-col items-center gap-2">
                      {!showAllCompact ? (
                        <button
                          type="button"
                          onClick={() => setShowAllCompact(true)}
                          className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-xs uppercase tracking-[0.18em] font-bold rounded-[3px] shadow-[0_14px_30px_-16px_rgba(10,54,34,0.5)] transition-all cursor-pointer"
                        >
                          <span>
                            Xem trọn vẹn cả {REGIONAL_LEADERS.length} hồ sơ (+{hiddenCompactCount} Quản lý &amp; Cố vấn)
                          </span>
                          <ChevronDown className="w-4 h-4 text-[#E8D3A6]" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setShowAllCompact(false);
                            const el = document.getElementById('doi-ngu-quan-ly');
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#FAF9F5] text-[#0A3622] border border-[#DCD8CE] hover:border-[#0A3622] text-xs uppercase tracking-[0.16em] font-semibold rounded-[3px] transition-colors cursor-pointer"
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
      {/* CHƯƠNG 04: NHỊP ĐẬP VĂN HÓA — ĐÀO TẠO & GẮN KẾT HỆ THỐNG */}
      {/* =================================================================== */}
      <section
        id="van-hoa-he-thong"
        className="py-16 sm:py-24 bg-[#F2EFE9]/45 border-b border-[#E4E1D8]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10 sm:space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#008746] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>04 / VĂN HÓA ĐÀO TẠO &amp; ĐỒNG HÀNH THỰC CHIẾN</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#181F1C] font-medium leading-tight">
                Đằng sau mỗi hợp đồng là{' '}
                <span className="italic text-[#0A3622]">một tập thể rèn nghề</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#4A544F] max-w-md leading-relaxed">
              Tại Hệ thống Vùng Khánh Vân, không ai phải bước đi một mình. Từ phòng huấn luyện nghiệp vụ mỗi sáng đến những buổi rà soát hồ sơ thực chiến, sự chuẩn mực được bồi đắp mỗi ngày.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
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
                className={`${item.spanClass} bg-white border border-[#DCD8CE] rounded-[4px] overflow-hidden flex flex-col justify-between group cursor-zoom-in shadow-[0_14px_34px_-24px_rgba(10,54,34,0.16)]`}
              >
                <div className={`relative overflow-hidden bg-[#EAE7DF] ${item.aspectClass}`}>
                  <img
                    loading="lazy"
                    decoding="async"
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-700"
                  />
                  <span className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-[#FAF9F5]/95 backdrop-blur-sm text-[9.5px] uppercase tracking-[0.2em] font-bold text-[#0A3622] rounded-[2px] border border-[#DCD8CE]">
                    {item.tag}
                  </span>
                </div>
                <figcaption className="p-4 sm:p-5 space-y-1.5 bg-white">
                  <h3 className="font-serif text-lg sm:text-xl text-[#181F1C] font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4A544F] leading-relaxed">
                    {item.subtitle}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHƯƠNG 05: ĐỐI THOẠI & KẾT NỐI TRỰC TIẾP CÙNG VÙNG KHÁNH VÂN */}
      {/* =================================================================== */}
      <section id="ket-noi-vung" className="py-16 sm:py-24 bg-[#0A3622] text-[#FAF9F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Dual-Path Proposition + Direct Contact */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#E8D3A6] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>05 / ĐỒNG HÀNH CÙNG HỆ THỐNG VÙNG KHÁNH VÂN</span>
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-medium leading-tight text-white">
                  Điểm tựa tài chính gia đình — hoặc một{' '}
                  <span className="italic text-[#E8D3A6]">hành trình sự nghiệp mới</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#D7E2DC] leading-relaxed">
                  Mọi cuộc trò chuyện tại Vùng Khánh Vân đều bắt đầu từ sự lắng nghe không áp lực. Thông tin của bạn được bảo mật tuyệt đối và phản hồi trực tiếp từ Ban Điều Hành.
                </p>
              </div>

              {/* Dual-Path Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-[4px] bg-white/[0.06] border border-white/15 space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D3A6] font-bold block">
                    DÀNH CHO KHÁCH HÀNG &amp; GIA ĐÌNH
                  </span>
                  <h3 className="font-serif text-xl text-white font-semibold">
                    Hoạch định Bảo vệ &amp; Gia sản
                  </h3>
                  <p className="text-xs text-[#D7E2DC] leading-relaxed">
                    Rà soát hợp đồng hiện hữu hoặc thiết kế giải pháp y tế, học vấn, hưu trí cân đối 10–15% thu nhập gia đình.
                  </p>
                </div>

                <div className="p-5 rounded-[4px] bg-white/[0.06] border border-white/15 space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D3A6] font-bold block">
                    DÀNH CHO NHÂN SỰ CHUYỂN NGÀNH
                  </span>
                  <h3 className="font-serif text-xl text-white font-semibold">
                    Lộ trình Quản lý Kế cận
                  </h3>
                  <p className="text-xs text-[#D7E2DC] leading-relaxed">
                    Dành cho nhân sự Ngân hàng, Kế toán, Luật, Y tế, Doanh nghiệp tìm kiếm môi trường làm nghề tử tế, đào tạo thực chất.
                  </p>
                </div>
              </div>

              {/* Direct Zalo & Return Links */}
              <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B9C8C0] font-semibold block">
                    KẾT NỐI ZALO TRỰC TIẾP KHÁNH VÂN
                  </span>
                  <a
                    href={ZALO_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="font-serif text-2xl text-[#E8D3A6] hover:text-white transition-colors inline-flex items-center gap-2 mt-0.5"
                  >
                    <span>{PHONE_DISPLAY}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <a
                  href="/"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#FAF9F5] hover:text-[#E8D3A6] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Về trang chủ Khánh Vân</span>
                </a>
              </div>
            </div>

            {/* Right Column: Concierge Inquiry Form */}
            <div className="lg:col-span-6 bg-[#FAF9F5] text-[#181F1C] rounded-[4px] p-6 sm:p-9 border border-[#DCD8CE] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)]">
              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#EBF2EE] text-[#008746] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#181F1C] font-semibold">
                    Cảm ơn bạn đã gửi lời nhắn
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A544F] max-w-md mx-auto leading-relaxed">
                    Khánh Vân và Ban Điều Hành Hệ thống Vùng đã ghi nhận thông tin và sẽ liên hệ lại cùng bạn trong thời gian sớm nhất.
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
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#008746] font-bold block">
                      ĐẶT LỊCH TRÒ CHUYỆN 1-1
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#181F1C] font-semibold">
                      Để lại thông tin kết nối
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
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
                        className="w-full px-3.5 py-2.5 bg-white border border-[#DCD8CE] focus:border-[#0A3622] rounded-[2px] text-sm text-[#181F1C] outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
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
                        className="w-full px-3.5 py-2.5 bg-white border border-[#DCD8CE] focus:border-[#0A3622] rounded-[2px] text-sm text-[#181F1C] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.14em] text-[#4A544F] font-semibold block">
                      Nhu cầu bạn đang quan tâm
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) =>
                        setFormData({ ...formData, topic: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-white border border-[#DCD8CE] focus:border-[#0A3622] rounded-[2px] text-sm text-[#181F1C] outline-none"
                    >
                      <option value="Hoạch định Bảo vệ & Tài chính Gia đình">
                        Hoạch định Bảo vệ &amp; Tài chính Gia đình
                      </option>
                      <option value="Rà soát Quyền lợi Hợp đồng Bảo hiểm Hiện hữu">
                        Rà soát Quyền lợi Hợp đồng Bảo hiểm Hiện hữu
                      </option>
                      <option value="Đối thoại Sự nghiệp & Lộ trình Quản lý Kế cận">
                        Đối thoại Sự nghiệp &amp; Lộ trình Quản lý Kế cận
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
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
                      className="w-full px-3.5 py-2.5 bg-white border border-[#DCD8CE] focus:border-[#0A3622] rounded-[2px] text-sm text-[#181F1C] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-bold rounded-[2px] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Gửi Yêu Cầu Kết Nối</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Institutional Footer */}
      <footer className="bg-[#072618] text-[#B9C8C0] py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#00A758]" />
            <span>
              Hệ Thống Vùng Khánh Vân • Manulife Việt Nam (HCM69 • SG168 • SG169 • MN111)
            </span>
          </div>
          <span className="text-[11px] text-[#8FA398]">
            © {new Date().getFullYear()} khanhvanfinance.com
          </span>
        </div>
      </footer>

      {/* =================================================================== */}
      {/* EXECUTIVE LEADER DOSSIER MODAL */}
      {/* =================================================================== */}
      <AnimatePresence>
        {selectedLeader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedLeaderId(null)}
            className="fixed inset-0 z-50 bg-[#121815]/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`Hồ sơ chi tiết ${selectedLeader.displayName}`}
              className="relative w-full max-w-5xl max-h-[92vh] sm:max-h-[88vh] bg-[#FAF9F5] border border-[#DCD8CE] rounded-t-[10px] sm:rounded-[4px] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="px-4 sm:px-6 py-3.5 bg-white border-b border-[#E4E1D8] flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2 text-xs text-[#56605B]">
                  <span className="font-serif font-bold text-[#0A3622]">
                    HỒ SƠ {selectedLeader.index} / {String(REGIONAL_LEADERS.length).padStart(2, '0')}
                  </span>
                  <span>•</span>
                  <span className="uppercase tracking-[0.14em] text-[10.5px] font-bold text-[#181F1C]">
                    Khu vực {selectedLeader.unitCode}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => navigateLeaderModal(-1)}
                    title="Hồ sơ trước"
                    className="p-1.5 border border-[#DCD8CE] hover:border-[#0A3622] rounded-[2px] text-[#181F1C] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateLeaderModal(1)}
                    title="Hồ sơ tiếp theo"
                    className="p-1.5 border border-[#DCD8CE] hover:border-[#0A3622] rounded-[2px] text-[#181F1C] cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLeaderId(null)}
                    aria-label="Đóng hồ sơ"
                    className="ml-1 inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#181F1C] hover:bg-[#0A3622] text-white text-xs font-medium rounded-[2px] cursor-pointer transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Đóng</span>
                  </button>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="overflow-y-auto flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left Visual Column: Main Photo + Gallery Switcher */}
                  <div className="lg:col-span-5 bg-[#EFECE5] p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#E4E1D8] flex flex-col justify-between gap-4">
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

                    {/* Extra Photo Thumbnails if available */}
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
                  <div className="lg:col-span-7 p-5 sm:p-8 space-y-6 bg-[#FAF9F5]">
                    {/* Identity Header */}
                    <div className="space-y-2">
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

                    {/* 4-Cell Executive Metadata Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 bg-white border border-[#E4E1D8] rounded-[3px]">
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#56605B] font-semibold block">
                          Nền tảng trước Manulife
                        </span>
                        <p className="text-xs font-medium text-[#181F1C] leading-snug">
                          {selectedLeader.priorBackgroundFull}
                        </p>
                      </div>

                      <div className="space-y-0.5 sm:border-l sm:border-[#ECE9E0] sm:pl-3.5">
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

                    {/* Quote */}
                    <blockquote className="border-l-2 border-[#B8975A] pl-4 py-0.5 font-serif italic text-xl sm:text-2xl text-[#0A3622] leading-snug">
                      “{selectedLeader.quote}”
                    </blockquote>

                    {/* Full Editorial Story */}
                    <div className="space-y-3.5">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#008746] font-bold block">
                        CÂU CHUYỆN NGHỀ &amp; HÀNH TRÌNH ĐỒNG HÀNH
                      </span>
                      <div className="space-y-3 text-xs sm:text-[14px] text-[#28322D] leading-[1.8]">
                        {selectedLeader.editorialBio.map((para, idx) => (
                          <p key={idx}>{para}</p>
                        ))}
                      </div>
                    </div>

                    {/* Credentials & Specialties */}
                    <div className="pt-4 border-t border-[#E4E1D8] space-y-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#56605B] font-bold block">
                        DANH HIỆU &amp; LĨNH VỰC CHUYÊN SÂU
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedLeader.badges.map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#EBF2EE] text-[#0A3622] text-[11px] font-semibold rounded-[2px]"
                          >
                            <Award className="w-3 h-3 text-[#008746]" />
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

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-[#E4E1D8] flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleConnectFromLeader(selectedLeader)}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-xs uppercase tracking-[0.16em] font-bold rounded-[2px] transition-colors cursor-pointer"
                      >
                        <span>Đặt lịch tư vấn qua Hệ thống Vùng</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      {selectedLeader.facebookUrl && (
                        <a
                          href={selectedLeader.facebookUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-3 bg-white border border-[#DCD8CE] hover:border-[#0A3622] text-xs font-medium text-[#181F1C] rounded-[2px] transition-colors"
                        >
                          <span>Facebook cá nhân</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#56605B]" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
              <div className="flex items-center justify-between text-white/80 text-xs">
                <span className="uppercase tracking-[0.2em] text-[#E8D3A6] text-[10px] font-semibold">
                  {lightbox.tag}
                </span>
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-[2px] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Đóng</span>
                </button>
              </div>
              <div className="bg-black/40 rounded-[4px] overflow-hidden flex items-center justify-center max-h-[78vh]">
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="max-h-[78vh] w-auto object-contain"
                />
              </div>
              <div className="text-center space-y-1">
                <p className="font-serif text-lg sm:text-xl text-white">
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
