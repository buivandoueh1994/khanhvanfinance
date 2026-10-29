import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Menu,
  X,
} from 'lucide-react';

interface LightboxImage {
  src: string;
  fig: string;
  title: string;
  subtitle: string;
}

interface Article {
  id: string;
  index: string;
  category: 'Tài chính & Gia sản' | 'Phát triển Sự nghiệp' | 'Bố Mẹ Đi Làm' | 'Kỷ luật Bản thân';
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}

const ARTICLES: Article[] = [
  {
    id: 'chuan-bi-tai-chinh-truoc-khi-buoc-ra-vung-an-toan',
    index: '01',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 10, 2026',
    readTime: '5 phút đọc',
    title: 'Chuẩn bị gì về tài chính trước khi bước ra khỏi vùng an toàn công sở?',
    excerpt:
      'Năm 2018, khi quyết định rời vị trí quản lý ổn định tại ngân hàng quốc tế ANZ, sự chuyển dịch không bắt đầu bằng cảm tính mà bằng một kế hoạch dòng tiền kỷ luật.',
    content: [
      'Nhiều anh chị quản lý cấp trung ở ngân hàng thường đặt câu hỏi: “Làm sao đủ can đảm rời bỏ mức thu nhập cố định rất tốt ở ngân hàng ngoại để bắt đầu hành trình tự chủ?” Câu trả lời nằm ở sự chuẩn bị tài chính kỹ lưỡng trước khi đưa ra quyết định.',
      'Đầu tiên là Quỹ Dự Phòng Thanh Khoản tối thiểu từ 6 đến 12 tháng chi phí sinh hoạt thiết yếu của gia đình. Khi biết chắc rằng dù 6 tháng đầu thu nhập mới chưa ổn định, nhịp sống của con cái và gia đình không bị xáo trộn, người làm nghề sẽ giữ được sự điềm tĩnh và lòng tự trọng — không bao giờ phải tư vấn vội vàng vì áp lực ngắn hạn.',
      'Tiếp theo là tách bạch dòng tiền sinh hoạt gia đình và nguồn lực đầu tư cho sự nghiệp mới. Sự minh bạch về con số giúp người bạn đời hoàn toàn an tâm và trở thành hậu phương vững chắc nhất.',
      'Sau cùng, vốn liếng lớn nhất mang theo khi rời công sở không phải là số dư tài khoản, mà là chữ “Tín” đã tích lũy với đồng nghiệp và khách hàng cũ.',
    ],
    keyTakeaways: [
      'Thiết lập quỹ dự phòng 6–12 tháng chi phí cố định trước khi chuyển hướng.',
      'Giữ vững chuẩn mực đạo đức tư vấn nhờ nền tảng tài chính chủ động.',
      'Trân trọng uy tín cá nhân ngay từ công việc hiện tại.',
    ],
  },
  {
    id: 'xay-dung-chu-tin-trong-cong-viec',
    index: '02',
    category: 'Phát triển Sự nghiệp',
    date: 'Tháng 10, 2026',
    readTime: '6 phút đọc',
    title: 'Giá trị của chữ “Tín” và sức mạnh từ lời giới thiệu tự nhiên',
    excerpt:
      'Ba tháng đầu tiên chuyển sang bộ phận kinh doanh tại ANZ mà không có khách hàng đã dạy lại bài học sâu sắc nhất về sự tử tế từ những việc nhỏ nhất.',
    content: [
      'Khi mới từ bộ phận Vận hành (Operations) chuyển sang bộ phận Kinh doanh (Sales) tại ANZ, 90 ngày đầu tiên trôi qua trong áp lực nặng nề vì không có khách hàng mở mới. Bản thân lúc đó không có sự hoạt ngôn của một nhân viên bán hàng lâu năm.',
      'Bước ngoặt đến vào tháng thứ tư, khi chính các đồng nghiệp ở bộ phận thẩm định, vận hành và các đối tác cũ bắt đầu chủ động giới thiệu khách hàng. Lý do đến từ những năm làm hậu cần trước đó: mỗi hồ sơ qua tay đều được xử lý rõ ràng, đúng hẹn và hỗ trợ đồng nghiệp tận tình.',
      'Trải nghiệm đó định hình triết lý làm nghề suốt gần hai thập kỷ: Không cần là người nói hay nhất trong phòng, nhưng hãy là người đáng tin cậy nhất. Khi khách hàng cảm nhận được sự an toàn của gia đình họ được đặt lên trên chỉ tiêu doanh số, họ sẽ tự nguyện gắn bó dài lâu.',
    ],
    keyTakeaways: [
      'Uy tín được bồi đắp từ thái độ làm việc chỉn chu khi chưa ai chú ý.',
      'Tỷ lệ duy trì hợp đồng phản ánh chính xác nhất đạo đức của người cố vấn.',
      'Sự chân thành tạo nên mạng lưới giới thiệu bền vững hơn mọi kỹ thuật bán hàng.',
    ],
  },
  {
    id: '3-bieu-hien-cua-nguoi-quan-ly-gioi',
    index: '03',
    category: 'Phát triển Sự nghiệp',
    date: 'Tháng 09, 2026',
    readTime: '5 phút đọc',
    title: 'Ba phẩm chất của người quản lý dẫn dắt bằng sự thấu cảm',
    excerpt:
      'Đồng hành cùng 64 Quản lý cấp cao và hơn 500 nhân sự, thước đo của người dẫn đầu không phải là làm thay mọi việc, mà là đánh thức thế mạnh riêng của từng cộng sự.',
    content: [
      'Sai lầm phổ biến của những người mới bước lên vị trí quản lý là cố gắng áp đặt một khuôn mẫu làm việc giống hệt mình lên toàn bộ đội ngũ. Thực tế phát triển con người cho thấy mỗi cá nhân có một nhịp điệu và thế mạnh độc bản:',
      'Thứ nhất, lắng nghe để đọc vị thế mạnh riêng: Có người sắc bén về phân tích cấu trúc tài chính, có người sâu sắc trong việc thấu cảm và chăm sóc khách hàng. Người quản lý tinh tế biết đặt đúng người vào đúng vị trí.',
      'Thứ hai, kỷ luật làm gương: Một tập thể văn minh vận hành dựa trên những gì họ quan sát thấy từ người dẫn đầu mỗi ngày — từ sự chuẩn xác về giờ giấc đến thái độ điềm tĩnh trước thử thách.',
      'Thứ ba, lấy sự trưởng thành của cộng sự làm thành tựu: Hạnh phúc lớn nhất của người làm công tác quản trị là chứng kiến những người đi cùng mình lần lượt bước lên những nấc thang cao hơn.',
    ],
    keyTakeaways: [
      'Tôn trọng cá tính và phát huy thế mạnh riêng biệt của từng nhân sự.',
      'Truyền cảm hứng thông qua hành động và kỷ luật thực tế.',
      'Trao quyền đi kèm hệ thống quy trình đào tạo bài bản.',
    ],
  },
  {
    id: 'can-bang-cong-viec-va-gia-dinh-bo-me-di-lam',
    index: '04',
    category: 'Bố Mẹ Đi Làm',
    date: 'Tháng 09, 2026',
    readTime: '4 phút đọc',
    title: 'Nghệ thuật “Hiện diện trọn vẹn” giữa sự nghiệp và tổ ấm',
    excerpt:
      'Cân bằng không có nghĩa là chia đôi quỹ thời gian một cách cơ học, mà là sự toàn tâm toàn ý cho nơi mình đang thuộc về ở từng khoảnh khắc.',
    content: [
      'Phụ nữ ở vị trí quản lý thường đối diện với nỗi trăn trở vô hình: khi ở văn phòng lại nghĩ về con cái, khi ở bên con lại bận tâm chuyện công việc. Giải pháp thực sự nằm ở nguyên tắc “Hiện diện trọn vẹn”.',
      'Trong khung giờ làm việc và đào tạo, toàn bộ sự tập trung được dành cho đội ngũ và khách hàng thông qua việc phân bổ thời gian (Time-blocking) nghiêm ngặt. Và khi trở về nhà vào buổi tối, việc chủ động gác lại thiết bị công việc để lắng nghe câu chuyện nhỏ của hai con giúp mỗi phút giây bên gia đình đều thực sự có chiều sâu.',
      'Hơn hết, sự chia sẻ thẳng thắn với người bạn đời về mục tiêu và áp lực công việc giúp biến gia đình thành những người đồng hành thấu hiểu.',
    ],
    keyTakeaways: [
      'Quản trị thời gian theo khung giờ tập trung cao độ.',
      'Đề cao chất lượng sự hiện diện bên chồng con thay vì số giờ hình thức.',
      'Đồng thuận cùng người bạn đời để giữ gìn sự bình an trong gia đình.',
    ],
  },
  {
    id: '3-nguyen-tac-quan-tri-dong-tien-gia-dinh',
    index: '05',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 08, 2026',
    readTime: '5 phút đọc',
    title: 'Ba nguyên tắc bảo toàn dòng tiền gia đình từ góc nhìn cựu Banker',
    excerpt:
      'Tạo ra thu nhập cao là năng lực kiến tạo, nhưng thiết lập cấu trúc bảo vệ tương lai học vấn của con cái trước biến cố mới là nền tảng của sự thịnh vượng bền vững.',
    content: [
      'Từ kinh nghiệm 8 năm làm việc tại ANZ, khi tiếp xúc với nhiều hồ sơ tài sản của các gia đình và chủ doanh nghiệp, một điểm dễ nhận thấy là nhiều người rất xuất sắc trong việc gia tăng tài sản nhưng lại để trống lớp phòng thủ rủi ro.',
      'Nguyên tắc đầu tiên là xây dựng lớp bảo vệ thu nhập của người trụ cột trước khi mở rộng sang các danh mục đầu tư biến động cao. Quỹ học vấn của con cái và nguồn lực chăm sóc y tế gia đình cần được đặt ở vùng an toàn tuyệt đối.',
      'Nguyên tắc thứ hai là tính vừa vặn: Một giải pháp hoạch định chuẩn mực phải phù hợp tự nhiên với dòng tiền dài hạn của gia đình (Đúng và Đủ), đảm bảo sự duy trì nhẹ nhàng qua 15–20 năm.',
      'Nguyên tắc thứ ba là rà soát định kỳ hàng năm để điều chỉnh cấu trúc tài chính tương ứng với từng giai đoạn trưởng thành của gia đình.',
    ],
    keyTakeaways: [
      'Ưu tiên thiết lập tầng bảo vệ dòng tiền trụ cột và tương lai học vấn của con.',
      'Hoạch định dựa trên tỷ lệ cân đối, bền vững trong dài hạn.',
      'Định kỳ đánh giá lại cấu trúc tài sản cùng cố vấn chuyên môn.',
    ],
  },
  {
    id: 'ky-luat-phong-tap-va-su-ben-bi',
    index: '06',
    category: 'Kỷ luật Bản thân',
    date: 'Tháng 08, 2026',
    readTime: '4 phút đọc',
    title: 'Kỷ luật rèn luyện thể chất và bài học về sức bền của người lãnh đạo',
    excerpt:
      'Một tư duy minh mẫn và khả năng ra quyết định điềm tĩnh luôn cần được nuôi dưỡng trong một cơ thể khỏe mạnh, dẻo dai.',
    content: [
      'Cường độ làm việc của một Giám đốc Vùng với các lịch trình đào tạo, cố vấn và điều hành đòi hỏi nền tảng thể lực bền bỉ. Việc duy trì lịch tập luyện thể thao đều đặn mỗi tuần không chỉ là chăm sóc sức khỏe, mà là cách rèn luyện tính kỷ luật tự giác.',
      'Thể thao và quản trị có cùng một quy luật: Không có kết quả bền vững nào được tạo ra chỉ sau một đêm. Sự tiến bộ đến từ việc lặp lại những thói quen đúng đắn ngay cả khi không có ai giám sát.',
      'Khi làm chủ được nhịp sinh học và năng lượng cá nhân, người lãnh đạo mới có thể lan tỏa sự điềm tĩnh và nguồn cảm hứng tích cực cho tập thể.',
    ],
    keyTakeaways: [
      'Thể lực bền bỉ là điểm tựa cho sự minh mẫn trong quản trị.',
      'Sự kiên trì đều đặn mỗi ngày tạo nên khác biệt lớn trong dài hạn.',
      'Làm gương về lối sống cân bằng và kỷ luật tự giác.',
    ],
  },
];

