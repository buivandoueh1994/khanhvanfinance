import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Building2,
  CheckCircle2,
  Compass,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

interface CuratedLeader {
  id: string;
  index: string;
  displayName: string;
  fullName: string;
  roleCode: 'PSSM' | 'SM' | 'BM' | 'SDM' | 'DM' | 'SUM' | 'UM';
  roleTitle: string;
  tierGroup: 'Quản lý Phòng Kinh doanh' | 'Quản lý Nhóm Kinh doanh';
  unitCode: string;
  joinedYear: string;
  experienceLabel: string;
  priorBackground: string;
  highlightNote: string;
  quote: string;
  editorialBio: string[];
  badges: string[];
  portrait: string;
}

const CURATED_LEADERS: CuratedLeader[] = [
  {
    id: 'le-huyen',
    index: '01',
    displayName: 'Lê Huyên',
    fullName: 'Lê Thị Huyên',
    roleCode: 'DM',
    roleTitle: 'Trưởng Phòng Kinh doanh',
    tierGroup: 'Quản lý Phòng Kinh doanh',
    unitCode: 'HCM69',
    joinedYear: '2018',
    experienceLabel: 'Gia nhập Manulife 2018 • Hơn 13 năm gắn bó cùng Kế toán & Tài chính',
    priorBackground: 'Cử nhân Kế toán – Kiểm toán (ĐH Kinh tế – Luật) • 5 năm Kế toán tổng hợp',
    highlightNote: 'Chinh phục trọn bộ 3 danh hiệu cao quý: MDRT • FC • MBA Pro',
    quote: 'Xây dựng cuộc sống vững vàng bằng tài chính thông minh.',
    editorialBio: [
      'Tốt nghiệp chuyên ngành Kế toán – Kiểm toán tại Trường Đại học Kinh tế – Luật và có 5 năm làm kế toán tổng hợp trước khi bén duyên cùng Manulife từ năm 2018, cả hai chặng đường sự nghiệp của Lê Huyên đều gắn liền với sự chính xác của những con số. Nếu trước kia là những bản cân đối tài chính của doanh nghiệp và tập đoàn, thì suốt 8 năm qua, chị chọn dành trọn sự tỉ mỉ ấy cho bài toán an toàn dòng tiền của từng cá nhân và gia đình.',
      'Đồng hành cùng Hệ thống Vùng Khánh Vân bởi sự đồng điệu sâu sắc trong văn hóa chuẩn mực lấy khách hàng làm trọng tâm, Lê Huyên tâm niệm rằng sự tử tế, minh bạch và chân thành chính là chìa khóa duy nhất để đi cùng khách hàng qua nhiều thập kỷ.',
    ],
    badges: [
      'MDRT',
      'FC',
      'MBA Pro',
      'Hoạch định Hưu trí & Học vấn',
      'Chăm sóc Sức khỏe Cao cấp',
    ],
    portrait: '/images/leaders/le-huyen.jpg',
  },
  {
    id: 'loan-tran',
    index: '02',
    displayName: 'Loan Trần',
    fullName: 'Trần Thị Loan',
    roleCode: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierGroup: 'Quản lý Nhóm Kinh doanh',
    unitCode: 'HCM69',
    joinedYear: '2021',
    experienceLabel: 'Gia nhập Manulife 2021 • 12 năm kinh nghiệm Quản trị & Tài chính',
    priorBackground: 'Nguyên Phó Giám đốc Hyundai • Chiến lược định giá tại Tập đoàn Cargill',
    highlightNote: '3 năm liên tiếp đạt chuẩn quốc tế MDRT (2024–2026) • Nhà kiến tạo đội ngũ ưu tú MBA',
    quote: 'Đặt lợi ích khách hàng làm trung tâm.',
    editorialBio: [
      'Sở hữu nền tảng quản trị dày dạn với 12 năm trong lĩnh vực tài chính – doanh nghiệp, từng đảm nhiệm vị trí Phó Giám đốc tại Hyundai và phụ trách chiến lược định giá tại Tập đoàn đa quốc gia Cargill, Loan Trần bước đến với Manulife từ chính trải nghiệm thuyết phục khi là một khách hàng của tập đoàn.',
      'Tại Hệ thống Vùng Khánh Vân, chị tìm thấy môi trường hội tụ những người làm nghề có chiều sâu chuyên môn, tư duy sòng phẳng và tinh thần sẻ chia bền chặt. Dẫn dắt đội ngũ 12 nhân sự cùng cột mốc 3 năm liên tiếp đạt danh hiệu MDRT, Loan Trần kiên định theo đuổi mục tiêu kiến tạo các giải pháp tài chính chuẩn mực, góp phần xây dựng diện mạo bảo hiểm văn minh và bền vững tại Việt Nam.',
    ],
    badges: [
      'MDRT 2024–2026',
      'MBA Pro',
      'Bảo vệ Trụ cột Gia đình',
      'Hoạch định Hưu trí & Học vấn',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/loan-tran.jpg',
  },
  {
    id: 'duong-quynh',
    index: '03',
    displayName: 'Dương Quỳnh',
    fullName: 'Nguyễn Ngọc Dương Quỳnh',
    roleCode: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierGroup: 'Quản lý Nhóm Kinh doanh',
    unitCode: 'HCM69',
    joinedYear: '2020',
    experienceLabel: 'Gia nhập Manulife 2020 • 12 năm kinh nghiệm Tài chính – Ngân hàng',
    priorBackground: 'Nguyên Chuyên viên Kiểm soát Nội bộ Ngân hàng • Chứng chỉ Di sản Tài chính LIMRA',
    highlightNote: 'MDRT • MBA • Manulife Pro Bạch Kim • Quản lý Xuất sắc',
    quote: 'Tư vấn tận tình – Phục vụ tận tâm – Đồng hành trọn đời.',
    editorialBio: [
      'Xuất thân từ nghiệp vụ Kiểm soát nội bộ ngân hàng vốn đòi hỏi tính cẩn trọng và kỷ luật khắt khe, cơ duyên đưa Dương Quỳnh đến với nghề bắt đầu rất tự nhiên: chị chủ động tìm đến chị Khánh Vân để thiết lập hai hợp đồng bảo vệ cho chính tổ ấm của mình. Ấn tượng trước phong thái tư vấn thấu đáo, rõ ràng từng điều khoản của người đi trước, chị quyết định bước vào hành trình học hỏi bài bản và gắn bó cùng hệ thống từ năm 2020.',
      'Mang tư duy quản trị rủi ro chuẩn ngân hàng kết hợp cùng chứng chỉ quốc tế về hoạch định di sản tài chính LIMRA, Dương Quỳnh luôn đặt sự đầy đủ, minh bạch và quyền lợi dài hạn của mỗi gia đình lên vị trí ưu tiên cao nhất.',
    ],
    badges: [
      'MDRT',
      'MBA Pro',
      'Manulife Pro Bạch Kim',
      'Chứng chỉ Di sản LIMRA',
      'Quản lý Xuất sắc',
    ],
    portrait: '/images/leaders/duong-quynh.jpg',
  },
];

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
    desc: 'Đội ngũ quản lý kế cận quy tụ những cá nhân trưởng thành từ Ngân hàng thương mại, Kế toán – Kiểm toán, Tập đoàn đa quốc gia và Điều hành doanh nghiệp, mang đến góc nhìn hoạch định dòng tiền thực chất.',
  },
  {
    number: '03',
    icon: Compass,
    title: 'Cơ Chế Đồng Hành & Kế Thừa Hệ Thống',
    desc: 'Mỗi khách hàng không chỉ làm việc với một tư vấn viên đơn lẻ, mà được đặt dưới sự bảo chứng xuyên suốt của cấu trúc quản trị nhiều tầng thuộc Hệ thống Vùng Khánh Vân tại Manulife Việt Nam.',
  },
];

