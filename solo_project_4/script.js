const inputEl = document.getElementById("input")
const covertBtn = document.getElementById("convert-btn")
const lengthScore = document.getElementById("length-measurement")
const volumeScore = document.getElementById("volume-measurement")
const massScore = document.getElementById("mass-measurement")

inputEl.value = localStorage.getItem("input")

covertBtn.addEventListener("click", function(){
    performConversion()
})

function performConversion(){
    let inputValue = Number(inputEl.value)
    localStorage.setItem("input",inputEl.value)

    lengthScore.textContent = `${inputValue} meters = ${(inputValue*3.28084).toFixed(3)} feet | ${inputValue} feet = ${(inputValue/3.28084).toFixed(3)} meters`

    volumeScore.textContent = `${inputValue} liters = ${(inputValue*0.264172).toFixed(3)} gallons | ${inputValue} gallons = ${(inputValue/0.264172).toFixed(3)} liters`

    massScore.textContent = `${inputValue} kilos = ${(inputValue*2.20462).toFixed(3)} pounds | ${inputValue} pounds = ${(inputValue/2.20462).toFixed(3)} kilos`
}

if(localStorage.getItem("input")){
    inputEl.value = localStorage.getItem("input");
    performConversion()
    resizeInput()
}

function resizeInput() {
    if (inputEl.value.length > 2) {
        inputEl.style.width = (inputEl.value.length + 1) + "ch";
    } else {
        inputEl.style.width = "100px";
    }
}

inputEl.addEventListener("input", resizeInput);