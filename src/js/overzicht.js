var cart = JSON.parse(window.localStorage.getItem("cart")) || [];
var cartTableBody = document.getElementById("cart-table-body");
var cartTableTaart = document.getElementById("taart-table-body");
var totalCost = document.getElementById("total-cost");
let total = 0;
var submitButton = document.getElementById("submitbutton");

// ----------------- CART Taarten -----------------
// JavaScript-code om de winkelwageninhoud te tonen
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const storedCartItems = localStorage.getItem("cartItems");
if (storedCartItems) {
  cartItems = JSON.parse(storedCartItems);
  updateCart();
}

function updateCart() {
  const taartenlijstElement = document.getElementById("taartenlijst");
  taartenlijstElement.innerHTML = "";

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
    taartenlijstElement.appendChild(listItem);
  }
}
function formatCartTaart(cartData) {
  var formattedOutput = "Cart Items:\n";

  for (var i = 0; i < cartData.length; i++) {
    var product = cartData[i];
    var productPersonen = product.personen;
    var productType = product.type;
    var productSmaak1 = product.smaak1;
    var productSmaak2 = product.smaak2;
    var productAfwerking = product.afwerking;

    formattedOutput += `- ${productPersonen} personen - ${productType} - ${productSmaak1} - ${
      productSmaak2 ? productSmaak2 : ""
    } - ${productAfwerking}\n`;
  }

  return formattedOutput;
}
// -----------------------------------------
function formatCart(cartData) {
  var formattedOutput = "Cart Items:\n";

  for (var i = 0; i < cartData.length; i++) {
    var product = cartData[i];
    var productName = product.name;
    var productOption = product.option; // Add option to the cart format
    var productQuantity = product.quantity;
    var productPrice = product.price;

    formattedOutput += `- ${productName} - ${
      productOption ? productOption : ""
    } x${productQuantity} - ${productPrice}\n`;
  }

  return formattedOutput;
}
for (var i = 0; i < cart.length; i++) {
  cart[i].id = "item-" + i;
}

for (var i = 0; i < cartItems.length; i++) {
  cartItems[i].id = "taart-" + i;
}

