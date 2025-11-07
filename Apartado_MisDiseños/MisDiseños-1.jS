// --- 1. DATOS DE SIMULACIÓN Y CONFIGURACIÓN INICIAL ---
// Simulación de los datos de diseños (lo que vendría de una API o base de datos)
const designsData = [
    { id: 1, name: "SILLÓN CÓMODO DE GABRIELA", date: "26-02-2024", isFavorite: true, image: "Imagenes/Fav_Articulo-1.jpg" },
    { id: 2, name: "VELADOR RENACENTISTA DE CAOBA", date: "22-09-2025", isFavorite: true, image: "Imagenes/Fav_Articulo-2.jpg" },
    { id: 3, name: "COMODA MODERNA DE CEREZO", date: "17-06-2025", isFavorite: true, image: "Imagenes/Fav_Articulo-3.jpg" },
    { id: 4, name: "MESA DE NOCHE VINTAGE", date: "10-01-2024", isFavorite: false, image: "Imagenes/Fav_Articulo-1.jpg" },
    { id: 5, name: "BANCO RÚSTICO DE MADERA", date: "05-11-2025", isFavorite: true, image: "Imagenes/Fav_Articulo-2.jpg" },
    { id: 6, name: "ESTANTE GEOMÉTRICO", date: "01-03-2024", isFavorite: false, image: "Imagenes/Fav_Articulo-3.jpg" },
    { id: 7, name: "SOFÁ MINIMALISTA", date: "15-05-2025", isFavorite: true, image: "Imagenes/Fav_Articulo-1.jpg" },
    { id: 8, name: "ESCRITORIO ERGONÓMICO", date: "30-10-2025", isFavorite: false, image: "Imagenes/Fav_Articulo-2.jpg" },
    { id: 9, name: "CAMA QUEEN TAPIZADA", date: "12-04-2024", isFavorite: true, image: "Imagenes/Fav_Articulo-3.jpg" },
    { id: 10, name: "ARMARIO MODULAR", date: "20-07-2025", isFavorite: false, image: "Imagenes/Fav_Articulo-1.jpg" },
];

// Variables de estado
let currentPage = 1;
const itemsPerPage = 6; // Se define la cantidad de diseños por página para la paginación

// Referencias a los elementos del DOM
const mainContainer = document.querySelector('.Favoritos_contenedor');
const searchInput = document.querySelector('.BarraBusqueda_entrada');
const sortBarraBusqueda = document.querySelector('.BarraBusqueda_selector');
const paginationContainer = document.querySelector('.Pagina_links');
// Se asume que el selector .Favoritos_selector se usa para filtrar o sincronizarse con el de la barra de búsqueda.
const sortFavoritos = document.querySelector('.Favoritos_selector'); 


// --- 2. FUNCIONES DE UTILIDAD ---

/**
 * Convierte una cadena de fecha "DD-MM-YYYY" a un objeto Date para facilitar la comparación.
 * @param {string} dateStr La cadena de fecha en formato DD-MM-YYYY.
 * @returns {Date} Objeto Date.
 */
const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
};

/**
 * Crea el elemento HTML de una tarjeta de diseño (CartaDiseño).
 * @param {Object} design El objeto de diseño.
 * @returns {HTMLElement} El elemento <article> de la tarjeta.
 */
const createDesignCard = (design) => {
    const card = document.createElement('article');
    card.classList.add('CartaDiseño');
    card.dataset.id = design.id; 
    
    // Configuración del botón de favorito
    const favoriteButtonClass = design.isFavorite ? 'CartaDiseño_boton CartaDiseño_boton--favorito-activo' : 'CartaDiseño_boton';
    const favoriteState = design.isFavorite ? 'true' : 'false';

    card.innerHTML = `
        <p class="CartaDiseño_fecha">FECHA: ${design.date}</p>
        <div class="CartaDiseño_iamgen-contenedor">
            <img class="CartaDiseño_iamgen" src="${design.image}" alt="Imagen del diseño ${design.name}">
            <div class="CartaDiseño_botones-contenedor">
                <button class="CartaDiseño_boton CartaDiseño_boton--compartir" data-action="share">
                    <img src="Imagenes/Fav_Icono-Compartir.png" alt="Icono de compartir">   
                </button>
                <button class="CartaDiseño_boton CartaDiseño_boton--eliminar" data-action="delete">
                    <img src="Imagenes/Fav_Icono-Eliminar.png" alt="Icono de eliminar">   
                </button>
                <button class="${favoriteButtonClass}" data-action="favorite" data-favorite-state="${favoriteState}">
                    <img src="Imagenes/Fav_Icono-Favorito.png" alt="Icono de favorito">   
                </button>
            </div>
        </div>
        <p class="CartaDiseño_product_nombre">${design.name}</p>
    `;
    
    return card;
};

// --- 3. LÓGICA DE FILTRADO, ORDENAMIENTO Y RENDERIZADO ---

/**
 * Filtra, ordena, pagina y renderiza la lista de diseños.
 */
