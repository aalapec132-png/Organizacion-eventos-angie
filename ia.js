const abrirIA = document.getElementById("abrirIA");
const cerrarIA = document.getElementById("cerrarIA");
const iaChat = document.getElementById("iaChat");
const iaInput = document.getElementById("iaInput");
const iaEnviar = document.getElementById("iaEnviar");
const iaMensajes = document.getElementById("iaMensajes");


// ABRIR IA
abrirIA.addEventListener("click", () => {
    iaChat.classList.add("abierto");
    iaInput.focus();
});


// CERRAR IA
cerrarIA.addEventListener("click", () => {
    iaChat.classList.remove("abierto");
});


// AGREGAR MENSAJE AL CHAT
function agregarMensaje(texto, usuario = false) {

    const mensaje = document.createElement("div");

    mensaje.classList.add("ia-mensaje");

    if (usuario) {

        mensaje.classList.add("usuario");

        mensaje.innerHTML = `
            <div class="ia-burbuja">
                ${texto}
            </div>
        `;

    } else {

        mensaje.innerHTML = `
            <div class="ia-avatar">
                <img src="ia.png" alt="Velvet IA">
            </div>

            <div class="ia-burbuja">
                ${texto}
            </div>
        `;
    }

    iaMensajes.appendChild(mensaje);

    iaMensajes.scrollTop = iaMensajes.scrollHeight;
}


// MOSTRAR "ESCRIBIENDO..."
function mostrarCargando() {

    const mensaje = document.createElement("div");

    mensaje.classList.add("ia-mensaje");
    mensaje.id = "iaCargando";

    mensaje.innerHTML = `
        <div class="ia-avatar">
            <img src="ia.png" alt="Velvet IA">
        </div>

        <div class="ia-burbuja">
            Velvet IA está escribiendo... 💜
        </div>
    `;

    iaMensajes.appendChild(mensaje);

    iaMensajes.scrollTop = iaMensajes.scrollHeight;
}


// QUITAR "ESCRIBIENDO..."
function quitarCargando() {

    const cargando = document.getElementById("iaCargando");

    if (cargando) {
        cargando.remove();
    }
}


// ENVIAR PREGUNTA
async function enviarPregunta() {

    const pregunta = iaInput.value.trim();

    if (!pregunta) {
        return;
    }


    // Mostrar pregunta del usuario
    agregarMensaje(pregunta, true);

    // Limpiar input
    iaInput.value = "";

    // Mostrar carga
    mostrarCargando();


    try {

        const respuesta = await fetch("http://127.0.0.1:5000/preguntar", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                pregunta: pregunta
            })

        });


        const datos = await respuesta.json();

        quitarCargando();

        agregarMensaje(datos.respuesta);


    } catch (error) {

        console.error(error);

        quitarCargando();

        agregarMensaje(
            "No pude conectarme con mi servidor 😭. Revisa que Velvet IA esté funcionando."
        );
    }
}


// BOTÓN ENVIAR
iaEnviar.addEventListener("click", enviarPregunta);


// ENTER PARA ENVIAR
iaInput.addEventListener("keydown", (evento) => {

    if (evento.key === "Enter") {

        evento.preventDefault();

        enviarPregunta();

    }

});