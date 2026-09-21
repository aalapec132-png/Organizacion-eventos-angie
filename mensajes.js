/* ==========================================
   DATOS DE LOS MENSAJES
========================================== */

const mensajes = {

    laura: {
        nombre: "Laura Gómez",
        iniciales: "LG",
        avatar: "morado",
        estado: "nuevo",
        mensaje: "Hola, quisiera información sobre los servicios que manejan para una boda."
    },

    camila: {
        nombre: "Camila Rodríguez",
        iniciales: "CR",
        avatar: "azul",
        estado: "nuevo",
        mensaje: "Hola, quisiera saber si tienen disponibilidad para un evento el próximo mes."
    },

    andrea: {
        nombre: "Andrea Pérez",
        iniciales: "AP",
        avatar: "dorado",
        estado: "respondido",
        mensaje: "Me gustaría cotizar un evento de cumpleaños."
    },

    mariana: {
        nombre: "Mariana Sánchez",
        iniciales: "MS",
        avatar: "rosado",
        estado: "nuevo",
        mensaje: "Quisiera conocer sus paquetes para eventos."
    },

    daniela: {
        nombre: "Daniela Vargas",
        iniciales: "DV",
        avatar: "verde",
        estado: "respondido",
        mensaje: "Muchas gracias por la atención."
    }

};


/* ==========================================
   ELEMENTOS
========================================== */

const mensajesLista = document.querySelectorAll(".mensaje");

const nombreCliente = document.getElementById("nombreCliente");
const avatarCliente = document.getElementById("avatarCliente");
const mensajeCliente = document.getElementById("mensajeCliente");
const conversacion = document.getElementById("conversacion");
const respuesta = document.getElementById("respuesta");
const botonEnviar = document.getElementById("btnEnviar");
const buscador = document.getElementById("buscarMensaje");
const filtros = document.querySelectorAll(".filtro");
const cantidadNuevos = document.getElementById("cantidadNuevos");

let mensajeActual = null;


/* ==========================================
   ABRIR MENSAJES
========================================== */

mensajesLista.forEach(mensaje => {

    mensaje.addEventListener("click", function () {

        mensajesLista.forEach(m => {
            m.classList.remove("seleccionado");
        });

        this.classList.add("seleccionado");

        const id = this.dataset.id;

        mensajeActual = id;

        const datos = mensajes[id];

        if (!datos) return;


        /* Nombre */

        if (nombreCliente) {
            nombreCliente.textContent = datos.nombre;
        }


        /* Avatar */

        if (avatarCliente) {

            avatarCliente.textContent = datos.iniciales;

            avatarCliente.className =
                "avatar grande " + datos.avatar;
        }


        /* Mensaje principal */

        if (mensajeCliente) {
            mensajeCliente.textContent = datos.mensaje;
        }


        /* Conversación */

        if (conversacion) {

            conversacion.innerHTML = `
                <div class="fecha">Hoy</div>

                <div class="burbuja cliente-mensaje">
                    <p>${datos.mensaje}</p>
                    <span>10:32 AM</span>
                </div>
            `;


            /* Si ya fue respondido */

            if (datos.estado === "respondido") {

                conversacion.innerHTML += `
                    <div class="burbuja respuesta">
                        <p>
                            ¡Hola ${datos.nombre.split(" ")[0]}! 💜
                            Gracias por comunicarte con Velvet Studio.
                        </p>
                        <span>10:45 AM</span>
                    </div>
                `;
            }

        }


        /* Marcar como leído */

        if (datos.estado === "nuevo") {

            datos.estado = "respondido";

            this.dataset.estado = "respondido";

            const etiqueta =
                this.querySelector(".etiqueta");

            if (etiqueta) {

                etiqueta.textContent = "Respondido";

                etiqueta.classList.remove("nuevo");

                etiqueta.classList.add("respondido");
            }

            actualizarContador();
        }

    });

});


/* ==========================================
   ENVIAR RESPUESTA
========================================== */

