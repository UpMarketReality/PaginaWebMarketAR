//MODALES===DINAMiCOS    
function createModal(productData) {
    const modalId = `modal-${productData.id}`;
    
    const modalHTML = `
        <div id="${modalId}" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <div class="modal-product">
                    <div class="modal-product-image">
                        <img id="${modalId}-main-image" src="${productData.images[0]}" alt="${productData.name}">
                        <div class="modal-image-gallery">
                            ${productData.images.map((img, index) => `
                                <img class="modal-thumbnail ${index === 0 ? 'active' : ''}" 
                                     src="${img}" 
                                     alt="${productData.name}"
                                     data-modal="${modalId}">
                            `).join('')}
                        </div>
                    </div>
                    <div class="modal-product-details">
                        <h2>${productData.name}</h2>
                        <p>Autor: ${productData.author}</p>
                        
                        <div class="modal-rating">
                            <span>${productData.rating}</span>
                            <div class="Rating_Vertical">
                                ${[5,4,3,2,1].map(star => `
                                    <input type="radio" name="modal-rating-${productData.id}" 
                                           id="modal-star-${star}-${productData.id}" 
                                           value="${star}" ${star === Math.round(productData.rating) ? 'checked' : ''}>
                                    <label for="modal-star-${star}-${productData.id}" title="${star} estrellas"></label>
                                `).join('')}
                            </div>
                            <span>(${productData.reviews} reseñas)</span>
                        </div>
                        
                        <div class="modal-price">Precio: ${productData.price}</div>
                        
                        <div class="modal-description">
                            <p>${productData.description}</p>
                        </div>
                        
                        <div class="modal-features">
                            <h3>Características:</h3>
                            <ul>
                                ${productData.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <p class="CartaDiseño_IA">IA Aproximación</p>
                        
                        <div class="modal-actions">
                            <button class="modal-button modal-add-cart" data-product="${productData.id}">
                                Agregar al carrito
                            </button>
                            <button class="modal-button modal-buy-now" data-product="${productData.id}">
                                Comprar ahora
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupModalEvents(modalId, productData);
}

function setupModalEvents(modalId, productData) {
    const modal = document.getElementById(modalId);
    const closeBtn = modal.querySelector('.close');
    const thumbnails = modal.querySelectorAll('.modal-thumbnail');
    const mainImage = modal.querySelector(`#${modalId}-main-image`);
    
   
    closeBtn.addEventListener('click', () => closeModal(modalId));
    
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            mainImage.src = this.src;
        });
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modalId);
    });
    
    modal.querySelector('.modal-add-cart').addEventListener('click', () => {
        addToCart(productData);
        closeModal(modalId);
    });
    
    modal.querySelector('.modal-buy-now').addEventListener('click', () => {
        buyNow(productData);
        closeModal(modalId);
    });
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

function addToCart(product) {
    console.log('Producto agregado al carrito:', product);
    alert(`"${product.name}" agregado al carrito`);
}

function buyNow(product) {
    console.log('Comprando producto:', product);
    alert(`Redirigiendo a compra de: "${product.name}"`);
}

