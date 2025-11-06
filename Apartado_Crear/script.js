// ====== BOTÓN "AGREGAR AL CARRITO" ======
const botonCarrito = document.querySelector('.btn-comprar');

botonCarrito.addEventListener('click', () => {
  // muestra un pequeño mensaje
  alert('✅ Producto agregado al carrito correctamente.');

  // vuelve al texto original después de 2 segundos
  setTimeout(() => {
    botonCarrito.textContent = 'Agregar al carrito';
    botonCarrito.style.backgroundColor = '#008060';
  }, 2000);
});