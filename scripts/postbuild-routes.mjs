import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

const leaderFormHtml = baseHtml
  .replace(
    /<title>[\s\S]*?<\/title>/,
    '<title>Hồ Sơ Ban Điều Hành & Đội Ngũ Quản Lý — Hệ Thống Khánh Vân (HCM69)</title>'
  )
  .replace(
    /<meta\s+[^>]*name="description"[^>]*>/,
    '<meta name="description" content="Cổng thông tin dành riêng cho Ban Điều Hành & đội ngũ Quản lý Hệ thống Khánh Vân (Manulife Khu vực HCM69) cập nhật hồ sơ thương hiệu và ảnh chân dung HD." />'
  )
  .replace(
    /<meta\s+[^>]*property="og:title"[^>]*>/,
    '<meta property="og:title" content="Hồ Sơ Ban Điều Hành & Đội Ngũ Quản Lý — Hệ Thống Khánh Vân" />'
  )
  .replace(
    /<meta\s+[^>]*name="twitter:title"[^>]*>/,
    '<meta name="twitter:title" content="Hồ Sơ Ban Điều Hành & Đội Ngũ Quản Lý — Hệ Thống Khánh Vân" />'
  )
  .replace(
    /<meta\s+[^>]*property="og:description"[^>]*>/,
    '<meta property="og:description" content="Cổng thông tin dành riêng cho Ban Điều Hành & đội ngũ Quản lý Hệ thống Khánh Vân (Manulife Khu vực HCM69) cập nhật hồ sơ thương hiệu và ảnh chân dung HD." />'
  )
  .replace(
    /<meta\s+[^>]*property="og:image"[^>]*>/,
    '<meta property="og:image" content="https://www.khanhvanfinance.com/images/BanDieuHanh_ChiVanCungTapTheQuanLy_OG.jpg" />'
  )
  .replace(
    /<meta\s+[^>]*name="twitter:image"[^>]*>/,
    '<meta name="twitter:image" content="https://www.khanhvanfinance.com/images/BanDieuHanh_ChiVanCungTapTheQuanLy_OG.jpg" />'
  );

const pages = [
  'ho-so-quan-ly.html',
  'ho-so-ban-dieu-hanh.html',
  'ho-so-leader.html',
  'form-leader.html',
  'quan-ly-ho-so-leader.html',
];

for (const page of pages) {
  fs.writeFileSync(path.join(distDir, page), leaderFormHtml, 'utf8');
}

console.log('Generated static route HTML files with Ban Dieu Hanh OG preview:', pages.join(', '));
