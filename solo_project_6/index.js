import { menuArray } from "./data.js"

let orderItems = []
let rating = 0

const MEAL_DEAL_DISCOUNT = 5

const appEl = document.getElementById("app")
const menuEl = document.getElementById("menu")
const orderEl = document.getElementById("order")
const orderListEl = document.getElementById("order-list")
const discountEl = document.getElementById("discount")
const discountAmountEl = document.getElementById("discount-amount")
const totalPriceEl = document.getElementById("total-price")
const completeOrderBtn = document.getElementById("complete-order-btn")
const modalOverlayEl = document.getElementById("modal-overlay")
const paymentFormEl = document.getElementById("payment-form")
const nameInputEl = document.getElementById("name-input")
const thanksEl = document.getElementById("thanks")
const thanksMessageEl = document.getElementById("thanks-message")
const starsEl = document.getElementById("stars")
const themeBtn = document.getElementById("theme-btn")

const getMenuHtml = () =>
    menuArray
        .map(item => {
            const { name, ingredients, price, emoji, id } = item

            return `
                <li class="menu-item">
                    <div class="menu-item-emoji">${emoji}</div>
                    <div class="menu-item-info">
                        <h3 class="menu-item-name">${name}</h3>
                        <p class="menu-item-ingredients">${ingredients.join(", ")}</p>
                        <p class="menu-item-price">$${price}</p>
                    </div>
                    <button class="add-btn" data-add="${id}" aria-label="Add ${name} to your order">+</button>
                </li>
            `
        })
        .join("")

const getOrderHtml = () =>
    orderItems
        .map(
            (item, index) => `
                <li class="order-item">
                    <span class="order-item-name">
                        ${item.name}
                        <button class="remove-btn" data-remove="${index}">remove</button>
                    </span>
                    <span class="order-item-price">$${item.price}</span>
                </li>
            `
        )
        .join("")

const getSubtotal = () => orderItems.reduce((total, item) => total + item.price, 0)

const hasMealDeal = () => {
    const names = orderItems.map(item => item.name)
    return names.includes("Beer") && (names.includes("Pizza") || names.includes("Hamburger"))
}

const getTotal = () => {
    const discount = hasMealDeal() ? MEAL_DEAL_DISCOUNT : 0
    return getSubtotal() - discount
}

function renderOrder() {
    orderListEl.innerHTML = getOrderHtml()
    totalPriceEl.textContent = `$${getTotal()}`

    discountAmountEl.textContent = `-$${MEAL_DEAL_DISCOUNT}`
    discountEl.classList.toggle("hidden", !hasMealDeal())

    orderEl.classList.toggle("hidden", orderItems.length === 0)
}

function addToOrder(id) {
    const item = menuArray.find(menuItem => menuItem.id === id)
    orderItems = [...orderItems, item]
    renderOrder()
}

function removeFromOrder(index) {
    orderItems = orderItems.filter((item, i) => i !== index)
    renderOrder()
}

document.addEventListener("click", event => {
    const addId = event.target.dataset.add
    const removeIndex = event.target.dataset.remove

    if (addId) {
        addToOrder(Number(addId))
    } else if (removeIndex) {
        removeFromOrder(Number(removeIndex))
    }
})

completeOrderBtn.addEventListener("click", () => {
    modalOverlayEl.classList.remove("hidden")
    nameInputEl.focus()
})

modalOverlayEl.addEventListener("click", event => {
    if (event.target === modalOverlayEl) {
        modalOverlayEl.classList.add("hidden")
    }
})

paymentFormEl.addEventListener("submit", event => {
    event.preventDefault()

    const customerName = nameInputEl.value

    modalOverlayEl.classList.add("hidden")
    orderEl.classList.add("hidden")
    thanksEl.classList.remove("hidden")
    thanksMessageEl.textContent = `Thanks, ${customerName}! Your order is on its way!`

    orderItems = []
    paymentFormEl.reset()
    renderStars()
})

const getStarsHtml = () =>
    [1, 2, 3, 4, 5]
        .map(
            star => `
                <button class="star-btn ${star <= rating ? "filled" : ""}"
                        data-rating="${star}"
                        aria-label="Rate ${star} out of 5">⭐
                </button>
            `
        )
        .join("")

function renderStars() {
    starsEl.innerHTML = getStarsHtml()
}

starsEl.addEventListener("click", event => {
    const chosen = event.target.dataset.rating
    if (chosen) {
        rating = Number(chosen)
        renderStars()
        document.getElementById("rating-label").textContent =
            `Thanks for rating us ${rating}/5!`
    }
})

themeBtn.addEventListener("click", () => {
    const isDark = appEl.classList.toggle("theme-dark")
    themeBtn.textContent = isDark ? "☀️" : "🌙"
})

menuEl.innerHTML = getMenuHtml()
renderOrder()