import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  TrendingUp,
  Users,
  Compass,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  Building2,
  Crown,
  Gem,
  Heart,
  Globe2,
  Dumbbell,
  Lock,
  Send,
  Menu,
  X,
  ExternalLink,
  Quote,
  Briefcase,
  UserCheck,
  Star,
} from 'lucide-react';

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  target,
  suffix = '',
  prefix = '',
  duration = 2000,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

interface LightboxImage {
  src: string;
  title: string;
  subtitle: string;
}

export function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    currentRole: 'Cựu Banker / Chuyên gia Ngân hàng',
    goal: 'Phát triển Sự nghiệp Quản lý Cấp cao (F1 Leader)',
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Hành Trình Sự Nghiệp', href: '#hanh-trinh' },
    { label: 'Thành Tựu & Di Sản', href: '#thanh-tuu' },
    { label: 'Triết Lý Quản Trị', href: '#triet-ly' },
    { label: 'Điểm Tựa Gia Đình', href: '#diem-tua' },
    { label: 'Hợp Tác Quản Lý', href: '#hop-tac' },
  ];

  const authorityMetrics = [
    {
      icon: Building2,
      value: 8,
      suffix: '+ Năm',
      badge: 'ANZ BANK HERITAGE',
      title: '8+ Năm ANZ Bank',
      desc: 'Nền tảng chuyên môn Quản lý tài sản & Tín dụng quốc tế chuẩn mực toàn cầu.',
    },
    {
      icon: Crown,
      value: 1,
      prefix: 'Top ',
      suffix: ' ANZ',
      badge: 'NATIONAL CHAMPION 2017',
      title: 'Top 1 Toàn Quốc ANZ (2017)',
      desc: 'Vô địch doanh số mảng tín dụng & cho vay thế chấp mua nhà toàn hệ thống.',
    },
    {
      icon: Globe2,
      value: 1,
      prefix: 'Top ',
      suffix: ' Châu Á',
      badge: 'ASIA AWARDS 2021',
      title: 'Top 1 Toàn Khu Vực Châu Á',
      desc: 'Nhà Quản lý Xuất sắc nhất Châu Á (Asia Trusted Life Agent & Advisers Awards 2021).',
    },
    {
      icon: UserCheck,
      value: 64,
      suffix: ' Lãnh Đạo',
      badge: 'EXECUTIVE MENTORSHIP',
      title: '64 Quản Lý Cấp Cao',
      desc: 'Đội ngũ lãnh đạo kế cận được ươm mầm và chuyển giao năng lực thực chiến.',
    },
    {
      icon: Users,
      value: 500,
      suffix: '+ Nhân Sự',
      badge: 'ELITE ECOSYSTEM',
      title: '500+ Cộng Sự Tinh Hoa',
      desc: 'Hệ sinh thái nhân sự vận hành kỷ luật, đoàn kết và nhân văn.',
    },
    {
      icon: ShieldCheck,
      value: 1,
      prefix: 'Top ',
      suffix: ' Duy Trì',
      badge: 'CLIENT TRUST INDEX',
      title: 'Top 1 Tỷ Lệ Duy Trì',
      desc: 'Minh chứng cao nhất cho tư vấn chuẩn mực và sự tín nhiệm dài hạn trọn vẹn từ khách hàng.',
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0B1118] text-[#F8FAFC] relative selection:bg-[#00A758]/30 selection:text-[#E5C07B]">
      {/* Ambient Luxury Lighting Orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-48 -left-48 w-[520px] h-[520px] rounded-full bg-[#00A758]/10 blur-[140px]" />
        <div className="absolute top-[28%] -right-48 w-[480px] h-[480px] rounded-full bg-[#D4AF37]/8 blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[420px] rounded-full bg-[#003822]/25 blur-[160px]" />
      </div>

      {/* 1. HEADER / NAVIGATION BAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxury ${
          scrolled
            ? 'bg-[#0B1118]/90 backdrop-blur-xl border-b border-slate-800/80 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#0B1118]/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Signature */}
          <a href="#" className="group flex items-center gap-3.5 focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A758] via-[#003822] to-[#0B1118] p-[1px] shadow-emerald-glow">
              <div className="w-full h-full bg-[#0B1118]/90 rounded-[11px] flex items-center justify-center">
                <span className="font-serif font-bold text-lg tracking-wider text-gold-gradient">
                  KV
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.22em] text-[#F8FAFC] group-hover:text-[#E5C07B] transition-colors">
                KHANH VAN
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#D4AF37] font-medium">
                Executive Wealth &amp; Leadership
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors relative py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#00A758] to-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#hop-tac"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-[#F8FAFC] bg-gradient-to-r from-[#003822] via-[#00A758]/30 to-[#003822] border border-[#D4AF37]/50 hover:border-[#D4AF37] shadow-gold-glow hover:shadow-emerald-glow transition-all duration-300 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5C07B] group-hover:rotate-12 transition-transform" />
              <span>Kết Nối Cố Vấn</span>
              <ArrowUpRight className="w-4 h-4 text-[#00A758] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 text-slate-200 hover:text-[#E5C07B] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0F172A]/95 backdrop-blur-2xl border-b border-slate-800 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-slate-200 hover:text-[#E5C07B] py-2 border-b border-slate-800/60 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                  </a>
                ))}
                <a
                  href="#hop-tac"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 w-full py-3.5 rounded-xl text-center font-semibold text-sm bg-gradient-to-r from-[#00A758] to-[#003822] text-white border border-[#D4AF37]/40 shadow-emerald-glow"
                >
                  Kết Nối Cố Vấn C-Level
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION: KHẲNG ĐỊNH VỊ THẾ NGAY 3 GIÂY ĐẦU */}
      <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Authority Copy */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-6 sm:space-y-8"
            >
              {/* Luxury Top 1 Asia Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0F172A]/90 border border-[#D4AF37]/45 gold-border-glow">
                <Crown className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#E5C07B]">
                  GIÁM ĐỐC VÙNG XUẤT SẮC | TOP 1 TOÀN CHÂU Á
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.12]">
                  NGUYỄN THỊ{' '}
                  <span className="text-gold-gradient block sm:inline">KHÁNH VÂN</span>
                </h1>
                <p className="font-serif italic text-xl sm:text-2xl lg:text-[28px] text-slate-200/95 leading-snug pt-1">
                  Kiến Tạo Di Sản Tài Chính — Dẫn Dắt Thế Hệ Quản Lý Tinh Hoa
                </p>
              </div>

              {/* Executive Hook */}
              <div className="relative pl-5 sm:pl-6 border-l-2 border-[#00A758] bg-gradient-to-r from-[#003822]/25 to-transparent py-3 pr-4 rounded-r-2xl">
                <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-normal">
                  <span className="text-[#F8FAFC] font-medium">
                    “Đi chắc để đi xa — Kiến tạo tốc độ từ sự chuẩn mực.
                  </span>{' '}
                  Khởi đầu từ 8 năm quản trị tài sản ngân hàng quốc tế đến đỉnh cao lãnh đạo Châu Á,
                  chúng tôi kiến tạo điểm tựa niềm tin và phát triển con người bằng sự thấu cảm bền
                  vững.”
                </p>
              </div>

              {/* Credentials Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs sm:text-sm text-slate-300">
                  <Award className="w-4 h-4 text-[#00A758]" />
                  <span>Senior Regional Director (DRD+) — Manulife Vietnam</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs sm:text-sm text-slate-300">
                  <Building2 className="w-4 h-4 text-[#E5C07B]" />
                  <span>Cựu Quản Lý Tài Sản &amp; Tín Dụng ANZ Bank</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#hanh-trinh"
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl font-semibold text-sm sm:text-base bg-gradient-to-r from-[#00A758] to-[#007A40] text-white shadow-emerald-glow hover:brightness-110 transition-all duration-300 group"
                >
                  <span>Khám Phá Hành Trình</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#hop-tac"
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl font-semibold text-sm sm:text-base bg-slate-900/80 text-[#F8FAFC] border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-slate-800/80 transition-all duration-300"
                >
                  <Gem className="w-4 h-4 text-[#D4AF37]" />
                  <span>Cơ Hội Hợp Tác Quản Lý</span>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Hero Portrait Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              {/* Decorative Emerald & Gold Halo */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#00A758]/30 via-[#D4AF37]/20 to-[#003822]/40 rounded-3xl blur-2xl opacity-80" />

              <div
                onClick={() =>
                  setLightbox({
                    src: '/images/SuKien_ChiVanCungCEO_ChupAnhTiecToi.jpg',
                    title: 'Ngoại Giao Thượng Đỉnh — Tiệc Tối Cùng CEO Manulife',
                    subtitle: 'Phong thái lãnh đạo cấp cao và sự gắn kết chiến lược cùng Ban Điều Hành.',
                  })
                }
                className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-slate-700/60 via-slate-800/40 to-[#003822]/50 border border-[#D4AF37]/40 shadow-luxury-card cursor-pointer group overflow-hidden"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900">
                  <img
                    src="/images/SuKien_ChiVanCungCEO_ChupAnhTiecToi.jpg"
                    alt="Chị Nguyễn Thị Khánh Vân cùng CEO Manulife tại Tiệc tối Thượng đỉnh"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-luxury"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1118] via-[#0B1118]/25 to-transparent opacity-90" />

                  {/* Top Right Floating Pill */}
                  <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#0B1118]/80 backdrop-blur-md border border-[#00A758]/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00A758] animate-pulse" />
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-300">
                      C-Level Executive Dinner
                    </span>
                  </div>

                  {/* Bottom Caption Inside Portrait */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
                    <div className="p-4 rounded-2xl bg-[#0F172A]/85 backdrop-blur-md border border-slate-700/70 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-[0.16em] text-[#E5C07B] font-semibold">
                          Executive Leadership Circle
                        </span>
                        <Award className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <p className="font-serif text-base sm:text-lg font-semibold text-white">
                        Sánh bước cùng Ban Lãnh Đạo Cấp Cao Manulife
                      </p>
                      <p className="text-xs text-[#94A3B8]">
                        Khẳng định vị thế Giám đốc Vùng Cấp cao (DRD+) dẫn đầu về chuẩn mực quản trị và phát triển bền vững.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. DẢI BẢO CHỨNG SỐ LIỆU (PROOF OF AUTHORITY BAR) */}
      <section id="thanh-tuu" className="relative py-12 sm:py-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-6 sm:p-8 lg:p-10 bg-[#0F172A]/85 backdrop-blur-xl border border-slate-700/60 shadow-luxury-card relative overflow-hidden">
            {/* Subtle top gold line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-75" />

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-800/80 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00A758]">
                  PROOF OF AUTHORITY &amp; TRACK RECORD
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-1">
                  Bảo Chứng Năng Lực Qua Những Con Số Biết Nói
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md">
                Sự kết hợp hoàn hảo giữa kỷ luật Quản trị Rủi ro Ngân hàng Quốc tế và Nghệ thuật Lãnh đạo Con người Xuất sắc Châu Á.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorityMetrics.map((metric, idx) => {
                const IconComponent = metric.icon;
                return (
                  <motion.div
                    key={metric.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="glass-card rounded-2xl p-6 flex flex-col justify-between relative group overflow-hidden"
                  >
                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-[#D4AF37]/5 group-hover:bg-[#00A758]/15 transition-colors blur-xl" />

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-md bg-slate-800/90 text-[#E5C07B] border border-[#D4AF37]/25">
                          {metric.badge}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-[#003822]/60 border border-[#00A758]/40 flex items-center justify-center text-[#E5C07B] group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="font-serif text-3xl sm:text-4xl font-bold text-gold-gradient tracking-tight my-2">
                        <AnimatedCounter
                          target={metric.value}
                          prefix={metric.prefix}
                          suffix={metric.suffix}
                        />
                      </div>

                      <h3 className="text-base font-semibold text-[#F8FAFC] mt-1">
                        {metric.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-3 leading-relaxed">
                      {metric.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CÂU CHUYỆN SỰ NGHIỆP: BẢN LĨNH VƯỢT THỬ THÁCH ĐẾN ĐỈNH CAO (THE STORY - Z-PATTERN) */}
      <section id="hanh-trinh" className="relative py-20 lg:py-28 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#003822]/50 border border-[#00A758]/40 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              <Compass className="w-3.5 h-3.5" />
              <span>EXECUTIVE BIOGRAPHY &amp; LEGACY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8FAFC] leading-tight">
              Bản Lĩnh Vượt Thử Thách{' '}
              <span className="text-gold-gradient italic font-normal">Đến Đỉnh Cao Châu Á</span>
            </h2>
            <p className="text-base sm:text-lg text-[#94A3B8]">
              Hành trình gần hai thập kỷ rèn giũa từ môi trường tài chính quốc tế khắt khe đến vị thế người kiến tạo thế hệ lãnh đạo tinh hoa.
            </p>
          </div>

          {/* Z-Pattern Timeline */}
          <div className="space-y-20 lg:space-y-28 relative">
            {/* Vertical Connecting Line on Desktop */}
            <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-[1px] bg-gradient-to-b from-[#00A758] via-[#D4AF37]/60 to-[#00A758] -translate-x-1/2" />

            {/* HỒI 1: 2009 - 2017 */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative"
            >
              {/* Left Content */}
              <div className="lg:col-span-6 lg:pr-10 space-y-5">
                <div className="inline-flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#D4AF37]/15 text-[#E5C07B] border border-[#D4AF37]/40">
                    Hồi 1 • 2009 – 2017
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#94A3B8]">
                    The Power of Referral &amp; Integrity
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8FAFC] leading-snug">
                  Nền Tảng ANZ Bank &amp; Bài Học Để Đời Về Chữ “Tín”
                </h3>

                <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                  Ít ai biết rằng trước khi trở thành ngôi sao kinh doanh, Khánh Vân từng trải qua 3 tháng đầu tiên chuyển sang mảng Sales trong trạng thái{' '}
                  <span className="text-[#F8FAFC] font-medium">
                    không có nổi một khách hàng và đứng trước nguy cơ bị cắt mã số
                  </span>
                  .
                </p>

                <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                  Không chọn cách bán hàng bất chấp, chị nhìn lại tài sản lớn nhất của mình: sự tử tế, chuẩn xác và tận tâm suốt những năm làm Vận hành (Operations). Chính sự chân thành ấy đã khiến đồng nghiệp, đối tác tin yêu và chủ động giới thiệu khách hàng. Cú lội ngược dòng ngoạn mục đưa chị lên ngôi vị{' '}
                  <span className="text-[#E5C07B] font-semibold">
                    Top 1 Toàn Quốc ANZ năm 2017
                  </span>{' '}
                  mảng Tín dụng &amp; Thế chấp mua nhà.
                </p>

                <div className="p-4 rounded-2xl bg-[#0F172A]/90 border-l-4 border-[#D4AF37] text-xs sm:text-sm text-slate-300 italic">
                  “Uy tín từ những việc nhỏ nhất chính là đòn bẩy bền vững nhất. Khi bạn đủ chân thành và chuẩn mực, khách hàng và cộng sự sẽ tự tìm đến bạn.”
                </div>
              </div>

              {/* Center Node */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#0B1118] border-2 border-[#D4AF37] items-center justify-center shadow-gold-glow z-20">
                <span className="font-serif font-bold text-sm text-[#E5C07B]">01</span>
              </div>

              {/* Right Visual: Top 1 DRD 2024 */}
              <div className="lg:col-span-6 lg:pl-10">
                <div
                  onClick={() =>
                    setLightbox({
                      src: '/images/SanKhau_ChiVan_VinhDanhTop1DRDFYP2024.jpg',
                      title: 'Vinh Danh Top 1 Quản Lý Cấp Cao DRD+ (2024)',
                      subtitle: 'Dẫn đầu tỷ lệ hoàn thành chỉ tiêu với phong thái chuyên nghiệp và uy tín chuẩn ngân hàng quốc tế.',
                    })
                  }
                  className="glass-card rounded-3xl p-3 cursor-pointer group overflow-hidden"
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/11]">
                    <img
                      src="/images/SanKhau_ChiVan_VinhDanhTop1DRDFYP2024.jpg"
                      alt="Vinh danh Top 1 Quản lý cấp cao DRD+ Nguyễn Thị Vân"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1118] via-transparent to-transparent opacity-85" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E5C07B]">
                          Hall of Excellence • 2024
                        </span>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                          Top 1 Quản Lý Cấp Cao DRD+ Dẫn Đầu Toàn Hệ Thống
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs bg-[#00A758]/90 text-white font-medium shrink-0">
                        DRD. Nguyễn Thị Vân
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* HỒI 2: 2018 */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative"
            >
              {/* Left Visual on Desktop: Top 1 Retention 2025 */}
              <div className="lg:col-span-6 lg:pr-10 order-2 lg:order-1">
                <div
                  onClick={() =>
                    setLightbox({
                      src: '/images/SanKhau_ChiVan_NhanGiaiTop1DuyTriHopDong2025.jpg',
                      title: 'Top 1 DRD+ Dẫn Đầu Tỷ Lệ Duy Trì Hợp Đồng Năm 2 (2025)',
                      subtitle: 'Bảo chứng vàng cho chất lượng hoạch định tài chính chuẩn mực và niềm tin trọn vẹn của khách hàng.',
                    })
                  }
                  className="glass-card rounded-3xl p-3 cursor-pointer group overflow-hidden"
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/11]">
                    <img
                      src="/images/SanKhau_ChiVan_NhanGiaiTop1DuyTriHopDong2025.jpg"
                      alt="Chị Khánh Vân nhận giải Top 1 DRD+ Tỷ lệ duy trì hợp đồng 2025"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1118] via-transparent to-transparent opacity-85" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E5C07B]">
                          Standard of Trust • 2025
                        </span>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                          Top 1 DRD+ Dẫn Đầu Tỷ Lệ Duy Trì Hợp Đồng
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs bg-[#D4AF37]/90 text-[#0B1118] font-bold shrink-0">
                        Top 1 Quality
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Node */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#0B1118] border-2 border-[#00A758] items-center justify-center shadow-emerald-glow z-20">
                <span className="font-serif font-bold text-sm text-[#00A758]">02</span>
              </div>

              {/* Right Content on Desktop */}
              <div className="lg:col-span-6 lg:pl-10 space-y-5 order-1 lg:order-2">
                <div className="inline-flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#00A758]/20 text-emerald-300 border border-[#00A758]/40">
                    Hồi 2 • Bước Ngoặt 2018
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#94A3B8]">
                    Courage Beyond Comfort Zone
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8FAFC] leading-snug">
                  Bước Chuyển Mình Dũng Cảm Khỏi Vùng An Toàn Ngân Hàng Ngoại
                </h3>

                <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                  Đang ở đỉnh cao danh vọng tại ANZ Bank với mức thu nhập đáng mơ ước, năm 2018, Nguyễn Thị Khánh Vân đưa ra quyết định khiến nhiều người bất ngờ: bước ra khỏi chiếc lồng son ngân hàng quốc tế để kiến tạo sự nghiệp độc lập tại Manulife Việt Nam.
                </p>

                <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                  Mang theo tư duy quản trị tài sản chuẩn mực, chị tái định nghĩa nghề tư vấn: không chỉ là bảo vệ rủi ro, mà là{' '}
                  <span className="text-[#F8FAFC] font-medium">
                    Hoạch định Gia sản Toàn diện &amp; Chuyển giao Tri thức Quản trị
                  </span>
                  , mở ra cánh cửa tự do tài chính và làm chủ thời gian cho hàng trăm cộng sự.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-xs text-[#E5C07B] font-semibold block">Tư Duy Cốt Lõi</span>
                    <span className="text-sm text-white font-medium">Chuẩn mực Private Banking</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-xs text-[#00A758] font-semibold block">Cam Kết Khách Hàng</span>
                    <span className="text-sm text-white font-medium">Top 1 Duy Trì Dài Hạn</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* HỒI 3: 2018 - NAY */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative"
            >
              {/* Left Content */}
              <div className="lg:col-span-6 lg:pr-10 space-y-5">
                <div className="inline-flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#D4AF37]/15 text-[#E5C07B] border border-[#D4AF37]/40">
                    Hồi 3 • 2018 – Nay
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#94A3B8]">
                    Asian Leadership Legacy
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8FAFC] leading-snug">
                  Kiến Tạo Đế Chế Tinh Hoa &amp; Vươn Tầm Top 1 Châu Á
                </h3>

                <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                  Năm 2021 đánh dấu cột mốc lịch sử khi chị trở thành{' '}
                  <span className="text-[#E5C07B] font-semibold">
                    người duy nhất tại Việt Nam chiến thắng giải thưởng “Nhà Quản lý Xuất sắc nhất Châu Á”
                  </span>{' '}
                  (Asia Trusted Life Agent &amp; Advisers Awards), vượt qua hàng loạt ứng viên sừng sỏ trong khu vực.
                </p>

                <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                  Đến nay, trên cương vị Giám đốc Vùng Cấp cao (DRD+), chị đã kiến tạo nên một hệ sinh thái vững mạnh gồm hơn{' '}
                  <span className="text-[#F8FAFC] font-semibold">
                    500+ nhân sự tinh hoa và 64 Quản lý cấp cao
                  </span>
                  , liên tiếp giữ vững ngai vàng Top 1 DRD+ toàn quốc.
                </p>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  <span className="px-3 py-1.5 rounded-lg bg-[#003822]/70 border border-[#00A758]/40 text-xs font-medium text-emerald-200">
                    ✦ Asia Trusted Awards Winner 2021
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-[#D4AF37]/30 text-xs font-medium text-[#E5C07B]">
                    ✦ Top 1 DRD+ FYP 2024 &amp; 2025
                  </span>
                </div>
              </div>

              {/* Center Node */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#0B1118] border-2 border-[#D4AF37] items-center justify-center shadow-gold-glow z-20">
                <span className="font-serif font-bold text-sm text-[#E5C07B]">03</span>
              </div>

              {/* Right Visual: Top 1 FYP 2025 */}
              <div className="lg:col-span-6 lg:pl-10">
                <div
                  onClick={() =>
                    setLightbox({
                      src: '/images/SanKhau_ChiVan_NhanGiaiTop1FYP2025.jpg',
                      title: 'Đỉnh Cao Vinh Quang — Top 1 DRD+ Hoàn Thành Chỉ Tiêu Năm 2025',
                      subtitle: 'Khoảnh khắc giơ cao chiếc cúp vô địch trên sân khấu lớn cùng Ban Lãnh Đạo Cấp Cao.',
                    })
                  }
                  className="glass-card rounded-3xl p-3 cursor-pointer group overflow-hidden"
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/11]">
                    <img
                      src="/images/SanKhau_ChiVan_NhanGiaiTop1FYP2025.jpg"
                      alt="Chị Khánh Vân giơ cao cúp Top 1 DRD+ năm 2025"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1118] via-transparent to-transparent opacity-85" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E5C07B]">
                          Pinnacle of Leadership • 2025
                        </span>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                          Top 1 DRD+ Quản Lý Cấp Cao Dẫn Đầu Toàn Quốc
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs bg-[#00A758] text-white font-semibold shrink-0">
                        Champion
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. TRIẾT LÝ QUẢN TRỊ & 3 TRỤ CỘT HÀNH ĐỘNG */}
      <section
        id="triet-ly"
        className="relative py-20 lg:py-28 z-10 bg-gradient-to-b from-transparent via-[#0F172A]/70 to-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-[#D4AF37]/40 text-xs font-semibold uppercase tracking-[0.2em] text-[#E5C07B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXECUTIVE PHILOSOPHY &amp; PILLARS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8FAFC]">
              Triết Lý Quản Trị &amp;{' '}
              <span className="text-gold-gradient">3 Trụ Cột Hành Động</span>
            </h2>
            <p className="text-base sm:text-lg text-[#94A3B8]">
              Sự giao thoa giữa chuẩn mực hoạch định gia sản quốc tế và văn hóa lãnh đạo phụng sự, lấy con người làm gốc rễ của mọi sự thịnh vượng.
            </p>
          </div>

          {/* 3 Pillars 3D Glassmorphism Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Pillar 1 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="emerald-glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#00A758]/20 border border-[#00A758]/50 flex items-center justify-center text-[#00A758] shadow-emerald-glow">
                    <TrendingUp className="w-7 h-7" />
                  </div>
                  <span className="font-serif text-4xl font-bold text-slate-700/70">01</span>
                </div>

                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E5C07B]">
                  Wealth &amp; Risk Advisory
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#F8FAFC] mt-2 mb-4">
                  Hoạch Định Gia Sản Chuẩn Mực
                </h3>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                  Ứng dụng tư duy số liệu minh bạch và quy trình kiểm soát rủi ro khắt khe từ ngân hàng ngoại. Mỗi giải pháp được thiết kế may đo theo nguyên tắc{' '}
                  <span className="text-white font-medium">“Đúng – Đủ – Tối ưu”</span>, giúp khách hàng bảo toàn dòng tiền dài hạn và kiến tạo di sản vững chắc qua nhiều thế hệ.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-700/50 flex items-center gap-2 text-xs font-medium text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-[#00A758]" />
                <span>Chuẩn mực Private Banking &amp; Quản trị rủi ro</span>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden border-[#D4AF37]/40"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/50 flex items-center justify-center text-[#E5C07B] shadow-gold-glow">
                    <HeartHandshake className="w-7 h-7" />
                  </div>
                  <span className="font-serif text-4xl font-bold text-slate-700/70">02</span>
                </div>

                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E5C07B]">
                  Empathetic Leadership
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#F8FAFC] mt-2 mb-4">
                  Nghệ Thuật Lãnh Đạo Thấu Cảm
                </h3>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                  Lãnh đạo không phải là áp đặt một khuôn mẫu chung, mà là thấu hiểu sâu sắc từng cá nhân để kích hoạt đúng thế mạnh độc bản của họ. Trao quyền thực chất, kèm cặp sát sao và kiến tạo môi trường làm việc minh bạch,{' '}
                  <span className="text-white font-medium">không giới hạn trần phát triển</span>.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-700/50 flex items-center gap-2 text-xs font-medium text-[#E5C07B]">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Đánh thức tiềm năng độc bản của từng Quản lý</span>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="emerald-glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#00A758]/20 border border-[#00A758]/50 flex items-center justify-center text-[#00A758] shadow-emerald-glow">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <span className="font-serif text-4xl font-bold text-slate-700/70">03</span>
                </div>

                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E5C07B]">
                  Trust-Driven Growth
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#F8FAFC] mt-2 mb-4">
                  Mạng Lưới Giá Trị Từ Niềm Tin
                </h3>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                  Tuyệt đối nói không với kinh doanh chộp giật ngắn hạn. Toàn bộ hệ thống lấy sự tử tế, đạo đức nghề nghiệp và{' '}
                  <span className="text-white font-medium">tỷ lệ duy trì hợp đồng</span> làm thước đo danh dự cao nhất. Mỗi khách hàng hài lòng là một đại sứ thương hiệu trọn đời.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-700/50 flex items-center gap-2 text-xs font-medium text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-[#00A758]" />
                <span>Danh dự nghề nghiệp &amp; Tín nhiệm trọn đời</span>
              </div>
            </motion.div>
          </div>

          {/* Mentorship & Ecosystem Visual Showcase (2 Featured Images) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Image 1: Training Room */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              onClick={() =>
                setLightbox({
                  src: '/images/PhongDaoTao_ChiVan_ChiaSeTruyenLua.jpg',
                  title: 'Đào Tạo Thực Chiến & Truyền Lửa Cho Đội Ngũ Kế Cận',
                  subtitle: 'Trực tiếp đứng lớp chuyển giao tư duy quản trị tài sản và kỹ năng lãnh đạo chuẩn quốc tế.',
                })
              }
              className="lg:col-span-7 glass-card rounded-3xl p-3 cursor-pointer group flex flex-col"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] flex-1">
                <img
                  src="/images/PhongDaoTao_ChiVan_ChiaSeTruyenLua.jpg"
                  alt="Chị Khánh Vân đứng lớp đào tạo và chia sẻ truyền lửa"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1118] via-[#0B1118]/20 to-transparent opacity-90" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#00A758]/90 text-white">
                    Executive Coaching &amp; Training
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-2">
                    Trực Tiếp Đứng Lớp Đào Tạo &amp; Chuyển Giao Năng Lực Thực Chiến
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Không ngừng nâng tầm tri thức, bản lĩnh và tư duy chuyên nghiệp cho hơn 500+ nhân sự trong hệ thống.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Image 2: Celebrating SM Promotions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              onClick={() =>
                setLightbox({
                  src: '/images/SuKien_ChiVanCungDoiNgu_ChucMungThangCapSM.jpg',
                  title: 'Ươm Mầm Và Vinh Danh Thế Hệ Quản Lý Cấp Cao Mới',
                  subtitle: 'Niềm tự hào lớn nhất của người lãnh đạo là chứng kiến các cộng sự liên tục thăng cấp và tỏa sáng.',
                })
              }
              className="lg:col-span-5 glass-card rounded-3xl p-3 cursor-pointer group flex flex-col"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto flex-1 min-h-[280px]">
                <img
                  src="/images/SuKien_ChiVanCungDoiNgu_ChucMungThangCapSM.jpg"
                  alt="Chị Khánh Vân chúc mừng thăng cấp các Quản lý cấp cao SM"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1118] via-[#0B1118]/25 to-transparent opacity-90" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#D4AF37] text-[#0B1118]">
                    Leadership Succession
                  </span>
                  <h4 className="font-serif text-xl font-bold text-white mt-2">
                    Nâng Đỡ &amp; Chúc Mừng Cộng Sự Thăng Cấp Quản Lý
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    64 Quản lý cấp cao trưởng thành từ sự dẫn dắt tận tâm và lộ trình thăng tiến rõ ràng.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. ĐIỂM TỰA CUỘC SỐNG & SỰ CÂN BẰNG (WORK-LIFE HARMONY) */}
      <section id="diem-tua" className="relative py-20 lg:py-28 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Emotional Quote */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#003822]/60 border border-[#00A758]/40 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                <Heart className="w-3.5 h-3.5 text-[#E5C07B]" />
                <span>WORK-LIFE HARMONY &amp; LIFESTYLE</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8FAFC] leading-tight">
                Điểm Tựa Gia Đình &amp;{' '}
                <span className="text-gold-gradient italic font-normal">Khát Vọng Tự Do</span>
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Thành công bền vững nhất là khi sự nghiệp rực rỡ song hành cùng tổ ấm viên mãn, sức khỏe dẻo dai và những hành trình khám phá thế giới rộng lớn.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-[#1E293B]/80 via-[#0F172A]/90 to-[#003822]/40 border border-[#D4AF37]/40 shadow-luxury-card">
                <Quote className="w-10 h-10 text-[#D4AF37]/40 mb-3" />
                <blockquote className="font-serif italic text-lg sm:text-xl lg:text-2xl text-[#F8FAFC] leading-relaxed">
                  “Với tôi, đỉnh cao sự nghiệp không nằm ở những chiếc cúp vinh danh, mà là sự bình an khi trở về nhà bên chồng và hai con. Gia đình chính là ngọn lửa ấm, là động lực để tôi thấu hiểu sâu sắc ý nghĩa của sự bảo vệ và an tâm tài chính mà mình trao gửi đến mỗi gia đình khách hàng.”
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-[1px] w-10 bg-[#D4AF37]" />
                  <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#E5C07B] font-semibold">
                    Nguyễn Thị Khánh Vân
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Photo Grid: Family Warmth (2 Photos) + Lifestyle & Discipline (3 Photos) */}
          <div className="space-y-8">
            {/* Row 1: Family Sanctuary (2 Photos) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() =>
                  setLightbox({
                    src: '/images/GiaDinh_ChiVan_NgoiSofaPhongKhach.jpg',
                    title: 'Tổ Ấm Viên Mãn — Điểm Tựa Vững Chắc Phía Sau Thành Công',
                    subtitle: 'Khoảnh khắc sum vầy ấm áp bên người chồng tri kỷ và hai con tại tổ ấm hiện đại.',
                  })
                }
                className="lg:col-span-7 glass-card rounded-3xl p-3 cursor-pointer group"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10]">
                  <img
                    src="/images/GiaDinh_ChiVan_NgoiSofaPhongKhach.jpg"
                    alt="Gia đình chị Khánh Vân quây quần trên ghế sofa phòng khách"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1118] via-transparent to-transparent opacity-85" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E5C07B]">
                      Family Sanctuary
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                      Bình Yên Bên Tổ Ấm Nhỏ Đầy Ắp Tiếng Cười
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Sự đồng lòng của người bạn đời và nụ cười của các con là nguồn năng lượng vô giá.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onClick={() =>
                  setLightbox({
                    src: '/images/GiaDinh_ChiVan_AuYemConBenSanVuon.jpg',
                    title: 'Yêu Thương Ngọt Ngào Giữa Không Gian Xanh Mát',
                    subtitle: 'Trân trọng từng phút giây tuổi thơ của con nhờ sự chủ động về thời gian và tài chính.',
                  })
                }
                className="lg:col-span-5 glass-card rounded-3xl p-3 cursor-pointer group"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-full min-h-[320px]">
                  <img
                    src="/images/GiaDinh_ChiVan_AuYemConBenSanVuon.jpg"
                    alt="Gia đình chị Khánh Vân âu yếm con bên sân vườn"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1118] via-transparent to-transparent opacity-85" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-300">
                      Unconditional Love
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white mt-0.5">
                      Trọn Vẹn Từng Khoảnh Khắc Làm Mẹ
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Làm chủ sự nghiệp để không bỏ lỡ bất kỳ cột mốc trưởng thành quý giá nào của các con.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Row 2: Lifestyle, Discipline & Global Vision (3 Photos) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Hot Air Balloon Travel */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                onClick={() =>
                  setLightbox({
                    src: '/images/DuLich_ChiVan_BayKhinhKhiCauBinhMinh.jpg',
                    title: 'Tầm Nhìn Rộng Mở — Đón Bình Minh Trên Khinh Khí Cầu',
                    subtitle: 'Trải nghiệm thế giới đẳng cấp, nuôi dưỡng tâm hồn tự do và tầm nhìn quốc tế.',
                  })
                }
                className="glass-card rounded-3xl p-3 cursor-pointer group"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                  <img
                    src="/images/DuLich_ChiVan_BayKhinhKhiCauBinhMinh.jpg"
                    alt="Chị Khánh Vân đón bình minh trên khinh khí cầu"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1118] via-[#0B1118]/20 to-transparent opacity-90" />
                  <div className="absolute top-4 left-4 p-2 rounded-xl bg-[#0B1118]/75 backdrop-blur-md border border-[#D4AF37]/40 text-[#E5C07B]">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#E5C07B]">
                      Global Horizon
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white mt-0.5">
                      Tầm Nhìn Rộng Mở &amp; Tự Do Trải Nghiệm Thế Giới
                    </h4>
                  </div>
                </div>
              </motion.div>

              {/* Gym Discipline */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                onClick={() =>
                  setLightbox({
                    src: '/images/DoiThuong_ChiVan_SelfiePhongTapGym.jpg',
                    title: 'Kỷ Luật Bản Thân — Rèn Luyện Thể Lực Bền Bỉ',
                    subtitle: 'Năng lượng tích cực và sự dẻo dai của người lãnh đạo bắt nguồn từ thói quen rèn luyện thể thao mỗi ngày.',
                  })
                }
                className="glass-card rounded-3xl p-3 cursor-pointer group"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                  <img
                    src="/images/DoiThuong_ChiVan_SelfiePhongTapGym.jpg"
                    alt="Chị Khánh Vân rèn luyện thể thao tại phòng tập gym"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1118] via-[#0B1118]/20 to-transparent opacity-90" />
                  <div className="absolute top-4 left-4 p-2 rounded-xl bg-[#0B1118]/75 backdrop-blur-md border border-[#00A758]/40 text-[#00A758]">
                    <Dumbbell className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
                      Self-Discipline
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white mt-0.5">
                      Kỷ Luật Thép Từ Sự Rèn Luyện Thể Chất Mỗi Ngày
                    </h4>
                  </div>
                </div>
              </motion.div>

              {/* Traveling with Husband */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                onClick={() =>
                  setLightbox({
                    src: '/images/DuLich_ChiVanCungChong_ChupAnhBenCangBien.jpg',
                    title: 'Hạnh Phúc Đồng Hành — Sánh Bước Trên Mọi Hành Trình',
                    subtitle: 'Tận hưởng những chuyến du lịch quốc tế ngọt ngào cùng người bạn đời tri kỷ.',
                  })
                }
                className="glass-card rounded-3xl p-3 cursor-pointer group"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                  <img
                    src="/images/DuLich_ChiVanCungChong_ChupAnhBenCangBien.jpg"
                    alt="Chị Khánh Vân cùng chồng du lịch bên cảng biển quốc tế"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1118] via-[#0B1118]/20 to-transparent opacity-90" />
                  <div className="absolute top-4 left-4 p-2 rounded-xl bg-[#0B1118]/75 backdrop-blur-md border border-[#D4AF37]/40 text-[#E5C07B]">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#E5C07B]">
                      Life Partnership
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white mt-0.5">
                      Đồng Hành Bền Vững Cùng Người Bạn Đời Tri Kỷ
                    </h4>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CHƯƠNG TRÌNH ĐỒNG HÀNH: ƯƠM MẦM LÃNH ĐẠO TÀI CHÍNH F1 (TALENT ACQUISITION) */}
      <section id="hop-tac" className="relative py-20 lg:py-28 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] p-6 sm:p-10 lg:p-14 bg-gradient-to-br from-[#0F172A] via-[#131F33] to-[#002818] border border-[#D4AF37]/40 shadow-luxury-card relative overflow-hidden">
            {/* Decorative Radial Glow */}
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#00A758]/15 blur-[120px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Program Positioning & Culture Photo */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-semibold uppercase tracking-[0.18em] text-[#E5C07B]">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>EXECUTIVE TALENT ACQUISITION • F1 LEADERSHIP</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8FAFC] leading-tight">
                  Chương Trình Phát Triển Nhà Quản Lý &amp;{' '}
                  <span className="text-gold-gradient">Hoạch Định Tài Chính Chuyên Nghiệp</span>
                </h2>

                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                  Chúng tôi không tuyển dụng đại lý bán lẻ đại trà. Đây là lời mời hợp tác chiến lược dành riêng cho các{' '}
                  <span className="text-[#F8FAFC] font-medium">
                    Cựu Banker, Cấp Quản lý Kinh doanh, Chuyên gia Tài chính và Chủ Doanh nghiệp
                  </span>{' '}
                  khao khát xây dựng doanh nghiệp tài chính của riêng mình trong lòng một tập đoàn đa quốc gia.
                </p>

                {/* Exclusive Privileges */}
                <div className="space-y-3.5 pt-2">
                  {[
                    {
                      title: 'Mentorship 1-1 Cùng Top 1 Châu Á',
                      desc: 'Được trực tiếp chị Nguyễn Thị Khánh Vân hoạch định lộ trình thăng tiến và chuyển giao bí quyết quản trị hệ thống lớn.',
                    },
                    {
                      title: 'Hệ Sinh Thái Số Hóa & Quy Trình Chuẩn Ngân Hàng',
                      desc: 'Tiếp cận bộ công cụ quản lý hiệu suất hiện đại, quy trình đào tạo bài bản giúp rút ngắn thời gian xây dựng đội ngũ.',
                    },
                    {
                      title: 'Văn Hóa Đội Ngũ Gắn Kết, Thấu Cảm & Tử Tế',
                      desc: 'Làm việc cùng những cộng sự tinh hoa, tôn trọng giá trị cá nhân và đồng hành chân thành cả trong công việc lẫn cuộc sống.',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="p-4 rounded-2xl bg-[#0B1118]/65 border border-slate-700/70 flex items-start gap-3.5"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#00A758]/20 border border-[#00A758] flex items-center justify-center shrink-0 mt-0.5">
                        <Star className="w-3.5 h-3.5 text-[#00A758]" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-white">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Team Culture Photo: DoiThuong_ChiVanCungDoiNgu_CaPheViaHe.jpg */}
                <div
                  onClick={() =>
                    setLightbox({
                      src: '/images/DoiThuong_ChiVanCungDoiNgu_CaPheViaHe.jpg',
                      title: 'Văn Hóa Gắn Kết Đời Thường — Sếp Và Cộng Sự Như Người Một Nhà',
                      subtitle: 'Không khoảng cách quyền lực, luôn lắng nghe và đồng hành cùng anh chị em quản lý từ những buổi cà phê sáng giản dị.',
                    })
                  }
                  className="glass-card rounded-2xl p-2.5 cursor-pointer group"
                >
                  <div className="relative rounded-xl overflow-hidden aspect-[16/9]">
                    <img
                      src="/images/DoiThuong_ChiVanCungDoiNgu_CaPheViaHe.jpg"
                      alt="Chị Khánh Vân gần gũi cà phê sáng cùng cộng sự đội ngũ"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1118] via-transparent to-transparent opacity-85" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#E5C07B] font-semibold">
                          Authentic Team Culture
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-white">
                          Văn hóa lãnh đạo gần gũi, chân thành và gắn kết từ những điều bình dị nhất
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Confidential Executive Application Form */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl p-6 sm:p-8 lg:p-10 bg-[#0B1118]/90 backdrop-blur-xl border border-slate-700/80 shadow-2xl">
                  <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-800">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#00A758]">
                        PRIVATE &amp; CONFIDENTIAL
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white mt-1">
                        Đăng Ký Phiên Cố Vấn 1:1 Bảo Mật
                      </h3>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-[#003822]/70 border border-[#00A758]/40 flex items-center justify-center text-[#E5C07B]">
                      <Lock className="w-5 h-5" />
                    </div>
                  </div>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 px-4 text-center space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#00A758]/20 border border-[#00A758] mx-auto flex items-center justify-center text-[#00A758] shadow-emerald-glow">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="font-serif text-2xl font-bold text-white">
                        Thông Tin Đã Được Ghi Nhận Bảo Mật
                      </h4>
                      <p className="text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                        Cảm ơn <span className="text-white font-semibold">{formData.fullName}</span>. Ban Trợ lý Cấp cao của chị Nguyễn Thị Khánh Vân sẽ liên hệ trực tiếp qua số điện thoại{' '}
                        <span className="text-[#E5C07B] font-semibold">{formData.phone}</span> trong vòng 24 giờ làm việc để sắp xếp lịch hẹn riêng.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-4 px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                      >
                        Gửi Lại Thông Tin Khác
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                          Họ và Tên <span className="text-[#00A758]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: Nguyễn Minh Tuấn"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl bg-[#0F172A] border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00A758] focus:ring-1 focus:ring-[#00A758] transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                            Số Điện Thoại Liên Hệ <span className="text-[#00A758]">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="090x xxx xxx"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl bg-[#0F172A] border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00A758] focus:ring-1 focus:ring-[#00A758] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                            Địa Chỉ Email <span className="text-[#00A758]">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl bg-[#0F172A] border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00A758] focus:ring-1 focus:ring-[#00A758] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                          Chức Vụ / Lĩnh Vực Hiện Tại
                        </label>
                        <select
                          value={formData.currentRole}
                          onChange={(e) =>
                            setFormData({ ...formData, currentRole: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl bg-[#0F172A] border border-slate-700/80 text-white text-sm focus:outline-none focus:border-[#00A758] focus:ring-1 focus:ring-[#00A758] transition-all"
                        >
                          <option value="Cựu Banker / Chuyên gia Ngân hàng">
                            Cựu Banker / Quản lý Quan hệ Khách hàng Ngân hàng
                          </option>
                          <option value="Quản lý Kinh doanh / Giám đốc Khối">
                            Quản lý Kinh doanh / Giám đốc Khối (Bất động sản, Đầu tư, Dịch vụ...)
                          </option>
                          <option value="Chủ Doanh nghiệp / Founder">
                            Chủ Doanh nghiệp / Nhà sáng lập (Founder)
                          </option>
                          <option value="Khách hàng Cá nhân & Gia đình (Hoạch định Gia sản)">
                            Khách hàng Cá nhân &amp; Gia đình (Tư vấn Hoạch định Gia sản)
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                          Mục Tiêu Phát Triển &amp; Kết Nối
                        </label>
                        <select
                          value={formData.goal}
                          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl bg-[#0F172A] border border-slate-700/80 text-white text-sm focus:outline-none focus:border-[#00A758] focus:ring-1 focus:ring-[#00A758] transition-all"
                        >
                          <option value="Phát triển Sự nghiệp Quản lý Cấp cao (F1 Leader)">
                            Ứng tuyển Chương trình Ươm mầm Lãnh đạo Tài chính F1
                          </option>
                          <option value="Tư vấn Hoạch định Gia sản & Bảo toàn Dòng tiền">
                            Cố vấn Hoạch định Gia sản &amp; Quản trị Rủi ro Gia đình
                          </option>
                          <option value="Hợp tác Chiến lược & Diễn giả">
                            Mời Diễn giả Đào tạo / Hợp tác Chiến lược Doanh nghiệp
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                          Chia Sẻ Thêm Về Định Hướng Của Bạn (Tùy chọn)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Chia sẻ ngắn gọn về kinh nghiệm hiện tại hoặc mong muốn của bạn khi kết nối cùng chị Khánh Vân..."
                          value={formData.note}
                          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00A758] focus:ring-1 focus:ring-[#00A758] transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 px-6 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-[#00A758] via-[#00C468] to-[#008545] shadow-emerald-glow hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2.5 group"
                      >
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        <span>Gửi Yêu Cầu Kết Nối Bảo Mật</span>
                      </button>

                      <p className="text-[11px] text-center text-[#94A3B8] flex items-center justify-center gap-1.5 pt-1">
                        <Lock className="w-3 h-3 text-[#D4AF37]" />
                        <span>
                          Mọi thông tin cá nhân và vị thế công việc hiện tại được cam kết bảo mật tuyệt đối 100%.
                        </span>
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER (CHÂN TRANG & CỔNG VẬN HÀNH NỘI BỘ) */}
      <footer className="relative z-10 bg-[#070B10] border-t border-slate-800/80 pt-14 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-slate-800/80">
            {/* Brand Identity */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00A758] to-[#003822] flex items-center justify-center text-white font-serif font-bold">
                  KV
                </div>
                <div>
                  <span className="font-serif text-lg font-bold tracking-[0.2em] text-white block">
                    NGUYỄN THỊ KHÁNH VÂN
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#D4AF37]">
                    Senior Regional Director (DRD+) • Top 1 Asia
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md leading-relaxed">
                Nền tảng Thương hiệu Cá nhân &amp; Phát triển Thế hệ Lãnh đạo Tài chính Tinh hoa. Kiến tạo chuẩn mực hoạch định gia sản bền vững và văn hóa quản trị thấu cảm.
              </p>
            </div>

            {/* Quick Navigation */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#E5C07B]">
                Chuyên Mục Chính
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#94A3B8]">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Executive Connect */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#E5C07B]">
                Kết Nối Mạng Xã Hội
              </h4>
              <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors"
                >
                  <span>Facebook Profile Chính Thức</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#00A758]" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors"
                >
                  <span>LinkedIn Executive Network</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar with Copyright & Internal EOD Gateway */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
            <p>© 2026 Nguyen Thi Khanh Van. All Rights Reserved. khanhvanfinance.com</p>

            {/* Subtle Internal Gateway Link on Right */}
            <a
              href="https://eod.khanhvanfinance.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-[#00A758]/50 text-slate-400 hover:text-emerald-300 transition-all text-[11px] tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A758]" />
              <span>[Cổng Báo Cáo Nội Bộ EOD]</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>

      {/* HIGH-RESOLUTION IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-[#0F172A] border border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="relative bg-black flex items-center justify-center max-h-[75vh] overflow-hidden">
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 text-white hover:text-[#E5C07B] border border-slate-700 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-xl font-bold text-white">{lightbox.title}</h4>
                  <p className="text-sm text-[#94A3B8] mt-1">{lightbox.subtitle}</p>
                </div>
                <span className="text-xs uppercase tracking-widest text-[#E5C07B] font-semibold shrink-0">
                  khanhvanfinance.com
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
