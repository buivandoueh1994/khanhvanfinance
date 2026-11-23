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
    label: 'Tất cả hành trình',
    shortLabel: 'Tất cả',
    description: 'Trọn vẹn 11 chương ký ức từ những chuyến thưởng huấn năm châu đến điểm tựa gia đình.',
  },
  {
    key: 'mstar-quoc-te',
    label: 'Dấu ấn Năm châu (M-Star)',
    shortLabel: 'M-Star Quốc tế',
    description: 'Bảy hành trình vinh danh quốc tế tại Pháp, Hàn Quốc, Áo, Đức, Nhật Bản và Trung Quốc.',
  },
  {
    key: 'dinh-cao-nhiet-huyet',
    label: 'Đỉnh cao & Nhiệt huyết',
    shortLabel: 'Vinh danh & Kick-off',
    description: 'Đêm vinh danh Top 1 DRD+ tại non thiêng Yên Tử và kỳ hội quân rực lửa tại Phan Thiết.',
  },
  {
    key: 'hanh-trinh-se-chia',
    label: 'Hành trình Sẻ chia',
    shortLabel: 'Thiện nguyện',
    description: 'Chuyến xe Kết Nối Yêu Thương mang hơi ấm đến với các em nhỏ vùng cao Tây Nguyên.',
  },
  {
    key: 'diem-tua-to-am',
    label: 'Điểm tựa Tổ ấm & Nhịp sống',
    shortLabel: 'Tổ ấm & Đời thường',
    description: 'Những khoảnh khắc bình yên bên chồng và hai con, nguồn năng lượng bền bỉ phía sau sự nghiệp.',
  },
];

