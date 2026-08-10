# Solo Project 3 — Password Generator

A dark-card password generator that produces two random 15-character passwords at a click.

**[Live demo →](https://dinesh-kumar-coding.github.io/SOLO-PROJECTS/solo_project_3/)**

## What it does

- One button generates **two** passwords at once, so you can pick whichever reads better.
- Each password is 15 characters drawn from a 91-character set — 26 uppercase, 26 lowercase, 10 digits, and 29 symbols.
- Sits on a full-screen background photo with a centred dark card on top.

## Built with

| Tech | Used for |
|------|----------|
| HTML5 | Card structure, `defer` on the script so the DOM exists before it runs |
| CSS3 | Flexbox centring, `100vh` full-height layout, `background-size: cover`, button `:hover` and `:active` states, AVIF background image |
| JavaScript | Arrays, `for` loops, `Math.random()`, `Math.floor()`, DOM events |

No libraries, no build step.

## How it works

Every character lives in one array. A loop picks a random index from it, `length` times over:

```js
function getPassword(length){
  let password = "";
  for(let i = 0; i < length; i++){
    password += characters[Math.floor(Math.random()*characters.length)]
  }
  return password;
}
```

`Math.random()` returns a decimal between 0 and 1, multiplying by `characters.length` scales it to
the array's range, and `Math.floor()` rounds it down to a usable index. Because the function takes
`length` as a parameter and *returns* the string rather than writing to the page itself, the same
function fills both output slots:

```js
firstPassword.textContent = getPassword(15)
secondPassword.textContent = getPassword(15)
```

## What I learned

- Indexing into an array with `Math.floor(Math.random() * array.length)` — the standard random-pick pattern.
- Building a string inside a loop with `+=`.
- Writing a function that **returns** a value instead of touching the DOM, so it can be reused anywhere.
- Passing `length` as a parameter rather than hardcoding 15 — the generator is already ready for a length slider.
- `defer` on the `<script>` tag as an alternative to putting the script at the bottom of `<body>`.
- Centring anything with `display: flex; justify-content: center; align-items: center` on a `100vh` container.
- Shipping the background as a local `.avif` rather than a hotlinked URL — far smaller than JPEG, and the page still works with no network.

## Files

```
solo_project_3/
├── images/
│   ├── decoration-image.avif   # Full-screen background
│   └── password-favicon.png    # Tab icon
├── index.html
├── style.css
└── script.js
```

## Run it

Open `index.html` in any browser. Everything is local — no internet connection needed.

## Possible improvements

- [ ] An input box to choose the password length instead of it always being 15
- [ ] Checkboxes to include or exclude symbols, numbers, and uppercase
- [ ] Generate more than two passwords at a time
- [ ] Remember the last generated passwords with `localStorage`
