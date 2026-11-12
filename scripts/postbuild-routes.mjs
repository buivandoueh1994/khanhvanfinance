import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

const baseWithoutHeroPreload = baseHtml.replace(
  /\s*<link\s+rel="preload"\s+as="image"[\s\S]*?\/>/g,
  ''
);

const leaderFormHtml = baseWithoutHeroPreload
  .replace(
    /<title>[\s\S]*?<\/title>/,
    '<title>Hồ Sơ Ban Điều Hành & Đội Ngũ Quản Lý — Hệ Thống Vùng Khánh Vân</title>\n    <meta name="robots" content="noindex, nofollow" />'
  )
  .replace(
    /<link\s+rel="canonical"[^>]*>/,
    '<link rel="canonical" href="https://www.khanhvanfinance.com/ho-so-quan-ly" />'
  )
  .replace(
    /<meta\s+[^>]*property="og:url"[^>]*>/,
    '<meta property="og:url" content="https://www.khanhvanfinance.com/ho-so-quan-ly" />'
  )
  .replace(
    /<meta\s+[^>]*name="description"[^>]*>/,
    '<meta name="description" content="Cổng thông tin dành riêng cho Ban Điều Hành & đội ngũ Quản lý Hệ thống Vùng Khánh Vân (Manulife Việt Nam) cập nhật hồ sơ thương hiệu và ảnh chân dung HD." />'
  )
  .replace(
    /<meta\s+[^>]*property="og:title"[^>]*>/,
    '<meta property="og:title" content="Hồ Sơ Ban Điều Hành & Đội Ngũ Quản Lý — Hệ Thống Vùng Khánh Vân" />'
  )
  .replace(
    /<meta\s+[^>]*name="twitter:title"[^>]*>/,
    '<meta name="twitter:title" content="Hồ Sơ Ban Điều Hành & Đội Ngũ Quản Lý — Hệ Thống Vùng Khánh Vân" />'
  )
  .replace(
    /<meta\s+[^>]*property="og:description"[^>]*>/,
    '<meta property="og:description" content="Cổng thông tin dành riêng cho Ban Điều Hành & đội ngũ Quản lý Hệ thống Vùng Khánh Vân (Manulife Việt Nam) cập nhật hồ sơ thương hiệu và ảnh chân dung HD." />'
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
  'ho-so-vung-khanh-van.html',
  'ho-so-leader.html',
  'form-leader.html',
  'quan-ly-ho-so-leader.html',
];

for (const page of pages) {
  fs.writeFileSync(path.join(distDir, page), leaderFormHtml, 'utf8');
}

const previewHtml = baseWithoutHeroPreload
  .replace(
    /<title>[\s\S]*?<\/title>/,
    '<title>Hệ Thống Vùng Khánh Vân — Ban Điều Hành & Đội Ngũ Quản Lý</title>\n    <meta name="robots" content="noindex, nofollow" />'
  )
  .replace(
    /<link\s+rel="canonical"[^>]*>/,
    '<link rel="canonical" href="https://www.khanhvanfinance.com/xem-truoc-vung-khanh-van" />'
  )
  .replace(
    /<meta\s+[^>]*property="og:url"[^>]*>/,
    '<meta property="og:url" content="https://www.khanhvanfinance.com/xem-truoc-vung-khanh-van" />'
  )
  .replace(
    /<meta\s+[^>]*property="og:title"[^>]*>/,
    '<meta property="og:title" content="Hệ Thống Vùng Khánh Vân — Ban Điều Hành & Đội Ngũ Quản Lý" />'
  )
  .replace(
    /<meta\s+[^>]*property="og:image"[^>]*>/,
    '<meta property="og:image" content="https://www.khanhvanfinance.com/images/BanDieuHanh_ChiVanCungTapTheQuanLy_OG.jpg" />'
  );

fs.writeFileSync(path.join(distDir, 'xem-truoc-vung-khanh-van.html'), previewHtml, 'utf8');

console.log('Generated static route HTML files + private preview page.');
