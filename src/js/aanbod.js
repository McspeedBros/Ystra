const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartList = document.querySelector("#cart-list");
const totalCost = document.querySelector("#total-cost");

let cart = [];

addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const product = event.target.parentElement;
    const title = product.querySelector("h3").textContent;
    const price = product.querySelector("p").textContent;
    const quantityInput = product.querySelector("input[type='number']");
    const quantity = quantityInput.value;
    const productOptionsElement = product.querySelector(".product-option");
    const selectedOption = productOptionsElement
      ? productOptionsElement.value
      : null;
    addToCart(title, price, quantity, selectedOption);
  });
});

function removeItem(title, option) {
  if (option) {
    cart = cart.filter(
      (cartItem) => cartItem.title !== title || cartItem.option !== option
    );
  } else {
    cart = cart.filter((cartItem) => cartItem.title !== title);
  }
  renderCart();
}

function addToCart(title, price, quantity, option) {
  const item = {
    title,
    option,
    price: parseFloat(price.replace("€", "").replace(",", ".")),
    quantity: parseInt(quantity),
  };

  let itemExists = false;
  cart.forEach((cartItem) => {
    if (cartItem.title === item.title && cartItem.option === item.option) {
      cartItem.quantity += item.quantity;
      itemExists = true;
      return;
    }
  });

  if (!itemExists) {
    cart.push(item);
  }

  if (quantity <= 0) {
    alert("Please enter a valid quantity");
    removeItem(title);
  }

  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  let cartTotal = 0;
  cart.forEach((item) => {
    cartTotal += item.price * item.quantity;
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${item.title} - ${item.option ? item.option : ""} - €${item.price} x ${
      item.quantity
    } = €${item.price * item.quantity}
    `;
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.dataset.title = item.title;
    removeButton.dataset.option = item.option ? item.option : "";
    removeButton.textContent = "Verwijder";
    listItem.appendChild(removeButton);
    cartList.appendChild(listItem);
  });
  totalCost.textContent = `Total: €${cartTotal.toFixed(2)}`;

  const removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const title = event.target.dataset.title;
      const option = event.target.dataset.option;
      removeItem(title, option);
    });
  });
}

// LocalStorage part
var products = document.querySelectorAll(".product");

for (var i = 0; i < products.length; i++) {
  var product = products[i];
  var quantityInput = product.querySelector("input[type=number]");
  var addToCartButton = product.querySelector(".add-to-cart");

  addToCartButton.addEventListener("click", function () {
    var productName = this.parentElement.querySelector("h3").textContent;
    var productPrice = this.parentElement.querySelector("p").textContent;
    var productQuantity = quantityInput.value;
    var productOption = this.parentElement.querySelector(".product-option");
    var option = productOption ? productOption.value : null;

    var cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    var productIndex = -1;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].name === productName && cart[i].option === option) {
        productIndex = i;
        break;
      }
    }

    if (productIndex === -1) {
      cart.push({
        name: productName,
        option: option,
        price: productPrice,
        quantity: productQuantity,
      });
    } else {
      cart[productIndex].quantity =
        parseInt(cart[productIndex].quantity) + parseInt(productQuantity);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  });
}

// ---------------------Taarten-----------------
let cartItems = [];

function showSmaak2Dropdown() {
  const aantal_personen = document.getElementById("personen").value;
  const smaak1 = document.getElementById("smaak1");
  const smaak2Dropdown = document.getElementById("smaak2Dropdown");

  if (aantal_personen >= 10 || aantal_personen == "15+") {
    smaak2Dropdown.style.display = "block";
  } else {
    smaak2Dropdown.style.display = "none";
  }
}

function addToCartTaart() {
  const personen = document.getElementById("personen").value;
  const type = document.getElementById("type").value;
  const smaak1 = document.getElementById("smaak1").value;
  const afwerking = document.getElementById("afwerking").value;

  if (personen >= 10 || personen == "15+") {
    const smaak2 = document.getElementById("smaak2").value;
    const item = {
      personen,
      type,
      smaak1,
      smaak2,
      afwerking,
    };

    cartItems.push(item);
    console.log(cartItems);
    updateCart();
    return;
  }

  const item = {
    personen,
    type,
    smaak1,
    afwerking,
  };

  cartItems.push(item);
  console.log(cartItems);
  updateCart();
}

function updateCart() {
  const winkelwagenElement = document.getElementById("winkelwagen");
  winkelwagenElement.innerHTML = ""; // Wis de huidige inhoud van de winkelwagen

  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const listItem = document.createElement("li");
    listItem.textContent = `Taart ${i + 1}: ${item.personen} personen, ${
      item.smaak1
    }`;
    if (item.smaak2) {
      listItem.textContent += `, ${item.smaak2}`;
    }
    listItem.textContent += `, ${item.afwerking}`;
    winkelwagenElement.appendChild(listItem);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// --------------------------------------------

var besteldialog = document.querySelector("#bestelDialog");
var bestelopen = document.querySelector("#show");
var bestelclose = besteldialog.querySelector("#close");

bestelopen.addEventListener("click", () => {
  besteldialog.showModal();
});

bestelclose.addEventListener("click", () => {
  besteldialog.setAttribute("closing", "");
  besteldialog.classList.add("close");
  besteldialog.addEventListener(
    "animationend",
    () => {
      besteldialog.removeAttribute("closing");
      besteldialog.classList.remove("close");
      besteldialog.close();
    },
    { once: true }
  );
});

var fotodialog = document.querySelector("#fotoDialog");
var fotoopen = document.querySelector("#showfoto");
var fotoclose = fotodialog.querySelector("#closefoto");

fotoopen.addEventListener("click", () => {
  fotodialog.showModal();
});

fotoclose.addEventListener("click", () => {
  fotodialog.setAttribute("closing", "");
  fotodialog.classList.add("close");
  fotodialog.addEventListener(
    "animationend",
    () => {
      fotodialog.removeAttribute("closing");
      fotodialog.classList.remove("close");
      fotodialog.close();
    },
    { once: true }
  );
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slideshow-content");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}
