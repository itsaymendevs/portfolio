import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  Outlet,
  createHashHistory,
} from '@tanstack/react-router'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider.jsx'
import PortfolioPage from './components/PortfolioPage.jsx'
import { RealMealSite } from './App.jsx'
import BeHealthyPage from './components/behealthy/BeHealthyPage.jsx'
import TravellersPage from './components/travellers/TravellersPage.jsx'
import VisitorsPage from './components/VisitorsPage.jsx'
import useVisitorTracker from './hooks/useVisitorTracker.js'

// Premium smooth scroll
function smoothScroll(target, duration = 1200) {
  const start = window.scrollY;
  const dist = target - start;
  if (Math.abs(dist) < 1) return;
  const startTime = performance.now();

  function ease(t) {
    if (t < 0.5) return 8 * t * t * t * t;
    const u = 1 - t;
    return 1 - 16 * u * u * u * u;
  }

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = ease(progress);
    window.scrollTo(0, start + dist * easeProgress);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const id = anchor.getAttribute('href');
  if (!id || id === '#') return;
  // let TanStack Router handle route hashes like #/realmeal — only smooth-scroll for in-page anchors
  if (id.startsWith('#/')) return;
  const el = document.querySelector(id);
  if (!el) return;
  e.preventDefault();
  smoothScroll(el.getBoundingClientRect().top + window.scrollY - 80, 1200);
});

function RootWithTracker() {
  useVisitorTracker();
  return <Outlet />;
}

const rootRoute = createRootRoute({
  component: RootWithTracker,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: PortfolioPage,
});

const realmealRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/realmeal',
  component: RealMealSite,
});

const behealthyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/behealthy',
  component: BeHealthyPage,
});

const behealtyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/behealty',
  component: BeHealthyPage,
});

const visitorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/visitors',
  component: VisitorsPage,
});

const travellersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/travellers',
  component: TravellersPage,
});

const travellersTypoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/traverllers',
  component: TravellersPage,
});

const routeTree = rootRoute.addChildren([indexRoute, realmealRoute, behealthyRoute, behealtyRoute, visitorsRoute, travellersRoute, travellersTypoRoute]);

const hashHistory = createHashHistory();

const router = createRouter({
  routeTree,
  history: hashHistory,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
