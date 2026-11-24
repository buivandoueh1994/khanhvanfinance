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
  Maximize2,
  Menu,
  Pause,
  Play,
  Sparkles,
  Users,
  Volume2,
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
    src: '/images/journeys/nhat-ban-2026/01-kv_268.jpg?v=2',
    label: 'Đỉnh Phú Sĩ, Nhật Bản • 2026',
    objectPosition: '50% 24%',
  },
  {
    src: '/images/journeys/ao-duc-2024/10-kv_235.jpg?v=2',
    label: 'Làng cổ Hallstatt, Áo • 2024',
    objectPosition: '50% 26%',
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
    objectPosition: '50% 62%',
  },
];

interface LightboxState {
  chapterTitle: string;
  photos: JourneyPhoto[];
  index: number;
}

interface ScreeningReel {
  slug: string;
  isSignature?: boolean;
  badge: string;
  countryTag: string;
  year: string;
  soundLabel: string;
  src: string;
  poster: string;
  durationLabel: string;
  title: string;
  caption: string;
  chapter?: JourneyChapter;
}

const SIGNATURE_FILM: ScreeningReel = {
  slug: 'cu-di-roi-se-den',
  isSignature: true,
  badge: 'Phim thương hiệu, 2018 đến nay',
  countryTag: 'Phim thương hiệu',
  year: '2018–2026',
  soundLabel: 'Giọng tự sự Khánh Vân & Warm Memories',
  src: '/videos/journeys/cu-di-roi-se-den.mp4?v=5',
  poster: '/videos/journeys/cu-di-roi-se-den-poster.jpg?v=5',
  durationLabel: '0:49',
  title: 'Cứ Đi Rồi Sẽ Đến, chỉ cần hướng về phía mặt trời',
  caption:
    'Bốn mươi chín giây tự sự bằng chính giọng đọc của Khánh Vân: từ những năm tháng làm ngân hàng, bước ngoặt 2018 bắt đầu lại từ chiếc mã số tư vấn viên nhỏ xíu, đến hành trình đi qua hơn 16 quốc gia cùng đội ngũ và những người đồng hành.',
};

const NAV_SECTIONS = [
  { id: 'ban-do-hanh-trinh', num: '01', label: 'Bản đồ', mobileLabel: '01. Bản đồ' },
  { id: 'hoi-1-nam-chau', num: '02', label: 'Năm châu', mobileLabel: '02. Năm châu' },
  { id: 'hoi-2-chieu-sau', num: '03', label: 'Bản lĩnh', mobileLabel: '03. Bản lĩnh' },
  { id: 'hoi-3-to-am', num: '04', label: 'Tổ ấm', mobileLabel: '04. Tổ ấm' },
  { id: 'phong-chieu', num: '05', label: 'Phòng chiếu', mobileLabel: '05. Phòng chiếu' },
] as const;

