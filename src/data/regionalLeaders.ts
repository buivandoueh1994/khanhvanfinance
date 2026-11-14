export type LeaderTierKey =
  | 'DM'
  | 'SUM'
  | 'UM'
  | 'ADVISOR';

export interface LeaderGalleryItem {
  src: string;
  caption: string;
}

export interface RegionalLeader {
  id: string;
  index: string;
  displayName: string;
  fullName: string;
  roleBadge: string;
  roleTitle: string;
  tierKey: LeaderTierKey;
  tierLabel: string;
  unitCode: 'HCM69' | 'SG168' | 'SG169' | 'MN111';
  directLeader: string;
  joinedYear: string;
  tenureLabel: string;
  priorBackgroundShort: string;
  priorBackgroundFull: string;
  highlightNote: string;
  quote: string;
  cardSummary: string;
  editorialBio: string[];
  badges: string[];
  specialties: string[];
  facebookUrl?: string;
  portrait: string;
  gallery: LeaderGalleryItem[];
}

export interface RegionalAreaHub {
  code: string;
  title: string;
  leadName: string;
  leadRole: string;
  description: string;
  isCore?: boolean;
}

export const REGIONAL_AREA_HUBS: RegionalAreaHub[] = [
  {
    code: 'HCM69',
    title: 'Khu Vực Nòng Cốt HCM69',
    leadName: 'Khánh Vân',
    leadRole: 'Giám đốc Vùng Cấp cao (SRD)',
    description:
      'Đơn vị hạt nhân đặt nền móng cho văn hóa tư vấn chuẩn mực từ năm 2018, quy tụ đội ngũ Trưởng Khu vực, Trưởng Phòng (SDM/DM), Trưởng Nhóm và các thành viên MDRT kỳ cựu.',
    isCore: true,
  },
  {
    code: 'MN111',
    title: 'Khu Vực Kinh Doanh MN111',
    leadName: 'Ngân Vũ',
    leadRole: 'Giám đốc Khu vực Cấp cao (PSSM)',
    description:
      'Phát triển đội ngũ tư vấn tài chính chuyên nghiệp với kỷ luật đào tạo bài bản và tinh thần đồng hành đường dài cùng các gia đình trẻ.',
  },
  {
    code: 'SG168',
    title: 'Khu Vực Kinh Doanh SG168',
    leadName: 'Minh Phương',
    leadRole: 'Giám đốc Khu vực (SM)',
    description:
      'Nơi hội tụ những nhân sự chuyển mình từ đào tạo, kế toán và thẩm định bồi thường — đề cao triết lý “Làm ĐÚNG và làm có TÂM” ngay từ ngày đầu.',
  },
  {
    code: 'SG169',
    title: 'Khu Vực Kinh Doanh SG169',
    leadName: 'Huyền Trang',
    leadRole: 'Giám đốc Khu vực (SM)',
    description:
      'Môi trường gắn kết, tuân thủ pháp luật và nhân văn, chú trọng hoạch định bảo vệ trụ cột, quỹ học vấn cho con và chăm sóc y tế gia đình.',
  },
];

export const BACKGROUND_DIVERSITY_PILLS: string[] = [
  'Ngân hàng Quốc tế ANZ & Shinhan Bank',
  'Kiểm soát Nội bộ Tài chính – Ngân hàng',
  'Tập đoàn Đa quốc gia Hyundai • Cargill • FMCG',
  'Kế toán – Kiểm toán Doanh nghiệp',
  'Quản trị Nhân sự & Đào tạo Chuyên nghiệp',
  'Xuất nhập khẩu, Logistics & Bồi thường Bảo hiểm',
];

