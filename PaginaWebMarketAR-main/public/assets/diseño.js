const STORAGE_KEY = 'listaFavoritos';

const PRODUCTOS_BASE = [
    { id: 1, nombre: 'ESCRITORIO MINIMALISTA PRIME', fecha: '2024-02-28', imagen: 'assets/imagenes/Cat_Escritorio-minimalista.jpg', popularidad: 600 },
    { id: 2, nombre: 'ARMARIO MODERNO DE PINO MACIZO', fecha: '2025-09-11', imagen: 'assets/imagenes/Cat_Armario-moderno-pino.jpg', popularidad: 420 },
    { id: 3, nombre: 'STAND DE ESCRITORIO NEGRO', fecha: '2025-06-12', imagen: 'assets/imagenes/Cat_Stand-escritorio.jpg', popularidad: 450 },
    { id: 4, nombre: 'CAMA MATRIMONIAL', fecha: '2024-02-27', imagen: 'assets/imagenes/Cat_Cama-matromonial.jpg', popularidad: 130 },
    { id: 5, nombre: 'ESCRITORIO PARA NIÑOS', fecha: '2025-09-23', imagen: 'assets/imagenes/Cat_Escritorio-para-niños.jpg', popularidad: 50 },
    { id: 6, nombre: 'ESTANTERIA PREIMUN DE CAOBA', fecha: '2025-06-18', imagen: 'assets/imagenes/Cat_Estanteria-esquina.jpg', popularidad: 70 },
    { id: 7, nombre: 'ESTANTERÍA DE CEDRO', fecha: '2024-02-26', imagen: 'assets/imagenes/Cat_Estanteria.jpg', popularidad: 200 },
    { id: 8, nombre: 'MESA DE COMEDOR CLÁSICA', fecha: '2025-09-27', imagen: 'assets/imagenes/Cat_Mesa-comedor.jpg', popularidad: 100 },
    { id: 9, nombre: 'LITERA BÁSICA DE MADERA', fecha: '2025-06-17', imagen: 'assets/imagenes/Cat_Litera.jpg', popularidad: 30 },
    { id: 10, nombre: 'MESA DE COMEDOR MADERA CARAMELO', fecha: '2024-02-26', imagen: 'assets/imagenes/Cat_Mesa-comedor-caramelo.jpg', popularidad: 20 },
    { id: 11, nombre: 'ESCRITORIO MINIMALISTA ', fecha: '2025-09-22', imagen: 'assets/imagenes/Cat_Escritorio-minimalista.jpg', popularidad: 400 },
    { id: 12, nombre: 'SILLA GAMER NEGRA Y AZUL NEÓN', fecha: '2025-06-17', imagen: 'assets/imagenes/Cat_Silla-gamer.jpg', popularidad: 150 },
];
function obtenerFavoritos() {
    const favoritosJSON = localStorage.getItem(STORAGE_KEY);
    return favoritosJSON ? JSON.parse(favoritosJSON) : [];
}
function guardarFavoritos(favoritos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos));
}
function actualizarIconoBoton(id, esFavorito) {
    const boton = document.getElementById(`fav-btn-${id}`);
    if (boton) {
        const imagen = boton.querySelector('img');
        if (imagen) {
            imagen.src = esFavorito ? 'assets/imagenes/favorite_complete.png' : 'assets/imagenes/favorite.png';
            imagen.alt = esFavorito ? 'Icono de favorito (relleno)' : 'Icono de favorito (vacío)';
        }
    }
}
function toggleFavorito(id, nombre, fecha, imagen, popularidad) {
    let favoritos = obtenerFavoritos();
    const itemIndex = favoritos.findIndex(item => item.id === id);
    let esFavorito;

    if (itemIndex === -1) {
        const productoBase = PRODUCTOS_BASE.find(p => p.id === id);
        const popularidad = productoBase ? productoBase.popularidad : 0; 
        favoritos.push({ id, nombre, fecha, imagen, popularidad, isFavorite: true });
        esFavorito = true;
        console.log(`Agregado: ${nombre}`);
    } else {
        favoritos.splice(itemIndex, 1); 
        esFavorito = false;
        console.log(`Eliminado: ${nombre}`);
    }
    
    guardarFavoritos(favoritos);
    actualizarListaFavoritos(); 
    actualizarIconoBoton(id, esFavorito); 
}

