const STORAGE_KEY_FAV = 'listaFavoritos';
const PRODUCTOS_CATALOGO = [
    // ESCRITORIOS
    { id: 1, nombre: 'ESCRITORIO MINIMALISTA PRIME', fecha: '2024-02-28', imagen: 'assets/imagenes/Cat_Escritorio-minimalista.jpg', popularidad: 600, precio: 375, categoria: 'Escritorio', color: 'Madera', puntuacion: 4.8 }, 
    { id: 3, nombre: 'STAND DE ESCRITORIO NEGRO', fecha: '2025-06-12', imagen: 'assets/imagenes/Cat_Stand-escritorio.jpg', popularidad: 450, precio: 200, categoria: 'Otros', color: 'Negro', puntuacion: 4.5 },
    { id: 5, nombre: 'ESCRITORIO PARA NIÑOS', fecha: '2025-09-23', imagen: 'assets/imagenes/Cat_Escritorio-para-niños.jpg', popularidad: 50, precio: 450, categoria: 'Escritorio', color: 'Blanco', puntuacion: 3.9 },
    { id: 11, nombre: 'ESCRITORIO MINIMALISTA', fecha: '2025-09-22', imagen: 'assets/imagenes/Cat_Escritorio-minimalista.jpg', popularidad: 400, precio: 350, categoria: 'Escritorio', color: 'Madera', puntuacion: 4.2 }, 
    // ARMARIOS
    { id: 2, nombre: 'ARMARIO MODERNO DE PINO', fecha: '2025-09-11', imagen: 'assets/imagenes/Cat_Armario-moderno-pino.jpg', popularidad: 420, precio: 2000, categoria: 'Armario', color: 'Madera', puntuacion: 4.7 },
    { id: 13, nombre: 'ARMARIO BELLA Y BESTIA', fecha: '2024-01-15', imagen: 'assets/imagenes/Fav_Articulo-1.jpg', popularidad: 800, precio: 1000, categoria: 'Armario', color: 'Madera', puntuacion: 5.0 },
    { id: 14, nombre: 'ARMARIO EMPOTRADO BLANCO', fecha: '2024-03-10', imagen: 'assets/imagenes/Cat_Armario-blanco.jpg', popularidad: 300, precio: 1230, categoria: 'Armario', color: 'Blanco', puntuacion: 4.1 },
    { id: 15, nombre: 'ARMARIO RÚSTICO MACIZO', fecha: '2024-04-05', imagen: 'assets/imagenes/Cat_Armario-rustico-madero-maciza.jpg', popularidad: 500, precio: 2350, categoria: 'Armario', color: 'Madera', puntuacion: 4.6 },
    // CAMAS Y DORMITORIO
    { id: 4, nombre: 'CAMA MATRIMONIAL', fecha: '2024-02-27', imagen: 'assets/imagenes/Cat_Cama-matromonial.jpg', popularidad: 130, precio: 1500, categoria: 'Cama', color: 'Gris', puntuacion: 4.0 },
    { id: 9, nombre: 'LITERA BÁSICA DE MADERA', fecha: '2025-06-17', imagen: 'assets/imagenes/Cat_Litera.jpg', popularidad: 30, precio: 900, categoria: 'Cama', color: 'Madera', puntuacion: 3.5 },
    { id: 16, nombre: 'VELADOR RENACENTISTA', fecha: '2024-01-20', imagen: 'assets/imagenes/Fav_Articulo-2.jpg', popularidad: 750, precio: 1000, categoria: 'Otros', color: 'Madera', puntuacion: 4.9 },
    // SOFÁS
    { id: 17, nombre: 'SILLON GRAVITY FALLS', fecha: '2024-02-10', imagen: 'assets/imagenes/Fav_Articulo-3.jpg', popularidad: 680, precio: 2400, categoria: 'Sofa', color: 'Rojo', puntuacion: 4.5 },
    { id: 18, nombre: 'SOFA CONTEMPORÁNEO BLANCO', fecha: '2024-05-15', imagen: 'assets/imagenes/Cat-Sofa-contempóraneo-blanco.jpg', popularidad: 900, precio: 3000, categoria: 'Sofa', color: 'Blanco', puntuacion: 4.7 },
    { id: 19, nombre: 'SOFÁ CHESTERFIELD CUERO', fecha: '2024-05-18', imagen: 'assets/imagenes/Cat_Sofa-cuero-marrón.jpg', popularidad: 950, precio: 9500, categoria: 'Sofa', color: 'Madera', puntuacion: 4.9 },
    { id: 20, nombre: 'SOFÁ DE TELA GRIS', fecha: '2024-06-01', imagen: 'assets/imagenes/Cat_Sofa-tela-gris.jpg', popularidad: 550, precio: 1750, categoria: 'Sofa', color: 'Gris', puntuacion: 4.3 },
    // OTROS
    { id: 6, nombre: 'ESTANTERIA PREMIUM CAOBA', fecha: '2025-06-18', imagen: 'assets/imagenes/Cat_Estanteria-esquina.jpg', popularidad: 70, precio: 600, categoria: 'Otros', color: 'Madera', puntuacion: 3.8 },
    { id: 12, nombre: 'SILLA GAMER NEÓN', fecha: '2025-06-17', imagen: 'assets/imagenes/Cat_Silla-gamer.jpg', popularidad: 150, precio: 800, categoria: 'Silla', color: 'Negro', puntuacion: 4.4 },
    { id: 21, nombre: 'MOUSEPAD MINIMALISTA', fecha: '2024-07-20', imagen: 'assets/imagenes/Cat_Mouse-pad.jpg', popularidad: 400, precio: 87, categoria: 'Otros', color: 'Negro', puntuacion: 4.6 }
];
function obtenerFavoritos() {
    const favoritosJSON = localStorage.getItem(STORAGE_KEY_FAV);
    return favoritosJSON ? JSON.parse(favoritosJSON) : [];
}
function guardarFavoritos(favoritos) {
    localStorage.setItem(STORAGE_KEY_FAV, JSON.stringify(favoritos));
}
function toggleFavoritoDesdeCatalogo(id) {
    let favoritos = obtenerFavoritos();
    const itemIndex = favoritos.findIndex(item => item.id === id);
    const producto = PRODUCTOS_CATALOGO.find(p => p.id === id);
    if (!producto) return;
    if (itemIndex === -1) {
        favoritos.push({ 
            id: producto.id, 
            nombre: producto.nombre, 
            fecha: producto.fecha, 
            imagen: producto.imagen, 
            popularidad: producto.popularidad, 
            isFavorite: true 
        });
        console.log(`Agregado a favoritos: ${producto.nombre}`);
    } else {
        favoritos.splice(itemIndex, 1);
        console.log(`Eliminado de favoritos: ${producto.nombre}`);
    }
    guardarFavoritos(favoritos);
    aplicarFiltrosYRenderizar(); 
}

