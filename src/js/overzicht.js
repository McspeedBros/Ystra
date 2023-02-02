var cart = JSON.parse(window.localStorage.getItem("cart")) || [];
var cartTableBody = document.getElementById("cart-table-body");
var totalCost = document.getElementById("total-cost");
var total = 0;
var submitbutton = document.getElementById("submitbutton");
for (var i = 0; i < cart.length; i++) {
  (function(product) {
    var tr = document.createElement("tr");

    var productNameTd = document.createElement("td");
    productNameTd.textContent = product.name;
    tr.appendChild(productNameTd);

    var productQuantityTd = document.createElement("td");
    var quantityForm = document.createElement("form");
    var quantityInput = document.createElement("input");
    quantityInput.setAttribute("type", "number");
    quantityInput.setAttribute("value", product.quantity);
    quantityInput.setAttribute("min", 1);
    quantityInput.setAttribute("step", 1);
    quantityInput.setAttribute("class", "hoeveelheid")
    quantityForm.appendChild(quantityInput);
    productQuantityTd.appendChild(quantityForm);
    tr.appendChild(productQuantityTd);

    var productPriceTd = document.createElement("td");
    productPriceTd.textContent = product.price;
    tr.appendChild(productPriceTd);

    total += parseFloat(product.quantity) * parseFloat(product.price.substring(1));

    var removeTd = document.createElement("td");
    var removeButton = document.createElement("button");
    removeButton.textContent = "Verwijder";
    removeButton.setAttribute("class", "buttonTable");
    removeButton.addEventListener("click", function() {
      var index = cart.indexOf(product);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    });
    removeTd.appendChild(removeButton);
    tr.appendChild(removeTd);

    cartTableBody.appendChild(tr);

    quantityInput.addEventListener("change", function() {
      product.quantity = this.value;
      localStorage.setItem("cart", JSON.stringify(cart));

      // recalculate the total cost
      total = 0;
      for (var j = 0; j < cart.length; j++) {
        total += parseFloat(cart[j].quantity) * parseFloat(cart[j].price.substring(1));
      }
      totalCost.textContent = "Totale prijs: € " + total;
    });
  })(cart[i]);
} 

totalCost.textContent = "Totale prijs: € " + total;

var submitButton = document.getElementById("submitbutton");
 submitButton.addEventListener("click", async function(e) {
    e.preventDefault();
    // Alle velden moeten ingevuld zijn
    if (document.getElementById("name").value == "" || document.getElementById("email").value == "" || document.getElementById("phone").value == "" || document.getElementById("address").value == "") {
      alert("Vul alle correct velden in");
      return;
    }
    await sendDataToGoogleSheets();
    window.open("bevestiging.html", "_self");
 });

async function sendDataToGoogleSheets() {
  var cart = JSON.parse(window.localStorage.getItem("cart")) || [];
  var data = [];
  for (var i = 0; i < cart.length; i++) {
    data.push([
      cart[i].name,
      cart[i].quantity,
      cart[i].price
    ]);
  }

  // Send the data to Google Sheets API
  var url = "https://sheetdb.io/api/v1/ytdi2i160aaco";
  var result = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: [
        {
          "Naam": document.getElementById("name").value,
          "E-mail": document.getElementById("email").value,
          "Telefoonnummer": document.getElementById("phone").value,
          "Levering": document.getElementById("leveren").value,
          "Ophalen": document.getElementById("ophalen").value,
          "Adres/Ophaaluur": document.getElementById("address").value,
          "Opmerking":  document.getElementById("opmerking").value,
          "Product": data

        }
      ]
    })
  });
  console.log(result.status);
}
