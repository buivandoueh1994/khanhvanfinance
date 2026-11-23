import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  ExternalLink,
  Film,
  Heart,
  MapPin,
  Play,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import {
  JOURNEY_CHAPTERS,
  JOURNEY_PILLARS,
  JourneyChapter,
  JourneyPhoto,
  JourneyPillarKey,
} from '../data/journeys';
import { VideoItem } from '../data/videos';
import { AiAdvisorWidget } from './AiAdvisorWidget';
import { trackEvent, trackLeadConversion } from '../utils/analytics';

const ZALO_URL = 'https://zalo.me/0909679258';
const FACEBOOK_URL = 'https://www.facebook.com/KhanhVanManulife';
const PHONE_DISPLAY = '0909 679 258';

const MessengerBrandSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.35.27.57l.05 1.78c.02.57.61.94 1.13.71l1.98-.87c.17-.08.36-.1.55-.06.91.25 1.87.38 2.88.38 5.64 0 10-4.13 10-9.68S17.64 2 12 2zm5.95 7.56-2.93 4.66c-.47.74-1.48.92-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.93-4.66c.47-.74 1.48-.92 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63z" />
  </svg>
);

interface LightboxState {
  chapterTitle: string;
  photos: JourneyPhoto[];
  index: number;
}

export const JourneysPage: React.FC = () => {
  const [activePillar, setActivePillar] = useState<JourneyPillarKey>('ALL');
  const [selectedChapterSlug, setSelectedChapterSlug] = useState<string | null>(null);
  const [activeReelSlug, setActiveReelSlug] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    topic: 'Hoạch định Bảo vệ & Tài chính Gia đình',
    note: '',
  });

  const modalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Khánh Vân & Những Chuyến Đi | Dấu ấn M-Star, Đội ngũ & Tổ ấm';
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const qSlug = params.get('chuyen-di') || params.get('chapter');
      if (qSlug && JOURNEY_CHAPTERS.some((c) => c.slug === qSlug)) {
        setSelectedChapterSlug(qSlug);
      }
    }
  }, []);

  const videoChapters = useMemo(
    () => JOURNEY_CHAPTERS.filter((c) => Boolean(c.video)),
    []
  );

  const filteredChapters = useMemo(() => {
    if (activePillar === 'ALL') return JOURNEY_CHAPTERS;
    return JOURNEY_CHAPTERS.filter((c) => c.pillar === activePillar);
  }, [activePillar]);

  const pillarCounts = useMemo(() => {
    const counts: Record<JourneyPillarKey, number> = {
      ALL: JOURNEY_CHAPTERS.length,
      'mstar-quoc-te': 0,
      'dinh-cao-nhiet-huyet': 0,
      'hanh-trinh-se-chia': 0,
      'diem-tua-to-am': 0,
    };
    for (const c of JOURNEY_CHAPTERS) {
      counts[c.pillar] += 1;
    }
    return counts;
  }, []);

  const totalPhotos = useMemo(
    () => JOURNEY_CHAPTERS.reduce((acc, c) => acc + c.photoCount, 0),
    []
  );

  const selectedChapterIndex = useMemo(
    () => JOURNEY_CHAPTERS.findIndex((c) => c.slug === selectedChapterSlug),
    [selectedChapterSlug]
  );

  const selectedChapter =
    selectedChapterIndex >= 0 ? JOURNEY_CHAPTERS[selectedChapterIndex] : null;

  const activeReelIndex = useMemo(
    () => videoChapters.findIndex((c) => c.slug === activeReelSlug),
    [videoChapters, activeReelSlug]
  );

  const activeReelChapter =
    activeReelIndex >= 0 ? videoChapters[activeReelIndex] : null;

  const navigateChapterModal = (direction: -1 | 1) => {
    if (selectedChapterIndex < 0) return;
    const nextIdx =
      (selectedChapterIndex + direction + JOURNEY_CHAPTERS.length) %
      JOURNEY_CHAPTERS.length;
    setSelectedChapterSlug(JOURNEY_CHAPTERS[nextIdx].slug);
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateReelModal = (direction: -1 | 1) => {
    if (activeReelIndex < 0 || videoChapters.length === 0) return;
    const nextIdx =
      (activeReelIndex + direction + videoChapters.length) % videoChapters.length;
    setActiveReelSlug(videoChapters[nextIdx].slug);
  };

  const navigateLightbox = (direction: -1 | 1) => {
    if (!lightbox) return;
    const nextIdx =
      (lightbox.index + direction + lightbox.photos.length) %
      lightbox.photos.length;
    setLightbox({ ...lightbox, index: nextIdx });
  };

  const anyModalOpen = Boolean(
    selectedChapter || activeReelChapter || lightbox || activeVideo
  );

  useEffect(() => {
    if (!anyModalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightbox) {
          setLightbox(null);
        } else if (activeReelChapter) {
          setActiveReelSlug(null);
        } else if (activeVideo) {
          setActiveVideo(null);
        } else if (selectedChapter) {
          setSelectedChapterSlug(null);
        }
        return;
      }

      if (lightbox) {
        if (e.key === 'ArrowRight') navigateLightbox(1);
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
      } else if (activeReelChapter) {
        if (e.key === 'ArrowRight') navigateReelModal(1);
        if (e.key === 'ArrowLeft') navigateReelModal(-1);
      } else if (selectedChapter) {
        if (e.key === 'ArrowRight') navigateChapterModal(1);
        if (e.key === 'ArrowLeft') navigateChapterModal(-1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const openChapter = (chapter: JourneyChapter) => {
    setSelectedChapterSlug(chapter.slug);
    trackEvent('view_journey_chapter', {
      chapter_slug: chapter.slug,
      chapter_title: chapter.title,
    });
  };

  const handleConnectFromChapter = (chapter: JourneyChapter) => {
    setSelectedChapterSlug(null);
    setActiveReelSlug(null);
    setSubmitted(false);
    const nextTopic =
      chapter.ctaMode === 'career'
        ? 'Trò chuyện về Sự nghiệp & Lộ trình Quản lý GTF / M-Star'
        : 'Hoạch định Bảo vệ & Tài chính Gia đình';
    setFormData((prev) => ({
      ...prev,
      topic: nextTopic,
      note: prev.note
        ? prev.note
        : chapter.ctaMode === 'career'
        ? `Tôi vừa xem chương "${chapter.milestoneBadge}" và mong muốn tìm hiểu lộ trình phát triển sự nghiệp cùng Hệ thống Vùng Khánh Vân.`
        : `Tôi vừa xem chuyên trang Những Chuyến Đi và mong muốn trao đổi thêm về kế hoạch tài chính cho gia đình.`,
    }));
    setTimeout(() => {
      const el = document.getElementById('ket-noi-dong-hanh');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 90);
  };

  const featuredChapter = filteredChapters[0] || JOURNEY_CHAPTERS[0];
  const restChapters = filteredChapters.slice(1);

  return (
    <div className="min-h-screen w-full max-w-[100vw] [overflow-x:clip] bg-[#FAF9F5] text-[#181F1C] selection:bg-[#0A3622] selection:text-white">
      {/* =================================================================== */}
      {/* STICKY EDITORIAL HEADER + MOBILE QUICK-JUMP BAR */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E4E1D8]">
        <div className="max-w-7xl w-full min-w-0 mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          <a href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <span className="w-[3px] h-7 sm:h-8 bg-[#008746] rounded-full shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-base sm:text-xl tracking-[0.06em] sm:tracking-[0.08em] text-[#181F1C] font-semibold leading-none truncate">
                KHÁNH VÂN
              </span>
              <span className="sm:hidden text-[9px] uppercase tracking-[0.12em] text-[#56605B] font-medium mt-1 truncate">
                Những Chuyến Đi • Đồng Hành
              </span>
              <span className="hidden sm:inline text-[9.5px] uppercase tracking-[0.2em] text-[#56605B] font-medium mt-1">
                Những Chuyến Đi • Dấu Ấn Đồng Hành
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.16em] font-medium text-[#56605B]">
            <a href="#dau-chan" className="hover:text-[#0A3622] transition-colors">
              01. Dấu ấn hành trình
            </a>
            <a href="#thuoc-phim" className="hover:text-[#0A3622] transition-colors">
              02. Thước phim ({videoChapters.length})
            </a>
            <a href="#nhat-ky-chuyen-di" className="hover:text-[#0A3622] transition-colors">
              03. Nhật ký ({JOURNEY_CHAPTERS.length})
            </a>
            <a href="#ket-noi-dong-hanh" className="hover:text-[#0A3622] transition-colors">
              04. Cùng nhau đi xa
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
              href="/vung-khanh-van"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 bg-[#EBF2EE] hover:bg-[#0A3622] text-[#0A3622] hover:text-[#FAF9F5] border border-[#0A3622]/20 text-[11px] uppercase tracking-[0.14em] font-semibold rounded-[2px] transition-colors whitespace-nowrap"
            >
              <span>Vùng Khánh Vân</span>
            </a>
            <a
              href="#ket-noi-dong-hanh"
              className="inline-flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-[11px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.14em] font-semibold rounded-[2px] transition-colors whitespace-nowrap"
            >
              <span>Đồng hành</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Mobile Quick-Jump Bar */}
        <nav
          aria-label="Điều hướng nhanh chuyên trang"
          className="lg:hidden border-t border-[#ECE9E0] bg-[#FAF9F5]/95"
        >
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-4 py-2 text-[11px] font-medium text-[#4A544F]">
            <a
              href="#dau-chan"
              className="shrink-0 px-2.5 py-1 rounded-[2px] bg-white border border-[#E4E1D8] active:bg-[#0A3622] active:text-white transition-colors"
            >
              01. Dấu ấn
            </a>
            <a
              href="#thuoc-phim"
              className="shrink-0 px-2.5 py-1 rounded-[2px] bg-white border border-[#E4E1D8] active:bg-[#0A3622] active:text-white transition-colors"
            >
              02. Thước phim ({videoChapters.length})
            </a>
            <a
              href="#nhat-ky-chuyen-di"
              className="shrink-0 px-2.5 py-1 rounded-[2px] bg-[#EBF2EE] text-[#0A3622] font-semibold border border-[#008746]/30 transition-colors"
            >
              03. Nhật ký ({JOURNEY_CHAPTERS.length})
            </a>
            <a
              href="/vung-khanh-van"
              className="shrink-0 px-2.5 py-1 rounded-[2px] bg-white border border-[#E4E1D8] active:bg-[#0A3622] active:text-white transition-colors"
            >
              Hệ thống Vùng
            </a>
            <a
              href="#ket-noi-dong-hanh"
              className="shrink-0 px-2.5 py-1 rounded-[2px] bg-white border border-[#E4E1D8] active:bg-[#0A3622] active:text-white transition-colors"
            >
              04. Kết nối
            </a>
          </div>
        </nav>
      </header>

      {/* =================================================================== */}
      {/* CHƯƠNG 01: EDITORIAL HERO SPREAD & INTERACTIVE MILESTONE STRIP */}
      {/* =================================================================== */}
      <section
        id="dau-chan"
        className="scroll-mt-24 pt-8 pb-12 sm:pt-14 sm:pb-18 border-b border-[#E4E1D8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Editorial Monograph Copy */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF2EE] border border-[#008746]/25 text-[#0A3622] text-[10.5px] uppercase tracking-[0.18em] font-semibold">
                <Compass className="w-3.5 h-3.5 text-[#008746]" />
                <span>Chuyên Trang Đồng Hành • 2019–2026</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[52px] text-[#181F1C] font-normal leading-[1.14] tracking-[-0.01em]">
                Mỗi chuyến đi là một cột mốc của nỗ lực, tình đồng đội và sự bình an nơi tổ ấm.
              </h1>

              <div className="border-l-2 border-[#008746] pl-4 sm:pl-6 space-y-3">
                <p className="font-serif italic text-lg sm:text-xl text-[#181F1C] leading-[1.55]">
                  “Đi đến đâu không quan trọng bằng việc ta bước đi cùng ai, và trở về nhà với nụ cười nhẹ nhõm thế nào.”
                </p>
                <p className="text-sm sm:text-[15px] text-[#333D38] leading-[1.82]">
                  Trang nhật ký nhỏ này lưu giữ những hành trình đáng nhớ của Khánh Vân từ đêm thu dưới chân Tháp Eiffel năm 2019, những mùa thưởng huấn M-Star tại Hàn Quốc, Áo, Đức, Thượng Hải, Nhật Bản, Trùng Khánh, đến đêm vinh danh Top 1 DRD+ tại non thiêng Yên Tử, chuyến xe thiện nguyện Đắk Lắk và khoảng trời bình yên bên chồng cùng hai con.
                </p>
              </div>

              {/* 4 Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="bg-white border border-[#E4E1D8] rounded-[3px] p-3.5">
                  <div className="font-serif text-2xl sm:text-3xl text-[#0A3622] font-semibold">
                    07
                  </div>
                  <div className="text-[11px] text-[#56605B] mt-0.5 leading-snug">
                    Quốc gia &amp; điểm đến quốc tế
                  </div>
                </div>
                <div className="bg-white border border-[#E4E1D8] rounded-[3px] p-3.5">
                  <div className="font-serif text-2xl sm:text-3xl text-[#0A3622] font-semibold">
                    {JOURNEY_CHAPTERS.length}
                  </div>
                  <div className="text-[11px] text-[#56605B] mt-0.5 leading-snug">
                    Chương ký ức thực tế
                  </div>
                </div>
                <div className="bg-white border border-[#E4E1D8] rounded-[3px] p-3.5">
                  <div className="font-serif text-2xl sm:text-3xl text-[#0A3622] font-semibold">
                    {totalPhotos}
                  </div>
                  <div className="text-[11px] text-[#56605B] mt-0.5 leading-snug">
                    Khung hình chọn lọc
                  </div>
                </div>
                <div className="bg-white border border-[#E4E1D8] rounded-[3px] p-3.5">
                  <div className="font-serif text-2xl sm:text-3xl text-[#0A3622] font-semibold">
                    0{videoChapters.length}
                  </div>
                  <div className="text-[11px] text-[#56605B] mt-0.5 leading-snug">
                    Thước phim hành trình
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#nhat-ky-chuyen-di"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-xs uppercase tracking-[0.16em] font-semibold rounded-[2px] transition-colors"
                >
                  <span>Khám phá 11 chương ký ức</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="#thuoc-phim"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-white hover:bg-[#F3F1EA] text-[#181F1C] border border-[#DCD8CE] hover:border-[#0A3622] text-xs uppercase tracking-[0.16em] font-semibold rounded-[2px] transition-colors"
                >
                  <Play className="w-3.5 h-3.5 text-[#008746] fill-[#008746]" />
                  <span>Xem 7 thước phim</span>
                </a>
              </div>
            </div>

            {/* Right Asymmetric Triptych Collage */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-12 gap-3 sm:gap-4">
                {/* Main Portrait: Mt Fuji 2026 */}
                <button
                  type="button"
                  onClick={() => {
                    const ch = JOURNEY_CHAPTERS.find((c) => c.slug === 'nhat-ban-2026');
                    if (ch) openChapter(ch);
                  }}
                  className="col-span-7 group relative overflow-hidden rounded-[4px] bg-[#EAE7DF] aspect-[3/4] text-left cursor-pointer shadow-[0_18px_45px_-22px_rgba(10,54,34,0.35)]"
                >
                  <img
                    src="/images/journeys/nhat-ban-2026/01-kv_268.jpg"
                    alt="Chị Khánh Vân dưới chân núi Phú Sĩ trong chuyến M-Star Nhật Bản 2026"
                    className="w-full h-full object-cover object-[50%_26%] group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/75 via-black/30 to-transparent text-white">
                    <span className="text-[9.5px] uppercase tracking-[0.16em] text-[#E8D3A6] font-semibold block">
                      M-Star Nhật Bản 2026
                    </span>
                    <span className="font-serif text-sm sm:text-base leading-snug block mt-0.5">
                      Núi Phú Sĩ &amp; Tokyo
                    </span>
                  </div>
                </button>

                {/* Right Stacked Pair: Hallstatt + Family */}
                <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      const ch = JOURNEY_CHAPTERS.find((c) => c.slug === 'ao-duc-2024');
                      if (ch) openChapter(ch);
                    }}
                    className="group relative overflow-hidden rounded-[4px] bg-[#EAE7DF] flex-1 min-h-[135px] text-left cursor-pointer"
                  >
                    <img
                      src="/images/journeys/ao-duc-2024/01-kv_226.jpg"
                      alt="Hồ Hallstatt trong hành trình M-Star Châu Âu"
                      className="w-full h-full object-cover object-[50%_40%] group-hover:scale-[1.04] transition-transform duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/75 via-black/25 to-transparent text-white">
                      <span className="text-[9px] uppercase tracking-[0.14em] text-[#E8D3A6] font-semibold block">
                        Châu Âu 2024
                      </span>
                      <span className="font-serif text-xs sm:text-sm leading-tight block">
                        Hồ Hallstatt, Áo
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const ch = JOURNEY_CHAPTERS.find(
                        (c) => c.slug === 'yen-tu-vinh-danh-2025'
                      );
                      if (ch) openChapter(ch);
                    }}
                    className="group relative overflow-hidden rounded-[4px] bg-[#EAE7DF] flex-1 min-h-[135px] text-left cursor-pointer"
                  >
                    <img
                      src="/images/journeys/yen-tu-vinh-danh-2025/02-kv_259.jpg"
                      alt="Vinh danh Top 1 DRD+ tại Yên Tử"
                      className="w-full h-full object-cover object-[50%_25%] group-hover:scale-[1.04] transition-transform duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white">
                      <span className="text-[9px] uppercase tracking-[0.14em] text-[#E8D3A6] font-semibold block">
                        Yên Tử 2025
                      </span>
                      <span className="font-serif text-xs sm:text-sm leading-tight block">
                        Top 1 DRD+ Toàn Quốc
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Destination Footsteps Strip */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-[#E4E1D8]">
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#008746] font-semibold">
                Dấu chân qua từng năm • Chạm để mở nhanh từng chương
              </span>
              <span className="hidden sm:inline text-[11px] text-[#7A847F]">
                Vuốt ngang để xem toàn bộ 11 cột mốc &rarr;
              </span>
            </div>

            <div className="flex items-stretch gap-2.5 overflow-x-auto no-scrollbar pb-1 snap-x">
              {JOURNEY_CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.slug}
                  type="button"
                  onClick={() => openChapter(ch)}
                  className="snap-start shrink-0 group flex items-center gap-2.5 px-3.5 py-2.5 bg-white hover:bg-[#0A3622] border border-[#E4E1D8] hover:border-[#0A3622] rounded-[3px] transition-all text-left cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-[#EBF2EE] group-hover:bg-white/15 text-[#0A3622] group-hover:text-[#E8D3A6] text-[10px] font-bold flex items-center justify-center shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-[#008746] group-hover:text-[#E8D3A6] font-semibold">
                      {ch.year} • {ch.countryTag}
                    </div>
                    <div className="text-xs font-medium text-[#181F1C] group-hover:text-white whitespace-nowrap">
                      {ch.milestoneBadge}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHƯƠNG 02: 07 THƯỚC PHIM HÀNH TRÌNH THỰC TẾ (VERTICAL 9:16 REELS) */}
      {/* =================================================================== */}
      <section
        id="thuoc-phim"
        className="scroll-mt-24 py-12 sm:py-16 bg-[#072618] text-[#FAF9F5] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 sm:mb-9">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-[#E8D3A6] font-semibold">
                <Film className="w-3.5 h-3.5" />
                <span>02 / Thước Phim Sống Động</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal leading-tight">
                Bảy thước phim ghi lại nguyên vẹn cảm xúc trên từng cung đường
              </h2>
              <p className="text-xs sm:text-sm text-[#C4D3CB] leading-relaxed">
                Từ giây phút bước lên bục nhận cúp Top 1 DRD+ tại Yên Tử, khoảnh khắc xoay người dưới chân núi Phú Sĩ cho đến chuyến xe thiện nguyện lên với trẻ em Đắk Lắk.
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#9BB3A7] shrink-0">
              Chạm vào thước phim để phát có âm thanh
            </span>
          </div>

          <div className="flex lg:grid lg:grid-cols-7 gap-3.5 sm:gap-4 overflow-x-auto lg:overflow-visible no-scrollbar snap-x pb-2">
            {videoChapters.map((ch) => (
              <button
                key={ch.slug}
                type="button"
                onClick={() => {
                  setActiveReelSlug(ch.slug);
                  trackEvent('play_journey_reel', { chapter_slug: ch.slug });
                }}
                className="snap-start shrink-0 w-[205px] sm:w-[225px] lg:w-auto group relative rounded-[5px] overflow-hidden bg-[#0E3B26] border border-white/15 hover:border-[#E8D3A6]/70 aspect-[9/16] text-left cursor-pointer shadow-lg"
              >
                <img
                  src={ch.video!.poster}
                  alt={ch.video!.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25" />

                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                  <span className="px-2 py-0.5 rounded-[2px] bg-black/55 backdrop-blur-sm text-[9.5px] uppercase tracking-[0.12em] text-[#E8D3A6] font-semibold truncate">
                    {ch.countryTag} • {ch.year}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-[2px] bg-black/55 text-[9.5px] text-white font-medium shrink-0">
                    {ch.video!.durationLabel}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-11 h-11 rounded-full bg-white/90 group-hover:bg-[#00A758] text-[#0A3622] group-hover:text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-all">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </span>
                </div>

                <div className="absolute inset-x-2.5 bottom-2.5 space-y-1">
                  <div className="font-serif text-[13.5px] leading-snug text-white line-clamp-2">
                    {ch.milestoneBadge}
                  </div>
                  <div className="text-[10.5px] text-white/75 line-clamp-2 leading-snug">
                    {ch.video!.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHƯƠNG 03: NHẬT KÝ 11 CHƯƠNG HÀNH TRÌNH & BỘ ẢNH CHỌN LỌC */}
      {/* =================================================================== */}
      <section
        id="nhat-ky-chuyen-di"
        className="scroll-mt-24 py-12 sm:py-20 border-b border-[#E4E1D8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-3 mb-7 sm:mb-10">
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#008746] font-semibold block">
              03 / Nhật Ký &amp; Bộ Sưu Tập Ảnh Thực Tế
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#181F1C] font-normal leading-[1.15]">
              Mười một chương ký ức trên hành trình sống và làm nghề
            </h2>
            <p className="text-sm sm:text-[15px] text-[#3B4640] leading-[1.8]">
              Mỗi chương là một câu chuyện thật được viết lại từ những trải nghiệm của Vân cùng gia đình và đội ngũ. Chạm vào từng chương để đọc trọn bài viết, xem thước phim và phóng lớn từng bức ảnh kỷ niệm.
            </p>
          </div>

          {/* Pillar Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 sm:mb-10">
            {JOURNEY_PILLARS.map((p) => {
              const isActive = activePillar === p.key;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setActivePillar(p.key)}
                  className={`shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-[3px] text-xs font-medium transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#0A3622] text-white border-[#0A3622] shadow-sm'
                      : 'bg-white text-[#333D38] border-[#DCD8CE] hover:border-[#0A3622]'
                  }`}
                >
                  <span>{p.shortLabel}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      isActive
                        ? 'bg-white/20 text-[#E8D3A6]'
                        : 'bg-[#F3F1EA] text-[#56605B]'
                    }`}
                  >
                    {pillarCounts[p.key]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Featured Lead Chapter Card */}
          {featuredChapter && (
            <article
              onClick={() => openChapter(featuredChapter)}
              className="group mb-8 sm:mb-12 bg-white border border-[#E4E1D8] hover:border-[#0A3622]/45 rounded-[5px] overflow-hidden shadow-[0_20px_50px_-28px_rgba(10,54,34,0.22)] cursor-pointer transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative overflow-hidden bg-[#EAE7DF] aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[430px]">
                  <img
                    src={featuredChapter.heroImage}
                    alt={featuredChapter.title}
                    style={{ objectPosition: featuredChapter.heroObjectPosition }}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-[2px] bg-[#0A3622]/90 backdrop-blur-sm text-[10px] uppercase tracking-[0.16em] text-[#E8D3A6] font-semibold">
                      {featuredChapter.milestoneBadge}
                    </span>
                    {featuredChapter.video && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] bg-black/65 backdrop-blur-sm text-[10px] uppercase tracking-[0.12em] text-white font-medium">
                        <Play className="w-2.5 h-2.5 fill-current text-[#34D399]" />
                        <span>Có video {featuredChapter.video.durationLabel}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5 p-5 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
                  <div className="space-y-3.5">
                    <div className="flex flex-wrap items-center gap-2 text-[10.5px] uppercase tracking-[0.16em] text-[#008746] font-semibold">
                      <span>{featuredChapter.pillarLabel}</span>
                      <span>•</span>
                      <span>{featuredChapter.periodLabel}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#181F1C] font-normal leading-[1.22] group-hover:text-[#0A3622] transition-colors">
                      {featuredChapter.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#4A544F] leading-[1.78]">
                      {featuredChapter.subtitle}
                    </p>

                    <blockquote className="border-l-2 border-[#B8975A] pl-3.5 py-0.5 font-serif italic text-sm sm:text-[15.5px] text-[#222B26] leading-relaxed">
                      “{featuredChapter.pullQuote}”
                    </blockquote>
                  </div>

                  <div className="space-y-4 pt-3 border-t border-[#ECE9E0]">
                    {/* Mini 4-photo preview strip */}
                    <div className="grid grid-cols-4 gap-2">
                      {featuredChapter.photos.slice(1, 5).map((ph) => (
                        <div
                          key={ph.id}
                          className="aspect-square rounded-[2px] overflow-hidden bg-[#EAE7DF]"
                        >
                          <img
                            src={ph.src}
                            alt={ph.caption}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-[50%_28%]"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 text-xs text-[#56605B]">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#008746]" />
                          <span className="truncate max-w-[170px] sm:max-w-none">
                            {featuredChapter.location}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1 shrink-0">
                          <Camera className="w-3.5 h-3.5 text-[#008746]" />
                          <span>{featuredChapter.photoCount} ảnh</span>
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.15em] font-semibold text-[#0A3622] group-hover:text-[#008746] shrink-0">
                        <span>Mở chương này</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Grid of Remaining Chapters */}
          {restChapters.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {restChapters.map((ch) => (
                <article
                  key={ch.slug}
                  onClick={() => openChapter(ch)}
                  className="group bg-white border border-[#E4E1D8] hover:border-[#0A3622]/45 rounded-[5px] overflow-hidden flex flex-col justify-between cursor-pointer transition-all shadow-[0_14px_36px_-26px_rgba(10,54,34,0.2)]"
                >
                  <div>
                    <div className="relative overflow-hidden bg-[#EAE7DF] aspect-[4/3]">
                      <img
                        src={ch.heroImage}
                        alt={ch.title}
                        loading="lazy"
                        decoding="async"
                        style={{ objectPosition: ch.heroObjectPosition }}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-[2px] bg-[#0A3622]/90 backdrop-blur-sm text-[10px] uppercase tracking-[0.15em] text-[#E8D3A6] font-semibold">
                          {ch.milestoneBadge}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {ch.video && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-[2px] bg-black/65 backdrop-blur-sm text-[10px] text-white font-medium">
                              <Play className="w-2.5 h-2.5 fill-current text-[#34D399]" />
                              <span>Video</span>
                            </span>
                          )}
                          <span className="px-2 py-1 rounded-[2px] bg-black/60 backdrop-blur-sm text-[10px] text-white font-medium">
                            {ch.photoCount} ảnh
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 sm:p-7 space-y-3">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#008746] font-semibold">
                        <span>{ch.pillarLabel}</span>
                        <span>•</span>
                        <span>{ch.location}</span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl text-[#181F1C] font-normal leading-[1.26] group-hover:text-[#0A3622] transition-colors">
                        {ch.title}
                      </h3>

                      <p className="text-xs sm:text-[13.5px] text-[#4A544F] leading-[1.75] line-clamp-3">
                        {ch.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-7 pb-5 sm:pb-6 pt-3 border-t border-[#ECE9E0] space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      {ch.photos.slice(1, 4).map((ph) => (
                        <div
                          key={ph.id}
                          className="aspect-[4/3] rounded-[2px] overflow-hidden bg-[#EAE7DF]"
                        >
                          <img
                            src={ph.src}
                            alt={ph.caption}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-[50%_28%]"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[#56605B] truncate pr-2">
                        Đồng hành cùng {ch.companions}
                      </span>
                      <span className="inline-flex items-center gap-1 uppercase tracking-[0.14em] text-[11px] font-semibold text-[#0A3622] group-hover:text-[#008746] shrink-0">
                        <span>Đọc &amp; xem ảnh</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHƯƠNG 04: CÙNG NHAU ĐI XA — DUAL PATHWAYS & CONCIERGE CONNECTION */}
      {/* =================================================================== */}
      <section
        id="ket-noi-dong-hanh"
        className="scroll-mt-24 py-14 sm:py-22 bg-[#0A3622] text-[#FAF9F5]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Two Meaningful Companion Paths */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#E8D3A6] font-semibold block">
                  04 / Đồng Hành Cùng Khánh Vân
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-white font-normal leading-[1.16]">
                  Mỗi hành trình lớn đều bắt đầu từ một cuộc trò chuyện chân thành
                </h2>
                <p className="text-sm text-[#C8D6CE] leading-[1.8]">
                  Dù bạn đang muốn chuẩn bị một điểm tựa tài chính vững vàng cho những chuyến đi tương lai của gia đình, hay đang tìm kiếm một môi trường chuyên nghiệp để bứt phá sự nghiệp và cùng chinh phục những kỳ M-Star tiếp theo, Vân luôn sẵn lòng lắng nghe.
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="p-4 sm:p-5 rounded-[4px] bg-white/[0.06] border border-white/15 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#E8D3A6] text-xs uppercase tracking-[0.16em] font-semibold">
                    <Heart className="w-4 h-4" />
                    <span>Dành cho Khách hàng &amp; Gia đình</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    Thiết kế quỹ dự phòng y tế cao cấp, quỹ học vấn cho con và quỹ hưu trí thảnh thơi, hoặc rà soát lại các hợp đồng hiện hữu để gia đình an tâm tận hưởng trọn vẹn từng chuyến đi.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-[4px] bg-white/[0.06] border border-white/15 space-y-2">
                  <div className="flex items-center gap-2 text-[#E8D3A6] text-xs uppercase tracking-[0.16em] font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>Dành cho Ứng viên Quản lý GTF &amp; Cộng sự</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    Gia nhập Hệ thống Vùng Khánh Vân (HCM69, SG168, SG169, MN111) với lộ trình kèm cặp thực chiến để xây dựng đội ngũ bền vững và cùng có mặt trên những hành trình vinh danh M-Star, MDRT năm châu.
                  </p>
                  <a
                    href="/vung-khanh-van"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[#E8D3A6] hover:text-white font-semibold pt-1"
                  >
                    <span>Xem hồ sơ 48 Quản lý Vùng Khánh Vân</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00A758] hover:bg-[#008746] text-white text-xs uppercase tracking-[0.15em] font-semibold rounded-[2px] transition-colors"
                >
                  <span>Nhắn Zalo trực tiếp: {PHONE_DISPLAY}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="/"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-white/25 hover:border-white text-xs uppercase tracking-[0.15em] text-white rounded-[2px] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Về trang chủ Khánh Vân</span>
                </a>
              </div>
            </div>

            {/* Right Column: Concierge Form */}
            <div className="lg:col-span-6 bg-[#FAF9F5] text-[#181F1C] rounded-[4px] p-5 sm:p-9 border border-[#DCD8CE] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)]">
              {submitted ? (
                <div className="py-8 sm:py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#EBF2EE] text-[#008746] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#181F1C] font-semibold">
                    Cảm ơn bạn đã gửi lời nhắn cho Vân
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A544F] max-w-md mx-auto leading-relaxed">
                    Khánh Vân đã nhận được thông tin của bạn và sẽ chủ động liên hệ qua điện thoại hoặc Zalo trong thời gian sớm nhất.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#DCD8CE] hover:border-[#0A3622] text-xs uppercase tracking-[0.16em] font-semibold rounded-[2px] cursor-pointer"
                  >
                    Gửi thêm lời nhắn khác
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
                      textContext: `[Trang Những Chuyến Đi] ${formData.fullName} ${formData.topic} ${formData.note}`,
                    });
                    fetch('/api/lead', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        fullName: formData.fullName,
                        phone: formData.phone,
                        email: formData.email,
                        topic: formData.topic,
                        note: `[Từ trang Những Chuyến Đi] ${formData.note}`.trim(),
                        source: 'contact_form',
                      }),
                    }).catch(() => {});
                  }}
                  className="space-y-4 sm:space-y-5"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#008746] font-bold block">
                      TRÒ CHUYỆN CÙNG KHÁNH VÂN
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#181F1C] font-semibold">
                      Để lại thông tin kết nối 1-1
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
                      Chủ đề bạn muốn trao đổi
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
                      <option value="Thiết kế Quỹ Hưu Trí & Học Vấn Dài Hạn">
                        Thiết kế Quỹ Hưu Trí &amp; Học Vấn Dài Hạn
                      </option>
                      <option value="Trò chuyện về Sự nghiệp & Lộ trình Quản lý GTF / M-Star">
                        Trò chuyện về Sự nghiệp &amp; Lộ trình Quản lý GTF / M-Star
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-[0.14em] text-[#4A544F] font-semibold block">
                      Lời nhắn riêng cho Vân (không bắt buộc)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.note}
                      onChange={(e) =>
                        setFormData({ ...formData, note: e.target.value })
                      }
                      placeholder="Chia sẻ mong muốn của gia đình bạn hoặc định hướng công việc hiện tại..."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#DCD8CE] focus:border-[#0A3622] rounded-[2px] text-[16px] sm:text-sm text-[#181F1C] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-xs uppercase tracking-[0.18em] font-bold rounded-[2px] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Gửi lời nhắn kết nối</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* FOOTER */}
      {/* =================================================================== */}
      <footer className="bg-[#072618] text-[#B9C8C0] py-8 pb-24 sm:pb-10 border-t border-white/10">
        <div className="max-w-7xl w-full min-w-0 mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A758] shrink-0" />
            <span>
              Khánh Vân &amp; Những Chuyến Đi • Hệ thống Vùng Khánh Vân (Manulife Việt Nam)
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#9BB0A5]">
            <a href="/" className="hover:text-white transition-colors">
              Trang chủ
            </a>
            <span>•</span>
            <a href="/vung-khanh-van" className="hover:text-white transition-colors">
              Hệ thống Vùng
            </a>
            <span>•</span>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Zalo: {PHONE_DISPLAY}
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
      {/* AI ADVISOR WIDGET + FLOATING ZALO / MESSENGER DOCK */}
      {/* =================================================================== */}
      <AiAdvisorWidget
        onOpenVideo={(video) => setActiveVideo(video)}
        hidden={anyModalOpen}
      />

      <aside
        aria-label="Kênh kết nối trực tiếp Khánh Vân"
        className={`fixed bottom-[calc(0.875rem+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] left-3.5 sm:left-6 z-40 flex flex-col gap-2.5 sm:gap-4 items-start pointer-events-auto select-none transition-all duration-300 ${
          anyModalOpen
            ? 'opacity-0 pointer-events-none translate-y-4'
            : 'opacity-100 translate-y-0'
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
        </div>
      </aside>

      {/* =================================================================== */}
      {/* MODAL 1: FULL CHAPTER READER + VIDEO + GALLERY */}
      {/* =================================================================== */}
      <AnimatePresence>
        {selectedChapter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedChapterSlug(null)}
            className="fixed inset-0 z-50 bg-[#121815]/80 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-5"
          >
            <motion.div
              ref={modalScrollRef}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF9F5] w-full max-w-5xl h-[93dvh] sm:h-auto sm:max-h-[90vh] overflow-y-auto rounded-t-[10px] sm:rounded-[6px] border border-[#DCD8CE] shadow-2xl"
            >
              {/* Sticky Modal Top Bar */}
              <div className="sticky top-0 z-20 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E4E1D8] px-4 sm:px-7 py-3 flex items-center justify-between gap-2">
                <div className="text-[10.5px] uppercase tracking-[0.16em] text-[#56605B] font-semibold truncate">
                  Chương {selectedChapterIndex + 1}/{JOURNEY_CHAPTERS.length} •{' '}
                  {selectedChapter.milestoneBadge}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => navigateChapterModal(-1)}
                    aria-label="Chương trước"
                    className="p-2 border border-[#DCD8CE] hover:border-[#0A3622] rounded-[2px] text-[#181F1C] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateChapterModal(1)}
                    aria-label="Chương tiếp theo"
                    className="p-2 border border-[#DCD8CE] hover:border-[#0A3622] rounded-[2px] text-[#181F1C] cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedChapterSlug(null)}
                    className="inline-flex items-center gap-1 px-3 py-2 bg-[#181F1C] hover:bg-[#0A3622] text-white text-xs font-medium rounded-[2px] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Đóng</span>
                  </button>
                </div>
              </div>

              <div className="p-5 sm:p-9 space-y-8 sm:space-y-10">
                {/* Chapter Header & Essay + Optional Side Video */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-9 items-start">
                  <div
                    className={
                      selectedChapter.video ? 'lg:col-span-7 space-y-5' : 'lg:col-span-12 space-y-5'
                    }
                  >
                    <div className="space-y-2.5">
                      <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#008746] font-semibold block">
                        {selectedChapter.pillarLabel} • {selectedChapter.periodLabel}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-4xl text-[#181F1C] font-normal leading-[1.18]">
                        {selectedChapter.title}
                      </h2>
                    </div>

                    {/* Metadata Box */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-white border border-[#E4E1D8] rounded-[4px] text-xs">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#008746] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] uppercase tracking-[0.14em] text-[#7A847F] block">
                            Điểm đến
                          </span>
                          <span className="font-medium text-[#181F1C]">
                            {selectedChapter.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-[#008746] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] uppercase tracking-[0.14em] text-[#7A847F] block">
                            Người đồng hành
                          </span>
                          <span className="font-medium text-[#181F1C]">
                            {selectedChapter.companions}
                          </span>
                        </div>
                      </div>
                    </div>

                    <blockquote className="border-l-2 border-[#008746] pl-4 sm:pl-5 py-1 font-serif italic text-lg sm:text-xl text-[#181F1C] leading-[1.55]">
                      “{selectedChapter.pullQuote}”
                    </blockquote>

                    <div className="space-y-4 text-sm sm:text-[15.5px] text-[#28322D] leading-[1.85]">
                      {selectedChapter.story.map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  </div>

                  {/* Inline 9:16 Video Player when Chapter has Video */}
                  {selectedChapter.video && (
                    <div className="lg:col-span-5 bg-[#072618] text-white rounded-[5px] p-3.5 sm:p-4 border border-[#0A3622] space-y-3">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[#E8D3A6] font-semibold">
                        <span>Thước phim thực tế</span>
                        <span>{selectedChapter.video.durationLabel}</span>
                      </div>
                      <div className="rounded-[4px] overflow-hidden bg-black aspect-[9/16] max-h-[460px] mx-auto">
                        <video
                          key={selectedChapter.video.src}
                          src={selectedChapter.video.src}
                          poster={selectedChapter.video.poster}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="font-serif text-sm sm:text-base text-white">
                          {selectedChapter.video.title}
                        </div>
                        <p className="text-xs text-[#C4D3CB] leading-relaxed">
                          {selectedChapter.video.caption}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Full Curated Photo Gallery */}
                <div className="pt-6 border-t border-[#E4E1D8] space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#008746] font-semibold block">
                        Bộ Sưu Tập Khung Hình ({selectedChapter.photos.length} Ảnh)
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#181F1C]">
                        Những khoảnh khắc đáng nhớ tại {selectedChapter.countryTag}
                      </h3>
                    </div>
                    <span className="text-xs text-[#66706B]">
                      Chạm vào ảnh bất kỳ để phóng lớn toàn màn hình
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {selectedChapter.photos.map((photo, pIdx) => (
                      <figure
                        key={photo.id}
                        onClick={() =>
                          setLightbox({
                            chapterTitle: selectedChapter.milestoneBadge,
                            photos: selectedChapter.photos,
                            index: pIdx,
                          })
                        }
                        className="group bg-white border border-[#E4E1D8] hover:border-[#0A3622]/50 rounded-[4px] overflow-hidden cursor-zoom-in flex flex-col justify-between transition-colors"
                      >
                        <div className="relative overflow-hidden bg-[#EAE7DF] aspect-[4/5]">
                          <img
                            src={photo.src}
                            alt={photo.caption}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-[50%_26%] group-hover:scale-[1.03] transition-transform duration-700"
                          />
                          <span className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-[2px] bg-black/60 text-[9.5px] uppercase tracking-[0.12em] text-white opacity-90 group-hover:opacity-100">
                            Phóng lớn
                          </span>
                        </div>
                        <figcaption className="p-3.5 text-xs text-[#3B4640] leading-relaxed">
                          {photo.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>

                {/* Contextual Soft CTA Footer inside Modal */}
                <div className="p-5 sm:p-7 rounded-[5px] bg-[#0A3622] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-xl">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#E8D3A6] font-semibold block">
                      {selectedChapter.ctaMode === 'career'
                        ? 'Đồng hành sự nghiệp cùng Vùng Khánh Vân'
                        : 'Hoạch định điểm tựa bình an cho gia đình'}
                    </span>
                    <p className="font-serif text-lg sm:text-xl text-white leading-snug">
                      {selectedChapter.ctaMode === 'career'
                        ? 'Bạn mong muốn xây dựng sự nghiệp quản lý chuyên nghiệp và cùng chinh phục những chuyến M-Star tiếp theo?'
                        : 'Bạn muốn thiết kế một kế hoạch tài chính vững vàng cho những hành trình dài hạn của gia đình mình?'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleConnectFromChapter(selectedChapter)}
                    className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#FAF9F5] hover:bg-[#E8D3A6] text-[#0A3622] text-xs uppercase tracking-[0.16em] font-bold rounded-[2px] transition-colors cursor-pointer"
                  >
                    <span>Trò chuyện cùng Vân</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* MODAL 2: STANDALONE CINEMA REEL VIEWER (FOR SECTION 02) */}
      {/* =================================================================== */}
      <AnimatePresence>
        {activeReelChapter && activeReelChapter.video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveReelSlug(null)}
            className="fixed inset-0 z-[55] bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF9F5] border border-[#DCD8CE] rounded-[6px] overflow-hidden shadow-2xl max-w-[380px] sm:max-w-[740px] w-full flex flex-col sm:flex-row max-h-[92dvh] overflow-y-auto sm:overflow-hidden"
            >
              <div className="bg-black mx-auto shrink-0 w-full sm:w-[325px] aspect-[9/16] max-h-[62dvh] sm:max-h-[578px] flex items-center justify-center">
                <video
                  key={activeReelChapter.video.src}
                  src={activeReelChapter.video.src}
                  poster={activeReelChapter.video.poster}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4 sm:p-6 flex flex-col justify-between gap-4 flex-1">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-[#008746] font-bold">
                      Thước phim {activeReelIndex + 1}/{videoChapters.length} •{' '}
                      {activeReelChapter.year}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => navigateReelModal(-1)}
                        aria-label="Thước phim trước"
                        className="p-1.5 border border-[#DCD8CE] hover:border-[#0A3622] rounded-[2px] cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateReelModal(1)}
                        aria-label="Thước phim kế tiếp"
                        className="p-1.5 border border-[#DCD8CE] hover:border-[#0A3622] rounded-[2px] cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveReelSlug(null)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#181F1C] text-white text-xs rounded-[2px] cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Đóng</span>
                      </button>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#181F1C] leading-snug">
                    {activeReelChapter.video.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A544F] leading-relaxed">
                    {activeReelChapter.video.caption}
                  </p>
                  <blockquote className="border-l-2 border-[#B8975A] pl-3 font-serif italic text-sm text-[#222B26] leading-relaxed">
                    “{activeReelChapter.pullQuote}”
                  </blockquote>
                </div>

                <div className="pt-3 border-t border-[#E4E1D8] flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const slug = activeReelChapter.slug;
                      setActiveReelSlug(null);
                      setSelectedChapterSlug(slug);
                    }}
                    className="w-full py-2.5 px-4 bg-[#0A3622] hover:bg-[#008746] text-white text-xs uppercase tracking-[0.15em] font-semibold rounded-[2px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>
                      Đọc câu chuyện &amp; xem {activeReelChapter.photoCount} ảnh chương này
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* MODAL 3: AI ADVISOR FACEBOOK VIDEO MODAL */}
      {/* =================================================================== */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-[56] bg-[#121815]/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
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
      {/* MODAL 4: FULL-SCREEN PHOTO LIGHTBOX WITH PREV/NEXT NAVIGATION */}
      {/* =================================================================== */}
      <AnimatePresence>
        {lightbox && lightbox.photos[lightbox.index] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] bg-black/92 backdrop-blur-sm flex items-center justify-center p-3 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full space-y-3"
            >
              <div className="flex items-center justify-between gap-2 text-white/85 text-xs">
                <span className="uppercase tracking-[0.15em] text-[#E8D3A6] text-[10.5px] font-semibold truncate">
                  {lightbox.chapterTitle} • Ảnh {lightbox.index + 1}/
                  {lightbox.photos.length}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => navigateLightbox(-1)}
                    aria-label="Ảnh trước"
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-[2px] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateLightbox(1)}
                    aria-label="Ảnh tiếp theo"
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-[2px] cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightbox(null)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white rounded-[2px] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Đóng</span>
                  </button>
                </div>
              </div>

              <div className="bg-black/50 rounded-[4px] overflow-hidden flex items-center justify-center max-h-[74vh]">
                <img
                  src={lightbox.photos[lightbox.index].src}
                  alt={lightbox.photos[lightbox.index].caption}
                  className="max-h-[74vh] w-auto object-contain"
                />
              </div>

              <div className="text-center space-y-1 px-2">
                <p className="font-serif text-sm sm:text-lg text-white max-w-3xl mx-auto leading-relaxed">
                  {lightbox.photos[lightbox.index].caption}
                </p>
                <p className="text-[11px] text-white/65">
                  {lightbox.photos[lightbox.index].locationDetail}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
