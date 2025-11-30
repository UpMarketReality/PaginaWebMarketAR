function agregarAlCarrito(nombreProducto, precioProducto) {
    const confirmacion = confirm("¿Estás seguro de que deseas añadir este producto?");
    if (!confirmacion) {
        return;
    }
    const modalResumen = document.getElementById('modal-resumen');
    modalResumen.style.cssText = `
        display: block;                 
        position: fixed;               
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        z-index: 1000;                 
        background-color: #0000009d;
    `;

    modalResumen.innerHTML = `
        <span class="cerrar-modal" onclick="cerrarModal()" 
            style="
                position: absolute; 
                top: 15px; 
                right: 35px; 
                color: #f1f1f1; 
                font-size: 40px; 
                font-weight: bold; 
                cursor: pointer;
            ">&times;</span>

        <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center; 
            padding: 20px; 
            width: 90%; 
            max-width: 400px; 
            border: 2px solid #000000;
            border-radius: 20px;
            background-color: #f5f5f5; 
            box-shadow: 0 4px 8px #00000040;
        ">
            <h3>✅ ¡Producto Añadido!</h3>
            <p style="margin: 5px 0;"><strong>Producto:</strong> ${nombreProducto}</p>
            <p style="margin: 5px 0;"><strong>Precio:</strong> ${precioProducto}</p>
            <p style="margin-top: 15px; color: #2980b9;">¡Ahora puedes seguir comprando!</p>
            
            <hr style="border-top: 1px solid #ccc; margin: 15px 0;">
            
            <button 
                onclick="cerrarModal()" 
                style="
                    background-color: #e74c3c; 
                    color: white; 
                    border: none; 
                    padding: 8px 15px; 
                    margin-top: 10px; 
                    cursor: pointer;
                    border-radius: 5px;
                "
            >
                Quitar de este Resumen
            </button>
        </div>
    `;
}

function cerrarModal() {
    document.getElementById('modal-resumen').style.display = 'none';
}

window.addEventListener('click', function(event) {
    const modalResumen = document.getElementById('modal-resumen');
    if (event.target == modalResumen) {
        cerrarModal();
    }
});