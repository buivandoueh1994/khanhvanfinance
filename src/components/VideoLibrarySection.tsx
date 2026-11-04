import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Eye,
  FolderOpen,
  Play,
  Search,
  Share2,
  Sparkles,
  X,
} from 'lucide-react';
import { VIDEO_FOLDERS, VIDEO_LIBRARY, VideoItem } from '../data/videos';

interface VideoLibrarySectionProps {
  activeVideo: VideoItem | null;
  onOpenVideo: (video: VideoItem) => void;
  onCloseVideo: () => void;
  onAskQuestion: (video: VideoItem) => void;
}

export const VideoLibrarySection: React.FC<VideoLibrarySectionProps> = ({
  activeVideo,
  onOpenVideo,
  onCloseVideo,
  onAskQuestion,
}) => {
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [selectedSubtag, setSelectedSubtag] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllArchive, setShowAllArchive] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playerDims, setPlayerDims] = useState<{ width: number; height: number }>({
    width: 440,
    height: 782,
  });

  useEffect(() => {
    const updateDims = () => {
      if (typeof window === 'undefined') return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (vw >= 768) {
        // Use 94% of viewport height so the 9:16 video is as large as possible on laptop/desktop screens
        const h = Math.min(860, Math.max(540, vh - 36));
        const w = Math.round((h * 9) / 16);
        setPlayerDims({ width: w, height: h });
      } else {
        const w = Math.min(vw - 24, 380);
        const h = Math.round((w * 16) / 9);
        setPlayerDims({ width: w, height: h });
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, [activeVideo]);

  // Count videos per folder
  const folderCounts = useMemo(() => {
    const counts: Record<string, number> = { all: VIDEO_LIBRARY.length };
    for (const v of VIDEO_LIBRARY) {
      counts[v.folderId] = (counts[v.folderId] || 0) + 1;
    }
    return counts;
  }, []);

  // Available subtags for current folder
  const availableSubtags = useMemo(() => {
    const base =
      selectedFolder === 'all'
        ? VIDEO_LIBRARY
        : VIDEO_LIBRARY.filter((v) => v.folderId === selectedFolder);
    const set = new Set<string>();
    base.forEach((v) => set.add(v.subtag));
    return ['Tất cả', ...Array.from(set)];
  }, [selectedFolder]);

  // Reset subtag when folder changes
  const handleSelectFolder = (folderId: string) => {
    setSelectedFolder(folderId);
    setSelectedSubtag('Tất cả');
  };

  // Filtered videos by folder, subtag, and search query
  const filteredVideos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return VIDEO_LIBRARY.filter((v) => {
      if (selectedFolder !== 'all' && v.folderId !== selectedFolder) return false;
      if (selectedSubtag !== 'Tất cả' && v.subtag !== selectedSubtag) return false;
      if (!q) return true;
      const inTitle = v.title.toLowerCase().includes(q);
      const inSummary = v.summary.toLowerCase().includes(q);
      const inSubtag = v.subtag.toLowerCase().includes(q);
      return inTitle || inSummary || inSubtag;
    });
  }, [selectedFolder, selectedSubtag, searchQuery]);

  // Curated 6 spotlight videos when viewing 'all' with no search, otherwise top 6 of filtered
  const spotlightVideos = useMemo(() => {
    if (selectedFolder === 'all' && selectedSubtag === 'Tất cả' && !searchQuery.trim()) {
      const preferredIds = [
        '1047431547259894', // 108K - Tiền đóng vào công ty bảo hiểm sẽ đi về đâu?
        '1530853344747478', // 73K - Kinh tế khó khăn: Do thời thế hay do chưa chuẩn bị quỹ dự phòng?
        '825944796583419',  // 53K - Đi làm tư vấn viên tài chính bảo hiểm thì tìm khách hàng từ đâu?
        '2757832901085284', // 44K - Đóng phí 3 năm rồi hủy hợp đồng bảo hiểm sẽ nhận lại bao nhiêu?
        '855860643809575',  // 39K - Có nên rút Giá trị tài khoản sau khi đóng phí bảo hiểm đủ 10 năm?
        '841324271956373',  // 15K - Khách hàng sợ công ty bảo hiểm, hay công ty bảo hiểm sợ khách hàng?
      ];
      const picked = preferredIds
        .map((rid) => VIDEO_LIBRARY.find((v) => v.reelId === rid))
        .filter((v): v is VideoItem => Boolean(v));
      if (picked.length === 6) return picked;
    }
    return filteredVideos.slice(0, 6);
  }, [selectedFolder, selectedSubtag, searchQuery, filteredVideos]);

  // Remaining archive videos
  const archiveVideos = useMemo(() => {
    const spotlightSet = new Set(spotlightVideos.map((v) => v.id));
    return filteredVideos.filter((v) => !spotlightSet.has(v.id));
  }, [filteredVideos, spotlightVideos]);

  const visibleArchiveVideos = useMemo(() => {
    if (showAllArchive || searchQuery.trim() || selectedFolder !== 'all' || selectedSubtag !== 'Tất cả') {
      return archiveVideos;
    }
    return archiveVideos.slice(0, 12);
  }, [archiveVideos, showAllArchive, searchQuery, selectedFolder, selectedSubtag]);

  const copyVideoLink = (video: VideoItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}?video=${encodeURIComponent(video.id)}`;
    navigator.clipboard.writeText(url);
    setCopiedId(video.id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === video.id ? null : prev));
    }, 2500);
  };

  return (
    <>
      <section
        id="thu-vien-video"
        className="py-28 lg:py-36 bg-[#FAF9F5] border-b border-[#E4E1D8]"
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          {/* SECTION HEADER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10 items-end">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] font-medium block">
                02 / THƯ VIỆN VIDEO &amp; HỎI ĐÁP THỰC CHIẾN &bull; VIDEO ARCHIVE
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#181F1C] leading-[1.15]">
                109 Video Giải Mã Bảo Hiểm, Dòng Tiền &amp; Nghề Tư Vấn
              </h2>
            </div>
            <div className="lg:col-span-5 space-y-3">
              <p className="text-sm sm:text-[15px] text-[#28322D] font-normal leading-[1.8]">
                Tra cứu nhanh các tình huống thực tế cùng Khánh Vân: từ bản chất dòng phí, quy tắc bồi thường, thẻ chăm sóc sức khỏe đến lộ trình phát triển sự nghiệp.
              </p>
            </div>
          </div>

          {/* SEARCH BAR + TOPIC FILTER PILLS */}
          <div className="bg-[#F2EFE9]/80 border border-[#DCD8CE] rounded-[4px] p-4 sm:p-6 mb-12 space-y-4">
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#6A756F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm nhanh theo tình huống (VD: rút tiền sau 10 năm, thẻ sức khỏe, hóc xương cá, VssID, tìm khách hàng...)"
                  className="w-full pl-10 pr-9 py-2.5 sm:py-3 bg-[#FAF9F5] border border-[#DCD8CE] focus:border-[#0A3622] rounded-[3px] text-xs sm:text-sm text-[#181F1C] placeholder:text-[#858E89] focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#858E89] hover:text-[#181F1C]"
                    aria-label="Xóa tìm kiếm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                <span className="text-xs text-[#56605B]">
                  Hiển thị <strong className="text-[#0A3622]">{filteredVideos.length}</strong> / {VIDEO_LIBRARY.length} video
                </span>
                {(selectedFolder !== 'all' || selectedSubtag !== 'Tất cả' || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFolder('all');
                      setSelectedSubtag('Tất cả');
                      setSearchQuery('');
                    }}
                    className="text-[11px] uppercase tracking-[0.16em] text-[#008746] hover:text-[#0A3622] font-medium underline underline-offset-4"
                  >
                    Đặt lại bộ lọc
                  </button>
                )}
              </div>
            </div>

            {/* Topic Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#858E89] shrink-0 mr-1">
                Chủ đề:
              </span>
              {availableSubtags.map((tag) => {
                const active = selectedSubtag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedSubtag(tag)}
                    className={`whitespace-nowrap text-[11px] px-3 py-1.5 rounded-[2px] border transition-colors ${
                      active
                        ? 'bg-[#0A3622] text-[#FAF9F5] border-[#0A3622] font-medium'
                        : 'bg-[#FAF9F5] text-[#56605B] border-[#DCD8CE] hover:border-[#0A3622]/40 hover:text-[#181F1C]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TIER 1: 6 SPOTLIGHT VIDEO CARDS WITH VISUAL THUMBNAILS */}
          {spotlightVideos.length > 0 ? (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6 sm:mb-8 pb-3 border-b border-[#DCD8CE]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#008746]" />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#008746] font-medium">
                    {selectedFolder === 'all' && !searchQuery
                      ? 'TIÊU ĐIỂM VIDEO THỰC CHIẾN • ĐƯỢC XEM NHIỀU NHẤT'
                      : 'VIDEO NỔI BẬT TRONG CHUYÊN ĐỀ'}
                  </span>
                </div>
                <span className="text-xs text-[#858E89] font-light">
                  Bấm vào video để xem trực tiếp
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {spotlightVideos.map((video) => (
                  <article
                    key={video.id}
                    onClick={() => onOpenVideo(video)}
                    className="group cursor-pointer flex flex-col justify-between bg-[#FAF9F5] border border-[#DCD8CE] hover:border-[#0A3622]/50 hover:shadow-[0_16px_38px_-15px_rgba(10,54,34,0.16)] transition-all duration-300 rounded-[4px] overflow-hidden"
                  >
                    <div>
                      {/* VIDEO THUMBNAIL CONTAINER */}
                      <div className="relative aspect-[4/4.6] w-full bg-[#121715] overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-editorial"
                        />
                        {/* Subtle gradient for badge legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40 group-hover:via-black/20 transition-colors" />

                        {/* Top Overlay: Folder Badge + Views */}
                        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2">
                          <span className="text-[10px] uppercase tracking-[0.16em] text-white bg-[#0A3622]/90 backdrop-blur-xs px-2.5 py-1 rounded-[2px] font-medium">
                            {video.folderShort}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-white bg-black/65 backdrop-blur-xs px-2.5 py-1 rounded-[2px] font-medium">
                            <Eye className="w-3 h-3 text-[#4ADE80]" />
                            {video.views} lượt xem
                          </span>
                        </div>

                        {/* Center Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-[#0A3622]/90 group-hover:bg-[#008746] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.45)] ring-2 ring-white/80 group-hover:scale-110 transition-all duration-300">
                            <Play className="w-6 h-6 fill-current ml-0.5" />
                          </div>
                        </div>

                        {/* Bottom Subtag inside thumbnail */}
                        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-[0.16em] text-[#EAE7DF] bg-black/55 backdrop-blur-xs px-2.5 py-0.5 rounded-[2px]">
                            {video.subtag}
                          </span>
                        </div>
                      </div>

                      {/* CARD BODY: TITLE & SHORT NOTE */}
                      <div className="p-5 sm:p-6 pb-4">
                        <h3 className="font-sans font-semibold text-base sm:text-[18px] text-[#181F1C] group-hover:text-[#0A3622] leading-[1.38] transition-colors mb-2.5 tracking-tight line-clamp-2">
                          {video.title}
                        </h3>

                        <p className="text-xs sm:text-[13px] text-[#56605B] font-normal leading-[1.65] line-clamp-2">
                          {video.summary}
                        </p>
                      </div>
                    </div>

                    {/* Footer Action Bar */}
                    <div className="px-5 sm:px-6 py-3.5 border-t border-[#EAE7DF] bg-[#F2EFE9]/40 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#0A3622] group-hover:text-[#008746] font-semibold transition-colors">
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Xem Video</span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => copyVideoLink(video, e)}
                        className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-[#6A756F] hover:text-[#0A3622] px-2 py-1 rounded-[2px] hover:bg-[#EAE7DF] transition-colors"
                        title="Sao chép link video này để gửi cho khách hàng hoặc đồng đội"
                      >
                        {copiedId === video.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#008746]" />
                            <span className="text-[#008746] font-medium">Đã chép link</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-16 text-center bg-[#F2EFE9]/50 border border-[#DCD8CE] rounded-[4px] mb-12 space-y-3">
              <p className="font-serif text-2xl text-[#181F1C]">
                Không tìm thấy video nào khớp với từ khóa “{searchQuery}”
              </p>
              <p className="text-xs sm:text-sm text-[#56605B]">
                Hãy thử tìm bằng từ khóa ngắn hơn (ví dụ: “đáo hạn”, “thẻ sức khỏe”, “bồi thường”, “tuyển dụng”).
              </p>
            </div>
          )}

          {/* TIER 2: STRUCTURED ARCHIVE DIRECTORY OF REMAINING VIDEOS WITH MINI THUMBNAILS */}
          {archiveVideos.length > 0 && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#DCD8CE]">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#0A3622] font-medium">
                  DANH MỤC TRA CỨU NHANH &bull; {archiveVideos.length} VIDEO TIẾP THEO
                </span>
                <span className="text-xs text-[#6A756F] font-light">
                  Tối ưu cho Đội ngũ tư vấn &amp; Khách hàng tra cứu theo tình huống
                </span>
              </div>

              <div className="border-t border-[#DCD8CE] divide-y divide-[#DCD8CE]">
                {visibleArchiveVideos.map((video) => (
                  <article
                    key={video.id}
                    onClick={() => onOpenVideo(video)}
                    className="group py-3.5 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-center cursor-pointer hover:bg-[#F2EFE9]/70 transition-colors px-2 sm:px-3"
                  >
                    {/* Thumbnail + Folder + Views */}
                    <div className="lg:col-span-8 flex items-center gap-3.5 sm:gap-4">
                      <div className="relative w-14 h-[74px] sm:w-16 sm:h-20 rounded-[3px] overflow-hidden bg-[#121715] shrink-0 ring-1 ring-black/10">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-[#0A3622]/90 text-white flex items-center justify-center">
                            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] uppercase tracking-[0.15em] text-[#008746] font-medium bg-[#008746]/[0.08] px-2 py-0.5 rounded-[2px]">
                            {video.folderShort}
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.14em] text-[#858E89]">
                            {video.subtag}
                          </span>
                          <span className="text-[11px] text-[#56605B] inline-flex items-center gap-1 font-medium">
                            <Eye className="w-3 h-3 text-[#008746]" />
                            {video.views}
                          </span>
                        </div>

                        <h4 className="font-sans font-semibold text-sm sm:text-[15px] text-[#181F1C] group-hover:text-[#0A3622] leading-[1.38] transition-colors line-clamp-1">
                          {video.title}
                        </h4>

                        <p className="text-xs text-[#56605B] line-clamp-1 leading-[1.5]">
                          {video.summary}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="lg:col-span-4 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={(e) => copyVideoLink(video, e)}
                        className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-[#6A756F] hover:text-[#0A3622] px-2.5 py-1.5 rounded-[2px] border border-transparent hover:border-[#DCD8CE] hover:bg-[#FAF9F5] transition-colors"
                        title="Copy link gửi khách hàng / đồng đội"
                      >
                        {copiedId === video.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#008746]" />
                            <span className="text-[#008746]">Đã chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>

                      <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-[#0A3622] group-hover:text-[#008746] font-semibold">
                        <Play className="w-3 h-3 fill-current" />
                        <span>Xem Video</span>
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              {/* Expand / Collapse All Button */}
              {archiveVideos.length > 12 &&
                selectedFolder === 'all' &&
                selectedSubtag === 'Tất cả' &&
                !searchQuery.trim() && (
                  <div className="mt-8 text-center">
                    <button
                      type="button"
                      onClick={() => setShowAllArchive(!showAllArchive)}
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium rounded-[2px] transition-all shadow-sm"
                    >
                      <span>
                        {showAllArchive
                          ? 'Thu Gọn Danh Mục Video'
                          : `Xem Toàn Bộ ${VIDEO_LIBRARY.length} Video Trong Thư Viện`}
                      </span>
                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          showAllArchive ? '-rotate-90' : 'rotate-90'
                        }`}
                      />
                    </button>
                  </div>
                )}
            </div>
          )}
        </div>
      </section>

      {/* FULL-HEIGHT 9:16 CINEMA MODAL (MAXIMIZED VIDEO SIZE + COMPACT NOTE) */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseVideo}
            className="fixed inset-0 z-50 bg-[#0D1210]/92 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF9F5] border border-[#DCD8CE] rounded-[6px] shadow-2xl overflow-hidden flex flex-col md:flex-row items-stretch my-auto"
              style={{
                maxWidth: '100%',
              }}
            >
              {/* MAIN FOCUS: FULL-VIEWPORT-HEIGHT 9:16 VIDEO PLAYER (ZERO BLACK MARGIN) */}
              <div
                className="bg-black shrink-0 relative overflow-hidden mx-auto"
                style={{
                  width: `${playerDims.width}px`,
                  height: `${playerDims.height}px`,
                }}
              >
                <iframe
                  key={`${activeVideo.id}-${playerDims.width}x${playerDims.height}`}
                  src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                    activeVideo.url
                  )}&show_text=false&width=${playerDims.width}&height=${playerDims.height}`}
                  width={playerDims.width}
                  height={playerDims.height}
                  style={{
                    border: 'none',
                    overflow: 'hidden',
                    width: `${playerDims.width}px`,
                    height: `${playerDims.height}px`,
                  }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={activeVideo.title}
                />
              </div>

              {/* COMPACT SUMMARY PANEL (NO LONG SCRIPT, DOES NOT STEAL VIDEO HEIGHT ON DESKTOP) */}
              <div
                className="w-full md:w-[310px] lg:w-[330px] bg-[#FAF9F5] flex flex-col justify-between p-4 sm:p-6 border-t md:border-t-0 md:border-l border-[#E4E1D8]"
                style={{
                  maxWidth: playerDims.width < 360 ? `${playerDims.width}px` : undefined,
                }}
              >
                {/* Top Action Row */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#E4E1D8]">
                    <button
                      type="button"
                      onClick={onCloseVideo}
                      className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#56605B] hover:text-[#181F1C] font-medium"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Đóng</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => copyVideoLink(activeVideo, e)}
                        className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-[#0A3622] hover:text-[#008746] bg-[#008746]/[0.08] px-2.5 py-1.5 rounded-[2px] font-medium transition-colors"
                      >
                        {copiedId === activeVideo.id ? (
                          <>
                            <Check className="w-3 h-3 text-[#008746]" />
                            <span>Đã chép Link</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3 h-3" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={onCloseVideo}
                        className="p-1 text-[#56605B] hover:text-[#181F1C]"
                        aria-label="Đóng"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Category & Views */}
                  <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em]">
                    <span className="text-[#008746] font-semibold bg-[#008746]/[0.08] px-2 py-0.5 rounded-[2px]">
                      {activeVideo.folderShort}
                    </span>
                    <span className="text-[#56605B] inline-flex items-center gap-1 font-medium">
                      <Eye className="w-3 h-3 text-[#008746]" />
                      {activeVideo.views} lượt xem
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#181F1C] leading-[1.3]">
                    {activeVideo.title}
                  </h3>

                  {/* Short Summary Note */}
                  <div className="p-3.5 bg-[#F2EFE9]/90 border-l-2 border-l-[#008746] rounded-[3px] space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#008746] font-semibold block">
                      TÓM TẮT NỘI DUNG
                    </span>
                    <p className="text-xs sm:text-[13px] text-[#28322D] leading-[1.65]">
                      {activeVideo.summary}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA Actions */}
                <div className="pt-5 mt-5 border-t border-[#E4E1D8] space-y-2.5">
                  <button
                    type="button"
                    onClick={() => onAskQuestion(activeVideo)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-[11px] uppercase tracking-[0.16em] font-medium rounded-[2px] transition-colors"
                  >
                    <span>Đặt câu hỏi riêng cho Khánh Vân</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={(e) => copyVideoLink(activeVideo, e)}
                      className="inline-flex items-center gap-1 text-[11px] text-[#56605B] hover:text-[#0A3622]"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Sao chép link gửi khách</span>
                    </button>

                    <a
                      href={activeVideo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#008746] hover:text-[#0A3622] underline underline-offset-4"
                    >
                      <span>Mở Facebook</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
