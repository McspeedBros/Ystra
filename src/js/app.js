const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartList = document.querySelector("#cart-list");
const totalCost = document.querySelector("#total-cost");

let cart = [];

addToCartButtons.forEach(button => {
  button.addEventListener("click", event => {
    const product = event.target.parentElement;
    const title = product.querySelector("h3").textContent;
    const price = product.querySelector("p").textContent;
    const quantityInput = product.querySelector("input[type='number']");
    const quantity = quantityInput.value;
    addToCart(title, price, quantity);
  });
});

function addToCart(title, price, quantity) {
  const item = {
    title,
    price: parseFloat(price.replace("$", "")),
    quantity: parseInt(quantity)
  };

  let itemExists = false;
  cart.forEach(cartItem => {
    if (cartItem.title === item.title) {
      cartItem.quantity += item.quantity;
      itemExists = true;
      return;
    }
  });

  if (!itemExists) {
    cart.push(item);
  }

  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  let cartTotal = 0;
  cart.forEach(item => {
    cartTotal += item.price * item.quantity;
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${item.title} - $${item.price} x ${item.quantity} = $${item.price * item.quantity}
      <button class="update-quantity" data-title="${item.title}">Update Quantity</button>
    `;
    cartList.appendChild(listItem);
  });
  totalCost.textContent = `Total: $${cartTotal.toFixed(2)}`;

  const updateQuantityButtons = document.querySelectorAll(".update-quantity");
  updateQuantityButtons.forEach(button => {
    button.addEventListener("click", event => {
      const title = event.target.dataset.title;
      const quantityInput = prompt("Enter new quantity:");
      updateQuantity(title, quantityInput);
    });
  });
}

function updateQuantity(title, quantity) {
  cart.forEach(item => {
    if (item.title === title) {
      item.quantity = parseInt(quantity);
    }
  });
  renderCart();
}