export const RegionalSystemPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  useEffect(() => {
    document.title = 'Hệ Thống Vùng Khánh Vân — Ban Điều Hành & Đội Ngũ Quản Lý';
    window.scrollTo(0, 0);
  }, []);

  const filteredLeaders =
    activeFilter === 'ALL'
      ? CURATED_LEADERS
      : CURATED_LEADERS.filter((l) => l.tierGroup === activeFilter);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#181F1C] selection:bg-[#0A3622] selection:text-white">
      {/* =================================================================== */}
      {/* STICKY EDITORIAL HEADER */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E4E1D8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-3 group"
            title="Về trang chủ Nguyễn Thị Vân (Khánh Vân)"
          >
            <span className="w-[3px] h-5 bg-[#008746] inline-block" />
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl tracking-[0.08em] text-[#181F1C] font-medium leading-none">
                KHÁNH VÂN
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#56605B] mt-1">
                Hệ Thống Vùng • Manulife Việt Nam
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] text-[#56605B]">
            <a
              href="#gioi-thieu-chung"
              className="hover:text-[#0A3622] transition-colors"
            >
              01. Giới thiệu chung
            </a>
            <a
              href="#doi-ngu-quan-ly"
              className="hover:text-[#0A3622] transition-colors"
            >
              02. Đội ngũ Quản lý
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#DCD8CE] hover:border-[#0A3622] text-xs text-[#181F1C] rounded-[2px] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Trang chủ Khánh Vân</span>
              <span className="sm:hidden">Trang chủ</span>
            </a>
          </div>
        </div>
      </header>

      {/* =================================================================== */}
      {/* PHẦN 01: GIỚI THIỆU CHUNG — HỆ THỐNG VÙNG KHÁNH VÂN */}
      {/* =================================================================== */}
      <section
        id="gioi-thieu-chung"
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
            <div className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.26em] text-[#008746] font-medium">
              <span>01 / TỔNG QUAN TỔ CHỨC</span>
              <span className="w-8 h-px bg-[#B8975A]" />
              <span className="text-[#56605B]">MANULIFE VIỆT NAM</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[64px] leading-[1.08] font-normal text-[#181F1C] tracking-[-0.01em]">
              Hệ Thống Vùng{' '}
              <span className="italic text-[#0A3622]">Khánh Vân</span>
            </h1>

            <p className="text-base sm:text-xl text-[#28322D] font-light leading-relaxed max-w-3xl pt-1">
              Được kiến tạo từ năm 2018 trên nền tảng kỷ luật quản trị tài sản ngân hàng quốc tế, Hệ thống Vùng Khánh Vân là nơi hội tụ của hơn 500 nhân sự và 64 quản lý kế cận cùng chung một triết lý:{' '}
              <span className="font-normal text-[#0A3622] italic font-serif text-xl sm:text-2xl">
                “Đi chắc để đi xa — Kiến tạo tốc độ từ sự chuẩn mực.”
              </span>
            </p>
          </motion.div>

          {/* 1B. Full-Width Framed Executive Board Portrait + Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white border border-[#DCD8CE] rounded-[4px] overflow-hidden shadow-[0_24px_60px_-28px_rgba(10,54,34,0.22)]"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-[#F2EFE9] overflow-hidden">
              <img
                src="/images/BanDieuHanh_ChiVanCungTapTheQuanLy_SanhVom2026.jpg"
                alt="Giám đốc Vùng Cấp cao Nguyễn Thị Vân (Khánh Vân) cùng Ban Điều Hành Hệ thống Vùng Khánh Vân"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#181F1C]/65 via-[#181F1C]/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 flex flex-wrap items-end justify-between gap-2 text-white">
                <div>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#E8D3A6] font-medium block">
                    BAN ĐIỀU HÀNH HỆ THỐNG VÙNG KHÁNH VÂN
                  </span>
                  <p className="font-serif italic text-lg sm:text-2xl text-[#FAF9F5]">
                    Thế hệ lãnh đạo kế cận bản lĩnh, chuyên môn sâu và chuẩn mực tại Manulife Việt Nam
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Key Institutional Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#E4E1D8] bg-[#FAF9F5]">
              <div className="p-5 sm:p-7 space-y-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#0A3622] font-medium block">
                  500+
                </span>
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#181F1C] font-semibold block">
                  Nhân sự toàn vùng
                </span>
                <p className="text-xs text-[#56605B]">
                  Phát triển bền vững từ con số 0 (2018)
                </p>
              </div>

              <div className="p-5 sm:p-7 space-y-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#0A3622] font-medium block">
                  64
                </span>
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#181F1C] font-semibold block">
                  Quản lý kinh doanh
                </span>
                <p className="text-xs text-[#56605B]">
                  Đa dạng khu vực: HCM69, MN111, SG168, SG169...
                </p>
              </div>

              <div className="p-5 sm:p-7 space-y-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#0A3622] font-medium block">
                  Top 1
                </span>
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#181F1C] font-semibold block">
                  Cú đúp Quán quân 2025
                </span>
                <p className="text-xs text-[#56605B]">
                  Dẫn đầu Doanh số FYP & Tỷ lệ Duy trì Hợp đồng
                </p>
              </div>

              <div className="p-5 sm:p-7 space-y-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#0A3622] font-medium block">
                  Châu Á
                </span>
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#181F1C] font-semibold block">
                  Giải thưởng Quản lý 2021
                </span>
                <p className="text-xs text-[#56605B]">
                  Nhà Quản lý Xuất sắc & Đáng tin cậy nhất Châu Á
                </p>
              </div>
            </div>
          </motion.div>

          {/* 1C. Regional Founder Note + 3 Operating Standards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start pt-2">
            {/* Founder Column */}
            <div className="lg:col-span-5 bg-[#F2EFE9]/80 border border-[#E4E1D8] rounded-[4px] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-4">
                <img
                  src="/images/ChanDung_ChiVan_VestXanhNgoc_ThanhLich.jpg"
                  alt="Nguyễn Thị Vân (Khánh Vân)"
                  className="w-20 h-24 rounded-[3px] object-cover object-top border border-[#DCD8CE] shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#008746] font-semibold block">
                    NGƯỜI SÁNG LẬP & DẪN DẮT VÙNG
                  </span>
                  <h2 className="font-serif text-2xl text-[#181F1C] font-medium leading-tight">
                    Nguyễn Thị Vân{' '}
                    <span className="italic text-[#0A3622]">(Khánh Vân)</span>
                  </h2>
                  <p className="text-xs text-[#56605B]">
                    Giám đốc Vùng Cấp cao (SRD) • Nguyên Quản lý Tài sản ANZ Bank
                  </p>
                </div>
              </div>

              <blockquote className="font-serif italic text-lg sm:text-[19px] text-[#0A3622] leading-relaxed border-l-2 border-[#B8975A] pl-4">
                “Một hệ thống mạnh không được đo bằng những lời hứa hào nhoáng, mà bằng chất lượng nhân sự đứng sau từng hợp đồng và tỷ lệ khách hàng vẫn an tâm đồng hành sau 5 năm, 10 năm, 20 năm.”
              </blockquote>

              <p className="text-xs sm:text-[13.5px] text-[#28322D] leading-relaxed">
                Rời vị trí Quản lý tại ngân hàng quốc tế ANZ sau 8 năm gắn bó để bắt đầu hành trình tại Manulife từ con số 0, chị Khánh Vân xây dựng vùng kinh doanh với tiêu chuẩn khắt khe của ngành ngân hàng: tuyển chọn những cộng sự tử tế, rèn luyện nghiệp vụ thực chất và trao quyền để mỗi quản lý tỏa sáng bằng chính thế mạnh riêng của mình.
              </p>

              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#0A3622] hover:text-[#008746] font-semibold pt-1 underline underline-offset-4"
              >
                <span>Đọc trọn vẹn câu chuyện của Khánh Vân</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 3 Core Cultural Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#008746] font-medium block">
                  BẢN SẮC & CHUẨN MỰC VẬN HÀNH
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#181F1C] font-normal leading-tight">
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
                          <span className="text-[11px] font-semibold tracking-[0.18em] text-[#B8975A]">
                            {pillar.number}
                          </span>
                          <h4 className="font-serif text-xl sm:text-2xl text-[#181F1C] font-medium">
                            {pillar.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-[13.5px] text-[#56605B] leading-relaxed">
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
      {/* PHẦN 02: CHÂN DUNG ĐỘI NGŨ QUẢN LÝ HỆ THỐNG VÙNG KHÁNH VÂN */}
      {/* =================================================================== */}
      <section id="doi-ngu-quan-ly" className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Section Header + Tier Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#DCD8CE]">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#008746] font-medium">
                <Users className="w-3.5 h-3.5" />
                <span>02 / CHÂN DUNG ĐỘI NGŨ QUẢN LÝ KẾ CẬN</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#181F1C] font-normal leading-tight">
                Những Người Đồng Hành{' '}
                <span className="italic text-[#0A3622]">Chuẩn Mực</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#56605B] leading-relaxed">
                Mỗi Quản lý trong Hệ thống Vùng Khánh Vân bước vào nghề từ một nền tảng chuyên môn riêng biệt, nhưng gặp nhau ở sự tận tâm, minh bạch và cam kết đồng hành đường dài cùng khách hàng.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { key: 'ALL', label: `Tất cả (${CURATED_LEADERS.length})` },
                {
                  key: 'Quản lý Phòng Kinh doanh',
                  label: 'Khối Trưởng Phòng (DM/SDM)',
                },
                {
                  key: 'Quản lý Nhóm Kinh doanh',
                  label: 'Khối Trưởng Nhóm (SUM/UM)',
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-3.5 py-2 text-xs rounded-[2px] border transition-all ${
                    activeFilter === tab.key
                      ? 'bg-[#0A3622] text-[#FAF9F5] border-[#0A3622] font-medium'
                      : 'bg-white text-[#56605B] border-[#DCD8CE] hover:border-[#0A3622] hover:text-[#181F1C]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Leader Editorial Feature Cards */}
          <div className="space-y-10 sm:space-y-14">
            {filteredLeaders.map((leader, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <motion.article
                  key={leader.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6 }}
                  className="bg-white border border-[#DCD8CE] rounded-[4px] overflow-hidden shadow-[0_20px_50px_-28px_rgba(10,54,34,0.18)]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Portrait Column */}
                    <div
                      className={`lg:col-span-4 bg-[#F2EFE9] relative aspect-[3/4] lg:aspect-auto ${
                        isReversed ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <img
                        src={leader.portrait}
                        alt={`${leader.displayName} — ${leader.roleTitle}`}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#FAF9F5]/95 backdrop-blur-xs text-[#181F1C] font-serif text-xs font-semibold tracking-[0.14em] rounded-[2px] border border-[#DCD8CE]">
                          {leader.index}
                        </span>
                        {leader.unitCode && (
                          <span className="px-2.5 py-1 bg-[#0A3622]/90 backdrop-blur-xs text-[#FAF9F5] text-[10px] uppercase tracking-[0.2em] font-medium rounded-[2px]">
                            Khu vực {leader.unitCode}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Editorial Dossier Column */}
                    <div
                      className={`lg:col-span-8 p-6 sm:p-9 lg:p-11 flex flex-col justify-between gap-6 ${
                        isReversed ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div className="space-y-5">
                        {/* Role & Name */}
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="px-2.5 py-0.5 bg-[#EBF2EE] text-[#0A3622] text-[11px] font-semibold uppercase tracking-[0.18em] rounded-[2px]">
                              {leader.roleCode}
                            </span>
                            <span className="text-xs uppercase tracking-[0.18em] text-[#008746] font-medium">
                              {leader.roleTitle}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-baseline gap-3">
                            <h3 className="font-serif text-3xl sm:text-4xl text-[#181F1C] font-medium leading-tight">
                              {leader.displayName}
                            </h3>
                            {leader.fullName &&
                              leader.fullName.toLowerCase() !==
                                leader.displayName.toLowerCase() && (
                                <span className="text-xs sm:text-sm text-[#858E89]">
                                  ({leader.fullName})
                                </span>
                              )}
                          </div>
                        </div>

                        {/* Prior Background & Experience Highlight Box */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 bg-[#FAF9F5] border border-[#ECE9E0] rounded-[3px]">
                          <div className="space-y-0.5">
                            <span className="text-[10px] uppercase tracking-[0.18em] text-[#858E89] block">
                              Nền tảng trước Manulife
                            </span>
                            <p className="text-xs sm:text-[13px] font-medium text-[#181F1C] leading-snug">
                              {leader.priorBackground}
                            </p>
                          </div>
                          <div className="space-y-0.5 sm:border-l sm:border-[#E4E1D8] sm:pl-4">
                            <span className="text-[10px] uppercase tracking-[0.18em] text-[#858E89] block">
                              Cột mốc & Dấu ấn
                            </span>
                            <p className="text-xs sm:text-[13px] font-medium text-[#0A3622] leading-snug">
                              {leader.experienceLabel}
                            </p>
                          </div>
                        </div>

                        {/* Quote */}
                        <blockquote className="border-l-2 border-[#B8975A] pl-4 py-0.5 font-serif italic text-xl sm:text-[22px] text-[#0A3622] leading-snug">
                          “{leader.quote}”
                        </blockquote>

                        {/* Polished Editorial Bio */}
                        <div className="space-y-3 text-xs sm:text-[14px] text-[#28322D] leading-[1.75]">
                          {leader.editorialBio.map((para, pIdx) => (
                            <p key={pIdx}>{para}</p>
                          ))}
                        </div>
                      </div>

                      {/* Achievements Footer */}
                      <div className="pt-4 border-t border-[#ECE9E0] space-y-2.5">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-[#0A3622]">
                          <Sparkles className="w-3.5 h-3.5 text-[#B8975A] shrink-0" />
                          <span>{leader.highlightNote}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {leader.badges.map((badge) => (
                            <span
                              key={badge}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF9F5] border border-[#DCD8CE] text-[11px] text-[#181F1C] rounded-[2px]"
                            >
                              <Award className="w-3 h-3 text-[#008746]" />
                              <span>{badge}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* CLOSING CALLOUT — ĐỒNG HÀNH CÙNG VÙNG KHÁNH VÂN */}
      {/* =================================================================== */}
      <section className="bg-[#0A3622] text-[#FAF9F5] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.26em] text-[#E8D3A6] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>HỆ THỐNG VÙNG KHÁNH VÂN • MANULIFE VIỆT NAM</span>
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white">
            Tìm kiếm điểm tựa tài chính chuẩn mực — hoặc một{' '}
            <span className="italic text-[#E8D3A6]">sự nghiệp xứng tầm?</span>
          </h2>

          <p className="text-xs sm:text-base text-[#D7E2DC] max-w-2xl mx-auto leading-relaxed font-light">
            Dù bạn đang mong muốn thiết lập kế hoạch bảo vệ gia sản bền vững cho gia đình, hay là nhân sự từ lĩnh vực Ngân hàng – Tài chính – Doanh nghiệp đang tìm kiếm một môi trường phát triển chuyên nghiệp, Vùng Khánh Vân luôn sẵn sàng lắng nghe và đồng hành cùng bạn.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="/#dong-hanh"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#FAF9F5] text-[#0A3622] hover:bg-[#E8D3A6] text-xs uppercase tracking-[0.18em] font-semibold rounded-[2px] transition-colors"
            >
              <span>Đặt Lịch Trò Chuyện 1-1 Cùng Khánh Vân</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="https://zalo.me/0931579771"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 border border-[#FAF9F5]/35 hover:border-[#FAF9F5] text-[#FAF9F5] text-xs uppercase tracking-[0.18em] font-medium rounded-[2px] transition-colors"
            >
              <span>Kết nối Zalo: 0931 579 771</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
