import React, { useState, useMemo } from 'react';
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
      const inTranscript = v.paragraphs.some((p) => p.toLowerCase().includes(q));
      return inTitle || inSummary || inSubtag || inTranscript;
    });
  }, [selectedFolder, selectedSubtag, searchQuery]);

  // Curated 6 spotlight videos when viewing 'all' with no search, otherwise top 6 of filtered
  const spotlightVideos = useMemo(() => {
    if (selectedFolder === 'all' && selectedSubtag === 'Tất cả' && !searchQuery.trim()) {
      // Pick a balanced, ultra-high-view showcase across the 4 folders
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

  // Related videos inside modal
  const relatedVideos = useMemo(() => {
    if (!activeVideo) return [];
    return VIDEO_LIBRARY.filter(
      (v) => v.folderId === activeVideo.folderId && v.id !== activeVideo.id
    ).slice(0, 3);
  }, [activeVideo]);

  return (
    <>
      <section
        id="thu-vien-video"
        className="py-28 lg:py-36 bg-[#FAF9F5] border-b border-[#E4E1D8]"
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          {/* SECTION HEADER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-14 items-end">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#008746] font-medium block">
                03 / THƯ VIỆN VIDEO &amp; HỎI ĐÁP THỰC CHIẾN &bull; VIDEO ARCHIVE
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#181F1C] leading-[1.15]">
                109 Video Giải Mã Bảo Hiểm, Dòng Tiền &amp; Nghề Tư Vấn
              </h2>
            </div>
            <div className="lg:col-span-5 space-y-3">
              <p className="text-sm sm:text-[15px] text-[#28322D] font-normal leading-[1.8]">
                Hệ thống thư viện phân loại theo <strong>04 thư mục chuyên đề</strong> giúp Khách hàng và hơn 500 cộng sự tra cứu tức thì mọi tình huống thực tế: từ bản chất dòng phí, quy tắc bồi thường đến lộ trình phát triển sự nghiệp.
              </p>
            </div>
          </div>

          {/* 4 STRUCTURED FOLDER CARDS (THƯ MỤC CHUYÊN ĐỀ) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
            {VIDEO_FOLDERS.filter((f) => f.id !== 'all').map((folder) => {
              const isSelected = selectedFolder === folder.id;
              const count = folderCounts[folder.id] || 0;
              return (
                <button
                  key={folder.id}
                  type="button"
                  onClick={() =>
                    handleSelectFolder(isSelected ? 'all' : folder.id)
                  }
                  className={`text-left p-5 sm:p-6 rounded-[4px] border transition-all duration-300 flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-[#0A3622] text-[#FAF9F5] border-[#0A3622] shadow-[0_14px_34px_-12px_rgba(10,54,34,0.28)]'
                      : 'bg-[#F2EFE9]/60 hover:bg-[#FAF9F5] text-[#181F1C] border-[#DCD8CE] hover:border-[#0A3622]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-current/10">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-medium ${
                          isSelected ? 'text-[#6EE7B7]' : 'text-[#008746]'
                        }`}
                      >
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>THƯ MỤC {folder.code}</span>
                      </span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-[2px] font-medium ${
                          isSelected
                            ? 'bg-white/15 text-white'
                            : 'bg-[#0A3622]/[0.06] text-[#0A3622]'
                        }`}
                      >
                        {count} video
                      </span>
                    </div>
                    <h3
                      className={`font-sans font-semibold text-base sm:text-[17px] leading-[1.35] mb-2 ${
                        isSelected ? 'text-white' : 'text-[#181F1C] group-hover:text-[#0A3622]'
                      }`}
                    >
                      {folder.shortName}
                    </h3>
                    <p
                      className={`text-xs leading-[1.65] line-clamp-2 ${
                        isSelected ? 'text-[#EAE7DF]/90' : 'text-[#56605B]'
                      }`}
                    >
                      {folder.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between text-[11px] uppercase tracking-[0.16em]">
                    <span className={isSelected ? 'text-[#6EE7B7] font-medium' : 'text-[#0A3622] font-medium'}>
                      {isSelected ? 'Đang mở thư mục này' : 'Mở thư mục'}
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'translate-x-0.5 text-[#6EE7B7]' : 'group-hover:translate-x-1 text-[#0A3622]'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* SEARCH BAR + SUB-TAG FILTER PILLS */}
          <div className="bg-[#F2EFE9]/80 border border-[#DCD8CE] rounded-[4px] p-4 sm:p-6 mb-14 space-y-4">
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-between">
              {/* Instant Search Input */}
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

              {/* Reset / Status Counter */}
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

            {/* Sub-tag Filter Rail */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#858E89] shrink-0 mr-1">
                Chủ đề nhánh:
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

          {/* TIER 1: 6 SPOTLIGHT VIDEO CARDS */}
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
                  Bấm vào từng chủ đề để xem Video &amp; Bản đúc kết chi tiết
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {spotlightVideos.map((video, idx) => (
                  <article
                    key={video.id}
                    onClick={() => onOpenVideo(video)}
                    className="group cursor-pointer flex flex-col justify-between bg-[#FAF9F5] p-6 sm:p-7 border border-[#DCD8CE] hover:border-[#0A3622]/50 hover:shadow-[0_14px_34px_-15px_rgba(10,54,34,0.14)] transition-all duration-300 rounded-[4px]"
                  >
                    <div>
                      {/* Top Meta Row: Folder Badge + Views */}
                      <div className="flex items-center justify-between gap-2 pb-3.5 mb-4 border-b border-[#EAE7DF]">
                        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#008746] font-medium truncate">
                          {video.folderShort}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#56605B] bg-[#F2EFE9] px-2.5 py-0.5 rounded-[2px] shrink-0 font-medium">
                          <Eye className="w-3 h-3 text-[#008746]" />
                          {video.views} lượt xem
                        </span>
                      </div>

                      {/* Subtag */}
                      <div className="mb-2">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#858E89]">
                          {video.subtag}
                        </span>
                      </div>

                      {/* Editorial Headline */}
                      <h3 className="font-sans font-semibold text-lg sm:text-[19px] text-[#181F1C] group-hover:text-[#0A3622] leading-[1.38] transition-colors mb-3.5 tracking-tight">
                        {video.title}
                      </h3>

                      {/* Key Takeaway Summary */}
                      <p className="text-xs sm:text-[13.5px] text-[#28322D] font-normal leading-[1.7] line-clamp-3 mb-6 bg-[#F2EFE9]/60 p-3.5 rounded-[3px] border-l-2 border-l-[#008746]/70">
                        {video.summary}
                      </p>
                    </div>

                    {/* Footer Action Bar */}
                    <div className="pt-3.5 border-t border-[#EAE7DF] flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#0A3622] group-hover:text-[#008746] font-medium transition-colors">
                        <span className="w-7 h-7 rounded-full bg-[#0A3622] group-hover:bg-[#008746] text-white flex items-center justify-center transition-colors">
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </span>
                        <span>Xem Video &amp; Đúc kết</span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => copyVideoLink(video, e)}
                        className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-[#6A756F] hover:text-[#0A3622] px-2 py-1.5 rounded-[2px] hover:bg-[#F2EFE9] transition-colors"
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

          {/* TIER 2: STRUCTURED ARCHIVE DIRECTORY OF REMAINING VIDEOS */}
          {archiveVideos.length > 0 && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#DCD8CE]">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#0A3622] font-medium">
                  DANH MỤC TRA CỨU NHANH &bull; {archiveVideos.length} CHỦ ĐỀ TIẾP THEO
                </span>
                <span className="text-xs text-[#6A756F] font-light">
                  Tối ưu cho Đội ngũ tư vấn &amp; Khách hàng tra cứu theo tình huống
                </span>
              </div>

              <div className="border-t border-[#DCD8CE] divide-y divide-[#DCD8CE]">
                {visibleArchiveVideos.map((video, index) => (
                  <article
                    key={video.id}
                    onClick={() => onOpenVideo(video)}
                    className="group py-4 sm:py-5 grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 lg:gap-6 items-center cursor-pointer hover:bg-[#F2EFE9]/70 transition-colors px-2 sm:px-4"
                  >
                    {/* Folder & Views */}
                    <div className="lg:col-span-3 flex items-center gap-3">
                      <span className="font-serif text-base text-[#858E89] w-6 shrink-0">
                        {String(index + 7).padStart(2, '0')}
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.15em] text-[#008746] font-medium bg-[#008746]/[0.07] px-2 py-0.5 rounded-[2px]">
                          {video.folderShort}
                        </span>
                        <span className="text-[11px] text-[#6A756F] inline-flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {video.views}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="lg:col-span-5">
                      <h4 className="font-sans font-semibold text-sm sm:text-[15px] text-[#181F1C] group-hover:text-[#0A3622] leading-[1.4] transition-colors">
                        {video.title}
                      </h4>
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[#858E89] block mt-0.5">
                        {video.subtag}
                      </span>
                    </div>

                    {/* Core Takeaway Preview */}
                    <div className="lg:col-span-3 hidden lg:block">
                      <p className="text-xs text-[#56605B] line-clamp-2 leading-[1.6]">
                        {video.summary}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="lg:col-span-1 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={(e) => copyVideoLink(video, e)}
                        className="p-2 text-[#6A756F] hover:text-[#0A3622] rounded-[2px] hover:bg-[#EAE7DF]/60 transition-colors"
                        title="Copy link gửi khách hàng / đồng đội"
                      >
                        {copiedId === video.id ? (
                          <Check className="w-3.5 h-3.5 text-[#008746]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] text-[#0A3622] group-hover:text-[#008746] font-medium">
                        <Play className="w-3 h-3 fill-current" />
                        <span className=" lg:hidden xl:inline">Xem</span>
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

      {/* LUXURY 2-COLUMN CINEMA VIDEO & TRANSCRIPT MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseVideo}
            className="fixed inset-0 z-50 bg-[#181F1C]/85 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4 lg:p-8"
          >
            <motion.div
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 28, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] max-w-5xl bg-[#FAF9F5] sm:border sm:border-[#DCD8CE] flex flex-col overflow-hidden sm:rounded-[6px] shadow-2xl"
            >
              {/* MODAL TOP HEADER BAR */}
              <div className="sticky top-0 z-30 bg-[#FAF9F5]/96 backdrop-blur-md border-b border-[#E4E1D8] px-4 sm:px-7 py-3 flex items-center justify-between shrink-0">
                <button
                  type="button"
                  onClick={onCloseVideo}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#56605B] hover:text-[#181F1C] min-h-[40px] -ml-1 px-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium text-[11px] sm:text-xs">Quay lại thư viện</span>
                </button>

                <div className="flex items-center gap-2 truncate max-w-[200px] sm:max-w-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008746] shrink-0" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#0A3622] font-medium truncate">
                    {activeVideo.folderName}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => copyVideoLink(activeVideo, e)}
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-[#008746] hover:text-[#0A3622] px-2.5 py-1.5 rounded-[2px] bg-[#008746]/[0.08] font-medium transition-colors"
                  >
                    {copiedId === activeVideo.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã chép Link</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Sao chép Link</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={onCloseVideo}
                    className="p-2 text-[#56605B] hover:text-[#181F1C] transition-colors"
                    aria-label="Đóng"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* MODAL 2-COLUMN BODY */}
              <div className="flex-1 overflow-y-auto overscroll-contain grid grid-cols-1 lg:grid-cols-12">
                {/* LEFT COLUMN: VERTICAL REEL CINEMA PLAYER (5 COLS ON DESKTOP) */}
                <div className="lg:col-span-5 bg-[#121715] flex flex-col items-center justify-between p-4 sm:p-6 lg:sticky lg:top-0 lg:h-full border-b lg:border-b-0 lg:border-r border-[#DCD8CE]">
                  <div className="w-full max-w-[320px] mx-auto my-auto flex flex-col items-center">
                    <div className="w-full aspect-[9/16] max-h-[520px] bg-black rounded-[4px] overflow-hidden ring-1 ring-white/15 shadow-xl relative">
                      <iframe
                        src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                          activeVideo.url
                        )}&show_text=false&width=320`}
                        width="100%"
                        height="100%"
                        style={{ border: 'none', overflow: 'hidden' }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        title={activeVideo.title}
                        className="w-full h-full"
                      />
                    </div>

                    <div className="w-full mt-3.5 flex items-center justify-between text-[11px] text-[#A0ABA5] px-1">
                      <span className="inline-flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-[#00A758]" />
                        {activeVideo.views} lượt xem thực tế
                      </span>
                      <a
                        href={activeVideo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#6EE7B7] hover:underline"
                      >
                        <span>Mở trên Facebook</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: EXECUTIVE SUMMARY, FULL TRANSCRIPT & CTAs (7 COLS ON DESKTOP) */}
                <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 space-y-6 bg-[#FAF9F5]">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em]">
                    <span className="text-[#008746] font-medium">{activeVideo.folderShort}</span>
                    <span className="text-[#858E89]">&bull;</span>
                    <span className="text-[#56605B]">{activeVideo.subtag}</span>
                    <span className="text-[#858E89]">&bull;</span>
                    <span className="text-[#858E89]">{activeVideo.views} views</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-normal text-[#181F1C] leading-[1.25]">
                    {activeVideo.title}
                  </h3>

                  {/* Executive Summary Box */}
                  <div className="p-4 sm:p-5 bg-[#F2EFE9]/90 border-l-2 border-l-[#008746] rounded-[3px] space-y-1.5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#008746] font-semibold block">
                      ĐÚC KẾT CỐT LÕI TỪ KHÁNH VÂN
                    </span>
                    <p className="font-serif italic text-base sm:text-lg text-[#181F1C] leading-[1.6]">
                      “{activeVideo.summary}”
                    </p>
                  </div>

                  {/* Full Spoken Transcript */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between border-b border-[#E4E1D8] pb-2">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#56605B] font-medium">
                        NỘI DUNG CHIA SẺ CHI TIẾT (BẢN ĐỌC)
                      </span>
                      <span className="text-[11px] text-[#858E89]">
                        Tiện tra cứu nhanh không cần bật âm thanh
                      </span>
                    </div>

                    <div className="space-y-3.5 text-sm sm:text-[15px] text-[#28322D] font-normal leading-[1.85]">
                      {activeVideo.paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </div>

                  {/* Action Box for Team & Clients */}
                  <div className="pt-6 border-t border-[#DCD8CE] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#F2EFE9]/60 p-4 sm:p-5 rounded-[4px]">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#008746] font-medium block">
                        ĐỒNG HÀNH &amp; THAM VẤN 1-1
                      </span>
                      <p className="text-xs sm:text-[13px] text-[#28322D]">
                        {activeVideo.cta}
                      </p>
                    </div>
                    <div className="flex flex-col xs:flex-row gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => copyVideoLink(activeVideo, e)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-[#0A3622] text-[#0A3622] hover:bg-[#0A3622]/5 text-[11px] uppercase tracking-[0.16em] font-medium rounded-[2px] transition-colors"
                      >
                        {copiedId === activeVideo.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#008746]" />
                            <span>Đã Sao Chép Link</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Link Gửi Khách</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => onAskQuestion(activeVideo)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0A3622] hover:bg-[#008746] text-[#FAF9F5] text-[11px] uppercase tracking-[0.16em] font-medium rounded-[2px] transition-colors"
                      >
                        <span>Đặt Câu Hỏi Riêng</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Related Videos in Same Folder */}
                  {relatedVideos.length > 0 && (
                    <div className="pt-6 border-t border-[#E4E1D8] space-y-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#858E89] font-medium block">
                        VIDEO CÙNG CHUYÊN MỤC ({activeVideo.folderShort})
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {relatedVideos.map((rel) => (
                          <button
                            key={rel.id}
                            type="button"
                            onClick={() => onOpenVideo(rel)}
                            className="text-left p-3 rounded-[3px] border border-[#DCD8CE] hover:border-[#0A3622] bg-[#FAF9F5] transition-colors group flex flex-col justify-between"
                          >
                            <p className="text-xs font-medium text-[#181F1C] group-hover:text-[#008746] line-clamp-2 leading-[1.45] mb-2">
                              {rel.title}
                            </p>
                            <span className="text-[10px] text-[#6A756F] inline-flex items-center gap-1">
                              <Play className="w-2.5 h-2.5 fill-current text-[#008746]" />
                              {rel.views} lượt xem
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
