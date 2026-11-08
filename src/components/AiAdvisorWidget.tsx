import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, Send, Sparkles, X } from 'lucide-react';
import { VIDEO_LIBRARY, VideoItem } from '../data/videos';

interface MatchedVideoRef {
  id: string;
  title: string;
  category: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  matchedVideos?: MatchedVideoRef[];
  suggestedQuestion?: string | null;
  timestamp: string;
}

interface AiAdvisorWidgetProps {
  onOpenVideo: (video: VideoItem) => void;
  hidden?: boolean;
}

const STARTER_QUESTIONS = [
  'Tiền đóng vào công ty bảo hiểm sẽ đi về đâu?',
  'Đóng phí 10 năm rồi có nên rút Giá trị tài khoản không?',
  'Thẻ sức khỏe Kim Cương 2 tỷ/năm có quyền lợi gì?',
  'Lộ trình từ Ngân hàng sang làm Quản lý tại Manulife?',
];

export const AiAdvisorWidget: React.FC<AiAdvisorWidgetProps> = ({
  onOpenVideo,
  hidden = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content:
        'Chào bạn! Bạn muốn tìm hiểu về hợp đồng bảo hiểm, thẻ sức khỏe, quỹ tích sản cho con hay lộ trình sự nghiệp tại Manulife? Bạn có thể chọn một câu hỏi bên dưới hoặc nhắn trực tiếp tình huống của mình nhé.',
      timestamp: 'Vừa xong',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [viewportStyle, setViewportStyle] = useState<{ height?: string; top?: string }>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let sid = localStorage.getItem('kv_chat_session_id');
      if (!sid) {
        sid = 'kv-' + Math.random().toString(36).substring(2, 10) + '-' + Date.now();
        localStorage.setItem('kv_chat_session_id', sid);
      }
      setSessionId(sid);
    }
  }, []);

  // Track visualViewport on mobile to handle iOS virtual keyboard smoothly without screen jump or zoom
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    const updateViewport = () => {
      if (window.innerWidth >= 640) {
        setViewportStyle({});
        return;
      }

      if (window.visualViewport) {
        const vv = window.visualViewport;
        setViewportStyle({
          height: `${vv.height}px`,
          top: `${vv.offsetTop}px`,
        });
      } else {
        setViewportStyle({
          height: '100dvh',
          top: '0px',
        });
      }
    };

    updateViewport();

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener('resize', updateViewport);
      vv.addEventListener('scroll', updateViewport);
    }
    window.addEventListener('resize', updateViewport);

    return () => {
      if (vv) {
        vv.removeEventListener('resize', updateViewport);
        vv.removeEventListener('scroll', updateViewport);
      }
      window.removeEventListener('resize', updateViewport);
    };
  }, [isOpen]);

  // Lock body scroll on mobile when chat drawer is open
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.innerWidth < 640) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend ?? inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'u-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const priorMessages = messages
      .filter((m) => m.id !== 'welcome-msg')
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: text,
          history: priorMessages,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: 'b-' + Date.now(),
          role: 'assistant',
          content: data.reply || 'Vân đã nhận được tin nhắn và sẽ phản hồi bạn ngay nhé!',
          matchedVideos: data.matchedVideos || [],
          suggestedQuestion: data.suggestedQuestion || null,
          timestamp: new Date().toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      console.error('Chat widget error:', err);
      const fallbackMsg: ChatMessage = {
        id: 'b-err-' + Date.now(),
        role: 'assistant',
        content:
          'Khánh Vân đã nhận được câu hỏi của bạn. Để được hỗ trợ trực tiếp và rà soát hợp đồng nhanh nhất, bạn có thể gửi tin nhắn qua Zalo 0931 579 771 nhé!',
        timestamp: 'Vừa xong',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (hidden) return null;

  return (
    <>
      {/* FLOATING TRIGGER BUTTON (DEDICATED BOTTOM RIGHT) */}
      {!isOpen && (
        <div className="fixed bottom-[calc(0.875rem+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-3.5 sm:right-6 z-40 flex flex-col items-end pointer-events-auto select-none">
          {/* Subtle executive status pill (shown on tablet/desktop to keep mobile bottom bar uncluttered) */}
          <div
            className="hidden sm:flex mb-1.5 bg-[#FAF9F5]/90 backdrop-blur-md text-[#28322D] border border-[#00A758]/25 px-2.5 py-0.5 rounded-full shadow-[0_2px_8px_rgba(10,54,34,0.06)] text-[10px] font-normal items-center gap-1.5 transition-all hover:scale-102 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22C55E]" />
            </span>
            <span className="text-[#28322D]">Trực tuyến</span>
            <span className="text-[#008746] font-medium">&bull; Phản hồi ngay</span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2 pl-1.5 pr-3 sm:pr-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[#0A3622] via-[#0D5C38] to-[#0A3622] hover:from-[#008746] hover:to-[#0A3622] text-[#FAF9F5] shadow-[0_6px_20px_rgba(10,54,34,0.28)] border border-[#00A758]/40 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            aria-label="Mở Chat với Khánh Vân"
          >
            {/* Subtle breathing emerald halo (desktop only to prevent horizontal overflow on narrow mobile screens) */}
            <span
              className="hidden sm:block absolute -inset-1 rounded-full bg-[#00A758]/20 pointer-events-none animate-ping"
              style={{ animationDuration: '3.6s' }}
            />

            {/* Real Avatar of Chị Khánh Vân */}
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#6EE7B7]/70 shrink-0 shadow-sm bg-[#181F1C]">
              <img
                src="/images/avatar_khanh_van.jpg"
                alt="Khánh Vân"
                width={32}
                height={32}
                className="w-7 h-7 sm:w-8 sm:h-8 object-cover rounded-full block"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#22C55E] border border-[#0A3622] rounded-full" />
            </div>

            <span className="font-serif text-[13px] sm:text-[14px] font-medium text-white/95 leading-none tracking-[0.02em] whitespace-nowrap">
              Chat với Khánh Vân
            </span>

            <Sparkles className="w-3 h-3 text-[#6EE7B7]/75 group-hover:text-[#6EE7B7] transition-colors shrink-0" />
          </button>
        </div>
      )}

      {/* LUXURY EDITORIAL CHAT DRAWER / WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={viewportStyle}
            className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full sm:w-[410px] h-[100dvh] sm:h-[580px] sm:max-h-[85dvh] bg-[#FAF9F5] sm:border sm:border-[#DCD8CE] sm:rounded-[12px] shadow-[0_24px_60px_rgba(10,54,34,0.32)] flex flex-col overflow-hidden"
          >
            {/* HEADER */}
            <div className="bg-[#0A3622] text-[#FAF9F5] px-4 pt-[max(0.875rem,env(safe-area-inset-top,0px))] pb-3.5 sm:pt-3.5 flex items-center justify-between shrink-0 border-b border-white/10 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#6EE7B7]/80 shrink-0 bg-[#181F1C] shadow-xs">
                  <img
                    src="/images/avatar_khanh_van.jpg"
                    alt="Chuyên gia Tài chính Khánh Vân"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22C55E] border border-white rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif text-[16px] sm:text-[17px] font-medium text-white leading-none tracking-tight">
                      Chat với Khánh Vân
                    </h4>
                    <Sparkles className="w-3.5 h-3.5 text-[#6EE7B7]" />
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    <span className="text-[11px] text-[#A7F3D0] leading-none font-light">
                      Phản hồi ngay &bull; Trực tuyến
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 sm:p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 active:bg-white/20 transition-colors"
                aria-label="Đóng khung chat"
              >
                <X className="w-5 h-5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* MESSAGES SCROLL AREA */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain bg-[#FAF9F5]">
              {messages.map((msg, idx) => {
                const isBot = msg.role === 'assistant';
                // Resolve matched video objects from VIDEO_LIBRARY
                const resolvedVideos = (msg.matchedVideos || [])
                  .map((mv) => VIDEO_LIBRARY.find((v) => v.id === mv.id))
                  .filter((v): v is VideoItem => Boolean(v));

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-[8px] px-3.5 py-2.5 text-xs sm:text-[13px] leading-[1.65] whitespace-pre-line shadow-2xs ${
                        isBot
                          ? 'bg-[#F2EFE9] text-[#181F1C] border border-[#E4E1D8]'
                          : 'bg-[#0A3622] text-[#FAF9F5]'
                      }`}
                    >
                      {msg.content
                        .replace(/\*\*(.*?)\*\*/g, '$1')
                        .replace(/\*(.*?)\*/g, '$1')
                        .replace(/^-\s+/gm, '• ')}
                    </div>

                    {/* ATTACHED VIDEO CARDS INSIDE BOT REPLY */}
                    {isBot && resolvedVideos.length > 0 && (
                      <div className="mt-2.5 w-[88%] space-y-1.5">
                        <span className="text-[10px] uppercase tracking-[0.14em] text-[#008746] font-semibold block">
                          Video liên quan từ Khánh Vân:
                        </span>
                        {resolvedVideos.map((vid) => (
                          <button
                            key={vid.id}
                            type="button"
                            onClick={() => {
                              setIsOpen(false);
                              onOpenVideo(vid);
                            }}
                            className="w-full text-left p-2 rounded-[6px] bg-white border border-[#DCD8CE] hover:border-[#008746] shadow-xs flex items-center gap-2.5 group transition-all"
                          >
                            <div className="w-10 h-12 rounded-[3px] overflow-hidden bg-black shrink-0 relative">
                              <img
                                src={vid.thumbnail}
                                alt={vid.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <Play className="w-3 h-3 text-white fill-current" />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-sans font-semibold text-[11.5px] text-[#181F1C] group-hover:text-[#008746] line-clamp-2 leading-[1.35]">
                                {vid.title}
                              </p>
                              <span className="text-[10px] text-[#6A756F] block mt-0.5">
                                {vid.views} lượt xem &bull; Bấm để xem
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* 1 SMART CONTEXTUAL SUGGESTED FOLLOW-UP QUESTION */}
                    {isBot && msg.suggestedQuestion && idx === messages.length - 1 && !isLoading && (
                      <div className="mt-2 w-full max-w-[92%]">
                        <button
                          type="button"
                          onClick={() => sendMessage(msg.suggestedQuestion!)}
                          className="w-full text-left p-2.5 rounded-[8px] bg-white hover:bg-[#0A3622] text-[#0A3622] hover:text-[#FAF9F5] border border-[#00A758]/50 hover:border-[#0A3622] shadow-2xs hover:shadow-xs transition-all duration-200 flex items-center justify-between gap-2 group cursor-pointer active:scale-98"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <Sparkles className="w-3.5 h-3.5 text-[#008746] group-hover:text-[#6EE7B7] shrink-0" />
                            <span className="text-xs sm:text-[12.5px] font-medium line-clamp-2">
                              {msg.suggestedQuestion}
                            </span>
                          </div>
                          <Send className="w-3 h-3 text-[#008746] group-hover:text-[#6EE7B7] opacity-60 group-hover:opacity-100 shrink-0 transition-opacity" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* STARTER QUESTIONS PILLS (SHOW WHEN ONLY WELCOME MESSAGE EXISTS) */}
              {messages.length === 1 && !isLoading && (
                <div className="pt-2 space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#858E89] block font-semibold">
                    Câu hỏi thường gặp:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {STARTER_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => sendMessage(q)}
                        className="text-left text-xs px-3.5 py-2.5 rounded-[6px] bg-white hover:bg-[#0A3622]/[0.05] text-[#181F1C] border border-[#DCD8CE] hover:border-[#0A3622] transition-colors flex items-center justify-between gap-2 group shadow-2xs"
                      >
                        <span className="line-clamp-1 font-medium">{q}</span>
                        <Send className="w-3 h-3 text-[#008746] shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TYPING INDICATOR */}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-[#56605B] bg-[#F2EFE9] px-3.5 py-2.5 rounded-[8px] w-max border border-[#E4E1D8]">
                  <span className="w-2 h-2 rounded-full bg-[#008746] animate-ping" />
                  <span>Đang soạn câu trả lời...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT BAR */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="p-3 bg-[#FAF9F5] border-t border-[#DCD8CE] flex items-center gap-2 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:pb-3"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => {
                  setTimeout(() => {
                    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }, 250);
                }}
                placeholder="Nhắn tin với Khánh Vân..."
                className="flex-1 px-3.5 py-2.5 text-[16px] sm:text-[13px] bg-white border border-[#DCD8CE] focus:border-[#0A3622] rounded-[6px] text-[#181F1C] placeholder:text-[#858E89] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 bg-[#0A3622] hover:bg-[#008746] disabled:opacity-40 text-white rounded-[6px] transition-colors shrink-0"
                aria-label="Gửi tin nhắn"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
