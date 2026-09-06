const searchForm = document.getElementById("search-form")
const searchInput = document.getElementById("search-input")
const resultsEl = document.getElementById("results")
const placeholderEl = document.getElementById("placeholder")

searchForm.addEventListener("submit", (event) =>{
    event.preventDefault()

    const title = searchInput.value.trim()
    if(title){
        searchMovies(title)
    }
})

async function searchMovies(title){
    showMessage("Searching...")
    try{
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(title)}`)
        // encodeURIComponent(uriComponent) Encodes a text string as a valid component of a Uniform Resource Identifier (URI).
        // Ex: if uriComponent is "Jack & Jill" the function return the output Jack%20%26%20%Jill which is a valid component of URI.


        if(!response.ok){
            throw new Error(`OMDb replied with ${response.status}`)
        }

        const data = await response.json()

        // OMDb answers "no results" with HTTP 200 and Response: "False".
        // response.ok is TRUE here, so the status check above misses it
        // completely - this second check is what catched a bad search

        if(data.Response === "False"){
            showMessage("Unable to find what you're looking for. Please try another search.")
            return
        }

        // Fire all detail requests at once instead of awaiting them one after another. Sequentially this takes ten round trips; in parallel it takes roughly one.
        const movies = await Promise.all(
            data.Search.map(result => getMovieDetails(result.imdbID))
        )
        renderResults(movies)
    } catch(error){
        console.error(error)
        showMessage("Something went wrong reaching OMDb. Check your connection and try again.")
    }
}

function showMessage(text){
    resultsEl.innerHTML = ""
    placeholderEl.classList.remove("hidden")
    placeholderEl.textContent = text
}

async function getMovieDetails(imdbID){
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`)
    if(!response.ok){
        throw new Error(`OMDb replied with ${response.status}`)
    }
    return response.json()
}

function renderResults(movies){
    placeholderEl.classList.add("hidden")
    resultsEl.innerHTML = movies
        .map(movie => getMovieCardHtml(movie, "add"))
        .join("")
}

// One listener for every watchlist button, including ones that don't exit yet. closest() covers a click landing on anything inside it.
resultsEl.addEventListener("click", (event) =>{
    const imdbID = event.target.dataset.add // I get the concept but why are we using closest now when there are no element inside button except some text.
    if(!imdbID){
        return
    }

    const button = event.target

    getMovieDetails(imdbID)
        .then(movie => {
            addToWatchlist(movie)
            button.textContent = "In watchlist"
            button.disabled = true
        })
        .catch(error =>{
            console.error(error)
            showMessage("Couldn't save that film. Please try again.")
        })
})