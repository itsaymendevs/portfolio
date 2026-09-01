import { useEffect, useRef } from "react";
import { logVisit, getCurrentRoute } from "@/lib/visitors";

/**
 * Tracks route visits for HashHistory (/#/ , /#/realmeal , /#/behealthy , /#/visitors )
 * Works with TanStack Router hash history + plain hashchange.
 */
export default function useVisitorTracker() {
  const lastRouteRef = useRef(null);

  useEffect(() => {
    const track = (route) => {
      const r = route || getCurrentRoute();
      // avoid double-fire for same route within a tick (router + hashchange)
      if (lastRouteRef.current === r + window.location.hash) return;
      lastRouteRef.current = r + window.location.hash;
      logVisit({ route: r });
      // slight reset delay so revisiting same route after navigation still logs
      setTimeout(() => { lastRouteRef.current = null; }, 800);
    };

    // initial page load
    track();

    const onHash = () => track();
    const onPop = () => track();

    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onPop);

    // Also hook TanStack Router navigation if available (mutation observer fallback)
    // Poll location.hash every 900ms as safety net for programmatic pushes that don't fire hashchange in some setups
    const iv = setInterval(() => {
      const cur = getCurrentRoute() + (window.location.hash || "");
      if (lastRouteRef.current && cur !== lastRouteRef.current) {
        track();
      }
    }, 900);

    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onPop);
      clearInterval(iv);
    };
  }, []);
}
