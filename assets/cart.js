// js/cart.js

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <h3>${item.name}</h3>
      <p>Precio: $${item.price}</p>
      <p>Cantidad: ${item.quantity}</p>
      <button onclick="removeFromCart('${item.id}')">Eliminar</button>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalElement.textContent = `Total: $${total}`;
});

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload(); // recarga la página para actualizar la vista
}
