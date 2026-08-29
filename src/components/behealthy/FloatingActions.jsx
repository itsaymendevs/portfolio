import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Bot, X, Send, Sparkles } from "lucide-react";

export default function FloatingActions() {
  const [show, setShow] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, from: "ai", text: "Hi! I’m BeHealthy AI — tell me your goal and I’ll craft your perfect plan." },
  ]);
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) {
      const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }
    const obs = new IntersectionObserver(
      ([e]) => setShow(!e.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing, chatOpen]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { id: Date.now(), from: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: "ai",
          text: "Great choice! I’ll tailor a balanced plan for you — opening times, branches and menu are ready. Want me to open WhatsApp with your enquiry?",
        },
      ]);
    }, 900);
  };

  return (
    <>
      <AnimatePresence>
        {show && (
          <>
            {/* WhatsApp — bottom left — no badge */}
            <motion.a
              key="wa"
              href="https://wa.me/971528301994?text=Hello%2C%20I%20am%20the%20manager%20of%20BeHealthy%20restaurant.%20I%20would%20like%20to%20proceed%20with%20this%20website.%20Please%20provide%20me%20with%20the%20necessary%20data%20and%20let%27s%20discuss%20implementing%20more%20AI%20features%20and%20updating%20the%20website%20design."
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-5 left-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] ring-1 ring-white/10 hover:scale-[1.04] sm:bottom-6 sm:left-6 sm:h-14 sm:w-14"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={22} className="sm:hidden" />
              <MessageCircle size={24} className="hidden sm:block" />
            </motion.a>

            {/* Chatbot — bottom right — modern AI */}
            <motion.button
              key="bot"
              type="button"
              onClick={() => setChatOpen((v) => !v)}
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.9 }}
              transition={{ duration: 0.35, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-5 right-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-black text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] ring-1 ring-white/10 hover:scale-[1.04] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
              aria-label={chatOpen ? "Close chat" : "Open chat"}
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-60" />
              {chatOpen ? <X size={20} className="relative" /> : <Bot size={22} className="relative" />}
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {chatOpen && show && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[84px] right-4 z-50 flex w-[92vw] max-w-[360px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white shadow-[0_24px_64px_rgba(0,0,0,0.18)] sm:bottom-[88px] sm:right-6 sm:w-[380px]"
          >
            {/* Header — AI modern — darkish */}
            <div className="relative bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#242424] px-4 py-4 text-white">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40" style={{ backgroundSize: "200% 100%" }} />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative grid h-9 w-9 place-items-center rounded-full bg-white text-black shadow">
                    <Bot size={16} />
                    <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-white text-black shadow ring-1 ring-black/5">
                      <Sparkles size={8} />
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[13px] font-semibold leading-none">
                      BeHealthy AI <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[9px] font-bold tracking-[0.08em]">BETA</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[11px] leading-none text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow" /> Online • Replies instantly
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/15"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="relative mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {["Weight loss", "High protein", "Branch times"].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setInput(chip)}
                    className="shrink-0 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur hover:bg-white/20"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex max-h-[300px] flex-col gap-3 overflow-y-auto bg-[#fafafa] px-4 py-4 sm:max-h-[320px]">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[78%] rounded-[18px] px-3.5 py-2.5 text-[13px] leading-[1.5] shadow-sm ${
                      m.from === "user"
                        ? "rounded-br-[6px] bg-black text-white"
                        : "rounded-bl-[6px] border border-black/5 bg-white text-black/80"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-[18px] rounded-bl-[6px] border border-black/5 bg-white px-4 py-3 shadow-sm">
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/30 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/30 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/30" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-black/5 bg-white p-3">
              <div className="flex items-end gap-2 rounded-[16px] border border-black/10 bg-[#fafafa] px-3 py-2 focus-within:border-black/20 focus-within:bg-white focus-within:ring-2 focus-within:ring-black/10">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Ask about plans, branches, menu…"
                  rows={1}
                  className="max-h-[80px] min-h-[20px] flex-1 resize-none bg-transparent py-1.5 text-[13px] leading-[1.5] text-black placeholder:text-black/40 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={!input.trim()}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black text-white shadow hover:bg-black/90 disabled:opacity-40 disabled:shadow-none"
                  aria-label="Send"
                >
                  <Send size={14} className="ml-px" />
                </button>
              </div>
              <div className="mt-2 text-center text-[10px] leading-none text-black/30">AI can make mistakes. Check important info.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
