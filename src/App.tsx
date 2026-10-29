import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  Heart,
  Menu,
  Mic,
  Send,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';

interface LightboxImage {
  src: string;
  category: string;
  title: string;
  subtitle: string;
}

interface Article {
  id: string;
  category: 'Tài chính & Gia sản' | 'Phát triển Sự nghiệp' | 'Bố Mẹ Đi Làm' | 'Kỷ luật Bản thân';
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  content: string[];
  keyTakeaways: string[];
}

const ARTICLES: Article[] = [
  {
    id: 'chuan-bi-tai-chinh-truoc-khi-buoc-ra-vung-an-toan',
    category: 'Tài chính & Gia sản',
    date: '18 Tháng 10, 2026',
    readTime: '5 phút đọc',
    title: 'Bạn Cần Chuẩn Bị Gì Về Tài Chính Trước Khi Bước Ra Khỏi Vùng An Toàn Công Sở?',
    excerpt:
      'Năm 2018, khi quyết định rời vị trí quản lý ổn định tại ngân hàng quốc tế ANZ, Vân không bước đi bằng sự cảm tính mà bằng một bảng kế hoạch dòng tiền rất kỷ luật.',
    image: '/images/PhongDaoTao_ChiVan_ChiaSeTruyenLua.jpg',
    content: [
      'Rất nhiều bạn trẻ và cả những anh chị quản lý cấp trung ở ngân hàng thường hỏi Vân: “Chị ơi, làm sao chị đủ can đảm rời bỏ mức lương cố định rất tốt ở ngân hàng ngoại để bắt đầu hành trình tự chủ?” Câu trả lời của Vân luôn là: Sự dũng cảm bền vững nhất phải được đặt trên nền tảng của sự chuẩn bị tài chính kỹ lưỡng.',
      'Thứ nhất, hãy thiết lập Quỹ Dự Phòng Thanh Khoản tối thiểu từ 6 đến 12 tháng chi phí sinh hoạt thiết yếu của cả gia đình. Khi bạn biết chắc rằng dù 6 tháng tới thu nhập mới chưa về đều, con cái vẫn học hành bình thường, bữa cơm gia đình không bị ảnh hưởng, bạn sẽ giữ được sự điềm tĩnh và tự trọng nghề nghiệp — không bao giờ phải tư vấn bất chấp chỉ vì áp lực cơm áo.',
      'Thứ hai, hãy tách bạch hoàn toàn dòng tiền sinh hoạt gia đình và dòng tiền đầu tư phát triển sự nghiệp. Thời điểm mới chuyển sang xây dựng đội ngũ, bạn sẽ cần đầu tư thời gian học tập, gặp gỡ đối tác và nâng cấp năng lực bản thân. Sự minh bạch về con số sẽ giúp người bạn đời của bạn hoàn toàn yên tâm và ủng hộ quyết định của bạn.',
      'Cuối cùng, tài sản lớn nhất bạn mang theo khi rời công sở không phải là sổ tiết kiệm, mà là “Tài khoản Chữ Tín” bạn đã tích lũy với đồng nghiệp và khách hàng cũ. Hãy rời đi trong sự tử tế và chuyên nghiệp trọn vẹn nhất.',
    ],
    keyTakeaways: [
      'Chuẩn bị quỹ dự phòng 6–12 tháng chi phí cố định trước khi chuyển hướng sự nghiệp.',
      'Không để áp lực tài chính ngắn hạn làm ảnh hưởng đến chuẩn mực đạo đức tư vấn.',
      'Xây dựng uy tín cá nhân ngay từ công việc hiện tại — đó là nguồn vốn quý nhất.',
    ],
  },
  {
    id: 'xay-dung-chu-tin-trong-cong-viec',
    category: 'Phát triển Sự nghiệp',
    date: '05 Tháng 10, 2026',
    readTime: '6 phút đọc',
    title: 'Làm Sao Để Xây Dựng Chữ “Tín” Giúp Đồng Nghiệp Và Khách Hàng Chủ Động Giới Thiệu?',
    excerpt:
      '3 tháng đầu tiên chuyển sang làm Sales tại ANZ, Vân không có nổi một khách hàng. Chính cách làm việc chỉn chu từ những năm làm Vận hành đã cứu Vân khỏi nguy cơ bị cắt mã số.',
    image: '/images/SanKhau_ChiVan_VinhDanhTop1DRDFYP2024.jpg',
    content: [
      'Khi mới từ bộ phận Vận hành (Operations) chuyển sang bộ phận Kinh doanh (Sales) tại ANZ, Vân từng trải qua 90 ngày đầu tiên đầy áp lực vì không chốt được bất kỳ hồ sơ nào. Lúc đó, Vân nhận ra mình không có kỹ năng ăn nói khéo léo như nhiều bạn sales lâu năm.',
      'Nhưng điều bất ngờ đã xảy ra từ tháng thứ 4: chính các anh chị đồng nghiệp ở bộ phận thẩm định, vận hành và các đối tác cũ bắt đầu chủ động giới thiệu khách hàng cho Vân. Lý do rất đơn giản: suốt những năm làm hậu cần trước đó, mỗi hồ sơ qua tay Vân đều được xử lý rõ ràng, đúng hẹn và hỗ trợ đồng nghiệp hết lòng.',
      'Bài học đó đi theo Vân suốt gần 20 năm qua: Bạn không cần phải là người nói hay nhất trong phòng, nhưng hãy là người đáng tin cậy nhất. Khi khách hàng cảm nhận được bạn đặt lợi ích và sự an toàn của gia đình họ lên trên chỉ tiêu doanh số của bạn, họ sẽ trở thành người giới thiệu nhiệt thành nhất.',
    ],
    keyTakeaways: [
      'Uy tín được xây dựng từ những việc nhỏ nhất khi chưa ai nhìn thấy.',
      'Tỷ lệ duy trì hợp đồng và sự hài lòng sau bán hàng quan trọng hơn doanh số nhất thời.',
      'Làm việc bằng sự chân thành sẽ tạo ra mạng lưới giới thiệu tự nhiên bền vững.',
    ],
  },
  {
    id: '3-bieu-hien-cua-nguoi-quan-ly-gioi',
    category: 'Phát triển Sự nghiệp',
    date: '22 Tháng 09, 2026',
    readTime: '5 phút đọc',
    title: '3 Biểu Hiện Của Một Người Quản Lý Giỏi Thực Sự Trong Công Việc',
    excerpt:
      'Dẫn dắt 64 Quản lý cấp cao và hơn 500 nhân sự, Vân nhận ra người lãnh đạo giỏi không phải là người làm thay hết mọi việc, mà là người giúp cộng sự tự tin tỏa sáng.',
    image: '/images/SuKien_ChiVanCungDoiNgu_ChucMungThangCapSM.jpg',
    content: [
      'Nhiều người khi mới thăng cấp lên vị trí Quản lý thường mắc một cái bẫy: cố gắng chứng tỏ mình là người giỏi nhất nhóm và áp đặt một công thức làm việc giống hệt mình lên tất cả nhân viên. Qua thực tế phát triển 64 Quản lý cấp cao, Vân đúc kết 3 phẩm chất của một người lãnh đạo bền vững:',
      '1. Khả năng lắng nghe và đọc vị thế mạnh độc bản: Mỗi cộng sự có một xuất phát điểm và tính cách khác nhau. Có người mạnh về phân tích số liệu, có người mạnh về kết nối cảm xúc. Người quản lý giỏi biết đặt đúng người vào đúng vị trí để họ phát huy tự nhiên nhất.',
      '2. Kỷ luật làm gương thay vì chỉ đạo bằng lời nói: Đội ngũ sẽ không làm theo những gì bạn nói, họ sẽ làm theo những gì họ thấy bạn làm mỗi ngày — từ tác phong đúng giờ, cách giải quyết khó khăn cho khách hàng đến việc không ngừng học hỏi.',
      '3. Đo lường thành công bằng sự trưởng thành của cấp dưới: Niềm vui lớn nhất của Vân không còn là chiếc cúp của riêng mình, mà là khoảnh khắc đứng dưới sân khấu vỗ tay nhìn các quản lý kế cận của mình bước lên nhận giải.',
    ],
    keyTakeaways: [
      'Thấu hiểu từng cá nhân để kích hoạt thế mạnh riêng thay vì ép vào một khuôn mẫu.',
      'Lãnh đạo bằng sự làm gương và đồng hành thực chiến.',
      'Trao quyền đi đôi với đào tạo quy trình rõ ràng.',
    ],
  },
  {
    id: 'can-bang-cong-viec-va-gia-dinh-bo-me-di-lam',
    category: 'Bố Mẹ Đi Làm',
    date: '08 Tháng 09, 2026',
    readTime: '4 phút đọc',
    title: 'Làm Sao Điều Hành Hệ Thống 500+ Nhân Sự Mà Vẫn Giữ Trọn Sự Hiện Diện Bên Chồng Con?',
    excerpt:
      'Cân bằng cuộc sống không có nghĩa là chia đều 50/50 thời gian mỗi ngày, mà là sự hiện diện trọn vẹn 100% ở nơi mình đang đứng.',
    image: '/images/GiaDinh_ChiVan_NgoiSofaPhongKhach.jpg',
    content: [
      'Là phụ nữ làm quản lý, chắc hẳn nhiều chị em từng có cảm giác có lỗi: khi ở văn phòng thì lo cho con ở nhà, khi về nhà chơi với con thì đầu óc lại nghĩ đến công việc. Bản thân Vân cũng từng trải qua giai đoạn đó trước khi tìm ra nguyên tắc “Sự hiện diện trọn vẹn”.',
      'Khi ở văn phòng hoặc trong phòng đào tạo, Vân tập trung 100% năng lượng, làm việc theo lịch trình phân khối thời gian (Time-blocking) rất rõ ràng để giải quyết dứt điểm công việc. Và khi bước qua cánh cửa nhà vào buổi tối, Vân chủ động gác lại điện thoại để thực sự lắng nghe câu chuyện ở trường của hai con và trò chuyện cùng chồng.',
      'Đặc biệt, đừng cố gắng làm một “siêu nhân” ôm đồm mọi thứ một mình. Hãy chia sẻ thẳng thắn mục tiêu công việc với chồng và biến các con thành những người bạn đồng hành hiểu chuyện. Khi gia đình hiểu ý nghĩa công việc bạn đang làm, tổ ấm sẽ trở thành trạm sạc năng lượng tuyệt vời nhất.',
    ],
    keyTakeaways: [
      'Áp dụng kỷ luật quản lý thời gian (Time-blocking) để nâng cao hiệu suất giờ làm việc.',
      'Chất lượng thời gian bên con quan trọng hơn số lượng giờ ngồi cạnh con nhưng vẫn nhìn điện thoại.',
      'Sự chia sẻ và đồng lòng với người bạn đời là chìa khóa của bình an gia đình.',
    ],
  },
  {
    id: '3-nguyen-tac-quan-tri-dong-tien-gia-dinh',
    category: 'Tài chính & Gia sản',
    date: '25 Tháng 08, 2026',
    readTime: '5 phút đọc',
    title: '3 Nguyên Tắc Quản Trị Rủi Ro Dòng Tiền Gia Đình Từ Góc Nhìn Cựu Banker',
    excerpt:
      'Kiếm được nhiều tiền là năng lực tấn công, nhưng giữ được tiền và bảo vệ tương lai học vấn của con cái trước mọi biến cố mới là năng lực phòng thủ tối quan trọng.',
    image: '/images/SuKien_ChiVanCungCEO_ChupAnhTiecToi.jpg',
    content: [
      'Trong 8 năm làm việc tại ngân hàng quốc tế ANZ, Vân có cơ hội tiếp xúc với hàng trăm hồ sơ tài chính của các gia đình có thu nhập cao và chủ doanh nghiệp. Điểm chung là nhiều người rất giỏi tạo ra dòng tiền, nhưng cấu trúc phòng thủ tài sản lại có nhiều khoảng trống.',
      'Nguyên tắc thứ nhất: Luôn xây dựng “Lớp khiên bảo vệ thu nhập người trụ cột” trước khi nghĩ đến các kênh đầu tư mạo hiểm. Dù thị trường bất động sản hay chứng khoán có biến động ra sao, quỹ học vấn của con cái và chi phí y tế chất lượng cao của gia đình phải là khoản tiền bất khả xâm phạm.',
      'Nguyên tắc thứ hai: Thiết kế giải pháp theo đúng nhu cầu và khả năng duy trì dài hạn (Đúng và Đủ). Một kế hoạch tài chính tốt nhất là kế hoạch được duy trì bền bỉ qua 10, 15, 20 năm chứ không phải một hợp đồng quá sức để rồi phải dừng lại giữa chừng.',
      'Nguyên tắc thứ ba: Rà soát danh mục định kỳ hàng năm cùng một cố vấn có tâm và có chuyên môn sâu để điều chỉnh kịp thời theo từng cột mốc mới của gia đình.',
    ],
    keyTakeaways: [
      'Ưu tiên bảo vệ dòng tiền của người trụ cột và quỹ học vấn của con cái.',
      'Hoạch định theo nguyên tắc “Đúng – Đủ – Phù hợp dòng tiền dài hạn”.',
      'Kỷ luật duy trì kế hoạch tài chính là yếu tố quyết định hiệu quả cuối cùng.',
    ],
  },
  {
    id: 'ky-luat-phong-tap-va-su-ben-bi',
    category: 'Kỷ luật Bản thân',
    date: '10 Tháng 08, 2026',
    readTime: '4 phút đọc',
    title: 'Kỷ Luật Phòng Tập Mỗi Sáng Và Bài Học Về Sự Bền Bỉ Trên Đường Dài',
    excerpt:
      'Muốn đi đường dài trong sự nghiệp lãnh đạo, một trí tuệ minh mẫn phải nằm trong một cơ thể khỏe mạnh và dẻo dai.',
    image: '/images/DoiThuong_ChiVan_SelfiePhongTapGym.jpg',
    content: [
      'Lịch làm việc của một Giám đốc Vùng với các buổi đào tạo, họp chiến lược và gặp gỡ đối tác đòi hỏi nguồn thể lực rất lớn. Dù bận rộn đến đâu, Vân vẫn duy trì thói quen dành thời gian tại phòng tập gym mỗi tuần.',
      'Rèn luyện thể thao dạy cho chúng ta một bài học rất thật về thành công: Không có kết quả nào đến sau một đêm. Bạn không thể tập một buổi mà khỏe ngay, cũng như không thể xây dựng một đội ngũ vững mạnh chỉ bằng vài khẩu hiệu ngắn hạn.',
      'Mỗi sáng vượt qua sự lười biếng để hoàn thành bài tập là một chiến thắng nhỏ giúp rèn luyện ý chí. Khi bạn làm chủ được kỷ luật bản thân, bạn sẽ có nguồn năng lượng tích cực để truyền lửa cho hàng trăm con người xung quanh.',
    ],
    keyTakeaways: [
      'Sức khỏe thể chất là nền tảng của sự minh mẫn và bản lĩnh ra quyết định.',
      'Sự đều đặn mỗi ngày luôn chiến thắng sự bùng nổ ngắn hạn.',
      'Người lãnh đạo truyền năng lượng tốt nhất qua chính lối sống kỷ luật của mình.',
    ],
  },
];

