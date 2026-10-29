import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Lock,
  Menu,
  X,
  ExternalLink,
  Send,
  ShieldCheck,
  TrendingUp,
  HeartHandshake,
} from 'lucide-react';

interface LightboxImage {
  src: string;
  category: string;
  title: string;
  subtitle: string;
}

export function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    currentRole: 'Cựu Banker / Quản lý Quan hệ Khách hàng Ngân hàng',
    goal: 'Ứng tuyển Chương trình Ươm mầm Lãnh đạo Tài chính F1',
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Di Sản & Bảo Chứng', href: '#thanh-tuu' },
    { label: 'Hành Trình Sự Nghiệp', href: '#hanh-trinh' },
    { label: 'Triết Lý Quản Trị', href: '#triet-ly' },
    { label: 'Điểm Tựa Cuộc Sống', href: '#diem-tua' },
    { label: 'Hợp Tác Quản Lý', href: '#hop-tac' },
  ];

  const authorityMetrics = [
    {
      figure: '8+ Năm',
      label: 'ANZ Bank Quốc Tế',
      desc: 'Nền tảng chuyên môn Quản lý tài sản & Tín dụng chuẩn mực toàn cầu.',
    },
    {
      figure: 'Top 1',
      label: 'Toàn Quốc ANZ (2017)',
      desc: 'Vô địch doanh số mảng tín dụng & cho vay thế chấp mua nhà toàn hệ thống.',
    },
    {
      figure: 'Top 1',
      label: 'Toàn Khu Vực Châu Á',
      desc: 'Nhà Quản lý Xuất sắc nhất Châu Á (Asia Trusted Life Agent & Advisers Awards 2021).',
    },
    {
      figure: '64',
      label: 'Quản Lý Cấp Cao',
      desc: 'Đội ngũ lãnh đạo kế cận được ươm mầm và chuyển giao năng lực thực chiến.',
    },
    {
      figure: '500+',
      label: 'Cộng Sự Tinh Hoa',
      desc: 'Hệ sinh thái nhân sự vận hành kỷ luật, đoàn kết và nhân văn.',
    },
    {
      figure: 'Top 1',
      label: 'Tỷ Lệ Duy Trì Hợp Đồng',
      desc: 'Minh chứng cao nhất cho tư vấn chuẩn mực và sự tín nhiệm dài hạn từ khách hàng.',
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#080C0A] text-[#F5F5F0] selection:bg-[#C9A96E]/25 selection:text-[#E2C792]">
      {/* 1. HEADER (NAVIGATION BAR) */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#080C0A]/92 backdrop-blur-md border-b border-[#C9A96E]/20 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Brand Signature */}
          <a href="#" className="group flex flex-col shrink-0 whitespace-nowrap focus:outline-none">
            <span className="font-display text-lg sm:text-xl font-semibold tracking-[0.26em] text-[#F5F5F0] group-hover:text-[#E2C792] transition-colors">
              KHANH VAN
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#C9A96E] mt-0.5">
              Executive Wealth &amp; Leadership
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-[12px] xl:text-[13px] tracking-[0.08em] uppercase text-[#A3ADA8] hover:text-[#F5F5F0] transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center shrink-0">
            <a
              href="#hop-tac"
              className="whitespace-nowrap inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium text-[#F5F5F0] border border-[#C9A96E]/60 hover:border-[#C9A96E] hover:bg-[#C9A96E]/10 transition-all duration-300"
            >
              <span>Kết Nối Cố Vấn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#F5F5F0] hover:text-[#C9A96E] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0D1411] border-b border-[#C9A96E]/25 overflow-hidden"
            >
              <div className="px-6 py-7 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm uppercase tracking-[0.14em] text-[#D0D7D3] hover:text-[#C9A96E] py-2 border-b border-white/5"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#hop-tac"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-3 py-3.5 text-center text-xs uppercase tracking-[0.18em] font-semibold bg-[#00A758] text-white"
                >
                  Kết Nối Cố Vấn
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION: EDITORIAL PRIVATE BANKING AUTHORITY */}
      <section className="relative pt-32 sm:pt-36 lg:pt-44 pb-20 lg:pb-28 border-b border-[#C9A96E]/15">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Executive Typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-8"
            >
              {/* Subtle Upper Overline */}
              <div className="inline-flex items-center gap-3 border-l-2 border-[#C9A96E] pl-3.5">
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#C9A96E]">
                  GIÁM ĐỐC VÙNG XUẤT SẮC &bull; TOP 1 TOÀN CHÂU Á
                </span>
              </div>

              {/* Main Headline — Balanced so no orphan words drop */}
              <div className="space-y-3">
                <h1 className="font-display text-4xl sm:text-5xl xl:text-[54px] font-semibold tracking-tight text-[#F5F5F0] leading-[1.14]">
                  NGUYỄN THỊ <span className="text-champagne-gradient">KHÁNH VÂN</span>
                </h1>
                <p className="font-serif italic text-2xl sm:text-[28px] text-[#D5DDD8] font-normal leading-[1.35]">
                  Kiến Tạo Di Sản Tài Chính —{' '}
                  <span className="inline-block">Dẫn Dắt Thế Hệ Quản Lý Tinh Hoa</span>
                </p>
              </div>

              {/* Executive Hook */}
              <blockquote className="text-base sm:text-[17px] text-[#A3ADA8] leading-[1.8] max-w-2xl font-light border-l border-white/15 pl-6">
                “Đi chắc để đi xa — Kiến tạo tốc độ từ sự chuẩn mực. Khởi đầu từ 8 năm quản trị tài sản ngân hàng quốc tế đến đỉnh cao lãnh đạo Châu Á, chúng tôi kiến tạo điểm tựa niềm tin và phát triển con người bằng sự thấu cảm bền vững.”
              </blockquote>

              {/* Executive Credentials Row */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl border-t border-white/10">
                <div className="pt-4">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#00A758] font-semibold block">
                    Vị Thế Hiện Tại
                  </span>
                  <span className="text-sm text-[#F5F5F0] font-medium mt-1 block">
                    Senior Regional Director (DRD+) — Manulife Vietnam
                  </span>
                </div>
                <div className="pt-4">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#C9A96E] font-semibold block">
                    Nền Tảng Chuyên Môn
                  </span>
                  <span className="text-sm text-[#F5F5F0] font-medium mt-1 block">
                    Cựu Quản Lý Tài Sản &amp; Tín Dụng ANZ Bank
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#hanh-trinh"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs sm:text-[13px] uppercase tracking-[0.18em] font-semibold bg-[#00A758] hover:bg-[#008F4B] text-white transition-all duration-300"
                >
                  <span>Khám Phá Hành Trình</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="#hop-tac"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs sm:text-[13px] uppercase tracking-[0.18em] font-medium text-[#F5F5F0] border border-[#C9A96E]/50 hover:border-[#C9A96E] hover:bg-[#C9A96E]/10 transition-all duration-300"
                >
                  <span>Cơ Hội Hợp Tác Quản Lý</span>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Editorial Portrait Frame (Uncovered, Properly Cropped) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <figure
                onClick={() =>
                  setLightbox({
                    src: '/images/SuKien_ChiVanCungCEO_ChupAnhTiecToi.jpg',
                    category: 'EXECUTIVE LEADERSHIP CIRCLE',
                    title: 'Tiệc Tối Thượng Đỉnh Cùng CEO Manulife',
                    subtitle:
                      'Chị Nguyễn Thị Khánh Vân sánh bước cùng Ban Lãnh Đạo Cấp Cao Manulife trong sự kiện ngoại giao chiến lược.',
                  })
                }
                className="group cursor-pointer"
              >
                {/* Architectural Gold Frame */}
                <div className="p-2.5 bg-[#0D1411] border border-[#C9A96E]/35">
                  <div className="relative overflow-hidden aspect-[4/5] bg-[#080C0A]">
                    <img
                      src="/images/SuKien_ChiVanCungCEO_ChupAnhTiecToi.jpg"
                      alt="Chị Nguyễn Thị Khánh Vân cùng CEO Manulife tại Tiệc tối Thượng đỉnh"
                      className="w-full h-full object-cover object-[50%_82%] group-hover:scale-[1.03] transition-transform duration-700 ease-luxury"
                    />
                  </div>
                </div>

                {/* Clean Editorial Caption Below Image (Never covering faces/bodies) */}
                <figcaption className="mt-4 flex items-start justify-between gap-4 border-l border-[#C9A96E]/50 pl-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#C9A96E] block">
                      EXECUTIVE LEADERSHIP CIRCLE
                    </span>
                    <p className="font-serif text-lg text-[#F5F5F0] mt-0.5">
                      Sánh bước cùng Tổng Giám Đốc (CEO) Manulife tại Tiệc Tối Thượng Đỉnh
                    </p>
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-[#A3ADA8] shrink-0 pt-1 group-hover:text-[#C9A96E] transition-colors">
                    Xem ảnh &rarr;
                  </span>
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. DẢI BẢO CHỨNG SỐ LIỆU (ARCHITECTURAL PROOF OF AUTHORITY STRIP) */}
      <section id="thanh-tuu" className="relative py-20 lg:py-24 bg-[#0B110E] border-b border-[#C9A96E]/15">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#00A758] block mb-2">
                TRACK RECORD &amp; CREDENTIALS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F5F5F0]">
                Bảo Chứng Năng Lực Qua Những Cột Mốc Danh Giá
              </h2>
            </div>
            <p className="text-sm text-[#A3ADA8] max-w-md leading-relaxed">
              Sự giao thoa giữa kỷ luật Quản trị Rủi ro Ngân hàng Quốc tế và Nghệ thuật Lãnh đạo Con người Xuất sắc nhất Châu Á.
            </p>
          </div>

          {/* Hairline Architectural Grid (No Box-in-Box Clutter) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#C9A96E]/20">
            {authorityMetrics.map((item, idx) => (
              <div
                key={idx}
                className="p-8 lg:p-10 border-r border-b border-[#C9A96E]/20 bg-[#080C0A]/40 hover:bg-[#101915] transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#A3ADA8] block mb-4">
                    0{idx + 1} / MILESTONE
                  </span>
                  <div className="font-display text-4xl sm:text-5xl font-semibold text-champagne-gradient tracking-tight">
                    {item.figure}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#F5F5F0] mt-3">
                    {item.label}
                  </h3>
                </div>
                <p className="text-sm text-[#A3ADA8] mt-4 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CÂU CHUYỆN SỰ NGHIỆP: BẢN LĨNH VƯỢT THỬ THÁCH ĐẾN ĐỈNH CAO (THE STORY) */}
      <section id="hanh-trinh" className="relative py-24 lg:py-32 border-b border-[#C9A96E]/15">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          {/* Section Title */}
          <div className="max-w-3xl mb-20 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9A96E] block">
              EXECUTIVE BIOGRAPHY &amp; LEGACY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#F5F5F0] leading-[1.18]">
              Bản Lĩnh Vượt Thử Thách Đến Đỉnh Cao Lãnh Đạo Châu Á
            </h2>
            <p className="text-base text-[#A3ADA8] leading-relaxed font-light">
              Hành trình gần hai thập kỷ rèn giũa từ môi trường ngân hàng quốc tế khắt khe đến vị thế người kiến tạo hệ sinh thái lãnh đạo tinh hoa tại Việt Nam.
            </p>
          </div>

          {/* 3 Chapters Editorial Z-Pattern */}
          <div className="space-y-24 lg:space-y-32">
            {/* HỒI 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="font-display text-sm uppercase tracking-[0.22em] text-[#C9A96E]">
                    HỒI I &bull; 2009 – 2017
                  </span>
                  <div className="h-[1px] flex-1 bg-[#C9A96E]/25" />
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5F5F0] leading-snug">
                  Nền Tảng ANZ Bank &amp; Bài Học Để Đời Về Chữ “Tín”
                </h3>

                <p className="text-[#A3ADA8] text-base leading-[1.8] font-light">
                  Trước khi trở thành ngôi sao kinh doanh, Khánh Vân từng trải qua 3 tháng đầu tiên chuyển sang mảng Sales trong trạng thái{' '}
                  <strong className="text-[#F5F5F0] font-medium">
                    không có nổi một khách hàng và đứng trước nguy cơ bị cắt mã số
                  </strong>
                  .
                </p>

                <p className="text-[#A3ADA8] text-base leading-[1.8] font-light">
                  Không chọn cách bán hàng bất chấp, chị nhìn lại tài sản lớn nhất của mình: sự chuẩn xác, tử tế và tận tâm suốt những năm làm Vận hành (Operations). Chính uy tín ấy đã khiến đồng nghiệp và đối tác tin yêu chủ động giới thiệu khách hàng (The Power of Referral &amp; Integrity). Cú lội ngược dòng ngoạn mục đưa chị lên vị trí{' '}
                  <strong className="text-[#E2C792] font-medium">
                    Top 1 Toàn Quốc ANZ năm 2017
                  </strong>{' '}
                  mảng Tín dụng &amp; Cho vay thế chấp mua nhà.
                </p>
              </div>

              <div className="lg:col-span-6">
                <figure
                  onClick={() =>
                    setLightbox({
                      src: '/images/SanKhau_ChiVan_VinhDanhTop1DRDFYP2024.jpg',
                      category: 'HALL OF EXCELLENCE • 2024',
                      title: 'Vinh Danh Top 1 Quản Lý Cấp Cao DRD+ (2024)',
                      subtitle:
                        'Chân dung Giám đốc Vùng Cấp cao Nguyễn Thị Vân trên màn hình lớn tại đêm vinh danh toàn quốc.',
                    })
                  }
                  className="group cursor-pointer"
                >
                  <div className="p-2 bg-[#0D1411] border border-[#C9A96E]/30">
                    <div className="overflow-hidden aspect-[4/3] bg-[#080C0A]">
                      <img
                        src="/images/SanKhau_ChiVan_VinhDanhTop1DRDFYP2024.jpg"
                        alt="Vinh danh Top 1 Quản lý cấp cao DRD+ Nguyễn Thị Vân năm 2024"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                  </div>
                  <figcaption className="mt-3.5 flex items-center justify-between text-xs text-[#A3ADA8]">
                    <span>
                      <strong className="text-[#E2C792] uppercase tracking-wider mr-2">
                        Vinh Danh 2024:
                      </strong>
                      Top 1 Quản Lý Cấp Cao DRD+ Dẫn Đầu Tỷ Lệ Hoàn Thành Chỉ Tiêu
                    </span>
                    <span className="text-[#C9A96E] shrink-0 ml-2">Phóng to &rarr;</span>
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* HỒI 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <figure
                  onClick={() =>
                    setLightbox({
                      src: '/images/SanKhau_ChiVan_NhanGiaiTop1DuyTriHopDong2025.jpg',
                      category: 'STANDARD OF TRUST • 2025',
                      title: 'Top 1 DRD+ Dẫn Đầu Tỷ Lệ Duy Trì Hợp Đồng Năm 2 (2025)',
                      subtitle:
                        'Minh chứng vàng cho triết lý tư vấn đúng - đủ và sự tín nhiệm dài hạn từ khách hàng.',
                    })
                  }
                  className="group cursor-pointer"
                >
                  <div className="p-2 bg-[#0D1411] border border-[#C9A96E]/30">
                    <div className="overflow-hidden aspect-[4/3] bg-[#080C0A]">
                      <img
                        src="/images/SanKhau_ChiVan_NhanGiaiTop1DuyTriHopDong2025.jpg"
                        alt="Top 1 DRD+ Quản lý cấp cao dẫn đầu tỷ lệ duy trì hợp đồng 2025"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                  </div>
                  <figcaption className="mt-3.5 flex items-center justify-between text-xs text-[#A3ADA8]">
                    <span>
                      <strong className="text-[#E2C792] uppercase tracking-wider mr-2">
                        Chất Lượng Vàng 2025:
                      </strong>
                      Top 1 DRD+ Dẫn Đầu Tỷ Lệ Duy Trì Hợp Đồng Năm 2
                    </span>
                    <span className="text-[#C9A96E] shrink-0 ml-2">Phóng to &rarr;</span>
                  </figcaption>
                </figure>
              </div>

              <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                <div className="flex items-center gap-4">
                  <span className="font-display text-sm uppercase tracking-[0.22em] text-[#00A758]">
                    HỒI II &bull; BƯỚC NGOẶT 2018
                  </span>
                  <div className="h-[1px] flex-1 bg-[#00A758]/30" />
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5F5F0] leading-snug">
                  Bước Chuyển Mình Dũng Cảm Khỏi Vùng An Toàn Ngân Hàng Ngoại
                </h3>

                <p className="text-[#A3ADA8] text-base leading-[1.8] font-light">
                  Năm 2018, khi đang ở vị thế vững chắc tại ngân hàng quốc tế, Khánh Vân quyết định bước ra khỏi vùng an toàn để chinh phục đỉnh cao mới về thu nhập và quyền làm chủ thời gian tại Manulife Việt Nam.
                </p>

                <p className="text-[#A3ADA8] text-base leading-[1.8] font-light">
                  Mang theo kỷ luật kiểm soát rủi ro của một Banker, chị đặt ra chuẩn mực khắt khe cho toàn đội ngũ: lấy{' '}
                  <strong className="text-[#F5F5F0] font-medium">
                    tỷ lệ duy trì hợp đồng và sự an tâm dài hạn của khách hàng
                  </strong>{' '}
                  làm thước đo danh dự cao nhất.
                </p>
              </div>
            </div>

            {/* HỒI 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="font-display text-sm uppercase tracking-[0.22em] text-[#C9A96E]">
                    HỒI III &bull; 2018 – NAY
                  </span>
                  <div className="h-[1px] flex-1 bg-[#C9A96E]/25" />
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5F5F0] leading-snug">
                  Kiến Tạo Đế Chế Tinh Hoa &amp; Vươn Tầm Top 1 Châu Á
                </h3>

                <p className="text-[#A3ADA8] text-base leading-[1.8] font-light">
                  Năm 2021, Nguyễn Thị Khánh Vân trở thành{' '}
                  <strong className="text-[#E2C792] font-medium">
                    người duy nhất tại Việt Nam đoạt giải thưởng “Nhà Quản lý Xuất sắc nhất Châu Á”
                  </strong>{' '}
                  (Asia Trusted Life Agent &amp; Advisers Awards 2021), khẳng định năng lực quản trị tầm vóc quốc tế.
                </p>

                <p className="text-[#A3ADA8] text-base leading-[1.8] font-light">
                  Hơn 7 năm bền bỉ kiến tạo, chị đã xây dựng nên hệ thống vững mạnh với hơn{' '}
                  <strong className="text-[#F5F5F0] font-medium">
                    500+ nhân sự và 64 Quản lý cấp cao
                  </strong>
                  , liên tiếp giữ vững vị trí Top 1 Quản lý cấp cao DRD+ toàn hệ thống.
                </p>
              </div>

              {/* Vertical Portrait Stage Trophy Image — Framed in natural 3:4 aspect ratio so nothing is cut off */}
              <div className="lg:col-span-5">
                <figure
                  onClick={() =>
                    setLightbox({
                      src: '/images/SanKhau_ChiVan_NhanGiaiTop1FYP2025.jpg',
                      category: 'PINNACLE OF LEADERSHIP • 2025',
                      title: 'Top 1 DRD+ Quản Lý Cấp Cao Dẫn Đầu Hoàn Thành Chỉ Tiêu (2025)',
                      subtitle:
                        'Khoảnh khắc chị Khánh Vân giơ cao chiếc cúp vô địch trên sân khấu vinh danh.',
                    })
                  }
                  className="group cursor-pointer"
                >
                  <div className="p-2 bg-[#0D1411] border border-[#C9A96E]/30">
                    <div className="overflow-hidden aspect-[3/4] bg-[#080C0A]">
                      <img
                        src="/images/SanKhau_ChiVan_NhanGiaiTop1FYP2025.jpg"
                        alt="Chị Khánh Vân nhận cúp Top 1 DRD+ năm 2025"
                        className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                  </div>
                  <figcaption className="mt-3.5 flex items-center justify-between text-xs text-[#A3ADA8]">
                    <span>
                      <strong className="text-[#E2C792] uppercase tracking-wider mr-2">
                        Đỉnh Cao 2025:
                      </strong>
                      Top 1 DRD+ Dẫn Đầu Hoàn Thành Chỉ Tiêu FYP
                    </span>
                    <span className="text-[#C9A96E] shrink-0 ml-2">Phóng to &rarr;</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRIẾT LÝ QUẢN TRỊ & 3 TRỤ CỘT HÀNH ĐỘNG */}
      <section id="triet-ly" className="relative py-24 lg:py-32 bg-[#0B110E] border-b border-[#C9A96E]/15">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#00A758] block">
              EXECUTIVE PHILOSOPHY &amp; PILLARS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#F5F5F0] leading-tight">
              Triết Lý Quản Trị &amp; 3 Trụ Cột Hành Động
            </h2>
            <p className="text-base text-[#A3ADA8] font-light leading-relaxed">
              Ba nguyên tắc bất biến tạo nên uy tín thương hiệu cá nhân và sức mạnh gắn kết của tập thể hơn 500 cộng sự.
            </p>
          </div>

          {/* 3 Architectural Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="luxury-panel p-8 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#C9A96E] font-semibold">
                    TRỤ CỘT I &bull; WEALTH ADVISORY
                  </span>
                  <TrendingUp className="w-4 h-4 text-[#C9A96E] shrink-0" />
                </div>
                <h3 className="font-display text-xl xl:text-[22px] font-semibold text-[#F5F5F0] mb-4">
                  Hoạch Định Gia Sản Chuẩn Mực
                </h3>
                <p className="text-sm sm:text-[15px] text-[#A3ADA8] leading-[1.8] font-light">
                  Tư duy số liệu minh bạch, kiểm soát rủi ro từ ngân hàng ngoại. Thiết kế giải pháp đúng và đủ theo cấu trúc tài chính riêng biệt, bảo toàn dòng tiền dài hạn cho mỗi gia đình.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 text-xs uppercase tracking-[0.16em] text-[#00A758]">
                Chuẩn mực Private Banking
              </div>
            </div>

            <div className="luxury-panel p-8 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#C9A96E] font-semibold">
                    TRỤ CỘT II &bull; EMPATHETIC LEADERSHIP
                  </span>
                  <HeartHandshake className="w-4 h-4 text-[#C9A96E] shrink-0" />
                </div>
                <h3 className="font-display text-xl xl:text-[22px] font-semibold text-[#F5F5F0] mb-4">
                  Nghệ Thuật Lãnh Đạo Thấu Cảm
                </h3>
                <p className="text-sm sm:text-[15px] text-[#A3ADA8] leading-[1.8] font-light">
                  Thấu hiểu từng cá nhân, phát huy đúng thế mạnh độc bản của mỗi cộng sự. Trao quyền thực chất và kiến tạo môi trường làm việc chuyên nghiệp không giới hạn trần phát triển.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 text-xs uppercase tracking-[0.16em] text-[#C9A96E]">
                Đánh thức tiềm năng độc bản
              </div>
            </div>

            <div className="luxury-panel p-8 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#C9A96E] font-semibold">
                    TRỤ CỘT III &bull; TRUST-DRIVEN GROWTH
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#C9A96E] shrink-0" />
                </div>
                <h3 className="font-display text-xl xl:text-[22px] font-semibold text-[#F5F5F0] mb-4">
                  Mạng Lưới Giá Trị Từ Niềm Tin
                </h3>
                <p className="text-sm sm:text-[15px] text-[#A3ADA8] leading-[1.8] font-light">
                  Tuyệt đối không kinh doanh chộp giật; lấy sự tử tế, đạo đức làm nghề và tỷ lệ duy trì hợp đồng làm thước đo danh dự cao nhất của người cố vấn tài chính.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 text-xs uppercase tracking-[0.16em] text-[#00A758]">
                Tín nhiệm khách hàng trọn đời
              </div>
            </div>
          </div>

          {/* Mentorship & Leadership Visual Diptych (Uncovered Images + Editorial Captions Below) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/PhongDaoTao_ChiVan_ChiaSeTruyenLua.jpg',
                  category: 'EXECUTIVE MENTORSHIP',
                  title: 'Đứng Lớp Đào Tạo & Truyền Lửa Cho Đội Ngũ Kế Cận',
                  subtitle:
                    'Trực tiếp chia sẻ kiến thức chuyên môn và kỹ năng quản trị thực chiến tại văn phòng Manulife.',
                })
              }
              className="lg:col-span-6 group cursor-pointer"
            >
              <div className="p-2 bg-[#080C0A] border border-[#C9A96E]/25">
                <div className="overflow-hidden aspect-[4/3]">
                  <img
                    src="/images/PhongDaoTao_ChiVan_ChiaSeTruyenLua.jpg"
                    alt="Chị Khánh Vân trực tiếp đứng lớp đào tạo và chia sẻ truyền lửa"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>
              <figcaption className="mt-4 border-l border-[#00A758] pl-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#00A758] font-semibold block">
                  EXECUTIVE COACHING &amp; TRAINING
                </span>
                <h4 className="font-serif text-xl text-[#F5F5F0] mt-1">
                  Trực Tiếp Đứng Lớp Đào Tạo &amp; Truyền Lửa Thực Chiến
                </h4>
                <p className="text-xs sm:text-sm text-[#A3ADA8] mt-1 font-light">
                  Chuyển giao toàn bộ quy trình tư vấn chuẩn ngân hàng và nghệ thuật lãnh đạo đội nhóm cho đội ngũ kế cận.
                </p>
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/SuKien_ChiVanCungDoiNgu_ChucMungThangCapSM.jpg',
                  category: 'LEADERSHIP SUCCESSION',
                  title: 'Chúc Mừng Các Quản Lý Cấp Cao (SM) Thăng Cấp',
                  subtitle:
                    'Niềm tự hào khi đồng hành và nâng đỡ các cộng sự vươn lên vị trí Quản lý Cấp cao.',
                })
              }
              className="lg:col-span-6 group cursor-pointer"
            >
              <div className="p-2 bg-[#080C0A] border border-[#C9A96E]/25">
                <div className="overflow-hidden aspect-[4/3]">
                  <img
                    src="/images/SuKien_ChiVanCungDoiNgu_ChucMungThangCapSM.jpg"
                    alt="Chị Khánh Vân chúc mừng thăng cấp các Quản lý cấp cao SM"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>
              <figcaption className="mt-4 border-l border-[#C9A96E] pl-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] font-semibold block">
                  LEADERSHIP SUCCESSION
                </span>
                <h4 className="font-serif text-xl text-[#F5F5F0] mt-1">
                  Ươm Mầm &amp; Vinh Danh Thế Hệ Quản Lý Cấp Cao Kế Cận
                </h4>
                <p className="text-xs sm:text-sm text-[#A3ADA8] mt-1 font-light">
                  Thành công của người dẫn đầu được đo bằng số lượng những nhà lãnh đạo mới trưởng thành trong hệ thống.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 6. ĐIỂM TỰA CUỘC SỐNG & SỰ CÂN BẰNG (WORK-LIFE HARMONY) */}
      <section id="diem-tua" className="relative py-24 lg:py-32 border-b border-[#C9A96E]/15">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          {/* Editorial Header + Quote */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-20">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9A96E] block">
                WORK-LIFE HARMONY &amp; DISCIPLINE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F5F5F0] leading-tight">
                Điểm Tựa Gia Đình &amp;{' '}
                <span className="inline-block">Phong Cách Sống Kỷ Luật</span>
              </h2>
            </div>

            <div className="lg:col-span-7 border-l border-[#C9A96E]/40 pl-6 sm:pl-8">
              <blockquote className="font-serif italic text-xl sm:text-2xl text-[#E6ECE8] leading-relaxed">
                “Với tôi, đỉnh cao sự nghiệp không nằm ở những chiếc cúp vinh danh, mà là sự bình an khi trở về nhà bên chồng và hai con. Gia đình chính là ngọn lửa ấm, là động lực để tôi thấu hiểu sâu sắc ý nghĩa của sự bảo vệ và an tâm tài chính mà mình trao gửi đến mỗi gia đình khách hàng.”
              </blockquote>
              <cite className="not-italic text-xs uppercase tracking-[0.22em] text-[#C9A96E] mt-4 block">
                — Nguyễn Thị Khánh Vân
              </cite>
            </div>
          </div>

          {/* Part A: Family Warmth (2 Uncovered Editorial Photos with matched height) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/GiaDinh_ChiVan_NgoiSofaPhongKhach.jpg',
                  category: 'FAMILY SANCTUARY',
                  title: 'Tổ Ấm Bình Yên — Điểm Tựa Vững Chắc Phía Sau Sự Nghiệp',
                  subtitle:
                    'Khoảnh khắc sum vầy ấm cúng bên chồng và hai con tại phòng khách gia đình.',
                })
              }
              className="lg:col-span-7 group cursor-pointer flex flex-col"
            >
              <div className="p-2 bg-[#0D1411] border border-[#C9A96E]/25 flex-1">
                <div className="overflow-hidden h-[320px] sm:h-[400px] lg:h-[440px] w-full">
                  <img
                    src="/images/GiaDinh_ChiVan_NgoiSofaPhongKhach.jpg"
                    alt="Gia đình chị Khánh Vân quây quần ấm cúng tại phòng khách"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>
              <figcaption className="mt-3.5 flex items-center justify-between text-xs text-[#A3ADA8]">
                <span>
                  <strong className="text-[#F5F5F0] font-medium mr-2">Tổ Ấm Viên Mãn:</strong>
                  Sự đồng hành của người bạn đời và nụ cười của hai con là nguồn năng lượng lớn nhất.
                </span>
                <span className="text-[#C9A96E] shrink-0 ml-2">Xem ảnh &rarr;</span>
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/GiaDinh_ChiVan_AuYemConBenSanVuon.jpg',
                  category: 'FAMILY HARMONY',
                  title: 'Khoảnh Khắc Yêu Thương Bên Gia Đình Nhỏ',
                  subtitle:
                    'Làm chủ thời gian để trọn vẹn từng khoảnh khắc trưởng thành cùng các con.',
                })
              }
              className="lg:col-span-5 group cursor-pointer flex flex-col"
            >
              <div className="p-2 bg-[#0D1411] border border-[#C9A96E]/25 flex-1">
                <div className="overflow-hidden h-[320px] sm:h-[400px] lg:h-[440px] w-full">
                  <img
                    src="/images/GiaDinh_ChiVan_AuYemConBenSanVuon.jpg"
                    alt="Gia đình chị Khánh Vân yêu thương bên góc sân vườn xanh mát"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>
              <figcaption className="mt-3.5 flex items-center justify-between text-xs text-[#A3ADA8]">
                <span>
                  <strong className="text-[#F5F5F0] font-medium mr-2">Trọn Vẹn Yêu Thương:</strong>
                  Gần gũi thiên nhiên và tận hưởng sự bình yên bên gia đình.
                </span>
                <span className="text-[#C9A96E] shrink-0 ml-2">Xem ảnh &rarr;</span>
              </figcaption>
            </figure>
          </div>

          {/* Part B: Lifestyle, Discipline & Global Vision (3 Clean Vertical Editorial Frames) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-white/10">
            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/DuLich_ChiVan_BayKhinhKhiCauBinhMinh.jpg',
                  category: 'GLOBAL VISION',
                  title: 'Tầm Nhìn Rộng Mở & Khát Vọng Tự Do',
                  subtitle:
                    'Đón bình minh rực rỡ trên khinh khí cầu — tận hưởng thành quả lao động xứng đáng.',
                })
              }
              className="group cursor-pointer"
            >
              <div className="p-2 bg-[#0D1411] border border-[#C9A96E]/25">
                <div className="overflow-hidden aspect-[4/5]">
                  <img
                    src="/images/DuLich_ChiVan_BayKhinhKhiCauBinhMinh.jpg"
                    alt="Chị Khánh Vân đón bình minh trên khinh khí cầu"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>
              <figcaption className="mt-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] block">
                  01 / TẦM NHÌN QUỐC TẾ
                </span>
                <p className="font-serif text-lg text-[#F5F5F0] mt-0.5">
                  Tự Do Trải Nghiệm Thế Giới Rộng Lớn
                </p>
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/DoiThuong_ChiVan_SelfiePhongTapGym.jpg',
                  category: 'SELF-DISCIPLINE',
                  title: 'Kỷ Luật Bản Thân & Rèn Luyện Thể Lực',
                  subtitle:
                    'Duy trì năng lượng bền bỉ mỗi ngày thông qua kỷ luật rèn luyện thể thao.',
                })
              }
              className="group cursor-pointer"
            >
              <div className="p-2 bg-[#0D1411] border border-[#C9A96E]/25">
                <div className="overflow-hidden aspect-[4/5]">
                  <img
                    src="/images/DoiThuong_ChiVan_SelfiePhongTapGym.jpg"
                    alt="Chị Khánh Vân rèn luyện thể thao tại phòng tập"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>
              <figcaption className="mt-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#00A758] block">
                  02 / KỶ LUẬT BẢN THÂN
                </span>
                <p className="font-serif text-lg text-[#F5F5F0] mt-0.5">
                  Rèn Luyện Thể Lực &amp; Tinh Thần Bền Bỉ
                </p>
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/DuLich_ChiVanCungChong_ChupAnhBenCangBien.jpg',
                  category: 'LIFE PARTNERSHIP',
                  title: 'Hạnh Phúc Đồng Hành Bền Vững',
                  subtitle:
                    'Sánh bước cùng người bạn đời tri kỷ khám phá những chân trời mới.',
                })
              }
              className="group cursor-pointer"
            >
              <div className="p-2 bg-[#0D1411] border border-[#C9A96E]/25">
                <div className="overflow-hidden aspect-[4/5]">
                  <img
                    src="/images/DuLich_ChiVanCungChong_ChupAnhBenCangBien.jpg"
                    alt="Chị Khánh Vân cùng chồng du lịch bên cảng biển quốc tế"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>
              <figcaption className="mt-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] block">
                  03 / NGƯỜI BẠN ĐỜI TRI KỶ
                </span>
                <p className="font-serif text-lg text-[#F5F5F0] mt-0.5">
                  Hạnh Phúc Đồng Hành Trên Mọi Hành Trình
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 7. CHƯƠNG TRÌNH ĐỒNG HÀNH: ƯƠM MẦM LÃNH ĐẠO TÀI CHÍNH F1 */}
      <section id="hop-tac" className="relative py-24 lg:py-32 bg-[#0B110E]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
            {/* Left Column: Strategic Positioning & Team Culture */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9A96E] block mb-3">
                  EXECUTIVE TALENT ACQUISITION &bull; F1 LEADERSHIP
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F5F5F0] leading-tight">
                  Chương Trình Phát Triển Nhà Quản Lý &amp; Hoạch Định Tài Chính Chuyên Nghiệp
                </h2>
              </div>

              <p className="text-[#A3ADA8] text-base leading-[1.8] font-light">
                Không tuyển dụng đại lý bán lẻ đại trà. Chương trình được thiết kế chuyên biệt dành cho{' '}
                <strong className="text-[#F5F5F0] font-medium">
                  Cựu Banker, Cấp Quản lý Kinh doanh và Chủ Doanh nghiệp
                </strong>{' '}
                mong muốn kiến tạo sự nghiệp quản trị tài chính độc lập với lộ trình thăng tiến minh bạch.
              </p>

              <div className="space-y-4 border-t border-b border-white/10 py-6">
                {[
                  'Được kèm cặp trực tiếp 1-1 bởi Mentor Top 1 Châu Á Nguyễn Thị Khánh Vân.',
                  'Tiếp cận hệ thống công nghệ số hóa hỗ trợ quản trị và quy trình chuẩn ngân hàng quốc tế.',
                  'Môi trường văn hóa đồng đội gắn kết, tử tế, tôn trọng thế mạnh độc bản của từng cá nhân.',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <Check className="w-4 h-4 text-[#00A758] shrink-0 mt-1" />
                    <span className="text-sm sm:text-[15px] text-[#D5DDD8] font-light">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* Team Culture Uncovered Photo */}
              <figure
                onClick={() =>
                  setLightbox({
                    src: '/images/DoiThuong_ChiVanCungDoiNgu_CaPheViaHe.jpg',
                    category: 'TEAM CULTURE',
                    title: 'Văn Hóa Đội Ngũ Gắn Kết & Chân Thành Đời Thường',
                    subtitle:
                      'Sự gần gũi, sẻ chia không khoảng cách giữa người lãnh đạo và các cộng sự trong đội ngũ.',
                  })
                }
                className="group cursor-pointer"
              >
                <div className="p-2 bg-[#080C0A] border border-[#C9A96E]/25">
                  <div className="overflow-hidden aspect-[16/9]">
                    <img
                      src="/images/DoiThuong_ChiVanCungDoiNgu_CaPheViaHe.jpg"
                      alt="Văn hóa gắn kết đời thường gần gũi của chị Khánh Vân cùng cộng sự"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                </div>
                <figcaption className="mt-3 text-xs text-[#A3ADA8] flex items-center justify-between">
                  <span>
                    <strong className="text-[#C9A96E] uppercase tracking-wider mr-2">
                      Văn Hóa Đội Ngũ:
                    </strong>
                    Gắn kết chân thành từ những buổi trò chuyện giản dị đời thường.
                  </span>
                  <span className="text-[#C9A96E] shrink-0 ml-2">Xem ảnh &rarr;</span>
                </figcaption>
              </figure>
            </div>

            {/* Right Column: Confidential Consultation Form */}
            <div className="lg:col-span-6">
              <div className="luxury-panel p-8 sm:p-10 lg:p-12">
                <div className="pb-6 mb-8 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#C9A96E] block">
                      PRIVATE &amp; CONFIDENTIAL
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-[#F5F5F0] mt-1">
                      Đăng Ký Tư Vấn &amp; Hợp Tác Bảo Mật
                    </h3>
                  </div>
                  <Lock className="w-5 h-5 text-[#C9A96E]" />
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-5">
                    <div className="w-12 h-12 mx-auto border border-[#00A758] flex items-center justify-center text-[#00A758]">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="font-display text-2xl text-[#F5F5F0]">
                      Yêu Cầu Kết Nối Đã Được Ghi Nhận
                    </h4>
                    <p className="text-sm text-[#A3ADA8] max-w-md mx-auto leading-relaxed">
                      Cảm ơn <strong className="text-white">{formData.fullName}</strong>. Thông tin của bạn được bảo mật tuyệt đối và Ban Trợ lý của chị Nguyễn Thị Khánh Vân sẽ liên hệ qua số{' '}
                      <strong className="text-[#E2C792]">{formData.phone}</strong> trong vòng 24 giờ làm việc.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 text-xs uppercase tracking-[0.18em] border border-[#C9A96E]/40 text-[#E2C792] hover:bg-[#C9A96E]/10 transition-colors"
                    >
                      Gửi Lại Thông Tin
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] text-[#A3ADA8] mb-2">
                        Họ và Tên *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nhập họ và tên của bạn"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#080C0A] border border-white/15 text-[#F5F5F0] placeholder-[#5A6560] text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.18em] text-[#A3ADA8] mb-2">
                          Số Điện Thoại *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="090x xxx xxx"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3.5 bg-[#080C0A] border border-white/15 text-[#F5F5F0] placeholder-[#5A6560] text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.18em] text-[#A3ADA8] mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="email@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3.5 bg-[#080C0A] border border-white/15 text-[#F5F5F0] placeholder-[#5A6560] text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] text-[#A3ADA8] mb-2">
                        Chức Vụ / Lĩnh Vực Hiện Tại
                      </label>
                      <select
                        value={formData.currentRole}
                        onChange={(e) =>
                          setFormData({ ...formData, currentRole: e.target.value })
                        }
                        className="w-full px-4 py-3.5 bg-[#080C0A] border border-white/15 text-[#F5F5F0] text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                      >
                        <option value="Cựu Banker / Quản lý Quan hệ Khách hàng Ngân hàng">
                          Cựu Banker / Quản lý Quan hệ Khách hàng Ngân hàng
                        </option>
                        <option value="Cấp Quản lý Kinh doanh / Giám đốc Khối">
                          Cấp Quản lý Kinh doanh / Giám đốc Khối
                        </option>
                        <option value="Chủ Doanh nghiệp / Nhà sáng lập">
                          Chủ Doanh nghiệp / Nhà sáng lập (Founder)
                        </option>
                        <option value="Khách hàng Cá nhân & Gia đình (Hoạch định Gia sản)">
                          Khách hàng Cá nhân &amp; Gia đình (Tư vấn Hoạch định Gia sản)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] text-[#A3ADA8] mb-2">
                        Mục Tiêu Phát Triển
                      </label>
                      <select
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#080C0A] border border-white/15 text-[#F5F5F0] text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                      >
                        <option value="Ứng tuyển Chương trình Ươm mầm Lãnh đạo Tài chính F1">
                          Đồng hành Chương trình Ươm mầm Lãnh đạo Tài chính F1
                        </option>
                        <option value="Cố vấn Hoạch định Gia sản & Quản trị Rủi ro">
                          Cố vấn Hoạch định Gia sản &amp; Quản trị Rủi ro Gia đình
                        </option>
                        <option value="Hợp tác Chiến lược & Đào tạo Doanh nghiệp">
                          Hợp tác Chiến lược &amp; Đào tạo Doanh nghiệp
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] text-[#A3ADA8] mb-2">
                        Lời Nhắn (Tùy chọn)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Chia sẻ ngắn gọn về định hướng hoặc câu hỏi của bạn..."
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        className="w-full px-4 py-3 bg-[#080C0A] border border-white/15 text-[#F5F5F0] placeholder-[#5A6560] text-sm focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-[#00A758] hover:bg-[#008F4B] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Gửi Đăng Ký Tư Vấn Bảo Mật</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER (CHÂN TRANG & CỔNG VẬN HÀNH NỘI BỘ) */}
      <footer className="bg-[#050806] border-t border-[#C9A96E]/20 py-14">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
            <div>
              <span className="font-display text-lg font-semibold tracking-[0.26em] text-[#F5F5F0] block">
                NGUYỄN THỊ KHÁNH VÂN
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] mt-1 block">
                Executive Wealth &amp; Leadership &bull; khanhvanfinance.com
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-8 text-xs uppercase tracking-[0.16em] text-[#A3ADA8]">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F5F5F0] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Facebook Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C9A96E]" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F5F5F0] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C9A96E]" />
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E8A84]">
            <p>© 2026 Nguyen Thi Khanh Van. All Rights Reserved. khanhvanfinance.com</p>

            <a
              href="https://eod.khanhvanfinance.com"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] tracking-[0.12em] text-[#8E9B94] hover:text-[#C9A96E] transition-colors"
            >
              [Cổng Báo Cáo Nội Bộ EOD]
            </a>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-[#0D1411] border border-[#C9A96E]/40 overflow-hidden"
            >
              <div className="relative bg-black flex items-center justify-center max-h-[75vh]">
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="absolute top-4 right-4 p-2 bg-black/80 text-white hover:text-[#C9A96E] border border-white/15"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 border-t border-[#C9A96E]/20">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#C9A96E] block">
                  {lightbox.category}
                </span>
                <h4 className="font-display text-xl text-[#F5F5F0] mt-1">{lightbox.title}</h4>
                <p className="text-sm text-[#A3ADA8] mt-1 font-light">{lightbox.subtitle}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
