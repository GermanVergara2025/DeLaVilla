// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(button => {
    button.addEventListener("click", e => {
      const productElement = e.target.closest(".product");
      const product = {
        id: productElement.dataset.id,
        name: productElement.dataset.name,
        price: parseFloat(productElement.dataset.price),
        quantity: 1
      };

      addToCart(product);
    });
  });
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} agregado al carrito`);
}
