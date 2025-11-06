// ====== CAMBIAR IMAGEN PRINCIPAL AL PASAR EL CURSOR ======
const miniaturas = document.querySelectorAll('.miniaturas img');
const imagenPrincipal = document.querySelector('.imagenPrincipal img');

// guardamos la imagen original del producto
const imagenOriginal = imagenPrincipal.src;

miniaturas.forEach(img => {
  // cuando el mouse pasa sobre una miniatura
  img.addEventListener('mouseenter', () => {
    imagenPrincipal.src = img.src;
    imagenPrincipal.style.opacity = 0.6;
    setTimeout(() => imagenPrincipal.style.opacity = 1, 200);
  });

  // cuando el mouse sale de la miniatura
  img.addEventListener('mouseleave', () => {
    imagenPrincipal.src = imagenOriginal;
  });
});

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