function filtrarProductos() {
    const textoBusqueda = document.getElementById('filtro-busqueda').value.toLowerCase().trim();
    const categoriaSeleccionada = document.getElementById('filtro-categoria').value;
    const colorSeleccionado = document.getElementById('filtro-color').value;
    const precioMaximo = Number(document.getElementById('filtro-precio').value);
    return PRODUCTOS_CATALOGO.filter(producto => {
        const coincideNombre = producto.nombre.toLowerCase().includes(textoBusqueda);
        const coincideCategoria = categoriaSeleccionada === "" || producto.categoria === categoriaSeleccionada;
        const coincideColor = colorSeleccionado === "" || (producto.color && producto.color === colorSeleccionado);
        const coincidePrecio = producto.precio <= precioMaximo;
        return coincideNombre && coincideCategoria && coincideColor && coincidePrecio;
    });
}

function ordenarProductos(productos) {
    const opcionOrden = document.getElementById('orden-catalogo').value;
    const listaOrdenada = [...productos];
    switch (opcionOrden) {
        case 'ultimos': 
            listaOrdenada.sort((a, b) => b.fecha.localeCompare(a.fecha));
            break;
        case 'antiguos': 
            listaOrdenada.sort((a, b) => a.fecha.localeCompare(b.fecha));
            break;
        case 'populares': 
            listaOrdenada.sort((a, b) => b.popularidad - a.popularidad);
            break;
        case 'barato': 
            listaOrdenada.sort((a, b) => a.precio - b.precio);
            break;
        case 'caro':
            listaOrdenada.sort((a, b) => b.precio - a.precio);
            break;
    }
    return listaOrdenada;
}

/** 
@param {number} puntuacion
@returns {string}
 */
function generarEstrellas(puntuacion) {
    const estrellasCompletas = Math.round(puntuacion); 
    let htmlEstrellas = '';
    for (let i = 0; i < estrellasCompletas; i++) {
        htmlEstrellas += '<span style="color: gold;">★</span>';
    }
    for (let i = estrellasCompletas; i < 5; i++) {
        htmlEstrellas += '<span style="color: gray;">★</span>';
    }
    
    return htmlEstrellas + ` (${puntuacion.toFixed(1)})`;
}