function enviarMensaje() {

    if (!respuesta || !conversacion) return;

    const texto = respuesta.value.trim();

    if (texto === "") {

        alert("Escribe un mensaje antes de enviarlo.");

        return;
    }


    const nuevaBurbuja =
        document.createElement("div");

    nuevaBurbuja.classList.add(
        "burbuja",
        "respuesta"
    );


    const hora =
        new Date().toLocaleTimeString(
            "es-CO",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    nuevaBurbuja.innerHTML = `
        <p>${texto}</p>
        <span>${hora}</span>
    `;


    conversacion.appendChild(nuevaBurbuja);


    respuesta.value = "";


    /* Ir al último mensaje */

    conversacion.scrollTop =
        conversacion.scrollHeight;


    /* Cambiar estado */

    if (mensajes[mensajeActual]) {

        mensajes[mensajeActual].estado =
            "respondido";
    }


    const seleccionado =
        document.querySelector(
            ".mensaje.seleccionado"
        );


    if (seleccionado) {

        seleccionado.dataset.estado =
            "respondido";


        const etiqueta =
            seleccionado.querySelector(".etiqueta");


        if (etiqueta) {

            etiqueta.textContent =
                "Respondido";

            etiqueta.classList.remove("nuevo");

            etiqueta.classList.add("respondido");
        }
    }


    actualizarContador();
}


/* ==========================================
   BOTÓN ENVIAR
========================================== */

if (botonEnviar) {

    botonEnviar.addEventListener(
        "click",
        enviarMensaje
    );
}


/* ==========================================
   CTRL + ENTER
========================================== */

if (respuesta) {

    respuesta.addEventListener(
        "keydown",
        function (e) {

            if (
                e.ctrlKey &&
                e.key === "Enter"
            ) {

                e.preventDefault();

                enviarMensaje();
            }

        }
    );
}


/* ==========================================
   BUSCADOR
========================================== */

if (buscador) {

    buscador.addEventListener(
        "input",
        function () {

            const texto =
                this.value.toLowerCase().trim();


            mensajesLista.forEach(mensaje => {

                const nombre =
                    (mensaje.dataset.nombre || "")
                    .toLowerCase();


                if (nombre.includes(texto)) {

                    mensaje.style.display = "";

                } else {

                    mensaje.style.display = "none";
                }

            });

        }
    );
}


/* ==========================================
   FILTROS
========================================== */

filtros.forEach(filtro => {

    filtro.addEventListener(
        "click",
        function () {

            filtros.forEach(f => {
                f.classList.remove("activo");
            });

            this.classList.add("activo");

            const tipo =
                this.dataset.filtro;


            mensajesLista.forEach(mensaje => {

                const estado =
                    mensaje.dataset.estado;


                if (
                    tipo === "todos" ||
                    estado === tipo
                ) {

                    mensaje.style.display = "";

                } else {

                    mensaje.style.display = "none";
                }

            });

        }
    );

});


/* ==========================================
   CONTADOR
========================================== */

function actualizarContador() {

    let nuevos = 0;


    mensajesLista.forEach(mensaje => {

        if (
            mensaje.dataset.estado === "nuevo"
        ) {

            nuevos++;
        }

    });


    if (cantidadNuevos) {

        cantidadNuevos.textContent = nuevos;
    }
}


actualizarContador();


/* ==========================================
   ELIMINAR MENSAJE
========================================== */

const botonEliminar =
    document.querySelector(".acciones .eliminar");


if (botonEliminar) {

    botonEliminar.addEventListener(
        "click",
        function () {

            const seleccionado =
                document.querySelector(
                    ".mensaje.seleccionado"
                );


            if (!seleccionado) {

                alert(
                    "Primero selecciona un mensaje."
                );

                return;
            }


            const confirmar =
                confirm(
                    "¿Quieres eliminar este mensaje?"
                );


            if (!confirmar) return;


            seleccionado.remove();


            if (nombreCliente) {
                nombreCliente.textContent =
                    "Selecciona un mensaje";
            }


            if (avatarCliente) {

                avatarCliente.textContent = "?";

                avatarCliente.className =
                    "avatar grande morado";
            }


            if (conversacion) {

                conversacion.innerHTML = `
                    <div class="fecha">
                        Selecciona un mensaje para verlo
                    </div>
                `;
            }


            if (respuesta) {
                respuesta.value = "";
            }

        }
    );
}


/* ==========================================
   MARCAR COMO LEÍDO
========================================== */

const botonesAccion =
    document.querySelectorAll(".acciones button");


if (botonesAccion.length > 0) {

    botonesAccion[0].addEventListener(
        "click",
        function () {

            const seleccionado =
                document.querySelector(
                    ".mensaje.seleccionado"
                );


            if (!seleccionado) return;


            seleccionado.dataset.estado =
                "respondido";


            const etiqueta =
                seleccionado.querySelector(
                    ".etiqueta"
                );


            if (etiqueta) {

                etiqueta.textContent =
                    "Respondido";

                etiqueta.classList.remove("nuevo");

                etiqueta.classList.add("respondido");
            }


            if (mensajeActual &&
                mensajes[mensajeActual]) {

                mensajes[mensajeActual].estado =
                    "respondido";
            }


            actualizarContador();

        }
    );
}


/* ==========================================
   ARCHIVAR
========================================== */

if (botonesAccion.length > 1) {

    botonesAccion[1].addEventListener(
        "click",
        function () {

            const seleccionado =
                document.querySelector(
                    ".mensaje.seleccionado"
                );


            if (!seleccionado) return;


            seleccionado.style.opacity = "0.5";


            alert("Mensaje archivado.");

        }
    );
}