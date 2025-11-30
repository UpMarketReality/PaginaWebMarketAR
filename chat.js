// Obtener elementos del DOM
const mensajes = document.getElementById("mensajes");
const input = document.getElementById("input_sms");
const btnEnviar = document.getElementById("btnEnviar");
const btnFAQ = document.getElementById("btnFAQ");
const faqBox = document.getElementById("faqBox");

// DEBUG BÁSICO
console.log("Script del chat cargado");
console.log({ mensajes, input, btnEnviar, btnFAQ, faqBox });

// Si algo no existe, avisamos en consola
if (!mensajes || !input || !btnEnviar || !btnFAQ || !faqBox) {
    console.error("❌ Algún elemento del chat no se encontró. Revisa los IDs en el HTML.");
}

// Respuestas automáticas
const respuestas = {
    precios: "Nuestros precios varían según el modelo disponible.",
    modelos: "Tenemos varios modelos de muebles con diferentes estilos.",
    horario: "Atendemos de lunes a sábado, de 9:00am a 6:00pm.",
    pagos: "Aceptamos Yape, Plin, tarjetas y efectivo.",
    contacto: "Nuestro número de contacto es 999-999-999."
};

// Mostrar / ocultar el panel de preguntas frecuentes
if (btnFAQ && faqBox) {
    btnFAQ.addEventListener("click", () => {
        faqBox.style.display = (faqBox.style.display === "block") ? "none" : "block";
    });
}

// Manejar clic en las preguntas frecuentes
if (faqBox && mensajes) {
    faqBox.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const tipo = e.target.getAttribute("data-tipo");

            // Mensaje del usuario
            agregarMensaje("Consulta: " + e.target.innerText);

            // Respuesta automática
            if (respuestas[tipo]) {
                agregarRespuesta(respuestas[tipo]);
            } else {
                agregarRespuesta("En un momento te brindaremos más información sobre este tema.");
            }

            // Ocultar FAQs después de elegir
            faqBox.style.display = "none";
        }
    });
}

// Enviar mensaje manual desde el input
if (btnEnviar && input) {
    btnEnviar.addEventListener("click", () => {
        const texto = input.value.trim();
        if (texto !== "") {
            agregarMensaje(texto);
            input.value = "";
        }
    });

    // Opción: enviar con ENTER
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            btnEnviar.click();
        }
    });
}

// Función: agregar mensaje del usuario
function agregarMensaje(texto) {
    if (!mensajes) return;
    const div = document.createElement("div");
    div.classList.add("mensaje");
    div.textContent = texto;
    mensajes.appendChild(div);
    mensajes.scrollTop = mensajes.scrollHeight;
}

// Función: agregar respuesta automática
function agregarRespuesta(texto) {
    if (!mensajes) return;
    const div = document.createElement("div");
    div.classList.add("respuesta");
    div.textContent = texto;
    mensajes.appendChild(div);
    mensajes.scrollTop = mensajes.scrollHeight;
}