// Populate the cart table with items and options
var overzichtBestelling = document.getElementById("overzichtBestelling");
for (var i = 0; i < cart.length; i++) {
  if (cart[i].name == "Taarten") {
    continue;
  }
  var product = cart[i];
  var tr = document.createElement("tr");

  tr.setAttribute("data-product-id", product.id);

  var categories = [
    "Basic",
    "Sorbet",
    "Nootjes",
    "Specials",
    "Yspralines",
    "Taarten",
    "Frisco's",
    "Holiday Specials",
  ];
  var productCategory = "";
  if (
    product.name == "Velvet Vanilla" ||
    product.name == "Mild Mokka" ||
    product.name == "Soft Stracciatella" ||
    product.name == "Milky Chocolate" ||
    product.name == "Brazil Chocolate" ||
    product.name == "Banana Crazy"
  ) {
    productCategory = categories[0];
  } else if (
    product.name == "Sweet Strawberry" ||
    product.name == "Funky Lemon" ||
    product.name == "Raspberry Red" ||
    product.name == "Tropical Mango" ||
    product.name == "Blueberry Boost"
  ) {
    productCategory = categories[1];
  } else if (
    product.name == "Pure Pistacchio" ||
    product.name == "Piemonte Nuts"
  ) {
    productCategory = categories[2];
  } else if (
    product.name == "Amarena Love" ||
    product.name == "Chef's Favourite Cookie" ||
    product.name == "Mars Delight" ||
    product.name == "Cuberdon Candy" ||
    product.name == "Speculoos Special"
  ) {
    productCategory = categories[3];
  } else if (product.name == "Yspralines") {
    productCategory = categories[4];
  } else if (product.name == "Taarten") {
    productCategory = categories[5];
  } else if (product.name == "Frisco's") {
    productCategory = categories[6];
  } else if (
    product.name == "Vanilla Gold" || 
    product.name == "Caramel Crunch" ||
    product.name == "Cherry Chocolate" ||
    product.name == "Berry Christmas" ||
    product.name == "Choc Crock" ||
    product.name == "Dome Classic" ||
    product.name == "Dome Intense" ||
    product.name == "Dome Cappuccino" ||
    product.name == "Dome Berry" ||
    product.name == "Gin Tonic Frisco (per 2)" ||
    product.name == "Yspralines Mix" ||
    product.name == "Glaasje Vanille & Pistache" ||
    product.name == "Glaasje Vanille & Chocolade"
  ) {
    productCategory = categories[7];
  }

  var productCategoryTd = document.createElement("td");
  productCategoryTd.textContent = productCategory;
  tr.appendChild(productCategoryTd);

  // var productNameTd = document.createElement("td");
  // productNameTd.textContent = product.name;
  // tr.appendChild(productNameTd);

  var productOptionTd = document.createElement("td"); // Add a new table cell for the option

  let option = product.option ? product.option : product.name;

  if (product.name === "Vanilla Gold") {
    option = "Vanilla Gold";
  } else if (product.name === "Caramel Crunch") {
    option = "Caramel Crunch";
  } else if (product.name === "Cherry Chocolate") {
    option = "Cherry Chocolate";
  } else if (product.name === "Berry Christmas") {
    option = "Berry Christmas";
  } else if (product.name === "Choc Crock") {
    option = "Choc Crock";
  }
    // product.querySelector(".product-option").value = "Vanilla Gold";


  productOptionTd.textContent = option;
  tr.appendChild(productOptionTd);

  var productQuantityTd = document.createElement("td");
  var quantityForm = document.createElement("form");
  var quantityInput = document.createElement("input");
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("value", product.quantity);
  quantityInput.setAttribute("min", 1);
  quantityInput.setAttribute("step", 1);
  quantityInput.setAttribute("class", "hoeveelheid");
  quantityForm.appendChild(quantityInput);
  productQuantityTd.appendChild(quantityForm);
  tr.appendChild(productQuantityTd);

  var productPriceTd = document.createElement("td");
  if (product.name === "Frisco's" && product.option === "Gin Tonic") {
    productPriceTd.textContent = "\u20AC 3,00 per stuk";
  } else if (product.name === "Vanilla Gold") {
    if (product.option === "4P") {
      productPriceTd.textContent = "\u20AC 25,00 - 4P";
    } else if (product.option === "8P") {
      productPriceTd.textContent = "\u20AC 40,00 - 8P";
    }
  } else if (product.name === "Caramel Crunch") {
    if (product.option === "4P") {
      productPriceTd.textContent = "\u20AC 25,00 - 4P";
    } else if (product.option === "8P") {
      productPriceTd.textContent = "\u20AC 40,00 - 8P";
    }
  } else if (product.name === "Cherry Chocolate") {
    if (product.option === "4P") {
      productPriceTd.textContent = "\u20AC 25,00 - 4P";
    } else if (product.option === "8P") {
      productPriceTd.textContent = "\u20AC 40,00 - 8P";
    }
  } else if (product.name === "Berry Christmas") {
    if (product.option === "6P") {
      productPriceTd.textContent = "\u20AC 32,00 - 6P";
    } else if (product.option === "10P") {
      productPriceTd.textContent = "\u20AC 45,00 - 10P";
    }
  } else if (product.name === "Choc Crock") {
    if (product.option === "6P") {
      productPriceTd.textContent = "\u20AC 32,00 - 6P";
    } else if (product.option === "12P") {
      productPriceTd.textContent = "\u20AC 48,00 - 12P";
    }
  }
  else {
    productPriceTd.textContent = product.price;
  }
  tr.appendChild(productPriceTd);

  let priceOverzicht;
  if (product.name === "Frisco's" && product.option === "Gin Tonic") {
    priceOverzicht = "3.00";
  } else if (product.name === "Vanilla Gold") {
    if (product.option === "4P") {
      priceOverzicht = "25.00";
    } else if (product.option === "8P") {
      priceOverzicht = "40.00";
    }
  } else if (product.name === "Caramel Crunch") {
    if (product.option === "4P") {
      priceOverzicht = "25.00";
    } else if (product.option === "8P") {
      priceOverzicht = "40.00";
    }
  } else if (product.name === "Cherry Chocolate") {
    if (product.option === "4P") {
      priceOverzicht = "25.00";
    } else if (product.option === "8P") {
      priceOverzicht = "40.00";
    }
  } else if (product.name === "Berry Christmas") {
    if (product.option === "6P") {
      priceOverzicht = "32.00";
    } else if (product.option === "10P") {
      priceOverzicht = "45.00";
    }
  } else if (product.name === "Choc Crock") {
    if (product.option === "6P") {
      priceOverzicht = "32.00";
    } else if (product.option === "12P") {
      priceOverzicht = "48.00";
    }
  }
  else {
    priceOverzicht = product.price.replace(",", ".").replace("\u20AC ", "");
  }
  // get the first 5 characters of the price
  priceOverzicht = priceOverzicht.split(" ")[0];
  // priceOverzicht = priceOverzicht.substring(0, 5);

  total +=
    parseFloat(product.quantity) * parseFloat(priceOverzicht);

  var removeTd = document.createElement("td");
  removeTd.style.height = "25px";

  var removeButton = document.createElement("button");
  removeButton.setAttribute("class", "buttonTable");

  removeButton.addEventListener("click", function () {
    var row = this.closest("tr");
    var productId = row.getAttribute("data-product-id");

    // Find the product with the matching ID in the cart array
    var index = cart.findIndex((item) => item.id === productId);
    if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    }
  });

  var trash = document.createElement("i");
  trash.setAttribute("class", "fa fa-trash-o");
  trash.setAttribute("style", "color:red;font-size:30px;");
  removeButton.appendChild(trash);

  removeTd.appendChild(removeButton);
  tr.appendChild(removeTd);

  cartTableBody.appendChild(tr);


  var div = document.createElement("div");
  var ul = document.createElement("ul");
  var aside = document.createElement("aside");
  var verwijderbutton = removeButton.cloneNode(true);

  let optiongsm = product.option ? product.option : product.name;

  if (product.name === "Vanilla Gold") {
    optiongsm = "Vanilla Gold";
  } else if (product.name === "Caramel Crunch") {
    optiongsm = "Caramel Crunch";
  } else if (product.name === "Cherry Chocolate") {
    optiongsm = "Cherry Chocolate";
  } else if (product.name === "Berry Christmas") {
    optiongsm = "Berry Christmas";
  } else if (product.name === "Choc Crock") {
    optiongsm = "Choc Crock";
  }

  ul.setAttribute("data-product-id-gsm", product.id);

  ul.innerHTML = "<span>Smaak: </span>";
  ul.innerHTML += optiongsm;
  ul.innerHTML += "<br>";

  ul.innerHTML += "<span>Categorie: </span>";
  ul.innerHTML += productCategory;
  ul.innerHTML += "<br>";

  ul.innerHTML += "<span>Hoeveelheid: </span>";
  ul.innerHTML += product.quantity;
  ul.innerHTML += "<br>";

  ul.innerHTML += "<span>Prijs: </span>";
  if (productCategory === "Frisco's" && product.option === "Gin Tonic") {
    ul.innerHTML += "\u20AC 3,00 per stuk";
  } else if (product.name === "Vanilla Gold") {
    if (product.option === "4P") {
      ul.innerHTML += "\u20AC 25,00 - 4P";
    } else if (product.option === "8P") {
      ul.innerHTML += "\u20AC 40,00 - 8P";
    }
  } else if (product.name === "Caramel Crunch") {
    if (product.option === "4P") {
      ul.innerHTML += "\u20AC 25,00 - 4P";
    } else if (product.option === "8P") {
      ul.innerHTML += "\u20AC 40,00 - 8P";
    }
  } else if (product.name === "Cherry Chocolate") {
    if (product.option === "4P") {
      ul.innerHTML += "\u20AC 25,00 - 4P";
    } else if (product.option === "8P") {
      ul.innerHTML += "\u20AC 40,00 - 8P";
    }
  } else if (product.name === "Berry Christmas") {
    if (product.option === "6P") {
      ul.innerHTML += "\u20AC 32,00 - 6P";
    } else if (product.option === "10P") {
      ul.innerHTML += "\u20AC 45,00 - 10P";
    }
  } else if (product.name === "Choc Crock") {
    if (product.option === "6P") {
      ul.innerHTML += "\u20AC 32,00 - 6P";
    } else if (product.option === "12P") {
      ul.innerHTML += "\u20AC 48,00 - 12P";
    }
  } else {
    ul.innerHTML += product.price;
  }
  ul.innerHTML += "<br>";

  // var hoeveelheidForm = document.createElement("form");
  // var hoeveelheidInput = document.createElement("input");
  // hoeveelheidInput.setAttribute("type", "number");
  // hoeveelheidInput.setAttribute("value", product.quantity);
  // hoeveelheidInput.setAttribute("min", 1);
  // hoeveelheidInput.setAttribute("step", 1);
  // hoeveelheidInput.setAttribute("class", "hoeveelheid");
  // hoeveelheidForm.appendChild(hoeveelheidInput);
  // aside.appendChild(hoeveelheidForm);

  

  aside.classList.add("verwijderen");
  aside.appendChild(verwijderbutton);
  // aside.innerHTML += "<br>";

  

  div.appendChild(ul);
  div.appendChild(aside);
  // overzichtBestelling.appendChild(aside);
  overzichtBestelling.appendChild(div);


  verwijderbutton.addEventListener("click", function () {
    var button = this;
    console.log(button);
    var div = button.closest("div");
    var ul = div.querySelector("ul");
    console.log(div);
    var dataproductId = ul.getAttribute("data-product-id-gsm");
    console.log(dataproductId);

    // Find the product with the matching ID in the cart array
    var index = cart.findIndex((item) => item.id === dataproductId);
    if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    } else {
      console.error("Product not found in cart");
    }
  });
  // let priceOverzicht = product.price.replace(",", ".").replace("\u20AC ", "");
  // // get the first 5 characters of the price
  // priceOverzicht = priceOverzicht.substring(0, 5);

  // total +=
  //   parseFloat(product.quantity) * parseFloat(priceOverzicht);

  // quantityInput.addEventListener("change", function () {
  //   product.quantity = parseFloat(this.value);
  //   localStorage.setItem("cart", JSON.stringify(cart));

  //   // recalculate the total cost (use only the price, loop over that)
  // //   total = 0;
  // //   for (var j = 0; j < cart.length; j++) {
  // //     let priceOverzicht = cart[j].price.replace(",", ".").replace("\u20AC ", "");
  // //     // get the first 5 characters of the price
  // //     priceOverzicht = priceOverzicht.substring(0, 5);
  // //     total += parseFloat(cart[j].quantity) * parseFloat(priceOverzicht);

  // //     console.log("cart[j].price:", cart[j].price);
  // //     console.log("priceOverzicht:", priceOverzicht);
  // //   }
  // //   totalCost.textContent =
  // //   "Totale prijs * : \u20AC " + total.toFixed(2);
  // // });

  // // total = 0;
  //   for (var j = 0; j < cart.length; j++) {
  //     let priceOverzicht = cart[j].price;

  //     // Check if the price contains the word "per stuk" or "\u20AC"
  //     if (priceOverzicht.includes("\u20AC")) {
  //       // Extract the numeric price value from the price string
  //       priceOverzicht = priceOverzicht.replace(",", ".").replace("\u20AC ", "");
  //       priceOverzicht = priceOverzicht.split(" ")[0];
  //     } else {
  //       // For prices like "Aantal Personen" or "Aanta", set the price to 0
  //       priceOverzicht = 0;
  //     }

  //     // if the quantity is less than it was before, subtract the difference from the total
  //     if (cart[j].quantity < product.quantity) {
  //       total += parseFloat(priceOverzicht);
  //     } else {
  //       total -= parseFloat(priceOverzicht);
  //     }
  //     // total += parseFloat(cart[j].quantity) * parseFloat(priceOverzicht);

  //     console.log("cart[j].price:", cart[j].price);
  //     console.log("priceOverzicht:", priceOverzicht);
  //   }

  // totalCost.textContent = "Totale prijs * : \u20AC " + total.toFixed(2);
  // });

  quantityInput.addEventListener("change", function () {
    product.quantity = parseFloat(this.value);
    localStorage.setItem("cart", JSON.stringify(cart));
  
    const row = this.closest("tr");
    // Find the index of the product in the cart
    const productIndex = row.getAttribute("data-product-id");

    // Find the product with the matching ID in the cart array
    var index = cart.findIndex((item) => item.id === productIndex);
    // const productIndex = cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      let priceOverzicht = cart[index].price;
  
      // Check if the price contains the word "per stuk" or "\u20AC"
      if (priceOverzicht.includes("\u20AC")) {
        // Extract the numeric price value from the price string
        priceOverzicht = priceOverzicht.replace(",", ".").replace("\u20AC ", "");
        priceOverzicht = priceOverzicht.split(" ")[0];
      } else {
        // For prices like "Aantal Personen" or "Aanta", set the price to 0
        priceOverzicht = 0;
      }
  
      // Calculate the difference in total cost due to quantity change
      const prevQuantity = cart[index].quantity;
      const quantityDifference = product.quantity - prevQuantity;
  
      // Update the total cost based on the quantity change
      total += parseFloat(priceOverzicht) * quantityDifference;
  
      // Update the quantity of the product in the cart
      cart[index].quantity = product.quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      // reload the page
      location.reload();


  
      console.log("cart[productIndex].price:", cart[index].price);
      console.log("priceOverzicht:", priceOverzicht);
    } else {
      console.error("Product not found in cart");
    }
  
    totalCost.textContent = "Totale prijs* : \u20AC " + total.toFixed(2);
  });
}

