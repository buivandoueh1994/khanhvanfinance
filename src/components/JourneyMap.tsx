import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Camera, Compass, MapPin, Play } from 'lucide-react';
import { JOURNEY_CHAPTERS, JourneyChapter } from '../data/journeys';

interface MapPinSpec {
  slug: string;
  shortName: string;
  stampCode: string;
  stampYear: string;
  region: 'international' | 'vietnam';
  // Coordinates on Eurasia viewBox 0..1000 x 0..500
  x: number;
  y: number;
  labelDx?: number;
  labelDy?: number;
  align?: 'start' | 'middle' | 'end';
}

const ORIGIN_HCMC = { x: 656, y: 404 };

// Carefully spaced cartographic pins on stylized Eurasia-Pacific viewBox (1000x500)
const MAP_PINS: MapPinSpec[] = [
  {
    slug: 'phap-2019',
    shortName: 'Paris',
    stampCode: 'PAR • FR',
    stampYear: '2019',
    region: 'international',
    x: 132,
    y: 162,
    labelDx: 0,
    labelDy: -16,
    align: 'middle',
  },
  {
    slug: 'ao-duc-2024',
    shortName: 'Hallstatt & Munich',
    stampCode: 'MUC • AUT',
    stampYear: '2024',
    region: 'international',
    x: 204,
    y: 170,
    labelDx: 12,
    labelDy: -15,
    align: 'start',
  },
  {
    slug: 'trung-khanh-2026',
    shortName: 'Trùng Khánh',
    stampCode: 'CKG • CN',
    stampYear: '2026',
    region: 'international',
    x: 646,
    y: 266,
    labelDx: -12,
    labelDy: -10,
    align: 'end',
  },
  {
    slug: 'nam-ninh-2024',
    shortName: 'Nam Ninh',
    stampCode: 'NNG • CN',
    stampYear: '2024',
    region: 'international',
    x: 668,
    y: 318,
    labelDx: -14,
    labelDy: 4,
    align: 'end',
  },
  {
    slug: 'thuong-hai-2025',
    shortName: 'Thượng Hải',
    stampCode: 'PVG • CN',
    stampYear: '2025',
    region: 'international',
    x: 748,
    y: 262,
    labelDx: 0,
    labelDy: 22,
    align: 'middle',
  },
  {
    slug: 'han-quoc-2024',
    shortName: 'Seoul',
    stampCode: 'ICN • KR',
    stampYear: '2024',
    region: 'international',
    x: 794,
    y: 214,
    labelDx: 0,
    labelDy: -16,
    align: 'middle',
  },
  {
    slug: 'nhat-ban-2026',
    shortName: 'Phú Sĩ & Tokyo',
    stampCode: 'TYO • JP',
    stampYear: '2026',
    region: 'international',
    x: 874,
    y: 230,
    labelDx: 0,
    labelDy: -16,
    align: 'middle',
  },
  // Vietnam stops (rendered inside dedicated inset panel AND highlighted cleanly)
  {
    slug: 'yen-tu-vinh-danh-2025',
    shortName: 'Yên Tử',
    stampCode: 'QNH • VN',
    stampYear: '2025',
    region: 'vietnam',
    x: 664,
    y: 344,
    labelDx: 14,
    labelDy: 3,
    align: 'start',
  },
  {
    slug: 'thien-nguyen-dak-lak-2026',
    shortName: 'Đắk Lắk',
    stampCode: 'BMV • VN',
    stampYear: '2026',
    region: 'vietnam',
    x: 678,
    y: 382,
    labelDx: 14,
    labelDy: -2,
    align: 'start',
  },
  {
    slug: 'kickoff-phan-thiet-2026',
    shortName: 'Phan Thiết',
    stampCode: 'BTH • VN',
    stampYear: '2026',
    region: 'vietnam',
    x: 682,
    y: 412,
    labelDx: 14,
    labelDy: 6,
    align: 'start',
  },
  {
    slug: 'diem-tua-to-am',
    shortName: 'Tổ Ấm & Đà Lạt',
    stampCode: 'HOME • VN',
    stampYear: '2024–2026',
    region: 'vietnam',
    x: 656,
    y: 404,
    labelDx: -14,
    labelDy: 16,
    align: 'end',
  },
];

interface JourneyMapProps {
  onOpenChapter: (chapter: JourneyChapter) => void;
}

