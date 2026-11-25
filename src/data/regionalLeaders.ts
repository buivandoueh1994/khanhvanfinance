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
      'Đơn vị đặt nền cho văn hóa “Làm đúng trước, làm giỏi sau” từ năm 2018. Trực thuộc SRD Khánh Vân, gồm các Trưởng Phòng Kinh doanh Cấp cao (SDM), Trưởng Phòng Kinh doanh (DM), Trưởng Nhóm Kinh doanh và nhiều MDRT lâu năm.',
    isCore: true,
  },
  {
    code: 'MN111',
    title: 'Khu Vực Kinh Doanh MN111',
    subtitle: 'Trực thuộc Green Power Group',
    leadName: 'Ngân Vũ',
    leadRole: 'Giám đốc Khu vực Cấp cao (PSSM)',
    leadPortrait: '/images/leaders/avatars/ngan-vu.jpg',
    scaleBadge: 'Khu vực Cấp cao',
    description:
      'Khu vực trực thuộc Green Power Group, phát triển đội ngũ tư vấn tài chính chuyên nghiệp với kỷ luật đào tạo bài bản và cam kết đồng hành lâu dài cùng khách hàng.',
  },
  {
    code: 'SG168',
    title: 'Khu Vực Kinh Doanh SG168',
    subtitle: 'Trực thuộc Green Power Group',
    leadName: 'Đào Minh Phương',
    leadRole: 'Giám đốc Khu vực (SM)',
    leadPortrait: '/images/leaders/avatars/dao-minh-phuong.jpg',
    leadProfileId: 'dao-minh-phuong',
    scaleBadge: 'Đội ngũ đa ngành',
    description:
      'Đội ngũ quản lý có kinh nghiệm từ Kế toán, Kiểm toán, Ngân hàng, Quản trị Nhân sự, Đào tạo và Bồi thường bảo hiểm, cùng dìu dắt đồng đội từng bước.',
  },
  {
    code: 'SG169',
    title: 'Khu Vực Kinh Doanh SG169',
    subtitle: 'Trực thuộc Green Power Group',
    leadName: 'Trương Thị Huyền Trang',
    leadRole: 'Giám đốc Khu vực (SM)',
    leadPortrait: '/images/leaders/avatars/huyen-trang.jpg',
    leadProfileId: 'huyen-trang',
    scaleBadge: 'Chuẩn mực Ngân hàng',
    description:
      'Khởi đầu từ kỷ luật của một Kiểm soát viên ngân hàng, khu vực xây dựng môi trường bảo hiểm xanh, sạch, đẹp, nơi mỗi tư vấn viên đều vững nền tảng pháp lý và làm nghề vì khách hàng.',
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
        subNote: 'Trưởng Phòng Cấp cao • Trực thuộc SRD Khánh Vân',
        children: [
          {
            name: 'Nguyễn Thị Trà My',
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
        subNote: 'Trưởng Phòng Cấp cao • Trực thuộc SRD Khánh Vân',
        children: [
          {
            name: 'Lê Thị Bích Tiền',
            role: 'DM',
            avatar: '/images/leaders/avatars/bich-tien.jpg',
            leaderId: 'bich-tien',
            subNote: 'MBA Pro Bạch Kim • GAMA Global',
          },
        ],
      },
      {
        name: 'Hồ Thị Diễm Ly',
        role: 'SDM',
        avatar: '/images/leaders/avatars/diem-ly.jpg',
        leaderId: 'diem-ly',
        subNote: 'MDRT • MBA Pro • Trực thuộc SRD Khánh Vân',
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
        name: 'Lê Thị Huyên',
        role: 'SDM',
        avatar: '/images/leaders/avatars/le-huyen.jpg',
        leaderId: 'le-huyen',
        subNote: 'Từ 2018 • MDRT • FC • MBA',
      },
      {
        name: 'Nguyễn Thị Minh Kiều',
        role: 'DM',
        avatar: '/images/leaders/avatars/kieu-nguyen.jpg',
        leaderId: 'kieu-nguyen',
        subNote: 'Đại sứ MDRT 2026',
      },
      {
        name: 'Trần Thị Đào',
        role: 'SUM',
        avatar: '/images/leaders/avatars/tran-dao.jpg',
        leaderId: 'tran-dao',
        subNote: '3x MDRT • 3x MBA Pro',
      },
      {
        name: 'Trần Thị Loan',
        role: 'SUM',
        avatar: '/images/leaders/avatars/loan-tran.jpg',
        leaderId: 'loan-tran',
        subNote: '3x MDRT • MBA Pro',
      },
      {
        name: 'Nguyễn Ngọc Dương Quỳnh',
        role: 'UM',
        avatar: '/images/leaders/avatars/duong-quynh.jpg',
        leaderId: 'duong-quynh',
        subNote: 'MDRT • Chứng chỉ LIMRA',
      },
    ],
    moreCountNote:
      'Cùng các quản lý SUM & UM trực thuộc HCM69 (Nguyễn Thị Ngọc Đầy, Lương Thị Thanh Huyền, Nguyễn Thị Hoa, Nguyễn Thanh Thiên Vân, Tằng Thị Hoài Linh, Nguyễn Cao Tường Dung, Bùi Thị Thu Thảo, Lê Thị Cẩm Hương, Hà Đỗ, Vũ Thị Ngọc Anh...)',
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
        name: 'Võ Thị Thùy Liêm',
        role: 'SDM',
        avatar: '/images/leaders/avatars/thuy-liem.jpg',
        leaderId: 'thuy-liem',
        subNote: 'MDRT • MBA Pro Bạch Kim',
        children: [
          {
            name: 'Nguyễn Thị Thiên Thanh',
            role: 'SUM',
            avatar: '/images/leaders/avatars/thien-thanh.jpg',
            leaderId: 'thien-thanh',
            subNote: 'MBA Pro • 22 năm Kế toán trưởng',
            children: [
              {
                name: 'Nguyễn Thị Vân',
                role: 'SUM',
                avatar: '/images/leaders/avatars/van-nguyen.jpg',
                leaderId: 'van-nguyen',
                subNote: '19 năm Trưởng phòng Nhân sự',
              },
            ],
          },
          {
            name: 'Dương Thị Thanh Hoa',
            role: 'SUM',
            avatar: '/images/leaders/avatars/duong-thanh-hoa.jpg',
            leaderId: 'duong-thanh-hoa',
            subNote: '15 năm Ngân hàng • MDRT',
          },
        ],
      },
      {
        name: 'Nguyễn Tố Anh Thơ',
        role: 'SUM',
        avatar: '/images/leaders/avatars/anh-tho.jpg',
        leaderId: 'anh-tho',
        subNote: '10 năm Trainer • Manulife Pro Vàng',
      },
    ],
    moreCountNote:
      'Cùng các nhóm UM Vũ Thị Nhuần, Băng Tâm, Nguyễn Ngọc Trâm, Trần Xuân Mai...',
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
        name: 'Hoàng Thị Kim Thuý',
        role: 'SDM',
        avatar: '/images/leaders/avatars/hoang-thuy.jpg',
        leaderId: 'hoang-thuy',
        subNote: 'MDRT • MBA Vàng',
        children: [
          {
            name: 'Nguyễn Thị Bé',
            role: 'DM',
            avatar: '/images/leaders/avatars/be-nguyen.jpg',
            leaderId: 'be-nguyen',
            subNote: '2x MBA Pro • 12 năm HCNS',
            children: [
              {
                name: 'Nguyễn Thị Huyền',
                role: 'SUM',
                avatar: '/images/leaders/avatars/huyen-nguyen.jpg',
                leaderId: 'huyen-nguyen',
                subNote: 'Nền tảng Luật sư',
              },
              {
                name: 'Dương Thị Lên',
                role: 'UM',
                avatar: '/images/leaders/avatars/duong-len.jpg',
                leaderId: 'duong-len',
                subNote: 'MDRT • 8 năm Ngân hàng',
              },
            ],
          },
        ],
      },
      {
        name: 'Lê Bảo Trâm',
        role: 'SUM',
        avatar: '/images/leaders/avatars/tram-le.jpg',
        leaderId: 'tram-le',
        subNote: '15 năm Tập đoàn Nhật Bản',
      },
      {
        name: 'Huỳnh Thị Tiên',
        role: 'UM',
        avatar: '/images/leaders/avatars/tien-tien.jpg',
        leaderId: 'tien-tien',
        subNote: 'Quản lý Xuất sắc',
      },
      {
        name: 'Đỗ Thị Kim Thi',
        role: 'UM',
        avatar: '/images/leaders/avatars/kim-thi.jpg',
        leaderId: 'kim-thi',
        subNote: '13 năm Kế toán, Tài chính',
      },
    ],
    moreCountNote:
      'Cùng các nhánh SUM Bùi Phước Ngoan, UM Sen Nguyễn, UM Thuỳ Dương, UM Tâm Nguyễn, UM Nguyễn Hương Giang...',
  },
];

