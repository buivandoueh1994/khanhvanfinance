import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Award,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Film,
  Heart,
  MapPin,
  Pause,
  Play,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { JOURNEY_CHAPTERS, JourneyChapter, JourneyPhoto } from '../data/journeys';
import { VideoItem } from '../data/videos';
import { AiAdvisorWidget } from './AiAdvisorWidget';
import { JourneyMap } from './JourneyMap';
import { trackEvent, trackLeadConversion } from '../utils/analytics';

const ZALO_URL = 'https://zalo.me/0909679258';
const FACEBOOK_URL = 'https://www.facebook.com/KhanhVanManulife';
const PHONE_DISPLAY = '0909 679 258';

interface HeroSlide {
  src: string;
  label: string;
  objectPosition: string;
}

// 5 crisp Upscayl-enhanced 1600px photographs (zero LED text clutter behind headline, pure 60fps GPU Ken Burns glide)
const HERO_SLIDES: HeroSlide[] = [
  {
    src: '/images/journeys/ao-duc-2024/01-kv_226.jpg?v=2',
    label: 'Hồ Hallstatt, Áo • 2024',
    objectPosition: '50% 42%',
  },
  {
    src: '/images/journeys/nhat-ban-2026/01-kv_268.jpg?v=2',
    label: 'Đỉnh Phú Sĩ, Nhật Bản • 2026',
    objectPosition: '50% 28%',
  },
  {
    src: '/images/journeys/thuong-hai-2025/10-kv_257.jpg?v=2',
    label: 'Hoàng hôn Sông Hoàng Phố • 2025',
    objectPosition: '50% 50%',
  },
  {
    src: '/images/journeys/phap-2019/01-kv_206.jpg?v=2',
    label: 'Tháp Eiffel, Paris • 2019',
    objectPosition: '50% 35%',
  },
  {
    src: '/images/journeys/diem-tua-to-am/01-kv_289.jpg?v=2',
    label: 'Điểm tựa Tổ ấm • 2024–2026',
    objectPosition: '50% 32%',
  },
];

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
  const [selectedChapterSlug, setSelectedChapterSlug] = useState<string | null>(null);
  const [showAllModalPhotos, setShowAllModalPhotos] = useState(false);
  const [activeReelSlug, setActiveReelSlug] = useState<string | null>(null);
  const [loungeReelSlug, setLoungeReelSlug] = useState<string>('yen-tu-vinh-danh-2025');
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const [heroMounted, setHeroMounted] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setHeroMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

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
    document.title = 'Khánh Vân & Những Chuyến Đi | Nhật ký Hành trình 2019–2026';
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const qSlug = params.get('chuyen-di') || params.get('chapter');
      if (qSlug && JOURNEY_CHAPTERS.some((c) => c.slug === qSlug)) {
        setSelectedChapterSlug(qSlug);
      }
    }
  }, []);

  // Silky 60fps/120fps GPU crossfade timer for Hero Monograph slides
  useEffect(() => {
    if (heroPaused) return;
    const timer = window.setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  const toggleHeroPlayback = () => {
    setHeroPaused((prev) => !prev);
  };

  const chapterMap = useMemo(() => {
    const map: Record<string, JourneyChapter> = {};
    for (const c of JOURNEY_CHAPTERS) map[c.slug] = c;
    return map;
  }, []);

  const videoChapters = useMemo(
    () => JOURNEY_CHAPTERS.filter((c) => Boolean(c.video)),
    []
  );

  const loungeChapter = useMemo(
    () => videoChapters.find((c) => c.slug === loungeReelSlug) || videoChapters[0],
    [videoChapters, loungeReelSlug]
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
    setShowAllModalPhotos(false);
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
        if (lightbox) setLightbox(null);
        else if (activeReelChapter) setActiveReelSlug(null);
        else if (activeVideo) setActiveVideo(null);
        else if (selectedChapter) setSelectedChapterSlug(null);
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
    setShowAllModalPhotos(false);
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
        ? `Tôi vừa xem chương "${chapter.milestoneBadge}" và mong muốn tìm hiểu lộ trình phát triển sự nghiệp cùng Hệ thống Green Power.`
        : `Tôi vừa xem chuyên trang Những Chuyến Đi và mong muốn trao đổi thêm về kế hoạch tài chính cho gia đình.`,
    }));
    setTimeout(() => {
      const el = document.getElementById('ket-noi-dong-hanh');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 90);
  };

  // Curated references for the 3-Act Editorial Narrative Arc
  const chJapan = chapterMap['nhat-ban-2026'];
  const chEurope = chapterMap['ao-duc-2024'];
  const chShanghai = chapterMap['thuong-hai-2025'];
  const chChongqing = chapterMap['trung-khanh-2026'];
  const chKorea = chapterMap['han-quoc-2024'];
  const chNanning = chapterMap['nam-ninh-2024'];
  const chParis = chapterMap['phap-2019'];
  const chYenTu = chapterMap['yen-tu-vinh-danh-2025'];
  const chPhanThiet = chapterMap['kickoff-phan-thiet-2026'];
  const chDakLak = chapterMap['thien-nguyen-dak-lak-2026'];
  const chFamily = chapterMap['diem-tua-to-am'];

  const modalPhotosVisible = selectedChapter
    ? showAllModalPhotos
      ? selectedChapter.photos
      : selectedChapter.photos.slice(0, 6)
    : [];

  return (
    <div className="min-h-screen w-full max-w-[100vw] [overflow-x:clip] bg-[#FAF9F5] text-[#181F1C] selection:bg-[#0A3622] selection:text-white">
      {/* =================================================================== */}
      {/* STICKY EDITORIAL HEADER + MOBILE QUICK-JUMP STRIP */}
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
                Những Chuyến Đi • 2019–2026
              </span>
              <span className="hidden sm:inline text-[9.5px] uppercase tracking-[0.2em] text-[#56605B] font-medium mt-1">
                Những Chuyến Đi • Monograph 2019–2026
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[11px] uppercase tracking-[0.14em] font-medium text-[#56605B]">
            <a href="#ban-do-hanh-trinh" className="whitespace-nowrap hover:text-[#0A3622] transition-colors">
              01. Bản đồ
            </a>
            <a href="#hoi-1-nam-chau" className="whitespace-nowrap hover:text-[#0A3622] transition-colors">
              02. Năm châu
            </a>
            <a href="#hoi-2-chieu-sau" className="whitespace-nowrap hover:text-[#0A3622] transition-colors">
              03. Bản lĩnh
            </a>
            <a href="#hoi-3-to-am" className="whitespace-nowrap hover:text-[#0A3622] transition-colors">
              04. Tổ ấm
            </a>
            <a href="#phong-chieu" className="whitespace-nowrap hover:text-[#0A3622] transition-colors">
              05. Phòng chiếu ({videoChapters.length})
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
              href="/green-power"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 bg-[#EBF2EE] hover:bg-[#0A3622] text-[#0A3622] hover:text-[#FAF9F5] border border-[#0A3622]/20 text-[11px] uppercase tracking-[0.14em] font-semibold rounded-[2px] transition-colors whitespace-nowrap"
            >
              <span>Green Power</span>
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

        {/* Mobile Quick-Jump Strip */}
        <nav
          aria-label="Điều hướng nhanh các hồi"
          className="lg:hidden border-t border-[#ECE9E0] bg-[#FAF9F5]/95"
        >
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-4 py-2 text-[11px] font-medium text-[#4A544F]">
            <a
              href="#ban-do-hanh-trinh"
              className="shrink-0 px-2.5 py-1 rounded-[2px] bg-[#EBF2EE] text-[#0A3622] font-semibold border border-[#008746]/30"
            >
              01. Bản đồ
            </a>
            <a
              href="#hoi-1-nam-chau"
              className="shrink-0 px-2.5 py-1 rounded-[2px] bg-white border border-[#E4E1D8]"
            >
              02. Năm châu
            </a>
            <a
              href="#hoi-2-chieu-sau"
              className="shrink-0 px-2.5 py-1 rounded-[2px] bg-white border border-[#E4E1D8]"
            >
              03. Bản lĩnh &amp; Sẻ chia
            </a>
            <a
              href="#hoi-3-to-am"
              className="shrink-0 px-2.5 py-1 rounded-[2px] bg-white border border-[#E4E1D8]"
            >
              04. Điểm trở về
            </a>
            <a
              href="#phong-chieu"
              className="shrink-0 px-2.5 py-1 rounded-[2px] bg-white border border-[#E4E1D8]"
            >
              05. Phòng chiếu ({videoChapters.length})
            </a>
          </div>
        </nav>
      </header>

      {/* =================================================================== */}
      {/* FULL-BLEED SILKY 60FPS GPU-COMPOSITED MONOGRAPH HERO STAGE */}
      {/* =================================================================== */}
      <section className="relative min-h-[78dvh] sm:min-h-[86vh] bg-[#061C12] text-[#FAF9F5] flex flex-col justify-end overflow-hidden">
        {/* Hardware-Accelerated Crossfade Ken Burns Stage (Zero Frame Jitter / Zero Text Clutter) */}
        <div className="absolute inset-0 overflow-hidden bg-[#061C12]">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === heroSlideIdx;
            return (
              <div
                key={slide.src}
                className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
                  isActive ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.src}
                  alt={slide.label}
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  decoding="async"
                  style={{
                    objectPosition: slide.objectPosition,
                    transform: isActive && heroMounted && !heroPaused ? 'scale(1.06)' : 'scale(1.0)',
                    transition: 'transform 6500ms cubic-bezier(0.25, 0.1, 0.25, 1)',
                  }}
                  className="w-full h-full object-cover will-change-transform"
                />
              </div>
            );
          })}
        </div>

        {/* Editorial Atmospheric Vignette for Crisp Typography */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#061C12] via-[#061C12]/48 to-[#061C12]/35" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#061C12]/82 via-[#061C12]/32 to-transparent" />

        {/* Top-Right Subtle Ambient Controls + Slide Indicator */}
        <div className="absolute top-4 right-4 sm:top-7 sm:right-8 z-20 flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.15em] text-[#E8D3A6]">
            <span>0{heroSlideIdx + 1} / 0{HERO_SLIDES.length}</span>
            <span className="text-white/40">•</span>
            <span className="text-white/90">{HERO_SLIDES[heroSlideIdx].label}</span>
          </span>
          <button
            type="button"
            onClick={toggleHeroPlayback}
            aria-label={heroPaused ? 'Tiếp tục chuyển ảnh nền' : 'Tạm dừng ảnh nền'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/20 text-[10.5px] uppercase tracking-[0.14em] text-white/90 transition-colors cursor-pointer"
          >
            {heroPaused ? (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Tiếp tục</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3" />
                <span>Tạm dừng nền</span>
              </>
            )}
          </button>
        </div>

        {/* Hero Monograph Typography Spread */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 pt-24 pb-8 sm:pb-14 space-y-8 sm:space-y-10">
          <div className="max-w-3xl space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2.5 text-[10.5px] sm:text-[11px] uppercase tracking-[0.24em] text-[#E8D3A6] font-semibold">
              <span className="w-7 h-px bg-[#E8D3A6]" />
              <span>Monograph • Khánh Vân &amp; Những Chuyến Đi</span>
            </div>

            <h1 className="font-serif text-[34px] sm:text-5xl lg:text-[62px] text-white font-normal leading-[1.12] tracking-[-0.01em]">
              Hai cuốn hộ chiếu, một đội ngũ tử tế và một mái nhà bình yên.
            </h1>

            <p className="text-sm sm:text-[16.5px] text-[#E2ECE6] leading-[1.82] max-w-2xl font-normal">
              Từ chuyến bay đầu tiên năm 2019 đến hôm nay, Vân đã đi qua hai cuốn hộ chiếu. Nhưng điều khiến mình tự hào nhất chưa bao giờ là số con dấu nhập cảnh, mà là việc ngày càng có thêm nhiều đồng đội cùng bước ra thế giới, và sau mọi chuyến đi xa vẫn luôn có một tổ ấm bình an để trở về.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#ban-do-hanh-trinh"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#FAF9F5] hover:bg-[#E8D3A6] text-[#072116] text-xs uppercase tracking-[0.16em] font-bold rounded-[2px] transition-colors"
              >
                <span>Mở bản đồ hành trình</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
              <a
                href="#phong-chieu"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 text-xs uppercase tracking-[0.16em] font-semibold rounded-[2px] transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#E8D3A6]" />
                <span>Phòng chiếu 7 thước phim</span>
              </a>
            </div>
          </div>

          {/* Bottom Editorial Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-6 border-t border-white/15">
            <div>
              <div className="font-serif text-2xl sm:text-3xl text-[#E8D3A6] font-normal">
                02 Cuốn
              </div>
              <div className="text-[11px] text-[#C4D6CC] mt-0.5">
                Hộ chiếu đã ghi dấu từ năm 2019
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl text-white font-normal">
                07 Miền đất
              </div>
              <div className="text-[11px] text-[#C4D6CC] mt-0.5">
                Pháp, Áo, Đức, Hàn, Nhật &amp; Trung Quốc
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl text-white font-normal">
                2 × Top 1
              </div>
              <div className="text-[11px] text-[#C4D6CC] mt-0.5">
                FYP &amp; Duy trì hợp đồng năm 2025
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl text-white font-normal">
                11 Chương
              </div>
              <div className="text-[11px] text-[#C4D6CC] mt-0.5">
                118 khung hình &amp; 7 thước phim thực tế
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHƯƠNG 01: INTERACTIVE EURASIA & VIETNAM PASSPORT JOURNEY MAP */}
      {/* =================================================================== */}
      <JourneyMap onOpenChapter={openChapter} />

      {/* =================================================================== */}
      {/* HỒI I: VƯƠN RA THẾ GIỚI (2019 → 2026) — LIVING EDITORIAL MAGAZINE */}
      {/* =================================================================== */}
      <section
        id="hoi-1-nam-chau"
        className="scroll-mt-24 py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#E4E1D8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-14 sm:space-y-20">
          {/* Act I Manifesto Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2.5 text-[10.5px] uppercase tracking-[0.22em] text-[#008746] font-semibold">
                <span>02 / Hồi I • Vươn Ra Thế Giới</span>
                <span className="w-8 h-px bg-[#B8975A]" />
                <span className="text-[#6A756F]">2019–2026</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#181F1C] font-normal leading-[1.14]">
                Từ bước chân đầu tiên dưới Tháp Eiffel đến sáu kỳ M-Star cùng đội ngũ Green Power
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-[15px] text-[#3B4640] leading-[1.82] border-l-2 border-[#008746] pl-4 sm:pl-5">
                Bảy hành trình quốc tế không đơn thuần là những phần thưởng từ Manulife. Nhìn lại theo dòng thời gian, bạn sẽ thấy rõ nhất sự lớn mạnh của cả một tập thể: từ những ngày đầu Vân đi một mình, đến hôm nay mỗi chuyến đi đều có đông đảo quản lý ưu tú cùng sánh bước.
              </p>
            </div>
          </div>

          {/* Growth Arc Contrast Diptych: 2019 Solo Origin vs 2024-2026 Green Power Scale */}
          {chParis && chKorea && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
              <article
                onClick={() => openChapter(chParis)}
                className="group bg-white border border-[#E4E1D8] hover:border-[#0A3622]/50 rounded-[4px] overflow-hidden cursor-pointer transition-all"
              >
                <div className="grid grid-cols-12 h-full">
                  <div className="col-span-5 relative bg-[#EAE7DF] min-h-[210px] overflow-hidden">
                    <img
                      src={chParis.heroImage}
                      alt={chParis.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-[50%_28%] group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#072116]/85 text-[#E8D3A6] text-[9.5px] uppercase tracking-[0.16em] font-semibold rounded-[2px]">
                      Khởi điểm 2019
                    </span>
                  </div>
                  <div className="col-span-7 p-4 sm:p-6 flex flex-col justify-between gap-3">
                    <div className="space-y-2">
                      <div className="text-[10px] uppercase tracking-[0.16em] text-[#008746] font-semibold">
                        M-Star Pháp 2019 • Paris
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl text-[#181F1C] leading-snug group-hover:text-[#0A3622]">
                        Một mình dưới chân Tháp Eiffel và lời tự hứa đường dài
                      </h3>
                      <p className="text-xs text-[#4A544F] leading-relaxed line-clamp-3">
                        Đêm thu Paris năm 2019 đã mở ra tầm nhìn về sự nghiệp tài chính quốc tế và lời hẹn nhất định sẽ đưa đồng đội cùng đi ra thế giới.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] font-semibold text-[#0A3622]">
                      <span>Xem 10 ảnh Paris 2019</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>

              <article
                onClick={() => openChapter(chKorea)}
                className="group bg-[#0A3622] text-white border border-[#0A3622] rounded-[4px] overflow-hidden cursor-pointer transition-all"
              >
                <div className="grid grid-cols-12 h-full">
                  <div className="col-span-5 relative bg-[#072116] min-h-[210px] overflow-hidden">
                    <img
                      src={chKorea.heroImage}
                      alt={chKorea.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-[50%_35%] group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#E8D3A6] text-[#072116] text-[9.5px] uppercase tracking-[0.16em] font-bold rounded-[2px]">
                      2024–2026
                    </span>
                  </div>
                  <div className="col-span-7 p-4 sm:p-6 flex flex-col justify-between gap-3">
                    <div className="space-y-2">
                      <div className="text-[10px] uppercase tracking-[0.16em] text-[#E8D3A6] font-semibold">
                        Sức mạnh Hệ thống Green Power
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl text-white leading-snug">
                        Đi cùng cả một đoàn quân quản lý bản lĩnh và tử tế
                      </h3>
                      <p className="text-xs text-[#C8DBD1] leading-relaxed line-clamp-3">
                        Từ mùa hoa anh đào Seoul, sắc áo dài Việt tại Nam Ninh đến Phú Sĩ, Trùng Khánh, mỗi chuyến đi nay đều rộn ràng tiếng cười của các anh chị em quản lý.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] font-semibold text-[#E8D3A6]">
                      <span>Xem hành trình Seoul 2024</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* Flagship Living Magazine Spread: Japan 2026 (Live Editorial Loop + Crisp Photography) */}
          {chJapan && (
            <article
              onClick={() => openChapter(chJapan)}
              className="group bg-white border border-[#E4E1D8] hover:border-[#0A3622]/45 rounded-[5px] overflow-hidden shadow-[0_22px_55px_-30px_rgba(10,54,34,0.22)] cursor-pointer transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left 7 cols: Living Silent B-roll Loop + Hero Portrait Pair */}
                <div className="lg:col-span-7 grid grid-cols-12 gap-2.5 p-2.5 sm:p-3 bg-[#F3F1EA]">
                  <div className="col-span-7 relative rounded-[3px] overflow-hidden bg-black aspect-[3/4]">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="/videos/journeys/loop-fuji-poster.jpg"
                      className="w-full h-full object-cover"
                    >
                      <source src="/videos/journeys/loop-fuji.mp4?v=3" type="video/mp4" />
                    </video>
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[9.5px] uppercase tracking-[0.15em] text-[#E8D3A6] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                      <span>Khung hình sống • Phú Sĩ</span>
                    </span>
                  </div>

                  <div className="col-span-5 flex flex-col gap-2.5">
                    <div className="flex-1 rounded-[3px] overflow-hidden bg-[#EAE7DF]">
                      <img
                        src={chJapan.photos[0].src}
                        alt={chJapan.photos[0].caption}
                        loading="lazy"
                        className="w-full h-full object-cover object-[50%_24%] group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 rounded-[3px] overflow-hidden bg-[#EAE7DF]">
                      <img
                        src={chJapan.photos[4].src}
                        alt={chJapan.photos[4].caption}
                        loading="lazy"
                        className="w-full h-full object-cover object-[50%_30%] group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Right 5 cols: Editorial Monograph Copy */}
                <div className="lg:col-span-5 p-6 sm:p-9 lg:p-10 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 text-[10.5px] uppercase tracking-[0.18em] text-[#008746] font-semibold">
                      <span>Tiêu điểm M-Star • 2026</span>
                      <span className="text-[#858E89]">Nhật Bản</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] text-[#181F1C] font-normal leading-[1.2] group-hover:text-[#0A3622] transition-colors">
                      {chJapan.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#4A544F] leading-[1.82]">
                      {chJapan.subtitle}
                    </p>

                    <blockquote className="border-l-2 border-[#B8975A] pl-4 py-0.5 font-serif italic text-base sm:text-[17px] text-[#181F1C] leading-[1.6]">
                      “{chJapan.pullQuote}”
                    </blockquote>
                  </div>

                  <div className="pt-4 border-t border-[#ECE9E0] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-xs text-[#56605B]">
                      <span className="inline-flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5 text-[#008746]" />
                        <span>{chJapan.photoCount} ảnh</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Play className="w-3 h-3 fill-[#008746] text-[#008746]" />
                        <span>Phim {chJapan.video?.durationLabel}</span>
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-semibold text-[#0A3622] group-hover:text-[#008746]">
                      <span>Đọc nhật ký Nhật Bản</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Paired Living Contrast Spread: Europe 2024 + Shanghai 2025 (Each with Silent B-roll Loop) */}
          {chEurope && chShanghai && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  ch: chEurope,
                  loopSrc: '/videos/journeys/loop-salzburg.mp4?v=3',
                  loopPoster: '/videos/journeys/loop-salzburg-poster.jpg',
                  loopLabel: 'Phố cổ Salzburg',
                },
                {
                  ch: chShanghai,
                  loopSrc: '/videos/journeys/loop-shanghai.mp4?v=3',
                  loopPoster: '/videos/journeys/loop-shanghai-poster.jpg',
                  loopLabel: 'Cổ trấn Chu Gia Giác',
                },
              ].map(({ ch, loopSrc, loopPoster, loopLabel }) => (
                <article
                  key={ch.slug}
                  onClick={() => openChapter(ch)}
                  className="group bg-white border border-[#E4E1D8] hover:border-[#0A3622]/45 rounded-[5px] overflow-hidden flex flex-col justify-between cursor-pointer transition-all"
                >
                  <div>
                    {/* Visual Split: Hero Photo + Silent B-roll Loop */}
                    <div className="grid grid-cols-12 gap-2 p-2 bg-[#F3F1EA]">
                      <div className="col-span-7 relative rounded-[3px] overflow-hidden bg-[#EAE7DF] aspect-[4/4]">
                        <img
                          src={ch.heroImage}
                          alt={ch.title}
                          loading="lazy"
                          style={{ objectPosition: ch.heroObjectPosition }}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        />
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-[2px] bg-[#0A3622]/90 text-[#E8D3A6] text-[9.5px] uppercase tracking-[0.15em] font-semibold">
                          {ch.milestoneBadge}
                        </span>
                      </div>
                      <div className="col-span-5 relative rounded-[3px] overflow-hidden bg-black aspect-[4/4]">
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          poster={loopPoster}
                          className="w-full h-full object-cover"
                        >
                          <source src={loopSrc} type="video/mp4" />
                        </video>
                        <span className="absolute bottom-2 left-2 right-2 px-2 py-0.5 rounded-[2px] bg-black/60 text-[9px] uppercase tracking-[0.12em] text-white/90 text-center truncate">
                          {loopLabel}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-7 space-y-3">
                      <div className="text-[10px] uppercase tracking-[0.16em] text-[#008746] font-semibold">
                        {ch.periodLabel} • {ch.location}
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#181F1C] leading-snug group-hover:text-[#0A3622] transition-colors">
                        {ch.title}
                      </h3>
                      <p className="text-xs sm:text-[13.5px] text-[#4A544F] leading-[1.76]">
                        {ch.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-7 pb-5 pt-3 border-t border-[#ECE9E0] flex items-center justify-between text-xs">
                    <span className="text-[#56605B]">
                      {ch.photoCount} ảnh • Phim {ch.video?.durationLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 uppercase tracking-[0.14em] text-[11px] font-semibold text-[#0A3622]">
                      <span>Mở chương này</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Curated 3-Destination Folio: Chongqing 2026, Korea 2024, Nanning 2024 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[chChongqing, chKorea, chNanning].filter(Boolean).map((ch) => (
              <article
                key={ch.slug}
                onClick={() => openChapter(ch)}
                className="group bg-white border border-[#E4E1D8] hover:border-[#0A3622]/45 rounded-[4px] overflow-hidden flex flex-col justify-between cursor-pointer transition-all"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-[#EAE7DF] overflow-hidden">
                    <img
                      src={ch.heroImage}
                      alt={ch.title}
                      loading="lazy"
                      style={{ objectPosition: ch.heroObjectPosition }}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-[2px] bg-[#072116]/85 text-[#E8D3A6] text-[9.5px] uppercase tracking-[0.15em] font-semibold">
                      {ch.milestoneBadge}
                    </span>
                    {ch.video && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-black/65 text-white text-[9.5px]">
                        <Play className="w-2.5 h-2.5 fill-current text-[#34D399]" />
                        <span>{ch.video.durationLabel}</span>
                      </span>
                    )}
                  </div>
                  <div className="p-5 space-y-2.5">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[#008746] font-semibold">
                      {ch.location}
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl text-[#181F1C] leading-snug group-hover:text-[#0A3622]">
                      {ch.title}
                    </h3>
                    <p className="text-xs text-[#4A544F] leading-relaxed line-clamp-3">
                      “{ch.pullQuote}”
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-4 pt-3 border-t border-[#ECE9E0] flex items-center justify-between text-[11px]">
                  <span className="text-[#56605B]">{ch.photoCount} ảnh chọn lọc</span>
                  <span className="inline-flex items-center gap-1 uppercase tracking-[0.14em] font-semibold text-[#0A3622]">
                    <span>Xem chi tiết</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* HỒI II: CHIỀU SÂU NGƯỜI DẪN ĐƯỜNG (THỰC LỰC • KỶ LUẬT • SẺ CHIA) */}
      {/* =================================================================== */}
      <section
        id="hoi-2-chieu-sau"
        className="scroll-mt-24 py-16 sm:py-24 bg-[#F1EEE6] border-b border-[#E0DCD0]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-[#008746] font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>03 / Hồi II • Chiều Sâu Của Người Dẫn Đường</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#181F1C] font-normal leading-[1.14]">
              Phía sau những chuyến đi xa là thực lực nghề, kỷ luật thể chất và lòng sẻ chia
            </h2>
            <p className="text-sm sm:text-[15px] text-[#3B4640] leading-[1.82]">
              Khách hàng và đồng đội gắn bó lâu dài không phải vì những tấm ảnh đẹp trên mạng xã hội, mà vì những giá trị bền vững phía sau: chất lượng duy trì hợp đồng đứng đầu toàn quốc, tinh thần bền bỉ trên đường chạy và những chuyến xe mang yêu thương đến vùng cao.
            </p>
          </div>

          {/* Centerpiece Proof-of-Authority: Yên Tử Top 1 DRD+ with Living Stage Loop */}
          {chYenTu && (
            <article
              onClick={() => openChapter(chYenTu)}
              className="group bg-[#0A3622] text-[#FAF9F5] rounded-[5px] overflow-hidden shadow-[0_24px_60px_-28px_rgba(10,54,34,0.45)] cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#E8D3A6]/15 border border-[#E8D3A6]/40 text-[#E8D3A6] text-[10px] uppercase tracking-[0.18em] font-semibold">
                      Trụ cột 01 • Thực Lực &amp; Chữ Tín Nghề Nghiệp
                    </span>
                    <h3 className="font-serif text-2xl sm:text-4xl text-white font-normal leading-[1.2]">
                      {chYenTu.title}
                    </h3>
                    <blockquote className="border-l-2 border-[#E8D3A6] pl-4 font-serif italic text-base sm:text-lg text-[#F4ECE0] leading-relaxed">
                      “{chYenTu.pullQuote}”
                    </blockquote>
                    <p className="text-xs sm:text-sm text-[#C8DBD1] leading-[1.82]">
                      {chYenTu.story[1]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-[#A9C2B5]">
                      Legacy Yên Tử • {chYenTu.photoCount} ảnh • Phim trao cúp {chYenTu.video?.durationLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-semibold text-[#E8D3A6] group-hover:text-white">
                      <span>Mở chương Yên Tử 2025</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6 grid grid-cols-12 gap-2.5 p-2.5 sm:p-3 bg-[#072116]">
                  <div className="col-span-6 relative rounded-[3px] overflow-hidden bg-black aspect-[3/4]">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="/videos/journeys/loop-yentu-poster.jpg"
                      className="w-full h-full object-cover"
                    >
                      <source src="/videos/journeys/loop-yentu.mp4?v=3" type="video/mp4" />
                    </video>
                    <span className="absolute bottom-2.5 left-2.5 right-2.5 px-2 py-1 rounded-[2px] bg-black/65 text-[9.5px] uppercase tracking-[0.14em] text-[#E8D3A6] text-center">
                      Sân khấu Top 1 DRD+
                    </span>
                  </div>
                  <div className="col-span-6 flex flex-col gap-2.5">
                    <div className="flex-1 rounded-[3px] overflow-hidden bg-[#0E3624]">
                      <img
                        src={chYenTu.photos[1].src}
                        alt={chYenTu.photos[1].caption}
                        loading="lazy"
                        className="w-full h-full object-cover object-[50%_22%] group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 rounded-[3px] overflow-hidden bg-[#0E3624]">
                      <img
                        src={chYenTu.photos[6].src}
                        alt={chYenTu.photos[6].caption}
                        loading="lazy"
                        className="w-full h-full object-cover object-[50%_24%] group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Proof-of-Character Diptych: Phan Thiết (Discipline) & Đắk Lắk (Kindness) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {[
              { ch: chPhanThiet, pillarTag: 'Trụ cột 02 • Kỷ Luật & Sức Bền Đội Ngũ' },
              { ch: chDakLak, pillarTag: 'Trụ cột 03 • Phụng Sự & Sẻ Chia Cộng Đồng' },
            ].map(
              ({ ch, pillarTag }) =>
                ch && (
                  <article
                    key={ch.slug}
                    onClick={() => openChapter(ch)}
                    className="group bg-white border border-[#DCD8CE] hover:border-[#0A3622]/50 rounded-[5px] overflow-hidden flex flex-col justify-between cursor-pointer transition-all"
                  >
                    <div>
                      <div className="grid grid-cols-12 gap-1.5 p-2 bg-[#FAF9F5]">
                        <div className="col-span-8 aspect-[4/3] rounded-[3px] overflow-hidden bg-[#EAE7DF]">
                          <img
                            src={ch.photos[0].src}
                            alt={ch.photos[0].caption}
                            loading="lazy"
                            style={{ objectPosition: ch.heroObjectPosition }}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                          />
                        </div>
                        <div className="col-span-4 flex flex-col gap-1.5">
                          <div className="flex-1 rounded-[3px] overflow-hidden bg-[#EAE7DF]">
                            <img
                              src={ch.photos[1].src}
                              alt={ch.photos[1].caption}
                              loading="lazy"
                              className="w-full h-full object-cover object-[50%_28%]"
                            />
                          </div>
                          <div className="flex-1 rounded-[3px] overflow-hidden bg-[#EAE7DF]">
                            <img
                              src={ch.photos[3].src}
                              alt={ch.photos[3].caption}
                              loading="lazy"
                              className="w-full h-full object-cover object-[50%_28%]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-5 sm:p-7 space-y-3">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[#008746] font-bold block">
                          {pillarTag}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl text-[#181F1C] leading-snug group-hover:text-[#0A3622]">
                          {ch.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#4A544F] leading-[1.78]">
                          {ch.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 sm:px-7 pb-5 pt-3 border-t border-[#ECE9E0] flex items-center justify-between text-xs">
                      <span className="text-[#56605B]">
                        {ch.photoCount} ảnh • Phim {ch.video?.durationLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 uppercase tracking-[0.14em] text-[11px] font-semibold text-[#0A3622]">
                        <span>Mở nhật ký</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                )
            )}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* HỒI III: ĐIỂM TRỞ VỀ — SERENE KINFOLK FAMILY SANCTUARY SPREAD */}
      {/* =================================================================== */}
      {chFamily && (
        <section
          id="hoi-3-to-am"
          className="scroll-mt-24 py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#E4E1D8]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10 sm:space-y-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-[#008746] font-semibold">
                  <Heart className="w-3.5 h-3.5" />
                  <span>04 / Hồi III • Điểm Trở Về</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#181F1C] font-normal leading-[1.14]">
                  {chFamily.title}
                </h2>
              </div>
              <div className="lg:col-span-5">
                <blockquote className="border-l-2 border-[#B8975A] pl-4 sm:pl-5 font-serif italic text-lg sm:text-xl text-[#181F1C] leading-[1.58]">
                  “{chFamily.pullQuote}”
                </blockquote>
              </div>
            </div>

            {/* Kinfolk Asymmetric Family Photo Mosaic (100% Verified Real Family Photos) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
              {/* Wide Lead Family Walk (Blue Tees) */}
              <figure
                onClick={() =>
                  setLightbox({
                    chapterTitle: chFamily.milestoneBadge,
                    photos: chFamily.photos,
                    index: 0,
                  })
                }
                className="lg:col-span-7 group relative rounded-[4px] overflow-hidden bg-[#EAE7DF] aspect-[4/3] lg:aspect-auto lg:min-h-[450px] cursor-zoom-in"
              >
                <img
                  src={chFamily.photos[0].src}
                  alt={chFamily.photos[0].caption}
                  loading="lazy"
                  className="w-full h-full object-cover object-[50%_30%] group-hover:scale-[1.02] transition-transform duration-700"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/75 via-black/30 to-transparent text-white">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#E8D3A6] font-semibold block">
                    Tổ ấm bốn thành viên
                  </span>
                  <span className="font-serif text-base sm:text-xl leading-snug block mt-0.5">
                    {chFamily.photos[0].caption}
                  </span>
                </figcaption>
              </figure>

              {/* Right 2x2 Intimate Family Grid */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-5">
                {[1, 3, 8, 10].map((photoIdx) => {
                  const ph = chFamily.photos[photoIdx];
                  if (!ph) return null;
                  return (
                    <figure
                      key={ph.id}
                      onClick={() =>
                        setLightbox({
                          chapterTitle: chFamily.milestoneBadge,
                          photos: chFamily.photos,
                          index: photoIdx,
                        })
                      }
                      className="group relative rounded-[4px] overflow-hidden bg-[#EAE7DF] aspect-[4/5] cursor-zoom-in"
                    >
                      <img
                        src={ph.src}
                        alt={ph.caption}
                        loading="lazy"
                        className="w-full h-full object-cover object-[50%_24%] group-hover:scale-[1.04] transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-[11px] text-white leading-snug line-clamp-2">
                          {ph.caption}
                        </span>
                      </div>
                    </figure>
                  );
                })}
              </div>
            </div>

            {/* Quiet Closing Reflection connecting Family Peace to Financial Protection */}
            <div className="bg-white border border-[#E4E1D8] rounded-[5px] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <p className="text-sm sm:text-[15.5px] text-[#28322D] leading-[1.85]">
                  {chFamily.story[2]}
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <button
                  type="button"
                  onClick={() => openChapter(chFamily)}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#0A3622] hover:bg-[#008746] text-white text-xs uppercase tracking-[0.15em] font-semibold rounded-[2px] transition-colors cursor-pointer"
                >
                  <span>Xem trọn 19 khoảnh khắc tổ ấm</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* CHƯƠNG 05: PHÒNG CHIẾU 07 THƯỚC PHIM THỰC TẾ (LUXURY SCREENING ROOM) */}
      {/* =================================================================== */}
      <section
        id="phong-chieu"
        className="scroll-mt-24 py-16 sm:py-24 bg-[#061C12] text-[#FAF9F5] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8 sm:space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-[#E8D3A6] font-semibold">
                <Film className="w-3.5 h-3.5" />
                <span>05 / Phòng Chiếu • 07 Thước Phim Thực Tế</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-white font-normal leading-tight">
                Bảy thước phim ngắn trên nền piano acoustic êm dịu
              </h2>
              <p className="text-xs sm:text-sm text-[#BDD0C6] leading-relaxed">
                Được dựng sạch từ tư liệu quay thật trên từng cung đường, giữ lại đúng nhịp thở và ánh sáng tự nhiên của mỗi chuyến đi.
              </p>
            </div>
          </div>

          {/* Desktop Interactive Cinema Screening Lounge */}
          {loungeChapter && loungeChapter.video && (
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Cinema Frame */}
              <div className="lg:col-span-5 bg-[#0A2B1C] border border-[#E8D3A6]/30 rounded-[6px] p-4 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[#E8D3A6] font-semibold">
                  <span>{loungeChapter.milestoneBadge}</span>
                  <span>{loungeChapter.video.durationLabel} • Piano Acoustic</span>
                </div>
                <div className="rounded-[4px] overflow-hidden bg-black aspect-[9/16] max-h-[540px] mx-auto">
                  <video
                    key={loungeChapter.video.src}
                    src={loungeChapter.video.src}
                    poster={loungeChapter.video.poster}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-2 pt-1">
                  <h3 className="font-serif text-xl text-white leading-snug">
                    {loungeChapter.video.title}
                  </h3>
                  <p className="text-xs text-[#C4D6CC] leading-relaxed">
                    {loungeChapter.video.caption}
                  </p>
                  <button
                    type="button"
                    onClick={() => openChapter(loungeChapter)}
                    className="mt-2 w-full py-2.5 px-4 bg-[#E8D3A6] hover:bg-white text-[#061C12] text-xs uppercase tracking-[0.15em] font-bold rounded-[2px] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>
                      Đọc bài viết &amp; xem {loungeChapter.photoCount} ảnh chương này
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right 7-Film Program Playlist */}
              <div className="lg:col-span-7 space-y-2.5">
                {videoChapters.map((ch, idx) => {
                  const isCurrent = ch.slug === loungeChapter.slug;
                  return (
                    <button
                      key={ch.slug}
                      type="button"
                      onClick={() => {
                        setLoungeReelSlug(ch.slug);
                        trackEvent('select_cinema_reel', { chapter_slug: ch.slug });
                      }}
                      className={`w-full text-left p-4 rounded-[4px] border transition-all flex items-center gap-4 cursor-pointer ${
                        isCurrent
                          ? 'bg-[#0D3824] border-[#E8D3A6]/75 shadow-lg'
                          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/25'
                      }`}
                    >
                      <div className="w-16 h-20 rounded-[3px] overflow-hidden bg-black shrink-0 relative">
                        <img
                          src={ch.video!.poster}
                          alt={ch.milestoneBadge}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play
                            className={`w-4 h-4 fill-current ${
                              isCurrent ? 'text-[#E8D3A6]' : 'text-white/80'
                            }`}
                          />
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em]">
                          <span className="text-[#E8D3A6] font-bold">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[#9AB5A7]">{ch.countryTag} • {ch.year}</span>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-[#E8D3A6]/20 text-[#E8D3A6] text-[9px] font-semibold">
                              Đang chọn
                            </span>
                          )}
                        </div>
                        <div className="font-serif text-lg text-white leading-snug truncate">
                          {ch.video!.title}
                        </div>
                        <p className="text-xs text-[#B5C9BE] line-clamp-1">
                          {ch.video!.caption}
                        </p>
                      </div>

                      <span className="text-xs font-mono text-[#E8D3A6] shrink-0">
                        {ch.video!.durationLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mobile Horizontal Snap Cinema Cards */}
          <div className="flex lg:hidden gap-3.5 overflow-x-auto no-scrollbar snap-x pb-2">
            {videoChapters.map((ch) => (
              <button
                key={ch.slug}
                type="button"
                onClick={() => {
                  setActiveReelSlug(ch.slug);
                  trackEvent('play_journey_reel', { chapter_slug: ch.slug });
                }}
                className="snap-start shrink-0 w-[215px] group relative rounded-[5px] overflow-hidden bg-[#0E3B26] border border-white/15 aspect-[9/16] text-left cursor-pointer shadow-lg"
              >
                <img
                  src={ch.video!.poster}
                  alt={ch.video!.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25" />
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                  <span className="px-2 py-0.5 rounded-[2px] bg-black/55 text-[9.5px] uppercase tracking-[0.12em] text-[#E8D3A6] font-semibold truncate">
                    {ch.countryTag} • {ch.year}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-[2px] bg-black/55 text-[9.5px] text-white shrink-0">
                    {ch.video!.durationLabel}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-11 h-11 rounded-full bg-white/90 text-[#0A3622] flex items-center justify-center shadow-xl">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </span>
                </div>
                <div className="absolute inset-x-2.5 bottom-2.5 space-y-1">
                  <div className="font-serif text-sm text-white leading-snug line-clamp-2">
                    {ch.milestoneBadge}
                  </div>
                  <div className="text-[10.5px] text-white/75 line-clamp-2">
                    {ch.video!.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHƯƠNG 06: ĐỒNG HÀNH CÙNG KHÁNH VÂN (DUAL PATHWAYS & CONCIERGE) */}
      {/* =================================================================== */}
      <section
        id="ket-noi-dong-hanh"
        className="scroll-mt-24 py-14 sm:py-22 bg-[#0A3622] text-[#FAF9F5]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#E8D3A6] font-semibold block">
                  06 / Đồng Hành Cùng Khánh Vân
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
                    Gia nhập Hệ thống Green Power (HCM69, SG168, SG169, MN111) với lộ trình kèm cặp thực chiến để xây dựng đội ngũ bền vững và cùng có mặt trên những hành trình vinh danh M-Star, MDRT năm châu.
                  </p>
                  <a
                    href="/green-power"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[#E8D3A6] hover:text-white font-semibold pt-1"
                  >
                    <span>Xem hồ sơ 48 Quản lý Green Power</span>
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
      <footer className="bg-[#061C12] text-[#B9C8C0] py-8 pb-24 sm:pb-10 border-t border-white/10">
        <div className="max-w-7xl w-full min-w-0 mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A758] shrink-0" />
            <span>
              Khánh Vân &amp; Những Chuyến Đi • Hệ thống Green Power (Manulife Việt Nam)
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#9BB0A5]">
            <a href="/" className="hover:text-white transition-colors">
              Trang chủ
            </a>
            <span>•</span>
            <a href="/green-power" className="hover:text-white transition-colors">
              Hệ thống Green Power
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
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat trực tiếp qua Zalo với Khánh Vân: ${PHONE_DISPLAY}`}
          className="relative w-10 h-10 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center bg-gradient-to-br from-[#00A758] via-[#008746] to-[#0A3622] text-white shadow-[0_6px_20px_rgba(0,167,88,0.34)] hover:-translate-y-0.5 transition-all duration-300 border-2 border-white"
        >
          <span className="manulife-halo absolute -inset-1 rounded-full bg-[#00A758]/35 pointer-events-none" />
          <span className="relative z-10 font-sans font-extrabold tracking-tight text-[11px] sm:text-[13.5px] text-white leading-none">
            Zalo
          </span>
          <span className="absolute bottom-0 right-0 z-20 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#22C55E] border-2 border-white rounded-full" />
        </a>

        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Kết nối Facebook Khánh Vân"
          className="relative w-10 h-10 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center bg-gradient-to-br from-[#0D5C38] via-[#0A3622] to-[#062316] text-white shadow-[0_6px_20px_rgba(10,54,34,0.34)] hover:-translate-y-0.5 transition-all duration-300 border-2 border-white"
        >
          <span className="manulife-halo-delayed absolute -inset-1 rounded-full bg-[#008746]/32 pointer-events-none" />
          <MessengerBrandSvg className="w-5 h-5 sm:w-[25px] sm:h-[25px] text-white relative z-10" />
          <span className="absolute bottom-0 right-0 z-20 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#22C55E] border-2 border-white rounded-full" />
        </a>
      </aside>

      {/* =================================================================== */}
      {/* MODAL 1: CURATED EDITORIAL CHAPTER READER + EXPANDABLE GALLERY */}
      {/* =================================================================== */}
      <AnimatePresence>
        {selectedChapter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedChapterSlug(null)}
            className="fixed inset-0 z-50 bg-[#121815]/82 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-5"
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
              {/* Sticky Top Bar */}
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
                            Đồng hành
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

                  {selectedChapter.video && (
                    <div className="lg:col-span-5 bg-[#072116] text-white rounded-[5px] p-3.5 sm:p-4 border border-[#0A3622] space-y-3">
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

                {/* Curated Editorial Gallery (Top 6 Asymmetric Spread + Expand Full Archive) */}
                <div className="pt-6 border-t border-[#E4E1D8] space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#008746] font-semibold block">
                        Tuyển Tập Khung Hình ({selectedChapter.photos.length} Ảnh)
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#181F1C]">
                        Những khoảnh khắc đáng nhớ tại {selectedChapter.countryTag}
                      </h3>
                    </div>
                    <span className="text-xs text-[#66706B]">
                      Chạm ảnh bất kỳ để xem toàn màn hình
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {modalPhotosVisible.map((photo, pIdx) => (
                      <figure
                        key={photo.id}
                        onClick={() =>
                          setLightbox({
                            chapterTitle: selectedChapter.milestoneBadge,
                            photos: selectedChapter.photos,
                            index: pIdx,
                          })
                        }
                        className={`group bg-white border border-[#E4E1D8] hover:border-[#0A3622]/50 rounded-[4px] overflow-hidden cursor-zoom-in flex flex-col justify-between transition-colors ${
                          pIdx === 0 && !showAllModalPhotos ? 'sm:col-span-2 lg:col-span-2' : ''
                        }`}
                      >
                        <div
                          className={`relative overflow-hidden bg-[#EAE7DF] ${
                            pIdx === 0 && !showAllModalPhotos ? 'aspect-[16/10]' : 'aspect-[4/5]'
                          }`}
                        >
                          <img
                            src={photo.src}
                            alt={photo.caption}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-[50%_26%] group-hover:scale-[1.03] transition-transform duration-700"
                          />
                          <span className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-[2px] bg-black/60 text-[9.5px] uppercase tracking-[0.12em] text-white">
                            Phóng lớn
                          </span>
                        </div>
                        <figcaption className="p-3.5 text-xs text-[#3B4640] leading-relaxed">
                          {photo.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>

                  {!showAllModalPhotos && selectedChapter.photos.length > 6 && (
                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={() => setShowAllModalPhotos(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#0A3622] text-[#0A3622] hover:text-white border border-[#0A3622]/35 text-xs uppercase tracking-[0.15em] font-semibold rounded-[2px] transition-colors cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>
                          Mở rộng xem thêm {selectedChapter.photos.length - 6} ảnh kỷ niệm khác
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Contextual Soft CTA inside Chapter Modal */}
                <div className="p-5 sm:p-7 rounded-[5px] bg-[#0A3622] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-xl">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#E8D3A6] font-semibold block">
                      {selectedChapter.ctaMode === 'career'
                        ? 'Đồng hành sự nghiệp cùng Green Power'
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
      {/* MODAL 2: MOBILE CINEMA REEL VIEWER */}
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
                        className="p-1.5 border border-[#DCD8CE] rounded-[2px] cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateReelModal(1)}
                        aria-label="Thước phim kế tiếp"
                        className="p-1.5 border border-[#DCD8CE] rounded-[2px] cursor-pointer"
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
                </div>

                <div className="pt-3 border-t border-[#E4E1D8]">
                  <button
                    type="button"
                    onClick={() => {
                      const slug = activeReelChapter.slug;
                      setActiveReelSlug(null);
                      setShowAllModalPhotos(false);
                      setSelectedChapterSlug(slug);
                    }}
                    className="w-full py-2.5 px-4 bg-[#0A3622] hover:bg-[#008746] text-white text-xs uppercase tracking-[0.15em] font-semibold rounded-[2px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>
                      Đọc bài viết &amp; xem {activeReelChapter.photoCount} ảnh chương này
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

                <div className="pt-3 border-t border-[#E4E1D8]">
                  <a
                    href={activeVideo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 bg-[#0A3622] text-white text-xs uppercase tracking-[0.14em] font-semibold rounded-[2px]"
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
      {/* MODAL 4: FULL-SCREEN PHOTO LIGHTBOX */}
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
