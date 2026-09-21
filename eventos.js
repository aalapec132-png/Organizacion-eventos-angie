// =======================
// SLIDER PRINCIPAL
// =======================

const slides = document.querySelectorAll(".slides img");
let indice = 0;

function cambiarSlide(){

    if(slides.length === 0) return;

    slides[indice].classList.remove("active");

    indice++;

    if(indice >= slides.length){
        indice = 0;
    }

    slides[indice].classList.add("active");
}

setInterval(cambiarSlide, 3000);

// =======================
// GALERÍA 3D
// =======================

const fotos = document.querySelectorAll(".foto-3d");

const botonAnterior = document.getElementById("anterior");
const botonSiguiente = document.getElementById("siguiente");

let posicionActual = 0;


// =======================
// MOSTRAR GALERÍA
// =======================

function mostrarGaleria() {

    fotos.forEach((foto, indice) => {

        let posicion = indice - posicionActual;

        // Para hacer que la galería sea circular
        if (posicion > Math.floor(fotos.length / 2)) {
            posicion -= fotos.length;
        }

        if (posicion < -Math.floor(fotos.length / 2)) {
            posicion += fotos.length;
        }


        // Limpiamos clases anteriores
        foto.classList.remove(
            "pos0",
            "pos1",
            "pos-1",
            "pos2",
            "pos-2",
            "oculta"
        );


        // Asignamos nueva posición
        if (posicion === 0) {

            foto.classList.add("pos0");

        } else if (posicion === 1) {

            foto.classList.add("pos1");

        } else if (posicion === -1) {

            foto.classList.add("pos-1");

        } else if (posicion === 2) {

            foto.classList.add("pos2");

        } else if (posicion === -2) {

            foto.classList.add("pos-2");

        } else {

            foto.classList.add("oculta");

        }

    });
}


// =======================
// SIGUIENTE
// =======================

function siguienteFoto() {

    posicionActual++;

    if (posicionActual >= fotos.length) {
        posicionActual = 0;
    }

    mostrarGaleria();
}


// =======================
// ANTERIOR
// =======================

function anteriorFoto() {

    posicionActual--;

    if (posicionActual < 0) {
        posicionActual = fotos.length - 1;
    }

    mostrarGaleria();
}


// =======================
// BOTONES
// =======================

botonSiguiente.addEventListener("click", siguienteFoto);

botonAnterior.addEventListener("click", anteriorFoto);


// =======================
// INICIAR
// =======================

mostrarGaleria();


// =======================
// MOVIMIENTO AUTOMÁTICO
// =======================

setInterval(() => {

    siguienteFoto();

}, 4000);

// =======================
// FORMULARIO
// =======================

const formulario = document.getElementById("formulario");

if(formulario){

    formulario.addEventListener("submit", function(e){

        e.preventDefault();

        alert("¡Solicitud enviada correctamente!");

        formulario.reset();

    });

}


// =======================
// GRÁFICA
// =======================

const canvas = document.getElementById("grafica");

if(canvas){

    new Chart(canvas, {

        type:"bar",

        data:{

            labels:[
                "Bodas",
                "Cumpleaños",
                "Empresariales",
                "Graduaciones"
            ],

            datasets:[{

                label:"Eventos realizados",

                data:[18,25,12,20],

                backgroundColor:[
                    "#d4af37",
                    "#7b2cbf",
                    "#3984d8",
                    "#2eaf63"
                ],

                borderRadius:8

            }]

        },

        options:{

            responsive:true,

            plugins:{
                legend:{
                    labels:{
                        color:"#555"
                    }
                }
            },

            scales:{

                y:{
                    beginAtZero:true,
                    ticks:{
                        color:"#666"
                    }
                },

                x:{
                    ticks:{
                        color:"#666"
                    }
                }

            }

        }

    });

}
// ==============================
// PARTÍCULAS DEL FONDO
// ==============================

const contenedorParticulas = document.getElementById("particulas");

for (let i = 0; i < 35; i++) {

    const particula = document.createElement("div");

    particula.classList.add("particula");

    // Posición horizontal aleatoria
    particula.style.left = Math.random() * 100 + "%";

    // Tamaño aleatorio
    const tamaño = Math.random() * 5 + 2;

    particula.style.width = tamaño + "px";
    particula.style.height = tamaño + "px";

    // Velocidad diferente para cada partícula
    particula.style.animationDuration =
        (Math.random() * 15 + 12) + "s";

    // Retraso diferente
    particula.style.animationDelay =
        (Math.random() * 15) + "s";

    contenedorParticulas.appendChild(particula);
}