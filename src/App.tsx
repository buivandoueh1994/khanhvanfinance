import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  Menu,
  Play,
  Share2,
  ShieldCheck,
  X,
} from 'lucide-react';
import { VIDEO_LIBRARY, VideoItem } from './data/videos';
import { VideoLibrarySection } from './components/VideoLibrarySection';
import { AiAdvisorWidget } from './components/AiAdvisorWidget';
import { trackEvent, trackLeadConversion } from './utils/analytics';

const FACEBOOK_URL = 'https://www.facebook.com/nguyen.t.van.9250?locale=vi_VN';
const ZALO_URL = 'https://zalo.me/0931579771';
const PHONE_DISPLAY = '0931 579 771';

const FacebookBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
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
      fill="url(#messenger-manulife-grad)"
    />
    <defs>
      <linearGradient id="messenger-manulife-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00A758" />
        <stop offset="55%" stopColor="#008746" />
        <stop offset="100%" stopColor="#0A3622" />
      </linearGradient>
    </defs>
  </svg>
);

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
  content: string | string[];
  keyTakeaways: string[];
  image?: string;
  imageCaption?: string;
  featured?: boolean;
}

const ARTICLES: Article[] = [
  {
    id: 'rut-du-tien-goc-tai-khoan-van-gap-doi-xanh-phu-quy',
    index: '01',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 11, 2026',
    readTime: '6 phút đọc',
    featured: true,
    image: '/images/articles/Article_XanhPhuQuy_CauTrucHaiGiaiDoan.jpg',
    imageCaption: 'Đội ngũ Quản lý Green Power rà soát kịch bản dòng tiền hai giai đoạn cho khách hàng hoạch định gia sản dài hạn.',
    title: 'Rút đủ tiền gốc mà tài khoản vẫn còn gấp đôi: cấu trúc hai giai đoạn của Xanh Phú Quý',
    excerpt:
      'Đóng 2,5 tỷ đồng trong 10 năm đầu, rút ra đủ 2,5 tỷ trong 10 năm tiếp theo, đến năm thứ 20 tài khoản minh họa vẫn còn khoảng 5,36 tỷ. Mỗi năm chỉ rút một phần nhỏ, phần còn lại tiếp tục hưởng lãi kép.',
    content: `*Đóng 2,5 tỷ đồng đều đặn trong 10 năm đầu, rút ra đủ 2,5 tỷ đồng trong 10 năm tiếp theo, vậy mà đến năm thứ 20 giá trị tài khoản minh họa vẫn còn khoảng 5,36 tỷ đồng. Lần đầu xem bảng dòng tiền này, nhiều anh chị hỏi lại Vân là có nhầm con số nào không.*

## Thói quen chờ đến ngày đáo hạn

Băn khoăn đó rất tự nhiên. Phần lớn chúng ta quen với kiểu tích lũy một chiều: bỏ tiền vào đều đặn, khóa suốt mười lăm hay hai mươi năm, tới ngày đáo hạn mới nhận về một cục tiền.

Với cách nghĩ đó, rút tiền giữa chừng gần như là phá kế hoạch hoặc chịu phạt phí. Nỗi sợ bị chôn vốn khiến không ít gia đình chần chừ với các giải pháp tích lũy dài hạn, dù ai cũng biết mình cần một khoản giữ cho tuổi hưu và tương lai của con.

## Hai giai đoạn: 10 năm nuôi quỹ, 10 năm rút dùng

Xanh Phú Quý là giải pháp bảo hiểm liên kết đơn vị, chia 20 năm thành hai giai đoạn:

- **Giai đoạn 1 (năm 1 đến năm 10):** Người tham gia đóng phí đều mỗi năm để xây nền vốn gốc, đồng thời có ngay quyền lợi bảo vệ sinh mạng cho người trụ cột. Phần tiền phân bổ vào các quỹ liên kết đơn vị do Công ty Quản lý Quỹ Manulife vận hành, tích lũy đơn vị quỹ qua từng chu kỳ thị trường.
- **Giai đoạn 2 (từ năm thứ 11 trở đi):** Khách hàng được rút tiền định kỳ mỗi năm một lần, tối đa **10% tổng phí bảo hiểm cơ bản đã đóng trong 10 năm đầu**, để đóng học phí cho con, đi du lịch hoặc bổ sung dòng tiền sinh hoạt, mà **không làm giảm các khoản Thưởng Tri Ân** của hợp đồng.

Vân lấy ví dụ từ hồ sơ một khách nam 35 tuổi mà Vân từng thiết kế lộ trình. Mỗi năm anh đóng 250 triệu đồng trong 10 năm, tổng vốn gốc là 2,5 tỷ đồng. Từ năm thứ 11 đến năm thứ 20, mỗi năm anh rút đúng 250 triệu đồng. Sau 10 lần rút, anh đã thu hồi đủ 2,5 tỷ đồng tiền gốc. Phần còn lại nằm trong Quỹ Tăng Trưởng vẫn tiếp tục sinh lãi kép. Với tỷ suất đầu tư minh họa 9%/năm, đến cuối năm thứ 20 giá trị tài khoản ước tính vẫn đạt khoảng **5,36 tỷ đồng**.

## Ba điều cần đọc kỹ trước khi ký

Con số 5,36 tỷ đồng nhìn rất đẹp. Nhưng từ 8 năm làm ngân hàng quốc tế, Vân luôn nhắc khách xem kỹ ba điểm này trước khi quyết định:

- **Thứ nhất, hiểu đúng lãi suất minh họa:** Mức 9%/năm là giả định minh họa dựa trên hiệu quả đầu tư dài hạn của quỹ cổ phiếu, không phải mức lãi cam kết cố định. Khi ngồi với cố vấn, anh chị nên yêu cầu xem cả cột kịch bản tỷ suất thấp để biết tài sản có thể dao động đến đâu trong những năm thị trường trầm lắng.
- **Thứ hai, không rút cạn một lần:** Tài khoản vẫn lớn dù đã rút đủ tiền gốc là vì mỗi năm mình chỉ lấy 10%, phần lớn tài sản tích lũy từ 10 năm đầu ở lại làm việc trong quỹ.
- **Thứ ba, 10 năm đầu phải đóng đủ:** Quyền lợi từ năm thứ 11 chỉ có khi gia đình đi hết 10 năm đầu. Nên chọn mức phí từ 10% đến 15% thu nhập ổn định để đi cho nhẹ nhàng, không đứt gánh.

Tích lũy thông minh không bắt mình nhịn chi tiêu đến cuối đời mới được hưởng. Mười năm đầu mình kiên nhẫn nuôi quỹ, mười năm sau quỹ quay lại lo cho những dự định của gia đình đúng lúc cần.`,
    keyTakeaways: [
      'Cấu trúc hai giai đoạn của Xanh Phú Quý giúp giải tỏa nỗi lo chôn vốn: 10 năm đầu đóng phí xây nền, từ năm thứ 11 được rút định kỳ tối đa 10% tổng phí cơ bản mỗi năm mà vẫn giữ nguyên Thưởng Tri Ân.',
      'Mỗi năm chỉ rút 10% giúp thu hồi đủ tiền gốc sau một thập kỷ, trong khi phần tài sản còn lại vẫn tiếp tục nhân lên nhờ lãi kép.',
      'Luôn đối chiếu kịch bản tỷ suất minh họa cao và thấp, đồng thời cân đối mức phí trong khoảng 10% đến 15% thu nhập để giữ được 10 năm đóng phí đầu.',
    ],
  },
  {
    id: 'thang-than-vi-thuong-gop-y-de-cong-su-gioi-len',
    index: '02',
    category: 'Phát triển Sự nghiệp',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: true,
    image: '/images/articles/Article_RadicalCandor_ThangThanViThuong.jpg',
    imageCaption: 'Kèm cặp 1-1 tại Green Power: góp ý riêng, nói thẳng vào nghiệp vụ và cùng cộng sự sửa ngay trên tình huống thực tế.',
    title: 'Thẳng thắn vì thương: góp ý để cộng sự giỏi lên mà không thấy bị phán xét',
    excerpt:
      'Góp ý sao cho người nghe không tự ái mà vẫn tiến bộ? Từ cuốn Radical Candor của Kim Scott và thực tế dẫn dắt 64 quản lý, Vân chọn đứng giữa hai thái cực: quan tâm thật lòng đến con người và nói thẳng vào công việc.',
    content: `*“Góp ý thế nào để một người giỏi lên mà không thấy mình bị phán xét?” Câu hỏi ấy theo Vân suốt những năm đầu tập làm quản lý. Câu trả lời rõ nhất Vân tìm được là từ cuốn Radical Candor của Kim Scott, cựu giám đốc điều hành tại Google và Apple. Tinh thần của sách gói trong bốn chữ: thẳng thắn vì thương.*

## Hai cái bẫy của người làm sếp

Khi từ người làm chuyên môn giỏi lên dẫn dắt đội ngũ, quản lý trẻ thường rơi vào một trong hai thái cực:

- **Gay gắt, thiếu thấu cảm:** Quá sốt ruột với chỉ tiêu hoặc cầu toàn, người sếp nhận xét nặng lời ngay trước tập thể. Nhân sự sửa lỗi ngay lúc đó vì sợ, nhưng sau vài lần họ thu mình lại, giấu cái dốt và không dám thử cách làm mới.
- **Xuê xoa vì ngại va chạm:** Cái bẫy này tinh vi hơn, hay gặp ở những quản lý hiền. Sợ mất lòng, sợ cộng sự buồn rồi nghỉ, mình chỉ khen xã giao cho êm chuyện. Phòng họp lúc nào cũng hòa thuận, nhưng cộng sự dậm chân tại chỗ vì không ai chỉ cho họ điểm mù của mình.

Qua chặng đường làm việc với hơn 500 nhân sự, Vân nhận ra im lặng xuê xoa thì dễ chịu trước mắt, nhưng về lâu dài lại là cách đối xử thiếu tử tế nhất với một người đang cùng mình trưởng thành.

## Khen trước tập thể, chỉnh sửa riêng tư

Áp dụng Radical Candor vào vận hành Vùng, Vân tập cho mình và các quản lý cấp cao giữ song song hai vế: **quan tâm thật lòng đến con người** và **nói thẳng vào chất lượng công việc**.

Trong từng buổi kèm cặp, nguyên tắc ấy thành ba động tác nhỏ:

- **Khen cụ thể trước tập thể:** Khi một bạn làm tốt, đừng chỉ nói *“Em giỏi lắm”*. Hãy gọi tên đúng hành động, chẳng hạn bạn kiên nhẫn kiểm tra lại lịch sử y khoa của khách trước khi nộp hồ sơ thẩm định. Lời khen đúng chỗ trở thành tiêu chuẩn chung cho cả nhóm học theo.
- **Góp ý riêng, tách hành vi khỏi con người:** Khi cần chỉnh, Vân mời bạn ngồi riêng ở một góc yên tĩnh. Mình nói về một tình huống cụ thể chưa chuẩn trong buổi tư vấn sáng nay, không quy sang năng lực hay tính cách của bạn.
- **Cùng sửa ngay trên một bài toán thật:** Góp ý xong không để bạn tự loay hoay. Hai chị em mở lại đúng bộ giải pháp đó, làm mẫu lại từng câu hỏi khai thác nhu cầu để bạn thấy cách làm tốt hơn ngay trong tuần sau.

## Có lòng tin thì lời nói thẳng mới lọt tai

Khi cộng sự cảm nhận được người đứng đầu thật sự thương mình, thật sự muốn thu nhập và vị thế của mình vững hơn, thì những lời góp ý thẳng nhất cũng được đón nhận nhẹ nhàng.

Quan hệ bền trong một tổ chức lớn không xây bằng những lời khen lấy lòng. Nó xây từ những buổi ngồi lại sau một ca làm việc chưa tốt, nơi người dẫn dắt đủ bao dung để không phán xét và đủ trách nhiệm để không làm ngơ trước lỗi sai của người đi cùng.

Người ta hiếm khi sợ bị góp ý. Người ta chỉ sợ bị góp ý bởi một người không thật lòng muốn mình tốt lên.`,
    keyTakeaways: [
      'Tránh hai cái bẫy của người làm quản lý: gay gắt làm nhân sự thu mình, xuê xoa khiến cộng sự mãi không thấy điểm mù.',
      'Khen cụ thể trước tập thể để nhân rộng cách làm tốt, góp ý riêng tư và nhắm vào hành vi công việc thay vì phán xét con người.',
      'Sau mỗi lời góp ý thẳng, cùng cộng sự sửa ngay trên tình huống thật để họ tự tin làm tiếp.',
    ],
  },
  {
    id: 'khi-cha-me-phai-tam-dung-ke-hoach-cua-con-van-di-tiep',
    index: '03',
    category: 'Bố Mẹ Đi Làm',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: true,
    image: '/images/articles/Article_BaoPhiXanh_KeHoachCuaConVanDiTiep.jpg',
    imageCaption: 'Những người mẹ làm nghề hoạch định tài chính bên các con nhỏ, nơi mỗi kế hoạch tương lai đều có lớp dự phòng đi kèm.',
    title: 'Khi cha mẹ phải tạm dừng, kế hoạch của con vẫn đi tiếp',
    excerpt:
      'Rà soát hợp đồng học vấn cho con, phần lớn phụ huynh nghĩ quyền lợi miễn đóng phí chỉ có khi cha mẹ qua đời. Thực tế, người trụ cột mất hoàn toàn sức lao động còn gây áp lực dòng tiền nặng hơn nhiều.',
    content: `*Một người trụ cột đột ngột qua đời, và một người trụ cột còn ở bên gia đình nhưng không thể đi làm kiếm tiền nữa. Nhìn trên bảng dòng tiền của một gia đình, hoàn cảnh thứ hai nhiều khi tạo áp lực tài chính nặng và dai dẳng hơn.*

## Câu hỏi hay bị bỏ ngỏ khi lập hợp đồng cho con

Là mẹ của hai bé đang tuổi lớn, mỗi lần rà soát danh mục tích lũy học vấn cùng các gia đình trẻ, Vân hay nghe một câu hỏi thẳng: *“Chị Vân ơi, mình lập kế hoạch đóng 15 năm cho con, nhỡ giữa đường bố mẹ gặp chuyện không may thì hợp đồng của con ai đóng tiếp?”*

Đa số bố mẹ đều từng nghe cụm *“quyền lợi miễn đóng phí”*. Nhưng khi Vân hỏi quyền lợi ấy che chở gia đình trong những trường hợp nào, chín trên mười người vẫn nghĩ nó chỉ có khi cha mẹ không còn nữa.

Thực tế phức tạp hơn thế. Một tai nạn giao thông nghiêm trọng, biến chứng sau đột quỵ hoặc một bệnh hiểm nghèo giai đoạn nặng có thể giữ lại sinh mạng nhưng lấy đi vĩnh viễn khả năng làm việc của người cha hoặc người mẹ. Lúc đó gia đình chịu hai cú cùng lúc: thu nhập chính về số không, chi phí y tế và điều dưỡng dài hạn tăng vọt, trong khi phí học vấn của con vẫn đến hạn mỗi năm.

## Bảo Phí Xanh gỡ nút thắt này thế nào

Trong cấu trúc hoạch định gia sản tại Manulife, sản phẩm bổ trợ **Bảo Phí Xanh** (và phiên bản nâng cấp Bảo Phí Xanh 2026) được thiết kế để dòng tiền đóng phí không bị đứt trước ba nhóm biến cố nghiêm trọng của người trụ cột:

- **Tử vong:** Công ty bảo hiểm lập tức tiếp nhận nghĩa vụ đóng toàn bộ các kỳ phí còn lại của hợp đồng theo lộ trình ban đầu.
- **Mất bộ phận hoặc chức năng cơ thể vĩnh viễn:** Gồm các tổn thương không thể phục hồi ở hai tay, hai chân hoặc thị lực hai mắt, theo quy định điều khoản.
- **Tổn thương cơ thể nặng dẫn đến mất sức lao động hoàn toàn (Thương tật toàn bộ vĩnh viễn):** Khi tỷ lệ tổn thương cơ thể được hội đồng giám định y khoa xác nhận từ 81% trở lên theo quy tắc sản phẩm, hợp đồng được miễn đóng phí trong suốt thời hạn hiệu lực của quyền lợi.

Nhờ vậy, gia đình không phải dừng hợp đồng hay rút giá trị hoàn lại ít ỏi giữa chừng để lo biến cố. Tài khoản tích lũy của con vẫn giữ nguyên, đến năm 18 hay 22 tuổi con nhận đúng hẹn.

## Kiểm tra hợp đồng bằng ba dòng thông tin

Tình thương của cha mẹ dành cho con không có điều kiện, nhưng dòng tiền nuôi con ăn học thì phụ thuộc vào sức khỏe của người đi làm. Khi mở lại hợp đồng đang cất trong tủ, Vân khuyên anh chị dành năm phút kiểm tra ba dòng sau:

- **Ai đứng tên Bên mua bảo hiểm:** Quyền lợi miễn đóng phí cần gắn vào sinh mạng và sức khỏe lao động của người tạo ra thu nhập chính trong nhà.
- **Phạm vi miễn đóng phí:** Đọc kỹ xem hợp đồng hiện tại mới chỉ miễn phí khi tử vong, hay đã gồm cả Thương tật toàn bộ vĩnh viễn và bệnh lý nghiêm trọng.
- **Thời hạn bảo vệ của sản phẩm bổ trợ:** Thời hạn Bảo Phí Xanh phải khớp với số năm cha mẹ cam kết đóng phí cho con.

Kế hoạch cho con chỉ vững khi nó tự đi tiếp được đến cuối, kể cả những ngày cha mẹ buộc phải dừng lại để nghỉ ngơi và chữa bệnh.`,
    keyTakeaways: [
      'Mất hoàn toàn khả năng lao động (Thương tật toàn bộ vĩnh viễn) thường gây áp lực dòng tiền nặng hơn vì gia đình vừa mất thu nhập vừa gánh chi phí chăm sóc dài hạn.',
      'Quyền lợi bổ trợ Bảo Phí Xanh giúp Manulife đóng thay phần phí định kỳ còn lại, cả khi cha mẹ tử vong lẫn khi bị Thương tật toàn bộ vĩnh viễn theo điều khoản.',
      'Khi lập hợp đồng học vấn cho con, cần gắn quyền lợi miễn đóng phí vào đúng người tạo thu nhập chính và cho khớp thời hạn đóng phí dự kiến.',
    ],
  },
  {
    id: 'ngoai-the-kham-om-vat-lop-bao-ve-benh-ly-tre-nho',
    index: '04',
    category: 'Bố Mẹ Đi Làm',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: false,
    image: '/images/articles/Article_LaChanXanh_BaoVeBenhLyTreEm.jpg',
    imageCaption: 'Các em nhỏ bên mẹ tại văn phòng xanh. Chuẩn bị sớm giúp cha mẹ chủ động hơn trước những rủi ro y tế riêng của tuổi thiếu nhi.',
    title: 'Ngoài thẻ khám ốm vặt, con còn cần lớp bảo vệ trước bệnh nặng đặc thù của trẻ nhỏ',
    excerpt:
      'Phần lớn cha mẹ mua bảo hiểm cho con bắt đầu từ chiếc thẻ khám sốt, viêm họng. Nhưng những bệnh đặc thù ở trẻ em như Kawasaki biến chứng tim hay thấp tim mới cần một khoản dự phòng tiền mặt độc lập.',
    content: `*Hầu hết các cặp vợ chồng trẻ nhắn hỏi Vân về bảo hiểm đầu đời cho bé đều bắt đầu từ một mong muốn: làm chiếc thẻ sức khỏe để mỗi lần con ho sốt, viêm phế quản vào viện quốc tế đỡ xót tiền. Suy nghĩ đó rất thực tế, vì ốm vặt theo mùa là chuyện bố mẹ gặp thường xuyên nhất trong những năm đầu đời của con.*

## Thẻ thanh toán viện phí và quỹ dự phòng tiền mặt khác nhau chỗ nào

Làm mẹ của hai con, Vân hiểu cảm giác yên tâm khi cầm thẻ bảo lãnh viện phí đưa con đi khám. Nhưng nhìn từ góc độ rủi ro gia đình, thẻ chăm sóc sức khỏe mới lo được vế thứ nhất: **thanh toán hóa đơn y tế cho bệnh viện**.

Khi đọc kỹ danh mục bệnh nhi khoa, nhiều phụ huynh giật mình vì có một nhóm bệnh nặng chỉ xuất hiện ở trẻ nhỏ và thanh thiếu niên:

- **Bệnh Kawasaki có biến chứng tim mạch:** Hội chứng viêm mạch máu cấp tính ở trẻ nhỏ, có thể gây phình động mạch vành nếu diễn tiến phức tạp.
- **Bệnh thấp tim có tổn thương van tim, sốt bại liệt, bệnh xương thủy tinh, hen suyễn cấp tính nặng hoặc đái tháo đường phụ thuộc insulin khởi phát sớm.**

Những bệnh này hiếm gặp hơn nhiều so với viêm họng, sốt siêu vi hằng ngày. Nhưng một khi xảy ra, bài toán của gia đình không còn nằm trong hóa đơn giường bệnh. Bố hoặc mẹ thường phải xin nghỉ không lương hàng tháng trời để túc trực chăm con, cộng thêm chi phí dinh dưỡng chuyên biệt, phục hồi chức năng và đi lại tái khám suốt nhiều năm.

## Lá Chắn Xanh cho trẻ dưới 18 tuổi có gì đáng chú ý

Trước đây, nhiều sản phẩm bệnh lý nghiêm trọng dùng chung một danh sách bệnh của người lớn (như nhồi máu cơ tim, tai biến mạch máu não, ung thư tuổi trung niên) rồi áp sang cho trẻ nhỏ, nên mức bảo vệ thực tế cho tuổi thiếu nhi chưa sát.

Với sản phẩm bổ trợ **Lá Chắn Xanh** của Manulife, quyền lợi cho trẻ em dưới 18 tuổi được thiết kế sát thực tế hơn:

- **Mặc định bảo vệ thêm 10 Bệnh Lý Nghiêm Trọng Trẻ Em:** Ngoài danh sách 56 bệnh lý nghiêm trọng giai đoạn cuối theo chuẩn chung, trẻ dưới 18 tuổi có sẵn quyền lợi bảo vệ trước 10 bệnh lý đặc thù của lứa tuổi thiếu nhi, không phải đóng thêm phụ phí riêng.
- **Chi trả một lần 100% Số tiền bảo hiểm (tối đa 1 tỷ đồng):** Khoản tiền mặt được giải ngân về tài khoản gia đình ngay khi có chẩn đoán thỏa điều kiện điều khoản, độc lập với thẻ sức khỏe đang thanh toán viện phí.
- **Tham gia sớm từ 30 ngày tuổi:** Bố mẹ có thể có quyền lợi bảo vệ cho bé từ những tháng đầu đời, với mức phí rủi ro còn rất nhẹ.

## Hai lớp bảo vệ vừa đủ cho con

Chuẩn bị sức khỏe cho con không có nghĩa là mua thật nhiều hợp đồng đắt tiền. Điều cần là phối hợp đúng chức năng của từng lớp bảo vệ:

- **Lớp thứ nhất (Thẻ Chăm sóc Sức khỏe):** Lo những đợt ốm, nằm viện thường ngày để con được khám chữa ở nơi chu đáo, sạch sẽ.
- **Lớp thứ hai (Quỹ Bệnh lý Nghiêm trọng Trẻ em):** Một khoản tiền mặt dự phòng đủ lớn, để nếu có biến cố y tế lớn, bố mẹ có thể gác công việc lại và ở bên con suốt đợt điều trị dài ngày.

Cơn sốt mọc răng hay cảm cúm chuyển mùa thì bố mẹ nào cũng thấy trước mắt. Còn những rủi ro lớn, hiếm gặp nhưng nặng nề thì cần chuẩn bị từ lúc con còn khỏe mạnh.`,
    keyTakeaways: [
      'Thẻ chăm sóc sức khỏe thanh toán hóa đơn bệnh viện, nhưng khi trẻ mắc bệnh nặng kéo dài, gia đình cần thêm một quỹ tiền mặt độc lập để bù thu nhập khi cha mẹ nghỉ việc chăm con.',
      'Lá Chắn Xanh mặc định bảo vệ thêm 10 Bệnh Lý Nghiêm Trọng Trẻ Em (như Kawasaki biến chứng tim, thấp tim, xương thủy tinh) cho trẻ dưới 18 tuổi từ 30 ngày tuổi, chi trả 100% Số tiền bảo hiểm, tối đa 1 tỷ đồng.',
      'Kết hợp thẻ y tế nội trú với quyền lợi bệnh lý nghiêm trọng giúp cha mẹ chủ động hơn mà chi phí hằng năm vẫn hợp lý.',
    ],
  },
  {
    id: 'doi-ngu-khong-doc-khau-hieu-nhin-nguoi-dan-dau-tam-gio-sang',
    index: '05',
    category: 'Kỷ luật Bản thân',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: false,
    image: '/images/articles/Article_KyLuatLamGuong_NguoiDanDauTamGioSang.jpg',
    imageCaption: 'Khánh Vân cùng đội ngũ Quản lý nòng cốt. Người đứng đầu chỉn chu, đúng giờ và nhất quán là thước đo rõ nhất cho văn hóa của tập thể.',
    title: 'Đội ngũ không đọc khẩu hiệu trên tường, họ nhìn người dẫn đầu lúc tám giờ sáng',
    excerpt:
      'Nhiều người nghĩ lãnh đạo bằng sự thấu cảm thì phải mềm mỏng, dễ dãi. Với Vân, sự ấm áp dành cho con người, còn sự nghiêm khắc dành cho tiêu chuẩn nghề nghiệp, và nó bắt đầu từ tác phong lúc tám giờ sáng của chính người đứng đầu.',
    content: `*Đội ngũ hiếm khi làm theo những dòng khẩu hiệu in đẹp treo trong phòng họp. Họ quan sát người dẫn đầu xuất hiện thế nào và làm việc ra sao vào đúng tám giờ sáng thứ Hai đầu tuần.*

## Thấu cảm không có nghĩa là dễ dãi

Khi biết Vân theo đuổi phong cách lãnh đạo thấu cảm trong một hệ thống phần lớn là phụ nữ có gia đình, không ít người nghĩ môi trường ấy hẳn mềm mỏng, xuề xòa và ít áp lực.

Điều hành một vùng kinh doanh hơn 500 nhân sự suốt nhiều năm cho Vân thấy điều ngược lại. Tập thể thiếu kỷ luật thì khó có sự bình yên lâu dài. Thấu cảm và kỷ luật đi cùng nhau được, miễn là người lãnh đạo phân định rõ hai ranh giới:

- **Ấm áp, bao dung với hoàn cảnh con người:** Khi con cộng sự ốm hay gia đình có việc đột xuất, tập thể sẵn sàng san sẻ, không tính toán.
- **Nghiêm khắc, nhất quán với tiêu chuẩn nghề nghiệp:** Từ đạo đức tư vấn trung thực, bảo mật thông tin khách hàng đến giờ giấc huấn luyện, không có vùng xám để nhân nhượng.

## Ba thói quen nhỏ tạo nên văn hóa

Vân học tác phong làm việc chuẩn xác từ 8 năm ở ngân hàng quốc tế ANZ, nên không thích quản bằng những bản nội quy dày đặc hình phạt. Vân tự đặt kỷ luật lên chính mình ở ba chi tiết nhỏ, lặp lại hằng tuần:

- **Có mặt trước giờ bắt đầu buổi đào tạo sáng:** Dù tối hôm trước họp muộn hay sáng phải đưa hai con đến trường, đã hẹn chia sẻ lúc 8h30 thì 8h15 Vân có mặt chỉnh lại bài giảng. Người đứng đầu tôn trọng thời gian của tập thể thì tự khắc không ai cho phép mình đi trễ.
- **Chỉn chu từ trang phục đến số liệu:** Dù là hội nghị hàng trăm người hay buổi kèm ba bạn quản lý mới, trang phục, sổ tay và bảng số liệu phân tích đều chuẩn bị tươm tất. Chỉn chu bên ngoài giúp mình quen không làm việc qua loa.
- **Minh bạch tiêu chí thi đua và thăng tiến từ ngày đầu:** Mọi chính sách thưởng trong Vùng đều công bố rõ bằng con số, để ai nhìn vào cũng biết mình được ghi nhận công bằng theo năng lực thật.

## Lời nói và việc làm lệch nhau thì tập thể tin việc làm

Vân từng thấy những đội hô khẩu hiệu quyết tâm rất vang đầu quý, nhưng người trưởng nhóm lại thường đến muộn nhất hoặc lỡ hẹn báo cáo mà không giải thích. Khi lời nói trên bục giảng và hành động ngoài đời lệch nhau, nhân sự sẽ sao chép hành động thực tế của người sếp.

Ngược lại, các bạn tư vấn viên mới vào Green Power thường hòa nhập nề nếp khá nhanh mà không cần ai nhắc nặng lời. Các bạn nhìn cách các anh chị Giám đốc Khu vực, Trưởng Phòng chuẩn bị hồ sơ kỹ từ sáng sớm, cách mọi người ăn mặc lịch sự và giữ chữ tín với từng cuộc hẹn khách, rồi tự điều chỉnh theo.

Người dẫn đầu giữ kỷ luật với bản thân trước thì không phải quát ai. Sự chuyên nghiệp cứ thế đi xuống từng tầng quản lý, lặng lẽ và bền hơn mọi tấm bảng khẩu hiệu.`,
    keyTakeaways: [
      'Lãnh đạo thấu cảm không có nghĩa là dễ dãi. Dành sự ấm áp cho hoàn cảnh con người, dành sự nghiêm khắc nhất quán cho tiêu chuẩn nghề nghiệp.',
      'Ba việc làm gương nặng hơn mọi bản nội quy: đến đúng giờ đào tạo sáng, chỉn chu trong mọi cuộc họp nhỏ và minh bạch tiêu chí đánh giá.',
      'Khi lời nói và việc làm của người đứng đầu khớp nhau, văn hóa chuyên nghiệp tự đi xuống đội ngũ mới mà không cần áp đặt.',
    ],
  },
  {
    id: 'nguoi-huong-noi-lam-tu-van-loi-the-canh-tranh',
    index: '06',
    category: 'Phát triển Sự nghiệp',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: false,
    image: '/images/BanDieuHanh_ChiVanCungTapTheQuanLy_SanhVom2026.jpg',
    imageCaption: 'Khánh Vân cùng Ban Điều Hành Hệ thống, nơi sự điềm đạm và khả năng lắng nghe là điểm tựa uy tín.',
    title: 'Người hướng nội làm tư vấn: điềm đạm và biết lắng nghe là lợi thế cạnh tranh',
    excerpt:
      'Vân nghe rất nhiều câu này từ các bạn làm chuyên môn sâu: “Em hướng nội, ngại đám đông, chắc em không hợp với nghề tư vấn chị ạ.” Nhưng quan sát hơn 500 nhân sự trong hệ thống, Vân thấy ngược lại. Khách hàng bây giờ không thiếu người nói hay, họ thiếu người nói đúng.',
    content: `*Vân nghe rất nhiều câu này từ các bạn làm chuyên môn sâu: “Em hướng nội, ngại đám đông, chắc em không hợp với nghề tư vấn chị ạ.” Vân hiểu vì sao các bạn nghĩ vậy. Nhưng quan sát hơn 500 nhân sự trong hệ thống, Vân thấy ngược lại. Khách hàng bây giờ không thiếu người nói hay, họ chỉ thiếu người nói đúng.*

## Nói trôi chảy chưa đủ để thuyết phục

Trong suy nghĩ của số đông, người làm tư vấn là người hoạt ngôn: nói nhanh, nói khéo, đứng giữa phòng họp không vấp chữ nào. Định kiến đó khiến nhiều người trầm tính, quen làm việc với con số và dữ liệu tự đóng cửa trước khi thử bước vào nghề.

Nhưng thị trường tài chính bây giờ đã khác. Khách tự tìm hiểu, tự đọc tài liệu và so sánh kỹ trước khi ngồi lại với chuyên viên. Nói trôi chảy thôi đôi khi chỉ giống đang nghe một kịch bản tiếp thị, chưa đủ để khách tin.

## Người dám nói “chưa chắc”

Cùng một câu hỏi khó từ khách, hai kiểu phản xạ khác nhau lộ ra rất rõ:

- **Người quen phản xạ nhanh miệng:** Thường cố gắng trả lời ngay lập tức cho kịp nhịp cuộc trò chuyện.
- **Người hướng nội, cẩn trọng:** Thường hỏi ngược lại để hiểu khách đang thật sự lo điều gì sau câu hỏi ấy, hoặc nói thẳng: *"Chỗ này em kiểm tra lại rồi báo anh chị con số chính xác."*

Nghe qua thì tưởng chững lại là điểm yếu. Nhưng với một khách đã tự so sánh đủ thứ trước khi gặp mình, đó là tín hiệu hiếm và đáng quý. Người dám nói *"chưa chắc"* ở những chi tiết cần đối soát thì mỗi lần nói *"chắc chắn"*, khách tin ngay.

## Giọng nhỏ cũng được, nhưng nền phải dày

Vì vậy Vân không bắt bạn nào phải tập sôi nổi hơn. Vân kèm ba bước cụ thể:

- **Chuẩn bị trước buổi gặp:** Các bạn viết ra bộ câu hỏi cần hiểu về khách hàng, để đi thẳng vào mối lo của gia đình họ.
- **Bài tập “Tóm gọn trong ba câu”:** Tập tóm vấn đề phức tạp nhất của buổi gặp trong đúng ba câu ngắn, nói thành tiếng cho người kèm nghe. Ba câu mà chưa gọn nghĩa là mình chưa hiểu đủ sâu, quay lại học tiếp còn hơn nói dài cho qua.
- **Rà soát sau buổi gặp:** Hai người ngồi lại xem chỗ nào mình đã trả lời chắc, chỗ nào cần kiểm tra lại quy tắc điều khoản để phản hồi cho chính xác.

Giọng có thể nhỏ, nhịp có thể chậm, nhưng nền chuyên môn phải dày. Điểm tựa của người làm tư vấn không nằm ở tốc độ nói mà ở độ sâu của sự hiểu.

Câu *"chắc em không hợp với nghề này"* Vân đã nghe đủ nhiều để nhận ra: người nói câu đó thường sẽ là người làm nghề đáng tin nhất.`,
    keyTakeaways: [
      'Khách hàng bây giờ không thiếu người nói hay mà cần người nói đúng. Điềm đạm và biết lắng nghe là lợi thế tạo niềm tin.',
      'Dám nói "để em kiểm tra lại con số chính xác" tạo uy tín nhiều hơn những lời hứa trôi chảy.',
      'Không cần ép mình thành người hoạt náo. Giọng có thể nhỏ nhưng nền chuyên môn phải dày, nhờ chuẩn bị kỹ và biết tóm gọn vấn đề.',
    ],
  },
  {
    id: 'am-29-phan-tram-mot-nam-giu-du-10-nam-sinh-loi-9-phay-4',
    index: '07',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: false,
    image: '/images/VanPhong_ChiVanCungDoiNgu_BanHopXanhLa.jpg',
    imageCaption: 'Cùng các cộng sự nòng cốt bàn về quản trị tài sản và kỷ luật ủy thác dòng tiền dài hạn.',
    title: 'Âm 29,5% trong một năm: giữ đủ 10 năm để đạt mức sinh lời 9,4%/năm',
    excerpt:
      'Cuối năm 2022, khi tài khoản đỏ gần 30%, câu hỏi phổ biến là: "Có nên cắt lỗ luôn không?" Nhưng lỗ trên giấy chỉ thành lỗ thật khi mình bán tháo. Tách riêng ngăn ngắn hạn và dài hạn là cách để yên tâm đi qua giai đoạn biến động.',
    content: `*Cuối năm 2022, Vân nhận khá nhiều tin nhắn từ bạn bè và khách hàng với câu hỏi na ná nhau: "Có nên cắt lỗ luôn không, mình không chịu nổi nữa?" Họ không thiếu hiểu biết, nhiều người là quản lý thu nhập rất tốt. Chỉ là khi tài khoản đỏ gần 30%, cảm xúc thường đi trước lý trí.*

## Một khoản tiền gánh quá nhiều nhiệm vụ

Vân nghe nhiều hơn khuyên. Và khi gỡ từng lớp ra, chuyện thường có chung một gốc: một khoản tiền bị bắt gánh quá nhiều việc cùng lúc, vừa muốn là tiền tích lũy dài hạn cho tương lai, vừa muốn là tiền phòng bị rút ra khi cần chi gấp.

Thử nhìn các con số thực tế trên thị trường:

- Quỹ Tăng Trưởng do Công ty Quản lý Quỹ Manulife quản lý (đơn vị đang quản lý danh mục khoảng 150.000 tỷ đồng tài sản) giảm **29,5%** trong năm biến động 2022.
- Những nhà đầu tư không bán tháo trong hoảng loạn đã hưởng trọn nhịp phục hồi: **+11,8%** năm 2023, **+14,1%** năm 2024 và **+26,2%** năm 2025.

Tính chung chu kỳ 10 năm đến hết 2025, mức sinh lời trung bình đạt **9,4%/năm**, tương đương mức tăng trưởng lũy kế **145,5%**. Tất nhiên đây là số liệu lịch sử, không hàm ý cam kết cho tương lai, nhưng cho thấy khá rõ quy luật vận động của thị trường vốn.

## Hai bài học từ đầu tư dài hạn

Từ những con số ấy, Vân thấy có hai điều đáng nghĩ cho mỗi người đang tự quản lý tài chính của mình:

- **Thứ nhất, lỗ trên giấy chỉ thành lỗ thật khi mình bán ra:** Người vội rời đi giữa năm 2022 đã tự tay biến thiệt hại thành thật, và vắng mặt đúng lúc thị trường phục hồi mạnh nhất.
- **Thứ hai, kỷ luật quan trọng hơn việc đoán đáy:** Tích lũy đều đặn nghĩa là ngay trong những năm thị trường định giá thấp, mình vẫn gom thêm tài sản ở vùng giá tốt cho bài toán 10 năm, thay vì sợ rồi dừng lại.

## Tách dòng tiền thành hai ngăn

Lời khuyên Vân hay chia sẻ với các gia đình là vạch ranh giới tài chính cho rõ:

- **Ngăn ngắn hạn (thanh khoản & phòng vệ):** Dự phòng chi tiêu 6 đến 12 tháng, học phí của con, nghĩa vụ tài chính sắp tới. Ngăn này phải ổn định, an toàn, không phụ thuộc vào biến động lên xuống của thị trường.
- **Ngăn dài hạn (ủy thác & tăng trưởng):** Khoản tiền bạn chắc chắn chưa cần đụng tới trong 5 đến 10 năm. Chỉ ngăn này mới đủ kiên nhẫn để ngồi yên đi qua các chu kỳ biến động.

Khi mỗi đồng tiền đã có nhiệm vụ riêng, một năm thị trường âm gần 30% dù khó chịu cũng không buộc mình phải bán tháo vội trong hoảng loạn.

Thị trường lúc nào cũng có chu kỳ biến động. Người giữ được kỷ luật và biết ủy thác cho các đơn vị quản lý quỹ chuyên nghiệp sẽ tận dụng được lãi kép dài hạn. Điều quan trọng là đừng nhảy khỏi tàu giữa cơn bão.

Mỗi gia đình là một bài toán dòng tiền riêng. Nếu bạn cũng đang cân nhắc rà soát lại cấu trúc tài chính cho gia đình, cứ nhắn Vân trao đổi nhé. Một góc nhìn độc lập thường giúp mình thấy rõ hơn.`,
    keyTakeaways: [
      'Lỗ trên giấy chỉ thành lỗ thật khi bạn bán tháo trong hoảng loạn và bỏ lỡ đợt phục hồi của thị trường.',
      'Tích lũy định kỳ có kỷ luật và ủy thác cho quỹ chuyên nghiệp quan trọng hơn việc đoán đỉnh, đoán đáy ngắn hạn.',
      'Tách dòng tiền thành hai ngăn: ngăn ngắn hạn giữ an toàn thanh khoản, ngăn dài hạn kiên nhẫn chờ lãi kép.',
    ],
  },
  {
    id: '17-trieu-va-171-trieu-chiec-xuong-ca-va-quyen-loi-tai-nan',
    index: '08',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: false,
    image: '/images/VanPhong_ChiVanCung5NuQuanLy_SanhVomTron.jpg',
    imageCaption: 'Chị Khánh Vân hướng dẫn đội ngũ quản lý quy trình thẩm định và giải quyết quyền lợi bồi thường cho khách hàng.',
    title: '17 triệu và 171 triệu: ca bồi thường hy hữu từ một chiếc xương cá',
    excerpt:
      'Nuốt phải xương cá làm thủng ruột non, phải mổ cấp cứu. Viện phí 17 triệu được chi trả, và điều khoản tai nạn bất ngờ chi thêm 150 triệu tiền mặt. Tổng chi trả vượt 171 triệu đồng. Định nghĩa “tai nạn” trong hợp đồng rộng hơn nhiều người vẫn nghĩ.',
    content: `*17 triệu và 171 triệu. Hai con số chênh nhau hơn mười lần, và cả hai đều đến từ một chiếc xương cá trong bữa cơm gia đình.*

## Ca bồi thường bắt đầu từ bàn ăn

Đây là ca bồi thường thực tế vừa được giải quyết tại Manulife mà Vân trực tiếp theo dõi. Khách hàng tham gia hợp đồng từ năm 2022. Trong một bữa cơm gia đình, người này chẳng may nuốt phải xương cá. Chiếc xương làm thủng ruột non, bệnh nhân phải nhập viện mổ khẩn cấp.

Phần viện phí phẫu thuật khoảng **17 triệu đồng**, cùng các khoản hỗ trợ chi phí y tế, được bảo lãnh và thanh toán đầy đủ theo quyền lợi chăm sóc sức khỏe. Nhưng điều Vân muốn kể nằm ở quyền lợi thứ hai.

Việc hóc dị vật gây tổn thương nội tạng nghiêm trọng này được xác định là tai nạn khách quan, ngoài ý muốn. Vì vậy hợp đồng kích hoạt điều khoản **Phẫu thuật nội tạng do tai nạn**, chi trả thêm một khoản tiền mặt lên tới **150 triệu đồng** chuyển thẳng vào tài khoản khách hàng. Tổng số tiền chi trả thực tế vượt mốc **171 triệu đồng**.

## Hiểu lầm hay gặp về chữ "tai nạn"

Hiểu lầm Vân hay gặp nhất là nhiều người nghĩ "tai nạn" chỉ là va quẹt xe cộ hay trượt ngã ngoài đường.

Trong điều khoản pháp lý của hợp đồng bảo hiểm, tai nạn được định nghĩa chặt chẽ và rộng hơn nhiều. **Đó là sự kiện bất ngờ, không lường trước được, do nguyên nhân bên ngoài tác động trực tiếp lên cơ thể và gây ra thương tổn.**

Một chiếc xương cá hay dị vật vô tình hóc phải trong bữa ăn thỏa mãn đầy đủ các yếu tố của định nghĩa này.

## Hai khoản tiền khác nhau trong một ca chi trả

Cần phân biệt rõ hai khoản tiền trong trường hợp này:

- **Khoản 17 triệu đồng:** Là chi phí y tế thực tế phát sinh tại bệnh viện (nằm viện, phẫu thuật, thuốc men).
- **Khoản 150 triệu đồng:** Là quyền lợi bồi thường khoán tiền mặt theo danh mục phẫu thuật do tai nạn, chi trả đúng theo hạn mức cam kết trong hợp đồng, độc lập với hóa đơn viện phí.

Khoản tiền mặt 150 triệu này bù đắp thu nhập, giúp người bệnh và gia đình có thêm nguồn lực để nghỉ ngơi, tĩnh dưỡng và hồi phục mà không phải lo gánh nặng tài chính.

## Ba việc nhỏ để giữ quyền lợi của chính bạn

Từ ca bồi thường này, Vân có ba gợi ý mà gia đình nào cũng nên làm ngay:

- **Một là đọc kỹ phần định nghĩa "tai nạn" trong hợp đồng:** Đừng đoán theo cảm tính, hãy căn cứ vào định nghĩa pháp lý chính thức.
- **Hai là kiểm tra bảng tỷ lệ thương tật và danh mục phẫu thuật:** Để biết từng tình huống tổn thương cụ thể tương ứng với bao nhiêu tiền mặt.
- **Ba là luôn nộp hồ sơ đầy đủ khi có biến cố y tế:** Để bộ phận thẩm định đối chiếu theo điều khoản và hồ sơ bệnh án, đừng tự bỏ quyền lợi của mình vì nghĩ "chắc chuyện này không được chi trả".

Bữa cơm gia đình vẫn ngon như cũ, không ai ngồi vào mâm mà phải nghĩ đến chiếc xương cá. Vân chỉ mong mỗi người hiểu rõ hợp đồng của mình, để lỡ có biến cố bất ngờ, gia đình chỉ cần lo nhanh bình phục.`,
    keyTakeaways: [
      'Định nghĩa tai nạn trong bảo hiểm gồm mọi biến cố bất ngờ từ bên ngoài gây thương tổn, không chỉ tai nạn giao thông.',
      'Cần phân biệt chi trả viện phí thực tế với quyền lợi tiền mặt khoán theo danh mục phẫu thuật tai nạn để dùng đủ quyền lợi.',
      'Khi có biến cố y tế, nên nộp hồ sơ đầy đủ để bộ phận thẩm định xét, đừng tự đoán rồi bỏ mất quyền lợi.',
    ],
  },
  {
    id: 'tien-gui-sinh-loi-it-di-gia-dinh-bat-an-nhieu-hon',
    index: '09',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: false,
    image: '/images/VanPhong_NhomQuanLy_TraoDoiCongViecBenTablet.jpg',
    imageCaption: 'Phân tích cơ cấu dòng tiền, bài toán thanh khoản và rà soát hợp đồng bảo vệ cùng các chuyên gia quản trị gia sản.',
    title: 'Tiền gửi sinh lời ít đi, nhưng nhiều gia đình lại bất an hơn',
    excerpt:
      'Lãi suất tiết kiệm càng thấp, người ta càng sốt ruột tìm nơi sinh lời cao hơn. Nghịch lý là càng sốt ruột kiếm lời, ta càng dễ bỏ đi chính thứ giữ mình đứng vững. Khoản tiết kiệm không chỉ để sinh lời, nó còn là lớp đệm trước biến cố.',
    content: `*Lãi suất tiết kiệm càng thấp, người ta càng muốn rút tiền đi tìm nơi sinh lời cao hơn. Nghịch lý là càng sốt ruột kiếm lời, ta càng dễ bỏ đi chính thứ giữ mình đứng vững.*

## Lãi suất giảm và cơn sốt ruột tìm lợi nhuận

Việc 46/46 ngân hàng đồng loạt hạ lãi suất huy động chỉ là cái cớ để thấy rõ tâm lý đó. Mặt bằng lãi suất xuống, và nhiều nhà bắt đầu dồn gần hết khoản tích lũy sang những kênh kỳ vọng cao hơn.

Vân nhìn chuyện này ở một góc khác.

Con số lãi suất là con số bình quân, dễ khiến ta thấy mình đang "ổn". Chúng ta theo dõi rất kỹ mức chênh lệch sinh lời vài phần trăm, nhưng hiếm khi tự hỏi: nếu ngày mai có biến cố sức khỏe lớn, mình phải bán tài sản nào, vào lúc nào, với giá nào?

## Tiết kiệm là lớp đệm, không chỉ để sinh lời

Khoản tiết kiệm nằm đó không chỉ để sinh lời. Nó là lớp đệm. Khi lớp đệm bị đem đi đầu tư hết, tài sản trông thì nhiều nhưng thực ra rất bấp bênh, vì đang kẹt ở những nơi không thể rút ra đúng lúc, đúng giá. Một hóa đơn điều trị bệnh nặng không hẹn trước, cũng không chờ thị trường hồi phục.

Từ những năm làm ngân hàng đến nay, Vân giữ một nguyên tắc khá giản dị: biết đủ là đủ. Tài chính là công cụ để tâm trí được yên và tự do, không phải cuộc đua xem ai sinh lời cao hơn ai. Làm nghề tử tế, tích lũy bền bỉ, khó trước dễ sau. Với Vân, "khó trước" là chịu trích một phần nhỏ để dựng hàng rào bảo vệ trước, rồi mới thong thả tính chuyện tăng trưởng.

## Quỹ dự phòng y tế: giữ rủi ro bằng một tỷ trọng nhỏ

Quỹ dự phòng tài chính y tế có bản chất khá rõ. Mình đóng định kỳ một khoản nhỏ so với thu nhập, để đổi lấy quyền nhận về hàng tỷ đồng ngay khi rủi ro lớn xảy ra. Khoản này không cần sinh lời. Nhiệm vụ duy nhất của nó là giữ nguyên khối tài sản gia đình đã mất nhiều năm xây dựng, không bị bào mòn bởi những hóa đơn đột ngột.

Chỉ cần một tỷ trọng rất nhỏ. Không cần giữ khư khư tiền mặt, cũng không cần tất tay. Phần còn lại cứ để đi làm việc của nó, với tâm thế nhẹ nhõm hơn.

## Rà lại hợp đồng bảo vệ cũ

Nếu trong nhà đã có hợp đồng bảo vệ từ vài năm trước, đây là lúc nên mở ra xem lại:

- Mức bảo vệ hiện tại còn theo kịp chi phí y tế ngày càng đắt đỏ không?
- Người trụ cột tạo ra dòng tiền chính đã được bảo vệ đủ chưa?
- Các điều khoản bồi thường và bảo lãnh viện phí có đáp ứng nhu cầu thực tế của gia đình không?

Rà lại hợp đồng cũ cũng quan trọng không kém đi khám sức khỏe cho chính mình.

Còn gia đình bạn, khi lãi suất xuống và các kênh sinh lời trông ngày càng hấp dẫn, bạn xác định phần "đủ" của mình ở đâu, và bằng cách nào? Vân rất muốn nghe góc nhìn của mọi người ở phần bình luận.`,
    keyTakeaways: [
      'Tiết kiệm không chỉ để sinh lời mà còn là “lớp đệm thanh khoản” bảo vệ gia đình trước các biến cố y tế bất ngờ.',
      'Quỹ dự phòng y tế dùng một tỷ trọng định kỳ nhỏ để giữ rủi ro, giúp khối tài sản tích lũy qua nhiều năm không bị bào mòn.',
      'Nên định kỳ “khám sức khỏe” cho hợp đồng bảo vệ cũ để mức bảo vệ người trụ cột theo kịp chi phí y tế thực tế.',
    ],
  },
  {
    id: 'hop-dong-bao-hiem-cung-can-update-cv',
    index: '10',
    category: 'Phát triển Sự nghiệp',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: false,
    image: '/images/VanPhong_NhomQuanLy_VoTayTanThuongBenCuaSo.jpg',
    imageCaption: 'Khi thăng tiến từ công việc thị trường lên quản lý văn phòng, nên rà soát và cập nhật nhóm nghề nghiệp trên hợp đồng bảo hiểm.',
    title: 'Hợp đồng bảo hiểm cũng cần “update CV” như sự nghiệp của bạn',
    excerpt:
      'Có lần ngồi soát lại hợp đồng giúp một người bạn cũ, Vân thấy bạn ấy đã chuyển từ công việc Sales thị trường sang quản lý vận hành tại văn phòng gần ba năm, nhưng hợp đồng bảo hiểm vẫn “đóng băng” ở nhóm nghề nghiệp cũ với mức phí rủi ro cao hơn.',
    content: `*Có lần ngồi soát lại hợp đồng giúp một người bạn cũ, Vân phát hiện một chuyện khá thú vị. Bạn ấy đã chuyển từ Sales thị trường sang làm quản lý vận hành tại văn phòng được gần ba năm, nhưng hợp đồng vẫn "đóng băng" ở nhóm nghề nghiệp cũ. Nghĩa là suốt ngần ấy thời gian, bạn vẫn trả phí rủi ro như thể ngày nào cũng ở ngoài đường, trong khi phần lớn thời gian chỉ ngồi bàn giấy.*

## Thông tin cũ âm thầm ăn vào túi tiền

Nhiều người nghĩ hợp đồng bảo hiểm ký xong là xong, cứ thế đóng phí mỗi năm mà không nhìn lại. Nhưng một trong những yếu tố quyết định mức phí bảo hiểm tai nạn hằng năm chính là **nhóm nghề nghiệp** tại thời điểm tham gia.

Công việc càng nhiều rủi ro di chuyển, va chạm, tai nạn lao động thì phí rủi ro càng cao. Công việc hành chính, ít di chuyển được xếp vào nhóm rủi ro thấp hơn, nên phí bảo hiểm tai nạn cũng giảm theo.

Vấn đề là công ty bảo hiểm không tự biết bạn đã đổi việc. Nếu bạn không chủ động thông báo, hệ thống vẫn tính phí theo nghề nghiệp cũ, dù rủi ro thực tế của bạn đã khác.

## Từ nhóm nghề 2 sang nhóm nghề 1

Quay lại chuyện người bạn kia. Ngày mới ký hợp đồng, bạn ấy làm công việc thường xuyên di chuyển ngoài hiện trường, loại công việc được xếp vào nhóm nghề nghiệp rủi ro cao hơn, tương tự một phóng viên hiện trường. Sau đó bạn chuyển hẳn sang quản lý vận hành tại văn phòng, công việc gần như chỉ xoay quanh bàn giấy, họp hành, báo cáo, giống tính chất công việc của một biên tập viên.

Về bản chất, đây là bước chuyển từ nhóm nghề rủi ro cao hơn sang nhóm rủi ro thấp hơn. Chỉ cần gửi văn bản thông báo cập nhật nghề nghiệp cho công ty bảo hiểm, phí bảo hiểm tai nạn đã được điều chỉnh giảm ngay, từ **730.000đ** xuống còn **568.000đ** mỗi năm.

Phần chênh lệch ấy không mất đi đâu. Nó được cộng thẳng vào tài khoản tích lũy trong hợp đồng và tiếp tục sinh lời theo thời gian. Quyền lợi bảo vệ không đổi, chỉ có chi phí rủi ro được tính đúng với công việc hiện tại.

## Vì sao chuyện này dễ bị bỏ quên

Phần lớn mọi người chỉ nhớ hợp đồng bảo hiểm lúc ký, rồi gần như "quên" nó cho đến khi cần giải quyết quyền lợi. Trong khi đó, sự nghiệp thì liên tục thay đổi: từ nhân viên kinh doanh lên quản lý, từ công việc ngoài hiện trường về văn phòng, từ ngành này sang ngành khác.

Hợp đồng bảo hiểm giống một bản hồ sơ cá nhân bị "đóng băng" tại thời điểm ký. Nếu không chủ động cập nhật, nó không phản ánh đúng con người hiện tại của bạn, và phần thiệt thuộc về chính người đóng phí.

Thủ tục cập nhật thường không phức tạp. Chỉ cần xác nhận công việc hiện tại qua giấy tờ đơn giản như hợp đồng lao động, quyết định bổ nhiệm hoặc xác nhận từ công ty. Công ty bảo hiểm sẽ xem xét và điều chỉnh phí theo nhóm nghề nghiệp mới.

## Một thói quen nhỏ, một khoản tiết kiệm không nhỏ

Chuyện này không chỉ của riêng người bạn kia. Nhiều người làm ở những ngành có tính chất công việc đổi theo thời gian (từ bán hàng thị trường lên quản lý khu vực, từ kỹ thuật hiện trường sang đào tạo nội bộ, từ phóng viên sang biên tập) có thể đang đóng phí rủi ro cao hơn mức cần thiết mà không hay.

Khi sự nghiệp đổi theo hướng ít rủi ro hơn, đó là lúc nên dành vài phút nhìn lại hợp đồng bảo hiểm, giống như cập nhật CV mỗi khi có vị trí hay kỹ năng mới. Khác ở chỗ CV cập nhật để tìm cơ hội, còn hợp đồng bảo hiểm cập nhật để không bỏ lỡ quyền lợi tài chính đang nằm sẵn trong tay.`,
    keyTakeaways: [
      'Phí bảo hiểm tai nạn phụ thuộc vào nhóm nghề nghiệp lúc tham gia và không tự điều chỉnh khi công việc thay đổi.',
      'Khi chuyển từ công việc nhiều rủi ro sang công việc văn phòng ít rủi ro, chủ động báo cập nhật nghề nghiệp giúp giảm phí rủi ro và tăng phần tích lũy mà vẫn giữ nguyên quyền lợi.',
      'Nên rà lại hợp đồng bảo hiểm mỗi khi thăng tiến hoặc đổi vị trí, giống như cập nhật CV.',
    ],
  },
  {
    id: '500-tan-vang-nam-im-va-noi-so-vo-hinh',
    index: '11',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 11, 2026',
    readTime: '6 phút đọc',
    featured: false,
    image: '/images/VanPhong_NhomQuanLy_BanHopDaiXanhLa.jpg',
    imageCaption: 'Hoạch định cấu trúc tài sản cho gia đình, kết hợp tăng trưởng dài hạn với tầng phòng thủ chủ động.',
    title: '500 tấn vàng nằm im và nỗi sợ vô hình của tầng lớp trung lưu',
    excerpt:
      'Tại Quốc hội, một con số khiến nhiều người giật mình: 11,2 triệu tỷ đồng tiền gửi dân cư, cộng thêm 500 tấn vàng đang nằm trong dân, tương đương 12% GDP. Con số ấy cho thấy nhiều gia đình đang chọn “phòng thủ” trước khi dám “tấn công”.',
    content: `*Tại Quốc hội, một con số khiến nhiều người giật mình: 11,2 triệu tỷ đồng tiền gửi dân cư, cộng thêm 500 tấn vàng đang nằm trong dân, tương đương 12% GDP. Với Vân, con số này nói lên tâm lý của cả một thế hệ đang chọn "phòng thủ" trước khi dám "tấn công".*

## Tiền Có Sẵn Nhưng Không Ai Dám Tiêu

Đại biểu Lê Hoàng Anh (đoàn Gia Lai) gọi đây là một nghịch lý: vốn không thiếu, chỉ thiếu đường dẫn. Ngân sách Nhà nước phải vay gần 1,28 triệu tỷ đồng cho năm 2027, trái phiếu Chính phủ mới đạt 43% kế hoạch phát hành. Trong khi đó, hàng chục triệu tỷ đồng của người dân vẫn nằm yên trong tài khoản tiết kiệm, và 500 tấn vàng vẫn cất trong két sắt.

Ở tầm vĩ mô, đây là bài toán cơ chế: thiếu công cụ tài chính đủ tin cậy để biến tiền nhàn rỗi thành vốn sản xuất. Nhưng Vân từng ngồi ở bàn tư vấn tài sản cho hàng trăm khách hàng tại một ngân hàng nước ngoài, và nhìn con số 11,2 triệu tỷ đồng, Vân thấy thêm một chuyện khác. Đó là nỗi sợ rất người: sợ mất trắng, sợ biến động, sợ không kiểm soát được tương lai.

## Tiết Kiệm Là Phản Xạ, Chưa Phải Chiến Lược

Phần lớn người Việt lớn lên với niềm tin "có tiền mặt trong tay là an toàn nhất". Niềm tin ấy không sai, nhưng mới dừng ở phản xạ tự vệ, chưa thành chiến lược tài chính. Giữ 500 tấn vàng thì không tạo ra dòng tiền. Để 11,2 triệu tỷ đồng trong ngân hàng, với lãi suất thực tế gần như hòa vốn sau lạm phát, là chọn sự an toàn trước mắt và chấp nhận để giá trị tài sản mòn dần về lâu dài.

Tâm lý phòng thủ này không chỉ có ở người ít tiền. Qua nhiều năm làm trong Khối Quản lý Tài sản, Vân gặp không ít khách có tài sản hàng chục tỷ đồng mà vẫn nghĩ "an toàn là giữ tiền mặt". Họ bỏ lỡ nhiều cơ hội tăng trưởng vì chưa có khung rõ ràng: giữ bao nhiêu, đầu tư bao nhiêu, bảo vệ bằng cách nào.

## Giữ Tiền Khó Hơn Kiếm Tiền

Tám năm làm việc với khách hàng có tài sản lớn, Vân thấy một điều lặp lại: người giàu bền không dồn hết tiền vào các kênh "tấn công" như bất động sản, cổ phiếu hay mở rộng kinh doanh. Họ luôn dành một phần vừa đủ cho **"tầng phòng thủ"**, gồm bảo vệ sức khỏe, bảo vệ sinh mạng và quỹ hưu trí có kỷ luật.

Lý do khá thực tế. Biến cố không chờ ai chuẩn bị xong mới xảy ra. Có khách từng kể, khoản bảo hiểm sức khỏe mà họ coi là "chi phí thừa" nhiều năm trước lại là thứ duy nhất giúp họ không phải bán cổ phần công ty khi gặp biến cố y tế bất ngờ. Không có tầng phòng thủ đó, phần tài sản "tấn công" vốn cần thời gian để sinh lời sẽ buộc phải bán đúng lúc bất lợi nhất.

Đây là chỗ khác nhau giữa tích trữ và quản trị tài sản:

- **Tích trữ thụ động:** Dồn tất cả vào một dạng (tiền mặt, vàng) và hy vọng nó đủ sức chống chọi mọi tình huống.
- **Quản trị tài sản chủ động:** Chia rõ một phần để tăng trưởng, một phần để phòng thủ, và một phần luôn sẵn sàng cho tình huống khẩn cấp mà không phải đụng đến phần còn lại.

## Xây Móng Trước Khi Xây Lầu

Chuyện 500 tấn vàng và 11,2 triệu tỷ đồng tiền gửi cũng phản chiếu cách mỗi gia đình đang quản lý tài sản của mình. Trước khi nghĩ đến chuyện nhân đôi, nhân ba tài sản ở những kênh nhiều sóng gió, câu hỏi nên đặt ra trước là: gia đình mình đã có đủ vành đai phòng thủ để không phải bán rẻ tài sản khi ốm đau hay khủng hoảng chưa?

Dòng vốn quốc gia cần đường dẫn để chảy vào sản xuất. Dòng tiền của mỗi nhà cũng cần một cấu trúc rõ ràng, nơi phòng thủ và tấn công bổ trợ cho nhau. Có nền móng đó, dù giữ vàng hay giữ cổ phiếu, mình cũng yên tâm đi đường dài.`,
    keyTakeaways: [
      'Tiền mặt và vàng là lớp đệm an toàn, nhưng chưa phải chiến lược tài sản đầy đủ. Chúng cần nằm trong một cấu trúc tổng thể có mục tiêu rõ ràng.',
      'Một “tầng phòng thủ” chủ động (bảo vệ sức khỏe, sinh mạng, quỹ hưu trí có kỷ luật) giúp tài sản đầu tư không bị bán tháo khi có biến cố.',
      'Trước khi tìm kênh sinh lời nhanh, hãy bảo đảm gia đình đã có vành đai an toàn để không phải bán tài sản tích lũy chỉ vì một khoản chi khẩn cấp.',
    ],
  },
  {
    id: 'khi-tai-san-thua-ke-tro-thanh-vet-nut-gia-dinh',
    index: '12',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 11, 2026',
    readTime: '6 phút đọc',
    featured: false,
    image: '/images/VanPhong_ChiVanDieuHanhCuocHopBanBauDuc.jpg',
    imageCaption: 'Chị Khánh Vân chủ trì buổi làm việc về bảo vệ và chuyển giao gia sản.',
    title: 'Khi Tài Sản Thừa Kế Gây Rạn Nứt Gia Đình: Bài Học Từ Các Vụ Tranh Chấp Ở Trung Quốc',
    excerpt:
      'Tỷ lệ tranh chấp thừa kế tại Trung Quốc tăng gấp ba lần trong 5 năm, phần lớn xoay quanh bất động sản. Nhìn từ góc độ quản trị tài sản, câu hỏi đặt ra là làm sao chuyển gia sản giữa các thế hệ êm thấm mà không đánh đổi tình thân.',
    content: `*Tỷ lệ tranh chấp thừa kế tại Trung Quốc tăng gấp ba lần trong 5 năm, phần lớn xoay quanh bất động sản, loại tài sản khó chia và dễ gây mâu thuẫn nhất. Nhìn từ góc độ quản trị tài sản, câu hỏi đặt ra là làm sao chuyển gia sản giữa các thế hệ êm thấm mà không đánh đổi tình thân.*

## Khi Tài Sản Trở Thành Nguồn Cơn Chia Rẽ

Số liệu từ Tòa án Nhân dân Trung cấp số 2 Bắc Kinh cho thấy một xu hướng đáng suy nghĩ. Tỷ lệ án phân chia tài sản của người cao tuổi tăng từ 4,4% năm 2021 lên 15,5% năm 2025, trong đó bất động sản chiếm đến 94,6% giá trị tài sản tranh chấp. Những con số này không chỉ nói về lòng tham. Chúng cho thấy một lỗ hổng về cấu trúc: tài sản tích lũy qua nhiều năm nhưng không có cơ chế chuyển giao rõ ràng ngay từ đầu.

Các vụ việc được dẫn đều có điểm chung. Hai anh em tranh giành ba tòa nhà vì không có văn bản nào ghi tỷ lệ đóng góp tài chính. Bảy anh chị em kiện nhau vì cổ phần công ty hợp tác nông thôn, trong đó bốn người chị từng trực tiếp chăm sóc cha mẹ lại bị gạt ra ngoài chỉ vì đã lập gia đình riêng. Một người đàn ông 60 tuổi phải khởi kiện toàn bộ 12 người thân để bảo vệ quyền thừa kế căn nhà trị giá 700.000 USD. Tất cả đều có chung một gốc. Tài sản nằm ở dạng "một cục" như nhà đất, cổ phần, tiền mặt, không có cơ chế phân bổ minh bạch, nên khi người để lại tài sản không còn, mỗi người hiểu một kiểu.

## Gốc Rễ Là Thiếu Một Kế Hoạch Chuyển Giao Minh Bạch

Trong ngành ngân hàng và tài chính, đây gọi là rủi ro chuyển giao thế hệ (generational transfer risk). Tài sản càng lớn, càng tập trung vào bất động sản hay cổ phần khó chia nhỏ thì rủi ro xung đột càng cao. Thực tế xét xử tại Trung Quốc cũng cho thấy điều này. Tòa án đang dần ưu tiên người trực tiếp chăm sóc thay vì chia thuần theo huyết thống. Ví dụ, người em trai chăm chị gái bệnh tâm thần suốt 30 năm được hưởng 70% tài sản, còn người con ruột đứt liên lạc nhiều năm chỉ nhận 30%. Tòa đang phải vá những lỗ hổng mà gia đình không tự lấp từ trước.

Vấn đề không nằm ở chuyện ai xứng đáng hơn ai. Vấn đề là gia đình thiếu một công cụ pháp lý và tài chính đủ linh hoạt để ý chí của người để lại tài sản được ghi rõ, minh bạch và được bảo vệ ngay từ lúc còn sống. Đừng chờ đến khi muộn rồi mới trông vào tòa án.

## Cơ Chế Chuyển Giao Quyền Lợi Trong Hợp Đồng Tích Lũy Dài Hạn

Trong hoạch định tài chính gia đình, có một hướng đáng tham khảo. Thay vì dồn hết tài sản vào bất động sản hay tiền mặt, vốn dễ bị chia nhỏ, tranh chấp hoặc mất giá theo thời gian, gia đình có thể dùng hợp đồng tích lũy tài sản dài hạn (bảo vệ đến 99 tuổi) để lập sẵn cơ chế chuyển giao quyền lợi giữa các thế hệ.

Cụ thể, cha mẹ có thể đứng tên mua hợp đồng cho con, và khi con trưởng thành, quyền sở hữu hợp đồng được chuyển giao hợp pháp, có ghi nhận rõ ràng. Tương tự, ông bà có thể mua cho con, sau đó đổi người được bảo hiểm sang cháu khi cần. Cả quá trình nằm trong khuôn khổ hợp đồng đã ký, không phải tranh luận hay thỏa thuận lại từ đầu như với nhà đất hay cổ phần. Quan trọng hơn, dòng vốn tích lũy không bị gián đoạn, lãi kép tiếp tục sinh lời qua các lần chuyển giao, thay vì bị rút ra giữa chừng mỗi khi gia đình có biến cố.

Đây là khác biệt lớn so với việc để lại một căn nhà hay một khoản tiền mặt. Đường đi của tài sản được định sẵn, không để người ở lại tự diễn giải và tranh cãi.

## Đúc Kết Thực Tế

- Ghi rõ đóng góp tài chính và công sức phụng dưỡng bằng văn bản ngay từ khi còn sống, thay vì để tòa án phán xét sau này.
- Ưu tiên các tài sản tài chính có cơ chế chuyển giao rõ ràng (hợp đồng tích lũy, bảo hiểm nhân thọ dài hạn) song song với bất động sản, để giảm tranh chấp khi tài sản khó chia nhỏ.
- Lập sớm lộ trình chuyển giao quyền lợi từ bố mẹ sang con, từ ông bà sang cháu khi còn minh mẫn, để gia sản được nối tiếp mà lãi kép và tình thân không bị đứt.`,
    keyTakeaways: [
      'Ghi rõ đóng góp tài chính và công sức phụng dưỡng bằng văn bản ngay từ khi còn sống, thay vì để tòa án phán xét sau này.',
      'Ưu tiên các tài sản tài chính có cơ chế chuyển giao rõ ràng (hợp đồng tích lũy, bảo hiểm nhân thọ dài hạn) song song với bất động sản, để giảm tranh chấp khi tài sản khó chia nhỏ.',
      'Lập sớm lộ trình chuyển giao quyền lợi từ bố mẹ sang con, từ ông bà sang cháu khi còn minh mẫn, để gia sản được nối tiếp mà lãi kép và tình thân không bị đứt.',
    ],
  },
  {
    id: 'phi-nam-dau-boc-hoi-toi-uu-dong-tien',
    index: '13',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: false,
    image: '/images/VanPhong_NhomQuanLy_ThaoLuanTaiLieuThucChien.jpg',
    imageCaption: 'Phân tích bảng minh họa dòng tiền và cấu trúc phí cùng các cộng sự chuyên môn.',
    title: 'Phí Năm Đầu Cao Có Thật Sự Là Mất Trắng? Cách Nhìn Đúng Về Dòng Tiền',
    excerpt:
      'Có lần một người bạn làm trong ngành tài chính hỏi Vân rất thẳng: “Năm đầu đóng bảo hiểm, tiền mất gần hết vào phí, vậy thực chất mình đang tích lũy hay đang nuôi ai?” Câu hỏi này không mới, nhưng cách trả lời cần cập nhật theo sản phẩm hiện nay.',
    content: `*Có lần một người bạn làm trong ngành tài chính hỏi Vân rất thẳng: "Năm đầu đóng bảo hiểm, tiền mất gần hết vào phí, vậy thực chất mình đang tích lũy hay đang nuôi ai?" Câu hỏi này không mới, nhưng cách trả lời cần cập nhật theo sản phẩm hiện nay.*

## Khi "Mất Trắng" Chỉ Là Ấn Tượng Cũ

Định kiến năm đầu đóng bảo hiểm gần như "bay sạch" vào phí không tự nhiên mà có. Ở các thế hệ sản phẩm liên kết đơn vị trước đây, tỷ lệ phí ban đầu từng ở mức 80 đến 90%. Nghĩa là trong 100 đồng khách đóng vào, chỉ có 10 đến 20 đồng thật sự được đưa vào quỹ đầu tư để sinh lời. Phần còn lại dùng cho các chi phí vận hành của hợp đồng.

Với người quen nhìn dòng tiền theo kiểu "bỏ vào bao nhiêu, làm việc ngay bấy nhiêu" như dân tài chính, mức 80 đến 90% phí ban đầu là một cú sốc. Nhưng nếu dừng ở ấn tượng đó mà không cập nhật cấu trúc sản phẩm thế hệ mới thì sẽ nhìn lệch.

## Cấu Trúc Phí Thế Hệ Mới, Tiền Vào Quỹ Sớm Hơn

Ở dòng liên kết đơn vị thế hệ mới, ví dụ Xanh Phú Quý Flex, tỷ lệ phí ban đầu được thiết kế lại theo hướng giảm dần và giảm mạnh ngay từ năm đầu tiên:

- Năm 1: phí ban đầu chỉ 30%, tức 70% dòng tiền được đưa thẳng vào quỹ đầu tư để sinh lời ngay.
- Năm 2: phí ban đầu còn 20%.
- Năm 3 đến năm 5: phí ban đầu chỉ còn 10%.
- Từ năm thứ 6 trở đi: phí ban đầu bằng 0%.

Nhìn bảng tỷ lệ này, điều đáng chú ý nhất là tốc độ giảm hơn là con số 30% ở năm đầu. Chỉ sau ba năm, phần lớn tiền khách đóng vào đã nằm trong quỹ đầu tư thay vì bị giữ ở phần chi phí. Cấu trúc cũ phải mất nhiều năm hơn mới đạt tỷ lệ tương tự.

## Tài Khoản Tri Ân, Phí Ban Đầu Không Hẳn Là "Mất"

Nhiều bạn làm tài chính đổi cách nhìn khi tìm hiểu kỹ cơ chế Tài Khoản Tri Ân. Toàn bộ khoản phí ban đầu được khấu trừ qua các năm không biến mất khỏi hệ thống. Nó được ghi vào một tài khoản riêng để tính lãi cam kết, và khoản này sẽ được hoàn trả lại cho khách hàng.

Nói cách khác, phí ban đầu không hoàn toàn là khoản chi ra rồi không quay lại. Nó được "giữ hộ" dưới một hình thức khác, vẫn sinh lãi theo cam kết, và trở về với khách hàng ở một thời điểm nhất định trong hợp đồng. Vì vậy, gọi phí ban đầu là "mất trắng" là thiếu chính xác với các sản phẩm thế hệ mới.

## Vì Sao Điều Này Quan Trọng Với Kế Hoạch Tài Chính Dài Hạn

Với người quen làm việc với dòng tiền và lãi kép, ba năm đầu của một kênh tích lũy dài hạn rất quan trọng. Đây là giai đoạn khoản tiền cần nhiều thời gian nhất để tích lũy lợi nhuận, nên tỷ lệ tiền vào quỹ đầu tư sớm hay muộn sẽ ảnh hưởng trực tiếp đến kết quả cuối chặng.

Khi phí ban đầu giảm từ 80 đến 90% xuống còn 30% ngay năm đầu, rồi tiếp tục giảm nhanh ở các năm sau, câu hỏi không còn là "đóng bảo hiểm có lợi hay không". Câu hỏi đúng hơn là "cấu trúc phí này cho dòng tiền làm việc sớm đến mức nào".

## Nhìn Vào Bản Chất Thay Vì Cảm Giác Ban Đầu

Nếu chỉ nhìn con số phần trăm đầu tiên, rất dễ kết luận vội. Khi đặt vào toàn cảnh, gồm tốc độ giảm phí qua các năm, tỷ lệ tiền vào quỹ đầu tư sớm và cơ chế hoàn lại qua Tài Khoản Tri Ân, bức tranh đầy đủ hơn nhiều.

Với một kênh tích lũy dài hạn, điều cần quan tâm không phải phí năm đầu trông "xấu" hay "đẹp". Cần xem tỷ lệ tiền thực tế vào quỹ đầu tư trong ba năm đầu, và phần phí đã khấu trừ có được ghi nhận, tính lãi và hoàn lại hay không. Đó mới là cách đọc đúng "luật chơi" của một sản phẩm tài chính dài hơi.

## Đúc Kết Thực Tế

- Phí ban đầu của sản phẩm liên kết đơn vị thế hệ mới đã giảm đáng kể so với trước đây, cho phép dòng tiền được đầu tư sớm hơn.
- Cơ chế Tài Khoản Tri Ân giúp phần phí đã khấu trừ không mất đi hoàn toàn mà được tính lãi và hoàn lại cho khách hàng.
- Khi chọn kênh tích lũy dài hạn, nên nhìn tỷ lệ tiền vào quỹ đầu tư trong ba năm đầu và cơ chế hoàn phí cuối chặng, thay vì chỉ nhìn phí năm đầu.

---

*(*) Lưu ý tham chiếu và cảnh báo rủi ro đầu tư: Cơ cấu phân bổ tỷ lệ phí ban đầu nêu trên được trích dẫn tham chiếu theo Quy tắc và Điều khoản sản phẩm Bảo hiểm Liên kết Đơn vị Xanh Phú Quý Flex đã được Bộ Tài chính phê chuẩn. Bảo hiểm liên kết đơn vị là sản phẩm bảo hiểm kết hợp đầu tư. Giá trị tài khoản hợp đồng và kết quả đầu tư thực tế dao động theo thị trường và không được cam kết cố định. Bên mua bảo hiểm chịu các rủi ro đầu tư theo quy định pháp luật và nên tham khảo kỹ Bảng minh họa quyền lợi chính thức do Manulife phát hành trước khi tham gia.*`,
    keyTakeaways: [
      'Phí ban đầu của sản phẩm liên kết đơn vị thế hệ mới đã giảm đáng kể so với trước đây, cho phép dòng tiền được đầu tư sớm hơn.',
      'Cơ chế Tài Khoản Tri Ân giúp phần phí đã khấu trừ không mất đi hoàn toàn mà được tính lãi và hoàn lại cho khách hàng.',
      'Khi chọn kênh tích lũy dài hạn, nên nhìn tỷ lệ tiền vào quỹ đầu tư trong ba năm đầu và cơ chế hoàn phí cuối chặng, thay vì chỉ nhìn phí năm đầu.',
    ],
  },
  {
    id: 'ba-thang-trang-tay-von-lieng-khong-nam-trong-so-sach',
    index: '14',
    category: 'Phát triển Sự nghiệp',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: false,
    image: '/images/Studio_ChiVanCungDoiNgu_KhoanhKhacVuiVe.jpg',
    imageCaption: 'Chị Vân cùng các cộng sự thân thiết trong một buổi gặp vui.',
    title: 'Ba Tháng Trắng Tay Và Bài Học Về Vốn Không Nằm Trong Sổ Sách',
    excerpt:
      'Với Vân, ba tháng đầu rời bàn giấy để làm Sales là ba tháng không chốt được khách nào. Bài học lớn nhất lúc đó không đến từ kỹ năng bán hàng, mà từ cách Vân đối xử với đồng nghiệp suốt nhiều năm trước.',
    content: `*Có những giai đoạn làm nghề mà mọi nỗ lực dường như không ra kết quả. Với Vân, đó là ba tháng đầu rời bàn giấy để làm Sales. Bài học lớn nhất của giai đoạn ấy không đến từ kỹ năng bán hàng, mà từ những gì Vân đã làm từ rất lâu trước đó.*

## Bước Ra Khỏi Vùng An Toàn

Thời còn làm ở ngân hàng ANZ, Vân có một vị trí ổn định ở bộ phận hỗ trợ (support). Việc đều đặn, ít áp lực doanh số, và quan trọng nhất là an toàn. Nhưng đến một lúc, muốn thử sức lớn hơn nỗi sợ thất bại. Vân chuyển sang làm Sales vay thế chấp, một lĩnh vực hoàn toàn khác, nơi kết quả đo bằng con số cụ thể, không có chỗ cho sự mơ hồ.

Ngày đầu vào vai trò mới, Vân hào hứng, muốn chứng minh năng lực. Nhưng thực tế nhanh chóng dội một gáo nước lạnh.

## Khi Mọi Nỗ Lực Như Công Cốc

Ba tháng đầu, Vân không chốt được khách nào. Không phải vì thiếu cố gắng, mà vì người mới chưa nắm được cách thế giới Sales vận hành. Áp lực ngày một lớn, đến mức Vân đứng trước nguy cơ bị ngân hàng cắt code, tức là bị loại khỏi cuộc chơi trước khi kịp bắt đầu.

Đó là một trong những giai đoạn cô đơn nhất của Vân. Sáng nào thức dậy cũng tự hỏi: mình có đang đi sai đường không, rời vùng an toàn có phải là sai lầm không?

Rồi giữa những ngày mờ mịt ấy, có một chuyện bất ngờ xảy ra.

## Bước Ngoặt Đến Từ Những Việc Nhỏ

Những đồng nghiệp cũ ở chi nhánh, từng làm việc cùng Vân suốt những năm ở vị trí vận hành, bắt đầu giới thiệu khách cho Vân. Họ không có nghĩa vụ gì, cũng không có thỏa thuận nào. Đơn giản là họ thương và tin Vân.

Nhìn lại, Vân nhận ra những năm làm hỗ trợ chưa bao giờ là vô ích. Những lần giúp đồng nghiệp xử lý hồ sơ, những buổi trò chuyện thật lòng, những lần giúp một tay dù không phải trách nhiệm của mình, tưởng là chuyện nhỏ, không ai ghi nhận, vậy mà lại cứu Vân lúc khó khăn nhất.

Khách hàng đầu tiên đến từ sự giới thiệu ấy mở ra những khách tiếp theo. Đến năm 2017, Vân đạt vị trí Top 1 doanh số toàn quốc. Nhìn vào ba tháng đầu, không ai đoán được điều đó.

## Vốn Thật Sự Không Nằm Ở Kỹ Xảo

Nhiều người nghĩ thành công trong Sales đến từ kỹ năng thuyết phục, chiến lược tiếp cận hay sự khéo léo khi đàm phán. Những điều đó quan trọng, nhưng với Vân, bài học lớn nhất lại khác. Uy tín cá nhân, thứ được tích lũy âm thầm qua từng việc nhỏ và từng mối quan hệ làm bằng sự chân thành, mới là vốn bền nhất.

Không có con đường nào tự nhiên trải sẵn hoa hồng. Những việc tử tế mình làm từ chuyện nhỏ nhất hôm nay có khi rất lâu sau mới có kết quả. Nhưng khi cần, chúng là chiếc phao giúp mình vượt qua lúc tưởng như hết đường.

Giai đoạn chuyển nghề nào cũng có lúc tối. Thứ giúp mình đi qua không phải may mắn, mà là những gì mình đã làm từ lâu trước khi lúc tối ấy đến.

Ai cũng có "ba tháng trắng tay" của riêng mình, khi kết quả chưa đến và niềm tin bị thử thách. Câu hỏi không phải làm sao tránh giai đoạn đó, mà là: trước khi bước vào, mình đã làm đủ những việc tử tế để có thể dựa vào chưa?

## Đúc Kết Thực Tế

- Uy tín cá nhân được xây qua năm tháng, không phải qua vài hành động nhất thời, và là thứ bền nhất khi gặp khó khăn.
- Những việc tử tế tưởng nhỏ, không ai ghi nhận ngay, thường là nền cho những bước ngoặt lớn trong sự nghiệp.
- Giai đoạn khó khăn nhất không phải lúc nào cũng cần một giải pháp kỹ thuật. Đôi khi cần nhất là nhìn lại các mối quan hệ mình đã dày công giữ gìn.`,
    keyTakeaways: [
      'Uy tín cá nhân được xây qua năm tháng, không phải qua vài hành động nhất thời, và là thứ bền nhất khi gặp khó khăn.',
      'Những việc tử tế tưởng nhỏ, không ai ghi nhận ngay, thường là nền cho những bước ngoặt lớn trong sự nghiệp.',
      'Giai đoạn khó khăn nhất không phải lúc nào cũng cần một giải pháp kỹ thuật. Đôi khi cần nhất là nhìn lại các mối quan hệ mình đã dày công giữ gìn.',
    ],
  },
  {
    id: 'chuan-bi-tai-chinh-truoc-khi-buoc-ra-vung-an-toan',
    index: '15',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 10, 2026',
    readTime: '6 phút đọc',
    featured: false,
    image: '/images/Studio_ChiVanCungNuQuanLy_NuCuoiTuoiTan.jpg',
    imageCaption: 'Chị Khánh Vân cùng các nữ quản lý trong đội ngũ.',
    title: 'Cần Chuẩn Bị Gì Về Tài Chính Trước Khi Rời Công Sở Để Làm Độc Lập?',
    excerpt:
      'Đầu năm 2018, Vân rời ngân hàng quốc tế ANZ sau 8 năm, đúng lúc đang đứng Top 1 doanh số toàn quốc. Quyết định đó dựa trên một cấu trúc dòng tiền đã chuẩn bị kỹ, không phải cảm hứng nhất thời.',
    content: `*Nhiều anh chị quản lý cấp trung ở ngân hàng hoặc tập đoàn đa quốc gia tâm sự với Vân: “Em rất muốn ra làm độc lập, nhưng nhìn khoản lương cố định hàng tháng và học phí của con, em lại chùn bước.” Thật ra, dũng khí rời vùng an toàn không đến từ sự liều lĩnh. Nó đến từ một bảng cân đối tài chính cá nhân được chuẩn bị kỹ trước ngày ra đi.*

## Thu Nhập Cố Định Có Thật Sự Chắc Chắn?

Vân gắn bó với ngân hàng quốc tế ANZ 8 năm (từ 2009 đến 2017), đi từ vị trí Vận hành (Operations) sang Khối Tín dụng Thế chấp (Mortgage) và đạt danh hiệu **Top 1 Doanh số Toàn quốc**. Vân hiểu rất rõ sức hút của môi trường công sở chuẩn quốc tế: thu nhập cao đều mỗi tháng, phúc lợi tốt, danh xưng đẹp. Những thứ đó dễ khiến mình tin rằng mình đang ở vùng an toàn tuyệt đối.

Nhưng nhìn bằng mắt quản trị rủi ro của một Banker, một gia đình phụ thuộc 100% vào một nguồn lương cố định thì khá mong manh. Khi thị trường tái cấu trúc, hoặc khi mình chạm “trần thu nhập” và “trần thời gian” ở tuổi ngoài 30, chiếc áo công sở từng rất vừa bỗng trở nên chật.

Năm 2018, khi chuyển sang Manulife Việt Nam để gây dựng doanh nghiệp tài chính của riêng mình, Vân không làm theo cảm hứng. Trước ngày nộp đơn nghỉ việc, Vân đã dành nhiều tháng lập 3 lớp đệm tài chính cho gia đình.

## Lớp Đệm Thứ Nhất: Quỹ Dự Phòng Thanh Khoản 6 Đến 12 Tháng Chi Phí Thiết Yếu

Sai lầm lớn nhất của nhiều người khi chuyển từ làm công ăn lương sang làm chủ hoặc tư vấn tài chính độc lập là bước đi với tài khoản dự phòng mỏng. Khi áp lực cơm áo đè nặng từ tháng thứ hai, thứ ba, người làm nghề rất dễ mất bình tĩnh, nôn nóng chốt hợp đồng bằng mọi giá, hoặc bỏ cuộc ngay trước khi kịp có kết quả.

Nguyên tắc Vân luôn chia sẻ với 64 Quản lý cấp cao (F1) trong Hệ thống Green Power trước khi các bạn chuyển nghề hẳn là:

- **Tính chính xác mức chi tiêu thiết yếu (Survival Number):** Gồm học phí của con, chi phí sinh hoạt gia đình, phụng dưỡng cha mẹ và các khoản trả góp cố định mỗi tháng.
- **Để riêng 6 đến 12 tháng chi phí này trong một tài khoản thanh khoản:** Khoản tiền này không dùng để đầu tư mạo hiểm hay chi tiêu phát sinh.

Khi biết chắc rằng 6 tháng đầu ở môi trường mới thu nhập chưa về ngay mà bữa cơm gia đình và việc học của các con vẫn yên ổn, bạn có được thứ rất quý: **sự vững vàng và lòng tự trọng nghề nghiệp**. Bạn tư vấn cho khách bằng tâm thế của chuyên gia muốn đưa ra giải pháp đúng, không phải người đang cần hoa hồng để trả hóa đơn cuối tháng.

## Lớp Đệm Thứ Hai: Tách Dòng Tiền Gia Đình Khỏi Vốn Đầu Tư Cho Sự Nghiệp

Ra làm kinh doanh nghĩa là bạn phải nhìn mình như một doanh nghiệp nhỏ. Giai đoạn đầu, bạn cần ngân sách để học thêm chuyên môn, xây hình ảnh chuyên nghiệp, gặp gỡ đối tác và chăm sóc đội ngũ.

Ở nhà Vân, ngay từ đầu năm 2018, hai vợ chồng đã ngồi lại với nhau và đặt các con số lên bàn:

- **Ngân sách vận hành gia đình:** Giữ nguyên vẹn, không đụng đến cho bất kỳ thử nghiệm kinh doanh nào.
- **Quỹ đầu tư cho sự nghiệp mới:** Trích một khoản rõ ràng từ tiền tích lũy cá nhân, có lộ trình hoàn vốn và mục tiêu theo từng quý.

Nhờ sự rạch ròi và kỷ luật đó, người bạn đời của Vân hoàn toàn yên tâm. Từ chỗ lo lắng rất tự nhiên, người ấy trở thành hậu phương vững nhất trong những năm Vân gây dựng khu vực từ con số 0 lên hơn 500 nhân sự.

## Lớp Đệm Thứ Ba: Có Bảo Hiểm Riêng Trước Khi Rời Phúc Lợi Công Ty

Có một chi tiết nhiều nhân sự cấp cao bỏ quên khi rời tập đoàn lớn. Ngay lúc bạn bàn giao thẻ nhân viên, gói bảo hiểm sức khỏe và bảo hiểm sinh mạng do doanh nghiệp cấp cũng hết hiệu lực.

Trong giai đoạn chuyển nghề, khi cơ thể và đầu óc làm việc hết công suất, gia đình bạn không được rơi vào “khoảng trống bảo vệ”. Trước khi rời ngân hàng, hãy tự trang bị bảo hiểm nhân thọ và thẻ chăm sóc y tế đứng tên chính mình. Đó là chốt chặn để Quỹ dự phòng thanh khoản của bạn không bị cuốn đi nếu chẳng may có biến cố sức khỏe.

## Vốn Lớn Nhất Mang Theo Là Chữ “Tín”

Sau tất cả những con số trong bảng tính, tài sản lớn nhất giúp một người rời vùng an toàn mà không chới với là **Vốn Uy Tín (Reputation Capital)** đã tích lũy suốt những năm đi làm công sở.

Đừng đợi đến ngày nghỉ việc mới bắt đầu xây thương hiệu cá nhân. Cách bạn xử lý từng hồ sơ tín dụng ở ngân hàng, cách bạn giữ lời hứa với đồng nghiệp và bàn giao công việc chu đáo đến ngày cuối cùng chính là tấm giấy thông hành giá trị nhất. Khi bên dưới có bệ phóng tài chính kỷ luật và bên trên có chữ “Tín” còn nguyên, bước ra khỏi vùng an toàn sẽ không phải là cú rơi tự do.`,
    keyTakeaways: [
      'Lập Quỹ dự phòng thanh khoản từ 6 đến 12 tháng chi phí thiết yếu để giữ vững tinh thần và sự chuẩn mực nghề nghiệp trong giai đoạn đầu chuyển hướng.',
      'Tách bạch ngân sách sinh hoạt gia đình với quỹ đầu tư cho sự nghiệp mới, và trao đổi rõ với người bạn đời để có sự đồng thuận.',
      'Chủ động trang bị bảo hiểm sức khỏe và nhân thọ cá nhân trước khi rời chế độ phúc lợi của tập đoàn.',
    ],
  },
  {
    id: '3-bieu-hien-cua-nguoi-quan-ly-gioi',
    index: '16',
    category: 'Phát triển Sự nghiệp',
    date: 'Tháng 09, 2026',
    readTime: '6 phút đọc',
    featured: false,
    image: '/images/SuKien_ChiVanCungDoiNguMTA_NangCupHuanLuyen.jpg',
    imageCaption: 'Chị Vân cùng đội ngũ quản lý kế cận trên bục vinh danh Manulife Talent Attractor (MTA).',
    title: 'Ba Phẩm Chất Của Người Quản Lý Giỏi Theo Kinh Nghiệm Của Vân',
    excerpt:
      'Làm việc cùng 64 Quản lý cấp cao và hơn 500 nhân sự tại Hệ thống Green Power, Vân thấy thước đo của người lãnh đạo không phải là tự mình sáng nhất, mà là giúp từng cộng sự phát huy thế mạnh riêng của họ.',
    content: `*Khi mới lên quản lý từ vị trí ngôi sao bán hàng (Top Sales), cái bẫy dễ mắc nhất là cố biến tất cả nhân sự thành “bản sao” của mình. Từ những viên gạch đầu tiên năm 2018 đến khi nhận giải “Nhà Quản lý Xuất sắc và Đáng tin cậy nhất Châu Á” (2021), Vân rút ra một điều: quyền lực áp đặt chỉ tạo ra sự tuân phục ngắn hạn, còn sự thấu cảm đi cùng kỷ luật mới tạo ra một tổ chức tự vận hành bền.*

## 1. Lắng Nghe Để Hiểu Người Và Đặt Đúng Người Vào Đúng Chỗ

Một đội ngũ hơn 500 người không thể vận hành bằng một công thức rập khuôn. Trong 64 anh chị Quản lý cấp cao (F1) làm việc trực tiếp với Vân tại Hệ thống Green Power, mỗi người vào nghề với xuất phát điểm và tính cách khác nhau. Có người từng là cán bộ ngân hàng sắc bén về con số, có người là chủ doanh nghiệp quyết đoán, có những người mẹ bỉm sữa dịu dàng và rất biết lắng nghe.

Nếu người lãnh đạo chỉ dùng một thước đo để đánh giá, mình sẽ vô tình làm thui chột tài năng của cộng sự. Lãnh đạo bằng sự thấu cảm bắt đầu từ quan sát kỹ và lắng nghe không định kiến:

- **Với người mạnh về tư duy logic và phân tích:** Vân khuyến khích các bạn đi sâu vào hoạch định gia sản, cấu trúc dòng tiền doanh nghiệp và thẩm định điều khoản hợp đồng.
- **Với người giàu cảm xúc và khả năng kết nối:** Vân hướng các bạn vào chăm sóc trải nghiệm khách hàng, tổ chức các buổi trò chuyện nhỏ và gắn kết đội ngũ.

Khi một người thấy lãnh đạo hiểu nỗi lo lẫn mong muốn của mình, và được đặt vào đúng chỗ để dùng sở trường, họ tự có động lực nhiều hơn bất kỳ mệnh lệnh hành chính nào.

## 2. Kỷ Luật Làm Gương, Uy Quyền Đến Từ Sự Nhất Quán Mỗi Ngày

Thấu cảm không có nghĩa là dễ dãi hay bỏ qua sự hời hợt. Trong ngành tài chính và bảo hiểm, sự dễ dãi của người quản lý hôm nay sẽ phải trả bằng uy tín của nhân sự và quyền lợi của khách hàng ngày mai.

Cách điều hành Vân theo đuổi là **“Lãnh đạo Phục vụ (Servant Leadership) dựa trên Kỷ luật Làm gương”**. Đội ngũ không làm theo khẩu hiệu treo trên tường phòng họp. Họ nhìn cách người dẫn đầu hành xử mỗi ngày để đặt tiêu chuẩn cho chính mình:

- **Chuẩn mực trong từng chi tiết nhỏ:** Từ việc có mặt đúng giờ ở các buổi huấn luyện sáng, tác phong chỉn chu, đến sự minh bạch, sòng phẳng trong mọi chính sách thi đua của khu vực.
- **Truyền nghề theo quy trình “4 Bước Thực Chiến”:** Thay vì chỉ giao chỉ tiêu rồi ngồi chờ báo cáo, Vân cùng các Giám đốc và Quản lý cấp cao áp dụng nguyên tắc: *Nói cho nghe, làm mẫu cho xem, cùng làm thực tế, rút kinh nghiệm và tháo gỡ tại chỗ*.

Cách rèn kỹ và kèm sát đó giúp Hệ thống Green Power đạt kết quả hiếm có trong ngành vào năm 2025: cùng lúc giữ vị trí **Top 1 Toàn quốc về Doanh số (FYP)** và **Top 1 về Tỷ lệ Duy trì Hợp đồng (Persistency)**. Đi nhanh nhưng phải đi chắc, đó là văn hóa được truyền từ người đứng đầu xuống từng tư vấn viên mới vào nghề.

## 3. Lấy Sự Trưởng Thành Của Cộng Sự Làm Thước Đo

Đầu sự nghiệp, niềm vui của Vân là những chiếc cúp cá nhân. Nhưng sau hơn 17 năm trong ngành tài chính, điều Vân vui nhất là được đứng dưới khán đài hoặc cạnh các cộng sự trên sân khấu vinh danh **Manulife Talent Attractor (MTA)**. Đó là lúc thấy những người em, người bạn từng rụt rè ngày nào nay tự tin nâng chiếc cúp Quản lý xuất sắc.

Một người quản lý đúng nghĩa không sợ nhân sự giỏi hơn mình, càng không giữ “bí quyết nghề nghiệp” cho riêng mình. Vân luôn cố đóng gói kiến thức và kinh nghiệm của mình thành quy trình đơn giản, dễ sao chép nhất để trao cho thế hệ kế cận.

Với Vân, thành tựu lớn nhất của một người lãnh đạo không phải số danh hiệu trên danh thiếp, mà là bao nhiêu gia đình của cộng sự đã vững vàng hơn nhờ đi cùng mình trên đường nghề.`,
    keyTakeaways: [
      'Thấu cảm trong quản lý là lắng nghe kỹ để nhìn đúng thế mạnh riêng của từng nhân sự, thay vì ép cả đội vào một khuôn.',
      'Kết hợp Lãnh đạo Phục vụ (Servant Leadership) với kỷ luật làm gương và quy trình kèm cặp thực chiến 4 bước.',
      'Đo thành công của người dẫn đầu bằng số quản lý kế cận trưởng thành, tự chủ và đứng vững.',
    ],
  },
  {
    id: 'can-bang-cong-viec-va-gia-dinh-bo-me-di-lam',
    index: '17',
    category: 'Bố Mẹ Đi Làm',
    date: 'Tháng 09, 2026',
    readTime: '6 phút đọc',
    featured: false,
    image: '/images/GiaDinh_ChiVan_NgoiSofaPhongKhach.jpg',
    imageCaption: 'Chị Khánh Vân cùng người bạn đời và hai con tại nhà, điểm tựa phía sau sự nghiệp của chị.',
    title: 'Cân Bằng Sự Nghiệp Và Gia Đình Bằng Cách Có Mặt Thật Sự',
    excerpt:
      'Đầu năm 2018, Vân rời ANZ sau 8 năm khi đang đứng Top 1 doanh số. Điều Vân tìm không chỉ là thu nhập cao hơn, mà là quyền chủ động thời gian để vừa làm sự nghiệp độc lập, vừa có mặt trong tuổi thơ của hai con.',
    content: `*Phụ nữ làm quản lý thường mang một nỗi băn khoăn khó gọi tên: ngồi trong phòng họp thì lo nghĩ bữa tối của con, ngồi bên con thì lo chỉ tiêu và tin nhắn công việc. Sau nhiều năm đi qua áp lực đó, Vân nhận ra cân bằng không phải là chia thời gian 50/50 một cách máy móc. Cân bằng là có mặt thật sự ở nơi mình đang ở.*

## Năm 2018 Và Mong Muốn Làm Chủ Thời Gian Của Mình

Đầu năm 2018, sau 8 năm gắn bó với ngân hàng quốc tế ANZ (từ 2009 đến 2017) và vừa đạt Top 1 doanh số thế chấp toàn quốc, Vân đưa ra một quyết định khiến nhiều đồng nghiệp bất ngờ: rời môi trường ngân hàng nước ngoài để bắt đầu làm độc lập tại Manulife Việt Nam.

Lý do không phải vì công việc cũ không tốt. ANZ đã rèn cho Vân kỷ luật kiểm soát rủi ro và tư duy quản lý tài sản bài bản. Nhưng ở tuổi 30, nhìn con gái lớn và con trai nhỏ lớn lên từng ngày, Vân thấy hai giới hạn của con đường làm công ăn lương: thu nhập có trần cố định, và thời gian bị đóng khung từ sáng sớm đến tối muộn.

Vân muốn một sự nghiệp mà mình chủ động nhịp làm việc: vừa phát triển được hệ thống kinh doanh không giới hạn, vừa sắp xếp được thời gian để không lỡ những cột mốc lớn của các con.

## Bớt Cảm Giác “Mắc Nợ Hai Đầu” Bằng Ranh Giới Rõ Ràng

Nhiều cha mẹ đi làm kiệt sức vì lúc nào cũng thấy mình nợ cả công việc lẫn gia đình. Điều giúp Vân điều hành hơn 500 nhân sự và 64 quản lý cấp cao mà vẫn thong thả là kỷ luật phân bổ thời gian (Time-blocking) và ranh giới rõ trong đầu:

- **Từ 8h30 đến 17h30, dành toàn bộ cho đội ngũ và khách hàng:** Trong giờ làm việc, dù đang đào tạo F1 hay thẩm định hồ sơ gia sản cho khách, Vân tập trung 100%, giải quyết dứt điểm từng việc theo thứ tự ưu tiên thay vì để kéo dài.
- **Bước qua cửa nhà là gác thiết bị lại:** Buổi tối về nhà, Vân tập thói quen tắt thông báo công việc. Đó là giờ nghe hai chị em kể chuyện ở trường, cùng con đọc sách, hay cùng tưới mấy chậu cây ngoài ban công.

Trẻ con nhạy lắm. Các con không đếm bố mẹ ở nhà bao nhiêu tiếng, nhưng cảm nhận được ngay bố mẹ có thật sự hướng về mình hay vẫn dán mắt vào điện thoại. Ba mươi phút trò chuyện thật sự trước giờ đi ngủ giá trị hơn nhiều so với một buổi tối ngồi cạnh nhau mà mỗi người một thế giới.

## Sự Đồng Thuận Của Người Bạn Đời

Danh hiệu Nhà Quản lý Xuất sắc nhất Châu Á (2021) hay những mùa Top 1 toàn quốc chưa bao giờ là nỗ lực của riêng Vân. Phía sau là sự thấu hiểu và đồng hành thầm lặng của người chồng, người đã tin tưởng và ủng hộ Vân từ những ngày đầu rời vùng an toàn.

Trong hôn nhân của người làm quản lý, sai lầm dễ mắc nhất là mang gương mặt căng thẳng về nhà rồi im lặng tự gồng. Vân chọn nói thẳng và chia sẻ với chồng:

- **Báo trước những giai đoạn cao điểm:** Vào các tháng chạy chỉ tiêu lớn của vùng hoặc khi lịch sự kiện dày, Vân trao đổi trước để hai vợ chồng chủ động chia nhau việc đưa đón và ở bên con.
- **Tôn trọng không gian của nhau và chung tầm nhìn tài chính:** Khi người bạn đời hiểu mục tiêu của mình không chỉ là danh hiệu nghề nghiệp mà là nền tảng vững cho cả gia đình, tổ ấm sẽ là nơi nạp lại năng lượng tốt nhất.

## Làm Việc Tử Tế Cũng Là Bài Học Cho Con

Nhiều người đặt công việc và cuộc sống lên hai đầu bàn cân. Với Vân, hai thứ này nâng đỡ nhau.

Khi các con thấy bố mẹ làm việc tử tế, giữ chữ Tín với từng khách hàng và đồng nghiệp, các con tự học được lòng tự trọng và tinh thần trách nhiệm. Ngược lại, mỗi ngày đi làm Vân giúp hàng trăm gia đình lập quỹ học vấn và lá chắn bảo vệ người trụ cột, nên Vân càng hiểu rằng tình thương dành cho con sẽ đầy đủ nhất khi có một cơ chế tài chính kỷ luật đi kèm. Như vậy, dù đời có biến số bất ngờ, đường trưởng thành của các con vẫn được giữ nguyên.`,
    keyTakeaways: [
      'Cân bằng không phải là chia đôi thời gian máy móc, mà là có mặt thật sự, trọn tâm trí ở nơi mình đang ở.',
      'Dùng Time-blocking ở văn phòng và gác thiết bị khi về nhà để lắng nghe và gần gũi các con.',
      'Trao đổi rõ với người bạn đời về mục tiêu sự nghiệp và chuẩn bị sẵn cấu trúc tài chính dài hạn để tổ ấm yên tâm.',
    ],
  },
  {
    id: '3-nguyen-tac-quan-tri-dong-tien-gia-dinh',
    index: '18',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 08, 2026',
    readTime: '6 phút đọc',
    featured: false,
    image: '/images/VanPhong_ChiVanCungDoiNgu_QuyetTamHanhTrinhToaSang.jpg',
    imageCaption: 'Mỗi bộ hợp đồng được hoạch định kỹ giống một đê chắn sóng, giữ dòng tiền và tương lai học vấn cho cả gia đình.',
    title: 'Ba Nguyên Tắc Bảo Toàn Dòng Tiền Gia Đình Từ Góc Nhìn Cựu Banker',
    excerpt:
      'Kiếm được thu nhập cao là năng lực của hiện tại. Giữ được tiền thì cần cấu trúc “Kiềng 3 chân” để bảo vệ tương lai học vấn của con và dòng tiền gia đình trước mọi biến cố.',
    content: `*Suốt 8 năm làm việc tại ngân hàng quốc tế ANZ và hơn 8 năm điều hành tại Manulife Việt Nam, Vân đã trực tiếp thẩm định hàng ngàn hồ sơ tài chính của các gia đình trung lưu và chủ doanh nghiệp. Có một nghịch lý Vân nhớ mãi: rất nhiều người cực giỏi khâu "Tấn công" (kiếm tiền và nhân tài sản khi thị trường thuận lợi), nhưng gần như bỏ trống "Hàng phòng thủ" trước rủi ro sức khỏe và biến cố dòng tiền.*

## Nguyên Tắc 1: Bảo Vệ “Máy In Tiền” Của Gia Đình Và Quỹ Học Vấn Của Con Trước Khi Đầu Tư Mạo Hiểm

Trong bảng cân đối tài sản của một gia đình, tài sản quý nhất là gì? Nhiều người sẽ chỉ vào căn nhà đang ở, mảnh đất vùng ven hay danh mục cổ phiếu. Nhưng mọi khối tài sản đó đều đến từ một nguồn: **Sức khỏe, trí tuệ và khả năng tạo ra dòng tiền đều đặn mỗi ngày của người trụ cột**.

Khi "chiếc máy in tiền" ấy chạy tốt, cả nhà sống thoải mái. Nhưng nếu người trụ cột phải dừng đột ngột vì biến cố y tế nghiêm trọng hoặc tai nạn:

- Thu nhập chủ động đứt về 0, trong khi chi phí sinh hoạt, lãi vay ngân hàng và học phí của con vẫn đến đều mỗi tháng.
- Gia đình buộc phải bán tháo tài sản đầu tư (bất động sản, chứng khoán) đúng lúc thị trường khó bán nhất để có tiền chữa bệnh.

Vì vậy, nguyên tắc đầu tiên của một cựu Banker là: **Làm chắc tầng Đáy của tháp tài sản trước khi xây tầng Đỉnh**. Quỹ học vấn 15 đến 18 năm của các con và quỹ dự phòng y tế chất lượng cao cho bố mẹ cần để ở vùng an toàn tuyệt đối, tách khỏi biến động lên xuống của chu kỳ kinh tế.

## Nguyên Tắc 2: Kiềng 3 Chân Và Phân Bổ “Đúng & Đủ” (10 Đến 15% Thu Nhập)

Một hợp đồng bảo hiểm hay kế hoạch tài chính tốt nhất không phải là hợp đồng đắt nhất, mà là hợp đồng **được duy trì đủ lâu đến đúng lúc gia đình cần**. Vì vậy, nhiều năm qua Hệ thống Green Power luôn đặt chỉ số **Tỷ lệ Duy trì Hợp đồng (Persistency Top 1 Toàn quốc)** ngang hàng với doanh thu.

Để dòng tiền gia đình thông suốt trong 15 đến 20 năm, Vân luôn khuyên khách hàng lập mô hình **“Kiềng 3 Chân Tài Chính”**:

- **Chân thứ nhất, Thanh khoản ngắn hạn (Ngân hàng):** Giữ quỹ tiền gửi tương đương 6 đến 12 tháng chi phí sinh hoạt để xử lý ngay mọi nhu cầu phát sinh.
- **Chân thứ hai, Đê chắn rủi ro và Kỷ luật hưu trí (Bảo hiểm Nhân thọ, Sức khỏe):** Chỉ trích một tỷ lệ vừa phải, từ **10% đến tối đa 15% tổng thu nhập ổn định hàng năm** của gia đình. Khoản 10 đến 15% này không làm ảnh hưởng chất lượng sống hiện tại, nhưng mở ra ngay một hạn mức bảo vệ sinh mạng, bệnh lý nghiêm trọng và y tế lớn gấp hàng chục lần số tiền đóng vào.
- **Chân thứ ba, Gia tăng tài sản dài hạn (Đầu tư & Kinh doanh):** Khi đã có Chân thứ nhất và Chân thứ hai che chắn cho tổ ấm, bạn yên tâm dùng 85% dòng tiền còn lại để sinh hoạt và đầu tư sinh lời.

## Nguyên Tắc 3: “Khám Sức Khỏe Tài Chính” Mỗi Năm Một Lần

Một sai lầm rất phổ biến ở các gia đình Việt là ký xong hợp đồng bảo hiểm hoặc lập xong sổ tiết kiệm thì cất vào két sắt 5 đến 10 năm không mở ra xem lại.

Thực tế, đời sống mỗi gia đình luôn thay đổi:

- Năm 30 tuổi, bạn vừa có đứa con đầu lòng, thu nhập và trách nhiệm tài chính ở một mức.
- Năm 38 tuổi, bạn có thêm bé thứ hai, chuyển sang nhà lớn hơn kèm một khoản dư nợ tín dụng mới, hoặc cha mẹ hai bên bắt đầu già và cần chăm sóc y tế đặc biệt.

Một cấu trúc bảo vệ thiết kế từ 5 năm trước có thể đã quá chật so với tài sản và trách nhiệm hiện tại. Vì vậy, nguyên tắc thứ ba Vân luôn làm cùng khách hàng là **Rà soát danh mục định kỳ hàng năm (Annual Policy Review)**: kiểm tra lại thông tin người thụ hưởng, cập nhật quyền lợi y tế thế hệ mới, tối ưu dòng tiền đóng phí và chỉnh mệnh giá bảo vệ cho khớp với từng giai đoạn của gia đình.

Kiếm được nhiều tiền giúp gia đình sống tiện nghi ở hiện tại. Quản lý dòng tiền bài bản và kỷ luật mới giúp sự khấm khá ấy đi qua được những lúc khó khăn.`,
    keyTakeaways: [
      'Ưu tiên bảo vệ “máy in tiền” (sức khỏe và thu nhập của người trụ cột) cùng quỹ học vấn của con ở vùng an toàn tuyệt đối trước khi đầu tư mạo hiểm.',
      'Dùng cấu trúc “Kiềng 3 chân” (Ngân hàng, Bảo hiểm, Đầu tư) với nguyên tắc Đúng & Đủ: chỉ phân bổ 10 đến 15% thu nhập cho lá chắn bảo hiểm để duy trì bền 15 đến 20 năm.',
      'Rà soát hồ sơ tài chính và hợp đồng bảo hiểm mỗi năm một lần để quyền lợi theo kịp từng giai đoạn của gia đình.',
    ],
  },
  {
    id: 'ky-luat-phong-tap-va-su-ben-bi',
    index: '19',
    category: 'Kỷ luật Bản thân',
    date: 'Tháng 08, 2026',
    readTime: '6 phút đọc',
    featured: false,
    image: '/images/DoiThuong_ChiVan_PhongTapGym_Ngang.jpg',
    imageCaption: 'Chị Vân tập luyện thể lực đều đặn mỗi tuần, giúp giữ đầu óc tỉnh táo và sức bền khi làm quản lý.',
    title: 'Tập Gym Đều Và Bài Học Về Sức Bền Của Người Dẫn Đầu Đội Ngũ',
    excerpt:
      'Điều hành hệ thống hơn 500 nhân sự và 64 quản lý cấp cao cần thể lực dẻo dai. Với Vân, phòng tập, khu vườn nhỏ và quản lý tài chính đều theo chung một quy luật: kết quả vững đến từ thói quen lặp lại mỗi ngày.',
    content: `*Bạn bè và cộng sự hay hỏi Vân: “Làm sao chị luôn giữ được năng lượng tốt và sự điềm tĩnh khi vừa điều hành vùng kinh doanh hơn 500 nhân sự, vừa cố vấn khách hàng và chăm sóc gia đình?” Câu trả lời của Vân không nằm ở kỹ thuật quản trị phức tạp. Nó bắt đầu từ những giờ tập đổ mồ hôi đều đặn mỗi tuần.*

## Phòng Tập Và Quản Lý Có Chung Một Quy Luật: Lặp Lại Đều

Một Giám đốc Vùng phải lo lịch đào tạo, họp chiến lược với các quản lý F1 và hoạch định gia sản, nên cần thể lực thật sự bền. Đầu óc sắc và khả năng quyết định tốt không thể tồn tại lâu trong một cơ thể mệt mỏi.

Nhưng hơn chuyện vóc dáng hay thể lực, phòng tập là nơi rèn tính tự giác khắt khe nhất:

- **Không có kết quả nào đến sau một đêm:** Bạn không thể nâng mức tạ nặng hay có cơ thể dẻo dai chỉ sau vài buổi tập hứng khởi. Thay đổi chỉ đến khi bạn kiên trì lặp lại bài tập đúng kỹ thuật, kể cả những buổi sáng người uể oải nhất và không ai đứng cạnh giám sát.
- **Thắng sự trì hoãn của chính mình:** Mỗi lần xỏ giày vào phòng tập sau một ngày làm việc căng thẳng là một lần luyện cách vượt qua sự dễ dãi của bản thân.

Quản lý đội ngũ và tích lũy tài sản cũng như vậy. Top 1 toàn quốc không đến từ những cú bứt tốc ngẫu hứng, mà từ những thói quen tốt được giữ đều qua ngày này sang tháng khác.

## Từ “Ba Tháng Trắng Tay” Đến Đỉnh Cao, Sức Bền Tinh Thần Bắt Đầu Từ Thể Lực

Nhìn lại gần hai thập kỷ làm nghề, từ những ngày đầu chuyển sang bộ phận kinh doanh tại ngân hàng ANZ với 3 tháng liên tiếp không có nổi một khách hàng, đến lúc dẫn dắt hệ thống vượt qua đại dịch năm 2021 và nhận giải Nhà Quản lý Xuất sắc nhất Châu Á, bài học lớn nhất của Vân là: **Người đi xa nhất không phải người chạy nhanh nhất ở vạch xuất phát, mà là người đủ sức bền để không bỏ cuộc giữa chừng.**

Khi cơ thể khỏe và nhịp sinh học ổn định, cách mình đối diện áp lực cũng khác. Trước một biến động thị trường hay một bài toán nhân sự khó, người lãnh đạo có thể lực tốt giữ được nhịp thở bình tĩnh, không hoảng và không truyền căng thẳng sang cả đội. Vân vẫn giữ một câu làm kim chỉ nam nhiều năm nay: *“Cứ đi rồi sẽ đến, chỉ cần hướng về mặt trời”*.

## Bài Học Từ Khu Vườn Nhỏ: Cây Đâm Rễ Âm Thầm Trước Khi Vươn Cao

Ngoài phòng tập, một thói quen yên tĩnh khác giúp Vân cân bằng ở tuổi U40 là tự tay trồng cây và chăm khu vườn nhỏ ngoài ban công.

Trồng cây dạy người làm tài chính biết kiên nhẫn:

- Có những giai đoạn nhiều tháng liền, nhìn bên ngoài cái cây gần như không cao thêm một centimet. Nhưng thật ra nó vẫn lớn, đang dồn sức xuống đất để đâm bộ rễ sâu và chắc.
- Chỉ khi rễ đã đủ vững, cây mới bắt đầu vươn cành lá và đứng được trước mưa bão.

Rèn thể lực, xây uy tín nghề nghiệp hay tích lũy tài chính dài hạn cho gia đình đều cần một “giai đoạn đâm rễ” âm thầm như vậy. Đừng sốt ruột khi những tháng đầu tập hay những năm đầu tích lũy chưa thấy kết quả nhảy vọt. Sự kiên định trong giai đoạn âm thầm ấy quyết định độ bền của cả chục năm sau.

## Chủ Động Hai Việc: Rèn Cơ Thể Và Chuẩn Bị Cho Rủi Ro Y Tế

Làm quản trị rủi ro, Vân luôn nghĩ sức khỏe là con số 1 đứng đầu, còn tài sản, sự nghiệp hay những chuyến du lịch là các con số 0 đứng sau. Có số 1 thì các số 0 mới có nghĩa.

Vì vậy, chăm sóc sức khỏe cần hai việc đi cùng nhau như hai cánh của một con chim:

- **Việc thứ nhất là rèn luyện mỗi ngày:** Tập thể dục đều, ăn uống lành mạnh và giữ tâm trí thoải mái để cơ thể dẻo dai, giảm tối đa khả năng bệnh tật.
- **Việc thứ hai là chuẩn bị quỹ dự phòng y tế từ lúc còn khỏe:** Vì dù kỷ luật đến đâu, vẫn có những rủi ro y tế không báo trước. Có sẵn thẻ chăm sóc sức khỏe và quỹ dự phòng bệnh lý nghiêm trọng là cách làm chắc phần tài chính, để nếu có biến cố, gia đình được điều trị tốt nhất mà không phải đụng đến khoản tích lũy cho tương lai của các con.

Tập thể dục mỗi ngày để cơ thể khỏe. Lập sẵn lớp đệm dự phòng y tế từ sớm để đầu óc được yên.`,
    keyTakeaways: [
      'Thể lực bền và nhịp sinh hoạt kỷ luật giúp người lãnh đạo giữ được sự tỉnh táo, điềm tĩnh trước áp lực.',
      'Thể thao, trồng cây và quản lý gia sản có chung quy luật: cần giai đoạn kiên trì đâm rễ âm thầm trước khi có kết quả dài hạn.',
      'Chăm sóc sức khỏe gồm hai việc không tách rời: rèn luyện thể chất mỗi ngày và chuẩn bị quỹ dự phòng y tế từ lúc còn khỏe.',
    ],
  },
];

