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
    removeTd.style.height = "25px";
    var removeButton = document.createElement("button");
    // removeButton.textContent = "🗑️";
    removeButton.setAttribute("class", "buttonTable");
    removeButton.addEventListener("click", function() {
      var index = cart.indexOf(product);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    });

    var trash = document.createElement("i");
    trash.setAttribute("class", "fa fa-trash-o");
    trash.setAttribute("style", "color:red;font-size:30px;");
    removeButton.appendChild(trash);

    // var svgCode = '<svg xmlns="http://www.w3.org/2000/svg" height="1px" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ff0000}</style><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>';
    // var trashIcon = document.createElement("div");
    // trashIcon.innerHTML = svgCode;
    // trashIcon.setAttribute("class", "trashIcon");
    // var trashIconImg = document.createElement("img");
    // trashIconImg.setAttribute("src", "../images/trash.png");
    // trashIcon.style.width = "25px";
    // trashIcon.style.height = "15px";
    // trashIcon.appendChild(trashIconImg);
    // removeButton.appendChild(trashIcon);
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
      alert("Vul alle velden correct in");
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
