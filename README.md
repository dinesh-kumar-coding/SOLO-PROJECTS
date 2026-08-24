<h1 align="center">Solo Projects</h1>

<p align="center">
  Every solo project from the <a href="https://scrimba.com">Scrimba</a> Fullstack Developer Path,
  built from scratch as I work through it.<br>
  No tutorials copied line-by-line — every project here starts with a blank file.
</p>

<p align="center">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
  <img alt="Projects" src="https://img.shields.io/badge/projects-5-success?style=flat-square">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue?style=flat-square">
</p>

---

## About this repo

Each folder is a self-contained project with its own README. The path runs from HTML and CSS
fundamentals through JavaScript, React, TypeScript and Next.js, then into Node, Express and
databases — so this repo starts with plain static pages and gets progressively heavier as I go.

Everything so far is vanilla HTML/CSS/JS: open the folder's `index.html` and it runs, no install
required. Projects that need a build step or a server will say so in their own README.

Projects are listed in the order I built them.

## Projects

| # | Project | What it is | Built with | Links |
|:-:|---------|------------|------------|-------|
| 01 | **Nalanda Vidyaniketan** | A tribute page to my school — a hero banner, three "era" cards, and an alumnus note. | HTML · CSS | [Demo](https://dinesh-kumar-coding.github.io/SOLO-PROJECTS/solo_project_1/) · [Code](./solo_project_1) |
| 02 | **Basketball Scoreboard** | A live scoreboard with +1 / +2 / +3 buttons for each team and an automatic highlight on whoever is leading. | HTML · CSS · JavaScript | [Demo](https://dinesh-kumar-coding.github.io/SOLO-PROJECTS/solo_project_2/) · [Code](./solo_project_2) |
| 03 | **Password Generator** | Generates two random 15-character passwords at a click, drawn from a 91-character set. | HTML · CSS · JavaScript | [Demo](https://dinesh-kumar-coding.github.io/SOLO-PROJECTS/solo_project_3/) · [Code](./solo_project_3) |
| 04 | **Unit Converter** | Converts one number into length, volume and mass — both directions at once — and remembers your last input. | HTML · CSS · JavaScript · localStorage | [Demo](https://dinesh-kumar-coding.github.io/SOLO-PROJECTS/solo_project_4/) · [Code](./solo_project_4) |
| 05 | **Oldagram** | An Instagram feed for old painters, built entirely from an array. Double-tap a photo to like it. | HTML · CSS · JavaScript | [Demo](https://dinesh-kumar-coding.github.io/SOLO-PROJECTS/solo_project_5/) · [Code](./solo_project_5) |

## Tech stack

| Layer | What I use | Why |
|-------|-----------|-----|
| Markup | HTML5, semantic elements | Structure first, styling second |
| Styling | Plain CSS — Flexbox, Grid, custom properties | Learning the box model properly instead of fighting a framework |
| Behaviour | Vanilla JavaScript (ES6+) | DOM APIs and events without abstraction |
| Hosting | GitHub Pages | Free, static, zero config |

## Running locally

```bash
git clone https://github.com/dinesh-kumar-coding/SOLO-PROJECTS.git
cd SOLO-PROJECTS
```

Then open any project's `index.html` directly in a browser — that's it.

If you'd rather serve it over `http://` (recommended, since some browsers restrict local file access):

```bash
# Python 3
cd solo_project_2 && python -m http.server 5500

# or with Node
npx serve solo_project_2
```

Then visit <http://localhost:5500>.

## Repository layout

```
SOLO-PROJECTS/
├── solo_project_1/          # Nalanda Vidyaniketan — school tribute page
│   ├── images/
│   ├── index.html
│   ├── style.css
│   └── README.md
├── solo_project_2/          # Basketball Scoreboard
│   ├── fonts/               # Seven Segment display font
│   ├── images/
│   ├── index.html
│   ├── index.css
│   ├── index.js
│   └── README.md
├── solo_project_3/          # Password Generator
│   ├── images/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
├── solo_project_4/          # Unit Converter
│   ├── images/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
├── solo_project_5/          # Oldagram
│   ├── images/
│   ├── index.html
│   ├── index.css
│   ├── index.js
│   └── README.md
├── .gitattributes           # Keeps line endings consistent across machines
├── .gitignore
├── LICENSE
├── TEMPLATE.md              # Starter README for each new project
└── README.md                # You are here
```

## Adding a new project

1. Create the folder: `solo_project_N/` with its own `index.html`.
2. Copy `TEMPLATE.md` into it as `README.md` and fill in the blanks.
3. Add one row to the bottom of the **Projects** table above.
4. Bump the project count badge at the top of this file.
5. Commit with a clear message:

```bash
git add solo_project_N
git commit -m "Add Solo Project N: <short description>"
git push origin main
```

## Roadmap

- [x] Project 1 — static layout, images, positioning
- [x] Project 2 — DOM manipulation, events, conditional logic
- [x] Project 3 — arrays, loops, randomness, functions that return values
- [x] Project 4 — template literals, number formatting, `localStorage` persistence
- [x] Project 5 — arrays of objects, rendering a list, keeping track of state
- [ ] Loading data from an API
- [ ] First React app
- [ ] TypeScript and Next.js
- [ ] Backend — Node, Express, and a database

## About me

**Puchala Dinesh Kumar** — learning to build for the web, one project at a time.

[![GitHub](https://img.shields.io/badge/GitHub-dinesh--kumar--coding-181717?style=flat-square&logo=github)](https://github.com/dinesh-kumar-coding)

## License

Released under the [MIT License](./LICENSE) — feel free to learn from, fork, or build on any of it.

<sub>Photographs in `solo_project_1/images/` are personal and are not covered by the MIT license.</sub>
