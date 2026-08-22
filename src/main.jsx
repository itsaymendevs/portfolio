import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/ThemeProvider.jsx'

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
  const el = document.querySelector(id);
  if (!el) return;
  e.preventDefault();
  smoothScroll(el.getBoundingClientRect().top + window.scrollY - 80, 1200);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
