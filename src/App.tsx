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
    id: 'am-29-phan-tram-mot-nam-giu-du-10-nam-sinh-loi-9-phay-4',
    index: '01',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: true,
    image: '/images/VanPhong_ChiVanCungDoiNgu_BanHopXanhLa.jpg',
    imageCaption: 'Chiến lược quản trị tài sản và kỷ luật ủy thác dòng tiền dài hạn cùng các cộng sự nòng cốt.',
    title: 'Âm 29,5% Trong Một Năm: Kỷ Luật Giữ Đủ 10 Năm Để Đạt Mức Sinh Lời 9,4%/Năm',
    excerpt:
      'Cuối năm 2022, khi tài khoản đỏ gần 30%, câu hỏi phổ biến là: "Có nên cắt lỗ luôn không?". Nhưng khoản lỗ trên giấy chỉ thành lỗ thật khi ta bán tháo. Tách bạch ngăn ngắn hạn và dài hạn chính là chìa khóa để an tâm đi qua giông bão.',
    content: `*Cuối năm 2022, Vân nhận khá nhiều tin nhắn từ bạn bè và khách hàng với câu hỏi na ná nhau: "Có nên cắt lỗ luôn không, mình không chịu nổi nữa?". Họ không thiếu hiểu biết, nhiều người là quản lý thu nhập rất tốt. Chỉ là khi tài khoản đỏ gần 30%, cảm xúc thường đi trước lý trí.*

## Khi Một Khoản Tiền Phải Gánh Quá Nhiều Nhiệm Vụ

Vân nghe nhiều hơn khuyên. Và khi gỡ từng lớp ra, câu chuyện thường chung một gốc rễ: một khoản tiền đang bị bắt gánh cùng lúc quá nhiều trọng trách — vừa muốn là tiền tích lũy dài hạn cho tương lai, vừa muốn là tiền phòng bị rút ra khi cần chi gấp.

Thử nhìn lại các con số thực tế trên thị trường:
- Quỹ Tăng Trưởng do Công ty Quản lý Quỹ Manulife quản lý (đơn vị đang quản lý danh mục khoảng 150.000 tỷ đồng tài sản) giảm **29,5%** trong năm biến động 2022.
- Những nhà đầu tư không hoảng loạn bán tháo đã đón trọn nhịp phục hồi mạnh mẽ: **+11,8%** năm 2023, **+14,1%** năm 2024 và bứt phá **+26,2%** trong năm 2025.

Tính chung chu kỳ 10 năm đến hết 2025, mức sinh lời trung bình đạt **9,4%/năm**, tương đương mức tăng trưởng lũy kế **145,5%**. Tất nhiên, đây là số liệu lịch sử và không hàm ý cam kết cho tương lai, nhưng phản ánh rõ nét quy luật vận động của thị trường vốn.

## Hai Bài Học Đắt Giá Từ Thực Tế Đầu Tư Dài Hạn

Từ bức tranh số liệu ấy, có hai điều Vân thấy rất đáng suy ngẫm cho mỗi người làm chủ tài chính:

- **Thứ nhất, lỗ trên giấy chỉ trở thành lỗ thật khi ta bán ra:** Người vội vã rời đi giữa năm 2022 đã tự tay hiện thực hóa phần thiệt hại, và vắng mặt đúng vào thời điểm thị trường phục hồi rực rỡ nhất.
- **Thứ hai, tính kỷ luật quan trọng hơn nỗ lực đoán đáy thị trường:** Tích lũy đều đặn đồng nghĩa với việc ngay trong những năm thị trường định giá thấp, ta vẫn đang gom thêm tài sản ở vùng giá tốt cho bài toán 10 năm, thay vì sợ hãi dừng lại.

## Nguyên Tắc Tách Dòng Tiền Thành Hai Ngăn Rõ Ràng

Lời khuyên Vân luôn chia sẻ với các gia đình là hãy thiết lập ranh giới tài chính minh bạch:

- **Ngăn ngắn hạn (Thanh khoản & Phòng vệ):** Dự phòng chi tiêu 6–12 tháng, học phí của con, nghĩa vụ tài chính sắp tới. Ngăn này bắt buộc phải tuyệt đối ổn định và an toàn, không được phép phụ thuộc vào biến động lên xuống của thị trường.
- **Ngăn dài hạn (Ủy thác & Tăng trưởng):** Khoản tiền bạn chắc chắn chưa cần đụng tới trong vòng 5–10 năm. Chỉ ngăn này mới đủ tư cách và kiên nhẫn để ngồi yên đi qua các chu kỳ giông bão.

Khi mỗi đồng tiền đã được phân công đúng nhiệm vụ, một năm thị trường âm gần 30% dẫu có khó chịu, nhưng không thể buộc ta phải đưa ra những quyết định bán tháo vội vàng trong hoảng loạn.

Thị trường luôn có những chu kỳ biến động. Người giữ được kỷ luật và biết ủy thác cho các định chế quản lý quỹ chuyên nghiệp sẽ tận dụng được sức mạnh của lãi kép dài hạn. Điều cốt tử là đừng bao giờ nhảy khỏi tàu ngay giữa cơn bão.

Mỗi gia đình là một bài toán dòng tiền riêng biệt. Nếu bạn cũng đang cân nhắc rà soát lại cấu trúc tài chính cho gia đình mình, cứ nhắn tin trao đổi cùng Vân nhé. Những góc nhìn độc lập luôn giúp ta sáng tỏ thêm nhiều điều.`,
    keyTakeaways: [
      'Khoản lỗ trên giấy chỉ trở thành lỗ thật khi bạn hoảng loạn bán tháo và bỏ lỡ chu kỳ phục hồi của thị trường.',
      'Kỷ luật tích lũy định kỳ và ủy thác quỹ chuyên nghiệp quan trọng hơn nỗ lực đoán đỉnh, đoán đáy ngắn hạn.',
      'Tách bạch dòng tiền: Ngăn ngắn hạn giữ an toàn thanh khoản, ngăn dài hạn kiên nhẫn chờ lãi kép vượt giông bão.',
    ],
  },
  {
    id: '17-trieu-va-171-trieu-chiec-xuong-ca-va-quyen-loi-tai-nan',
    index: '02',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: true,
    image: '/images/VanPhong_ChiVanCung5NuQuanLy_SanhVomTron.jpg',
    imageCaption: 'Chị Khánh Vân ân cần hướng dẫn đội ngũ quản lý về quy trình thẩm định và giải quyết quyền lợi bồi thường cho khách hàng.',
    title: '17 Triệu Và 171 Triệu: Câu Chuyện Bồi Thường Hy Hữu Từ Một Chiếc Xương Cá',
    excerpt:
      'Nuốt phải xương cá làm thủng ruột non phải mổ cấp cứu. Viện phí 17 triệu được chi trả, nhưng điều khoản tai nạn bất ngờ kích hoạt thêm 150 triệu tiền mặt. Tổng chi trả vượt 171 triệu đồng. Định nghĩa “tai nạn” trong hợp đồng rộng hơn nhiều người vẫn nghĩ.',
    content: `*17 triệu và 171 triệu. Hai con số chênh nhau hơn mười lần, và cả hai đều đến từ một chiếc xương cá trong bữa cơm gia đình thường nhật.*

## Ca Bồi Thường Hy Hữu Từ Bàn Ăn

Đây là ca bồi thường thực tế vừa được giải quyết tại Manulife mà Vân trực tiếp theo dõi. Khách hàng tham gia hợp đồng từ năm 2022. Trong một bữa cơm gia đình, người này chẳng may nuốt phải một chiếc xương cá. Chiếc xương trôi xuống làm thủng ruột non, khiến bệnh nhân phải nhập viện phẫu thuật khẩn cấp.

Phần viện phí phẫu thuật khoảng **17 triệu đồng**, đi kèm các khoản hỗ trợ chi phí y tế, được bảo lãnh và thanh toán đầy đủ theo quyền lợi chăm sóc sức khỏe. Nhưng điều khiến Vân muốn chia sẻ câu chuyện này nằm ở phần quyền lợi thứ hai.

Biến cố hóc dị vật gây tổn thương nội tạng nghiêm trọng này được xác định là sự kiện tai nạn khách quan, ngoài ý muốn. Do đó, hợp đồng lập tức kích hoạt điều khoản **Phẫu thuật nội tạng do tai nạn**, chi trả thêm một khoản tiền mặt lên tới **150 triệu đồng** chuyển thẳng vào tài khoản của khách hàng. Tổng số tiền chi trả thực tế vượt mốc **171 triệu đồng**.

## Hiểu Lầm Phổ Biến Về Khái Niệm "Tai Nạn"

Hiểu lầm phổ biến nhất mà Vân thường gặp là nhiều người mặc định "tai nạn" chỉ là va quẹt xe cộ hay trượt ngã ngoài đường. 

Trong quy tắc và điều khoản pháp lý của hợp đồng bảo hiểm, tai nạn được định nghĩa chặt chẽ và rộng hơn rất nhiều: **Đó là sự kiện bất ngờ, không lường trước được, do nguyên nhân bên ngoài tác động trực tiếp lên cơ thể và gây ra thương tổn.**

Một chiếc xương cá hay dị vật vô tình hóc phải trong bữa ăn hoàn toàn thỏa mãn đầy đủ các yếu tố của định nghĩa pháp lý này.

## Phân Biệt Hai Khoản Tiền Trong Một Ca Chi Trả

Cần phân biệt rất rõ bản chất của hai khoản tiền trong trường hợp này để thấy rõ giá trị của một hợp đồng được thiết kế chuẩn mực:
- **Khoản 17 triệu đồng:** Là khoản thanh toán chi phí y tế thực tế phát sinh tại bệnh viện (nằm viện, phẫu thuật, thuốc men).
- **Khoản 150 triệu đồng:** Là quyền lợi bồi thường khoán tiền mặt theo danh mục phẫu thuật do tai nạn, chi trả đúng theo hạn mức cam kết trong hợp đồng, hoàn toàn độc lập với hóa đơn viện phí.

Khoản tiền mặt 150 triệu này đóng vai trò như một nguồn bù đắp thu nhập quý giá, giúp người bệnh và gia đình có thêm nguồn lực để yên tâm nghỉ ngơi, tĩnh dưỡng và phục hồi thể trạng mà không phải lo nghĩ về gánh nặng tài chính.

## Ba Việc Nhỏ Giúp Bảo Vệ Quyền Lợi Của Chính Bạn

Từ ca bồi thường thực tế này, Vân có ba gợi ý thiết thực mà mọi gia đình đều nên thực hiện ngay:

- **Một là mở hợp đồng đọc kỹ phần định nghĩa "tai nạn":** Đừng tự đoán theo cảm tính thông thường mà hãy căn cứ trên định nghĩa pháp lý chính thức.
- **Hai là kiểm tra bảng tỷ lệ thương tật & danh mục phẫu thuật:** Để nắm rõ từng tình huống tổn thương cụ thể sẽ tương ứng với quyền lợi chi trả bao nhiêu tiền mặt.
- **Ba là luôn nộp hồ sơ đầy đủ khi có biến cố y tế:** Hãy để bộ phận thẩm định đối chiếu theo điều khoản hợp đồng và hồ sơ bệnh án, thay vì tự tước bỏ quyền lợi của mình vì nghĩ "chắc chuyện này không được chi trả".

Bữa cơm gia đình vẫn cứ ngon và ấm cúng như thế, chẳng ai ngồi vào mâm mà phải bận tâm đến chiếc xương cá. Vân chỉ mong mỗi người đều hiểu thật rõ hợp đồng của mình, để lỡ khi có biến cố bất ngờ xảy đến, điều duy nhất gia đình cần bận tâm là nhanh chóng bình phục sức khỏe.`,
    keyTakeaways: [
      'Định nghĩa tai nạn trong bảo hiểm bao gồm mọi biến cố bất ngờ từ bên ngoài gây thương tổn, không chỉ giới hạn ở giao thông.',
      'Phân biệt rõ chi trả viện phí thực tế và quyền lợi tiền mặt khoán theo danh mục phẫu thuật tai nạn để tối ưu quyền lợi.',
      'Khi có biến cố y tế, luôn chủ động nộp hồ sơ đầy đủ để thẩm định chuyên môn xét duyệt, tránh tự phán đoán làm mất quyền lợi.',
    ],
  },
  {
    id: 'tien-gui-sinh-loi-it-di-gia-dinh-bat-an-nhieu-hon',
    index: '03',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: true,
    image: '/images/VanPhong_NhomQuanLy_TraoDoiCongViecBenTablet.jpg',
    imageCaption: 'Phân tích cơ cấu dòng tiền, bài toán thanh khoản và rà soát hợp đồng bảo vệ cùng các chuyên gia quản trị gia sản.',
    title: 'Tiền Gửi Sinh Lời Ít Đi, Nhưng Nhiều Gia Đình Lại Bất An Nhiều Hơn',
    excerpt:
      'Lãi suất tiết kiệm càng thấp, người ta càng sốt ruột tìm nơi sinh lời cao hơn. Nhưng nghịch lý là càng sốt ruột kiếm lời, ta càng dễ tháo bỏ chính thứ giữ mình đứng vững. Khoản tiết kiệm không chỉ để sinh lời, nó là lớp đệm sống còn trước biến cố.',
    content: `*Lãi suất tiết kiệm càng thấp, người ta càng muốn rút tiền ra đi tìm nơi sinh lời cao hơn. Nghịch lý là càng sốt ruột kiếm lời, ta càng dễ tháo bỏ chính thứ giữ mình đứng vững.*

## Nghịch Lý Lãi Suất Giảm & Cơn Sốt Ruột Tìm Kiếm Lợi Nhuận

Việc 46/46 ngân hàng đồng loạt hạ lãi suất huy động chỉ là cái cớ để thấy rõ tâm lý đó. Mặt bằng lãi suất xuống, và nhiều nhà bắt đầu dồn gần hết khoản tích lũy sang những kênh kỳ vọng cao hơn.

Vân nhìn chuyện này ở một góc khác.

Con số lãi suất là con số bình quân, dễ khiến ta thấy mình đang "ổn". Chúng ta theo dõi rất kỹ mức chênh lệch sinh lời vài phần trăm, nhưng hiếm khi tự hỏi: nếu ngày mai có biến cố sức khỏe lớn, mình phải bán tài sản nào, vào lúc nào, với giá nào?

## Tiết Kiệm Không Chỉ Để Sinh Lời — Đó Là "Lớp Đệm" Sống Còn

Khoản tiết kiệm nằm đó không chỉ để sinh lời. Nó là lớp đệm. Khi lớp đệm bị đem đi đầu tư hết, tài sản trông thì nhiều nhưng thực ra rất bấp bênh, vì đang kẹt ở những nơi không thể rút ra đúng lúc, đúng giá. Một hóa đơn điều trị bệnh nặng không hẹn trước, cũng không chờ thị trường hồi phục.

Từ những năm làm ngân hàng đến nay, Vân giữ một triết lý khá giản dị: biết đủ là đủ. Tài chính suy cho cùng là công cụ để tâm trí được an yên và tự do, không phải cuộc đua xem ai sinh lời cao hơn ai. Làm nghề tử tế, tích lũy bền bỉ, khó trước dễ sau. Với Vân, "khó trước" là chịu trích một phần nhỏ để dựng hàng rào bảo vệ trước, rồi mới thong thả tính chuyện tăng trưởng.

## Bản Chất Quỹ Dự Phòng Y Tế: Khóa Chặt Rủi Ro Bằng Tỷ Trọng Nhỏ

Bản chất của một quỹ dự phòng tài chính y tế rất rõ ràng. Mình đóng một khoản định kỳ nhỏ so với thu nhập, để đổi lấy quyền nhận về hàng tỷ đồng ngay khi rủi ro lớn xảy ra. Khoản này không cần sinh lời. Nhiệm vụ duy nhất của nó là giữ nguyên vẹn khối tài sản gia đình đã mất nhiều năm xây dựng, không bị bào mòn bởi những hóa đơn đột ngột.

Chỉ cần một tỷ trọng rất nhỏ. Không phải giữ khư khư tiền mặt, cũng không phải tất tay. Phần còn lại cứ để đi làm việc của nó, với tâm thế nhẹ nhõm hơn.

## "Khám Sức Khỏe" Cho Hợp Đồng Bảo Vệ Cũ

Nếu trong nhà đã có hợp đồng bảo vệ từ vài năm trước, đây là lúc hợp lý để mở ra xem lại:
- Mức bảo vệ hiện tại còn theo kịp chi phí y tế ngày càng đắt đỏ không?
- Người trụ cột tạo ra dòng tiền chính đã được che chắn đủ đầy chưa?
- Các điều khoản bồi thường và bảo lãnh viện phí có đáp ứng nhu cầu thực tế của gia đình?

Kiểm tra sức khỏe cho hợp đồng cũ cũng quan trọng không kém việc kiểm tra sức khỏe cho chính bản thân mình.

Còn gia đình bạn, khi lãi suất xuống và các kênh sinh lời trông ngày càng hấp dẫn, bạn xác định phần "đủ" của mình ở đâu, và bằng cách nào? Vân rất muốn lắng nghe góc nhìn của mọi người ở phần bình luận.`,
    keyTakeaways: [
      'Tiết kiệm không chỉ để sinh lời mà là “lớp đệm thanh khoản” sống còn bảo vệ gia đình trước các biến cố y tế bất ngờ.',
      'Bản chất quỹ dự phòng y tế là dùng một tỷ trọng định kỳ nhỏ để khóa chặt rủi ro, giữ nguyên vẹn khối tài sản tích lũy qua nhiều năm.',
      'Chủ động “khám sức khỏe hợp đồng bảo vệ cũ” định kỳ để đảm bảo mức bảo vệ người trụ cột luôn bắt kịp chi phí y tế thực tế.',
    ],
  },
  {
    id: 'khi-tai-san-thua-ke-tro-thanh-vet-nut-gia-dinh',
    index: '04',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 11, 2026',
    readTime: '6 phút đọc',
    featured: false,
    image: '/images/VanPhong_ChiVanDieuHanhCuocHopBanBauDuc.jpg',
    imageCaption: 'Chị Khánh Vân chủ trì buổi làm việc chuyên sâu về cơ chế bảo vệ và chuyển giao gia sản.',
    title: 'Khi Tài Sản Thừa Kế Trở Thành Vết Nứt Gia Đình: Bài Học Từ Một Cơ Chế Chuyển Giao Văn Minh',
    excerpt:
      'Tỷ lệ tranh chấp thừa kế tại Trung Quốc tăng gấp ba lần trong 5 năm, phần lớn xoay quanh bất động sản. Đứng từ góc nhìn quản trị tài sản, câu chuyện này đặt ra một vấn đề lớn hơn: làm sao để gia sản được chuyển giao êm thấm giữa các thế hệ mà không đánh đổi bằng tình thân.',
    content: `*Tỷ lệ tranh chấp thừa kế tại Trung Quốc tăng gấp ba lần trong 5 năm, phần lớn xoay quanh bất động sản - loại tài sản khó phân chia và dễ phát sinh mâu thuẫn nhất. Đứng từ góc nhìn quản trị tài sản, câu chuyện này đặt ra một vấn đề lớn hơn: làm sao để gia sản được chuyển giao êm thấm giữa các thế hệ mà không đánh đổi bằng tình thân.*

## Khi Tài Sản Vật Chất Trở Thành Nguồn Cơn Chia Rẽ

Số liệu từ Tòa án Nhân dân Trung cấp số 2 Bắc Kinh cho thấy một xu hướng đáng suy ngẫm: tỷ lệ án phân chia tài sản của người cao tuổi tăng từ 4,4% năm 2021 lên 15,5% năm 2025, trong đó bất động sản chiếm đến 94,6% giá trị tài sản tranh chấp. Những con số này không đơn thuần phản ánh lòng tham, mà cho thấy một lỗ hổng mang tính cấu trúc: tài sản được tích lũy qua nhiều năm nhưng không có cơ chế chuyển giao rõ ràng ngay từ đầu.

Những vụ việc được dẫn chứng đều có điểm chung. Hai anh em tranh giành ba tòa nhà vì không có văn bản nào ghi nhận tỷ lệ đóng góp tài chính. Bảy anh chị em kiện nhau vì cổ phần công ty hợp tác nông thôn, trong đó bốn người chị từng trực tiếp chăm sóc cha mẹ lại bị gạt ra ngoài chỉ vì đã lập gia đình riêng. Một người đàn ông 60 tuổi phải khởi kiện toàn bộ 12 người thân chỉ để bảo vệ quyền thừa kế căn nhà trị giá 700.000 USD. Tất cả đều xuất phát từ một điểm chung: tài sản tồn tại ở dạng "một cục" - nhà đất, cổ phần, tiền mặt - không có cơ chế phân bổ minh bạch, dễ bị diễn giải theo nhiều hướng khi người để lại tài sản không còn.

## Gốc Rễ Vấn Đề: Thiếu Một "Kế Hoạch Chuyển Giao" Minh Bạch

Trong ngành tài chính - ngân hàng, đây gọi là rủi ro chuyển giao thế hệ (generational transfer risk). Tài sản càng lớn, càng tập trung vào bất động sản hay cổ phần không thể chia nhỏ, thì rủi ro xung đột khi chuyển giao càng cao. Thực tế xét xử tại Trung Quốc cũng cho thấy điều này: tòa án đang dần ưu tiên người trực tiếp chăm sóc thay vì chia theo huyết thống thuần túy - như vụ người em trai chăm chị gái bệnh tâm thần suốt 30 năm được hưởng 70% tài sản, trong khi người con ruột đứt liên lạc nhiều năm chỉ nhận 30%. Điều này cho thấy công lý đang cố gắng vá lại những lỗ hổng mà bản thân gia đình đã không chủ động thiết lập từ trước.

Vấn đề không nằm ở việc ai xứng đáng hơn ai, mà nằm ở việc gia đình thiếu một công cụ pháp lý - tài chính đủ linh hoạt để phân định ý chí của người để lại tài sản một cách rõ ràng, minh bạch và được bảo vệ ngay từ lúc còn sống, chứ không phải chờ đến khi mọi chuyện đã muộn và chỉ còn biết trông cậy vào tòa án.

## Bài Học Từ Cơ Chế Chuyển Giao Quyền Lợi Trong Hợp Đồng Tích Lũy Dài Hạn

Một hướng tiếp cận đáng tham khảo trong hoạch định tài chính gia đình hiện đại là: thay vì dồn toàn bộ tài sản vào bất động sản hay tiền mặt - vốn dễ bị phân mảnh, tranh chấp hoặc mất giá trị theo thời gian - các hợp đồng tích lũy tài sản dài hạn (bảo vệ đến 99 tuổi) cho phép thiết lập sẵn cơ chế chuyển giao quyền lợi giữa các thế hệ ngay từ ban đầu.

Cụ thể, cha mẹ có thể đứng tên mua hợp đồng cho con, và khi con trưởng thành, quyền sở hữu hợp đồng được chuyển giao một cách hợp pháp, có ghi nhận rõ ràng. Tương tự, ông bà có thể mua cho con, sau đó thay đổi người được bảo hiểm sang cháu khi cần. Toàn bộ quá trình chuyển giao này diễn ra trong khuôn khổ hợp đồng đã ký kết, không phải tranh luận hay thỏa thuận lại từ đầu như với bất động sản hay cổ phần. Điều quan trọng hơn cả là dòng vốn tích lũy không bị gián đoạn - lãi kép tiếp tục sinh lời xuyên suốt qua các lần chuyển giao, giống như một dòng chảy tài chính được nối liền từ đời này sang đời khác thay vì bị chia cắt, rút ra giữa chừng mỗi khi có biến cố trong gia đình.

Đây chính là điểm khác biệt căn bản so với việc để lại một căn nhà hay một khoản tiền mặt: tài sản được "lập trình" sẵn đường đi, thay vì để ngỏ cho sự diễn giải và tranh cãi của người ở lại.

## Đúc Kết Thực Tế

- Minh bạch hóa đóng góp tài chính và công sức phụng dưỡng bằng văn bản ngay từ khi còn sống, thay vì để lại cho tòa án phán xét sau này.
- Ưu tiên các tài sản tài chính có cơ chế chuyển giao rõ ràng (hợp đồng tích lũy, bảo hiểm nhân thọ dài hạn) song song với bất động sản, nhằm giảm áp lực tranh chấp khi tài sản khó chia nhỏ.
- Chủ động thiết lập lộ trình chuyển giao quyền lợi từ bố mẹ sang con, từ ông bà sang cháu khi còn minh mẫn, để gia sản được tiếp nối liên tục mà không đứt gãy lãi kép hay tình thân.`,
    keyTakeaways: [
      'Minh bạch hóa đóng góp tài chính và công sức phụng dưỡng bằng văn bản ngay từ khi còn sống, thay vì để lại cho tòa án phán xét sau này.',
      'Ưu tiên các tài sản tài chính có cơ chế chuyển giao rõ ràng (hợp đồng tích lũy, bảo hiểm nhân thọ dài hạn) song song với bất động sản, nhằm giảm áp lực tranh chấp khi tài sản khó chia nhỏ.',
      'Chủ động thiết lập lộ trình chuyển giao quyền lợi từ bố mẹ sang con, từ ông bà sang cháu khi còn minh mẫn, để gia sản được tiếp nối liên tục mà không đứt gãy lãi kép hay tình thân.',
    ],
  },
  {
    id: 'phi-nam-dau-boc-hoi-toi-uu-dong-tien',
    index: '05',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: false,
    image: '/images/VanPhong_NhomQuanLy_ThaoLuanTaiLieuThucChien.jpg',
    imageCaption: 'Phân tích bảng minh họa dòng tiền thực chiến và cấu trúc phí cùng các cộng sự chuyên môn.',
    title: 'Phí Năm Đầu “Bốc Hơi”: Hiểu Đúng Để Không Đánh Mất Cơ Hội Tối Ưu Dòng Tiền',
    excerpt:
      'Có lần một người bạn làm trong ngành tài chính hỏi Vân một câu rất thẳng: “Năm đầu đóng bảo hiểm, tiền mất gần hết vào phí, vậy thực chất mình đang tích lũy hay đang nuôi ai?”. Câu hỏi này không mới, nhưng cách trả lời thì cần nhìn lại cho đúng với bối cảnh hiện tại.',
    content: `*Có lần một người bạn làm trong ngành tài chính hỏi Vân một câu rất thẳng: "Năm đầu đóng bảo hiểm, tiền mất gần hết vào phí, vậy thực chất mình đang tích lũy hay đang nuôi ai?". Câu hỏi này không mới, nhưng cách trả lời thì cần nhìn lại cho đúng với bối cảnh hiện tại.*

## Khi "mất trắng" chỉ là ấn tượng cũ

Định kiến về việc năm đầu đóng bảo hiểm gần như "bay sạch" vào phí không phải tự nhiên mà có. Ở các thế hệ sản phẩm liên kết đơn vị trước đây, tỷ lệ phí ban đầu từng ở mức 80-90%, nghĩa là trong 100 đồng khách hàng đóng vào, chỉ có 10-20 đồng thực sự được đưa vào quỹ đầu tư để sinh lời. Phần còn lại dùng để chi trả cho các cấu phần vận hành của hợp đồng.

Với một người quen nhìn dòng tiền theo logic "bỏ vào bao nhiêu, làm việc ngay bấy nhiêu" như dân tài chính, con số 80-90% phí ban đầu rõ ràng là một cú sốc. Nhưng nếu dừng lại ở ấn tượng đó mà không cập nhật cấu trúc sản phẩm thế hệ mới, câu chuyện sẽ bị nhìn lệch.

## Cấu trúc phí thế hệ mới: Tiền "lăn bánh" sớm hơn

Ở dòng liên kết đơn vị thế hệ mới, ví dụ như Xanh Phú Quý Flex, tỷ lệ phí ban đầu được thiết kế lại theo hướng giảm dần và giảm sâu ngay từ năm đầu tiên:

- Năm 1: phí ban đầu chỉ 30%, tức 70% dòng tiền được đưa thẳng vào quỹ đầu tư để sinh lời ngay.
- Năm 2: phí ban đầu còn 20%.
- Năm 3 đến năm 5: phí ban đầu chỉ còn 10%.
- Từ năm thứ 6 trở đi: phí ban đầu bằng 0%.

Nhìn vào bảng tỷ lệ này, điều đáng chú ý nhất không phải là con số 30% ở năm đầu, mà là tốc độ giảm. Chỉ sau ba năm, phần lớn dòng tiền khách hàng đóng vào đã được "lăn bánh" trong quỹ đầu tư thay vì bị giữ lại ở phần chi phí. Đây là sự khác biệt căn bản so với cấu trúc cũ, nơi phải mất nhiều năm hơn mới đạt được tỷ lệ tương tự.

## Tài Khoản Tri Ân: Phí ban đầu không hẳn là "mất"

Điểm khiến nhiều người bạn làm tài chính khi tìm hiểu kỹ thường thay đổi góc nhìn, chính là cơ chế Tài Khoản Tri Ân. Toàn bộ khoản phí ban đầu được khấu trừ qua các năm không biến mất khỏi hệ thống, mà được ghi nhận vào một tài khoản riêng để tính lãi cam kết, và khoản này sẽ được hoàn trả lại cho khách hàng.

Nói cách khác, phần phí ban đầu không hoàn toàn là một khoản chi ra không quay lại. Nó được "giữ hộ" dưới một hình thức khác, vẫn sinh lãi theo cam kết, và trở về với khách hàng ở một thời điểm nhất định trong hành trình hợp đồng. Đây là lý do khiến việc gọi phí ban đầu là "mất trắng" trở nên thiếu chính xác khi áp dụng cho các sản phẩm thế hệ mới.

## Vì sao điều này quan trọng với người lập kế hoạch tài chính dài hạn

Với những ai quen làm việc với dòng tiền và lãi kép, ba năm đầu tiên của một kênh tích lũy dài hạn mang ý nghĩa đặc biệt. Đó là giai đoạn mà khoản tiền đầu tư cần thời gian dài nhất để tích lũy lợi nhuận, nên tỷ lệ tiền thực sự được đưa vào quỹ đầu tư sớm hay muộn sẽ ảnh hưởng trực tiếp đến hiệu quả cuối chặng đường.

Khi phí ban đầu giảm từ 80-90% xuống còn 30% ngay năm đầu, và tiếp tục giảm nhanh trong các năm kế tiếp, bài toán không còn đơn thuần là "đóng bảo hiểm có lợi hay không", mà trở thành "cấu trúc phí này cho phép dòng tiền làm việc sớm đến mức nào". Đó mới là câu hỏi đúng khi đánh giá một sản phẩm tích lũy dài hạn.

## Nhìn vào bản chất thay vì cảm giác ban đầu

Câu chuyện phí năm đầu, nếu chỉ nhìn qua con số phần trăm đầu tiên, dễ khiến người ta vội kết luận. Nhưng khi đặt trong toàn cảnh: tốc độ giảm phí qua các năm, tỷ lệ tiền vào quỹ đầu tư sớm, và cơ chế hoàn lại qua Tài Khoản Tri Ân, bức tranh trở nên đầy đủ hơn rất nhiều.

Với một kênh tích lũy dài hạn, điều đáng quan tâm không phải là con số phí ở năm đầu tiên trông "xấu" hay "đẹp", mà là tỷ lệ tiền thực tế được đưa vào quỹ đầu tư trong ba năm đầu, và liệu phần phí đã khấu trừ có được ghi nhận, tính lãi và hoàn lại hay không. Đó mới là cách đọc đúng "luật chơi" của một sản phẩm tài chính dài hơi.

## Đúc kết thực tế

- Phí ban đầu của sản phẩm liên kết đơn vị thế hệ mới đã giảm đáng kể so với trước đây, cho phép dòng tiền được đầu tư sớm hơn.
- Cơ chế Tài Khoản Tri Ân giúp phần phí đã khấu trừ không mất đi hoàn toàn mà được tính lãi và hoàn lại cho khách hàng.
- Khi chọn kênh tích lũy dài hạn, nên nhìn vào tỷ lệ tiền vào quỹ đầu tư trong ba năm đầu và cơ chế hoàn phí cuối chặng, thay vì chỉ dừng lại ở con số phí năm đầu tiên.

---

*(*) Lưu ý tham chiếu & cảnh báo rủi ro đầu tư: Cơ cấu phân bổ tỷ lệ phí ban đầu nêu trên được trích dẫn tham chiếu theo Quy tắc & Điều khoản sản phẩm Bảo hiểm Liên kết Đơn vị Xanh Phú Quý Flex đã được Bộ Tài chính phê chuẩn. Bảo hiểm liên kết đơn vị là sản phẩm bảo hiểm kết hợp đầu tư; giá trị tài khoản hợp đồng và kết quả đầu tư thực tế dao động theo thị trường và không được cam kết cố định. Bên mua bảo hiểm chịu các rủi ro đầu tư theo quy định pháp luật và nên tham khảo kỹ Bảng minh họa quyền lợi chính thức do Manulife phát hành trước khi tham gia.*`,
    keyTakeaways: [
      'Phí ban đầu của sản phẩm liên kết đơn vị thế hệ mới đã giảm đáng kể so với trước đây, cho phép dòng tiền được đầu tư sớm hơn.',
      'Cơ chế Tài Khoản Tri Ân giúp phần phí đã khấu trừ không mất đi hoàn toàn mà được tính lãi và hoàn lại cho khách hàng.',
      'Khi chọn kênh tích lũy dài hạn, nên nhìn vào tỷ lệ tiền vào quỹ đầu tư trong ba năm đầu và cơ chế hoàn phí cuối chặng, thay vì chỉ dừng lại ở con số phí năm đầu tiên.',
    ],
  },
  {
    id: 'ba-thang-trang-tay-von-lieng-khong-nam-trong-so-sach',
    index: '06',
    category: 'Phát triển Sự nghiệp',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: false,
    image: '/images/Studio_ChiVanCungDoiNgu_KhoanhKhacVuiVe.jpg',
    imageCaption: 'Khoảnh khắc chân thành cùng các cộng sự thân thiết — minh chứng cho giá trị của sự tử tế và chữ Tín bền lâu.',
    title: 'Ba Tháng Trắng Tay Và Bài Học Về Vốn Liếng Không Nằm Trong Sổ Sách',
    excerpt:
      'Có những giai đoạn sự nghiệp mà mọi nỗ lực dường như không mang lại kết quả gì. Với Vân, đó là ba tháng đầu tiên rời bàn giấy để bước ra làm Sales - những ngày tháng mà bài học lớn nhất lại không đến từ kỹ năng bán hàng, mà từ những gì mình đã gieo từ rất lâu trước đó.',
    content: `*Có những giai đoạn sự nghiệp mà mọi nỗ lực dường như không mang lại kết quả gì. Với Vân, đó là ba tháng đầu tiên rời bàn giấy để bước ra làm Sales - những ngày tháng mà bài học lớn nhất lại không đến từ kỹ năng bán hàng, mà từ những gì mình đã gieo từ rất lâu trước đó.*

## Bước Ra Khỏi Vùng An Toàn

Thời còn làm việc tại ngân hàng ANZ, Vân từng có một vị trí ổn định ở bộ phận hỗ trợ (support). Công việc đều đặn, ít áp lực doanh số, và quan trọng nhất là an toàn. Nhưng đến một lúc nào đó, cảm giác muốn thử thách bản thân lớn hơn nỗi sợ thất bại. Vân quyết định chuyển sang làm Sales vay thế chấp - một lĩnh vực hoàn toàn khác, nơi kết quả được đo đếm bằng những con số cụ thể, không có chỗ cho sự mơ hồ.

Ngày đầu tiên bước vào vai trò mới, Vân mang theo sự hào hứng của người muốn chứng minh năng lực. Nhưng thực tế nhanh chóng dội một gáo nước lạnh.

## Khi Mọi Nỗ Lực Dường Như Vô Nghĩa

Ba tháng đầu tiên, Vân không chốt được một khách hàng nào. Không phải vì thiếu cố gắng, mà vì thế giới Sales vận hành theo những quy luật mà một người mới hoàn toàn chưa nắm được. Áp lực càng lúc càng lớn, đến mức Vân đứng trước nguy cơ bị ngân hàng cắt code - nói cách khác, là bị đào thải khỏi cuộc chơi trước khi kịp bắt đầu.

Đó là một trong những giai đoạn cô đơn nhất trong sự nghiệp. Mỗi buổi sáng thức dậy là một câu hỏi: liệu mình có đang đi sai đường? Liệu quyết định rời khỏi vùng an toàn có phải là một sai lầm?

Nhưng giữa những ngày tháng mờ mịt ấy, một điều bất ngờ đã xảy ra.

## Bước Ngoặt Đến Từ Những Điều Tưởng Như Nhỏ Bé

Những đồng nghiệp cũ ở chi nhánh - những người từng làm việc cùng Vân trong suốt những năm ở vị trí back-office - bắt đầu giới thiệu khách hàng. Không phải vì họ có nghĩa vụ, cũng không phải vì một thỏa thuận nào. Đơn giản là họ thương và tin tưởng.

Nhìn lại, Vân nhận ra: những năm tháng làm công việc hỗ trợ, những lần giúp đỡ đồng nghiệp xử lý hồ sơ, những buổi trò chuyện chân thành, những lần sẵn sàng hỗ trợ dù không phải trách nhiệm của mình - tất cả tưởng như là những việc nhỏ nhặt, không ai ghi nhận, lại trở thành thứ cứu Vân trong thời khắc khó khăn nhất.

Khách hàng đầu tiên đến từ sự giới thiệu ấy đã mở ra một chuỗi kết quả tiếp theo. Và đến năm 2017, Vân đạt vị trí Top 1 doanh số toàn quốc - một hành trình mà nếu nhìn vào ba tháng đầu tiên, không ai có thể đoán trước được.

## Vốn Liếng Thật Sự Không Nằm Trong Kỹ Xảo

Nhiều người nghĩ rằng thành công trong Sales đến từ kỹ năng thuyết phục, từ chiến lược tiếp cận khách hàng, hay từ sự khéo léo trong đàm phán. Những điều đó quan trọng, nhưng với Vân, bài học lớn nhất từ giai đoạn ấy lại khác: uy tín cá nhân - thứ được tích lũy âm thầm qua từng hành động nhỏ, từng mối quan hệ được xây dựng bằng sự chân thành - mới chính là vốn liếng bền vững nhất.

Chẳng có thành quả nào tự nhiên trải hoa hồng. Những hạt mầm tử tế mình gieo ở những việc nhỏ nhất hôm nay, có khi phải rất lâu sau mới nở hoa, nhưng khi cần đến, chúng chính là chiếc phao cứu sinh giúp mình vượt qua những thử thách tưởng chừng không lối thoát.

Giai đoạn chuyển mình nào cũng có vùng tối của nó. Nhưng nếu nhìn kỹ, thứ giúp ta đi qua vùng tối ấy không phải là sự may mắn ngẫu nhiên, mà là những gì ta đã âm thầm xây dựng từ rất lâu trước khi vùng tối ấy xuất hiện.

Mỗi người đều có một "ba tháng trắng tay" của riêng mình - những giai đoạn mà kết quả chưa đến, mà niềm tin bị thử thách. Câu hỏi đặt ra không phải là làm sao để tránh những giai đoạn ấy, mà là: trước khi bước vào vùng tối, mình đã gieo đủ những hạt mầm tử tế để có thể dựa vào khi cần hay chưa?

## Đúc Kết Thực Tế

- Uy tín cá nhân được xây dựng qua năm tháng, không phải qua một vài hành động nhất thời, nhưng lại là thứ bền vững nhất khi đối mặt với khó khăn.
- Những việc tử tế tưởng chừng nhỏ bé, không ai ghi nhận ngay, thường là nền tảng âm thầm cho những bước ngoặt lớn trong sự nghiệp.
- Giai đoạn khó khăn nhất không phải lúc nào cũng cần một giải pháp kỹ thuật, đôi khi điều cần nhất là nhìn lại những mối quan hệ và giá trị mình đã dày công vun đắp.`,
    keyTakeaways: [
      'Uy tín cá nhân được xây dựng qua năm tháng, không phải qua một vài hành động nhất thời, nhưng lại là thứ bền vững nhất khi đối mặt với khó khăn.',
      'Những việc tử tế tưởng chừng nhỏ bé, không ai ghi nhận ngay, thường là nền tảng âm thầm cho những bước ngoặt lớn trong sự nghiệp.',
      'Giai đoạn khó khăn nhất không phải lúc nào cũng cần một giải pháp kỹ thuật, đôi khi điều cần nhất là nhìn lại những mối quan hệ và giá trị mình đã dày công vun đắp.',
    ],
  },
  {
    id: 'chuan-bi-tai-chinh-truoc-khi-buoc-ra-vung-an-toan',
    index: '07',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 10, 2026',
    readTime: '6 phút đọc',
    featured: false,
    image: '/images/Studio_ChiVanCungNuQuanLy_NuCuoiTuoiTan.jpg',
    imageCaption: 'Khánh Vân cùng thế hệ nữ quản lý bản lĩnh bước ra khỏi vùng an toàn công sở để làm chủ sự nghiệp tài chính chuyên nghiệp.',
    title: 'Chuẩn Bị Gì Về Tài Chính Trước Khi Bước Ra Khỏi Vùng An Toàn Công Sở?',
    excerpt:
      'Đầu năm 2018, khi quyết định khép lại 8 năm tại ngân hàng quốc tế ANZ ngay lúc đang ở đỉnh cao Top 1 doanh số toàn quốc, cú rẽ hướng ấy không bắt đầu bằng cảm tính nhất thời mà được nâng đỡ bởi một cấu trúc dòng tiền kỷ luật.',
    content: `*Nhiều anh chị quản lý cấp trung ở ngân hàng hoặc tập đoàn đa quốc gia thường tâm sự với Vân: “Em rất muốn bứt ra để xây dựng sự nghiệp độc lập, nhưng nhìn vào khoản lương cố định hàng tháng và chi phí học hành của con cái, em lại chùn bước.” Thật ra, dũng khí bước ra khỏi vùng an toàn không đến từ sự liều lĩnh, mà đến từ một bảng cân đối tài chính cá nhân được chuẩn bị kỹ lưỡng trước giờ khởi hành.*

## Sự Thật Phía Sau “Chiếc Lồng Sơn Son Thiếp Vàng” Của Thu Nhập Cố Định

Gắn bó với ngân hàng quốc tế ANZ suốt 8 năm (2009–2017), đi từ vị trí Vận hành (Operations) sang Khối Tín dụng Thế chấp (Mortgage) và chạm tay vào danh hiệu **Top 1 Doanh số Toàn quốc**, Vân hiểu rất rõ sức hút của môi trường công sở chuẩn quốc tế. Một mức thu nhập cao đều đặn mỗi tháng, chế độ phúc lợi tốt và danh xưng sang trọng dễ khiến chúng ta tin rằng mình đang ở vùng an toàn tuyệt đối.

Nhưng dưới góc nhìn quản trị rủi ro của một Banker, một cấu trúc tài chính gia đình phụ thuộc 100% vào một nguồn lương cố định duy nhất thực chất lại rất mong manh. Khi thị trường tái cấu trúc, hoặc khi chính chúng ta chạm tới “trần thu nhập” và “trần thời gian” ở tuổi ngoài 30, chiếc áo công sở từng rất vừa vặn bỗng trở nên chật chội.

Năm 2018, khi quyết định chuyển sang Manulife Việt Nam để kiến tạo doanh nghiệp tài chính của riêng mình, Vân không bước đi bằng sự bốc đồng. Trước ngày nộp đơn nghỉ việc, Vân đã dành nhiều tháng để thiết lập 3 lớp đệm tài chính cốt lõi cho gia đình.

## Lớp Đệm Thứ Nhất: Quỹ Dự Phòng Thanh Khoản 6–12 Tháng Chi Phí Thiết Yếu

Sai lầm lớn nhất của nhiều người khi chuyển từ làm công ăn lương sang làm chủ hoặc tư vấn tài chính độc lập là bước đi với tài khoản dự phòng mỏng manh. Khi áp lực cơm áo gạo tiền đè nặng ngay từ tháng thứ hai, thứ ba, người làm nghề rất dễ đánh mất sự điềm tĩnh — dẫn đến tâm lý nôn nóng chốt hợp đồng bằng mọi giá, hoặc bỏ cuộc ngay trước khi kịp hái quả ngọt.

Nguyên tắc bất di bất dịch mà Vân luôn chia sẻ với 64 Quản lý cấp cao (F1) trong hệ thống HCM69 trước khi các bạn toàn tâm chuyển nghề là:
- **Tính toán chính xác định mức chi tiêu thiết yếu (Survival Number):** Bao gồm học phí của con, chi phí sinh hoạt gia đình, phụng dưỡng cha mẹ và các nghĩa vụ trả góp cố định mỗi tháng.
- **Khóa chặt 6 đến 12 tháng chi phí này vào một tài khoản thanh khoản riêng biệt:** Khoản tiền này tuyệt đối không dùng để đầu tư mạo hiểm hay chi tiêu phát sinh.

Khi biết chắc chắn rằng dù 6 tháng đầu ở môi trường mới thu nhập chưa về ngay, bữa cơm của gia đình và nhịp học tập của các con vẫn không mảy may xáo trộn, bạn sẽ có được một thứ vũ khí vô giá: **sự đĩnh đạc và lòng tự trọng nghề nghiệp**. Bạn tư vấn cho khách hàng bằng tâm thế của một chuyên gia muốn trao giải pháp đúng, chứ không phải một người đang cần hoa hồng để trang trải hóa đơn cuối tháng.

## Lớp Đệm Thứ Hai: Tách Bạch Dòng Tiền Gia Đình Và Vốn Đầu Tư Sự Nghiệp

Bước ra xây dựng hệ thống kinh doanh đồng nghĩa với việc bạn phải nhìn nhận bản thân như một doanh nghiệp thu nhỏ. Ở giai đoạn khởi tạo, bạn sẽ cần ngân sách để nâng cấp kiến thức chuyên môn, xây dựng hình ảnh chuyên nghiệp, gặp gỡ đối tác và chăm sóc đội ngũ.

Tại gia đình Vân, ngay từ đầu năm 2018, hai vợ chồng đã ngồi lại cùng nhau với những con số minh bạch:
- **Ngân sách vận hành tổ ấm:** Được bảo toàn nguyên vẹn, không bị xâm phạm bởi bất kỳ hoạt động thử nghiệm kinh doanh nào.
- **Quỹ đầu tư phát triển sự nghiệp mới:** Được trích lập một khoản rõ ràng từ tiền tích lũy cá nhân, có lộ trình hoàn vốn và mục tiêu theo từng quý.

Chính sự rạch ròi và kỷ luật tài chính ấy đã giúp người bạn đời của Vân hoàn toàn an tâm, chuyển từ tâm lý lo lắng tự nhiên sang trở thành hậu phương vững chắc nhất trong suốt hành trình Vân gây dựng khu vực từ con số 0 lên hơn 500 nhân sự.

## Lớp Đệm Thứ Ba: Khóa Chặt Rủi Ro Bằng Bảo Hiểm Trước Khi Rời Phúc Lợi Công Ty

Một chi tiết mà rất nhiều nhân sự cấp cao bỏ quên khi rời tập đoàn lớn: ngay khoảnh khắc bạn bàn giao thẻ nhân viên, gói bảo hiểm sức khỏe và bảo hiểm sinh mạng doanh nghiệp cấp cho bạn cũng chấm dứt hiệu lực.

Trong giai đoạn chuyển giao sự nghiệp — lúc cơ thể và tâm trí làm việc với cường độ cao nhất — gia đình bạn không được phép rơi vào “khoảng trống bảo vệ”. Trước khi rời ngân hàng, hãy đảm bảo bạn đã tự trang bị một cấu trúc bảo hiểm nhân thọ và thẻ chăm sóc y tế độc lập đứng tên chính mình. Đó là chốt chặn giữ cho toàn bộ Quỹ dự phòng thanh khoản của bạn không bị cuốn phăng nếu chẳng may có biến cố sức khỏe bất ngờ.

## Vốn Liếng Lớn Nhất Mang Theo: Chữ “Tín” Của Người Làm Nghề Tử Tế

Sau tất cả những con số trên bảng tính Excel, tài sản lớn nhất giúp một người bước ra khỏi vùng an toàn mà không bị chới với chính là **Vốn Uy Tín (Reputation Capital)** đã tích lũy suốt những năm tháng làm công sở.

Đừng đợi đến ngày nghỉ việc mới bắt đầu xây dựng thương hiệu cá nhân. Cách bạn xử lý trọn vẹn từng hồ sơ tín dụng ở ngân hàng, cách bạn giữ lời hứa với đồng nghiệp và bàn giao công việc chu đáo đến ngày cuối cùng chính là tấm giấy thông hành đắt giá nhất. Khi bạn có một bệ phóng tài chính kỷ luật bên dưới và một chữ “Tín” vẹn nguyên bên trên, bước nhảy ra khỏi vùng an toàn sẽ không còn là một cú rơi tự do, mà là sải cánh vững chãi để chạm tới tự do tài chính thực thụ.`,
    keyTakeaways: [
      'Thiết lập Quỹ dự phòng thanh khoản từ 6–12 tháng chi phí thiết yếu để giữ vững sự đĩnh đạc và chuẩn mực đạo đức nghề nghiệp trong giai đoạn đầu chuyển hướng.',
      'Minh bạch và tách bạch hoàn toàn ngân sách sinh hoạt gia đình với quỹ đầu tư phát triển sự nghiệp mới để tạo sự đồng thuận tuyệt đối từ người bạn đời.',
      'Chủ động trang bị lá chắn bảo hiểm sức khỏe và nhân thọ cá nhân trước khi rời bỏ chế độ phúc lợi của tập đoàn.',
    ],
  },
  {
    id: '3-bieu-hien-cua-nguoi-quan-ly-gioi',
    index: '08',
    category: 'Phát triển Sự nghiệp',
    date: 'Tháng 09, 2026',
    readTime: '6 phút đọc',
    featured: false,
    image: '/images/SuKien_ChiVanCungDoiNguMTA_NangCupHuanLuyen.jpg',
    imageCaption: 'Niềm tự hào lớn nhất của người dẫn dắt: Cùng đội ngũ quản lý kế cận đứng chung trên bục vinh danh Manulife Talent Attractor (MTA).',
    title: 'Ba Phẩm Chất Của Người Quản Lý Dẫn Dắt Bằng Sự Thấu Cảm',
    excerpt:
      'Đồng hành cùng 64 Quản lý cấp cao và hơn 500 nhân sự tại khu vực HCM69, Vân nhận ra thước đo của một nhà lãnh đạo không nằm ở việc tự mình tỏa sáng rực rỡ nhất, mà là năng lực đánh thức thế mạnh độc bản của từng cộng sự.',
    content: `*Khi mới bước từ vị trí ngôi sao bán hàng (Top Sales) lên vai trò quản lý, cái bẫy dễ mắc phải nhất là cố gắng biến tất cả nhân sự dưới quyền thành “bản sao” của chính mình. Nhưng suốt hành trình xây dựng hệ thống từ những viên gạch đầu tiên năm 2018 đến khi vinh dự nhận giải thưởng “Nhà Quản lý Xuất sắc và Đáng tin cậy nhất Châu Á” (2021), Vân thấm thía rằng: quyền lực áp đặt chỉ tạo ra sự tuân phục ngắn hạn, còn sự thấu cảm kết hợp cùng kỷ luật mới kiến tạo nên một tổ chức tự vận hành bền vững.*

## 1. Lắng Nghe Để “Đọc Vị” Và Đặt Đúng Người Vào Đúng Chỗ

Một khu vườn đẹp không thể chỉ trồng một loài hoa, và một đội ngũ hơn 500 con người càng không thể vận hành bằng một công thức rập khuôn. Trong 64 anh chị Quản lý cấp cao (F1) trực tiếp đồng hành cùng Vân tại khu vực HCM69, mỗi người bước vào nghề với một xuất phát điểm và cá tính hoàn toàn khác biệt: có người từng là cán bộ ngân hàng sắc bén về con số, có người là chủ doanh nghiệp quyết đoán, lại có những người mẹ bỉm sữa sở hữu sự dịu dàng và khả năng lắng nghe vô cùng sâu sắc.

Nếu người lãnh đạo chỉ dùng một thước đo duy nhất để phán xét, chúng ta sẽ vô tình làm thui chột tài năng của cộng sự. Lãnh đạo bằng sự thấu cảm bắt đầu từ việc quan sát sâu và lắng nghe không định kiến:
- **Với những nhân sự mạnh về tư duy logic và phân tích:** Vân khuyến khích các bạn đào sâu vào nghiệp vụ hoạch định gia sản, cấu trúc dòng tiền doanh nghiệp và thẩm định điều khoản hợp đồng chuyên sâu.
- **Với những nhân sự giàu cảm xúc và khả năng kết nối:** Vân hướng dẫn các bạn phát triển thế mạnh chăm sóc trải nghiệm khách hàng, tổ chức các buổi trò chuyện bàn tròn ấm cúng và gắn kết đội ngũ.

Khi một nhân sự cảm nhận được người lãnh đạo thực sự thấu hiểu nỗi sợ hãi lẫn khát vọng thầm kín của mình, và được đặt vào đúng vị trí để phát huy sở trường, năng lượng tự thân của họ sẽ bùng nổ mạnh mẽ hơn bất kỳ mệnh lệnh hành chính nào.

## 2. Kỷ Luật Làm Gương: Uy Quyền Đến Từ Sự Nhất Quán Mỗi Ngày

Thấu cảm không có nghĩa là dễ dãi hay thỏa hiệp với sự hời hợt. Trong ngành tài chính – bảo hiểm, sự dễ dãi của người quản lý ngày hôm nay sẽ phải trả giá bằng uy tín của nhân sự và quyền lợi của khách hàng vào ngày mai.

Triết lý điều hành mà Vân theo đuổi là **“Lãnh đạo Phục vụ (Servant Leadership) dựa trên nền tảng Kỷ luật Làm gương”**. Đội ngũ không làm theo những khẩu hiệu treo trên tường phòng họp; họ nhìn vào cách người dẫn đầu hành xử mỗi ngày để định hình tiêu chuẩn cho chính mình:
- **Chuẩn mực trong từng chi tiết nhỏ:** Từ việc có mặt đúng giờ trong các buổi huấn luyện sáng, tác phong trang phục chỉn chu, cho đến sự minh bạch, sòng phẳng trong mọi chính sách thi đua của khu vực.
- **Truyền nghề theo quy trình “4 Bước Thực Chiến”:** Thay vì chỉ giao chỉ tiêu rồi ngồi chờ báo cáo, Vân cùng các Giám đốc/Quản lý cấp cao áp dụng nguyên tắc: *Nói cho nghe — Làm mẫu cho xem — Cùng làm thực tế — Đúc kết và tháo gỡ tại chỗ*.

Chính sự rèn giũa tỉ mỉ và đồng hành sát sao ấy đã giúp khu vực HCM69 đạt được kỳ tích hiếm có trong ngành vào năm 2025: cùng lúc giữ vị trí **Top 1 Toàn quốc về Doanh số (FYP)** và **Top 1 về Tỷ lệ Duy trì Hợp đồng (Persistency)**. Đi nhanh nhưng phải đi cực kỳ chắc chắn — đó là văn hóa được truyền từ người đứng đầu xuống từng tư vấn viên mới vào nghề.

## 3. Lấy Sự Trưởng Thành Của Cộng Sự Làm Thước Đo Thành Tựu

Ở giai đoạn đầu sự nghiệp, niềm vui của Vân là những chiếc cúp cá nhân. Nhưng khi đã đi qua hơn 17 năm trong ngành tài chính, hạnh phúc lớn nhất của Vân lại nằm ở những khoảnh khắc đứng dưới khán đài hoặc đứng cạnh các cộng sự của mình trên sân khấu vinh danh **Manulife Talent Attractor (MTA)**, nhìn thấy những người em, người bạn đồng hành từng rụt rè ngày nào nay tự tin nâng cao chiếc cúp Quản lý xuất sắc.

Một người quản lý thực thụ không bao giờ sợ nhân sự giỏi hơn mình, càng không giữ lại những “bí quyết nghề nghiệp” cho riêng bản thân. Ngược lại, Vân luôn tâm niệm phải đóng gói toàn bộ kiến thức, kinh nghiệm xương máu của mình thành hệ thống quy trình đơn giản, dễ sao chép nhất để trao quyền cho thế hệ kế cận.

Bởi suy cho cùng, di sản lớn nhất của một nhà lãnh đạo không phải là số lượng danh hiệu ghi trên danh thiếp của riêng mình, mà là bao nhiêu cuộc đời, bao nhiêu gia đình của các cộng sự đã thay đổi tốt đẹp hơn, vững vàng hơn nhờ có sự đồng hành của mình trên chặng đường sự nghiệp.`,
    keyTakeaways: [
      'Thấu cảm trong quản trị là lắng nghe sâu để đọc vị đúng thế mạnh độc bản của từng nhân sự, thay vì ép đội ngũ vào một khuôn mẫu rập khuôn.',
      'Kết hợp sự ấm áp của Lãnh đạo Phục vụ (Servant Leadership) với kỷ luật làm gương và quy trình kèm cặp thực chiến 4 bước.',
      'Đo lường thành công của người dẫn đầu bằng số lượng quản lý kế cận trưởng thành, tự chủ và tỏa sáng bền vững.',
    ],
  },
  {
    id: 'can-bang-cong-viec-va-gia-dinh-bo-me-di-lam',
    index: '09',
    category: 'Bố Mẹ Đi Làm',
    date: 'Tháng 09, 2026',
    readTime: '6 phút đọc',
    featured: false,
    image: '/images/GiaDinh_ChiVan_NgoiSofaPhongKhach.jpg',
    imageCaption: 'Tổ ấm bình yên bên người bạn đời tri kỷ và hai con — điểm tựa lớn nhất phía sau hành trình sự nghiệp của Khánh Vân.',
    title: 'Nghệ Thuật “Hiện Diện Trọn Vẹn” Giữa Sự Nghiệp Và Tổ Ấm',
    excerpt:
      'Đầu năm 2018, khi quyết định khép lại 8 năm tại ngân hàng ANZ ngay lúc đang ở đỉnh cao Top 1 doanh số, điều Vân tìm kiếm không chỉ là bứt phá thu nhập mà là quyền làm chủ thời gian — để vừa dẫn dắt sự nghiệp độc lập, vừa có mặt trọn vẹn trong tuổi thơ của hai con.',
    content: `*Phụ nữ ở vị trí quản lý thường đối diện với một nỗi trăn trở vô hình: khi ngồi trong phòng họp lại thấp thỏm nghĩ về bữa tối của con, lúc ngồi bên con lại bận tâm chuyện chỉ tiêu, tin nhắn công việc. Sau nhiều năm đi qua áp lực ấy, Vân nhận ra cân bằng không phải là chia đôi quỹ thời gian 50–50 một cách cơ học, mà là nghệ thuật “Hiện diện trọn vẹn” ở nơi mình đang thuộc về.*

## Bước Ngoặt 2018 Và Khát Khao Làm Chủ Quỹ Thời Gian

Đầu năm 2018, sau 8 năm gắn bó với ngân hàng quốc tế ANZ (2009–2017) và vừa chạm cột mốc Top 1 doanh số thế chấp toàn quốc, Vân đưa ra một quyết định khiến nhiều đồng nghiệp bất ngờ: rời vùng an toàn của môi trường ngân hàng nước ngoài để bắt đầu hành trình độc lập tại Manulife Việt Nam.

Lý do không phải vì công việc cũ không tốt. Ngược lại, ANZ đã rèn cho Vân kỷ luật kiểm soát rủi ro và tư duy quản lý tài sản chuẩn mực. Nhưng ở ngưỡng tuổi 30, khi nhìn vào con gái lớn và con trai nhỏ đang lớn lên từng ngày, Vân nhìn thấy hai giới hạn của con đường làm công ăn lương truyền thống: một là trần thu nhập cố định, và hai là quỹ thời gian bị đóng khung từ sáng sớm đến tối muộn.

Vân khao khát một sự nghiệp mà ở đó mình được làm chủ nhịp điệu làm việc — vừa có thể phát triển hệ thống kinh doanh không giới hạn, vừa chủ động sắp xếp thời gian để không bỏ lỡ những cột mốc trưởng thành quan trọng của các con.

## Thoát Khỏi Cảm Giác “Mắc Nợ Hai Đầu” Bằng Nguyên Tắc Đóng Mở Rõ Ràng

Rất nhiều cha mẹ đi làm rơi vào trạng thái kiệt sức vì luôn cảm thấy mình mắc nợ cả công việc lẫn gia đình. Giải pháp giúp Vân điều hành hệ thống hơn 500 nhân sự và 64 quản lý cấp cao mà vẫn giữ được sự thong dong nằm ở kỷ luật phân bổ thời gian (Time-blocking) và ranh giới tâm trí rõ ràng:

- **Từ 8h30 đến 17h30 — Toàn tâm cho đội ngũ và khách hàng:** Trong khung giờ làm việc, đào tạo F1 hoặc thẩm định hồ sơ gia sản cho khách hàng, Vân dành 100% sự tập trung cao độ, giải quyết dứt điểm từng đầu việc theo thứ tự ưu tiên thay vì để công việc kéo dài lê thê.
- **Khoảnh khắc bước qua cánh cửa nhà — Chủ động gác lại thiết bị:** Khi trở về nhà vào buổi tối, Vân tập thói quen tắt thông báo công việc để thực sự thuộc về gia đình. Đó là giờ phút lắng nghe những câu chuyện nhỏ ở trường của hai chị em, cùng con đọc sách, hay cùng nhau tưới nước cho những chậu cây xanh ngoài ban công.

Trẻ con có một sự nhạy cảm rất kỳ diệu. Các con không đếm bố mẹ ở nhà bao nhiêu tiếng đồng hồ, nhưng các con cảm nhận được ngay ánh mắt và tâm trí của bố mẹ có đang thực sự hướng về mình hay vẫn đang dán vào màn hình điện thoại. Ba mươi phút trò chuyện sâu sắc trước giờ đi ngủ giá trị hơn rất nhiều một buổi tối ngồi cạnh nhau nhưng mỗi người một thế giới riêng.

## Sự Đồng Thuận Của Người Bạn Đời: Biến Tổ Ấm Thành Hậu Phương

Đằng sau danh hiệu Nhà Quản lý Xuất sắc nhất Châu Á (2021) hay những mùa vinh danh Top 1 toàn quốc chưa bao giờ là nỗ lực đơn độc của riêng Vân. Đó là sự thấu hiểu và đồng hành thầm lặng của người chồng tri kỷ — người đã luôn tin tưởng và ủng hộ Vân từ những ngày đầu bước ra khỏi vùng an toàn.

Trong đời sống hôn nhân của những người làm quản lý, sai lầm dễ mắc phải nhất là mang gương mặt căng thẳng về nhà nhưng lại chọn cách im lặng tự gồng gánh. Ngược lại, Vân chọn sự minh bạch và sẻ chia thẳng thắn với chồng:
- **Chia sẻ trước về những giai đoạn cao điểm:** Khi bước vào các tháng chạy chỉ tiêu lớn của vùng hoặc lịch trình sự kiện dày đặc, Vân luôn trao đổi trước để hai vợ chồng chủ động san sẻ lịch đưa đón và đồng hành cùng con.
- **Tôn trọng không gian và cùng chung tầm nhìn tài chính:** Khi người bạn đời hiểu rõ mục tiêu mình đang theo đuổi không chỉ là danh hiệu nghề nghiệp, mà là xây dựng nền tảng tương lai vững chắc cho cả gia đình, tổ ấm sẽ trở thành trạm sạc năng lượng bình yên nhất.

## Khi Công Việc Tử Tế Chính Là Bài Học Sống Động Nhất Dành Cho Con

Nhiều người thường đặt Công việc và Cuộc sống lên hai đầu bàn cân đối lập. Nhưng với Vân, hai mảnh ghép ấy hòa quyện và nâng đỡ lẫn nhau.

Khi các con nhìn thấy bố mẹ làm việc bằng sự tử tế, giữ chữ Tín với từng khách hàng và đồng nghiệp, chính các con cũng đang hấp thụ bài học tự nhiên nhất về lòng tự trọng và tinh thần trách nhiệm. Và ở chiều ngược lại, khi mỗi ngày đi làm Vân giúp hàng trăm gia đình thiết lập quỹ học vấn và lá chắn bảo vệ người trụ cột, Vân càng thấm thía rằng: tình yêu thương dành cho con cái sẽ trọn vẹn nhất khi đi kèm một cơ chế tài chính kỷ luật — để dù cuộc đời có những biến số bất ngờ, hành trình trưởng thành của các con vẫn luôn được bảo toàn nguyên vẹn.`,
    keyTakeaways: [
      'Cân bằng không phải là chia đôi thời gian cơ học, mà là hiện diện trọn vẹn 100% tâm trí ở nơi mình đang thuộc về.',
      'Thiết lập kỷ luật Time-blocking ở văn phòng và chủ động gác lại thiết bị khi về nhà để lắng nghe, kết nối sâu sắc cùng các con.',
      'Trò chuyện minh bạch với người bạn đời về mục tiêu sự nghiệp và chuẩn bị sẵn cấu trúc tài chính dài hạn để giữ trọn sự bình an cho tổ ấm.',
    ],
  },
  {
    id: '3-nguyen-tac-quan-tri-dong-tien-gia-dinh',
    index: '10',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 08, 2026',
    readTime: '6 phút đọc',
    featured: false,
    image: '/images/VanPhong_ChiVanCungDoiNgu_QuyetTamHanhTrinhToaSang.jpg',
    imageCaption: 'Mỗi bộ hợp đồng được hoạch định chuẩn mực là một "đê chắn sóng" bảo vệ nguyên vẹn dòng tiền và tương lai học vấn cho cả gia đình.',
    title: 'Ba Nguyên Tắc Bảo Toàn Dòng Tiền Gia Đình Từ Góc Nhìn Cựu Banker',
    excerpt:
      'Tạo ra thu nhập cao là năng lực kiếm tiền ở hiện tại, nhưng thiết lập cấu trúc "Kiềng 3 chân" để bảo vệ tương lai học vấn của con cái và dòng tiền gia đình trước mọi biến cố mới là bản lĩnh giữ tiền bền vững.',
    content: `*Suốt 8 năm làm việc tại ngân hàng quốc tế ANZ và hơn 8 năm điều hành tại Manulife Việt Nam, Vân đã có dịp trực tiếp thẩm định hàng ngàn hồ sơ tài chính của các gia đình trung lưu và chủ doanh nghiệp. Một nghịch lý khiến Vân trăn trở mãi là: rất nhiều người cực kỳ xuất sắc ở "Tấn công" — tức là kiếm tiền và nhân bản tài sản khi thị trường thuận lợi — nhưng lại gần như bỏ trống hoàn toàn "Hàng phòng thủ" trước những rủi ro sức khỏe và biến cố dòng tiền.*

## Nguyên Tắc 1: Bảo Vệ “Máy In Tiền” Của Gia Đình Và Quỹ Học Vấn Của Con Trước Khi Đầu Tư Mạo Hiểm

Trong bảng cân đối tài sản của một gia đình, đâu là tài sản quý giá nhất? Nhiều người sẽ chỉ vào căn biệt thự đang ở, mảnh đất vùng ven hay danh mục cổ phiếu đang nắm giữ. Nhưng thực chất, mọi khối tài sản đó đều được sinh ra từ một nguồn gốc duy nhất: **Sức khỏe, trí tuệ và khả năng tạo ra dòng tiền đều đặn mỗi ngày của người trụ cột**.

Khi "chiếc máy in tiền" ấy vận hành trơn tru, cả gia đình tận hưởng cuộc sống sung túc. Nhưng nếu chẳng may người trụ cột phải dừng lại đột ngột vì biến cố y tế nghiêm trọng hoặc tai nạn:
- Dòng thu nhập chủ động lập tức đứt gãy về 0, trong khi chi phí sinh hoạt, lãi vay ngân hàng và học phí của con vẫn đều đặn gõ cửa mỗi tháng.
- Gia đình buộc phải bán tháo các tài sản đầu tư (bất động sản, chứng khoán) ngay lúc thị trường thanh khoản kém nhất để lấy tiền mặt chữa bệnh.

Vì vậy, nguyên tắc đầu tiên của một cựu Banker luôn là: **Khóa chặt tầng Đáy của tháp tài sản trước khi xây tầng Đỉnh**. Quỹ học vấn 15–18 năm của các con và Quỹ dự phòng y tế chất lượng cao cho bố mẹ phải được đặt ở vùng an toàn tuyệt đối — tách biệt hoàn toàn với những biến động lên xuống của chu kỳ kinh tế.

## Nguyên Tắc 2: Cấu Trúc “Kiềng 3 Chân” Và Kỷ Luật Phân Bổ “Đúng & Đủ” (10%–15% Thu Nhập)

Một hợp đồng bảo hiểm hay kế hoạch tài chính tốt nhất không phải là hợp đồng đắt đỏ nhất, mà là hợp đồng **được duy trì trọn vẹn đến đúng thời điểm gia đình cần đến nó**. Đó cũng là lý do suốt nhiều năm qua, hệ thống HCM69 của Vân luôn đặt chỉ số **Tỷ lệ Duy trì Hợp đồng (Persistency Top 1 Toàn quốc)** ngang hàng với chỉ số doanh thu.

Để dòng tiền gia đình luôn thông suốt và nhẹ nhàng trong suốt hành trình 15–20 năm, Vân luôn khuyên khách hàng thiết lập mô hình **“Kiềng 3 Chân Tài Chính”**:
- **Chân thứ nhất — Thanh khoản ngắn hạn (Ngân hàng):** Duy trì quỹ tiền gửi tương đương 6–12 tháng chi phí sinh hoạt để xử lý tức thời mọi nhu cầu phát sinh hàng ngày.
- **Chân thứ hai — Đê chắn rủi ro & Kỷ luật hưu trí (Bảo hiểm Nhân thọ & Sức khỏe):** Chỉ trích lập một tỷ lệ vừa vặn từ **10% đến tối đa 15% tổng thu nhập ổn định hàng năm** của gia đình. Khoản 10–15% này không làm ảnh hưởng đến chất lượng sống hiện tại, nhưng ngay lập tức kích hoạt một hạn mức bảo vệ sinh mạng, bệnh lý nghiêm trọng và y tế lớn gấp hàng chục lần số tiền đóng vào.
- **Chân thứ ba — Gia tăng tài sản dài hạn (Đầu tư & Kinh doanh):** Khi đã có Chân thứ nhất và Chân thứ hai bảo vệ tuyệt đối cho tổ ấm, bạn hoàn toàn an tâm dùng 85% dòng tiền còn lại để sinh hoạt và đầu tư sinh lời với tâm thế vững vàng nhất.

## Nguyên Tắc 3: “Khám Sức Khỏe Tài Chính” Định Kỳ Mỗi Năm Một Lần

Một sai lầm rất phổ biến của các gia đình Việt là sau khi ký xong hợp đồng bảo hiểm hoặc lập sổ tiết kiệm thì cất kỹ vào két sắt suốt 5–10 năm không một lần mở ra xem lại.

Thực tế, cuộc sống của mỗi gia đình luôn vận động không ngừng:
- Năm 30 tuổi, bạn mới đón đứa con đầu lòng, thu nhập và trách nhiệm tài chính ở một mức khác.
- Năm 38 tuổi, bạn đón thêm bé thứ hai, chuyển sang ngôi nhà lớn hơn kèm một khoản dư nợ tín dụng mới, hoặc cha mẹ hai bên bắt đầu bước vào tuổi già cần chăm sóc y tế đặc biệt.

Một cấu trúc bảo vệ được thiết kế từ 5 năm trước có thể đã trở nên quá chật so với quy mô tài sản và trách nhiệm hiện tại của bạn. Do đó, nguyên tắc thứ ba mà Vân luôn thực hiện cùng khách hàng của mình là **Rà soát danh mục định kỳ hàng năm (Annual Policy Review)**: kiểm tra lại thông tin người thụ hưởng, cập nhật các quyền lợi y tế thế hệ mới, tối ưu hóa dòng tiền đóng phí và điều chỉnh mệnh giá bảo vệ sao cho luôn khớp với từng nấc thang trưởng thành của gia đình.

Kiếm được nhiều tiền giúp gia đình có một cuộc sống tiện nghi ở hiện tại; nhưng quản trị dòng tiền bằng sự chuẩn mực và kỷ luật mới là chìa khóa giữ cho sự thịnh vượng ấy bình an đi qua mọi giông bão của cuộc đời.`,
    keyTakeaways: [
      'Ưu tiên bảo vệ "máy in tiền" (sức khỏe và thu nhập của người trụ cột) cùng quỹ học vấn của con cái ở vùng an toàn tuyệt đối trước khi đầu tư mạo hiểm.',
      'Vận hành cấu trúc "Kiềng 3 chân" (Ngân hàng – Bảo hiểm – Đầu tư) với nguyên tắc Đúng & Đủ: chỉ phân bổ 10%–15% thu nhập cho lá chắn bảo hiểm để duy trì bền vững 15–20 năm.',
      'Thực hiện rà soát hồ sơ tài chính và hợp đồng bảo hiểm định kỳ mỗi năm một lần để nâng cấp quyền lợi tương xứng với từng giai đoạn phát triển của gia đình.',
    ],
  },
  {
    id: 'ky-luat-phong-tap-va-su-ben-bi',
    index: '11',
    category: 'Kỷ luật Bản thân',
    date: 'Tháng 08, 2026',
    readTime: '6 phút đọc',
    featured: false,
    image: '/images/DoiThuong_ChiVan_PhongTapGym_Ngang.jpg',
    imageCaption: 'Duy trì kỷ luật tập luyện thể lực đều đặn mỗi tuần — nền tảng cho sự minh mẫn, điềm tĩnh và sức bền trong quản trị đường dài.',
    title: 'Kỷ Luật Rèn Luyện Thể Chất Và Bài Học Về Sức Bền Của Người Lãnh Đạo',
    excerpt:
      'Điều hành hệ thống hơn 500 nhân sự và 64 quản lý cấp cao đòi hỏi một nền tảng thể lực dẻo dai. Với Vân, phòng tập, khu vườn xanh và quản trị tài chính đều vận hành theo chung một quy luật: mọi thành quả vững chãi đều được kiến tạo từ những thói quen kỷ luật lặp lại mỗi ngày.',
    content: `*Nhiều bạn bè và cộng sự thường hỏi Vân: “Làm thế nào để luôn giữ được nguồn năng lượng tích cực và sự điềm tĩnh khi vừa trực tiếp điều hành vùng kinh doanh hơn 500 nhân sự, vừa cố vấn cho khách hàng và chăm sóc gia đình?”. Câu trả lời của Vân không nằm ở những kỹ thuật quản trị phức tạp, mà bắt đầu từ những giờ tập luyện đổ mồ hôi đều đặn mỗi tuần.*

## Quy Luật Chung Giữa Phòng Tập Và Quản Trị: Sức Mạnh Của Sự Lặp Lại

Cường độ làm việc của một Giám đốc Vùng với các lịch trình đào tạo, họp chiến lược cùng các quản lý F1 và hoạch định gia sản đòi hỏi một nền tảng thể lực thực sự bền bỉ. Một tư duy sắc bén và khả năng ra quyết định sáng suốt không thể tồn tại lâu dài trong một cơ thể mệt mỏi.

Nhưng hơn cả câu chuyện vóc dáng hay thể lực, phòng tập là nơi rèn luyện tính kỷ luật tự giác khắt khe nhất:
- **Không có thành quả nào được tạo ra sau một đêm:** Bạn không thể nâng mức tạ nặng hay có một cơ thể dẻo dai chỉ sau một vài buổi tập đầy hứng khởi. Sự thay đổi chỉ đến khi bạn kiên trì lặp lại các bài tập đúng kỹ thuật ngay cả vào những buổi sáng cơ thể uể oải nhất và không có ai đứng cạnh giám sát.
- **Chiến thắng sự trì hoãn của chính mình:** Mỗi lần xỏ giày bước vào phòng tập sau một ngày làm việc căng thẳng là một lần rèn luyện bản lĩnh vượt qua sự dễ dãi của bản thân.

Trong quản trị đội ngũ và tích lũy tài sản cũng hoàn toàn tương tự. Thành tựu Top 1 toàn quốc không đến từ những cú bứt phá ngẫu hứng ngắn hạn, mà là kết quả tất yếu của những thói quen chuẩn mực được duy trì bền bỉ từ ngày này qua tháng khác.

## Từ “Ba Tháng Trắng Tay” Đến Đỉnh Cao: Sức Bền Tâm Lý Bắt Nguồn Từ Thể Lực

Nhìn lại gần hai thập kỷ làm nghề, từ những ngày đầu chuyển sang bộ phận kinh doanh tại ngân hàng ANZ với 3 tháng liên tiếp không có nổi một khách hàng, cho đến giai đoạn dẫn dắt hệ thống vượt qua đại dịch năm 2021 để chạm tới giải thưởng Nhà Quản lý Xuất sắc nhất Châu Á, bài học lớn nhất của Vân là: **Người đi xa nhất không phải người chạy nhanh nhất ở vạch xuất phát, mà là người có sức bền tốt nhất để không bỏ cuộc giữa chừng.**

Khi cơ thể khỏe mạnh và nhịp sinh học được làm chủ, cách chúng ta đối diện với áp lực cũng thay đổi hoàn toàn. Đứng trước một biến động của thị trường hay một bài toán nhân sự khó, một người lãnh đạo có nền tảng thể chất tốt sẽ giữ được nhịp thở điềm tĩnh, không hoảng loạn và không truyền sự căng thẳng sang tập thể. Như câu nói mà Vân luôn giữ làm kim chỉ nam suốt nhiều năm qua: *“Cứ đi rồi sẽ đến, chỉ cần hướng về mặt trời”*.

## Bài Học Từ Khu Vườn Nhỏ: Giai Đoạn Đâm Rễ Âm Thầm Trước Khi Vươn Cao

Ngoài những giờ rèn luyện trong phòng tập, một thói quen tĩnh lặng khác giúp Vân cân bằng năng lượng ở tuổi U40 là tự tay trồng cây và chăm sóc khu vườn nhỏ ngoài ban công.

Trồng cây dạy cho người làm tài chính sự kiên nhẫn trước quy luật của tự nhiên:
- Có những giai đoạn suốt nhiều tháng liền, nhìn bề ngoài cái cây gần như không cao thêm một centimet nào. Nhưng thực chất, nó không hề ngừng lớn — nó đang dồn toàn bộ nhựa sống xuống lòng đất để đâm bộ rễ thật sâu và thật chắc.
- Chỉ khi bộ rễ dưới lòng đất đã đủ vững vàng, cây mới bắt đầu vươn cành lá xanh tốt và đủ sức đứng vững trước những cơn mưa bão lớn.

Rèn luyện thể lực, xây dựng uy tín nghề nghiệp hay tích lũy tài chính dài hạn cho gia đình đều cần một “giai đoạn đâm rễ” âm thầm như thế. Đừng sốt ruột khi những tháng đầu tập luyện hay những năm đầu tích lũy chưa thấy kết quả nhảy vọt. Chính sự kiên định trong giai đoạn âm thầm ấy mới là thứ quyết định độ bền vững của cả chục năm sau.

## Hai Mặt Của Sự Chủ Động: Rèn Luyện Cơ Thể Và Khóa Chặt Rủi Ro Y Tế

Đứng ở góc nhìn của một người làm quản trị rủi ro, Vân luôn tâm niệm sức khỏe là con số 1 đứng đầu, còn tài sản, sự nghiệp hay những chuyến du lịch trải nghiệm thế giới là những con số 0 đứng sau. Có số 1 thì những số 0 mới mang đầy đủ ý nghĩa.

Vì vậy, thương bản thân và bảo vệ sức khỏe một cách trí tuệ luôn cần hai mặt song hành như hai cánh của một chú chim:
- **Mặt thứ nhất là chủ động rèn luyện mỗi ngày:** Tập thể dục đều đặn, ăn uống lành mạnh và giữ tâm trí an nhiên để cơ thể luôn dẻo dai, giảm thiểu tối đa xác suất bệnh tật.
- **Mặt thứ hai là chủ động chuẩn bị quỹ dự phòng y tế từ lúc đang khỏe mạnh:** Bởi dù ta có kỷ luật đến đâu, cuộc sống vẫn luôn tồn tại những rủi ro y tế khách quan không báo trước. Chuẩn bị sẵn thẻ chăm sóc sức khỏe và quỹ dự phòng bệnh lý nghiêm trọng chính là cách khóa chặt rủi ro tài chính, để nếu biến cố xảy ra, gia đình được tiếp cận điều trị y tế tốt nhất mà không bao giờ phải chạm vào khoản tích lũy tương lai của các con.

Suy cho cùng, tập thể dục mỗi ngày là để cơ thể khỏe mạnh, còn thiết lập sẵn một lớp đệm dự phòng y tế từ sớm là để tâm trí luôn được thảnh thơi và bình an.`,
    keyTakeaways: [
      'Thể lực bền bỉ và nhịp sinh học kỷ luật là nền tảng giúp người lãnh đạo giữ được sự minh mẫn, điềm tĩnh trước mọi áp lực.',
      'Thể thao, trồng cây và quản trị gia sản đều có chung quy luật: cần giai đoạn kiên trì bám rễ âm thầm trước khi hái quả ngọt dài hạn.',
      'Chăm sóc sức khỏe toàn diện gồm hai vế không tách rời: rèn luyện thể chất mỗi ngày và chuẩn bị sẵn quỹ dự phòng y tế ngay từ lúc đang khỏe mạnh.',
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
    title: 'Good to Great — Từ Tốt Đến Vĩ Đại',
    author: 'Jim Collins',
    theme: 'Triết lý Lãnh đạo',
    cover: '/images/books/book_01_good_to_great.jpg',
    note: 'Hình mẫu “Lãnh đạo Cấp độ 5” — sự kết hợp giữa lòng khiêm nhường cá nhân và ý chí chuyên nghiệp kiên định, bắt đầu từ nguyên tắc “Ai trước, cái gì sau”.',
    reflection: 'Khi kiến tạo đội ngũ, bài học lớn nhất Vân mang theo từ Jim Collins là không vội mở rộng số lượng, mà chọn đúng những cộng sự có chung chữ “Tín” và sự tử tế.',
  },
  {
    num: '02',
    title: 'The Psychology of Money — Tâm Lý Học Về Tiền',
    author: 'Morgan Housel',
    theme: 'Quản trị Gia sản',
    cover: '/images/books/book_02_psychology_of_money.jpg',
    note: 'Sự thịnh vượng bền vững không nằm ở những công thức phức tạp, mà ở kỷ luật kiểm soát hành vi và luôn giữ một biên độ an toàn dự phòng cho gia đình.',
    reflection: 'Gần hai thập kỷ làm việc với dòng tiền từ ANZ đến Manulife củng cố trong Vân một nguyên tắc: quản trị gia sản là để gia đình không bao giờ bị động khi biến cố xảy ra.',
  },
  {
    num: '03',
    title: 'Atomic Habits — Thay Đổi Tí Hon, Hiệu Quả Bất Ngờ',
    author: 'James Clear',
    theme: 'Kỷ luật Thói quen',
    cover: '/images/books/book_03_atomic_habits.jpg',
    note: 'Cốt lõi của phương châm “Đi chắc để đi xa”: mọi thành quả lớn đều bắt nguồn từ những thói quen chuẩn mực được lặp lại kiên trì mỗi ngày.',
    reflection: 'Ba tháng đầu làm Sales mà chưa có khách nào cũng không làm Vân nản lòng, bởi thành quả Top 1 toàn quốc là kết quả của những việc nhỏ được làm chỉn chu mỗi ngày.',
  },
  {
    num: '04',
    title: 'Servant Leadership — Phụng Sự Để Dẫn Đầu',
    author: 'Robert K. Greenleaf',
    theme: 'Tâm thức Phụng sự',
    cover: '/images/books/book_04_servant_leadership.jpg',
    note: 'Lãnh đạo đích thực không bắt đầu bằng mong muốn quyền lực, mà bắt nguồn từ khát khao tự nhiên muốn được chăm sóc, nâng đỡ và phụng sự người khác.',
    reflection: 'Sự trưởng thành của 64 nhà quản lý F1 hôm nay cho Vân thấy: mình chỉ thực sự dẫn đầu khi giúp những người đi cùng chạm tới thành công của riêng họ.',
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
    if (pushHistory && typeof window !== 'undefined') {
      const newUrl = `${window.location.origin}/?article=${encodeURIComponent(article.id)}`;
      window.history.pushState({ articleId: article.id }, '', newUrl);
    }
    updateMetaTags(
      `${article.title} — Khánh Vân`,
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
      'Khánh Vân — Giám đốc Vùng Cấp cao',
      'Khánh Vân — Giám đốc Vùng Cấp cao tại Manulife Việt Nam, Nhà Quản lý Xuất sắc nhất Châu Á (2021), cựu Quản lý Tài sản ANZ Bank.',
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
    if (pushHistory && typeof window !== 'undefined') {
      const newUrl = `${window.location.origin}/?video=${encodeURIComponent(video.id)}`;
      window.history.pushState({ videoId: video.id }, '', newUrl);
    }
    updateMetaTags(`${video.title} — Video Khánh Vân`, video.summary);
  }, []);

  const closeVideo = useCallback((pushHistory = true) => {
    setActiveVideo(null);
    if (pushHistory && typeof window !== 'undefined') {
      const cleanUrl = `${window.location.origin}/#thu-vien-video`;
      window.history.pushState({}, '', cleanUrl);
    }
    updateMetaTags(
      'Khánh Vân — Giám đốc Vùng Cấp cao',
      'Khánh Vân — Giám đốc Vùng Cấp cao tại Manulife Việt Nam, Nhà Quản lý Xuất sắc nhất Châu Á (2021), cựu Quản lý Tài sản ANZ Bank.',
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
      headline: 'Rookie Insurance Agency Leader of the Year 2021 - Nguyen Thi Van',
      summary: 'Bài vinh danh chính thức từ Hội đồng Giám khảo Quốc tế, ghi nhận năng lực lãnh đạo và những đóng góp trong việc nâng cao nhận thức cộng đồng.',
      url: 'https://www.asiaadvisersnetwork.com/Article/aid/77267/Rookie-Insurance-Agency-Leader-of-the-Year-2021-Nguyen-Thi-Van',
    },
    {
      source: 'VietNamNet',
      logo: '/images/logos/logo_vietnamnet.svg',
      logoAlt: 'Báo VietNamNet Logo',
      logoClass: 'h-7 sm:h-8',
      sourceType: 'Báo VietNamNet • Chuyên đề Banker',
      badge: 'Từ Banker sang Bảo hiểm',
      headline: 'Từ ngân hàng đến bảo hiểm: Khi những banker chọn rẽ hướng - Biến sự chỉn chu thành lợi thế dẫn dắt',
      summary: 'Khánh Vân chia sẻ cách chị mang tư duy hệ thống và kỷ luật vận hành từ 8 năm ở ANZ Bank vào việc xây dựng sự nghiệp bảo hiểm bền vững.',
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
      summary: 'Vinh danh bà Nguyễn Thị Vân - Trưởng khu vực kinh doanh HCM12 đoạt giải thưởng Rookie Insurance Agency Leader of the Year 2021.',
      url: 'https://vietnamnet.vn/dai-ly-manulife-viet-nam-nhan-danh-hieu-nha-quan-ly-moi-cua-nam-755155.html',
    },
  ];

  const metrics = [
    { figure: '08+', unit: 'Năm tại ANZ Bank', detail: 'Quản lý tài sản và tín dụng quốc tế' },
    { figure: 'Top 1', unit: 'Toàn quốc ANZ', detail: 'Dẫn đầu doanh số thế chấp năm 2017' },
    { figure: 'Top 1', unit: 'Lãnh đạo Châu Á', detail: 'Asia Trusted Awards Winner 2021' },
    { figure: '64', unit: 'Quản lý cấp cao', detail: 'Đội ngũ lãnh đạo kế cận trực tiếp dẫn dắt' },
    { figure: '500+', unit: 'Nhân sự hệ thống', detail: 'Vận hành chuẩn mực và gắn kết' },
    { figure: '2 × Top 1', unit: 'FYP & Duy trì 2025', detail: 'Dẫn đầu cả doanh số lẫn tỷ lệ duy trì hợp đồng' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#181F1C]">
      {/* 1. MINIMALIST EDITORIAL HEADER */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FAF9F5]/92 backdrop-blur-md border-b border-[#E4E1D8] py-2.5 sm:py-4'
            : 'bg-[#FAF9F5] border-b border-[#E4E1D8]/60 py-2.5 sm:py-6'
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

          <div className="hidden sm:flex items-center gap-5 shrink-0">
            <a
              href="#lien-he"
              className="whitespace-nowrap inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#0A3622] border-b border-[#0A3622] pb-1 hover:text-[#008746] hover:border-[#008746] transition-colors font-medium"
            >
              <span>Liên hệ riêng</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#181F1C] min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2"
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
              <div className="px-6 py-6 flex flex-col gap-2">
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
              src: '/images/ChanDung_ChiVan_VestXanhNgoc_TrietLyNghe_Panorama.jpg',
              fig: 'CHÂN DUNG & TRIẾT LÝ NGHỀ',
              title: 'Nguyễn Thị Vân — Đi chắc để đi xa, đồng hành bằng cả trái tim',
              subtitle:
                'Chân dung chị Nguyễn Thị Vân, Giám đốc Vùng Cấp cao Manulife Việt Nam, cùng triết lý làm nghề của chị.',
            })
          }
          className="cursor-zoom-in group relative block w-full"
        >
          <div className="w-full aspect-[4/3] sm:aspect-[820/312] overflow-hidden relative">
            <picture>
              <source
                media="(min-width: 640px)"
                srcSet="/images/ChanDung_ChiVan_VestXanhNgoc_TrietLyNghe_Panorama.jpg"
              />
              <img
                src="/images/ChanDung_ChiVan_VestXanhNgoc_TrietLyNghe_Mobile.jpg"
                alt="Khánh Vân — Đi chắc để đi xa. Làm nghề bằng sự chuẩn mực, đồng hành bằng cả trái tim."
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
                <span className="w-4 sm:w-5 h-[1px] bg-[#008746] shrink-0" />
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
                    &ldquo;Kiến tạo tốc độ từ sự chuẩn mực &mdash; Giữ trọn chữ Tín trên mọi hành trình dài hạn.&rdquo;
                  </p>
                </div>
              </div>

              <p className="text-[15px] sm:text-base text-[#38433E] leading-[1.8] font-normal">
                Gần hai thập kỷ làm nghề: 8 năm quản lý tài sản tại ngân hàng quốc tế ANZ, sau đó là danh hiệu Nhà Quản lý Xuất sắc nhất Châu Á (2021) và nhiều năm liền giữ vị trí Top 1 tại Manulife Việt Nam. Hiện nay, Vân đồng hành cùng các gia đình Việt trong việc giữ vững dòng tiền và hoạch định gia sản dài hạn, đồng thời trực tiếp dẫn dắt 64 nhà quản lý kế cận và hơn 500 tư vấn viên.
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
                  <span>Hành trình sự nghiệp</span>
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
                  <img
                    src="/images/VanPhong_ChiVanCungTapThe_AnhSangTuNhien.jpg"
                    alt="Khánh Vân cùng đội ngũ quản lý tinh hoa Manulife Việt Nam"
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
                    64 quản lý &middot; 500+ nhân sự
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
                Báo chí nói về chị Vân
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#0A3622] font-normal tracking-tight">
                Được báo chí trong nước và quốc tế đưa tin
              </h2>
            </div>
            <p className="text-xs text-[#56605B] max-w-md font-normal leading-relaxed">
              Những bài viết về cách chị làm nghề, cách dẫn dắt đội ngũ và giải thưởng lãnh đạo cấp khu vực Châu Á.
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
                      <img
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
                01 / HÀNH TRÌNH SỰ NGHIỆP
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#181F1C] leading-[1.15]">
                Từ ngân hàng quốc tế đến đỉnh cao Châu Á
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="font-serif italic text-xl sm:text-[26px] text-[#181F1C] leading-[1.5]">
                “Làm thật tốt từ những việc nhỏ nhất mỗi ngày. Khi mình đủ chân thành và chuẩn mực, những người đồng hành tử tế sẽ tự tìm đến.”
              </p>
            </div>
          </div>

          {/* Chapter I */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-28 lg:mb-36">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#858E89] block">
                CHƯƠNG I &mdash; 2009 ĐẾN 2017
              </span>
              <h3 className="font-sans font-semibold text-2xl sm:text-[28px] text-[#181F1C] leading-[1.3] tracking-tight">
                Nền tảng ANZ Bank và bài học về chữ “Tín”
              </h3>
              <p className="text-[15px] text-[#28322D] leading-[1.85] font-normal">
                Trước khi vươn lên vị trí Top 1 Toàn Quốc ANZ năm 2017 mảng Tín dụng &amp; Thế chấp mua nhà, Khánh Vân từng trải qua 3 tháng đầu tiên chuyển sang bộ phận kinh doanh mà không có nổi một khách hàng, đứng trước nguy cơ bị cắt mã số.
              </p>
              <p className="text-[15px] text-[#28322D] leading-[1.85] font-normal">
                Không chọn cách bán hàng bất chấp, chính uy tín, sự cẩn trọng và tận tâm suốt những năm làm Vận hành (Operations) trước đó đã khiến đồng nghiệp và đối tác chủ động giới thiệu khách hàng cho chị. Bài học về sức mạnh của sự tử tế trở thành kim chỉ nam xuyên suốt sự nghiệp của Vân.
              </p>
            </div>

            <div className="lg:col-span-7">
              <figure
                onClick={() =>
                  setLightbox({
                    src: '/images/VanPhong_ChiVan_HuongDanDoiNguBanHop.jpg',
                    fig: 'TÁC PHONG LÀM VIỆC',
                    title: 'Tác phong chuẩn mực tại bàn họp',
                    subtitle: 'Bài học từ 8 năm làm ngân hàng quốc tế: Lấy uy tín và sự cẩn trọng làm nền tảng.',
                  })
                }
                className="cursor-zoom-in group"
              >
                <div className="overflow-hidden aspect-[16/10] bg-[#EAE7DF] rounded-[3px] shadow-sm">
                  <img
                    src="/images/VanPhong_ChiVan_HuongDanDoiNguBanHop.jpg"
                    alt="Khánh Vân hướng dẫn đội ngũ bên bàn họp chiến lược"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                  />
                </div>
                <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                  Tác phong chuẩn mực và bài học về chữ “Tín” từ nền tảng banker
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
                      subtitle: 'Dẫn đầu toàn quốc về mức độ hoàn thành chỉ tiêu doanh số khai thác mới tại Manulife Việt Nam.',
                    })
                  }
                  className="cursor-zoom-in group"
                >
                  <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[3px] shadow-sm">
                    <img
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
                      subtitle: 'Dấu ấn của chất lượng tư vấn và niềm tin lâu dài từ khách hàng.',
                    })
                  }
                  className="cursor-zoom-in group"
                >
                  <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[3px] shadow-sm">
                    <img
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
                  CHƯƠNG II &mdash; 2018 ĐẾN 2025
                </span>
                <h3 className="font-sans font-semibold text-2xl sm:text-[28px] text-[#181F1C] leading-[1.3] tracking-tight">
                  Năm 2025: dẫn đầu cả chỉ tiêu FYP lẫn tỷ lệ duy trì
                </h3>
                <p className="text-[15px] text-[#28322D] leading-[1.85] font-normal">
                  Năm 2018, chị rời ngân hàng nước ngoài để xây dựng sự nghiệp độc lập tại Manulife Việt Nam, mang theo kỷ luật kiểm soát rủi ro của một banker: tư vấn đúng và đủ, coi sự gắn bó lâu dài của khách hàng là danh dự nghề nghiệp.
                </p>
                <p className="text-[15px] text-[#28322D] leading-[1.85] font-normal">
                  Năm 2025, chị cùng hệ thống đạt hai vị trí dẫn đầu toàn quốc: <strong className="font-semibold text-[#0A3622]">Top 1 DRD+ hoàn thành chỉ tiêu doanh số mới (FYP)</strong> và <strong className="font-semibold text-[#0A3622]">Top 1 DRD+ tỷ lệ duy trì hợp đồng năm 2</strong>. Với Vân, đó là minh chứng rằng tăng trưởng bền vững luôn bắt đầu từ sự chuẩn mực và chữ Tín.
                </p>
              </div>
            </div>

            {/* Right Column: Chapter III Text + Vertical Trophy Portrait */}
            <div className="lg:col-span-5 lg:col-start-8 space-y-12">
              <div className="space-y-5">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#008746] block">
                  CHƯƠNG III &mdash; 2018 ĐẾN NAY
                </span>
                <h3 className="font-sans font-semibold text-2xl sm:text-[28px] text-[#181F1C] leading-[1.3] tracking-tight">
                  Nhà Quản lý Xuất sắc nhất Châu Á và hệ thống hơn 500 nhân sự
                </h3>
                <p className="text-[15px] text-[#28322D] leading-[1.85] font-normal">
                  Năm 2021, chị trở thành đại diện duy nhất tại Việt Nam đoạt giải thưởng “Nhà Quản lý Xuất sắc nhất Châu Á” (Asia Trusted Life Agent &amp; Advisers Awards), đồng thời trực tiếp ươm mầm 64 Quản lý cấp cao và hơn 500 cộng sự.
                </p>
              </div>

              <figure
                onClick={() =>
                  setLightbox({
                    src: '/images/SuKien_ChiVanCungCEOvaCAO_ChupAnhTiecToi.jpg',
                    fig: 'GẶP GỠ BAN ĐIỀU HÀNH',
                    title: 'Gặp gỡ Tổng Giám đốc (CEO) và Phó Tổng Giám đốc Điều hành Kênh Đại lý (CAO) Manulife',
                    subtitle: 'Khoảnh khắc cùng lãnh đạo cấp cao của Manulife Việt Nam trong buổi tiệc tối.',
                  })
                }
                className="cursor-zoom-in group"
              >
                <div className="overflow-hidden aspect-[3/4] bg-[#EAE7DF] rounded-[3px] shadow-sm">
                  <img
                    src="/images/SuKien_ChiVanCungCEOvaCAO_ChupAnhTiecToi.jpg"
                    alt="Chị Khánh Vân cùng Tổng Giám Đốc và Phó Tổng Giám Đốc Điều Hành Kênh Đại Lý Manulife Việt Nam trong tiệc tối thân mật"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                  />
                </div>
                <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                  Gặp gỡ Tổng Giám đốc (CEO) và Phó Tổng Giám đốc Điều hành Kênh Đại lý (CAO) Manulife
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
                Chia sẻ về tài chính, quản trị và cuộc sống
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
                          <img
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
                Tủ sách gối đầu giường của chị Vân
              </h2>
            </div>
            <p className="text-xs sm:text-[13.5px] text-[#56605B] font-normal leading-[1.7] max-w-md">
              4 cuốn sách đã định hình cách Khánh Vân quản trị rủi ro, giữ kỷ luật thói quen và dẫn dắt đội ngũ bằng tinh thần phụng sự.
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
                  <img
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
                05 / ĐIỂM TỰA CUỘC SỐNG
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#181F1C] leading-[1.15]">
                Người phụ nữ trong gia đình và sự cân bằng
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 space-y-4">
              <div className="border-l-2 border-l-[#008746] pl-5 sm:pl-6 space-y-3">
                <p className="font-serif italic text-xl sm:text-2xl text-[#181F1C] leading-[1.5]">
                  “Đỉnh cao sự nghiệp không nằm ở những chiếc cúp, mà là sự bình an khi trở về nhà bên chồng và hai con.”
                </p>
                <p className="text-sm sm:text-[15px] text-[#28322D] font-normal leading-[1.85]">
                  Phía sau những cột mốc dẫn đầu Châu Á là sự thấu hiểu và đồng hành thầm lặng của người chồng — người luôn ủng hộ chị bước ra khỏi vùng an toàn để sống trọn với đam mê.
                </p>
              </div>

              {/* Quan điểm nuôi dạy con */}
              <div className="pl-5 sm:pl-6 pt-2 space-y-3">
                <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#008746] font-medium block">
                  Cách Vân nuôi dạy con
                </span>
                <p className="text-sm sm:text-[15px] text-[#28322D] font-normal leading-[1.85]">
                  Với hai con — Minh Châu đang học lớp 7 và bé út học lớp 1 — Vân chọn cách đồng hành thay vì áp đặt. Các con vẫn được kèm cặp và rèn nề nếp, nhưng được tự do phát triển theo đam mê, sở thích của mình. Việc của cha mẹ là cùng con tìm ra thế mạnh riêng, rồi tiếp sức để con đi xa nhất trên con đường ấy.
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
                  subtitle: 'Điểm tựa tinh thần lớn nhất phía sau hành trình sự nghiệp.',
                })
              }
              className="lg:col-span-7 cursor-zoom-in group"
            >
              <div className="overflow-hidden h-[260px] sm:h-[420px] lg:h-[460px] bg-[#EAE7DF] rounded-[4px]">
                <img
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
                  title: 'Trọn vẹn từng khoảnh khắc bên con',
                  subtitle: 'Kèm cặp có nề nếp, nhưng luôn để con được lớn lên theo đam mê và thế mạnh của riêng mình.',
                })
              }
              className="lg:col-span-5 cursor-zoom-in group"
            >
              <div className="overflow-hidden h-[260px] sm:h-[420px] lg:h-[460px] bg-[#EAE7DF] rounded-[4px]">
                <img
                  src="/images/GiaDinh_ChiVan_AuYemConBenSanVuon.jpg"
                  alt="Gia đình chị Khánh Vân bên sân vườn"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3 pt-2.5 sm:mt-3.5 sm:pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                Khoảnh khắc yêu thương ngày thường
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
              src: '/images/DuLich_ChiVan_BayKhinhKhiCauBinhMinh_Panorama.jpg',
              fig: 'BÌNH MINH CAPPADOCIA',
              title: 'Đón bình minh trên khinh khí cầu',
              subtitle:
                'Khoảnh khắc đón bình minh trên khinh khí cầu tại thung lũng Cappadocia — “Mỗi ngày mới là một hành trình đáng trân trọng. Cứ đi chắc từng bước, bình minh sẽ luôn ở phía trước.”',
            })
          }
          className="cursor-zoom-in group relative block w-full"
        >
          <div className="w-full aspect-[4/3] sm:aspect-[820/312] overflow-hidden relative">
            <picture>
              <source
                media="(min-width: 640px)"
                srcSet="/images/DuLich_ChiVan_BayKhinhKhiCauBinhMinh_Panorama.jpg"
              />
              <img
                src="/images/DuLich_ChiVan_BayKhinhKhiCauBinhMinh_Mobile.jpg"
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
                  subtitle: 'Duy trì nguồn năng lượng dẻo dai thông qua luyện tập mỗi tuần.',
                })
              }
              className="lg:col-span-5 cursor-zoom-in group"
            >
              <div className="overflow-hidden h-[290px] sm:h-[440px] lg:h-[500px] bg-[#EAE7DF] rounded-[4px]">
                <img
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
                  title: 'Đồng hành cùng người bạn đời',
                  subtitle: 'Sánh bước bên nhau trên mọi hành trình trong và ngoài nước.',
                })
              }
              className="lg:col-span-7 cursor-zoom-in group"
            >
              <div className="overflow-hidden h-[290px] sm:h-[440px] lg:h-[500px] bg-[#EAE7DF] rounded-[4px]">
                <img
                  src="/images/DuLich_ChiVanCungChong_ChupAnhBenCangBien.jpg"
                  alt="Chị Khánh Vân cùng chồng du lịch quốc tế"
                  className="w-full h-full object-cover object-[50%_68%] group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3 pt-2.5 sm:mt-3.5 sm:pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                Người bạn đời luôn đồng hành
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
              Dù bạn là chủ gia đình muốn chuyển giao tài sản một cách yên tâm, một chuyên viên tài chính muốn bứt phá trong sự nghiệp, hay một tổ chức đang tìm diễn giả truyền cảm hứng — Khánh Vân sẵn sàng đồng hành với sự chuẩn mực và tận tâm.
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
                  Thiết kế lộ trình tích lũy tài sản dài hạn đến 99 tuổi, với khung pháp lý rõ ràng để gia sản được trao lại êm thấm giữa các thế hệ, không để tranh chấp làm tổn thương tình thân.
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
                  Chương trình kèm cặp 1-1 trực tiếp cùng Khánh Vân, chia sẻ toàn bộ quy trình vận hành và cách xây dựng một hệ thống kinh doanh độc lập theo chuẩn Top 1 Châu Á.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-[#EAE7DF] text-xs text-[#28322D] font-normal">
                  <div className="flex items-start gap-2">
                    <span className="text-[#008746] font-bold">&bull;</span>
                    <span>Lộ trình 90 ngày chuyển từ bàn giấy ngân hàng sang thị trường một cách an toàn.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#008746] font-bold">&bull;</span>
                    <span>Phương pháp tuyển dụng, đào tạo và giữ chân một đội ngũ gắn kết.</span>
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
                  Chia sẻ thực tế tại hội nghị, hội thảo lãnh đạo và chương trình đào tạo nội bộ về bán hàng bằng sự tử tế, văn hóa dịch vụ chuẩn mực và lãnh đạo thấu cảm.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-[#EAE7DF] text-xs text-[#28322D] font-normal">
                  <div className="flex items-start gap-2">
                    <span className="text-[#008746] font-bold">&bull;</span>
                    <span>Diễn giả chính tại các sự kiện tài chính, ngân hàng và tuyển dụng.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#008746] font-bold">&bull;</span>
                    <span>Workshop truyền cảm hứng về vượt giới hạn và xây dựng kỷ luật bền bỉ.</span>
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
                <img
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
                  subtitle: 'Niềm tự hào khi đồng hành cùng cộng sự vươn lên vị trí Quản lý (SM).',
                })
              }
              className="cursor-zoom-in group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[5px] sm:rounded-[6px] ring-1 ring-inset ring-[#181F1C]/[0.06] shadow-[0_10px_30px_-15px_rgba(10,54,34,0.08)]">
                <img
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
                <img
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
                <img
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
                  title: 'Sự đồng lòng và tình cảm của đội ngũ',
                  subtitle: 'Hơn 30 cộng sự nồng nhiệt chào đón và chúc mừng chị Vân.',
                })
              }
              className="cursor-zoom-in group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[5px] sm:rounded-[6px] ring-1 ring-inset ring-[#181F1C]/[0.06] shadow-[0_10px_30px_-15px_rgba(10,54,34,0.08)]">
                <img
                  src="/images/GanKet_DoiNguCoVu_ChucMungChiVan.jpg"
                  alt="Văn hóa gắn kết và sự đồng lòng của đội ngũ"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-2 sm:mt-3.5 pt-2 sm:pt-3 border-t border-[#E4E1D8] text-[9.5px] sm:text-[11px] leading-[1.35] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-[#858E89]">
                Văn hóa gắn kết &amp; sự đồng lòng của đội ngũ
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/SanKhau_ChiVan_NangCupManPowerQuyenLuc.jpg',
                  fig: 'VINH DANH',
                  title: 'Khoảnh khắc nâng cúp ManPower',
                  subtitle: 'Chị Vân nâng cúp vàng ManPower trong bộ đầm dạ hội xanh lục bảo.',
                })
              }
              className="cursor-zoom-in group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[5px] sm:rounded-[6px] ring-1 ring-inset ring-[#181F1C]/[0.06] shadow-[0_10px_30px_-15px_rgba(10,54,34,0.08)]">
                <img
                  src="/images/SanKhau_ChiVan_NangCupManPowerQuyenLuc.jpg"
                  alt="Khoảnh khắc nâng cúp vinh danh"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-2 sm:mt-3.5 pt-2 sm:pt-3 border-t border-[#E4E1D8] text-[9.5px] sm:text-[11px] leading-[1.35] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-[#858E89]">
                Khoảnh khắc nâng cúp vinh danh
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
                Mọi thông tin bạn chia sẻ về kế hoạch tài chính gia đình hoặc định hướng sự nghiệp đều được bảo mật tuyệt đối.
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
                          Zalo &bull; Điện thoại
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
                Giám đốc Vùng Cấp cao &mdash; Manulife Việt Nam
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
              Website <span className="text-[#56605B]">khanhvanfinance.com</span> là trang thông tin và thương hiệu cá nhân của bà Nguyễn Thị Vân (Khánh Vân) — Giám đốc Vùng Cấp cao (Đại lý bảo hiểm độc lập thuộc Manulife Việt Nam). Các nội dung và góc nhìn chia sẻ trên website mang tính chất tham khảo chuyên môn và hoạch định tài chính cá nhân, không đại diện cho phát ngôn chính thức của Công ty TNHH Manulife (Việt Nam).
            </p>
            <p>
              Mọi quyền lợi, điều khoản và điều kiện sản phẩm bảo hiểm được áp dụng theo Quy tắc và Điều khoản hợp đồng do Manulife Việt Nam phát hành và được Bộ Tài chính phê chuẩn. Các nhãn hiệu, logo và tên thương mại liên quan thuộc quyền sở hữu trí tuệ hợp pháp của Công ty TNHH Manulife (Việt Nam) và các tổ chức liên quan.
            </p>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#858E89] font-light">
            <p>© 2026 Khanh Van. All Rights Reserved. khanhvanfinance.com</p>
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
                      <img
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
                    ĐÚC KẾT THỰC TẾ &bull; BÀI HỌC CỐT LÕI
                  </span>
                  <ul className="space-y-3 text-sm sm:text-[15px] text-[#181F1C] font-normal leading-[1.75]">
                    {activeArticle.keyTakeaways.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#008746] font-serif font-bold text-base leading-none mt-0.5">&mdash;</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* RELATED VIDEOS FROM KHÁNH VÂN */}
                <div className="mt-8 pt-6 border-t border-[#E4E1D8] space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#008746] font-medium">
                      VIDEO CHIA SẺ TRỰC TIẾP TỪ KHÁNH VÂN CÙNG CHỦ ĐỀ
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
                      CỐ VẤN RIÊNG TƯ &bull; KHÁNH VÂN
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
                    Đặt Lịch Tham Vấn 1-1
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
                <img
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
