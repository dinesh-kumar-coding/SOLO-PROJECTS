const colorInput = document.getElementById('color-input');
const modeSelect = document.getElementById('mode-select');
const getSchemeBtn = document.getElementById('get-scheme-btn');
const schemeEl = document.getElementById('scheme');
const statusEl = document.getElementById('status');

// ask the API for a scheme

async function getColorScheme(){
    const seedHex = colorInput.value.slice(1); // <input type="color"> gives "#f55a5a" but the API's hex parameter just wants the six digits ("f55a5a"), so choping # off from front
    const mode = modeSelect.value;
    const url = `https://www.thecolorapi.com/scheme?hex=${seedHex}&mode=${mode}&count=5`; // Additional count to get that many number of color hexs
    statusEl.textContent = '';
    getSchemeBtn.disabled = true;

    try{
        const response = await fetch(url)

        // fetch does NOT throw on 404 or 500 it only rejects when the
        // request never happened at all (no network, DNS failure, CORS).
        // Without this check 400 would escape the error handling and later blow up with a confusing "cannot read properties of undefined"
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

    /* The same thing can be written with .then() instead of async/await like this:
    
    fetch("url")
        .then(response => {
            if(!response.ok){
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => renderScheme(data.colors))
        .catch(error => {
            console.error(error);
            statusEl.textContent = "Couldn't load a scheme. Check your connection and try again.";
        })
        .finally(()=>{
            getSchemeBtn.disabled = false;
        })

    */
}


function renderScheme(colors){
    schemeEl.innerHTML = colors
        .map(color =>  `
            <div class="swatch">
                <div class="swatch__color" style="background-color: ${color.hex.value}"></div>
                <button class="swatch__hex" data-hex="${color.hex.value}" title="Copy ${color.name.value}">${color.hex.value}</button>
            </div>
        `)
        .join("")
}

// click a hex value to copy it

schemeEl.addEventListener('click', async (event) =>{
    const hex = event.target.dataset.hex;
    if(!hex){
        return;
    }

    const button = event.target;
    try{
        // also a promise - the browser may ask the user for permission
        await navigator.clipboard.writeText(hex);

        button.textContent = "Copied!";
        setTimeout(() => {
            button.textContent = button.dataset.hex;
        }, 1000)
    } catch (error){
        console.error(error);
        statusEl.textContent = "Couldn't copy due to some reason";
    }
})

getSchemeBtn.addEventListener('click', getColorScheme);

getColorScheme();