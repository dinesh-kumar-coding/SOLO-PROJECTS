# Solo Project 8 — Color Scheme Generator

Pick a seed colour, choose a scheme type, and get five matching colours back from
[The Color API](https://www.thecolorapi.com/). Click any hex value to copy it.

**[Live demo →](https://dinesh-kumar-coding.github.io/SOLO-PROJECTS/solo_project_8/)**

## What it does

- A native colour picker for the seed colour, and a dropdown with the **eight scheme modes** the API supports.
- Fetches five colours and renders them as full-height swatches.
- **Click a hex value to copy it** — the button says "Copied!" for a second, then goes back.
- The button disables itself while a request is in flight, so you can't fire off five at once.
- If the request fails, you get a readable message instead of a blank screen.
- Loads a scheme on page load, so it's never empty when you arrive.
- Swatches sit side by side on desktop and stack into rows on narrow screens.

| Mode | Mode |
|------|------|
| `monochrome` | `analogic-complement` |
| `monochrome-dark` | `complement` |
| `monochrome-light` | `triad` |
| `analogic` | `quad` |

## Built with

| Tech | Used for |
|------|----------|
| HTML5 | `<input type="color">`, `<select>`, `role="status"` and `aria-label` |
| CSS3 | Flexbox, a custom dropdown arrow via `appearance: none`, colour-input pseudo-elements, a mobile breakpoint |
| JavaScript | `fetch`, `async`/`await`, `try`/`catch`/`finally`, the Clipboard API, event delegation |
| API | [The Color API](https://www.thecolorapi.com/) — no key needed |

No libraries, no build step.

## How it works

The URL is built from the two controls. `<input type="color">` always hands back something like
`#f55a5a`, but the API wants the six digits on their own — hence the `.slice(1)`:

```js
const seedHex = colorInput.value.slice(1);
const mode = modeSelect.value;
const url = `https://www.thecolorapi.com/scheme?hex=${seedHex}&mode=${mode}&count=5`;
```

The request is wrapped in `try`/`catch`/`finally`, with an explicit check on `response.ok`:

```js
try {
    const response = await fetch(url)

    if(!response.ok){
        throw new Error(`The Color API replied with ${response.status}`);
    }

    const data = await response.json();
    renderScheme(data.colors);

} catch(error){
    console.error(error);
    statusEl.textContent = "Couldn't load a scheme. Check your connection and try again.";
} finally{
    getSchemeBtn.disabled = false;
}
```

That `response.ok` check matters more than it looks: `fetch` only rejects when the request never
happened at all — no network, DNS failure, CORS. A 400 or 500 comes back as a perfectly successful
promise, so without the check a bad response would sail past the `catch` and fail later with a
confusing error.

Copying uses one delegated listener on the container, reading the hex off a `data-` attribute:

```js
schemeEl.addEventListener('click', async (event) => {
    const hex = event.target.dataset.hex;
    if(!hex) return;

    await navigator.clipboard.writeText(hex);
    button.textContent = "Copied!";
    setTimeout(() => { button.textContent = button.dataset.hex; }, 1000)
})
```

## What I learned

- **`fetch` with `async`/`await`** — my first project pulling live data from someone else's server.
- **`fetch` doesn't throw on 404 or 500.** It only rejects when the request never happened, so
  `response.ok` has to be checked by hand.
- **`try` / `catch` / `finally`** — and that `finally` runs either way, which makes it the right
  place to re-enable the button.
- **`await response.json()`** is a second promise, not the response body directly.
- Disabling a button during a request, so it can't be fired repeatedly.
- Building a URL with query parameters from a template literal.
- **The Clipboard API** — `navigator.clipboard.writeText()` returns a promise, so it needs `await`
  and its own error handling.
- `setTimeout` to revert the button text after a moment.
- Reading `data-` attributes with `dataset` in a delegated click handler.
- `appearance: none` on a `<select>` to hide the browser's arrow and draw my own with a background SVG.
- The `::-webkit-color-swatch` / `::-moz-color-swatch` pseudo-elements, to strip the padding a
  browser puts around a colour input.
- `.status:empty { display: none }` — a CSS way to hide an element that has no text in it.

## Files

```
solo_project_8/
├── images/
│   ├── drop-down.svg                # Custom select arrow
│   └── favicon-color_palette.png    # Tab icon
├── index.html
├── style.css
└── script.js
```

## Run it

Open `index.html` in any browser. This one needs an internet connection — the colours come from
The Color API at request time.

If the copy-to-clipboard button doesn't respond, serve the folder over `http://` instead; some
browsers restrict clipboard access on pages opened straight from the file system.

```bash
python -m http.server 5500
```

Then visit <http://localhost:5500>.

## Possible improvements

- [ ] Let the number of colours be chosen instead of always 5
- [ ] Show the colour's name under each hex value — the API already sends it
- [ ] Remember the last seed colour and mode with `localStorage`
- [ ] A "copy all" button that copies the whole scheme at once
- [ ] Show a loading message while the request is in flight