function ordenarFavoritos(favoritos, opcionOrden) {
    let resultados = [...favoritos];

    switch (opcionOrden) {
        case 'ultimos':
            resultados.sort((a, b) => b.fecha.localeCompare(a.fecha));
            break;
        case 'antiguos':
            resultados.sort((a, b) => a.fecha.localeCompare(b.fecha));
            break;
        case 'populares':
            resultados.sort((a, b) => a.popularidad - b.popularidad);
            break;
        default:
            break;
    }
    return resultados;
}

function actualizarListaFavoritos() {
    const selectorFavoritos = document.querySelector('.Favoritos_selector');
    const opcionOrden = selectorFavoritos ? selectorFavoritos.value : 'ultimos'; 
    let favoritos = obtenerFavoritos();
    const listaOrdenada = ordenarFavoritos(favoritos, opcionOrden);
    renderizarFavoritos(listaOrdenada);
}

function renderizarFavoritos(listaParaRenderizar) {
    const listaElemento = document.getElementById('lista_favoritos_ui');
    let favoritos = listaParaRenderizar || obtenerFavoritos(); 
    if (!listaParaRenderizar) {
        const selectorOrdenFav = document.querySelector('.Favoritos_selector');
        const opcionOrden = selectorOrdenFav ? selectorOrdenFav.value : 'ultimos';
        favoritos = ordenarFavoritos(favoritos, opcionOrden);
    }
    listaElemento.innerHTML = ''; 
    if (favoritos.length === 0) {
        listaElemento.innerHTML = '<p style="color: gray; font-style: italic; margin-left: 20px;">No tienes favoritos guardados.</p>';
        return;
    }
    favoritos.forEach(fav => {
        const li = document.createElement('li');
        li.style.listStyleType = 'none';
        li.innerHTML = `
            <div style="
                background-color: #e5e5e5; 
                padding: 15px; 
                margin-bottom: 20px; 
                border-radius: 10px;
                max-width: 300px;
                font-family: Roboto, sans-serif;
            ">
                
                <p style="
                    text-align: center; 
                    font-weight: bold; 
                    font-size: 1em; 
                    margin: 0 0 10px 0;
                    color: #000000;
                ">
                    FECHA: ${fav.fecha}
                </p>

                <div style="
                    display: flex; 
                    align-items: flex-start;
                    gap: 10px;
                ">
                    <div style="flex-grow: 1;">
                        <img src="${fav.imagen}" 
                             alt="${fav.nombre}" 
                             style="
                                 width: 100%; 
                                 max-height: 230px; 
                                 object-fit: cover;
                                 border-radius: 10px;
                             ">
                    </div>

                    <div style="
                        display: flex; 
                        flex-direction: column; 
                        justify-content: space-between;
                        gap: 15px;
                        padding-top: 10px;
                    ">
                        
                        <button style="background: none; border: none; cursor: pointer; padding: 0;">
                            <img src="assets/imagenes/share.png" alt="Compartir" style="width: 20px; height: 20px;">
                        </button>
                        
                        <button class="btn-eliminar" 
                            style="background: none; border: none; cursor: pointer; padding: 0;">
                            <img src="assets/imagenes/delete.png" alt="Borrar" style="width: 20px; height: 20px;">
                        </button>
                        
                        <button 
                            onclick="toggleFavorito(${fav.id}, '${fav.nombre}', '${fav.fecha}', '${fav.imagen}')" 
                            style="background: none; border: none; cursor: pointer; padding: 0;">
                            <img src="assets/imagenes/favorite_complete.png" alt="Quitar de Favorito (Corazón Rojo)" style="width: 25px; height: 25px;">
                        </button>

                    </div>
                </div>
                
                <p style="
                    text-align: center; 
                    font-size: 0.75em; 
                    font-weight: bold; 
                    margin: 10px 0 0 0;
                    text-transform: uppercase;
                    color: #000000;
                    letter-spacing: 0.1em;
                ">
                    ${fav.nombre}
                </p>

            </div>
        `;
        
        listaElemento.appendChild(li);
    });
}

