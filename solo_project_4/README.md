# Solo Project 4 — Metric/Imperial Unit Converter

Type a number and get it converted three ways at once — length, volume, and mass — in both
directions. The value you typed is remembered, so it's still there when you come back.

**[Live demo →](https://dinesh-kumar-coding.github.io/SOLO-PROJECTS/solo_project_4/)**

## What it does

- One input, one button, three conversions — no need to pick a unit first.
- Each row converts **both ways**: `20 meters = 65.617 feet | 20 feet = 6.096 meters`.
- Results are rounded to three decimal places.
- The input box **grows as you type**, so long numbers don't get clipped.
- Your last value is saved to `localStorage` and restored (already converted) on your next visit.

| Category | Conversion |
|----------|-----------|
| Length | meters ↔ feet — factor `3.28084` |
| Volume | liters ↔ US gallons — factor `0.264172` |
| Mass | kilograms ↔ pounds — factor `2.20462` |

## Built with

| Tech | Used for |
|------|----------|
| HTML5 | Semantic structure, `inputmode="numeric"` to bring up the number pad on mobile |
| CSS3 | Flexbox column layout, `box-shadow`, split border-radius on the header/body panels |
| JavaScript | Template literals, `Number()`, `.toFixed()`, `localStorage`, `input` events |

No libraries, no build step.

## How it works

All three conversions happen in one function, using template literals to build each result string:

```js
function performConversion(){
    let inputValue = Number(inputEl.value)
    localStorage.setItem("input", inputEl.value)

    lengthScore.textContent = `${inputValue} meters = ${(inputValue*3.28084).toFixed(3)} feet | ${inputValue} feet = ${(inputValue/3.28084).toFixed(3)} meters`
    // …volume and mass follow the same shape
}
```

Multiply to go one direction, divide to go the other — one factor covers both.

Saving the value takes two steps. Store it on every conversion, then check for it on load:

```js
if(localStorage.getItem("input")){
    inputEl.value = localStorage.getItem("input");
    performConversion()
    resizeInput()
}
```

## What I learned

- **Template literals** — `` `${a} meters = ${b} feet` `` beats gluing strings together with `+`.
- **`.toFixed(3)`** to control decimal places, and that it returns a *string*, not a number.
- **`Number()`** to convert the input's text value into something you can do maths with.
- **`localStorage`** — my first project where data survives a refresh. `setItem` / `getItem`, and that it only stores strings.
- Divide by the same factor to reverse a conversion, instead of hunting down a second one.
- Sizing an element from its own content using the CSS `ch` unit (`width: 12ch` ≈ 12 characters wide).
- Listening for `input` rather than `change`, so the box resizes as you type instead of after you click away.

## Files

```
solo_project_4/
├── index.html
├── style.css
└── script.js
```

## Run it

Open `index.html` in any browser. No assets, no internet needed.

## Possible improvements

- [ ] Convert as you type instead of clicking the button
- [ ] Add temperature (°C ↔ °F)
- [ ] Add more unit pairs like kilometers ↔ miles
- [ ] A clear button to empty the input and reset the rows