interface BookItem {
  num: string;
  title: string;
  author: string;
  theme: string;
  cover: string;
  note: string;
  reflection: string;
}

const BOOKS: BookItem[] = [
  {
    num: '01',
    title: 'Good to Great: Từ Tốt Đến Vĩ Đại',
    author: 'Jim Collins',
    theme: 'Triết lý Lãnh đạo',
    cover: '/images/books/book_01_good_to_great.jpg',
    note: 'Hình mẫu “Lãnh đạo Cấp độ 5”: người khiêm nhường nhưng quyết liệt với công việc, và luôn chọn đúng người trước khi tính đến việc gì.',
    reflection: 'Khi xây đội ngũ, Vân nhớ nhất bài học của Jim Collins: đừng vội tăng số lượng, hãy chọn người có chung chữ “Tín”.',
  },
  {
    num: '02',
    title: 'The Psychology of Money: Tâm Lý Học Về Tiền',
    author: 'Morgan Housel',
    theme: 'Quản trị Gia sản',
    cover: '/images/books/book_02_psychology_of_money.jpg',
    note: 'Giàu bền không nhờ công thức phức tạp. Cái cần là kiểm soát hành vi của chính mình và luôn chừa một khoản dự phòng cho gia đình.',
    reflection: 'Gần hai mươi năm làm việc với dòng tiền, từ ANZ đến Manulife, Vân rút ra một điều: quản lý gia sản là để gia đình không bị động khi có biến cố.',
  },
  {
    num: '03',
    title: 'Atomic Habits: Thay Đổi Tí Hon, Hiệu Quả Bất Ngờ',
    author: 'James Clear',
    theme: 'Kỷ luật Thói quen',
    cover: '/images/books/book_03_atomic_habits.jpg',
    note: 'Ý chính khớp với phương châm “Đi chắc để đi xa”: thành quả lớn đến từ những thói quen nhỏ, ngày nào cũng lặp lại.',
    reflection: 'Ba tháng đầu làm Sales chưa có khách nào, Vân vẫn không bỏ cuộc. Top 1 toàn quốc sau này cũng đến từ những việc nhỏ làm đều mỗi ngày.',
  },
  {
    num: '04',
    title: 'Servant Leadership: Phụng Sự Để Dẫn Đầu',
    author: 'Robert K. Greenleaf',
    theme: 'Lãnh đạo biết phục vụ',
    cover: '/images/books/book_04_servant_leadership.jpg',
    note: 'Người lãnh đạo thật sự bắt đầu từ mong muốn giúp đỡ người khác, không phải từ ham muốn quyền lực.',
    reflection: 'Nhìn 64 nhà quản lý F1 trưởng thành, Vân thấy mình chỉ dẫn đầu đúng nghĩa khi giúp từng người đạt được thành công của riêng họ.',
  },
];

