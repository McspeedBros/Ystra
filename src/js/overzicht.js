var cart = JSON.parse(window.localStorage.getItem("cart")) || [];
var cartTableBody = document.getElementById("cart-table-body");
var cartTableTaart = document.getElementById("taart-table-body");
var totalCost = document.getElementById("total-cost");
var total = 0;
var submitButton = document.getElementById("submitbutton");

// ----------------- CART Taarten -----------------
// JavaScript-code om de winkelwageninhoud te tonen
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Haal de gegevens van de taarten op uit de localStorage
const storedCartItems = localStorage.getItem("cartItems");
if (storedCartItems) {
  cartItems = JSON.parse(storedCartItems);
  updateCart();
}

function updateCart() {
  const taartenlijstElement = document.getElementById("taartenlijst");
  taartenlijstElement.innerHTML = ""; // Wis de huidige inhoud van de taartenlijst

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

// Populate the cart table with items and options
for (var i = 0; i < cart.length; i++) {
  if (cart[i].name == "Taarten") {
    continue;
  }
  var product = cart[i];
  var tr = document.createElement("tr");

  var categories = [
    "Basic",
    "Sorbet",
    "Nootjes",
    "Specials",
    "Yspralines",
    "Taarten",
    "Frisco's",
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
    product.name == "Cuberdon Candy"
  ) {
    productCategory = categories[3];
  } else if (product.name == "Yspralines") {
    productCategory = categories[4];
  } else if (product.name == "Taarten") {
    productCategory = categories[5];
  } else if (product.name == "Frisco's") {
    productCategory = categories[6];
  }

  var productCategoryTd = document.createElement("td");
  productCategoryTd.textContent = productCategory;
  tr.appendChild(productCategoryTd);

  // var productNameTd = document.createElement("td");
  // productNameTd.textContent = product.name;
  // tr.appendChild(productNameTd);

  var productOptionTd = document.createElement("td"); // Add a new table cell for the option
  productOptionTd.textContent = product.option ? product.option : product.name;
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
  productPriceTd.textContent = product.price;
  tr.appendChild(productPriceTd);

  total +=
    parseFloat(product.quantity) * parseFloat(product.price.substring(1));

  var removeTd = document.createElement("td");
  removeTd.style.height = "25px";
  var removeButton = document.createElement("button");
  removeButton.setAttribute("class", "buttonTable");
  removeButton.addEventListener("click", function () {
    var index = cart.indexOf(product);
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  });

  var trash = document.createElement("i");
  trash.setAttribute("class", "fa fa-trash-o");
  trash.setAttribute("style", "color:red;font-size:30px;");
  removeButton.appendChild(trash);

  removeTd.appendChild(removeButton);
  tr.appendChild(removeTd);

  cartTableBody.appendChild(tr);

  quantityInput.addEventListener("change", function () {
    product.quantity = this.value;
    localStorage.setItem("cart", JSON.stringify(cart));

    // recalculate the total cost
    total = 0;
    for (var j = 0; j < cart.length; j++) {
      total +=
        parseFloat(cart[j].quantity) * parseFloat(cart[j].price.substring(1));
    }
    totalCost.textContent = "Totale prijs (excl. taarten): € " + total;
  });
}

// Populate the cart table with taarten
for (var i = 0; i < cartItems.length; i++) {
  var product = cartItems[i];
  var tr = document.createElement("tr");

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

  var removeTd = document.createElement("td");
  removeTd.style.height = "25px";
  var removeButton = document.createElement("button");
  removeButton.setAttribute("class", "buttonTable");
  removeButton.addEventListener("click", function () {
    var index = cartItems.indexOf(product);
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    location.reload();
  });

  var trash = document.createElement("i");
  trash.setAttribute("class", "fa fa-trash-o");
  trash.setAttribute("style", "color:red;font-size:30px;");
  removeButton.appendChild(trash);

  removeTd.appendChild(removeButton);
  tr.appendChild(removeTd);

  cartTableTaart.appendChild(tr);
}


totalCost.textContent = "Totale prijs (excl. taarten): € " + total;

submitButton.addEventListener("click", async function (e) {
  e.preventDefault();

  // Check if all fields are filled
  if (
    document.getElementById("name").value == "" ||
    document.getElementById("email").value == "" ||
    document.getElementById("phone").value == "" ||
    document.getElementById("address").value == ""
  ) {
    alert("Vul alle velden correct in");
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
    ["Levering", document.getElementById("leveren").value],
    ["Ophalen", document.getElementById("ophalen").value],
    ["Adres/Ophaaluur", document.getElementById("address").value],
    ["Opmerking", document.getElementById("opmerking").value],
    ["Product", formattedCartData],
    ["Taart", formattedCartDataTaart],
  ];

  // Send the data to Google Sheets API
  var url = "https://sheetdb.io/api/v1/ytdi2i160aaco";
  var result = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [Object.fromEntries(data)],
    }),
  });

  cartItems = [];
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Clear the cart
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  // Redirect to the confirmation page
  window.open("bevestiging.html", "_self");
});
