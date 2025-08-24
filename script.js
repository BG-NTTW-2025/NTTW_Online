// script.js

// Functie om product toe te voegen aan de winkelwagen
function voegProductToe(product) {
  let cart = JSON.parse(localStorage.getItem("nttwCart")) || [];

  // Kijken of product al bestaat
  let bestaand = cart.find(item => item.name === product.name);
  if (bestaand) {
    bestaand.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  // Opslaan in localStorage
  localStorage.setItem("nttwCart", JSON.stringify(cart));

  alert(product.name + " is toegevoegd aan je winkelwagen!");
}

// Functie om de winkelwagen te tonen
function renderCart() {
  let cart = JSON.parse(localStorage.getItem("nttwCart")) || [];
  
  let cartContainer = document.getElementById("cart-items");
  let totalContainer = document.getElementById("total");

  if (!cartContainer || !totalContainer) return; // voorkomt fouten op andere pagina's

  cartContainer.innerHTML = ""; // leegmaken
  let totaal = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Je winkelwagen is leeg.</p>";
  } else {
    cart.forEach(item => {
      let itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerHTML = `
        <p>${item.name} (x${item.quantity}) - €${(item.price * item.quantity).toFixed(2)}</p>
      `;
      cartContainer.appendChild(itemDiv);

      totaal += item.price * item.quantity;
    });
  }

  totalContainer.textContent = totaal.toFixed(2);
}

// Automatisch renderen op winkelwagen.html
document.addEventListener("DOMContentLoaded", renderCart);
