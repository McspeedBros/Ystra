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

function removeItem(title) {
  cart = cart.filter(item => item.title !== title);
  renderCart();
}

function addToCart(title, price, quantity) {
  const item = {
    title,
    price: parseFloat(price.replace("€", "")),
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
      ${item.title} - €${item.price} x ${item.quantity} = €${item.price * item.quantity}
      <button class="update-quantity" data-title="${item.title}">Update Quantity</button>
    `;
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.dataset.title = item.title;
    removeButton.textContent = "Remove";
    listItem.appendChild(removeButton);
    cartList.appendChild(listItem);
  });
  totalCost.textContent = `Total: €${cartTotal.toFixed(2)}`;

  const updateQuantityButtons = document.querySelectorAll(".update-quantity");
  updateQuantityButtons.forEach(button => {
    button.addEventListener("click", event => {
      const title = event.target.dataset.title;
      const quantityInput = prompt("Enter new quantity:");
      updateQuantity(title, quantityInput);
    });
  });
  // Make a remove button to remove the item from the cart
  const removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach(button => {
    button.addEventListener("click", event => {
      const title = event.target.dataset.title;
      removeItem(title);
    });
  });
}

function updateQuantity(title, quantityInput) {
  cart.forEach(item => {
    if (item.title === title) {
      item.quantity = parseInt(quantityInput);
      renderCart();
      return;
    }
  });
}

var products = document.querySelectorAll(".product");

for (var i = 0; i < products.length; i++) {
  var product = products[i];
  var quantityInput = product.querySelector("input[type=number]");
  var addToCartButton = product.querySelector(".add-to-cart");

  addToCartButton.addEventListener("click", function() {
    var productName = this.parentElement.querySelector("h3").textContent;
    var productPrice = this.parentElement.querySelector("p").textContent;
    var productQuantity = quantityInput.value;

    var cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    var productIndex = -1;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].name === productName) {
        productIndex = i;
        break;
      }
    }

    if (productIndex === -1) {
      cart.push({
        name: productName,
        price: productPrice,
        quantity: productQuantity
      });
    } else {
      cart[productIndex].quantity =
        parseInt(cart[productIndex].quantity) + parseInt(productQuantity);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  });
}