export const REGIONAL_LEADERS: RegionalLeader[] = [
  {
    id: 'kieu-nguyen',
    index: '01',
    displayName: 'Kiều Nguyễn',
    fullName: 'Nguyễn Thị Minh Kiều',
    roleBadge: 'DM',
    roleTitle: 'Trưởng Phòng Kinh doanh',
    tierKey: 'DM',
    tierLabel: 'Trưởng Phòng Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2020',
    tenureLabel: 'Gia nhập 09/2020 • Hơn 6 năm gắn bó tại Manulife',
    priorBackgroundShort: 'Nguyên Quản lý Ngân hàng ANZ & Shinhan Bank',
    priorBackgroundFull:
      'Nguyên Quản lý tại hai định chế Ngân hàng Quốc tế ANZ Bank & Shinhan Bank',
    highlightNote:
      'MDRT 2022–2023 • FC Platinum 2022–2023 • MBA Pro 2022–2023 • Đại sứ MDRT 2026',
    quote:
      'Làm nghề bằng sự tử tế, tư vấn bằng sự chân thành, đồng hành bằng trách nhiệm. Bởi phía sau mỗi hợp đồng không chỉ là những con số, mà là niềm tin và tương lai của cả một gia đình.',
    cardSummary:
      'Rời vị trí quản lý ngân hàng quốc tế để đi sâu hơn vào bài toán bảo vệ tài chính của từng tổ ấm bằng sự chân thành và kỷ luật chuyên môn.',
    editorialBio: [
      '“Đang làm quản lý ngân hàng ổn định, sao Kiều lại chuyển sang làm bảo hiểm?” — đó là câu hỏi Kiều Nguyễn nhận được nhiều nhất suốt hơn 6 năm qua. Thực chất, dù ở môi trường ngân hàng quốc tế ANZ, Shinhan hay tại Manulife, điều chị trân trọng nhất vẫn là được lắng nghe và cùng khách hàng tháo gỡ những bài toán thiết thực của cuộc sống.',
      'Hoạch định bảo hiểm nhân thọ mở ra cho chị cơ hội thấu hiểu sâu hơn từng gia đình: những trăn trở thầm lặng của người trụ cột, những dự định dài hạn cho con cái và những giá trị họ cần gìn giữ trước biến cố. Được đồng hành cùng chị Khánh Vân trong tập thể đề cao sự tử tế, minh bạch và tinh thần học hỏi không ngừng, Kiều Nguyễn kiên định đặt quyền lợi khách hàng lên trước mọi con số doanh thu.',
    ],
    badges: [
      'MDRT 2022–2023',
      'FC Platinum',
      'MBA Pro',
      'Manulife Pro Vàng',
      'Đại sứ MDRT 2026',
      'Quản lý Xuất sắc',
    ],
    specialties: [
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Hoạch định Hưu trí & Học vấn',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    facebookUrl: 'https://www.facebook.com/share/1FmBGw7smU/?mibextid=wwXIfrp',
    portrait: '/images/leaders/kieu-nguyen.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/kieu-nguyen-1.jpg',
        caption: 'Thảo luận chuyên môn cùng đội ngũ Quản lý tại văn phòng Manulife',
      },
      {
        src: '/images/leaders/gallery/kieu-nguyen-2.jpg',
        caption: 'Khoảnh khắc vinh danh và gắn kết tập thể khu vực',
      },
      {
        src: '/images/leaders/gallery/kieu-nguyen-3.jpg',
        caption: 'Dấu ấn danh hiệu quốc tế MDRT (Million Dollar Round Table)',
      },
    ],
  },
  {
    id: 'le-huyen',
    index: '02',
    displayName: 'Lê Huyên',
    fullName: 'Lê Thị Huyên',
    roleBadge: 'DM',
    roleTitle: 'Trưởng Phòng Kinh doanh',
    tierKey: 'DM',
    tierLabel: 'Trưởng Phòng Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2018',
    tenureLabel: 'Gia nhập 2018 • 8 năm tại Manulife & 5 năm Kế toán',
    priorBackgroundShort: 'Cử nhân Kế toán – Kiểm toán (ĐH Kinh tế – Luật)',
    priorBackgroundFull:
      'Cử nhân Kế toán – Kiểm toán (ĐH Kinh tế – Luật) • 5 năm Kế toán tổng hợp doanh nghiệp',
    highlightNote: 'Chinh phục trọn bộ 3 danh hiệu cao quý: MDRT • FC • MBA Pro',
    quote: 'Xây dựng cuộc sống vững vàng bằng tài chính thông minh.',
    cardSummary:
      'Từ 5 năm làm việc với bảng cân đối doanh nghiệp đến 8 năm hoạch định an toàn dòng tiền cá nhân cùng văn hóa chuẩn mực tại HCM69.',
    editorialBio: [
      'Tốt nghiệp chuyên ngành Kế toán – Kiểm toán tại Trường Đại học Kinh tế – Luật và có 5 năm đảm nhiệm vị trí kế toán tổng hợp trước khi bén duyên cùng Manulife từ năm 2018, cả hai chặng đường sự nghiệp của Lê Huyên đều gắn liền với tính kỷ luật của những con số. Chỉ khác rằng, nếu trước kia chị làm việc với báo cáo tài chính của doanh nghiệp và tập đoàn, thì suốt 8 năm qua chị chọn đồng hành cùng bức tranh dòng tiền của mỗi cá nhân và mỗi gia đình.',
      'Lựa chọn gắn bó cùng Khu vực HCM69 — Hệ thống Vùng Khánh Vân bởi văn hóa chuyên nghiệp luôn đặt khách hàng làm trọng tâm, Lê Huyên tin rằng sự tỉ mỉ, tử tế và chân thành chính là chiếc chìa khóa duy nhất để đi bền lâu cùng khách hàng qua năm tháng.',
    ],
    badges: ['MDRT', 'FC', 'MBA Pro'],
    specialties: ['Hoạch định Hưu trí & Học vấn', 'Chăm sóc Sức khỏe Cao cấp'],
    facebookUrl: 'https://www.facebook.com/dreamhigh.huyenlenguyen',
    portrait: '/images/leaders/le-huyen.jpg',
    gallery: [],
  },
  {
    id: 'loan-tran',
    index: '03',
    displayName: 'Loan Trần',
    fullName: 'Trần Thị Loan',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • 12 năm Quản trị & Định giá Tài chính',
    priorBackgroundShort: 'Nguyên Phó GĐ Hyundai • Chiến lược Định giá Cargill',
    priorBackgroundFull:
      'Nguyên Phó Giám đốc Hyundai • Chuyên gia Chiến lược Định giá tại Tập đoàn Cargill',
    highlightNote:
      '3 năm liên tiếp chuẩn quốc tế MDRT (2024–2026) • Nhà kiến tạo đội ngũ ưu tú MBA (12 nhân sự)',
    quote: 'Đặt lợi ích khách hàng làm trung tâm.',
    cardSummary:
      'Mang tư duy quản trị 12 năm từ Hyundai & Cargill vào sứ mệnh xây dựng đội ngũ tư vấn chuẩn chỉnh, đóng góp cho diện mạo bảo hiểm xanh tại Việt Nam.',
    editorialBio: [
      'Sở hữu bề dày 12 năm trong lĩnh vực tài chính và điều hành doanh nghiệp — từng giữ cương vị Phó Giám đốc tại Hyundai và phụ trách chiến lược định giá tại Tập đoàn đa quốc gia Cargill — Loan Trần đến với Manulife từ chính sự thuyết phục khi trải nghiệm dịch vụ với tư cách một khách hàng.',
      'Tại Hệ thống Vùng Khánh Vân, chị tìm thấy điểm hội tụ của những nhà tư vấn có trình độ thực chất, tư duy minh bạch và tinh thần sẻ chia bền chặt. Với cột mốc 3 năm liên tiếp đạt danh hiệu MDRT (2024–2026) và trực tiếp kiến tạo đội ngũ 12 nhân sự, Loan Trần kiên định theo đuổi những giải pháp tài chính chuẩn mực, góp phần xây dựng ngành bảo hiểm văn minh và bền vững tại Việt Nam.',
    ],
    badges: ['MDRT 2024–2026', 'MBA Pro', 'Kiến tạo Đội ngũ MBA'],
    specialties: [
      'Bảo vệ Trụ cột Gia đình',
      'Hoạch định Hưu trí & Học vấn',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    facebookUrl: 'https://www.facebook.com/share/1ECiGhacqb/?mibextid=wwXIfr',
    portrait: '/images/leaders/loan-tran.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/loan-tran-1.jpg',
        caption: 'Vinh danh cùng Ban Điều Hành và đội ngũ tại sảnh vòm Manulife Plaza',
      },
      {
        src: '/images/leaders/gallery/loan-tran-2.jpg',
        caption: 'Dấu ấn chinh phục chuẩn mực quốc tế MDRT nhiều năm liên tiếp',
      },
    ],
  },
  {
    id: 'anh-tho',
    index: '04',
    displayName: 'Anh Thơ',
    fullName: 'Nguyễn Tố Anh Thơ',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'SG168',
    directLeader: 'SM Minh Phương',
    joinedYear: '2024',
    tenureLabel: 'Gia nhập 2024 • 10 năm Đào tạo (Trainer) & Ngôn ngữ',
    priorBackgroundShort: '10 năm Phiên dịch viên, Giảng viên TBN & Trainer',
    priorBackgroundFull:
      '10 năm kinh nghiệm Phiên dịch viên, Giảng viên tiếng Tây Ban Nha, Trainer & Bất động sản',
    highlightNote: 'Manulife Pro Vàng • Quản lý Xuất sắc Khu vực SG168',
    quote: 'Hãy làm ĐÚNG từ lúc bắt đầu.',
    cardSummary:
      'Từ một người từng dè dặt với bảo hiểm trước biến cố gia đình đến người quản lý truyền lửa văn hóa “Làm ĐÚNG và làm có TÂM”.',
    editorialBio: [
      'Từng có hơn 10 năm làm Phiên dịch viên, Giảng viên tiếng Tây Ban Nha và Chuyên gia đào tạo (Trainer), Anh Thơ thẳng thắn chia sẻ rằng trước đây chị từng là người e ngại bảo hiểm. Bước ngoặt chỉ thực sự đến khi gia đình trải qua biến cố và chị được Giám đốc Khu vực Minh Phương đồng hành — vừa trở thành khách hàng được bảo vệ tại Manulife, vừa tìm thấy sứ mệnh nghề nghiệp mới trong Hệ thống Vùng Khánh Vân.',
      'Điều khiến Anh Thơ tự hào nhất ở hệ thống là kim chỉ nam mà chị Khánh Vân luôn nhắc nhở toàn đội ngũ: làm bất cứ việc gì cũng phải “làm ĐÚNG và làm có TÂM”. Trong tư vấn, đó là tư vấn đúng nhu cầu và minh bạch đúng điều khoản sản phẩm; trong phát triển đội ngũ, đó là tuyển chọn đúng người và đồng hành đúng định hướng sự nghiệp của họ.',
    ],
    badges: ['Manulife Pro Vàng', 'Quản lý Xuất sắc'],
    specialties: [
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/anh-tho.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/anh-tho-1.jpg',
        caption: 'Chân dung Trưởng Nhóm Kinh doanh Cấp cao Nguyễn Tố Anh Thơ',
      },
      {
        src: '/images/leaders/gallery/anh-tho-2.jpg',
        caption: 'Phong thái chuyên nghiệp của người làm công tác đào tạo và cố vấn',
      },
    ],
  },
  {
    id: 'duong-quynh',
    index: '05',
    displayName: 'Dương Quỳnh',
    fullName: 'Nguyễn Ngọc Dương Quỳnh',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2020',
    tenureLabel: 'Gia nhập 2020 • 12 năm Tài chính – Ngân hàng',
    priorBackgroundShort: 'Nguyên Chuyên viên Kiểm soát Nội bộ Ngân hàng',
    priorBackgroundFull:
      'Nguyên Chuyên viên Kiểm soát Nội bộ Ngân hàng • Chứng chỉ Hoạch định Di sản Tài chính LIMRA',
    highlightNote:
      'MDRT • MBA Pro • Manulife Pro Bạch Kim • Chứng chỉ Quốc tế LIMRA',
    quote: 'Tư vấn tận tình – Phục vụ tận tâm – Đồng hành trọn đời.',
    cardSummary:
      'Từ vị thế một khách hàng ký 2 hợp đồng bảo vệ gia đình cùng chị Khánh Vân, mang kỷ luật Kiểm soát Nội bộ Ngân hàng vào nghề tư vấn.',
    editorialBio: [
      'Xuất thân từ nghiệp vụ Kiểm soát nội bộ ngân hàng vốn đòi hỏi tính chuẩn xác và tuân thủ nghiêm ngặt, cơ duyên đưa Dương Quỳnh đến với nghề bắt đầu rất tự nhiên: chị chủ động liên hệ chị Khánh Vân để thiết lập hai hợp đồng bảo vệ cho chính gia đình mình. Ấn tượng sâu sắc trước cách làm việc rõ ràng, thấu đáo và đầy tâm huyết ấy, chị quyết định bước vào hành trình học tập bài bản và gắn bó cùng HCM69 từ năm 2020.',
      'Kết hợp tư duy quản trị rủi ro ngân hàng cùng Chứng chỉ Hoạch định Di sản Tài chính Quốc tế LIMRA, Dương Quỳnh luôn trân quý văn hóa yêu thương, chuẩn mực của hệ thống — nơi mỗi bản kế hoạch tài chính được thiết kế đầy đủ, minh bạch để đồng hành trọn đời cùng khách hàng.',
    ],
    badges: [
      'MDRT',
      'MBA Pro',
      'Manulife Pro Bạch Kim',
      'Chứng chỉ LIMRA',
      'Quản lý Xuất sắc',
    ],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    facebookUrl: 'https://www.facebook.com/share/1JVD8VBPc3/?mibextid=wwXIfr',
    portrait: '/images/leaders/duong-quynh.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/duong-quynh-1.jpg',
        caption: 'Khoảnh khắc vinh danh danh hiệu Quản lý MBA & FC trên sân khấu',
      },
      {
        src: '/images/leaders/gallery/duong-quynh-2.jpg',
        caption: 'Tại sự kiện giới thiệu giải pháp hoạch định gia sản Manulife',
      },
      {
        src: '/images/leaders/gallery/duong-quynh-3.jpg',
        caption: 'Danh hiệu Manulife Pro Bạch Kim khu vực HCM69',
      },
    ],
  },
  {
    id: 'dung-grace',
    index: '06',
    displayName: 'Dung Grace',
    fullName: 'Nguyễn Cao Tường Dung',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • 19 năm FMCG & 5 năm Tài chính',
    priorBackgroundShort: '19 năm Quản lý Tiếp thị Thương mại ngành FMCG',
    priorBackgroundFull:
      '19 năm Quản lý Tiếp thị Thương mại (Trade Marketing) ngành Hàng tiêu dùng nhanh (FMCG)',
    highlightNote:
      'Thành viên Bàn Tròn Triệu Đô MDRT • Đại biểu Hội nghị Toàn cầu MDRT tại Sydney',
    quote: 'Tận tâm – Tử tế – Chuyên nghiệp.',
    cardSummary:
      'Hơn hai thập kỷ bản lĩnh thương trường FMCG & Tài chính, tìm thấy sự đồng điệu trong văn hóa sẻ chia và nâng đỡ đội ngũ tại Vùng Khánh Vân.',
    editorialBio: [
      'Trước khi bước sang lĩnh vực hoạch định tài chính – bảo hiểm năm 2021, Dung Grace đã có 19 năm đảm nhiệm vị trí Quản lý Tiếp thị Thương mại (Trade Marketing) trong ngành hàng tiêu dùng nhanh (FMCG) đầy năng động. Bề dày trải nghiệm thực chiến giúp chị sở hữu góc nhìn sắc bén về quản trị kế hoạch cũng như sự thấu cảm sâu sắc trước nhu cầu của từng gia đình.',
      'Chinh phục danh hiệu quốc tế MDRT và trực tiếp tham dự Hội nghị Toàn cầu MDRT tại Sydney (Úc), điều giữ chân Dung Grace gắn bó bền chặt cùng Khu vực HCM69 chính là văn hóa “cho đi”, sẵn lòng chia sẻ kinh nghiệm và sát cánh hỗ trợ từng thành viên trong đội ngũ cùng trưởng thành.',
    ],
    badges: ['MDRT', 'MDRT Global Conference Sydney'],
    specialties: [
      'Hoạch định Tài chính Gia đình',
      'Bảo vệ Nguồn thu Trụ cột',
      'Cố vấn & Đồng hành Đội ngũ',
    ],
    facebookUrl: 'https://www.facebook.com/share/1AB3AmUySu/?mibextid=wwXIfr',
    portrait: '/images/leaders/dung-grace.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/dung-grace-1.jpg',
        caption: 'Lễ Tuyên Dương Quản Lý Xuất Sắc & Đỉnh Cao Danh Vọng MDRT',
      },
      {
        src: '/images/leaders/gallery/dung-grace-2.jpg',
        caption: 'Cùng đoàn đại biểu tại Hội nghị Toàn cầu MDRT tại Sydney, Australia',
      },
    ],
  },
  {
    id: 'tien-tien',
    index: '07',
    displayName: 'Tiên Tiên',
    fullName: 'Huỳnh Thị Tiên',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'SG169',
    directLeader: 'SM Huyền Trang',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • 6 năm gắn bó cùng Manulife Việt Nam',
    priorBackgroundShort: 'Chuyên viên Xuất nhập khẩu & Logistics',
    priorBackgroundFull: 'Chuyên viên nghiệp vụ Xuất nhập khẩu & Chuỗi cung ứng Logistics',
    highlightNote: 'Quản lý Xuất sắc • Trực tiếp dẫn dắt đội ngũ 20 thành viên tại SG169',
    quote: 'Tư vấn từ tâm, làm nghề bằng sự tử tế.',
    cardSummary:
      'Dẫn dắt đội ngũ 20 nhân sự bằng tâm thế của người phụ nữ hướng về gia đình: tuân thủ pháp luật, minh bạch và gieo hạt lành qua từng hợp đồng.',
    editorialBio: [
      'Chuyển mình từ ngành Xuất nhập khẩu – Logistics sang lĩnh vực bảo hiểm nhân thọ từ năm 2021, Tiên Tiên tìm thấy ý nghĩa trọn vẹn của nghề nghiệp khi gặp gỡ Giám đốc Vùng Khánh Vân và Giám đốc Khu vực Huyền Trang. Là người phụ nữ luôn đặt gia đình làm điểm tựa, chị trân trọng môi trường giúp mình vừa nâng cao thu nhập bền vững, vừa có thời gian chất lượng đồng hành cùng con cái trưởng thành.',
      'Hiện trực tiếp dẫn dắt đội ngũ 20 thành viên tại Khu vực SG169, Tiên Tiên giữ vững nguyên tắc thượng tôn pháp luật và tư vấn từ tâm — bởi chị luôn tin rằng làm nghề chuẩn mực chính là cách thiết thực nhất để gieo những hạt mầm bình an cho khách hàng và cho chính gia đình mình.',
    ],
    badges: ['Quản lý Xuất sắc', 'Đội ngũ 20 Nhân sự'],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    facebookUrl: 'https://www.facebook.com/share/19zMFHWh3w/?mibextid=wwXIfr',
    portrait: '/images/leaders/tien-tien.jpg',
    gallery: [],
  },
  {
    id: 'nhuan-vu',
    index: '08',
    displayName: 'Nhuần Vũ',
    fullName: 'Vũ Thị Nhuần',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'SG168',
    directLeader: 'SM Minh Phương',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • 4 năm tại Manulife Việt Nam',
    priorBackgroundShort: 'Nghiệp vụ Kế toán & Kinh doanh Trực tuyến',
    priorBackgroundFull: 'Chuyên viên Kế toán doanh nghiệp & Kinh doanh trực tuyến',
    highlightNote: 'Trưởng Nhóm Kinh doanh SG168 • Bén duyên từ trải nghiệm chi trả thực tế',
    quote: 'Tư vấn bằng sự tận tâm, tử tế.',
    cardSummary:
      'Chứng kiến tận mắt giá trị chi trả quyền lợi bảo hiểm dành cho người thân, từ sự tò mò thử sức trở thành niềm đam mê gắn bó dài lâu.',
    editorialBio: [
      'Hành trình đến với bảo hiểm nhân thọ của Nhuần Vũ bắt đầu từ một trải nghiệm thực tế ngay trong chính gia đình: chứng kiến người thân nhận quyền lợi chi trả kịp thời từ hợp đồng bảo hiểm, chị mới thực sự thấm thía giá trị nhân văn sâu sắc đằng sau những trang điều khoản.',
      'Khép lại công việc kế toán trước đó để thử sức tại Khu vực SG168 — Hệ thống Vùng Khánh Vân từ năm 2022, sự cẩn trọng của người làm kế toán kết hợp cùng niềm tin thực chứng vào sản phẩm đã giữ chị gắn bó say mê suốt 4 năm qua, luôn đồng hành cùng khách hàng bằng sự tận tâm và giản dị nhất.',
    ],
    badges: ['Trưởng Nhóm Kinh doanh', 'Đồng hành Quyền lợi Thực tế'],
    specialties: [
      'Bảo vệ Thu nhập Gia đình',
      'Chăm sóc Y tế & Viện phí',
      'Hỗ trợ Thủ tục Chi trả Quyền lợi',
    ],
    facebookUrl: 'https://www.facebook.com/share/19MRiWSNQd/?mibextid=wwXIfr',
    portrait: '/images/leaders/nhuan-vu.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/nhuan-vu-1.jpg',
        caption: 'Chân dung Trưởng Nhóm Kinh doanh Vũ Thị Nhuần (Khu vực SG168)',
      },
      {
        src: '/images/leaders/gallery/nhuan-vu-2.jpg',
        caption: 'Phong thái chỉn chu, gần gũi trong hành trình đồng hành cùng khách hàng',
      },
    ],
  },
  {
    id: 'minh-phuong',
    index: '09',
    displayName: 'Minh Phương',
    fullName: 'Băng Tâm',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'SG168',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • Nền tảng Thẩm định & Bồi thường BH',
    priorBackgroundShort: 'Nguyên Chuyên viên Phòng Bồi thường BH Phi nhân thọ',
    priorBackgroundFull:
      'Nguyên Chuyên viên Phòng Giải quyết Quyền lợi Bồi thường — Công ty Bảo hiểm Phi nhân thọ',
    highlightNote: 'Thế mạnh chuyên sâu về cấu trúc điều khoản & quy trình giải quyết bồi thường',
    quote: 'Tư vấn đủ, đúng với tính chất bảo hiểm.',
    cardSummary:
      'Từng trực tiếp làm việc tại phòng Bồi thường bảo hiểm phi nhân thọ, thấu hiểu từng chữ trong điều khoản để thiết kế giải pháp “đúng và đủ”.',
    editorialBio: [
      'Khác với nhiều nhân sự chuyển ngành từ lĩnh vực ngoài bảo hiểm, Minh Phương (Băng Tâm) đã sớm có nền tảng chuyên môn sâu tại Phòng Bồi thường của doanh nghiệp bảo hiểm phi nhân thọ. Chính quãng thời gian trực tiếp xử lý hồ sơ sự kiện bảo hiểm giúp chị hiểu rõ hơn ai hết: một hợp đồng chỉ thực sự phát huy giá trị bảo vệ khi được kê khai trung thực và thiết kế đúng bản chất ngay từ ngày ký.',
      'Tìm kiếm một tập thể làm nghề đàng hoàng, giàu tình yêu thương và tương trợ lẫn nhau, chị lựa chọn gia nhập Hệ thống Vùng Khánh Vân từ năm 2022 để tiếp tục theo đuổi đam mê bảo hiểm một cách chuẩn chỉnh và bền vững.',
    ],
    badges: ['Trưởng Nhóm Kinh doanh', 'Chuyên môn Bồi thường Bảo hiểm'],
    specialties: [
      'Bảo vệ Trụ cột Gia đình',
      'Rà soát Điều khoản & Hồ sơ Bồi thường',
    ],
    portrait: '/images/leaders/minh-phuong.jpg',
    gallery: [],
  },
  {
    id: 'hong-khanh',
    index: '10',
    displayName: 'Hồng Khánh',
    fullName: 'Văn Thụy Hồng Khánh',
    roleBadge: 'MDRT',
    roleTitle: 'Chuyên viên Tư vấn Tài chính Cấp cao',
    tierKey: 'ADVISOR',
    tierLabel: 'Chuyên viên Cấp cao & Quản lý MBA',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • 6 năm gắn bó cùng nghề',
    priorBackgroundShort: 'Nguyên Quản lý Nhân sự (HR Manager)',
    priorBackgroundFull: 'Nguyên Quản lý Nhân sự (Human Resources Manager) doanh nghiệp',
    highlightNote: '2 năm liên tiếp đạt chuẩn quốc tế MDRT • FC Platinum • Quản lý MBA',
    quote: 'Tư vấn tận tâm.',
    cardSummary:
      'Từ nền tảng Quản lý Nhân sự giàu sự lắng nghe đến cột mốc 2 năm liên tiếp đạt MDRT trong môi trường hỗ trợ không vụ lợi tại HCM69.',
    editorialBio: [
      'Giai đoạn 2020–2021 với nhiều biến động của đại dịch đã khiến Hồng Khánh — khi ấy đang công tác ở vị trí Quản lý Nhân sự — nhìn nhận sâu sắc hơn về tính dự phòng trước rủi ro cuộc sống. Từ lời chia sẻ của một người đồng nghiệp cũ, chị quyết định mở lòng tìm hiểu bài bản và trao cho bản thân cơ hội bước vào lĩnh vực hoạch định bảo hiểm nhân thọ.',
      'Trải qua các chương trình huấn luyện chuyên sâu tại Khu vực HCM69 — Hệ thống Vùng Khánh Vân, sự nhiệt huyết, tinh thần nâng đỡ nhau không vụ lợi và trên hết là chữ “TÂM” làm nghề của tập thể lãnh đạo đã thuyết phục chị chọn nơi đây làm sự nghiệp gắn bó lâu dài, liên tiếp chinh phục các cột mốc MDRT và FC Platinum.',
    ],
    badges: ['2x MDRT', 'FC Platinum', 'MBA', 'Quản lý Xuất sắc'],
    specialties: [
      'Bảo vệ Trụ cột Gia đình',
      'Hoạch định Hưu trí & Học vấn',
      'Chăm sóc Sức khỏe Cao cấp',
    ],
    facebookUrl: 'https://www.facebook.com/share/1Ec9CpjoZU/?mibextid=wwXIfr',
    portrait: '/images/leaders/hong-khanh.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/hong-khanh-1.jpg',
        caption: 'Vinh danh bộ ba danh hiệu cao quý: MDRT • FC • MBA Khu vực HCM69',
      },
      {
        src: '/images/leaders/gallery/hong-khanh-2.jpg',
        caption: 'Vinh danh danh hiệu FC Platinum tại Manulife Việt Nam',
      },
    ],
  },
  {
    id: 'xuan-suong',
    index: '11',
    displayName: 'Xuân Sương',
    fullName: 'Dương Thị Xuân Sương',
    roleBadge: 'MBA',
    roleTitle: 'Chuyên viên Tư vấn & Quản lý MBA',
    tierKey: 'ADVISOR',
    tierLabel: 'Chuyên viên Cấp cao & Quản lý MBA',
    unitCode: 'HCM69',
    directLeader: 'SDM Nguyễn Thị Phượng',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • Hơn 12 năm Mua hàng Quốc tế & XNK',
    priorBackgroundShort: 'Hơn 12 năm Mua hàng Quốc tế, XNK & Logistics',
    priorBackgroundFull:
      'Hơn 12 năm kinh nghiệm Chuyên viên Cung ứng, Mua hàng Nước ngoài & Xuất nhập khẩu – Logistics',
    highlightNote:
      '1 trong 2 Quản lý thăng tiến 2 cấp trong 1 năm (2023) • Quản lý MBA • FC 2023',
    quote:
      'Làm đúng, đủ ngay từ ban đầu để lúc nào cũng hạnh phúc và ăn ngon, ngủ yên.',
    cardSummary:
      'Đi qua biến cố sức khỏe dồn dập của gia đình năm 2021, chọn dấn thân làm người tư vấn vừa có tâm vừa vững nghiệp vụ để bảo vệ nhiều mái ấm hơn.',
    editorialBio: [
      'Năm 2021 giữa cao điểm dịch COVID-19, biến cố ập đến dồn dập với gia đình Xuân Sương khi mẹ mắc bệnh hiểm nghèo, em gái phát hiện u não và cháu nhỏ chào đời gặp vấn đề hô hấp nặng. Cuộc trò chuyện trực tuyến cùng chị Khánh Vân giữa giai đoạn ấy giúp chị bừng tỉnh về giá trị thực sự của bảo hiểm y tế – nhân thọ, đồng thời nhận ra rằng khi tỷ lệ người dân có bảo hiểm tại Việt Nam còn khiêm tốn, xã hội rất cần những tư vấn viên vừa có tâm sáng vừa vững chuyên môn.',
      'Khép lại hơn 12 năm làm Mua hàng Quốc tế và Xuất nhập khẩu để chủ động thời gian chăm sóc mẹ và gia đình, Xuân Sương tìm thấy ở Khu vực HCM69 một mái nhà yêu thương, kỷ luật và chuẩn chỉnh. Năm 2023, chị ghi dấu ấn trở thành một trong hai quản lý thăng tiến hai cấp bậc trong cùng một năm — nhưng điều khiến chị hạnh phúc nhất vẫn là sự bình an “ăn ngon, ngủ yên” khi luôn tư vấn đúng, đủ và xem khách hàng như ruột thịt.',
    ],
    badges: ['MBA Pro', 'FC 2023', 'Quản lý Xuất sắc'],
    specialties: ['Bảo vệ Trụ cột Gia đình', 'Chăm sóc Y tế & Bệnh Lý Nghiêm Trọng'],
    portrait: '/images/leaders/xuan-suong.jpg',
    gallery: [],
  },
];

