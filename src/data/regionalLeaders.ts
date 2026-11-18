export type LeaderTierKey =
  | 'SM'
  | 'DM'
  | 'SUM'
  | 'UM'
  | 'ADVISOR';

export type IndustryCategoryKey =
  | 'BANKING'
  | 'FINANCE_ACC'
  | 'CORP_BIZ'
  | 'HR_EDU'
  | 'LAW_MED_INS';

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
  isSeniorLeadership?: boolean;
  unitCode: 'HCM69' | 'SG168' | 'SG169' | 'MN111';
  directLeader: string;
  joinedYear: string;
  tenureLabel: string;
  industryKey: IndustryCategoryKey;
  priorBackgroundShort: string;
  priorBackgroundFull: string;
  teamScaleBadge?: string;
  highlightNote: string;
  quote: string;
  cardSummary: string;
  editorialBio: string[];
  badges: string[];
  specialties: string[];
  portrait: string;
  gallery: LeaderGalleryItem[];
}

export interface RegionalExecutiveHub {
  code: 'HCM69' | 'MN111' | 'SG168' | 'SG169';
  title: string;
  subtitle: string;
  leadName: string;
  leadRole: string;
  leadPortrait: string;
  leadProfileId?: string;
  coLeadName?: string;
  coLeadRole?: string;
  coLeadPortrait?: string;
  scaleBadge: string;
  description: string;
  isCore?: boolean;
}

export interface OrgNodeMember {
  name: string;
  role: string;
  avatar?: string;
  leaderId?: string;
  subNote?: string;
  children?: OrgNodeMember[];
}

export interface OrgAreaBranch {
  code: 'HCM69' | 'MN111' | 'SG168' | 'SG169';
  areaLabel: string;
  headName: string;
  headRole: string;
  headAvatar?: string;
  isOpenEmblem?: boolean;
  headLeaderId?: string;
  isCore?: boolean;
  keyManagers: OrgNodeMember[];
  moreCountNote?: string;
}

export const INDUSTRY_CATEGORIES: {
  key: IndustryCategoryKey;
  label: string;
  shortLabel: string;
}[] = [
  {
    key: 'BANKING',
    label: 'Tài chính & Ngân hàng',
    shortLabel: 'Ngân hàng',
  },
  {
    key: 'FINANCE_ACC',
    label: 'Kế toán, Kiểm toán & Tài chính DN',
    shortLabel: 'Kế toán & Kiểm toán',
  },
  {
    key: 'CORP_BIZ',
    label: 'Điều hành DN, Thương mại & Logistics',
    shortLabel: 'Quản trị & Thương mại',
  },
  {
    key: 'HR_EDU',
    label: 'Nhân sự, Giáo dục & Đào tạo',
    shortLabel: 'Nhân sự & Giáo dục',
  },
  {
    key: 'LAW_MED_INS',
    label: 'Pháp lý, Y tế & Nghiệp vụ Bảo hiểm',
    shortLabel: 'Luật • Y tế • Bảo hiểm',
  },
];

export const REGIONAL_EXECUTIVE_HUBS: RegionalExecutiveHub[] = [
  {
    code: 'HCM69',
    title: 'Khu Vực Hạt Nhân HCM69',
    subtitle: 'Đơn vị Nền móng từ 2018',
    leadName: 'Khánh Vân',
    leadRole: 'Giám đốc Vùng Cấp cao (SRD)',
    leadPortrait: '/images/leaders/avatars/khanh-van.jpg',
    scaleBadge: 'Open Unit • Hạt nhân',
    description:
      'Cái nôi đặt nền móng cho văn hóa “Làm đúng trước, làm giỏi sau” từ năm 2018, trực thuộc SRD Khánh Vân, quy tụ dàn Trưởng Phòng Cấp cao (SDM), Trưởng Phòng (DM), Trưởng Nhóm và các MDRT kỳ cựu.',
    isCore: true,
  },
  {
    code: 'MN111',
    title: 'Khu Vực Kinh Doanh MN111',
    subtitle: 'Trực thuộc Hệ thống Vùng',
    leadName: 'Ngân Vũ',
    leadRole: 'Giám đốc Khu vực Cấp cao (PSSM)',
    leadPortrait: '/images/leaders/avatars/ngan-vu.jpg',
    scaleBadge: 'Khu vực Cấp cao',
    description:
      'Cánh quân chiến lược trực thuộc Hệ thống Vùng Khánh Vân, phát triển đội ngũ tư vấn tài chính chuyên nghiệp với kỷ luật đào tạo bài bản và cam kết đồng hành đường dài cùng khách hàng.',
  },
  {
    code: 'SG168',
    title: 'Khu Vực Kinh Doanh SG168',
    subtitle: 'Trực thuộc Hệ thống Vùng',
    leadName: 'Đào Minh Phương',
    leadRole: 'Giám đốc Khu vực (SM)',
    leadPortrait: '/images/leaders/avatars/dao-minh-phuong.jpg',
    leadProfileId: 'dao-minh-phuong',
    scaleBadge: 'Đội ngũ đa ngành',
    description:
      'Quy tụ đội ngũ quản lý giàu kinh nghiệm từ Kế toán, Kiểm toán, Ngân hàng, Quản trị Nhân sự, Đào tạo và Bồi thường bảo hiểm, tận tâm dìu dắt đồng đội từng bước vững chắc.',
  },
  {
    code: 'SG169',
    title: 'Khu Vực Kinh Doanh SG169',
    subtitle: 'Trực thuộc Hệ thống Vùng',
    leadName: 'Huyền Trang',
    leadRole: 'Giám đốc Khu vực (SM)',
    leadPortrait: '/images/leaders/avatars/huyen-trang.jpg',
    leadProfileId: 'huyen-trang',
    scaleBadge: 'Chuẩn mực Ngân hàng',
    description:
      'Khởi nguồn từ kỷ luật Kiểm soát viên Ngân hàng, kiên định xây dựng hệ sinh thái bảo hiểm xanh, sạch, đẹp, nơi mỗi tư vấn viên đều vững nền tảng pháp lý và phụng sự khách hàng từ tâm.',
  },
];

export const REGIONAL_ORG_BRANCHES: OrgAreaBranch[] = [
  {
    code: 'HCM69',
    areaLabel: 'Đơn Vị Hạt Nhân • Open Unit',
    headName: 'OPEN HCM69',
    headRole: 'Báo cáo trực tiếp cho SRD Khánh Vân',
    isOpenEmblem: true,
    isCore: true,
    keyManagers: [
      {
        name: 'Minh Phượng',
        role: 'SDM',
        avatar: '/images/leaders/avatars/bm-minh-phuong.jpg',
        subNote: 'Trưởng Phòng Cấp cao • BCTT SRD Khánh Vân',
        children: [
          {
            name: 'Trà My',
            role: 'DM',
            avatar: '/images/leaders/avatars/tra-my.jpg',
            leaderId: 'tra-my',
            subNote: 'Trưởng Phòng Kinh doanh',
          },
        ],
      },
      {
        name: 'Trân Phan',
        role: 'SDM',
        avatar: '/images/leaders/avatars/tran-phan.jpg',
        subNote: 'Trưởng Phòng Cấp cao • BCTT SRD Khánh Vân',
        children: [
          {
            name: 'Tiền Lê (Bích Tiền)',
            role: 'DM',
            avatar: '/images/leaders/avatars/bich-tien.jpg',
            leaderId: 'bich-tien',
            subNote: 'MBA Pro Bạch Kim • GAMA Global',
          },
        ],
      },
      {
        name: 'Diễm Ly',
        role: 'SDM',
        avatar: '/images/leaders/avatars/diem-ly.jpg',
        leaderId: 'diem-ly',
        subNote: 'MDRT • MBA Pro • BCTT SRD Khánh Vân',
        children: [
          {
            name: 'Hồng Hòa',
            role: 'DM',
            avatar: '/images/leaders/avatars/hong-hoa.jpg',
            subNote: 'Trưởng Phòng Kinh doanh',
          },
        ],
      },
      {
        name: 'Lê Huyên',
        role: 'SDM',
        avatar: '/images/leaders/avatars/le-huyen.jpg',
        leaderId: 'le-huyen',
        subNote: 'Từ 2018 • MDRT • FC • MBA',
      },
      {
        name: 'Minh Kiều (Kiều Nguyễn)',
        role: 'DM',
        avatar: '/images/leaders/avatars/kieu-nguyen.jpg',
        leaderId: 'kieu-nguyen',
        subNote: 'Đại sứ MDRT 2026',
      },
      {
        name: 'Đào Trần',
        role: 'SUM',
        avatar: '/images/leaders/avatars/tran-dao.jpg',
        leaderId: 'tran-dao',
        subNote: '3x MDRT • 3x MBA Pro',
      },
      {
        name: 'Loan Trần',
        role: 'SUM',
        avatar: '/images/leaders/avatars/loan-tran.jpg',
        leaderId: 'loan-tran',
        subNote: '3x MDRT • MBA Pro',
      },
      {
        name: 'Dương Quỳnh',
        role: 'SUM',
        avatar: '/images/leaders/avatars/duong-quynh.jpg',
        leaderId: 'duong-quynh',
        subNote: 'MDRT • Chứng chỉ LIMRA',
      },
    ],
    moreCountNote:
      'Cùng các quản lý SUM & UM trực thuộc HCM69 (Ngọc Đầy, Huyền Lương, Nguyễn Hoa, Thiên Vân, Linh Tằng, Dung Grace, Thảo Bùi, Cẩm Hương, Hà Đỗ, Ngọc Anh...)',
  },
  {
    code: 'MN111',
    areaLabel: 'Khu Vực MN111',
    headName: 'Ngân Vũ',
    headRole: 'PSSM • Giám đốc Khu vực Cấp cao',
    headAvatar: '/images/leaders/avatars/ngan-vu.jpg',
    keyManagers: [],
    moreCountNote:
      'Đội ngũ Trưởng Phòng và Trưởng Nhóm Kinh doanh trực thuộc PSSM Ngân Vũ tại khu vực MN111 đang tiếp tục cập nhật hồ sơ trực tuyến.',
  },
  {
    code: 'SG168',
    areaLabel: 'Khu Vực SG168',
    headName: 'Đào Minh Phương',
    headRole: 'SM • Giám đốc Khu vực',
    headAvatar: '/images/leaders/avatars/dao-minh-phuong.jpg',
    headLeaderId: 'dao-minh-phuong',
    keyManagers: [
      {
        name: 'Thuỳ Liêm',
        role: 'SDM',
        avatar: '/images/leaders/avatars/thuy-liem.jpg',
        leaderId: 'thuy-liem',
        subNote: 'MDRT • MBA Pro Bạch Kim',
        children: [
          {
            name: 'Thiên Thanh',
            role: 'SUM',
            avatar: '/images/leaders/avatars/thien-thanh.jpg',
            leaderId: 'thien-thanh',
            subNote: 'MBA Pro • 22 năm Kế toán trưởng',
          },
        ],
      },
      {
        name: 'Dương Thanh Hoa',
        role: 'SUM',
        avatar: '/images/leaders/avatars/duong-thanh-hoa.jpg',
        leaderId: 'duong-thanh-hoa',
        subNote: '15 năm Ngân hàng • MDRT',
      },
      {
        name: 'Anh Thơ',
        role: 'SUM',
        avatar: '/images/leaders/avatars/anh-tho.jpg',
        leaderId: 'anh-tho',
        subNote: '10 năm Trainer • MPro Vàng',
      },
      {
        name: 'Vân Nguyễn',
        role: 'SUM',
        avatar: '/images/leaders/avatars/van-nguyen.jpg',
        leaderId: 'van-nguyen',
        subNote: '19 năm Trưởng phòng Nhân sự',
      },
    ],
    moreCountNote:
      'Cùng các nhóm UM Nhuần Vũ, Băng Tâm, Ngọc Trâm, Xuân Mai...',
  },
  {
    code: 'SG169',
    areaLabel: 'Khu Vực SG169',
    headName: 'Trương Thị Huyền Trang',
    headRole: 'SM • Giám đốc Khu vực',
    headAvatar: '/images/leaders/avatars/huyen-trang.jpg',
    headLeaderId: 'huyen-trang',
    keyManagers: [
      {
        name: 'Hoàng Thuý',
        role: 'SDM',
        avatar: '/images/leaders/avatars/hoang-thuy.jpg',
        leaderId: 'hoang-thuy',
        subNote: 'MDRT • MBA Vàng',
        children: [
          {
            name: 'Nguyễn Bé',
            role: 'DM',
            avatar: '/images/leaders/avatars/be-nguyen.jpg',
            leaderId: 'be-nguyen',
            subNote: '2x MBA Pro • 12 năm HCNS',
          },
        ],
      },
      {
        name: 'Bùi Phước Ngoan',
        role: 'SUM',
        avatar: '/images/leaders/avatars/bui-phuoc-ngoan.jpg',
        leaderId: 'bui-phuoc-ngoan',
        subNote: 'Vận hành & Phát triển đội ngũ',
      },
      {
        name: 'Trâm Lê',
        role: 'SUM',
        avatar: '/images/leaders/avatars/tram-le.jpg',
        leaderId: 'tram-le',
        subNote: '15 năm Tập đoàn Nhật Bản',
      },
      {
        name: 'Huyền Nguyễn',
        role: 'SUM',
        avatar: '/images/leaders/avatars/huyen-nguyen.jpg',
        leaderId: 'huyen-nguyen',
        subNote: 'Nền tảng Luật sư',
      },
      {
        name: 'Tiên Tiên',
        role: 'UM',
        avatar: '/images/leaders/avatars/tien-tien.jpg',
        leaderId: 'tien-tien',
        subNote: 'Quản lý Xuất sắc',
      },
    ],
    moreCountNote:
      'Cùng các nhánh UM Dương Lên (MDRT), UM Kim Thi, UM Sen Nguyễn & đội ngũ Cố vấn...',
  },
];