const BOOKS = [
  {
    title: 'Good to Great (Từ Tốt Đến Vĩ Đại)',
    author: 'Jim Collins',
    tag: 'Tư duy Quản trị & Đội ngũ',
    review:
      'Cuốn sách định hình tư duy của Vân về “Lãnh đạo Cấp độ 5” — sự kết hợp giữa lòng khiêm nhường cá nhân và ý chí chuyên nghiệp kiên định, bắt đầu từ việc chọn đúng người lên chuyến xe trước khi quyết định lái xe về đâu.',
  },
  {
    title: 'The Psychology of Money (Tâm Lý Học Về Tiền)',
    author: 'Morgan Housel',
    tag: 'Quản trị Gia sản & Dòng tiền',
    review:
      'Quản lý tài chính thành công không chỉ nằm ở những bảng tính phức tạp, mà nằm ở hành vi, sự kiên nhẫn và việc chừa sẵn “biên độ an toàn” trước những rủi ro không thể đoán trước của cuộc sống.',
  },
  {
    title: 'Atomic Habits (Thay Đổi Tí Hon, Hiệu Quả Bất Ngờ)',
    author: 'James Clear',
    tag: 'Kỷ luật Bản thân',
    review:
      'Triết lý “tốt hơn 1% mỗi ngày” chính là cốt lõi của phương châm “Đi chắc để đi xa”. Mọi thành tựu Top 1 Châu Á đều được tạo nên từ hệ thống thói quen làm việc chuẩn mực hàng ngày.',
  },
];

