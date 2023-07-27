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


var besteldialog = document.querySelector('#bestelDialog');
var bestelopen = document.querySelector('#show');
var bestelclose = besteldialog.querySelector('#close');

bestelopen.addEventListener('click', () => {
  besteldialog.showModal();
});

bestelclose.addEventListener('click', () => {
  besteldialog.setAttribute('closing', '');
  besteldialog.classList.add('close');
  besteldialog.addEventListener('animationend', () => {
    besteldialog.removeAttribute('closing');
    besteldialog.classList.remove('close');
    besteldialog.close();
  }, {once: true}
  );
});


var fotodialog = document.querySelector('#fotoDialog');
var fotoopen = document.querySelector('#showfoto');
var fotoclose = fotodialog.querySelector('#closefoto');

fotoopen.addEventListener('click', () => {
  fotodialog.showModal();
});

fotoclose.addEventListener('click', () => {
  fotodialog.setAttribute('closing', '');
  fotodialog.classList.add('close');
  fotodialog.addEventListener('animationend', () => {
    fotodialog.removeAttribute('closing');
    fotodialog.classList.remove('close');
    fotodialog.close();
  }, {once: true}
  );
});

// function showNextSlide() {
//   const slideshowContent = document.querySelectorAll('.slideshow-content');
//   for (let i = 0; i < slideshowContent.length; i++) {
//     if (slideshowContent[i].style.display === 'block') {
//       slideshowContent[i].style.display = 'none';
//       const nextIndex = (i + 1) % slideshowContent.length;
//       slideshowContent[nextIndex].style.display = 'block';
//       break;
//     }
//   }
// }

// function showPreviousSlide() {
//   const slideshowContent = document.querySelectorAll('.slideshow-content');
//   for (let i = 0; i < slideshowContent.length; i++) {
//     if (slideshowContent[i].style.display === 'block') {
//       slideshowContent[i].style.display = 'none';
//       const prevIndex = (i - 1 + slideshowContent.length) % slideshowContent.length;
//       slideshowContent[prevIndex].style.display = 'block';
//       break;
//     }
//   }
// }


// document.getElementById('closeBtn').addEventListener('click', closeSlideshow);

// let currentSlide = 0;
// const slides = document.querySelectorAll('.slideshow-content');

// function showSlide(index) {
//   slides.forEach((slide, i) => {
//     if (i === index) {
//       slide.style.display = 'block';
//     } else {
//       slide.style.display = 'none';
//     }
//   });
// }

// // Function to show the next slide
// function showNextSlide() {
//   currentSlide = (currentSlide + 1) % slides.length;
//   showSlide(currentSlide);
// }

// // Function to show the previous slide
// function showPreviousSlide() {
//   currentSlide = (currentSlide - 1 + slides.length) % slides.length;
//   showSlide(currentSlide);
// }

// document.getElementById('prevBtn').addEventListener('click', showPreviousSlide());
// document.getElementById('nextBtn').addEventListener('click', showNextSlide());

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slideshow-content");
  // let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  // for (i = 0; i < dots.length; i++) {
  //   dots[i].className = dots[i].className.replace(" active", "");
  // }
  slides[slideIndex-1].style.display = "block";  
  // dots[slideIndex-1].className += " active";
}