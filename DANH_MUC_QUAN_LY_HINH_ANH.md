# SỔ TAY QUẢN LÝ TÀI NGUYÊN HÌNH ẢNH (MASTER IMAGE REGISTRY)
### Website: khanhvanfinance.com — Chị Khánh Vân

Tài liệu này là **Nguồn Tham Chiếu Chuẩn Duy Nhất (Single Source of Truth)** ghi nhận vị trí sử dụng, nguồn gốc file gốc và trạng thái của toàn bộ hình ảnh trong dự án, đảm bảo không bao giờ bị trùng lặp hoặc nhầm lẫn khi cập nhật website và bài viết truyền thông.

---

## I. CẤU TRÚC LƯU TRỮ HỆ THỐNG

| Thư mục | Chức năng chính | Ghi chú quản lý |
| :--- | :--- | :--- |
| **`public/images/`** | **Production Assets** | Chỉ chứa các ảnh **ĐANG PHỤC VỤ TRỰC TIẾP** trên website. |
| **`Anh_Da_Phan_Tich/`** | **Kho Ảnh Đợt 1 (12 ảnh)** | Đã chuẩn hóa tên. Kèm file `Meta_PhanTich_Anh.md`. |
| **`Anh_Goc/`** | **Kho Ảnh Gốc Đợt 1** | Lưu file gốc nguyên bản đợt 1. |
| **`Anh_Da_Phan_Tich_Dot_2/`** | **Kho Ảnh Đợt 2 (68 ảnh)** | Đã chuẩn hóa tên. Kèm file `Meta_PhanTich_Anh_Dot_2.md`. |
| **`Anh_Goc_Dot_2/`** | **Kho Ảnh Gốc Đợt 2 (68 ảnh)** | Lưu 68 file gốc duy nhất sau khi đã lọc trùng lặp. |
| **`Anh_Goc_Dot_2/Ban_Sao_Trung_Lap/`** | **Kho Lưu Trữ 80 File Copy** | Lưu trữ các bản nhân bản thừa từ Zalo (`copy.jpg`). |

---

## II. BẢNG PHÂN BỔ ẢNH ĐANG SỬ DỤNG TRÊN WEBSITE (ACTIVE IN PRODUCTION)

Hiện tại website đang sử dụng chính thức **24 bức ảnh tinh hoa (FIG. 00 đến FIG. 23)** được phân bổ chính xác theo các phần nội dung:

