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

Hiện tại website đang sử dụng chính thức **18 bức ảnh tinh hoa (FIG. 01 đến FIG. 18)** được phân bổ chính xác theo các phần nội dung:

| Mã Fig | Tên File Trong `public/images/` | Vị trí trên Website | Nguồn gốc | Tên file gốc ban đầu | Ý nghĩa & Thông điệp truyền tải |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **FIG. 01** | `VanPhong_ChiVanCungTapThe_AnhSangTuNhien.jpg` | **Hero Section** (Ảnh mở đầu trang web) | **Đợt 2** | `1793511781173...48d5bc65.jpg` (Số 60) | Thủ lĩnh Khánh Vân ngồi ghế trung tâm trong trang phục vest trắng thanh lịch cùng hơn 35 nữ quản lý & chuyên viên tinh hoa trong trang phục vest xanh đồng bộ tại sảnh văn phòng Manulife; khẳng định quy mô, tầm vóc và uy tín của Giám đốc Vùng Cấp cao. |
| **FIG. 02** | `VanPhong_ChiVan_HuongDanDoiNguBanHop.jpg` | **Section 4 — Chương I** (2009–2017) | **Đợt 2** | `1793510241398...dabe.jpg` (Số 03) | Chị Khánh Vân chủ trì hướng dẫn đội ngũ bên bàn họp chiến lược văn phòng Manulife; đại diện cho tác phong làm việc bài bản, chỉn chu từ nền tảng vận hành ngân hàng ANZ. |
| **FIG. 03** | `SanKhau_ChiVan_NhanGiaiTop1DuyTriHopDong2025.jpg` | **Section 4 — Chương II** (Bước ngoặt 2018) | Đợt 1 | `a2.jpg` | Ảnh nhận giải sân khấu duy nhất trong 3 chương: Vinh danh Top 1 DRD+ Tỷ lệ duy trì hợp đồng 2025 &mdash; bảo chứng cho chữ "Tín" và niềm tin dài hạn của khách hàng. |
| **FIG. 04** | `SuKien_ChiVanCungCEO_ChupAnhTiecToi.jpg` | **Section 4 — Chương III** (2018–nay) | Đợt 1 | `chup cung CEO manulife.jpg` | Khoảnh khắc dạ tiệc tối sang trọng cùng Tổng Giám Đốc (CEO) Manulife Việt Nam; khẳng định vị thế C-Level và sự ghi nhận cao nhất của Ban điều hành đối với Nhà Quản lý Xuất sắc nhất Châu Á. |
| **FIG. 05** | `GiaDinh_ChiVan_NgoiSofaPhongKhach.jpg` | **Section 7** (Điểm tựa cuộc sống - Trái) | Đợt 1 | `f1.jpg` | Tổ ấm bình yên bên chồng và hai con tại phòng khách; điểm tựa vững chãi phía sau sự nghiệp. |
| **FIG. 06** | `GiaDinh_ChiVan_AuYemConBenSanVuon.jpg` | **Section 7** (Điểm tựa cuộc sống - Phải) | Đợt 1 | `f2.jpg` | Tình mẫu tử ấm áp bên con nhỏ nơi sân vườn; hình ảnh người mẹ thấu cảm, chu đáo. |
| **FIG. 07** | `DuLich_ChiVan_BayKhinhKhiCauBinhMinh.jpg` | **Section 7** (Phong cách sống 1/3) | Đợt 1 | `l1.jpg` | Đón bình minh trên khinh khí cầu Cappadocia; khát vọng tự do và tầm nhìn vươn tầm quốc tế. |
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
