import { useEffect, useRef } from "react";

function PortfolioPage() {
  const iframeRef = useRef(null);

  useEffect(() => {
    document.title = "Aymen Ahmed";
    const fav = document.querySelector("link[rel='icon']");
    if (fav) fav.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%23111110'/%3E%3Ctext x='32' y='42' text-anchor='middle' font-family='Arial' font-size='28' font-weight='700' fill='%23fff'%3EAA%3C/text%3E%3C/svg%3E";
    const setOG = (prop, content) => {
      let el = document.querySelector(`meta[property='${prop}']`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
      el.content = content;
    };
    setOG("og:title", "Aymen Ahmed — Senior Software Engineer");
    setOG("og:description", "Portfolio of Aymen Ahmed — Senior Software Engineer. Meal planning, legal tech and health products.");
    setOG("og:image", "https://itsaymendevs.github.io/portfolio/portfolio/assets/doer-3.png");
    setOG("og:url", "https://itsaymendevs.github.io/portfolio/");
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="/portfolio/index.html"
      title="Aymen Ahmed — Portfolio"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  );
}

export default PortfolioPage;
