# Solo Project 5 — Oldagram

An Instagram feed for painters who died before the internet. Van Gogh, Courbet and Ducreux post
their work, and you can double-tap to like it.

**[Live demo →](https://dinesh-kumar-coding.github.io/SOLO-PROJECTS/solo_project_5/)**

## What it does

- The whole feed is **built from an array** — no post is written by hand in the HTML.
- **Double-click a photo** to like it, with a big heart that pops over the image.
- The heart icon also works as a toggle: click to like, click again to unlike.
- The like count updates live, and the small heart turns red while a post is liked.
- Styled as a 375px phone-width app, with a header, feed, and per-post action row.

## Built with

| Tech | Used for |
|------|----------|
| HTML5 | Header and an empty `<main>` that JavaScript fills, `aria-label` on the icon buttons |
| CSS3 | Flexbox layout, `object-fit` avatars, `@keyframes` heart animation, `:hover` / `:active` states |
| JavaScript | Array of objects, loops, template literals, `innerHTML`, click and `dblclick` events |

No libraries, no build step.

## How it works

Every post is an object in one array, so adding a fourth painter means adding an object — nothing else changes:

```js
const posts = [
  {
    name: "Vincent van Gogh",
    username: "vincey1853",
    location: "Zundert, Netherlands",
    avatar: "images/avatar-vangogh.jpg",
    post: "images/post-vangogh.jpg",
    comment: "just took a few mushrooms lol",
    likes: 21,
  },
  // …
];
```

A loop turns that array into one big HTML string, which gets dropped into the page in a single go:

```js
function getPostsHtml() {
  let html = "";
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    html += `<article class="post"> … </article>`;
  }
  return html;
}

postsContainer.innerHTML = getPostsHtml();
```

The loop index `i` gets baked into each element's id — `likes-${i}`, `heart-${i}`, `like-btn-${i}` —
so every post ends up with its own uniquely addressable pieces. That's what makes it possible to
update *just* post 2's like count later.

A separate `liked` array tracks which posts are currently liked, so clicking the heart twice
removes the like instead of adding a second one:

```js
if (!liked[i]) likePost(i);
else unlikePost(i);
```

## What I learned

- **An array of objects** is the natural shape for repeating content. The page is a *view* of the data.
- Building HTML in a loop and setting `innerHTML` once, rather than touching the DOM inside the loop.
- Giving generated elements **dynamic ids** with the loop index, so each post can be updated on its own.
- Keeping a **separate state array** (`liked`) instead of trying to read the current state off the page.
- Swapping an image by changing its `src` in JavaScript — that's how the heart goes red and back.
- `dblclick` is a real event, so the Instagram double-tap-to-like gesture is just one listener.
- Restarting a CSS animation needs a forced reflow — remove the class, read `offsetWidth`, add it back.
  Without that middle line the heart only pops once.
- `aria-label` on icon-only buttons, so a screen reader announces something other than "button".

## Files

```
solo_project_5/
├── images/
│   ├── logo.png                 # Oldagram wordmark
│   ├── user-avatar.jpg          # Header profile picture
│   ├── avatar-*.jpg             # One avatar per painter
│   ├── post-*.jpg               # The paintings
│   ├── icon-heart.png           # Like / comment / share icons
│   ├── icon-comment.png
│   ├── icon-dm.png
│   ├── red-heart.png            # Filled heart, used for the pop and the liked state
│   └── favicon-oldagram.png     # Tab icon
├── index.html
├── index.css
└── index.js
```

## Run it

Open `index.html` in any browser. Everything is local — no internet connection needed.

## Possible improvements

- [ ] Show the comment count and a few comments under each post
- [ ] A "Add a comment…" box that appends what you type
- [ ] Remember which posts are liked with `localStorage`
- [ ] Add a fourth painter to the array and check the feed still works
