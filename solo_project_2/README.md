# Solo Project 2 — Basketball Scoreboard

A working basketball scoreboard: tap the buttons to score, and the leading team's number lights up
on its own.

**[Live demo →](https://dinesh-kumar-coding.github.io/SOLO-PROJECTS/solo_project_2/)**

## What it does

- Two panels, **HOME** and **GUEST**, each showing a live score on a seven-segment display.
- `+1`, `+2`, `+3` buttons per team — the real ways to score in basketball.
- Whoever is ahead gets their score highlighted; a tie clears the highlight from both.

## Built with

| Tech | Used for |
|------|----------|
| HTML5 | Structure, `id` hooks for the DOM |
| CSS3 | Flexbox layout, `@font-face` for the seven-segment digits, `.winningTeam` state class |
| JavaScript | `getElementById`, `addEventListener`, `classList`, `textContent` |

No libraries, no build step.

## How it works

State lives in two plain variables, and every button routes through one shared function:

```js
let home = 0, guest = 0;

function updateScore(team, points) {
    if (team === 'home') {
        home += points;
        homeScore.textContent = home;
    } else if (team === 'guest') {
        guest += points;
        guestScore.textContent = guest;
    }
    highlightWinningTeam();
}
```

`highlightWinningTeam()` then compares the two totals and adds or removes the `.winningTeam` class —
so the styling stays in CSS and the JavaScript only decides *which state applies*.

## What I learned

- One parameterised handler (`updateScore(team, points)`) instead of six near-identical functions.
- Keeping state in a variable and treating the DOM as the *output* of that state, not the storage for it.
- `classList.add()` / `.remove()` to toggle appearance rather than writing inline styles from JS.
- Loading a custom font with `@font-face` to get the digital-display look.
- The shorthand ladder: `addEventListener("click", function(){})` → `.onclick = () => …` when the
  body is a single line — and that arrow functions without braces return that line implicitly.

## Files

```
solo_project_2/
├── fonts/
│   └── Seven Segment.ttf          # Digital display font
├── images/
│   └── basketball-favicon.png     # Tab icon
├── index.html
├── index.css
└── index.js
```

## Run it

Open `index.html` in any browser.

For the custom font to load reliably, serve it over HTTP instead of `file://`:

```bash
python -m http.server 5500
```

Then visit <http://localhost:5500>.

## Possible improvements

- [ ] A **New Game** button that resets both scores to zero
- [ ] Undo the last basket
- [ ] A game clock and quarter counter
- [ ] Keyboard shortcuts for scoring
- [ ] Persist the score so a refresh doesn't wipe the game