function formatInlineText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[#181F1C]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={i} className="italic text-[#0A3622]">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

function renderArticleContent(content: string | string[]) {
  const blocks = Array.isArray(content)
    ? content
    : content
        .split(/\n\s*\n/)
        .map((b) => b.trim())
        .filter(Boolean);

  return (
    <div className="space-y-6 text-[16px] sm:text-[17px] text-[#242D28] font-normal leading-[1.85] sm:leading-[1.95] tracking-[0.01em]">
      {blocks.map((block, idx) => {
        // Heading 2
        if (block.startsWith('## ')) {
          return (
            <h4
              key={idx}
              className="font-sans font-semibold text-xl sm:text-[23px] text-[#181F1C] pt-6 pb-2.5 border-b border-[#E4E1D8] leading-snug mt-2 tracking-tight"
            >
              {block.replace(/^##\s*/, '')}
            </h4>
          );
        }

        // Italic lead paragraph / quote
        if (block.startsWith('*') && block.endsWith('*') && !block.startsWith('**')) {
          const innerText = block.slice(1, -1);
          return (
            <div
              key={idx}
              className="font-serif italic text-[16px] sm:text-lg text-[#181F1C] leading-[1.75] pl-4 sm:pl-5 border-l-[3px] border-[#008746] bg-[#F2EFE9]/70 py-3.5 px-4 rounded-r-[4px] my-5"
            >
              {innerText}
            </div>
          );
        }

        // Bullet list
        if (block.includes('\n- ') || block.startsWith('- ')) {
          const items = block
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.startsWith('- '));
          return (
            <ul key={idx} className="space-y-3 my-4 pl-1">
              {items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="flex items-start gap-3 text-[15px] sm:text-[16px] text-[#242D28] font-normal leading-[1.8]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008746] mt-2.5 shrink-0" />
                  <span>{formatInlineText(item.replace(/^-\s*/, ''))}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Standard paragraph
        return <p key={idx}>{formatInlineText(block)}</p>;
      })}
    </div>
  );
}

export function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);

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

  // Prevent background scroll when modal or mobile menu is open (Native App UX)
  useEffect(() => {
    if (activeArticle || activeVideo || lightbox || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeArticle, activeVideo, lightbox, mobileMenuOpen]);

  // Helper to read video ID from query param (?video=...)
  const getVideoIdFromUrl = useCallback((): string | null => {
    if (typeof window === 'undefined') return null;
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('video');
  }, []);

  // Helper to read article ID from query param (?article=... or ?bai-viet=... or ?id=...), path (/bai-viet/... or /article/...) or hash (#bai-viet-... or #article-...)
  const getArticleIdFromUrl = useCallback((): string | null => {
    if (typeof window === 'undefined') return null;
    const searchParams = new URLSearchParams(window.location.search);
    const fromQuery = searchParams.get('article') || searchParams.get('bai-viet') || searchParams.get('id');
    if (fromQuery) return fromQuery;

    const pathParts = window.location.pathname.split('/').filter(Boolean);
    if ((pathParts[0] === 'bai-viet' || pathParts[0] === 'article') && pathParts[1]) {
      return pathParts[1];
    }

    const hash = window.location.hash;
    if (hash.startsWith('#bai-viet-')) return hash.replace('#bai-viet-', '');
    if (hash.startsWith('#article-')) return hash.replace('#article-', '');

    return null;
  }, []);

  const updateMetaTags = (title?: string, description?: string, image?: string) => {
    if (typeof document === 'undefined') return;
    if (title) {
      document.title = title;
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);
    }
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', description);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);
    }
    if (image) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', image);
    }
  };

  const openArticle = useCallback((article: Article, pushHistory = true) => {
    setActiveArticle(article);
    trackEvent('article_view', {
      article_id: article.id,
      article_title: article.title,
      article_category: article.category,
    });
    if (pushHistory && typeof window !== 'undefined') {
      const newUrl = `${window.location.origin}/?article=${encodeURIComponent(article.id)}`;
      window.history.pushState({ articleId: article.id }, '', newUrl);
    }
    updateMetaTags(
      `${article.title} | Khánh Vân`,
      article.excerpt,
      article.image ? (article.image.startsWith('http') ? article.image : `${window.location.origin}${article.image}`) : undefined
    );
  }, []);

  const closeArticle = useCallback((pushHistory = true) => {
    setActiveArticle(null);
    if (pushHistory && typeof window !== 'undefined') {
      const cleanUrl = `${window.location.origin}/#goc-nhin`;
      window.history.pushState({}, '', cleanUrl);
    }
    updateMetaTags(
      'Khánh Vân | Giám đốc Vùng Cấp cao',
      'Khánh Vân, Giám đốc Vùng Cấp cao tại Manulife Việt Nam, Nhà Quản lý Xuất sắc nhất Châu Á (2021), cựu Quản lý Tài sản ANZ Bank.',
      typeof window !== 'undefined' ? `${window.location.origin}/images/VanPhong_ChiVanCungTapThe_AnhSangTuNhien.jpg` : undefined
    );
  }, []);

  const shareArticle = useCallback(async (article: Article) => {
    if (typeof window === 'undefined') return;
    const shareUrl = `${window.location.origin}/?article=${encodeURIComponent(article.id)}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: shareUrl,
        });
      } catch {
        // User cancelled share dialog or native share not completed
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Đã sao chép liên kết bài viết:\n' + shareUrl);
      } catch {
        prompt('Sao chép liên kết bài viết:', shareUrl);
      }
    } else {
      prompt('Sao chép liên kết bài viết:', shareUrl);
    }
  }, []);

  const openVideo = useCallback((video: VideoItem, pushHistory = true) => {
    setActiveArticle(null);
    setActiveVideo(video);
    trackEvent('video_view', {
      video_id: video.id,
      video_title: video.title,
      video_category: video.folderShort,
      video_subtag: video.subtag,
    });
    if (pushHistory && typeof window !== 'undefined') {
      const newUrl = `${window.location.origin}/?video=${encodeURIComponent(video.id)}`;
      window.history.pushState({ videoId: video.id }, '', newUrl);
    }
    updateMetaTags(`${video.title} | Video Khánh Vân`, video.summary);
  }, []);

  const closeVideo = useCallback((pushHistory = true) => {
    setActiveVideo(null);
    if (pushHistory && typeof window !== 'undefined') {
      const cleanUrl = `${window.location.origin}/#thu-vien-video`;
      window.history.pushState({}, '', cleanUrl);
    }
    updateMetaTags(
      'Khánh Vân | Giám đốc Vùng Cấp cao',
      'Khánh Vân, Giám đốc Vùng Cấp cao tại Manulife Việt Nam, Nhà Quản lý Xuất sắc nhất Châu Á (2021), cựu Quản lý Tài sản ANZ Bank.',
      typeof window !== 'undefined' ? `${window.location.origin}/images/VanPhong_ChiVanCungTapThe_AnhSangTuNhien.jpg` : undefined
    );
  }, []);

  const handleAskVideoQuestion = useCallback(
    (video: VideoItem) => {
      closeVideo(false);
      setFormData((prev) => ({
        ...prev,
        topic:
          video.folderId === 'chuyen-nghe-lanh-dao'
            ? 'Đồng hành Phát triển Quản lý Kế cận (Mentorship F1)'
            : 'Cố vấn Hoạch định Tài chính & Gia sản Gia đình',
        note: `Tôi vừa xem video "${video.title}" và muốn trao đổi thêm về chủ đề này.`,
      }));
      setTimeout(() => {
        const el = document.getElementById('lien-he');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    [closeVideo]
  );

  // Deep-link check on initial mount
  useEffect(() => {
    const targetVideoId = getVideoIdFromUrl();
    if (targetVideoId) {
      const foundVideo = VIDEO_LIBRARY.find(
        (v) => v.id === targetVideoId || v.reelId === targetVideoId
      );
      if (foundVideo) {
        openVideo(foundVideo, false);
        return;
      }
    }
    const targetId = getArticleIdFromUrl();
    if (targetId) {
      const found = ARTICLES.find((a) => a.id === targetId);
      if (found) {
        openArticle(found, false);
      }
    }
  }, [getArticleIdFromUrl, getVideoIdFromUrl, openArticle, openVideo]);

  // Handle browser back / forward navigation (popstate)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const videoId = event.state?.videoId || getVideoIdFromUrl();
      if (videoId) {
        const foundVideo = VIDEO_LIBRARY.find(
          (v) => v.id === videoId || v.reelId === videoId
        );
        if (foundVideo) {
          openVideo(foundVideo, false);
          return;
        }
      }
      const articleId = event.state?.articleId || getArticleIdFromUrl();
      if (articleId) {
        const found = ARTICLES.find((a) => a.id === articleId);
        if (found) {
          openArticle(found, false);
          return;
        }
      }
      closeArticle(false);
      closeVideo(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [getArticleIdFromUrl, getVideoIdFromUrl, openArticle, closeArticle, openVideo, closeVideo]);

  const navItems = [
    { label: 'Câu chuyện', href: '#cau-chuyen' },
    { label: 'Thư viện Video', href: '#thu-vien-video' },
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

  const featuredArticles =
    selectedCategory === 'Tất cả'
      ? filteredArticles.filter((a) => a.featured)
      : filteredArticles.filter((a) => Boolean(a.image)).slice(0, 3);
  const featuredIds = new Set(featuredArticles.map((a) => a.id));
  const archiveArticles = filteredArticles.filter((a) => !featuredIds.has(a.id));

  const pressMentions = [
    {
      source: 'Asia Advisers Network',
      logo: '/images/logos/logo_aan.svg',
      logoAlt: 'Asia Advisers Network Logo',
      logoClass: 'h-6 sm:h-7',
      sourceType: 'Tạp chí Bảo hiểm Châu Á • Singapore',
      badge: 'Quốc tế',
      headline: 'Rookie Insurance Agency Leader of the Year 2021: Khanh Van',
      summary: 'Bài vinh danh chính thức của Hội đồng Giám khảo Quốc tế, ghi nhận năng lực lãnh đạo và đóng góp trong việc nâng cao nhận thức cộng đồng về bảo hiểm.',
      url: 'https://www.asiaadvisersnetwork.com/Article/aid/77267/Rookie-Insurance-Agency-Leader-of-the-Year-2021-Nguyen-Thi-Van',
    },
    {
      source: 'VietNamNet',
      logo: '/images/logos/logo_vietnamnet.svg',
      logoAlt: 'Báo VietNamNet Logo',
      logoClass: 'h-7 sm:h-8',
      sourceType: 'Báo VietNamNet • Chuyên đề Banker',
      badge: 'Từ Banker sang Bảo hiểm',
      headline: 'Từ ngân hàng đến bảo hiểm: Khi những banker chọn rẽ hướng, biến sự chỉn chu thành lợi thế dẫn dắt',
      summary: 'Khánh Vân kể cách chị mang tư duy hệ thống và kỷ luật vận hành từ 8 năm ở ANZ Bank sang nghề bảo hiểm.',
      url: 'https://vietnamnet.vn/tu-ngan-hang-den-bao-hiem-khi-nhung-banker-chon-re-huong-2523056.html',
    },
    {
      source: 'VietNamNet',
      logo: '/images/logos/logo_vietnamnet.svg',
      logoAlt: 'Báo VietNamNet Logo',
      logoClass: 'h-7 sm:h-8',
      sourceType: 'Báo VietNamNet • Thị trường & Tiêu dùng',
      badge: 'Giải thưởng Châu Á',
      headline: 'Đại lý Manulife Việt Nam nhận danh hiệu nhà quản lý mới của năm tại Châu Á',
      summary: 'Vinh danh bà Khánh Vân, Trưởng khu vực kinh doanh HCM12, với giải thưởng Rookie Insurance Agency Leader of the Year 2021.',
      url: 'https://vietnamnet.vn/dai-ly-manulife-viet-nam-nhan-danh-hieu-nha-quan-ly-moi-cua-nam-755155.html',
    },
  ];

  const metrics = [
    { figure: '08+', unit: 'Năm tại ANZ Bank', detail: 'Quản lý tài sản và tín dụng tại ngân hàng quốc tế' },
    { figure: 'Top 1', unit: 'Toàn quốc ANZ', detail: 'Dẫn đầu doanh số thế chấp năm 2017' },
    { figure: 'Top 1', unit: 'Lãnh đạo Châu Á', detail: 'Asia Trusted Awards Winner 2021' },
    { figure: '64', unit: 'Quản lý cấp cao', detail: 'Chị trực tiếp dẫn dắt' },
    { figure: '500+', unit: 'Nhân sự hệ thống', detail: 'Chị cùng điều hành' },
    { figure: '2 × Top 1', unit: 'FYP & Duy trì 2025', detail: 'Dẫn đầu cả FYP lẫn tỷ lệ duy trì hợp đồng' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#181F1C]">
      {/* 1. MINIMALIST EDITORIAL HEADER */}
      <header
        className={`fixed top-0 inset-x-0 transition-all duration-300 ${
          activeArticle || activeVideo || lightbox
            ? 'z-0 opacity-0 pointer-events-none'
            : 'z-50 opacity-100'
        } ${
          scrolled
            ? 'bg-[#FAF9F5]/92 backdrop-blur-md border-b border-[#E4E1D8] py-2.5 sm:py-3.5'
            : 'bg-[#FAF9F5] border-b border-[#E4E1D8]/60 py-2.5 sm:py-5'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 xl:px-10 flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#181F1C] min-w-[44px] min-h-[44px] flex items-center justify-center -ml-2"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <a href="#" className="flex items-center gap-2.5 sm:gap-3 shrink-0 whitespace-nowrap group">
              <span className="w-[3px] h-5 bg-[#008746] inline-block" />
              <span className="font-serif text-lg sm:text-2xl font-medium tracking-[0.12em] sm:tracking-[0.14em] uppercase text-[#181F1C]">
                Khánh Vân
              </span>
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-[11px] xl:text-[11.5px] uppercase tracking-[0.14em] xl:tracking-[0.16em] text-[#56605B] hover:text-[#0A3622] transition-colors font-normal"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-5 shrink-0">
            <a
              href="/green-power"
              className="group whitespace-nowrap inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-[2px] bg-[#EBF2EE] hover:bg-[#0A3622] text-[#0A3622] hover:text-[#FAF9F5] border border-[#0A3622]/25 hover:border-[#0A3622] text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.16em] font-semibold transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#008746] group-hover:bg-[#E8D3A6] transition-colors shrink-0" />
              <span>Green Power</span>
            </a>

            <a
              href="#lien-he"
              className="hidden sm:inline-flex whitespace-nowrap items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[#0A3622] border-b border-[#0A3622] pb-1 hover:text-[#008746] hover:border-[#008746] transition-colors font-medium"
            >
              <span>Liên hệ riêng</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#FAF9F5] border-b border-[#E4E1D8] overflow-hidden"
            >
              <div className="px-5 py-5 flex flex-col gap-2">
                <a
                  href="/green-power"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mb-2 px-4 py-3 rounded-[3px] bg-[#0A3622] text-[#FAF9F5] border border-[#B8975A]/60 flex items-center justify-between gap-3 active:opacity-95"
                >
                  <div>
                    <span className="text-[9.5px] uppercase tracking-[0.18em] text-[#E8D3A6] font-semibold block">
                      Hệ Thống Kinh Doanh
                    </span>
                    <span className="font-serif text-base font-medium text-white">
                      Green Power • 4 Khu vực
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#E8D3A6] shrink-0" />
                </a>

                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs uppercase tracking-[0.2em] text-[#181F1C] py-2.5 min-h-[44px] flex items-center border-b border-[#E4E1D8]/60 active:text-[#008746] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-4 flex items-center justify-between">
                  <a
                    href="#lien-he"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs uppercase tracking-[0.2em] text-[#008746] font-medium min-h-[44px] flex items-center"
                  >
                    Liên hệ riêng &rarr;
                  </a>
                  <div className="flex items-center gap-4">
                    <a
                      href={ZALO_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#56605B] hover:text-[#0A3622] min-h-[44px] px-2"
                    >
                      <span>Zalo</span>
                    </a>
                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#56605B] hover:text-[#0A3622] min-h-[44px] px-2"
                    >
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2A. FULL-BLEED STICKY HERO STAGE — CURTAIN-REVEAL ON SCROLL (LIKE THAIVANLINH.COM) */}
      <div className="mt-[65px] sm:mt-[77px] sticky top-[65px] z-0 w-full bg-[#EAE7DF] overflow-hidden">
        <figure
          onClick={() =>
            setLightbox({
              src: '/images/ChanDung_ChiVan_VestXanhNgoc_TrietLyNghe_Panorama.jpg?v=2',
              fig: 'CHÂN DUNG & TRIẾT LÝ NGHỀ',
              title: 'Khánh Vân: Đi chắc để đi xa, đồng hành bằng cả trái tim',
              subtitle:
                'Chân dung chị Khánh Vân, Giám đốc Vùng Cấp cao Manulife Việt Nam, cùng triết lý làm nghề của chị.',
            })
          }
          className="cursor-zoom-in group relative block w-full"
        >
          <div className="w-full aspect-[4/3] sm:aspect-[820/312] overflow-hidden relative">
            <picture>
              <source
                media="(min-width: 640px)"
                srcSet="/images/ChanDung_ChiVan_VestXanhNgoc_TrietLyNghe_Panorama.jpg?v=2"
              />
              <img fetchPriority="high" decoding="async"
                src="/images/ChanDung_ChiVan_VestXanhNgoc_TrietLyNghe_Mobile.jpg?v=2"
                alt="Khánh Vân: Đi chắc để đi xa. Làm nghề chuẩn mực, đồng hành bằng cả trái tim."
                className="w-full h-full block object-cover object-center group-hover:scale-[1.01] transition-transform duration-1000 ease-editorial"
              />
            </picture>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 sm:h-14 bg-gradient-to-t from-black/[0.06] to-transparent" />
          </div>
        </figure>
      </div>

      {/* CONTENT CURTAIN SHEET 1 — SLIDES UP OVER THE STICKY HERO ON SCROLL */}
      <div className="relative z-10 bg-[#FAF9F5] shadow-[0_-24px_60px_-12px_rgba(18,24,20,0.20)] border-t border-[#E4E1D8]">
      {/* 2B. THE EXECUTIVE SPLIT SPREAD (ĐỊNH VỊ LÃNH ĐẠO & ĐỘI NGŨ QUẢN LÝ TINH HOA) */}
      <section className="pt-10 sm:pt-20 lg:pt-24 pb-14 sm:pb-20 lg:pb-28">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
            {/* Cột Trái (6 Cột): Định Vị Quyền Lực, Hành Trình & Nút Hành Động */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-7">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#0A3622] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008746] shrink-0" />
                <span className="whitespace-nowrap">Cựu banker ANZ</span>
                <span className="text-[#858E89]">&bull;</span>
                <span className="whitespace-nowrap">Giám đốc Vùng Cấp cao Manulife</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-[72px] font-normal tracking-tight text-[#181F1C] leading-[1.02]">
                  Khánh Vân
                </h1>
                <div className="border-l-2 border-[#008746] pl-4 sm:pl-5 py-1">
                  <p className="font-serif italic text-xl sm:text-2xl text-[#0A3622] font-normal leading-[1.4]">
                    &ldquo;Làm đúng chuẩn thì tự khắc nhanh. Chữ Tín giữ từ ngày đầu đến ngày cuối.&rdquo;
                  </p>
                </div>
              </div>

              <p className="text-[15px] sm:text-base text-[#38433E] leading-[1.8] font-normal">
                Gần hai mươi năm làm nghề. Vân bắt đầu với 8 năm quản lý tài sản tại ngân hàng quốc tế ANZ, sau đó nhận danh hiệu Nhà Quản lý Xuất sắc nhất Châu Á (2021) và nhiều năm liền giữ vị trí Top 1 tại Manulife Việt Nam. Hiện Vân giúp các gia đình Việt giữ vững dòng tiền, hoạch định gia sản dài hạn, và trực tiếp dẫn dắt 64 nhà quản lý kế cận cùng hơn 500 tư vấn viên.
              </p>

              <div className="pt-1 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-5">
                <a
                  href="#lien-he"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#0A3622] hover:bg-[#008746] text-white text-[11px] uppercase tracking-[0.22em] font-medium transition-all duration-300 shadow-[0_12px_24px_-8px_rgba(10,54,34,0.3)] hover:shadow-[0_16px_32px_-8px_rgba(0,135,70,0.35)] rounded-[3px] min-h-[44px]"
                >
                  <span>Đặt lịch trao đổi 1-1</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#cau-chuyen"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#181F1C] hover:text-[#008746] border border-[#DCD8CE] hover:border-[#008746]/50 bg-white/70 hover:bg-white rounded-[3px] transition-all font-medium min-h-[44px]"
                >
                  <span>Xem chặng đường nghề</span>
                </a>
              </div>

              {/* Dải Micro Trust-Metrics */}
              <div className="pt-6 sm:pt-7 border-t border-[#E4E1D8] grid grid-cols-3 gap-4">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-[#0A3622] font-normal leading-none">08+</div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#858E89] mt-1.5 font-medium">Năm Banker ANZ</div>
                </div>
                <div className="border-l border-[#E4E1D8] pl-4">
                  <div className="font-serif text-2xl sm:text-3xl text-[#0A3622] font-normal leading-none">Top 1</div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#858E89] mt-1.5 font-medium">Lãnh Đạo Châu Á</div>
                </div>
                <div className="border-l border-[#E4E1D8] pl-4">
                  <div className="font-serif text-2xl sm:text-3xl text-[#0A3622] font-normal leading-none">500+</div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#858E89] mt-1.5 font-medium">Nhân Sự Hệ Thống</div>
                </div>
              </div>
            </div>

            {/* Cột Phải (6 Cột): Đại Gia Đình Quản Lý Tinh Hoa & Huy Hiệu Quốc Tế */}
            <div className="lg:col-span-6 relative mt-4 lg:mt-0">
              <figure
                onClick={() =>
                  setLightbox({
                    src: '/images/VanPhong_ChiVanCungTapThe_AnhSangTuNhien.jpg',
                    fig: 'ĐỘI NGŨ QUẢN LÝ',
                    title: 'Khánh Vân cùng hơn 35 quản lý cấp cao và hệ thống hơn 500 nhân sự',
                    subtitle:
                      'Chị Khánh Vân (áo vest trắng, ngồi giữa) cùng đội ngũ quản lý và chuyên viên tại văn phòng Manulife Việt Nam.',
                  })
                }
                className="cursor-zoom-in group relative block"
              >
                <div className="overflow-hidden aspect-[3/2] bg-[#EAE7DF] rounded-[5px] shadow-[0_20px_48px_-18px_rgba(10,54,34,0.20)] ring-1 ring-inset ring-[#181F1C]/[0.08] relative">
                  <img loading="lazy" decoding="async"
                    src="/images/VanPhong_ChiVanCungTapThe_AnhSangTuNhien.jpg"
                    alt="Khánh Vân cùng đội ngũ quản lý Manulife Việt Nam"
                    className="w-full h-full object-cover group-hover:scale-[1.018] transition-transform duration-700 ease-editorial"
                  />

                  {/* Floating Trust Badge dập nổi ở góc trên */}
                  <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md text-[#0A3622] text-[8.5px] sm:text-[9px] font-medium tracking-[0.14em] uppercase shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-white/70">
                      <Award className="w-2.5 h-2.5 text-[#B8860B] stroke-[2]" />
                      <span>Asia Trusted Awards Winner</span>
                    </span>
                  </div>
                </div>

                <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 text-[11px] tracking-[0.12em] uppercase text-[#858E89]">
                  <span className="font-medium text-[#181F1C]">
                    Đội ngũ quản lý Manulife
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#008746] font-medium">
                    64 quản lý, 500+ nhân sự
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 BẢO CHỨNG BÁO CHÍ & TRUYỀN THÔNG (PRESS & MEDIA MENTIONS) */}
      <section id="bao-chi" className="border-t border-[#E4E1D8] bg-[#FAF9F5] py-14 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E4E1D8]">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#008746] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008746]" />
                Báo chí viết về chị Vân
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#0A3622] font-normal tracking-tight">
                Báo trong nước và quốc tế đã đưa tin
              </h2>
            </div>
            <p className="text-xs text-[#56605B] max-w-md font-normal leading-relaxed">
              Các bài viết về cách chị làm nghề, dẫn dắt đội ngũ và giải thưởng lãnh đạo khu vực Châu Á.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {pressMentions.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 sm:p-7 bg-white/70 hover:bg-white border border-[#E4E1D8] hover:border-[#008746]/60 rounded-[4px] shadow-[0_2px_12px_-4px_rgba(10,54,34,0.05)] hover:shadow-[0_12px_32px_-8px_rgba(10,54,34,0.12)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4 pb-3.5 border-b border-[#EFECE6] min-h-[46px]">
                    <div className="flex items-center">
                      <img loading="lazy" decoding="async"
                        src={item.logo}
                        alt={item.logoAlt}
                        className={`${item.logoClass} w-auto max-w-[155px] sm:max-w-[185px] object-contain object-left`}
                      />
                    </div>
                    <span className="shrink-0 text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#008746]/10 text-[#008746] border border-[#008746]/20 whitespace-nowrap">
                      {item.badge}
                    </span>
                  </div>

                  <div className="text-[11px] uppercase tracking-[0.12em] text-[#858E89] mb-2.5 font-medium">
                    {item.sourceType}
                  </div>

                  <h3 className="font-serif text-[16px] font-normal leading-snug text-[#181F1C] group-hover:text-[#008746] transition-colors line-clamp-3 mb-3">
                    &ldquo;{item.headline}&rdquo;
                  </h3>

                  <p className="text-xs text-[#56605B] font-normal leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-[#F2EFE9] flex items-center justify-between text-[11px] font-medium tracking-[0.14em] uppercase text-[#008746]">
                  <span className="group-hover:underline underline-offset-4">Đọc bài báo gốc</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ARCHITECTURAL HAIRLINE METRICS (NO CHUNKY BOXES) */}
      <section className="border-t border-b border-[#E4E1D8] bg-[#F2EFE9]/60 py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 sm:gap-y-12 gap-x-6 sm:gap-x-8">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className={`${
                  idx !== 0 ? 'lg:border-l lg:border-[#DCD8CE] lg:pl-7' : ''
                } space-y-2`}
              >
                <div
                  className={`font-serif ${
                    m.figure.length > 7 ? 'text-2xl sm:text-[32px]' : 'text-3xl sm:text-[44px]'
                  } font-normal text-[#0A3622] leading-none tracking-tight`}
                >
                  {m.figure}
                </div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#181F1C] font-medium pt-1">
                  {m.unit}
                </div>
                <p className="text-xs text-[#28322D] font-normal leading-relaxed">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CÂU CHUYỆN SỰ NGHIỆP — EDITORIAL ESSAY & GALLERY LAYOUT */}
      <section id="cau-chuyen" className="py-16 sm:py-24 lg:py-36 border-b border-[#E4E1D8]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          {/* Section Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 mb-14 sm:mb-24 lg:mb-32 items-end">
            <div className="lg:col-span-4">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] block mb-3">
                01 / CHẶNG ĐƯỜNG NGHỀ
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#181F1C] leading-[1.15]">
                Từ ngân hàng quốc tế đến giải thưởng Châu Á
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="font-serif italic text-xl sm:text-[26px] text-[#181F1C] leading-[1.5]">
                “Làm thật tốt từ những việc nhỏ nhất mỗi ngày. Mình chân thành và đúng chuẩn thì người tốt sẽ tự tìm đến.”
              </p>
            </div>
          </div>

          {/* Chapter I */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-28 lg:mb-36">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#858E89] block">
                CHƯƠNG I &bull; 2009 ĐẾN 2017
              </span>
              <h3 className="font-sans font-semibold text-2xl sm:text-[28px] text-[#181F1C] leading-[1.3] tracking-tight">
                8 năm ở ANZ Bank và bài học về chữ “Tín”
              </h3>
              <p className="text-[15px] text-[#28322D] leading-[1.85] font-normal">
                Trước khi đạt Top 1 toàn quốc của ANZ năm 2017 ở mảng tín dụng thế chấp mua nhà, Khánh Vân có 3 tháng đầu ở bộ phận kinh doanh mà không có nổi một khách hàng, và đứng trước nguy cơ bị cắt mã số.
              </p>
              <p className="text-[15px] text-[#28322D] leading-[1.85] font-normal">
                Chị không chọn cách bán hàng bằng mọi giá. Những năm làm Vận hành (Operations) trước đó, chị giữ uy tín và cẩn thận trong từng việc, nên đồng nghiệp và đối tác tự giới thiệu khách cho chị. Từ đó, chị lấy sự tử tế làm nguyên tắc cho cả sự nghiệp.
              </p>
            </div>

            <div className="lg:col-span-7">
              <figure
                onClick={() =>
                  setLightbox({
                    src: '/images/VanPhong_ChiVan_HuongDanDoiNguBanHop.jpg',
                    fig: 'TÁC PHONG LÀM VIỆC',
                    title: 'Tác phong chỉn chu tại bàn họp',
                    subtitle: 'Bài học từ 8 năm làm ngân hàng quốc tế: lấy uy tín và sự cẩn thận làm nền.',
                  })
                }
                className="cursor-zoom-in group"
              >
                <div className="overflow-hidden aspect-[16/10] bg-[#EAE7DF] rounded-[3px] shadow-sm">
                  <img loading="lazy" decoding="async"
                    src="/images/VanPhong_ChiVan_HuongDanDoiNguBanHop.jpg"
                    alt="Khánh Vân hướng dẫn đội ngũ bên bàn họp"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                  />
                </div>
                <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                  Tác phong chỉn chu và bài học về chữ “Tín” từ thời làm banker
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Chapter II & III Asymmetric Editorial Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Dual Top 1 2025 Showcase + Chapter II Text */}
            <div className="lg:col-span-6 space-y-10">
              {/* Cú Đúp Quán Quân Toàn Quốc: Top 1 FYP & Top 1 Duy Trì 2025 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Award 1: Top 1 FYP 2025 */}
                <figure
                  onClick={() =>
                    setLightbox({
                      src: '/images/SanKhau_ChiVan_ManHinhLED_Top1FYP2025.jpg',
                      fig: 'TOP 1 FYP 2025',
                      title: 'Top 1 DRD+ về tỷ lệ hoàn thành chỉ tiêu FYP (2025)',
                      subtitle: 'Dẫn đầu toàn quốc về mức hoàn thành chỉ tiêu doanh số khai thác mới tại Manulife Việt Nam.',
                    })
                  }
                  className="cursor-zoom-in group"
                >
                  <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[3px] shadow-sm">
                    <img loading="lazy" decoding="async"
                      src="/images/SanKhau_ChiVan_ManHinhLED_Top1FYP2025.jpg"
                      alt="Top 1 DRD+ Quản lý cấp cao dẫn đầu tỷ lệ hoàn thành chỉ tiêu FYP năm 2025"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                    />
                  </div>
                  <figcaption className="mt-3 pt-2.5 border-t border-[#E4E1D8] text-[10.5px] uppercase tracking-[0.1em] text-[#858E89]">
                    Top 1 DRD+ Hoàn thành chỉ tiêu FYP 2025
                  </figcaption>
                </figure>

                {/* Award 2: Top 1 Tỷ Lệ Duy Trì 2025 */}
                <figure
                  onClick={() =>
                    setLightbox({
                      src: '/images/SanKhau_ChiVan_NhanGiaiTop1DuyTriHopDong2025.jpg',
                      fig: 'NIỀM TIN KHÁCH HÀNG',
                      title: 'Top 1 DRD+ về tỷ lệ duy trì hợp đồng năm thứ 2 (2025)',
                      subtitle: 'Kết quả của chất lượng tư vấn và niềm tin lâu dài từ khách hàng.',
                    })
                  }
                  className="cursor-zoom-in group"
                >
                  <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[3px] shadow-sm">
                    <img loading="lazy" decoding="async"
                      src="/images/SanKhau_ChiVan_NhanGiaiTop1DuyTriHopDong2025.jpg"
                      alt="Top 1 DRD+ Quản lý cấp cao dẫn đầu tỷ lệ duy trì hợp đồng năm 2 2025"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                    />
                  </div>
                  <figcaption className="mt-3 pt-2.5 border-t border-[#E4E1D8] text-[10.5px] uppercase tracking-[0.1em] text-[#858E89]">
                    Top 1 DRD+ Tỷ lệ Duy trì Hợp đồng Năm 2
                  </figcaption>
                </figure>
              </div>

              <div className="space-y-5 pt-2">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#858E89] block">
                  CHƯƠNG II &bull; 2018 ĐẾN 2025
                </span>
                <h3 className="font-sans font-semibold text-2xl sm:text-[28px] text-[#181F1C] leading-[1.3] tracking-tight">
                  Năm 2025: dẫn đầu cả chỉ tiêu FYP lẫn tỷ lệ duy trì
                </h3>
                <p className="text-[15px] text-[#28322D] leading-[1.85] font-normal">
                  Năm 2018, chị rời ngân hàng nước ngoài sang Manulife Việt Nam để xây sự nghiệp riêng. Chị mang theo thói quen kiểm soát rủi ro của một banker: tư vấn đúng và đủ, và coi việc khách gắn bó lâu dài là danh dự nghề.
                </p>
                <p className="text-[15px] text-[#28322D] leading-[1.85] font-normal">
                  Năm 2025, chị cùng hệ thống giữ hai vị trí dẫn đầu toàn quốc: <strong className="font-semibold text-[#0A3622]">Top 1 DRD+ hoàn thành chỉ tiêu doanh số mới (FYP)</strong> và <strong className="font-semibold text-[#0A3622]">Top 1 DRD+ tỷ lệ duy trì hợp đồng năm 2</strong>. Với Vân, kết quả này cho thấy muốn tăng trưởng bền thì phải làm đúng chuẩn và giữ chữ Tín.
                </p>
              </div>
            </div>

            {/* Right Column: Chapter III Text + Vertical Trophy Portrait */}
            <div className="lg:col-span-5 lg:col-start-8 space-y-12">
              <div className="space-y-5">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#008746] block">
                  CHƯƠNG III &bull; 2018 ĐẾN NAY
                </span>
                <h3 className="font-sans font-semibold text-2xl sm:text-[28px] text-[#181F1C] leading-[1.3] tracking-tight">
                  Nhà Quản lý Xuất sắc nhất Châu Á và hơn 500 nhân sự
                </h3>
                <p className="text-[15px] text-[#28322D] leading-[1.85] font-normal">
                  Năm 2021, chị là đại diện duy nhất tại Việt Nam đoạt giải thưởng “Nhà Quản lý Xuất sắc nhất Châu Á” (Asia Trusted Life Agent &amp; Advisers Awards), đồng thời trực tiếp xây dựng đội ngũ 64 Quản lý cấp cao và hơn 500 cộng sự.
                </p>
              </div>

              <figure
                onClick={() =>
                  setLightbox({
                    src: '/images/SuKien_ChiVanCungCEOvaCAO_ChupAnhTiecToi.jpg',
                    fig: 'GẶP GỠ BAN ĐIỀU HÀNH',
                    title: 'Chị Vân chụp cùng Tổng Giám đốc (CEO) và Phó Tổng Giám đốc Điều hành Kênh Đại lý (CAO) Manulife',
                    subtitle: 'Chị Vân chụp cùng lãnh đạo cấp cao của Manulife Việt Nam trong buổi tiệc tối.',
                  })
                }
                className="cursor-zoom-in group"
              >
                <div className="overflow-hidden aspect-[3/4] bg-[#EAE7DF] rounded-[3px] shadow-sm">
                  <img loading="lazy" decoding="async"
                    src="/images/SuKien_ChiVanCungCEOvaCAO_ChupAnhTiecToi.jpg"
                    alt="Chị Khánh Vân cùng Tổng Giám đốc và Phó Tổng Giám đốc Điều hành Kênh Đại lý Manulife Việt Nam trong buổi tiệc tối"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                  />
                </div>
                <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                  Chị Vân chụp cùng Tổng Giám đốc (CEO) và Phó Tổng Giám đốc Điều hành Kênh Đại lý (CAO) Manulife
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 4B. THƯ VIỆN VIDEO & HỎI ĐÁP THỰC CHIẾN (109 CATEGORIZED VIDEOS & SEARCH HUB) */}
      <VideoLibrarySection
        activeVideo={activeVideo}
        onOpenVideo={(video) => openVideo(video)}
        onCloseVideo={() => closeVideo()}
        onAskQuestion={(video) => handleAskVideoQuestion(video)}
      />

      {/* 5. GÓC NHÌN & BÀI VIẾT — ARCHITECTURAL EDITORIAL JOURNAL */}
      <section id="goc-nhin" className="py-16 sm:py-24 lg:py-36 bg-[#F2EFE9]/50 border-b border-[#E4E1D8]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-5 sm:gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] block mb-3">
                03 / GÓC NHÌN &amp; BÀI VIẾT
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#181F1C]">
                Bài viết về tài chính, quản lý đội ngũ và cuộc sống
              </h2>
            </div>

            {/* Minimalist Filter Tabs — Swipeable Rail on Mobile, Crisp Row on Desktop */}
            <div className="w-full lg:w-auto -mx-6 px-6 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar border-b border-[#DCD8CE] pb-2 shrink-0">
              <div className="flex items-center gap-5 sm:gap-6 min-w-max">
                {categories.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`whitespace-nowrap text-[11px] sm:text-xs uppercase tracking-[0.16em] py-2 sm:py-1 pb-2 -mb-[9px] transition-colors min-h-[44px] flex items-center ${
                        active
                          ? 'text-[#0A3622] border-b-2 border-[#0A3622] font-semibold'
                          : 'text-[#858E89] hover:text-[#181F1C] font-light'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Featured Spotlight Grid (Top 3 New Articles with Curated Photography) */}
          {featuredArticles.length > 0 && (
            <div className="mb-16 sm:mb-20">
              <div className="flex items-center justify-between mb-6 sm:mb-8 pb-3 border-b border-[#DCD8CE]">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#008746] font-medium">
                  BÀI VIẾT NỔI BẬT
                </span>
                <span className="text-xs text-[#858E89] font-light">
                  <span className="md:hidden">Vuốt để xem thêm</span>
                  <span className="hidden md:inline">{featuredArticles.length} bài viết</span>
                </span>
              </div>

              <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-6 sm:scroll-px-10 md:scroll-px-0 no-scrollbar -mx-6 px-6 sm:-mx-10 sm:px-10 md:mx-0 md:px-0 pb-2 md:pb-0">
                {featuredArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => openArticle(article)}
                    className="w-[82%] sm:w-[60%] shrink-0 snap-start md:w-auto group cursor-pointer flex flex-col justify-between bg-[#FAF9F5] p-5 sm:p-7 border border-[#DCD8CE] hover:border-[#0A3622]/40 active:scale-[0.99] hover:shadow-[0_12px_32px_-15px_rgba(10,54,34,0.12)] transition-all duration-300 rounded-[4px]"
                  >
                    <div>
                      {/* Photo Thumbnail */}
                      {article.image && (
                        <div className="overflow-hidden aspect-[16/10] bg-[#EAE7DF] rounded-[3px] ring-1 ring-inset ring-[#181F1C]/[0.06] mb-5">
                          <img loading="lazy" decoding="async"
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-editorial"
                          />
                        </div>
                      )}

                      {/* Category & Read Time */}
                      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] mb-3">
                        <span className="text-[#008746] font-medium">{article.category}</span>
                        <span className="text-[#858E89]">{article.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-sans font-semibold text-lg sm:text-xl text-[#181F1C] group-hover:text-[#0A3622] leading-[1.35] transition-colors mb-3.5 tracking-tight">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-[#28322D] font-normal leading-[1.75] line-clamp-3 mb-6">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Footer Row */}
                    <div className="pt-4 border-t border-[#EAE7DF] flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[#181F1C] group-hover:text-[#008746] transition-colors min-h-[44px]">
                      <span className="font-serif text-sm text-[#858E89]">{article.index}</span>
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        Đọc toàn văn
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Archive Index Rows — Compact title list, 4 by default with "Xem thêm" */}
          {archiveArticles.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2 pb-3 border-b border-[#DCD8CE]">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#858E89] font-medium">
                  CÁC BÀI VIẾT KHÁC
                </span>
                <span className="text-xs text-[#858E89] font-light">
                  {archiveArticles.length} bài viết
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
                {(showAllArticles ? archiveArticles : archiveArticles.slice(0, 4)).map((article) => (
                  <article
                    key={article.id}
                    onClick={() => openArticle(article)}
                    className="group py-4 sm:py-5 border-b border-[#DCD8CE] flex items-start gap-4 cursor-pointer hover:bg-[#FAF9F5]/80 active:bg-[#F2EFE9] transition-colors px-1 sm:px-2"
                  >
                    <span className="font-serif text-lg text-[#858E89] group-hover:text-[#008746] transition-colors leading-[1.4] w-7 shrink-0">
                      {article.index}
                    </span>
                    <div className="min-w-0 flex-1 space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#008746] block">
                        {article.category}
                      </span>
                      <h3 className="font-sans font-semibold text-[15px] sm:text-base text-[#181F1C] group-hover:text-[#0A3622] leading-[1.45] transition-colors tracking-tight">
                        {article.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-4 h-4 mt-1 shrink-0 text-[#858E89] group-hover:text-[#008746] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </article>
                ))}
              </div>

              {archiveArticles.length > 4 && (
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => setShowAllArticles(!showAllArticles)}
                    className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] border border-[#DCD8CE] hover:border-[#0A3622] text-[#181F1C] hover:text-[#0A3622] text-[11px] uppercase tracking-[0.2em] font-medium rounded-[2px] transition-colors bg-white/60"
                  >
                    <span>
                      {showAllArticles ? 'Thu gọn' : `Xem thêm ${archiveArticles.length - 4} bài viết`}
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${showAllArticles ? '-rotate-90' : 'rotate-90'}`}
                    />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 6. TỦ SÁCH QUẢN TRỊ & GÓC NHÌN ĐỒNG HÀNH — COMPACT EDITORIAL BOOKSHELF */}
      <section id="tu-sach" className="py-16 lg:py-22 border-b border-[#E4E1D8] bg-[#FAF9F5]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          {/* Compact Split Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#E4E1D8]">
            <div>
              <span className="text-[10.5px] uppercase tracking-[0.24em] text-[#008746] font-medium block mb-2">
                04 / TỦ SÁCH
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#181F1C] leading-[1.15]">
                Những cuốn sách chị Vân đọc đi đọc lại
              </h2>
            </div>
            <p className="text-xs sm:text-[13.5px] text-[#56605B] font-normal leading-[1.7] max-w-md">
              4 cuốn sách ảnh hưởng đến cách Khánh Vân quản lý rủi ro, giữ thói quen kỷ luật và dẫn dắt đội ngũ.
            </p>
          </div>

          {/* Compact 2x2 Horizontal Book Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {BOOKS.map((book) => (
              <div
                key={book.num}
                className="bg-white/80 hover:bg-white p-4 sm:p-5 border border-[#DCD8CE] rounded-[4px] flex gap-4 sm:gap-5 items-start hover:border-[#0A3622]/40 transition-all duration-300 hover:shadow-[0_10px_28px_-14px_rgba(10,54,34,0.12)] group"
              >
                {/* Left: 3D-Styled Book Cover Thumbnail */}
                <button
                  type="button"
                  onClick={() =>
                    setLightbox({
                      src: book.cover,
                      fig: `SÁCH ${book.num} • ${book.theme.toUpperCase()}`,
                      title: `${book.title} (${book.author})`,
                      subtitle: `Góc nhìn Khánh Vân: “${book.reflection}”`,
                    })
                  }
                  className="relative w-[78px] sm:w-[92px] aspect-[2/3] shrink-0 rounded-[3px] overflow-hidden bg-[#EAE7DF] shadow-[0_8px_18px_-4px_rgba(18,24,20,0.22)] ring-1 ring-black/10 cursor-zoom-in group/cover"
                  aria-label={`Xem bìa sách ${book.title}`}
                >
                  <img decoding="async"
                    src={book.cover}
                    alt={book.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover/cover:scale-[1.03] transition-transform duration-500"
                  />
                  {/* Subtle Book Spine Crease Effect */}
                  <span className="pointer-events-none absolute inset-y-0 left-0 w-[6px] bg-gradient-to-r from-black/25 via-white/25 to-transparent" />
                </button>

                {/* Right: Compact Book Details & Personal Reflection */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2">
                      <span className="font-serif text-sm text-[#858E89] group-hover:text-[#008746] transition-colors">
                        {book.num}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#008746] font-medium px-2 py-0.5 bg-[#008746]/[0.07] rounded-[2px]">
                        {book.theme}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#6A756F] italic">
                      {book.author}
                    </span>
                  </div>

                  <h3 className="font-sans font-semibold text-[15px] sm:text-[17px] text-[#181F1C] leading-[1.3] group-hover:text-[#0A3622] transition-colors tracking-tight mt-1.5">
                    {book.title}
                  </h3>

                  <p className="text-xs text-[#4A5550] font-normal leading-[1.6] mt-1 line-clamp-2">
                    {book.note}
                  </p>

                  {/* Compact Inline Personal Reflection */}
                  <div className="mt-2.5 pt-2 border-t border-[#EAE7DF] border-l-2 border-l-[#008746] pl-2.5 bg-[#F2EFE9]/55 py-1.5 pr-2.5 rounded-r-[3px]">
                    <p className="font-serif italic text-[13px] sm:text-[13.5px] text-[#181F1C] leading-[1.5]">
                      “{book.reflection}”
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ĐIỂM TỰA GIA ĐÌNH & PHONG CÁCH SỐNG (UNBOXED EDITORIAL GALLERY) */}
      <section id="cuoc-song" className="py-16 sm:py-24 lg:py-36 border-b border-[#E4E1D8]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 mb-12 sm:mb-20 items-end">
            <div className="lg:col-span-5">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] block mb-3">
                05 / CUỘC SỐNG
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#181F1C] leading-[1.15]">
                Chị Vân ngoài giờ làm việc
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 space-y-4">
              <div className="border-l-2 border-l-[#008746] pl-5 sm:pl-6 space-y-3">
                <p className="font-serif italic text-xl sm:text-2xl text-[#181F1C] leading-[1.5]">
                  “Điều quý nhất với Vân không phải những chiếc cúp, mà là được về nhà bên chồng và hai con.”
                </p>
                <p className="text-sm sm:text-[15px] text-[#28322D] font-normal leading-[1.85]">
                  Phía sau những mốc dẫn đầu Châu Á là người chồng luôn thấu hiểu, âm thầm ủng hộ chị bước ra khỏi vùng an toàn để theo đuổi nghề mình thích.
                </p>
              </div>

              {/* Quan điểm nuôi dạy con */}
              <div className="pl-5 sm:pl-6 pt-2 space-y-3">
                <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#008746] font-medium block">
                  Cách Vân nuôi dạy con
                </span>
                <p className="text-sm sm:text-[15px] text-[#28322D] font-normal leading-[1.85]">
                  Với hai con (Minh Châu đang học lớp 7 và bé út học lớp 1), Vân chọn đi cùng con thay vì áp đặt. Các con vẫn được kèm cặp, rèn nề nếp, nhưng được tự do theo đam mê và sở thích của mình. Việc của cha mẹ là cùng con tìm ra thế mạnh riêng, rồi hỗ trợ để con đi hết con đường đó.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Kèm cặp có nề nếp', 'Theo đam mê & sở thích', 'Phát huy thế mạnh riêng'].map((k) => (
                    <span
                      key={k}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-[#008746]/25 bg-[#008746]/[0.06] text-[#0A3622]"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Family Diptych — Unboxed, Equal Height (7 + 5 Asymmetric Spread) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10">
            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/GiaDinh_ChiVan_NgoiSofaPhongKhach.jpg',
                  fig: 'TỔ ẤM',
                  title: 'Tổ ấm bên chồng và hai con',
                  subtitle: 'Chỗ dựa tinh thần lớn nhất phía sau sự nghiệp của chị.',
                })
              }
              className="lg:col-span-7 cursor-zoom-in group"
            >
              <div className="overflow-hidden h-[260px] sm:h-[420px] lg:h-[460px] bg-[#EAE7DF] rounded-[4px]">
                <img loading="lazy" decoding="async"
                  src="/images/GiaDinh_ChiVan_NgoiSofaPhongKhach.jpg"
                  alt="Gia đình chị Khánh Vân tại phòng khách"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3 pt-2.5 sm:mt-3.5 sm:pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                Tổ ấm bên chồng và hai con
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/GiaDinh_ChiVan_AuYemConBenSanVuon.jpg',
                  fig: 'LÀM MẸ',
                  title: 'Thời gian bên con',
                  subtitle: 'Kèm cặp có nề nếp, nhưng luôn để con được lớn lên theo đam mê và thế mạnh của riêng mình.',
                })
              }
              className="lg:col-span-5 cursor-zoom-in group"
            >
              <div className="overflow-hidden aspect-[4/5] sm:aspect-auto sm:h-[420px] lg:h-[460px] bg-[#EAE7DF] rounded-[4px]">
                <img loading="lazy" decoding="async"
                  src="/images/GiaDinh_ChiVan_AuYemConBenSanVuon.jpg"
                  alt="Gia đình chị Khánh Vân bên sân vườn"
                  className="w-full h-full object-cover object-[50%_26%] group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3 pt-2.5 sm:mt-3.5 sm:pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                Một ngày bình thường bên con
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      </div>

      {/* 7B. FULL-BLEED STICKY CAPPADOCIA SUNRISE STAGE — CURTAIN-REVEAL ON SCROLL */}
      <div className="sticky top-[65px] z-10 w-full bg-[#181F1C] overflow-hidden">
        <figure
          onClick={() =>
            setLightbox({
              src: '/images/DuLich_ChiVan_BayKhinhKhiCauBinhMinh_Panorama.jpg?v=2',
              fig: 'BÌNH MINH CAPPADOCIA',
              title: 'Đón bình minh trên khinh khí cầu',
              subtitle:
                'Đón bình minh trên khinh khí cầu tại thung lũng Cappadocia: “Mỗi ngày mới đều đáng trân trọng. Cứ đi chắc từng bước, bình minh sẽ luôn ở phía trước.”',
            })
          }
          className="cursor-zoom-in group relative block w-full"
        >
          <div className="w-full aspect-[4/3] sm:aspect-[820/312] overflow-hidden relative">
            <picture>
              <source
                media="(min-width: 640px)"
                srcSet="/images/DuLich_ChiVan_BayKhinhKhiCauBinhMinh_Panorama.jpg?v=2"
              />
              <img loading="lazy" decoding="async"
                src="/images/DuLich_ChiVan_BayKhinhKhiCauBinhMinh_Mobile.jpg?v=2"
                alt="Chị Khánh Vân đón bình minh trên khinh khí cầu tại Cappadocia"
                className="w-full h-full block object-cover object-center group-hover:scale-[1.01] transition-transform duration-1000 ease-editorial"
              />
            </picture>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-16 bg-gradient-to-t from-black/25 to-transparent" />
          </div>
        </figure>
      </div>

      {/* CONTENT CURTAIN SHEET 2 — SLIDES UP OVER THE STICKY SUNRISE STAGE ON SCROLL */}
      <div className="relative z-20 bg-[#FAF9F5] shadow-[0_-28px_64px_-12px_rgba(18,24,20,0.28)] border-t border-[#E4E1D8]">
      <section className="py-14 sm:py-20 lg:py-28 border-b border-[#E4E1D8]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          {/* Lifestyle & Companionship Diptych (5 + 7 Counter-Balanced Spread) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10">
            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/DoiThuong_ChiVan_SelfiePhongTapGym.jpg',
                  fig: 'KỶ LUẬT',
                  title: 'Rèn luyện thể lực mỗi tuần',
                  subtitle: 'Duy trì nguồn năng lượng dẻo dai nhờ luyện tập đều đặn.',
                })
              }
              className="lg:col-span-5 cursor-zoom-in group"
            >
              <div className="overflow-hidden h-[290px] sm:h-[440px] lg:h-[500px] bg-[#EAE7DF] rounded-[4px]">
                <img loading="lazy" decoding="async"
                  src="/images/DoiThuong_ChiVan_SelfiePhongTapGym.jpg"
                  alt="Chị Khánh Vân rèn luyện thể thao"
                  className="w-full h-full object-cover object-[50%_75%] group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3 pt-2.5 sm:mt-3.5 sm:pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                Kỷ luật bản thân và rèn luyện thể chất
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/DuLich_ChiVanCungChong_ChupAnhBenCangBien.jpg',
                  fig: 'ĐỒNG HÀNH',
                  title: 'Cùng người bạn đời trên đường đi',
                  subtitle: 'Những chuyến đi trong và ngoài nước của hai vợ chồng.',
                })
              }
              className="lg:col-span-7 cursor-zoom-in group"
            >
              <div className="overflow-hidden h-[290px] sm:h-[440px] lg:h-[500px] bg-[#EAE7DF] rounded-[4px]">
                <img loading="lazy" decoding="async"
                  src="/images/DuLich_ChiVanCungChong_ChupAnhBenCangBien.jpg"
                  alt="Chị Khánh Vân cùng chồng du lịch quốc tế"
                  className="w-full h-full object-cover object-[50%_68%] group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3 pt-2.5 sm:mt-3.5 sm:pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                Cùng người bạn đời đi nhiều nơi
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 8. ĐỒNG HÀNH & PHÁT TRIỂN ĐỘI NGŨ (WORK WITH ME + MENTORSHIP GALLERY + CONCIERGE FORM) */}
      <section id="dong-hanh" className="py-16 sm:py-24 lg:py-36">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mb-10 sm:mb-20 space-y-3.5 sm:space-y-4">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] font-medium block">
              06 / HỢP TÁC &amp; ĐỒNG HÀNH
            </span>
            <h2 className="font-serif text-3xl sm:text-[46px] font-normal text-[#181F1C] leading-[1.15]">
              Ba cách cùng làm việc với Khánh Vân
            </h2>
            <p className="text-[15px] sm:text-base text-[#28322D] font-normal leading-[1.85] pt-1">
              Bạn có thể là chủ gia đình muốn chuyển giao tài sản cho yên tâm, chuyên viên tài chính muốn đi xa hơn trong nghề, hoặc đơn vị đang tìm diễn giả. Khánh Vân làm việc với cả ba.
            </p>
          </div>

          {/* 3 Architectural Enhanced Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10 mb-14 sm:mb-20 lg:mb-28">
            {/* Pillar I: Private Wealth Advisory */}
            <div className="bg-[#FAF9F5] p-6 sm:p-9 border border-[#DCD8CE] rounded-[4px] flex flex-col justify-between hover:border-[#0A3622]/40 transition-all duration-300 hover:shadow-[0_12px_32px_-15px_rgba(10,54,34,0.1)] group">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE7DF]">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#008746] font-medium">
                    HƯỚNG I &bull; HOẠCH ĐỊNH GIA SẢN
                  </span>
                  <span className="font-serif text-lg text-[#858E89]">01</span>
                </div>

                <div>
                  <h3 className="font-sans font-semibold text-xl sm:text-[22px] text-[#181F1C] leading-[1.35] group-hover:text-[#0A3622] transition-colors tracking-tight">
                    Hoạch định dòng tiền và chuyển giao gia sản
                  </h3>
                  <span className="inline-block text-[11px] uppercase tracking-[0.16em] text-[#6A756F] mt-2 font-medium">
                    Phù hợp: Chủ doanh nghiệp &bull; Gia đình có tài sản lớn &bull; Lãnh đạo cấp cao
                  </span>
                </div>

                <p className="text-sm text-[#28322D] font-normal leading-[1.75]">
                  Thiết kế lộ trình tích lũy tài sản dài hạn đến 99 tuổi, có khung pháp lý rõ ràng để gia sản được trao lại êm giữa các thế hệ và không gây tranh chấp trong nhà.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-[#EAE7DF] text-xs text-[#28322D] font-normal">
                  <div className="flex items-start gap-2">
                    <span className="text-[#008746] font-bold">&bull;</span>
                    <span>Chủ động sắp xếp quyền thừa kế hợp pháp thông qua hợp đồng tích lũy dài hạn.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#008746] font-bold">&bull;</span>
                    <span>Tối ưu cấu trúc phí, giữ dòng tiền ổn định và tận dụng lãi kép.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#008746] font-bold">&bull;</span>
                    <span>Quỹ bảo vệ trụ cột gia đình và lộ trình học vấn quốc tế cho con.</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href="#lien-he"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      topic: 'Cố vấn Hoạch định Tài chính & Gia sản Gia đình',
                    })
                  }
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-[11px] uppercase tracking-[0.2em] font-medium transition-colors rounded-[2px]"
                >
                  <span>Đặt lịch cố vấn riêng</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Pillar II: Executive Mentorship F1 */}
            <div className="bg-[#FAF9F5] p-6 sm:p-9 border border-[#0A3622]/30 rounded-[4px] flex flex-col justify-between shadow-[0_12px_32px_-15px_rgba(10,54,34,0.12)] relative group">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE7DF]">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#008746] font-medium">
                    HƯỚNG II &bull; ĐỒNG HÀNH QUẢN LÝ
                  </span>
                  <span className="font-serif text-lg text-[#008746] font-medium">02</span>
                </div>

                <div>
                  <h3 className="font-sans font-semibold text-xl sm:text-[22px] text-[#181F1C] leading-[1.35] group-hover:text-[#0A3622] transition-colors tracking-tight">
                    Đồng hành phát triển quản lý kế cận (F1)
                  </h3>
                  <span className="inline-block text-[11px] uppercase tracking-[0.16em] text-[#008746] mt-2 font-medium">
                    Phù hợp: Cựu Banker &bull; Quản lý tài chính &bull; Quản lý kinh doanh
                  </span>
                </div>

                <p className="text-sm text-[#28322D] font-normal leading-[1.75]">
                  Chương trình kèm cặp 1-1 trực tiếp với Khánh Vân: quy trình vận hành và cách xây một hệ thống kinh doanh độc lập theo chuẩn Top 1 Châu Á.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-[#EAE7DF] text-xs text-[#28322D] font-normal">
                  <div className="flex items-start gap-2">
                    <span className="text-[#008746] font-bold">&bull;</span>
                    <span>Lộ trình 90 ngày chuyển từ bàn giấy ngân hàng sang thị trường một cách an toàn.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#008746] font-bold">&bull;</span>
                    <span>Cách tuyển dụng, đào tạo và giữ chân đội ngũ.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#008746] font-bold">&bull;</span>
                    <span>Xây dựng thương hiệu cá nhân uy tín, lấy chữ “Tín” làm nền.</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href="#lien-he"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      topic: 'Đồng hành Phát triển Quản lý Kế cận (Mentorship F1)',
                    })
                  }
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#008746] hover:bg-[#0A3622] text-[#FAF9F5] text-[11px] uppercase tracking-[0.2em] font-medium transition-colors rounded-[2px]"
                >
                  <span>Đăng ký đồng hành F1</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Pillar III: Corporate Sharing & Keynote */}
            <div className="bg-[#FAF9F5] p-6 sm:p-9 border border-[#DCD8CE] rounded-[4px] flex flex-col justify-between hover:border-[#0A3622]/40 transition-all duration-300 hover:shadow-[0_12px_32px_-15px_rgba(10,54,34,0.1)] group">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE7DF]">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#008746] font-medium">
                    HƯỚNG III &bull; CHIA SẺ &amp; ĐÀO TẠO
                  </span>
                  <span className="font-serif text-lg text-[#858E89]">03</span>
                </div>

                <div>
                  <h3 className="font-sans font-semibold text-xl sm:text-[22px] text-[#181F1C] leading-[1.35] group-hover:text-[#0A3622] transition-colors tracking-tight">
                    Diễn giả sự kiện và đào tạo doanh nghiệp
                  </h3>
                  <span className="inline-block text-[11px] uppercase tracking-[0.16em] text-[#6A756F] mt-2 font-medium">
                    Phù hợp: Doanh nghiệp &bull; Ngân hàng &bull; Diễn đàn phụ nữ lãnh đạo
                  </span>
                </div>

                <p className="text-sm text-[#28322D] font-normal leading-[1.75]">
                  Chia sẻ thực tế tại hội nghị, hội thảo lãnh đạo và các buổi đào tạo nội bộ về bán hàng, văn hóa dịch vụ và cách lãnh đạo đội nhóm.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-[#EAE7DF] text-xs text-[#28322D] font-normal">
                  <div className="flex items-start gap-2">
                    <span className="text-[#008746] font-bold">&bull;</span>
                    <span>Diễn giả chính tại các sự kiện tài chính, ngân hàng và tuyển dụng.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#008746] font-bold">&bull;</span>
                    <span>Workshop về vượt giới hạn và giữ kỷ luật bền bỉ.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#008746] font-bold">&bull;</span>
                    <span>Góc nhìn về sự cân bằng của người phụ nữ giữa gia đình và sự nghiệp.</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href="#lien-he"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      topic: 'Mời Đào tạo / Chia sẻ Sự kiện Doanh nghiệp',
                    })
                  }
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#181F1C] hover:bg-[#0A3622] text-[#FAF9F5] text-[11px] uppercase tracking-[0.2em] font-medium transition-colors rounded-[2px]"
                >
                  <span>Liên hệ lịch đào tạo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* 6 Curated Mentorship, Culture & Leadership Photos in 2-col Mobile / 3-col Desktop Architectural Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6 md:gap-10 mb-14 sm:mb-20 lg:mb-28">
            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/PhongDaoTao_ChiVan_ChiaSeTruyenLua.jpg',
                  fig: 'ĐÀO TẠO',
                  title: 'Trực tiếp đứng lớp, truyền lửa cho đội ngũ',
                  subtitle: 'Chia sẻ kiến thức chuyên môn và kỹ năng quản trị tại văn phòng Manulife.',
                })
              }
              className="cursor-zoom-in group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[5px] sm:rounded-[6px] ring-1 ring-inset ring-[#181F1C]/[0.06] shadow-[0_10px_30px_-15px_rgba(10,54,34,0.08)]">
                <img loading="lazy" decoding="async"
                  src="/images/PhongDaoTao_ChiVan_ChiaSeTruyenLua.jpg"
                  alt="Chị Khánh Vân đứng lớp đào tạo"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-2 sm:mt-3.5 pt-2 sm:pt-3 border-t border-[#E4E1D8] text-[9.5px] sm:text-[11px] leading-[1.35] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-[#858E89]">
                Trực tiếp đứng lớp đào tạo
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/SuKien_ChiVanCungDoiNgu_ChucMungThangCapSM.jpg',
                  fig: 'THĂNG CẤP',
                  title: 'Chúc mừng các quản lý mới thăng cấp',
                  subtitle: 'Chị Vân chúc mừng các cộng sự lên vị trí Quản lý (SM).',
                })
              }
              className="cursor-zoom-in group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[5px] sm:rounded-[6px] ring-1 ring-inset ring-[#181F1C]/[0.06] shadow-[0_10px_30px_-15px_rgba(10,54,34,0.08)]">
                <img loading="lazy" decoding="async"
                  src="/images/SuKien_ChiVanCungDoiNgu_ChucMungThangCapSM.jpg"
                  alt="Chúc mừng các Quản lý SM thăng cấp"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-2 sm:mt-3.5 pt-2 sm:pt-3 border-t border-[#E4E1D8] text-[9.5px] sm:text-[11px] leading-[1.35] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-[#858E89]">
                Chúc mừng các Quản lý cấp cao thăng cấp
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/VanPhong_ChiVanCungNhomQuanLy_SofaBenCuaSoViewDep.jpg',
                  fig: 'ĐỒNG HÀNH F1',
                  title: 'Cùng các quản lý F1 trao đổi định hướng',
                  subtitle: 'Chị Khánh Vân cùng các quản lý nòng cốt trò chuyện bên cửa sổ nhìn ra thành phố.',
                })
              }
              className="cursor-zoom-in group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[5px] sm:rounded-[6px] ring-1 ring-inset ring-[#181F1C]/[0.06] shadow-[0_10px_30px_-15px_rgba(10,54,34,0.08)]">
                <img loading="lazy" decoding="async"
                  src="/images/VanPhong_ChiVanCungNhomQuanLy_SofaBenCuaSoViewDep.jpg"
                  alt="Không gian cố vấn chiến lược F1 của chị Khánh Vân"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-2 sm:mt-3.5 pt-2 sm:pt-3 border-t border-[#E4E1D8] text-[9.5px] sm:text-[11px] leading-[1.35] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-[#858E89]">
                Trao đổi định hướng cùng các quản lý F1
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/VanPhong_NhomQuanLyTre_LamViecTrenIpad.jpg',
                  fig: 'CÔNG CỤ SỐ',
                  title: 'Hướng dẫn quy trình thực tế trên nền tảng số',
                  subtitle: 'Đào tạo và kèm cặp 1-1 các quản lý trẻ khai thác công cụ kỹ thuật số trong tư vấn gia sản.',
                })
              }
              className="cursor-zoom-in group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[5px] sm:rounded-[6px] ring-1 ring-inset ring-[#181F1C]/[0.06] shadow-[0_10px_30px_-15px_rgba(10,54,34,0.08)]">
                <img loading="lazy" decoding="async"
                  src="/images/VanPhong_NhomQuanLyTre_LamViecTrenIpad.jpg"
                  alt="Chuyển giao quy trình thực chiến trên iPad"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-2 sm:mt-3.5 pt-2 sm:pt-3 border-t border-[#E4E1D8] text-[9.5px] sm:text-[11px] leading-[1.35] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-[#858E89]">
                Hướng dẫn quy trình trên nền tảng số
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/GanKet_DoiNguCoVu_ChucMungChiVan.jpg',
                  fig: 'GẮN KẾT',
                  title: 'Cả đội đón và chúc mừng chị Vân',
                  subtitle: 'Hơn 30 cộng sự nồng nhiệt chào đón và chúc mừng chị Vân.',
                })
              }
              className="cursor-zoom-in group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[5px] sm:rounded-[6px] ring-1 ring-inset ring-[#181F1C]/[0.06] shadow-[0_10px_30px_-15px_rgba(10,54,34,0.08)]">
                <img loading="lazy" decoding="async"
                  src="/images/GanKet_DoiNguCoVu_ChucMungChiVan.jpg"
                  alt="Văn hóa gắn kết và sự đồng lòng của đội ngũ"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-2 sm:mt-3.5 pt-2 sm:pt-3 border-t border-[#E4E1D8] text-[9.5px] sm:text-[11px] leading-[1.35] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-[#858E89]">
                Đội ngũ chúc mừng chị Vân
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/SanKhau_ChiVan_NangCupManPowerQuyenLuc.jpg',
                  fig: 'VINH DANH',
                  title: 'Chị Vân nâng cúp ManPower',
                  subtitle: 'Chị Vân nâng cúp vàng ManPower trong bộ đầm dạ hội xanh lục bảo.',
                })
              }
              className="cursor-zoom-in group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[5px] sm:rounded-[6px] ring-1 ring-inset ring-[#181F1C]/[0.06] shadow-[0_10px_30px_-15px_rgba(10,54,34,0.08)]">
                <img loading="lazy" decoding="async"
                  src="/images/SanKhau_ChiVan_NangCupManPowerQuyenLuc.jpg"
                  alt="Khoảnh khắc nâng cúp vinh danh"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-2 sm:mt-3.5 pt-2 sm:pt-3 border-t border-[#E4E1D8] text-[9.5px] sm:text-[11px] leading-[1.35] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-[#858E89]">
                Nâng cúp vinh danh
              </figcaption>
            </figure>
          </div>

          {/* Minimalist Concierge Contact Section (Underline Inputs, No Heavy Boxes) */}
          <div
            id="lien-he"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 pt-12 sm:pt-16 border-t border-[#DCD8CE] items-start"
          >
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] block">
                LIÊN HỆ RIÊNG
              </span>
              <h3 className="font-sans font-semibold text-2xl sm:text-3xl text-[#181F1C] leading-[1.25] tracking-tight">
                Gửi lời nhắn đến Khánh Vân
              </h3>
              <p className="text-sm text-[#28322D] font-normal leading-[1.8]">
                Thông tin bạn chia sẻ về kế hoạch tài chính gia đình hoặc định hướng nghề nghiệp đều được bảo mật.
              </p>

              {/* Direct Executive Channels (Zalo & Facebook) */}
              <div className="pt-4 border-t border-[#DCD8CE] space-y-4">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#858E89] block">
                  KẾT NỐI TRỰC TIẾP
                </span>

                <div className="divide-y divide-[#E4E1D8] border-t border-b border-[#E4E1D8]">
                  <a
                    href={ZALO_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="py-4 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#00A758] via-[#008746] to-[#0A3622] text-white flex items-center justify-center border-2 border-white shadow-[0_3px_12px_rgba(0,167,88,0.28)] group-hover:scale-105 transition-transform duration-300">
                        <span className="font-sans font-extrabold tracking-tight text-[11px] leading-none">
                          Zalo
                        </span>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#22C55E] border-[1.5px] border-white rounded-full" />
                      </span>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[#858E89] block">
                          Zalo, điện thoại
                        </span>
                        <span className="font-serif text-xl text-[#181F1C] group-hover:text-[#008746] transition-colors">
                          {PHONE_DISPLAY}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[#56605B] group-hover:text-[#0A3622] transition-colors">
                      <span>Nhắn Zalo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </a>

                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="py-4 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#0D5C38] via-[#0A3622] to-[#062316] text-white flex items-center justify-center border-2 border-white shadow-[0_3px_12px_rgba(10,54,34,0.28)] group-hover:scale-105 transition-transform duration-300">
                        <MessengerBrandSvg className="w-5 h-5" />
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#22C55E] border-[1.5px] border-white rounded-full" />
                      </span>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[#858E89] block">
                          Trang cá nhân
                        </span>
                        <span className="font-serif text-xl text-[#181F1C] group-hover:text-[#008746] transition-colors">
                          Facebook Khánh Vân
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[#56605B] group-hover:text-[#0A3622] transition-colors">
                      <span>Mở trang</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </a>
                </div>
              </div>
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
                  <p className="text-sm text-[#28322D] font-normal leading-[1.85]">
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
                    trackLeadConversion({
                      source: 'contact_form',
                      topic: formData.topic,
                      phone: formData.phone,
                      textContext: `${formData.fullName} ${formData.topic} ${formData.note}`,
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
                        note: formData.note,
                        source: 'contact_form',
                      }),
                    }).catch(() => {});
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
                        Mời đào tạo / chia sẻ tại sự kiện doanh nghiệp
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#858E89] mb-1">
                      Điều bạn muốn chia sẻ (không bắt buộc)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Bạn muốn trao đổi điều gì cùng Khánh Vân?"
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className="editorial-input resize-none"
                    />
                  </div>

                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      className="px-10 py-4 bg-[#0A3622] hover:bg-[#008746] text-white text-[11px] uppercase tracking-[0.24em] transition-colors inline-flex items-center gap-3 min-h-[44px]"
                    >
                      <span>Gửi lời nhắn</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-[11px] text-[#858E89] font-light leading-relaxed flex items-center gap-1.5 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#008746] shrink-0" />
                      <span>Thông tin của bạn được bảo mật theo Nghị định 13/2023/NĐ-CP và chỉ dùng để liên hệ tư vấn.</span>
                    </p>
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
                Khánh Vân
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#56605B] mt-1 block">
                Giám đốc Vùng Cấp cao tại Manulife Việt Nam
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-8 text-[11px] uppercase tracking-[0.2em] text-[#56605B]">
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#0A3622] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#00A758]" />
                <span>Zalo: {PHONE_DISPLAY}</span>
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#0A3622] transition-colors"
              >
                <FacebookBrandIcon className="w-3.5 h-3.5 text-[#008746]" />
                <span>Facebook cá nhân</span>
              </a>
            </div>
          </div>

          {/* COMPLIANCE & REGULATORY DISCLAIMER */}
          <div className="py-8 border-b border-[#DCD8CE]/70 text-[11px] text-[#858E89] leading-[1.85] font-light space-y-2">
            <p>
              <strong className="text-[#56605B] font-medium uppercase tracking-[0.1em]">Tuyên bố miễn trừ trách nhiệm &amp; Tuân thủ:</strong>{' '}
              Website <span className="text-[#56605B]">khanhvanfinance.com</span> là trang thông tin và thương hiệu cá nhân của bà Nguyễn Thị Vân (Khánh Vân), Giám đốc Vùng Cấp cao (Đại lý bảo hiểm độc lập thuộc Manulife Việt Nam). Các nội dung và góc nhìn chia sẻ trên website mang tính chất tham khảo chuyên môn và hoạch định tài chính cá nhân, không đại diện cho phát ngôn chính thức của Công ty TNHH Manulife (Việt Nam).
            </p>
            <p>
              Mọi quyền lợi, điều khoản và điều kiện sản phẩm bảo hiểm được áp dụng theo Quy tắc và Điều khoản hợp đồng do Manulife Việt Nam phát hành và được Bộ Tài chính phê chuẩn. Các nhãn hiệu, logo và tên thương mại liên quan thuộc quyền sở hữu trí tuệ hợp pháp của Công ty TNHH Manulife (Việt Nam) và các tổ chức liên quan.
            </p>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#858E89] font-light">
            <p>© 2026 Khánh Vân. All Rights Reserved. khanhvanfinance.com</p>
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
      </div>

      {/* AI ADVISOR HYBRID CHATBOT WIDGET */}
      <AiAdvisorWidget
        onOpenVideo={(video) => openVideo(video)}
        hidden={Boolean(activeArticle || activeVideo || lightbox)}
      />

      {/* FLOATING QUICK CONTACT BUTTONS — MOVED TO THE LEFT SIDE FOR A CLEAN & SPACIOUS LAYOUT */}
      <aside
        aria-label="Kênh kết nối trực tiếp Khánh Vân"
        className={`fixed bottom-[calc(0.875rem+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] left-3.5 sm:left-6 z-40 flex flex-col gap-2.5 sm:gap-4 items-start pointer-events-auto select-none transition-all duration-300 ${
          activeArticle || activeVideo || lightbox ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* 1. NÚT ZALO CHÍNH THỨC (MANULIFE EMERALD) */}
        <div className="group relative flex items-center justify-start">
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat trực tiếp qua Zalo với Khánh Vân: ${PHONE_DISPLAY}`}
            className="relative w-10 h-10 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center bg-gradient-to-br from-[#00A758] via-[#008746] to-[#0A3622] text-white shadow-[0_6px_20px_rgba(0,167,88,0.34)] hover:shadow-[0_10px_28px_rgba(0,167,88,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border-2 border-white"
          >
            {/* Gentle breathing halo ring (controlled scale, never overlaps) */}
            <span className="manulife-halo absolute -inset-1 rounded-full bg-[#00A758]/35 pointer-events-none" />

            <span className="relative z-10 font-sans font-extrabold tracking-tight text-[11px] sm:text-[13.5px] text-white leading-none select-none">
              Zalo
            </span>
            <span className="
              absolute bottom-0 right-0 z-20 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#22C55E] border-2 border-white rounded-full shadow-xs
            " />
          </a>

          <div className="hidden md:flex items-center gap-2 px-3.5 py-2 ml-3.5 rounded-full bg-[#0A3622]/95 backdrop-blur-md text-[#FAF9F5] text-xs shadow-[0_8px_24px_rgba(10,54,34,0.24)] border border-[#00A758]/35 whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
            <span className="font-light text-white/85">Chat Zalo trực tiếp:</span>
            <strong className="font-medium tracking-wide text-white">{PHONE_DISPLAY}</strong>
          </div>
        </div>

        {/* 2. NÚT FACEBOOK / MESSENGER CHÍNH THỨC (MANULIFE DEEP FOREST EMERALD) */}
        <div className="group relative flex items-center justify-start">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kết nối Facebook Khánh Vân"
            className="relative w-10 h-10 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center bg-gradient-to-br from-[#0D5C38] via-[#0A3622] to-[#062316] text-white shadow-[0_6px_20px_rgba(10,54,34,0.34)] hover:shadow-[0_10px_28px_rgba(0,135,70,0.48)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border-2 border-white"
          >
            {/* Gentle breathing halo ring (staggered) */}
            <span className="manulife-halo-delayed absolute -inset-1 rounded-full bg-[#008746]/32 pointer-events-none" />

            <MessengerBrandSvg className="w-5 h-5 sm:w-[25px] sm:h-[25px] text-white relative z-10" />
            <span className="absolute bottom-0 right-0 z-20 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#22C55E] border-2 border-white rounded-full shadow-xs" />
          </a>

          <div className="hidden md:flex items-center gap-2 px-3.5 py-2 ml-3.5 rounded-full bg-[#0A3622]/95 backdrop-blur-md text-[#FAF9F5] text-xs shadow-[0_8px_24px_rgba(10,54,34,0.24)] border border-[#00A758]/35 whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
            <span className="font-light text-white/85">Facebook chính thức:</span>
            <strong className="font-medium tracking-wide text-white">Khánh Vân</strong>
          </div>
        </div>
      </aside>

      {/* EDITORIAL ARTICLE READER MODAL — NATIVE MOBILE APP FULLSCREEN SHEET & DESKTOP LUXURY MODAL */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closeArticle()}
            className="fixed inset-0 z-50 bg-[#181F1C]/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-6 lg:p-8"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full h-[100dvh] sm:h-auto sm:max-h-[88vh] sm:max-w-3xl bg-[#FAF9F5] sm:border sm:border-[#DCD8CE] flex flex-col overflow-hidden sm:rounded-[6px] shadow-2xl relative"
            >
              {/* STICKY TOP APP HEADER BAR */}
              <div className="sticky top-0 z-30 bg-[#FAF9F5]/96 backdrop-blur-md border-b border-[#E4E1D8] px-4 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between shrink-0">
                <button
                  type="button"
                  onClick={() => closeArticle()}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#56605B] hover:text-[#181F1C] min-h-[44px] min-w-[44px] -ml-2 px-2.5 transition-colors active:text-[#0A3622]"
                  aria-label="Quay lại danh mục bài viết"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium text-[11px] sm:text-xs">Quay lại</span>
                </button>

                <div className="flex items-center gap-2 max-w-[170px] xs:max-w-[220px] sm:max-w-sm truncate text-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008746] shrink-0" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#0A3622] font-medium truncate">
                    {activeArticle.category}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => shareArticle(activeArticle)}
                    className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-[#008746] hover:text-[#0A3622] min-h-[44px] min-w-[44px] justify-center px-2 transition-colors font-medium active:scale-95"
                    aria-label="Chia sẻ bài viết"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline text-[11px]">Chia sẻ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => closeArticle()}
                    className="hidden sm:flex items-center justify-center min-h-[44px] min-w-[44px] text-[#56605B] hover:text-[#181F1C] transition-colors -mr-2"
                    aria-label="Đóng"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* SCROLLABLE ARTICLE BODY (OVERSCROLL-CONTAIN NATIVE TOUCH) */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-12 py-6 sm:py-10 space-y-6 overscroll-contain">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#008746]">
                  <span>{activeArticle.category}</span>
                  <span>&bull;</span>
                  <span>{activeArticle.date}</span>
                  <span>&bull;</span>
                  <span className="text-[#858E89]">{activeArticle.readTime}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-[34px] lg:text-4xl font-normal text-[#181F1C] leading-[1.25] tracking-tight">
                  {activeArticle.title}
                </h3>

                {activeArticle.image && (
                  <figure className="my-6">
                    <div className="overflow-hidden aspect-[16/10] bg-[#EAE7DF] rounded-[4px] ring-1 ring-inset ring-[#181F1C]/[0.08] shadow-sm">
                      <img decoding="async"
                        src={activeArticle.image}
                        alt={activeArticle.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {activeArticle.imageCaption && (
                      <figcaption className="mt-2.5 text-[11px] uppercase tracking-[0.12em] text-[#858E89] text-left sm:text-right font-light italic">
                        {activeArticle.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}

                <div className="h-[1px] w-16 bg-[#0A3622]/30" />

                {renderArticleContent(activeArticle.content)}

                <div className="mt-10 pt-6 pb-6 px-5 sm:px-6 bg-[#0A3622]/[0.04] border border-[#0A3622]/15 rounded-[4px] space-y-4">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[#008746] font-medium block">
                    ĐIỀU CẦN NHỚ
                  </span>
                  <ul className="space-y-3 text-sm sm:text-[15px] text-[#181F1C] font-normal leading-[1.75]">
                    {activeArticle.keyTakeaways.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#008746] mt-2 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* RELATED VIDEOS FROM KHÁNH VÂN */}
                <div className="mt-8 pt-6 border-t border-[#E4E1D8] space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#008746] font-medium">
                      VIDEO CỦA KHÁNH VÂN CÙNG CHỦ ĐỀ
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        closeArticle();
                        setTimeout(() => {
                          document.getElementById('thu-vien-video')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="text-[11px] uppercase tracking-[0.15em] text-[#56605B] hover:text-[#0A3622] underline underline-offset-4"
                    >
                      Mở thư viện 109 Video
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {VIDEO_LIBRARY.filter((v) =>
                      activeArticle.category === 'Phát triển Sự nghiệp' ||
                      activeArticle.category === 'Kỷ luật Bản thân'
                        ? v.folderId === 'chuyen-nghe-lanh-dao'
                        : activeArticle.category === 'Bố Mẹ Đi Làm'
                        ? v.folderId === 'dong-tien-huu-tri'
                        : v.folderId === 'minh-bach-bao-hiem'
                    )
                      .slice(0, 2)
                      .map((vid) => (
                        <button
                          key={vid.id}
                          type="button"
                          onClick={() => openVideo(vid)}
                          className="text-left p-4 rounded-[4px] border border-[#DCD8CE] hover:border-[#0A3622] bg-[#FAF9F5] transition-all group flex flex-col justify-between gap-2"
                        >
                          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[#008746]">
                            <span>{vid.folderShort}</span>
                            <span className="text-[#858E89]">{vid.views} lượt xem</span>
                          </div>
                          <p className="font-sans font-semibold text-sm text-[#181F1C] group-hover:text-[#0A3622] leading-[1.4] line-clamp-2">
                            {vid.title}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-[#0A3622] group-hover:text-[#008746] font-medium pt-1">
                            <Play className="w-3 h-3 fill-current" />
                            <span>Xem Video</span>
                          </span>
                        </button>
                      ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#DCD8CE] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F2EFE9]/60 p-5 sm:p-6 rounded-[4px] mb-8">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#008746] block mb-1">
                      CỐ VẤN RIÊNG CÙNG KHÁNH VÂN
                    </span>
                    <p className="text-xs sm:text-sm text-[#28322D] font-normal leading-relaxed">
                      Bạn quan tâm đến cơ chế chuyển giao gia sản hoặc tối ưu dòng tiền dài hạn?
                    </p>
                  </div>
                  <a
                    href="#dong-hanh"
                    onClick={() => closeArticle()}
                    className="inline-flex items-center justify-center px-5 py-3.5 sm:py-2.5 bg-[#0A3622] text-[#FAF9F5] text-xs uppercase tracking-[0.16em] hover:bg-[#008746] active:scale-[0.98] transition-all rounded-[2px] shrink-0 text-center font-medium min-h-[44px]"
                  >
                    Đặt lịch tư vấn 1-1
                  </a>
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
            className="fixed inset-0 z-50 bg-[#181F1C]/92 backdrop-blur-xs flex items-center justify-center p-2 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-[#FAF9F5] p-3 sm:p-6 rounded-[4px] overflow-hidden"
            >
              <div className="relative bg-[#181F1C] flex items-center justify-center max-h-[70vh] sm:max-h-[75vh] rounded-[2px] overflow-hidden">
                <img decoding="async"
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="max-h-[70vh] sm:max-h-[75vh] w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 rounded-full bg-black/60 sm:bg-[#FAF9F5] text-white sm:text-[#181F1C] flex items-center justify-center backdrop-blur-xs z-20 min-h-[44px] min-w-[44px]"
                  aria-label="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#181F1C]">
                    {lightbox.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-[13px] text-[#28322D] font-normal max-w-sm sm:text-right">
                  {lightbox.subtitle}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
