// Auto-generated verified dataset for /nhung-chuyen-di (Khánh Vân & Những Chuyến Đi)
export type JourneyPillarKey =
  | 'ALL'
  | 'mstar-quoc-te'
  | 'dinh-cao-nhiet-huyet'
  | 'hanh-trinh-se-chia'
  | 'diem-tua-to-am';

export interface JourneyPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape' | 'square';
  caption: string;
  locationDetail: string;
  people: string;
}

export interface JourneyVideo {
  src: string;
  poster: string;
  durationLabel: string;
  soundLabel?: string;
  title: string;
  caption: string;
}

export interface JourneyChapter {
  slug: string;
  pillar: Exclude<JourneyPillarKey, 'ALL'>;
  pillarLabel: string;
  year: string;
  periodLabel: string;
  location: string;
  countryTag: string;
  title: string;
  subtitle: string;
  pullQuote: string;
  companions: string;
  milestoneBadge: string;
  heroImage: string;
  heroObjectPosition: string;
  photoCount: number;
  ctaMode: 'career' | 'family';
  story: string[];
  video?: JourneyVideo;
  photos: JourneyPhoto[];
}

export const JOURNEY_PILLARS: {
  key: JourneyPillarKey;
  label: string;
  shortLabel: string;
  description: string;
}[] = [
  {
    key: 'ALL',
    label: 'Tất cả chương',
    shortLabel: 'Tất cả',
    description: 'Mười một chương ảnh, từ các chuyến M-Star ở nhiều nước đến những ngày ở nhà với gia đình.',
  },
  {
    key: 'mstar-quoc-te',
    label: 'Các chuyến M-Star',
    shortLabel: 'M-Star Quốc tế',
    description: 'Bảy chặng M-Star tiêu biểu trong hành trình hơn 16 quốc gia từ Châu Âu đến Đông Á.',
  },
  {
    key: 'dinh-cao-nhiet-huyet',
    label: 'Vinh danh và Kick-off',
    shortLabel: 'Vinh danh & Kick-off',
    description: 'Đêm vinh danh Top 1 DRD+ tại Yên Tử và kỳ Kick-off ở Phan Thiết.',
  },
  {
    key: 'hanh-trinh-se-chia',
    label: 'Thiện nguyện',
    shortLabel: 'Thiện nguyện',
    description: 'Chuyến xe Kết Nối Yêu Thương mang ba lô, sữa và quà đến các em nhỏ vùng cao Tây Nguyên.',
  },
  {
    key: 'diem-tua-to-am',
    label: 'Gia đình và đời thường',
    shortLabel: 'Tổ ấm & Đời thường',
    description: 'Những ngày bình thường bên chồng và hai con, lúc Vân lấy lại sức sau công việc.',
  },
];

