<h1 align="center">Solo Projects</h1>

<p align="center">
  A running collection of the projects I build from scratch while learning web development.<br>
  No tutorials copied line-by-line — every project here starts with a blank file.
</p>

<p align="center">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
  <img alt="Projects" src="https://img.shields.io/badge/projects-2-success?style=flat-square">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue?style=flat-square">
</p>

---

## About this repo

Each folder is a self-contained project — open its `index.html` and it runs. No build step, no
dependencies, no framework. The goal is to get genuinely comfortable with the fundamentals before
reaching for tools that hide them.

Projects are listed newest-first.

## Projects

| # | Project | What it is | Built with | Links |
|:-:|---------|------------|------------|-------|
| 01 | **Nalanda Vidyaniketan** | A tribute page to my school — a hero banner, three "era" cards, and an alumnus note. | HTML · CSS | [Demo](https://dinesh-kumar-coding.github.io/SOLO-PROJECTS/solo_project_1/) · [Code](./solo_project_1) |
| 02 | **Basketball Scoreboard** | A live scoreboard with +1 / +2 / +3 buttons for each team and an automatic highlight on whoever is leading. | HTML · CSS · JavaScript | [Demo](https://dinesh-kumar-coding.github.io/SOLO-PROJECTS/solo_project_2/) · [Code](./solo_project_2) |

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
├── .gitignore
├── LICENSE
├── TEMPLATE.md              # Starter README for each new project
└── README.md                # You are here
```

## Adding a new project

1. Create the folder: `solo_project_N/` with its own `index.html`.
2. Copy `TEMPLATE.md` into it as `README.md` and fill in the blanks.
3. Add one row to the **Projects** table above (newest at the top).
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
- [ ] Project 3 — working with arrays and rendering lists
- [ ] Project 4 — fetching data from an API
- [ ] Project 5 — saving state so it survives a refresh

## About me

**Puchala Dinesh Kumar** — learning to build for the web, one project at a time.

[![GitHub](https://img.shields.io/badge/GitHub-dinesh--kumar--coding-181717?style=flat-square&logo=github)](https://github.com/dinesh-kumar-coding)

## License

Released under the [MIT License](./LICENSE) — feel free to learn from, fork, or build on any of it.

<sub>Photographs in `solo_project_1/images/` are personal and are not covered by the MIT license.</sub>
