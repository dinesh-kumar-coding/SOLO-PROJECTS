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
  {
    name: "Gustave Courbet",
    username: "gus1819",
    location: "Ornans, France",
    avatar: "images/avatar-courbet.jpg",
    post: "images/post-courbet.jpg",
    comment: "i'm feelin a bit stressed tbh",
    likes: 4,
  },
  {
    name: "Joseph Ducreux",
    username: "jd1735",
    location: "Paris, France",
    avatar: "images/avatar-ducreux.jpg",
    post: "images/post-ducreux.jpg",
    comment:
      "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
    likes: 152,
  },
];

const postsContainer = document.getElementById("posts-container");

function getPostsHtml() {
  let html = "";

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    html += `
        <article class="post">
          <header class="post-header">
            <img src="${post.avatar}" alt="${post.name}" class="avatar"/>
            <div>
              <h2 class="post-name">${post.name}</h2>
              <p class="post-location">${post.location}</p>
            </div>
          </header>

          <div class="post-photo-wrapper" id="photo-${i}">
            <img
              src="${post.post}"
              alt="A post by ${post.name}"
              class="post-photo"
            />
            <img src="images/red-heart.png" alt="" class="post-big-heart" id="heart-${i}">
          </div>

          <div class="post-icons">
            <button class="icon-button" aria-label="Like this post" id="like-btn-${i}">
                <img src="images/icon-heart.png" alt="" id="like-icon-${i}">
            </button>
            <button class="icon-button" aria-label="Comment on this post">
                <img src="images/icon-comment.png" alt="">
            </button>
            <button class="icon-button" aria-label="Share this post">
                <img src="images/icon-dm.png" alt="">
            </button>
          </div>

          <footer class="post-footer">
            <p class="post-likes" id="likes-${i}">${post.likes} likes</p>
            <p class="post-caption">
                <span class="post-username">${post.username}</span> ${post.comment}
            </p>
          </footer>
        </article>
        `;
  }

  return html;
}

function likePost(i) {
  if(!liked[i]){
    posts[i].likes += 1;
    document.getElementById(`likes-${i}`).textContent = `${posts[i].likes} likes`;
    document.getElementById(`like-icon-${i}`).src = "images/red-heart.png";
  } 
  
  liked[i] = true;

  const heart = document.getElementById(`heart-${i}`);
  heart.classList.remove("post-big-heart-pop");
  void heart.offsetWidth;
  heart.classList.add("post-big-heart-pop");
}

function unlikePost(i) {
  posts[i].likes -= 1;
  document.getElementById(`likes-${i}`).textContent = `${posts[i].likes} likes`;
  document.getElementById(`like-icon-${i}`).src = "images/icon-heart.png";
  liked[i] = false;
}

let liked = [false, false, false];

function addDoubleClickListeners() {
  for (let i = 0; i < posts.length; i++) {
    document
      .getElementById(`photo-${i}`)
      .addEventListener("dblclick", function () {
        likePost(i);
      });

    document
      .getElementById(`like-btn-${i}`)
      .addEventListener("click", function () {
        if (!liked[i]) likePost(i);
        else unlikePost(i);
      });
  }
}

postsContainer.innerHTML = getPostsHtml();

addDoubleClickListeners();
