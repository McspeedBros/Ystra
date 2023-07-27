let cartItems = [];

function showSmaak2Dropdown() {
  const aantal_personen = document.getElementById("personen").value;
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

  if (personen >= 10 || personen == "15+") {
    const smaak2 = document.getElementById("smaak2").value;
    const item = {
      personen,
      type,
      smaak1,
      smaak2,
    };

    cartItems.push(item);
    alert("Taart toegevoegd aan winkelwagen!");
    console.log(cartItems);
    updateCart();
    return;
  }

  const item = {
    personen,
    type,
    smaak1,
  };

  cartItems.push(item);
  alert("Taart toegevoegd aan winkelwagen!");
  console.log(cartItems);
  updateCart();
}

function updateCart() {
  const winkelwagenElement = document.getElementById("winkelwagen");
  winkelwagenElement.innerHTML = ""; // Wis de huidige inhoud van de winkelwagen

  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const listItem = document.createElement("li");
    listItem.textContent = `Taart ${i + 1}: ${item.aantal_personen} personen, ${
      item.smaak
    }`;
    if (item.smaak2) {
      listItem.textContent += `, ${item.smaak2}`;
    }
    listItem.textContent += `, ${item.afwerking}`;
    winkelwagenElement.appendChild(listItem);
  }
}