export const REGIONAL_LEADERS: RegionalLeader[] = [
  // ===========================================================================
  // KHỐI 1: BAN GIÁM ĐỐC KHU VỰC & TRƯỞNG PHÒNG KINH DOANH (SM • SDM • DM — 10 HỒ SƠ)
  // ===========================================================================
  {
    id: 'dao-minh-phuong',
    index: '01',
    displayName: 'Đào Minh Phương',
    fullName: 'Đào Minh Phương',
    roleBadge: 'SM',
    roleTitle: 'Giám đốc Kinh doanh Khu vực',
    tierKey: 'SM',
    tierLabel: 'Giám đốc Khu vực',
    isSeniorLeadership: true,
    unitCode: 'SG168',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2020',
    tenureLabel: 'Gia nhập 03/2020 • Hơn 6 năm dẫn dắt tại Manulife',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: 'Nghiệp vụ Kế toán Doanh nghiệp',
    priorBackgroundFull: 'Chuyên môn Kế toán doanh nghiệp • Quản trị & Phát triển hệ thống kinh doanh',
    teamScaleBadge: 'Giám đốc Khu vực SG168',
    highlightNote: 'MDRT & MBA nhiều năm liền • Dẫn dắt Khu vực SG168 từ năm 2020',
    quote: 'Muốn có điều mà mình chưa bao giờ có, hãy dám làm những việc mình chưa bao giờ làm.',
    cardSummary:
      'Bén duyên từ một khách hàng chủ động hẹn gặp chị Khánh Vân để tham gia bảo hiểm cho gia đình, nay trực tiếp điều hành Khu vực SG168.',
    editorialBio: [
      'Cơ duyên đưa Đào Minh Phương đến với sự nghiệp bảo hiểm bắt đầu hết sức đời thường: tình cờ biết đến chị Khánh Vân qua một hội nhóm tìm trường học cho con, chị theo dõi trang cá nhân rồi chủ động hẹn gặp để thiết lập một hợp đồng bảo vệ cho gia đình. Chính sự chỉn chu và chuẩn mực trong buổi tư vấn ấy đã khơi dậy mong muốn tìm hiểu sâu hơn về nghề hoạch định tài chính.',
      'Sau hơn 6 năm bền bỉ từ tháng 03/2020, Giám đốc Khu vực Đào Minh Phương hiện trực tiếp điều hành Khu vực SG168, liên tiếp chinh phục các danh hiệu MDRT, MBA cùng nhiều chuyến tưởng thưởng quốc tế. Với khách hàng, chị luôn tâm niệm: “Trước kia khi là khách hàng mình mong gặp một người tư vấn tận tâm thế nào, thì hôm nay hãy mang đúng điều đó trao cho khách hàng”. Với đội ngũ, chị kiên trì chia nhỏ mục tiêu, sát cánh dìu dắt từng bước để mỗi đồng đội luôn cảm nhận điểm tựa vững chắc phía sau.',
    ],
    badges: ['Giám đốc Khu vực (SM)', 'MDRT Nhiều Năm', 'MBA Pro', 'Điều hành Khu vực SG168'],
    specialties: [
      'Bảo vệ Trụ cột Gia đình',
      'Hoạch định Hưu trí & Học vấn',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/dao-minh-phuong.jpg',
    gallery: [],
  },
  {
    id: 'huyen-trang',
    index: '02',
    displayName: 'Huyền Trang',
    fullName: 'Trương Thị Huyền Trang',
    roleBadge: 'SM',
    roleTitle: 'Giám đốc Kinh doanh Khu vực',
    tierKey: 'SM',
    tierLabel: 'Giám đốc Khu vực',
    isSeniorLeadership: true,
    unitCode: 'SG169',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2020',
    tenureLabel: 'Gia nhập 07/2020 • 7 năm Tài chính Ngân hàng & Bảo hiểm',
    industryKey: 'BANKING',
    priorBackgroundShort: 'Nguyên Kiểm soát viên Ngân hàng',
    priorBackgroundFull: 'Nguyên Kiểm soát viên Ngân hàng • Chuyên gia phát triển đội ngũ Quản lý kế cận',
    teamScaleBadge: 'Giám đốc Khu vực SG169',
    highlightNote: 'Đạt chuẩn quốc tế MDRT ngay tháng làm việc đầu tiên • MDRT & MBA nhiều năm liên tục',
    quote: 'Dẫn dắt bằng tâm, kiến tạo bằng tầm.',
    cardSummary:
      'Từ câu hỏi đánh thức tuổi 30 của người hàng xóm cũ Khánh Vân đến vị trí Giám đốc Khu vực SG169 kiến tạo hệ sinh thái bảo hiểm xanh, sạch, chuẩn mực.',
    editorialBio: [
      'Ở cột mốc tuổi 30, từng là Kiểm soát viên ngân hàng nhưng đứng trước bài toán cân bằng giữa công việc và con nhỏ, Huyền Trang đã có lúc chọn lùi lại phía sau để dành trọn thời gian cho gia đình. Chính câu hỏi chân tình của người hàng xóm cũ là chị Khánh Vân: “Em định kết thúc thanh xuân của mình ở tuổi 30 sao Trang?” đã thôi thúc chị mở lòng tìm hiểu cơ hội tại Manulife, nơi cho phép vừa chủ động thời gian bên con, vừa phát triển sự nghiệp độc lập.',
      'Ngay trong tháng làm việc đầu tiên, Huyền Trang đã bứt phá chinh phục danh hiệu quốc tế MDRT và giữ vững chuỗi thành tích MDRT & MBA liên tục nhiều năm sau đó. Trên cương vị Giám đốc Kinh doanh Khu vực SG169, chị kiên định truyền trao triết lý “Làm đúng trước, làm giỏi sau”, ấp ủ khát vọng phát triển thế hệ giám đốc kế cận để bất kỳ ai hữu duyên gặp gỡ cũng đều hiểu đúng giá trị nhân văn của bảo hiểm nhân thọ.',
    ],
    badges: ['Giám đốc Khu vực (SM)', 'MDRT Ngay Tháng Đầu', 'MBA Pro Liên Tục', 'Quản lý Xuất sắc'],
    specialties: [
      'Xây dựng & Đào tạo Đội ngũ',
      'Hoạch định Hưu trí & Học vấn',
      'Phát triển Giám đốc Kế cận',
    ],
    portrait: '/images/leaders/huyen-trang.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/huyen-trang-1.jpg',
        caption: 'Giám đốc Kinh doanh Khu vực SG169 Trương Thị Huyền Trang trong các sự kiện vinh danh',
      },
      {
        src: '/images/leaders/gallery/huyen-trang-2.jpg',
        caption: 'Đồng hành huấn luyện và dẫn dắt đội ngũ quản lý kế cận tại SG169',
      },
      {
        src: '/images/leaders/gallery/huyen-trang-3.jpg',
        caption: 'Dấu ấn hành trình kiến tạo hệ sinh thái bảo hiểm chuẩn mực cùng Vùng Khánh Vân',
      },
    ],
  },
  {
    id: 'thuy-liem',
    index: '03',
    displayName: 'Thuỳ Liêm',
    fullName: 'Võ Thị Thùy Liêm',
    roleBadge: 'SDM',
    roleTitle: 'Trưởng Phòng Kinh doanh Cấp cao',
    tierKey: 'DM',
    tierLabel: 'Trưởng Phòng Cấp cao',
    isSeniorLeadership: true,
    unitCode: 'SG168',
    directLeader: 'SM Đào Minh Phương',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • 11 năm Kế toán Kiểm toán',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: 'Nguyên Trưởng phòng Tài chính • 11 năm Kế toán Kiểm toán',
    priorBackgroundFull: 'Nguyên Trưởng phòng Tài chính doanh nghiệp • 11 năm kinh nghiệm Kế toán Kiểm toán',
    teamScaleBadge: 'SDM • Khu vực SG168',
    highlightNote: 'MDRT 2023 • MBA 2023 & MBA 2025 • Manulife Pro Bạch Kim',
    quote: 'Đến với khách hàng bằng sự chân thành, cung cấp thông tin đúng, đủ, chuẩn chỉnh.',
    cardSummary:
      'Mang 11 năm bản lĩnh Trưởng phòng Tài chính & Kiểm toán vào công tác hoạch định bảo vệ gia đình và phát triển phòng kinh doanh cấp cao tại SG168.',
    editorialBio: [
      'Từng đảm nhiệm vị trí Trưởng phòng Tài chính với 11 năm kinh nghiệm chuyên sâu trong ngành Kế toán Kiểm toán, Võ Thị Thùy Liêm bén duyên cùng Manulife qua lời kết nối của người đồng nghiệp cũ tại công ty kiểm toán là Giám đốc Khu vực Đào Minh Phương.',
      'Nền tảng kiểm toán khắt khe giúp chị luôn tiếp cận mỗi bản kế hoạch tài chính cá nhân bằng sự minh bạch, chuẩn xác và đầy đủ thông tin. Ghi dấu ấn với loạt danh hiệu MDRT, MBA nhiều năm và Manulife Pro Bạch Kim, Thuỳ Liêm luôn trân trọng văn hóa cho đi, đồng hành sát sao và nguồn năng lượng có tâm, có tầm từ Giám đốc Vùng Khánh Vân.',
    ],
    badges: ['Trưởng Phòng Cấp cao (SDM)', 'MDRT', 'MBA 2023 & 2025', 'Manulife Pro Bạch Kim'],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/thuy-liem.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/thuy-liem-1.jpg',
        caption: 'Trưởng Phòng Kinh doanh Cấp cao (SDM) Võ Thị Thùy Liêm tại Khu vực SG168',
      },
    ],
  },
  {
    id: 'le-huyen',
    index: '04',
    displayName: 'Lê Huyên',
    fullName: 'Lê Thị Huyên',
    roleBadge: 'SDM',
    roleTitle: 'Trưởng Phòng Kinh doanh Cấp cao',
    tierKey: 'DM',
    tierLabel: 'Trưởng Phòng Kinh doanh',
    isSeniorLeadership: true,
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2018',
    tenureLabel: 'Gia nhập 2018 • 8 năm tại Manulife & 5 năm Kế toán',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: 'Cử nhân Kế toán Kiểm toán (ĐH Kinh tế Luật)',
    priorBackgroundFull:
      'Cử nhân Kế toán Kiểm toán (ĐH Kinh tế Luật) • 5 năm Kế toán tổng hợp doanh nghiệp',
    teamScaleBadge: 'Thế hệ Nền móng 2018',
    highlightNote: 'Chinh phục trọn bộ 3 danh hiệu cao quý: MDRT • FC • MBA Pro',
    quote: 'Xây dựng cuộc sống vững vàng bằng tài chính thông minh.',
    cardSummary:
      'Từ 5 năm làm việc với bảng cân đối doanh nghiệp đến 8 năm hoạch định an toàn dòng tiền cá nhân từ những ngày đầu thành lập HCM69.',
    editorialBio: [
      'Tốt nghiệp chuyên ngành Kế toán Kiểm toán tại Trường Đại học Kinh tế Luật và có 5 năm đảm nhiệm vị trí kế toán tổng hợp trước khi bén duyên cùng Manulife từ năm 2018, cả hai chặng đường sự nghiệp của Lê Huyên đều gắn liền với tính kỷ luật của những con số. Chỉ khác rằng, nếu trước kia chị làm việc với báo cáo tài chính của doanh nghiệp và tập đoàn, thì suốt 8 năm qua chị chọn đồng hành cùng bức tranh dòng tiền của mỗi cá nhân và mỗi gia đình.',
      'Là một trong những quản lý gắn bó bền bỉ cùng Khu vực HCM69, Hệ thống Vùng Khánh Vân ngay từ giai đoạn nền móng, Lê Huyên tin rằng sự tỉ mỉ, tử tế và chân thành chính là chiếc chìa khóa duy nhất để đi bền lâu cùng khách hàng qua năm tháng.',
    ],
    badges: ['MDRT', 'FC', 'MBA Pro', 'Gắn bó từ 2018'],
    specialties: ['Hoạch định Hưu trí & Học vấn', 'Chăm sóc Sức khỏe Cao cấp'],
    portrait: '/images/leaders/le-huyen.jpg',
    gallery: [],
  },
  {
    id: 'diem-ly',
    index: '05',
    displayName: 'Diễm Ly',
    fullName: 'Hồ Thị Diễm Ly',
    roleBadge: 'SDM',
    roleTitle: 'Trưởng Phòng Kinh doanh Cấp cao',
    tierKey: 'DM',
    tierLabel: 'Trưởng Phòng Kinh doanh',
    isSeniorLeadership: true,
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2019',
    tenureLabel: 'Gia nhập 2019 • 7 năm gắn bó và phát triển đội ngũ tại HCM69',
    industryKey: 'HR_EDU',
    priorBackgroundShort: 'Chuyên môn Quản trị Nhân sự (HR)',
    priorBackgroundFull: 'Chuyên gia Quản trị Nhân sự (Human Resources) • Kiến tạo nhiều nhánh Quản lý tại HCM69',
    teamScaleBadge: 'Nhánh Quản lý Nòng cốt HCM69',
    highlightNote: 'MDRT • MBA Pro • Quản lý Xuất sắc phát triển các nhánh DM & UM vững mạnh',
    quote: 'Đồng hành cùng khách hàng như chính người thân trong gia đình.',
    cardSummary:
      'Bắt đầu từ mong muốn chủ động thời gian chăm sóc tổ ấm năm 2019, trở thành một trong những Trưởng phòng trụ cột phát triển nhiều thế hệ quản lý tại HCM69.',
    editorialBio: [
      'Xuất thân từ lĩnh vực Quản trị Nhân sự (HR), Hồ Thị Diễm Ly tìm đến Manulife vào năm 2019 với mong muốn giản dị của người phụ nữ hiện đại: tìm một sự nghiệp vừa phát huy năng lực làm việc với con người, vừa chủ động thời gian chăm sóc gia đình.',
      'Suốt 7 năm đồng hành trực tiếp cùng Giám đốc Vùng Khánh Vân tại Khu vực hạt nhân HCM69, bằng sự thấu cảm sâu sắc và nguyên tắc xem khách hàng như người thân, Diễm Ly không chỉ chinh phục các danh hiệu quốc tế MDRT, MBA Pro mà còn trực tiếp ươm mầm nhiều Trưởng phòng và Trưởng nhóm kinh doanh kế cận trong hệ thống.',
    ],
    badges: ['MDRT', 'MBA Pro', 'Quản lý Xuất sắc', 'Gắn bó từ 2019'],
    specialties: [
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Hoạch định Hưu trí & Học vấn',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/diem-ly.jpg',
    gallery: [],
  },
  {
    id: 'tran-dao',
    index: '06',
    displayName: 'Đào Trần',
    fullName: 'Trần Thị Đào',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2019',
    tenureLabel: 'Gia nhập 2019 • Thạc sĩ & 15 năm Giảng dạy THPT',
    industryKey: 'HR_EDU',
    priorBackgroundShort: 'Thạc sĩ • 15 năm Giáo viên Hóa trường Đinh Thiện Lý (Q.7)',
    priorBackgroundFull:
      'Thạc sĩ • 15 năm Giáo viên THPT môn Hóa học tại Trường THCS & THPT Đinh Thiện Lý (Quận 7)',
    teamScaleBadge: '3x MDRT • 3x MBA Pro',
    highlightNote: '3 lần đạt MDRT • 3 lần đạt MBA Pro • Thạc sĩ với 15 năm đứng lớp',
    quote: 'Rõ ràng tạo nên sức mạnh: khi khách hàng thực sự hiểu rõ mình cần gì, họ sẽ tự tin ra quyết định.',
    cardSummary:
      'Khép lại 15 năm đứng bục giảng tại Trường Đinh Thiện Lý ở tuổi 35 bằng một tin nhắn chủ động gửi chị Khánh Vân, giúp hàng chục gia đình nhận chi trả đến 500 triệu đồng.',
    editorialBio: [
      'Suốt 15 năm gắn bó với bục giảng, học sinh và phụ huynh trong vai trò Thạc sĩ, Giáo viên Hóa học tại Trường Đinh Thiện Lý (Quận 7), bước ngoặt đến với Đào Trần ở tuổi 35 khi chị đọc được một bài viết về những trải nghiệm không giới hạn của nghề tư vấn. Khát khao thử thách bản thân qua từng cột mốc mới đã thôi thúc chị chủ động nhắn tin cho chị Khánh Vân để bắt đầu hành trình tại HCM69 từ năm 2019.',
      'Mang phong thái sư phạm mạch lạc vào nghề tư vấn, Đào Trần tâm niệm “Rõ ràng tạo nên sức mạnh”: chị kiên nhẫn lắng nghe để khách hàng tự nhìn rõ nhu cầu thật sự của gia đình mình. Niềm hạnh phúc lớn nhất của chị là khi biến cố xảy đến với bạn bè hay người thân, thay vì chỉ có thể thăm hỏi vài triệu đồng, những hợp đồng chị tư vấn đã kịp thời chi trả từ 10 triệu, 50 triệu đến 500 triệu đồng viện phí. Hiện chị đồng hành cùng đội ngũ của mình với mục tiêu phát triển bền vững và chất lượng.',
    ],
    badges: ['3x MDRT', '3x MBA Pro', 'Thạc sĩ Giáo dục'],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/tran-dao.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/tran-dao-1.jpg',
        caption: 'Trưởng Nhóm Kinh doanh Cấp cao Trần Thị Đào cùng dấu ấn phát triển đội ngũ tại HCM69',
      },
    ],
  },
  {
    id: 'kieu-nguyen',
    index: '07',
    displayName: 'Kiều Nguyễn',
    fullName: 'Nguyễn Thị Minh Kiều',
    roleBadge: 'DM',
    roleTitle: 'Trưởng Phòng Kinh doanh',
    tierKey: 'DM',
    tierLabel: 'Trưởng Phòng Kinh doanh',
    isSeniorLeadership: true,
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2020',
    tenureLabel: 'Gia nhập 09/2020 • Hơn 6 năm gắn bó tại Manulife',
    industryKey: 'BANKING',
    priorBackgroundShort: 'Nguyên Quản lý Ngân hàng ANZ & Shinhan Bank',
    priorBackgroundFull:
      'Nguyên Quản lý tại hai định chế Ngân hàng Quốc tế ANZ Bank & Shinhan Bank',
    teamScaleBadge: 'Đại sứ MDRT 2026',
    highlightNote:
      'MDRT 2022–2023 • FC Platinum 2022–2023 • MBA Pro 2022–2023 • Đại sứ MDRT 2026',
    quote:
      'Làm nghề bằng sự tử tế, tư vấn bằng sự chân thành, đồng hành bằng trách nhiệm. Bởi phía sau mỗi hợp đồng là niềm tin và tương lai của cả một gia đình.',
    cardSummary:
      'Rời vị trí quản lý ngân hàng quốc tế ANZ & Shinhan để đi sâu hơn vào bài toán bảo vệ tài chính của từng tổ ấm bằng sự chân thành và kỷ luật chuyên môn.',
    editorialBio: [
      '“Đang làm quản lý ngân hàng ổn định, sao Kiều lại chuyển sang làm bảo hiểm?”, đó là câu hỏi Kiều Nguyễn nhận được nhiều nhất suốt hơn 6 năm qua. Thực chất, dù ở môi trường ngân hàng quốc tế ANZ, Shinhan hay tại Manulife, điều chị trân trọng nhất vẫn là được lắng nghe và cùng khách hàng tháo gỡ những bài toán thiết thực của cuộc sống.',
      'Hoạch định bảo hiểm nhân thọ mở ra cho chị cơ hội thấu hiểu sâu hơn từng gia đình: những trăn trở thầm lặng của người trụ cột, những dự định dài hạn cho con cái và những giá trị họ cần gìn giữ trước biến cố. Được đồng hành cùng chị Khánh Vân trong tập thể đề cao sự tử tế, minh bạch và tinh thần học hỏi không ngừng, Kiều Nguyễn kiên định đặt quyền lợi khách hàng lên trước mọi con số doanh thu.',
    ],
    badges: [
      'MDRT 2022–2023',
      'FC Platinum',
      'MBA Pro',
      'Manulife Pro Vàng',
      'Đại sứ MDRT 2026',
    ],
    specialties: [
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Hoạch định Hưu trí & Học vấn',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
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
    id: 'bich-tien',
    index: '08',
    displayName: 'Bích Tiền',
    fullName: 'Lê Thị Bích Tiền',
    roleBadge: 'DM',
    roleTitle: 'Trưởng Phòng Kinh doanh',
    tierKey: 'DM',
    tierLabel: 'Trưởng Phòng Kinh doanh',
    isSeniorLeadership: true,
    unitCode: 'HCM69',
    directLeader: 'SDM Trân Phan • SRD Khánh Vân',
    joinedYear: '2020',
    tenureLabel: 'Gia nhập 10/2020 • Thạc sĩ & 11 năm Quản lý Chuỗi cung ứng',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: 'Thạc sĩ • Cử nhân Tài chính DN (UEH) • 4 năm Giảng viên Logistics',
    priorBackgroundFull:
      'Cử nhân Tài chính Doanh nghiệp (ĐH Kinh tế TP.HCM, UEH), Thạc sĩ • 11 năm Quản lý Chuỗi cung ứng (Procurement) & 4 năm Giảng viên đào tạo Mua hàng & Logistics',
    teamScaleBadge: 'MBA Pro Bạch Kim',
    highlightNote:
      'MBA Pro Bạch Kim • 2 năm liền đạt bộ 3 MBA, MDRT, FC • Giải Lãnh đạo Thực chiến GAMA Global',
    quote:
      'Làm đúng, chuẩn mực và không ngừng nâng cao trình độ chuyên môn để mang lại sự tin cậy tuyệt đối cho khách hàng và cộng sự.',
    cardSummary:
      'Nền tảng Thạc sĩ & Cử nhân Tài chính Doanh nghiệp UEH cùng 11 năm quản trị chuỗi cung ứng, xây dựng đội ngũ chất lượng cao tại HCM69.',
    editorialBio: [
      'Tốt nghiệp Cử nhân Tài chính Doanh nghiệp (UEH), sở hữu bằng Thạc sĩ cùng bề dày 11 năm quản lý vận hành và mua hàng (Procurement) và 4 năm giảng dạy nghiệp vụ Logistics, Bích Tiền bước vào Manulife tháng 10/2020 từ sự tín nhiệm dành cho người quản lý trực tiếp và môi trường hội tụ những đồng nghiệp ưu tú đa lĩnh vực.',
      'Điều giữ chân chị gắn bó trọn vẹn với Hệ thống Vùng Khánh Vân chính là văn hóa sẵn sàng sẻ chia, trao đi kinh nghiệm một cách chân thành và vô tư. Với nguyên tắc đề cao uy tín đường dài, Bích Tiền đã chinh phục danh hiệu MBA Pro Bạch Kim, 2 năm liên tiếp đạt bộ ba danh hiệu kép MBA, MDRT, FC, Giải thưởng Lãnh đạo Thực chiến GAMA Global và xây dựng một đội ngũ chất lượng với nhiều MBA Pro, Manulife Pro Vàng & Bạc.',
    ],
    badges: [
      'MBA Pro Bạch Kim',
      '2x Bộ Ba MDRT • MBA • FC',
      'GAMA Global Leader',
    ],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/bich-tien.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/bich-tien-1.jpg',
        caption: 'Vinh danh Trưởng Phòng Kinh doanh Bích Tiền cùng các danh hiệu cấp cao tại Manulife',
      },
      {
        src: '/images/leaders/gallery/bich-tien-2.jpg',
        caption: 'Đồng hành huấn luyện và phát triển đội ngũ kế cận',
      },
      {
        src: '/images/leaders/gallery/bich-tien-3.jpg',
        caption: 'Dấu ấn Lãnh đạo Thực chiến GAMA Global và MBA Pro Bạch Kim',
      },
    ],
  },
  {
    id: 'be-nguyen',
    index: '09',
    displayName: 'Nguyễn Bé',
    fullName: 'Nguyễn Thị Bé',
    roleBadge: 'DM',
    roleTitle: 'Trưởng Phòng Kinh doanh',
    tierKey: 'DM',
    tierLabel: 'Trưởng Phòng Kinh doanh',
    isSeniorLeadership: true,
    unitCode: 'SG169',
    directLeader: 'SDM Hoàng Thuý • SM Huyền Trang',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • Hơn 12 năm Hành chính Nhân sự & 5 năm BHNT',
    industryKey: 'HR_EDU',
    priorBackgroundShort: 'Hơn 12 năm Trưởng phòng Hành chính Nhân sự',
    priorBackgroundFull: 'Hơn 12 năm kinh nghiệm Trưởng phòng Hành chính Nhân sự doanh nghiệp',
    teamScaleBadge: '2x MBA Pro Liên tiếp',
    highlightNote: '2 năm liên tiếp đạt danh hiệu MBA Pro, Nhà kiến tạo đội ngũ ưu tú tại Khu vực SG169',
    quote: 'Tận tâm, chuyên nghiệp, tư vấn đúng và đủ ngay từ đầu.',
    cardSummary:
      'Bắt đầu chỉ từ mong muốn tìm hiểu bảo hiểm cho gia đình sau hơn 12 năm làm Trưởng phòng Nhân sự, nay 2 năm liên tiếp là Nhà kiến tạo đội ngũ MBA Pro.',
    editorialBio: [
      'Sau hơn 12 năm đảm nhiệm cương vị Trưởng phòng Hành chính Nhân sự, hành trình đến với Manulife của Nguyễn Thị Bé khởi đầu rất tự nhiên từ mong muốn tìm hiểu thấu đáo một giải pháp bảo vệ cho chính gia đình mình. Khi trực tiếp tiếp xúc với môi trường đào tạo và văn hóa sẻ chia không tính toán tại Vùng Khánh Vân, chị nhận ra đây chính là sự nghiệp dài hạn mình đang tìm kiếm.',
      'Ngay từ những ngày đầu tiên, bài học cốt lõi “Phải làm đúng trước, làm giỏi sau” đã trở thành kim chỉ nam xuyên suốt của chị: chỉ khi tư vấn đúng bản chất sản phẩm thì người làm nghề mới tồn tại bền vững. Đó cũng là nguyên tắc Nguyễn Bé bền bỉ truyền đạt lại cho các thế hệ tư vấn viên mới trên hành trình 2 năm liên tiếp chinh phục danh hiệu MBA Pro.',
    ],
    badges: ['2x MBA Pro Liên Tiếp', 'Trưởng Phòng Kinh doanh (DM)', '12+ Năm Quản trị Nhân sự'],
    specialties: [
      'Xây dựng & Đào tạo Đội ngũ',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Hoạch định Hưu trí & Học vấn',
    ],
    portrait: '/images/leaders/be-nguyen.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/be-nguyen-1.jpg',
        caption: 'Trưởng Phòng Kinh doanh Nguyễn Thị Bé tại sự kiện vinh danh Khu vực SG169',
      },
      {
        src: '/images/leaders/gallery/be-nguyen-2.jpg',
        caption: 'Gắn kết và đồng hành phát triển đội ngũ tư vấn chuẩn mực',
      },
      {
        src: '/images/leaders/gallery/be-nguyen-3.jpg',
        caption: 'Dấu ấn Nhà kiến tạo đội ngũ ưu tú MBA Pro tại Manulife Việt Nam',
      },
    ],
  },
  {
    id: 'tra-my',
    index: '10',
    displayName: 'Trà My',
    fullName: 'Nguyễn Thị Trà My',
    roleBadge: 'DM',
    roleTitle: 'Trưởng Phòng Kinh doanh',
    tierKey: 'DM',
    tierLabel: 'Trưởng Phòng Kinh doanh',
    isSeniorLeadership: true,
    unitCode: 'HCM69',
    directLeader: 'SDM Minh Phượng • SRD Khánh Vân',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • 3 năm Trợ lý Giám đốc & Phát triển Đội ngũ',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: '3 năm Thư ký kiêm Trợ lý Giám đốc Kinh doanh & Vận hành',
    priorBackgroundFull:
      '3 năm kinh nghiệm Thư ký kiêm Trợ lý Giám đốc Kinh doanh, trực tiếp hỗ trợ vận hành, tổ chức đào tạo và phát triển đội ngũ',
    teamScaleBadge: 'Từ Trợ lý Giám đốc Vùng',
    highlightNote:
      'Trưởng thành từ Trợ lý Giám đốc Vùng lên Trưởng Phòng Kinh doanh tại Khu vực Hạt nhân HCM69',
    quote:
      'Không cần xuất phát điểm hoàn hảo, chỉ cần đủ kiên trì để mỗi ngày trở thành phiên bản tốt hơn của chính mình.',
    cardSummary:
      'Gắn bó từ thời sinh viên năm 3 trong vai trò Trợ lý Giám đốc Vùng, bước ra khỏi vùng an toàn để trực tiếp xây dựng phòng kinh doanh của riêng mình.',
    editorialBio: [
      'Cơ duyên đưa Nguyễn Thị Trà My đến với Manulife bắt đầu từ năm 2022 khi còn là sinh viên năm 3 đại học, đảm nhiệm vị trí Thư ký kiêm Trợ lý Giám đốc Kinh doanh cho chị Khánh Vân. Suốt 3 năm làm việc ở hậu trường điều hành, cô có cơ hội quý giá được quan sát trực tiếp cách vận hành một tổ chức kinh doanh chuẩn mực, cách người lãnh đạo rèn giũa kỷ luật và truyền lửa cho đội ngũ.',
      'Quyết định bước ra khỏi vùng an toàn để trực tiếp dấn thân làm nghề tư vấn và quản lý, gần 2 năm qua Trà My từng bước vượt qua những bỡ ngỡ ban đầu để xây dựng đội ngũ riêng và thăng tiến lên cương vị Trưởng Phòng Kinh doanh tại HCM69, kiên định với niềm tin rằng bảo hiểm không đơn thuần là một hợp đồng, mà là hành trình xây dựng niềm tin và giá trị dài lâu.',
    ],
    badges: [
      'Trưởng Phòng Kinh doanh (DM)',
      'Quản trị & Vận hành Hệ thống',
    ],
    specialties: [
      'Xây dựng & Đào tạo Đội ngũ',
      'Bảo vệ Trụ cột Gia đình',
      'Hoạch định Hưu trí & Học vấn',
      'Chăm sóc Sức khỏe Cao cấp',
    ],
    portrait: '/images/leaders/tra-my.jpg',
    gallery: [],
  },

  // ===========================================================================
  // KHỐI 2: ĐỘI NGŨ TRƯỞNG NHÓM CẤP CAO, TRƯỞNG NHÓM & CỐ VẤN (SUM • UM • ADVISOR — 36 HỒ SƠ)
  // ===========================================================================
  {
    id: 'loan-tran',
    index: '11',
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
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: 'Nguyên Phó GĐ Hyundai • Chiến lược Định giá Cargill',
    priorBackgroundFull:
      'Nguyên Phó Giám đốc Hyundai • Chuyên gia Chiến lược Định giá tại Tập đoàn Cargill',
    teamScaleBadge: '3x MDRT • MBA Pro',
    highlightNote:
      '3 năm liên tiếp chuẩn quốc tế MDRT (2024–2026) • Nhà kiến tạo đội ngũ ưu tú MBA',
    quote: 'Đặt lợi ích khách hàng làm trung tâm.',
    cardSummary:
      'Mang tư duy quản trị 12 năm từ Hyundai & Cargill vào sứ mệnh xây dựng đội ngũ tư vấn chuẩn chỉnh, đóng góp cho diện mạo bảo hiểm xanh tại Việt Nam.',
    editorialBio: [
      'Sở hữu bề dày 12 năm trong lĩnh vực tài chính và điều hành doanh nghiệp (từng giữ cương vị Phó Giám đốc tại Hyundai và phụ trách chiến lược định giá tại Tập đoàn đa quốc gia Cargill), Loan Trần đến với Manulife từ chính sự thuyết phục khi trải nghiệm dịch vụ với tư cách một khách hàng.',
      'Tại Hệ thống Vùng Khánh Vân, chị tìm thấy điểm hội tụ của những nhà tư vấn có trình độ thực chất, tư duy minh bạch và tinh thần sẻ chia bền chặt. Với cột mốc 3 năm liên tiếp đạt danh hiệu MDRT (2024–2026) và xây dựng một đội ngũ ưu tú, Loan Trần kiên định theo đuổi những giải pháp tài chính chuẩn mực, góp phần xây dựng ngành bảo hiểm văn minh và bền vững tại Việt Nam.',
    ],
    badges: ['MDRT 2024–2026', 'MBA Pro', 'Cựu Phó Giám đốc Hyundai'],
    specialties: [
      'Bảo vệ Trụ cột Gia đình',
      'Hoạch định Hưu trí & Học vấn',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
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
    id: 'hoang-thuy',
    index: '12',
    displayName: 'Hoàng Thuý',
    fullName: 'Hoàng Thị Kim Thuý',
    roleBadge: 'SDM',
    roleTitle: 'Trưởng Phòng Kinh doanh Cấp cao',
    tierKey: 'DM',
    tierLabel: 'Trưởng Phòng Kinh doanh',
    isSeniorLeadership: true,
    unitCode: 'SG169',
    directLeader: 'SM Huyền Trang',
    joinedYear: '2020',
    tenureLabel: 'Gia nhập 2020 • 10 năm Kinh nghiệm Ngân hàng',
    industryKey: 'BANKING',
    priorBackgroundShort: '10 năm Kiểm soát viên Ngân hàng',
    priorBackgroundFull: '10 năm kinh nghiệm Kiểm soát viên tại hệ thống Ngân hàng thương mại',
    teamScaleBadge: 'MDRT • MBA Vàng',
    highlightNote:
      'MDRT & MBA Vàng • Ươm mầm nhiều thế hệ quản lý kế cận tại SG169',
    quote: 'Những gì đến từ trái tim sẽ chạm đến trái tim.',
    cardSummary:
      'Rời vị trí Kiểm soát viên ngân hàng 10 năm để có thêm thời gian bên con, hiện dẫn dắt đội ngũ và ươm mầm các quản lý kế cận tại SG169.',
    editorialBio: [
      'Sau 10 năm gắn bó với nghiệp vụ Kiểm soát viên ngân hàng, Hoàng Thị Kim Thuý chủ động tìm đến Manulife vào năm 2020 từ mong muốn cân bằng cuộc sống và có nhiều thời gian chất lượng hơn bên con cái.',
      'Chính định hướng làm nghề đúng đắn xuyên suốt từ Ban Lãnh đạo Vùng đến từng thành viên và tinh thần tương trợ hết lòng đã giúp chị bứt phá mạnh mẽ. Hiện Hoàng Thuý trực tiếp dẫn dắt đội ngũ của mình, nơi đã ươm mầm nhiều trưởng phòng, quản lý, MBA Vàng, Manulife Pro Bạch Kim cùng các Manulife Pro Vàng/Bạc, với nguyên tắc nhất quán: xem khách hàng và đồng đội như người thân, làm vì lợi ích của họ trước khi nghĩ đến mình.',
    ],
    badges: ['MDRT', 'MBA Vàng', 'Ươm mầm Quản lý Kế cận'],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/hoang-thuy.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/hoang-thuy-1.jpg',
        caption: 'Vinh danh Nhà kiến tạo đội ngũ ưu tú MBA Pro Hoàng Thị Kim Thuý',
      },
    ],
  },
  {
    id: 'ngoc-day',
    index: '13',
    displayName: 'Ngọc Đầy',
    fullName: 'Nguyễn Thị Ngọc Đầy',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2020',
    tenureLabel: 'Gia nhập 2020 • 7 năm tại Manulife & Nền tảng Kế toán trưởng',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: 'Nguyên Kế toán trưởng Doanh nghiệp',
    priorBackgroundFull: 'Nguyên Kế toán trưởng doanh nghiệp • 7 năm hoạch định tài chính tại Manulife',
    teamScaleBadge: '4x MDRT • MBA Pro',
    highlightNote: '4 lần chinh phục chuẩn quốc tế MDRT (2021, 2022, 2023, 2027) • Quản lý MBA 2023',
    quote: 'Mình cứ làm đúng trước đã, kết quả xứng đáng sẽ tự khắc đến sau.',
    cardSummary:
      'Từ cương vị Kế toán trưởng đến 4 lần chinh phục bàn tròn triệu đô MDRT trong môi trường toàn những đồng đội giỏi giang và kỷ luật tại HCM69.',
    editorialBio: [
      'Chuyển mình từ vị trí Kế toán trưởng doanh nghiệp sang lĩnh vực hoạch định tài chính cá nhân từ năm 2020, điều giữ chân Nguyễn Thị Ngọc Đầy gắn bó suốt 7 năm qua trước hết nằm ở giá trị bảo vệ thực tế mà bảo hiểm mang lại cho mỗi gia đình khách hàng.',
      'Chia sẻ về động lực phát triển tại Khu vực HCM69, Vùng Khánh Vân, Ngọc Đầy tâm đắc: khi làm việc giữa một tập thể toàn những người giỏi nhưng luôn sẵn lòng nâng đỡ nhau, bản thân mỗi người cũng không cho phép mình ngừng cố gắng. Tinh thần nâng cấp bản thân mỗi ngày và nguyên tắc “cứ làm đúng trước đã” đã đưa chị chinh phục 4 danh hiệu MDRT cùng cột mốc Quản lý MBA Pro.',
    ],
    badges: ['4x MDRT', 'MBA Pro', 'Quản lý Xuất sắc'],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/ngoc-day.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/ngoc-day-1.jpg',
        caption: 'Trưởng Nhóm Kinh doanh Cấp cao Nguyễn Thị Ngọc Đầy tại Khu vực HCM69',
      },
      {
        src: '/images/leaders/gallery/ngoc-day-2.jpg',
        caption: 'Khoảnh khắc vinh danh danh hiệu quốc tế MDRT cùng tập thể Vùng Khánh Vân',
      },
      {
        src: '/images/leaders/gallery/ngoc-day-3.jpg',
        caption: 'Đồng hành cùng đội ngũ quản lý chuyên nghiệp tại Manulife Việt Nam',
      },
    ],
  },
  {
    id: 'huyen-luong',
    index: '14',
    displayName: 'Huyền Lương',
    fullName: 'Lương Thị Thanh Huyền',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'HCM69',
    directLeader: 'SDM Minh Phượng',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • Nền tảng Luật sư hành nghề',
    industryKey: 'LAW_MED_INS',
    priorBackgroundShort: 'Luật sư • Chuyên môn Pháp lý sâu sắc',
    priorBackgroundFull: 'Luật sư • Chuyên gia rà soát điều khoản pháp lý và hoạch định bảo vệ gia đình',
    teamScaleBadge: 'Nền tảng Luật sư',
    highlightNote: 'Nền tảng Luật sư chuyên nghiệp • Dẫn dắt đội ngũ tại Khu vực HCM69',
    quote: 'Mỗi ngày tốt hơn 1%: Thấu hiểu, Tin tưởng và Trách nhiệm.',
    cardSummary:
      'Từ mối nhân duyên xử lý hồ sơ pháp lý khi chị Khánh Vân là khách hàng của công ty luật, sau 2 năm quan sát đã quyết định về đồng hành xây dựng đội ngũ tại HCM69.',
    editorialBio: [
      'Cơ duyên giữa Luật sư Lương Thị Thanh Huyền và Hệ thống Vùng Khánh Vân bắt đầu từ chiều ngược lại: trước đây, chị Khánh Vân chính là khách hàng tại công ty của Huyền. Qua những buổi làm việc xử lý hồ sơ trực tiếp, phong thái chuẩn mực và lời mời chân thành của chị Vân đã gieo hạt mầm thiện cảm, để sau đúng 2 năm quan sát kỹ lưỡng, Huyền quyết định gia nhập đội ngũ vào năm 2022.',
      'Dưới góc nhìn khắt khe của một Luật sư, điều khiến Huyền Lương nể trọng nhất ở HCM69 và Vùng Khánh Vân là sự nhất quán hiếm có từ lời nói trên truyền thông đến hành động thực tế: từ cách phối hợp nội bộ giữa các phòng ban đến sự minh bạch, chuẩn chỉnh khi tư vấn và phụng sự khách hàng. Hiện chị dẫn dắt đội ngũ của mình với ba giá trị cốt lõi: Thấu hiểu, Tin tưởng, Trách nhiệm.',
    ],
    badges: ['Nền tảng Luật sư', 'Trưởng Nhóm Cấp cao (SUM)'],
    specialties: [
      'Xây dựng & Đào tạo Đội ngũ',
      'Chăm sóc Sức khỏe Cao cấp',
      'Bảo vệ Trụ cột Gia đình',
      'Hoạch định Hưu trí & Học vấn',
    ],
    portrait: '/images/leaders/huyen-luong.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/huyen-luong-1.jpg',
        caption: 'Trưởng Nhóm Kinh doanh Cấp cao Lương Thị Thanh Huyền cùng đội ngũ HCM69',
      },
      {
        src: '/images/leaders/gallery/huyen-luong-2.jpg',
        caption: 'Phong thái chuyên nghiệp của người quản lý xuất thân từ ngành Luật',
      },
      {
        src: '/images/leaders/gallery/huyen-luong-3.jpg',
        caption: 'Khoảnh khắc gắn kết văn hóa tập thể tại Hệ thống Vùng Khánh Vân',
      },
    ],
  },
  {
    id: 'thien-thanh',
    index: '15',
    displayName: 'Thiên Thanh',
    fullName: 'Nguyễn Thị Thiên Thanh',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'SG168',
    directLeader: 'SDM Thuỳ Liêm • SM Đào Minh Phương',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • 22 năm Tài chính Kế toán',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: '22 năm Kế toán trưởng DN trong & ngoài nước',
    priorBackgroundFull: '22 năm kinh nghiệm Tài chính Kế toán trưởng tại các doanh nghiệp trong và ngoài nước',
    teamScaleBadge: '22 năm Kế toán trưởng',
    highlightNote: 'MBA Pro • Quản lý Xuất sắc • Bề dày 22 năm Kế toán trưởng doanh nghiệp FDI & nội địa',
    quote: 'Tư vấn đúng nhu cầu, bảo vệ đủ giá trị, trọn đồng hành.',
    cardSummary:
      'Hơn hai thập kỷ giữ vị trí Kế toán trưởng tại các công ty trong và ngoài nước, tự hào gắn bó trong môi trường “Đúng, Đủ, Đều” giàu tình người của Vùng Khánh Vân.',
    editorialBio: [
      'Sở hữu bề dày 22 năm làm việc trong lĩnh vực Tài chính Kế toán và đảm nhiệm cương vị Kế toán trưởng tại nhiều doanh nghiệp trong và ngoài nước, Nguyễn Thị Thiên Thanh tìm thấy sự đồng điệu sâu sắc khi gia nhập Khu vực SG168, Hệ thống Vùng Khánh Vân từ năm 2022.',
      'Chị đặc biệt tự hào về văn hóa làm nghề “Đúng, Đủ, Đều, Chuyên nghiệp” cùng sự quan tâm chân thành của Giám đốc Vùng Khánh Vân, người luôn nhớ rõ thông tin, hoàn cảnh của từng thành viên trong vùng để kịp thời nâng đỡ khi cần. Chính nền tảng ấy giúp chị vững tin xây dựng đội ngũ và trao giải pháp bảo vệ chuẩn xác nhất đến từng gia đình.',
    ],
    badges: ['MBA Pro', 'Quản lý Xuất sắc', '22 Năm Kế Toán Trưởng'],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/thien-thanh.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/thien-thanh-1.jpg',
        caption: 'Trưởng Nhóm Kinh doanh Cấp cao Nguyễn Thị Thiên Thanh tại văn phòng Manulife',
      },
      {
        src: '/images/leaders/gallery/thien-thanh-2.jpg',
        caption: 'Vinh danh thành tích quản lý và phát triển đội ngũ tại Khu vực SG168',
      },
      {
        src: '/images/leaders/gallery/thien-thanh-3.jpg',
        caption: 'Đồng hành cùng Ban Điều Hành Hệ thống Vùng Khánh Vân',
      },
    ],
  },
  {
    id: 'duong-thanh-hoa',
    index: '16',
    displayName: 'Dương Thanh Hoa',
    fullName: 'Dương Thị Thanh Hoa',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'SG168',
    directLeader: 'SRD Khánh Vân • SM Đào Minh Phương',
    joinedYear: '2026',
    tenureLabel: '15 năm Kinh nghiệm Tài chính Ngân hàng',
    industryKey: 'BANKING',
    priorBackgroundShort: '15 năm Ngân hàng • Nguyên Trưởng nhóm Kiểm soát sau',
    priorBackgroundFull: '15 năm kinh nghiệm ngành Tài chính Ngân hàng • Nguyên Trưởng nhóm Kiểm soát sau',
    teamScaleBadge: 'MDRT • MBA Pro',
    highlightNote: 'MDRT • MBA Pro • 15 năm kinh nghiệm Kiểm soát nghiệp vụ Ngân hàng',
    quote: 'Làm nghề bằng cái tâm, giữ nghề bằng chữ tín và đi đường dài bằng sự tử tế.',
    cardSummary:
      'Khép lại hơn 15 năm làm Trưởng nhóm Kiểm soát sau trong ngành ngân hàng để chọn con đường hoạch định bảo vệ gia đình bằng chữ tín dài lâu.',
    editorialBio: [
      'Sau hơn 15 năm gắn bó với ngành ngân hàng ở vị trí Trưởng nhóm Kiểm soát sau, Dương Thị Thanh Hoa từng nghĩ mình sẽ đi trọn sự nghiệp trong môi trường ngân hàng quen thuộc. Thế nhưng những cuộc trò chuyện sâu sắc và sự thấu hiểu về vai trò của bảo hiểm trước biến cố gia đình đã giúp chị vượt qua những do dự ban đầu để bước sang hành trình mới cùng Vùng Khánh Vân.',
      'Giữ trọn tác phong cẩn trọng của người làm công tác kiểm soát ngân hàng, chị đặt ra bốn nguyên tắc bất biến: tư vấn đúng nhu cầu và vừa vặn khả năng tài chính, tuyệt đối không hứa hẹn vượt quá điều khoản, không bao giờ vì doanh số mà đánh đổi lợi ích khách hàng, và luôn đồng hành bền bỉ cả trước lẫn sau khi hợp đồng phát hành.',
    ],
    badges: ['MDRT', 'MBA Pro', '15 Năm Ngân Hàng'],
    specialties: ['Bảo vệ Trụ cột Gia đình', 'Hoạch định Hưu trí & Học vấn'],
    portrait: '/images/leaders/duong-thanh-hoa.jpg',
    gallery: [],
  },
  {
    id: 'anh-tho',
    index: '17',
    displayName: 'Anh Thơ',
    fullName: 'Nguyễn Tố Anh Thơ',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'SG168',
    directLeader: 'SM Đào Minh Phương',
    joinedYear: '2024',
    tenureLabel: 'Gia nhập 2024 • 10 năm Đào tạo (Trainer) & Ngôn ngữ',
    industryKey: 'HR_EDU',
    priorBackgroundShort: '10 năm Phiên dịch viên, Giảng viên TBN & Trainer',
    priorBackgroundFull:
      '10 năm kinh nghiệm Phiên dịch viên, Giảng viên tiếng Tây Ban Nha, Trainer & Bất động sản',
    teamScaleBadge: 'Manulife Pro Vàng',
    highlightNote: 'Manulife Pro Vàng • Quản lý Xuất sắc Khu vực SG168',
    quote: 'Hãy làm ĐÚNG từ lúc bắt đầu.',
    cardSummary:
      'Từ một người từng dè dặt với bảo hiểm trước biến cố gia đình đến người quản lý truyền lửa văn hóa “Làm ĐÚNG và làm có TÂM”.',
    editorialBio: [
      'Từng có hơn 10 năm làm Phiên dịch viên, Giảng viên tiếng Tây Ban Nha và Chuyên gia đào tạo (Trainer), Anh Thơ thẳng thắn chia sẻ rằng trước đây chị từng là người e ngại bảo hiểm. Bước ngoặt chỉ thực sự đến khi gia đình trải qua biến cố và chị được Giám đốc Khu vực Đào Minh Phương đồng hành, vừa trở thành khách hàng được bảo vệ tại Manulife, vừa tìm thấy sứ mệnh nghề nghiệp mới trong Hệ thống Vùng Khánh Vân.',
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
    id: 'nguyen-hoa',
    index: '18',
    displayName: 'Nguyễn Hoa',
    fullName: 'Nguyễn Thị Hoa',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • 15 năm Ngành Điều dưỡng & 4 năm Manulife',
    industryKey: 'LAW_MED_INS',
    priorBackgroundShort: '15 năm công tác trong ngành Điều dưỡng Y tế',
    priorBackgroundFull: '15 năm kinh nghiệm chuyên môn Điều dưỡng tại cơ sở y tế',
    teamScaleBadge: '15 năm Y tế • MPro Vàng',
    highlightNote: 'Manulife Pro Vàng • Nền tảng 15 năm Điều dưỡng thấu hiểu sâu sắc rủi ro sức khỏe',
    quote: 'Tư vấn chuẩn chỉnh, phụng sự từ tâm.',
    cardSummary:
      'Mang sự tận tụy của 15 năm làm nghề Điều dưỡng y tế vào sứ mệnh dựng xây tấm khiên tài chính y tế vững chắc cho các gia đình Việt.',
    editorialBio: [
      'Có tới 15 năm trực tiếp chăm sóc người bệnh trong ngành Điều dưỡng, hơn ai hết Nguyễn Thị Hoa thấu hiểu gánh nặng viện phí và tầm quan trọng sống còn của một tấm khiên tài chính y tế dự phòng khi biến cố sức khỏe xảy đến.',
      'Gia nhập Khu vực HCM69, Manulife Việt Nam từ năm 2022 dưới sự dẫn dắt trực tiếp của chị Khánh Vân với phương châm “Làm đúng trước, làm giỏi sau”, Nguyễn Hoa đã xây dựng những bước đi vững chắc ngay từ ngày đầu, đạt danh hiệu Manulife Pro Vàng và kiên trì lan tỏa giải pháp bảo vệ đúng và đủ đến từng mái ấm.',
    ],
    badges: ['Manulife Pro Vàng', '15 Năm Điều Dưỡng Y Tế', 'Trưởng Nhóm Cấp cao'],
    specialties: [
      'Chăm sóc Sức khỏe Cao cấp',
      'Bảo vệ Trụ cột Gia đình',
      'Hoạch định Hưu trí & Học vấn',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/nguyen-hoa.jpg',
    gallery: [],
  },
  {
    id: 'tram-le',
    index: '19',
    displayName: 'Trâm Lê',
    fullName: 'Lê Bảo Trâm',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'SG169',
    directLeader: 'SRD Khánh Vân • SM Huyền Trang',
    joinedYear: '2025',
    tenureLabel: 'Gia nhập 2025 • 15 năm Tập đoàn Thương mại & Đầu tư Nhật Bản',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: '15 năm Tập đoàn Nhật Bản & Quản lý DN Xuất nhập khẩu',
    priorBackgroundFull:
      '15 năm làm việc tại các Tập đoàn Thương mại & Đầu tư Nhật Bản & Quản lý doanh nghiệp gia đình về Xuất nhập khẩu',
    teamScaleBadge: 'Chuẩn mực Nhật Bản',
    highlightNote: '15 năm tác phong Tập đoàn Nhật Bản • Trưởng Nhóm Kinh doanh Cấp cao SG169',
    quote: 'Luôn lắng nghe thấu đáo và đặt lợi ích dài hạn của khách hàng lên hàng đầu.',
    cardSummary:
      'Kết hợp kỷ luật tỉ mỉ sau 15 năm làm việc tại các tập đoàn đầu tư Nhật Bản với văn hóa biết ơn đặc trưng của Hệ thống Vùng Khánh Vân.',
    editorialBio: [
      'Từng có 15 năm công tác tại các tập đoàn thương mại và đầu tư của Nhật Bản và điều hành doanh nghiệp gia đình trong mảng xuất nhập khẩu, Trâm Lê ấn tượng mạnh mẽ trước hệ thống chương trình đào tạo chuyên môn bài bản, chuẩn quốc tế của Manulife Việt Nam.',
      'Khi đồng hành cùng Vùng Khánh Vân tại Khu vực SG169, giá trị khiến chị tâm đắc nhất chính là “văn hóa biết ơn” và sự tử tế giữa những người đồng đội. Trong mọi cuộc tư vấn, chị giữ nguyên chuẩn mực lắng nghe sâu sắc của phong cách Nhật Bản để đặt lợi ích khách hàng lên vị trí ưu tiên cao nhất.',
    ],
    badges: ['Trưởng Nhóm Cấp cao (SUM)', '15 Năm Tập Đoàn Nhật Bản'],
    specialties: [
      'Bảo vệ Trụ cột Gia đình',
      'Hoạch định Hưu trí & Học vấn',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/tram-le.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/tram-le-1.jpg',
        caption: 'Trưởng Nhóm Kinh doanh Cấp cao Trâm Lê tại sự kiện chuyên môn Vùng Khánh Vân',
      },
      {
        src: '/images/leaders/gallery/tram-le-2.jpg',
        caption: 'Phong thái chỉn chu sau 15 năm làm việc trong môi trường doanh nghiệp Nhật Bản',
      },
    ],
  },
  {
    id: 'van-nguyen',
    index: '20',
    displayName: 'Vân Nguyễn',
    fullName: 'Nguyễn Thị Vân',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'SG168',
    directLeader: 'SRD Khánh Vân • SM Đào Minh Phương',
    joinedYear: '2025',
    tenureLabel: 'Gia nhập 2025 • 19 năm Quản trị Hành chính Nhân sự',
    industryKey: 'HR_EDU',
    priorBackgroundShort: '19 năm kinh nghiệm Trưởng phòng Hành chính Nhân sự',
    priorBackgroundFull: '19 năm kinh nghiệm Quản trị Nhân sự, nguyên Trưởng phòng Hành chính Nhân sự doanh nghiệp',
    teamScaleBadge: '19 năm Trưởng phòng HCNS',
    highlightNote: 'Bề dày 19 năm Trưởng phòng Nhân sự • Phát triển đội ngũ chuẩn mực tại SG168',
    quote: 'Đồng hành để phát triển, tận tâm để bền vững.',
    cardSummary:
      'Gần hai thập kỷ làm Trưởng phòng Hành chính Nhân sự với triết lý rõ ràng: phải hiểu thấu và tự bảo vệ gia đình mình trước khi trao giải pháp cho khách hàng.',
    editorialBio: [
      'Mang hành trang 19 năm kinh nghiệm ở vị trí Trưởng phòng Hành chính Nhân sự bước vào lĩnh vực hoạch định bảo hiểm tại Khu vực SG168, Vân Nguyễn nhìn nhận nghề tư vấn bằng sự chín chắn của người làm công tác con người và chế độ phúc lợi suốt gần hai thập kỷ.',
      'Chị kiên định với ba nguyên tắc cốt lõi khi dẫn dắt đội ngũ và phục vụ khách hàng: một là phải học thật sâu để hiểu thấu bản chất bảo hiểm trước khi đi tư vấn; hai là chính bản thân và gia đình mình phải được bảo vệ trước tiên; và ba là nhu cầu thực tế của khách hàng luôn là yếu tố tiên quyết để thiết lập bất kỳ hợp đồng nào.',
    ],
    badges: ['Trưởng Nhóm Cấp cao (SUM)', '19 Năm Trưởng Phòng Nhân Sự'],
    specialties: ['Xây dựng & Đào tạo Đội ngũ', 'Bảo vệ Trụ cột Gia đình', 'Hoạch định Phúc lợi Gia đình'],
    portrait: '/images/leaders/van-nguyen.jpg',
    gallery: [],
  },
  {
    id: 'thien-van',
    index: '21',
    displayName: 'Thiên Vân',
    fullName: 'Nguyễn Thanh Thiên Vân',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'HCM69',
    directLeader: 'DM Kiều Nguyễn • SRD Khánh Vân',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • 16 năm Thư ký Hành chính & Trưởng phòng Kế hoạch Vận hành',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: '16 năm Trưởng phòng Kế hoạch Vận hành & Thư ký Hành chính',
    priorBackgroundFull:
      '16 năm kinh nghiệm Thư ký Hành chính và Trưởng phòng Kế hoạch Vận hành doanh nghiệp',
    teamScaleBadge: '16 năm Kế hoạch & Vận hành',
    highlightNote:
      'Dẫn dắt đội ngũ tại HCM69 với phương châm luôn làm điều đúng đắn và bền vững',
    quote:
      'Bảo vệ thu nhập, xây nền tài chính an toàn và đồng hành bền bỉ cùng những người theo nghề tài chính.',
    cardSummary:
      'Mang 16 năm kinh nghiệm Trưởng phòng Kế hoạch Vận hành vào sứ mệnh xây dựng một đội ngũ gắn kết, làm điều đúng đắn tại HCM69.',
    editorialBio: [
      'Với 16 năm kinh nghiệm trong lĩnh vực Thư ký Hành chính và giữ cương vị Trưởng phòng Kế hoạch Vận hành, Thiên Vân chủ động lựa chọn Manulife từ năm 2022. Khi trực tiếp hòa mình vào môi trường làm việc tại Khu vực HCM69, Hệ thống Vùng Khánh Vân, chị càng thêm tự hào khi trở thành một phần của tập thể giữ vững vị thế Top 1 nhiều năm liền bằng văn hóa yêu thương và kỷ luật làm điều đúng đắn.',
      'Trực tiếp dẫn dắt đội ngũ của mình, Thiên Vân lấy chính văn hóa phát triển lâu dài, minh bạch và tử tế của toàn vùng làm kim chỉ nam trong từng bản kế hoạch bảo vệ thu nhập cho khách hàng cũng như trên hành trình kèm cặp đồng đội.',
    ],
    badges: [
      'Trưởng Nhóm Cấp cao (SUM)',
      '16 Năm Kế hoạch & Vận hành',
    ],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/thien-van.jpg',
    gallery: [],
  },
  {
    id: 'huyen-nguyen',
    index: '22',
    displayName: 'Huyền Nguyễn',
    fullName: 'Nguyễn Thị Huyền',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'SG169',
    directLeader: 'SRD Khánh Vân • Khu vực SG169',
    joinedYear: '2025',
    tenureLabel: 'Gia nhập 2025 • Nền tảng Luật sư chuyên nghiệp',
    industryKey: 'LAW_MED_INS',
    priorBackgroundShort: 'Luật sư • Chuyên môn Pháp lý & Quy tắc Hợp đồng',
    priorBackgroundFull:
      'Luật sư, nền tảng pháp lý vững chắc trong thẩm định quy tắc và quyền lợi hợp đồng bảo hiểm',
    teamScaleBadge: 'Luật sư • SUM SG169',
    highlightNote:
      'Kết hợp tư duy chuẩn xác của một Luật sư với triết lý “Làm đúng trước, làm giỏi sau” tại Khu vực SG169',
    quote: 'Cái gì xuất phát từ trái tim sẽ chạm đến trái tim.',
    cardSummary:
      'Từ một Luật sư tìm hiểu hợp đồng bảo hiểm cho chính gia đình mình đến hành trình gắn bó và phát triển đội ngũ tại Khu vực SG169.',
    editorialBio: [
      'Xuất phát từ nền tảng chuyên môn của một Luật sư, hành trình đến với Manulife của Nguyễn Thị Huyền bắt đầu từ mong muốn tự mình nghiên cứu thấu đáo các điều khoản hợp đồng bảo hiểm cho chính gia đình. Càng tìm hiểu sâu dưới lăng kính pháp lý, chị càng trân trọng giá trị nhân văn và tính bảo vệ thiết thực của bảo hiểm nhân thọ.',
      'Chính văn hóa con người chân thành và triết lý “Làm đúng trước, làm giỏi sau” tại Hệ thống Vùng Khánh Vân đã giữ chân chị ở lại và phát triển lên vị trí Trưởng Nhóm Kinh doanh Cấp cao (SUM) tại Khu vực SG169, luôn lắng nghe và trao gửi giải pháp từ trái tim cùng sự minh bạch pháp lý rõ ràng nhất.',
    ],
    badges: [
      'Trưởng Nhóm Cấp cao (SUM)',
      'Nền tảng Luật sư',
      'Minh bạch Pháp lý Hợp đồng',
    ],
    specialties: [
      'Rà soát Pháp lý & Điều khoản Hợp đồng',
      'Bảo vệ Trụ cột Gia đình',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/huyen-nguyen.jpg',
    gallery: [],
  },
  {
    id: 'bui-phuoc-ngoan',
    index: '23',
    displayName: 'Bùi Phước Ngoan',
    fullName: 'Bùi Phước Ngoan',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'SG169',
    directLeader: 'SM Huyền Trang',
    joinedYear: '2025',
    tenureLabel: 'Gia nhập 2025 • Trưởng thành từ Thư ký Vận hành Hệ thống',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: 'Thư ký Vận hành & Hỗ trợ Phát triển Đội ngũ Kinh doanh',
    priorBackgroundFull:
      'Khởi đầu từ vị trí Thư ký vận hành tại Hệ thống Vùng Khánh Vân khi còn là sinh viên năm 3 đại học',
    teamScaleBadge: 'Thế hệ Quản lý Trẻ SG169',
    highlightNote:
      'Gương mặt Quản lý trẻ trưởng thành bài bản từ công tác vận hành nội bộ lên Trưởng Nhóm Kinh doanh Cấp cao (SUM) tại SG169',
    quote:
      'Đồng hành bằng sự tận tâm, trách nhiệm và chỉn chu trong từng giải pháp trao gửi đến khách hàng.',
    cardSummary:
      'Khởi đầu từ vị trí Thư ký khi còn là sinh viên năm 3, trưởng thành trong môi trường chuyên nghiệp để trở thành Trưởng Nhóm Cấp cao tại SG169.',
    editorialBio: [
      'Bùi Phước Ngoan bắt đầu công việc đầu tiên tại Manulife khi vẫn còn là sinh viên năm 3 đại học ở vị trí Thư ký vận hành, từ đó có cơ hội đồng hành sát sao và học hỏi trực tiếp trong môi trường kỷ luật của Hệ thống Vùng Khánh Vân và Khu vực SG169.',
      'Chính sự chuyên nghiệp, tinh thần hỗ trợ không khoảng cách giữa các thế hệ quản lý đã giúp cô thấu hiểu sâu sắc giá trị thực chất của bảo hiểm nhân thọ. Trên cương vị Trưởng Nhóm Kinh doanh Cấp cao (SUM), Phước Ngoan cam kết đóng góp bằng sự tận tâm, trách nhiệm và tác phong chỉn chu trong từng hồ sơ khách hàng.',
    ],
    badges: [
      'Trưởng Nhóm Cấp cao (SUM)',
      'Quản lý Kế cận Trẻ SG169',
      'Vận hành & Đào tạo Đội ngũ',
    ],
    specialties: [
      'Xây dựng & Đào tạo Đội ngũ Trẻ',
      'Hoạch định Tài chính Cá nhân',
      'Chăm sóc Sức khỏe Cao cấp',
    ],
    portrait: '/images/leaders/bui-phuoc-ngoan.jpg',
    gallery: [],
  },
  {
    id: 'duong-quynh',
    index: '24',
    displayName: 'Dương Quỳnh',
    fullName: 'Nguyễn Ngọc Dương Quỳnh',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2020',
    tenureLabel: 'Gia nhập 2020 • 12 năm Tài chính Ngân hàng',
    industryKey: 'BANKING',
    priorBackgroundShort: 'Nguyên Chuyên viên Kiểm soát Nội bộ Ngân hàng',
    priorBackgroundFull:
      'Nguyên Chuyên viên Kiểm soát Nội bộ Ngân hàng • Chứng chỉ Hoạch định Di sản Tài chính LIMRA',
    teamScaleBadge: 'MDRT • Chứng chỉ LIMRA',
    highlightNote:
      'MDRT • MBA Pro • Manulife Pro Bạch Kim • Chứng chỉ Quốc tế LIMRA',
    quote: 'Tư vấn tận tình, phục vụ tận tâm, đồng hành trọn đời.',
    cardSummary:
      'Từ vị thế một khách hàng ký 2 hợp đồng bảo vệ gia đình cùng chị Khánh Vân, mang kỷ luật Kiểm soát Nội bộ Ngân hàng vào nghề tư vấn.',
    editorialBio: [
      'Xuất thân từ nghiệp vụ Kiểm soát nội bộ ngân hàng vốn đòi hỏi tính chuẩn xác và tuân thủ nghiêm ngặt, cơ duyên đưa Dương Quỳnh đến với nghề bắt đầu rất tự nhiên: chị chủ động liên hệ chị Khánh Vân để thiết lập hai hợp đồng bảo vệ cho chính gia đình mình. Ấn tượng sâu sắc trước cách làm việc rõ ràng, thấu đáo và đầy tâm huyết ấy, chị quyết định bước vào hành trình học tập bài bản và gắn bó cùng HCM69 từ năm 2020.',
      'Kết hợp tư duy quản trị rủi ro ngân hàng cùng Chứng chỉ Hoạch định Di sản Tài chính Quốc tế LIMRA, Dương Quỳnh luôn trân quý văn hóa yêu thương, chuẩn mực của hệ thống, nơi mỗi bản kế hoạch tài chính được thiết kế đầy đủ, minh bạch để đồng hành trọn đời cùng khách hàng.',
    ],
    badges: [
      'MDRT',
      'MBA Pro',
      'Manulife Pro Bạch Kim',
      'Chứng chỉ LIMRA',
    ],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
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
    index: '25',
    displayName: 'Dung Grace',
    fullName: 'Nguyễn Cao Tường Dung',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'SDM Diễm Ly • SRD Khánh Vân',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • 19 năm FMCG & 5 năm Tài chính',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: '19 năm Quản lý Tiếp thị Thương mại ngành FMCG',
    priorBackgroundFull:
      '19 năm Quản lý Tiếp thị Thương mại (Trade Marketing) ngành Hàng tiêu dùng nhanh (FMCG)',
    teamScaleBadge: 'MDRT Sydney',
    highlightNote:
      'Thành viên Bàn Tròn Triệu Đô MDRT • Đại biểu Hội nghị Toàn cầu MDRT tại Sydney (Úc)',
    quote: 'Tận tâm, tử tế, chuyên nghiệp.',
    cardSummary:
      'Hơn hai thập kỷ bản lĩnh thương trường FMCG & Tài chính, tìm thấy sự đồng điệu trong văn hóa sẻ chia và nâng đỡ đội ngũ tại Vùng Khánh Vân.',
    editorialBio: [
      'Trước khi bước sang lĩnh vực hoạch định tài chính và bảo hiểm năm 2021, Dung Grace đã có 19 năm đảm nhiệm vị trí Quản lý Tiếp thị Thương mại (Trade Marketing) trong ngành hàng tiêu dùng nhanh (FMCG) đầy năng động. Bề dày trải nghiệm thực chiến giúp chị sở hữu góc nhìn sắc bén về quản trị kế hoạch cũng như sự thấu cảm sâu sắc trước nhu cầu của từng gia đình.',
      'Chinh phục danh hiệu quốc tế MDRT và trực tiếp tham dự Hội nghị Toàn cầu MDRT tại Sydney (Úc), điều giữ chân Dung Grace gắn bó bền chặt cùng Khu vực HCM69 chính là văn hóa “cho đi”, sẵn lòng chia sẻ kinh nghiệm và sát cánh hỗ trợ từng thành viên trong đội ngũ cùng trưởng thành.',
    ],
    badges: ['MDRT', 'MDRT Global Conference Sydney'],
    specialties: [
      'Hoạch định Tài chính Gia đình',
      'Bảo vệ Nguồn thu Trụ cột',
      'Cố vấn & Đồng hành Đội ngũ',
    ],
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
    id: 'duong-len',
    index: '26',
    displayName: 'Dương Lên',
    fullName: 'Dương Thị Lên',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'SG169',
    directLeader: 'SM Huyền Trang • SRD Khánh Vân',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 07/2022 • 8 năm Tài chính Ngân hàng',
    industryKey: 'BANKING',
    priorBackgroundShort: '8 năm Chuyên viên Tư vấn Tài chính Ngân hàng',
    priorBackgroundFull: '8 năm kinh nghiệm Chuyên viên Tư vấn trong lĩnh vực Tài chính Ngân hàng',
    teamScaleBadge: 'MDRT • Quản lý Xuất sắc',
    highlightNote: 'Thành viên MDRT • Quản lý Xuất sắc Khu vực SG169',
    quote:
      'Làm nghề bằng sự tử tế, trao đi giá trị bằng cả trái tim để trở thành người đồng hành tin cậy về sức khỏe và tài chính cho mỗi gia đình.',
    cardSummary:
      'Sau 8 năm làm việc trong ngành Tài chính Ngân hàng, tìm thấy bến đỗ phát triển bền vững và văn hóa nâng đỡ chân thành tại Khu vực SG169.',
    editorialBio: [
      'Có nền tảng 8 năm làm việc chuyên sâu trong ngành Tài chính Ngân hàng trước khi gia nhập Manulife tháng 07/2022, Dương Thị Lên xem việc trở thành thành viên Hệ thống Vùng Khánh Vân là một may mắn lớn trên hành trình sự nghiệp.',
      'Chinh phục danh hiệu quốc tế MDRT và Quản lý Xuất sắc tại Khu vực SG169, chị luôn đặt quyền lợi dài hạn của khách hàng lên vị trí cao nhất, đồng thời hướng tới vai trò người truyền cảm hứng, sẻ chia để từng cộng sự trong nhóm cùng phát triển vững vàng.',
    ],
    badges: ['MDRT', 'Quản lý Xuất sắc', '8 Năm Ngân Hàng'],
    specialties: ['Bảo vệ Trụ cột Gia đình', 'Xây dựng & Đào tạo Đội ngũ'],
    portrait: '/images/leaders/duong-len.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/duong-len-1.jpg',
        caption: 'Trưởng Nhóm Kinh doanh Dương Thị Lên trong sự kiện vinh danh danh hiệu',
      },
      {
        src: '/images/leaders/gallery/duong-len-2.jpg',
        caption: 'Khoảnh khắc gắn kết cùng Ban Lãnh đạo và đội ngũ Vùng Khánh Vân',
      },
      {
        src: '/images/leaders/gallery/duong-len-3.jpg',
        caption: 'Phong thái chuyên nghiệp từ nền tảng 8 năm Tài chính Ngân hàng',
      },
    ],
  },
  {
    id: 'linh-tang',
    index: '27',
    displayName: 'Linh Tằng',
    fullName: 'Tằng Thị Hoài Linh',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • Hơn 5 năm gắn bó tại HCM69',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: 'Nguyên Trưởng nhóm Dịch vụ Khách hàng Công ty Phần mềm',
    priorBackgroundFull: 'Nguyên Trưởng nhóm Dịch vụ Khách hàng (Customer Service Lead) tại doanh nghiệp phần mềm công nghệ',
    teamScaleBadge: 'MBA Pro 2026',
    highlightNote: 'MBA Pro 2026 • Quản lý Xuất sắc • Phát triển đội ngũ và quản lý kế cận',
    quote: 'Làm đúng trước, kết quả tốt sẽ đến sau.',
    cardSummary:
      'Từ Trưởng nhóm Dịch vụ khách hàng ngành công nghệ đến hơn 5 năm xây dựng đội ngũ và quản lý kế cận tại HCM69.',
    editorialBio: [
      'Xuất thân là Trưởng nhóm Dịch vụ Khách hàng tại một công ty phần mềm, Tằng Thị Hoài Linh bước vào Manulife năm 2021 qua lời mời của một người bạn. Hơn 5 năm đi sâu vào nghề giúp chị thấm thía rằng bảo hiểm không đơn thuần là hoạt động kinh doanh, mà là sự chuẩn bị nhân văn trước những biến cố của cuộc sống.',
      'Với Linh Tằng, tư vấn không phải là cố gắng chốt bằng được một hợp đồng, mà là giúp khách hàng thực sự hiểu mình cần gì để chọn giải pháp phù hợp nhất. Tinh thần ấy cũng được chị truyền trọn vẹn sang đội ngũ của mình, để cả nhóm cùng chinh phục danh hiệu MBA Pro 2026.',
    ],
    badges: ['MBA Pro 2026', 'Quản lý Xuất sắc'],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/linh-tang.jpg',
    gallery: [],
  },
  {
    id: 'tien-tien',
    index: '28',
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
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: 'Chuyên viên Xuất nhập khẩu & Logistics',
    priorBackgroundFull: 'Chuyên viên nghiệp vụ Xuất nhập khẩu & Chuỗi cung ứng Logistics',
    teamScaleBadge: 'Quản lý Xuất sắc',
    highlightNote: 'Quản lý Xuất sắc • Dẫn dắt đội ngũ tại Khu vực SG169',
    quote: 'Tư vấn từ tâm, làm nghề bằng sự tử tế.',
    cardSummary:
      'Dẫn dắt đội ngũ bằng tâm thế của người phụ nữ hướng về gia đình: tuân thủ pháp luật, minh bạch và gieo hạt lành qua từng hợp đồng.',
    editorialBio: [
      'Chuyển mình từ ngành Xuất nhập khẩu & Logistics sang lĩnh vực bảo hiểm nhân thọ từ năm 2021, Tiên Tiên tìm thấy ý nghĩa trọn vẹn của nghề nghiệp khi gặp gỡ Giám đốc Vùng Khánh Vân và Giám đốc Khu vực Huyền Trang. Là người phụ nữ luôn đặt gia đình làm điểm tựa, chị trân trọng môi trường giúp mình vừa nâng cao thu nhập bền vững, vừa có thời gian chất lượng đồng hành cùng con cái trưởng thành.',
      'Hiện trực tiếp dẫn dắt đội ngũ tại Khu vực SG169, Tiên Tiên giữ vững nguyên tắc thượng tôn pháp luật và tư vấn từ tâm, bởi chị luôn tin rằng làm nghề chuẩn mực chính là cách thiết thực nhất để gieo những hạt mầm bình an cho khách hàng và cho chính gia đình mình.',
    ],
    badges: ['Quản lý Xuất sắc', 'Chuẩn mực & Minh bạch'],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/tien-tien.jpg',
    gallery: [],
  },
  {
    id: 'kim-thi',
    index: '29',
    displayName: 'Kim Thi',
    fullName: 'Đỗ Thị Kim Thi',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'SG169',
    directLeader: 'SM Huyền Trang • SRD Khánh Vân',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 09/2021 • 13 năm Kế toán (7 năm Kế toán trưởng)',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: '13 năm Kế toán Tài chính (7 năm Kế toán trưởng SX & BĐS)',
    priorBackgroundFull:
      '13 năm kinh nghiệm Kế toán Tài chính doanh nghiệp Sản xuất & Bất động sản, trong đó có 7 năm giữ vị trí Kế toán trưởng',
    teamScaleBadge: '7 năm Kế toán trưởng',
    highlightNote: '13 năm Kế toán Tài chính & 5 năm hoạch định bảo vệ gia đình tại Khu vực SG169',
    quote: 'Làm nghề bằng sự tử tế, đồng hành bằng trách nhiệm.',
    cardSummary:
      '7 năm làm Kế toán trưởng doanh nghiệp sản xuất & BĐS trước khi bén duyên cùng Vùng Khánh Vân mùa dịch 2021 để đồng hành cùng con vào lớp 1.',
    editorialBio: [
      'Sở hữu 13 năm kinh nghiệm kế toán tài chính doanh nghiệp, trong đó có 7 năm giữ cương vị Kế toán trưởng tại các doanh nghiệp sản xuất và bất động sản, Đỗ Thị Kim Thi tìm đến Manulife vào tháng 09/2021 khi con bước vào lớp 1 và chị mong muốn một sự nghiệp chủ động thời gian để sát cánh cùng con.',
      'Văn hóa làm nghề “có tâm, có tầm, chuẩn chỉnh, cho đi vô điều kiện” của Hệ thống Vùng Khánh Vân đã thuyết phục chị gắn bó suốt 5 năm qua. Với tư duy mạch lạc của một Kế toán trưởng, Kim Thi luôn giúp khách hàng nhìn thấu bức tranh tài chính tổng thể và tìm kiếm những cộng sự cùng tần số để đi xa bền vững.',
    ],
    badges: ['Trưởng Nhóm Kinh doanh (UM)', '7 Năm Kế Toán Trưởng'],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/kim-thi.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/kim-thi-1.jpg',
        caption: 'Trưởng Nhóm Kinh doanh Đỗ Thị Kim Thi trong hoạt động vinh danh tại Manulife',
      },
      {
        src: '/images/leaders/gallery/kim-thi-2.jpg',
        caption: 'Đồng hành cùng tập thể Quản lý Khu vực SG169, Vùng Khánh Vân',
      },
      {
        src: '/images/leaders/gallery/kim-thi-3.jpg',
        caption: 'Nền tảng 13 năm Kế toán tài chính vững vàng trong từng bản hoạch định',
      },
    ],
  },
  {
    id: 'ha-phi-yen',
    index: '30',
    displayName: 'Hà Phi Yến',
    fullName: 'Hà Phi Yến',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2024',
    tenureLabel: 'Gia nhập 2024 • 10 năm Tài chính Kế toán',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: '10 năm kinh nghiệm • Nguyên Kế toán trưởng Doanh nghiệp',
    priorBackgroundFull: '10 năm kinh nghiệm Tài chính, Kế toán & Thuế • Nguyên Kế toán trưởng Doanh nghiệp',
    teamScaleBadge: '10 năm Kế toán trưởng',
    highlightNote: 'Nguyên Kế toán trưởng Doanh nghiệp • Tư vấn dựa trên sự hiểu biết, không bán bằng nỗi sợ',
    quote: 'Bảo vệ đúng nhu cầu, đủ trong khả năng tài chính và chuẩn bị khi sức khỏe còn cho phép.',
    cardSummary:
      'Đi qua nỗi đau biến cố riêng của gia đình và 10 năm làm Kế toán trưởng & Thuế, chọn làm nghề bằng kiến thức minh bạch chứ không bao giờ bán bảo hiểm bằng nỗi sợ.',
    editorialBio: [
      'Xuất thân là Kế toán trưởng với 10 năm kinh nghiệm chuyên sâu về tài chính và thuế doanh nghiệp, Hà Phi Yến đến với bảo hiểm nhân thọ từ một cơ duyên tình cờ nhưng quyết định gắn bó sâu sắc sau biến cố mất đi cô con gái nhỏ Minh Châu. Hơn bất kỳ ai, chị thấm thía ý nghĩa của sự chuẩn bị chủ động trước những rủi ro không thể lường trước của đời người.',
      'Tại Khu vực HCM69, Hà Phi Yến kiên định bốn nguyên tắc nghề nghiệp rõ ràng: tư vấn đúng nhu cầu và vừa vặn khả năng tài chính; minh bạch cả quyền lợi lẫn giới hạn loại trừ của hợp đồng; tuyệt đối không bán bảo hiểm bằng nỗi sợ hay sự cả nể mà bằng tri thức và niềm tin; và giữ trọn trách nhiệm đồng hành suốt hành trình bảo vệ.',
    ],
    badges: ['Trưởng Nhóm Kinh doanh (UM)', '10 Năm Kế Toán Trưởng'],
    specialties: ['Hoạch định Dòng tiền Gia đình', 'Minh bạch Điều khoản & Quyền lợi'],
    portrait: '/images/leaders/ha-phi-yen.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/ha-phi-yen-1.jpg',
        caption: 'Trưởng Nhóm Kinh doanh Hà Phi Yến tại không gian làm việc Manulife',
      },
      {
        src: '/images/leaders/gallery/ha-phi-yen-2.jpg',
        caption: 'Đồng hành học tập và rèn luyện chuyên môn cùng tập thể HCM69',
      },
      {
        src: '/images/leaders/gallery/ha-phi-yen-3.jpg',
        caption: 'Khoảnh khắc gắn kết cùng đội ngũ Hệ thống Vùng Khánh Vân',
      },
    ],
  },
  {
    id: 'thuy-trieu',
    index: '31',
    displayName: 'Thủy Triều',
    fullName: 'Nguyễn Thị Thủy Triều',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'DM Hồng Hòa • SDM Diễm Ly',
    joinedYear: '2024',
    tenureLabel: 'Gia nhập 2024 • 12 năm Công tác Lĩnh vực Y tế',
    industryKey: 'LAW_MED_INS',
    priorBackgroundShort: '12 năm công tác thực tiễn trong lĩnh vực Y tế',
    priorBackgroundFull: '12 năm kinh nghiệm làm việc trực tiếp trong môi trường Y tế & Chăm sóc sức khỏe',
    teamScaleBadge: '12 năm Ngành Y tế',
    highlightNote: 'Quản lý Xuất sắc • Nền tảng 12 năm Y tế thấu hiểu chi phí điều trị thực tế',
    quote: 'Tư vấn bằng cả trái tim, mang tấm khiên dự phòng viện phí đến từng gia đình Việt.',
    cardSummary:
      'Chứng kiến biết bao bệnh nhân chật vật trước viện phí khổng lồ suốt 12 năm làm ngành Y tế, quyết tâm đồng hành cùng HCM69 để bảo vệ người thân và cộng đồng.',
    editorialBio: [
      'Suốt 12 năm làm việc trong môi trường y tế, Nguyễn Thị Thủy Triều đã tận mắt chứng kiến không ít bệnh nhân và gia đình rơi vào cảnh kiệt quệ trước những hóa đơn viện phí khổng lồ. Trăn trở ấy thôi thúc chị tìm đến Manulife và lựa chọn Khu vực HCM69 dưới sự điều hành của chị Khánh Vân để học bài bản cách thiết lập quỹ dự phòng y tế cho người thân, bạn bè và cộng đồng.',
      'Cảm nhận trọn vẹn sự yêu thương và thái độ làm nghề nghiêm túc như một gia đình tại HCM69, Thủy Triều không ngừng trau dồi nghiệp vụ mỗi ngày với ước mong thay đổi nhận thức tích cực của các gia đình Việt về giá trị bảo vệ thực chất của bảo hiểm nhân thọ.',
    ],
    badges: ['Quản lý Xuất sắc', '12 Năm Ngành Y Tế'],
    specialties: [
      'Chăm sóc Sức khỏe Cao cấp',
      'Hoạch định Hưu trí & Học vấn',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/thuy-trieu.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/thuy-trieu-1.jpg',
        caption: 'Trưởng Nhóm Kinh doanh Nguyễn Thị Thủy Triều tại sự kiện vinh danh HCM69',
      },
      {
        src: '/images/leaders/gallery/thuy-trieu-2.jpg',
        caption: 'Gắn kết cùng tập thể Quản lý Khu vực HCM69, Vùng Khánh Vân',
      },
      {
        src: '/images/leaders/gallery/thuy-trieu-3.jpg',
        caption: 'Lan tỏa giải pháp chăm sóc sức khỏe chủ động từ nền tảng 12 năm ngành Y',
      },
    ],
  },
  {
    id: 'quynh-thi',
    index: '32',
    displayName: 'Quỳnh Thi',
    fullName: 'Võ Thị Quỳnh Thi',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'UM Dương Quỳnh • SRD Khánh Vân',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • 5 năm tại Manulife & Nền tảng Shinhan Bank',
    industryKey: 'BANKING',
    priorBackgroundShort: 'Nguyên Chuyên viên Đảm bảo Chất lượng (QA) tại Shinhan Bank',
    priorBackgroundFull: 'Nguyên Chuyên viên Kiểm soát Đảm bảo Chất lượng (QA) tại Ngân hàng Shinhan Bank Việt Nam',
    teamScaleBadge: 'Cựu QA Shinhan Bank',
    highlightNote: '5 năm gắn bó bền bỉ tại HCM69 • Tư duy chuẩn xác từ bộ phận QA Ngân hàng Quốc tế',
    quote: 'Làm Đúng ắt làm Giỏi, mỗi chữ ký trên hợp đồng là một lời hứa với cả gia đình.',
    cardSummary:
      'Bắt đầu từ ý định tìm hiểu làm thêm khi còn ở bộ phận QA Shinhan Bank, sau 5 năm đã trở thành sự nghiệp gắn bó tâm huyết nhất bởi đạo đức và sự rõ ràng của hệ thống.',
    editorialBio: [
      'Từng công tác tại bộ phận Đảm bảo Chất lượng (QA) của Ngân hàng Shinhan Việt Nam, Võ Thị Quỳnh Thi đến với Manulife năm 2021 qua lời giới thiệu của người đồng nghiệp. Ban đầu chị chỉ dự định tìm hiểu như một công việc tay trái, nhưng sau 5 năm trải nghiệm thực tế, đây lại trở thành con đường sự nghiệp mà chị muốn gắn bó lâu dài nhất.',
      'Điều giữ trọn niềm tin của một người làm QA ngân hàng chính là sự rõ ràng, tự chủ và đạo đức nghề nghiệp tại HCM69. Với Quỳnh Thi, tư vấn là nói đúng sự thật để khách hàng hiểu tường tận quyền lợi của mình, tuyệt đối không thổi phồng, bởi mỗi tên người thụ hưởng trên hợp đồng là một lời hứa thiêng liêng với cả gia đình.',
    ],
    badges: ['Trưởng Nhóm Kinh doanh (UM)', 'Cựu QA Shinhan Bank', '5 Năm Gắn Bó'],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
    ],
    portrait: '/images/leaders/quynh-thi.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/quynh-thi-1.jpg',
        caption: 'Trưởng Nhóm Kinh doanh Võ Thị Quỳnh Thi cùng đội ngũ Khu vực HCM69',
      },
    ],
  },
  {
    id: 'tam-hoai',
    index: '33',
    displayName: 'Tâm Hoài',
    fullName: 'Tâm Hoài',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'UM Linh Tằng • SRD Khánh Vân',
    joinedYear: '2025',
    tenureLabel: 'Gia nhập 09/2025 • 15 năm Kinh nghiệm Sale & Marketing',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: 'Nguyên Giám đốc Kinh doanh • 15 năm Sale & Marketing',
    priorBackgroundFull:
      'Nguyên Giám đốc Kinh doanh Công ty CP Lưới Thái Việt & Công ty TNHH SX & TM Thiên Phước (15 năm kinh nghiệm Sale & Marketing)',
    teamScaleBadge: 'Cựu Giám đốc Kinh doanh',
    highlightNote: '15 năm bản lĩnh Giám đốc Kinh doanh doanh nghiệp • Trưởng Nhóm Kinh doanh HCM69',
    quote: 'Tư vấn tận tâm, đồng hành trách nhiệm.',
    cardSummary:
      'Mang 15 năm bản lĩnh Giám đốc Kinh doanh doanh nghiệp sản xuất và thương mại hòa nhịp cùng môi trường máu lửa, có tâm và có tầm tại HCM69.',
    editorialBio: [
      'Sau 15 năm chinh chiến trong lĩnh vực Sale & Marketing và đảm nhiệm vị trí Giám đốc Kinh doanh tại các doanh nghiệp sản xuất và thương mại, Tâm Hoài gia nhập Hệ thống Vùng Khánh Vân vào tháng 09/2025 khi tìm kiếm một môi trường vừa tự chủ thời gian, vừa phát huy chiều sâu kinh nghiệm quản trị kinh doanh.',
      'Nguồn năng lượng nhiệt huyết, chuyên nghiệp cùng tinh thần làm nghề đàng hoàng của chị Khánh Vân và tập thể HCM69 đã thuyết phục anh gắn bó trọn vẹn. Với Tâm Hoài, mỗi giải pháp trao đi không đơn thuần là một sản phẩm tài chính, mà là cam kết đồng hành và trách nhiệm trước những cột mốc trọng đại của gia đình khách hàng.',
    ],
    badges: ['Trưởng Nhóm Kinh doanh (UM)', '15 Năm Giám Đốc Kinh Doanh'],
    specialties: [
      'Bảo vệ Trụ cột Gia đình',
      'Hoạch định Hưu trí & Học vấn',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/tam-hoai.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/tam-hoai-1.jpg',
        caption: 'Trưởng Nhóm Kinh doanh Tâm Hoài tại không gian sự kiện Manulife Việt Nam',
      },
      {
        src: '/images/leaders/gallery/tam-hoai-2.jpg',
        caption: 'Đồng hành phát triển đội ngũ tại Khu vực HCM69, Hệ thống Vùng Khánh Vân',
      },
    ],
  },
  {
    id: 'minh-phuong',
    index: '34',
    displayName: 'Băng Tâm (Minh Phương)',
    fullName: 'Băng Tâm • Minh Phương',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'SG168',
    directLeader: 'SM Đào Minh Phương • SRD Khánh Vân',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • Nền tảng Thẩm định & Bồi thường BH',
    industryKey: 'LAW_MED_INS',
    priorBackgroundShort: 'Nguyên Chuyên viên Phòng Bồi thường BH Phi nhân thọ',
    priorBackgroundFull:
      'Nguyên Chuyên viên Phòng Giải quyết Quyền lợi Bồi thường tại Công ty Bảo hiểm Phi nhân thọ',
    teamScaleBadge: 'Chuyên gia Bồi thường',
    highlightNote: 'Thế mạnh chuyên sâu về cấu trúc điều khoản & quy trình giải quyết bồi thường',
    quote: 'Tư vấn đủ, đúng với tính chất bảo hiểm.',
    cardSummary:
      'Từng trực tiếp làm việc tại phòng Bồi thường bảo hiểm phi nhân thọ, thấu hiểu từng chữ trong điều khoản để thiết kế giải pháp “đúng và đủ”.',
    editorialBio: [
      'Khác với nhiều nhân sự chuyển ngành từ lĩnh vực ngoài bảo hiểm, Băng Tâm (Minh Phương) đã sớm có nền tảng chuyên môn sâu tại Phòng Bồi thường của doanh nghiệp bảo hiểm phi nhân thọ. Chính quãng thời gian trực tiếp xử lý hồ sơ sự kiện bảo hiểm giúp chị hiểu rõ hơn ai hết: một hợp đồng chỉ thực sự phát huy giá trị bảo vệ khi được kê khai trung thực và thiết kế đúng bản chất ngay từ ngày ký.',
      'Tìm kiếm một tập thể làm nghề đàng hoàng, giàu tình yêu thương và tương trợ lẫn nhau, chị lựa chọn gia nhập Hệ thống Vùng Khánh Vân từ năm 2022 để tiếp tục theo đuổi đam mê bảo hiểm một cách chuẩn chỉnh và bền vững.',
    ],
    badges: ['Trưởng Nhóm Kinh doanh (UM)', 'Chuyên môn Bồi thường Bảo hiểm'],
    specialties: [
      'Bảo vệ Trụ cột Gia đình',
      'Rà soát Điều khoản & Hồ sơ Bồi thường',
    ],
    portrait: '/images/leaders/minh-phuong.jpg?v=2',
    gallery: [],
  },
  {
    id: 'nhuan-vu',
    index: '35',
    displayName: 'Nhuần Vũ',
    fullName: 'Vũ Thị Nhuần',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'SG168',
    directLeader: 'SM Đào Minh Phương',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • 4 năm tại Manulife Việt Nam',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: 'Nghiệp vụ Kế toán & Kinh doanh Trực tuyến',
    priorBackgroundFull: 'Chuyên viên Kế toán doanh nghiệp & Kinh doanh trực tuyến',
    teamScaleBadge: '4 năm Gắn bó SG168',
    highlightNote: 'Trưởng Nhóm Kinh doanh SG168 • Bén duyên từ trải nghiệm chi trả thực tế',
    quote: 'Tư vấn bằng sự tận tâm, tử tế.',
    cardSummary:
      'Chứng kiến tận mắt giá trị chi trả quyền lợi bảo hiểm dành cho người thân, từ sự tò mò thử sức trở thành niềm đam mê gắn bó dài lâu.',
    editorialBio: [
      'Hành trình đến với bảo hiểm nhân thọ của Nhuần Vũ bắt đầu từ một trải nghiệm thực tế ngay trong chính gia đình: chứng kiến người thân nhận quyền lợi chi trả kịp thời từ hợp đồng bảo hiểm, chị mới thực sự thấm thía giá trị nhân văn sâu sắc đằng sau những trang điều khoản.',
      'Khép lại công việc kế toán trước đó để thử sức tại Khu vực SG168, Hệ thống Vùng Khánh Vân từ năm 2022, sự cẩn trọng của người làm kế toán kết hợp cùng niềm tin thực chứng vào sản phẩm đã giữ chị gắn bó say mê suốt 4 năm qua, luôn đồng hành cùng khách hàng bằng sự tận tâm và giản dị nhất.',
    ],
    badges: ['Trưởng Nhóm Kinh doanh (UM)', 'Đồng hành Quyền lợi Thực tế'],
    specialties: [
      'Bảo vệ Thu nhập Gia đình',
      'Chăm sóc Y tế & Viện phí',
      'Hỗ trợ Thủ tục Chi trả Quyền lợi',
    ],
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
    id: 'sen-nguyen',
    index: '36',
    displayName: 'Sen Nguyễn',
    fullName: 'Nguyễn Thị Sen',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'SG169',
    directLeader: 'SM Huyền Trang • SRD Khánh Vân',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • 9 năm Chăm sóc Khách hàng & 4 năm Manulife',
    industryKey: 'LAW_MED_INS',
    priorBackgroundShort: '9 năm Chuyên viên Tổng đài Chăm sóc Khách hàng',
    priorBackgroundFull: '9 năm kinh nghiệm Tổng đài viên & Chăm sóc khách hàng chuyên nghiệp',
    teamScaleBadge: 'Manulife Pro Vàng',
    highlightNote: 'Manulife Pro Vàng • Dẫn dắt nhóm kinh doanh tại Khu vực SG169',
    quote: 'Đến với khách hàng bằng sự chân thành và luôn sẵn sàng có mặt bất cứ khi nào khách hàng cần.',
    cardSummary:
      '9 năm rèn luyện sự kiên nhẫn lắng nghe trong nghề Tổng đài viên, nay dẫn dắt nhóm kinh doanh với cam kết kê khai trung thực tuyệt đối.',
    editorialBio: [
      'Trải qua 9 năm gắn bó với công việc Tổng đài viên vốn đòi hỏi kỹ năng lắng nghe và sự nhẫn nại cao độ, Nguyễn Thị Sen bén duyên cùng Manulife năm 2022 sau buổi gặp gỡ trực tiếp đầy năng lượng và nhiệt huyết cùng Giám đốc Vùng Khánh Vân.',
      'Yêu quý bầu không khí đoàn kết, yêu thương và sẵn lòng nâng đỡ nhau của tập thể SG169, Sen Nguyễn chinh phục danh hiệu Manulife Pro Vàng và xây dựng nhóm kinh doanh của riêng mình dựa trên nguyên tắc nhất quán: tư vấn đúng đủ, kê khai hồ sơ trung thực và luôn có mặt kịp thời mỗi khi khách hàng cần hỗ trợ.',
    ],
    badges: ['Manulife Pro Vàng', '9 Năm Chăm Sóc Khách Hàng'],
    specialties: ['Bảo vệ Trụ cột Gia đình', 'Chăm sóc & Hỗ trợ Dịch vụ Hợp đồng'],
    portrait: '/images/leaders/sen-nguyen.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/sen-nguyen-1.jpg',
        caption: 'Trưởng Nhóm Kinh doanh Nguyễn Thị Sen cùng tập thể Khu vực SG169',
      },
    ],
  },
  {
    id: 'thao-phuong',
    index: '37',
    displayName: 'Thảo Phương',
    fullName: 'Vũ Ngọc Thảo Phương',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'UM Anh Vũ • SRD Khánh Vân',
    joinedYear: '2026',
    tenureLabel: '5 năm Truyền thông & Tổ chức Sự kiện',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: '5 năm Account Manager ngành Truyền thông & Sự kiện',
    priorBackgroundFull: '5 năm kinh nghiệm Account Manager trong lĩnh vực Truyền thông & Tổ chức sự kiện',
    teamScaleBadge: 'Account Manager 5 năm',
    highlightNote: 'Thế hệ Quản lý trẻ năng động • Nền tảng 5 năm Quản trị dự án Truyền thông',
    quote: 'Những gì xuất phát từ trái tim sẽ chạm đến trái tim.',
    cardSummary:
      'Chủ động nghiên cứu quản lý tài chính cá nhân sau 5 năm làm Account Manager truyền thông, chọn ở lại vì những người chị làm nghề tử tế bằng xương bằng thịt tại HCM69.',
    editorialBio: [
      'Sau 5 năm làm Account Manager trong ngành Truyền thông và Tổ chức sự kiện, Vũ Ngọc Thảo Phương đến với bảo hiểm trong tâm thế hoàn toàn chủ động khi tự nghiên cứu về quản trị tài chính cá nhân: làm lụng tích góp từng đồng mỗi ngày, nhưng nếu biến cố sức khỏe bất ngờ ập đến làm gián đoạn thu nhập thì bảo hiểm chính là điểm tựa giữ vững thành quả tích lũy ấy.',
      'Chia sẻ về lý do gắn bó cùng Khu vực HCM69, Thảo Phương bộc bạch chân thành: “Tìm đến là một chuyện, nhưng chọn ở lại để đi cùng nhau lại là câu chuyện khác”. Chính việc mỗi ngày được gặp gỡ, học hỏi trực tiếp từ chị Khánh Vân và những người chị quản lý tài giỏi, tử tế tại văn phòng đã truyền cho cô niềm tự hào để theo đuổi nghề một cách nghiêm túc và trọn vẹn.',
    ],
    badges: ['Trưởng Nhóm Kinh doanh (UM)', '5 Năm Truyền Thông & Sự Kiện'],
    specialties: ['Hoạch định Tài chính Người Trẻ', 'Bảo vệ Thu nhập & Tích lũy'],
    portrait: '/images/leaders/thao-phuong.jpg',
    gallery: [],
  },
  {
    id: 'ngoc-tram',
    index: '38',
    displayName: 'Ngọc Trâm',
    fullName: 'Nguyễn Ngọc Trâm',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'SG168',
    directLeader: 'SM Đào Minh Phương',
    joinedYear: '2026',
    tenureLabel: 'Gia nhập 2026 • Nền tảng Quản lý Nhân sự Doanh nghiệp',
    industryKey: 'HR_EDU',
    priorBackgroundShort: '2 năm Quản lý Nhân sự tại Doanh nghiệp',
    priorBackgroundFull: 'Kinh nghiệm Quản lý Nhân sự tại Doanh nghiệp • Phát triển đội ngũ trẻ tại SG168',
    teamScaleBadge: 'Quản lý trẻ SG168',
    highlightNote: 'Trưởng Nhóm Kinh doanh trẻ tại Khu vực SG168',
    quote: 'Tư vấn đúng và đủ, chữ tâm làm nên thương hiệu.',
    cardSummary:
      'Từ nền tảng Quản lý Nhân sự doanh nghiệp đến hành trình xây dựng nhóm kinh doanh dựa trên nguyên tắc “hiểu đúng, làm đúng từ đầu”.',
    editorialBio: [
      'Từng công tác ở vị trí Quản lý Nhân sự doanh nghiệp, Nguyễn Ngọc Trâm biết đến cơ hội sự nghiệp tại Manulife thông qua sự giới thiệu từ gia đình của Giám đốc Khu vực Đào Minh Phương.',
      'Gia nhập Khu vực SG168, Hệ thống Vùng Khánh Vân, Ngọc Trâm ấn tượng sâu sắc với văn hóa tương trợ và rèn luyện nền tảng “hiểu đúng, làm đúng ngay từ đầu”. Hiện cô trực tiếp dẫn dắt đội ngũ của mình với cam kết mang lại trải nghiệm minh bạch, chuẩn mực nhất cho cả khách hàng lẫn cộng sự.',
    ],
    badges: ['Trưởng Nhóm Kinh doanh (UM)', 'Quản lý trẻ SG168'],
    specialties: ['Xây dựng & Đào tạo Đội ngũ', 'Hoạch định Bảo vệ Gia đình Trẻ'],
    portrait: '/images/leaders/ngoc-tram.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/ngoc-tram-1.jpg',
        caption: 'Trưởng Nhóm Kinh doanh Nguyễn Ngọc Trâm tại văn phòng Khu vực SG168',
      },
      {
        src: '/images/leaders/gallery/ngoc-tram-2.jpg',
        caption: 'Đồng hành cùng đội ngũ trẻ trong các chương trình đào tạo chuyên môn',
      },
      {
        src: '/images/leaders/gallery/ngoc-tram-3.jpg',
        caption: 'Văn hóa gắn kết và sẻ chia tại Hệ thống Vùng Khánh Vân',
      },
    ],
  },
  {
    id: 'thao-bui',
    index: '39',
    displayName: 'Thảo Bùi',
    fullName: 'Bùi Thị Thu Thảo',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'SUM Đào Trần • SRD Khánh Vân',
    joinedYear: '2023',
    tenureLabel: 'Gia nhập 2023 • 20 năm Viện Kiểm nghiệm Thuốc TP.HCM & gần 4 năm BHNT',
    industryKey: 'LAW_MED_INS',
    priorBackgroundShort: '20 năm Kiểm nghiệm Dược tại Viện Kiểm nghiệm Thuốc TP.HCM',
    priorBackgroundFull:
      '20 năm công tác Kiểm nghiệm Dược tại Viện Kiểm nghiệm Thuốc TP.HCM • 3 năm theo dõi kế hoạch lâm nghiệp',
    teamScaleBadge: '20 năm Ngành Dược',
    highlightNote:
      'Mang sự chuẩn xác, cẩn trọng của 20 năm Kiểm nghiệm Dược tại Viện Kiểm nghiệm Thuốc TP.HCM vào nghề tư vấn tài chính',
    quote: 'Tử tế trong tư vấn, vững vàng trong giải pháp, trọn vẹn trong đồng hành.',
    cardSummary:
      'Sau 20 năm công tác tại Viện Kiểm nghiệm Thuốc TP.HCM, tìm thấy nguồn cảm hứng mới nơi tập thể quy tụ tinh hoa đa ngành nghề của Vùng Khánh Vân.',
    editorialBio: [
      'Sau chặng đường 20 năm công tác trong lĩnh vực Kiểm nghiệm Dược tại Viện Kiểm nghiệm Thuốc TP.HCM, Bùi Thị Thu Thảo bén duyên với Manulife từ lời mời tìm hiểu giải pháp bảo vệ người trụ cột của một người đồng nghiệp cũ nay là tư vấn viên thuộc Vùng Khánh Vân. Cho phép bản thân mở lòng trải nghiệm môi trường mới, chị nhanh chóng bị thuyết phục bởi sự hướng dẫn tận tình, văn hóa sẻ chia không giới hạn giữa những đồng nghiệp xuất thân từ tinh hoa nhiều ngành nghề, đặc biệt là nguồn năng lượng chuẩn mực từ người dẫn đầu Khánh Vân.',
      'Trên cương vị Trưởng Nhóm Kinh doanh (UM) tại HCM69, tâm huyết lớn nhất của Thảo Bùi là thiết kế những giải pháp bảo vệ vừa vặn với từng hoàn cảnh gia đình để chính khách hàng hiểu thấu và tự nguyện lan tỏa giá trị nhân văn của bảo hiểm nhân thọ, đồng thời kiến tạo đội ngũ theo phương châm: “Dẫn dắt bằng sự chân thành, phát triển bằng năng lực, gắn kết bằng trách nhiệm.”',
    ],
    badges: [
      'Trưởng Nhóm Kinh doanh (UM)',
      '20 Năm Viện Kiểm Nghiệm Thuốc TP.HCM',
      'Hoạch định Y tế & Gia đình',
    ],
    specialties: [
      'Chăm sóc Sức khỏe & Bệnh Lý Nghiêm Trọng',
      'Bảo vệ Trụ cột Gia đình',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/thao-bui.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/thao-bui-1.jpg',
        caption: 'Trưởng Nhóm Kinh doanh Bùi Thị Thu Thảo tại không gian làm việc Manulife Plaza',
      },
      {
        src: '/images/leaders/gallery/thao-bui-2.jpg',
        caption: 'Cùng tập thể Quản lý và đồng nghiệp Khu vực HCM69, Hệ thống Vùng Khánh Vân',
      },
      {
        src: '/images/leaders/gallery/thao-bui-3.jpg',
        caption: 'Khoảnh khắc vinh danh thăng cấp Trưởng Nhóm Kinh doanh (UM) tại HCM69',
      },
    ],
  },
  {
    id: 'ha-do',
    index: '40',
    displayName: 'Hà Đỗ',
    fullName: 'Hà Đỗ',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2026',
    tenureLabel: 'Gia nhập 2026 • 18 năm Tài chính Chứng khoán & Kế toán Quản trị',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: '18 năm Tài chính Chứng khoán & Kế toán Quản trị',
    priorBackgroundFull:
      '18 năm kinh nghiệm chuyên sâu trong lĩnh vực Tài chính Chứng khoán và Kế toán Quản trị doanh nghiệp',
    teamScaleBadge: '18 năm Tài chính & CK',
    highlightNote:
      'Chinh phục danh hiệu Manulife Pro Bạc chỉ sau 3 tháng nhờ nền tảng 18 năm Tài chính Chứng khoán và quy trình bài bản',
    quote: 'Làm thật, học thật, giá trị thật sẽ tự lên tiếng.',
    cardSummary:
      'Dám bước ra thử thách giới hạn sau 18 năm Tài chính Chứng khoán, chinh phục Pro Bạc chỉ sau 3 tháng bằng số liệu rõ ràng và lời nói thật.',
    editorialBio: [
      'Sở hữu bề dày 18 năm kinh nghiệm trong lĩnh vực Tài chính Chứng khoán và Kế toán Quản trị, Hà Đỗ lựa chọn gia nhập Manulife để thử thách giới hạn bản thân ở một mảng hoạch định tài chính gần gũi và nhân văn hơn với từng gia đình. Nhờ tuân thủ đúng quy trình và học tập bài bản tại Khu vực HCM69, chị nhanh chóng chinh phục cột mốc Manulife Pro Bạc chỉ sau 3 tháng.',
      'Điều chị trân quý nhất tại Hệ thống Vùng Khánh Vân là sự minh bạch tuyệt đối và tinh thần xem khách hàng như người thân ruột thịt. Nguyên tắc nhất quán của Hà Đỗ là tư vấn dựa trên số liệu rõ ràng và lời nói thật, bởi niềm tin bền vững nhất chỉ đến khi người cố vấn dám nói điều khách hàng thực sự cần nghe, chứ không chỉ điều họ muốn nghe.',
    ],
    badges: [
      'MBA Pro',
      'Manulife Pro Bạc Sau 3 Tháng',
      '18 Năm Tài Chính & Chứng Khoán',
    ],
    specialties: [
      'Bảo vệ Trụ cột Gia đình',
      'Hoạch định Hưu trí & Học vấn',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/ha-do.jpg',
    gallery: [],
  },
  {
    id: 'ngoc-anh',
    index: '41',
    displayName: 'Ngọc Anh',
    fullName: 'Vũ Thị Ngọc Anh',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2026',
    tenureLabel: 'Gia nhập 2026 • 12 năm Đối tác Nhân sự Chiến lược (HRBP)',
    industryKey: 'HR_EDU',
    priorBackgroundShort: '12 năm Đối tác Nhân sự Chiến lược (HR Business Partner)',
    priorBackgroundFull:
      '12 năm kinh nghiệm Đối tác Nhân sự Chiến lược (HR Business Partner) tại các doanh nghiệp',
    teamScaleBadge: '12 năm HRBP • MBA Pro',
    highlightNote:
      'Chủ động tìm đến Hệ thống Vùng Khánh Vân sau 12 năm làm HR Business Partner • Danh hiệu MBA Pro',
    quote: 'Phương án bảo hiểm tốt nhất là phương án bảo vệ phù hợp nhất.',
    cardSummary:
      'Mang 12 năm kinh nghiệm HR Business Partner chủ động tìm đến Vùng Khánh Vân vì sự đồng điệu trong tinh thần chính trực và thấu hiểu con người.',
    editorialBio: [
      'Sau 12 năm đảm nhiệm vai trò Đối tác Nhân sự Chiến lược (HR Business Partner) chuyên đồng hành cùng ban lãnh đạo doanh nghiệp về bài toán con người và phúc lợi, Vũ Thị Ngọc Anh chủ động tìm hiểu và lựa chọn gia nhập Khu vực HCM69, Hệ thống Vùng Khánh Vân.',
      'Tại đây, chị tìm thấy sự cộng hưởng trọn vẹn từ tinh thần đoàn kết, tương trợ lẫn nhau giữa các thành viên. Trên cương vị Trưởng Nhóm Kinh doanh (UM) và quản lý MBA Pro, Ngọc Anh luôn đặt sự chính trực, lắng nghe thấu cảm và lợi ích thực chất của khách hàng cũng như đội ngũ lên hàng đầu.',
    ],
    badges: [
      'MBA Pro',
      'Trưởng Nhóm Kinh doanh (UM)',
      '12 Năm HR Business Partner',
    ],
    specialties: [
      'Xây dựng & Đào tạo Đội ngũ',
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
    ],
    portrait: '/images/leaders/ngoc-anh.jpg',
    gallery: [],
  },
  {
    id: 'xuan-mai',
    index: '42',
    displayName: 'Xuân Mai',
    fullName: 'Trần Xuân Mai',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'SG168',
    directLeader: 'SM Đào Minh Phương',
    joinedYear: '2025',
    tenureLabel: 'Gia nhập 2025 • Trưởng Nhóm Kinh doanh Khu vực SG168',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: 'Phát triển Kinh doanh & Chăm sóc Khách hàng tận tâm',
    priorBackgroundFull:
      'Kinh nghiệm phát triển khách hàng và xây dựng nhóm kinh doanh tại Khu vực SG168',
    teamScaleBadge: 'UM • Khu vực SG168',
    highlightNote:
      'Trưởng Nhóm Kinh doanh trẻ đầy nhiệt huyết đồng hành cùng Giám đốc Khu vực Đào Minh Phương tại SG168',
    quote:
      'Luôn đồng hành tận tâm để mang đến những giải pháp bảo vệ phù hợp và tốt nhất cho mỗi gia đình khách hàng.',
    cardSummary:
      'Bén duyên cùng Khu vực SG168 qua sự dẫn dắt của SM Đào Minh Phương, trân quý văn hóa luôn sẵn sàng nâng đỡ nhau tiến bộ mỗi ngày.',
    editorialBio: [
      'Cơ duyên đưa Trần Xuân Mai đến với Manulife Việt Nam bắt đầu từ sự đồng hành và dẫn dắt trực tiếp của Giám đốc Khu vực Đào Minh Phương tại SG168. Bước vào môi trường làm việc của Hệ thống Vùng Khánh Vân, điều khiến Xuân Mai gắn bó sâu sắc chính là văn hóa tập thể luôn sẵn sàng giúp đỡ, sẻ chia nghiệp vụ và tiếp thêm động lực cho nhau trong từng giai đoạn làm nghề.',
      'Trên vai trò Trưởng Nhóm Kinh doanh (UM), Xuân Mai kiên định với mục tiêu nghiên cứu kỹ lưỡng nhu cầu thực tế để mang đến những giải pháp bảo vệ tối ưu, minh bạch và lâu dài nhất cho từng khách hàng.',
    ],
    badges: ['Trưởng Nhóm Kinh doanh (UM)', 'Khu vực SG168'],
    specialties: ['Bảo vệ Trụ cột Gia đình', 'Chăm sóc Sức khỏe & Tích lũy'],
    portrait: '/images/leaders/xuan-mai.jpg',
    gallery: [],
  },
  {
    id: 'cam-huong',
    index: '43',
    displayName: 'Cẩm Hương',
    fullName: 'Lê Thị Cẩm Hương',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • 10 năm Ngoại giao & Điều hành Doanh nghiệp',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: '10 năm Ngoại giao tại Tổng Lãnh sự quán Kuwait • Chủ DN Nhập khẩu',
    priorBackgroundFull:
      '10 năm công tác lĩnh vực Ngoại giao tại Tổng Lãnh sự quán Kuwait • Chủ doanh nghiệp kinh doanh nhập khẩu',
    teamScaleBadge: '2x MDRT • MBA Pro',
    highlightNote:
      '2 lần đạt chuẩn quốc tế MDRT (2023, 2027) • Quản lý MBA 2023 • Manulife Pro Bạch Kim',
    quote: 'Làm đúng trước, làm giỏi sau. Làm người trước, làm nghề sau.',
    cardSummary:
      'Từ 10 năm công tác ngoại giao tại Tổng Lãnh sự quán Kuwait và điều hành công ty nhập khẩu đến danh hiệu MDRT 2027 cùng khát vọng nhân rộng chuẩn mực bảo hiểm xanh sạch tại HCM69.',
    editorialBio: [
      'Từng có 10 năm công tác trong lĩnh vực ngoại giao tại Tổng Lãnh sự quán Kuwait và trực tiếp điều hành doanh nghiệp nhập khẩu riêng, Lê Thị Cẩm Hương hiểu rất rõ giá trị của việc chủ động chuẩn bị tài chính cho mỗi cá nhân và gia đình. Trước khi bước vào nghề, chị vốn là khách hàng tham gia hợp đồng của nhiều công ty bảo hiểm khác nhau; chính góc nhìn khắt khe của một người mua có trải nghiệm đã đưa chị đến với Manulife và gắn bó gần 6 năm qua tại Khu vực HCM69 thuộc Vùng Khánh Vân.',
      'Điều giữ chân Cẩm Hương đồng hành dài lâu nằm ở sự chuẩn mực làm nghề với chữ Tâm đặt lên cao nhất vì quyền lợi bền vững của khách hàng. Liên tiếp chinh phục các cột mốc MDRT 2023, Quản lý MBA 2023, Manulife Pro Bạch Kim và sớm hoàn thành tiêu chí MDRT 2027, chị tâm niệm “Làm đúng trước, làm giỏi sau; làm người trước, làm nghề sau”, mong muốn kiến tạo thêm nhiều thế hệ tư vấn viên chuẩn xanh, sạch, đúng tại Việt Nam.',
    ],
    badges: ['2x MDRT (2023, 2027)', 'MBA 2023', 'Manulife Pro Bạch Kim', 'M-Star 2026'],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/cam-huong.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/cam-huong-1.jpg',
        caption: 'Vinh danh hoàn thành tiêu chí danh hiệu quốc tế MDRT 2027 tại Khu vực HCM69',
      },
      {
        src: '/images/leaders/gallery/cam-huong-2.jpg',
        caption: 'Chinh phục vé tham dự Hành trình Ngôi Sao M-Star 2026 khám phá Thổ Nhĩ Kỳ',
      },
      {
        src: '/images/leaders/gallery/cam-huong-3.jpg',
        caption: 'Cùng SRD Khánh Vân và các đồng đội tại sự kiện tổng kết kinh doanh Manulife Plaza',
      },
    ],
  },
  {
    id: 'hong-khanh',
    index: '44',
    displayName: 'Hồng Khánh',
    fullName: 'Văn Thụy Hồng Khánh',
    roleBadge: 'MDRT',
    roleTitle: 'Chuyên viên Tư vấn Tài chính Cấp cao',
    tierKey: 'ADVISOR',
    tierLabel: 'Cố vấn Cấp cao & MDRT',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • 6 năm gắn bó cùng nghề',
    industryKey: 'HR_EDU',
    priorBackgroundShort: 'Nguyên Quản lý Nhân sự (HR Manager)',
    priorBackgroundFull: 'Nguyên Quản lý Nhân sự (Human Resources Manager) doanh nghiệp',
    teamScaleBadge: '2x MDRT • FC Platinum',
    highlightNote: '2 năm liên tiếp đạt chuẩn quốc tế MDRT • FC Platinum • Quản lý MBA',
    quote: 'Tư vấn tận tâm.',
    cardSummary:
      'Từ nền tảng Quản lý Nhân sự giàu sự lắng nghe đến cột mốc 2 năm liên tiếp đạt MDRT trong môi trường hỗ trợ không vụ lợi tại HCM69.',
    editorialBio: [
      'Giai đoạn 2020–2021 với nhiều biến động của đại dịch đã khiến Hồng Khánh (khi ấy đang công tác ở vị trí Quản lý Nhân sự) nhìn nhận sâu sắc hơn về tính dự phòng trước rủi ro cuộc sống. Từ lời chia sẻ của một người đồng nghiệp cũ, chị quyết định mở lòng tìm hiểu bài bản và trao cho bản thân cơ hội bước vào lĩnh vực hoạch định bảo hiểm nhân thọ.',
      'Trải qua các chương trình huấn luyện chuyên sâu tại Khu vực HCM69, Hệ thống Vùng Khánh Vân, sự nhiệt huyết, tinh thần nâng đỡ nhau không vụ lợi và trên hết là chữ “TÂM” làm nghề của tập thể lãnh đạo đã thuyết phục chị chọn nơi đây làm sự nghiệp gắn bó lâu dài, liên tiếp chinh phục các cột mốc MDRT và FC Platinum.',
    ],
    badges: ['2x MDRT', 'FC Platinum', 'MBA', 'Quản lý Xuất sắc'],
    specialties: [
      'Bảo vệ Trụ cột Gia đình',
      'Hoạch định Hưu trí & Học vấn',
      'Chăm sóc Sức khỏe Cao cấp',
    ],
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
    index: '45',
    displayName: 'Xuân Sương',
    fullName: 'Dương Thị Xuân Sương',
    roleBadge: 'MBA',
    roleTitle: 'Chuyên viên Tư vấn & Quản lý MBA',
    tierKey: 'ADVISOR',
    tierLabel: 'Cố vấn Cấp cao & MBA',
    unitCode: 'HCM69',
    directLeader: 'SDM Nguyễn Thị Phượng',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • Hơn 12 năm Mua hàng Quốc tế & XNK',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: 'Hơn 12 năm Mua hàng Quốc tế, XNK & Logistics',
    priorBackgroundFull:
      'Hơn 12 năm kinh nghiệm Chuyên viên Cung ứng, Mua hàng Nước ngoài & Xuất nhập khẩu & Logistics',
    teamScaleBadge: 'MBA Pro • FC 2023',
    highlightNote:
      '1 trong 2 Quản lý thăng tiến 2 cấp trong 1 năm (2023) • Quản lý MBA • FC 2023',
    quote:
      'Làm đúng, đủ ngay từ ban đầu để lúc nào cũng hạnh phúc và ăn ngon, ngủ yên.',
    cardSummary:
      'Đi qua biến cố sức khỏe dồn dập của gia đình năm 2021, chọn dấn thân làm người tư vấn vừa có tâm vừa vững nghiệp vụ để bảo vệ nhiều mái ấm hơn.',
    editorialBio: [
      'Năm 2021 giữa cao điểm dịch COVID-19, biến cố ập đến dồn dập với gia đình Xuân Sương khi mẹ mắc bệnh hiểm nghèo, em gái phát hiện u não và cháu nhỏ chào đời gặp vấn đề hô hấp nặng. Cuộc trò chuyện trực tuyến cùng chị Khánh Vân giữa giai đoạn ấy giúp chị bừng tỉnh về giá trị thực sự của bảo hiểm y tế và nhân thọ, đồng thời nhận ra rằng khi tỷ lệ người dân có bảo hiểm tại Việt Nam còn khiêm tốn, xã hội rất cần những tư vấn viên vừa có tâm sáng vừa vững chuyên môn.',
      'Khép lại hơn 12 năm làm Mua hàng Quốc tế và Xuất nhập khẩu để chủ động thời gian chăm sóc mẹ và gia đình, Xuân Sương tìm thấy ở Khu vực HCM69 một mái nhà yêu thương, kỷ luật và chuẩn chỉnh. Năm 2023, chị ghi dấu ấn trở thành một trong hai quản lý thăng tiến hai cấp bậc trong cùng một năm, nhưng điều khiến chị hạnh phúc nhất vẫn là sự bình an “ăn ngon, ngủ yên” khi luôn tư vấn đúng, đủ và xem khách hàng như ruột thịt.',
    ],
    badges: ['MBA Pro', 'FC 2023', 'Quản lý Xuất sắc'],
    specialties: ['Bảo vệ Trụ cột Gia đình', 'Chăm sóc Y tế & Bệnh Lý Nghiêm Trọng'],
    portrait: '/images/leaders/xuan-suong.jpg',
    gallery: [],
  },
  {
    id: 'thuy-duong',
    index: '46',
    displayName: 'Thuỳ Dương',
    fullName: 'Tôn Nữ Thuỳ Dương',
    roleBadge: 'SFA',
    roleTitle: 'Chuyên viên Tư vấn Tài chính Cấp cao',
    tierKey: 'ADVISOR',
    tierLabel: 'Cố vấn Tài chính Cấp cao',
    unitCode: 'SG169',
    directLeader: 'SM Huyền Trang',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • 5 năm BHNT & 3 năm Biên phiên dịch BH',
    industryKey: 'LAW_MED_INS',
    priorBackgroundShort: '3 năm Biên phiên dịch chuyên ngành Bảo hiểm Phi nhân thọ',
    priorBackgroundFull:
      '3 năm Biên phiên dịch chuyên ngành Bảo hiểm Phi nhân thọ • Chứng nhận Quốc tế MFA (LIMRA)',
    teamScaleBadge: 'Chứng nhận MFA (LIMRA)',
    highlightNote: 'Manulife Pro • Sở hữu Chứng nhận Cố vấn Tài chính Quốc tế MFA (LIMRA)',
    quote: 'Tư vấn tận tâm, làm nghề chuẩn mực.',
    cardSummary:
      'Thấm thía nỗi vất vả mất đi người trụ cột kinh tế từ năm cấp 2, kết hợp 3 năm dịch thuật bảo hiểm để theo đuổi nghề cố vấn chuẩn quốc tế LIMRA.',
    editorialBio: [
      'Ngay từ khi còn là một cô học trò cấp 2, Tôn Nữ Thuỳ Dương đã sớm trải qua và thấu hiểu nỗi mất mát, chật vật của một gia đình khi thiếu vắng người trụ cột kinh tế. Trải nghiệm đời thực ấy cùng 3 năm làm Biên phiên dịch trong ngành bảo hiểm phi nhân thọ khiến chị tin chắc rằng bảo hiểm nhân thọ không phải một lựa chọn xa xỉ, mà là tấm khiên thiết yếu cho những người mình yêu thương.',
      'Lựa chọn Manulife và Khu vực SG169, Vùng Khánh Vân từ năm 2022 vì nền tảng đào tạo bài bản, Thuỳ Dương chinh phục danh hiệu Manulife Pro cùng Chứng nhận Quốc tế MFA do tổ chức LIMRA cấp, kiên định phục vụ khách hàng bằng sự tận tâm và chuẩn mực chuyên môn cao nhất.',
    ],
    badges: ['Chứng nhận MFA (LIMRA)', 'Manulife Pro', '8 Năm Ngành Bảo Hiểm'],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
    ],
    portrait: '/images/leaders/thuy-duong.jpg',
    gallery: [],
  },
  {
    id: 'tam-nguyen',
    index: '47',
    displayName: 'Tâm Nguyễn',
    fullName: 'Nguyễn Thị Ngọc Tâm',
    roleBadge: 'MPRO',
    roleTitle: 'Chuyên viên Hoạch định Tài chính',
    tierKey: 'ADVISOR',
    tierLabel: 'Chuyên viên Tài chính',
    unitCode: 'SG169',
    directLeader: 'SUM Bùi Phước Ngoan • SM Huyền Trang',
    joinedYear: '2025',
    tenureLabel: 'Gia nhập 2025 • Controller Maersk & 3 năm tại Nhật Bản',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: 'Nguyên Kế toán trưởng • Controller LF Logistics (Maersk) • 3 năm tại Nhật',
    priorBackgroundFull:
      'Nguyên Kế toán trưởng Công ty GDV • Financial Controller tại LF Logistics (Tập đoàn Maersk) • Supervisor Circle K • 3 năm học tập & sinh sống tại Nhật Bản',
    teamScaleBadge: 'Top 10 Toàn quốc 12/2025',
    highlightNote: 'Manulife Pro Vàng • Top 10 Đại lý mới xuất sắc toàn quốc ngay tháng đầu hoạt động (12/2025)',
    quote: 'Làm Đúng Trước, Làm Giỏi Sau.',
    cardSummary:
      'Từng là Financial Controller tại tập đoàn Maersk và 3 năm sống tại Nhật Bản, bứt phá lọt Top 10 Toàn quốc ngay tháng đầu gia nhập SG169.',
    editorialBio: [
      'Sở hữu hồ sơ chuyên môn ấn tượng, từng sống và học tập 3 năm tại Nhật Bản, giữ vị trí Kế toán trưởng doanh nghiệp và Financial Controller tại LF Logistics (thuộc Tập đoàn vận tải biển toàn cầu Maersk), Nguyễn Thị Ngọc Tâm cơ duyên gặp gỡ Giám đốc Khu vực Huyền Trang trong một buổi thăm khám sức khỏe định kỳ.',
      'Từ ý định ban đầu chỉ là tìm hiểu thêm kiến thức Luật Kinh doanh Bảo hiểm, môi trường làm việc thân thiện và văn hóa “Làm đúng trước, làm giỏi sau” tại SG169 đã cuốn hút chị dấn thân thực thụ. Vận dụng tư duy kiểm soát tài chính sắc bén vào từng bản hoạch định bảo vệ trụ cột, Tâm Nguyễn xuất sắc đạt Manulife Pro Vàng và lọt Top 10 Tư vấn viên mới tiêu biểu toàn quốc ngay trong tháng đầu tiên hoạt động.',
    ],
    badges: ['Top 10 Tân Binh Toàn Quốc', 'Manulife Pro Vàng', 'Cựu Controller Maersk'],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
    ],
    portrait: '/images/leaders/tam-nguyen.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/tam-nguyen-1.jpg',
        caption: 'Chuyên viên Hoạch định Tài chính Nguyễn Thị Ngọc Tâm tại văn phòng Manulife',
      },
      {
        src: '/images/leaders/gallery/tam-nguyen-2.jpg',
        caption: 'Vinh danh thành tích Manulife Pro Vàng và Top 10 Toàn quốc tháng đầu hoạt động',
      },
      {
        src: '/images/leaders/gallery/tam-nguyen-3.jpg',
        caption: 'Đồng hành cùng đội ngũ Khu vực SG169, Hệ thống Vùng Khánh Vân',
      },
    ],
  },
  {
    id: 'huong-giang',
    index: '48',
    displayName: 'Nguyễn Hương Giang',
    fullName: 'Nguyễn Thị Hương Giang',
    roleBadge: 'FA',
    roleTitle: 'Chuyên viên Tư vấn Tài chính Bảo hiểm',
    tierKey: 'ADVISOR',
    tierLabel: 'Chuyên viên Tài chính',
    unitCode: 'SG169',
    directLeader: 'SM Huyền Trang',
    joinedYear: '2024',
    tenureLabel: 'Gia nhập 2024 • 7 năm Thẩm định Ngân hàng & 11 năm Doanh nghiệp',
    industryKey: 'BANKING',
    priorBackgroundShort: '7 năm Thẩm định Tài chính Ngân hàng • 11 năm Doanh nghiệp',
    priorBackgroundFull:
      '7 năm Chuyên viên Thẩm định Tài chính Ngân hàng • 11 năm kinh nghiệm làm việc tại Doanh nghiệp',
    teamScaleBadge: '7 năm Thẩm định Ngân hàng',
    highlightNote:
      '18 năm nền tảng Thẩm định Tài chính Ngân hàng & Doanh nghiệp • Thấu hiểu giá trị bảo hiểm từ trải nghiệm bồi thường thực tế',
    quote: 'Bảo hiểm tử tế: lấy sự tử tế và văn minh làm tôn chỉ sống và làm nghề.',
    cardSummary:
      'Sau 18 năm làm thẩm định ngân hàng và doanh nghiệp cùng 2 lần trực tiếp nhận quyền lợi bồi thường cho gia đình, chọn lan tỏa giá trị bảo hiểm tử tế tại SG169.',
    editorialBio: [
      'Có nền tảng 7 năm làm Chuyên viên Thẩm định Tài chính tại ngân hàng cùng 11 năm làm việc trong môi trường doanh nghiệp, Nguyễn Thị Hương Giang vốn quen đánh giá mọi kế hoạch tài chính bằng con số thực chất. Bước ngoặt đưa chị đến với nghề tư vấn bắt đầu từ trải nghiệm rất thật của chính mình: sau hai lần bản thân và gia đình trực tiếp nhận quyền lợi chi trả bồi thường y tế, chị cảm nhận trọn vẹn giá trị điểm tựa mà bảo hiểm mang lại đúng lúc cần nhất.',
      'Gia nhập Khu vực SG169 cùng Giám đốc Khu vực Huyền Trang thuộc Vùng Khánh Vân từ năm 2024, Hương Giang tìm thấy sự đồng điệu sâu sắc nơi tập thể đặt hai chữ “Bảo hiểm tử tế” làm kim chỉ nam dẫn dắt đội nhóm, gắn liền với tôn chỉ sống tử tế và văn minh mà chị luôn gìn giữ.',
    ],
    badges: ['7 Năm Thẩm Định Ngân Hàng', '11 Năm Doanh Nghiệp', 'Khu vực SG169'],
    specialties: [
      'Hoạch định Hưu trí & Học vấn',
      'Bảo vệ Trụ cột Gia đình',
      'Chăm sóc Sức khỏe Cao cấp',
      'Xây dựng & Đào tạo Đội ngũ',
    ],
    portrait: '/images/leaders/huong-giang.jpg',
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
    title: 'Họp điều hành cùng đội ngũ quản lý các khu vực',
    subtitle:
      'Mỗi định hướng tư vấn và tiêu chuẩn chăm sóc khách hàng đều được thống nhất từ Ban Điều Hành đến từng khu vực.',
    spanClass: 'md:col-span-7',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'dao-tao-thuc-chien',
    src: '/images/PhongDaoTao_ChiVan_ChiaSeTruyenLua.jpg',
    tag: 'HUẤN LUYỆN NGHIỆP VỤ',
    title: 'Đào tạo chuyên sâu từ điều khoản pháp lý đến hoạch định dòng tiền',
    subtitle:
      'Văn hóa rèn nghề thực chất giúp mỗi tư vấn viên tự tin giải thích rõ ràng từng trang hợp đồng cho khách hàng.',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/3] md:aspect-auto md:h-full',
  },
  {
    id: 'co-van-ke-can',
    src: '/images/VanPhong_ChiVanCungNhomQuanLy_SofaBenCuaSoViewDep.jpg',
    tag: 'ĐỒNG HÀNH KẾ CẬN',
    title: 'Đồng hành sát sao cùng thế hệ quản lý trẻ',
    subtitle:
      'Trao truyền kinh nghiệm quản trị và cách xây dựng đội ngũ bền vững ngay tại không gian làm việc Manulife Plaza.',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'thao-luan-giai-phap',
    src: '/images/VanPhong_NhomQuanLy_ThaoLuanTaiLieuThucChien.jpg',
    tag: 'CHUẨN MỰC TƯ VẤN',
    title: 'Cùng rà soát giải pháp trước khi trao đến gia đình khách hàng',
    subtitle:
      'Làm việc tập thể giúp mọi phương án bảo vệ được đối chiếu cẩn trọng với thu nhập và nhu cầu thực tế của từng gia đình.',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'vinh-danh-top1',
    src: '/images/SanKhau_ChiVan_ManHinhLED_Top1FYP2025.jpg',
    tag: 'DẤU ẤN QUÁN QUÂN',
    title: 'Hai giải Top 1 toàn quốc 2025: Kết quả tự nhiên của sự tử tế',
    subtitle:
      'Dẫn đầu toàn quốc cả về Doanh số FYP lẫn Tỷ lệ Duy trì Hợp đồng là minh chứng khách quan cho niềm tin của hàng nghìn gia đình.',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]',
  },
];