function filtrarYOrdenarDisenos(textoBusqueda, opcionOrden) {
    let resultados = [...PRODUCTOS_BASE]; 
    const busquedaLower = textoBusqueda.toLowerCase().trim();
    if (busquedaLower) {
        resultados = resultados.filter(producto =>
            producto.nombre.toLowerCase().includes(busquedaLower)
        );
    }
    switch (opcionOrden) {
        case 'ultimos':
            resultados.sort((a, b) => b.fecha.localeCompare(a.fecha));
            break;
        case 'antiguos':
            resultados.sort((a, b) => a.fecha.localeCompare(b.fecha));
            break;
        case 'populares':
            resultados.sort((a, b) => b.popularidad - a.popularidad);
            break;
    }

    return resultados;
}
function actualizarMisDisenos() {
    const textoBusqueda = document.querySelector('.BarraBusqueda_entrada').value;
    const opcionOrden = document.querySelector('.BarraBusqueda_selector').value;
    const productosArenderizar = filtrarYOrdenarDisenos(textoBusqueda, opcionOrden);
    renderizarMisDisenos(productosArenderizar);
}
function renderizarMisDisenos(productos = PRODUCTOS_BASE) { 
    const contenedorDisenos = document.querySelector('.Pagina .Favoritos_contenedor');
    const favoritosMap = obtenerFavoritos().reduce((map, item) => {
        map[item.id] = true;
        return map;
    }, {});
    contenedorDisenos.innerHTML = '';
    if (productos.length === 0) {
        contenedorDisenos.innerHTML = '<p style="color: gray; font-style: italic; margin-left: 20px;">No se encontraron diseños que coincidan con los criterios.</p>';
        return;
    }
    productos.forEach(producto => { 
        const esFavorito = favoritosMap[producto.id] || false;
        const iconoSrc = esFavorito ? 'assets/imagenes/favorite_complete.png' : 'assets/imagenes/favorite.png';   
        const article = document.createElement('article');
        article.className = 'CartaDiseño';
        article.innerHTML = `
            <p class="CartaDiseño_fecha">FECHA: ${producto.fecha}</p>
            <div class="CartaDiseño_iamgen-contenedor">
                <img class="CartaDiseño_iamgen" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="CartaDiseño_botones-contenedor">
                    <button class="CartaDiseño_boton">
                        <img src="assets/imagenes/share.png" alt="Icono de compartir">   
                    </button>
                    <button class="CartaDiseño_boton">
                        <img src="assets/imagenes/delete.png" alt="Icono de eliminar">   
                    </button>
                    <button class="CartaDiseño_boton" id="fav-btn-${producto.id}" 
                        onclick="toggleFavorito(${producto.id}, '${producto.nombre}', '${producto.fecha}', '${producto.imagen}')">
                        <img src="${iconoSrc}" alt="Icono de favorito" style="width: 25px; height: 25px;">
                    </button>
                </div>
            </div>
            <p class="CartaDiseño_product_nombre">${producto.nombre}</p>
        `;
        contenedorDisenos.appendChild(article);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    actualizarListaFavoritos(); 
    actualizarMisDisenos(); 
    const inputBusqueda = document.querySelector('.BarraBusqueda_entrada');
    const selectorOrdenDisenos = document.querySelector('.BarraBusqueda_selector');
    inputBusqueda.addEventListener('input', actualizarMisDisenos);
    selectorOrdenDisenos.addEventListener('change', actualizarMisDisenos);
    const selectorFavoritos = document.querySelector('.Favoritos_selector');
    if (selectorFavoritos) {
        selectorFavoritos.addEventListener('change', actualizarListaFavoritos); 
    }
});