| Mã Fig | Tên File Trong `public/images/` | Vị trí trên Website | Nguồn gốc | Tên file gốc ban đầu | Ý nghĩa & Thông điệp truyền tải |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **FIG. 00** | `ChanDung_ChiVan_VestXanhNgoc_TrietLyNghe_Panorama.jpg` | **Hero Section** (Panorama Tầng 1) | **Đợt 3 (Panorama)** | `media_1793975473686_ee1a9d05.jpg` | Khung hình Panorama 4K mở rộng không gian phòng studio ngập nắng sớm với rèm voan trắng mềm mại và câu tâm niệm nghề nghiệp: *“Đi chắc để đi xa. Làm nghề bằng sự chuẩn mực, đồng hành bằng cả trái tim.” — Nguyễn Thị Vân*. |
| **FIG. 01** | `VanPhong_ChiVanCungTapThe_AnhSangTuNhien.jpg` | **Hero Section** (Cột phải Tầng 2) | **Đợt 2** | `1793511781173...48d5bc65.jpg` (Số 60) | Thủ lĩnh Khánh Vân ngồi ghế trung tâm trong trang phục vest trắng thanh lịch cùng hơn 35 nữ quản lý & chuyên viên tinh hoa trong trang phục vest xanh đồng bộ tại sảnh văn phòng Manulife; khẳng định quy mô, tầm vóc và uy tín của Giám đốc Vùng Cấp cao. |
| **FIG. 02** | `VanPhong_ChiVan_HuongDanDoiNguBanHop.jpg` | **Section 4 — Chương I** (2009–2017) | **Đợt 2** | `1793510241398...dabe.jpg` (Số 03) | Chị Khánh Vân chủ trì hướng dẫn đội ngũ bên bàn họp chiến lược văn phòng Manulife; đại diện cho tác phong làm việc bài bản, chỉn chu từ nền tảng vận hành ngân hàng ANZ. |
| **FIG. 03** | `SanKhau_ChiVan_NhanGiaiTop1DuyTriHopDong2025.jpg` | **Section 4 — Chương II** (Bước ngoặt 2018) | Đợt 1 | `a2.jpg` | Ảnh nhận giải sân khấu duy nhất trong 3 chương: Vinh danh Top 1 DRD+ Tỷ lệ duy trì hợp đồng 2025 &mdash; bảo chứng cho chữ "Tín" và niềm tin dài hạn của khách hàng. |
| **FIG. 04** | `SuKien_ChiVanCungCEOvaCAO_ChupAnhTiecToi.jpg` | **Section 4 — Chương III** (2018–nay) | **Đợt 3** | `media_1793902871806_1870a2bd.jpg` | Khoảnh khắc dạ tiệc tối sang trọng cùng Tổng Giám Đốc (CEO) Tina Nguyễn và Giám Đốc Khối Đại Lý (CAO) Manulife Việt Nam; khẳng định vị thế C-Level và sự ghi nhận cao nhất của Ban điều hành đối với Nhà Quản lý Xuất sắc nhất Châu Á. |
| **FIG. 05** | `GiaDinh_ChiVan_NgoiSofaPhongKhach.jpg` | **Section 7** (Điểm tựa cuộc sống - Trái) & **Reader Bài 09** (Bố Mẹ Đi Làm) | Đợt 1 | `f1.jpg` | Tổ ấm bình yên bên chồng và hai con tại phòng khách nhìn ra ban công xanh; điểm tựa vững chãi phía sau sự nghiệp và minh họa cho nghệ thuật "Hiện diện trọn vẹn". |
| **FIG. 06** | `GiaDinh_ChiVan_AuYemConBenSanVuon.jpg` | **Section 7** (Điểm tựa cuộc sống - Phải) | Đợt 1 | `f2.jpg` | Tình mẫu tử ấm áp bên con nhỏ nơi sân vườn; hình ảnh người mẹ thấu cảm, chu đáo. |
| **FIG. 07** | `DuLich_ChiVan_BayKhinhKhiCauBinhMinh_Panorama.jpg` | **Section 7** (Panorama Trung tâm) | **Đợt 1 (Panorama)** | `l1.jpg` | Toàn cảnh Panorama 4K đón bình minh rực rỡ trên khinh khí cầu tại thung lũng Cappadocia kèm thông điệp sống: *“Mỗi ngày mới là một hành trình đáng trân trọng. Cứ đi chắc từng bước, bình minh sẽ luôn ở phía trước.” — Nguyễn Thị Vân*. |
| **FIG. 08** | `DoiThuong_ChiVan_SelfiePhongTapGym.jpg` | **Section 7** (Phong cách sống 2/3) | Đợt 1 | `q1.jpg` | Tinh thần kỷ luật rèn luyện thể lực mỗi tuần tại phòng Gym; nguồn năng lượng tích cực bền bỉ. |
| **FIG. 09** | `DuLich_ChiVanCungChong_ChupAnhBenCangBien.jpg` | **Section 7** (Phong cách sống 3/3) | Đợt 1 | `q2.jpg` | Người bạn đời tri kỷ đồng hành bền vững qua mọi thăng trầm cuộc sống và sự nghiệp. |
| **FIG. 10** | `PhongDaoTao_ChiVan_ChiaSeTruyenLua.jpg` | **Section 05 — Hợp tác & Đồng hành** (Hàng 1 - Đào tạo F1) | Đợt 1 | `dao tao.jpg` | Người truyền lửa: Trực tiếp đứng lớp chia sẻ kiến thức quản trị thực chiến tại văn phòng Manulife. |
| **FIG. 11** | `SuKien_ChiVanCungDoiNgu_ChucMungThangCapSM.jpg` | **Section 05 — Hợp tác & Đồng hành** (Hàng 1 - Ươm mầm kế cận) | Đợt 1 | `q5.jpg` | Niềm tự hào của người thủ lĩnh khi đồng hành cùng các cộng sự thăng cấp Quản lý Cấp cao (SM). |
| **FIG. 12** | `VanPhong_ChiVanCungNhomQuanLy_SofaBenCuaSoViewDep.jpg` | **Section 05 — Hợp tác & Đồng hành** (Hàng 1 - Cố vấn chiến lược) | **Đợt 2** | `1793511781182...64c49.jpg` | Không gian cố vấn chiến lược C-Level bên sofa nhìn ra Landmark; đẳng cấp Private Wealth. |
| **FIG. 13** | `VanPhong_NhomQuanLyTre_LamViecTrenIpad.jpg` | **Section 05 — Hợp tác & Đồng hành** (Hàng 2 - Chuyển giao số hóa) | **Đợt 2** | `1793511781186...4ec4.jpg` | Văn hóa làm việc Agile: Chuyển giao quy trình tư vấn và quản trị thực chiến trên nền tảng số. |
| **FIG. 14** | `GanKet_DoiNguCoVu_ChucMungChiVan.jpg` | **Section 05 — Hợp tác & Đồng hành** (Hàng 2 - Văn hóa gắn kết) | **Đợt 2** | `1793510490717...afa1.jpg` | Sự đồng lòng chân thành: Hơn 30 cộng sự hò reo, cầm hoa và cúp chúc mừng người thủ lĩnh. |
| **FIG. 15** | `SanKhau_ChiVan_NangCupManPowerQuyenLuc.jpg` | **Section 05 — Hợp tác & Đồng hành** (Hàng 2 - Đỉnh cao quản trị) | **Đợt 2** | `1793510241529...f6e9.jpg` | Khí chất C-Level: Khoảnh khắc nâng cúp vàng ManPower trong đầm dạ hội xanh lục bảo quyền quý. |
| **FIG. 16** | `VanPhong_ChiVanDieuHanhCuocHopBanBauDuc.jpg` | **Section 02 — Góc nhìn & Bài viết** (Bìa & Reader: Bài 01) | **Đợt 2** | `1793511781180...e70b0c59.jpg` | Chị Khánh Vân chủ trì phiên làm việc chuyên sâu về cơ chế bảo vệ và chuyển giao gia sản tại bàn họp. |
| **FIG. 17** | `VanPhong_NhomQuanLy_ThaoLuanTaiLieuThucChien.jpg` | **Section 02 — Góc nhìn & Bài viết** (Bìa & Reader: Bài 02) | **Đợt 2** | `1793511781184...9135c11c.jpg` | Đội ngũ quản lý thảo luận tài liệu thực chiến trên iPad & sổ tay; trực quan hóa phân tích cấu trúc phí và dòng tiền. |
| **FIG. 18** | `Studio_ChiVanCungDoiNgu_KhoanhKhacVuiVe.jpg` | **Section 02 — Góc nhìn & Bài viết** (Bìa & Reader: Bài 03) | **Đợt 2** | `1793510241453...e522.jpg` | Khoảnh khắc chân thành, nụ cười đồng đội ấm áp; minh chứng sống động cho giá trị của sự tử tế và chữ Tín bền lâu. |
| **FIG. 19** | `VanPhong_NhomQuanLy_TraoDoiCongViecBenTablet.jpg` | **Section 02 — Góc nhìn & Bài viết** (Bìa & Reader: Tiền gửi sinh lời ít đi) | **Đợt 2** | `1793511781190...82044317bfe12499fec5353b3d974880.jpg` (Số 68) | Các chuyên gia tư vấn tinh hoa trao đổi giải pháp trên tablet bên khung cửa sổ view bầu trời thoáng đãng; biểu trưng cho góc nhìn quản trị thanh khoản và lớp đệm bảo vệ dòng tiền gia đình. |
| **FIG. 20** | `VanPhong_ChiVanCungDoiNgu_BanHopXanhLa.jpg` | **Section 02 — Góc nhìn & Bài viết** (Bìa & Reader: Âm 29,5% một năm) | **Đợt 2** | `1793510241380...b8f1fc194928e43deabdadff1967507c.jpg` (Số 02) | Chị Khánh Vân chủ trì thảo luận chiến lược dài hạn cùng đội ngũ quản lý quanh bàn họp xanh lá Manulife; biểu trưng cho tính kỷ luật và sự kiên định cùng thị trường đi qua chu kỳ biến động. |
| **FIG. 21** | `VanPhong_ChiVanCung5NuQuanLy_SanhVomTron.jpg` | **Section 02 — Góc nhìn & Bài viết** (Bìa & Reader: Ca bồi thường 171 triệu) | **Đợt 2** | `1793511781132...0cdc59fde5a39fa20bf132489a09760b.jpg` (Số 47) | Chị Khánh Vân ân cần hướng dẫn các cộng sự quản lý tại sảnh vòm tròn Manulife; biểu trưng cho sự tận tâm hỗ trợ bồi thường quyền lợi và bảo vệ toàn diện sức khỏe cho các gia đình. |
| **FIG. 22** | `SanKhau_ChiVan_ManHinhLED_Top1FYP2025.jpg` | **Section 4 — Chương II** (Cú đúp Quán quân 2025) | **Đợt 3** | `media_1794057068026_08e77cb2.jpg` | Sân khấu LED vinh danh Top 1 DRD+ Quản lý cấp cao dẫn đầu tỷ lệ hoàn thành chỉ tiêu FYP năm 2025; minh chứng năng lực khai thác kinh doanh và tốc độ bứt phá quy mô dẫn đầu toàn quốc song hành cùng tỷ lệ duy trì Top 1. |
| **FIG. 23** | `DoiThuong_ChiVan_PhongTapGym_Ngang.jpg` | **Section 03 — Góc nhìn & Bài viết** (Bìa & Reader: Bài 11 Kỷ luật Bản thân) | Đợt 1 (Crop 16:10) | `q1.jpg` | Khung hình ngang chuẩn 16:10 ghi lại khoảnh khắc rèn luyện thể lực tại phòng Gym của chị Khánh Vân; biểu trưng cho sức bền thể chất, tính kỷ luật tự giác và sự điềm tĩnh của người lãnh đạo. |
| **FIG. 24** | `Studio_ChiVanCungNuQuanLy_NuCuoiTuoiTan.jpg` | **Section 03 — Góc nhìn & Bài viết** (Bìa & Reader: Bài 07 Bước ra vùng an toàn) | **Đợt 2** | Số 19 (Bối cảnh 14 - Vest Xanh Mint) | Chị Khánh Vân đứng trung tâm cùng các nữ quản lý trong trang phục vest xanh mint thanh lịch; đại diện cho thế hệ quản lý bản lĩnh bước ra khỏi vùng an toàn công sở để làm chủ sự nghiệp. |
| **FIG. 25** | `SuKien_ChiVanCungDoiNguMTA_NangCupHuanLuyen.jpg` | **Section 03 — Góc nhìn & Bài viết** (Bìa & Reader: Bài 08 Ba phẩm chất quản lý) | **Đợt 2** | Số 33 (Bối cảnh 9 - Sự kiện MTA) | Chị Khánh Vân cùng đội ngũ quản lý nâng cúp vinh danh Top 1–Top 5 Manulife Talent Attractor (MTA); minh chứng cho triết lý lãnh đạo bằng sự thấu cảm và lấy sự trưởng thành của cộng sự làm thành tựu. |
| **FIG. 26** | `VanPhong_ChiVanCungDoiNgu_QuyetTamHanhTrinhToaSang.jpg` | **Section 03 — Góc nhìn & Bài viết** (Bìa & Reader: Bài 10 Ba nguyên tắc dòng tiền) | **Đợt 2** | Số 04 (Bối cảnh Văn phòng Hợp đồng Manulife) | Chị Khánh Vân trong vest trắng trung tâm cùng đội ngũ quản lý nâng cao bộ Hợp đồng Bảo hiểm Nhân thọ Manulife; biểu trưng cho lá chắn bảo toàn dòng tiền và tương lai học vấn của mỗi gia đình. |

