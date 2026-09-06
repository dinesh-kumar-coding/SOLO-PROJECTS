# Solo Project 9 — Movie Watchlist

Search films by title, read the plot and rating, and save the ones you want to watch. Two pages
sharing one watchlist that survives a refresh.

**[Live demo →](https://dinesh-kumar-coding.github.io/SOLO-PROJECTS/solo_project_9/)**

## What it does

- Search OMDb by title and get atmost ten results with poster, runtime, genre, rating and plot.
- **Add to watchlist** — the button disables itself and says "In watchlist" so you can't add twice.
- A second page shows everything you've saved, with a **Remove** button on each.
- Long plots are cut at 150 characters with a **Read more** toggle.
- The watchlist survives a refresh, and reopening the browser.
- Friendly messages for an empty search, no results, and a failed request.
- Films with no poster fall back to a placeholder image.

## Setup — you need an API key

1. Go to <https://www.omdbapi.com/apikey.aspx> and pick the **FREE** tier.
2. Check your email and **click the activation link** — the key returns `Invalid API key` until you do.
3. Put it in `movies.js`:

```js
const API_KEY = "your-key-here";
```

## Built with

| Tech       | Used for                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------- |
| HTML5      | Two pages, a real `<form>` for search, `aria-label` on the input                         |
| CSS3       | Flexbox, `aspect-ratio` posters, a `.hidden` utility, `.is-expanded` for the plot toggle |
| JavaScript | `fetch`, `async`/`await`, `Promise.all`, `localStorage`, event delegation                |
| API        | [OMDb](https://www.omdbapi.com/) — free tier, key required                               |

No libraries, no build step.

## How it works

**The API's shape drives the whole design.** OMDb has two endpoints, and they return different things:

```
?s=blade+runner   ->  Title, Year, Type, imdbID, Poster        (10 results)
?i=tt0083658      ->  + Runtime, Genre, Plot, imdbRating       (1 film)
```

The cards show runtime, genre, plot and rating — **none of which the search endpoint returns.** So
every search is two rounds: one request for the IDs, then one request per film for the details.
`Promise.all` fires those ten at once instead of waiting for each in turn:

```js
const movies = await Promise.all(
  data.Search.map((result) => getMovieDetails(result.imdbID)),
);
```

**`response.ok` is not enough here.** OMDb answers a failed search with **HTTP 200** and
`{"Response": "False", "Error": "Movie not found!"}`. The status check sails straight past it, so a
second check on the body is what actually catches a bad search:

```js
if (data.Response === "False") {
  showMessage(
    "Unable to find what you're looking for. Please try another search.",
  );
  return;
}
```

**Three files, split by what needs them.** `movies.js` loads first on both pages and holds
everything they share — the key, the localStorage helpers, the card template, the escaping. Then
each page loads only its own script:

```html
<script src="./movies.js"></script>
<script src="./index.js"></script>
```

**Whole movie objects are saved, not just IDs.** That means `watchlist.html` renders instantly with
no API call and no key at all. The trade-off is stale data if a film's details ever change —
irrelevant here, and worth it to keep the second page free of network code.

## What I learned

- **`Promise.all`** takes an array of promises and resolves to an array of results. Awaiting ten
  requests in a loop takes ten round trips; this takes roughly one.
- **A 200 response can still be a failure.** `response.ok` only reflects the HTTP status — the
  body has to be checked too when an API reports errors that way.
- **`localStorage` only stores strings.** `setItem("watchlist", myArray)` stores the literal text
  `[object Object]`, so everything goes through `JSON.stringify` on the way in and `JSON.parse` on
  the way out.
- `JSON.parse(null)` returns `null` rather than throwing, so `|| []` covers a first visit cleanly.
- **`encodeURIComponent`** to make a search term safe in a URL — "Jack & Jill" becomes
  `Jack%20%26%20Jill`, so the `&` isn't read as another parameter.
- **Escaping before `innerHTML`.** OMDb's docs say its content is user-contributed, so it isn't
  trusted input. Everything passes through `esc()` first.
- **`closest()`** walks up from whatever was clicked to the ancestor you actually want — which is
  what makes the Read more button work no matter what's inside it.
- `.some()` to check whether a film is already saved, without writing a loop.
- Sharing one script across two pages by loading it first and letting each page's script use it.

## Files

```
solo_project_9/
├── images/
│   ├── header.jpg                # Hero background
│   ├── poster-placeholder.png    # Shown when OMDb has no poster
│   ├── search-icon.svg           # Search input icon
│   └── favicon-bookmark.png      # Tab icon
├── index.html                    # Search page
├── watchlist.html                # Saved films
├── movies.js                     # Shared: key, localStorage, escaping, card template
├── index.js                      # Search page only
├── watchlist.js                  # Watchlist page only
└── style.css                     # Both pages
```

## Run it

Add your API key to `movies.js`, then open `index.html` in any browser. Needs an internet
connection — the films come from OMDb at request time.

## Possible improvements

- [ ] Show the year alongside the title
- [ ] A message while the details are loading, instead of just "Searching..."
- [ ] Let the watchlist be sorted by rating or runtime
- [ ] A count of how many films are saved
- [ ] Render some movies initially and display rather than simple starting text
