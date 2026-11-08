# Project: HarshaDhwani website

Personal site of ShreeHarsha (HarshaDhwani), singer, Mysuru. Audience: concert organisers, Kannada sanghas abroad, fans.
Three jobs: listen/watch, see his range, book a HarshaDhwani concert.

## Content source
- Facts: Profile_ShreeHarsha_M_R__2025.pdf, plus Bhajana Bharata details from the livestream description (mirrored in content/site.json).
- Images: Canva design 'Shree Harsha' (img/), Bhajana Bharata Drive folder (img/bb/, only photos with his face clearly visible), YouTube thumbnails (img/yt/). Canva stock graphics are not exported.
- Pages: index.html (home) and bhajana-bharata.html (flagship concert).

## Stack (ask before changing)
- Plain static HTML/CSS/JS. No build step. Hosted on GitHub Pages / Cloudflare Pages.
- Content facts live in content/site.json. Keep index.html in sync with it.

## Rules
- Look: maroon and gold. Fonts: Gloock (display), Marcellus SC (labels), Alegreya Sans (text), Noto Serif Kannada, IBM Plex Mono (dial). One colour per music form on the dial (tokens in :root).
- Bhajana Bharata logo always loops Kannada -> English (3D flip); keep both logo files.
- Never use stock or theme-demo images. Only real photos of Shreeharsha, with credit confirmed.
- Every image: WebP, max 1400px, alt text that describes what is in the photo.
- Kannada as real text with lang="kn", never inside images only.
- No invented numbers (followers, concerts, awards). Only facts confirmed by Shreeharsha.
- No lorem ipsum, no placeholder hours.
- Keep contrast >= 4.5:1, visible focus, prefers-reduced-motion respected, no horizontal scroll at 375px.
- Audio never autoplays.

## Commands
- Preview: open index.html, or `python3 -m http.server`
- Checks: GitHub Actions (link check, HTML validate)

## Decisions
See docs/decisions/.