const BOOKS = [
  {
    num: '01',
    title: 'Good to Great — Từ Tốt Đến Vĩ Đại',
    author: 'Jim Collins',
    theme: 'Triết lý Lãnh đạo',
    note: 'Hình mẫu “Lãnh đạo Cấp độ 5” — sự kết hợp giữa lòng khiêm nhường cá nhân và ý chí chuyên nghiệp kiên định, bắt đầu từ việc chọn đúng người đồng hành.',
  },
  {
    num: '02',
    title: 'The Psychology of Money — Tâm Lý Học Về Tiền',
    author: 'Morgan Housel',
    theme: 'Quản trị Gia sản',
    note: 'Sự thịnh vượng dài hạn không nằm ở những công thức phức tạp, mà ở sự điềm tĩnh, kỷ luật hành vi và việc luôn giữ một biên độ an toàn cho gia đình.',
  },
  {
    num: '03',
    title: 'Atomic Habits — Thay Đổi Tí Hon, Hiệu Quả Bất Ngờ',
    author: 'James Clear',
    theme: 'Kỷ luật Bản thân',
    note: 'Cốt lõi của phương châm “Đi chắc để đi xa”: Mọi cột mốc lớn đều được kiến tạo từ hệ thống những thói quen chuẩn mực được lặp lại mỗi ngày.',
  },
];

