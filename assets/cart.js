// assets/cart.js

document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();

  const vaciarBtn = document.getElementById("vaciar-carrito");
  if (vaciarBtn) {
    vaciarBtn.addEventListener("click", () => {
      localStorage.removeItem("carrito");
      mostrarCarrito();
    });
  }
});

function mostrarCarrito() {
  const contenedor = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (!contenedor || !totalEl) return;

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalEl.textContent = "";
    return;
  }

  contenedor.innerHTML = carrito.map(item => `
    <div class="item" style="margin-bottom: 1rem;">
      <p><strong>${item.name}</strong> — $${item.price.toLocaleString()} × ${item.quantity}</p>
      <button onclick="eliminarItem('${item.id}')">Eliminar</button>
    </div>
  `).join("");

  const total = carrito.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalEl.textContent = `Total: $${total.toLocaleString()}`;
}

function eliminarItem(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.filter(item => item.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}
