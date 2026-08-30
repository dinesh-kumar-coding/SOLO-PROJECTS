# Solo Project 6 — Dinesh's Diner

A working restaurant order app. Build an order from the menu, get a discount if you pair a drink
with food, pay through a card modal, then rate the meal.

**[Live demo →](https://dinesh-kumar-coding.github.io/SOLO-PROJECTS/solo_project_6/)**

## What it does

- The menu renders from an array — pizza, hamburger, beer, each with ingredients and a price.
- **Add items** with the `+` button; the order panel appears as soon as there's something in it.
- **Remove** any line from the order, and the total recalculates.
- **Meal deal** — order a beer alongside a pizza or hamburger and $5 comes off automatically.
- **Card modal** for checkout, with required fields and a click-outside-to-close overlay.
- A personalised thank-you using the name you entered, then a **5-star rating** widget.
- **Dark mode toggle** in the header — the 🌙 flips to ☀️.

## Built with

| Tech | Used for |
|------|----------|
| HTML5 | Semantic sections, a real `<form>` for checkout, `aria-label` and `aria-live` |
| CSS3 | Flexbox, a `.hidden` utility class, dark theme via a `.theme-dark` class, Google Fonts |
| JavaScript | ES modules, array methods, destructuring, event delegation, `data-` attributes |

No libraries, no build step.

## How it works

The menu data lives in its own file and gets imported — the first project here split across two
JavaScript files:

```js
// data.js
export const menuArray = [ … ]

// index.js
import { menuArray } from "./data.js"
```

Rendering is `.map()` over the array into HTML strings, then `.join("")` to glue them together:

```js
const getMenuHtml = () =>
    menuArray
        .map(item => {
            const { name, ingredients, price, emoji, id } = item
            return `<li class="menu-item"> … </li>`
        })
        .join("")
```

Rather than attaching a listener to every button, **one listener on `document`** handles every
click and works out what was pressed from its `data-` attribute. Buttons that don't exist yet still
work, because the listener isn't attached to them:

```js
document.addEventListener("click", event => {
    const addId = event.target.dataset.add
    const removeIndex = event.target.dataset.remove

    if (addId) addToOrder(Number(addId))
    else if (removeIndex) removeFromOrder(Number(removeIndex))
})
```

The total is a `.reduce()` over the order, with the discount subtracted only when the meal deal
condition is met:

```js
const getSubtotal = () => orderItems.reduce((total, item) => total + item.price, 0)

const hasMealDeal = () => {
    const names = orderItems.map(item => item.name)
    return names.includes("Beer") && (names.includes("Pizza") || names.includes("Hamburger"))
}
```

## What I learned

- **ES modules** — `export` from one file, `import` into another, with `<script type="module">`.
- **`.map()` + `.join("")`** to turn an array into HTML, instead of building a string in a `for` loop.
- **`.reduce()`** to add up a list of prices into one number.
- **`.filter()`** to remove one item by returning a new array without it.
- **`.find()`** to look up a menu item by its id.
- **Destructuring** — `const { name, price, emoji } = item` instead of `item.name`, `item.price`…
- **Spread** — `[...orderItems, item]` builds a new array rather than mutating the old one.
- **Event delegation.** One listener on `document` beats one per button, and it keeps working for
  elements added to the page later.
- **`data-` attributes** as a way to attach information to an element and read it back with `dataset`.
- `classList.toggle("hidden", condition)` — passing a second argument forces the class on or off
  instead of flipping it.
- `event.preventDefault()` on a form submit, so the page doesn't reload.
- Theming by toggling one class on a wrapper element and letting CSS do the rest.

## Files

```
solo_project_6/
├── images/
│   ├── hero-background.jpg   # Header background
│   └── favicon-diner.png     # Tab icon
├── index.html
├── index.css
├── index.js                  # All the app logic
└── data.js                   # The menu, exported as a module
```

## Run it

This project uses ES modules, so it needs to be served over `http://` — opening `index.html`
straight from your file system won't work, the browser blocks module imports on `file://`.

```bash
# Python 3
python -m http.server 5500

# or with Node
npx serve
```

Then visit <http://localhost:5500>.

## Possible improvements

- [ ] Show a quantity like `Pizza ×2` instead of repeating the line
- [ ] Remember the order with `localStorage` so a refresh doesn't clear it
- [ ] Hide the thank-you message when a new order is started
- [ ] Add more items to the menu in `data.js`
- [ ] Show the rating as a message the diner could actually submit