// Populate the cart table with taarten
var overzichtTaart = document.getElementById("overzichtTaart");
for (var i = 0; i < cartItems.length; i++) {
  var product = cartItems[i];
  var tr = document.createElement("tr");

  tr.setAttribute("data-product-id", product.id);

  var personenTd = document.createElement("td");
  personenTd.textContent = product.personen;
  tr.appendChild(personenTd);

  var typeTd = document.createElement("td");
  typeTd.textContent = product.type;
  tr.appendChild(typeTd);

  var smaakTd = document.createElement("td");
  smaakTd.textContent = product.smaak1;
  if (product.smaak2) {
    smaakTd.textContent += ", " + product.smaak2;
  }
  tr.appendChild(smaakTd);

  var afwerkingTd = document.createElement("td");
  afwerkingTd.textContent = product.afwerking;
  tr.appendChild(afwerkingTd);

  var prijsTd = document.createElement("td");
  if (product.prijs == "Prijs op aanvraag") {prijsTd.textContent = "Prijs op aanvraag";}
  else {
    prijsTd.textContent = "\u20AC " + product.prijs;
  }
  
  tr.appendChild(prijsTd);

  var removeTd = document.createElement("td");
  removeTd.style.height = "25px";

  var removeButton = document.createElement("button");
  removeButton.setAttribute("class", "buttonTable");

  removeButton.addEventListener("click", function () {
    var row = this.closest("tr");
    var productId = row.getAttribute("data-product-id");

    // Find the product with the matching ID in the cartItems array
    var index = cartItems.findIndex((item) => item.id === productId);
    if (index !== -1) {
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      location.reload();
    }
  });

  var trash = document.createElement("i");
  trash.setAttribute("class", "fa fa-trash-o");
  trash.setAttribute("style", "color:red;font-size:30px;");
  removeButton.appendChild(trash);

  removeTd.appendChild(removeButton);
  tr.appendChild(removeTd);

  cartTableTaart.appendChild(tr);


  var div = document.createElement("div");
  var ul = document.createElement("ul");
  var aside = document.createElement("aside");
  var verwijderbutton = removeButton.cloneNode(true);

  ul.setAttribute("data-product-id-gsm", product.id);

  ul.innerHTML = "<span>Personen: </span>";
  ul.innerHTML += product.personen;
  ul.innerHTML += "<br>";

  ul.innerHTML += "<span>Type: </span>";
  ul.innerHTML += product.type;
  ul.innerHTML += "<br>";

  ul.innerHTML += "<span>Smaak: </span>";
  ul.innerHTML += product.smaak1;
  if (product.smaak2) {
    ul.innerHTML += ", " + product.smaak2;
  }
  ul.innerHTML += "<br>";

  ul.innerHTML += "<span>Afwerking: </span>";
  ul.innerHTML += product.afwerking;
  ul.innerHTML += "<br>";

  ul.innerHTML += "<span>Prijs: </span>";
  if (product.prijs == "Prijs op aanvraag") ul.innerHTML += "Prijs op aanvraag";
  else
  ul.innerHTML += "\u20AC " + product.prijs;
  ul.innerHTML += "<br>";

  // var hoeveelheidForm = document.createElement("form");
  // var hoeveelheidInput = document.createElement("input");
  // hoeveelheidInput.setAttribute("type", "number");
  // hoeveelheidInput.setAttribute("value", product.quantity);
  // hoeveelheidInput.setAttribute("min", 1);
  // hoeveelheidInput.setAttribute("step", 1);
  // hoeveelheidInput.setAttribute("class", "hoeveelheid");
  // hoeveelheidForm.appendChild(hoeveelheidInput);
  // aside.appendChild(hoeveelheidForm);
  
  aside.classList.add("verwijderen");
  aside.appendChild(verwijderbutton);
  // aside.innerHTML += "<br>";

  verwijderbutton.addEventListener("click", function () {
    var button = this;
    console.log(button);
    var div = button.closest("div");
    var ul = div.querySelector("ul");
    var dataproductId = ul.getAttribute("data-product-id-gsm");

    // Find the product with the matching ID in the cartItems array
    var index = cartItems.findIndex((item) => item.id === dataproductId);
    if (index !== -1) {
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      location.reload();
    }
  });

  let priceTaart = product.prijs.replace(",", ".");
  // get the last 5 characters of the price
  priceTaart = priceTaart.substring(priceTaart.length - 5);
  if (product.prijs != "Prijs op aanvraag") {
    total += parseFloat(priceTaart);
  } else {
    total += 0;
  }

  div.appendChild(ul);
  div.appendChild(aside);
  // overzichtBestelling.appendChild(aside);
  overzichtTaart.appendChild(div);
}

