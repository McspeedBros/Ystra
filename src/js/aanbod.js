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
  let prijs = document.getElementById("price").textContent;
  const storedCartItems = localStorage.getItem("cartItems");
  cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];


  if (personen >= 10 || personen === "15+") {
    const smaak2 = document.getElementById("smaak2").value;

    if (smaak2 === "/") {
      const dialogerror = document.getElementById("dialogError");
      const errortext = dialogerror.querySelector("p");
      const errorbutton = dialogerror.querySelector("button");
  
      var besteldialog = document.querySelector("#bestelDialog");
    
      errortext.textContent = "Kies een waarde voor elke optie.";
      dialogerror.showModal();
  
      errorbutton.addEventListener("click", () => {
        dialogerror.setAttribute("closing", "");
        dialogerror.addEventListener(
          "animationend",
          () => {
            dialogerror.removeAttribute("closing");
            dialogerror.close();
            besteldialog.showModal();
          },
          { once: true }
        );
      });
  
      return;
    }
  }

  if (personen === "/" || type === "/" || smaak1 === "/" || afwerking === "/") {
    const dialogerror = document.getElementById("dialogError");
    const errortext = dialogerror.querySelector("p");
    const errorbutton = dialogerror.querySelector("button");

    var besteldialog = document.querySelector("#bestelDialog");
  
    errortext.textContent = "Kies een waarde voor elke optie.";
    dialogerror.showModal();

    errorbutton.addEventListener("click", () => {
      dialogerror.setAttribute("closing", "");
      dialogerror.addEventListener(
        "animationend",
        () => {
          dialogerror.removeAttribute("closing");
          dialogerror.close();
          besteldialog.showModal();
        },
        { once: true }
      );
    });

    return;
  }

  if (personen !== "15+") {
    prijs = prijs.replace("Prijs: € ", "");
  } else {
    prijs = "Prijs op aanvraag";
  }

  if (personen >= 10 || personen === "15+") {
    
    const smaak2 = document.getElementById("smaak2").value;
    const item = {
      personen,
      type,
      smaak1,
      smaak2,
      afwerking,
      prijs,
    };

    cartItems.push(item);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log(cartItems);
    updateCart();
    return;
  } else {

    const item = {
      personen,
      type,
      smaak1,
      afwerking,
      prijs,
    };

    cartItems.push(item);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log(cartItems);
    updateCart();
    return;
  }
  
}

function updateCart() {
  const winkelwagenElement = document.getElementById("winkelwagen");
  winkelwagenElement.innerHTML = ""; // Wis de huidige inhoud van de winkelwagen

  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const listItem = document.createElement("li");
    listItem.textContent = `Taart ${i + 1} - € ${item.prijs}: ${item.personen} personen, ${
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

function linkPrice() {
  const personen = document.getElementById("personen").value;
  const prijs = document.getElementById("price");
  let price;
  
  if (personen == 6) {
    prijs.textContent = "Prijs: € 24,00";
    price = 24;
  } else if (personen == 8) {
    prijs.innerHTML = "Prijs: € 32,00";
    price = 32;
  } else if (personen == 10) {
    prijs.innerHTML = "Prijs: € 40,00";
    price = 40;
  } else if (personen == 12) {
    prijs.innerHTML = "Prijs: € 48,00";
    price = 48;
  } else if (personen == "15+") {
    prijs.innerHTML = "Prijs op aanvraag";
    price = 0;
  }
}

// --------------------------------------------
const mokka = document.querySelector("#mokkaText");
const mars = document.querySelector("#marsText");
const cookie = document.querySelector("#cookieText");
const vanilla = document.querySelector("#vanilla1");
const banana = document.querySelector("#banana1");
const strawberry = document.querySelector("#strawberry1");
const blueberry = document.querySelector("#blueberry1");
const amarena = document.querySelector("#amarena1");
const amarenaText = document.querySelector("#amarenaText");
const cuberdonText = document.querySelector("#cuberdonText");
const cuberdon = document.querySelector("#cuberdon1");
const ontdekmeer = document.querySelector("#showfoto");
const container1 = document.querySelector(".container1");
const container1height = container1.offsetHeight;
const container2 = document.querySelector(".container2");
const container2height = container2.offsetHeight;
const container3 = document.querySelector(".container3");
const container3height = container3.offsetHeight;
const container4 = document.querySelector(".container4");
const container4height = container4.offsetHeight;
const title = document.querySelector("main h1");

function addBreakBetweenFlavours() {
  const screenWidth = window.innerWidth;

  // Check if the screen width is between the specified range (400px and 800px)
  if (screenWidth >= 767 && screenWidth <= 1373) {
    title.style.top = "30%";
    // Add a <br> tag between 'Mild' and 'Mokka'
    mokka.innerHTML = 'Mild<br>Mokka';
    // mars.innerHTML = 'Mars<br>Delight';
    ontdekmeer.innerHTML = 'Details';
    container1.style.overflowX = "scroll";
    container1.style.height = `${container1height + 27}px`;
    container1.style.padding = "10px";
    container1.style.overflowY = "hidden";
    container2.style.overflowX = "scroll";
    container2.style.height = `${container2height + 27}px`;
    container2.style.padding = "10px";
    container2.style.overflowY = "hidden";
    container3.style.overflowX = "scroll";
    container3.style.height = `${container3height + 27}px`;
    container4.style.overflowX = "scroll";
    container4.style.height = `${container4height + 27}px`;
    container4.style.padding = "10px";
    container4.style.overflowY = "hidden";
    vanilla.style.marginLeft = "10px";
    banana.style.marginRight = "10px";
    strawberry.style.marginLeft = "10px";
    blueberry.style.marginRight = "10px";
    amarena.style.marginLeft = "10px";
    cuberdon.style.marginRight = "10px";
  } else {
    // Reset the text to the original
    mokka.innerHTML = 'Mild Mokka';
    // mars.innerHTML = 'Mars Delight';
    ontdekmeer.innerHTML = 'Ontdek meer';
  }

  if (screenWidth >= 767 && screenWidth <= 1083) {
    amarenaText.innerHTML = 'Amarena<br>Love';
    mars.innerHTML = 'Mars<br>Delight';
    cookie.innerHTML = "Chef's Favourite<br>Cookie";
    cuberdonText.innerHTML = 'Cuberdon<br>Candy';
  } else {
    amarenaText.innerHTML = 'Amarena Love';
    mars.innerHTML = 'Mars Delight';
    cookie.innerHTML = "Chef's Favourite Cookie";
    cuberdonText.innerHTML = 'Cuberdon Candy';
  }
}

// Call the function on page load and whenever the window is resized
window.addEventListener('load', addBreakBetweenFlavours);
window.addEventListener('resize', addBreakBetweenFlavours);

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