document.addEventListener('DOMContentLoaded', function() {

const productsData = [
    {
        id: 1,
        name: "ARMARIO BELLA Y LA BESTIA DE MELANINE",
        author: "Krstll2045",
        rating: 5.7,
        reviews: 328,
        price: "S/1000",
        description: "Inspirado en el clásico de Disney, este armario combina la elegancia del diseño francés con la durabilidad de la melanina. Perfecto para habitaciones temáticas y amantes del cine.",
        features: [
            "Material: Melamina de alta densidad",
            "Dimensiones: 200cm x 120cm x 60cm",
            "Color: Blanco perla con detalles dorados",
            "3 puertas corredizas con sistema suave",
            "Espejo interior de seguridad",
            "Estantes ajustables"
        ],
        images: [
            "assets/imagenes/Fav_Articulo-1.jpg",
            "assets/imagenes/Fav_Articulo-1.jpg",
            "assets/imagenes/Fav_Articulo-1.jpg"
        ]
    },
    {
        id: 2,
        name: "VELADOR RENACENTISTA DE CAOBA",
        author: "Gabrix22",
        rating: 5.7,
        reviews: 328,
        price: "S/1000",
        description: "Velador artesanal tallado en caoba maciza, inspirado en el período renacentista. Cada pieza es única y muestra la maestría de la carpintería tradicional.",
        features: [
            "Madera: Caoba maciza premium",
            "Altura: 65cm",
            "Base: 40cm x 40cm",
            "Acabado: Barniz natural mate",
            "Incluye pantalla de seda",
            "Cable de seguridad incluido"
        ],
        images: [
            "assets/imagenes/Fav_Articulo-2.jpg",
            "assets/imagenes/Fav_Articulo-2.jpg",
            "assets/imagenes/Fav_Articulo-2.jpg"
        ]
    },
    {
        id: 3,
        name: "SILLON - GRAVITY FALLS",
        author: "AnaLim8",
        rating: 5.7,
        reviews: 68,
        price: "S/2400",
        description: "Sillón temático inspirado en la popular serie Gravity Falls. Diseño ergonómico perfecto para gamers y fans de la serie, con detalles únicos del misterioso pueblo.",
        features: [
            "Estructura: Madera de pino reforzada",
            "Tapizado: Tela anti-manchas",
            "Relleno: Espuma memory foam",
            "Incluye cojines temáticos",
            "Soporte lumbar ajustable",
            "Peso máximo: 150kg"
        ],
        images: [
            "assets/imagenes/Fav_Articulo-3.jpg",
            "assets/imagenes/Fav_Articulo-3.jpg",
            "assets/imagenes/Fav_Articulo-3.jpg"
        ]
    },
    {
        id: 4,
        name: "ESCRITORIO MINIMALISTA DE CEDRO",
        author: "Kustkistan",
        rating: 5.7,
        reviews: 28,
        price: "S/375",
        description: "Escritorio moderno y funcional fabricado en cedro natural. Diseño limpio que se adapta a cualquier espacio de trabajo o estudio.",
        features: [
            "Madera: Cedro nacional",
            "Dimensiones: 120cm x 60cm x 75cm",
            "Cajón integrado con cerradura",
            "Patas metálicas reforzadas",
            "Resistente a humedad",
            "Montaje simple en 15min"
        ],
        images: [
            "assets/imagenes/Cat_Escritorio-minimalista.jpg",
            "assets/imagenes/Cat_Escritorio-minimalista.jpg",
            "assets/imagenes/Cat_Escritorio-minimalista.jpg"
        ]
    },
    {
        id: 5,
        name: "STAND PARA ESCRITORIO DE PINO",
        author: "JosePa",
        rating: 5.7,
        reviews: 8,
        price: "S/200",
        description: "Organizador práctico para mantener tu escritorio ordenado. Ideal para laptops, tablets y accesorios de oficina.",
        features: [
            "Material: Pino tratado",
            "Dimensiones: 40cm x 25cm x 15cm",
            "2 niveles ajustables",
            "Ranura para cables",
            "Superficie antideslizante",
            "Peso: 1.5kg"
        ],
        images: [
            "assets/imagenes/Cat_Stand-escritorio.jpg",
            "assets/imagenes/Cat_Stand-escritorio.jpg",
            "assets/imagenes/Cat_Stand-escritorio.jpg"
        ]
    },
    {
        id: 6,
        name: "MOUSEPAD MINIMALISTA DE CUERO SINTÉTICO",
        author: "Youname",
        rating: 5.7,
        reviews: 38,
        price: "S/87",
        description: "Mousepad elegante y duradero con superficie de cuero sintético de alta calidad. Perfecto para uso profesional y gaming.",
        features: [
            "Material: Cuero sintético premium",
            "Dimensiones: 80cm x 30cm",
            "Base antideslizante de goma",
            "Resistente a líquidos",
            "Lavable superficialmente",
            "Espesor: 4mm"
        ],
        images: [
            "assets/imagenes/Cat_Mouse-pad.jpg",
            "assets/imagenes/Cat_Mouse-pad.jpg",
            "assets/imagenes/Cat_Mouse-pad.jpg"
        ]
    },
    {
        id: 7,
        name: "SOFA CONTEMPORÁNEO BLANCO",
        author: "Hawks",
        rating: 4.0,
        reviews: 38,
        price: "S/3000",
        description: "Sofá moderno en color blanco brillante, ideal para salas minimalistas. Diseño escandinavo con máxima comodidad.",
        features: [
            "Estructura: Madera de haya",
            "Tapizado: Tela poliéster lavable",
            "Asientos: Espuma de alta resiliencia",
            "Incluye 4 cojines decorativos",
            "Patas de madera natural",
            "Capacidad: 3 personas"
        ],
        images: [
            "assets/imagenes/Cat-Sofa-contempóraneo-blanco.jpg",
            "assets/imagenes/Cat-Sofa-contempóraneo-blanco.jpg",
            "assets/imagenes/Cat-Sofa-contempóraneo-blanco.jpg"
        ]
    },
    {
        id: 8,
        name: "SOFÁ DE CUERO ESTILO CHESTERFIELD",
        author: "Deniel99",
        rating: 5.7,
        reviews: 2,
        price: "S/9500",
        description: "Elegante sofá estilo Chesterfield en cuero genuino. Pieza clásica que añade distinción y elegancia a cualquier espacio.",
        features: [
            "Cuero: Piel genuina premium",
            "Estructura: Madera de roble",
            "Relleno: Plumas naturales",
            "Color: Marrón clásico",
            "Botones tapizados a mano",
            "Patas de latón pulido"
        ],
        images: [
            "assets/imagenes/Cat_Sofa-cuero-marrón.jpg",
            "assets/imagenes/Cat_Sofa-cuero-marrón.jpg",
            "assets/imagenes/Cat_Sofa-cuero-marrón.jpg"
        ]
    },
    {
        id: 9,
        name: "SOFÁ DE TELA GRIS",
        author: "Sebas99",
        rating: 5.0,
        reviews: 128,
        price: "S/1750",
        description: "Sofá versátil en tela gris, perfecto para espacios modernos. Balance perfecto entre comodidad y diseño contemporáneo.",
        features: [
            "Tapizado: Tela gris anti-manchas",
            "Estructura: Pino reforzado",
            "Asientos: Espuma memory foam",
            "Incluye 2 cojines lumbar",
            "Profundidad: 90cm",
            "Mecanismo reclinable opcional"
        ],
        images: [
            "assets/imagenes/Cat_Sofa-tela-gris.jpg",
            "assets/imagenes/Cat_Sofa-tela-gris.jpg",
            "assets/imagenes/Cat_Sofa-tela-gris.jpg"
        ]
    },
    {
        id: 10,
        name: "ARMARIO EMPOTRADO MODERNO BLANCO",
        author: "Noemi",
        rating: 4.0,
        reviews: 8,
        price: "S/1230",
        description: "Armario empotrado con diseño moderno y acabado en blanco brillante. Maximiza el espacio sin sacrificar estilo.",
        features: [
            "Material: MDF lacado blanco",
            "Dimensiones: A medida",
            "Sistema corredizo suave",
            "Estantes regulables",
            "Barras para colgar",
            "Cajones con rieles suaves"
        ],
        images: [
            "assets/imagenes/Cat_Armario-blanco.jpg",
            "assets/imagenes/Cat_Armario-blanco.jpg",
            "assets/imagenes/Cat_Armario-blanco.jpg"
        ]
    },
    {
        id: 11,
        name: "ARMARIO RÚSTICO DE MADERA MACIZA",
        author: "Naraheli",
        rating: 5.0,
        reviews: 24,
        price: "S/2350",
        description: "Armario rústico fabricado en madera maciza, ideal para cabañas y espacios con estilo campestre o vintage.",
        features: [
            "Madera: Roble macizo natural",
            "Dimensiones: 180cm x 100cm x 55cm",
            "2 puertas batientes",
            "3 estantes fijos",
            "Herrajes antiguos",
            "Acabado envejecido natural"
        ],
        images: [
            "assets/imagenes/Cat_Armario-rustico-madero-maciza.jpg",
            "assets/imagenes/Cat_Armario-rustico-madero-maciza.jpg",
            "assets/imagenes/Cat_Armario-rustico-madero-maciza.jpg"
        ]
    },
    {
        id: 12,
        name: "ARMARIO MODERNO DE PINO",
        author: "Bak",
        rating: 5.0,
        reviews: 18,
        price: "S/2000",
        description: "Armario moderno en pino natural con diseño escandinavo. Funcionalidad y estilo en una sola pieza.",
        features: [
            "Madera: Pino nórdico",
            "Dimensiones: 190cm x 110cm x 58cm",
            "4 puertas corredizas",
            "Sistema interior modular",
            "Patas metálicas ajustables",
            "Compatible con organizadores"
        ],
        images: [
            "assets/imagenes/Cat_Armario-moderno-pino.jpg",
            "assets/imagenes/Cat_Armario-moderno-pino.jpg",
            "assets/imagenes/Cat_Armario-moderno-pino.jpg"
        ]
    }
];
    
   
    productsData.forEach(product => {
        createModal(product);
    });
    
    
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            openModal(`modal-${productId}`);
        });
    });
    
 
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
});
//HASTA AQUI MODALAES DINAMICOS====