export function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);

  const [leadEmail, setLeadEmail] = useState('');
  const [leadSent, setLeadSent] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    topic: 'Đồng hành Phát triển Quản lý Kế cận (Mentorship F1)',
    background: 'Ngân hàng / Tài chính (Banker)',
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Câu chuyện', href: '#cau-chuyen' },
    { label: 'Góc nhìn', href: '#goc-nhin' },
    { label: 'Tủ sách', href: '#tu-sach' },
    { label: 'Cuộc sống', href: '#cuoc-song' },
    { label: 'Đồng hành', href: '#dong-hanh' },
  ];

  const categories = [
    'Tất cả',
    'Tài chính & Gia sản',
    'Phát triển Sự nghiệp',
    'Bố Mẹ Đi Làm',
    'Kỷ luật Bản thân',
  ];

  const filteredArticles =
    selectedCategory === 'Tất cả'
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === selectedCategory);

  const metrics = [
    { figure: '08+', unit: 'Năm tại ANZ Bank', detail: 'Quản lý tài sản & Tín dụng quốc tế' },
    { figure: 'Top 1', unit: 'Toàn Quốc ANZ', detail: 'Vô địch doanh số thế chấp năm 2017' },
    { figure: 'Top 1', unit: 'Lãnh Đạo Châu Á', detail: 'Asia Trusted Awards Winner 2021' },
    { figure: '64', unit: 'Quản Lý Cấp Cao', detail: 'Đội ngũ lãnh đạo kế cận trực tiếp' },
    { figure: '500+', unit: 'Nhân Sự Hệ Thống', detail: 'Vận hành chuẩn mực & gắn kết' },
    { figure: 'Top 1', unit: 'Tỷ Lệ Duy Trì', detail: 'Bảo chứng niềm tin khách hàng dài hạn' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#181F1C]">
      {/* 1. MINIMALIST EDITORIAL HEADER */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FAF9F5]/92 backdrop-blur-md border-b border-[#E4E1D8] py-4'
            : 'bg-[#FAF9F5] border-b border-[#E4E1D8]/60 py-6'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3.5 shrink-0 whitespace-nowrap group">
            <span className="w-[3px] h-5 bg-[#008746] inline-block" />
            <span className="font-serif text-xl sm:text-2xl font-medium tracking-[0.14em] uppercase text-[#181F1C]">
              Khánh Vân
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-[12px] uppercase tracking-[0.18em] text-[#56605B] hover:text-[#0A3622] transition-colors font-normal"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden sm:flex items-center shrink-0">
            <a
              href="#lien-he"
              className="whitespace-nowrap inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#0A3622] border-b border-[#0A3622] pb-1 hover:text-[#008746] hover:border-[#008746] transition-colors font-medium"
            >
              <span>Kết nối riêng</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#181F1C]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#FAF9F5] border-b border-[#E4E1D8] overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-5">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs uppercase tracking-[0.2em] text-[#181F1C] py-1.5 border-b border-[#E4E1D8]/60"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#lien-he"
                  onClick={() => setMobileMenuOpen(false)}
                  className="pt-2 text-xs uppercase tracking-[0.2em] text-[#008746] font-medium"
                >
                  Kết nối riêng &rarr;
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. EDITORIAL HERO — GENEROUS NEGATIVE SPACE, SLENDER SERIF, UNBOXED PHOTOGRAPHY */}
      <section className="pt-36 sm:pt-44 lg:pt-48 pb-24 lg:pb-32">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-end">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#008746] font-medium">
                  Nhà Lãnh Đạo &bull; Cố Vấn Gia Sản &bull; Người Truyền Lửa &bull; Người Mẹ
                </p>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-[68px] font-normal tracking-tight text-[#181F1C] leading-[1.06]">
                  Nguyễn Thị Khánh Vân
                </h1>
              </div>

              <p className="font-serif italic text-2xl sm:text-[28px] text-[#3B443F] font-normal leading-[1.4] max-w-xl">
                “Đi chắc để đi xa — Kiến tạo tốc độ từ sự chuẩn mực.”
              </p>

              <div className="h-[1px] w-20 bg-[#0A3622]/30" />

              <p className="text-[15px] sm:text-base text-[#56605B] leading-[1.9] font-light max-w-xl">
                Khởi đầu từ 8 năm quản lý tài sản tại ngân hàng quốc tế ANZ đến vị thế Giám đốc Vùng Cấp cao (DRD+) tại Manulife Việt Nam và giải thưởng Nhà Quản lý Xuất sắc nhất Châu Á (2021). Hành trình gần hai thập kỷ của Khánh Vân được dẫn dắt bởi niềm tin rằng sự minh bạch, kỷ luật và lòng thấu cảm là nền tảng bền vững nhất của mọi di sản.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-10">
                <a
                  href="#cau-chuyen"
                  className="inline-flex items-center gap-3 px-7 py-4 bg-[#0A3622] hover:bg-[#008746] text-white text-[11px] uppercase tracking-[0.22em] font-normal transition-colors duration-300"
                >
                  <span>Hành trình sự nghiệp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#goc-nhin"
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#181F1C] hover:text-[#008746] border-b border-[#181F1C]/40 hover:border-[#008746] pb-1.5 transition-colors"
                >
                  <span>Đọc góc nhìn &amp; chia sẻ</span>
                </a>
              </div>
            </div>

            {/* Right 5 Cols: Unboxed Editorial Portrait */}
            <div className="lg:col-span-5">
              <figure
                onClick={() =>
                  setLightbox({
                    src: '/images/SuKien_ChiVanCungCEO_ChupAnhTiecToi.jpg',
                    fig: 'FIG. 01 — LEADERSHIP',
                    title: 'Tiệc Tối Cùng Tổng Giám Đốc (CEO) Manulife',
                    subtitle:
                      'Chị Nguyễn Thị Khánh Vân cùng CEO Manulife trong buổi gặp gỡ chiến lược.',
                  })
                }
                className="cursor-pointer group"
              >
                <div className="overflow-hidden aspect-[4/4.9] bg-[#EAE7DF]">
                  <img
                    src="/images/SuKien_ChiVanCungCEO_ChupAnhTiecToi.jpg"
                    alt="Chị Nguyễn Thị Khánh Vân cùng CEO Manulife"
                    className="w-full h-full object-cover object-[50%_82%] group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                  />
                </div>
                <figcaption className="mt-4 pt-3 border-t border-[#E4E1D8] flex items-baseline justify-between gap-4 text-[11px] tracking-[0.12em] uppercase text-[#858E89]">
                  <span>FIG. 01 &mdash; Cùng Tổng Giám Đốc (CEO) Manulife</span>
                  <span className="group-hover:text-[#0A3622] transition-colors">Xem ảnh</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITECTURAL HAIRLINE METRICS (NO CHUNKY BOXES) */}
      <section className="border-t border-b border-[#E4E1D8] bg-[#F2EFE9]/60 py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-8">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className={`${
                  idx !== 0 ? 'lg:border-l lg:border-[#DCD8CE] lg:pl-7' : ''
                } space-y-2`}
              >
                <div className="font-serif text-4xl sm:text-[44px] font-normal text-[#0A3622] leading-none tracking-tight">
                  {m.figure}
                </div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#181F1C] font-medium pt-1">
                  {m.unit}
                </div>
                <p className="text-xs text-[#56605B] font-light leading-relaxed">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CÂU CHUYỆN SỰ NGHIỆP — EDITORIAL ESSAY & GALLERY LAYOUT */}
      <section id="cau-chuyen" className="py-28 lg:py-36 border-b border-[#E4E1D8]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          {/* Section Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24 lg:mb-32 items-end">
            <div className="lg:col-span-4">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] block mb-3">
                01 / HÀNH TRÌNH SỰ NGHIỆP
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#181F1C] leading-[1.15]">
                Từ Chuẩn Mực Ngân Hàng Quốc Tế Đến Đỉnh Cao Châu Á
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="font-serif italic text-2xl sm:text-[26px] text-[#3B443F] leading-[1.5]">
                “Làm tốt nhất từ những việc nhỏ nhất mỗi ngày. Khi bạn đủ chân thành và chuẩn mực, những người đồng hành tử tế sẽ tự tìm đến.”
              </p>
            </div>
          </div>

          {/* Chapter I */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28 lg:mb-36">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#858E89] block">
                CHƯƠNG I &mdash; 2009 ĐẾN 2017
              </span>
              <h3 className="font-serif text-3xl sm:text-[34px] font-normal text-[#181F1C] leading-[1.22]">
                Nền tảng ANZ Bank và bài học để đời về chữ “Tín”
              </h3>
              <p className="text-[15px] text-[#56605B] leading-[1.9] font-light">
                Trước khi vươn lên vị trí Top 1 Toàn Quốc ANZ năm 2017 mảng Tín dụng &amp; Thế chấp mua nhà, Khánh Vân từng trải qua 3 tháng đầu tiên chuyển sang bộ phận kinh doanh mà không có nổi một khách hàng, đứng trước nguy cơ bị cắt mã số.
              </p>
              <p className="text-[15px] text-[#56605B] leading-[1.9] font-light">
                Không chọn cách bán hàng bất chấp, chính uy tín, sự cẩn trọng và tận tâm suốt những năm làm Vận hành (Operations) trước đó đã khiến đồng nghiệp và đối tác chủ động giới thiệu khách hàng cho chị. Bài học về sức mạnh của sự tử tế trở thành kim chỉ nam xuyên suốt sự nghiệp của Vân.
              </p>
            </div>

            <div className="lg:col-span-7">
              <figure
                onClick={() =>
                  setLightbox({
                    src: '/images/SanKhau_ChiVan_VinhDanhTop1DRDFYP2024.jpg',
                    fig: 'FIG. 02 — HALL OF EXCELLENCE',
                    title: 'Vinh Danh Top 1 Quản Lý Cấp Cao DRD+ (2024)',
                    subtitle: 'Dẫn đầu tỷ lệ hoàn thành chỉ tiêu toàn hệ thống.',
                  })
                }
                className="cursor-pointer group"
              >
                <div className="overflow-hidden aspect-[16/10] bg-[#EAE7DF]">
                  <img
                    src="/images/SanKhau_ChiVan_VinhDanhTop1DRDFYP2024.jpg"
                    alt="Vinh danh Top 1 Quản lý cấp cao DRD+ Nguyễn Thị Vân"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                  />
                </div>
                <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] flex justify-between text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                  <span>FIG. 02 &mdash; Vinh danh Top 1 Quản lý Cấp cao DRD+ (2024)</span>
                  <span className="group-hover:text-[#0A3622]">Phóng to</span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Chapter II & III Asymmetric Editorial Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Landscape Retention Photo + Chapter II Text */}
            <div className="lg:col-span-6 space-y-12">
              <figure
                onClick={() =>
                  setLightbox({
                    src: '/images/SanKhau_ChiVan_NhanGiaiTop1DuyTriHopDong2025.jpg',
                    fig: 'FIG. 03 — CLIENT TRUST',
                    title: 'Top 1 DRD+ Dẫn Đầu Tỷ Lệ Duy Trì Hợp Đồng Năm 2 (2025)',
                    subtitle: 'Minh chứng cao nhất cho chất lượng tư vấn chuẩn mực và dài hạn.',
                  })
                }
                className="cursor-pointer group"
              >
                <div className="overflow-hidden aspect-[16/10] bg-[#EAE7DF]">
                  <img
                    src="/images/SanKhau_ChiVan_NhanGiaiTop1DuyTriHopDong2025.jpg"
                    alt="Top 1 DRD+ Tỷ lệ duy trì hợp đồng 2025"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                  />
                </div>
                <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] flex justify-between text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                  <span>FIG. 03 &mdash; Top 1 DRD+ Tỷ lệ Duy trì Hợp đồng (2025)</span>
                  <span className="group-hover:text-[#0A3622]">Phóng to</span>
                </figcaption>
              </figure>

              <div className="space-y-5 pt-2">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#858E89] block">
                  CHƯƠNG II &mdash; BƯỚC NGOẶT 2018
                </span>
                <h3 className="font-serif text-3xl font-normal text-[#181F1C] leading-[1.25]">
                  Bước ra khỏi vùng an toàn &amp; lấy tỷ lệ duy trì làm thước đo danh dự
                </h3>
                <p className="text-[15px] text-[#56605B] leading-[1.9] font-light">
                  Rời môi trường ngân hàng nước ngoài năm 2018 để kiến tạo sự nghiệp độc lập tại Manulife Việt Nam, Khánh Vân mang theo kỷ luật kiểm soát rủi ro của một Banker: tư vấn đúng và đủ, lấy sự gắn bó dài hạn của khách hàng làm danh dự nghề nghiệp.
                </p>
              </div>
            </div>

            {/* Right Column: Chapter III Text + Vertical Trophy Portrait */}
            <div className="lg:col-span-5 lg:col-start-8 space-y-12">
              <div className="space-y-5">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#008746] block">
                  CHƯƠNG III &mdash; 2018 ĐẾN NAY
                </span>
                <h3 className="font-serif text-3xl font-normal text-[#181F1C] leading-[1.25]">
                  Nhà Quản lý Xuất sắc nhất Châu Á &amp; hệ sinh thái 500+ nhân sự
                </h3>
                <p className="text-[15px] text-[#56605B] leading-[1.9] font-light">
                  Năm 2021, chị trở thành đại diện duy nhất tại Việt Nam đoạt giải thưởng “Nhà Quản lý Xuất sắc nhất Châu Á” (Asia Trusted Life Agent &amp; Advisers Awards), đồng thời trực tiếp ươm mầm 64 Quản lý cấp cao và hơn 500 cộng sự.
                </p>
              </div>

              <figure
                onClick={() =>
                  setLightbox({
                    src: '/images/SanKhau_ChiVan_NhanGiaiTop1FYP2025.jpg',
                    fig: 'FIG. 04 — PINNACLE 2025',
                    title: 'Top 1 DRD+ Quản Lý Cấp Cao Dẫn Đầu Chỉ Tiêu FYP (2025)',
                    subtitle: 'Khoảnh khắc giơ cao cúp vinh danh cùng tập thể lãnh đạo.',
                  })
                }
                className="cursor-pointer group"
              >
                <div className="overflow-hidden aspect-[3/3.7] bg-[#EAE7DF]">
                  <img
                    src="/images/SanKhau_ChiVan_NhanGiaiTop1FYP2025.jpg"
                    alt="Chị Khánh Vân nhận cúp Top 1 DRD+ năm 2025"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                  />
                </div>
                <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] flex justify-between text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                  <span>FIG. 04 &mdash; Top 1 DRD+ Dẫn đầu toàn hệ thống (2025)</span>
                  <span className="group-hover:text-[#0A3622]">Phóng to</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GÓC NHÌN & LỜI KHUYÊN — MINIMALIST EDITORIAL JOURNAL (NO REPEATED PHOTO THUMBNAILS!) */}
      <section id="goc-nhin" className="py-28 lg:py-36 bg-[#F2EFE9]/50 border-b border-[#E4E1D8]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] block mb-3">
                02 / GÓC NHÌN &amp; BÀI VIẾT
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#181F1C]">
                Chia Sẻ Về Tài Chính, Sự Nghiệp &amp; Cuộc Sống
              </h2>
            </div>

            {/* Minimalist Filter Tabs — Single Crisp Row */}
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-6 border-b border-[#DCD8CE] pb-2 shrink-0">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap text-[11px] uppercase tracking-[0.16em] pb-2 -mb-[9px] transition-colors ${
                      active
                        ? 'text-[#0A3622] border-b-2 border-[#0A3622] font-medium'
                        : 'text-[#858E89] hover:text-[#181F1C] font-light'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clean Editorial Index Rows (Like Harvard Business Review / Kinfolk) */}
          <div className="border-t border-[#DCD8CE]">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="group py-9 sm:py-11 border-b border-[#DCD8CE] grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline cursor-pointer hover:bg-[#FAF9F5]/80 transition-colors px-2 sm:px-4"
              >
                <div className="lg:col-span-2 flex items-center gap-4">
                  <span className="font-serif text-2xl text-[#858E89] group-hover:text-[#008746] transition-colors">
                    {article.index}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#008746]">
                    {article.category}
                  </span>
                </div>

                <div className="lg:col-span-5">
                  <h3 className="font-serif text-2xl sm:text-[28px] font-normal text-[#181F1C] group-hover:text-[#0A3622] leading-[1.25] transition-colors">
                    {article.title}
                  </h3>
                </div>

                <div className="lg:col-span-4">
                  <p className="text-sm text-[#56605B] font-light leading-[1.8] line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                <div className="lg:col-span-1 flex lg:justify-end items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#181F1C] group-hover:text-[#008746]">
                  <span>Đọc</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TỦ SÁCH QUẢN TRỊ & ẤN PHẨM CẨM NANG (BOOK CLUB & EDITORIAL LEAD MAGNET) */}
      <section id="tu-sach" className="py-28 lg:py-36 border-b border-[#E4E1D8]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            {/* Left 7 Cols: Book Club */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] block mb-3">
                  03 / TỦ SÁCH QUẢN TRỊ
                </span>
                <h2 className="font-serif text-4xl sm:text-[44px] font-normal text-[#181F1C]">
                  Những Cuốn Sách Định Hình Tư Duy
                </h2>
              </div>

              <div className="divide-y divide-[#E4E1D8] border-t border-b border-[#E4E1D8]">
                {BOOKS.map((book) => (
                  <div key={book.num} className="py-8 grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-3">
                      <span className="font-serif text-xl text-[#858E89] block">{book.num}</span>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-[#008746] mt-1 block">
                        {book.theme}
                      </span>
                    </div>
                    <div className="sm:col-span-9 space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-serif text-2xl font-normal text-[#181F1C]">
                          {book.title}
                        </h3>
                        <span className="text-xs text-[#858E89] italic">{book.author}</span>
                      </div>
                      <p className="text-sm text-[#56605B] font-light leading-[1.85]">
                        {book.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Understated Architectural Lead Magnet */}
            <div className="lg:col-span-5 lg:mt-16 bg-[#F2EFE9] p-8 sm:p-12 border border-[#E4E1D8] space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#008746] block">
                  ẤN PHẨM ĐỘC QUYỀN &bull; MIỄN PHÍ
                </span>
                <h3 className="font-serif text-3xl font-normal text-[#181F1C] leading-[1.25]">
                  Cẩm Nang Hoạch Định Dòng Tiền Gia Đình &amp; Chuyển Dịch Sự Nghiệp
                </h3>
              </div>

              <p className="text-sm text-[#56605B] font-light leading-[1.85]">
                Tài liệu tổng hợp bảng kiểm tra cấu trúc bảo vệ tài sản gia đình chuẩn ngân hàng quốc tế và lộ trình 90 ngày đầu tiên chuyển sang vị trí Quản lý Tài chính độc lập.
              </p>

              <div className="space-y-3 border-t border-[#DCD8CE] pt-6 text-xs text-[#3B443F] font-light">
                <p>I. Năm tầng tháp bảo toàn dòng tiền và quỹ học vấn cho con cái.</p>
                <p>II. Lộ trình chuyển dịch sự nghiệp dành cho cựu Banker &amp; Quản lý.</p>
              </div>

              {leadSent ? (
                <div className="pt-4 border-t border-[#008746]/40 text-sm text-[#0A3622]">
                  Cảm ơn bạn. Ấn phẩm PDF đã được ghi nhận gửi tới địa chỉ{' '}
                  <span className="underline">{leadEmail}</span>.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (leadEmail.trim()) setLeadSent(true);
                  }}
                  className="space-y-6 pt-2"
                >
                  <input
                    type="email"
                    required
                    placeholder="Địa chỉ Email nhận tài liệu..."
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="editorial-input"
                  />
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#0A3622] hover:bg-[#008746] text-white text-[11px] uppercase tracking-[0.22em] transition-colors"
                  >
                    Nhận ấn phẩm qua Email
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. ĐIỂM TỰA GIA ĐÌNH & PHONG CÁCH SỐNG (UNBOXED EDITORIAL GALLERY) */}
      <section id="cuoc-song" className="py-28 lg:py-36 border-b border-[#E4E1D8]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
            <div className="lg:col-span-5">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] block mb-3">
                04 / ĐIỂM TỰA CUỘC SỐNG
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#181F1C] leading-[1.15]">
                Người Phụ Nữ Trong Gia Đình &amp; Sự Cân Bằng
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 space-y-4">
              <p className="font-serif italic text-2xl text-[#3B443F] leading-[1.5]">
                “Đỉnh cao sự nghiệp không nằm ở những chiếc cúp vinh danh, mà là sự bình an khi trở về nhà bên chồng và hai con.”
              </p>
              <p className="text-sm text-[#56605B] font-light leading-[1.85]">
                Phía sau những cột mốc dẫn đầu Châu Á là sự thấu hiểu và đồng hành thầm lặng của người chồng tri kỷ — người luôn ủng hộ chị bước ra khỏi vùng an toàn để sống trọn với đam mê.
              </p>
            </div>
          </div>

          {/* Family Diptych — Unboxed, Equal Height */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/GiaDinh_ChiVan_NgoiSofaPhongKhach.jpg',
                  fig: 'FIG. 05 — FAMILY SANCTUARY',
                  title: 'Tổ Ấm Bình Yên Bên Chồng Và Hai Con',
                  subtitle: 'Điểm tựa tinh thần lớn nhất phía sau hành trình sự nghiệp.',
                })
              }
              className="lg:col-span-7 cursor-pointer group"
            >
              <div className="overflow-hidden h-[320px] sm:h-[420px] lg:h-[460px] bg-[#EAE7DF]">
                <img
                  src="/images/GiaDinh_ChiVan_NgoiSofaPhongKhach.jpg"
                  alt="Gia đình chị Khánh Vân tại phòng khách"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] flex justify-between text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                <span>FIG. 05 &mdash; Tổ ấm bên người bạn đời và hai con</span>
                <span className="group-hover:text-[#0A3622]">Xem ảnh</span>
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/GiaDinh_ChiVan_AuYemConBenSanVuon.jpg',
                  fig: 'FIG. 06 — MOTHERHOOD',
                  title: 'Trọn Vẹn Từng Khoảnh Khắc Bên Con',
                  subtitle: 'Làm chủ thời gian để đồng hành cùng tuổi thơ của các con.',
                })
              }
              className="lg:col-span-5 cursor-pointer group"
            >
              <div className="overflow-hidden h-[320px] sm:h-[420px] lg:h-[460px] bg-[#EAE7DF]">
                <img
                  src="/images/GiaDinh_ChiVan_AuYemConBenSanVuon.jpg"
                  alt="Gia đình chị Khánh Vân bên sân vườn"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] flex justify-between text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                <span>FIG. 06 &mdash; Khoảnh khắc yêu thương ngày thường</span>
                <span className="group-hover:text-[#0A3622]">Xem ảnh</span>
              </figcaption>
            </figure>
          </div>

          {/* 3 Lifestyle Photographs — Clean Unboxed Triptych */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/DuLich_ChiVan_BayKhinhKhiCauBinhMinh.jpg',
                  fig: 'FIG. 07 — PERSPECTIVE',
                  title: 'Tầm Nhìn Rộng Mở & Khát Vọng Tự Do',
                  subtitle: 'Đón bình minh trên khinh khí cầu tại Cappadocia.',
                })
              }
              className="cursor-pointer group"
            >
              <div className="overflow-hidden aspect-[4/4.8] bg-[#EAE7DF]">
                <img
                  src="/images/DuLich_ChiVan_BayKhinhKhiCauBinhMinh.jpg"
                  alt="Chị Khánh Vân đón bình minh trên khinh khí cầu"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                FIG. 07 &mdash; Tầm nhìn rộng mở &amp; trải nghiệm thế giới
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/DoiThuong_ChiVan_SelfiePhongTapGym.jpg',
                  fig: 'FIG. 08 — DISCIPLINE',
                  title: 'Kỷ Luật Rèn Luyện Thể Lực Bền Bỉ',
                  subtitle: 'Duy trì nguồn năng lượng dẻo dai thông qua luyện tập mỗi tuần.',
                })
              }
              className="cursor-pointer group"
            >
              <div className="overflow-hidden aspect-[4/4.8] bg-[#EAE7DF]">
                <img
                  src="/images/DoiThuong_ChiVan_SelfiePhongTapGym.jpg"
                  alt="Chị Khánh Vân rèn luyện thể thao"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                FIG. 08 &mdash; Kỷ luật bản thân &amp; rèn luyện thể chất
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/DuLich_ChiVanCungChong_ChupAnhBenCangBien.jpg',
                  fig: 'FIG. 09 — COMPANIONSHIP',
                  title: 'Đồng Hành Bền Vững Cùng Người Bạn Đời',
                  subtitle: 'Sánh bước bên nhau trên mọi hành trình trong và ngoài nước.',
                })
              }
              className="cursor-pointer group"
            >
              <div className="overflow-hidden aspect-[4/4.8] bg-[#EAE7DF]">
                <img
                  src="/images/DuLich_ChiVanCungChong_ChupAnhBenCangBien.jpg"
                  alt="Chị Khánh Vân cùng chồng du lịch quốc tế"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                FIG. 09 &mdash; Người bạn đời tri kỷ đồng hành
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 8. ĐỒNG HÀNH & PHÁT TRIỂN ĐỘI NGŨ (WORK WITH ME + MENTORSHIP GALLERY + CONCIERGE FORM) */}
      <section id="dong-hanh" className="py-28 lg:py-36">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mb-20 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] block">
              05 / HỢP TÁC &amp; ĐỒNG HÀNH
            </span>
            <h2 className="font-serif text-4xl sm:text-[46px] font-normal text-[#181F1C] leading-[1.15]">
              Ba Phương Thức Kết Nối Cùng Khánh Vân
            </h2>
          </div>

          {/* 3 Architectural Hairline Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-b border-[#DCD8CE] divide-y lg:divide-y-0 lg:divide-x divide-[#DCD8CE] mb-28">
            <div className="py-10 lg:pr-10 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#008746] block">
                  I &bull; PRIVATE WEALTH ADVISORY
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#181F1C]">
                  Hoạch Định Tài Chính &amp; Bảo Vệ Gia Sản
                </h3>
                <p className="text-sm text-[#56605B] font-light leading-[1.85]">
                  Thiết kế cấu trúc bảo vệ dòng tiền trụ cột, quỹ học vấn cho con cái và kế hoạch hưu trí an nhàn theo chuẩn mực kiểm soát rủi ro của ngân hàng quốc tế.
                </p>
              </div>
              <a
                href="#lien-he"
                onClick={() =>
                  setFormData({
                    ...formData,
                    topic: 'Cố vấn Hoạch định Tài chính & Gia sản Gia đình',
                  })
                }
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#0A3622] hover:text-[#008746]"
              >
                <span>Đặt lịch cố vấn riêng</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="py-10 lg:px-10 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#008746] block">
                  II &bull; EXECUTIVE MENTORSHIP (F1)
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#181F1C]">
                  Ươm Mầm Nhà Quản Lý Kế Cận
                </h3>
                <p className="text-sm text-[#56605B] font-light leading-[1.85]">
                  Dành riêng cho Cựu Banker, Quản lý kinh doanh và Chủ doanh nghiệp. Trực tiếp kèm cặp 1-1 và chuyển giao quy trình xây dựng đội ngũ chuyên nghiệp.
                </p>
              </div>
              <a
                href="#lien-he"
                onClick={() =>
                  setFormData({
                    ...formData,
                    topic: 'Đồng hành Phát triển Quản lý Kế cận (Mentorship F1)',
                  })
                }
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#0A3622] hover:text-[#008746]"
              >
                <span>Tìm hiểu lộ trình Quản lý F1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="py-10 lg:pl-10 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#008746] block">
                  III &bull; CORPORATE SHARING
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#181F1C]">
                  Đào Tạo Đội Ngũ &amp; Diễn Giả Sự Kiện
                </h3>
                <p className="text-sm text-[#56605B] font-light leading-[1.85]">
                  Giao lưu, chia sẻ thực tế tại các sự kiện và chương trình đào tạo doanh nghiệp về văn hóa dịch vụ bằng chữ “Tín” và nghệ thuật lãnh đạo thấu cảm.
                </p>
              </div>
              <a
                href="#lien-he"
                onClick={() =>
                  setFormData({
                    ...formData,
                    topic: 'Mời Đào tạo / Chia sẻ Sự kiện Doanh nghiệp',
                  })
                }
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#0A3622] hover:text-[#008746]"
              >
                <span>Liên hệ lịch đào tạo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3 Mentorship & Team Culture Photos (Each Appears Only Once on the Page) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-28">
            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/PhongDaoTao_ChiVan_ChiaSeTruyenLua.jpg',
                  fig: 'FIG. 10 — EXECUTIVE TRAINING',
                  title: 'Trực Tiếp Đứng Lớp Đào Tạo & Truyền Lửa',
                  subtitle: 'Chia sẻ kiến thức chuyên môn và kỹ năng quản trị tại văn phòng Manulife.',
                })
              }
              className="cursor-pointer group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF]">
                <img
                  src="/images/PhongDaoTao_ChiVan_ChiaSeTruyenLua.jpg"
                  alt="Chị Khánh Vân đứng lớp đào tạo"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                FIG. 10 &mdash; Trực tiếp đứng lớp đào tạo thực chiến
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/SuKien_ChiVanCungDoiNgu_ChucMungThangCapSM.jpg',
                  fig: 'FIG. 11 — SUCCESSION',
                  title: 'Vinh Danh Các Quản Lý Cấp Cao Mới Thăng Cấp',
                  subtitle: 'Niềm tự hào khi đồng hành cùng cộng sự vươn lên vị trí Quản lý (SM).',
                })
              }
              className="cursor-pointer group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF]">
                <img
                  src="/images/SuKien_ChiVanCungDoiNgu_ChucMungThangCapSM.jpg"
                  alt="Chúc mừng các Quản lý SM thăng cấp"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                FIG. 11 &mdash; Chúc mừng các Quản lý cấp cao thăng cấp
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/DoiThuong_ChiVanCungDoiNgu_CaPheViaHe.jpg',
                  fig: 'FIG. 12 — TEAM CULTURE',
                  title: 'Văn Hóa Đội Ngũ Gần Gũi & Chân Thành',
                  subtitle: 'Gắn kết không khoảng cách từ những buổi trò chuyện sáng đời thường.',
                })
              }
              className="cursor-pointer group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF]">
                <img
                  src="/images/DoiThuong_ChiVanCungDoiNgu_CaPheViaHe.jpg"
                  alt="Văn hóa đội ngũ gần gũi đời thường"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                FIG. 12 &mdash; Văn hóa sẻ chia gần gũi đời thường
              </figcaption>
            </figure>
          </div>

          {/* Minimalist Concierge Contact Section (Underline Inputs, No Heavy Boxes) */}
          <div
            id="lien-he"
            className="grid grid-cols-1 lg:grid-cols-12 gap-14 pt-16 border-t border-[#DCD8CE] items-start"
          >
            <div className="lg:col-span-5 space-y-5">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] block">
                PRIVATE CONCIERGE &amp; INQUIRY
              </span>
              <h3 className="font-serif text-4xl font-normal text-[#181F1C] leading-[1.2]">
                Gửi Lời Nhắn Kết Nối Riêng Cùng Khánh Vân
              </h3>
              <p className="text-sm text-[#56605B] font-light leading-[1.9]">
                Mọi thông tin trao đổi về hoạch định tài chính gia đình hoặc định hướng chuyển dịch sự nghiệp của bạn đều được cam kết bảo mật tuyệt đối.
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              {submitted ? (
                <div className="py-12 border-t border-b border-[#0A3622] space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#008746]">
                    <Check className="w-4 h-4" />
                    <span>Đã ghi nhận thông tin</span>
                  </div>
                  <h4 className="font-serif text-3xl text-[#181F1C]">
                    Cảm ơn {formData.fullName} đã gửi lời nhắn.
                  </h4>
                  <p className="text-sm text-[#56605B] font-light leading-[1.85]">
                    Khánh Vân và trợ lý sẽ liên hệ trực tiếp qua số điện thoại{' '}
                    <span className="text-[#181F1C] font-normal">{formData.phone}</span> trong vòng 24 giờ làm việc.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-[11px] uppercase tracking-[0.2em] text-[#0A3622] border-b border-[#0A3622] pb-1 pt-2"
                  >
                    Gửi lời nhắn khác
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#858E89] mb-1">
                        Họ và Tên *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Minh Anh"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="editorial-input"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#858E89] mb-1">
                        Số điện thoại / Zalo *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="090x xxx xxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="editorial-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#858E89] mb-1">
                        Địa chỉ Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="email@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="editorial-input"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#858E89] mb-1">
                        Lĩnh vực hiện tại
                      </label>
                      <select
                        value={formData.background}
                        onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                        className="editorial-input"
                      >
                        <option value="Ngân hàng / Tài chính (Banker)">
                          Ngân hàng / Tài chính (Banker)
                        </option>
                        <option value="Quản lý Kinh doanh / Điều hành">
                          Quản lý Kinh doanh / Điều hành
                        </option>
                        <option value="Chủ Doanh nghiệp / Founder">
                          Chủ Doanh nghiệp / Founder
                        </option>
                        <option value="Khác">Lĩnh vực khác</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#858E89] mb-1">
                      Chủ đề bạn quan tâm
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="editorial-input"
                    >
                      <option value="Đồng hành Phát triển Quản lý Kế cận (Mentorship F1)">
                        Đồng hành Phát triển Quản lý Kế cận (Mentorship F1)
                      </option>
                      <option value="Cố vấn Hoạch định Tài chính & Gia sản Gia đình">
                        Cố vấn Hoạch định Tài chính &amp; Gia sản Gia đình
                      </option>
                      <option value="Mời Đào tạo / Chia sẻ Sự kiện Doanh nghiệp">
                        Mời Đào tạo / Chia sẻ Sự kiện Doanh nghiệp
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#858E89] mb-1">
                      Chia sẻ thêm (Tùy chọn)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Mong muốn hoặc câu hỏi của bạn dành cho Khánh Vân..."
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className="editorial-input resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-10 py-4 bg-[#0A3622] hover:bg-[#008746] text-white text-[11px] uppercase tracking-[0.24em] transition-colors inline-flex items-center gap-3"
                    >
                      <span>Gửi lời nhắn bảo mật</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. MINIMALIST EDITORIAL FOOTER */}
      <footer className="border-t border-[#DCD8CE] bg-[#F2EFE9] py-16">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pb-12 border-b border-[#DCD8CE]">
            <div>
              <span className="font-serif text-2xl tracking-[0.14em] uppercase text-[#181F1C] block">
                Nguyễn Thị Khánh Vân
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#56605B] mt-1 block">
                Executive Wealth &amp; Leadership &mdash; Manulife Vietnam
              </span>
            </div>

            <div className="flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] text-[#56605B]">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#0A3622] transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#0A3622] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#858E89] font-light">
            <p>© 2026 Nguyen Thi Khanh Van. All Rights Reserved. khanhvanfinance.com</p>
            <a
              href="https://eod.khanhvanfinance.com"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] uppercase tracking-[0.16em] hover:text-[#0A3622] transition-colors"
            >
              [Cổng Báo Cáo Nội Bộ EOD]
            </a>
          </div>
        </div>
      </footer>

      {/* EDITORIAL ARTICLE READER MODAL */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveArticle(null)}
            className="fixed inset-0 z-50 bg-[#181F1C]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full bg-[#FAF9F5] border border-[#DCD8CE] p-8 sm:p-14 max-h-[88vh] overflow-y-auto relative"
            >
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="absolute top-6 right-6 p-2 text-[#56605B] hover:text-[#181F1C]"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#008746]">
                  <span>{activeArticle.category}</span>
                  <span>&bull;</span>
                  <span className="text-[#858E89]">{activeArticle.readTime}</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#181F1C] leading-[1.2]">
                  {activeArticle.title}
                </h3>

                <div className="h-[1px] w-16 bg-[#0A3622]/30" />

                <div className="space-y-5 text-[15px] text-[#3B443F] font-light leading-[1.95]">
                  {activeArticle.content.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#DCD8CE] space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#008746] block">
                    ĐÚC KẾT CỐT LÕI
                  </span>
                  <ul className="space-y-2 text-sm text-[#181F1C] font-light">
                    {activeArticle.keyTakeaways.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#008746]">&mdash;</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GALLERY LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-[#181F1C]/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-10"
          >
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-[#FAF9F5] p-4 sm:p-6"
            >
              <div className="relative bg-[#181F1C] flex items-center justify-center max-h-[75vh]">
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="absolute top-4 right-4 p-2 bg-[#FAF9F5] text-[#181F1C]"
                  aria-label="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#008746] block">
                    {lightbox.fig}
                  </span>
                  <h4 className="font-serif text-2xl font-normal text-[#181F1C] mt-0.5">
                    {lightbox.title}
                  </h4>
                </div>
                <p className="text-xs text-[#56605B] font-light">{lightbox.subtitle}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