export const JourneyMap: React.FC<JourneyMapProps> = ({ onOpenChapter }) => {
  const [activeSlug, setActiveSlug] = useState<string>('nhat-ban-2026');
  const [regionFilter, setRegionFilter] = useState<'all' | 'international' | 'vietnam'>('all');

  const chapterBySlug = useMemo(() => {
    const map: Record<string, JourneyChapter> = {};
    for (const c of JOURNEY_CHAPTERS) map[c.slug] = c;
    return map;
  }, []);

  const visiblePins = useMemo(() => {
    if (regionFilter === 'all') return MAP_PINS;
    return MAP_PINS.filter((p) => p.region === regionFilter);
  }, [regionFilter]);

  const activePin = useMemo(
    () => MAP_PINS.find((p) => p.slug === activeSlug) || MAP_PINS[6],
    [activeSlug]
  );

  const activeChapter = chapterBySlug[activePin.slug] || JOURNEY_CHAPTERS[0];

  const makeArcPath = (tx: number, ty: number) => {
    const mx = (ORIGIN_HCMC.x + tx) / 2;
    const dist = Math.hypot(tx - ORIGIN_HCMC.x, ty - ORIGIN_HCMC.y);
    const lift = Math.min(145, Math.max(26, dist * 0.28));
    const my = Math.min(ORIGIN_HCMC.y, ty) - lift;
    return `M ${ORIGIN_HCMC.x} ${ORIGIN_HCMC.y} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${tx} ${ty}`;
  };

  return (
    <section
      id="ban-do-hanh-trinh"
      className="scroll-mt-24 py-14 sm:py-22 bg-[#072116] text-[#FAF9F5] border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-[#E8D3A6] font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>01 / Bản Đồ Dấu Chân • Hai Cuốn Hộ Chiếu</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-white font-normal leading-[1.16]">
              Từ TP. Hồ Chí Minh tỏa ra 7 điểm đến quốc tế và 4 miền ký ức Việt Nam
            </h2>
            <p className="text-xs sm:text-sm text-[#BDD0C6] leading-relaxed">
              Chạm vào từng tọa độ vàng đồng trên bản đồ hoặc chọn nhanh tên điểm đến bên dưới để mở dấu mộc hộ chiếu và câu chuyện phía sau mỗi chuyến đi.
            </p>
          </div>

          {/* Region Toggle */}
          <div className="inline-flex items-center p-1 rounded-[3px] bg-white/[0.06] border border-white/12 self-start lg:self-auto">
            {[
              { key: 'all' as const, label: 'Toàn bộ (11)' },
              { key: 'international' as const, label: 'Năm châu (7)' },
              { key: 'vietnam' as const, label: 'Việt Nam (4)' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setRegionFilter(tab.key);
                  const first =
                    tab.key === 'all'
                      ? MAP_PINS[6]
                      : MAP_PINS.find((p) => p.region === tab.key);
                  if (first) setActiveSlug(first.slug);
                }}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold rounded-[2px] transition-colors cursor-pointer ${
                  regionFilter === tab.key
                    ? 'bg-[#E8D3A6] text-[#072116]'
                    : 'text-[#C6D6CE] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main 12-Col Cartography + Passport Stamp Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
          {/* Left: Museum-Grade Stylized Eurasia & Pacific SVG Map */}
          <div className="lg:col-span-8 bg-[#0A2C1D] border border-[#E8D3A6]/20 rounded-[5px] p-3 sm:p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#9BB5A8] pb-2 border-b border-white/10">
              <span>Lộ trình Á &amp; Âu • 2019–2026</span>
              <span className="text-[#E8D3A6]">Đang xem: {activePin.shortName}</span>
            </div>

            <div className="relative w-full aspect-[2/1] my-2 select-none">
              <svg
                viewBox="0 0 1000 500"
                className="w-full h-full"
                role="img"
                aria-label="Bản đồ hành trình từ TP. Hồ Chí Minh đến Châu Âu, Đông Á và Việt Nam"
              >
                <defs>
                  <radialGradient id="mapGlow" cx="55%" cy="55%" r="60%">
                    <stop offset="0%" stopColor="#124730" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#072116" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width="1000" height="500" fill="url(#mapGlow)" />

                {/* Fine Cartographic Graticule Lines */}
                {[100, 200, 300, 400].map((gy) => (
                  <line
                    key={`h-${gy}`}
                    x1="0"
                    y1={gy}
                    x2="1000"
                    y2={gy}
                    stroke="#E8D3A6"
                    strokeOpacity="0.07"
                    strokeDasharray="3 6"
                  />
                ))}
                {[160, 330, 500, 670, 840].map((gx) => (
                  <line
                    key={`v-${gx}`}
                    x1={gx}
                    y1="0"
                    x2={gx}
                    y2="500"
                    stroke="#E8D3A6"
                    strokeOpacity="0.07"
                    strokeDasharray="3 6"
                  />
                ))}

                {/* Stylized Clean Eurasia Landmass Silhouette (Minimalist Editorial Cartography) */}
                <path
                  d="M 62 215 L 88 182 L 112 152 L 145 130 L 185 110 L 235 92 L 308 82 L 405 72 L 515 74 L 628 84 L 740 104 L 832 135 L 845 162 L 802 184 L 778 216 L 762 246 L 758 282 L 732 315 L 694 334 L 678 358 L 688 394 L 676 426 L 650 434 L 634 405 L 626 370 L 600 356 L 575 376 L 552 356 L 515 322 L 478 345 L 444 306 L 402 276 L 368 292 L 325 272 L 292 248 L 245 246 L 210 232 L 175 242 L 138 232 L 94 238 Z"
                  fill="#123C29"
                  stroke="#296649"
                  strokeWidth="1.2"
                />

                {/* UK & Ireland hint */}
                <path
                  d="M 96 122 L 114 114 L 122 138 L 100 144 Z"
                  fill="#123C29"
                  stroke="#296649"
                  strokeWidth="1"
                />

                {/* Korean Peninsula accent */}
                <path
                  d="M 784 196 L 802 200 L 806 232 L 788 234 Z"
                  fill="#164A32"
                  stroke="#2D7051"
                  strokeWidth="1"
                />

                {/* Japanese Archipelago */}
                <path
                  d="M 852 178 L 878 164 L 892 184 L 896 226 L 876 254 L 848 262 L 844 244 L 866 228 L 868 198 Z"
                  fill="#164A32"
                  stroke="#2D7051"
                  strokeWidth="1.2"
                />

                {/* Subtle Continent Labels */}
                <text
                  x="170"
                  y="112"
                  fill="#8AB09E"
                  fillOpacity="0.45"
                  fontSize="11"
                  letterSpacing="4"
                  fontWeight="600"
                >
                  CHÂU ÂU
                </text>
                <text
                  x="510"
                  y="165"
                  fill="#8AB09E"
                  fillOpacity="0.38"
                  fontSize="12"
                  letterSpacing="5"
                  fontWeight="600"
                >
                  CHÂU Á
                </text>
                <text
                  x="768"
                  y="355"
                  fill="#8AB09E"
                  fillOpacity="0.35"
                  fontSize="10"
                  letterSpacing="3.5"
                >
                  THÁI BÌNH DƯƠNG
                </text>

                {/* Flight Arcs radiating from TP. Hồ Chí Minh */}
                {visiblePins.map((pin) => {
                  if (pin.slug === 'diem-tua-to-am') return null;
                  const isSelected = pin.slug === activePin.slug;
                  return (
                    <path
                      key={`arc-${pin.slug}`}
                      d={makeArcPath(pin.x, pin.y)}
                      fill="none"
                      stroke={isSelected ? '#E8D3A6' : '#4E8D6F'}
                      strokeWidth={isSelected ? 2.2 : 1.1}
                      strokeOpacity={isSelected ? 0.95 : 0.42}
                      strokeDasharray={isSelected ? 'none' : '4 5'}
                    />
                  );
                })}

                {/* Origin Heart Anchor: TP. Hồ Chí Minh */}
                <g>
                  <circle cx={ORIGIN_HCMC.x} cy={ORIGIN_HCMC.y} r="9" fill="#00A758" fillOpacity="0.22" />
                  <circle cx={ORIGIN_HCMC.x} cy={ORIGIN_HCMC.y} r="4" fill="#34D399" />
                </g>

                {/* Interactive Destination Pins */}
                {visiblePins.map((pin) => {
                  const isSelected = pin.slug === activePin.slug;
                  return (
                    <g
                      key={pin.slug}
                      onClick={() => setActiveSlug(pin.slug)}
                      onMouseEnter={() => setActiveSlug(pin.slug)}
                      className="cursor-pointer"
                    >
                      {/* Invisible generous touch hit area */}
                      <circle cx={pin.x} cy={pin.y} r="18" fill="transparent" />

                      {isSelected && (
                        <>
                          <circle
                            cx={pin.x}
                            cy={pin.y}
                            r="15"
                            fill="#E8D3A6"
                            fillOpacity="0.16"
                          />
                          <circle
                            cx={pin.x}
                            cy={pin.y}
                            r="9.5"
                            fill="none"
                            stroke="#E8D3A6"
                            strokeWidth="1.4"
                          />
                        </>
                      )}

                      <circle
                        cx={pin.x}
                        cy={pin.y}
                        r={isSelected ? 5.2 : 3.8}
                        fill={isSelected ? '#E8D3A6' : '#FAF9F5'}
                        stroke="#072116"
                        strokeWidth="1.5"
                      />

                      <text
                        x={pin.x + (pin.labelDx || 0)}
                        y={pin.y + (pin.labelDy || -14)}
                        textAnchor={pin.align || 'middle'}
                        fill={isSelected ? '#E8D3A6' : '#D2E2D9'}
                        fontSize={isSelected ? '12.5' : '10.5'}
                        fontWeight={isSelected ? '700' : '500'}
                        style={{ pointerEvents: 'none' }}
                      >
                        {pin.shortName}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick-Tap Destination Pill Strip (Effortless Mobile & Desktop Switching) */}
            <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {visiblePins.map((pin) => {
                const isSelected = pin.slug === activePin.slug;
                return (
                  <button
                    key={`pill-${pin.slug}`}
                    type="button"
                    onClick={() => setActiveSlug(pin.slug)}
                    className={`shrink-0 px-2.5 py-1.5 rounded-[2px] text-[11px] font-medium transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#E8D3A6] text-[#072116] border-[#E8D3A6] font-semibold'
                        : 'bg-white/[0.04] text-[#C8D9D0] border-white/12 hover:border-[#E8D3A6]/50 hover:text-white'
                    }`}
                  >
                    {pin.shortName} <span className="opacity-70">• {pin.stampYear}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Passport Stamp Preview Dossier Card */}
          <div className="lg:col-span-4 bg-[#FAF9F5] text-[#181F1C] rounded-[5px] overflow-hidden border border-[#E8D3A6]/35 flex flex-col justify-between shadow-2xl">
            <div>
              {/* Hero Photo + Vintage Passport Stamp Overlay */}
              <div className="relative aspect-[4/3] bg-[#EAE7DF] overflow-hidden">
                <img
                  key={activeChapter.heroImage}
                  src={activeChapter.heroImage}
                  alt={activeChapter.title}
                  style={{ objectPosition: activeChapter.heroObjectPosition }}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                {/* Archival Passport Stamp Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1.5 rounded-[3px] border border-[#E8D3A6]/80 bg-[#072116]/85 backdrop-blur-sm text-center">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#E8D3A6] font-bold leading-none">
                    {activePin.stampCode}
                  </div>
                  <div className="text-[10px] text-white font-serif mt-0.5 leading-none">
                    {activePin.stampYear}
                  </div>
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                  <div className="text-[9.5px] uppercase tracking-[0.16em] text-[#E8D3A6] font-semibold">
                    {activeChapter.pillarLabel}
                  </div>
                  <div className="font-serif text-lg sm:text-xl leading-snug mt-0.5">
                    {activeChapter.milestoneBadge}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-3.5">
                <div className="flex items-center gap-1.5 text-xs text-[#008746] font-medium">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{activeChapter.location}</span>
                </div>

                <h3 className="font-serif text-xl text-[#181F1C] leading-snug">
                  {activeChapter.title}
                </h3>

                <blockquote className="border-l-2 border-[#B8975A] pl-3 font-serif italic text-[13.5px] text-[#333D38] leading-relaxed">
                  “{activeChapter.pullQuote}”
                </blockquote>
              </div>
            </div>

            <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#E4E1D8] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#56605B]">
                <span className="inline-flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-[#008746]" />
                  <span>{activeChapter.photoCount} khung hình chọn lọc</span>
                </span>
                {activeChapter.video && (
                  <span className="inline-flex items-center gap-1 text-[#0A3622] font-medium">
                    <Play className="w-3 h-3 fill-[#008746] text-[#008746]" />
                    <span>Phim {activeChapter.video.durationLabel}</span>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => onOpenChapter(activeChapter)}
                className="w-full py-3 px-4 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-xs uppercase tracking-[0.16em] font-semibold rounded-[2px] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Mở nhật ký &amp; bộ ảnh chương này</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
