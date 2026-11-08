# Project: HarshaDhwani website

Personal site of ShreeHarsha (HarshaDhwani), singer, Mysuru. Audience: concert organisers, Kannada sanghas abroad, fans.
Three jobs: listen/watch, see his range, book a HarshaDhwani concert.

## Content source
- Text: ONLY Profile_ShreeHarsha_M_R__2025.pdf (mirrored in content/site.json).
- Images: only from the Canva design 'Shree Harsha' (img/). Canva stock graphics are not exported.

## Stack (ask before changing)
- Plain static HTML/CSS/JS. No build step. Hosted on GitHub Pages / Cloudflare Pages.
- Content facts live in content/site.json. Keep index.html in sync with it.

## Rules
- Look: dark stage, one colour per music form (tokens in :root). Don't add colours outside the tokens.
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