totalCost.textContent = "Totale prijs: \u20AC " + total.toFixed(2);
// if there is a taart for 15+ personen aanwezig, edit the style of #comment
for (var i = 0; i < cartItems.length; i++) {
  if (cartItems[i].personen === "15+") {
    totalCost.textContent = "Totale prijs* : \u20AC " + total.toFixed(2);
    document.getElementById("comment").style.display = "block";
    break;
}
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePhone(phone) {
  var re = /^((\+32|0)\d{1,9})$/;
  return re.test(phone);
}

function getSelectedOption() {
  const selectOption = document.querySelector(
    'input[name="data[Levering]"]:checked'
  );
  return selectOption.value;
}

submitButton.addEventListener("click", async function (e) {
  e.preventDefault();
  const dialogerror = document.getElementById("dialogError");
  const errortext = dialogerror.querySelector("p");
  const errorbutton = dialogerror.querySelector("button");

  // Check if cart or cartItems is empty
  if (cart.length === 0 && cartItems.length === 0) {
    errortext.innerText = `Je winkelmandje is leeg! Voeg items toe voordat je verder gaat.`;
    dialogerror.showModal();

    errorbutton.addEventListener("click", () => {
      dialogerror.setAttribute("closing", "");
      dialogerror.addEventListener(
        "animationend",
        () => {
          dialogerror.removeAttribute("closing");
          dialogerror.close();
        },
        { once: true }
      );
    });
    // alert(
    //   "Je winkelmandje of taartwinkelmandje zijn leeg. Voeg items toe voordat je verder gaat."
    // );
    return;
  }

  if (
    localStorage.getItem("cart") === null &&
    localStorage.getItem("cartItems") === null
  ) {
    errortext.textContent = `Je winkelmandje is leeg! Voeg items toe voordat je verder gaat.`;
    dialogerror.showModal();

    errorbutton.addEventListener("click", () => {
      dialogerror.setAttribute("closing", "");
      dialogerror.addEventListener(
        "animationend",
        () => {
          dialogerror.removeAttribute("closing");
          dialogerror.close();
        },
        { once: true }
      );
    });
    // alert(
    //   "Je winkelmandje en taartwinkelmandje zijn leeg. Voeg items toe voordat je verder gaat."
    // );
    return;
  }

  // Check if all fields are filled
  if (
    document.getElementById("name").value == "" ||
    document.getElementById("email").value == "" ||
    document.getElementById("phone").value == "" ||
    document.getElementById("address").value == ""
  ) {
    errortext.textContent = `Vul alle velden corect in!`;
    dialogerror.showModal();

    errorbutton.addEventListener("click", () => {
      dialogerror.setAttribute("closing", "");
      dialogerror.addEventListener(
        "animationend",
        () => {
          dialogerror.removeAttribute("closing");
          dialogerror.close();
        },
        { once: true }
      );
    });
    // alert("Vul alle velden correct in");
    return;
  }
  // Check if the email is valid
  if (!validateEmail(document.getElementById("email").value)) {
    errortext.textContent = `Vul een geldig email adres in!`;
    dialogerror.showModal();

    errorbutton.addEventListener("click", () => {
      dialogerror.setAttribute("closing", "");
      dialogerror.addEventListener(
        "animationend",
        () => {
          dialogerror.removeAttribute("closing");
          dialogerror.close();
        },
        { once: true }
      );
    });
    // alert("Vul een geldig email adres in");
    return;
  }

  // Check if the phone number is valid
  if (!validatePhone(document.getElementById("phone").value)) {
    errortext.textContent = `Vul een geldig telefoonnummer in!`;
    dialogerror.showModal();

    errorbutton.addEventListener("click", () => {
      dialogerror.setAttribute("closing", "");
      dialogerror.addEventListener(
        "animationend",
        () => {
          dialogerror.removeAttribute("closing");
          dialogerror.close();
        },
        { once: true }
      );
    });
    // alert("Vul een geldig telefoonnummer in");
    return;
  }

  // Get the formatted cart data
  var formattedCartData = formatCart(cart);
  var formattedCartDataTaart = formatCartTaart(cartItems);

  // Get the current date and time
  // Create a new Date object representing the current date and time
  const currentDate = new Date();

  // Get the current date
  const year = currentDate.getFullYear(); // 4-digit year
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month (1 to 12)
  const day = currentDate.getDate();
  const date = `${day}/${month}/${year}`;

  // Get the current time
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const time = `${hours}:${minutes}:${seconds}`;

  // Combine the date and time
  const dateTime = `${date} ${time}`;

  // Combine other form data and cart data
  var data = [
    ["Datum", dateTime],
    ["Naam", document.getElementById("name").value],
    ["E-mail", document.getElementById("email").value],
    ["Telefoonnummer", document.getElementById("phone").value],
    [
      "Levering",
      getSelectedOption(document.getElementsByName("data[Levering]")),
    ],
    ["Adres/Ophaaluur", document.getElementById("address").value],
    ["Opmerking", document.getElementById("opmerking").value],
    ["Product", formattedCartData],
    ["Taart", formattedCartDataTaart],
  ];

  var url = `https://sheetdb.io/api/v1/${CONFIG.GOOGLE_SHEET_API_KEY}`;
  var result = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [Object.fromEntries(data)],
    }),
  });

  // Clear the cartItems
  cartItems = [];
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Clear the cart
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  // Redirect to the confirmation page
  window.open("bevestiging.html", "_self");
});
