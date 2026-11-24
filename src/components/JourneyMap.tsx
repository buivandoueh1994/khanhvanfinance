import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Camera, Compass, MapPin, Play } from 'lucide-react';
import { JOURNEY_CHAPTERS, JourneyChapter } from '../data/journeys';

interface MapPinSpec {
  slug: string;
  shortName: string;
  stampCode: string;
  stampYear: string;
  region: 'international' | 'vietnam';
  // Coordinates aligned to accurate Eurasia-Pacific SVG viewBox (1000x520)
  x: number;
  y: number;
  labelDx?: number;
  labelDy?: number;
  align?: 'start' | 'middle' | 'end';
}

const ORIGIN_HCMC = { x: 706, y: 408 };

const MAP_PINS: MapPinSpec[] = [
  {
    slug: 'phap-2019',
    shortName: 'Paris',
    stampCode: 'PAR • FR',
    stampYear: '2019',
    region: 'international',
    x: 118,
    y: 168,
    labelDx: 0,
    labelDy: -15,
    align: 'middle',
  },
  {
    slug: 'ao-duc-2024',
    shortName: 'Hallstatt & Munich',
    stampCode: 'MUC • AUT',
    stampYear: '2024',
    region: 'international',
    x: 186,
    y: 175,
    labelDx: 10,
    labelDy: -15,
    align: 'start',
  },
  {
    slug: 'trung-khanh-2026',
    shortName: 'Trùng Khánh',
    stampCode: 'CKG • CN',
    stampYear: '2026',
    region: 'international',
    x: 696,
    y: 266,
    labelDx: -12,
    labelDy: -8,
    align: 'end',
  },
  {
    slug: 'nam-ninh-2024',
    shortName: 'Nam Ninh',
    stampCode: 'NNG • CN',
    stampYear: '2024',
    region: 'international',
    x: 710,
    y: 312,
    labelDx: -13,
    labelDy: 4,
    align: 'end',
  },
  {
    slug: 'thuong-hai-2025',
    shortName: 'Thượng Hải',
    stampCode: 'PVG • CN',
    stampYear: '2025',
    region: 'international',
    x: 786,
    y: 262,
    labelDx: 4,
    labelDy: 20,
    align: 'middle',
  },
  {
    slug: 'han-quoc-2024',
    shortName: 'Seoul',
    stampCode: 'ICN • KR',
    stampYear: '2024',
    region: 'international',
    x: 822,
    y: 214,
    labelDx: 0,
    labelDy: -15,
    align: 'middle',
  },
  {
    slug: 'nhat-ban-2026',
    shortName: 'Phú Sĩ & Tokyo',
    stampCode: 'TYO • JP',
    stampYear: '2026',
    region: 'international',
    x: 896,
    y: 230,
    labelDx: -4,
    labelDy: -16,
    align: 'middle',
  },
  {
    slug: 'yen-tu-vinh-danh-2025',
    shortName: 'Yên Tử',
    stampCode: 'QNH • VN',
    stampYear: '2025',
    region: 'vietnam',
    x: 705,
    y: 336,
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
    x: 716,
    y: 382,
    labelDx: 14,
    labelDy: 1,
    align: 'start',
  },
  {
    slug: 'kickoff-phan-thiet-2026',
    shortName: 'Phan Thiết',
    stampCode: 'BTH • VN',
    stampYear: '2026',
    region: 'vietnam',
    x: 719,
    y: 410,
    labelDx: 14,
    labelDy: 9,
    align: 'start',
  },
  {
    slug: 'diem-tua-to-am',
    shortName: 'Tổ Ấm & Đà Lạt',
    stampCode: 'HOME • VN',
    stampYear: '2024–2026',
    region: 'vietnam',
    x: 701,
    y: 405,
    labelDx: -15,
    labelDy: 14,
    align: 'end',
  },
];

interface JourneyMapProps {
  onOpenChapter: (chapter: JourneyChapter) => void;
}

