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
    '<title>Hồ sơ Ban Điều Hành & Đội ngũ Quản lý | Hệ thống Vùng Khánh Vân</title>\n    <meta name="robots" content="noindex, nofollow" />'
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
    '<meta name="description" content="Cổng thông tin dành riêng để Ban Điều Hành và đội ngũ quản lý Hệ thống Vùng Khánh Vân (Manulife Việt Nam) cập nhật hồ sơ thương hiệu và ảnh chân dung HD." />'
  )
  .replace(
    /<meta\s+[^>]*property="og:title"[^>]*>/,
    '<meta property="og:title" content="Hồ sơ Ban Điều Hành & Đội ngũ Quản lý | Hệ thống Vùng Khánh Vân" />'
  )
  .replace(
    /<meta\s+[^>]*name="twitter:title"[^>]*>/,
    '<meta name="twitter:title" content="Hồ sơ Ban Điều Hành & Đội ngũ Quản lý | Hệ thống Vùng Khánh Vân" />'
  )
  .replace(
    /<meta\s+[^>]*property="og:description"[^>]*>/,
    '<meta property="og:description" content="Cổng thông tin dành riêng để Ban Điều Hành và đội ngũ quản lý Hệ thống Vùng Khánh Vân (Manulife Việt Nam) cập nhật hồ sơ thương hiệu và ảnh chân dung HD." />'
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
    '<title>Hệ thống Vùng Khánh Vân | Ban Điều Hành & Đội ngũ Quản lý</title>\n    <meta name="robots" content="noindex, nofollow" />'
  )
  .replace(
    /<link\s+rel="canonical"[^>]*>/,
    '<link rel="canonical" href="https://www.khanhvanfinance.com/vung-khanh-van" />'
  )
  .replace(
    /<meta\s+[^>]*property="og:url"[^>]*>/,
    '<meta property="og:url" content="https://www.khanhvanfinance.com/vung-khanh-van" />'
  )
  .replace(
    /<meta\s+[^>]*name="description"[^>]*>/,
    '<meta name="description" content="Khám phá Hệ thống Vùng Khánh Vân tại Manulife Việt Nam: hơn 500 nhân sự, 64 quản lý kinh doanh tại 4 khu vực HCM69, SG168, SG169, MN111 cùng hồ sơ chi tiết của đội ngũ lãnh đạo và quản lý." />'
  )
  .replace(
    /<meta\s+[^>]*property="og:title"[^>]*>/,
    '<meta property="og:title" content="Hệ thống Vùng Khánh Vân | Ban Điều Hành & Đội ngũ Quản lý" />'
  )
  .replace(
    /<meta\s+[^>]*name="twitter:title"[^>]*>/,
    '<meta name="twitter:title" content="Hệ thống Vùng Khánh Vân | Ban Điều Hành & Đội ngũ Quản lý" />'
  )
  .replace(
    /<meta\s+[^>]*property="og:description"[^>]*>/,
    '<meta property="og:description" content="Khám phá Hệ thống Vùng Khánh Vân tại Manulife Việt Nam: hơn 500 nhân sự, 64 quản lý kinh doanh tại 4 khu vực HCM69, SG168, SG169, MN111 cùng hồ sơ chi tiết của đội ngũ lãnh đạo và quản lý." />'
  )
  .replace(
    /<meta\s+[^>]*property="og:image"[^>]*>/,
    '<meta property="og:image" content="https://www.khanhvanfinance.com/images/BanDieuHanh_ChiVanCungTapTheQuanLy_OG.jpg" />'
  )
  .replace(
    /<meta\s+[^>]*name="twitter:image"[^>]*>/,
    '<meta name="twitter:image" content="https://www.khanhvanfinance.com/images/BanDieuHanh_ChiVanCungTapTheQuanLy_OG.jpg" />'
  );

fs.writeFileSync(path.join(distDir, 'vung-khanh-van.html'), previewHtml, 'utf8');
fs.writeFileSync(path.join(distDir, 'xem-truoc-vung-khanh-van.html'), previewHtml, 'utf8');

console.log('Generated static route HTML files + private preview page.');