export const REGIONAL_LEADERS: RegionalLeader[] = [
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
    priorBackgroundFull: 'Chuyên môn Kế toán doanh nghiệp • Quản trị và phát triển đội ngũ kinh doanh',
    teamScaleBadge: 'Giám đốc Khu vực SG168',
    highlightNote: 'MDRT & MBA nhiều năm liền • Dẫn dắt Khu vực SG168 từ năm 2020',
    quote: 'Muốn có điều mà mình chưa bao giờ có, hãy dám làm những việc mình chưa bao giờ làm.',
    cardSummary:
      'Chị từng là khách hàng chủ động hẹn gặp chị Khánh Vân để tham gia bảo hiểm cho gia đình. Nay chị trực tiếp điều hành Khu vực SG168.',
    editorialBio: [
      'Đào Minh Phương đến với nghề bảo hiểm từ chuyện rất đời thường. Chị biết chị Khánh Vân qua một hội nhóm tìm trường học cho con, theo dõi trang cá nhân rồi chủ động hẹn gặp để làm hợp đồng bảo vệ cho gia đình. Buổi tư vấn chỉn chu hôm đó khiến chị muốn tìm hiểu sâu hơn về nghề hoạch định tài chính.',
      'Sau hơn 6 năm làm nghề từ tháng 03/2020, Giám đốc Khu vực Đào Minh Phương trực tiếp điều hành Khu vực SG168, đạt các danh hiệu MDRT, MBA và nhiều chuyến thưởng quốc tế. Với khách hàng, chị tâm niệm: “Trước kia khi là khách hàng mình mong gặp một người tư vấn tận tâm thế nào, thì hôm nay hãy mang đúng điều đó trao cho khách hàng”. Với đội ngũ, chị kiên trì chia nhỏ mục tiêu và theo sát từng bước để đồng đội luôn có điểm tựa phía sau.',
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
    tenureLabel: 'Gia nhập 07/2020 • 7 năm Tài chính, Ngân hàng và Bảo hiểm',
    industryKey: 'BANKING',
    priorBackgroundShort: 'Nguyên Kiểm soát viên Ngân hàng',
    priorBackgroundFull: 'Nguyên Kiểm soát viên Ngân hàng • Chuyên gia phát triển đội ngũ Quản lý kế cận',
    teamScaleBadge: 'Giám đốc Khu vực SG169',
    highlightNote: 'Đạt chuẩn quốc tế MDRT ngay trong tháng làm việc đầu tiên • MDRT & MBA nhiều năm liên tục',
    quote: 'Dẫn dắt bằng tâm, xây dựng bằng tầm.',
    cardSummary:
      'Từ câu hỏi của người hàng xóm cũ Khánh Vân ở tuổi 30, chị trở thành Giám đốc Khu vực SG169, xây dựng môi trường bảo hiểm xanh, sạch, chuẩn mực.',
    editorialBio: [
      'Năm 30 tuổi, chị là Kiểm soát viên ngân hàng nhưng khó cân bằng giữa công việc và con nhỏ, nên Huyền Trang đã có lúc lùi lại để dành thời gian cho gia đình. Rồi chị Khánh Vân, người hàng xóm cũ, hỏi: “Em định kết thúc thanh xuân của mình ở tuổi 30 sao Trang?” Câu hỏi đó khiến chị tìm hiểu cơ hội tại Manulife, nơi vừa chủ động được thời gian bên con, vừa phát triển sự nghiệp độc lập.',
      'Ngay trong tháng làm việc đầu tiên, Huyền Trang đạt danh hiệu quốc tế MDRT, và nhiều năm sau đó vẫn giữ chuỗi MDRT & MBA liên tục. Trên cương vị Giám đốc Kinh doanh Khu vực SG169, chị theo triết lý “Làm đúng trước, làm giỏi sau”. Chị muốn phát triển thế hệ giám đốc kế cận, để ai gặp gỡ cũng hiểu đúng giá trị của bảo hiểm nhân thọ.',
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
        caption: 'Dấu ấn trên hành trình xây dựng hệ sinh thái bảo hiểm chuẩn mực cùng Green Power Group',
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
    tenureLabel: 'Gia nhập 2021 • 11 năm Kế toán, Kiểm toán',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: 'Nguyên Trưởng phòng Tài chính • 11 năm Kế toán, Kiểm toán',
    priorBackgroundFull: 'Nguyên Trưởng phòng Tài chính doanh nghiệp • 11 năm kinh nghiệm Kế toán, Kiểm toán',
    teamScaleBadge: 'SDM • Khu vực SG168',
    highlightNote: 'MDRT 2023 • MBA 2023 & MBA 2025 • Manulife Pro Bạch Kim',
    quote: 'Đến với khách hàng bằng sự chân thành, cung cấp thông tin đúng, đủ, chuẩn chỉnh.',
    cardSummary:
      'Chị mang tư duy của một Trưởng phòng Tài chính với 11 năm Kế toán, Kiểm toán vào việc hoạch định bảo vệ gia đình và phát triển phòng kinh doanh tại SG168.',
    editorialBio: [
      'Chị từng là Trưởng phòng Tài chính với 11 năm làm Kế toán, Kiểm toán. Võ Thị Thùy Liêm biết đến Manulife qua người đồng nghiệp cũ tại công ty kiểm toán, nay là Giám đốc Khu vực Đào Minh Phương.',
      'Nền tảng kiểm toán khiến chị làm mỗi bản kế hoạch tài chính cá nhân theo hướng minh bạch, chính xác và đủ thông tin. Chị có loạt danh hiệu MDRT, MBA nhiều năm và Manulife Pro Bạch Kim. Chị trân trọng văn hóa cho đi, sự đồng hành sát sao và nguồn năng lượng có tâm, có tầm từ Giám đốc Vùng Cấp cao Khánh Vân.',
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
    tierLabel: 'Trưởng Phòng Cấp cao',
    isSeniorLeadership: true,
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2018',
    tenureLabel: 'Gia nhập 2018 • 8 năm tại Manulife & 5 năm Kế toán',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: 'Cử nhân Kế toán, Kiểm toán (ĐH Kinh tế - Luật)',
    priorBackgroundFull:
      'Cử nhân Kế toán, Kiểm toán (ĐH Kinh tế - Luật) • 5 năm Kế toán tổng hợp doanh nghiệp',
    teamScaleBadge: 'Thế hệ Nền móng 2018',
    highlightNote: 'Đủ bộ 3 danh hiệu: MDRT, FC, MBA Pro',
    quote: 'Xây dựng cuộc sống vững vàng bằng tài chính thông minh.',
    cardSummary:
      'Chị có 5 năm làm việc với bảng cân đối doanh nghiệp, rồi 8 năm hoạch định dòng tiền an toàn cho từng cá nhân, gắn bó từ những ngày đầu thành lập HCM69.',
    editorialBio: [
      'Lê Huyên tốt nghiệp chuyên ngành Kế toán, Kiểm toán tại Trường Đại học Kinh tế - Luật, làm kế toán tổng hợp 5 năm rồi vào Manulife từ năm 2018. Hai chặng nghề đều gắn với kỷ luật của những con số. Trước đây chị làm việc với báo cáo tài chính của doanh nghiệp và tập đoàn, còn 8 năm qua chị làm việc với dòng tiền của từng cá nhân và gia đình.',
      'Lê Huyên là một trong những quản lý gắn bó với Khu vực HCM69 thuộc Green Power Group từ giai đoạn đầu. Chị tin sự tỉ mỉ và chân thành là cách để đi lâu với khách hàng.',
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
    tierLabel: 'Trưởng Phòng Cấp cao',
    isSeniorLeadership: true,
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2019',
    tenureLabel: 'Gia nhập 2019 • 7 năm gắn bó và phát triển đội ngũ tại HCM69',
    industryKey: 'HR_EDU',
    priorBackgroundShort: 'Chuyên môn Quản trị Nhân sự (HR)',
    priorBackgroundFull: 'Chuyên gia Quản trị Nhân sự (Human Resources) • Phát triển nhiều nhánh quản lý tại HCM69',
    teamScaleBadge: 'Nhánh Quản lý Nòng cốt HCM69',
    highlightNote: 'MDRT • MBA Pro • Quản lý Xuất sắc • Phát triển các nhánh DM và UM vững mạnh',
    quote: 'Coi khách hàng như người thân trong gia đình.',
    cardSummary:
      'Chị bắt đầu từ năm 2019 vì muốn chủ động thời gian chăm sóc gia đình. Nay chị là một trong những Trưởng phòng trụ cột, phát triển nhiều thế hệ quản lý tại HCM69.',
    editorialBio: [
      'Xuất thân từ Quản trị Nhân sự (HR), Hồ Thị Diễm Ly đến với Manulife năm 2019 với mong muốn giản dị: có một nghề phát huy năng lực làm việc với con người mà vẫn chủ động thời gian chăm sóc gia đình.',
      'Suốt 7 năm làm việc trực tiếp cùng Giám đốc Vùng Cấp cao Khánh Vân tại Khu vực hạt nhân HCM69, Diễm Ly giữ nguyên tắc xem khách hàng như người thân. Chị đạt danh hiệu quốc tế MDRT và MBA Pro, đồng thời phát triển nhiều Trưởng phòng và Trưởng nhóm kinh doanh kế cận tại Green Power Group.',
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
    id: 'hoang-thuy',
    index: '06',
    displayName: 'Thuý Hoàng',
    fullName: 'Hoàng Thị Kim Thuý',
    roleBadge: 'SDM',
    roleTitle: 'Trưởng Phòng Kinh doanh Cấp cao',
    tierKey: 'DM',
    tierLabel: 'Trưởng Phòng Cấp cao',
    isSeniorLeadership: true,
    unitCode: 'SG169',
    directLeader: 'SM Trương Thị Huyền Trang',
    joinedYear: '2020',
    tenureLabel: 'Gia nhập 2020 • 10 năm kinh nghiệm Ngân hàng',
    industryKey: 'BANKING',
    priorBackgroundShort: '10 năm Kiểm soát viên Ngân hàng',
    priorBackgroundFull: '10 năm kinh nghiệm Kiểm soát viên tại hệ thống ngân hàng thương mại',
    teamScaleBadge: 'MDRT • MBA Vàng',
    highlightNote:
      'MDRT & MBA Vàng • Phát triển nhiều thế hệ quản lý kế cận tại SG169',
    quote: 'Những gì xuất phát từ trái tim sẽ đến được với trái tim.',
    cardSummary:
      'Chị rời vị trí Kiểm soát viên ngân hàng sau 10 năm để có thêm thời gian bên con. Hiện chị dẫn dắt đội ngũ và phát triển các quản lý kế cận tại SG169.',
    editorialBio: [
      'Sau 10 năm làm Kiểm soát viên ngân hàng, Hoàng Thị Kim Thuý tìm đến Manulife năm 2020 vì muốn cân bằng cuộc sống và có nhiều thời gian hơn bên con.',
      'Định hướng làm nghề đúng đắn từ Ban Lãnh đạo Vùng đến từng thành viên, cùng tinh thần tương trợ hết lòng, đã giúp chị phát triển. Hiện Thuý Hoàng trực tiếp dẫn dắt đội ngũ của mình, với nhiều trưởng phòng, quản lý, MBA Vàng, Manulife Pro Bạch Kim cùng các Manulife Pro Vàng/Bạc. Nguyên tắc của chị nhất quán: xem khách hàng và đồng đội như người thân, làm vì lợi ích của họ trước khi nghĩ đến mình.',
    ],
    badges: ['MDRT', 'MBA Vàng', 'Phát triển Quản lý Kế cận'],
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
      'Nguyên Quản lý tại hai ngân hàng quốc tế ANZ Bank và Shinhan Bank',
    teamScaleBadge: 'Đại sứ MDRT 2026',
    highlightNote:
      'MDRT 2022–2023 • FC Platinum 2022–2023 • MBA Pro 2022–2023 • Đại sứ MDRT 2026',
    quote:
      'Làm nghề tử tế, tư vấn chân thành, đồng hành có trách nhiệm. Vì phía sau mỗi hợp đồng là niềm tin và tương lai của cả một gia đình.',
    cardSummary:
      'Chị rời vị trí quản lý ngân hàng quốc tế ANZ và Shinhan để đi sâu hơn vào việc bảo vệ tài chính cho từng gia đình, bằng sự chân thành và kỷ luật chuyên môn.',
    editorialBio: [
      '“Đang làm quản lý ngân hàng ổn định, sao Kiều lại chuyển sang làm bảo hiểm?” là câu Kiều Nguyễn nghe nhiều nhất suốt hơn 6 năm qua. Thật ra, ở ngân hàng quốc tế ANZ, Shinhan hay ở Manulife, điều chị trân trọng nhất vẫn là lắng nghe và cùng khách hàng gỡ những bài toán thực tế của cuộc sống.',
      'Làm hoạch định bảo hiểm nhân thọ giúp chị hiểu rõ hơn từng gia đình: nỗi lo thầm lặng của người trụ cột, dự định dài hạn cho con cái và những điều họ cần giữ trước biến cố. Chị làm việc cùng chị Khánh Vân trong một tập thể đề cao sự tử tế, minh bạch và tinh thần học hỏi, và luôn đặt quyền lợi khách hàng lên trước doanh thu.',
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
        caption: 'Thảo luận chuyên môn cùng đội ngũ quản lý tại văn phòng Manulife',
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
      'Cử nhân Tài chính Doanh nghiệp (ĐH Kinh tế TP.HCM, UEH), Thạc sĩ • 11 năm Quản lý Chuỗi cung ứng (Procurement) • 4 năm Giảng viên đào tạo Mua hàng và Logistics',
    teamScaleBadge: 'MBA Pro Bạch Kim',
    highlightNote:
      'MBA Pro Bạch Kim • 2 năm liền đạt bộ ba MBA, MDRT, FC • Giải Lãnh đạo Thực chiến GAMA Global',
    quote:
      'Làm đúng, không ngừng nâng cao chuyên môn, để khách hàng và cộng sự có thể tin cậy.',
    cardSummary:
      'Chị có bằng Cử nhân Tài chính Doanh nghiệp UEH, bằng Thạc sĩ và 11 năm quản trị chuỗi cung ứng, nay xây dựng đội ngũ chất lượng cao tại HCM69.',
    editorialBio: [
      'Bích Tiền tốt nghiệp Cử nhân Tài chính Doanh nghiệp (UEH), có bằng Thạc sĩ, 11 năm quản lý vận hành, mua hàng (Procurement) và 4 năm giảng dạy nghiệp vụ Logistics. Chị vào Manulife tháng 10/2020 vì tin tưởng người quản lý trực tiếp và môi trường có nhiều đồng nghiệp giỏi ở các lĩnh vực khác nhau.',
      'Điều giữ chị ở lại Green Power Group là văn hóa chia sẻ kinh nghiệm chân thành, không tính toán. Chị đề cao uy tín đường dài, đạt danh hiệu MBA Pro Bạch Kim, 2 năm liên tiếp đạt bộ ba danh hiệu MBA, MDRT, FC và nhận Giải thưởng Lãnh đạo Thực chiến GAMA Global. Đội ngũ của chị có nhiều MBA Pro, Manulife Pro Vàng và Bạc.',
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
    displayName: 'Bé Nguyễn',
    fullName: 'Nguyễn Thị Bé',
    roleBadge: 'DM',
    roleTitle: 'Trưởng Phòng Kinh doanh',
    tierKey: 'DM',
    tierLabel: 'Trưởng Phòng Kinh doanh',
    isSeniorLeadership: true,
    unitCode: 'SG169',
    directLeader: 'SDM Hoàng Thị Kim Thuý • SM Trương Thị Huyền Trang',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • Hơn 12 năm Hành chính Nhân sự & 5 năm BHNT',
    industryKey: 'HR_EDU',
    priorBackgroundShort: 'Hơn 12 năm Trưởng phòng Hành chính Nhân sự',
    priorBackgroundFull: 'Hơn 12 năm kinh nghiệm Trưởng phòng Hành chính Nhân sự doanh nghiệp',
    teamScaleBadge: '2x MBA Pro Liên tiếp',
    highlightNote: '2 năm liên tiếp đạt danh hiệu MBA Pro • Nhà kiến tạo đội ngũ ưu tú tại Khu vực SG169',
    quote: 'Tận tâm, chuyên nghiệp, tư vấn đúng và đủ ngay từ đầu.',
    cardSummary:
      'Sau hơn 12 năm làm Trưởng phòng Nhân sự, chị đến với nghề chỉ vì muốn tìm hiểu bảo hiểm cho gia đình. Nay chị đã 2 năm liên tiếp đạt danh hiệu Nhà kiến tạo đội ngũ MBA Pro.',
    editorialBio: [
      'Sau hơn 12 năm làm Trưởng phòng Hành chính Nhân sự, Nguyễn Thị Bé đến với Manulife từ mong muốn tìm hiểu kỹ một giải pháp bảo vệ cho gia đình mình. Khi trực tiếp tiếp xúc với môi trường đào tạo và văn hóa chia sẻ không tính toán tại Green Power Group, chị nhận ra đây là sự nghiệp dài hạn mình tìm.',
      'Ngay từ đầu, bài học “Phải làm đúng trước, làm giỏi sau” đã là nguyên tắc nền của chị. Tư vấn đúng bản chất sản phẩm thì mới làm nghề bền được. Đây cũng là điều Bé Nguyễn truyền lại cho các tư vấn viên mới, trong 2 năm liên tiếp đạt danh hiệu MBA Pro.',
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
      'Chị gắn bó từ năm 3 đại học ở vai trò Trợ lý Giám đốc Vùng, rồi bước ra khỏi vùng an toàn để tự xây dựng phòng kinh doanh của mình.',
    editorialBio: [
      'Nguyễn Thị Trà My đến với Manulife từ năm 2022, khi còn là sinh viên năm 3 đại học, làm Thư ký kiêm Trợ lý Giám đốc Kinh doanh cho chị Khánh Vân. Ba năm làm ở hậu trường điều hành, Trà My được quan sát trực tiếp cách vận hành một tổ chức kinh doanh, cách người lãnh đạo rèn kỷ luật và truyền động lực cho đội ngũ.',
      'Sau đó chị bước ra khỏi vùng an toàn để làm nghề tư vấn và quản lý. Gần 2 năm qua, Trà My từng bước vượt qua bỡ ngỡ ban đầu, xây dựng đội ngũ riêng và lên Trưởng Phòng Kinh doanh tại HCM69. Chị tin bảo hiểm là chuyện xây niềm tin và giá trị lâu dài, hơn là một tờ hợp đồng.',
    ],
    badges: [
      'Trưởng Phòng Kinh doanh (DM)',
      'Quản trị & Vận hành Đội ngũ',
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
  {
    id: 'tran-dao',
    index: '11',
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
      'Thạc sĩ • 15 năm Giáo viên THPT môn Hóa học tại Trường THCS và THPT Đinh Thiện Lý (Quận 7)',
    teamScaleBadge: '3x MDRT • 3x MBA Pro',
    highlightNote: '3 lần đạt MDRT • 3 lần đạt MBA Pro • Thạc sĩ với 15 năm đứng lớp',
    quote: 'Rõ ràng tạo nên sức mạnh. Khi khách hàng thực sự hiểu mình cần gì, họ sẽ tự tin ra quyết định.',
    cardSummary:
      'Ở tuổi 35, chị khép lại 15 năm đứng lớp tại Trường Đinh Thiện Lý bằng một tin nhắn chủ động gửi chị Khánh Vân. Đến nay, các hợp đồng chị tư vấn đã giúp hàng chục gia đình nhận chi trả, có trường hợp lên đến 500 triệu đồng.',
    editorialBio: [
      'Sau 15 năm dạy Hóa học tại Trường Đinh Thiện Lý (Quận 7), Thạc sĩ Đào Trần gặp bước ngoặt ở tuổi 35 khi đọc một bài viết về nghề tư vấn. Muốn thử thách bản thân, chị chủ động nhắn tin cho chị Khánh Vân và bắt đầu làm việc tại HCM69 từ năm 2019.',
      'Mang cách nói mạch lạc của người làm sư phạm vào nghề tư vấn, Đào Trần tâm niệm “Rõ ràng tạo nên sức mạnh”. Chị kiên nhẫn lắng nghe để khách hàng tự thấy nhu cầu thật của gia đình. Điều chị vui nhất là khi bạn bè hay người thân gặp biến cố, thay vì chỉ thăm hỏi vài triệu đồng, các hợp đồng chị tư vấn đã kịp chi trả 10 triệu, 50 triệu đến 500 triệu đồng viện phí. Chị hiện làm việc cùng đội ngũ của mình theo hướng phát triển bền vững và chất lượng.',
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
    id: 'loan-tran',
    index: '12',
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
      '3 năm liên tiếp đạt chuẩn quốc tế MDRT (2024–2026) • Nhà kiến tạo đội ngũ ưu tú MBA',
    quote: 'Đặt lợi ích khách hàng làm trung tâm.',
    cardSummary:
      'Chị mang tư duy quản trị 12 năm từ Hyundai và Cargill vào việc xây dựng đội ngũ tư vấn chuẩn chỉnh, góp phần cho ngành bảo hiểm xanh tại Việt Nam.',
    editorialBio: [
      'Loan Trần có 12 năm trong lĩnh vực tài chính và điều hành doanh nghiệp, từng là Phó Giám đốc tại Hyundai và phụ trách chiến lược định giá tại Tập đoàn đa quốc gia Cargill. Chị đến với Manulife từ trải nghiệm thuyết phục khi còn là khách hàng.',
      'Tại Green Power Group, chị thấy những nhà tư vấn có trình độ thực chất, tư duy minh bạch và tinh thần chia sẻ. Chị đạt danh hiệu MDRT 3 năm liên tiếp (từ 2024 đến 2026) và xây dựng được một đội ngũ ưu tú. Chị theo đuổi các giải pháp tài chính chuẩn chỉnh, góp phần làm ngành bảo hiểm tại Việt Nam văn minh và bền vững hơn.',
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
        caption: 'Vinh danh cùng Ban Điều hành và đội ngũ tại sảnh vòm Manulife Plaza',
      },
      {
        src: '/images/leaders/gallery/loan-tran-2.jpg',
        caption: 'Dấu ấn chinh phục chuẩn quốc tế MDRT nhiều năm liên tiếp',
      },
    ],
  },
  {
    id: 'huyen-luong',
    index: '13',
    displayName: 'Huyền Lương',
    fullName: 'Lương Thị Thanh Huyền',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'HCM69',
    directLeader: 'SDM Minh Phượng • SRD Khánh Vân',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • Nền tảng Luật sư hành nghề',
    industryKey: 'LAW_MED_INS',
    priorBackgroundShort: 'Luật sư • Am hiểu pháp lý chuyên sâu',
    priorBackgroundFull: 'Luật sư • Chuyên gia rà soát điều khoản pháp lý và hoạch định bảo vệ gia đình',
    teamScaleBadge: 'Nền tảng Luật sư',
    highlightNote: 'Nền tảng Luật sư chuyên nghiệp • Dẫn dắt đội ngũ tại Khu vực HCM69',
    quote: 'Mỗi ngày tốt hơn 1% bằng sự thấu hiểu, tin tưởng và trách nhiệm.',
    cardSummary:
      'Chị xử lý hồ sơ pháp lý khi chị Khánh Vân là khách hàng của công ty luật. Sau 2 năm quan sát, chị quyết định về xây dựng đội ngũ tại HCM69.',
    editorialBio: [
      'Luật sư Lương Thị Thanh Huyền biết đến Green Power Group theo chiều ngược lại. Trước đây, chị Khánh Vân là khách hàng tại công ty của Huyền. Qua những buổi trực tiếp xử lý hồ sơ, phong thái chuẩn mực và lời mời chân thành của chị Vân tạo thiện cảm. Sau đúng 2 năm quan sát kỹ, Huyền quyết định gia nhập đội ngũ năm 2022.',
      'Với con mắt khắt khe của một Luật sư, điều Huyền Lương nể nhất ở HCM69 và Green Power Group là sự nhất quán hiếm có giữa lời nói trên truyền thông và việc làm thực tế, từ cách phối hợp nội bộ giữa các phòng ban đến sự minh bạch khi tư vấn và phục vụ khách hàng. Chị dẫn dắt đội ngũ của mình với ba giá trị: Thấu hiểu, Tin tưởng, Trách nhiệm.',
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
        caption: 'Khoảnh khắc gắn kết văn hóa tập thể tại Green Power Group',
      },
    ],
  },
  {
    id: 'thien-thanh',
    index: '14',
    displayName: 'Thiên Thanh',
    fullName: 'Nguyễn Thị Thiên Thanh',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'SG168',
    directLeader: 'SDM Võ Thị Thùy Liêm • SM Đào Minh Phương',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • 22 năm Tài chính, Kế toán',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: '22 năm Kế toán trưởng DN trong & ngoài nước',
    priorBackgroundFull: '22 năm kinh nghiệm Kế toán trưởng tại các doanh nghiệp trong và ngoài nước',
    teamScaleBadge: '22 năm Kế toán trưởng',
    highlightNote: 'MBA Pro • Quản lý Xuất sắc • Bề dày 22 năm Kế toán trưởng doanh nghiệp FDI và nội địa',
    quote: 'Tư vấn đúng nhu cầu, bảo vệ đủ giá trị, đồng hành đến cùng.',
    cardSummary:
      'Hơn hai thập kỷ làm Kế toán trưởng tại các công ty trong và ngoài nước, nay chị gắn bó với môi trường “Đúng, Đủ, Đều” giàu tình người của Green Power Group.',
    editorialBio: [
      'Có 22 năm làm Tài chính, Kế toán và giữ cương vị Kế toán trưởng tại nhiều doanh nghiệp trong và ngoài nước, Nguyễn Thị Thiên Thanh thấy hợp với Khu vực SG168 thuộc Green Power Group khi gia nhập từ năm 2022.',
      'Chị đề cao văn hóa làm nghề “Đúng, Đủ, Đều, Chuyên nghiệp” và sự quan tâm của Giám đốc Vùng Cấp cao Khánh Vân, người luôn nhớ thông tin và hoàn cảnh của từng thành viên để kịp thời nâng đỡ khi cần. Nền tảng đó giúp chị yên tâm xây dựng đội ngũ và đưa giải pháp bảo vệ phù hợp đến từng gia đình.',
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
        caption: 'Đồng hành cùng Ban Điều hành Green Power Group',
      },
    ],
  },
  {
    id: 'duong-thanh-hoa',
    index: '15',
    displayName: 'Dương Thanh Hoa',
    fullName: 'Dương Thị Thanh Hoa',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'SG168',
    directLeader: 'SDM Võ Thị Thùy Liêm • SM Đào Minh Phương',
    joinedYear: '2026',
    tenureLabel: '15 năm kinh nghiệm Tài chính, Ngân hàng',
    industryKey: 'BANKING',
    priorBackgroundShort: '15 năm Ngân hàng • Nguyên Trưởng nhóm Kiểm soát sau',
    priorBackgroundFull: '15 năm kinh nghiệm ngành Tài chính, Ngân hàng • Nguyên Trưởng nhóm Kiểm soát sau',
    teamScaleBadge: 'MDRT • MBA Pro',
    highlightNote: 'MDRT • MBA Pro • 15 năm kinh nghiệm kiểm soát nghiệp vụ ngân hàng',
    quote: 'Làm nghề bằng cái tâm, giữ nghề bằng chữ tín và đi đường dài bằng sự tử tế.',
    cardSummary:
      'Chị khép lại hơn 15 năm làm Trưởng nhóm Kiểm soát sau trong ngành ngân hàng để chọn nghề hoạch định bảo vệ gia đình, với chữ tín làm nền.',
    editorialBio: [
      'Sau hơn 15 năm trong ngành ngân hàng ở vị trí Trưởng nhóm Kiểm soát sau, Dương Thị Thanh Hoa từng nghĩ mình sẽ làm ngân hàng đến hết sự nghiệp. Nhưng qua những cuộc trò chuyện và hiểu thêm vai trò của bảo hiểm trước biến cố gia đình, chị vượt qua do dự ban đầu để bước sang hướng mới cùng Green Power Group.',
      'Giữ tác phong cẩn trọng của người làm kiểm soát ngân hàng, chị đặt ra bốn nguyên tắc: tư vấn đúng nhu cầu và vừa khả năng tài chính, tuyệt đối không hứa vượt quá điều khoản, không bao giờ vì doanh số mà đánh đổi lợi ích khách hàng, và luôn đồng hành cả trước lẫn sau khi hợp đồng phát hành.',
    ],
    badges: ['MDRT', 'MBA Pro', '15 Năm Ngân Hàng'],
    specialties: ['Bảo vệ Trụ cột Gia đình', 'Hoạch định Hưu trí & Học vấn'],
    portrait: '/images/leaders/duong-thanh-hoa.jpg',
    gallery: [],
  },
  {
    id: 'anh-tho',
    index: '16',
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
      '10 năm kinh nghiệm Phiên dịch viên, Giảng viên tiếng Tây Ban Nha, Trainer và Bất động sản',
    teamScaleBadge: 'Manulife Pro Vàng',
    highlightNote: 'Manulife Pro Vàng • Quản lý Xuất sắc Khu vực SG168',
    quote: 'Hãy làm ĐÚNG từ lúc bắt đầu.',
    cardSummary:
      'Chị từng dè dặt với bảo hiểm, cho đến sau biến cố gia đình. Nay chị là người quản lý truyền văn hóa “Làm ĐÚNG và làm có TÂM”.',
    editorialBio: [
      'Từng hơn 10 năm làm Phiên dịch viên, Giảng viên tiếng Tây Ban Nha và Chuyên gia đào tạo (Trainer), Anh Thơ thẳng thắn kể trước đây chị e ngại bảo hiểm. Bước ngoặt đến khi gia đình gặp biến cố và chị được Giám đốc Khu vực Đào Minh Phương đồng hành. Chị vừa trở thành khách hàng được bảo vệ tại Manulife, vừa tìm được hướng đi nghề nghiệp mới trong Green Power Group.',
      'Điều Anh Thơ tâm đắc nhất ở Green Power Group là lời chị Khánh Vân luôn nhắc cả đội: làm việc gì cũng phải “làm ĐÚNG và làm có TÂM”. Trong tư vấn, đó là tư vấn đúng nhu cầu và minh bạch đúng điều khoản sản phẩm. Trong phát triển đội ngũ, đó là tuyển đúng người và đi cùng họ đúng định hướng nghề nghiệp.',
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
        caption: 'Phong thái chuyên nghiệp của người làm công tác đào tạo và dẫn dắt đội ngũ',
      },
    ],
  },
  {
    id: 'nguyen-hoa',
    index: '17',
    displayName: 'Nguyễn Hoa',
    fullName: 'Nguyễn Thị Hoa',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'HCM69',
    directLeader: 'SDM Minh Phượng • SRD Khánh Vân',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • 15 năm ngành Điều dưỡng & 4 năm tại Manulife',
    industryKey: 'LAW_MED_INS',
    priorBackgroundShort: '15 năm công tác trong ngành Điều dưỡng',
    priorBackgroundFull: '15 năm kinh nghiệm chuyên môn Điều dưỡng tại cơ sở y tế',
    teamScaleBadge: '15 năm Y tế • Manulife Pro Vàng',
    highlightNote: 'Manulife Pro Vàng • 15 năm Điều dưỡng, hiểu rõ rủi ro sức khỏe',
    quote: 'Tư vấn chuẩn chỉnh, phục vụ bằng cái tâm.',
    cardSummary:
      'Chị mang sự tận tụy của 15 năm làm Điều dưỡng vào việc xây dựng tấm khiên tài chính y tế vững chắc cho các gia đình Việt.',
    editorialBio: [
      'Có 15 năm trực tiếp chăm sóc người bệnh trong ngành Điều dưỡng, Nguyễn Thị Hoa hiểu rõ gánh nặng viện phí và vì sao cần một tấm khiên tài chính y tế dự phòng khi biến cố sức khỏe xảy ra.',
      'Chị gia nhập Khu vực HCM69 của Manulife Việt Nam từ năm 2022, dưới sự dẫn dắt trực tiếp của chị Khánh Vân với phương châm “Làm đúng trước, làm giỏi sau”, và đi vững ngay từ ngày đầu. Chị đạt danh hiệu Manulife Pro Vàng và kiên trì giới thiệu giải pháp bảo vệ đúng và đủ đến từng gia đình.',
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
    index: '18',
    displayName: 'Trâm Lê',
    fullName: 'Lê Bảo Trâm',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'SG169',
    directLeader: 'SM Trương Thị Huyền Trang',
    joinedYear: '2025',
    tenureLabel: 'Gia nhập 2025 • 15 năm Tập đoàn Thương mại & Đầu tư Nhật Bản',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: '15 năm Tập đoàn Nhật Bản & Quản lý DN Xuất nhập khẩu',
    priorBackgroundFull:
      '15 năm làm việc tại các tập đoàn thương mại và đầu tư Nhật Bản • Quản lý doanh nghiệp gia đình về xuất nhập khẩu',
    teamScaleBadge: 'Chuẩn mực Nhật Bản',
    highlightNote: '15 năm tác phong Tập đoàn Nhật Bản • Trưởng Nhóm Kinh doanh Cấp cao SG169',
    quote: 'Luôn lắng nghe thấu đáo và đặt lợi ích dài hạn của khách hàng lên hàng đầu.',
    cardSummary:
      'Chị kết hợp kỷ luật tỉ mỉ sau 15 năm làm việc tại các tập đoàn đầu tư Nhật Bản với văn hóa biết ơn của Green Power Group.',
    editorialBio: [
      'Trâm Lê có 15 năm làm việc tại các tập đoàn thương mại, đầu tư của Nhật Bản và điều hành doanh nghiệp gia đình trong mảng xuất nhập khẩu. Chị ấn tượng với hệ thống đào tạo bài bản, chuẩn quốc tế của Manulife Việt Nam.',
      'Khi làm việc với Green Power Group tại Khu vực SG169, điều chị tâm đắc nhất là “văn hóa biết ơn” và sự tử tế giữa đồng đội. Trong mỗi cuộc tư vấn, chị giữ cách lắng nghe kỹ của phong cách Nhật Bản để đặt lợi ích khách hàng lên hàng đầu.',
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
        caption: 'Trưởng Nhóm Kinh doanh Cấp cao Trâm Lê tại sự kiện chuyên môn của Green Power Group',
      },
      {
        src: '/images/leaders/gallery/tram-le-2.jpg',
        caption: 'Phong thái chỉn chu sau 15 năm làm việc trong môi trường doanh nghiệp Nhật Bản',
      },
    ],
  },
  {
    id: 'van-nguyen',
    index: '19',
    displayName: 'Vân Nguyễn',
    fullName: 'Nguyễn Thị Vân',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'SG168',
    directLeader: 'SUM Thiên Thanh • SDM Võ Thị Thùy Liêm • SM Đào Minh Phương',
    joinedYear: '2025',
    tenureLabel: 'Gia nhập 2025 • 19 năm Quản trị Hành chính Nhân sự',
    industryKey: 'HR_EDU',
    priorBackgroundShort: '19 năm kinh nghiệm Trưởng phòng Hành chính Nhân sự',
    priorBackgroundFull: '19 năm kinh nghiệm Quản trị Nhân sự, nguyên Trưởng phòng Hành chính Nhân sự doanh nghiệp',
    teamScaleBadge: '19 năm Trưởng phòng HCNS',
    highlightNote: 'Bề dày 19 năm Trưởng phòng Nhân sự • Phát triển đội ngũ tại SG168',
    quote: 'Đồng hành để phát triển, tận tâm để bền vững.',
    cardSummary:
      'Sau gần hai thập kỷ làm Trưởng phòng Hành chính Nhân sự, chị theo nguyên tắc rõ ràng: phải hiểu kỹ và tự bảo vệ gia đình mình trước khi đưa giải pháp cho khách hàng.',
    editorialBio: [
      'Mang 19 năm làm Trưởng phòng Hành chính Nhân sự vào nghề hoạch định bảo hiểm tại Khu vực SG168, Vân Nguyễn nhìn nghề tư vấn bằng sự chín chắn của người nhiều năm làm công tác con người và chế độ phúc lợi.',
      'Chị theo ba nguyên tắc khi dẫn dắt đội ngũ và phục vụ khách hàng. Một, học thật sâu để hiểu bản chất bảo hiểm trước khi đi tư vấn. Hai, bản thân và gia đình mình phải được bảo vệ trước. Ba, nhu cầu thực tế của khách hàng luôn là điều kiện tiên quyết để làm bất kỳ hợp đồng nào.',
    ],
    badges: ['Trưởng Nhóm Cấp cao (SUM)', '19 Năm Trưởng Phòng Nhân Sự'],
    specialties: ['Xây dựng & Đào tạo Đội ngũ', 'Bảo vệ Trụ cột Gia đình', 'Hoạch định Phúc lợi Gia đình'],
    portrait: '/images/leaders/van-nguyen.jpg',
    gallery: [],
  },
  {
    id: 'thien-van',
    index: '20',
    displayName: 'Thiên Vân',
    fullName: 'Nguyễn Thanh Thiên Vân',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'HCM69',
    directLeader: 'DM Nguyễn Thị Minh Kiều • SRD Khánh Vân',
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
      'Chị mang 16 năm kinh nghiệm Trưởng phòng Kế hoạch Vận hành vào việc xây dựng một đội ngũ đoàn kết, làm điều đúng đắn tại HCM69.',
    editorialBio: [
      'Có 16 năm làm Thư ký Hành chính và giữ cương vị Trưởng phòng Kế hoạch Vận hành, Thiên Vân chọn Manulife từ năm 2022. Làm việc tại Khu vực HCM69 thuộc Green Power Group, chị thấy tự hào khi thuộc tập thể giữ vị thế Top 1 nhiều năm liền, với văn hóa yêu thương và kỷ luật làm điều đúng đắn.',
      'Khi dẫn dắt đội ngũ của mình, Thiên Vân lấy văn hóa phát triển lâu dài, minh bạch và tử tế của toàn vùng làm kim chỉ nam, cả trong từng bản kế hoạch bảo vệ thu nhập cho khách hàng lẫn khi kèm cặp đồng đội.',
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
    index: '21',
    displayName: 'Huyền Nguyễn',
    fullName: 'Nguyễn Thị Huyền',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'SG169',
    directLeader: 'DM Nguyễn Thị Bé • SM Trương Thị Huyền Trang',
    joinedYear: '2025',
    tenureLabel: 'Gia nhập 2025 • Nền tảng Luật sư chuyên nghiệp',
    industryKey: 'LAW_MED_INS',
    priorBackgroundShort: 'Luật sư • Chuyên môn Pháp lý & Quy tắc Hợp đồng',
    priorBackgroundFull:
      'Luật sư, có nền tảng pháp lý để thẩm định quy tắc và quyền lợi hợp đồng bảo hiểm',
    teamScaleBadge: 'Luật sư • SUM SG169',
    highlightNote:
      'Tư duy của một Luật sư cùng nguyên tắc “Làm đúng trước, làm giỏi sau” tại Khu vực SG169',
    quote: 'Cái gì xuất phát từ trái tim thì sẽ đến được với trái tim.',
    cardSummary:
      'Từ một Luật sư tự tìm hiểu hợp đồng bảo hiểm cho gia đình mình, chị gắn bó và phát triển đội ngũ tại Khu vực SG169.',
    editorialBio: [
      'Nguyễn Thị Huyền là Luật sư. Chị đến với Manulife vì muốn tự đọc kỹ các điều khoản hợp đồng bảo hiểm cho gia đình mình. Càng tìm hiểu dưới góc nhìn pháp lý, chị càng thấy bảo hiểm nhân thọ thực sự bảo vệ được người thân.',
      'Văn hóa chân thành và nguyên tắc “Làm đúng trước, làm giỏi sau” tại Green Power Group đã giữ chị ở lại, và chị phát triển lên Trưởng Nhóm Kinh doanh Cấp cao (SUM) tại Khu vực SG169. Chị lắng nghe khách hàng và giải thích rõ ràng các điều khoản pháp lý.',
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
    index: '22',
    displayName: 'Bùi Phước Ngoan',
    fullName: 'Bùi Phước Ngoan',
    roleBadge: 'SUM',
    roleTitle: 'Trưởng Nhóm Kinh doanh Cấp cao',
    tierKey: 'SUM',
    tierLabel: 'Trưởng Nhóm Cấp cao',
    unitCode: 'SG169',
    directLeader: 'SM Trương Thị Huyền Trang',
    joinedYear: '2025',
    tenureLabel: 'Gia nhập 2025 • Trưởng thành từ Thư ký Vận hành Đội ngũ',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: 'Thư ký Vận hành & Hỗ trợ Phát triển Đội ngũ Kinh doanh',
    priorBackgroundFull:
      'Khởi đầu từ vị trí Thư ký vận hành tại Green Power Group khi còn là sinh viên năm 3 đại học',
    teamScaleBadge: 'Thế hệ Quản lý Trẻ SG169',
    highlightNote:
      'Quản lý trẻ đi lên từ công tác vận hành nội bộ đến Trưởng Nhóm Kinh doanh Cấp cao (SUM) tại SG169',
    quote:
      'Tận tâm, có trách nhiệm và chỉn chu trong từng giải pháp gửi đến khách hàng.',
    cardSummary:
      'Bắt đầu từ vị trí Thư ký khi còn là sinh viên năm 3, chị trở thành Trưởng Nhóm Kinh doanh Cấp cao tại SG169.',
    editorialBio: [
      'Bùi Phước Ngoan bắt đầu công việc đầu tiên tại Manulife khi vẫn còn là sinh viên năm 3 đại học ở vị trí Thư ký vận hành, từ đó học hỏi trực tiếp trong môi trường làm việc nề nếp của Green Power Group và Khu vực SG169.',
      'Sự chuyên nghiệp và việc các thế hệ quản lý sẵn sàng hỗ trợ nhau giúp chị hiểu rõ giá trị thực của bảo hiểm nhân thọ. Ở vị trí Trưởng Nhóm Kinh doanh Cấp cao (SUM), Phước Ngoan làm việc tận tâm và chỉn chu với từng hồ sơ khách hàng.',
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
    id: 'ngoc-day',
    index: '23',
    displayName: 'Ngọc Đầy',
    fullName: 'Nguyễn Thị Ngọc Đầy',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'SDM Trân Phan • SRD Khánh Vân',
    joinedYear: '2020',
    tenureLabel: 'Gia nhập 2020 • 7 năm tại Manulife • Nền tảng Kế toán trưởng',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: 'Nguyên Kế toán trưởng doanh nghiệp',
    priorBackgroundFull: 'Nguyên Kế toán trưởng doanh nghiệp, 7 năm hoạch định tài chính tại Manulife',
    teamScaleBadge: '4x MDRT • MBA Pro',
    highlightNote: '4 lần đạt chuẩn quốc tế MDRT (2021, 2022, 2023, 2027), Quản lý MBA 2023',
    quote: 'Mình cứ làm đúng trước đã, kết quả sẽ đến sau.',
    cardSummary:
      'Từ Kế toán trưởng đến 4 lần đạt danh hiệu MDRT (Bàn tròn Triệu đô), giữa một tập thể đồng đội giỏi và kỷ luật tại HCM69.',
    editorialBio: [
      'Nguyễn Thị Ngọc Đầy chuyển từ vị trí Kế toán trưởng doanh nghiệp sang hoạch định tài chính cá nhân từ năm 2020. Điều giữ chị lại suốt 7 năm qua trước hết là quyền lợi bảo vệ thực tế mà bảo hiểm mang lại cho gia đình khách hàng.',
      'Tại Khu vực HCM69 thuộc Green Power Group, Ngọc Đầy làm việc giữa những người giỏi nhưng sẵn lòng nâng đỡ nhau, nên chị không cho phép mình dừng lại. Việc học thêm mỗi ngày và nguyên tắc “cứ làm đúng trước đã” giúp chị đạt 4 danh hiệu MDRT và cột mốc Quản lý MBA Pro.',
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
        caption: 'Trưởng Nhóm Kinh doanh Nguyễn Thị Ngọc Đầy tại Khu vực HCM69',
      },
      {
        src: '/images/leaders/gallery/ngoc-day-2.jpg',
        caption: 'Lễ vinh danh danh hiệu quốc tế MDRT cùng tập thể Green Power Group',
      },
      {
        src: '/images/leaders/gallery/ngoc-day-3.jpg',
        caption: 'Cùng đội ngũ quản lý tại Manulife Việt Nam',
      },
    ],
  },
  {
    id: 'duong-quynh',
    index: '24',
    displayName: 'Dương Quỳnh',
    fullName: 'Nguyễn Ngọc Dương Quỳnh',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'SRD Khánh Vân',
    joinedYear: '2020',
    tenureLabel: 'Gia nhập 2020 • 12 năm Tài chính, Ngân hàng',
    industryKey: 'BANKING',
    priorBackgroundShort: 'Nguyên Chuyên viên Kiểm soát Nội bộ Ngân hàng',
    priorBackgroundFull:
      'Nguyên Chuyên viên Kiểm soát Nội bộ Ngân hàng, có Chứng chỉ Hoạch định Di sản Tài chính LIMRA',
    teamScaleBadge: 'MDRT • Chứng chỉ LIMRA',
    highlightNote:
      'MDRT, MBA Pro, Manulife Pro Bạch Kim, Chứng chỉ Quốc tế LIMRA',
    quote: 'Tư vấn tận tình, phục vụ tận tâm, theo khách hàng lâu dài.',
    cardSummary:
      'Từ một khách hàng ký 2 hợp đồng bảo vệ gia đình với chị Khánh Vân, chị mang kỷ luật kiểm soát nội bộ ngân hàng vào nghề tư vấn.',
    editorialBio: [
      'Dương Quỳnh xuất thân từ nghiệp vụ Kiểm soát nội bộ ngân hàng, nơi đòi hỏi sự chính xác và tuân thủ nghiêm ngặt. Chị đến với nghề khá tự nhiên: chủ động liên hệ chị Khánh Vân để lập hai hợp đồng bảo vệ cho gia đình mình. Thấy cách làm việc rõ ràng, kỹ lưỡng ấy, chị quyết định học nghề bài bản và gắn bó với HCM69 từ năm 2020.',
      'Với tư duy quản trị rủi ro ngân hàng và Chứng chỉ Hoạch định Di sản Tài chính Quốc tế LIMRA, Dương Quỳnh làm mỗi bản kế hoạch tài chính đầy đủ, minh bạch để theo khách hàng lâu dài. Chị quý văn hóa làm nghề nghiêm túc mà thân tình của Green Power Group.',
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
        caption: 'Nhận danh hiệu Quản lý MBA & FC trên sân khấu',
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
    directLeader: 'SDM Hồ Thị Diễm Ly • SRD Khánh Vân',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • 19 năm FMCG & 5 năm Tài chính',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: '19 năm Quản lý Tiếp thị Thương mại ngành FMCG',
    priorBackgroundFull:
      '19 năm Quản lý Tiếp thị Thương mại (Trade Marketing) ngành hàng tiêu dùng nhanh (FMCG)',
    teamScaleBadge: 'MDRT Sydney',
    highlightNote:
      'Thành viên Bàn Tròn Triệu Đô MDRT, đại biểu Hội nghị Toàn cầu MDRT tại Sydney (Úc)',
    quote: 'Tận tâm, chuyên nghiệp.',
    cardSummary:
      'Sau hơn hai thập kỷ làm FMCG và tài chính, chị thấy hợp với văn hóa chia sẻ và nâng đỡ nhau của Green Power Group.',
    editorialBio: [
      'Trước khi bước sang lĩnh vực hoạch định tài chính và bảo hiểm năm 2021, Dung Grace đã có 19 năm đảm nhiệm vị trí Quản lý Tiếp thị Thương mại (Trade Marketing) trong ngành hàng tiêu dùng nhanh (FMCG) năng động. Kinh nghiệm thực chiến giúp chị nhìn kế hoạch kỹ và hiểu nhu cầu của từng gia đình.',
      'Dung Grace đạt danh hiệu quốc tế MDRT và trực tiếp dự Hội nghị Toàn cầu MDRT tại Sydney (Úc). Chị ở lại Khu vực HCM69 vì văn hóa “cho đi”: sẵn lòng chia sẻ kinh nghiệm và hỗ trợ từng thành viên trong đội.',
    ],
    badges: ['MDRT', 'MDRT Global Conference Sydney'],
    specialties: [
      'Hoạch định Tài chính Gia đình',
      'Bảo vệ Nguồn thu Trụ cột',
      'Huấn luyện & Đồng hành Đội ngũ',
    ],
    portrait: '/images/leaders/dung-grace.jpg',
    gallery: [
      {
        src: '/images/leaders/gallery/dung-grace-1.jpg',
        caption: 'Lễ tuyên dương Quản lý Xuất sắc và vinh danh MDRT',
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
    directLeader: 'DM Nguyễn Thị Bé • SM Trương Thị Huyền Trang',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 07/2022 • 8 năm Tài chính, Ngân hàng',
    industryKey: 'BANKING',
    priorBackgroundShort: '8 năm Chuyên viên Tư vấn Tài chính tại ngân hàng',
    priorBackgroundFull: '8 năm kinh nghiệm Chuyên viên Tư vấn trong lĩnh vực Tài chính, Ngân hàng',
    teamScaleBadge: 'MDRT • Quản lý Xuất sắc',
    highlightNote: 'Thành viên MDRT, Quản lý Xuất sắc Khu vực SG169',
    quote:
      'Làm nghề tử tế, đặt cả trái tim vào công việc để trở thành người đáng tin về sức khỏe và tài chính cho mỗi gia đình.',
    cardSummary:
      'Sau 8 năm trong ngành Tài chính, Ngân hàng, chị tìm được chỗ phát triển lâu dài và văn hóa nâng đỡ chân thành tại Khu vực SG169.',
    editorialBio: [
      'Dương Thị Lên có 8 năm làm trong ngành Tài chính, Ngân hàng trước khi gia nhập Manulife tháng 07/2022. Chị xem việc vào Green Power Group là một may mắn lớn của sự nghiệp.',
      'Chị đạt danh hiệu quốc tế MDRT và Quản lý Xuất sắc tại Khu vực SG169. Chị đặt quyền lợi dài hạn của khách hàng lên hàng đầu, và muốn là người truyền động lực để từng cộng sự trong nhóm cùng vững vàng.',
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
        caption: 'Chụp cùng Ban Lãnh đạo và đội ngũ Green Power',
      },
      {
        src: '/images/leaders/gallery/duong-len-3.jpg',
        caption: 'Chị Dương Thị Lên, 8 năm làm Tài chính, Ngân hàng',
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
    directLeader: 'DM Tiền Lê • SRD Khánh Vân',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • Hơn 5 năm gắn bó tại HCM69',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: 'Nguyên Trưởng nhóm Dịch vụ Khách hàng tại công ty phần mềm',
    priorBackgroundFull: 'Nguyên Trưởng nhóm Dịch vụ Khách hàng (Customer Service Lead) tại doanh nghiệp phần mềm công nghệ',
    teamScaleBadge: 'MBA Pro 2026',
    highlightNote: 'MBA Pro 2026, Quản lý Xuất sắc, phát triển đội ngũ và quản lý kế cận',
    quote: 'Làm đúng trước, kết quả tốt sẽ đến sau.',
    cardSummary:
      'Từ Trưởng nhóm Dịch vụ khách hàng ngành công nghệ đến hơn 5 năm xây dựng đội ngũ và quản lý kế cận tại HCM69.',
    editorialBio: [
      'Xuất thân là Trưởng nhóm Dịch vụ Khách hàng tại một công ty phần mềm, Tằng Thị Hoài Linh bước vào Manulife năm 2021 qua lời mời của một người bạn. Hơn 5 năm làm nghề, chị hiểu bảo hiểm là sự chuẩn bị trước những biến cố của cuộc sống, chứ không chỉ là bán hàng.',
      'Với Linh Tằng, tư vấn là giúp khách hàng hiểu mình cần gì để chọn đúng giải pháp, không phải chốt cho bằng được một hợp đồng. Chị truyền cách làm ấy cho đội ngũ, và cả nhóm cùng đạt danh hiệu MBA Pro 2026.',
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
    directLeader: 'SM Trương Thị Huyền Trang',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • 6 năm gắn bó cùng Manulife Việt Nam',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: 'Nguyên Chuyên viên Xuất nhập khẩu & Logistics',
    priorBackgroundFull: 'Nguyên Chuyên viên nghiệp vụ Xuất nhập khẩu, Chuỗi cung ứng và Logistics',
    teamScaleBadge: 'Quản lý Xuất sắc',
    highlightNote: 'Quản lý Xuất sắc, dẫn dắt đội ngũ tại Khu vực SG169',
    quote: 'Tư vấn bằng cái tâm, làm nghề tử tế.',
    cardSummary:
      'Chị dẫn dắt đội ngũ với tâm thế của người phụ nữ coi trọng gia đình, làm đúng pháp luật và minh bạch trong từng hợp đồng.',
    editorialBio: [
      'Tiên Tiên chuyển từ ngành Xuất nhập khẩu và Logistics sang bảo hiểm nhân thọ từ năm 2021, sau khi gặp Giám đốc Vùng Cấp cao Khánh Vân và Giám đốc Khu vực Huyền Trang. Chị coi gia đình là điểm tựa, và quý môi trường này vì vừa có thu nhập ổn định, vừa có thời gian bên con.',
      'Hiện chị trực tiếp dẫn dắt đội ngũ tại Khu vực SG169, giữ nguyên tắc tuân thủ pháp luật và tư vấn bằng cái tâm. Chị tin làm nghề đúng chuẩn là cách thiết thực nhất để mang lại sự yên tâm cho khách hàng và cho gia đình mình.',
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
    directLeader: 'SM Trương Thị Huyền Trang',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 09/2021 • 13 năm Kế toán (7 năm Kế toán trưởng)',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: '13 năm Kế toán, Tài chính (7 năm Kế toán trưởng SX & BĐS)',
    priorBackgroundFull:
      '13 năm kinh nghiệm kế toán, tài chính tại các doanh nghiệp sản xuất và bất động sản, trong đó có 7 năm giữ vị trí Kế toán trưởng',
    teamScaleBadge: '7 năm Kế toán trưởng',
    highlightNote: '13 năm Kế toán, Tài chính, 5 năm hoạch định bảo vệ gia đình tại Khu vực SG169',
    quote: 'Làm nghề tử tế, làm việc có trách nhiệm.',
    cardSummary:
      'Sau 7 năm làm Kế toán trưởng doanh nghiệp sản xuất và bất động sản, chị vào Green Power Group trong mùa dịch 2021 để có thời gian bên con khi con vào lớp 1.',
    editorialBio: [
      'Đỗ Thị Kim Thi có 13 năm làm kế toán tài chính doanh nghiệp, trong đó 7 năm là Kế toán trưởng tại các doanh nghiệp sản xuất và bất động sản. Chị đến với Manulife tháng 09/2021, khi con vào lớp 1 và chị cần một công việc chủ động được thời gian.',
      'Văn hóa làm nghề “có tâm, có tầm, chuẩn chỉnh, cho đi vô điều kiện” của Green Power Group đã giữ chị suốt 5 năm qua. Với tư duy mạch lạc của một Kế toán trưởng, Kim Thi giúp khách hàng nhìn rõ bức tranh tài chính tổng thể, và tìm những cộng sự cùng cách nghĩ để đi đường dài.',
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
        caption: 'Cùng tập thể quản lý Khu vực SG169, Green Power Group',
      },
      {
        src: '/images/leaders/gallery/kim-thi-3.jpg',
        caption: '13 năm kế toán, tài chính làm nền cho từng bản hoạch định',
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
    directLeader: 'SDM Lê Thị Huyên • SRD Khánh Vân',
    joinedYear: '2024',
    tenureLabel: 'Gia nhập 2024 • 10 năm Tài chính, Kế toán',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: '10 năm kinh nghiệm, nguyên Kế toán trưởng doanh nghiệp',
    priorBackgroundFull: '10 năm kinh nghiệm Tài chính, Kế toán & Thuế, nguyên Kế toán trưởng doanh nghiệp',
    teamScaleBadge: '10 năm Kế toán trưởng',
    highlightNote: 'Nguyên Kế toán trưởng doanh nghiệp, tư vấn dựa trên hiểu biết, không bán bằng nỗi sợ',
    quote: 'Bảo vệ đúng nhu cầu, đủ trong khả năng tài chính và chuẩn bị khi sức khỏe còn cho phép.',
    cardSummary:
      'Sau 10 năm làm Kế toán trưởng và một biến cố đau buồn trong gia đình, chị làm nghề bằng kiến thức rõ ràng, không bán bảo hiểm bằng nỗi sợ.',
    editorialBio: [
      'Hà Phi Yến từng là Kế toán trưởng với 10 năm làm tài chính và thuế doanh nghiệp. Chị đến với bảo hiểm nhân thọ khá tình cờ, nhưng quyết định gắn bó lâu dài sau khi mất cô con gái nhỏ Minh Châu. Chị hiểu rõ hơn ai hết việc chuẩn bị sớm trước những rủi ro không báo trước.',
      'Tại Khu vực HCM69, Hà Phi Yến giữ bốn nguyên tắc: tư vấn đúng nhu cầu và vừa khả năng tài chính; nói rõ cả quyền lợi lẫn các điểm loại trừ của hợp đồng; không bán bảo hiểm bằng nỗi sợ hay vì nể nang, mà bằng hiểu biết và niềm tin; và chịu trách nhiệm với khách hàng suốt thời gian hợp đồng.',
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
        caption: 'Học và rèn chuyên môn cùng tập thể HCM69',
      },
      {
        src: '/images/leaders/gallery/ha-phi-yen-3.jpg',
        caption: 'Cùng đội ngũ Green Power Group',
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
    directLeader: 'DM Hồng Hòa • SDM Hồ Thị Diễm Ly',
    joinedYear: '2024',
    tenureLabel: 'Gia nhập 2024 • 12 năm công tác trong lĩnh vực Y tế',
    industryKey: 'LAW_MED_INS',
    priorBackgroundShort: '12 năm công tác thực tiễn trong lĩnh vực Y tế',
    priorBackgroundFull: '12 năm kinh nghiệm làm việc trực tiếp trong môi trường y tế và chăm sóc sức khỏe',
    teamScaleBadge: '12 năm ngành Y tế',
    highlightNote: 'Quản lý Xuất sắc, 12 năm ngành Y tế, hiểu chi phí điều trị thực tế',
    quote: 'Tư vấn bằng cả trái tim, giúp mỗi gia đình Việt có quỹ dự phòng viện phí.',
    cardSummary:
      'Sau 12 năm làm ngành Y tế, thấy nhiều bệnh nhân chật vật vì viện phí, chị vào HCM69 để bảo vệ người thân và cộng đồng.',
    editorialBio: [
      'Suốt 12 năm làm trong môi trường y tế, Nguyễn Thị Thủy Triều tận mắt thấy không ít bệnh nhân và gia đình kiệt quệ vì hóa đơn viện phí. Điều đó khiến chị tìm đến Manulife và chọn Khu vực HCM69 của chị Khánh Vân, để học cách lập quỹ dự phòng y tế cho người thân, bạn bè và cộng đồng.',
      'HCM69 cho chị cảm giác thân tình như một gia đình mà vẫn làm nghề nghiêm túc. Thủy Triều học thêm nghiệp vụ mỗi ngày, mong giúp các gia đình Việt hiểu đúng giá trị bảo vệ của bảo hiểm nhân thọ.',
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
        caption: 'Cùng tập thể quản lý Khu vực HCM69, Green Power Group',
      },
      {
        src: '/images/leaders/gallery/thuy-trieu-3.jpg',
        caption: 'Giải pháp chăm sóc sức khỏe chủ động từ 12 năm làm ngành Y',
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
    tenureLabel: 'Gia nhập 2021 • 5 năm tại Manulife • Nền tảng Shinhan Bank',
    industryKey: 'BANKING',
    priorBackgroundShort: 'Nguyên Chuyên viên Đảm bảo Chất lượng (QA) tại Shinhan Bank',
    priorBackgroundFull: 'Nguyên Chuyên viên Kiểm soát Đảm bảo Chất lượng (QA) tại Ngân hàng Shinhan Việt Nam',
    teamScaleBadge: 'Cựu QA Shinhan Bank',
    highlightNote: '5 năm tại HCM69, tư duy chuẩn xác từ bộ phận QA ngân hàng quốc tế',
    quote: 'Làm đúng thì sẽ làm giỏi. Mỗi chữ ký trên hợp đồng là một lời hứa với cả gia đình.',
    cardSummary:
      'Ban đầu chỉ định làm thêm khi còn ở bộ phận QA của Shinhan Bank, sau 5 năm bảo hiểm trở thành sự nghiệp chị gắn bó nhất, nhờ sự rõ ràng và đạo đức nghề của Green Power Group.',
    editorialBio: [
      'Võ Thị Quỳnh Thi từng làm ở bộ phận Đảm bảo Chất lượng (QA) của Ngân hàng Shinhan Việt Nam, rồi đến với Manulife năm 2021 qua lời giới thiệu của một đồng nghiệp. Ban đầu chị chỉ định làm thêm, nhưng sau 5 năm, đây là nghề chị muốn theo lâu dài nhất.',
      'Một người từng làm QA ngân hàng tin ở HCM69 vì sự rõ ràng, chủ động và đạo đức nghề. Với Quỳnh Thi, tư vấn là nói đúng sự thật để khách hàng hiểu rõ quyền lợi của mình và không thổi phồng, vì mỗi tên người thụ hưởng trên hợp đồng là một lời hứa với cả gia đình.',
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
    tenureLabel: 'Gia nhập 09/2025 • 15 năm kinh nghiệm Sale & Marketing',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: 'Nguyên Giám đốc Kinh doanh • 15 năm Sale & Marketing',
    priorBackgroundFull:
      'Nguyên Giám đốc Kinh doanh Công ty CP Lưới Thái Việt và Công ty TNHH SX & TM Thiên Phước (15 năm kinh nghiệm Sale & Marketing)',
    teamScaleBadge: 'Cựu Giám đốc Kinh doanh',
    highlightNote: '15 năm Sale & Marketing, nguyên Giám đốc Kinh doanh, Trưởng Nhóm Kinh doanh HCM69',
    quote: 'Tư vấn tận tâm, làm việc có trách nhiệm.',
    cardSummary:
      'Anh mang kinh nghiệm của một Giám đốc Kinh doanh với 15 năm trong sản xuất, thương mại vào môi trường có tâm và có tầm tại HCM69.',
    editorialBio: [
      'Sau 15 năm làm Sale, Marketing và giữ vị trí Giám đốc Kinh doanh tại các doanh nghiệp sản xuất và thương mại, Tâm Hoài gia nhập Green Power Group tháng 09/2025. Anh tìm một môi trường vừa chủ động thời gian, vừa dùng được kinh nghiệm quản trị kinh doanh.',
      'Sự nhiệt tình, chuyên nghiệp và cách làm nghề đàng hoàng của chị Khánh Vân và tập thể HCM69 đã giữ anh ở lại. Với Tâm Hoài, mỗi giải pháp là một cam kết và trách nhiệm trước những cột mốc lớn của gia đình khách hàng, chứ không chỉ là một sản phẩm tài chính.',
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
        caption: 'Phát triển đội ngũ tại Khu vực HCM69, Green Power Group',
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
    directLeader: 'SM Đào Minh Phương',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • Nền tảng Thẩm định & Bồi thường Bảo hiểm',
    industryKey: 'LAW_MED_INS',
    priorBackgroundShort: 'Nguyên Chuyên viên Phòng Bồi thường Bảo hiểm Phi nhân thọ',
    priorBackgroundFull:
      'Nguyên Chuyên viên Phòng Giải quyết Quyền lợi Bồi thường tại Công ty Bảo hiểm Phi nhân thọ',
    teamScaleBadge: 'Chuyên gia Bồi thường',
    highlightNote: 'Am hiểu cấu trúc điều khoản và quy trình giải quyết bồi thường',
    quote: 'Tư vấn đủ và đúng với bản chất của bảo hiểm.',
    cardSummary:
      'Từng làm tại phòng Bồi thường bảo hiểm phi nhân thọ, chị hiểu từng chữ trong điều khoản để thiết kế giải pháp “đúng và đủ”.',
    editorialBio: [
      'Khác nhiều người chuyển ngành từ lĩnh vực khác, Băng Tâm (Minh Phương) đã có chuyên môn tại Phòng Bồi thường của một doanh nghiệp bảo hiểm phi nhân thọ. Từng trực tiếp xử lý hồ sơ sự kiện bảo hiểm, chị biết rõ một hợp đồng chỉ bảo vệ được khi kê khai trung thực và thiết kế đúng bản chất ngay từ ngày ký.',
      'Chị tìm một tập thể làm nghề đàng hoàng, thân tình và hỗ trợ lẫn nhau, nên gia nhập Green Power Group từ năm 2022 để tiếp tục làm bảo hiểm một cách chỉn chu.',
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
    priorBackgroundFull: 'Nguyên Chuyên viên Kế toán doanh nghiệp, kinh doanh trực tuyến',
    teamScaleBadge: '4 năm gắn bó SG168',
    highlightNote: 'Trưởng Nhóm Kinh doanh SG168, đến với nghề từ trải nghiệm chi trả thực tế',
    quote: 'Tư vấn tận tâm, tử tế.',
    cardSummary:
      'Tận mắt thấy người thân nhận quyền lợi bảo hiểm, chị từ tò mò thử sức thành gắn bó lâu dài với nghề.',
    editorialBio: [
      'Nhuần Vũ đến với bảo hiểm nhân thọ từ một trải nghiệm ngay trong gia đình. Thấy người thân nhận quyền lợi chi trả kịp thời từ hợp đồng, chị mới hiểu giá trị thật sau những trang điều khoản.',
      'Chị nghỉ công việc kế toán để thử sức tại Khu vực SG168 thuộc Green Power Group từ năm 2022. Sự cẩn trọng của người làm kế toán cùng niềm tin vào sản phẩm đã giữ chị suốt 4 năm qua. Chị làm việc với khách hàng tận tâm và giản dị.',
    ],
    badges: ['Trưởng Nhóm Kinh doanh (UM)', 'Quyền lợi Thực tế'],
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
        caption: 'Chị Vũ Thị Nhuần, chỉn chu và gần gũi với khách hàng',
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
    directLeader: 'SDM Hoàng Thị Kim Thuý • SM Trương Thị Huyền Trang',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • 9 năm Chăm sóc Khách hàng & 4 năm Manulife',
    industryKey: 'LAW_MED_INS',
    priorBackgroundShort: '9 năm Chuyên viên Tổng đài Chăm sóc Khách hàng',
    priorBackgroundFull: '9 năm kinh nghiệm Tổng đài viên và Chăm sóc khách hàng chuyên nghiệp',
    teamScaleBadge: 'Manulife Pro Vàng',
    highlightNote: 'Manulife Pro Vàng, dẫn dắt nhóm kinh doanh tại Khu vực SG169',
    quote: 'Chân thành với khách hàng và luôn có mặt khi khách hàng cần.',
    cardSummary:
      'Sau 9 năm làm Tổng đài viên, quen kiên nhẫn lắng nghe, chị nay dẫn dắt nhóm kinh doanh và cam kết kê khai trung thực.',
    editorialBio: [
      'Nguyễn Thị Sen có 9 năm làm Tổng đài viên, công việc đòi hỏi biết lắng nghe và kiên nhẫn. Chị đến với Manulife năm 2022 sau buổi gặp trực tiếp Giám đốc Vùng Cấp cao Khánh Vân.',
      'Quý bầu không khí đoàn kết và nâng đỡ nhau của tập thể SG169, Sen Nguyễn đạt danh hiệu Manulife Pro Vàng. Chị xây nhóm kinh doanh của mình theo một nguyên tắc: tư vấn đúng và đủ, kê khai hồ sơ trung thực, có mặt kịp thời khi khách hàng cần.',
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
    directLeader: 'UM Ngọc Anh • DM Nguyễn Thị Trà My • SRD Khánh Vân',
    joinedYear: '2026',
    tenureLabel: '5 năm Truyền thông & Tổ chức Sự kiện',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: '5 năm Account Manager ngành Truyền thông & Sự kiện',
    priorBackgroundFull: '5 năm kinh nghiệm Account Manager trong lĩnh vực Truyền thông và Tổ chức sự kiện',
    teamScaleBadge: 'Account Manager 5 năm',
    highlightNote: 'Quản lý trẻ năng động, 5 năm quản trị dự án Truyền thông',
    quote: 'Những gì xuất phát từ trái tim sẽ đến được với trái tim.',
    cardSummary:
      'Sau 5 năm làm Account Manager ngành truyền thông, chị tự tìm hiểu quản lý tài chính cá nhân và ở lại vì những người chị làm nghề tử tế mà chị gặp mỗi ngày tại HCM69.',
    editorialBio: [
      'Sau 5 năm làm Account Manager trong ngành Truyền thông và Tổ chức sự kiện, Vũ Ngọc Thảo Phương chủ động đến với bảo hiểm khi tự tìm hiểu về quản lý tài chính cá nhân. Chị nhận ra mình tích góp từng đồng, nhưng nếu biến cố sức khỏe làm gián đoạn thu nhập thì bảo hiểm là thứ giữ được khoản tích lũy ấy.',
      'Nói về lý do ở lại Khu vực HCM69, Thảo Phương chia sẻ: “Tìm đến là một chuyện, nhưng chọn ở lại để đi cùng nhau lại là câu chuyện khác”. Mỗi ngày được gặp và học trực tiếp từ chị Khánh Vân cùng các chị quản lý giỏi, tử tế tại văn phòng khiến chị muốn theo nghề nghiêm túc.',
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
    priorBackgroundShort: '2 năm Quản lý Nhân sự tại doanh nghiệp',
    priorBackgroundFull: 'Kinh nghiệm Quản lý Nhân sự tại doanh nghiệp, phát triển đội ngũ trẻ tại SG168',
    teamScaleBadge: 'Quản lý trẻ SG168',
    highlightNote: 'Trưởng Nhóm Kinh doanh trẻ tại Khu vực SG168',
    quote: 'Tư vấn đúng và đủ, chữ tâm làm nên thương hiệu.',
    cardSummary:
      'Từ Quản lý Nhân sự doanh nghiệp đến xây dựng nhóm kinh doanh theo nguyên tắc “hiểu đúng, làm đúng từ đầu”.',
    editorialBio: [
      'Từng công tác ở vị trí Quản lý Nhân sự doanh nghiệp, Nguyễn Ngọc Trâm biết đến cơ hội nghề nghiệp tại Manulife qua sự giới thiệu từ gia đình của Giám đốc Khu vực Đào Minh Phương.',
      'Khi vào Khu vực SG168 thuộc Green Power Group, Ngọc Trâm ấn tượng với văn hóa hỗ trợ nhau và cách rèn nền tảng “hiểu đúng, làm đúng ngay từ đầu”. Hiện chị trực tiếp dẫn dắt đội ngũ, cam kết làm việc minh bạch với cả khách hàng lẫn cộng sự.',
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
        caption: 'Cùng đội ngũ trẻ trong các chương trình đào tạo chuyên môn',
      },
      {
        src: '/images/leaders/gallery/ngoc-tram-3.jpg',
        caption: 'Sinh hoạt tập thể tại Green Power Group',
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
      '20 năm công tác Kiểm nghiệm Dược tại Viện Kiểm nghiệm Thuốc TP.HCM, 3 năm theo dõi kế hoạch lâm nghiệp',
    teamScaleBadge: '20 năm ngành Dược',
    highlightNote:
      'Đưa sự chính xác, cẩn trọng của 20 năm Kiểm nghiệm Dược tại Viện Kiểm nghiệm Thuốc TP.HCM vào nghề tư vấn tài chính',
    quote: 'Tư vấn tử tế, giải pháp vững, theo khách hàng đến cùng.',
    cardSummary:
      'Sau 20 năm công tác tại Viện Kiểm nghiệm Thuốc TP.HCM, chị tìm được động lực mới trong tập thể gồm người của nhiều ngành nghề tại Green Power Group.',
    editorialBio: [
      'Sau 20 năm làm Kiểm nghiệm Dược tại Viện Kiểm nghiệm Thuốc TP.HCM, Bùi Thị Thu Thảo đến với Manulife qua lời mời tìm hiểu giải pháp bảo vệ người trụ cột của một đồng nghiệp cũ, nay là tư vấn viên thuộc Green Power Group. Khi thử môi trường mới, chị nhanh chóng bị thuyết phục bởi sự hướng dẫn tận tình, văn hóa chia sẻ giữa các đồng nghiệp giỏi từ nhiều ngành nghề, và cách làm việc nghiêm túc của chị Khánh Vân.',
      'Ở vị trí Trưởng Nhóm Kinh doanh (UM) tại HCM69, điều Thảo Bùi coi trọng nhất là thiết kế giải pháp bảo vệ vừa với từng hoàn cảnh gia đình, để khách hàng hiểu rõ và tự giới thiệu cho người quen. Chị xây dựng đội ngũ theo phương châm “Dẫn dắt bằng sự chân thành, phát triển bằng năng lực, gắn kết bằng trách nhiệm”.',
    ],
    badges: [
      'Trưởng Nhóm Kinh doanh (UM)',
      '20 Năm Viện Kiểm Nghiệm Thuốc TP.HCM',
      'Hoạch định Y tế & Gia đình',
    ],
    specialties: [
      'Chăm sóc Sức khỏe & Bệnh lý Nghiêm trọng',
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
        caption: 'Cùng tập thể quản lý và đồng nghiệp Khu vực HCM69, Green Power Group',
      },
      {
        src: '/images/leaders/gallery/thao-bui-3.jpg',
        caption: 'Lễ vinh danh thăng cấp Trưởng Nhóm Kinh doanh (UM) tại HCM69',
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
    directLeader: 'SUM Loan Trần • SRD Khánh Vân',
    joinedYear: '2026',
    tenureLabel: 'Gia nhập 2026 • 18 năm Tài chính, Chứng khoán & Kế toán Quản trị',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: '18 năm Tài chính, Chứng khoán & Kế toán Quản trị',
    priorBackgroundFull:
      '18 năm kinh nghiệm chuyên sâu trong lĩnh vực Tài chính, Chứng khoán và Kế toán Quản trị doanh nghiệp',
    teamScaleBadge: '18 năm Tài chính, Chứng khoán',
    highlightNote:
      'Đạt danh hiệu Manulife Pro Bạc chỉ sau 3 tháng nhờ 18 năm Tài chính, Chứng khoán và làm việc đúng quy trình',
    quote: 'Làm thật, học thật, giá trị thật sẽ tự nói lên.',
    cardSummary:
      'Sau 18 năm trong ngành Tài chính, Chứng khoán, chị dám thử sức ở môi trường mới và đạt Manulife Pro Bạc chỉ sau 3 tháng, bằng số liệu rõ ràng và lời nói thật.',
    editorialBio: [
      'Hà Đỗ có 18 năm kinh nghiệm trong Tài chính, Chứng khoán và Kế toán Quản trị. Chị gia nhập Manulife để thử sức ở mảng hoạch định tài chính gần gũi hơn với từng gia đình. Nhờ làm đúng quy trình và học bài bản tại Khu vực HCM69, chị đạt cột mốc Manulife Pro Bạc chỉ sau 3 tháng.',
      'Điều chị quý nhất tại Green Power Group là sự minh bạch và cách coi khách hàng như người thân. Nguyên tắc của Hà Đỗ là tư vấn bằng số liệu rõ ràng và lời nói thật: người tư vấn dám nói điều khách hàng cần nghe, kể cả khi họ chưa muốn nghe, thì mới có được niềm tin lâu dài.',
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
    directLeader: 'DM Nguyễn Thị Trà My • SRD Khánh Vân',
    joinedYear: '2026',
    tenureLabel: 'Gia nhập 2026 • 12 năm Đối tác Nhân sự Chiến lược (HRBP)',
    industryKey: 'HR_EDU',
    priorBackgroundShort: '12 năm Đối tác Nhân sự Chiến lược (HR Business Partner)',
    priorBackgroundFull:
      '12 năm kinh nghiệm Đối tác Nhân sự Chiến lược (HR Business Partner) tại các doanh nghiệp',
    teamScaleBadge: '12 năm HRBP • MBA Pro',
    highlightNote:
      'Chủ động tìm đến Green Power Group sau 12 năm làm HR Business Partner, danh hiệu MBA Pro',
    quote: 'Phương án bảo hiểm tốt nhất là phương án bảo vệ phù hợp nhất.',
    cardSummary:
      'Với 12 năm làm HR Business Partner, chị chủ động tìm đến Green Power Group vì hợp về sự chính trực và cách đối xử với con người.',
    editorialBio: [
      'Sau 12 năm đảm nhiệm vai trò Đối tác Nhân sự Chiến lược (HR Business Partner) chuyên làm việc với ban lãnh đạo doanh nghiệp về nhân sự và phúc lợi, Vũ Thị Ngọc Anh chủ động tìm hiểu rồi gia nhập Khu vực HCM69 thuộc Green Power Group.',
      'Tại đây, chị thấy hợp với tinh thần đoàn kết và hỗ trợ lẫn nhau giữa các thành viên. Ở vị trí Trưởng Nhóm Kinh doanh (UM) và quản lý MBA Pro, Ngọc Anh đặt sự chính trực, biết lắng nghe và lợi ích thực của khách hàng lẫn đội ngũ lên hàng đầu.',
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
      'Trưởng Nhóm Kinh doanh trẻ, nhiệt huyết, làm việc cùng Giám đốc Khu vực Đào Minh Phương tại SG168',
    quote:
      'Tận tâm tìm giải pháp bảo vệ phù hợp nhất cho mỗi gia đình khách hàng.',
    cardSummary:
      'Chị đến với Khu vực SG168 qua sự dẫn dắt của Giám đốc Khu vực Đào Minh Phương, và quý văn hóa sẵn sàng nâng đỡ nhau tiến bộ mỗi ngày.',
    editorialBio: [
      'Trần Xuân Mai đến với Manulife Việt Nam nhờ sự dẫn dắt trực tiếp của Giám đốc Khu vực Đào Minh Phương tại SG168. Điều giữ chị ở lại Green Power Group là văn hóa tập thể sẵn sàng giúp nhau, chia sẻ nghiệp vụ và tiếp thêm động lực trong từng giai đoạn làm nghề.',
      'Ở vai trò Trưởng Nhóm Kinh doanh (UM), Xuân Mai theo đuổi mục tiêu tìm hiểu kỹ nhu cầu thực tế để đưa ra giải pháp bảo vệ minh bạch và lâu dài cho từng khách hàng.',
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
      '10 năm công tác lĩnh vực Ngoại giao tại Tổng Lãnh sự quán Kuwait, chủ doanh nghiệp kinh doanh nhập khẩu',
    teamScaleBadge: '2x MDRT • MBA Pro',
    highlightNote:
      '2 lần đạt chuẩn quốc tế MDRT (2023, 2027), Quản lý MBA 2023, Manulife Pro Bạch Kim',
    quote: 'Làm đúng trước, làm giỏi sau. Làm người trước, làm nghề sau.',
    cardSummary:
      'Từ 10 năm công tác ngoại giao tại Tổng Lãnh sự quán Kuwait và điều hành công ty nhập khẩu đến danh hiệu MDRT 2027, chị muốn nhân rộng cách làm bảo hiểm xanh, sạch tại HCM69.',
    editorialBio: [
      'Lê Thị Cẩm Hương có 10 năm công tác ngoại giao tại Tổng Lãnh sự quán Kuwait và tự điều hành một doanh nghiệp nhập khẩu, nên hiểu rõ việc chủ động chuẩn bị tài chính cho cá nhân và gia đình. Trước khi vào nghề, chị là khách hàng của nhiều công ty bảo hiểm khác nhau. Góc nhìn khắt khe của một người mua có kinh nghiệm đã đưa chị đến với Manulife, và chị gắn bó gần 6 năm qua tại Khu vực HCM69 thuộc Green Power Group.',
      'Điều giữ Cẩm Hương ở lại lâu dài là cách làm nghề đặt chữ Tâm và quyền lợi lâu dài của khách hàng lên trước. Chị lần lượt đạt MDRT 2023, Quản lý MBA 2023, Manulife Pro Bạch Kim và sớm hoàn thành tiêu chí MDRT 2027. Với tâm niệm “Làm đúng trước, làm giỏi sau; làm người trước, làm nghề sau”, chị muốn có thêm nhiều tư vấn viên làm nghề xanh, sạch, đúng chuẩn tại Việt Nam.',
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
        caption: 'Đạt vé dự Hành trình Ngôi Sao M-Star 2026 đến Thổ Nhĩ Kỳ',
      },
      {
        src: '/images/leaders/gallery/cam-huong-3.jpg',
        caption: 'Cùng SRD Khánh Vân và các đồng đội tại sự kiện tổng kết kinh doanh ở Manulife Plaza',
      },
    ],
  },
  {
    id: 'hong-khanh',
    index: '44',
    displayName: 'Hồng Khánh',
    fullName: 'Văn Thụy Hồng Khánh',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'DM Tiền Lê • SRD Khánh Vân',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • 6 năm gắn bó cùng nghề',
    industryKey: 'HR_EDU',
    priorBackgroundShort: 'Nguyên Quản lý Nhân sự (HR Manager)',
    priorBackgroundFull: 'Nguyên Quản lý Nhân sự (Human Resources Manager) doanh nghiệp',
    teamScaleBadge: '2x MDRT • FC Platinum',
    highlightNote: '2 năm liên tiếp đạt chuẩn quốc tế MDRT, FC Platinum, Quản lý MBA',
    quote: 'Tư vấn tận tâm.',
    cardSummary:
      'Từ Quản lý Nhân sự quen lắng nghe đến 2 năm liên tiếp đạt MDRT, trong môi trường hỗ trợ nhau không vụ lợi tại HCM69.',
    editorialBio: [
      'Giai đoạn từ 2020 đến 2021, đại dịch khiến Hồng Khánh (khi ấy là Quản lý Nhân sự) nghĩ nhiều hơn về việc dự phòng rủi ro cuộc sống. Nghe một đồng nghiệp cũ chia sẻ, chị quyết định tìm hiểu bài bản và thử sức với hoạch định bảo hiểm nhân thọ.',
      'Sau các chương trình huấn luyện tại Khu vực HCM69 thuộc Green Power Group, chị bị thuyết phục bởi sự nhiệt tình, tinh thần nâng đỡ nhau không vụ lợi và chữ “TÂM” làm nghề của tập thể lãnh đạo. Chị chọn nơi đây làm nghề lâu dài và lần lượt đạt MDRT, FC Platinum.',
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
        caption: 'Vinh danh ba danh hiệu MDRT, FC và MBA tại Khu vực HCM69',
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
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'HCM69',
    directLeader: 'SDM Minh Phượng • SRD Khánh Vân',
    joinedYear: '2021',
    tenureLabel: 'Gia nhập 2021 • Hơn 12 năm Mua hàng Quốc tế & XNK',
    industryKey: 'CORP_BIZ',
    priorBackgroundShort: 'Hơn 12 năm Mua hàng Quốc tế, XNK & Logistics',
    priorBackgroundFull:
      'Hơn 12 năm kinh nghiệm Chuyên viên Cung ứng, Mua hàng quốc tế, Xuất nhập khẩu và Logistics',
    teamScaleBadge: 'MBA Pro • FC 2023',
    highlightNote:
      '1 trong 2 Quản lý thăng tiến 2 cấp trong 1 năm (2023), Quản lý MBA, FC 2023',
    quote:
      'Làm đúng, đủ ngay từ đầu để lúc nào cũng vui và ăn ngon, ngủ yên.',
    cardSummary:
      'Sau những biến cố sức khỏe dồn dập trong gia đình năm 2021, chị làm nghề tư vấn, vừa có tâm vừa vững nghiệp vụ, để bảo vệ thêm nhiều gia đình.',
    editorialBio: [
      'Năm 2021, giữa đợt dịch COVID-19, gia đình Xuân Sương gặp biến cố dồn dập: mẹ mắc bệnh hiểm nghèo, em gái phát hiện u não và cháu nhỏ chào đời gặp vấn đề hô hấp nặng. Cuộc trò chuyện trực tuyến với chị Khánh Vân lúc ấy giúp chị hiểu giá trị thật của bảo hiểm y tế và nhân thọ. Chị cũng thấy tỷ lệ người dân có bảo hiểm tại Việt Nam còn thấp, xã hội cần những tư vấn viên vừa có tâm vừa vững chuyên môn.',
      'Xuân Sương nghỉ công việc Mua hàng Quốc tế và Xuất nhập khẩu sau hơn 12 năm để có thời gian chăm mẹ và gia đình, rồi tìm thấy ở Khu vực HCM69 một tập thể thân tình, kỷ luật và chỉn chu. Năm 2023, chị là một trong hai quản lý thăng tiến hai cấp trong cùng một năm. Dù vậy, điều chị thấy hạnh phúc nhất vẫn là được “ăn ngon, ngủ yên” vì luôn tư vấn đúng, đủ và coi khách hàng như người thân.',
    ],
    badges: ['MBA Pro', 'FC 2023', 'Quản lý Xuất sắc'],
    specialties: ['Bảo vệ Trụ cột Gia đình', 'Chăm sóc Y tế & Bệnh lý Nghiêm trọng'],
    portrait: '/images/leaders/xuan-suong.jpg',
    gallery: [],
  },
  {
    id: 'thuy-duong',
    index: '46',
    displayName: 'Thuỳ Dương',
    fullName: 'Tôn Nữ Thuỳ Dương',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'SG169',
    directLeader: 'SM Trương Thị Huyền Trang',
    joinedYear: '2022',
    tenureLabel: 'Gia nhập 2022 • 5 năm BHNT & 3 năm Biên phiên dịch BH',
    industryKey: 'LAW_MED_INS',
    priorBackgroundShort: '3 năm Biên phiên dịch chuyên ngành Bảo hiểm Phi nhân thọ',
    priorBackgroundFull:
      '3 năm Biên phiên dịch chuyên ngành Bảo hiểm Phi nhân thọ, Chứng nhận quốc tế MFA của LIMRA',
    teamScaleBadge: 'Chứng nhận MFA của LIMRA',
    highlightNote: 'Manulife Pro, Chứng nhận Cố vấn Tài chính Quốc tế MFA của LIMRA',
    quote: 'Tư vấn tận tâm, làm nghề đúng chuẩn.',
    cardSummary:
      'Từng trải qua nỗi vất vả khi gia đình mất người trụ cột kinh tế từ năm cấp 2, cùng 3 năm dịch thuật chuyên ngành bảo hiểm, chị theo nghề tư vấn tài chính theo chuẩn quốc tế LIMRA.',
    editorialBio: [
      'Từ khi còn học cấp 2, Tôn Nữ Thuỳ Dương đã biết gia đình chật vật thế nào khi thiếu người trụ cột kinh tế. Trải nghiệm ấy cùng 3 năm làm Biên phiên dịch ngành bảo hiểm phi nhân thọ khiến chị tin bảo hiểm nhân thọ là sự bảo vệ cần thiết cho người mình thương, không phải thứ xa xỉ.',
      'Thuỳ Dương chọn Manulife và Khu vực SG169 thuộc Green Power Group từ năm 2022 vì chương trình đào tạo bài bản. Chị đạt danh hiệu Manulife Pro và Chứng nhận Quốc tế MFA do LIMRA cấp, phục vụ khách hàng tận tâm và đúng chuyên môn.',
    ],
    badges: ['Chứng nhận MFA của LIMRA', 'Manulife Pro', '8 Năm Ngành Bảo Hiểm'],
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
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'SG169',
    directLeader: 'SM Trương Thị Huyền Trang',
    joinedYear: '2025',
    tenureLabel: 'Gia nhập 2025 • Controller Maersk & 3 năm tại Nhật Bản',
    industryKey: 'FINANCE_ACC',
    priorBackgroundShort: 'Nguyên Kế toán trưởng • Controller LF Logistics (Maersk) • 3 năm tại Nhật',
    priorBackgroundFull:
      'Nguyên Kế toán trưởng Công ty GDV, Financial Controller tại LF Logistics (Tập đoàn Maersk), Supervisor Circle K, 3 năm học tập và sinh sống tại Nhật Bản',
    teamScaleBadge: 'Top 10 Toàn quốc 12/2025',
    highlightNote: 'Manulife Pro Vàng, Top 10 Đại lý mới xuất sắc toàn quốc ngay tháng đầu hoạt động (12/2025)',
    quote: 'Làm đúng trước, làm giỏi sau.',
    cardSummary:
      'Từng là Financial Controller tại tập đoàn Maersk, có 3 năm sống tại Nhật Bản, chị lọt Top 10 toàn quốc ngay tháng đầu gia nhập SG169.',
    editorialBio: [
      'Nguyễn Thị Ngọc Tâm từng sống và học tập 3 năm tại Nhật Bản, làm Kế toán trưởng doanh nghiệp và Financial Controller tại LF Logistics (thuộc Tập đoàn vận tải biển toàn cầu Maersk). Chị gặp Giám đốc Khu vực Huyền Trang trong một buổi thăm khám sức khỏe định kỳ.',
      'Ban đầu chị chỉ định tìm hiểu thêm về Luật Kinh doanh Bảo hiểm, nhưng môi trường thân thiện và văn hóa “Làm đúng trước, làm giỏi sau” tại SG169 khiến chị theo nghề thật sự. Dùng tư duy kiểm soát tài chính cho từng bản hoạch định bảo vệ trụ cột, Tâm Nguyễn đạt Manulife Pro Vàng và vào Top 10 Tư vấn viên mới tiêu biểu toàn quốc ngay tháng đầu hoạt động.',
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
        caption: 'Trưởng Nhóm Kinh doanh Nguyễn Thị Ngọc Tâm tại văn phòng Manulife',
      },
      {
        src: '/images/leaders/gallery/tam-nguyen-2.jpg',
        caption: 'Vinh danh thành tích Manulife Pro Vàng và Top 10 Toàn quốc tháng đầu hoạt động',
      },
      {
        src: '/images/leaders/gallery/tam-nguyen-3.jpg',
        caption: 'Cùng đội ngũ Khu vực SG169, Green Power Group',
      },
    ],
  },
  {
    id: 'huong-giang',
    index: '48',
    displayName: 'Nguyễn Hương Giang',
    fullName: 'Nguyễn Thị Hương Giang',
    roleBadge: 'UM',
    roleTitle: 'Trưởng Nhóm Kinh doanh',
    tierKey: 'UM',
    tierLabel: 'Trưởng Nhóm Kinh doanh',
    unitCode: 'SG169',
    directLeader: 'SM Trương Thị Huyền Trang',
    joinedYear: '2024',
    tenureLabel: 'Gia nhập 2024 • 7 năm Thẩm định Ngân hàng & 11 năm Doanh nghiệp',
    industryKey: 'BANKING',
    priorBackgroundShort: '7 năm Thẩm định Tài chính tại ngân hàng • 11 năm Doanh nghiệp',
    priorBackgroundFull:
      '7 năm Chuyên viên Thẩm định Tài chính tại ngân hàng, 11 năm kinh nghiệm làm việc tại doanh nghiệp',
    teamScaleBadge: '7 năm Thẩm định Ngân hàng',
    highlightNote:
      '18 năm làm Ngân hàng và Doanh nghiệp, hiểu giá trị bảo hiểm từ trải nghiệm nhận bồi thường thực tế',
    quote: 'Bảo hiểm tử tế bắt đầu từ việc sống và làm nghề tử tế, văn minh.',
    cardSummary:
      'Sau 18 năm làm thẩm định ngân hàng và doanh nghiệp, cùng 2 lần gia đình trực tiếp nhận quyền lợi bồi thường, chị theo đuổi “Bảo hiểm tử tế” tại SG169.',
    editorialBio: [
      'Nguyễn Thị Hương Giang có 7 năm làm Chuyên viên Thẩm định Tài chính tại ngân hàng và 11 năm làm việc trong doanh nghiệp, quen đánh giá mọi kế hoạch tài chính bằng con số thực. Bước ngoặt đưa chị đến với nghề tư vấn là trải nghiệm của chính mình: hai lần bản thân và gia đình nhận quyền lợi bồi thường y tế, chị thấy bảo hiểm là chỗ dựa đúng lúc cần nhất.',
      'Hương Giang gia nhập Khu vực SG169 thuộc Green Power Group từ năm 2024 cùng Giám đốc Khu vực Huyền Trang. Chị thấy hợp với tập thể lấy “Bảo hiểm tử tế” làm kim chỉ nam, đúng với cách sống tử tế và văn minh mà chị giữ.',
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
    tag: 'QUẢN TRỊ ĐỘI NGŨ',
    title: 'Họp điều hành cùng đội ngũ quản lý các khu vực',
    subtitle:
      'Định hướng tư vấn và tiêu chuẩn chăm sóc khách hàng được thống nhất từ Ban Điều hành đến từng khu vực.',
    spanClass: 'md:col-span-7',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'dao-tao-thuc-chien',
    src: '/images/PhongDaoTao_ChiVan_ChiaSeTruyenLua.jpg',
    tag: 'HUẤN LUYỆN NGHIỆP VỤ',
    title: 'Đào tạo từ điều khoản pháp lý đến hoạch định dòng tiền',
    subtitle:
      'Rèn nghề thực chất để mỗi tư vấn viên tự tin giải thích từng trang hợp đồng cho khách hàng.',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/3] md:aspect-auto md:h-full',
  },
  {
    id: 'co-van-ke-can',
    src: '/images/VanPhong_ChiVanCungNhomQuanLy_SofaBenCuaSoViewDep.jpg',
    tag: 'ĐỒNG HÀNH KẾ CẬN',
    title: 'Kèm cặp thế hệ quản lý trẻ',
    subtitle:
      'Chia sẻ kinh nghiệm quản trị và cách xây dựng đội ngũ ngay tại văn phòng Manulife Plaza.',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'thao-luan-giai-phap',
    src: '/images/VanPhong_NhomQuanLy_ThaoLuanTaiLieuThucChien.jpg',
    tag: 'CHUẨN MỰC TƯ VẤN',
    title: 'Cùng rà soát giải pháp trước khi trao đến gia đình khách hàng',
    subtitle:
      'Làm việc tập thể để mọi phương án bảo vệ được đối chiếu kỹ với thu nhập và nhu cầu thực tế của từng gia đình.',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'vinh-danh-top1',
    src: '/images/SanKhau_ChiVan_ManHinhLED_Top1FYP2025.jpg',
    tag: 'DẤU ẤN QUÁN QUÂN',
    title: 'Hai giải Top 1 toàn quốc 2025 về doanh số FYP và tỷ lệ duy trì hợp đồng',
    subtitle:
      'Dẫn đầu toàn quốc cả về Doanh số FYP lẫn Tỷ lệ Duy trì Hợp đồng, nhờ niềm tin của hàng nghìn gia đình.',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]',
  },
];
