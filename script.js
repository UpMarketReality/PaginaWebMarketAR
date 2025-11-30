let cart = JSON.parse(localStorage.getItem("cart")) || {};

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

console.log("Carrito cargado ✅");

// Ejemplo para detectar clicks en botones
const buttons = document.querySelectorAll(".btn-green");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        alert("Oferta aceptada ✅");
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

// ====== "CARRITO INTERACTIVO: AÑADIR/ELIMINAR PRODUCTO" ======

// Cambiar cantidad
function changeQty(id, amount) {
    const item = document.querySelector(`.cart-item[data-id="${id}"]`);
    if (!item) return;

    const priceText = item.querySelector(".price").innerText.replace("S/ ", "");
    if (!cart[id]) {
        cart[id] = {
            quantity: 0,
            price: parseFloat(priceText)
        };
    }

    cart[id].quantity += amount;

    if (cart[id].quantity <= 0) {
        removeFromCart(id);
        return;
    }

    saveCart();
    renderCart();
}

function removeFromCart(id) {
    delete cart[id];
    saveCart();

    const itemEl = document.querySelector(`.cart-item[data-id="${id}"]`);
    if (itemEl) itemEl.remove();

    renderCart();
}

function calculateTotal() {
    let total = 0;
    Object.values(cart).forEach(item => {
        total += item.price * item.quantity;
    });
    return total.toFixed(2);
}

function renderCart() {
    Object.keys(cart).forEach(id => {
        const qtyEl = document.getElementById(`qty-${id}`);
        if (qtyEl) qtyEl.innerText = cart[id].quantity;
    });

    const totalEl = document.getElementById("cart-total");
    if (totalEl) totalEl.innerText = calculateTotal();
}

renderCart();

