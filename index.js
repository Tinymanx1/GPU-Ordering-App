import { menuArray } from "./data.js"

let cartArray = []
let total = 0
let nameInput = ""
const displayTotalEl = document.getElementById('display-total')
const thanksEl = document.getElementById("thanks-msg")
const paymentForm = document.getElementById("payment-modal")

document.addEventListener("click", function(e){
    if (e.target.dataset.id) {
        cartHandler(e.target.dataset.id)
        thanksEl.classList.add("hidden")
    } else if (e.target.dataset.removeId) {
        removeFromCart(e.target.dataset.removeId)
    } else if (e.target.id === "order-btn"){
        document.getElementById("payment-modal").classList.toggle("hidden")
    }
})

paymentForm.addEventListener("submit", function(e){
    e.preventDefault()
    nameInput = document.getElementById("name-input").value
    finishPayment()
})

function cartHandler(itemId) {
    const targetMenuObj = menuArray.filter(function(item){
        return item.id === itemId
    })[0]
    
    cartArray.push(targetMenuObj)
    
    // price handler
    total += targetMenuObj.price
    displayTotalEl.textContent = `$${total}`
    
    // checkout hider
    if (cartArray.length > 0){
        document.getElementById('cart').classList.remove('hidden')
    } else {
        document.getElementById('cart').classList.add('hidden')
    }
    render()
}

function removeFromCart(index) {
    total -= cartArray[index].price
    cartArray.splice(index, 1)
    render()
}

function finishPayment() {
    paymentForm.classList.toggle("hidden")
    thanksEl.classList.remove("hidden")
    thanksEl.innerHTML = `
    <h2>Thanks, ${nameInput}! <br> Your order is on its way!</h2>
    `
    cartArray = []
    total = 0
    render()
}



function getMenuHtml() {
    let menuHtml = ``
    
    menuArray.forEach(function(item){
        menuHtml += `
        <div class="menu-item">
            <div class="menu-inner">
                <img src="${item.image}">
                <div class="menu-details-cont">
                    <div class="menu-details">
                        <h2>${item.name}</h2>
                        <p>${item.desc}</p>
                        <span>$${item.price}</span>
                    </div>
                    <button class="menu-btn" data-id="${item.id}">+</button>
                </div>
            </div>
        </div>
        `
    })
    return menuHtml
    
}

function getCartHtml() {
    let cartHtml = ``
    
    if (cartArray.length > 0){
        document.getElementById("cart").style.display = "block"
        cartArray.forEach(function(item, index){
            cartHtml += `
                <div class="cart-inner">
                    <div class="cart-item">
                        <span>${item.name}</span>
                        <a class="remove-btn" data-remove-id="${index}">REMOVE</a>
                    </div>
                    <div class="price">
                        <span>$${item.price}</span>
                    </div>
                </div>`
            })
    } else {
        document.getElementById("cart").style.display = "none"
    }
    return cartHtml
}

function render() {
    document.getElementById("menu").innerHTML = getMenuHtml()
    displayTotalEl.textContent = `$${total}`
    document.getElementById("cart-list").innerHTML = getCartHtml()
}

render()


// if ALL input of modal-inputs have a value, run payment