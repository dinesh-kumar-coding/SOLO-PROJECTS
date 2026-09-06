// No fetch and no API key on this page.
//  Whole movie object were saved when the user clicked Watchlist, 
// so everything needed is already in localStorage.

const watchlistEl = document.getElementById("watchlist")
const emptyEl = document.getElementById("empty")

function renderWatchlist(){
    const movies = getWatchlist()

    if(movies.length === 0){
        watchlistEl.innerHTML = ""
        emptyEl.classList.remove("hidden")
        return
    }

    emptyEl.classList.add("hidden")
    watchlistEl.innerHTML = movies
        .map(movie => getMovieCardHtml(movie, "remove"))
        .join("")
}

watchlistEl.addEventListener("click", event => {
    const imdbID = event.target.dataset.remove
    if(!imdbID){
        return
    }

    removeFromWatchlist(imdbID)
    renderWatchlist()
})

renderWatchlist()