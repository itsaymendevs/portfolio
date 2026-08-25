import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./Navbar";
import BeHealthyHero from "./BeHealthyHero";
import AboutUsSection from "./AboutUsSection";
import MealPlansSection from "./MealPlansSection";

export default function BeHealthyPage() {
  useEffect(() => {
    document.documentElement.classList.add("behealthy-html");
    document.body.classList.add("behealthy");

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
      lerp: 0.075,
      gestureOrientation: "vertical",
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
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
    </div>
  );
}