export interface RegionalCultureMoment {
  id: string;
  src: string;
  tag: string;
  title: string;
  subtitle: string;
  spanClass: string;
  aspectClass: string;
}

export const REGIONAL_CULTURE_MOMENTS: RegionalCultureMoment[] = [
  {
    id: 'hop-ban-dieu-hanh',
    src: '/images/VanPhong_ChiVanDieuHanhCuocHopBanBauDuc.jpg',
    tag: 'QUẢN TRỊ HỆ THỐNG',
    title: 'Họp điều hành chiến lược cùng đội ngũ Quản lý các khu vực',
    subtitle:
      'Mỗi định hướng tư vấn và tiêu chuẩn chăm sóc khách hàng đều được thống nhất xuyên suốt từ Ban Điều Hành đến từng khu vực kinh doanh.',
    spanClass: 'md:col-span-7',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'dao-tao-thuc-chien',
    src: '/images/PhongDaoTao_ChiVan_ChiaSeTruyenLua.jpg',
    tag: 'HUẤN LUYỆN NGHIỆP VỤ',
    title: 'Đào tạo chuyên sâu từ điều khoản pháp lý đến hoạch định dòng tiền',
    subtitle:
      'Văn hóa rèn nghề thực chất giúp mỗi nhân sự tự tin giải thích thấu đáo từng trang hợp đồng cho khách hàng.',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/3] md:aspect-auto md:h-full',
  },
  {
    id: 'co-van-ke-can',
    src: '/images/VanPhong_ChiVanCungNhomQuanLy_SofaBenCuaSoViewDep.jpg',
    tag: 'MENTORING KẾ CẬN',
    title: 'Đồng hành sát sao cùng thế hệ Quản lý trẻ',
    subtitle:
      'Trao truyền kinh nghiệm quản trị nhân sự và xây dựng đội ngũ bền vững ngay tại không gian làm việc Manulife Plaza.',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'thao-luan-giai-phap',
    src: '/images/VanPhong_NhomQuanLy_ThaoLuanTaiLieuThucChien.jpg',
    tag: 'CHUẨN MỰC TƯ VẤN',
    title: 'Cùng rà soát và thẩm định giải pháp trước khi trao đến gia đình khách hàng',
    subtitle:
      'Tinh thần làm việc tập thể giúp mọi phương án bảo vệ đều được đối chiếu cẩn trọng trên dữ liệu thu nhập và nhu cầu thực tế.',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'vinh-danh-top1',
    src: '/images/SanKhau_ChiVan_ManHinhLED_Top1FYP2025.jpg',
    tag: 'DẤU ẤN QUÁN QUÂN',
    title: 'Cú đúp Top 1 Toàn quốc 2025 — Kết quả tự nhiên của sự tử tế',
    subtitle:
      'Vị trí dẫn đầu toàn quốc cả về Doanh số FYP lẫn Tỷ lệ Duy trì Hợp đồng là lời khẳng định khách quan nhất cho niềm tin của hàng nghìn gia đình.',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]',
  },
];
