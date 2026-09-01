import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavbarA from "./components/navbar/NavbarA";
import HeroV2 from "./components/HeroV2";
import MissionSection from "./components/MissionSection";
import StepsSection from "./components/StepsSection";
import BrandSection from "./components/BrandSection";
import SampleMealsSection from "./components/SampleMealsSection";
import Footer from "./components/Footer";
import PortfolioPage from "./components/PortfolioPage";
import Preloader from "./components/Preloader";
import VisitorsPage from "./components/VisitorsPage";

function FloatingActions() {
  const [show, setShow] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
        <a
          href="https://wa.me/971528301994?text=Hello%20Aymen%21%20I%27m%20reaching%20out%20as%20a%20company.%20We%27re%20interested%20in%20building%20a%20website%20for%20our%20company%20or%20hiring%20you%20for%20a%20job.%20Could%20we%20discuss%20details%3F"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="whatsapp-btn flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-700 hover:scale-110"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(20px)",
            pointerEvents: show ? "auto" : "none",
            transitionDelay: "0ms",
          }}
        >
          <svg viewBox="0 0 24 24" fill="white" className="h-7 w-7">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        <button
          type="button"
          onClick={() => setChatOpen((v) => !v)}
          aria-label="Open chatbot"
          className="chatbot-btn flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg ring-1 ring-white/10 transition-all duration-700 hover:scale-110"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(20px)",
            pointerEvents: show ? "auto" : "none",
            transitionDelay: "120ms",
          }}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20a7.8 7.8 0 0 0 7.8-7.8A7.8 7.8 0 0 0 12 4.4 7.8 7.8 0 0 0 4.2 12.2c0 1.6.5 3.1 1.4 4.3L4 20l3.9-1.2A7.8 7.8 0 0 0 12 20Z" />
            <circle cx="8.6" cy="12" r="1.1" fill="currentColor" stroke="none" />
            <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
            <circle cx="15.4" cy="12" r="1.1" fill="currentColor" stroke="none" />
          </svg>
        </button>
      </div>

      <div
        className={`fixed bottom-24 left-6 z-50 w-[92vw] max-w-[340px] origin-bottom-left overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl transition-all duration-300 ease-out ${
          chatOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
        aria-hidden={!chatOpen}
      >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[11px] font-bold text-black">RM</span>
              <span className="text-sm font-semibold text-white">Real Meal Assistant</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <button type="button" onClick={() => setChatOpen(false)} className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/15 hover:text-white" aria-label="Close chat">×</button>
          </div>
          <div className="space-y-3 px-4 py-4">
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white px-3 py-2.5 text-sm leading-relaxed text-black">
              Hi! I’m here to help with meal plans, catering & orders. How can I assist you today?
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "View meal plans", href: "#meal-plans" },
                { label: "How to order", href: "#how-to-order" },
                { label: "WhatsApp", href: "https://wa.me/971528301994?text=Hi%20Aymen" },
              ].map((a) => (
                <a
                  key={a.label}
                  href={a.href}
                  target={a.href.startsWith("http") ? "_blank" : undefined}
                  rel={a.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={() => !a.href.startsWith("http") && setChatOpen(false)}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white"
                >
                  {a.label}
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 opacity-60">
              <input placeholder="Type a message…" className="pointer-events-none flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none" disabled />
              <span className="pointer-events-none cursor-default rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-black/60">Send</span>
            </div>
            <p className="mt-2 text-center text-[10px] text-white/30">Powered by Real Meal — replies via WhatsApp</p>
          </div>
        </div>
    </>
  );
}

export function RealMealSite() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.title = "Real Meal — By Aymen";
    // favicon -> realmeal logo
    const fav = document.querySelector("link[rel='icon']");
    if (fav) fav.href = "/realmeal/logo.png";
    // og tags for sharing (in-app, whatsapp will use static /realmeal/ file)
    const setOG = (prop, content) => {
      let el = document.querySelector(`meta[property='${prop}']`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
      el.content = content;
    };
    setOG("og:title", "Real Meal — By Aymen");
    setOG("og:description", "Chef-crafted meals, personalized and delivered fresh across the UAE. By Aymen.");
    setOG("og:image", "https://itsaymendevs.github.io/portfolio/realmeal/og-image.jpg");
    setOG("og:url", "https://itsaymendevs.github.io/portfolio/realmeal/");
    setOG("og:type", "website");
  }, []);

  return (
    <div id="top" className="min-h-screen">
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <NavbarA />
      <HeroV2 ready={ready} />
      <MissionSection ready={ready} />
      <StepsSection ready={ready} />
      <BrandSection ready={ready} />
      <SampleMealsSection ready={ready} />
      <Footer ready={ready} />
      <FloatingActions />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/realmeal" element={<RealMealSite />} />
      <Route path="/visitors" element={<VisitorsPage />} />
    </Routes>
  );
}

export default App;