---

## III. QUY TẮC CẬP NHẬT & ĐIỀU PHỐI HÌNH ẢNH TRONG TƯƠNG LAI

* **Ảnh lưu trữ chất lượng cao sẵn sàng sử dụng:** `SuKien_ChiVanCungCEO_ChupAnhTiecToi.jpg` (ảnh cùng Tổng Giám Đốc CEO Manulife) được lưu trữ an toàn trong `public/images/` và `Anh_Da_Phan_Tich/`, sẵn sàng dùng cho các bài viết chuyên sâu về ngoại giao C-Level.

1. **Nguyên tắc "1 Bối cảnh = 1 Ảnh duy nhất trên Web":**
   - Tuyệt đối không đăng lặp lại 2 ảnh cùng một góc chụp/trang phục để giữ cho giao diện website luôn thanh thoát chuẩn tạp chí thượng lưu.
2. **Quy trình khi muốn thay ảnh trên Website:**
   - **Bước 1:** Tra cứu trong thư mục `Anh_Da_Phan_Tich_Dot_2/` hoặc file `Meta_PhanTich_Anh_Dot_2.md` để chọn ảnh ưng ý.
   - **Bước 2:** Copy ảnh từ `Anh_Da_Phan_Tich_Dot_2/` sang thư mục `public/images/`.
   - **Bước 3:** Cập nhật đường dẫn trong `src/App.tsx`.
   - **Bước 4:** Cập nhật lại dòng tương ứng trong file `DANH_MUC_QUAN_LY_HINH_ANH.md` này.
3. **Khai thác kho ảnh còn lại (63 ảnh trong Kho Đợt 2):**
   - **Làm bài viết Facebook / Website định kỳ:** Sử dụng các ảnh trong nhóm *Bàn họp xanh lá*, *Studio kính râm*, *Lễ trao giải Áo Dài 2025* và các *Poster thành tích*.
   - **Làm Slide tài liệu đào tạo F1 & Tuyển dụng:** Sử dụng các ảnh nhóm *Đại gia đình 35+ nhân sự sảnh Manulife* và *Chụp cùng CEO*.