export function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);

  // Lead magnet state
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSent, setLeadSent] = useState(false);

  // Main consultation form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    topic: 'Đồng hành Phát triển Sự nghiệp Quản lý (Mentorship F1)',
    background: 'Cựu Banker / Chuyên viên Ngân hàng',
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Về Khánh Vân', href: '#ve-khanh-van' },
    { label: 'Góc Nhìn & Lời Khuyên', href: '#goc-nhin' },
    { label: 'Tủ Sách & Tài Liệu', href: '#tu-sach' },
    { label: 'Cuộc Sống & Gia Đình', href: '#gia-dinh' },
    { label: 'Hợp Tác', href: '#hop-tac' },
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

  const authorityMetrics = [
    {
      figure: '8+ Năm',
      label: 'Kinh Nghiệm ANZ Bank',
      desc: 'Nền tảng chuyên môn Quản lý tài sản, Tín dụng và Vận hành ngân hàng quốc tế.',
    },
    {
      figure: 'Top 1',
      label: 'Toàn Quốc ANZ (2017)',
      desc: 'Dẫn đầu doanh số mảng Tín dụng & Cho vay thế chấp mua nhà toàn hệ thống.',
    },
    {
      figure: 'Top 1',
      label: 'Quản Lý Châu Á (2021)',
      desc: 'Giải thưởng Nhà Quản lý Xuất sắc nhất Châu Á (Asia Trusted Life Agent & Advisers Awards).',
    },
    {
      figure: '64',
      label: 'Quản Lý Cấp Cao',
      desc: 'Đội ngũ quản lý kế cận được đào tạo và chuyển giao quy trình làm việc thực chiến.',
    },
    {
      figure: '500+',
      label: 'Nhân Sự Hệ Thống',
      desc: 'Tập thể làm việc kỷ luật, chuyên nghiệp, đoàn kết và lấy chữ Tín làm gốc.',
    },
    {
      figure: 'Top 1',
      label: 'Tỷ Lệ Duy Trì Hợp Đồng',
      desc: 'Minh chứng thực tế cho chất lượng tư vấn chuẩn mực và sự tin tưởng dài hạn từ khách hàng.',
    },
  ];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadEmail.trim()) {
      setLeadSent(true);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#111827]">
      {/* 1. HEADER NAVIGATION — CLEAN LIGHT MANULIFE THEME */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-3.5 shadow-subtle'
            : 'bg-white border-b border-gray-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 shrink-0 whitespace-nowrap group">
            <div className="flex items-end gap-1">
              <span className="w-1.5 h-6 bg-[#00A758] rounded-xs" />
              <span className="w-1.5 h-6 bg-[#00A758] rounded-xs" />
              <span className="w-1.5 h-6 bg-[#00A758] rounded-xs" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#111827] block leading-none">
                NGUYỄN THỊ KHÁNH VÂN
              </span>
              <span className="text-[11px] font-medium text-[#00A758] tracking-wide block mt-1">
                Lãnh đạo • Cố vấn Gia sản • Người Mẹ
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm font-medium text-[#4B5563] hover:text-[#00A758] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center shrink-0">
            <a
              href="#hop-tac"
              className="whitespace-nowrap inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#00A758] hover:bg-[#008A47] text-white shadow-emerald-sm transition-all"
            >
              <span>Liên Hệ Hợp Tác</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-gray-200 overflow-hidden"
            >
              <div className="px-6 py-5 flex flex-col gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-gray-800 hover:text-[#00A758] py-2 border-b border-gray-100 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#00A758]" />
                  </a>
                ))}
                <a
                  href="#hop-tac"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 py-3 rounded-lg text-center font-semibold text-sm bg-[#00A758] text-white"
                >
                  Liên Hệ Hợp Tác
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION — INSPIRED BY THAI VAN LINH'S 4-ROLE POSITIONING + MANULIFE HERITAGE */}
      <section className="pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24 bg-gradient-to-b from-[#F4FAF7] via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* 4 Roles Pill (Like Thái Vân Linh: Doanh nhân - Nhà đầu tư - Cố vấn - Người mẹ) */}
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F5EC] text-[#003822] text-xs sm:text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#00A758]" />
                <span>Nhà Lãnh Đạo • Cố Vấn Gia Sản • Người Truyền Lửa • Người Mẹ</span>
              </div>

              {/* Clean Modern Title */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-[#111827] leading-[1.15]">
                  Nguyễn Thị <span className="text-[#00A758]">Khánh Vân</span>
                </h1>
                <p className="text-lg sm:text-xl font-medium text-[#374151] leading-snug">
                  Giám đốc Vùng Cấp cao (DRD+) tại Manulife Việt Nam &bull; Nhà Quản lý Xuất sắc nhất Châu Á (2021)
                </p>
              </div>

              {/* Core Motto */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border-l-4 border-[#00A758] space-y-2">
                <p className="text-base sm:text-lg font-semibold text-[#111827]">
                  “Đi chắc để đi xa — Kiến tạo tốc độ từ sự chuẩn mực.”
                </p>
                <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  Khởi đầu từ 8 năm quản lý tài sản và tín dụng tại ngân hàng quốc tế ANZ đến hành trình xây dựng đội ngũ hơn 500 nhân sự tại Manulife, Vân luôn tin rằng sự tử tế, minh bạch và kỷ luật bản thân là con đường ngắn nhất để tạo dựng sự nghiệp bền vững.
                </p>
              </div>

              {/* Quick Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gray-200">
                  <Building2 className="w-5 h-5 text-[#00A758] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">
                      Nền tảng Ngân hàng Quốc tế
                    </span>
                    <span className="text-sm font-semibold text-[#111827]">
                      8+ Năm ANZ Bank (Top 1 Toàn Quốc 2017)
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gray-200">
                  <Award className="w-5 h-5 text-[#00A758] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">
                      Dấu ấn Khu vực Châu Á
                    </span>
                    <span className="text-sm font-semibold text-[#111827]">
                      Asia Trusted Awards Winner 2021
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href="#goc-nhin"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[#00A758] hover:bg-[#008A47] text-white shadow-emerald-sm transition-all"
                >
                  <span>Đọc Góc Nhìn &amp; Lời Khuyên</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#hop-tac"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white hover:bg-gray-50 text-[#111827] border border-gray-300 transition-all"
                >
                  <span>Phương Thức Hợp Tác</span>
                </a>
              </div>
            </div>

            {/* Right Column: Clean Portrait Frame */}
            <div className="lg:col-span-5">
              <figure
                onClick={() =>
                  setLightbox({
                    src: '/images/SuKien_ChiVanCungCEO_ChupAnhTiecToi.jpg',
                    category: 'DẤU ẤN LÃNH ĐẠO',
                    title: 'Gặp Gỡ & Giao Lưu Cùng Tổng Giám Đốc (CEO) Manulife',
                    subtitle:
                      'Chị Nguyễn Thị Khánh Vân cùng CEO Manulife tại sự kiện Tiệc tối cùng CEO.',
                  })
                }
                className="bg-white p-3 rounded-2xl border border-gray-200 shadow-elevated cursor-pointer group"
              >
                <div className="overflow-hidden rounded-xl aspect-[4/4.8] bg-gray-100">
                  <img
                    src="/images/SuKien_ChiVanCungCEO_ChupAnhTiecToi.jpg"
                    alt="Chị Nguyễn Thị Khánh Vân cùng CEO Manulife"
                    className="w-full h-full object-cover object-[50%_82%] group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <figcaption className="pt-3.5 px-1 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#00A758] block">
                      Tiệc Tối Cùng CEO Manulife
                    </span>
                    <p className="text-sm font-medium text-[#111827] mt-0.5">
                      Đồng hành cùng Ban Lãnh Đạo Cấp Cao kiến tạo chuẩn mực tư vấn bền vững
                    </p>
                  </div>
                  <span className="text-xs font-medium text-gray-500 group-hover:text-[#00A758] shrink-0">
                    Xem ảnh &rarr;
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROOF OF AUTHORITY BAR — DEEP MANULIFE FOREST GREEN CORPORATE STRIP */}
      <section className="bg-[#003822] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#34D399] block mb-2">
                THÀNH TỰU &amp; CON SỐ THỰC TẾ
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Hành Trình Được Chứng Minh Bằng Kết Quả
              </h2>
            </div>
            <p className="text-sm text-emerald-100/80 max-w-md">
              Mỗi con số là kết quả của sự kỷ luật, minh bạch và niềm tin từ khách hàng cũng như đội ngũ cộng sự.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorityMetrics.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00A758] transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-bold text-[#34D399] tracking-tight">
                  {item.figure}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mt-2">
                  {item.label}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/75 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VỀ KHÁNH VÂN — CÂU CHUYỆN SỰ NGHIỆP (INSPIRED BY THAI VAN LINH'S /PAGES/VE-THAI-VAN-LINH) */}
      <section id="ve-khanh-van" className="py-20 lg:py-28 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Opening Statement like Shark Linh's "Hôm nay tôi sẽ làm..." */}
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20 space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#E6F5EC] text-[#00A758] text-xs font-semibold uppercase tracking-wider">
              VỀ THÁI ĐỘ SỐNG &amp; SỰ NGHIỆP
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#111827] leading-tight">
              “Làm tốt nhất từ những việc nhỏ nhất mỗi ngày. Khi bạn đủ chân thành, cơ hội lớn sẽ tự mở ra.”
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed">
              Nguyễn Thị Khánh Vân được biết đến với vai trò là Giám đốc Vùng Cấp cao tại Manulife Việt Nam, một nhà cố vấn hoạch định tài chính, người thầy dẫn dắt đội ngũ và là một người mẹ của hai con.
            </p>
          </div>

          {/* 3 Chapters with Clean Uncovered Stage Photos */}
          <div className="space-y-20">
            {/* Chapter 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00A758]">
                  <span>Giai đoạn 2009 – 2017</span>
                  <span>&bull;</span>
                  <span>Ngân hàng Quốc tế ANZ</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#111827]">
                  Đi Lên Từ Con Số 0 &amp; Bài Học Để Đời Về Chữ “Tín”
                </h3>
                <p className="text-[#4B5563] text-base leading-relaxed">
                  Trước khi đạt danh hiệu <strong className="text-[#111827]">Top 1 Toàn Quốc ANZ năm 2017</strong> mảng Tín dụng &amp; Thế chấp mua nhà, Vân từng trải qua 3 tháng đầu tiên chuyển sang bộ phận Sales mà không có nổi một khách hàng, đứng trước nguy cơ bị cắt mã số.
                </p>
                <p className="text-[#4B5563] text-base leading-relaxed">
                  Thay vì nản lòng hay chạy theo doanh số bằng mọi giá, Vân nhận được sự giúp đỡ từ chính các đồng nghiệp và đối tác cũ — những người đã chứng kiến sự cẩn trọng, tận tâm và trách nhiệm của Vân suốt những năm làm Vận hành (Operations). Họ chủ động giới thiệu những khách hàng đầu tiên, giúp Vân lội ngược dòng ngoạn mục và thấu hiểu sức mạnh của <strong className="text-[#111827]">The Power of Referral &amp; Integrity</strong>.
                </p>
              </div>

              <div className="lg:col-span-6">
                <figure
                  onClick={() =>
                    setLightbox({
                      src: '/images/SanKhau_ChiVan_VinhDanhTop1DRDFYP2024.jpg',
                      category: 'VINH DANH TOÀN QUỐC • 2024',
                      title: 'Top 1 Quản Lý Cấp Cao DRD+ Hoàn Thành Chỉ Tiêu Năm 2024',
                      subtitle: 'Dấu ấn lãnh đạo dẫn đầu tại sự kiện vinh danh Manulife Việt Nam.',
                    })
                  }
                  className="clean-card rounded-2xl p-3 cursor-pointer group"
                >
                  <div className="overflow-hidden rounded-xl aspect-[16/10] bg-gray-100">
                    <img
                      src="/images/SanKhau_ChiVan_VinhDanhTop1DRDFYP2024.jpg"
                      alt="Vinh danh Top 1 Quản lý cấp cao DRD+ Nguyễn Thị Vân 2024"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <figcaption className="pt-3 px-1 flex items-center justify-between text-xs text-[#4B5563]">
                    <span>
                      <strong className="text-[#111827]">Vinh danh năm 2024:</strong> Top 1 Quản lý Cấp cao DRD+ dẫn đầu tỷ lệ hoàn thành chỉ tiêu.
                    </span>
                    <span className="text-[#00A758] font-semibold shrink-0 ml-2">Phóng to &rarr;</span>
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Chapter 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <figure
                  onClick={() =>
                    setLightbox({
                      src: '/images/SanKhau_ChiVan_NhanGiaiTop1DuyTriHopDong2025.jpg',
                      category: 'CHẤT LƯỢNG TƯ VẤN • 2025',
                      title: 'Top 1 DRD+ Dẫn Đầu Tỷ Lệ Duy Trì Hợp Đồng Năm 2 (2025)',
                      subtitle: 'Thước đo cao nhất cho sự hài lòng và gắn bó dài hạn của khách hàng.',
                    })
                  }
                  className="clean-card rounded-2xl p-3 cursor-pointer group"
                >
                  <div className="overflow-hidden rounded-xl aspect-[16/10] bg-gray-100">
                    <img
                      src="/images/SanKhau_ChiVan_NhanGiaiTop1DuyTriHopDong2025.jpg"
                      alt="Top 1 DRD+ dẫn đầu tỷ lệ duy trì hợp đồng năm 2025"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <figcaption className="pt-3 px-1 flex items-center justify-between text-xs text-[#4B5563]">
                    <span>
                      <strong className="text-[#111827]">Vinh danh năm 2025:</strong> Top 1 DRD+ dẫn đầu Tỷ lệ duy trì hợp đồng năm 2.
                    </span>
                    <span className="text-[#00A758] font-semibold shrink-0 ml-2">Phóng to &rarr;</span>
                  </figcaption>
                </figure>
              </div>

              <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00A758]">
                  <span>Bước ngoặt 2018</span>
                  <span>&bull;</span>
                  <span>Tái định nghĩa nghề Tư vấn Tài chính</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#111827]">
                  Bước Ra Khỏi Vùng An Toàn &amp; Lấy Tỷ Lệ Duy Trì Làm Thước Đo Danh Dự
                </h3>
                <p className="text-[#4B5563] text-base leading-relaxed">
                  Năm 2018, Vân quyết định rời môi trường ngân hàng nước ngoài để bắt đầu hành trình xây dựng đội ngũ tại Manulife Việt Nam với mong muốn làm chủ thời gian và tạo ra giá trị rộng lớn hơn cho cộng đồng.
                </p>
                <p className="text-[#4B5563] text-base leading-relaxed">
                  Mang tư duy kiểm soát rủi ro chặt chẽ của một cựu Banker vào công việc mới, Vân định hướng toàn bộ hệ thống không chạy theo doanh số ngắn hạn mà tập trung vào <strong className="text-[#111827]">giải pháp đúng – đủ và khả năng đồng hành đường dài</strong>. Giải thưởng <strong className="text-[#00A758]">Top 1 DRD+ về Tỷ lệ Duy trì Hợp đồng</strong> chính là kết quả tự hào nhất cho triết lý làm nghề tử tế đó.
                </p>
              </div>
            </div>

            {/* Chapter 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00A758]">
                  <span>2018 – Hiện tại</span>
                  <span>&bull;</span>
                  <span>Vươn tầm Châu Á &amp; Phát triển Con người</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#111827]">
                  Nhà Quản Lý Xuất Sắc Nhất Châu Á &amp; Hệ Sinh Thái 500+ Cộng Sự
                </h3>
                <p className="text-[#4B5563] text-base leading-relaxed">
                  Năm 2021, Nguyễn Thị Khánh Vân vinh dự trở thành đại diện duy nhất của Việt Nam đạt giải thưởng <strong className="text-[#111827]">“Nhà Quản lý Xuất sắc nhất Châu Á”</strong> (Asia Trusted Life Agent &amp; Advisers Awards 2021).
                </p>
                <p className="text-[#4B5563] text-base leading-relaxed">
                  Đến nay, niềm tự hào lớn nhất của Vân là đã trực tiếp ươm mầm, đào tạo và đồng hành cùng <strong className="text-[#111827]">64 Quản lý cấp cao và hơn 500 nhân sự</strong> — giúp nhiều bạn trẻ từ cựu nhân viên ngân hàng, nhân sự văn phòng thay đổi hoàn toàn chất lượng cuộc sống và làm chủ sự nghiệp riêng.
                </p>
              </div>

              <div className="lg:col-span-5">
                <figure
                  onClick={() =>
                    setLightbox({
                      src: '/images/SanKhau_ChiVan_NhanGiaiTop1FYP2025.jpg',
                      category: 'DẤU ẤN DẪN ĐẦU • 2025',
                      title: 'Top 1 DRD+ Quản Lý Cấp Cao Dẫn Đầu Hoàn Thành Chỉ Tiêu FYP 2025',
                      subtitle: 'Khoảnh khắc nhận cúp Top 1 trên sân khấu vinh danh cùng tập thể quản lý.',
                    })
                  }
                  className="clean-card rounded-2xl p-3 cursor-pointer group"
                >
                  <div className="overflow-hidden rounded-xl aspect-[3/3.6] bg-gray-100">
                    <img
                      src="/images/SanKhau_ChiVan_NhanGiaiTop1FYP2025.jpg"
                      alt="Chị Khánh Vân nhận cúp Top 1 DRD+ năm 2025"
                      className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <figcaption className="pt-3 px-1 flex items-center justify-between text-xs text-[#4B5563]">
                    <span>
                      <strong className="text-[#111827]">Top 1 DRD+ (2025):</strong> Dẫn đầu hoàn thành chỉ tiêu FYP.
                    </span>
                    <span className="text-[#00A758] font-semibold shrink-0 ml-2">Phóng to &rarr;</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GÓC NHÌN & LỜI KHUYÊN THỰC CHIẾN (BLOG / INSIGHTS HUB — INSPIRED BY THAI VAN LINH) */}
      <section id="goc-nhin" className="py-20 lg:py-28 bg-[#F7FAF8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00A758] block mb-2">
                CHIA SẺ KINH NGHIỆM &amp; GÓC NHÌN THỰC TẾ
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#111827]">
                Lời Khuyên Về Tài Chính, Sự Nghiệp &amp; Cuộc Sống
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#4B5563] max-w-md">
              Những bài học thực tế được đúc kết từ hơn 17 năm làm việc trong ngành ngân hàng, quản trị đội ngũ và làm mẹ.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-10">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? 'bg-[#00A758] text-white shadow-emerald-sm'
                      : 'bg-white text-[#4B5563] border border-gray-200 hover:border-[#00A758] hover:text-[#00A758]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="clean-card rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="overflow-hidden aspect-[16/10] bg-gray-100 relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-[#003822] shadow-xs">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2.5">
                      <span>{article.date}</span>
                      <span>&bull;</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#111827] group-hover:text-[#00A758] transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-sm text-[#4B5563] mt-3 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#00A758]">
                  <span>Đọc bài viết chi tiết</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TỦ SÁCH QUẢN TRỊ & CẨM NANG MIỄN PHÍ (BOOK CLUB & LEAD MAGNET — INSPIRED BY THAI VAN LINH) */}
      <section id="tu-sach" className="py-20 lg:py-28 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 7 Cols: Khánh Vân's Book Club */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00A758] mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>KHÁNH VÂN&apos;S BOOK CLUB</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
                  Những Cuốn Sách Định Hình Tư Duy Quản Trị &amp; Tài Chính
                </h2>
                <p className="text-sm sm:text-base text-[#4B5563] mt-2">
                  Kiến thức từ sách là người thầy thầm lặng giúp Vân thay đổi góc nhìn về quản lý dòng tiền, xây dựng thói quen và phát triển con người.
                </p>
              </div>

              <div className="space-y-4">
                {BOOKS.map((book, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200 hover:border-[#00A758] transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#E6F5EC] text-[#003822]">
                        {book.tag}
                      </span>
                      <span className="text-xs font-medium text-gray-500">
                        Tác giả: {book.author}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#111827]">{book.title}</h3>
                    <p className="text-sm text-[#4B5563] mt-2 leading-relaxed">{book.review}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Free PDF Cẩm Nang Lead Magnet */}
            <div className="lg:col-span-5">
              <div className="p-7 sm:p-8 rounded-3xl bg-[#003822] text-white shadow-elevated space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#34D399] text-xs font-semibold">
                  <FileText className="w-3.5 h-3.5" />
                  <span>TÀI LIỆU MIỄN PHÍ TỪ KHÁNH VÂN</span>
                </div>

                <h3 className="text-2xl font-bold leading-snug">
                  Nhận Bộ Cẩm Nang PDF: Hoạch Định Dòng Tiền Gia Đình &amp; Lộ Trình Chuyển Dịch Sự Nghiệp
                </h3>

                <p className="text-sm text-emerald-100/85 leading-relaxed">
                  Bộ tài liệu đúc kết kinh nghiệm thực tế dành cho những ai muốn tự kiểm tra sức khỏe tài chính gia đình và khám phá lộ trình phát triển từ nhân sự văn phòng/ngân hàng lên vị trí Quản lý độc lập.
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-50">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                    <span>Checklist 5 tầng tháp bảo vệ và phân bổ tài sản gia đình chuẩn ngân hàng quốc tế.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                    <span>Bản đồ 90 ngày đầu tiên chuyển dịch sự nghiệp sang vị trí Quản lý Tài chính mà không bị sốc thu nhập.</span>
                  </li>
                </ul>

                {leadSent ? (
                  <div className="p-4 rounded-xl bg-white/10 border border-[#34D399]/40 text-sm text-emerald-100">
                    <strong className="text-white block mb-1">Đăng ký thành công!</strong>
                    Bộ tài liệu PDF và bản tin chia sẻ hàng tháng sẽ được gửi tới <span className="underline">{leadEmail}</span>.
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-3 pt-1">
                    <input
                      type="email"
                      required
                      placeholder="Nhập địa chỉ Email của bạn..."
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white text-[#111827] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A758]"
                    />
                    <button
                      type="submit"
                      className="w-full py-3.5 px-5 rounded-xl bg-[#00A758] hover:bg-[#008A47] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Tôi Muốn Nhận Tài Liệu Miễn Phí</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NGƯỜI PHỤ NỮ TRONG GIA ĐÌNH & PHONG CÁCH SỐNG (INSPIRED BY THAI VAN LINH'S FAMILY SECTION) */}
      <section id="gia-dinh" className="py-20 lg:py-28 bg-[#F7FAF8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-14">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00A758] block">
                NGƯỜI PHỤ NỮ TRONG GIA ĐÌNH
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#111827] leading-tight">
                Điểm Tựa Tổ Ấm &amp; Người Bạn Đời Đồng Hành
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-4 text-[#4B5563] text-base leading-relaxed">
              <p>
                Bên cạnh vai trò là một người lãnh đạo quyết đoán trong công việc, Khánh Vân trước hết là một người vợ và người mẹ của hai con. Thấu hiểu niềm đam mê công việc và khát vọng phát triển của vợ, chồng chị luôn là người bạn đời tâm lý, đứng phía sau ủng hộ và san sẻ để chị yên tâm dấn thân ở những cột mốc thử thách nhất.
              </p>
              <p className="italic text-[#111827] font-medium border-l-4 border-[#00A758] pl-4">
                “Với Vân, đỉnh cao sự nghiệp không nằm ở những chiếc cúp vinh danh, mà là sự bình an khi trở về nhà bên chồng và hai con. Chính gia đình giúp Vân thấu hiểu sâu sắc giá trị của sự an tâm tài chính mà mình trao gửi đến mỗi khách hàng.”
              </p>
            </div>
          </div>

          {/* 2 Family Photos with Equal Height */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/GiaDinh_ChiVan_NgoiSofaPhongKhach.jpg',
                  category: 'TỔ ẤM GIA ĐÌNH',
                  title: 'Khoảnh Khắc Sum Vầy Bên Chồng Và Hai Con',
                  subtitle: 'Gia đình nhỏ luôn là nguồn động lực lớn nhất của chị Khánh Vân mỗi ngày.',
                })
              }
              className="lg:col-span-7 clean-card rounded-2xl p-3 cursor-pointer group"
            >
              <div className="overflow-hidden rounded-xl h-[300px] sm:h-[380px] lg:h-[420px] w-full bg-gray-100">
                <img
                  src="/images/GiaDinh_ChiVan_NgoiSofaPhongKhach.jpg"
                  alt="Gia đình chị Khánh Vân quây quần tại phòng khách"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <figcaption className="pt-3 px-1 flex items-center justify-between text-xs text-[#4B5563]">
                <span>
                  <strong className="text-[#111827]">Tổ ấm nhỏ:</strong> Nơi nạp lại năng lượng bình yên sau những giờ làm việc hết mình.
                </span>
                <span className="text-[#00A758] font-semibold shrink-0 ml-2">Xem ảnh &rarr;</span>
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/GiaDinh_ChiVan_AuYemConBenSanVuon.jpg',
                  category: 'BỐ MẸ ĐI LÀM',
                  title: 'Trọn Vẹn Yêu Thương Cùng Các Con',
                  subtitle: 'Làm chủ thời gian để đồng hành cùng con trong từng chặng đường khôn lớn.',
                })
              }
              className="lg:col-span-5 clean-card rounded-2xl p-3 cursor-pointer group"
            >
              <div className="overflow-hidden rounded-xl h-[300px] sm:h-[380px] lg:h-[420px] w-full bg-gray-100">
                <img
                  src="/images/GiaDinh_ChiVan_AuYemConBenSanVuon.jpg"
                  alt="Gia đình chị Khánh Vân yêu thương bên sân vườn"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <figcaption className="pt-3 px-1 flex items-center justify-between text-xs text-[#4B5563]">
                <span>
                  <strong className="text-[#111827]">Bố mẹ đi làm:</strong> Dành thời gian chất lượng bên hai con mỗi ngày.
                </span>
                <span className="text-[#00A758] font-semibold shrink-0 ml-2">Xem ảnh &rarr;</span>
              </figcaption>
            </figure>
          </div>

          {/* 3 Lifestyle & Discipline Photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/DuLich_ChiVan_BayKhinhKhiCauBinhMinh.jpg',
                  category: 'TRẢI NGHIỆM THẾ GIỚI',
                  title: 'Khám Phá Những Chân Trời Mới',
                  subtitle: 'Tận hưởng sự tự do và mở rộng tầm nhìn qua những chuyến đi quốc tế.',
                })
              }
              className="clean-card rounded-2xl p-3 cursor-pointer group"
            >
              <div className="overflow-hidden rounded-xl aspect-[4/4.6] bg-gray-100">
                <img
                  src="/images/DuLich_ChiVan_BayKhinhKhiCauBinhMinh.jpg"
                  alt="Chị Khánh Vân trải nghiệm bay khinh khí cầu lúc bình minh"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <figcaption className="pt-3 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A758] block">
                  Tầm Nhìn &amp; Tự Do
                </span>
                <p className="text-sm font-semibold text-[#111827] mt-0.5">
                  Mở rộng thế giới quan qua những hành trình trải nghiệm quốc tế
                </p>
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/DoiThuong_ChiVan_SelfiePhongTapGym.jpg',
                  category: 'SỐNG KỶ LUẬT & KHỎE MẠNH',
                  title: 'Rèn Luyện Thể Thao Đều Đặn Mỗi Tuần',
                  subtitle: 'Duy trì sức bền thể chất và tinh thần minh mẫn cho công việc.',
                })
              }
              className="clean-card rounded-2xl p-3 cursor-pointer group"
            >
              <div className="overflow-hidden rounded-xl aspect-[4/4.6] bg-gray-100">
                <img
                  src="/images/DoiThuong_ChiVan_SelfiePhongTapGym.jpg"
                  alt="Chị Khánh Vân rèn luyện tại phòng tập gym"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <figcaption className="pt-3 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A758] block">
                  Kỷ Luật Sức Khỏe
                </span>
                <p className="text-sm font-semibold text-[#111827] mt-0.5">
                  Rèn luyện thể lực bền bỉ để luôn giữ nguồn năng lượng tích cực
                </p>
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/DuLich_ChiVanCungChong_ChupAnhBenCangBien.jpg',
                  category: 'NGƯỜI BẠN ĐỜI ĐỒNG HÀNH',
                  title: 'Sánh Bước Cùng Chồng Trên Mọi Chặng Đường',
                  subtitle: 'Sự thấu hiểu của người bạn đời là hậu phương vững chắc nhất.',
                })
              }
              className="clean-card rounded-2xl p-3 cursor-pointer group"
            >
              <div className="overflow-hidden rounded-xl aspect-[4/4.6] bg-gray-100">
                <img
                  src="/images/DuLich_ChiVanCungChong_ChupAnhBenCangBien.jpg"
                  alt="Chị Khánh Vân cùng chồng du lịch bên cảng biển"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <figcaption className="pt-3 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A758] block">
                  Hậu Phương Vững Chắc
                </span>
                <p className="text-sm font-semibold text-[#111827] mt-0.5">
                  Đồng hành cùng người bạn đời trong cả sự nghiệp lẫn cuộc sống
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 8. PHƯƠNG THỨC HỢP TÁC (WORK WITH ME — INSPIRED BY THAI VAN LINH'S /PAGES/WORK-WITH-ME-VN) */}
      <section id="hop-tac" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#E6F5EC] text-[#00A758] text-xs font-semibold uppercase tracking-wider">
              PHƯƠNG THỨC HỢP TÁC &amp; ĐỒNG HÀNH
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#111827]">
              Kết Nối &amp; Làm Việc Cùng Khánh Vân
            </h2>
            <p className="text-base text-[#4B5563]">
              Dù bạn đang tìm kiếm một cố vấn hoạch định gia sản cho gia đình hay một người Mentor dẫn dắt sự nghiệp quản lý, Vân và đội ngũ luôn sẵn sàng lắng nghe.
            </p>
          </div>

          {/* 3 Ways to Work Together (Like Thái Vân Linh's Work With Me page) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="clean-card rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#E6F5EC] text-[#00A758] flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A758]">
                  01 &bull; DÀNH CHO KHÁCH HÀNG &amp; GIA ĐÌNH
                </span>
                <h3 className="text-xl font-bold text-[#111827] mt-2 mb-3">
                  Cố Vấn Hoạch Định Tài Chính &amp; Bảo Vệ Gia Sản
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Phân tích cấu trúc dòng tiền, kiểm soát rủi ro và thiết kế kế hoạch bảo vệ thu nhập, quỹ học vấn cho con cái và hưu trí an nhàn theo chuẩn mực minh bạch của ngân hàng quốc tế.
                </p>
              </div>
              <a
                href="#form-lien-he"
                onClick={() =>
                  setFormData({
                    ...formData,
                    topic: 'Cố vấn Hoạch định Tài chính & Gia sản Gia đình',
                  })
                }
                className="mt-6 pt-4 border-t border-gray-100 inline-flex items-center gap-2 text-sm font-semibold text-[#00A758] hover:text-[#003822]"
              >
                <span>Đặt lịch cố vấn 1:1</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="clean-card rounded-2xl p-7 flex flex-col justify-between border-2 border-[#00A758] relative">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#00A758] text-white flex items-center justify-center mb-5">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A758]">
                  02 &bull; DÀNH CHO CỰU BANKER &amp; QUẢN LÝ
                </span>
                <h3 className="text-xl font-bold text-[#111827] mt-2 mb-3">
                  Phát Triển Nhà Quản Lý Tài Chính Kế Cận (Mentorship F1)
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Vân trực tiếp kèm cặp 1-1, chuyển giao quy trình xây dựng và vận hành đội ngũ chuyên nghiệp dành cho Cựu Banker, Cấp quản lý kinh doanh và Chủ doanh nghiệp muốn bứt phá thu nhập.
                </p>
              </div>
              <a
                href="#form-lien-he"
                onClick={() =>
                  setFormData({
                    ...formData,
                    topic: 'Đồng hành Phát triển Sự nghiệp Quản lý (Mentorship F1)',
                  })
                }
                className="mt-6 pt-4 border-t border-gray-100 inline-flex items-center gap-2 text-sm font-semibold text-[#00A758] hover:text-[#003822]"
              >
                <span>Ứng tuyển chương trình Quản lý F1</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="clean-card rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#E6F5EC] text-[#00A758] flex items-center justify-center mb-5">
                  <Mic className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A758]">
                  03 &bull; ĐÀO TẠO &amp; SỰ KIỆN
                </span>
                <h3 className="text-xl font-bold text-[#111827] mt-2 mb-3">
                  Huấn Luyện Đội Ngũ, Hội Nghị &amp; Chia Sẻ Nghề Nghiệp
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Chia sẻ thực tế tại các hội thảo, sự kiện doanh nghiệp về nghệ thuật xây dựng chữ “Tín” trong kinh doanh, kỹ năng lãnh đạo thấu cảm và nâng cao hiệu suất đội ngũ.
                </p>
              </div>
              <a
                href="#form-lien-he"
                onClick={() =>
                  setFormData({
                    ...formData,
                    topic: 'Mời Đào tạo / Chia sẻ Sự kiện Doanh nghiệp',
                  })
                }
                className="mt-6 pt-4 border-t border-gray-100 inline-flex items-center gap-2 text-sm font-semibold text-[#00A758] hover:text-[#003822]"
              >
                <span>Liên hệ lịch đào tạo &amp; sự kiện</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Team Ecosystem Photos + Contact Form */}
          <div id="form-lien-he" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6">
            {/* Left 6 Cols: 3 Mentorship & Team Culture Photos */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  Môi Trường Đào Tạo Bài Bản &amp; Văn Hóa Đội Ngũ Gắn Kết
                </h3>
                <p className="text-sm sm:text-base text-[#4B5563] mt-2 leading-relaxed">
                  Khi đồng hành cùng hệ thống của Vân, bạn không bao giờ phải đi một mình. Chúng tôi kết hợp kỷ luật chuyên môn với văn hóa sẻ chia gần gũi như một gia đình.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <figure
                  onClick={() =>
                    setLightbox({
                      src: '/images/PhongDaoTao_ChiVan_ChiaSeTruyenLua.jpg',
                      category: 'ĐÀO TẠO THỰC CHIẾN',
                      title: 'Trực Tiếp Đứng Lớp Đào Tạo Chuyên Môn',
                      subtitle: 'Chuyển giao kỹ năng tư vấn và quản trị đội ngũ tại văn phòng Manulife.',
                    })
                  }
                  className="clean-card rounded-xl p-2 cursor-pointer group"
                >
                  <div className="overflow-hidden rounded-lg aspect-[4/3]">
                    <img
                      src="/images/PhongDaoTao_ChiVan_ChiaSeTruyenLua.jpg"
                      alt="Chị Khánh Vân đứng lớp đào tạo"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <figcaption className="pt-2 px-1 text-xs font-medium text-[#111827]">
                    Đào tạo và truyền lửa thực chiến hàng tuần
                  </figcaption>
                </figure>

                <figure
                  onClick={() =>
                    setLightbox({
                      src: '/images/SuKien_ChiVanCungDoiNgu_ChucMungThangCapSM.jpg',
                      category: 'PHÁT TRIỂN QUẢN LÝ',
                      title: 'Vinh Danh Các Quản Lý Cấp Cao Mới Thăng Cấp',
                      subtitle: 'Đồng hành cùng cộng sự chinh phục các nấc thang quản lý SM, DRD.',
                    })
                  }
                  className="clean-card rounded-xl p-2 cursor-pointer group"
                >
                  <div className="overflow-hidden rounded-lg aspect-[4/3]">
                    <img
                      src="/images/SuKien_ChiVanCungDoiNgu_ChucMungThangCapSM.jpg"
                      alt="Chúc mừng thăng cấp Quản lý SM"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <figcaption className="pt-2 px-1 text-xs font-medium text-[#111827]">
                    Chúc mừng các Quản lý (SM) thăng cấp
                  </figcaption>
                </figure>
              </div>

              <figure
                onClick={() =>
                  setLightbox({
                    src: '/images/DoiThuong_ChiVanCungDoiNgu_CaPheViaHe.jpg',
                    category: 'VĂN HÓA ĐỘI NGŨ',
                    title: 'Gắn Kết Chân Thành Trong Đời Thường',
                    subtitle: 'Không khoảng cách giữa sếp và nhân sự, luôn lắng nghe và chia sẻ cùng nhau.',
                  })
                }
                className="clean-card rounded-xl p-2.5 cursor-pointer group"
              >
                <div className="overflow-hidden rounded-lg aspect-[16/9]">
                  <img
                    src="/images/DoiThuong_ChiVanCungDoiNgu_CaPheViaHe.jpg"
                    alt="Chị Khánh Vân cà phê sáng giản dị cùng cộng sự"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <figcaption className="pt-2.5 px-1 text-xs text-[#4B5563]">
                  <strong className="text-[#111827]">Văn hóa gần gũi:</strong> Sếp và cộng sự thân thiết, sẻ chia từ những buổi cà phê sáng đời thường.
                </figcaption>
              </figure>
            </div>

            {/* Right 6 Cols: Clean Light Contact Form */}
            <div className="lg:col-span-6">
              <div className="p-7 sm:p-10 rounded-3xl bg-[#F8FAFC] border border-gray-200 shadow-elevated">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A758] block">
                  KẾT NỐI TRỰC TIẾP &amp; BẢO MẬT
                </span>
                <h3 className="text-2xl font-bold text-[#111827] mt-1 mb-2">
                  Gửi Thông Tin Liên Hệ Cùng Khánh Vân
                </h3>
                <p className="text-sm text-[#4B5563] mb-6">
                  Vui lòng để lại thông tin bên dưới. Mọi chia sẻ về công việc hiện tại của bạn đều được giữ kín 100%.
                </p>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-white border border-[#00A758] text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#E6F5EC] text-[#00A758] mx-auto flex items-center justify-center">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-[#111827]">
                      Cảm ơn {formData.fullName} đã kết nối!
                    </h4>
                    <p className="text-sm text-[#4B5563] leading-relaxed">
                      Khánh Vân và trợ lý đã nhận được thông tin của bạn và sẽ liên hệ trực tiếp qua số điện thoại <strong className="text-[#111827]">{formData.phone}</strong> trong vòng 24 giờ làm việc.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
                    >
                      Gửi thêm thông tin khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Họ và Tên của bạn <span className="text-[#00A758]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Nguyễn Minh Anh"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#111827] placeholder-gray-400 text-sm focus:outline-none focus:border-[#00A758] focus:ring-1 focus:ring-[#00A758]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Số điện thoại / Zalo <span className="text-[#00A758]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="090x xxx xxx"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#111827] placeholder-gray-400 text-sm focus:outline-none focus:border-[#00A758] focus:ring-1 focus:ring-[#00A758]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Địa chỉ Email <span className="text-[#00A758]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="email@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#111827] placeholder-gray-400 text-sm focus:outline-none focus:border-[#00A758] focus:ring-1 focus:ring-[#00A758]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Nội dung bạn muốn kết nối
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#111827] text-sm focus:outline-none focus:border-[#00A758] focus:ring-1 focus:ring-[#00A758]"
                      >
                        <option value="Đồng hành Phát triển Sự nghiệp Quản lý (Mentorship F1)">
                          Tìm hiểu Chương trình Phát triển Quản lý Kế cận (Mentorship F1)
                        </option>
                        <option value="Cố vấn Hoạch định Tài chính & Gia sản Gia đình">
                          Tư vấn Hoạch định Tài chính &amp; Bảo vệ Gia sản Gia đình
                        </option>
                        <option value="Mời Đào tạo / Chia sẻ Sự kiện Doanh nghiệp">
                          Mời Đào tạo / Giao lưu Chia sẻ Nghề nghiệp
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Lĩnh vực hiện tại của bạn
                      </label>
                      <select
                        value={formData.background}
                        onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#111827] text-sm focus:outline-none focus:border-[#00A758] focus:ring-1 focus:ring-[#00A758]"
                      >
                        <option value="Cựu Banker / Chuyên viên Ngân hàng">
                          Nhân sự / Quản lý Ngân hàng (Banker)
                        </option>
                        <option value="Quản lý Kinh doanh / Văn phòng">
                          Quản lý Kinh doanh / Nhân sự Văn phòng
                        </option>
                        <option value="Chủ Doanh nghiệp / Kinh doanh tự do">
                          Chủ Doanh nghiệp / Kinh doanh tự do
                        </option>
                        <option value="Khác">Lĩnh vực khác</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Lời nhắn cho Khánh Vân (Tùy chọn)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Chia sẻ ngắn gọn về mong muốn hoặc câu hỏi của bạn..."
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#111827] placeholder-gray-400 text-sm focus:outline-none focus:border-[#00A758] focus:ring-1 focus:ring-[#00A758] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-[#00A758] hover:bg-[#008A47] text-white font-semibold text-sm shadow-emerald-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Gửi Thông Tin Kết Nối</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER — CLEAN CORPORATE MANULIFE FOOTER */}
      <footer className="bg-[#002818] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
            <div className="md:col-span-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-end gap-1">
                  <span className="w-1.5 h-5 bg-[#00A758]" />
                  <span className="w-1.5 h-5 bg-[#00A758]" />
                  <span className="w-1.5 h-5 bg-[#00A758]" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  NGUYỄN THỊ KHÁNH VÂN
                </span>
              </div>
              <p className="text-sm text-emerald-100/75 max-w-md leading-relaxed">
                Giám đốc Vùng Cấp cao (DRD+) tại Manulife Việt Nam &bull; Nhà Quản lý Xuất sắc nhất Châu Á (2021). Chia sẻ kiến thức hoạch định tài chính, phát triển sự nghiệp và cân bằng cuộc sống.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#34D399]">
                Chuyên Mục
              </h4>
              <ul className="space-y-2 text-sm text-emerald-100/80">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#34D399]">
                Mạng Xã Hội
              </h4>
              <div className="flex flex-col gap-2 text-sm text-emerald-100/80">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Facebook Cá Nhân</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#34D399]" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#34D399]" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/60">
            <p>© 2026 Nguyen Thi Khanh Van. All Rights Reserved. khanhvanfinance.com</p>
            <a
              href="https://eod.khanhvanfinance.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              [Cổng Báo Cáo Nội Bộ EOD]
            </a>
          </div>
        </div>
      </footer>

      {/* ARTICLE READER MODAL (FOR BLOG POSTS) */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveArticle(null)}
            className="fixed inset-0 z-50 bg-gray-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 my-8 max-h-[90vh] flex flex-col"
            >
              <div className="relative h-56 sm:h-64 bg-gray-100 shrink-0">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-gray-800 hover:bg-white shadow-md"
                  aria-label="Đóng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-10 overflow-y-auto space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-[#E6F5EC] text-[#003822] font-semibold">
                    {activeArticle.category}
                  </span>
                  <span className="text-gray-500">{activeArticle.date}</span>
                  <span className="text-gray-400">&bull;</span>
                  <span className="text-gray-500">{activeArticle.readTime}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] leading-snug">
                  {activeArticle.title}
                </h3>

                <div className="space-y-4 text-[#374151] text-base leading-relaxed">
                  {activeArticle.content.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-[#F4FAF7] border border-[#00A758]/25 space-y-2.5 mt-6">
                  <h4 className="text-sm font-bold text-[#003822] uppercase tracking-wider">
                    Điểm Cốt Lõi Cần Nhớ:
                  </h4>
                  <ul className="space-y-2 text-sm text-[#374151]">
                    {activeArticle.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00A758] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Tác giả: Nguyễn Thị Khánh Vân</span>
                  <a
                    href="#hop-tac"
                    onClick={() => setActiveArticle(null)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00A758] hover:text-[#003822]"
                  >
                    <span>Đặt câu hỏi hoặc kết nối cùng chị Vân</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-gray-900/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="relative bg-gray-950 flex items-center justify-center max-h-[75vh]">
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-gray-900 hover:bg-white"
                  aria-label="Đóng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 sm:p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A758] block">
                  {lightbox.category}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-[#111827] mt-1">
                  {lightbox.title}
                </h4>
                <p className="text-sm text-[#4B5563] mt-1">{lightbox.subtitle}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
