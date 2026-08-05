# Solo Project 1 — Nalanda Vidyaniketan

A tribute page to my school, built to get comfortable with page structure, image handling, and
layout before touching any JavaScript.

**[Live demo →](https://dinesh-kumar-coding.github.io/SOLO-PROJECTS/solo_project_1/)**

## What it does

Three sections, top to bottom:

- **Hero** — a full-width photo of the school with the name and a one-line memory overlaid on it.
- **Eras** — three cards covering the primary years, moving up to high school, and the 4 PM football matches.
- **Alumnus** — a closing quote card.

## Built with

| Tech | Used for |
|------|----------|
| HTML5 | Semantic `<section>` structure, `<meta viewport>` for mobile |
| CSS3 | Flexbox layout, absolute positioning, `object-fit`, `border-radius` |

No JavaScript, no dependencies.

## What I learned

- Overlaying text on an image using `position: absolute` with the
  `top: 50% / left: 50% / transform: translate(-50%, -50%)` centering trick.
- `object-fit: cover` to make photos of different sizes fill a fixed container without distorting.
- Using a global `* { margin: 0; padding: 0; box-sizing: border-box; }` reset so sizing behaves predictably.
- Semi-transparent `rgba()` backgrounds to keep text readable over a busy photo.
- Flexbox for the card row, and why `gap` beats margin hacks for spacing.

## Files

```
solo_project_1/
├── images/
│   ├── nalanda.jpeg               # Hero photo
│   ├── class-room.jpg             # Card 1
│   ├── two-chair-table.jpg        # Card 2
│   ├── football.jpg               # Card 3
│   ├── Rocky_SOLO_PROJECT.jpeg    # Alumnus photo
│   └── school-favicon.png         # Tab icon
├── index.html
└── style.css
```

## Run it

Open `index.html` in any browser. Nothing to install.

## Possible improvements

- [ ] Add proper responsive breakpoints so the cards stack cleanly on narrow phones
- [ ] Replace `.jpeg` photos with `.webp` to cut page weight
- [ ] Add `loading="lazy"` to the images below the fold
- [ ] Improve alt text to describe each photo rather than label it

---

<sub>The photographs in this folder are personal and are not covered by the repository's MIT license.</sub>
