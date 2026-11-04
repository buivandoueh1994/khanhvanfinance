import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  MessageSquare,
  Play,
  Send,
  Sparkles,
  UserCheck,
  X,
} from 'lucide-react';
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
        'Chào bạn! Mình là Trợ lý AI của Chuyên gia Tài chính Khánh Vân. Bạn đang muốn tìm hiểu về cơ chế Hợp đồng Bảo hiểm, Thẻ sức khỏe, Quỹ tích sản cho con hay Lộ trình sự nghiệp tại Manulife? Hãy chọn câu hỏi bên dưới hoặc nhắn trực tiếp tình huống của bạn nhé!',
      timestamp: 'Vừa xong',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Built-in Quick Lead Form inside Chat
  const [showLeadBox, setShowLeadBox] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadNote, setLeadNote] = useState('');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

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

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading, showLeadBox]);

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

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: text,
          history: nextHistory.slice(-6).map((m) => ({
            role: m.role,
            content: m.content,
          })),
          visitorName: leadName,
          visitorPhone: leadPhone,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: 'b-' + Date.now(),
        role: 'assistant',
        content:
          data.reply ||
          'Cảm ơn bạn đã nhắn tin. Bạn có thể để lại SĐT Zalo để Khánh Vân hỗ trợ trực tiếp nhé!',
        matchedVideos: data.matchedVideos || [],
        timestamp: new Date().toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'assistant',
          content:
            'Hiện kết nối đang bận nhẹ, bạn có thể bấm nút "Để lại SĐT tư vấn 1-1" bên dưới hoặc nhắn trực tiếp Zalo 0931 579 771 để Khánh Vân hỗ trợ ngay nhé!',
          timestamp: 'Vừa xong',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPhone.trim() || leadSubmitting) return;
    setLeadSubmitting(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          fullName: leadName.trim() || 'Khách từ Chatbot AI',
          phone: leadPhone.trim(),
          topic: 'Yêu cầu tư vấn 1-1 từ Trợ lý AI Chatbot',
          note:
            leadNote.trim() ||
            messages
              .filter((m) => m.role === 'user')
              .map((m) => m.content)
              .join(' | '),
          source: 'chatbot',
        }),
      });
      setLeadSuccess(true);
      setMessages((prev) => [
        ...prev,
        {
          id: 'lead-ok-' + Date.now(),
          role: 'assistant',
          content: `Cảm ơn ${leadName || 'bạn'}! Trợ lý đã ghi nhận số Zalo ${leadPhone} và gửi thông báo trực tiếp cho chị Khánh Vân. Chị Vân sẽ liên hệ hỗ trợ bạn sớm nhất nhé!`,
          timestamp: 'Vừa xong',
        },
      ]);
      setTimeout(() => {
        setShowLeadBox(false);
      }, 1500);
    } catch {
      // Ignore error UI
    } finally {
      setLeadSubmitting(false);
    }
  };

  if (hidden) return null;

  return (
    <>
      {/* FLOATING AI ADVISOR TRIGGER BUTTON (SITS ABOVE ZALO/FB BUTTONS) */}
      <div className="fixed bottom-[calc(8.5rem+env(safe-area-inset-bottom,0px))] right-4 sm:right-6 z-40 flex flex-col items-end pointer-events-auto select-none">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 sm:py-3 rounded-full bg-[#181F1C] hover:bg-[#0A3622] text-[#FAF9F5] shadow-[0_10px_28px_rgba(10,54,34,0.38)] border border-[#00A758]/50 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
          aria-label="Mở Trợ lý AI Khánh Vân"
        >
          <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#00A758] to-[#0A3622] text-white shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#22C55E] border-2 border-[#181F1C] rounded-full" />
          </span>
          <div className="text-left">
            <span className="block text-[10px] uppercase tracking-[0.16em] text-[#6EE7B7] font-medium leading-none mb-0.5">
              Hỏi đáp 24/7
            </span>
            <span className="block font-sans font-semibold text-xs sm:text-[13px] text-white leading-none">
              Trợ lý AI Khánh Vân
            </span>
          </div>
        </button>
      </div>

      {/* LUXURY EDITORIAL CHAT DRAWER / WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[400px] h-[560px] max-h-[85dvh] bg-[#FAF9F5] border border-[#DCD8CE] rounded-[8px] shadow-[0_24px_60px_rgba(10,54,34,0.28)] flex flex-col overflow-hidden"
          >
            {/* HEADER */}
            <div className="bg-[#0A3622] text-[#FAF9F5] px-4 py-3.5 flex items-center justify-between shrink-0 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#6EE7B7]/60 shrink-0 bg-[#181F1C]">
                  <img
                    src="/images/ChanDung_ChiVan_AoVestTrang_NgoiBanLamViec.jpg"
                    alt="Chuyên gia Tài chính Khánh Vân"
                    className="w-full h-full object-cover object-top"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22C55E] border border-white rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif text-lg font-medium text-white leading-none">
                      Cố Vấn AI Khánh Vân
                    </h4>
                    <Sparkles className="w-3.5 h-3.5 text-[#6EE7B7]" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#A7F3D0] block mt-1">
                    Trích xuất từ 109 Video &amp; Hồ sơ Thực chiến
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/75 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                aria-label="Đóng khung chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* MESSAGES SCROLL AREA */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain bg-[#FAF9F5]">
              {messages.map((msg) => {
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
                      className={`max-w-[88%] rounded-[6px] px-3.5 py-2.5 text-xs sm:text-[13px] leading-[1.65] whitespace-pre-line ${
                        isBot
                          ? 'bg-[#F2EFE9] text-[#181F1C] border border-[#E4E1D8]'
                          : 'bg-[#0A3622] text-[#FAF9F5]'
                      }`}
                    >
                      {msg.content}
                    </div>

                    {/* ATTACHED VIDEO CARDS INSIDE BOT REPLY */}
                    {isBot && resolvedVideos.length > 0 && (
                      <div className="mt-2 w-[88%] space-y-1.5">
                        <span className="text-[10px] uppercase tracking-[0.14em] text-[#008746] font-semibold block">
                          🎬 Video Khánh Vân giải thích trực tiếp:
                        </span>
                        {resolvedVideos.map((vid) => (
                          <button
                            key={vid.id}
                            type="button"
                            onClick={() => {
                              setIsOpen(false);
                              onOpenVideo(vid);
                            }}
                            className="w-full text-left p-2 rounded-[4px] bg-white border border-[#DCD8CE] hover:border-[#008746] shadow-xs flex items-center gap-2.5 group transition-all"
                          >
                            <div className="w-10 h-12 rounded-[2px] overflow-hidden bg-black shrink-0 relative">
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
                                {vid.views} lượt xem &bull; Bấm để xem video
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* STARTER PILLS (SHOW WHEN ONLY WELCOME MESSAGE EXISTS) */}
              {messages.length === 1 && !isLoading && (
                <div className="pt-1 space-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#858E89] block">
                    Chủ đề được hỏi nhiều nhất:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {STARTER_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => sendMessage(q)}
                        className="text-left text-xs px-3 py-2 rounded-[4px] bg-white hover:bg-[#0A3622]/[0.05] text-[#181F1C] border border-[#DCD8CE] hover:border-[#0A3622] transition-colors flex items-center justify-between gap-2 group"
                      >
                        <span className="line-clamp-1">{q}</span>
                        <Send className="w-3 h-3 text-[#008746] shrink-0 opacity-70 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TYPING INDICATOR */}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-[#56605B] bg-[#F2EFE9] px-3.5 py-2.5 rounded-[6px] w-max border border-[#E4E1D8]">
                  <span className="w-2 h-2 rounded-full bg-[#008746] animate-ping" />
                  <span>Trợ lý Khánh Vân đang phân tích...</span>
                </div>
              )}

              {/* INLINE QUICK LEAD CAPTURE FORM */}
              {showLeadBox && (
                <form
                  onSubmit={handleLeadSubmit}
                  className="p-3.5 rounded-[6px] bg-[#F2EFE9] border border-[#0A3622]/30 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-[#0A3622] font-semibold">
                      Đặt lịch tham vấn / Rà soát hợp đồng 1-1
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowLeadBox(false)}
                      className="text-[#858E89] hover:text-[#181F1C]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Tên của bạn *"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#DCD8CE] rounded-[3px] focus:outline-none focus:border-[#0A3622]"
                  />
                  <input
                    type="tel"
                    placeholder="Số điện thoại / Zalo của bạn *"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#DCD8CE] rounded-[3px] focus:outline-none focus:border-[#0A3622]"
                  />
                  <input
                    type="text"
                    placeholder="Nội dung cần Khánh Vân hỗ trợ (tùy chọn)"
                    value={leadNote}
                    onChange={(e) => setLeadNote(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#DCD8CE] rounded-[3px] focus:outline-none focus:border-[#0A3622]"
                  />
                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="w-full py-2 bg-[#0A3622] hover:bg-[#008746] text-white text-[11px] uppercase tracking-[0.16em] font-medium rounded-[3px] transition-colors"
                  >
                    {leadSubmitting ? 'Đang gửi...' : 'Gửi thông tin cho Khánh Vân'}
                  </button>
                </form>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK ACTION BAR: LEAVE PHONE FOR 1-1 CONSULTATION */}
            <div className="px-3.5 py-1.5 bg-[#F2EFE9] border-t border-[#E4E1D8] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowLeadBox(!showLeadBox)}
                className="inline-flex items-center gap-1.5 text-[11px] text-[#0A3622] hover:text-[#008746] font-medium"
              >
                {leadSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#008746]" />
                    <span>Đã gửi SĐT cho Khánh Vân</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-3.5 h-3.5 text-[#008746]" />
                    <span>Để lại SĐT nhờ Khánh Vân tư vấn 1-1</span>
                  </>
                )}
              </button>
              <a
                href="https://zalo.me/0931579771"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] uppercase tracking-[0.14em] text-[#56605B] hover:text-[#0A3622] underline"
              >
                Zalo trực tiếp
              </a>
            </div>

            {/* INPUT BAR */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="p-3 bg-[#FAF9F5] border-t border-[#DCD8CE] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập câu hỏi hoặc SĐT Zalo của bạn..."
                className="flex-1 px-3 py-2 text-xs sm:text-[13px] bg-white border border-[#DCD8CE] focus:border-[#0A3622] rounded-[4px] text-[#181F1C] placeholder:text-[#858E89] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 bg-[#0A3622] hover:bg-[#008746] disabled:opacity-40 text-white rounded-[4px] transition-colors shrink-0"
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
