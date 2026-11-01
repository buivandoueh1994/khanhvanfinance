import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Menu,
  Share2,
  X,
} from 'lucide-react';

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
    id: 'khi-tai-san-thua-ke-tro-thanh-vet-nut-gia-dinh',
    index: '01',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 11, 2026',
    readTime: '6 phút đọc',
    featured: true,
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
    index: '02',
    category: 'Tài chính & Gia sản',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: true,
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
- Khi chọn kênh tích lũy dài hạn, nên nhìn vào tỷ lệ tiền vào quỹ đầu tư trong ba năm đầu và cơ chế hoàn phí cuối chặng, thay vì chỉ dừng lại ở con số phí năm đầu tiên.`,
    keyTakeaways: [
      'Phí ban đầu của sản phẩm liên kết đơn vị thế hệ mới đã giảm đáng kể so với trước đây, cho phép dòng tiền được đầu tư sớm hơn.',
      'Cơ chế Tài Khoản Tri Ân giúp phần phí đã khấu trừ không mất đi hoàn toàn mà được tính lãi và hoàn lại cho khách hàng.',
      'Khi chọn kênh tích lũy dài hạn, nên nhìn vào tỷ lệ tiền vào quỹ đầu tư trong ba năm đầu và cơ chế hoàn phí cuối chặng, thay vì chỉ dừng lại ở con số phí năm đầu tiên.',
    ],
  },
  {
    id: 'ba-thang-trang-tay-von-lieng-khong-nam-trong-so-sach',
    index: '03',
    category: 'Phát triển Sự nghiệp',
    date: 'Tháng 11, 2026',
    readTime: '5 phút đọc',
    featured: true,
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
    index: '04',
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
    id: '3-bieu-hien-cua-nguoi-quan-ly-gioi',
    index: '05',
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
    index: '06',
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
    index: '07',
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
    index: '08',
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

function renderArticleContent(content: string | string[]) {
  const blocks = Array.isArray(content)
    ? content
    : content
        .split(/\n\s*\n/)
        .map((b) => b.trim())
        .filter(Boolean);

  return (
    <div className="space-y-6 text-[16px] sm:text-[17px] text-[#2F3833] font-light leading-[1.85] sm:leading-[1.95] tracking-[0.01em]">
      {blocks.map((block, idx) => {
        // Heading 2
        if (block.startsWith('## ')) {
          return (
            <h4
              key={idx}
              className="font-serif text-xl sm:text-[26px] text-[#181F1C] pt-6 pb-2.5 border-b border-[#E4E1D8] font-normal leading-snug mt-2"
            >
              {block.replace(/^##\s*/, '')}
            </h4>
          );
        }

        // Italic lead paragraph / quote
        if (block.startsWith('*') && block.endsWith('*')) {
          const innerText = block.slice(1, -1);
          return (
            <div
              key={idx}
              className="font-serif italic text-[16px] sm:text-lg text-[#222E27] leading-[1.75] pl-4 sm:pl-5 border-l-[3px] border-[#008746] bg-[#F2EFE9]/70 py-3.5 px-4 rounded-r-[4px] my-5"
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
                  className="flex items-start gap-3 text-[15px] sm:text-[16px] text-[#343F39] font-light leading-[1.8]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008746] mt-2.5 shrink-0" />
                  <span>{item.replace(/^-\s*/, '')}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Standard paragraph
        return <p key={idx}>{block}</p>;
      })}
    </div>
  );
}

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

  // Prevent background scroll when modal or mobile menu is open (Native App UX)
  useEffect(() => {
    if (activeArticle || lightbox || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeArticle, lightbox, mobileMenuOpen]);

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
      'Khánh Vân — Executive Wealth & Leadership',
      'Khánh Vân — Giám đốc Vùng Cấp cao tại Manulife Việt Nam, Nhà Quản lý Xuất sắc nhất Châu Á (2021), cựu Quản lý Tài sản ANZ Bank.',
      typeof window !== 'undefined' ? `${window.location.origin}/images/SuKien_ChiVanCungCEO_ChupAnhTiecToi.jpg` : undefined
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

  // Deep-link check on initial mount
  useEffect(() => {
    const targetId = getArticleIdFromUrl();
    if (targetId) {
      const found = ARTICLES.find((a) => a.id === targetId);
      if (found) {
        openArticle(found, false);
      }
    }
  }, [getArticleIdFromUrl, openArticle]);

  // Handle browser back / forward navigation (popstate)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const articleId = event.state?.articleId || getArticleIdFromUrl();
      if (articleId) {
        const found = ARTICLES.find((a) => a.id === articleId);
        if (found) {
          openArticle(found, false);
          return;
        }
      }
      closeArticle(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [getArticleIdFromUrl, openArticle, closeArticle]);

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

  const featuredArticles = filteredArticles.filter((a) => a.featured);
  const archiveArticles = filteredArticles.filter((a) => !a.featured);

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

          <div className="hidden sm:flex items-center gap-5 shrink-0">
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
                    Kết nối riêng &rarr;
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
                  Khánh Vân
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
                      'Chị Khánh Vân cùng CEO Manulife trong buổi gặp gỡ chiến lược.',
                  })
                }
                className="cursor-pointer group"
              >
                <div className="overflow-hidden aspect-[4/4.9] bg-[#EAE7DF]">
                  <img
                    src="/images/SuKien_ChiVanCungCEO_ChupAnhTiecToi.jpg"
                    alt="Chị Khánh Vân cùng CEO Manulife"
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
                    alt="Vinh danh Top 1 Quản lý cấp cao DRD+ Khánh Vân"
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

      {/* 5. GÓC NHÌN & BÀI VIẾT — ARCHITECTURAL EDITORIAL JOURNAL */}
      <section id="goc-nhin" className="py-28 lg:py-36 bg-[#F2EFE9]/50 border-b border-[#E4E1D8]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] block mb-3">
                02 / GÓC NHÌN &amp; BÀI VIẾT CHUYÊN SÂU
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#181F1C]">
                Chia Sẻ Về Tài Chính, Quản Trị &amp; Cuộc Sống
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
                  TIÊU ĐIỂM BÀI VIẾT MỚI &bull; SPOTLIGHT
                </span>
                <span className="text-xs text-[#858E89] font-light">
                  {featuredArticles.length} bài viết nổi bật
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {featuredArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => openArticle(article)}
                    className="group cursor-pointer flex flex-col justify-between bg-[#FAF9F5] p-5 sm:p-7 border border-[#DCD8CE] hover:border-[#0A3622]/40 active:scale-[0.99] hover:shadow-[0_12px_32px_-15px_rgba(10,54,34,0.12)] transition-all duration-300 rounded-[4px]"
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
                      <h3 className="font-serif text-xl sm:text-[22px] font-normal text-[#181F1C] group-hover:text-[#0A3622] leading-[1.3] transition-colors mb-3.5">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-[#56605B] font-light leading-[1.8] line-clamp-3 mb-6">
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

          {/* Archive Index Rows */}
          {archiveArticles.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DCD8CE]">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#858E89] font-medium">
                  DANH MỤC LƯU TRỮ &bull; ARCHIVE INDEX
                </span>
                <span className="text-xs text-[#858E89] font-light">
                  {archiveArticles.length} bài viết
                </span>
              </div>

              <div className="border-t border-[#DCD8CE]">
                {archiveArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => openArticle(article)}
                    className="group py-6 sm:py-9 border-b border-[#DCD8CE] grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-8 items-baseline cursor-pointer hover:bg-[#FAF9F5]/80 active:bg-[#F2EFE9] transition-colors px-2 sm:px-4"
                  >
                    <div className="lg:col-span-2 flex items-center gap-4">
                      <span className="font-serif text-xl sm:text-2xl text-[#858E89] group-hover:text-[#008746] transition-colors">
                        {article.index}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-[#008746]">
                        {article.category}
                      </span>
                    </div>

                    <div className="lg:col-span-5">
                      <h3 className="font-serif text-xl sm:text-[24px] font-normal text-[#181F1C] group-hover:text-[#0A3622] leading-[1.3] transition-colors">
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
          )}
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

          {/* 6 Curated Mentorship, Culture & Leadership Photos in 2x3 Architectural Grid */}
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
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[6px] ring-1 ring-inset ring-[#181F1C]/[0.06] shadow-[0_10px_30px_-15px_rgba(10,54,34,0.08)]">
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
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[6px] ring-1 ring-inset ring-[#181F1C]/[0.06] shadow-[0_10px_30px_-15px_rgba(10,54,34,0.08)]">
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
                  src: '/images/VanPhong_ChiVanCungNhomQuanLy_SofaBenCuaSoViewDep.jpg',
                  fig: 'FIG. 12 — STRATEGIC SANCTUARY',
                  title: 'Cố Vấn Chiến Lược & Hệ Sinh Thái Quản Lý F1',
                  subtitle: 'Chị Khánh Vân cùng các nữ quản lý nòng cốt tại khu sofa thư giãn view thành phố cao tầng.',
                })
              }
              className="cursor-pointer group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[6px] ring-1 ring-inset ring-[#181F1C]/[0.06] shadow-[0_10px_30px_-15px_rgba(10,54,34,0.08)]">
                <img
                  src="/images/VanPhong_ChiVanCungNhomQuanLy_SofaBenCuaSoViewDep.jpg"
                  alt="Không gian cố vấn chiến lược F1 của chị Khánh Vân"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                FIG. 12 &mdash; Không gian cố vấn chiến lược quản lý F1
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/VanPhong_NhomQuanLyTre_LamViecTrenIpad.jpg',
                  fig: 'FIG. 13 — DIGITAL WORKSPACE',
                  title: 'Chuyển Giao Quy Trình Thực Chiến Trên Nền Tảng Số',
                  subtitle: 'Đào tạo và kèm cặp 1-1 các quản lý trẻ khai thác công cụ kỹ thuật số trong tư vấn gia sản.',
                })
              }
              className="cursor-pointer group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[6px] ring-1 ring-inset ring-[#181F1C]/[0.06] shadow-[0_10px_30px_-15px_rgba(10,54,34,0.08)]">
                <img
                  src="/images/VanPhong_NhomQuanLyTre_LamViecTrenIpad.jpg"
                  alt="Chuyển giao quy trình thực chiến trên iPad"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                FIG. 13 &mdash; Chuyển giao quy trình thực chiến trên nền tảng số
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/GanKet_DoiNguCoVu_ChucMungChiVan.jpg',
                  fig: 'FIG. 14 — HUMAN CONNECTION',
                  title: 'Sự Đồng Lòng & Tình Cảm Gắn Kết Chân Thành',
                  subtitle: 'Hơn 30 cộng sự trong đội ngũ nồng nhiệt chào đón và chúc mừng người thủ lĩnh.',
                })
              }
              className="cursor-pointer group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[6px] ring-1 ring-inset ring-[#181F1C]/[0.06] shadow-[0_10px_30px_-15px_rgba(10,54,34,0.08)]">
                <img
                  src="/images/GanKet_DoiNguCoVu_ChucMungChiVan.jpg"
                  alt="Văn hóa gắn kết và sự đồng lòng của đội ngũ"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                FIG. 14 &mdash; Văn hóa gắn kết &amp; sự đồng lòng của đội ngũ
              </figcaption>
            </figure>

            <figure
              onClick={() =>
                setLightbox({
                  src: '/images/SanKhau_ChiVan_NangCupManPowerQuyenLuc.jpg',
                  fig: 'FIG. 15 — PINNACLE LEADERSHIP',
                  title: 'Bản Lĩnh Đỉnh Cao Của Nhà Quản Lý Xuất Sắc',
                  subtitle: 'Khoảnh khắc nâng cao cúp vàng ManPower trong đầm dạ hội xanh lục bảo quyền lực.',
                })
              }
              className="cursor-pointer group"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE7DF] rounded-[6px] ring-1 ring-inset ring-[#181F1C]/[0.06] shadow-[0_10px_30px_-15px_rgba(10,54,34,0.08)]">
                <img
                  src="/images/SanKhau_ChiVan_NangCupManPowerQuyenLuc.jpg"
                  alt="Đỉnh cao vinh danh bản lĩnh quản lý C-Level"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-editorial"
                />
              </div>
              <figcaption className="mt-3.5 pt-3 border-t border-[#E4E1D8] text-[11px] uppercase tracking-[0.12em] text-[#858E89]">
                FIG. 15 &mdash; Đỉnh cao vinh danh bản lĩnh quản lý C-Level
              </figcaption>
            </figure>
          </div>

          {/* Minimalist Concierge Contact Section (Underline Inputs, No Heavy Boxes) */}
          <div
            id="lien-he"
            className="grid grid-cols-1 lg:grid-cols-12 gap-14 pt-16 border-t border-[#DCD8CE] items-start"
          >
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] block">
                PRIVATE CONCIERGE &amp; INQUIRY
              </span>
              <h3 className="font-serif text-4xl font-normal text-[#181F1C] leading-[1.2]">
                Gửi Lời Nhắn Kết Nối Riêng Cùng Khánh Vân
              </h3>
              <p className="text-sm text-[#56605B] font-light leading-[1.9]">
                Mọi thông tin trao đổi về hoạch định tài chính gia đình hoặc định hướng chuyển dịch sự nghiệp của bạn đều được cam kết bảo mật tuyệt đối.
              </p>

              {/* Direct Executive Channels (Zalo & Facebook) */}
              <div className="pt-4 border-t border-[#DCD8CE] space-y-4">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#858E89] block">
                  KÊNH KẾT NỐI TRỰC TIẾP
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
                          Zalo Trực Tiếp &bull; Điện Thoại
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
                          Mạng Xã Hội Chính Thức
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
                Khánh Vân
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#56605B] mt-1 block">
                Executive Wealth &amp; Leadership &mdash; Manulife Vietnam
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
                <span>Facebook Cá Nhân</span>
              </a>
            </div>
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

      {/* FLOATING QUICK CONTACT BUTTONS — MANULIFE EMERALD STYLE + GENTLE BREATHING HALO */}
      <aside
        aria-label="Kênh kết nối trực tiếp Khánh Vân"
        className={`fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-4 sm:right-6 z-40 flex flex-col gap-3.5 sm:gap-4 items-end pointer-events-auto select-none transition-all duration-300 ${
          activeArticle || lightbox ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* 1. NÚT ZALO CHÍNH THỨC (MANULIFE EMERALD) */}
        <div className="group relative flex items-center justify-end">
          <div className="hidden md:flex items-center gap-2 px-3.5 py-2 mr-3.5 rounded-full bg-[#0A3622]/95 backdrop-blur-md text-[#FAF9F5] text-xs shadow-[0_8px_24px_rgba(10,54,34,0.24)] border border-[#00A758]/35 whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
            <span className="font-light text-white/85">Chat Zalo trực tiếp:</span>
            <strong className="font-medium tracking-wide text-white">{PHONE_DISPLAY}</strong>
          </div>

          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat trực tiếp qua Zalo với Khánh Vân: ${PHONE_DISPLAY}`}
            className="relative w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center bg-gradient-to-br from-[#00A758] via-[#008746] to-[#0A3622] text-white shadow-[0_6px_20px_rgba(0,167,88,0.34)] hover:shadow-[0_10px_28px_rgba(0,167,88,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border-2 border-white"
          >
            {/* Gentle breathing halo ring (controlled scale, never overlaps) */}
            <span className="manulife-halo absolute -inset-1 rounded-full bg-[#00A758]/35 pointer-events-none" />

            <span className="relative z-10 font-sans font-extrabold tracking-tight text-[13px] sm:text-[13.5px] text-white leading-none select-none">
              Zalo
            </span>
            <span className="
              absolute bottom-0 right-0 z-20 w-3 h-3 bg-[#22C55E] border-2 border-white rounded-full shadow-xs
            " />
          </a>
        </div>

        {/* 2. NÚT FACEBOOK / MESSENGER CHÍNH THỨC (MANULIFE DEEP FOREST EMERALD) */}
        <div className="group relative flex items-center justify-end">
          <div className="hidden md:flex items-center gap-2 px-3.5 py-2 mr-3.5 rounded-full bg-[#0A3622]/95 backdrop-blur-md text-[#FAF9F5] text-xs shadow-[0_8px_24px_rgba(10,54,34,0.24)] border border-[#00A758]/35 whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
            <span className="font-light text-white/85">Facebook chính thức:</span>
            <strong className="font-medium tracking-wide text-white">Khánh Vân</strong>
          </div>

          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kết nối Facebook Khánh Vân"
            className="relative w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center bg-gradient-to-br from-[#0D5C38] via-[#0A3622] to-[#062316] text-white shadow-[0_6px_20px_rgba(10,54,34,0.34)] hover:shadow-[0_10px_28px_rgba(0,135,70,0.48)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border-2 border-white"
          >
            {/* Gentle breathing halo ring (staggered) */}
            <span className="manulife-halo-delayed absolute -inset-1 rounded-full bg-[#008746]/32 pointer-events-none" />

            <MessengerBrandSvg className="w-6 h-6 sm:w-[25px] sm:h-[25px] text-white relative z-10" />
            <span className="absolute bottom-0 right-0 z-20 w-3 h-3 bg-[#22C55E] border-2 border-white rounded-full shadow-xs" />
          </a>
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
                    <div className="overflow-hidden aspect-[16/10] sm:aspect-[16/8] bg-[#EAE7DF] rounded-[4px] ring-1 ring-inset ring-[#181F1C]/[0.08] shadow-sm">
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
                  <ul className="space-y-3 text-sm sm:text-[15px] text-[#181F1C] font-light leading-[1.75]">
                    {activeArticle.keyTakeaways.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#008746] font-serif font-bold text-base leading-none mt-0.5">&mdash;</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-[#DCD8CE] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F2EFE9]/60 p-5 sm:p-6 rounded-[4px] mb-8">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#008746] block mb-1">
                      CỐ VẤN RIÊNG TƯ &bull; KHÁNH VÂN
                    </span>
                    <p className="text-xs sm:text-sm text-[#56605B] font-light leading-relaxed">
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
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#008746] block">
                    {lightbox.fig}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#181F1C] mt-0.5">
                    {lightbox.title}
                  </h4>
                </div>
                <p className="text-xs text-[#56605B] font-light max-w-sm sm:text-right">
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
