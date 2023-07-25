var cart = JSON.parse(window.localStorage.getItem("cart")) || [];
var cartTableBody = document.getElementById("cart-table-body");
var totalCost = document.getElementById("total-cost");
var total = 0;
var submitButton = document.getElementById("submitbutton");

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
  var product = cart[i];
  var tr = document.createElement("tr");

  var categories = ["Basic", "Sorbet", "Nootjes", "Specials", "Yspralines", "Taarten", "Frisco's"];
  var productCategory = "";
  if (product.name == "Velvet Vanilla" || product.name == "Mild Mokka" || product.name == "Soft Stracciatella" || product.name == "Milky Chocolate" || product.name == "Brazil Chocolate" || product.name == "Banana Crazy") {
    productCategory = categories[0];
  } else if (product.name == "Sweet Strawberry" || product.name == "Funky Lemon" || product.name == "Raspberry Red" || product.name == "Tropical Mango" || product.name == "Blueberry Boost") {
    productCategory = categories[1];
  } else if (product.name == "Pure Pistacchio" || product.name == "Piemonte Nuts") {
    productCategory = categories[2];
  } else if (product.name == "Amarena Love" || product.name == "Chef's Favourite Cookie" || product.name == "Mars Delight" || product.name == "Cuberdon Candy") {
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
    totalCost.textContent = "Totale prijs: € " + total;
  });
}

totalCost.textContent = "Totale prijs: € " + total;

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

  // Combine other form data and cart data
  var data = [
    ["Naam", document.getElementById("name").value],
    ["E-mail", document.getElementById("email").value],
    ["Telefoonnummer", document.getElementById("phone").value],
    ["Levering", document.getElementById("leveren").value],
    ["Ophalen", document.getElementById("ophalen").value],
    ["Adres/Ophaaluur", document.getElementById("address").value],
    ["Opmerking", document.getElementById("opmerking").value],
    ["Product", formattedCartData],
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

  // Clear the cart
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  // Redirect to the confirmation page
  window.open("bevestiging.html", "_self");
});