export const JourneyMap: React.FC<JourneyMapProps> = ({ onOpenChapter }) => {
  const [activeSlug, setActiveSlug] = useState<string>('nhat-ban-2026');
  const [regionFilter, setRegionFilter] = useState<'all' | 'international' | 'vietnam'>('all');
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});

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

  const isZoomedVN = regionFilter === 'vietnam';
  const sc = isZoomedVN ? 0.36 : 1;
  const svgViewBox = isZoomedVN ? '618 308 190 132' : '0 0 1000 520';

  // Keep active pill gently visible inside mobile scroll strip without scrolling whole page
  useEffect(() => {
    const btn = pillRefs.current[activePin.slug];
    if (btn && btn.parentElement) {
      const parent = btn.parentElement;
      const targetLeft = btn.offsetLeft - parent.clientWidth / 2 + btn.clientWidth / 2;
      parent.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    }
  }, [activePin.slug, regionFilter]);

  const makeArcPath = (tx: number, ty: number) => {
    const mx = (ORIGIN_HCMC.x + tx) / 2;
    const dist = Math.hypot(tx - ORIGIN_HCMC.x, ty - ORIGIN_HCMC.y);
    const lift = isZoomedVN
      ? Math.min(26, Math.max(8, dist * 0.28))
      : Math.min(138, Math.max(24, dist * 0.26));
    const my = Math.min(ORIGIN_HCMC.y, ty) - lift;
    return `M ${ORIGIN_HCMC.x} ${ORIGIN_HCMC.y} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${tx} ${ty}`;
  };

  return (
    <section
      id="ban-do-hanh-trinh"
      className="scroll-mt-[112px] lg:scroll-mt-20 py-14 sm:py-20 bg-[#072116] text-[#FAF9F5] border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6 sm:space-y-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-[#E8D3A6] font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>01 / Bản đồ, hai cuốn hộ chiếu</span>
            </div>
            <h2 className="font-serif text-[28px] sm:text-4xl lg:text-[42px] text-white font-medium leading-[1.16]">
              Đi qua hơn 16 quốc gia, lưu giữ 11 chặng tiêu biểu trong và ngoài nước
            </h2>
            <p className="text-[13px] sm:text-sm text-[#BDD0C6] leading-relaxed">
              Chọn từng điểm vàng trên bản đồ hoặc chạm tên điểm đến bên dưới để xem dấu mộc hộ chiếu và câu chuyện của chuyến đi.
            </p>
          </div>

          {/* Region Toggle */}
          <div className="inline-flex items-center p-1 rounded-[4px] bg-white/[0.06] border border-white/15 self-start lg:self-auto shrink-0 w-full sm:w-auto">
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
                className={`flex-1 sm:flex-initial px-3 py-2 text-[11px] uppercase tracking-[0.11em] font-semibold rounded-[3px] transition-all cursor-pointer whitespace-nowrap ${
                  regionFilter === tab.key
                    ? 'bg-[#E8D3A6] text-[#072116] shadow-sm'
                    : 'text-[#C6D6CE] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Locked Single-Viewport 12-Col Grid: ZERO Layout Jump When Switching Pins or Tabs! */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch">
          {/* Left: Authentic Minimalist Eurasia & Pacific Cartography */}
          <div className="lg:col-span-8 lg:h-[525px] bg-[#0A2C1D] border border-[#E8D3A6]/22 rounded-[6px] p-3.5 sm:p-5 flex flex-col justify-between relative overflow-hidden shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.16em] text-[#A9C2B5] pb-2.5 border-b border-white/10 shrink-0">
              <span>{isZoomedVN ? 'Bản đồ Việt Nam, 2024–2026' : 'Lộ trình Á và Âu, 2019–2026'}</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#E8D3A6]/12 text-[#E8D3A6] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8D3A6]" />
                <span>{activePin.shortName}</span>
              </span>
            </div>

            <div className="relative w-full aspect-[1000/540] sm:aspect-[1000/520] lg:aspect-auto lg:flex-1 my-2 select-none flex items-center justify-center">
              <svg
                viewBox={svgViewBox}
                className="w-full h-full max-h-[410px] transition-all duration-500"
                role="img"
                aria-label="Bản đồ hành trình từ TP. Hồ Chí Minh đến Châu Âu, Đông Á và Việt Nam"
              >
                <defs>
                  <radialGradient id="mapGlow" cx="56%" cy="54%" r="60%">
                    <stop offset="0%" stopColor="#16573A" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#072116" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width="1000" height="520" fill="url(#mapGlow)" />

                {/* Fine Cartographic Graticule Grid */}
                {[104, 208, 312, 416].map((gy) => (
                  <line
                    key={`h-${gy}`}
                    x1="0"
                    y1={gy}
                    x2="1000"
                    y2={gy}
                    stroke="#E8D3A6"
                    strokeOpacity="0.08"
                    strokeWidth={sc}
                    strokeDasharray={`${3 * sc} ${6 * sc}`}
                  />
                ))}
                {[166, 332, 498, 664, 830].map((gx) => (
                  <line
                    key={`v-${gx}`}
                    x1={gx}
                    y1="0"
                    x2={gx}
                    y2="520"
                    stroke="#E8D3A6"
                    strokeOpacity="0.08"
                    strokeWidth={sc}
                    strokeDasharray={`${3 * sc} ${6 * sc}`}
                  />
                ))}

                {/* Geographically Accurate Minimalist Eurasia Landmass */}
                <path
                  d="M 62 216 L 68 188 L 96 184 L 94 166 L 122 150 L 146 144 L 154 128 L 166 134 L 178 142 L 194 126 L 174 114 L 168 88 L 196 62 L 222 66 L 226 98 L 246 106 L 260 88 L 306 72 L 382 64 L 468 58 L 568 62 L 672 68 L 774 86 L 854 106 L 872 132 L 844 148 L 836 178 L 806 182 L 792 204 L 776 226 L 788 254 L 792 276 L 776 306 L 744 326 L 716 334 L 718 358 L 728 386 L 722 414 L 702 426 L 686 410 L 684 388 L 668 384 L 664 416 L 674 446 L 662 456 L 646 432 L 644 388 L 626 356 L 594 342 L 562 396 L 542 404 L 520 356 L 502 324 L 462 316 L 424 342 L 392 362 L 354 336 L 334 294 L 352 278 L 328 264 L 274 260 L 252 240 L 226 238 L 210 250 L 198 228 L 180 238 L 164 218 L 152 208 L 134 218 L 114 216 L 94 236 L 64 234 Z"
                  fill="#13432E"
                  stroke="#36805D"
                  strokeWidth={1.25 * sc}
                  strokeLinejoin="round"
                />

                {/* British Isles */}
                <path
                  d="M 88 122 L 106 112 L 114 142 L 94 148 L 84 136 Z"
                  fill="#154A33"
                  stroke="#36805D"
                  strokeWidth={1.1 * sc}
                />

                {/* Korean Peninsula */}
                <path
                  d="M 812 196 L 828 198 L 834 232 L 818 236 L 812 222 Z"
                  fill="#19563B"
                  stroke="#3E8F68"
                  strokeWidth={1.1 * sc}
                />

                {/* Japan Archipelago */}
                <path
                  d="M 890 162 L 912 156 L 918 174 L 896 180 Z M 886 188 L 906 196 L 912 232 L 888 250 L 866 254 L 862 240 L 884 226 L 886 204 Z"
                  fill="#19563B"
                  stroke="#3E8F68"
                  strokeWidth={1.1 * sc}
                />

                {/* Taiwan & Philippines */}
                <path
                  d="M 784 316 L 792 316 L 790 334 L 782 332 Z M 788 362 L 806 376 L 812 414 L 794 422 L 784 392 Z"
                  fill="#13432E"
                  stroke="#36805D"
                  strokeWidth={1 * sc}
                />

                {/* Vietnam Highlight Spine */}
                <path
                  d="M 696 330 L 714 334 L 716 358 L 726 386 L 720 414 L 702 424 L 698 408 L 708 386 L 702 356 Z"
                  fill="#1F6646"
                  stroke="#49A87A"
                  strokeWidth={1.25 * sc}
                />

                {/* High-Contrast Refined Continent Watermarks */}
                {!isZoomedVN ? (
                  <>
                    <text
                      x="156"
                      y="102"
                      fill="#A8CEBC"
                      fillOpacity="0.62"
                      fontSize="11"
                      letterSpacing="4"
                      fontWeight="600"
                    >
                      CHÂU ÂU
                    </text>
                    <text
                      x="524"
                      y="168"
                      fill="#A8CEBC"
                      fillOpacity="0.54"
                      fontSize="12.5"
                      letterSpacing="5"
                      fontWeight="600"
                    >
                      CHÂU Á
                    </text>
                    <text
                      x="804"
                      y="354"
                      fill="#A8CEBC"
                      fillOpacity="0.48"
                      fontSize="10"
                      letterSpacing="3"
                      fontWeight="500"
                    >
                      THÁI BÌNH DƯƠNG
                    </text>
                  </>
                ) : (
                  <text
                    x="748"
                    y="366"
                    fill="#A8CEBC"
                    fillOpacity="0.55"
                    fontSize={10 * sc}
                    letterSpacing={2.5 * sc}
                    fontWeight="600"
                  >
                    BIỂN ĐÔNG
                  </text>
                )}

                {/* Flight Arcs radiating from TP. Hồ Chí Minh */}
                {visiblePins.map((pin) => {
                  if (pin.slug === 'diem-tua-to-am') return null;
                  const isSelected = pin.slug === activePin.slug;
                  return (
                    <path
                      key={`arc-${pin.slug}`}
                      d={makeArcPath(pin.x, pin.y)}
                      fill="none"
                      stroke={isSelected ? '#E8D3A6' : '#5EA884'}
                      strokeWidth={(isSelected ? 2.3 : 1.15) * sc}
                      strokeOpacity={isSelected ? 0.96 : 0.45}
                      strokeDasharray={isSelected ? 'none' : `${4 * sc} ${5 * sc}`}
                    />
                  );
                })}

                {/* Origin Anchor: TP. Hồ Chí Minh */}
                <g>
                  <circle
                    cx={ORIGIN_HCMC.x}
                    cy={ORIGIN_HCMC.y}
                    r={9 * sc}
                    fill="#00A758"
                    fillOpacity="0.25"
                  />
                  <circle cx={ORIGIN_HCMC.x} cy={ORIGIN_HCMC.y} r={3.8 * sc} fill="#34D399" />
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
                      <circle cx={pin.x} cy={pin.y} r={20 * sc} fill="transparent" />
                      {isSelected && (
                        <>
                          <circle
                            cx={pin.x}
                            cy={pin.y}
                            r={13 * sc}
                            fill="none"
                            stroke="#E8D3A6"
                            strokeWidth={1.3 * sc}
                            className="map-beacon-ring"
                          />
                          <circle
                            cx={pin.x}
                            cy={pin.y}
                            r={12 * sc}
                            fill="#E8D3A6"
                            fillOpacity="0.18"
                          />
                        </>
                      )}
                      <circle
                        cx={pin.x}
                        cy={pin.y}
                        r={(isSelected ? 5.2 : 3.8) * sc}
                        fill={isSelected ? '#E8D3A6' : '#FAF9F5'}
                        stroke="#072116"
                        strokeWidth={1.5 * sc}
                      />
                      <text
                        x={pin.x + (pin.labelDx || 0) * sc}
                        y={pin.y + (pin.labelDy || -14) * sc}
                        textAnchor={pin.align || 'middle'}
                        fill={isSelected ? '#F6E5BD' : '#E2EFE8'}
                        fontSize={(isSelected ? 13 : 10.8) * sc}
                        fontWeight={isSelected ? '700' : '500'}
                        paintOrder="stroke"
                        stroke="#082418"
                        strokeWidth={3.4 * sc}
                        strokeLinejoin="round"
                        style={{ pointerEvents: 'none' }}
                      >
                        {pin.shortName}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick-Tap Destination Pill Strip with Scroll-Fade Cue */}
            <div className="pt-3 border-t border-white/10 shrink-0">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-fade-right pr-8">
                {visiblePins.map((pin) => {
                  const isSelected = pin.slug === activePin.slug;
                  return (
                    <button
                      key={`pill-${pin.slug}`}
                      ref={(el) => {
                        pillRefs.current[pin.slug] = el;
                      }}
                      type="button"
                      onClick={() => setActiveSlug(pin.slug)}
                      className={`shrink-0 px-3 py-2 rounded-[3px] text-[11px] font-medium transition-all cursor-pointer border whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#E8D3A6] text-[#072116] border-[#E8D3A6] font-semibold shadow-sm'
                          : 'bg-white/[0.04] text-[#D0E0D8] border-white/14 hover:border-[#E8D3A6]/55 hover:text-white'
                      }`}
                    >
                      {pin.shortName} <span className="opacity-70">• {pin.stampYear}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Locked-Height Passport Stamp Dossier Card */}
          <div className="lg:col-span-4 lg:h-[525px] bg-[#FAF9F5] text-[#181F1C] rounded-[6px] overflow-hidden border border-[#E8D3A6]/35 flex flex-col justify-between shadow-2xl">
            <div className="flex flex-col flex-1 min-h-0">
              {/* Fixed-Aspect Crossfade Image Stack */}
              <div className="relative h-[205px] sm:h-[225px] lg:h-[210px] shrink-0 bg-[#122B20] overflow-hidden">
                {JOURNEY_CHAPTERS.map((ch) => {
                  const isActive = ch.slug === activeChapter.slug;
                  return (
                    <img
                      key={ch.slug}
                      src={ch.heroImage}
                      alt={ch.title}
                      loading="eager"
                      style={{ objectPosition: ch.heroObjectPosition }}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
                        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    />
                  );
                })}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#051810]/90 via-[#051810]/30 to-transparent" />

                <div className="absolute top-3 right-3 z-30 px-2.5 py-1.5 rounded-[3px] border border-[#E8D3A6]/80 bg-[#072116]/88 backdrop-blur-sm text-center">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#E8D3A6] font-bold leading-none">
                    {activePin.stampCode}
                  </div>
                  <div className="text-[10px] text-white font-serif mt-0.5 leading-none">
                    {activePin.stampYear}
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 right-4 z-30 text-white">
                  <div className="text-[9.5px] uppercase tracking-[0.18em] text-[#E8D3A6] font-semibold truncate">
                    {activeChapter.pillarLabel}
                  </div>
                  <div className="font-serif text-lg sm:text-xl leading-snug mt-0.5 truncate">
                    {activeChapter.milestoneBadge}
                  </div>
                </div>
              </div>

              {/* Strictly Fixed-Line Text Zone */}
              <div className="p-5 flex flex-col gap-2.5 flex-1 overflow-hidden">
                <div className="flex items-center gap-1.5 text-xs text-[#008746] font-medium truncate shrink-0">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{activeChapter.location}</span>
                </div>

                <h3 className="font-serif text-[19px] sm:text-[21px] text-[#181F1C] leading-[1.28] line-clamp-2">
                  {activeChapter.title}
                </h3>

                <blockquote className="border-l-2 border-[#B8975A] pl-3.5 font-serif italic text-[14px] text-[#333D38] leading-[1.6] line-clamp-3">
                  “{activeChapter.pullQuote}”
                </blockquote>
              </div>
            </div>

            <div className="px-5 pb-5 pt-3 border-t border-[#E4E1D8] space-y-3 shrink-0 bg-[#FAF9F5]">
              <div className="flex items-center justify-between text-xs text-[#56605B] h-5">
                <span className="inline-flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#008746]" />
                  <span>{activeChapter.photoCount} ảnh chọn lọc</span>
                </span>
                {activeChapter.video ? (
                  <span className="inline-flex items-center gap-1.5 text-[#0A3622] font-medium">
                    <Play className="w-3 h-3 fill-[#008746] text-[#008746]" />
                    <span>Phim {activeChapter.video.durationLabel}</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-[#7A847F]">Bộ ảnh chọn lọc</span>
                )}
              </div>

              <button
                type="button"
                onClick={() => onOpenChapter(activeChapter)}
                className="w-full py-3 px-4 bg-[#0A3622] hover:bg-[#008746] active:scale-[0.99] text-[#FAF9F5] text-xs uppercase tracking-[0.15em] font-semibold rounded-[3px] inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Xem bài viết và ảnh chương này</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
