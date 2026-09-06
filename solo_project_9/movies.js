// this code will be loaded by both index.html and watchlist.html before their own script

const API_KEY = "476c0432"
const STORAGE_KEY = "watchlist"
const PLACEHOLDER_POSTER =  "./images/poster-placeholder.png"
const PLOT_LIMIT = 150

function getMovieCardHtml(movie, action){
    const poster = movie.Poster && movie.Poster !== "N/A"
        ? movie.Poster
        : PLACEHOLDER_POSTER
    
    const alreadySaved = action === "add" && isInWatchlist(movie.imdbID)

    const button = action === "add"
        ? ` <button 
            class="action-btn action-btn-add" 
            type="button" 
            data-add="${movie.imdbID}" 
            ${alreadySaved? "disabled": ""}>${alreadySaved? "In watchlist": "Watchlist"}</button>`
        : ` <button 
            class="action-btn action-btn-remove" 
            type="button" 
            data-remove="${movie.imdbID}" >Remove</button>`

        return `
        <li class="movie">
            <img class="movie-poster" src="${esc(poster)}"
                alt="${esc(movie.Title)} poster" />
            <div class="movie-info">
                <div class="movie-headline">
                    <h3 class="movie-title">${esc(movie.Title)}</h3>
                    <p class="movie-rating">${esc(movie.imdbRating)}</p>
                </div>

                <div class="movie-meta">
                    <span>${esc(movie.Runtime)}</span>
                    <span>${esc(movie.Genre)}</span>
                    ${button}
                </div>

                ${getPlotHtml(movie.Plot)}
            </div>
        </li>
        `
}

function getPlotHtml(plot){
    if(!plot || plot === "N/A"){
        return `<p class="movie-plot">No plot available.</p>`
    }

    if(plot.length <= PLOT_LIMIT){
        return `<p class="movie-plot">${esc(plot)}</p>`
    }

    return `
        <p class="movie-plot">
            <span class="plot-short">${esc(plot.slice(0, PLOT_LIMIT))}...<button class="read-more" type="button">Read more</button></span>
            <span class="plot-full">${esc(plot)}</span> 
        </p>
    `
}

function isInWatchlist(imdbID){
    return getWatchlist().some(movie => movie.imdbID === imdbID)
}

function addToWatchlist(movie){
    if(isInWatchlist(movie.imdbID)) return
    saveWatchlist([...getWatchlist(), movie])
}

function saveWatchlist(movies){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies))
}

function getWatchlist(){
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
}

function removeFromWatchlist(imdbID){
    saveWatchlist(getWatchlist().filter(movie => movie.imdbID !== imdbID))
}

// ---------------Escaping-----------------
/* OMDb's own docs say all content is "contributed and maintained by our users", so it is NOT trusted input. Everything from the API goes through this before it touches innerHTML */

function esc(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
}

document.addEventListener("click", event => {
    if(event.target.classList.contains("read-more")){
        // closest() walks up from the button to the <li> that holds it
        event.target.closest(".movie").classList.add("is-expanded")
    }
})