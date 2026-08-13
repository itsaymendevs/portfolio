# Aymen Ahmed — Premium Portfolio

A single-page, responsive portfolio for Aymen Ahmed, Senior Software Engineer.

## Run locally

No build step is required.

Open `index.html` directly in a browser, or use a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Replace project links

Search `index.html` for:

- `DOER_PROJECT_URL_HERE`
- `LAWFIRMMATE_PROJECT_URL_HERE`
- `PRIMEWARE_PROJECT_URL_HERE`

Replace each placeholder with the real external URL.

## Replace project visuals

Current visuals are lightweight SVG mockups created for the portfolio so the page works immediately without third-party image dependencies.

Replace:

- `assets/doer.svg`
- `assets/lawfirmmate.svg`
- `assets/primeware.svg`

with real screenshots when available. Keep the same filenames or update the `<img>` paths.

## Contact form

The contact form opens the visitor's default email client using `mailto:`. For production use, replace this with Formspree, Resend, a Next.js API route, or your preferred backend.

## Design

The site uses:

- semantic HTML
- CSS animations
- IntersectionObserver reveal animations
- pointer-based tilt/parallax
- reduced-motion support
- responsive mobile navigation
- no heavy JavaScript animation framework