function renderizarCatalogo(productos) {
    const contenedor = document.getElementById('contenedor-catalogo');
    contenedor.innerHTML = ''; 
    const idsFavoritos = obtenerFavoritos().map(f => f.id);
    if (productos.length === 0) {
        contenedor.innerHTML = '<div style="width:100%; text-align:center; padding: 50px;"><h3>No se encontraron productos con estos filtros.</h3></div>';
        return;
    }
    productos.forEach(producto => {
        const esFavorito = idsFavoritos.includes(producto.id);
        const iconoSrc = esFavorito ? 'assets/imagenes/favorite_complete.png' : 'assets/imagenes/favorite.png';
        const article = document.createElement('article');
        article.className = 'CartaDiseño';
        article.innerHTML = `
            <p class="CartaDiseño_fecha" style="font-size:16px; font-weight: bold;">${producto.categoria} | ${producto.fecha}</p>
            <div class="CartaDiseño_iamgen-contenedor">
                <img class="CartaDiseño_iamgen" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="CartaDiseño_botones-contenedor">
                    <p style="background: rgba(0,0,0,0.5); color: white; padding: 2px 5px; border-radius: 4px;">S/ ${producto.precio}</p>
                    <div class="Rating_Vertical">
                         ${generarEstrellas(producto.puntuacion)}
                    </div>                        
                </div>
            </div>
            <div style="display:flex; justify-content: space-between; align-items: center; margin-top: 5px;">
                <p class="CartaDiseño_reseña">Popularidad: ${producto.popularidad}</p>
                <div style="display:flex; gap: 5px;">
                     <button class="CartaDiseño_boton" onclick="toggleFavoritoDesdeCatalogo(${producto.id})">
                        <img src="${iconoSrc}" alt="Favorito" style="width: 25px; height: 25px;">
                    </button>
                </div>
            </div>
            <p class="CartaDiseño_product_nombre" style="font-size:16px; font-weight: bold;">${producto.nombre}</p>
            <p class="CartaDiseño_precio">Precio: S/${producto.precio}</p>
            <p class="CartaDiseño_IA" style="font-size: 0.8em; color: gray;">Color: ${producto.color}</p>
            <button class="CartaDiseño_agregarCarrito" onclick="agregarAlCarrito('${producto.nombre}', 'S/${producto.precio}')">
                Agregar al carrito
            </button>
        `;
        contenedor.appendChild(article);
    });
}
function aplicarFiltrosYRenderizar() {
    const filtrados = filtrarProductos();
    const ordenados = ordenarProductos(filtrados);
    renderizarCatalogo(ordenados);
}

document.addEventListener('DOMContentLoaded', () => {
    const inputBusqueda = document.getElementById('filtro-busqueda');
    const selectCategoria = document.getElementById('filtro-categoria');
    const selectColor = document.getElementById('filtro-color');
    const inputPrecio = document.getElementById('filtro-precio');
    const labelPrecio = document.getElementById('precio-valor');
    const selectOrden = document.getElementById('orden-catalogo');
    const btnLimpiar = document.getElementById('btn-limpiar');

    inputBusqueda.addEventListener('input', aplicarFiltrosYRenderizar);
    selectCategoria.addEventListener('change', aplicarFiltrosYRenderizar);
    selectColor.addEventListener('change', aplicarFiltrosYRenderizar);
    selectOrden.addEventListener('change', aplicarFiltrosYRenderizar);

    inputPrecio.addEventListener('input', (e) => {
        labelPrecio.textContent = e.target.value; 
        aplicarFiltrosYRenderizar();
    });

    btnLimpiar.addEventListener('click', () => {
        inputBusqueda.value = '';
        selectCategoria.value = '';
        selectColor.value = '';
        inputPrecio.value = 10000;
        selectOrden.value = 'ultimos';
        labelPrecio.textContent = '10000';
        aplicarFiltrosYRenderizar();
    });

    aplicarFiltrosYRenderizar();
});

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
        background-color: rgba(0, 0, 0, 0.5);
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
            /* Estilos de Centrado con TRANSFORM */
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            /* Estilos de Apariencia de la Tarjeta */
            text-align: center; 
            padding: 20px; 
            width: 90%; 
            max-width: 400px; 
            border: 2px solid #000000;
            border-radius: 20px;
            background-color: #f5f5f5; 
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
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
                Continuar
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