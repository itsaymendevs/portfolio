import { useEffect } from "react";
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

export default function BeHealthyPage() {
  useEffect(() => {
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
  }, []);

  return (
    <div className="behealthy min-h-screen bg-white">
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
    </div>
  );
}
