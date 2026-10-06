# Ike Machover — A Life in Motion

Source and assets for [ike-machover.higgsfield.app](https://ike-machover.higgsfield.app), an interactive personal-brand introduction. Scroll through eleven connected visual worlds; the footage advances with the page while the name and chapter copy remain real, selectable HTML text.

## The journey

1. Farm and piano
2. Middle Eastern wedding
3. Suburbs and video games
4. Hockey
5. Florida / jungle
6. Ocean and wildlife
7. Mountains and skiing
8. School and coding
9. Computer hardware and crypto miners
10. AI-assisted programming
11. Earth, universe, science, and math

The closing panel provides a waypoint map and a way to restart. The site is intentionally an animated introduction, not a résumé or portfolio. Its design takes inspiration from [Hrvoje Živčić’s kinetic typography experiments](https://www.behance.net/gallery/236707837/Kinetic-Typography-Experiments-with-Hrvoje-Zivcic) without copying that work.

## What is included

- `app/src/routes/index.tsx` — page structure, navigation, and finale.
- `app/src/scroll-scrub-scenes.ts` — ordered chapters, copy, media paths, and scroll lengths.
- `app/src/site.css` — visual identity and chapter-specific typography.
- `app/src/components/scroll-scrub/` — the scroll-to-video playback engine.
- `app/public/assets/world/` — all eleven final MP4 chapters, separate mobile encodes, and matching first-frame posters.
- `app/public/assets/brand/` — logo/portal mark, waypoint icons, atmospheric plates, favicons, and social previews.
- `app/design-brief.md` — the creative direction and scene-by-scene intent.

`app/packages/` contains the platform’s vendored build dependencies. Keep it in the checkout. The unused `app/public/presets/` files are scaffold assets, not part of the visible site.

## Run on a laptop

Install [Bun](https://bun.sh/) and Node.js 22, then from the repository root:

```bash
cd app
bun install --frozen-lockfile
bun run dev
```

Open the local URL printed by Vite. For a production check:

```bash
bun run typecheck
bun run test
bun run build
```

GitHub Actions runs these same checks on a standard Ubuntu runner. The optional `bun run lint` currently reports two pre-existing React Hook errors in unused scaffold components (`carousel.tsx` and `use-mobile.ts`); it is not part of the website CI job.

All published media is stored in this repository under `app/public/assets/`; the homepage does not require a Higgsfield login or a runtime video-generation API key to run locally. Raw generation sessions and editable model projects are not part of the web source.

## Make changes

Edit chapter names, copy, order, and scroll distance in `app/src/scroll-scrub-scenes.ts`. Edit layout in `app/src/routes/index.tsx` and visual treatments in `app/src/site.css`. If replacing a video, update both desktop and mobile encodes and regenerate each poster from the exact first frame of its corresponding encoded clip. Keep media paths and scene order aligned.

The live `higgsfield.app` site is managed by Higgsfield. Pushing to this GitHub repository alone does not redeploy that URL; deploy site changes through the Higgsfield website workflow. This repository is a portable working copy and backup for development on another machine.

## Privacy and rights

The ten original numbered inspiration photos are kept outside this public repository. They informed the topics, but the site does **not** display them. Code is provided under the repository’s MIT `LICENSE`; confirm rights separately before reusing the generated media or brand graphics.