export const JOURNEY_CHAPTERS: JourneyChapter[] = [
  {
    "slug": "nhat-ban-2026",
    "pillar": "mstar-quoc-te",
    "pillarLabel": "M-Star Quốc tế",
    "year": "2026",
    "periodLabel": "Mùa xuân 2026",
    "location": "Núi Phú Sĩ & Tokyo, Nhật Bản",
    "countryTag": "Nhật Bản",
    "title": "Dưới chân núi Phú Sĩ, bài học về sự chỉn chu",
    "subtitle": "Chuyến M-Star 2026 đưa Vân cùng các anh chị lãnh đạo và quản lý đến Nhật Bản, đúng những ngày trời xanh.",
    "pullQuote": "Đứng trước đỉnh Phú Sĩ phủ tuyết, Vân nghĩ đến những thứ vững nhất đều được làm đều tay mỗi ngày.",
    "companions": "Đoàn lãnh đạo & quản lý đạt chuẩn M-Star",
    "milestoneBadge": "M-Star Nhật Bản 2026",
    "heroImage": "/images/journeys/nhat-ban-2026/01-kv_268.jpg?v=2",
    "heroObjectPosition": "50% 28%",
    "photoCount": 12,
    "ctaMode": "career",
    "story": [
      "Người dân địa phương nói với đoàn rằng không phải ngày nào ở Kawaguchiko cũng thấy rõ đỉnh Phú Sĩ như vậy, trời xanh không một gợn mây. Đứng dưới vòm gạch đỏ nhìn ngọn núi phủ tuyết ở xa, Vân thấy nhẹ lòng và biết ơn.",
      "Nhật Bản làm Vân nể ở sự chỉn chu trong từng chi tiết nhỏ: bữa tối Wagyu được chuẩn bị cẩn thận, phố quanh ga Tokyo trăm năm tuổi vẫn sạch sẽ, người phục vụ tiếp khách rất chu đáo. Vân và các quản lý ở Green Power cũng nhắc nhau giữ sự chỉn chu đó khi làm việc với khách hàng.",
      "Vui nhất là có các anh chị đồng nghiệp và chị em quản lý gắn bó nhiều năm đi cùng. Trong đêm tiệc vinh danh, cả nhóm mặc Yukata và ai cũng cười. Vân thấy công sức bỏ ra bao nhiêu năm cuối cùng cũng được ghi nhận."
    ],
    "photos": [
      {
        "id": "KV_268",
        "src": "/images/journeys/nhat-ban-2026/01-kv_268.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân mặc áo lông màu kem, đứng trước đỉnh Phú Sĩ phủ tuyết trong chuyến M-Star Nhật Bản 2026.",
        "locationDetail": "Khung vòm gạch đỏ nhìn thẳng ra đỉnh Phú Sĩ phủ tuyết, trời xanh (Nhật Bản)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_342",
        "src": "/images/journeys/nhat-ban-2026/12-kv_342.jpg?v=2",
        "width": 1600,
        "height": 1200,
        "orientation": "landscape",
        "caption": "Bảy chị em quản lý rạng rỡ trước một quán ăn truyền thống Nhật Bản, lưu lại vẻ trẻ trung và gắn bó trong chuyến M-Star 2026.",
        "locationDetail": "Mặt tiền quán ăn gỗ truyền thống treo lồng đèn và rèm noren đặc trưng Nhật Bản",
        "people": "Chị Khánh Vân cùng 6 nữ quản lý trong chuyến M-Star Nhật Bản 2026"
      },
      {
        "id": "KV_343",
        "src": "/images/journeys/nhat-ban-2026/13-kv_343.jpg?v=2",
        "width": 1200,
        "height": 1600,
        "orientation": "portrait",
        "caption": "Năm chị em quản lý diện áo dài ánh bạc đồng điệu bên bảng hiệu M-Star 2026 Nhật Bản trước giờ khai tiệc vinh danh.",
        "locationDetail": "Khán phòng dạ tiệc sang trọng bên backdrop Hội nghị M-Star 2026 Nhật Bản của Manulife",
        "people": "Chị Khánh Vân cùng 4 nữ lãnh đạo đồng bộ áo dài dự tiệc M-Star Nhật Bản 2026"
      },
      {
        "id": "KV_344",
        "src": "/images/journeys/nhat-ban-2026/14-kv_344.jpg?v=2",
        "width": 1200,
        "height": 1600,
        "orientation": "portrait",
        "caption": "Sáu chị em quản lý cùng nhau tận hưởng nắng xuân trong trẻo dưới hành lang mái vòm nhìn ra bầu trời vùng núi Phú Sĩ.",
        "locationDetail": "Hành lang mái vòm gạch ấm áp mở ra bầu trời xanh và núi đồi vùng Phú Sĩ, Nhật Bản",
        "people": "Chị Khánh Vân cùng 5 chị em quản lý dưới mái vòm ngập nắng tại Nhật Bản"
      },
      {
        "id": "KV_269",
        "src": "/images/journeys/nhat-ban-2026/02-kv_269.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân và các nữ quản lý chụp ảnh dưới chân núi Phú Sĩ.",
        "locationDetail": "Công viên dưới chân núi Phú Sĩ, trời nắng",
        "people": "Chị Khánh Vân & 4 nữ quản lý đồng nghiệp"
      },
      {
        "id": "KV_270",
        "src": "/images/journeys/nhat-ban-2026/03-kv_270.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân giơ tay chào, phía sau là núi Phú Sĩ.",
        "locationDetail": "Khung cửa gạch nhìn ra núi Phú Sĩ phủ tuyết",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_272",
        "src": "/images/journeys/nhat-ban-2026/05-kv_272.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Các nữ quản lý đi bộ trên đại lộ ở Tokyo.",
        "locationDetail": "Đại lộ nhiều cây xanh và nhà cao tầng ở Tokyo",
        "people": "Chị Khánh Vân & 5 nữ quản lý"
      },
      {
        "id": "KV_273",
        "src": "/images/journeys/nhat-ban-2026/06-kv_273.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Nhóm quản lý chụp ảnh trước nhà ga Tokyo xây bằng gạch đỏ.",
        "locationDetail": "Quảng trường trước Tokyo Station, tòa nhà gạch đỏ trăm năm tuổi",
        "people": "Chị Khánh Vân & nhóm quản lý"
      },
      {
        "id": "KV_274",
        "src": "/images/journeys/nhat-ban-2026/07-kv_274.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân và các chị em quản lý mặc Yukata trong đêm tiệc M-Star 2026 Nhật Bản.",
        "locationDetail": "Sảnh tiệc khách sạn kiểu Nhật, cạnh standee M-Star 2026 Nhật Bản",
        "people": "Chị Khánh Vân & 3 nữ lãnh đạo đồng nghiệp"
      },
      {
        "id": "KV_276",
        "src": "/images/journeys/nhat-ban-2026/09-kv_276.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Hai chị em quản lý ngồi uống nước, trò chuyện ở quán cà phê.",
        "locationDetail": "Quán cà phê sáng sủa ở Nhật Bản",
        "people": "Chị Khánh Vân & nữ quản lý thân thiết"
      },
      {
        "id": "KV_277",
        "src": "/images/journeys/nhat-ban-2026/10-kv_277.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Các chị em quản lý ăn kem trà xanh Matcha trước một tiệm trà.",
        "locationDetail": "Trước tiệm trà xanh Matcha ở Nhật Bản",
        "people": "Chị Khánh Vân & 4 nữ đồng nghiệp"
      },
      {
        "id": "KV_278",
        "src": "/images/journeys/nhat-ban-2026/11-kv_278.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Các nữ quản lý chọn mua quà trong khu mua sắm ở Nhật Bản.",
        "locationDetail": "Khu mua sắm đông người ở Nhật Bản",
        "people": "Đội ngũ nữ quản lý trong đoàn"
      }
    ],
    "video": {
      "src": "/videos/journeys/nhat-ban-2026.mp4?v=4",
      "poster": "/videos/journeys/nhat-ban-2026-poster.jpg?v=2",
      "durationLabel": "0:26",
      "soundLabel": "Âm Thanh Thực Tế & Acoustic",
      "title": "Dưới chân núi Phú Sĩ và phố Tokyo",
      "caption": "Núi Phú Sĩ trong ngày trời quang và các chị em quản lý trong chuyến M-Star Nhật Bản 2026."
    }
  },
  {
    "slug": "yen-tu-vinh-danh-2025",
    "pillar": "dinh-cao-nhiet-huyet",
    "pillarLabel": "Vinh danh & Kick-off",
    "year": "2025",
    "periodLabel": "Năm 2025",
    "location": "Legacy Yên Tử, Quảng Ninh",
    "countryTag": "Việt Nam",
    "title": "Đêm vinh danh ManPower Agency Awards XXVII tại Legacy Yên Tử",
    "subtitle": "Đại lễ ManPower Agency Awards XXVII tổ chức tại Legacy Yên Tử. Vân nhận hai danh hiệu Top 1 DRD+ toàn quốc.",
    "pullQuote": "Chiếc cúp Vân tự hào nhất là Top 1 DRD+ về tỷ lệ duy trì hợp đồng năm thứ hai, vì đó là thước đo thật nhất cho niềm tin của khách hàng.",
    "companions": "Ban lãnh đạo Manulife & đội ngũ quản lý cấp cao",
    "milestoneBadge": "Top 1 DRD+ Toàn Quốc",
    "heroImage": "/images/journeys/yen-tu-vinh-danh-2025/01-kv_258.jpg?v=2",
    "heroObjectPosition": "50% 35%",
    "photoCount": 13,
    "ctaMode": "career",
    "story": [
      "Legacy Yên Tử có hành lang đá cuội, mái ngói mũi hài và tường gạch nung theo lối cung đình thời Trần. Không gian yên tĩnh ấy cho mọi người một lúc để nhìn lại cả năm đã qua.",
      "Tên Vân được xướng lên trên sân khấu ManPower Agency Awards XXVII ở hai hạng mục: Top 1 DRD+ hoàn thành chỉ tiêu FYP và Top 1 DRD+ dẫn đầu tỷ lệ duy trì hợp đồng năm thứ hai. Vân xúc động thật sự. Doanh số cho thấy tốc độ, còn tỷ lệ duy trì hợp đồng cho thấy mình tư vấn đúng, đủ và còn chăm sóc khách sau khi hợp đồng đã trao tay.",
      "Mặc áo dài gấm vàng, đứng giữa các anh chị lãnh đạo xuất sắc trên toàn quốc, Vân gửi lời cảm ơn đến hơn 500 nhân sự và 64 quản lý của Green Power Group. Thành quả trên sân khấu là của cả tập thể."
    ],
    "photos": [
      {
        "id": "KV_258",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/01-kv_258.jpg?v=2",
        "width": 1280,
        "height": 853,
        "orientation": "landscape",
        "caption": "Vinh danh TOP 1 DRD+ Quản lý Cấp cao Dẫn đầu Tỷ lệ Hoàn thành Chỉ tiêu FYP Năm 2025 trên sân khấu ManPower Agency Awards XXVII tại Yên Tử.",
        "locationDetail": "Sân khấu ManPower Agency Awards XXVII, màn hình LED hiển thị TOP 1 DRD+ Dẫn đầu Tỷ lệ Hoàn thành Chỉ tiêu FYP 2025",
        "people": "Chị Khánh Vân & các lãnh đạo xuất sắc trên sân khấu"
      },
      {
        "id": "KV_339",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/11-kv_339.jpg?v=2",
        "width": 1200,
        "height": 1600,
        "orientation": "portrait",
        "caption": "Khoảnh khắc chị Khánh Vân cùng các quản lý cấp cao bước lên sân khấu Yên Tử nhận danh hiệu Top 1 DRD+ dẫn đầu tỉ lệ duy trì hợp đồng năm 2.",
        "locationDetail": "Sân khấu lớn Manulife tại Yên Tử với màn hình LED vinh danh Top 1 DRD+ Quản lý cấp cao dẫn đầu tỉ lệ duy trì hợp đồng năm 2 năm 2025",
        "people": "Chị Khánh Vân cùng các nữ quản lý cấp cao xuất sắc trên sân khấu vinh danh Yên Tử"
      },
      {
        "id": "KV_340",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/12-kv_340.jpg?v=2",
        "width": 1200,
        "height": 1600,
        "orientation": "portrait",
        "caption": "Tập thể các thành viên MDRT Life Member rạng rỡ trong tà áo dài trên sân khấu Yên Tử, nơi ghi nhận những năm tháng làm nghề bền bỉ.",
        "locationDetail": "Sân khấu vinh danh MDRT 2026 Life Member rực sáng sắc xanh Manulife tại Yên Tử",
        "people": "Chị Khánh Vân và tập thể các thành viên MDRT 2026 Life Member trên sân khấu Manulife"
      },
      {
        "id": "KV_341",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/13-kv_341.jpg?v=2",
        "width": 1200,
        "height": 1600,
        "orientation": "portrait",
        "caption": "Chưa tới Yên Tử mà không khí trên khoang máy bay đã rộn ràng tiếng cười của các chị em Green Power cùng nhau đi nhận giải.",
        "locationDetail": "Khoang máy bay rộn ràng tiếng cười trên hành trình bay ra miền Bắc dự lễ vinh danh Manulife",
        "people": "Chị Khánh Vân và 10 chị em quản lý Green Power trên chuyến bay dự lễ vinh danh Yên Tử"
      },
      {
        "id": "KV_259",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/02-kv_259.jpg?v=2",
        "width": 1280,
        "height": 853,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân mặc áo dài gấm vàng, giơ cúp Top 1 cùng Ban Lãnh đạo Manulife Việt Nam.",
        "locationDetail": "Sân khấu chính lễ trao giải ManPower Agency Awards XXVII tại Yên Tử",
        "people": "Chị Khánh Vân & Ban Lãnh đạo, các Giám đốc Vùng"
      },
      {
        "id": "KV_260",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/03-kv_260.jpg?v=2",
        "width": 853,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân nhận cúp Top 1 DRD+ cùng lãnh đạo cấp cao tại đêm Gala ManPower Awards XXVII.",
        "locationDetail": "Sân khấu trao giải trang trí theo phong cách văn hóa Việt tại Yên Tử",
        "people": "Chị Khánh Vân & Lãnh đạo cấp cao Manulife"
      },
      {
        "id": "KV_261",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/04-kv_261.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Bốn nữ lãnh đạo cấp cao cùng giơ cúp tại đại lễ ManPower Agency Awards XXVII.",
        "locationDetail": "Trước khu photobooth của ManPower Agency Awards XXVII",
        "people": "Chị Khánh Vân & ba nữ Giám đốc cấp cao đồng nghiệp"
      },
      {
        "id": "KV_262",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/05-kv_262.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Các nữ lãnh đạo từ nhiều tỉnh thành chụp ảnh trong đêm vinh danh tại Yên Tử.",
        "locationDetail": "Sảnh đón tiếp kiến trúc gỗ truyền thống tại Legacy Yên Tử",
        "people": "Chị Khánh Vân & các nữ lãnh đạo toàn quốc"
      },
      {
        "id": "KV_263",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/06-kv_263.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Sân khấu vinh danh hạng mục Nữ Hoàng Tuyển Dụng 2025 tại Yên Tử.",
        "locationDetail": "Sân khấu ngoài trời tại Yên Tử, hạng mục Nữ Hoàng Tuyển Dụng 2025",
        "people": "Các lãnh đạo được vinh danh trên sân khấu lớn"
      },
      {
        "id": "KV_264",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/07-kv_264.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân mặc áo dài gấm vàng trong không gian kiến trúc cung đình của Legacy Yên Tử.",
        "locationDetail": "Nội thất kiểu cung đình Trần, dùng gỗ và gạch nung, tại Legacy Yên Tử",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_265",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/08-kv_265.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Sân giếng trời lát đá cuội ở Legacy Yên Tử nhìn từ trên cao.",
        "locationDetail": "Sân giếng trời lát đá cuội giữa hai dãy mái ngói mũi hài tại Legacy Yên Tử",
        "people": "Chị Khánh Vân (góc nhìn nghệ thuật từ trên cao)"
      },
      {
        "id": "KV_266",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/09-kv_266.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân và đồng nghiệp chụp ảnh trên bậc đá dưới chân núi Yên Tử.",
        "locationDetail": "Bậc đá rêu trước cổng tam quan dưới chân núi Yên Tử",
        "people": "Chị Khánh Vân & nữ đồng nghiệp"
      },
      {
        "id": "KV_267",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/10-kv_267.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân ngồi ăn sáng cùng các anh chị em đồng nghiệp tại Yên Tử.",
        "locationDetail": "Nhà hàng tại Yên Tử",
        "people": "Chị Khánh Vân & các anh chị em quản lý"
      }
    ],
    "video": {
      "src": "/videos/journeys/yen-tu-vinh-danh-2025.mp4?v=4",
      "poster": "/videos/journeys/yen-tu-vinh-danh-2025-poster.jpg?v=2",
      "durationLabel": "0:28",
      "soundLabel": "Âm Thanh Sân Khấu & Giao Hưởng",
      "title": "Nhận cúp Top 1 DRD+ trên sân khấu ManPower Awards XXVII",
      "caption": "Từ sân Legacy Yên Tử đến sân khấu vinh danh Top 1 DRD+ Quản lý Cấp cao dẫn đầu tỷ lệ duy trì hợp đồng."
    }
  },
  {
    "slug": "trung-khanh-2026",
    "pillar": "mstar-quoc-te",
    "pillarLabel": "M-Star Quốc tế",
    "year": "2026",
    "periodLabel": "Giữa năm 2026",
    "location": "Trùng Khánh, Trung Quốc",
    "countryTag": "Trung Quốc",
    "title": "Phố núi Trùng Khánh và các bạn quản lý trẻ",
    "subtitle": "Chuyến M-Star Giữa Năm 2026 đến Trùng Khánh, thành phố nhiều tầng bên sông Trường Giang, cùng các quản lý trẻ của Green Power Group.",
    "pullQuote": "Đi giữa thành phố xây trên sườn núi dốc, Vân thấy địa hình nào cũng không cản được người đã muốn đi tới.",
    "companions": "Đội ngũ quản lý Green Power đạt chuẩn M-Star Giữa Năm",
    "milestoneBadge": "M-Star Giữa Năm 2026",
    "heroImage": "/images/journeys/trung-khanh-2026/01-kv_279.jpg?v=2",
    "heroObjectPosition": "50% 30%",
    "photoCount": 13,
    "ctaMode": "career",
    "story": [
      "Trùng Khánh có nhiều thứ làm cả đoàn bất ngờ: đường tàu chạy xuyên qua tòa nhà cao tầng, cầu vượt nối nhau trên sườn núi, tòa nhà đũa đỏ của Trung tâm Nghệ thuật Quốc Thái và những chiếc taxi vàng.",
      "Vân nhớ nhất mấy buổi tối cả đoàn ngồi quanh nồi lẩu Tứ Xuyên dưới hàng vạn đèn lồng ở Tỳ Bà Viên, và lúc uống trà cái chén trong buổi xem Kinh kịch biến diện.",
      "Các bạn quản lý trẻ của đội ngũ tự tin đi trên con dốc phố cổ Từ Khí Khẩu, chia sẻ mục tiêu cho nửa cuối năm. Nhìn họ, Vân thấy thế hệ kế cận đã lớn lên. Với Vân, chuyến M-Star còn là dịp để người làm quản lý đi xa và nhìn rộng hơn."
    ],
    "photos": [
      {
        "id": "KV_279",
        "src": "/images/journeys/trung-khanh-2026/01-kv_279.jpg?v=2",
        "width": 853,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân đứng cạnh chiếc taxi vàng, phía sau là tòa nhà đỏ của Trung tâm Nghệ thuật Quốc Thái ở Trùng Khánh.",
        "locationDetail": "Cạnh taxi vàng, trước tòa nhà đũa đỏ của Trung tâm Nghệ thuật Quốc Thái (Trùng Khánh)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_345",
        "src": "/images/journeys/trung-khanh-2026/11-kv_345.jpg?v=2",
        "width": 1600,
        "height": 1066,
        "orientation": "landscape",
        "caption": "Tập thể đoàn M-Star Trùng Khánh 2026 quây quần đông đủ bên bờ sông giữa lòng thành phố sương mù hiện đại.",
        "locationDetail": "Quảng trường ven sông rộng lớn nhìn ra những tòa cao ốc hiện đại của thành phố Trùng Khánh",
        "people": "Đông đảo thành viên đoàn M-Star Trùng Khánh 2026 cùng chị Khánh Vân"
      },
      {
        "id": "KV_346",
        "src": "/images/journeys/trung-khanh-2026/12-kv_346.jpg?v=2",
        "width": 1600,
        "height": 1066,
        "orientation": "landscape",
        "caption": "Chín chị em cùng giơ tay ăn mừng giữa quảng trường Đại Lễ Đường Nhân Dân Trùng Khánh, lưu lại một buổi sáng thật nhiều năng lượng.",
        "locationDetail": "Quảng trường lát đá soi bóng trước công trình Đại Lễ Đường Nhân Dân uy nghi tại Trùng Khánh",
        "people": "Chị Khánh Vân và 8 chị em đồng đội tại quảng trường Đại Lễ Đường Trùng Khánh"
      },
      {
        "id": "KV_347",
        "src": "/images/journeys/trung-khanh-2026/13-kv_347.jpg?v=2",
        "width": 1600,
        "height": 1200,
        "orientation": "landscape",
        "caption": "Bữa lẩu cay nồng ấm áp giữa sân vườn đèn lồng đỏ Trùng Khánh, nơi chị Khánh Vân và các chị em cùng nhau trò chuyện suốt buổi tối.",
        "locationDetail": "Sân vườn nhà hàng đèn lồng đỏ cổ kính thưởng thức đặc sản lẩu Trùng Khánh",
        "people": "Chị Khánh Vân cùng 5 chị em quản lý bên bàn tiệc lẩu Trùng Khánh"
      },
      {
        "id": "KV_280",
        "src": "/images/journeys/trung-khanh-2026/02-kv_280.jpg?v=2",
        "width": 853,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân cầm quạt giấy trắng trước tòa nhà đỏ ở trung tâm Trùng Khánh.",
        "locationDetail": "Quảng trường trước Trung tâm Nghệ thuật Quốc Thái, trời xanh",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_281",
        "src": "/images/journeys/trung-khanh-2026/03-kv_281.jpg?v=2",
        "width": 1280,
        "height": 853,
        "orientation": "landscape",
        "caption": "Đoàn M-Star chụp ảnh tập thể tại quảng trường Đại Lễ Đường Trùng Khánh.",
        "locationDetail": "Quảng trường giữa Đại Lễ Đường Nhân Dân cổ và các tòa nhà cao tầng Trùng Khánh",
        "people": "Chị Khánh Vân & đại đoàn quản lý M-Star"
      },
      {
        "id": "KV_282",
        "src": "/images/journeys/trung-khanh-2026/04-kv_282.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân mặc măng tô kem giữa những dãy đèn lồng đỏ ở cổ trấn Từ Khí Khẩu.",
        "locationDetail": "Phố đá treo đèn lồng đỏ ở cổ trấn Từ Khí Khẩu (Ciqikou, Trùng Khánh)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_283",
        "src": "/images/journeys/trung-khanh-2026/05-kv_283.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân đứng cạnh taxi vàng, phía sau là chung cư cao tầng ở Trùng Khánh.",
        "locationDetail": "Cạnh taxi vàng, giữa các tòa chung cư cao tầng trên sườn núi Trùng Khánh",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_284",
        "src": "/images/journeys/trung-khanh-2026/06-kv_284.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân và sáu nữ quản lý Green Power đi dạo trên phố ở Trùng Khánh.",
        "locationDetail": "Con phố nhiều cây xanh ở Trùng Khánh",
        "people": "Chị Khánh Vân & 6 nữ quản lý trẻ trung"
      },
      {
        "id": "KV_285",
        "src": "/images/journeys/trung-khanh-2026/07-kv_285.jpg?v=2",
        "width": 1280,
        "height": 1011,
        "orientation": "landscape",
        "caption": "Các quản lý ăn lẩu chung một bàn sau ngày tham quan ở Trùng Khánh.",
        "locationDetail": "Nhà hàng lẩu truyền thống ở Trùng Khánh",
        "people": "Chị Khánh Vân & đại gia đình quản lý"
      },
      {
        "id": "KV_286",
        "src": "/images/journeys/trung-khanh-2026/08-kv_286.jpg?v=2",
        "width": 1280,
        "height": 853,
        "orientation": "landscape",
        "caption": "Đoàn M-Star chụp ảnh trước ngọn đồi sáng đèn về đêm ở Trùng Khánh.",
        "locationDetail": "Trước ngọn đồi sáng đèn tại tổ hợp lẩu lớn nhất thế giới Tỳ Bà Viên (Trùng Khánh)",
        "people": "Đoàn M-Star Manulife"
      },
      {
        "id": "KV_287",
        "src": "/images/journeys/trung-khanh-2026/09-kv_287.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chiếc quạt giấy Manulife đặt cạnh chén trà trong buổi xem nghệ thuật biến diện ở Trùng Khánh.",
        "locationDetail": "Bên tách trà cái chén sứ vàng trong khán phòng xem Kinh kịch biến diện Tứ Xuyên",
        "people": "Bàn tay cầm quạt Manulife (góc chụp tinh tế)"
      },
      {
        "id": "KV_288",
        "src": "/images/journeys/trung-khanh-2026/10-kv_288.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân cùng các chị em quản lý ngồi ăn tối dưới đèn lồng vàng.",
        "locationDetail": "Nhà hàng gỗ treo đèn lồng cổ truyền ở Trùng Khánh",
        "people": "Chị Khánh Vân & bàn tiệc các chị em quản lý"
      }
    ],
    "video": {
      "src": "/videos/journeys/trung-khanh-2026.mp4?v=4",
      "poster": "/videos/journeys/trung-khanh-2026-poster.jpg?v=2",
      "durationLabel": "0:27",
      "soundLabel": "Nhạc Gốc Cổ Trấn & Kinh Kịch",
      "title": "Cổ trấn Từ Khí Khẩu, trà và đêm Kinh kịch biến diện ở Trùng Khánh",
      "caption": "Cổ trấn, quán trà và đêm biến diện trong chuyến M-Star Giữa Năm 2026 tại Trùng Khánh."
    }
  },
  {
    "slug": "ao-duc-2024",
    "pillar": "mstar-quoc-te",
    "pillarLabel": "M-Star Quốc tế",
    "year": "2024",
    "periodLabel": "Mùa thu 2024",
    "location": "Hallstatt, Salzburg (Áo) & Munich (Đức)",
    "countryTag": "Áo & Đức",
    "title": "Mùa thu Trung Âu: hồ Hallstatt, Salzburg và Munich",
    "subtitle": "Chuyến M-Star Châu Âu đi qua làng Hallstatt bên dãy Alps, thành phố Salzburg quê hương Mozart và Munich.",
    "pullQuote": "Đứng bên hồ Hallstatt phẳng lặng giữa dãy Alps, Vân thấy một năm vất vả làm nghề đã đáng.",
    "companions": "Đoàn lãnh đạo & quản lý M-Star Manulife Việt Nam",
    "milestoneBadge": "M-Star Châu Âu 2024",
    "heroImage": "/images/journeys/ao-duc-2024/10-kv_235.jpg?v=2",
    "heroObjectPosition": "50% 26%",
    "photoCount": 11,
    "ctaMode": "career",
    "story": [
      "Mùa thu Trung Âu se lạnh, tường nhà phủ dây thường xuân chuyển sang đỏ. Đứng bên hồ Hallstatt nhìn sương mỏng trên dãy Alps cùng các đồng nghiệp, Vân thấy mấy năm làm nghề tận tâm và có kỷ luật đã đáng.",
      "Đoàn đi từ ngôi nhà màu vàng nơi Mozart chào đời ở phố cổ Salzburg đến quảng trường Marienplatz ở Munich. Nhớ nhất là lúc cả đoàn giương cờ đỏ sao vàng và cờ xanh Manulife trước sân vận động Allianz Arena. Người Việt ra thế giới bằng chính năng lực nghề của mình, Vân thấy tự hào.",
      "Mỗi lần đi xa về văn phòng ở TP.HCM, Vân đều mang theo cảm hứng mới để kể lại cho đội ngũ. Thế giới rộng lắm, và nghề tư vấn tài chính làm đàng hoàng có thể đưa mình đi xa."
    ],
    "photos": [
      {
        "id": "KV_228",
        "src": "/images/journeys/ao-duc-2024/03-kv_228.jpg?v=2",
        "width": 1280,
        "height": 815,
        "orientation": "landscape",
        "caption": "Đoàn M-Star giương cờ đỏ sao vàng Việt Nam và cờ xanh Manulife trước sân vận động Allianz Arena (Munich, Đức).",
        "locationDetail": "Quảng trường trước sân vận động Allianz Arena tại Munich (Đức)",
        "people": "Đoàn M-Star Manulife Việt Nam"
      },
      {
        "id": "KV_330",
        "src": "/images/journeys/ao-duc-2024/13-kv_330.jpg?v=2",
        "width": 1600,
        "height": 899,
        "orientation": "landscape",
        "caption": "Đoàn lãnh đạo M-Star phủ sắc áo đồng phục giữa khán đài sân vận động Allianz Arena, giương cao lá cờ Việt Nam và cờ Manulife đầy tự hào.",
        "locationDetail": "Khán đài sắc đỏ rực rỡ bên trong sân vận động Allianz Arena, Munich, Đức",
        "people": "Đoàn lãnh đạo và quản lý M-Star Manulife Việt Nam tại Munich"
      },
      {
        "id": "KV_331",
        "src": "/images/journeys/ao-duc-2024/14-kv_331.jpg?v=2",
        "width": 1600,
        "height": 899,
        "orientation": "landscape",
        "caption": "Tập thể đại biểu M-Star lưu lại khung hình đông vui giữa nắng thu nước Đức bên bức tường lá đỏ cổ kính.",
        "locationDetail": "Khuôn viên lâu đài cổ kính phủ kín tường dây leo lá đỏ rực nắng thu tại Đức",
        "people": "Đoàn đại biểu Hội nghị M-Star châu Âu cùng chị Khánh Vân"
      },
      {
        "id": "KV_332",
        "src": "/images/journeys/ao-duc-2024/15-kv_332.jpg?v=2",
        "width": 1200,
        "height": 1600,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân cùng đồng nghiệp thả tim vui vẻ trước tháp đồng hồ Marienplatz trong buổi sáng nắng trong veo ở Munich.",
        "locationDetail": "Quảng trường Marienplatz với tòa thị chính kiến trúc Gothic tráng lệ dưới trời xanh Munich, Đức",
        "people": "Chị Khánh Vân cùng hai anh chị đồng nghiệp tại trung tâm Munich"
      },
      {
        "id": "KV_229",
        "src": "/images/journeys/ao-duc-2024/04-kv_229.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân bên trong sân vận động Allianz Arena, Đức.",
        "locationDetail": "Khán đài đỏ bên trong sân vận động Allianz Arena (Bayern Munich)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_231",
        "src": "/images/journeys/ao-duc-2024/06-kv_231.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân và đồng nghiệp chụp ảnh trước Tòa thị chính ở quảng trường Marienplatz, Munich.",
        "locationDetail": "Quảng trường Marienplatz với Tòa thị chính kiểu Gothic tại Munich (Đức)",
        "people": "Chị Khánh Vân & đồng nghiệp trong đoàn M-Star"
      },
      {
        "id": "KV_232",
        "src": "/images/journeys/ao-duc-2024/07-kv_232.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân và đồng nghiệp chụp ảnh giữa nắng ở trung tâm Munich.",
        "locationDetail": "Quảng trường Marienplatz trong nắng, trời xanh (Đức)",
        "people": "Chị Khánh Vân & nữ đồng nghiệp"
      },
      {
        "id": "KV_234",
        "src": "/images/journeys/ao-duc-2024/09-kv_234.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân ngồi trên ghế gỗ trắng cạnh cửa sổ lớn của tòa biệt thự phủ dây leo ở Đức.",
        "locationDetail": "Ghế gỗ trắng trước cửa sổ lớn của biệt thự cổ phủ dây leo xanh (Đức)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_235",
        "src": "/images/journeys/ao-duc-2024/10-kv_235.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân mặc măng tô kem đi trên con phố nhỏ ở làng Hallstatt.",
        "locationDetail": "Đường lát đá giữa các nhà gỗ cổ dưới chân núi Hallstatt (Áo)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_236",
        "src": "/images/journeys/ao-duc-2024/11-kv_236.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân chụp ảnh cùng người dân địa phương mặc trang phục truyền thống tại lễ hội vùng Bavaria (Munich, Đức).",
        "locationDetail": "Lều lễ hội truyền thống vùng Bavaria, tông vàng trắng, tại Munich",
        "people": "Chị Khánh Vân & người dân bản địa vùng Bavaria"
      },
      {
        "id": "KV_237",
        "src": "/images/journeys/ao-duc-2024/12-kv_237.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân đứng cạnh tán phong lá đỏ giữa trời thu ở Châu Âu.",
        "locationDetail": "Dưới tán phong lá đỏ, trời xanh mùa thu (Đức)",
        "people": "Chị Khánh Vân"
      }
    ],
    "video": {
      "src": "/videos/journeys/ao-duc-2024.mp4?v=3",
      "poster": "/videos/journeys/ao-duc-2024-poster.jpg?v=2",
      "durationLabel": "0:27",
      "soundLabel": "Acoustic Châu Âu",
      "title": "Phố cổ Salzburg và nắng thu Munich",
      "caption": "Phố cổ Getreidegasse ở Salzburg (Áo) và hàng cây trong nắng thu ở Đức."
    }
  },
  {
    "slug": "thuong-hai-2025",
    "pillar": "mstar-quoc-te",
    "pillarLabel": "M-Star Quốc tế",
    "year": "2025",
    "periodLabel": "Mùa thu 2025",
    "location": "Bến Thượng Hải & Cổ trấn Chu Gia Giác",
    "countryTag": "Trung Quốc",
    "title": "Bến Thượng Hải và cổ trấn Chu Gia Giác",
    "subtitle": "Chuyến M-Star 2025 đi qua Bến Thượng Hải bên sông Hoàng Phố, rồi về cổ trấn ngàn năm tuổi Chu Gia Giác.",
    "pullQuote": "Một bên là Thượng Hải mọc thêm nhà cao tầng, một bên là Chu Gia Giác yên ắng ngàn năm. Vân thấy phát triển bền cần cả đổi mới lẫn gốc rễ.",
    "companions": "Đoàn lãnh đạo & quản lý đạt chuẩn M-Star",
    "milestoneBadge": "M-Star Thượng Hải 2025",
    "heroImage": "/images/journeys/thuong-hai-2025/01-kv_248.jpg?v=2",
    "heroObjectPosition": "50% 25%",
    "photoCount": 13,
    "ctaMode": "career",
    "story": [
      "Đứng ở Bến Thượng Hải nhìn sang bờ Đông sông Hoàng Phố, thấy Tháp Minh Châu Phương Đông và cụm cao ốc tài chính Lục Gia Chủy, ai làm tài chính cũng cảm nhận được sức phát triển của một trung tâm kinh tế lớn.",
      "Rời những con phố gạch đỏ kiểu phương Tây, cả đoàn về cổ trấn sông nước Chu Gia Giác. Ngồi bên dòng kênh xanh chảy chậm, qua những nhịp cầu đá ngàn năm tuổi, nghe tiếng guitar vọng trên mặt nước, ai cũng dịu lại sau những tháng làm việc bận rộn.",
      "Mỗi chuyến M-Star ở các thành phố lớn Châu Á cho Vân và các anh chị em quản lý thêm góc nhìn về tác phong phục vụ chuyên nghiệp, và thêm sức cho chặng đường phía trước."
    ],
    "photos": [
      {
        "id": "KV_248",
        "src": "/images/journeys/thuong-hai-2025/01-kv_248.jpg?v=2",
        "width": 720,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân tại Bến Thượng Hải, phía sau là Tháp Minh Châu Phương Đông.",
        "locationDetail": "Bến Thượng Hải (The Bund) bên sông Hoàng Phố, phía sau là Tháp Minh Châu Phương Đông",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_336",
        "src": "/images/journeys/thuong-hai-2025/11-kv_336.jpg?v=2",
        "width": 1600,
        "height": 1200,
        "orientation": "landscape",
        "caption": "Cả nhóm chị em quản lý tạo dáng đồng điệu trước mái đình cổ trấn Thượng Hải, lưu lại khoảnh khắc trẻ trung và hết mình.",
        "locationDetail": "Sân mái ngói cong rêu phong tại cổ trấn sông nước ngoại ô Thượng Hải",
        "people": "Chị Khánh Vân cùng tập thể 11 chị em lãnh đạo trong chuyến M-Star Thượng Hải 2025"
      },
      {
        "id": "KV_337",
        "src": "/images/journeys/thuong-hai-2025/12-kv_337.jpg?v=2",
        "width": 1600,
        "height": 1200,
        "orientation": "landscape",
        "caption": "Mười một chị em quản lý rạng rỡ dưới ánh đèn đêm Thượng Hải, mang theo phong thái tự tin của những người phụ nữ làm chủ sự nghiệp.",
        "locationDetail": "Không gian trưng bày và phố đêm lung linh ánh đèn vàng tại Thượng Hải",
        "people": "Chị Khánh Vân và 10 nữ quản lý trong buổi tối khám phá Thượng Hải"
      },
      {
        "id": "KV_338",
        "src": "/images/journeys/thuong-hai-2025/13-kv_338.jpg?v=2",
        "width": 1600,
        "height": 1200,
        "orientation": "landscape",
        "caption": "Nụ cười gần gũi của chị Khánh Vân và các chị em ngay trên chuyến xe đoàn, nơi những câu chuyện nghề và chuyện đời cứ nối dài không ngớt.",
        "locationDetail": "Bên trong khoang xe du lịch đưa đoàn đi tham quan tại Thượng Hải",
        "people": "Chị Khánh Vân cùng 5 chị em đồng đội thân thiết trên xe du lịch Thượng Hải"
      },
      {
        "id": "KV_249",
        "src": "/images/journeys/thuong-hai-2025/02-kv_249.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân và đồng nghiệp chụp ảnh trước các tòa nhà tài chính ở Thượng Hải.",
        "locationDetail": "Quảng trường Bến Thượng Hải nhìn sang cụm tháp Lục Gia Chủy",
        "people": "Chị Khánh Vân & nữ quản lý đồng nghiệp"
      },
      {
        "id": "KV_250",
        "src": "/images/journeys/thuong-hai-2025/03-kv_250.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Các nữ quản lý mặc đồ thu đông trên con phố kiến trúc cổ điển ở Thượng Hải.",
        "locationDetail": "Phố kiến trúc gạch đỏ kiểu phương Tây tại Bến Thượng Hải",
        "people": "Chị Khánh Vân & 6 nữ lãnh đạo, quản lý"
      },
      {
        "id": "KV_251",
        "src": "/images/journeys/thuong-hai-2025/04-kv_251.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân cầm ly trà, đi giữa các công trình cổ ở Bến Thượng Hải.",
        "locationDetail": "Vỉa hè lát đá giữa hai hàng nhà kiến trúc cổ điển tại Bến Thượng Hải",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_252",
        "src": "/images/journeys/thuong-hai-2025/05-kv_252.jpg?v=2",
        "width": 720,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân cùng các thành viên trong đoàn trước cổng cổ trấn Chu Gia Giác (Thượng Hải).",
        "locationDetail": "Trước cổng khu du lịch cổ trấn Chu Gia Giác (Zhujiajiao, Thượng Hải)",
        "people": "Chị Khánh Vân & các anh chị đồng nghiệp trong đoàn"
      },
      {
        "id": "KV_253",
        "src": "/images/journeys/thuong-hai-2025/06-kv_253.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân bên dòng kênh ở cổ trấn Chu Gia Giác (Thượng Hải), trời thu trong.",
        "locationDetail": "Trên cầu đá nhìn xuống dòng kênh xanh của cổ trấn Chu Gia Giác",
        "people": "Chị Khánh Vân & bạn đồng hành trong chuyến đi"
      },
      {
        "id": "KV_254",
        "src": "/images/journeys/thuong-hai-2025/07-kv_254.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Nghe guitar bên dòng kênh cổ trấn Chu Gia Giác.",
        "locationDetail": "Trên thuyền gỗ đi dọc dòng kênh cổ trấn Chu Gia Giác",
        "people": "Chị Khánh Vân & các bạn trẻ biểu diễn guitar tại cổ trấn"
      },
      {
        "id": "KV_255",
        "src": "/images/journeys/thuong-hai-2025/08-kv_255.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Các chị em mặc trang phục truyền thống trong chuyến đi Thượng Hải.",
        "locationDetail": "Khu vườn cổ nhiều cây xanh tại Thượng Hải",
        "people": "Các nữ quản lý đồng nghiệp trong đoàn"
      },
      {
        "id": "KV_256",
        "src": "/images/journeys/thuong-hai-2025/09-kv_256.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Đêm tiệc Gala Dinner M-Star Thượng Hải 2025.",
        "locationDetail": "Khán phòng Gala Dinner M-Star Thượng Hải 2025",
        "people": "Chị Khánh Vân & bàn tiệc các quản lý xuất sắc"
      },
      {
        "id": "KV_257",
        "src": "/images/journeys/thuong-hai-2025/10-kv_257.jpg?v=2",
        "width": 1280,
        "height": 720,
        "orientation": "landscape",
        "caption": "Sông Hoàng Phố và thành phố Thượng Hải lên đèn lúc hoàng hôn.",
        "locationDetail": "Khúc quanh sông Hoàng Phố và Thượng Hải lên đèn, nhìn từ trên cao",
        "people": "Không có nhân vật chính (toàn cảnh thành phố)"
      }
    ],
    "video": {
      "src": "/videos/journeys/thuong-hai-2025.mp4?v=3",
      "poster": "/videos/journeys/thuong-hai-2025-poster.jpg?v=2",
      "durationLabel": "0:25",
      "soundLabel": "Piano Phố Cổ",
      "title": "Nắng thu Thượng Hải và cổ trấn Chu Gia Giác",
      "caption": "Khu phố cổ Thượng Hải và dòng kênh xanh ở cổ trấn Chu Gia Giác."
    }
  },
  {
    "slug": "kickoff-phan-thiet-2026",
    "pillar": "dinh-cao-nhiet-huyet",
    "pillarLabel": "Vinh danh & Kick-off",
    "year": "2026",
    "periodLabel": "Giữa năm 2026",
    "location": "Bàu Trắng & Phan Thiết, Bình Thuận",
    "countryTag": "Việt Nam",
    "title": "Chạy bộ dưới điện gió Bàu Trắng với tấm Bib 0069",
    "subtitle": "Kick-off Giữa Năm 2026 của quản lý Green Power: chạy buổi sáng ở Bàu Trắng, họp chiến lược, rồi đêm biển Stronger Together.",
    "pullQuote": "Làm quản lý tài chính giống chạy đường dài hơn là nước rút: cần hơi thở đều và những người chạy cùng nhịp.",
    "companions": "Tập thể quản lý Green Power Group",
    "milestoneBadge": "Kick-off Giữa Năm 2026",
    "heroImage": "/images/journeys/kickoff-phan-thiet-2026/01-kv_300.jpg?v=3",
    "heroObjectPosition": "50% 24%",
    "photoCount": 11,
    "ctaMode": "career",
    "story": [
      "Sáng chạy bộ ở cung đường điện gió Bàu Trắng, Vân nhận tấm Bib số 0069, trùng với số Khu vực HCM69 đã gắn bó với Vân từ những ngày đầu xây dựng đội ngũ. Gió biển mát lúc bình minh, những cánh quạt trắng rất lớn, và anh chị em đồng nghiệp chạy cùng.",
      "Trong hội nghị với thông điệp Trải thảm Xanh đón tinh anh, toàn vùng rà soát chiến lược nửa cuối năm, cập nhật giải pháp liên kết đầu tư thế hệ mới Xanh Phú Quý và chia sẻ kinh nghiệm phát triển đội ngũ quản lý chuyển ngành GTF.",
      "Tối đến trên bãi biển Phan Thiết, khoảng cách chức danh nhường chỗ cho tiếng cười và bữa hải sản bên bờ biển. Tập thể hơn 500 người đi cùng nhau nhiều năm nhờ sự chân thành đó."
    ],
    "photos": [
      {
        "id": "KV_300",
        "src": "/images/journeys/kickoff-phan-thiet-2026/01-kv_300.jpg?v=3",
        "width": 853,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân đeo số Bib 0069 (trùng số Khu vực HCM69) chạy dưới cánh quạt điện gió ở Phan Thiết lúc bình minh.",
        "locationDetail": "Đường chạy ven biển dưới cánh quạt điện gió lớn tại Bàu Trắng, Phan Thiết",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_348",
        "src": "/images/journeys/kickoff-phan-thiet-2026/09-kv_348.jpg?v=2",
        "width": 1600,
        "height": 1200,
        "orientation": "landscape",
        "caption": "Tập thể Green Power Group rạng rỡ bên bảng vinh danh Tinh Anh Toàn Năng tại Hội nghị giữa năm 2026 ở Phan Thiết.",
        "locationDetail": "Sân khấu Hội nghị giữa năm 2026 Stronger Faster với bảng vinh danh Tinh Anh Toàn Năng",
        "people": "Chị Khánh Vân cùng hơn 35 quản lý và tư vấn viên Green Power Group"
      },
      {
        "id": "KV_349",
        "src": "/images/journeys/kickoff-phan-thiet-2026/10-kv_349.jpg?v=2",
        "width": 1200,
        "height": 1600,
        "orientation": "portrait",
        "caption": "Đội ngũ chị em Green Power đồng bộ trong sắc áo sự kiện, lưu lại bức ảnh tập thể tràn đầy khí thế trước giờ vào hội nghị.",
        "locationDetail": "Mặt tiền kiến trúc vòm trắng sang trọng tại khu tổ hợp nghỉ dưỡng Phan Thiết",
        "people": "Chị Khánh Vân cùng hơn 20 nữ quản lý và thành viên Green Power"
      },
      {
        "id": "KV_350",
        "src": "/images/journeys/kickoff-phan-thiet-2026/11-kv_350.jpg?v=2",
        "width": 1600,
        "height": 1200,
        "orientation": "landscape",
        "caption": "Giữa khán phòng rực sáng sắc xanh ở Phan Thiết, chị Khánh Vân cùng anh chị em Green Power giơ cao gậy cổ vũ tiếp thêm lửa cho chặng đường mới.",
        "locationDetail": "Khán phòng hội nghị Phan Thiết rực sáng ánh đèn xanh đầy nhiệt huyết",
        "people": "Chị Khánh Vân cùng hàng chục đồng đội Green Power trong khán phòng hội nghị"
      },
      {
        "id": "KV_301",
        "src": "/images/journeys/kickoff-phan-thiet-2026/02-kv_301.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Hai chị em quản lý chụp ảnh cạnh cụm cột đá bảy màu sau buổi chạy sáng ở Phan Thiết.",
        "locationDetail": "Cụm cột đá nghệ thuật bảy màu và hồ nước dưới nắng sớm ở Phan Thiết",
        "people": "Chị Khánh Vân & nữ quản lý đồng nghiệp"
      },
      {
        "id": "KV_302",
        "src": "/images/journeys/kickoff-phan-thiet-2026/03-kv_302.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Tập thể quản lý Green Power chụp ảnh trước backdrop Trải thảm Xanh đón tinh anh tại Kick-off 2026.",
        "locationDetail": "Trước sân khấu hội nghị với thông điệp Trải thảm Xanh đón tinh anh",
        "people": "Chị Khánh Vân & tập thể quản lý Green Power"
      },
      {
        "id": "KV_303",
        "src": "/images/journeys/kickoff-phan-thiet-2026/04-kv_303.jpg?v=2",
        "width": 1280,
        "height": 853,
        "orientation": "landscape",
        "caption": "Tập thể quản lý Green Power tại sân khấu biển Stronger Together trong đêm Gala Kick-off Phan Thiết 2026.",
        "locationDetail": "Sân khấu ngoài trời bên biển Phan Thiết với thông điệp Stronger Together",
        "people": "Đại gia đình quản lý Green Power"
      },
      {
        "id": "KV_304",
        "src": "/images/journeys/kickoff-phan-thiet-2026/05-kv_304.jpg?v=2",
        "width": 720,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Các quản lý trẻ chụp ảnh ở khu nghỉ dưỡng biển Phan Thiết, trời xanh.",
        "locationDetail": "Quảng trường giữa hai tòa tháp resort hướng ra biển Phan Thiết",
        "people": "Chị Khánh Vân & dàn quản lý trẻ"
      },
      {
        "id": "KV_305",
        "src": "/images/journeys/kickoff-phan-thiet-2026/06-kv_305.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân chụp cùng ấn phẩm giải pháp bảo hiểm liên kết đầu tư Xanh Phú Quý tại hội nghị 2026.",
        "locationDetail": "Cạnh ấn phẩm giới thiệu giải pháp bảo hiểm liên kết đầu tư thế hệ mới Xanh Phú Quý của Manulife",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_306",
        "src": "/images/journeys/kickoff-phan-thiet-2026/07-kv_306.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Bữa tối của quản lý Green Power tại Phan Thiết.",
        "locationDetail": "Phòng tiệc gỗ tại Phan Thiết",
        "people": "Tập thể quản lý Green Power"
      },
      {
        "id": "KV_307",
        "src": "/images/journeys/kickoff-phan-thiet-2026/08-kv_307.jpg?v=2",
        "width": 1280,
        "height": 720,
        "orientation": "landscape",
        "caption": "Các chị em quản lý chụp ảnh trước tòa nhà văn phòng, trước giờ khởi hành đi Kick-off Phan Thiết.",
        "locationDetail": "Sảnh tòa nhà văn phòng, trước giờ lên xe đi Phan Thiết",
        "people": "Chị Khánh Vân & các nữ quản lý"
      }
    ],
    "video": {
      "src": "/videos/journeys/kickoff-phan-thiet-2026.mp4?v=4",
      "poster": "/videos/journeys/kickoff-phan-thiet-2026-poster.jpg?v=3",
      "durationLabel": "0:26",
      "soundLabel": "Âm Thanh Thực Tế & Guitar",
      "title": "Đường chạy điện gió Bib 0069, hội nghị và tiệc biển Phan Thiết",
      "caption": "Buổi chạy sáng, hội nghị và đêm tiệc của đội ngũ quản lý Green Power trong Kick-off Phan Thiết 2026."
    }
  },
  {
    "slug": "thien-nguyen-dak-lak-2026",
    "pillar": "hanh-trinh-se-chia",
    "pillarLabel": "Thiện nguyện",
    "year": "2026",
    "periodLabel": "Năm 2026",
    "location": "Mái ấm Ea Kênh, Krông Pắc, Đắk Lắk",
    "countryTag": "Việt Nam",
    "title": "Chuyến thiện nguyện Kết Nối Yêu Thương ở Krông Pắc, Đắk Lắk",
    "subtitle": "Đoàn Green Power khởi hành từ sáng sớm, mang ba lô đi học, sữa và quà đến các em nhỏ ở Đắk Lắk.",
    "pullQuote": "Đi thiện nguyện nhắc mình biết quý hơn cuộc sống bình yên đang có.",
    "companions": "Đoàn thiện nguyện Green Power Group",
    "milestoneBadge": "Thiện Nguyện Đắk Lắk 2026",
    "heroImage": "/images/journeys/thien-nguyen-dak-lak-2026/01-kv_308.jpg?v=2",
    "heroObjectPosition": "50% 35%",
    "photoCount": 11,
    "ctaMode": "family",
    "story": [
      "Trời còn chưa sáng hẳn, anh chị em đoàn thiện nguyện Green Power đã có mặt đủ bên băng rôn Kết Nối Yêu Thương, xếp từng thùng sữa và ba lô xanh Manulife lên xe đi Krông Pắc, Đắk Lắk.",
      "Ở hội trường mái ấm xã Ea Kênh, các em nhỏ nhìn đoàn bằng đôi mắt tròn xoe, có em ôm chiếc cặp mới rất rụt rè. Cả đoàn quên hết mệt sau quãng đường hàng trăm cây số. Phần quà giản dị, do các anh chị quản lý, tư vấn viên và bạn bè trong đoàn tự nguyện đóng góp.",
      "Bảo hiểm nhân thọ là nghề bảo vệ sự bình an trước biến cố. Với Green Power, đi thiện nguyện cùng cộng đồng là một phần của cách làm nghề."
    ],
    "photos": [
      {
        "id": "KV_308",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/01-kv_308.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Đoàn thiện nguyện Green Power chụp ảnh cùng các em nhỏ tại Mái ấm xã Ea Kênh (Đắk Lắk) trong chương trình Kết Nối Yêu Thương 2026.",
        "locationDetail": "Hội trường Mái ấm xã Ea Kênh (Krông Pắc, Đắk Lắk), cạnh băng rôn Kết Nối Yêu Thương, Trao Hạt Vàng Gửi Bình An",
        "people": "Chị Khánh Vân, đoàn thiện nguyện & các em nhỏ"
      },
      {
        "id": "KV_351",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/09-kv_351.jpg?v=2",
        "width": 1600,
        "height": 1200,
        "orientation": "landscape",
        "caption": "Tập thể Green Power cùng bà con xã Ea Yiêng lưu lại khoảnh khắc ý nghĩa bên băng rôn Hành trình Kết Nối Yêu Thương tại Đắk Lắk.",
        "locationDetail": "Nhà sinh hoạt cộng đồng xã Ea Yiêng, Đắk Lắk cùng băng rôn Hành trình Kết Nối Yêu Thương",
        "people": "Chị Khánh Vân cùng tập thể tình nguyện viên Green Power Group và bà con địa phương"
      },
      {
        "id": "KV_352",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/10-kv_352.jpg?v=2",
        "width": 1600,
        "height": 1200,
        "orientation": "landscape",
        "caption": "Niềm hạnh phúc giản dị khi tận tay trao từng phần quà và đứng chụp ảnh cùng các em nhỏ vùng cao Đắk Lắk trong chuyến thiện nguyện.",
        "locationDetail": "Hội trường nhà cộng đồng Đắk Lắk trong buổi trao quà học tập và nhu yếu phẩm",
        "people": "Tập thể chị Khánh Vân, đội ngũ Green Power và hàng chục em nhỏ vùng cao Đắk Lắk"
      },
      {
        "id": "KV_353",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/11-kv_353.jpg?v=2",
        "width": 1600,
        "height": 900,
        "orientation": "landscape",
        "caption": "Cả đoàn thiện nguyện Green Power quây quần rạng rỡ tại Krông Pắc sau buổi trao quà, mang theo thật nhiều kỷ niệm đẹp về đất và người Tây Nguyên.",
        "locationDetail": "Quảng trường xã Krông Pắc, Đắk Lắk trong hành trình thiện nguyện Tây Nguyên",
        "people": "Chị Khánh Vân cùng hơn 30 thành viên đoàn thiện nguyện Green Power tại Krông Pắc"
      },
      {
        "id": "KV_309",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/02-kv_309.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân ngồi giữa các em nhỏ vùng cao Đắk Lắk.",
        "locationDetail": "Giữa các hàng ghế nhỏ chật kín thiếu nhi ở Krông Pắc",
        "people": "Chị Khánh Vân & các em nhỏ Đắk Lắk"
      },
      {
        "id": "KV_310",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/03-kv_310.jpg?v=2",
        "width": 720,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Hàng chục chiếc ba lô đi học mới cùng hàng trăm thùng sữa và nhu yếu phẩm đoàn chuẩn bị cho các em nhỏ.",
        "locationDetail": "Xếp trên hàng ghế đỏ trong hội trường xã tại Đắk Lắk",
        "people": "Không có nhân vật chính (quà tặng chuẩn bị trao)"
      },
      {
        "id": "KV_311",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/04-kv_311.jpg?v=2",
        "width": 720,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Hai em nhỏ ở Đắk Lắk ôm ba lô đi học mới và túi quà bánh sữa.",
        "locationDetail": "Dưới bóng cây trong sân mái ấm, tay cầm ba lô mới và quà",
        "people": "Hai em nhỏ vùng cao Đắk Lắk"
      },
      {
        "id": "KV_312",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/05-kv_312.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Buổi giao lưu và trao quà cho các em nhỏ tại Đắk Lắk.",
        "locationDetail": "Toàn cảnh hội trường buổi giao lưu, trao quà tại huyện Krông Pắc, Đắk Lắk",
        "people": "Đoàn thiện nguyện & đông đảo các em nhỏ, bà con địa phương"
      },
      {
        "id": "KV_313",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/06-kv_313.jpg?v=2",
        "width": 1280,
        "height": 720,
        "orientation": "landscape",
        "caption": "Toàn đoàn thiện nguyện tập trung từ sáng sớm tại TP.HCM, trước giờ xuất phát đi Đắk Lắk, quãng đường hàng trăm cây số.",
        "locationDetail": "Chụp ảnh cạnh băng rôn Kết Nối Yêu Thương trước giờ xe rời TP.HCM",
        "people": "Toàn đoàn thiện nguyện Green Power"
      },
      {
        "id": "KV_314",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/07-kv_314.jpg?v=2",
        "width": 1280,
        "height": 720,
        "orientation": "landscape",
        "caption": "Cả đoàn chụp ảnh ở quảng trường Krông Pắc sau buổi trao quà.",
        "locationDetail": "Quảng trường xã Krông Pắc, trời xanh",
        "people": "Tập thể đoàn thiện nguyện"
      },
      {
        "id": "KV_315",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/08-kv_315.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Cả đoàn chụp ảnh dưới nắng ở Đắk Lắk, kết thúc chuyến thiện nguyện Đắk Lắk 2026.",
        "locationDetail": "Khoảng sân ngoài trời đầy nắng ở Đắk Lắk",
        "people": "Cả đoàn thiện nguyện"
      }
    ],
    "video": {
      "src": "/videos/journeys/thien-nguyen-dak-lak-2026.mp4?v=3",
      "poster": "/videos/journeys/thien-nguyen-dak-lak-2026-poster.jpg?v=2",
      "durationLabel": "0:28",
      "soundLabel": "Giai Điệu Sẻ Chia",
      "title": "Chuyến Kết Nối Yêu Thương cùng các em nhỏ Krông Pắc, Đắk Lắk",
      "caption": "Từ chuyến xe sáng sớm qua núi đồi Tây Nguyên đến lúc trao tận tay từng ba lô và phần quà cho các em."
    }
  },
  {
    "slug": "han-quoc-2024",
    "pillar": "mstar-quoc-te",
    "pillarLabel": "M-Star Quốc tế",
    "year": "2024",
    "periodLabel": "Mùa xuân 2024",
    "location": "Seoul, Hàn Quốc",
    "countryTag": "Hàn Quốc",
    "title": "Hoa anh đào Seoul và đoàn nữ quản lý áo khoác xanh",
    "subtitle": "Chuyến M-Star mùa xuân 2024 ở Seoul đúng mùa hoa anh đào, cùng các nữ quản lý Green Power.",
    "pullQuote": "Đi một mình có thể tới đích nhanh hơn, nhưng đi dưới hoa anh đào cùng những người cộng sự mình tin thì vui hơn.",
    "companions": "Đội ngũ nữ quản lý Green Power & đoàn M-Star",
    "milestoneBadge": "M-Star Hàn Quốc 2024",
    "heroImage": "/images/journeys/han-quoc-2024/01-kv_216.jpg?v=2",
    "heroObjectPosition": "50% 35%",
    "photoCount": 12,
    "ctaMode": "career",
    "story": [
      "Seoul đón đoàn đúng tuần hoa anh đào nở rộ nhất năm. Từ những con dốc nhỏ đến bờ hồ Seokchon dưới tháp Lotte World, đâu cũng một màu trắng hồng dưới nắng xuân.",
      "Vân nhớ nhất buổi sáng cả nhóm nữ quản lý mặc áo khoác xanh lá Manulife giống nhau, nắm tay cười dưới hoa anh đào và trước sân Cung điện Hoàng gia Gyeongbokgung. Các chị em xuất thân từ nhiều nghề như giáo viên, ngân hàng, kế toán, kinh doanh tự do. Nay cùng ở Green Power, các chị giúp nhau tiến bộ.",
      "Buổi sáng cầm ly cà phê đi dạo trên đại lộ Seoul, hay ngồi yên trên bậc cầu thang gỗ dưới tán phong đỏ, cả đội có thêm sức cho chặng đường sắp tới."
    ],
    "photos": [
      {
        "id": "KV_216",
        "src": "/images/journeys/han-quoc-2024/01-kv_216.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Các nữ quản lý Green Power giơ tay chào dưới hoa anh đào nở rộ ở Seoul trong chuyến M-Star 2024.",
        "locationDetail": "Con đường rợp hoa anh đào nở trắng ở Seoul (Hàn Quốc)",
        "people": "Chị Khánh Vân & 9 nữ quản lý đồng nghiệp"
      },
      {
        "id": "KV_327",
        "src": "/images/journeys/han-quoc-2024/11-kv_327.jpg?v=2",
        "width": 1600,
        "height": 1200,
        "orientation": "landscape",
        "caption": "Sắc xanh Manulife và tà áo dài Việt Nam rạng rỡ giữa không gian sông nước Hàn Quốc trong chuyến M-Star 2024.",
        "locationDetail": "Khoang ngoài trời hướng sông rộng thoáng trong chuyến du lịch vinh danh tại Hàn Quốc",
        "people": "Chị Khánh Vân cùng đông đảo lãnh đạo, quản lý Manulife Việt Nam tại Hàn Quốc"
      },
      {
        "id": "KV_328",
        "src": "/images/journeys/han-quoc-2024/12-kv_328.jpg?v=2",
        "width": 1600,
        "height": 1200,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân cùng các chị em quản lý rạng rỡ dưới tán hoa anh đào Seoul, tận hưởng mùa xuân trọn vẹn sau một năm nỗ lực.",
        "locationDetail": "Con đường hoa anh đào nở rộ trắng xóa tại Seoul, Hàn Quốc",
        "people": "Chị Khánh Vân và nhóm nữ quản lý thân thiết trong đoàn M-Star Hàn Quốc 2024"
      },
      {
        "id": "KV_329",
        "src": "/images/journeys/han-quoc-2024/13-kv_329.jpg?v=2",
        "width": 1600,
        "height": 1200,
        "orientation": "landscape",
        "caption": "Khoảnh khắc chị Khánh Vân và các chị em đồng đội giơ tay đón gió biển cùng đàn hải âu trong hành trình M-Star Hàn Quốc 2024.",
        "locationDetail": "Boong phà giữa biển trời Hàn Quốc với đàn hải âu bay lượn phía sau",
        "people": "Chị Khánh Vân và nhóm đồng nghiệp nữ trên chuyến phà biển Hàn Quốc"
      },
      {
        "id": "KV_217",
        "src": "/images/journeys/han-quoc-2024/02-kv_217.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Các nữ quản lý mặc áo khoác xanh Manulife giống nhau đi dưới hàng hoa anh đào ở Hàn Quốc.",
        "locationDetail": "Con dốc hoa anh đào giữa Seoul vào mùa xuân",
        "people": "Chị Khánh Vân & đội ngũ nữ quản lý"
      },
      {
        "id": "KV_219",
        "src": "/images/journeys/han-quoc-2024/04-kv_219.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Đoàn quản lý chụp ảnh dưới cây anh đào lớn vào mùa xuân ở Hàn Quốc.",
        "locationDetail": "Dưới tán anh đào lớn đang nở bên bờ hồ ở Hàn Quốc",
        "people": "Chị Khánh Vân & các anh chị quản lý"
      },
      {
        "id": "KV_220",
        "src": "/images/journeys/han-quoc-2024/05-kv_220.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân mặc măng tô kem bên hồ Seokchon, phía sau là tháp Lotte World.",
        "locationDetail": "Bờ hồ Seokchon, phía sau là Lotte World Tower (Seoul)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_221",
        "src": "/images/journeys/han-quoc-2024/06-kv_221.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân mặc măng tô đỏ rượu vang giữa vườn hoa xuân trắng ở Hàn Quốc.",
        "locationDetail": "Khu vườn nhiều hoa xuân trắng ở Hàn Quốc",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_222",
        "src": "/images/journeys/han-quoc-2024/07-kv_222.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân cầm ly cà phê sáng đi trên đại lộ ở Seoul.",
        "locationDetail": "Đại lộ thoáng, nắng xuân, hàng cây xanh ở Seoul",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_223",
        "src": "/images/journeys/han-quoc-2024/08-kv_223.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân uống cà phê dưới tán phong đỏ, cạnh mái ngói cổ Hàn Quốc.",
        "locationDetail": "Cầu thang gỗ cạnh mái ngói truyền thống Hàn Quốc, dưới tán phong đỏ",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_224",
        "src": "/images/journeys/han-quoc-2024/09-kv_224.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân đứng trước cụm điêu khắc hiện đại ở trung tâm Seoul.",
        "locationDetail": "Tác phẩm điêu khắc đương đại trong trung tâm thương mại ở Seoul",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_225",
        "src": "/images/journeys/han-quoc-2024/10-kv_225.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Ba chị em quản lý đứng tựa vai nhau dưới hoa anh đào ở Hàn Quốc.",
        "locationDetail": "Con đường có vòm hoa anh đào trắng hồng ở Seoul",
        "people": "Chị Khánh Vân & hai nữ quản lý thân thiết"
      }
    ]
  },
  {
    "slug": "nam-ninh-2024",
    "pillar": "mstar-quoc-te",
    "pillarLabel": "M-Star Quốc tế",
    "year": "2024",
    "periodLabel": "Năm 2024",
    "location": "Nam Ninh, Quảng Tây",
    "countryTag": "Trung Quốc",
    "title": "Áo dài Việt ở phố cổ Nam Ninh, Quảng Tây",
    "subtitle": "Các chị em quản lý cùng mang áo dài truyền thống để chụp ảnh ở phố cổ Nam Ninh.",
    "pullQuote": "Dù đến miền đất nào, tà áo dài của phụ nữ Việt vẫn gây chú ý theo cách rất riêng.",
    "companions": "Tập thể quản lý kinh doanh Green Power",
    "milestoneBadge": "Hành Trình Nam Ninh 2024",
    "heroImage": "/images/journeys/nam-ninh-2024/01-kv_238.jpg?v=2",
    "heroObjectPosition": "50% 32%",
    "photoCount": 13,
    "ctaMode": "career",
    "story": [
      "Nam Ninh được gọi là thành phố xanh của Quảng Tây: đại lộ nhiều cây cổ thụ, cổng thành đá, và dòng sông chảy qua dãy phố cổ mái ngói âm dương.",
      "Trước ngày đi, các chị em quản lý trong vùng hẹn nhau mang áo dài Việt Nam. Cả đoàn mặc áo dài đỏ, hồng, trắng thêu hoa sen đứng trước kiến trúc gỗ cổ, nhiều du khách địa phương dừng lại mỉm cười nhìn. Các chị em thấy tự hào về áo dài Việt.",
      "Đi chung như vậy giúp các quản lý ở nhiều khu vực hiểu thêm đời sống của nhau. Về lại công việc, chuyện phối hợp và chia sẻ kinh nghiệm nhờ vậy dễ hơn."
    ],
    "photos": [
      {
        "id": "KV_238",
        "src": "/images/journeys/nam-ninh-2024/01-kv_238.jpg?v=2",
        "width": 1280,
        "height": 1146,
        "orientation": "landscape",
        "caption": "Đội ngũ quản lý Green Power mặc áo dài truyền thống Việt Nam trước dãy nhà cổ ở Nam Ninh.",
        "locationDetail": "Trước dãy nhà gỗ kiến trúc cổ phương Đông tại Nam Ninh",
        "people": "Chị Khánh Vân & tập thể quản lý Green Power"
      },
      {
        "id": "KV_333",
        "src": "/images/journeys/nam-ninh-2024/11-kv_333.jpg?v=2",
        "width": 1600,
        "height": 1200,
        "orientation": "landscape",
        "caption": "Hàng chục anh chị em trong đoàn cùng ngồi lại chụp ảnh kỷ niệm tại quảng trường trung tâm Nam Ninh, rộn ràng tiếng cười đầu năm.",
        "locationDetail": "Quảng trường trung tâm rộng lớn với tán cây xanh hình vòm nổi tiếng tại Nam Ninh, Trung Quốc",
        "people": "Tập thể đông đảo thành viên Green Power Group trong chuyến đi Nam Ninh 2024"
      },
      {
        "id": "KV_334",
        "src": "/images/journeys/nam-ninh-2024/12-kv_334.jpg?v=2",
        "width": 1600,
        "height": 1200,
        "orientation": "landscape",
        "caption": "Đêm Gala áo dài ấm áp tại Nam Ninh, nơi cả tập thể cùng nâng ly chúc mừng sinh nhật và sẻ chia niềm vui gắn bó.",
        "locationDetail": "Sân khấu Gala Dinner rực rỡ ánh đèn mừng sinh nhật thành viên trong đoàn tại Nam Ninh",
        "people": "Chị Khánh Vân và tập thể các chị em quản lý trên sân khấu đêm tiệc Nam Ninh"
      },
      {
        "id": "KV_335",
        "src": "/images/journeys/nam-ninh-2024/13-kv_335.jpg?v=2",
        "width": 1600,
        "height": 1200,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân và các chị em quản lý đứng thành hàng rạng rỡ trước cổng cổ Nam Ninh, ai cũng ánh lên niềm vui đồng hành.",
        "locationDetail": "Bậc tam cấp trước cổng kiến trúc cổ uy nghi tại Nam Ninh, Trung Quốc",
        "people": "Chị Khánh Vân cùng 10 chị em quản lý trong đoàn Nam Ninh 2024"
      },
      {
        "id": "KV_239",
        "src": "/images/journeys/nam-ninh-2024/02-kv_239.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Các nữ quản lý làm dấu trái tim trên bậc thềm dưới bóng cây trong chuyến đi Nam Ninh 2024.",
        "locationDetail": "Bậc thềm đá rộng dưới cây cổ thụ tại Nam Ninh",
        "people": "Chị Khánh Vân & 9 nữ quản lý"
      },
      {
        "id": "KV_240",
        "src": "/images/journeys/nam-ninh-2024/03-kv_240.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Nhóm nữ quản lý đi trên đại lộ thương mại ở Nam Ninh.",
        "locationDetail": "Vỉa hè đại lộ thương mại ở trung tâm Nam Ninh",
        "people": "Chị Khánh Vân & nhóm nữ quản lý"
      },
      {
        "id": "KV_241",
        "src": "/images/journeys/nam-ninh-2024/04-kv_241.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân đứng trước những dải lụa cầu phúc màu đỏ ở Nam Ninh.",
        "locationDetail": "Trước hàng dải lụa chúc phúc màu đỏ tại một ngôi đền cổ ở Nam Ninh",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_242",
        "src": "/images/journeys/nam-ninh-2024/05-kv_242.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân mặc áo dài hồng thêu hoa sen, đứng cạnh một chị em đồng nghiệp giữa vườn hoa.",
        "locationDetail": "Cạnh giàn hoa giấy đang nở",
        "people": "Chị Khánh Vân & nữ quản lý đồng nghiệp"
      },
      {
        "id": "KV_243",
        "src": "/images/journeys/nam-ninh-2024/06-kv_243.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân mặc áo khoác denim bên dòng sông chảy qua khu phố cổ Nam Ninh.",
        "locationDetail": "Lan can đá bên sông, phía xa là dãy nhà cổ mái ngói âm dương",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_244",
        "src": "/images/journeys/nam-ninh-2024/07-kv_244.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân đứng trước cổng thành cổ ở Nam Ninh.",
        "locationDetail": "Quảng trường lát đá trước cổng thành cổ ở Nam Ninh",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_245",
        "src": "/images/journeys/nam-ninh-2024/08-kv_245.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân cười trước cổng đá cổ ở Nam Ninh.",
        "locationDetail": "Trước vòm cổng đá cổ",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_246",
        "src": "/images/journeys/nam-ninh-2024/09-kv_246.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân ôm một người em đồng nghiệp bên hồ nước.",
        "locationDetail": "Bên mặt hồ xanh, phía xa là lầu cổ",
        "people": "Chị Khánh Vân & nữ đồng nghiệp"
      },
      {
        "id": "KV_247",
        "src": "/images/journeys/nam-ninh-2024/10-kv_247.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân và đồng nghiệp đứng trên đài ngắm cảnh nhìn dãy núi ở Nam Ninh.",
        "locationDetail": "Đài ngắm cảnh trên cao nhìn ra dãy núi đá vôi vùng Quảng Tây",
        "people": "Chị Khánh Vân & nữ đồng nghiệp"
      }
    ]
  },
  {
    "slug": "phap-2019",
    "pillar": "mstar-quoc-te",
    "pillarLabel": "M-Star Quốc tế",
    "year": "2019",
    "periodLabel": "Mùa thu 2019",
    "location": "Paris & Vùng Rượu Vang, Pháp",
    "countryTag": "Pháp",
    "title": "Paris mùa thu 2019, chuyến M-Star mở đầu",
    "subtitle": "Chuyến vinh danh M-Star Pháp 2019 là chuyến đầu tiên trong chuỗi các chuyến đi quốc tế của Khánh Vân tại Manulife.",
    "pullQuote": "Đêm đầu dưới chân Tháp Eiffel sáng đèn, Vân tự hứa những chuyến sau sẽ có thêm nhiều đồng đội cùng đi.",
    "companions": "Đoàn danh hiệu M-Star Manulife Việt Nam 2019",
    "milestoneBadge": "M-Star Pháp 2019",
    "heroImage": "/images/journeys/phap-2019/01-kv_206.jpg?v=2",
    "heroObjectPosition": "50% 32%",
    "photoCount": 13,
    "ctaMode": "career",
    "story": [
      "Xem lại ảnh chụp ở Paris mùa thu 2019, Vân nhớ lại cảm giác những năm đầu đi lấy danh hiệu quốc tế. Paris tháng mười có hàng phong chuyển vàng dọc đại lộ, sông Seine chảy chậm và Vương cung thánh đường Sacré-Cœur trên đồi Montmartre.",
      "Vân nhớ nhất lúc dang tay dưới chân Tháp Eiffel sáng đèn vàng trong đêm thu se lạnh. Chuyến đi cho Vân thấy rõ tầm của một tập đoàn tài chính toàn cầu, và thêm tin vào con đường mình chọn.",
      "Lời hứa dưới chân Tháp Eiffel năm 2019 nay đã thành thật. Hồi đó Vân đi một mình trong những chuyến vinh danh đầu tiên, còn bây giờ mỗi kỳ M-Star đều có đông anh chị em quản lý của Green Power Group đi cùng."
    ],
    "photos": [
      {
        "id": "KV_206",
        "src": "/images/journeys/phap-2019/01-kv_206.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân dang tay dưới chân Tháp Eiffel sáng đèn trong chuyến vinh danh M-Star Pháp 2019.",
        "locationDetail": "Quảng trường dưới chân Tháp Eiffel, đèn vàng ban đêm tại Paris (Pháp)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_324",
        "src": "/images/journeys/phap-2019/11-kv_324.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Đoàn lãnh đạo và quản lý M-Star Pháp 2019 chụp ảnh tập thể rạng rỡ tại sân bay, mở đầu chuyến xuất ngoại đầu tiên đầy tự hào.",
        "locationDetail": "Sảnh nhà ga sân bay quốc tế trước giờ khởi hành đến Pháp",
        "people": "Chị Khánh Vân và tập thể đoàn lãnh đạo, quản lý M-Star Pháp 2019"
      },
      {
        "id": "KV_325",
        "src": "/images/journeys/phap-2019/12-kv_325.jpg?v=2",
        "width": 1276,
        "height": 956,
        "orientation": "landscape",
        "caption": "Tập thể đoàn M-Star 2019 quây quần giữa nắng sớm vùng đồi nho Champagne, lưu giữ kỷ niệm ngày đặt chân đến nước Pháp.",
        "locationDetail": "Sườn đồi trồng nho xanh mướt vùng Champagne dưới bầu trời trong xanh nước Pháp",
        "people": "Chị Khánh Vân và tập thể đoàn đại biểu M-Star Pháp 2019"
      },
      {
        "id": "KV_326",
        "src": "/images/journeys/phap-2019/13-kv_326.jpg?v=2",
        "width": 960,
        "height": 640,
        "orientation": "landscape",
        "caption": "Cả đoàn M-Star Pháp 2019 rạng rỡ trước Nhà hát lớn Palais Garnier giữa lòng Paris, ghi dấu một cột mốc đáng nhớ trong sự nghiệp.",
        "locationDetail": "Quảng trường trước Nhà hát lớn Palais Garnier tráng lệ tại thủ đô Paris, Pháp",
        "people": "Chị Khánh Vân cùng tập thể đoàn M-Star Việt Nam tại Paris"
      },
      {
        "id": "KV_207",
        "src": "/images/journeys/phap-2019/02-kv_207.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Tháp Eiffel nhìn từ đại lộ có hàng cây thu ở Paris.",
        "locationDetail": "Tháp Eiffel nhìn từ đại lộ cây thu, trời xanh nhạt ở Paris",
        "people": "Không có nhân vật chính (cảnh quan biểu tượng)"
      },
      {
        "id": "KV_208",
        "src": "/images/journeys/phap-2019/03-kv_208.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân mặc măng tô nâu bên lan can sông Seine ở Paris.",
        "locationDetail": "Bờ sông Seine có du thuyền, phía xa là kiến trúc cổ điển Pháp",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_209",
        "src": "/images/journeys/phap-2019/04-kv_209.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân trước một công trình kiến trúc cổ điển Pháp, xung quanh là cây lá mùa thu.",
        "locationDetail": "Sân trước tòa kiến trúc cổ điển Pháp, có cây vàng đỏ mùa thu",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_210",
        "src": "/images/journeys/phap-2019/05-kv_210.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân ngồi cạnh hàng cây bắt đầu vàng trên một đại lộ ở Pháp.",
        "locationDetail": "Đại lộ có hàng cây lá vàng đầu thu ở Pháp",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_211",
        "src": "/images/journeys/phap-2019/06-kv_211.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân đi dạo dưới tán cây mùa thu trong nắng ở Pháp.",
        "locationDetail": "Lối đi uốn lượn dưới cây lá vàng trong công viên ở Pháp",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_212",
        "src": "/images/journeys/phap-2019/07-kv_212.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chân dung chị Khánh Vân giữa nắng thu ở Paris.",
        "locationDetail": "Hàng cây thu vàng dưới nắng nhẹ ở Paris",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_213",
        "src": "/images/journeys/phap-2019/08-kv_213.jpg?v=2",
        "width": 962,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân cầm chiếc lá phong mùa thu ở Pháp.",
        "locationDetail": "Hàng cây cổ thụ ở Paris, tay cầm lá phong vàng",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_214",
        "src": "/images/journeys/phap-2019/09-kv_214.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân đội mũ nồi kem, đứng cạnh Vương cung thánh đường Sacré-Cœur trên đồi Montmartre.",
        "locationDetail": "Bậc đá cổ cạnh Vương cung thánh đường Sacré-Cœur trên đồi Montmartre (Paris)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_215",
        "src": "/images/journeys/phap-2019/10-kv_215.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân bên chiếc vali, vừa đến sân bay Paris, bắt đầu chuyến M-Star 2019.",
        "locationDetail": "Sảnh sân bay Paris, cạnh bảng chào đón hành khách đến Pháp",
        "people": "Chị Khánh Vân"
      }
    ]
  },
  {
    "slug": "diem-tua-to-am",
    "pillar": "diem-tua-to-am",
    "pillarLabel": "Gia đình & đời thường",
    "year": "2024–2026",
    "periodLabel": "Nhịp sống thường nhật",
    "location": "Đà Lạt & những kỳ nghỉ gia đình",
    "countryTag": "Gia đình",
    "title": "Sau những chuyến đi xa, Vân vẫn thích nhất là về nhà",
    "subtitle": "Mười chín bức ảnh đời thường của Khánh Vân, nhiều ảnh chụp cùng chồng, con gái lớn Minh Châu và cậu con trai út.",
    "pullQuote": "Đi qua nhiều thành phố lớn, Vân vẫn thấy điều quý nhất là chồng con bình an dưới mái nhà mình.",
    "companions": "Ông xã, con gái Minh Châu & con trai út",
    "milestoneBadge": "Gia đình & đời thường",
    "heroImage": "/images/journeys/diem-tua-to-am/01-kv_289.jpg?v=2",
    "heroObjectPosition": "50% 30%",
    "photoCount": 19,
    "ctaMode": "family",
    "story": [
      "Khách hàng và bạn bè hay hỏi Vân làm sao vừa điều hành đội ngũ hơn 500 nhân sự, với lịch hội nghị và đào tạo dày đặc, vừa giữ được sự gần gũi với chồng và hai con. Vân trả lời là phải có mặt thật sự khi ở nhà, và có người bạn đời hiểu mình.",
      "Buổi tối về nhà hay những cuối tuần nghỉ ở Đà Lạt bên hồ, Vân gác con số lại, chỉ làm vợ và làm mẹ. Cả nhà mặc áo thun giống nhau nắm tay đi dạo. Vân cùng Minh Châu đi giữa vườn trái chín ở Đà Lạt như hai người bạn. Vân ngồi cạnh bé út tô màu rồi nhận cái ôm thật chặt trên ban công.",
      "Thương gia đình nhỏ này giúp Vân hiểu tâm tư của khách khi họ tìm đến. Quỹ học vấn, quỹ hưu trí hay một hợp đồng bảo hiểm nhân thọ đều nhằm một việc: giữ cho gia đình còn đi chơi được với nhau khi có biến cố."
    ],
    "photos": [
      {
        "id": "KV_289",
        "src": "/images/journeys/diem-tua-to-am/01-kv_289.jpg?v=2",
        "width": 1280,
        "height": 852,
        "orientation": "landscape",
        "caption": "Gia đình bốn người mặc áo xanh giống nhau, nắm tay nhau đi dạo trên lối đi nhiều cây.",
        "locationDetail": "Lối đi bộ nhiều cây xanh trong khu đô thị",
        "people": "Vợ chồng chị Khánh Vân, con gái Minh Châu & con trai út"
      },
      {
        "id": "KV_290",
        "src": "/images/journeys/diem-tua-to-am/02-kv_290.jpg?v=2",
        "width": 1280,
        "height": 961,
        "orientation": "landscape",
        "caption": "Cả nhà chụp ảnh bên chiếc xe đạp chở giỏ trái cây chín, dưới hàng thông.",
        "locationDetail": "Bên chiếc xe đạp cổ chở giỏ quýt vàng, dưới hàng thông",
        "people": "Vợ chồng chị Khánh Vân & hai con"
      },
      {
        "id": "KV_291",
        "src": "/images/journeys/diem-tua-to-am/03-kv_291.jpg?v=2",
        "width": 904,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Bốn người dang tay đón gió trên cây cầu gỗ giữa rừng.",
        "locationDetail": "Cây cầu gỗ bắc qua khe suối giữa rừng cây",
        "people": "Vợ chồng chị Khánh Vân & hai con"
      },
      {
        "id": "KV_292",
        "src": "/images/journeys/diem-tua-to-am/04-kv_292.jpg?v=2",
        "width": 863,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân và Minh Châu mặc đồ trắng trong khu vườn trái chín ở Đà Lạt.",
        "locationDetail": "Giữa khu vườn quýt chín trĩu quả",
        "people": "Chị Khánh Vân & con gái lớn Minh Châu"
      },
      {
        "id": "KV_293",
        "src": "/images/journeys/diem-tua-to-am/05-kv_293.jpg?v=2",
        "width": 1280,
        "height": 904,
        "orientation": "landscape",
        "caption": "Ảnh gia đình bốn người trong khu vườn cây.",
        "locationDetail": "Lối nhỏ phủ cỏ giữa vườn cây ăn trái",
        "people": "Vợ chồng chị Khánh Vân & hai con"
      },
      {
        "id": "KV_294",
        "src": "/images/journeys/diem-tua-to-am/06-kv_294.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Gia đình bốn người đứng sát nhau dưới cổng gỗ phủ hoa trong kỳ nghỉ ở Đà Lạt.",
        "locationDetail": "Dưới cổng gỗ phủ hoa trắng, trước ngôi nhà mái ngói dưới tán thông Đà Lạt",
        "people": "Vợ chồng chị Khánh Vân & hai con"
      },
      {
        "id": "KV_295",
        "src": "/images/journeys/diem-tua-to-am/07-kv_295.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Cả nhà ngồi ngắm hồ và núi vào buổi chiều.",
        "locationDetail": "Sàn gỗ quán nhỏ ven hồ lớn, phía xa là dãy núi xanh",
        "people": "Vợ chồng chị Khánh Vân & hai con"
      },
      {
        "id": "KV_296",
        "src": "/images/journeys/diem-tua-to-am/08-kv_296.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Cả nhà mặc áo xanh ngọc giống nhau trong kỳ nghỉ cuối tuần.",
        "locationDetail": "Lối đi dưới hàng dừa trong khu nghỉ dưỡng sinh thái",
        "people": "Vợ chồng chị Khánh Vân & hai con"
      },
      {
        "id": "KV_297",
        "src": "/images/journeys/diem-tua-to-am/09-kv_297.jpg?v=2",
        "width": 1280,
        "height": 852,
        "orientation": "landscape",
        "caption": "Một cậu bé ôm cổ chị Khánh Vân ở góc ban công nhiều cây.",
        "locationDetail": "Góc ban công nhiều cây xanh và ánh sáng tự nhiên",
        "people": "Chị Khánh Vân & một cậu bé"
      },
      {
        "id": "KV_298",
        "src": "/images/journeys/diem-tua-to-am/10-kv_298.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân ngồi cạnh một cậu bé đang tô màu vào buổi sáng cuối tuần.",
        "locationDetail": "Bàn gỗ nhỏ nhiều ánh sáng, bên hiên nhiều cây",
        "people": "Chị Khánh Vân & một cậu bé"
      },
      {
        "id": "KV_299",
        "src": "/images/journeys/diem-tua-to-am/11-kv_299.jpg?v=2",
        "width": 853,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Vợ chồng chị Khánh Vân nắm tay nhìn ra biển trong bộ ảnh kỷ niệm hôn nhân.",
        "locationDetail": "Thảm cỏ dưới hàng dừa bên bờ biển",
        "people": "Vợ chồng chị Khánh Vân"
      },
      {
        "id": "KV_316",
        "src": "/images/journeys/diem-tua-to-am/12-kv_316.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân treo tấm thiệp ước nguyện lên cành lộc xanh những ngày đầu năm mới.",
        "locationDetail": "Cành lộc đầu xuân treo các tấm thiệp ước nguyện xanh trắng",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_317",
        "src": "/images/journeys/diem-tua-to-am/13-kv_317.jpg?v=2",
        "width": 852,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân mặc đầm dạ hội đỏ trên lối đi sân vườn buổi tối.",
        "locationDetail": "Lối đi sân vườn sáng đèn vàng buổi tối",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_318",
        "src": "/images/journeys/diem-tua-to-am/14-kv_318.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân đứng dưới cổng vòm hoa hồng trước giờ dự tiệc.",
        "locationDetail": "Dưới cổng vòm hoa hồng đỏ trong vườn lúc chiều tối",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_319",
        "src": "/images/journeys/diem-tua-to-am/15-kv_319.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân mặc áo khoác hồng phấn và quần jeans.",
        "locationDetail": "Quảng trường thoáng, có công trình kiến trúc trắng hiện đại dưới trời xanh",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_320",
        "src": "/images/journeys/diem-tua-to-am/16-kv_320.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân ngồi trong xe, trên đường đi làm việc.",
        "locationDetail": "Trong xe ô tô, ánh sáng tự nhiên, trên đường đi gặp khách hàng",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_321",
        "src": "/images/journeys/diem-tua-to-am/17-kv_321.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân và chồng ngồi trong xe ô tô, trên đường đi.",
        "locationDetail": "Trong khoang xe ô tô lúc nắng sớm",
        "people": "Vợ chồng chị Khánh Vân"
      },
      {
        "id": "KV_322",
        "src": "/images/journeys/diem-tua-to-am/18-kv_322.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Bốn chị em quản lý làm dấu trái tim ở sân bay trước giờ bay.",
        "locationDetail": "Hành lang kính sáng ở nhà ga sân bay trước giờ bay",
        "people": "Chị Khánh Vân & 3 nữ quản lý thân thiết"
      },
      {
        "id": "KV_323",
        "src": "/images/journeys/diem-tua-to-am/19-kv_323.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân và một cậu bé bên cây thông Giáng sinh dịp cuối năm.",
        "locationDetail": "Bên cây thông Giáng sinh trang trí và ông già Noel",
        "people": "Chị Khánh Vân & một cậu bé"
      }
    ]
  }
];
