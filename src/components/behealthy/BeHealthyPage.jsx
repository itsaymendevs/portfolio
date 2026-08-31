import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import BeHealthyHero from "./BeHealthyHero";
import AboutUsSection from "./AboutUsSection";
import MealPlansSection from "./MealPlansSection";
import MarqueeSection from "./MarqueeSection";
import MostPopularDishesSection from "./MostPopularDishesSection";
import MobileAppSection from "./MobileAppSection";
import HowItWorksSection from "./HowItWorksSection";
import BranchMenuSection from "./BranchMenuSection";
import CustomerReviewsSection from "./CustomerReviewsSection";
import OurBranchesSection from "./OurBranchesSection";
import PartnersMarqueeSection from "./PartnersMarqueeSection";
// import FreeConsultationSection from "./FreeConsultationSection"; // removed — will redesign
import NewsletterFullBgSection from "./NewsletterFullBgSection";
import BeHealthyFooter from "./BeHealthyFooter";
import BeHealthyPreloader from "./BeHealthyPreloader";
import FloatingActions from "./FloatingActions";

export default function BeHealthyPage() {
  const [preloading, setPreloading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc =
      document.querySelector('meta[name="description"]')?.content || "";
    document.title =
      "BeHealthy — Fresh Meal Plans & Daily Delivery Across UAE | Dubai, Abu Dhabi, Sharjah";
    const upsert = (attr, name, content) => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      const created = !el;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
      return { el, created };
    };
    const mDesc = upsert(
      "name",
      "description",
      "BeHealthy crafts personalized meal plans — balanced, high-protein, plant-based — with fresh daily delivery across Dubai, Abu Dhabi & Sharjah. Chef-crafted, dietitian-approved, flexible subscriptions.",
    );
    const mOgTitle = upsert(
      "property",
      "og:title",
      "BeHealthy — Personalized Meal Plans in UAE",
    );
    const mOgDesc = upsert(
      "property",
      "og:description",
      "Fresh, chef-crafted meal plans tailored to your taste, body and lifestyle. Balanced nutrition, flexible delivery, 5+ branches across UAE.",
    );
    const mOgImg = upsert("property", "og:image", "/behealthy/images/hero.jpg");
    const mOgUrl = upsert("property", "og:url", window.location.href);
    const mTwCard = upsert("name", "twitter:card", "summary_large_image");
    let fav = document.querySelector("link[rel='icon']");
    const prevFav = fav?.href || "";
    if (fav) fav.href = "/behealthy/images/logo.png";

    return () => {
      document.title = prevTitle;
      const d = document.querySelector('meta[name="description"]');
      if (d) d.content = prevDesc;
      if (mDesc.created) mDesc.el.remove();
      if (mOgTitle.created) mOgTitle.el.remove();
      if (mOgDesc.created) mOgDesc.el.remove();
      if (mOgImg.created) mOgImg.el.remove();
      if (mOgUrl.created) mOgUrl.el.remove();
      if (mTwCard.created) mTwCard.el.remove();
      if (fav) fav.href = prevFav;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.add("behealthy-html");
    document.body.classList.add("behealthy");

    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.85,
      lerp: 0.06,
      gestureOrientation: "vertical",
      touchMultiplier: 1.1,
    });

    // GSAP ticker drives Lenis for buttery sync + ScrollTrigger refresh
    const ticker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);

    // Enhanced smooth anchor scrolling via GSAP ScrollToPlugin (used by Navbar/Hero)
    const handleAnchorClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      // Use Lenis + GSAP for ultra-smooth scroll
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.4,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
      // Fallback GSAP ScrollTo for precise control
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 0 },
        ease: "power3.inOut",
        overwrite: true,
      });
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      gsap.ticker.remove(ticker);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      document.documentElement.classList.remove("behealthy-html");
      document.body.classList.remove("behealthy");
    };
  }, [ready]);

  useEffect(() => {
    if (!preloading) {
      const t = setTimeout(() => setReady(true), 80);
      return () => clearTimeout(t);
    }
  }, [preloading]);

  return (
    <div className="behealthy min-h-screen bg-white">
      {preloading && <BeHealthyPreloader onDone={() => setPreloading(false)} />}
      {ready && (
        <>
          <Navbar />
          <BeHealthyHero />
          <AboutUsSection />
          <MealPlansSection />
          <MarqueeSection />
          <MostPopularDishesSection />
          <MobileAppSection />
          <HowItWorksSection />
          <BranchMenuSection />
          <CustomerReviewsSection />
          <OurBranchesSection />
          <PartnersMarqueeSection />
          <NewsletterFullBgSection />
          <BeHealthyFooter />
          <FloatingActions />
        </>
      )}
    </div>
  );
}