export const JOURNEY_CHAPTERS: JourneyChapter[] = [
  {
    "slug": "nhat-ban-2026",
    "pillar": "mstar-quoc-te",
    "pillarLabel": "Dấu ấn Năm châu • M-Star",
    "year": "2026",
    "periodLabel": "Mùa xuân 2026",
    "location": "Núi Phú Sĩ & Tokyo, Nhật Bản",
    "countryTag": "Nhật Bản",
    "title": "Dưới chân núi Phú Sĩ và bài học về sự tận tâm bền bỉ",
    "subtitle": "Chuyến thưởng huấn M-Star 2026 đưa Vân cùng anh xã và những người chị em quản lý đặt chân đến xứ sở mặt trời mọc trong những ngày trời xanh trong vắt.",
    "pullQuote": "Đứng trước đỉnh Phú Sĩ phủ tuyết trắng giữa bầu trời quang đãng, Vân càng thấm thía rằng những giá trị vững chãi nhất luôn được bồi đắp từ kỷ luật thầm lặng mỗi ngày.",
    "companions": "Ông xã & Đội ngũ Quản lý đạt chuẩn M-Star",
    "milestoneBadge": "M-Star Nhật Bản 2026",
    "heroImage": "/images/journeys/nhat-ban-2026/01-kv_268.jpg?v=2",
    "heroObjectPosition": "50% 28%",
    "photoCount": 11,
    "ctaMode": "career",
    "story": [
      "Người dân bản địa nói với đoàn rằng không phải ngày nào đến Kawaguchiko cũng may mắn gặp được đỉnh Phú Sĩ hiện ra trọn vẹn giữa nền trời xanh không gợn mây như thế. Khoảnh khắc đứng dưới vòm gạch đỏ nhìn ngọn núi tuyết trắng uy nghiêm phía xa, trong lòng Vân trào lên một cảm giác biết ơn thật nhẹ nhõm.",
      "Nhật Bản luôn khiến Vân nể phục ở sự chỉn chu trong từng chi tiết nhỏ. Từ cách người đầu bếp chuẩn bị bữa tối Wagyu ấm cúng, cách những con phố quanh nhà ga Tokyo trăm năm tuổi vẫn sạch sẽ ngăn nắp, cho đến thái độ trân trọng khách hàng bằng cả trái tim. Đó cũng chính là chuẩn mực nghề nghiệp mà Vân và đội ngũ quản lý tại Vùng Khánh Vân luôn nhắc nhau gìn giữ khi đồng hành cùng từng gia đình khách hàng.",
      "Niềm vui lớn nhất của chuyến đi là bên cạnh Vân vừa có người bạn đời thầm lặng sẻ chia, vừa có những người chị em quản lý gắn bó suốt nhiều năm. Khi khoác lên mình bộ Yukata truyền thống trong đêm tiệc vinh danh, nhìn nụ cười rạng ngời của từng thành viên, Vân tin rằng mọi nỗ lực bền bỉ đều nhận về phần thưởng xứng đáng."
    ],
    "photos": [
      {
        "id": "KV_268",
        "src": "/images/journeys/nhat-ban-2026/01-kv_268.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân diện áo lông kem thanh lịch mỉm cười tươi tắn với đỉnh núi Phú Sĩ phủ tuyết trắng tuyệt đẹp phía sau trong chuyến M-Star Nhật Bản 2026.",
        "locationDetail": "Khung vòm gạch đỏ hướng thẳng ra đỉnh núi Phú Sĩ phủ tuyết trắng dưới bầu trời xanh trong (Nhật Bản)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_269",
        "src": "/images/journeys/nhat-ban-2026/02-kv_269.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân cùng các nữ quản lý rạng rỡ lưu giữ khoảnh khắc đáng nhớ dưới chân núi Phú Sĩ hùng vĩ.",
        "locationDetail": "Công viên dưới chân núi Phú Sĩ ngập nắng vàng và bầu trời xanh biếc",
        "people": "Chị Khánh Vân & 4 nữ quản lý đồng nghiệp"
      },
      {
        "id": "KV_270",
        "src": "/images/journeys/nhat-ban-2026/03-kv_270.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Khoảnh khắc chị Khánh Vân giơ tay chào đầy hóm hỉnh và tươi trẻ trước khung cảnh núi Phú Sĩ ngập nắng.",
        "locationDetail": "Khung cửa gạch cổ điển nhìn ra núi Phú Sĩ phủ tuyết",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_271",
        "src": "/images/journeys/nhat-ban-2026/04-kv_271.jpg?v=2",
        "width": 986,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Đoàn M-Star cùng vợ chồng chị Khánh Vân chụp ảnh kỷ niệm trên cầu gỗ bên hồ nước phẳng lặng vùng Phú Sĩ.",
        "locationDetail": "Trên cây cầu gỗ bên mặt hồ Kawaguchiko thơ mộng tại Nhật Bản",
        "people": "Vợ chồng chị Khánh Vân & đoàn quản lý M-Star"
      },
      {
        "id": "KV_272",
        "src": "/images/journeys/nhat-ban-2026/05-kv_272.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Các nữ quản lý sành điệu sải bước giữa đại lộ hiện đại và ngăn nắp bậc nhất thủ đô Tokyo.",
        "locationDetail": "Đại lộ rợp bóng cây xanh và những tòa cao ốc hiện đại tại thủ đô Tokyo",
        "people": "Chị Khánh Vân & 5 nữ quản lý"
      },
      {
        "id": "KV_273",
        "src": "/images/journeys/nhat-ban-2026/06-kv_273.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Nhóm quản lý chụp ảnh lưu niệm trước công trình kiến trúc gạch đỏ biểu tượng của nhà ga Tokyo.",
        "locationDetail": "Quảng trường trước nhà ga trung tâm Tokyo Station kiến trúc gạch đỏ trăm năm tuổi",
        "people": "Chị Khánh Vân & nhóm quản lý"
      },
      {
        "id": "KV_274",
        "src": "/images/journeys/nhat-ban-2026/07-kv_274.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân cùng các chị em quản lý duyên dáng trong trang phục Yukata truyền thống tại đêm hội M-Star 2026 Nhật Bản.",
        "locationDetail": "Sảnh tiệc khách sạn truyền thống Nhật Bản bên standee chào mừng M-Star 2026 Nhật Bản",
        "people": "Chị Khánh Vân & 3 nữ lãnh đạo đồng nghiệp"
      },
      {
        "id": "KV_275",
        "src": "/images/journeys/nhat-ban-2026/08-kv_275.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Bữa tối thưởng thức ẩm thực Wagyu ấm cúng và rộn tiếng cười của vợ chồng chị Khánh Vân cùng các anh chị đồng nghiệp.",
        "locationDetail": "Nhà hàng Teppanyaki bò Wagyu truyền thống ấm cúng tại Nhật Bản",
        "people": "Vợ chồng chị Khánh Vân & các anh chị lãnh đạo"
      },
      {
        "id": "KV_276",
        "src": "/images/journeys/nhat-ban-2026/09-kv_276.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Phút dừng chân thưởng thức đồ uống mát lành và trò chuyện rôm rả của hai chị em quản lý tại Nhật Bản.",
        "locationDetail": "Quán cà phê sáng thoáng tại Nhật Bản",
        "people": "Chị Khánh Vân & nữ quản lý thân thiết"
      },
      {
        "id": "KV_277",
        "src": "/images/journeys/nhat-ban-2026/10-kv_277.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Hội chị em quản lý thích thú thưởng thức kem trà xanh Matcha chính gốc trước tiệm trà cổ Nhật Bản.",
        "locationDetail": "Trước tiệm trà xanh Matcha cổ truyền tại Nhật Bản",
        "people": "Chị Khánh Vân & 4 nữ đồng nghiệp"
      },
      {
        "id": "KV_278",
        "src": "/images/journeys/nhat-ban-2026/11-kv_278.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Niềm vui mua sắm quà tặng cho gia đình và bản thân của các nữ quản lý trong chuyến thưởng ngoạn Nhật Bản.",
        "locationDetail": "Khu trung tâm mua sắm sầm uất tại Nhật Bản",
        "people": "Đội ngũ nữ quản lý trong đoàn"
      }
    ],
    "video": {
      "src": "/videos/journeys/nhat-ban-2026.mp4?v=2",
      "poster": "/videos/journeys/nhat-ban-2026-poster.jpg?v=2",
      "durationLabel": "0:27",
      "title": "Khoảnh khắc dưới chân núi Phú Sĩ & nhịp sống Tokyo",
      "caption": "Trọn vẹn bầu trời xanh trong hiếm có tại núi Phú Sĩ và niềm vui của các chị em quản lý trong hành trình M-Star Nhật Bản 2026."
    }
  },
  {
    "slug": "yen-tu-vinh-danh-2025",
    "pillar": "dinh-cao-nhiet-huyet",
    "pillarLabel": "Đỉnh cao & Nhiệt huyết",
    "year": "2025",
    "periodLabel": "Năm 2025",
    "location": "Legacy Yên Tử, Quảng Ninh",
    "countryTag": "Việt Nam",
    "title": "Đêm vinh danh dưới chân non thiêng Yên Tử và chữ tín của người dẫn đường",
    "subtitle": "Hội ngộ tại không gian di sản Legacy Yên Tử trong đại lễ ManPower Agency Awards XXVII với hai danh hiệu Top 1 DRD+ toàn quốc.",
    "pullQuote": "Chiếc cúp khiến Vân tự hào nhất là danh hiệu Top 1 DRD+ về tỷ lệ duy trì hợp đồng năm thứ hai, bởi đó là thước đo trung thực nhất cho niềm tin của khách hàng.",
    "companions": "Ban Lãnh đạo Manulife & Đội ngũ Quản lý cấp cao",
    "milestoneBadge": "Top 1 DRD+ Toàn Quốc",
    "heroImage": "/images/journeys/yen-tu-vinh-danh-2025/01-kv_258.jpg?v=2",
    "heroObjectPosition": "50% 35%",
    "photoCount": 10,
    "ctaMode": "career",
    "story": [
      "Yên Tử đón đoàn bằng vẻ đẹp trầm mặc của những dãy hành lang đá cuội, mái ngói mũi hài và bức tường gạch nung mang hồn cốt cung đình thời Trần. Giữa không gian tĩnh tại ấy, mỗi người làm nghề như có thêm một khoảng lặng quý giá để nhìn lại chặng đường một năm đã đi qua.",
      "Khi tên mình được xướng lên trên sân khấu lớn ManPower Agency Awards XXVII ở cả hai hạng mục Top 1 DRD+ hoàn thành chỉ tiêu FYP và Top 1 DRD+ dẫn đầu tỷ lệ duy trì hợp đồng năm thứ hai, Vân xúc động thật sự. Trong ngành bảo hiểm nhân thọ, doanh số có thể nói lên tốc độ, nhưng tỷ lệ duy trì hợp đồng mới là lời khẳng định cho chất lượng tư vấn đúng, đủ và sự chăm sóc tận tâm sau khi hợp đồng đã trao tay.",
      "Khoác tà áo dài gấm vàng truyền thống đứng giữa các anh chị lãnh đạo xuất sắc trên toàn quốc, Vân thầm gửi lời cảm ơn đến hơn 500 nhân sự và 64 quản lý của Hệ thống Vùng Khánh Vân. Thành quả trên sân khấu thuộc về tập thể những con người tử tế luôn chọn làm nghề nghiêm túc mỗi ngày."
    ],
    "photos": [
      {
        "id": "KV_258",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/01-kv_258.jpg?v=2",
        "width": 1280,
        "height": 853,
        "orientation": "landscape",
        "caption": "Khoảnh khắc vinh danh danh hiệu TOP 1 DRD+ Quản lý Cấp cao Dẫn đầu Tỷ lệ Hoàn thành Chỉ tiêu FYP Năm 2025 trên sân khấu ManPower Agency Awards XXVII tại Yên Tử.",
        "locationDetail": "Sân khấu đại lễ ManPower Agency Awards XXVII với màn hình LED vinh danh TOP 1 DRD+ Dẫn đầu Tỷ lệ Hoàn thành Chỉ tiêu FYP 2025",
        "people": "Chị Khánh Vân & các lãnh đạo xuất sắc trên sân khấu"
      },
      {
        "id": "KV_259",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/02-kv_259.jpg?v=2",
        "width": 1280,
        "height": 853,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân trong tà áo dài gấm vàng kim giơ cao chiếc cúp Top 1 danh giá giữa sự chúc mừng của Ban Lãnh đạo Manulife Việt Nam.",
        "locationDetail": "Sân khấu chính lễ trao giải ManPower Agency Awards XXVII tại Yên Tử",
        "people": "Chị Khánh Vân & Ban Lãnh đạo, các Giám đốc Vùng"
      },
      {
        "id": "KV_260",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/03-kv_260.jpg?v=2",
        "width": 853,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân rạng rỡ nhận cúp vinh danh Top 1 DRD+ cùng Lãnh đạo cấp cao tại đêm Gala ManPower Awards XXVII.",
        "locationDetail": "Trên sân khấu trao giải rực rỡ sắc màu văn hóa Việt tại Yên Tử",
        "people": "Chị Khánh Vân & Lãnh đạo cấp cao Manulife"
      },
      {
        "id": "KV_261",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/04-kv_261.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Bốn nữ lãnh đạo cấp cao cùng giơ cao chiếc cúp chiến thắng tại đại lễ vinh danh ManPower Agency Awards XXVII.",
        "locationDetail": "Trước khu vực photobooth chính thức của ManPower Agency Awards XXVII",
        "people": "Chị Khánh Vân & ba nữ Giám đốc cấp cao đồng nghiệp"
      },
      {
        "id": "KV_262",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/05-kv_262.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Dàn nữ lãnh đạo xuất sắc từ khắp cả nước hội tụ trong đêm vinh danh dưới chân núi thiêng Yên Tử.",
        "locationDetail": "Sảnh đón tiếp sang trọng mang kiến trúc gỗ truyền thống tại Legacy Yên Tử",
        "people": "Chị Khánh Vân & các nữ lãnh đạo toàn quốc"
      },
      {
        "id": "KV_263",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/06-kv_263.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Sân khấu nghệ thuật hoành tráng vinh danh hạng mục Nữ Hoàng Tuyển Dụng 2025 giữa không gian di sản Yên Tử.",
        "locationDetail": "Không gian sân khấu ngoài trời tráng lệ tại Yên Tử với hạng mục Nữ Hoàng Tuyển Dụng 2025",
        "people": "Các lãnh đạo được vinh danh trên sân khấu lớn"
      },
      {
        "id": "KV_264",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/07-kv_264.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân diện áo dài gấm vàng truyền thống giữa không gian kiến trúc cung đình tĩnh mặc của Legacy Yên Tử.",
        "locationDetail": "Không gian nội thất cung đình Trần cổ kính với gỗ và gạch nung tại Legacy Yên Tử",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_265",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/08-kv_265.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Góc nhìn kiến trúc đối xứng tuyệt đẹp tại giếng trời đá cuội khu nghỉ dưỡng di sản Legacy Yên Tử.",
        "locationDetail": "Sân giếng trời lát đá cuội giữa hai dãy mái ngói mũi hài cổ kính tại Legacy Yên Tử",
        "people": "Chị Khánh Vân (góc nhìn nghệ thuật từ trên cao)"
      },
      {
        "id": "KV_266",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/09-kv_266.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân cùng đồng nghiệp lưu lại khoảnh khắc thanh bình trên bậc đá cổ kính tại non thiêng Yên Tử.",
        "locationDetail": "Trên bậc đá rêu phong trước cổng tam quan cổ kính dưới chân núi Yên Tử",
        "people": "Chị Khánh Vân & nữ đồng nghiệp"
      },
      {
        "id": "KV_267",
        "src": "/images/journeys/yen-tu-vinh-danh-2025/10-kv_267.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Nụ cười gần gũi của chị Khánh Vân bên bàn ăn sáng quây quần cùng các anh chị em đồng nghiệp tại Yên Tử.",
        "locationDetail": "Không gian nhà hàng ấm cúng tại Yên Tử",
        "people": "Chị Khánh Vân & các anh chị em quản lý"
      }
    ],
    "video": {
      "src": "/videos/journeys/yen-tu-vinh-danh-2025.mp4?v=2",
      "poster": "/videos/journeys/yen-tu-vinh-danh-2025-poster.jpg?v=2",
      "durationLabel": "0:29",
      "title": "Giây phút nhận cúp Top 1 DRD+ trên sân khấu ManPower Awards XXVII",
      "caption": "Từ khoảng sân tĩnh mặc của Legacy Yên Tử đến ánh đèn sân khấu vinh danh Top 1 DRD+ Quản lý Cấp cao dẫn đầu tỷ lệ duy trì hợp đồng."
    }
  },
  {
    "slug": "trung-khanh-2026",
    "pillar": "mstar-quoc-te",
    "pillarLabel": "Dấu ấn Năm châu • M-Star",
    "year": "2026",
    "periodLabel": "Giữa năm 2026",
    "location": "Trùng Khánh, Trung Quốc",
    "countryTag": "Trung Quốc",
    "title": "Sắc đỏ phố núi Trùng Khánh và sức trẻ của những người đồng đội",
    "subtitle": "Chuyến thưởng huấn M-Star Giữa Năm 2026 khám phá siêu đô thị đa tầng độc đáo bên dòng Trường Giang cùng thế hệ quản lý năng động.",
    "pullQuote": "Đi giữa thành phố được xây dựng trên những triền núi dốc đứng, Vân nhận ra không có địa hình nào cản được bước chân khi con người có đủ khát vọng và tư duy mở.",
    "companions": "Đội ngũ Quản lý Vùng Khánh Vân đạt chuẩn M-Star Giữa Năm",
    "milestoneBadge": "M-Star Giữa Năm 2026",
    "heroImage": "/images/journeys/trung-khanh-2026/01-kv_279.jpg?v=2",
    "heroObjectPosition": "50% 30%",
    "photoCount": 10,
    "ctaMode": "career",
    "story": [
      "Trùng Khánh mang đến cho cả đoàn đi từ bất ngờ này đến bất ngờ khác. Một thành phố mà đường tàu xuyên qua tòa nhà cao tầng, những cây cầu vượt nối tiếp nhau trên sườn núi, bên cạnh khối kiến trúc đũa đỏ rực rỡ của Trung tâm Nghệ thuật Quốc Thái và những chiếc taxi vàng đặc trưng tạo nên khung hình sống động như phim điện ảnh.",
      "Nhưng điều giữ chân cảm xúc của Vân lâu nhất lại là những buổi tối cả đoàn quây quần bên nồi lẩu Tứ Xuyên nghi ngút khói dưới hàng vạn ánh đèn lồng rực sáng tại Tỳ Bà Viên, hay lúc cùng nhau thưởng thức chén trà cái chén trong khán phòng xem nghệ thuật Kinh kịch biến diện cổ truyền.",
      "Nhìn các bạn quản lý trẻ của hệ thống tự tin sải bước trên những con dốc phố cổ Từ Khí Khẩu, rạng rỡ chia sẻ với nhau mục tiêu cho nửa cuối năm, Vân thấy rõ sự trưởng thành của thế hệ kế cận. Mỗi chuyến M-Star không đơn thuần là một kỳ nghỉ, mà là nơi tầm nhìn của người quản lý được mở rộng qua từng trải nghiệm thực tế."
    ],
    "photos": [
      {
        "id": "KV_279",
        "src": "/images/journeys/trung-khanh-2026/01-kv_279.jpg?v=2",
        "width": 853,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân tạo dáng đầy phong cách bên chiếc taxi vàng và tòa kiến trúc đỏ biểu tượng của Trung tâm Nghệ thuật Quốc Thái tại Trùng Khánh.",
        "locationDetail": "Bên chiếc taxi vàng đặc trưng trước kiến trúc đũa đỏ của Trung tâm Nghệ thuật Quốc Thái (Trùng Khánh)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_280",
        "src": "/images/journeys/trung-khanh-2026/02-kv_280.jpg?v=2",
        "width": 853,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Hình ảnh ấn tượng của chị Khánh Vân cầm chiếc quạt giấy trắng trước khối kiến trúc đỏ rực giữa trung tâm Trùng Khánh.",
        "locationDetail": "Quảng trường trước công trình Trung tâm Nghệ thuật Quốc Thái dưới bầu trời xanh trong",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_281",
        "src": "/images/journeys/trung-khanh-2026/03-kv_281.jpg?v=2",
        "width": 1280,
        "height": 853,
        "orientation": "landscape",
        "caption": "Đại đoàn M-Star chụp ảnh tập thể giữa không gian giao thoa cổ kim tráng lệ tại Quảng trường Đại Lễ Đường Trùng Khánh.",
        "locationDetail": "Quảng trường rộng lớn nối giữa Đại Lễ Đường Nhân Dân cổ kính và rừng cao ốc hiện đại Trùng Khánh",
        "people": "Chị Khánh Vân & đại đoàn quản lý M-Star"
      },
      {
        "id": "KV_282",
        "src": "/images/journeys/trung-khanh-2026/04-kv_282.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân diện măng tô kem thanh lịch giữa không gian rực rỡ đèn lồng đỏ tại cổ trấn Từ Khí Khẩu.",
        "locationDetail": "Con phố đá treo đầy đèn lồng đỏ tại cổ trấn nghìn năm Từ Khí Khẩu (Ciqikou, Trùng Khánh)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_283",
        "src": "/images/journeys/trung-khanh-2026/05-kv_283.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Phong thái tự tin, hiện đại của chị Khánh Vân giữa nhịp sống sôi động của siêu đô thị đa tầng Trùng Khánh.",
        "locationDetail": "Tựa bên chiếc taxi vàng nổi bật giữa những tòa chung cư cao tầng đặc trưng phố núi Trùng Khánh",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_284",
        "src": "/images/journeys/trung-khanh-2026/06-kv_284.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Dàn nữ quản lý Vùng Khánh Vân rạng rỡ sải bước khám phá nhịp sống bản địa tại Trùng Khánh.",
        "locationDetail": "Con phố rợp bóng cây xanh đặc trưng của phố núi Trùng Khánh",
        "people": "Chị Khánh Vân & 6 nữ quản lý trẻ trung"
      },
      {
        "id": "KV_285",
        "src": "/images/journeys/trung-khanh-2026/07-kv_285.jpg?v=2",
        "width": 1280,
        "height": 1011,
        "orientation": "landscape",
        "caption": "Đại gia đình quản lý quây quần bên bàn lẩu Trùng Khánh nồng ấm tiếng cười sau ngày tham quan trọn vẹn.",
        "locationDetail": "Không gian nhà hàng lẩu truyền thống Trùng Khánh rực ánh đèn ấm cúng",
        "people": "Chị Khánh Vân & đại gia đình quản lý"
      },
      {
        "id": "KV_286",
        "src": "/images/journeys/trung-khanh-2026/08-kv_286.jpg?v=2",
        "width": 1280,
        "height": 853,
        "orientation": "landscape",
        "caption": "Đoàn M-Star lưu giữ khoảnh khắc rực rỡ trước khung cảnh ánh đèn đêm huyền ảo nổi tiếng của Trùng Khánh.",
        "locationDetail": "Trước ngọn đồi rực sáng hàng vạn ánh đèn đêm tráng lệ tại tổ hợp lẩu lớn nhất thế giới Tỳ Bà Viên (Trùng Khánh)",
        "people": "Đoàn M-Star Manulife"
      },
      {
        "id": "KV_287",
        "src": "/images/journeys/trung-khanh-2026/09-kv_287.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chiếc quạt giấy mang dấu ấn Manulife bên chén trà truyền thống trong đêm thưởng thức nghệ thuật biến diện Trùng Khánh.",
        "locationDetail": "Bên tách trà cái chén sứ vàng hoàng gia trong khán phòng xem nghệ thuật Kinh kịch biến diện Tứ Xuyên",
        "people": "Bàn tay cầm quạt Manulife (góc chụp tinh tế)"
      },
      {
        "id": "KV_288",
        "src": "/images/journeys/trung-khanh-2026/10-kv_288.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Khoảnh khắc sum vầy ấm áp dưới ánh đèn lồng vàng cổ điển của chị Khánh Vân và những người chị em đồng hành.",
        "locationDetail": "Không gian nhà hàng gỗ treo đèn lồng cổ truyền ấm áp tại Trùng Khánh",
        "people": "Chị Khánh Vân & bàn tiệc các chị em quản lý"
      }
    ],
    "video": {
      "src": "/videos/journeys/trung-khanh-2026.mp4?v=2",
      "poster": "/videos/journeys/trung-khanh-2026-poster.jpg?v=2",
      "durationLabel": "0:25",
      "title": "Cổ trấn Từ Khí Khẩu, trà đạo và đêm nghệ thuật biến diện Trùng Khánh",
      "caption": "Nhịp điệu giao thoa giữa văn hóa ngàn năm và năng lượng hiện đại trong chuyến M-Star Giữa Năm 2026 tại Trùng Khánh."
    }
  },
  {
    "slug": "ao-duc-2024",
    "pillar": "mstar-quoc-te",
    "pillarLabel": "Dấu ấn Năm châu • M-Star",
    "year": "2024",
    "periodLabel": "Mùa thu 2024",
    "location": "Hallstatt, Salzburg (Áo) & Munich (Đức)",
    "countryTag": "Áo & Đức",
    "title": "Mùa thu Trung Âu bên hồ Hallstatt và niềm tự hào dưới cờ Tổ quốc",
    "subtitle": "Hành trình M-Star Châu Âu đi qua ngôi làng cổ tích bên dãy Alps, quê hương âm nhạc Salzburg và thành phố Munich lịch lãm.",
    "pullQuote": "Có những khoảnh khắc đứng bên mặt hồ Hallstatt phẳng lặng cùng người bạn đời, mọi vất vả của những năm tháng gây dựng sự nghiệp bỗng hóa thành sự bình yên trọn vẹn.",
    "companions": "Ông xã & Đoàn M-Star Manulife Việt Nam",
    "milestoneBadge": "M-Star Châu Âu 2024",
    "heroImage": "/images/journeys/ao-duc-2024/01-kv_226.jpg?v=2",
    "heroObjectPosition": "50% 42%",
    "photoCount": 12,
    "ctaMode": "family",
    "story": [
      "Mùa thu Trung Âu đón đoàn bằng tiết trời se lạnh dịu dàng và những bức tường dây thường xuân chuyển sang sắc đỏ thắm. Khi đứng bên bờ hồ Hallstatt nhìn sương mỏng bảng lảng trên dãy núi Alps, bên cạnh là anh xã luôn lặng lẽ đồng hành, Vân cảm nhận rất rõ giá trị của sự cân bằng giữa khát vọng nghề nghiệp và điểm tựa gia đình.",
      "Hành trình đưa đoàn đi từ ngôi nhà màu vàng nơi thiên tài Mozart chào đời tại phố cổ Salzburg đến quảng trường Marienplatz cổ kính giữa lòng Munich. Đặc biệt nhất là khoảnh khắc cả đoàn cùng giương cao lá cờ đỏ sao vàng Việt Nam và lá cờ xanh Manulife trước sân vận động huyền thoại Allianz Arena. Niềm tự hào của những người con đất Việt bước ra thế giới bằng chính năng lực chuyên môn thật sự khó quên.",
      "Sau mỗi chuyến đi xa như thế, khi trở về văn phòng tại TP.HCM, Vân luôn mang theo nguồn cảm hứng mới để truyền lại cho đội ngũ. Thế giới rộng lớn lắm, và nghề tư vấn tài chính chân chính hoàn toàn có thể đưa chúng ta đến những chân trời đẹp nhất."
    ],
    "photos": [
      {
        "id": "KV_226",
        "src": "/images/journeys/ao-duc-2024/01-kv_226.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Vợ chồng chị Khánh Vân cùng các đồng nghiệp mỉm cười bình yên bên hồ Hallstatt thơ mộng dưới chân núi Alps nước Áo.",
        "locationDetail": "Bên mặt hồ Hallstatt phẳng lặng soi bóng dãy núi Alps hùng vĩ (Áo)",
        "people": "Vợ chồng chị Khánh Vân & hai đồng nghiệp"
      },
      {
        "id": "KV_227",
        "src": "/images/journeys/ao-duc-2024/02-kv_227.jpg?v=2",
        "width": 1280,
        "height": 853,
        "orientation": "landscape",
        "caption": "Đoàn M-Star lưu giữ bức ảnh kỷ niệm tuyệt đẹp tại quảng trường cổ tích Hallstatt (Áo).",
        "locationDetail": "Quảng trường trung tâm thị trấn cổ tích Hallstatt bao quanh bởi những ngôi nhà sắc màu và núi Alps",
        "people": "Chị Khánh Vân, anh xã & đoàn M-Star"
      },
      {
        "id": "KV_228",
        "src": "/images/journeys/ao-duc-2024/03-kv_228.jpg?v=2",
        "width": 1280,
        "height": 815,
        "orientation": "landscape",
        "caption": "Khoảnh khắc tự hào khi đoàn M-Star giương cao lá cờ đỏ sao vàng Việt Nam và cờ xanh Manulife trước sân vận động Allianz Arena (Munich, Đức).",
        "locationDetail": "Quảng trường trước sân vận động huyền thoại Allianz Arena tại Munich (Đức)",
        "people": "Đoàn M-Star Manulife Việt Nam"
      },
      {
        "id": "KV_229",
        "src": "/images/journeys/ao-duc-2024/04-kv_229.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Nụ cười rạng rỡ của chị Khánh Vân khi trực tiếp tham quan bên trong sân vận động huyền thoại Allianz Arena tại Đức.",
        "locationDetail": "Trên khán đài rực sắc đỏ biểu tượng bên trong sân vận động Allianz Arena (Bayern Munich)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_230",
        "src": "/images/journeys/ao-duc-2024/05-kv_230.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Đoàn M-Star chụp ảnh lưu niệm trước ngôi nhà lịch sử của thiên tài âm nhạc Mozart tại thành phố Salzburg nước Áo.",
        "locationDetail": "Trước tòa nhà màu vàng nổi tiếng nơi nhà soạn nhạc thiên tài Mozart chào đời tại Salzburg (Áo)",
        "people": "Đoàn M-Star Manulife"
      },
      {
        "id": "KV_231",
        "src": "/images/journeys/ao-duc-2024/06-kv_231.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Vợ chồng chị Khánh Vân sánh đôi tình cảm trước Tòa thị chính cổ kính tại quảng trường Marienplatz, Munich.",
        "locationDetail": "Quảng trường trung tâm Marienplatz với Tòa thị chính cổ kính Gothic vươn cao tại Munich (Đức)",
        "people": "Vợ chồng chị Khánh Vân"
      },
      {
        "id": "KV_232",
        "src": "/images/journeys/ao-duc-2024/07-kv_232.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân cùng đồng nghiệp tạo dáng tươi trẻ dưới nắng vàng rực rỡ tại trung tâm thành phố Munich.",
        "locationDetail": "Quảng trường Marienplatz ngập nắng vàng dưới bầu trời xanh thẳm của nước Đức",
        "people": "Chị Khánh Vân & nữ đồng nghiệp"
      },
      {
        "id": "KV_233",
        "src": "/images/journeys/ao-duc-2024/08-kv_233.jpg?v=2",
        "width": 878,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Tập thể đoàn M-Star rạng rỡ trước bức tường dây leo đỏ thắm đặc trưng của mùa thu Trung Âu.",
        "locationDetail": "Trước tòa nhà cổ phủ kín dây thường xuân chuyển sắc đỏ thắm mùa thu Châu Âu",
        "people": "Tập thể đoàn M-Star & vợ chồng chị Khánh Vân"
      },
      {
        "id": "KV_234",
        "src": "/images/journeys/ao-duc-2024/09-kv_234.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Phong thái cổ điển và thanh lịch của chị Khánh Vân bên tòa biệt thự phủ đầy dây leo xanh tại Đức.",
        "locationDetail": "Ghế gỗ trắng trước khung cửa sổ lớn của tòa biệt thự cổ phủ dây leo xanh tại Đức",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_235",
        "src": "/images/journeys/ao-duc-2024/10-kv_235.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân khoác măng tô kem thanh lịch dạo bước giữa con phố nhỏ bình yên của làng cổ Hallstatt.",
        "locationDetail": "Con đường nhỏ lát đá giữa những ngôi nhà gỗ cổ kính dưới chân núi Hallstatt (Áo)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_236",
        "src": "/images/journeys/ao-duc-2024/11-kv_236.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Khoảnh khắc hòa mình vào không khí lễ hội văn hóa truyền thống vùng Bavaria (Đức) của vợ chồng chị Khánh Vân.",
        "locationDetail": "Không gian lều lễ hội truyền thống vùng Bavaria rực rỡ sắc vàng trắng tại Munich",
        "people": "Vợ chồng chị Khánh Vân & đồng nghiệp"
      },
      {
        "id": "KV_237",
        "src": "/images/journeys/ao-duc-2024/12-kv_237.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân tạo dáng thanh lịch bên tán phong đỏ thắm giữa tiết trời thu trong vắt của Châu Âu.",
        "locationDetail": "Bên tán cây phong lá đỏ rực dưới nền trời xanh biếc mùa thu nước Đức",
        "people": "Chị Khánh Vân"
      }
    ],
    "video": {
      "src": "/videos/journeys/ao-duc-2024.mp4?v=2",
      "poster": "/videos/journeys/ao-duc-2024-poster.jpg?v=2",
      "durationLabel": "0:25",
      "title": "Dạo bước phố cổ Salzburg & nắng thu Munich",
      "caption": "Nhịp bước thảnh thơi trên con phố cổ Getreidegasse tại Salzburg (Áo) và hàng cây ngập nắng mùa thu nước Đức."
    }
  },
  {
    "slug": "thuong-hai-2025",
    "pillar": "mstar-quoc-te",
    "pillarLabel": "Dấu ấn Năm châu • M-Star",
    "year": "2025",
    "periodLabel": "Mùa thu 2025",
    "location": "Bến Thượng Hải & Cổ trấn Chu Gia Giác",
    "countryTag": "Trung Quốc",
    "title": "Từ nhịp đập tài chính Bến Thượng Hải đến dòng kênh yên bình bên con gái",
    "subtitle": "Chuyến đi M-Star 2025 đặc biệt khi Vân vừa hội ngộ các cộng sự tại trung tâm tài chính Châu Á, vừa đưa chồng và con gái Minh Châu cùng trải nghiệm.",
    "pullQuote": "Phần thưởng quý giá nhất của những chuyến vinh danh không nằm ở tấm vé hạng sang, mà là ánh mắt háo hức của con khi được cùng cha mẹ bước ra thế giới.",
    "companions": "Ông xã, con gái Minh Châu & Đội ngũ Quản lý M-Star",
    "milestoneBadge": "M-Star Thượng Hải 2025",
    "heroImage": "/images/journeys/thuong-hai-2025/01-kv_248.jpg?v=2",
    "heroObjectPosition": "50% 25%",
    "photoCount": 10,
    "ctaMode": "family",
    "story": [
      "Đứng tại Bến Thượng Hải nhìn sang bờ Đông sông Hoàng Phố với Tháp Minh Châu Phương Đông và cụm cao ốc tài chính Lục Gia Chủy vươn thẳng lên bầu trời, bất kỳ ai làm trong lĩnh vực tài chính cũng cảm nhận được nguồn năng lượng phát triển mạnh mẽ của một trung tâm kinh tế hàng đầu khu vực.",
      "Rời nhịp sống hiện đại của những con phố kiến trúc gạch đỏ phương Tây, cả gia đình Vân dành thời gian xuôi về cổ trấn sông nước Chu Gia Giác. Ngồi trên chiếc thuyền gỗ nhỏ trôi chậm qua những nhịp cầu đá ngàn năm tuổi, lắng nghe tiếng đàn guitar mộc mạc và nhìn con gái Minh Châu chăm chú quan sát từng nếp nhà cổ, Vân thấy lòng mình dịu lại thật bình yên.",
      "Với Vân, cho con đi du lịch cùng cha mẹ trong những chuyến vinh danh cũng là một cách giáo dục tự nhiên nhất. Con nhìn thấy cha mẹ làm việc nghiêm túc như thế nào, đồng nghiệp của mẹ yêu thương và tôn trọng nhau ra sao, để từ đó con tự nuôi dưỡng ước mơ và tinh thần nỗ lực cho hành trình riêng của mình."
    ],
    "photos": [
      {
        "id": "KV_248",
        "src": "/images/journeys/thuong-hai-2025/01-kv_248.jpg?v=2",
        "width": 720,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân thanh lịch tại Bến Thượng Hải với biểu tượng Tháp Minh Châu Phương Đông vươn cao giữa trung tâm tài chính Châu Á.",
        "locationDetail": "Bến Thượng Hải (The Bund) bên dòng sông Hoàng Phố với Tháp Minh Châu Phương Đông phía sau",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_249",
        "src": "/images/journeys/thuong-hai-2025/02-kv_249.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân cùng đồng nghiệp chụp ảnh kỷ niệm trước đường chân trời tài chính sầm uất của Thượng Hải.",
        "locationDetail": "Quảng trường Bến Thượng Hải hướng ra quần thể tháp chọc trời Lục Gia Chủy",
        "people": "Chị Khánh Vân & nữ quản lý đồng nghiệp"
      },
      {
        "id": "KV_250",
        "src": "/images/journeys/thuong-hai-2025/03-kv_250.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Dàn nữ quản lý sang trọng trong trang phục thu đông giữa khu phố kiến trúc cổ điển nổi tiếng tại Thượng Hải.",
        "locationDetail": "Con phố di sản kiến trúc gạch đỏ cổ điển phương Tây tại Bến Thượng Hải",
        "people": "Chị Khánh Vân & 6 nữ lãnh đạo, quản lý"
      },
      {
        "id": "KV_251",
        "src": "/images/journeys/thuong-hai-2025/04-kv_251.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân cầm ly trà ấm thong thả dạo bước giữa những công trình di sản tại Bến Thượng Hải.",
        "locationDetail": "Vỉa hè lát đá giữa hai hàng tòa nhà kiến trúc cổ điển tại Bến Thượng Hải",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_252",
        "src": "/images/journeys/thuong-hai-2025/05-kv_252.jpg?v=2",
        "width": 720,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Gia đình chị Khánh Vân cùng chồng và con gái Minh Châu lưu giữ khoảnh khắc đáng nhớ tại cổ trấn Chu Gia Giác (Thượng Hải).",
        "locationDetail": "Trước cổng khu du lịch cổ trấn sông nước Chu Gia Giác (Zhujiajiao, Thượng Hải)",
        "people": "Chị Khánh Vân, anh xã & con gái lớn Minh Châu"
      },
      {
        "id": "KV_253",
        "src": "/images/journeys/thuong-hai-2025/06-kv_253.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Hai mẹ con chị Khánh Vân và Minh Châu mỉm cười rạng rỡ bên dòng kênh cổ kính dưới bầu trời thu Thượng Hải.",
        "locationDetail": "Trên nhịp cầu đá nhìn xuống dòng kênh xanh của cổ trấn ngàn năm Chu Gia Giác",
        "people": "Chị Khánh Vân & con gái lớn Minh Châu"
      },
      {
        "id": "KV_254",
        "src": "/images/journeys/thuong-hai-2025/07-kv_254.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Khoảnh khắc bình yên khi hai mẹ con ngồi thuyền gỗ lắng nghe tiếng đàn guitar mộc mạc giữa cổ trấn sông nước Chu Gia Giác.",
        "locationDetail": "Trên chiếc thuyền gỗ trôi êm đềm dọc dòng kênh cổ trấn Chu Gia Giác",
        "people": "Chị Khánh Vân, con gái Minh Châu & nghệ sĩ đàn guitar"
      },
      {
        "id": "KV_255",
        "src": "/images/journeys/thuong-hai-2025/08-kv_255.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Trải nghiệm hóa thân trong trang phục truyền thống đầy màu sắc văn hóa của các chị em trong chuyến đi Thượng Hải.",
        "locationDetail": "Khu vườn cổ kính rợp cây xanh tại Thượng Hải",
        "people": "Các nữ quản lý đồng nghiệp trong đoàn"
      },
      {
        "id": "KV_256",
        "src": "/images/journeys/thuong-hai-2025/09-kv_256.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Không khí ấm cúng và tự hào tại đêm tiệc vinh danh Gala Dinner M-Star Thượng Hải 2025.",
        "locationDetail": "Khán phòng Gala Dinner M-Star Thượng Hải 2025 lung linh ánh đèn",
        "people": "Chị Khánh Vân & bàn tiệc các quản lý xuất sắc"
      },
      {
        "id": "KV_257",
        "src": "/images/journeys/thuong-hai-2025/10-kv_257.jpg?v=2",
        "width": 1280,
        "height": 720,
        "orientation": "landscape",
        "caption": "Toàn cảnh dòng sông Hoàng Phố và thành phố Thượng Hải chuyển mình lên đèn dưới sắc trời xanh thẳm lúc hoàng hôn.",
        "locationDetail": "Toàn cảnh khúc quanh sông Hoàng Phố và Thượng Hải lên đèn xanh thẳm từ trên cao",
        "people": "Không có nhân vật chính (toàn cảnh thành phố)"
      }
    ],
    "video": {
      "src": "/videos/journeys/thuong-hai-2025.mp4?v=2",
      "poster": "/videos/journeys/thuong-hai-2025-poster.jpg?v=2",
      "durationLabel": "0:26",
      "title": "Nắng thu Thượng Hải & cổ trấn sông nước Chu Gia Giác",
      "caption": "Vẻ đẹp cổ kính của khu phố cổ Thượng Hải và dòng kênh xanh bình yên tại cổ trấn ngàn năm Chu Gia Giác."
    }
  },
  {
    "slug": "kickoff-phan-thiet-2026",
    "pillar": "dinh-cao-nhiet-huyet",
    "pillarLabel": "Đỉnh cao & Nhiệt huyết",
    "year": "2026",
    "periodLabel": "Giữa năm 2026",
    "location": "Bàu Trắng & Phan Thiết, Bình Thuận",
    "countryTag": "Việt Nam",
    "title": "Sải bước dưới cánh quạt điện gió cùng tấm Bib 0069 giàu ý nghĩa",
    "subtitle": "Kỳ Kick-off Giữa Năm 2026 đầy lửa nhiệt huyết của đại gia đình quản lý Vùng Khánh Vân từ cung đường chạy bình minh đến đêm hội biển Stronger Together.",
    "pullQuote": "Sự nghiệp quản lý tài chính không phải là một cú nước rút ngắn hạn, mà giống hệt một cuộc chạy đường dài cần hơi thở đều đặn và những người đồng đội chạy cùng nhịp.",
    "companions": "Tập thể Quản lý Hệ thống Vùng Khánh Vân",
    "milestoneBadge": "Kick-off Giữa Năm 2026",
    "heroImage": "/images/journeys/kickoff-phan-thiet-2026/01-kv_300.jpg?v=2",
    "heroObjectPosition": "50% 24%",
    "photoCount": 8,
    "ctaMode": "career",
    "story": [
      "Một sự trùng hợp thật thú vị trong buổi sáng chạy bộ tại cung đường điện gió Bàu Trắng là Vân nhận được tấm Bib mang số 0069, đúng với con số thân thương của Khu vực HCM69 gắn bó cùng Vân từ những ngày đầu xây dựng hệ thống. Đón gió biển mát rượi lúc bình minh dưới những cánh quạt điện gió trắng khổng lồ, từng bước chạy bên anh chị em đồng nghiệp mang lại nguồn sinh lực thật sảng khoái.",
      "Trong khuôn khổ hội nghị với thông điệp Trải thảm Xanh đón tinh anh, toàn vùng đã cùng nhau rà soát chiến lược nửa cuối năm, cập nhật giải pháp liên kết đầu tư thế hệ mới Xanh Phú Quý và chia sẻ kinh nghiệm phát triển đội ngũ Quản lý chuyển ngành GTF.",
      "Khi màn đêm buông xuống trên bãi biển Phan Thiết, tất cả khoảng cách chức danh đều nhường chỗ cho những cái khoác vai, tiếng cười giòn tan và những khoảnh khắc sẻ chia ấm áp bên bàn tiệc hải sản trên bãi biển lộng gió. Chính sự chân thành, trẻ trung ấy đã giữ lửa cho tập thể hơn 500 con người đi cùng nhau suốt nhiều năm."
    ],
    "photos": [
      {
        "id": "KV_300",
        "src": "/images/journeys/kickoff-phan-thiet-2026/01-kv_300.jpg?v=2",
        "width": 853,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân mang số Bib 0069 (con số gắn liền với Khu vực HCM69) sải bước chạy bộ dưới cánh quạt điện gió Phan Thiết lúc bình minh.",
        "locationDetail": "Cung đường chạy ven biển dưới cánh quạt điện gió trắng khổng lồ tại Bàu Trắng, Phan Thiết",
        "people": "Chị Khánh Vân & đồng nghiệp nam chạy bộ"
      },
      {
        "id": "KV_301",
        "src": "/images/journeys/kickoff-phan-thiet-2026/02-kv_301.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Hai chị em quản lý rạng rỡ check-in bên cụm đá bảy sắc màu sau khi hoàn thành đường chạy buổi sáng tại Phan Thiết.",
        "locationDetail": "Bên cụm cột đá nghệ thuật bảy sắc màu và hồ nước xanh dưới nắng sớm Phan Thiết",
        "people": "Chị Khánh Vân & nữ quản lý đồng nghiệp"
      },
      {
        "id": "KV_302",
        "src": "/images/journeys/kickoff-phan-thiet-2026/03-kv_302.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Tập thể quản lý Vùng Khánh Vân chụp ảnh đầy khí thế trước backdrop Trải thảm Xanh đón tinh anh tại kỳ Kick-off 2026.",
        "locationDetail": "Trước sân khấu hội nghị với thông điệp Trải thảm Xanh đón tinh anh",
        "people": "Chị Khánh Vân & tập thể quản lý Vùng Khánh Vân"
      },
      {
        "id": "KV_303",
        "src": "/images/journeys/kickoff-phan-thiet-2026/04-kv_303.jpg?v=2",
        "width": 1280,
        "height": 853,
        "orientation": "landscape",
        "caption": "Đại gia đình quản lý Vùng Khánh Vân phủ xanh sân khấu biển Stronger Together trong đêm Gala Kick-off Phan Thiết 2026.",
        "locationDetail": "Sân khấu ngoài trời bên bờ biển Phan Thiết với thông điệp Stronger Together",
        "people": "Đại gia đình quản lý Vùng Khánh Vân"
      },
      {
        "id": "KV_304",
        "src": "/images/journeys/kickoff-phan-thiet-2026/05-kv_304.jpg?v=2",
        "width": 720,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Dàn quản lý trẻ trung thả dáng dưới bầu trời xanh trong vắt tại khu nghỉ dưỡng biển Phan Thiết.",
        "locationDetail": "Quảng trường trung tâm giữa hai tòa tháp resort hiện đại hướng biển Phan Thiết",
        "people": "Chị Khánh Vân & dàn quản lý trẻ"
      },
      {
        "id": "KV_305",
        "src": "/images/journeys/kickoff-phan-thiet-2026/06-kv_305.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân chụp ảnh cùng ấn phẩm giải pháp bảo hiểm liên kết đầu tư Xanh Phú Quý trong khuôn khổ hội nghị 2026.",
        "locationDetail": "Bên ấn phẩm giới thiệu giải pháp bảo hiểm liên kết đầu tư thế hệ mới Xanh Phú Quý của Manulife",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_306",
        "src": "/images/journeys/kickoff-phan-thiet-2026/07-kv_306.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Bữa tối đoàn viên ấm cúng và tràn ngập tiếng cười của đại gia đình quản lý Vùng Khánh Vân tại Phan Thiết.",
        "locationDetail": "Không gian phòng tiệc gỗ ấm cúng tại Phan Thiết",
        "people": "Tập thể quản lý Vùng Khánh Vân"
      },
      {
        "id": "KV_307",
        "src": "/images/journeys/kickoff-phan-thiet-2026/08-kv_307.jpg?v=2",
        "width": 1280,
        "height": 720,
        "orientation": "landscape",
        "caption": "Các chị em quản lý rạng rỡ check-in trước tòa nhà văn phòng trước giờ khởi hành chuyến Kick-off Phan Thiết.",
        "locationDetail": "Sảnh trước tòa nhà văn phòng trước giờ lên xe đi Phan Thiết",
        "people": "Chị Khánh Vân & các nữ quản lý"
      }
    ],
    "video": {
      "src": "/videos/journeys/kickoff-phan-thiet-2026.mp4?v=2",
      "poster": "/videos/journeys/kickoff-phan-thiet-2026-poster.jpg?v=2",
      "durationLabel": "0:29",
      "title": "Cung đường điện gió Bib 0069, sân khấu hội nghị & đêm tiệc biển Phan Thiết",
      "caption": "Trọn vẹn tinh thần làm hết sức, gắn kết hết mình của đội ngũ quản lý Vùng Khánh Vân trong kỳ Kick-off Phan Thiết 2026."
    }
  },
  {
    "slug": "thien-nguyen-dak-lak-2026",
    "pillar": "hanh-trinh-se-chia",
    "pillarLabel": "Hành trình Sẻ chia",
    "year": "2026",
    "periodLabel": "Năm 2026",
    "location": "Mái ấm Ea Kênh, Krông Pắc, Đắk Lắk",
    "countryTag": "Việt Nam",
    "title": "Kết nối yêu thương nơi vùng đất nắng gió Tây Nguyên",
    "subtitle": "Chuyến xe thiện nguyện khởi hành từ rạng sáng của tập thể Vùng Khánh Vân mang theo ba lô đi học, sữa ấm và tình yêu thương đến các em nhỏ Đắk Lắk.",
    "pullQuote": "Khi thành công được sẻ chia bằng tấm lòng chân thành, mỗi chuyến đi thiện nguyện lại dạy cho chính chúng ta biết trân trọng hơn cuộc sống bình an đang có.",
    "companions": "Đoàn Thiện nguyện Hệ thống Vùng Khánh Vân",
    "milestoneBadge": "Thiện Nguyện Đắk Lắk 2026",
    "heroImage": "/images/journeys/thien-nguyen-dak-lak-2026/01-kv_308.jpg?v=2",
    "heroObjectPosition": "50% 35%",
    "photoCount": 8,
    "ctaMode": "family",
    "story": [
      "Từ khi thành phố còn chưa sáng hẳn đèn, anh chị em trong đoàn thiện nguyện Vùng Khánh Vân đã tập kết đông đủ bên băng rôn Kết Nối Yêu Thương để sắp xếp từng thùng sữa, từng chiếc ba lô xanh Manulife lên xe hướng về vùng đất Krông Pắc, Đắk Lắk.",
      "Bước vào hội trường mái ấm tại xã Ea Kênh, nhìn những đôi mắt tròn xoe trong trẻo của các em nhỏ vùng cao và cái ôm rụt rè khi nhận chiếc cặp sách mới, không ai trong đoàn còn thấy mệt sau chặng đường dài hàng trăm cây số. Những phần quà tuy giản dị nhưng gói ghém trọn vẹn tấm lòng đóng góp tự nguyện của các anh chị quản lý, tư vấn viên và những người bạn đồng hành thân thiết.",
      "Làm nghề bảo hiểm nhân thọ vốn dĩ là công việc bảo vệ sự bình an trước biến cố cuộc đời. Vì thế, những chuyến đi sẻ chia cùng cộng đồng luôn là một phần không thể tách rời trong văn hóa sống và làm việc của đại gia đình Vùng Khánh Vân."
    ],
    "photos": [
      {
        "id": "KV_308",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/01-kv_308.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Đoàn thiện nguyện Vùng Khánh Vân chụp ảnh lưu niệm cùng các em nhỏ tại Mái ấm xã Ea Kênh (Đắk Lắk) trong chương trình Kết Nối Yêu Thương 2026.",
        "locationDetail": "Hội trường Mái ấm xã Ea Kênh (Krông Pắc, Đắk Lắk) bên băng rôn Kết Nối Yêu Thương, Trao Hạt Vàng Gửi Bình An",
        "people": "Chị Khánh Vân, đoàn thiện nguyện & các em nhỏ"
      },
      {
        "id": "KV_309",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/02-kv_309.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân mỉm cười hiền hậu ngồi giữa vòng vây ấm áp và ánh mắt hồn nhiên của các em nhỏ vùng cao Đắk Lắk.",
        "locationDetail": "Giữa những hàng ghế nhỏ chật kín các em thiếu nhi vùng cao Krông Pắc",
        "people": "Chị Khánh Vân & các em nhỏ Đắk Lắk"
      },
      {
        "id": "KV_310",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/03-kv_310.jpg?v=2",
        "width": 720,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Hàng chục chiếc ba lô đi học mới tinh cùng hàng trăm thùng sữa và nhu yếu phẩm được đoàn chuẩn bị chu đáo cho các em nhỏ.",
        "locationDetail": "Xếp ngay ngắn trên hàng ghế đỏ trong hội trường xã tại Đắk Lắk",
        "people": "Không có nhân vật chính (quà tặng chuẩn bị trao)"
      },
      {
        "id": "KV_311",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/04-kv_311.jpg?v=2",
        "width": 720,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Ánh mắt lấp lánh niềm vui của hai em nhỏ Đắk Lắk khi ôm trên tay chiếc ba lô đi học mới và túi quà bánh sữa.",
        "locationDetail": "Dưới bóng cây xanh trong sân mái ấm cùng chiếc ba lô mới và phần quà trên tay",
        "people": "Hai em nhỏ vùng cao Đắk Lắk"
      },
      {
        "id": "KV_312",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/05-kv_312.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Không khí gần gũi và ấm tình người trong buổi giao lưu, trao quà cho các em nhỏ tại Đắk Lắk.",
        "locationDetail": "Toàn cảnh hội trường buổi giao lưu và trao quà tại huyện Krông Pắc, Đắk Lắk",
        "people": "Đoàn thiện nguyện & đông đảo các em nhỏ, bà con địa phương"
      },
      {
        "id": "KV_313",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/06-kv_313.jpg?v=2",
        "width": 1280,
        "height": 720,
        "orientation": "landscape",
        "caption": "Toàn đoàn thiện nguyện tập kết đầy đủ từ sáng sớm tại TP.HCM trước giờ khởi hành vượt hàng trăm cây số lên Đắk Lắk.",
        "locationDetail": "Tập kết chụp ảnh cùng băng rôn Kết Nối Yêu Thương trước giờ xe lăn bánh rời TP.HCM",
        "people": "Toàn đoàn thiện nguyện Vùng Khánh Vân"
      },
      {
        "id": "KV_314",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/07-kv_314.jpg?v=2",
        "width": 1280,
        "height": 720,
        "orientation": "landscape",
        "caption": "Tập thể đoàn lưu giữ kỷ niệm tại quảng trường Krông Pắc sau buổi trao quà trọn vẹn yêu thương.",
        "locationDetail": "Quảng trường biểu tượng xã Krông Pắc dưới bầu trời xanh rộng của Tây Nguyên",
        "people": "Tập thể đoàn thiện nguyện"
      },
      {
        "id": "KV_315",
        "src": "/images/journeys/thien-nguyen-dak-lak-2026/08-kv_315.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Nụ cười nhẹ nhõm và viên mãn của cả đoàn dưới nắng vàng Tây Nguyên khép lại chuyến thiện nguyện Đắk Lắk 2026.",
        "locationDetail": "Không gian ngoài trời ngập nắng vàng rực rỡ tại Đắk Lắk",
        "people": "Đại gia đình thiện nguyện cùng trẻ nhỏ trong đoàn"
      }
    ],
    "video": {
      "src": "/videos/journeys/thien-nguyen-dak-lak-2026.mp4?v=2",
      "poster": "/videos/journeys/thien-nguyen-dak-lak-2026-poster.jpg?v=2",
      "durationLabel": "0:30",
      "title": "Hành trình Kết Nối Yêu Thương cùng các em nhỏ Krông Pắc, Đắk Lắk",
      "caption": "Từ chuyến xe sớm băng qua núi đồi Tây Nguyên đến khoảnh khắc trao tận tay từng chiếc ba lô mới và phần quà cho các em nhỏ."
    }
  },
  {
    "slug": "han-quoc-2024",
    "pillar": "mstar-quoc-te",
    "pillarLabel": "Dấu ấn Năm châu • M-Star",
    "year": "2024",
    "periodLabel": "Mùa xuân 2024",
    "location": "Seoul, Hàn Quốc",
    "countryTag": "Hàn Quốc",
    "title": "Mùa hoa anh đào Seoul cùng những người chị em khoác áo xanh tự hào",
    "subtitle": "Chuyến đi M-Star mùa xuân 2024 ngập tràn sắc trắng hồng của hoa anh đào và nguồn năng lượng rạng rỡ của dàn nữ quản lý Vùng Khánh Vân.",
    "pullQuote": "Đi một mình có thể đến đích nhanh, nhưng bước đi dưới tán hoa anh đào cùng những người cộng sự mình tin yêu mới mang lại niềm hạnh phúc trọn vẹn.",
    "companions": "Đội ngũ Nữ Quản lý Vùng Khánh Vân & Đoàn M-Star",
    "milestoneBadge": "M-Star Hàn Quốc 2024",
    "heroImage": "/images/journeys/han-quoc-2024/01-kv_216.jpg?v=2",
    "heroObjectPosition": "50% 35%",
    "photoCount": 10,
    "ctaMode": "career",
    "story": [
      "Seoul đón đoàn vào đúng tuần lễ hoa anh đào bung nở đẹp nhất trong năm. Khắp các con dốc nhỏ cho đến bờ hồ Seokchon dưới chân tháp Lotte World đều phủ một màu trắng hồng tinh khôi dưới nắng xuân dịu mát.",
      "Hình ảnh mà Vân nhớ mãi trong chuyến đi này là buổi sáng cả nhóm nữ quản lý cùng diện chiếc áo khoác xanh lá Manulife đồng điệu, nắm tay nhau cười vang dưới vòm hoa anh đào và trước sân Cung điện Hoàng gia Gyeongbokgung. Mỗi chị em trong đoàn đều xuất phát từ những ngành nghề khác nhau như giáo viên, ngân hàng, kế toán hay kinh doanh tự do, nhưng khi hội tụ tại Vùng Khánh Vân, tất cả đều chung một tinh thần tự chủ và nâng đỡ nhau cùng tiến bộ.",
      "Những buổi sáng thong thả cầm ly cà phê ấm dạo bước trên đại lộ Seoul hay phút ngồi lặng yên bên bậc cầu thang gỗ dưới tán phong đỏ đã tiếp thêm cho cả đội thật nhiều cảm hứng tươi mới cho chặng đường phía trước."
    ],
    "photos": [
      {
        "id": "KV_216",
        "src": "/images/journeys/han-quoc-2024/01-kv_216.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Tập thể nữ quản lý Vùng Khánh Vân cùng giơ tay chào đầy tự hào dưới tán hoa anh đào nở rộ tại Seoul trong chuyến M-Star 2024.",
        "locationDetail": "Con đường rợp bóng hoa anh đào nở trắng xóa tại Seoul (Hàn Quốc)",
        "people": "Chị Khánh Vân & 9 nữ quản lý đồng nghiệp"
      },
      {
        "id": "KV_217",
        "src": "/images/journeys/han-quoc-2024/02-kv_217.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Đội ngũ nữ quản lý diện áo khoác xanh Manulife đồng điệu rạng rỡ sải bước dưới hàng hoa anh đào Hàn Quốc.",
        "locationDetail": "Con dốc hoa anh đào mùa xuân giữa lòng Seoul",
        "people": "Chị Khánh Vân & đội ngũ nữ quản lý"
      },
      {
        "id": "KV_218",
        "src": "/images/journeys/han-quoc-2024/03-kv_218.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Đại gia đình M-Star Manulife Việt Nam chụp ảnh lưu niệm trước Cung điện Hoàng gia Gyeongbokgung tại thủ đô Seoul.",
        "locationDetail": "Quảng trường rộng lớn trước Cung điện Gyeongbokgung và đỉnh núi Bugaksan (Seoul)",
        "people": "Chị Khánh Vân & đại đoàn M-Star Manulife"
      },
      {
        "id": "KV_219",
        "src": "/images/journeys/han-quoc-2024/04-kv_219.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Khoảnh khắc kỷ niệm đáng nhớ của đoàn quản lý dưới tán hoa anh đào cổ thụ mùa xuân Hàn Quốc.",
        "locationDetail": "Dưới vòm hoa anh đào cổ thụ bung nở bên bờ hồ Hàn Quốc",
        "people": "Chị Khánh Vân & các anh chị quản lý"
      },
      {
        "id": "KV_220",
        "src": "/images/journeys/han-quoc-2024/05-kv_220.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân diện măng tô kem thanh lịch bên hồ Seokchon với biểu tượng tháp Lotte World phía sau.",
        "locationDetail": "Bờ hồ Seokchon xanh mát với tòa tháp Lotte World Tower vươn cao giữa trời xanh Seoul",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_221",
        "src": "/images/journeys/han-quoc-2024/06-kv_221.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chân dung chị Khánh Vân nổi bật trong sắc áo măng tô đỏ rượu vang giữa rừng hoa xuân trắng muốt tại Hàn Quốc.",
        "locationDetail": "Khu vườn ngập tràn sắc hoa xuân trắng tinh khôi tại Hàn Quốc",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_222",
        "src": "/images/journeys/han-quoc-2024/07-kv_222.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân cầm ly cà phê sáng dạo bước đầy phong thái trên đại lộ mùa xuân tại Seoul.",
        "locationDetail": "Đại lộ thoáng đãng ngập nắng xuân và hàng cây xanh mướt tại Seoul",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_223",
        "src": "/images/journeys/han-quoc-2024/08-kv_223.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Khoảnh khắc thưởng thức cà phê bình yên dưới tán phong đỏ và mái ngói cổ Hàn Quốc của chị Khánh Vân.",
        "locationDetail": "Cầu thang gỗ bên mái ngói truyền thống Hàn Quốc dưới tán lá phong đỏ",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_224",
        "src": "/images/journeys/han-quoc-2024/09-kv_224.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Phong cách trẻ trung, cá tính của chị Khánh Vân trước cụm điêu khắc hiện đại tại trung tâm Seoul.",
        "locationDetail": "Tác phẩm điêu khắc nghệ thuật đương đại giữa trung tâm thương mại Seoul",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_225",
        "src": "/images/journeys/han-quoc-2024/10-kv_225.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Ba chị em quản lý tựa vai nhau thân thiết dưới vòm hoa anh đào lãng mạn tại Hàn Quốc.",
        "locationDetail": "Con đường rợp vòm hoa anh đào trắng hồng tại Seoul",
        "people": "Chị Khánh Vân & hai nữ quản lý thân thiết"
      }
    ]
  },
  {
    "slug": "nam-ninh-2024",
    "pillar": "mstar-quoc-te",
    "pillarLabel": "Dấu ấn Năm châu • M-Star",
    "year": "2024",
    "periodLabel": "Năm 2024",
    "location": "Nam Ninh, Quảng Tây",
    "countryTag": "Trung Quốc",
    "title": "Sắc áo dài Việt duyên dáng nơi phố cổ xanh miền Quảng Tây",
    "subtitle": "Hành trình gắn kết đáng nhớ khi các chị em quản lý cùng chuẩn bị những tà áo dài truyền thống rực rỡ để lưu giữ kỷ niệm nơi phố cổ Nam Ninh.",
    "pullQuote": "Dù đặt chân đến bất kỳ miền đất nào, nét dịu dàng của tà áo dài và sự chân tình của người phụ nữ Việt vẫn luôn tỏa sáng theo cách rất riêng.",
    "companions": "Tập thể Quản lý Kinh doanh Vùng Khánh Vân",
    "milestoneBadge": "Hành Trình Nam Ninh 2024",
    "heroImage": "/images/journeys/nam-ninh-2024/01-kv_238.jpg?v=2",
    "heroObjectPosition": "50% 32%",
    "photoCount": 10,
    "ctaMode": "career",
    "story": [
      "Được mệnh danh là thành phố xanh của vùng Quảng Tây, Nam Ninh mang đến cảm giác gần gũi với những đại lộ rợp bóng cây cổ thụ, những cổng thành đá uy nghiêm và dòng sông êm đềm chảy qua dãy phố cổ mái ngói âm dương.",
      "Trước ngày lên đường, các chị em quản lý trong vùng đã hào hứng hẹn nhau cùng mang theo quốc phục áo dài Việt Nam. Khi cả đoàn cùng diện áo dài đỏ, hồng, trắng thêu hoa sen bước ra trước kiến trúc gỗ cổ kính, rất nhiều du khách bản địa đã dừng lại mỉm cười trầm trồ. Đó là khoảnh khắc vừa duyên dáng, vừa ấm áp niềm tự hào văn hóa Việt.",
      "Những chuyến đi tập thể như Nam Ninh giúp các quản lý từ nhiều khu vực khác nhau hiểu thêm về câu chuyện đời sống của nhau, để khi trở về công việc thường ngày, sự phối hợp và sẻ chia kinh nghiệm càng thêm gắn kết như chị em một nhà."
    ],
    "photos": [
      {
        "id": "KV_238",
        "src": "/images/journeys/nam-ninh-2024/01-kv_238.jpg?v=2",
        "width": 1280,
        "height": 1146,
        "orientation": "landscape",
        "caption": "Đội ngũ quản lý Vùng Khánh Vân duyên dáng khoe sắc trong tà áo dài truyền thống Việt Nam giữa không gian cổ kính tại Nam Ninh.",
        "locationDetail": "Trước dãy nhà gỗ kiến trúc cổ kính Á Đông tại Nam Ninh",
        "people": "Chị Khánh Vân & tập thể quản lý Vùng Khánh Vân"
      },
      {
        "id": "KV_239",
        "src": "/images/journeys/nam-ninh-2024/02-kv_239.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Các nữ quản lý tươi cười thả tim đồng điệu trên bậc thềm rợp bóng cây xanh trong chuyến đi Nam Ninh 2024.",
        "locationDetail": "Bậc thềm đá rộng dưới tán cây cổ thụ xanh mát tại Nam Ninh",
        "people": "Chị Khánh Vân & 9 nữ quản lý"
      },
      {
        "id": "KV_240",
        "src": "/images/journeys/nam-ninh-2024/03-kv_240.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Nhóm nữ quản lý tự tin sải bước đầy khí chất trên đại lộ thương mại hiện đại của thành phố Nam Ninh.",
        "locationDetail": "Vỉa hè đại lộ thương mại hiện đại tại trung tâm Nam Ninh",
        "people": "Chị Khánh Vân & nhóm nữ quản lý"
      },
      {
        "id": "KV_241",
        "src": "/images/journeys/nam-ninh-2024/04-kv_241.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân nổi bật trong sắc đỏ kem sang trọng bên những dải lụa cầu phúc đỏ thắm tại Nam Ninh.",
        "locationDetail": "Trước hàng dải lụa chúc phúc màu đỏ thắm truyền thống tại ngôi đền cổ Nam Ninh",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_242",
        "src": "/images/journeys/nam-ninh-2024/05-kv_242.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân diện áo dài hồng thêu hoa sen dịu dàng bên người chị em đồng nghiệp giữa vườn hoa rực rỡ.",
        "locationDetail": "Bên giàn hoa giấy nở rực rỡ và mảng xanh thiên nhiên",
        "people": "Chị Khánh Vân & nữ quản lý đồng nghiệp"
      },
      {
        "id": "KV_243",
        "src": "/images/journeys/nam-ninh-2024/06-kv_243.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân trẻ trung trong áo khoác denim bên dòng sông êm đềm chảy qua khu phố cổ Nam Ninh.",
        "locationDetail": "Lan can đá bên dòng sông xanh và dãy nhà cổ mái ngói âm dương",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_244",
        "src": "/images/journeys/nam-ninh-2024/07-kv_244.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân tạo dáng khỏe khoắn trước cổng thành cổ lịch sử trong hành trình khám phá Nam Ninh.",
        "locationDetail": "Quảng trường lát đá trước cổng thành cổ uy nghiêm tại Nam Ninh",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_245",
        "src": "/images/journeys/nam-ninh-2024/08-kv_245.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Nụ cười tươi tắn mang lại nguồn năng lượng ấm áp của chị Khánh Vân trước cổng đá cổ kính tại Nam Ninh.",
        "locationDetail": "Trước vòm cổng đá cổ kính mang dấu ấn thời gian",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_246",
        "src": "/images/journeys/nam-ninh-2024/09-kv_246.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Cái ôm ấm áp đầy tình cảm của chị Khánh Vân và người em đồng nghiệp bên hồ nước non hữu tình.",
        "locationDetail": "Bên mặt hồ xanh phẳng lặng và kiến trúc lầu cổ phía xa",
        "people": "Chị Khánh Vân & nữ đồng nghiệp"
      },
      {
        "id": "KV_247",
        "src": "/images/journeys/nam-ninh-2024/10-kv_247.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân cùng đồng nghiệp ngắm nhìn toàn cảnh núi non trùng điệp từ đài vọng cảnh trên cao tại Nam Ninh.",
        "locationDetail": "Đài vọng cảnh trên cao nhìn ra dãy núi đá vôi trùng điệp vùng Quảng Tây",
        "people": "Chị Khánh Vân & nữ đồng nghiệp"
      }
    ]
  },
  {
    "slug": "phap-2019",
    "pillar": "mstar-quoc-te",
    "pillarLabel": "Dấu ấn Năm châu • M-Star",
    "year": "2019",
    "periodLabel": "Mùa thu 2019",
    "location": "Paris & Vùng Rượu Vang, Pháp",
    "countryTag": "Pháp",
    "title": "Paris mùa lá vàng 2019 và cột mốc mở ra tầm nhìn năm châu",
    "subtitle": "Chuyến vinh danh M-Star Pháp 2019 mang ý nghĩa khởi đầu đặc biệt cho chuỗi hành trình vươn ra thế giới của Khánh Vân tại Manulife.",
    "pullQuote": "Đêm đầu tiên đứng dưới chân Tháp Eiffel rực sáng, Vân đã tự hứa rằng những chuyến đi sau này nhất định sẽ có thêm thật nhiều đồng đội của mình cùng đặt chân tới.",
    "companions": "Đoàn Danh hiệu M-Star Manulife Việt Nam 2019",
    "milestoneBadge": "M-Star Pháp 2019",
    "heroImage": "/images/journeys/phap-2019/01-kv_206.jpg?v=2",
    "heroObjectPosition": "50% 32%",
    "photoCount": 10,
    "ctaMode": "career",
    "story": [
      "Mỗi khi xem lại những bức ảnh chụp tại Paris mùa thu năm 2019, cảm xúc nguyên vẹn của những năm đầu chinh phục danh hiệu quốc tế lại ùa về trong Vân. Paris tháng mười đẹp cổ điển với hàng cây lá phong chuyển vàng dọc đại lộ, dòng sông Seine lững lờ trôi và Vương cung thánh đường Sacré-Cœur uy nghiêm trên đồi Montmartre.",
      "Khoảnh khắc dang rộng hai tay dưới chân Tháp Eiffel lấp lánh ánh đèn vàng trong đêm thu se lạnh là một cột mốc khó quên. Chuyến đi ấy giúp Vân nhìn thấy rõ tầm vóc chuyên nghiệp của tập đoàn tài chính toàn cầu và mở ra một niềm tin lớn hơn rất nhiều về con đường sự nghiệp mình đã chọn.",
      "Điều hạnh phúc nhất là lời tự hứa dưới chân Tháp Eiffel năm 2019 ấy nay đã trở thành hiện thực. Từ chỗ đi một mình trong những chuyến vinh danh đầu tiên, giờ đây mỗi kỳ M-Star đều có đông đảo các anh chị em quản lý trong Hệ thống Vùng Khánh Vân cùng sánh bước."
    ],
    "photos": [
      {
        "id": "KV_206",
        "src": "/images/journeys/phap-2019/01-kv_206.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Khoảnh khắc chị Khánh Vân dang rộng vòng tay rạng rỡ dưới chân Tháp Eiffel rực sáng trong chuyến vinh danh M-Star Pháp 2019.",
        "locationDetail": "Quảng trường dưới chân Tháp Eiffel rực sáng ánh đèn vàng ban đêm tại Paris (Pháp)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_207",
        "src": "/images/journeys/phap-2019/02-kv_207.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Góc nhìn vươn cao của Tháp Eiffel giữa tiết trời thu dịu mát tại thủ đô Paris nước Pháp.",
        "locationDetail": "Tháp Eiffel nhìn từ đại lộ rợp bóng cây thu dưới bầu trời xanh dịu của Paris",
        "people": "Không có nhân vật chính (cảnh quan biểu tượng)"
      },
      {
        "id": "KV_208",
        "src": "/images/journeys/phap-2019/03-kv_208.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân khoác măng tô nâu mỉm cười nhẹ nhàng bên lan can bờ sông Seine thơ mộng tại Paris.",
        "locationDetail": "Bờ sông Seine với du thuyền và những tòa kiến trúc cổ điển Pháp phía xa",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_209",
        "src": "/images/journeys/phap-2019/04-kv_209.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân tạo dáng thanh lịch trước công trình kiến trúc cổ điển Pháp giữa sắc lá mùa thu.",
        "locationDetail": "Sân trước tòa kiến trúc cổ điển Pháp điểm sắc vàng đỏ của cây mùa thu",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_210",
        "src": "/images/journeys/phap-2019/05-kv_210.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân ngồi thư thái bên hàng cây chớm vàng mùa thu trên đại lộ nước Pháp.",
        "locationDetail": "Đại lộ rợp hàng cây lá vàng chớm thu tại Pháp",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_211",
        "src": "/images/journeys/phap-2019/06-kv_211.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Khoảnh khắc dạo bước thảnh thơi dưới vòm cây mùa thu ngập nắng tại Pháp của chị Khánh Vân.",
        "locationDetail": "Lối đi uốn lượn dưới tán cây lá vàng mùa thu trong công viên Pháp",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_212",
        "src": "/images/journeys/phap-2019/07-kv_212.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chân dung chị Khánh Vân tươi tắn giữa ánh nắng mùa thu trong lành tại thủ đô Paris.",
        "locationDetail": "Hàng cây mùa thu ánh vàng dưới nắng dịu Paris",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_213",
        "src": "/images/journeys/phap-2019/08-kv_213.jpg?v=2",
        "width": 962,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Nụ cười hiền hòa của chị Khánh Vân khi nâng niu chiếc lá phong mùa thu nước Pháp.",
        "locationDetail": "Hàng cây cổ thụ tại Paris với chiếc lá phong vàng trên tay",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_214",
        "src": "/images/journeys/phap-2019/09-kv_214.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân đội mũ nồi kem tạo dáng phóng khoáng bên thánh đường Sacré-Cœur trên đồi Montmartre.",
        "locationDetail": "Bậc đá cổ kính bên Vương cung thánh đường Sacré-Cœur trên đồi Montmartre (Paris)",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_215",
        "src": "/images/journeys/phap-2019/10-kv_215.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân rạng rỡ bên chiếc vali khi vừa đặt chân đến sân bay Paris mở đầu hành trình M-Star 2019.",
        "locationDetail": "Sảnh sân bay Paris bên bảng chào đón hành khách đến nước Pháp",
        "people": "Chị Khánh Vân"
      }
    ]
  },
  {
    "slug": "diem-tua-to-am",
    "pillar": "diem-tua-to-am",
    "pillarLabel": "Điểm tựa Tổ ấm",
    "year": "2024–2026",
    "periodLabel": "Nhịp sống thường nhật",
    "location": "Tổ ấm nhỏ, Đà Lạt & Những kỳ nghỉ gia đình",
    "countryTag": "Gia đình",
    "title": "Sau mọi chuyến bay xa, bình yên nhất vẫn là nắm tay nhau trở về nhà",
    "subtitle": "Mười chín khoảnh khắc đời thường ấm áp bên người bạn đời, con gái lớn Minh Châu và cậu con trai út, nơi lưu giữ nguồn năng lượng nguyên bản nhất của Khánh Vân.",
    "pullQuote": "Đi qua bao nhiêu thành phố lớn trên thế giới, Vân càng tin rằng thành tựu rực rỡ nhất của người phụ nữ chính là nụ cười bình an của chồng con dưới mái nhà mình.",
    "companions": "Ông xã, con gái Minh Châu & con trai út",
    "milestoneBadge": "Tổ Ấm & Cân Bằng",
    "heroImage": "/images/journeys/diem-tua-to-am/01-kv_289.jpg?v=2",
    "heroObjectPosition": "50% 30%",
    "photoCount": 19,
    "ctaMode": "family",
    "story": [
      "Nhiều khách hàng và bạn bè thường hỏi Vân làm thế nào để vừa điều hành một hệ thống kinh doanh hơn 500 nhân sự với lịch trình hội nghị, đào tạo dày đặc, vừa giữ được sự gắn kết gần gũi bên chồng và hai con. Câu trả lời của Vân nằm ở sự hiện diện trọn vẹn và sự thấu hiểu thầm lặng của người bạn đời.",
      "Khi bước qua cánh cửa nhà vào buổi tối hay trong những kỳ nghỉ cuối tuần tại Đà Lạt, bên hồ nước yên ả, Vân gác lại các con số để chỉ làm một người vợ, một người mẹ bình dị. Cả nhà mặc áo thun đồng điệu nắm tay nhau đi dạo, mẹ cùng Minh Châu hái quýt trong vườn như hai người bạn gái, hay kiên nhẫn ngồi cạnh bé út tô màu và nhận cái ôm thật chặt trên ban công xanh mát.",
      "Chính tình yêu thương dành cho gia đình nhỏ ấy giúp Vân thấu cảm sâu sắc tâm tư của mỗi vị khách hàng khi tìm đến mình. Bởi xét đến cùng, mọi bản kế hoạch bảo hiểm nhân thọ hay quỹ học vấn, quỹ hưu trí đều hướng về một mục đích duy nhất. Đó là giữ cho những chuyến đi của gia đình luôn trọn vẹn tiếng cười trước mọi biến thiên của cuộc sống."
    ],
    "photos": [
      {
        "id": "KV_289",
        "src": "/images/journeys/diem-tua-to-am/01-kv_289.jpg?v=2",
        "width": 1280,
        "height": 852,
        "orientation": "landscape",
        "caption": "Gia đình nhỏ bốn thành viên mặc áo xanh đồng điệu nắm chặt tay nhau cùng dạo bước giữa không gian xanh mát.",
        "locationDetail": "Lối đi bộ rợp cây xanh mát tại khu đô thị hiện đại",
        "people": "Vợ chồng chị Khánh Vân, con gái Minh Châu & con trai út"
      },
      {
        "id": "KV_290",
        "src": "/images/journeys/diem-tua-to-am/02-kv_290.jpg?v=2",
        "width": 1280,
        "height": 961,
        "orientation": "landscape",
        "caption": "Bức ảnh gia đình rực rỡ sắc đỏ yêu thương bên chiếc xe đạp chở đầy quýt chín giữa thiên nhiên trong lành.",
        "locationDetail": "Bên chiếc xe đạp cổ chở giỏ quýt vàng ươm dưới hàng cây thông xanh",
        "people": "Vợ chồng chị Khánh Vân & hai con"
      },
      {
        "id": "KV_291",
        "src": "/images/journeys/diem-tua-to-am/03-kv_291.jpg?v=2",
        "width": 904,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Khoảnh khắc bốn thành viên cùng dang rộng vòng tay đón gió mát lành trên cây cầu gỗ giữa rừng xanh.",
        "locationDetail": "Trên cây cầu gỗ mộc mạc bắc qua khe suối xanh giữa rừng cây",
        "people": "Vợ chồng chị Khánh Vân & hai con"
      },
      {
        "id": "KV_292",
        "src": "/images/journeys/diem-tua-to-am/04-kv_292.jpg?v=2",
        "width": 863,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Hai mẹ con chị Khánh Vân và Minh Châu dịu dàng trong sắc trắng tinh khôi cùng hái quýt chín giữa khu vườn xanh.",
        "locationDetail": "Giữa khu vườn quýt chín vàng trĩu quả xanh mướt",
        "people": "Chị Khánh Vân & con gái lớn Minh Châu"
      },
      {
        "id": "KV_293",
        "src": "/images/journeys/diem-tua-to-am/05-kv_293.jpg?v=2",
        "width": 1280,
        "height": 904,
        "orientation": "landscape",
        "caption": "Khung hình gia đình bốn người trong trẻo và thanh lịch giữa khu vườn xanh mướt đầy sức sống.",
        "locationDetail": "Lối nhỏ phủ cỏ xanh giữa vườn cây ăn trái trĩu quả",
        "people": "Vợ chồng chị Khánh Vân & hai con"
      },
      {
        "id": "KV_294",
        "src": "/images/journeys/diem-tua-to-am/06-kv_294.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Tổ ấm bốn người tựa vào nhau ấm áp dưới cổng hoa gỗ mộc mạc trong kỳ nghỉ gia đình tại Đà Lạt.",
        "locationDetail": "Dưới cổng gỗ phủ hoa trắng trước ngôi nhà mái ngói cổ điển dưới tán thông Đà Lạt",
        "people": "Vợ chồng chị Khánh Vân & hai con"
      },
      {
        "id": "KV_295",
        "src": "/images/journeys/diem-tua-to-am/07-kv_295.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Buổi chiều bình yên khi cả gia đình ngồi bên nhau ngắm mặt hồ phẳng lặng và núi đồi khoáng đạt.",
        "locationDetail": "Sàn gỗ quán nhỏ ven hồ nước rộng lớn với dãy núi xanh phía xa",
        "people": "Vợ chồng chị Khánh Vân & hai con"
      },
      {
        "id": "KV_296",
        "src": "/images/journeys/diem-tua-to-am/08-kv_296.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Cả gia đình rạng rỡ trong màu áo xanh ngọc đồng điệu giữa không gian xanh mát của kỳ nghỉ cuối tuần.",
        "locationDetail": "Lối đi rợp bóng dừa xanh trong khu nghỉ dưỡng sinh thái",
        "people": "Vợ chồng chị Khánh Vân & hai con"
      },
      {
        "id": "KV_297",
        "src": "/images/journeys/diem-tua-to-am/09-kv_297.jpg?v=2",
        "width": 1280,
        "height": 852,
        "orientation": "landscape",
        "caption": "Khoảnh khắc ngọt ngào khi cậu con trai út vòng tay ôm chặt cổ mẹ bên góc vườn ban công xanh mát.",
        "locationDetail": "Góc ban công ngập tràn cây xanh và ánh sáng tự nhiên",
        "people": "Chị Khánh Vân & con trai út"
      },
      {
        "id": "KV_298",
        "src": "/images/journeys/diem-tua-to-am/10-kv_298.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Chị Khánh Vân kiên nhẫn ngồi cạnh đồng hành cùng con trai nhỏ tô màu sáng tạo trong buổi sáng cuối tuần.",
        "locationDetail": "Bàn gỗ nhỏ ngập ánh sáng bên hiên cây xanh",
        "people": "Chị Khánh Vân & con trai út"
      },
      {
        "id": "KV_299",
        "src": "/images/journeys/diem-tua-to-am/11-kv_299.jpg?v=2",
        "width": 853,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Khoảnh khắc lãng mạn khi vợ chồng chị Khánh Vân nắm tay nhau nhìn về phía biển trong bộ ảnh kỷ niệm hôn nhân.",
        "locationDetail": "Thảm cỏ xanh rợp bóng dừa bên bờ biển",
        "people": "Vợ chồng chị Khánh Vân"
      },
      {
        "id": "KV_316",
        "src": "/images/journeys/diem-tua-to-am/12-kv_316.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Chị Khánh Vân thành tâm treo tấm thiệp ước nguyện bình an lên cành lộc xanh trong những ngày đầu năm mới.",
        "locationDetail": "Bên cành lộc đầu xuân treo những tấm thiệp ước nguyện xanh trắng",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_317",
        "src": "/images/journeys/diem-tua-to-am/13-kv_317.jpg?v=2",
        "width": 852,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Vẻ đẹp đằm thắm và sang trọng của chị Khánh Vân trong chiếc đầm dạ hội đỏ rực dưới ánh đèn đêm.",
        "locationDetail": "Lối đi sân vườn lung linh ánh đèn vàng ấm áp buổi tối",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_318",
        "src": "/images/journeys/diem-tua-to-am/14-kv_318.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Dáng đứng thanh thoát của chị Khánh Vân dưới cổng vòm hoa hồng lãng mạn trước giờ dự tiệc.",
        "locationDetail": "Dưới cổng vòm kết đầy hoa hồng đỏ trong khu vườn buổi chiều tối",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_319",
        "src": "/images/journeys/diem-tua-to-am/15-kv_319.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Phong cách đời thường trẻ trung với áo khoác hồng phấn và quần jeans năng động của chị Khánh Vân.",
        "locationDetail": "Quảng trường thoáng đãng với công trình kiến trúc trắng hiện đại dưới trời xanh",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_320",
        "src": "/images/journeys/diem-tua-to-am/16-kv_320.jpg?v=2",
        "width": 960,
        "height": 1280,
        "orientation": "portrait",
        "caption": "Nụ cười rạng rỡ và gần gũi của chị Khánh Vân trên hành trình di chuyển làm việc mỗi ngày.",
        "locationDetail": "Không gian sáng tự nhiên bên trong xe ô tô trên đường đi gặp khách hàng",
        "people": "Chị Khánh Vân"
      },
      {
        "id": "KV_321",
        "src": "/images/journeys/diem-tua-to-am/17-kv_321.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Khoảnh khắc đời thường bình yên khi anh xã luôn là người bạn đồng hành vững chãi bên cạnh chị Khánh Vân trên mọi cung đường.",
        "locationDetail": "Bên trong khoang xe ô tô ngập nắng sớm",
        "people": "Vợ chồng chị Khánh Vân"
      },
      {
        "id": "KV_322",
        "src": "/images/journeys/diem-tua-to-am/18-kv_322.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Bốn chị em quản lý rạng rỡ thả tim tại sân bay trước giờ cất cánh cho một hành trình trải nghiệm mới.",
        "locationDetail": "Hành lang kính ngập sáng tại nhà ga sân bay trước giờ cất cánh",
        "people": "Chị Khánh Vân & 3 nữ quản lý thân thiết"
      },
      {
        "id": "KV_323",
        "src": "/images/journeys/diem-tua-to-am/19-kv_323.jpg?v=2",
        "width": 1280,
        "height": 960,
        "orientation": "landscape",
        "caption": "Nụ cười hạnh phúc của hai mẹ con chị Khánh Vân bên cây thông Giáng sinh ấm áp dịp cuối năm.",
        "locationDetail": "Bên cây thông Giáng sinh trang trí lung linh và ông già Noel",
        "people": "Chị Khánh Vân & con trai út"
      }
    ]
  }
];
