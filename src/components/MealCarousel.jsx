import { useEffect, useRef } from "react";

const IMAGES = [1, 2, 4, 5, 6].map((n) => `/realmeal/meal-${n}.avif`);

function MealCarousel() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf;
    let pos = 0;
    const speed = 0.5;

    const tick = () => {
      pos -= speed;
      if (Math.abs(pos) >= track.scrollWidth / 2) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const items = [...IMAGES, ...IMAGES];

  return (
    <section className="relative overflow-hidden bg-neutral-950 py-6 sm:py-8">
      <div
        ref={trackRef}
        className="flex w-max gap-4 px-4"
        style={{ willChange: "transform" }}
      >
        {items.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="h-32 w-32 shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-36 md:h-40 md:w-40 lg:h-44 lg:w-44"
          >
            <img
              src={src}
              alt="Real Meal dish"
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default MealCarousel;
