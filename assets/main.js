// assets/main.js

document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".add-to-cart");

  botones.forEach(boton => {
    boton.addEventListener("click", e => {
      const btn = e.target;
      const producto = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        quantity: 1
      };
      agregarAlCarrito(producto);
    });
  });
});

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existente = carrito.find(item => item.id === producto.id);
  if (existente) {
    existente.quantity++;
  } else {
    carrito.push(producto);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${producto.name} agregado al carrito 🛒`);
}