export const JourneysPage: React.FC = () => {
  const [selectedChapterSlug, setSelectedChapterSlug] = useState<string | null>(null);
  const [showAllModalPhotos, setShowAllModalPhotos] = useState(false);
  const [activeReelSlug, setActiveReelSlug] = useState<string | null>(null);
  const [loungeReelSlug, setLoungeReelSlug] = useState<string>(SIGNATURE_FILM.slug);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const [heroMounted, setHeroMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('ban-do-hanh-trinh');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pastHero, setPastHero] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileNavRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setHeroMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  // Reading progress hairline + smart floating dock visibility (hidden on Hero & Contact)
  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const y = window.scrollY;
        const maxScroll = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        setScrollProgress(Math.min(100, Math.max(0, (y / maxScroll) * 100)));
        setPastHero(y > 320);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll-spy for Desktop & Mobile Nav + hide floating widgets over Contact/Footer
  useEffect(() => {
    const sectionIds = [...NAV_SECTIONS.map((s) => s.id), 'ket-noi-dong-hanh'];
    const sectionEls = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sectionEls.length === 0) return;

    const spyObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.05, 0.25, 0.5] }
    );
    sectionEls.forEach((el) => spyObserver.observe(el));

    const contactEl = document.getElementById('ket-noi-dong-hanh');
    const contactObserver = new IntersectionObserver(
      (entries) => {
        setContactVisible(entries.some((e) => e.isIntersecting));
      },
      { threshold: 0.08 }
    );
    if (contactEl) contactObserver.observe(contactEl);

    return () => {
      spyObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  // Gently keep active mobile nav tab visible inside horizontal sub-nav
  useEffect(() => {
    const tab = mobileNavRefs.current[activeSection];
    if (tab && tab.parentElement) {
      const parent = tab.parentElement;
      const targetLeft = tab.offsetLeft - parent.clientWidth / 2 + tab.clientWidth / 2;
      parent.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    }
  }, [activeSection]);

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
    document.title = 'Khánh Vân và những chuyến đi, 2019 đến 2026';
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

  const totalPhotos = useMemo(
    () => JOURNEY_CHAPTERS.reduce((sum, ch) => sum + ch.photos.length, 0),
    []
  );

  const chapterMap = useMemo(() => {
    const map: Record<string, JourneyChapter> = {};
    for (const c of JOURNEY_CHAPTERS) map[c.slug] = c;
    return map;
  }, []);

  const screeningReels = useMemo<ScreeningReel[]>(() => {
    const chapterReels: ScreeningReel[] = JOURNEY_CHAPTERS.filter((c) => Boolean(c.video)).map(
      (c) => ({
        slug: c.slug,
        badge: c.milestoneBadge,
        countryTag: c.countryTag,
        year: c.year,
        soundLabel: c.video!.soundLabel || 'Nhạc nền chọn lọc',
        src: c.video!.src,
        poster: c.video!.poster,
        durationLabel: c.video!.durationLabel,
        title: c.video!.title,
        caption: c.video!.caption,
        chapter: c,
      })
    );
    return [SIGNATURE_FILM, ...chapterReels];
  }, []);

  const loungeReel = useMemo(
    () => screeningReels.find((r) => r.slug === loungeReelSlug) || screeningReels[0],
    [screeningReels, loungeReelSlug]
  );

  const selectedChapterIndex = useMemo(
    () => JOURNEY_CHAPTERS.findIndex((c) => c.slug === selectedChapterSlug),
    [selectedChapterSlug]
  );

  const selectedChapter =
    selectedChapterIndex >= 0 ? JOURNEY_CHAPTERS[selectedChapterIndex] : null;

  const activeReelIndex = useMemo(
    () => screeningReels.findIndex((r) => r.slug === activeReelSlug),
    [screeningReels, activeReelSlug]
  );

  const activeReel = activeReelIndex >= 0 ? screeningReels[activeReelIndex] : null;

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
    if (activeReelIndex < 0 || screeningReels.length === 0) return;
    const nextIdx =
      (activeReelIndex + direction + screeningReels.length) % screeningReels.length;
    setActiveReelSlug(screeningReels[nextIdx].slug);
  };

  const navigateLightbox = (direction: -1 | 1) => {
    if (!lightbox) return;
    const nextIdx =
      (lightbox.index + direction + lightbox.photos.length) %
      lightbox.photos.length;
    setLightbox({ ...lightbox, index: nextIdx });
  };

  const anyModalOpen = Boolean(
    selectedChapter || activeReel || lightbox || activeVideo
  );
  const showFloatingDock = pastHero && !contactVisible && !anyModalOpen;

  useEffect(() => {
    if (!anyModalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightbox) setLightbox(null);
        else if (activeReel) setActiveReelSlug(null);
        else if (activeVideo) setActiveVideo(null);
        else if (selectedChapter) setSelectedChapterSlug(null);
        return;
      }
      if (lightbox) {
        if (e.key === 'ArrowRight') navigateLightbox(1);
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
      } else if (activeReel) {
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
    <div className="journeys-editorial min-h-screen w-full max-w-[100vw] [overflow-x:clip] bg-[#FAF9F5] text-[#181F1C] selection:bg-[#0A3622] selection:text-white">
      {/* =================================================================== */}
      {/* STICKY EDITORIAL HEADER + READING PROGRESS + SCROLL-SPY NAV */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E4E1D8]">
        <div className="max-w-[1320px] w-full min-w-0 mx-auto px-4 sm:px-8 xl:px-10 h-[62px] sm:h-[72px] flex items-center justify-between gap-2 sm:gap-5">
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-[#181F1C] min-w-[44px] min-h-[44px] flex items-center justify-center -ml-2 rounded-[3px] hover:bg-[#ECE9E0]/60 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu chuyển trang'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <a href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
              <span className="w-[3px] h-7 sm:h-8 bg-[#008746] rounded-full shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-[17px] sm:text-[21px] tracking-[0.06em] text-[#181F1C] font-semibold leading-none truncate">
                  KHÁNH VÂN
                </span>
                <span className="text-[9px] sm:text-[9.5px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#56605B] font-medium mt-1 truncate">
                  Những chuyến đi • 16+ Quốc gia
                </span>
              </div>
            </a>
          </div>

          {/* Unified Minimalist Desktop Navigation: 4 Page Sections | 2 Other Site Pages */}
          <nav
            aria-label="Điều hướng chính"
            className="hidden lg:flex items-center gap-5 xl:gap-7"
          >
            <div className="flex items-center gap-4 xl:gap-6">
              {NAV_SECTIONS.filter((sec) => sec.id !== 'hoi-3-to-am').map((sec) => {
                const isActive =
                  activeSection === sec.id ||
                  (sec.id === 'hoi-2-chieu-sau' && activeSection === 'hoi-3-to-am');
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className={`relative py-1.5 whitespace-nowrap text-[11px] uppercase tracking-[0.14em] transition-colors ${
                      isActive
                        ? 'text-[#0A3622] font-semibold'
                        : 'text-[#56605B] hover:text-[#0A3622] font-medium'
                    }`}
                  >
                    <span>
                      {sec.label}
                      {sec.id === 'phong-chieu' ? ` (${screeningReels.length})` : ''}
                    </span>
                    <span
                      className={`absolute left-0 right-0 bottom-0 h-[2px] bg-[#008746] rounded-full transition-transform duration-300 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            <span aria-hidden="true" className="w-px h-3.5 bg-[#D4CFC4]" />

            <div className="flex items-center gap-4 xl:gap-5">
              <a
                href="/"
                className="py-1.5 whitespace-nowrap text-[11px] uppercase tracking-[0.14em] text-[#56605B] hover:text-[#0A3622] font-medium transition-colors"
              >
                Trang chủ
              </a>
              <a
                href="/green-power"
                className="group inline-flex items-center gap-2 py-1.5 whitespace-nowrap text-[11px] uppercase tracking-[0.14em] text-[#181F1C] hover:text-[#008746] font-semibold transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#008746] transition-transform duration-200 group-hover:scale-125 shrink-0" />
                <span>Green Power</span>
              </a>
            </div>
          </nav>

          {/* Single Crisp Executive CTA */}
          <div className="flex items-center shrink-0">
            <a
              href="#ket-noi-dong-hanh"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-[10.5px] sm:text-[11px] uppercase tracking-[0.14em] font-semibold rounded-[3px] transition-colors whitespace-nowrap"
            >
              <span>Liên hệ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Mobile Site Switcher Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#FAF9F5] border-t border-[#E4E1D8] overflow-hidden shadow-[0_18px_36px_-18px_rgba(10,54,34,0.22)]"
            >
              <div className="px-4 py-4 flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#7A847F] font-semibold">
                  Chuyển trang
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                  <a
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3.5 py-3 rounded-[4px] bg-white border border-[#DCD8CE] flex items-center justify-between gap-2 text-[#181F1C]"
                  >
                    <div>
                      <span className="text-[9.5px] uppercase tracking-[0.16em] text-[#7A847F] font-semibold block">
                        Cổng chính
                      </span>
                      <span className="font-serif text-[15px] font-medium">
                        Trang chủ Khánh Vân
                      </span>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-[#0A3622] shrink-0" />
                  </a>
                  <a
                    href="/green-power"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3.5 py-3 rounded-[4px] bg-[#EBF2EE] border border-[#0A3622]/20 flex items-center justify-between gap-2 text-[#0A3622]"
                  >
                    <div>
                      <span className="text-[9.5px] uppercase tracking-[0.16em] text-[#008746] font-semibold block">
                        Hệ thống 500+ Nhân sự
                      </span>
                      <span className="font-serif text-[15px] font-semibold">
                        Green Power • 4 Khu vực
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#008746] shrink-0" />
                  </a>
                </div>

                <span className="text-[10px] uppercase tracking-[0.18em] text-[#7A847F] font-semibold mt-1">
                  Trong trang Những chuyến đi
                </span>
                {NAV_SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs uppercase tracking-[0.16em] text-[#181F1C] py-2 min-h-[40px] flex items-center justify-between border-b border-[#E4E1D8]/60 last:border-b-0"
                  >
                    <span>
                      {sec.mobileLabel}
                      {sec.id === 'phong-chieu' ? ` (${screeningReels.length})` : ''}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#858E89]" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Quick-Jump Strip with Real Scroll-Spy & Scroll-Fade Cue */}
        <nav
          aria-label="Điều hướng nhanh các hồi"
          className="lg:hidden border-t border-[#ECE9E0] bg-[#FAF9F5]/95"
        >
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-fade-right px-4 pr-10 py-2 text-[11px] font-medium">
            {NAV_SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  ref={(el) => {
                    mobileNavRefs.current[sec.id] = el;
                  }}
                  href={`#${sec.id}`}
                  className={`shrink-0 px-2.5 py-1.5 rounded-[3px] border transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0A3622] text-[#FAF9F5] border-[#0A3622] font-semibold shadow-xs'
                      : 'bg-white text-[#4A544F] border-[#E4E1D8]'
                  }`}
                >
                  {sec.label}
                  {sec.id === 'phong-chieu' ? ` (${screeningReels.length})` : ''}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Whisper-thin Editorial Reading Progress Bar */}
        <div className="h-[2px] w-full bg-[#ECE9E0]/60 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#B8975A] via-[#008746] to-[#0A3622] transition-[width] duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* =================================================================== */}
      {/* FULL-BLEED SILKY 60FPS GPU-COMPOSITED MONOGRAPH HERO STAGE */}
      {/* =================================================================== */}
      <section className="relative min-h-[calc(100dvh-106px)] lg:min-h-[calc(100vh-76px)] bg-[#061C12] text-[#FAF9F5] flex flex-col justify-between overflow-hidden">
        {/* Hardware-Accelerated Crossfade Ken Burns Stage */}
        <div className="absolute inset-0 overflow-hidden bg-[#061C12]">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === heroSlideIdx;
            return (
              <div
                key={slide.src}
                className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
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
                    transform: isActive && heroMounted && !heroPaused ? 'scale(1.055)' : 'scale(1.0)',
                    transition: 'transform 6500ms cubic-bezier(0.25, 0.1, 0.25, 1)',
                  }}
                  className="w-full h-full object-cover will-change-transform"
                />
              </div>
            );
          })}
        </div>

        {/* Multi-Stop Filmic Editorial Scrim for Crisp AAA Typography Contrast on All Slides */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#051810] via-[#051810]/68 to-[#051810]/32" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#051810]/88 via-[#051810]/42 to-transparent" />

        {/* Top Bar: Destination Caption (Visible on Both Mobile & Desktop) + Ambient Pause */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-8 pt-4 sm:pt-7 flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.14em] text-[#E8D3A6] min-w-0">
            <span className="shrink-0 font-semibold">
              0{heroSlideIdx + 1} / 0{HERO_SLIDES.length}
            </span>
            <span className="text-white/35 shrink-0">•</span>
            <span className="text-white/90 truncate">{HERO_SLIDES[heroSlideIdx].label}</span>
          </div>

          <button
            type="button"
            onClick={toggleHeroPlayback}
            aria-label={heroPaused ? 'Tiếp tục chuyển ảnh nền' : 'Tạm dừng ảnh nền'}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/20 text-[10px] sm:text-[10.5px] uppercase tracking-[0.13em] text-white/90 transition-colors cursor-pointer"
          >
            {heroPaused ? (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Tiếp tục</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3" />
                <span className="hidden sm:inline">Tạm dừng nền</span>
                <span className="sm:hidden">Dừng</span>
              </>
            )}
          </button>
        </div>

        {/* Hero Monograph Typography Spread */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 pt-10 sm:pt-16 pb-8 sm:pb-12 space-y-7 sm:space-y-9">
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2.5 text-[10.5px] sm:text-[11px] uppercase tracking-[0.24em] text-[#E8D3A6] font-semibold">
              <span className="w-7 h-px bg-[#E8D3A6]" />
              <span>Khánh Vân &amp; những chuyến đi</span>
            </div>

            <h1 className="font-serif text-[32px] sm:text-5xl lg:text-[62px] text-white font-medium leading-[1.12] tracking-[-0.02em] drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
              Hai cuốn hộ chiếu, một đội ngũ và một mái nhà để về.
            </h1>

            <p className="text-[14px] sm:text-[16.5px] text-[#E6F0EA] leading-[1.78] max-w-2xl font-normal">
              Từ chuyến bay đầu tiên năm 2019 đến nay, Vân đã đi qua hai cuốn hộ chiếu. Điều Vân tự hào nhất không phải số con dấu nhập cảnh, mà là ngày càng nhiều đồng đội cùng đi, và sau mỗi chuyến xa vẫn có nhà để về.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  setActiveReelSlug(SIGNATURE_FILM.slug);
                  trackEvent('play_signature_film', { source: 'hero_cta' });
                }}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#E8D3A6] hover:bg-[#FAF9F5] active:scale-[0.99] text-[#072116] text-xs uppercase tracking-[0.15em] font-bold rounded-[3px] transition-all shadow-[0_12px_32px_-12px_rgba(232,211,166,0.55)] cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Xem phim thương hiệu (0:49)</span>
              </button>
              <a
                href="#ban-do-hanh-trinh"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 text-xs uppercase tracking-[0.15em] font-semibold rounded-[3px] transition-colors"
              >
                <span>Xem bản đồ chuyến đi</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive 5-Slide Editorial Progress Selector + Telemetry Bar */}
          <div className="space-y-5">
            <div className="flex items-center gap-2" role="tablist" aria-label="Chọn ảnh bìa hành trình">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === heroSlideIdx;
                return (
                  <button
                    key={slide.src}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={slide.label}
                    onClick={() => setHeroSlideIdx(idx)}
                    className="group py-2 flex-1 max-w-[68px] cursor-pointer text-left"
                  >
                    <span
                      className={`block h-[2.5px] rounded-full transition-all duration-500 ${
                        isActive
                          ? 'bg-[#E8D3A6] opacity-100'
                          : 'bg-white/30 group-hover:bg-white/60'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-4 sm:gap-8 pt-5 border-t border-white/15">
              <div>
                <div className="font-serif text-[24px] sm:text-3xl text-[#E8D3A6] font-medium leading-tight">
                  02 Cuốn
                </div>
                <div className="text-[11px] sm:text-xs text-[#C8DBD1] mt-1">
                  Hộ chiếu, dùng từ năm 2019
                </div>
              </div>
              <div className="sm:border-l sm:border-white/12 sm:pl-6">
                <div className="font-serif text-[24px] sm:text-3xl text-white font-medium leading-tight">
                  16+ Quốc gia
                </div>
                <div className="text-[11px] sm:text-xs text-[#C8DBD1] mt-1">
                  Đi qua trên hai cuốn hộ chiếu
                </div>
              </div>
              <div className="sm:border-l sm:border-white/12 sm:pl-6">
                <div className="font-serif text-[24px] sm:text-3xl text-white font-medium leading-tight">
                  2 × Top 1
                </div>
                <div className="text-[11px] sm:text-xs text-[#C8DBD1] mt-1">
                  FYP &amp; Duy trì hợp đồng năm 2025
                </div>
              </div>
              <div className="sm:border-l sm:border-white/12 sm:pl-6">
                <div className="font-serif text-[24px] sm:text-3xl text-white font-medium leading-tight">
                  11 Chương
                </div>
                <div className="text-[11px] sm:text-xs text-[#C8DBD1] mt-1">
                  {totalPhotos} khung hình và {screeningReels.length} phim
                </div>
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
        className="scroll-mt-[112px] lg:scroll-mt-20 py-14 sm:py-22 bg-[#FAF9F5] border-b border-[#E4E1D8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
          {/* Act I Manifesto Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-end">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2.5 text-[10.5px] uppercase tracking-[0.22em] text-[#008746] font-semibold">
                <span>02 / Hồi I, ra thế giới</span>
                <span className="w-8 h-px bg-[#B8975A]" />
                <span className="text-[#6A756F]">2019–2026</span>
              </div>
              <h2 className="font-serif text-[28px] sm:text-5xl text-[#181F1C] font-medium leading-[1.15]">
                Từ Tháp Eiffel năm 2019 đến sáu kỳ M-Star cùng đội ngũ Green Power
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-[15px] text-[#3B4640] leading-[1.82] border-l-2 border-[#008746] pl-4 sm:pl-5">
                Trong hơn 16 quốc gia Vân đã đi qua cùng hai cuốn hộ chiếu, bảy chặng M-Star tiêu biểu dưới đây ghi lại rõ nhất bước chuyển của mình: chuyến đầu năm 2019 đi một mình, những chuyến gần nhất cả đoàn quản lý đi cùng.
              </p>
            </div>
          </div>

          {/* Growth Arc Contrast Diptych: Stacked Cleanly on Mobile, Split Editorial on sm+ */}
          {chParis && chKorea && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
              <article
                onClick={() => openChapter(chParis)}
                className="group bg-white border border-[#E4E1D8] hover:border-[#0A3622]/45 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(10,54,34,0.22)] rounded-[6px] overflow-hidden cursor-pointer transition-all duration-300"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                  <div className="sm:col-span-5 relative bg-[#EAE7DF] aspect-[16/10] sm:aspect-auto sm:min-h-[230px] overflow-hidden">
                    <img
                      src={chParis.heroImage}
                      alt={chParis.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-[50%_28%] group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#072116]/88 text-[#E8D3A6] text-[9.5px] uppercase tracking-[0.16em] font-semibold rounded-[2px]">
                      Khởi điểm 2019
                    </span>
                  </div>
                  <div className="sm:col-span-7 p-5 sm:p-6 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="text-[10px] uppercase tracking-[0.16em] text-[#008746] font-semibold">
                        M-Star Pháp 2019, Paris
                      </div>
                      <h3 className="font-serif text-[20px] sm:text-xl text-[#181F1C] leading-[1.3] group-hover:text-[#0A3622] transition-colors">
                        Một mình dưới Tháp Eiffel và lời hẹn với chính mình
                      </h3>
                      <p className="text-[13px] sm:text-xs text-[#4A544F] leading-[1.7] line-clamp-3">
                        Đêm thu Paris năm 2019 mở ra hướng đi trong nghề tài chính quốc tế, cùng lời hẹn sẽ đưa đồng đội đi cùng.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-[#0A3622] group-hover:text-[#008746] transition-colors">
                      <span>Xem 10 ảnh Paris 2019</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>

              <article
                onClick={() => openChapter(chKorea)}
                className="group bg-[#0A3622] text-white border border-[#0A3622] hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-22px_rgba(10,54,34,0.45)] rounded-[6px] overflow-hidden cursor-pointer transition-all duration-300"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                  <div className="sm:col-span-5 relative bg-[#072116] aspect-[16/10] sm:aspect-auto sm:min-h-[230px] overflow-hidden">
                    <img
                      src={chKorea.heroImage}
                      alt={chKorea.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-[58%_30%] group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#E8D3A6] text-[#072116] text-[9.5px] uppercase tracking-[0.16em] font-bold rounded-[2px]">
                      2024–2026
                    </span>
                  </div>
                  <div className="sm:col-span-7 p-5 sm:p-6 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="text-[10px] uppercase tracking-[0.16em] text-[#E8D3A6] font-semibold">
                        Hệ thống Green Power
                      </div>
                      <h3 className="font-serif text-[20px] sm:text-xl text-white leading-[1.3]">
                        Giờ đi cả đoàn quản lý
                      </h3>
                      <p className="text-[13px] sm:text-xs text-[#CCE0D5] leading-[1.7] line-clamp-3">
                        Từ Seoul mùa hoa anh đào, Nam Ninh với áo dài Việt, đến Phú Sĩ và Trùng Khánh, chuyến nào giờ cũng có đông anh chị em quản lý đi cùng.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-[#E8D3A6] group-hover:text-white transition-colors">
                      <span>Xem chuyến Seoul 2024</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* Flagship Living Magazine Spread: Japan 2026 (Balanced Proportion & Zero Dead Void) */}
          {chJapan && (
            <article
              onClick={() => openChapter(chJapan)}
              className="group bg-white border border-[#E4E1D8] hover:border-[#0A3622]/45 rounded-[6px] overflow-hidden shadow-[0_22px_55px_-30px_rgba(10,54,34,0.22)] cursor-pointer transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left 7 cols: Locked Symmetric Collage Height on Every Screen Size (Zero Empty Void!) */}
                <div className="lg:col-span-7 grid grid-cols-12 gap-2 sm:gap-2.5 p-2.5 sm:p-3 bg-[#F3F1EA] h-[310px] sm:h-[420px] lg:h-[520px]">
                  <div className="col-span-7 relative rounded-[4px] overflow-hidden bg-black h-full">
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
                    <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[9.5px] uppercase tracking-[0.15em] text-[#E8D3A6] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                      <span>Cảnh quay Phú Sĩ</span>
                    </span>
                  </div>

                  <div className="col-span-5 flex flex-col gap-2 sm:gap-2.5 h-full min-h-0">
                    <div className="flex-1 rounded-[4px] overflow-hidden bg-[#EAE7DF] min-h-0">
                      <img
                        src={chJapan.photos[0].src}
                        alt={chJapan.photos[0].caption}
                        loading="lazy"
                        className="w-full h-full object-cover object-[50%_24%] group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 rounded-[4px] overflow-hidden bg-[#EAE7DF] min-h-0">
                      <img
                        src={chJapan.photos[4].src}
                        alt={chJapan.photos[4].caption}
                        loading="lazy"
                        className="w-full h-full object-cover object-[50%_30%] group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Right 5 cols: Rich Balanced Editorial Monograph Copy */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 text-[10.5px] uppercase tracking-[0.18em] text-[#008746] font-semibold">
                      <span>Tiêu điểm M-Star 2026</span>
                      <span className="text-[#7A847F]">Nhật Bản</span>
                    </div>

                    <h3 className="font-serif text-[26px] sm:text-3xl lg:text-[34px] text-[#181F1C] font-medium leading-[1.2] group-hover:text-[#0A3622] transition-colors">
                      {chJapan.title}
                    </h3>

                    <p className="text-[13.5px] sm:text-sm text-[#4A544F] leading-[1.78]">
                      {chJapan.subtitle}
                    </p>

                    <blockquote className="border-l-2 border-[#B8975A] pl-4 py-0.5 font-serif italic text-[16px] sm:text-[18px] text-[#181F1C] leading-[1.58]">
                      “{chJapan.pullQuote}”
                    </blockquote>

                    <p className="hidden sm:block text-[13.5px] text-[#4A544F] leading-[1.8] line-clamp-3">
                      {chJapan.story[0]}
                    </p>
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
                    <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-semibold text-[#0A3622] group-hover:text-[#008746] transition-colors">
                      <span>Xem chuyến Nhật Bản</span>
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
                      {ch.photoCount} ảnh, phim {ch.video?.durationLabel}
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
        className="scroll-mt-[112px] lg:scroll-mt-20 py-14 sm:py-22 bg-[#F1EEE6] border-b border-[#E0DCD0]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10 sm:space-y-14">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-[#008746] font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>03 / Hồi II, đằng sau chuyến đi</span>
            </div>
            <h2 className="font-serif text-[28px] sm:text-5xl text-[#181F1C] font-medium leading-[1.15]">
              Đằng sau những chuyến đi là nghề, sức khỏe và việc cho đi
            </h2>
            <p className="text-sm sm:text-[15px] text-[#3B4640] leading-[1.82]">
              Người ở lại lâu với Vân thường không phải vì ảnh đẹp trên mạng. Họ ở lại vì hợp đồng của khách được giữ bền, vì cả đội cùng chạy, và vì những chuyến xe mang quà lên vùng cao.
            </p>
          </div>

          {/* Centerpiece Proof-of-Authority: Yên Tử Top 1 DRD+ with Living Stage Loop */}
          {chYenTu && (
            <article
              onClick={() => openChapter(chYenTu)}
              className="group bg-[#0A3622] text-[#FAF9F5] rounded-[6px] overflow-hidden shadow-[0_24px_60px_-28px_rgba(10,54,34,0.45)] cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-6 p-6 sm:p-9 lg:p-10 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#E8D3A6]/15 border border-[#E8D3A6]/40 text-[#E8D3A6] text-[10px] uppercase tracking-[0.18em] font-semibold">
                      Trụ cột 01: nghề và chữ tín
                    </span>
                    <h3 className="font-serif text-[26px] sm:text-4xl text-white font-medium leading-[1.2]">
                      {chYenTu.title}
                    </h3>
                    <blockquote className="border-l-2 border-[#E8D3A6] pl-4 font-serif italic text-[16px] sm:text-lg text-[#F4ECE0] leading-relaxed">
                      “{chYenTu.pullQuote}”
                    </blockquote>
                    <p className="text-[13.5px] sm:text-sm text-[#CCE0D5] leading-[1.82]">
                      {chYenTu.story[1]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-[#A9C2B5]">
                      Yên Tử, {chYenTu.photoCount} ảnh, phim trao cúp {chYenTu.video?.durationLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-semibold text-[#E8D3A6] group-hover:text-white transition-colors">
                      <span>Mở chương Yên Tử 2025</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="order-first lg:order-last lg:col-span-6 grid grid-cols-12 gap-2 sm:gap-2.5 p-2.5 sm:p-3 bg-[#072116] h-[300px] sm:h-[400px] lg:h-[510px]">
                  <div className="col-span-6 relative rounded-[4px] overflow-hidden bg-black h-full">
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
                    <span className="absolute bottom-2.5 left-2.5 right-2.5 px-2 py-1 rounded-[2px] bg-black/70 backdrop-blur-xs text-[9.5px] uppercase tracking-[0.14em] text-[#E8D3A6] text-center">
                      Sân khấu Top 1 DRD+
                    </span>
                  </div>
                  <div className="col-span-6 flex flex-col gap-2 sm:gap-2.5 h-full min-h-0">
                    <div className="flex-1 rounded-[4px] overflow-hidden bg-[#0E3624] min-h-0">
                      <img
                        src={chYenTu.photos[1].src}
                        alt={chYenTu.photos[1].caption}
                        loading="lazy"
                        className="w-full h-full object-cover object-[50%_20%] group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 rounded-[4px] overflow-hidden bg-[#0E3624] min-h-0">
                      <img
                        src={chYenTu.photos[6].src}
                        alt={chYenTu.photos[6].caption}
                        loading="lazy"
                        className="w-full h-full object-cover object-[50%_22%] group-hover:scale-[1.03] transition-transform duration-700"
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
              { ch: chPhanThiet, pillarTag: 'Trụ cột 02: kỷ luật và sức bền của đội' },
              { ch: chDakLak, pillarTag: 'Trụ cột 03: chia sẻ với cộng đồng' },
            ].map(
              ({ ch, pillarTag }) =>
                ch && (
                  <article
                    key={ch.slug}
                    onClick={() => openChapter(ch)}
                    className="group bg-white border border-[#DCD8CE] hover:border-[#0A3622]/50 rounded-[5px] overflow-hidden flex flex-col justify-between cursor-pointer transition-all"
                  >
                    <div>
                      <div className="grid grid-cols-12 gap-1.5 sm:gap-2 p-2 bg-[#FAF9F5] h-[235px] sm:h-[275px]">
                        <div className="col-span-8 h-full rounded-[4px] overflow-hidden bg-[#EAE7DF]">
                          <img
                            src={ch.photos[0].src}
                            alt={ch.photos[0].caption}
                            loading="lazy"
                            style={{ objectPosition: ch.heroObjectPosition }}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                          />
                        </div>
                        <div className="col-span-4 flex flex-col gap-1.5 sm:gap-2 h-full min-h-0">
                          <div className="flex-1 rounded-[4px] overflow-hidden bg-[#EAE7DF] min-h-0">
                            <img
                              src={ch.photos[1].src}
                              alt={ch.photos[1].caption}
                              loading="lazy"
                              className="w-full h-full object-cover object-[50%_26%]"
                            />
                          </div>
                          <div className="flex-1 rounded-[4px] overflow-hidden bg-[#EAE7DF] min-h-0">
                            <img
                              src={ch.photos[3].src}
                              alt={ch.photos[3].caption}
                              loading="lazy"
                              className="w-full h-full object-cover object-[50%_26%]"
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
                        {ch.photoCount} ảnh, phim {ch.video?.durationLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 uppercase tracking-[0.14em] text-[11px] font-semibold text-[#0A3622]">
                        <span>Xem chuyến này</span>
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
          className="scroll-mt-[112px] lg:scroll-mt-20 py-14 sm:py-22 bg-[#FAF9F5] border-b border-[#E4E1D8]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-9 sm:space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-end">
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-[#008746] font-semibold">
                  <Heart className="w-3.5 h-3.5" />
                  <span>04 / Hồi III, tổ ấm</span>
                </div>
                <h2 className="font-serif text-[28px] sm:text-5xl text-[#181F1C] font-medium leading-[1.15]">
                  {chFamily.title}
                </h2>
              </div>
              <div className="lg:col-span-5">
                <blockquote className="border-l-2 border-[#B8975A] pl-4 sm:pl-5 font-serif italic text-[17px] sm:text-xl text-[#181F1C] leading-[1.58]">
                  “{chFamily.pullQuote}”
                </blockquote>
              </div>
            </div>

            {/* Kinfolk Asymmetric Family Photo Mosaic (Curated Headroom & Focal Framing) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5">
              {/* Wide Lead Family Walk (Blue Tees — Centered on the 4 Smiling Faces) */}
              <figure
                onClick={() =>
                  setLightbox({
                    chapterTitle: chFamily.milestoneBadge,
                    photos: chFamily.photos,
                    index: 0,
                  })
                }
                className="lg:col-span-7 group relative rounded-[6px] overflow-hidden bg-[#EAE7DF] aspect-[4/3] lg:aspect-auto lg:min-h-[460px] cursor-zoom-in"
              >
                <img
                  src={chFamily.photos[0].src}
                  alt={chFamily.photos[0].caption}
                  loading="lazy"
                  className="w-full h-full object-cover object-[50%_76%] group-hover:scale-[1.02] transition-transform duration-700"
                />
                <span className="absolute top-3 right-3 p-2 rounded-full bg-black/45 text-white/90 opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
                <figcaption className="absolute inset-x-0 bottom-0 pt-14 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/55 to-transparent text-white">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#E8D3A6] font-semibold block">
                    Tổ ấm bốn thành viên
                  </span>
                  <span className="font-serif text-base sm:text-xl leading-snug block mt-0.5 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
                    {chFamily.photos[0].caption}
                  </span>
                </figcaption>
              </figure>

              {/* Right 2x2 Intimate Family Grid */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 sm:gap-5">
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
                      className="group relative rounded-[6px] overflow-hidden bg-[#EAE7DF] aspect-[4/5] cursor-zoom-in"
                    >
                      <img
                        src={ph.src}
                        alt={ph.caption}
                        loading="lazy"
                        className="w-full h-full object-cover object-[50%_18%] group-hover:scale-[1.04] transition-transform duration-700"
                      />
                      <span className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/45 text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3 h-3" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                        <span className="text-[11px] text-white leading-snug line-clamp-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
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
                  <span>Xem 19 ảnh tổ ấm</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* CHƯƠNG 05: PHÒNG CHIẾU 08 THƯỚC PHIM CHỌN LỌC (LUXURY SCREENING ROOM) */}
      {/* =================================================================== */}
      <section
        id="phong-chieu"
        className="scroll-mt-[112px] lg:scroll-mt-20 py-14 sm:py-20 bg-[#061C12] text-[#FAF9F5] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-7 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-[#E8D3A6] font-semibold">
                <Film className="w-3.5 h-3.5" />
                <span>05 / Phòng chiếu, {screeningReels.length} phim</span>
              </div>
              <h2 className="font-serif text-[28px] sm:text-4xl lg:text-[40px] text-white font-medium leading-[1.15]">
                Phim mở màn “Cứ Đi Rồi Sẽ Đến” và bảy phim của từng chuyến đi
              </h2>
              <p className="text-[13px] sm:text-sm text-[#BDD0C6] leading-relaxed">
                Mở đầu là phim thương hiệu gần một phút bằng chính giọng tự sự của Khánh Vân về hành trình từ bước ngoặt 2018 đến hôm nay. Tiếp theo là 7 phim quay thực tế giữ âm thanh gốc chọn lọc và nhạc nền riêng cho từng miền đất.
              </p>
            </div>
          </div>

          {/* Unified Interactive Cinema Screening Lounge (Fits cleanly on Desktop + Inline Theater on Mobile) */}
          {loungeReel && (() => {
            const currentLoungeIdx = Math.max(
              0,
              screeningReels.findIndex((r) => r.slug === loungeReel.slug)
            );
            const stepLounge = (dir: -1 | 1) => {
              const nextIdx =
                (currentLoungeIdx + dir + screeningReels.length) % screeningReels.length;
              const next = screeningReels[nextIdx];
              setLoungeReelSlug(next.slug);
              trackEvent('select_cinema_reel', { reel_slug: next.slug });
            };

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Cinema Player Stage (Inline on BOTH Mobile & Desktop — Zero Poster Text Collision) */}
                <div className="lg:col-span-5 bg-[#0A2B1C] border border-[#E8D3A6]/32 rounded-[8px] p-3.5 sm:p-4 space-y-3.5 shadow-2xl">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.16em] text-[#E8D3A6] font-semibold truncate">
                        {String(currentLoungeIdx + 1).padStart(2, '0')}/{String(screeningReels.length).padStart(2, '0')} • {loungeReel.badge}
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-[11px] text-[#B7D0C2] mt-0.5 truncate max-w-full">
                        <Volume2 className="w-3 h-3 text-[#34D399] shrink-0" />
                        <span className="truncate">{loungeReel.soundLabel}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => stepLounge(-1)}
                        aria-label="Phim trước"
                        className="w-8 h-8 inline-flex items-center justify-center rounded-[3px] border border-white/15 hover:border-[#E8D3A6]/60 bg-white/[0.04] text-white/90 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => stepLounge(1)}
                        aria-label="Phim tiếp theo"
                        className="w-8 h-8 inline-flex items-center justify-center rounded-[3px] border border-white/15 hover:border-[#E8D3A6]/60 bg-white/[0.04] text-white/90 transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-[5px] overflow-hidden bg-black aspect-[9/16] max-h-[54dvh] lg:max-h-[430px] mx-auto ring-1 ring-white/10">
                    <video
                      key={loungeReel.src}
                      src={loungeReel.src}
                      poster={loungeReel.poster}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-2 pt-0.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-[19px] sm:text-xl text-white leading-snug">
                        {loungeReel.title}
                      </h3>
                      <span className="text-[11px] font-mono text-[#E8D3A6] shrink-0">
                        {loungeReel.durationLabel}
                      </span>
                    </div>
                    <p className="text-xs text-[#C4D6CC] leading-relaxed">
                      {loungeReel.caption}
                    </p>
                    {loungeReel.chapter ? (
                      <button
                        type="button"
                        onClick={() => openChapter(loungeReel.chapter!)}
                        className="mt-1.5 w-full py-2.5 px-4 bg-[#E8D3A6] hover:bg-white active:scale-[0.99] text-[#061C12] text-xs uppercase tracking-[0.15em] font-bold rounded-[3px] inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>
                          Đọc bài và xem {loungeReel.chapter.photoCount} ảnh chương này
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <a
                        href="#ban-do-hanh-trinh"
                        className="mt-1.5 w-full py-2.5 px-4 bg-[#E8D3A6] hover:bg-white text-[#061C12] text-xs uppercase tracking-[0.15em] font-bold rounded-[3px] inline-flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>Xem bản đồ 11 chương</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Desktop 8-Film Program Playlist */}
                <div className="hidden lg:block lg:col-span-7 space-y-2">
                  {screeningReels.map((reel, idx) => {
                    const isCurrent = reel.slug === loungeReel.slug;
                    return (
                      <button
                        key={reel.slug}
                        type="button"
                        onClick={() => {
                          setLoungeReelSlug(reel.slug);
                          trackEvent('select_cinema_reel', { reel_slug: reel.slug });
                        }}
                        className={`w-full text-left p-3 rounded-[5px] border transition-all flex items-center gap-3.5 cursor-pointer ${
                          isCurrent
                            ? 'bg-[#0D3824] border-[#E8D3A6]/85 shadow-lg'
                            : reel.isSignature
                            ? 'bg-[#E8D3A6]/[0.07] border-[#E8D3A6]/30 hover:bg-[#E8D3A6]/[0.12] hover:border-[#E8D3A6]/60'
                            : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/25'
                        }`}
                      >
                        <div className="w-14 h-[68px] rounded-[3px] overflow-hidden bg-black shrink-0 relative">
                          <img
                            src={reel.poster}
                            alt={reel.badge}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Play
                              className={`w-3.5 h-3.5 fill-current ${
                                isCurrent || reel.isSignature ? 'text-[#E8D3A6]' : 'text-white/85'
                              }`}
                            />
                          </span>
                        </div>

                        <div className="flex-1 min-w-0 space-y-0.5">
                          <div className="flex items-center flex-wrap gap-2 text-[10px] uppercase tracking-[0.15em]">
                            <span className="text-[#E8D3A6] font-bold">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[#9AB5A7]">
                              {reel.countryTag} • {reel.year}
                            </span>
                            <span className="text-[#7E9C8D] hidden xl:inline">
                              • {reel.soundLabel}
                            </span>
                            {reel.isSignature && (
                              <span className="px-2 py-0.5 rounded-full bg-[#E8D3A6] text-[#061C12] text-[9px] font-bold">
                                Phim mở màn
                              </span>
                            )}
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full bg-[#E8D3A6]/20 text-[#E8D3A6] text-[9px] font-semibold">
                                Đang chiếu
                              </span>
                            )}
                          </div>
                          <div className="font-serif text-[17px] text-white leading-snug truncate">
                            {reel.title}
                          </div>
                          <p className="text-xs text-[#B5C9BE] line-clamp-1">
                            {reel.caption}
                          </p>
                        </div>

                        <span className="text-xs font-mono text-[#E8D3A6] shrink-0">
                          {reel.durationLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Mobile Compact Filmstrip Selector (Tap Any Film to Play Inline Immediately) */}
                <div className="lg:hidden space-y-2.5">
                  <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.16em] text-[#A9C2B5]">
                    <span>Chọn phim trong danh sách ({screeningReels.length})</span>
                    <span className="text-[#E8D3A6]">Vuốt ngang →</span>
                  </div>
                  <div className="flex gap-2.5 overflow-x-auto no-scrollbar scroll-fade-right snap-x pb-1 pr-8">
                    {screeningReels.map((reel, idx) => {
                      const isCurrent = reel.slug === loungeReel.slug;
                      return (
                        <button
                          key={reel.slug}
                          type="button"
                          onClick={() => {
                            setLoungeReelSlug(reel.slug);
                            trackEvent('select_cinema_reel', { reel_slug: reel.slug });
                          }}
                          className={`snap-start shrink-0 w-[108px] text-left rounded-[5px] overflow-hidden border transition-all cursor-pointer ${
                            isCurrent
                              ? 'border-[#E8D3A6] bg-[#0D3824] ring-1 ring-[#E8D3A6]/70'
                              : 'border-white/15 bg-white/[0.04]'
                          }`}
                        >
                          <div className="relative aspect-[4/5] bg-black overflow-hidden">
                            <img
                              src={reel.poster}
                              alt={reel.badge}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
                            <span
                              className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-[2px] text-[9px] font-bold ${
                                isCurrent
                                  ? 'bg-[#E8D3A6] text-[#061C12]'
                                  : 'bg-black/65 text-[#E8D3A6]'
                              }`}
                            >
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-[2px] bg-black/70 text-[9px] font-mono text-white">
                              {reel.durationLabel}
                            </span>
                          </div>
                          <div className="p-2">
                            <div className="text-[11px] font-medium text-white leading-tight line-clamp-2">
                              {reel.isSignature ? 'Cứ Đi Rồi Sẽ Đến' : reel.badge}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHƯƠNG 06: ĐỒNG HÀNH CÙNG KHÁNH VÂN (DUAL PATHWAYS & CONCIERGE) */}
      {/* =================================================================== */}
      <section
        id="ket-noi-dong-hanh"
        className="scroll-mt-[112px] lg:scroll-mt-20 py-14 sm:py-22 bg-[#0A3622] text-[#FAF9F5]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#E8D3A6] font-semibold block">
                  06 / Liên hệ Khánh Vân
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-white font-normal leading-[1.16]">
                  Muốn đi cùng Vân, mình bắt đầu bằng một cuộc trò chuyện
                </h2>
                <p className="text-sm text-[#C8D6CE] leading-[1.8]">
                  Dù bạn muốn chuẩn bị nền tài chính vững cho những chuyến đi sau của gia đình, hay đang tìm một môi trường làm nghề chuyên nghiệp để cùng đi các kỳ M-Star tiếp theo, Vân đều sẵn lòng lắng nghe.
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="p-4 sm:p-5 rounded-[4px] bg-white/[0.06] border border-white/15 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#E8D3A6] text-xs uppercase tracking-[0.16em] font-semibold">
                    <Heart className="w-4 h-4" />
                    <span>Dành cho khách hàng và gia đình</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    Lập quỹ dự phòng y tế, quỹ học vấn cho con và quỹ hưu trí, hoặc rà lại các hợp đồng đang có để cả nhà yên tâm đi những chuyến sau.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-[4px] bg-white/[0.06] border border-white/15 space-y-2">
                  <div className="flex items-center gap-2 text-[#E8D3A6] text-xs uppercase tracking-[0.16em] font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>Dành cho ứng viên quản lý GTF và cộng sự</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    Gia nhập Hệ thống Green Power (HCM69, SG168, SG169, MN111) với lộ trình kèm cặp thực chiến, để cùng xây đội ngũ và cùng có mặt trong các chuyến vinh danh M-Star, MDRT năm châu.
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
                    Khánh Vân đã nhận thông tin của bạn và sẽ liên hệ lại qua điện thoại hoặc Zalo sớm nhất có thể.
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
                      Để lại thông tin để Vân liên hệ
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
                    <span>Gửi lời nhắn</span>
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
      <footer className="bg-[#061C12] text-[#B9C8C0] py-8 sm:py-10 border-t border-white/10">
        <div className="max-w-7xl w-full min-w-0 mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A758] shrink-0" />
            <span>
              Khánh Vân và những chuyến đi, Hệ thống Green Power (Manulife Việt Nam)
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
      {/* SMART SINGLE-CORNER CONCIERGE DOCK (HIDDEN ON HERO, CONTACT & MODALS) */}
      {/* =================================================================== */}
      <AiAdvisorWidget
        onOpenVideo={(video) => setActiveVideo(video)}
        hidden={!showFloatingDock}
      />

      <aside
        aria-label="Nhắn Zalo trực tiếp Khánh Vân"
        className={`fixed bottom-[calc(4.05rem+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(4.65rem+env(safe-area-inset-bottom,0px))] right-3.5 sm:right-6 z-40 flex flex-col items-end pointer-events-auto select-none transition-all duration-300 ${
          showFloatingDock
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 pointer-events-none translate-y-3'
        }`}
      >
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat trực tiếp qua Zalo với Khánh Vân: ${PHONE_DISPLAY}`}
          className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-[#008746] hover:bg-[#00A758] text-white shadow-[0_8px_22px_rgba(10,54,34,0.34)] hover:-translate-y-0.5 transition-all duration-300 border border-white/80"
        >
          <span className="font-sans font-bold tracking-tight text-[11px] sm:text-[12px] text-white leading-none">
            Zalo
          </span>
        </a>
      </aside>

      {/* =================================================================== */}
      {/* MODAL 1: CURATED EDITORIAL CHAPTER READER + EXPANDABLE GALLERY */}
      {/* =================================================================== */}
      <AnimatePresence>
        {selectedChapter && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedChapter.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedChapterSlug(null)}
            className="fixed inset-0 z-50 bg-[#0B1410]/85 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-5"
          >
            <motion.div
              ref={modalScrollRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.24 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF9F5] w-full max-w-5xl h-[100dvh] sm:h-auto sm:max-h-[90vh] overflow-y-auto overscroll-contain rounded-none sm:rounded-[8px] border-0 sm:border sm:border-[#DCD8CE] shadow-2xl"
            >
              {/* Sticky Top Bar (Solid Cream Background + Safe-Area Ready on Mobile) */}
              <div className="sticky top-0 z-20 bg-[#FAF9F5] border-b border-[#E4E1D8] px-4 sm:px-7 pt-[max(0.75rem,env(safe-area-inset-top,0px))] pb-3 flex items-center justify-between gap-2 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="text-[10.5px] uppercase tracking-[0.15em] text-[#56605B] font-semibold truncate">
                  <span className="text-[#008746]">
                    Chương {selectedChapterIndex + 1}/{JOURNEY_CHAPTERS.length}
                  </span>
                  <span className="hidden sm:inline"> • {selectedChapter.milestoneBadge}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => navigateChapterModal(-1)}
                    aria-label="Chương trước"
                    className="w-9 h-9 inline-flex items-center justify-center border border-[#DCD8CE] hover:border-[#0A3622] rounded-[3px] text-[#181F1C] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateChapterModal(1)}
                    aria-label="Chương tiếp theo"
                    className="w-9 h-9 inline-flex items-center justify-center border border-[#DCD8CE] hover:border-[#0A3622] rounded-[3px] text-[#181F1C] cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedChapterSlug(null)}
                    className="h-9 inline-flex items-center gap-1 px-3.5 bg-[#181F1C] hover:bg-[#0A3622] text-white text-xs font-medium rounded-[3px] cursor-pointer"
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
                            Đi cùng
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
                        <span>Phim của chuyến đi</span>
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
                        Ảnh chuyến đi ({selectedChapter.photos.length} ảnh)
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#181F1C]">
                        Ảnh chụp tại {selectedChapter.countryTag}
                      </h3>
                    </div>
                    <span className="text-xs text-[#66706B]">
                      Bấm vào ảnh để xem toàn màn hình
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
                            className="w-full h-full object-cover object-[50%_24%] group-hover:scale-[1.03] transition-transform duration-700"
                          />
                          <span
                            aria-hidden="true"
                            className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/50 text-white/95 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
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
                          Xem thêm {selectedChapter.photos.length - 6} ảnh nữa
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
                        ? 'Làm nghề cùng Green Power'
                        : 'Lập kế hoạch tài chính cho gia đình'}
                    </span>
                    <p className="font-serif text-lg sm:text-xl text-white leading-snug">
                      {selectedChapter.ctaMode === 'career'
                        ? 'Bạn muốn làm quản lý chuyên nghiệp và cùng đi những chuyến M-Star tiếp theo?'
                        : 'Bạn muốn có một kế hoạch tài chính vững cho những chuyến đi dài hạn của gia đình?'}
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
      {/* MODAL 2: CINEMA REEL & SIGNATURE FILM VIEWER */}
      {/* =================================================================== */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeReel.title}
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
                  key={activeReel.src}
                  src={activeReel.src}
                  poster={activeReel.poster}
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
                      Phim {activeReelIndex + 1}/{screeningReels.length}:{' '}
                      {activeReel.year}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => navigateReelModal(-1)}
                        aria-label="Phim trước"
                        className="p-1.5 border border-[#DCD8CE] rounded-[2px] cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateReelModal(1)}
                        aria-label="Phim tiếp theo"
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
                    {activeReel.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A544F] leading-relaxed">
                    {activeReel.caption}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E4E1D8]">
                  {activeReel.chapter ? (
                    <button
                      type="button"
                      onClick={() => {
                        const slug = activeReel.chapter!.slug;
                        setActiveReelSlug(null);
                        setShowAllModalPhotos(false);
                        setSelectedChapterSlug(slug);
                      }}
                      className="w-full py-2.5 px-4 bg-[#0A3622] hover:bg-[#008746] text-white text-xs uppercase tracking-[0.15em] font-semibold rounded-[2px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>
                        Đọc bài và xem {activeReel.chapter.photoCount} ảnh của chương này
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveReelSlug(null);
                        setTimeout(() => {
                          const el = document.getElementById('ban-do-hanh-trinh');
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 80);
                      }}
                      className="w-full py-2.5 px-4 bg-[#0A3622] hover:bg-[#008746] text-white text-xs uppercase tracking-[0.15em] font-semibold rounded-[2px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Xem bản đồ 11 chương</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
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
            role="dialog"
            aria-modal="true"
            aria-label={activeVideo.title}
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
      {/* MODAL 4: FULL-SCREEN PHOTO LIGHTBOX (WITH MOBILE TOUCH SWIPE) */}
      {/* =================================================================== */}
      <AnimatePresence>
        {lightbox && lightbox.photos[lightbox.index] && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.photos[lightbox.index].caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            onTouchStart={(e) => {
              touchStartXRef.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (touchStartXRef.current === null) return;
              const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
              const delta = endX - touchStartXRef.current;
              touchStartXRef.current = null;
              if (Math.abs(delta) > 45) {
                navigateLightbox(delta < 0 ? 1 : -1);
              }
            }}
            className="fixed inset-0 z-[60] bg-black/94 backdrop-blur-sm flex items-center justify-center p-3 sm:p-8"
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
