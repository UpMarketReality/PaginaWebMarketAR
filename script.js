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

//Funcionalidad del chatbox

const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("chat-send");

// Preguntas guiadas del formulario
const questions = [
  {
    id: "descripcion",
    text: "1. Describe brevemente tu mueble ideal:",
    type: "text"
  },
  {
    id: "categoria",
    text: "2. ¿Qué categoría prefieres?",
    type: "options",
    options: ["Mesa", "Sofá", "Cocina", "Armario", "Escritorio"]
  },
  {
    id: "estilo",
    text: "3. Selecciona un estilo:",
    type: "options",
    options: ["Moderno", "Minimalista", "Industrial", "Rústico", "Vintage"]
  },
  {
    id: "material",
    text: "4. ¿Qué material prefieres?",
    type: "options",
    options: ["Madera", "Metal", "Plástico", "Bambú", "Vidrio"]
  }
];

let currentQuestion = 0;
let userResponses = {};

// Mostrar mensaje
function addMessage(text, isUser = false) {
  const msg = document.createElement("div");
  msg.classList.add("chat-msg");
  if (isUser) msg.classList.add("user");
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Mostrar opciones para preguntas tipo botón
function showOptions(options) {
  options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = option;

    btn.onclick = () => {
      userResponses[questions[currentQuestion].id] = option;
      addMessage(option, true);
      nextQuestion();
    };

    chatMessages.appendChild(btn);
  });
}

// Mostrar siguiente pregunta
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    addMessage("🎉 ¡Listo! Ya tengo toda la información. Generando diseño…");
    console.log("PROMPT FINAL:", userResponses);
    return;
  }

  const q = questions[currentQuestion];
  addMessage(q.text);

  if (q.type === "options") {
    showOptions(q.options);
  }
}

// Enviar respuesta escrita
sendBtn.addEventListener("click", () => {
  const value = chatInput.value.trim();
  if (value === "") return;

  const q = questions[currentQuestion];
  
  userResponses[q.id] = value;
  addMessage(value, true);

  chatInput.value = "";
  nextQuestion();
});

// Inicia el chat
addMessage("👋 Hola, diseñemos tu mueble con IA.");
addMessage(questions[0].text);
