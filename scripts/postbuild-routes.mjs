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
    '<title>Hồ sơ Ban Điều Hành & Đội ngũ Quản lý | Green Power Group</title>\n    <meta name="robots" content="noindex, nofollow" />'
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
    '<meta name="description" content="Cổng thông tin dành riêng để Ban Điều Hành và đội ngũ quản lý Green Power Group (Manulife Việt Nam) cập nhật hồ sơ thương hiệu và ảnh chân dung HD." />'
  )
  .replace(
    /<meta\s+[^>]*property="og:title"[^>]*>/,
    '<meta property="og:title" content="Hồ sơ Ban Điều Hành & Đội ngũ Quản lý | Green Power Group" />'
  )
  .replace(
    /<meta\s+[^>]*name="twitter:title"[^>]*>/,
    '<meta name="twitter:title" content="Hồ sơ Ban Điều Hành & Đội ngũ Quản lý | Green Power Group" />'
  )
  .replace(
    /<meta\s+[^>]*property="og:description"[^>]*>/,
    '<meta property="og:description" content="Cổng thông tin dành riêng để Ban Điều Hành và đội ngũ quản lý Green Power Group (Manulife Việt Nam) cập nhật hồ sơ thương hiệu và ảnh chân dung HD." />'
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
    '<title>Green Power Group | Ban Điều Hành & Đội ngũ Quản lý</title>\n    <meta name="robots" content="noindex, nofollow" />'
  )
  .replace(
    /<link\s+rel="canonical"[^>]*>/,
    '<link rel="canonical" href="https://www.khanhvanfinance.com/green-power" />'
  )
  .replace(
    /<meta\s+[^>]*property="og:url"[^>]*>/,
    '<meta property="og:url" content="https://www.khanhvanfinance.com/green-power" />'
  )
  .replace(
    /<meta\s+[^>]*name="description"[^>]*>/,
    '<meta name="description" content="Khám phá Green Power Group tại Manulife Việt Nam: hơn 500 nhân sự, 64 quản lý kinh doanh tại 4 khu vực HCM69, SG168, SG169, MN111 cùng hồ sơ chi tiết của đội ngũ lãnh đạo và quản lý." />'
  )
  .replace(
    /<meta\s+[^>]*property="og:title"[^>]*>/,
    '<meta property="og:title" content="Green Power Group | Ban Điều Hành & Đội ngũ Quản lý" />'
  )
  .replace(
    /<meta\s+[^>]*name="twitter:title"[^>]*>/,
    '<meta name="twitter:title" content="Green Power Group | Ban Điều Hành & Đội ngũ Quản lý" />'
  )
  .replace(
    /<meta\s+[^>]*property="og:description"[^>]*>/,
    '<meta property="og:description" content="Khám phá Green Power Group tại Manulife Việt Nam: hơn 500 nhân sự, 64 quản lý kinh doanh tại 4 khu vực HCM69, SG168, SG169, MN111 cùng hồ sơ chi tiết của đội ngũ lãnh đạo và quản lý." />'
  )
  .replace(
    /<meta\s+[^>]*property="og:image"[^>]*>/,
    '<meta property="og:image" content="https://www.khanhvanfinance.com/images/BanDieuHanh_ChiVanCungTapTheQuanLy_OG.jpg" />'
  )
  .replace(
    /<meta\s+[^>]*name="twitter:image"[^>]*>/,
    '<meta name="twitter:image" content="https://www.khanhvanfinance.com/images/BanDieuHanh_ChiVanCungTapTheQuanLy_OG.jpg" />'
  );

fs.writeFileSync(path.join(distDir, 'green-power.html'), previewHtml, 'utf8');
fs.writeFileSync(path.join(distDir, 'vung-green-power.html'), previewHtml, 'utf8');
fs.writeFileSync(path.join(distDir, 'vung-khanh-van.html'), previewHtml, 'utf8');
fs.writeFileSync(path.join(distDir, 'xem-truoc-vung-khanh-van.html'), previewHtml, 'utf8');

const journeysHtml = baseWithoutHeroPreload
  .replace(
    /<title>[\s\S]*?<\/title>/,
    '<title>Khánh Vân &amp; Những Chuyến Đi | Dấu ấn M-Star, Đội ngũ &amp; Tổ ấm</title>\n    <meta name="robots" content="noindex, nofollow" />'
  )
  .replace(
    /<link\s+rel="canonical"[^>]*>/,
    '<link rel="canonical" href="https://www.khanhvanfinance.com/nhung-chuyen-di" />'
  )
  .replace(
    /<meta\s+[^>]*property="og:url"[^>]*>/,
    '<meta property="og:url" content="https://www.khanhvanfinance.com/nhung-chuyen-di" />'
  )
  .replace(
    /<meta\s+[^>]*name="description"[^>]*>/,
    '<meta name="description" content="Nhật ký 11 chương hành trình qua hơn 16 quốc gia, 141 khung hình thực tế và 8 thước phim sống động của Khánh Vân cùng gia đình và đội ngũ quản lý từ Paris, Seoul, Hallstatt, Thượng Hải, Phú Sĩ, Trùng Khánh đến Yên Tử, Phan Thiết và Đắk Lắk." />'
  )
  .replace(
    /<meta\s+[^>]*property="og:title"[^>]*>/,
    '<meta property="og:title" content="Khánh Vân &amp; Những Chuyến Đi | Dấu ấn M-Star, Đội ngũ &amp; Tổ ấm" />'
  )
  .replace(
    /<meta\s+[^>]*name="twitter:title"[^>]*>/,
    '<meta name="twitter:title" content="Khánh Vân &amp; Những Chuyến Đi | Dấu ấn M-Star, Đội ngũ &amp; Tổ ấm" />'
  )
  .replace(
    /<meta\s+[^>]*property="og:description"[^>]*>/,
    '<meta property="og:description" content="Khám phá 11 chương ký ức qua hơn 16 quốc gia, 141 khung hình chọn lọc và 8 thước phim hành trình thực tế của Khánh Vân cùng gia đình và Green Power Group." />'
  )
  .replace(
    /<meta\s+[^>]*property="og:image"[^>]*>/,
    '<meta property="og:image" content="https://www.khanhvanfinance.com/images/journeys/nhung-chuyen-di-og.jpg?v=2" />'
  )
  .replace(
    /<meta\s+[^>]*name="twitter:image"[^>]*>/,
    '<meta name="twitter:image" content="https://www.khanhvanfinance.com/images/journeys/nhung-chuyen-di-og.jpg?v=2" />'
  );

fs.writeFileSync(path.join(distDir, 'nhung-chuyen-di.html'), journeysHtml, 'utf8');
fs.writeFileSync(path.join(distDir, 'dong-hanh-cung-khanh-van.html'), journeysHtml, 'utf8');

console.log('Generated static route HTML files + journeys page + regional page.');