const renderDesignList = () => {
    let filteredAndSortedDesigns = [...designsData];
    
    // A. Filtrado por Búsqueda
    const searchText = searchInput.value.toLowerCase();
    if (searchText) {
        filteredAndSortedDesigns = filteredAndSortedDesigns.filter(design => 
            design.name.toLowerCase().includes(searchText) || 
            design.date.includes(searchText)
        );
    }
    
    // B. Ordenamiento
    // Se usa el selector de la barra de búsqueda (o el de favoritos si se prefiere)
    const sortValue = sortBarraBusqueda.value; 
    
    switch (sortValue) {
        case 'antiguos':
            // Ordena por la fecha más antigua (menor fecha)
            filteredAndSortedDesigns.sort((a, b) => parseDate(a.date) - parseDate(b.date));
            break;
        case 'populares':
            // Ordena por popularidad (simulado por ID descendente)
            filteredAndSortedDesigns.sort((a, b) => b.id - a.id); 
            break;
        case 'ultimos': 
        default:
            // Por defecto, ordena por la fecha más reciente (mayor fecha)
            filteredAndSortedDesigns.sort((a, b) => parseDate(b.date) - parseDate(a.date));
            break;
    }

    // El selector de "Favoritos" podría servir para un filtrado adicional (ej: "Ver solo favoritos")
    if (sortFavoritos.value === 'favoritos') {
         filteredAndSortedDesigns = filteredAndSortedDesigns.filter(design => design.isFavorite);
    }
    
    // C. Paginación
    const totalPages = Math.ceil(filteredAndSortedDesigns.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const designsToRender = filteredAndSortedDesigns.slice(startIndex, endIndex);

    // D. Renderizado de Tarjetas
    mainContainer.innerHTML = '';
    if (designsToRender.length === 0) {
        mainContainer.innerHTML = '<p style="width: 100%; text-align: center; margin-top: 50px;">No se encontraron diseños que coincidan con los criterios de búsqueda o filtro.</p>';
    } else {
        designsToRender.forEach(design => {
            mainContainer.appendChild(createDesignCard(design));
        });
    }

    // E. Actualizar Paginación
    renderPagination(totalPages);
};

// --- 4. LÓGICA DE PAGINACIÓN ---

/**
 * Renderiza y maneja los enlaces de paginación.
 * @param {number} totalPages El número total de páginas disponibles.
 */
const renderPagination = (totalPages) => {
    if (!paginationContainer) return;

    paginationContainer.innerHTML = ''; 

    // Botón "Anterior"
    const prevLink = document.createElement('a');
    prevLink.href = '#';
    prevLink.classList.add('Pagina_link', 'Pagina_link--prev');
    if (currentPage === 1) prevLink.classList.add('Pagina_link--disabled');
    prevLink.textContent = '◄ Anterior';
    prevLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderDesignList();
        }
    });
    paginationContainer.appendChild(prevLink);

    // Enlaces de números de página
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.classList.add('Pagina_link');
        if (i === currentPage) pageLink.classList.add('Pagina_link--active');
        pageLink.textContent = i;
        pageLink.dataset.page = i;
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            renderDesignList();
        });
        paginationContainer.appendChild(pageLink);
    }

    // Botón "Siguiente"
    const nextLink = document.createElement('a');
    nextLink.href = '#';
    nextLink.classList.add('Pagina_link', 'Pagina_link--next');
    if (currentPage === totalPages || totalPages === 0) nextLink.classList.add('Pagina_link--disabled');
    nextLink.textContent = 'Siguiente ►';
    nextLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderDesignList();
        }
    });
    paginationContainer.appendChild(nextLink);
};

// --- 5. LÓGICA DE ACCIONES DE TARJETA ---

/**
 * Maneja las acciones de los botones dentro de cada CartaDiseño (Compartir, Eliminar, Favorito).
 * Se usa delegación de eventos en el contenedor principal.
 * @param {Event} e Evento de click.
 */
const handleCardActions = (e) => {
    const button = e.target.closest('.CartaDiseño_boton');
    if (!button) return;

    const action = button.dataset.action;
    const card = button.closest('.CartaDiseño');
    const designId = parseInt(card.dataset.id);
    const designIndex = designsData.findIndex(d => d.id === designId);

    if (designIndex === -1) return; 

    switch (action) {
        case 'share':
            // Simulación de compartir (se puede reemplazar por la API Web Share)
            alert(`Compartiendo diseño: ${designsData[designIndex].name}`);
            break;
            
        case 'delete':
            // Eliminar diseño (requiere confirmación)
            if (confirm(`¿Estás seguro de que quieres ELIMINAR PERMANENTEMENTE el diseño: ${designsData[designIndex].name}?`)) {
                // Eliminar del array de datos
                designsData.splice(designIndex, 1);
                // Re-renderizar la lista
                renderDesignList();
            }
            break;
            
        case 'favorite':
            // Alternar estado de favorito
            designsData[designIndex].isFavorite = !designsData[designIndex].isFavorite;
            
            // Actualizar la clase y el estado en el DOM para reflejar el cambio visual
            button.classList.toggle('CartaDiseño_boton--favorito-activo');
            button.dataset.favoriteState = designsData[designIndex].isFavorite ? 'true' : 'false';
            
            alert(`El diseño ${designsData[designIndex].name} ha sido marcado como ${designsData[designIndex].isFavorite ? 'Favorito' : 'No Favorito'}.`);
            // Re-renderizar para aplicar filtros/ordenamientos
            renderDesignList();
            break;
    }
};


// --- 6. INICIALIZACIÓN Y EVENT LISTENERS PRINCIPALES ---

document.addEventListener('DOMContentLoaded', () => {
    // Escuchadores para la búsqueda y el ordenamiento (re-renderiza la lista)
    searchInput.addEventListener('input', () => {
        currentPage = 1; // Volver a la primera página al cambiar la búsqueda
        renderDesignList();
    });
    
    // Escuchadores para los selectores de ordenamiento
    sortBarraBusqueda.addEventListener('change', () => {
        currentPage = 1;
        renderDesignList();
    });

    sortFavoritos.addEventListener('change', () => {
        currentPage = 1;
        renderDesignList(); // Llama a la función que aplica todos los filtros y ordenamientos
    });


    // Escuchador de eventos para las acciones de las tarjetas (Delegación de eventos)
    mainContainer.addEventListener('click', handleCardActions);

    // Cargar la lista inicial de diseños al cargar la página
    renderDesignList();
});