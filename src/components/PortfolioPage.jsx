import { useEffect, useRef } from "react";

function PortfolioPage() {
  const iframeRef = useRef(null);

  useEffect(() => {
    document.title = "Aymen Ahmed";
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
