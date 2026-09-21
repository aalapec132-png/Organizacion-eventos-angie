// ========================================
// GRÁFICA DE EVENTOS MENSUALES
// ========================================

const graficaLineas = document.getElementById("graficaLineas");

if (graficaLineas) {

    new Chart(graficaLineas, {

        type: "line",

        data: {

            labels: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre"
            ],

            datasets: [{

                label: "Eventos realizados",

                data: [
                    8,
                    12,
                    15,
                    11,
                    18,
                    20,
                    17,
                    25,
                    22
                ],

                borderColor: "#cc00ff",

                backgroundColor: "rgba(194, 55, 212, 0.34)",

                borderWidth: 3,

                tension: 0.4,

                fill: true,

                pointBackgroundColor: "#bf41fa",

                pointBorderColor: "#d849fc",

                pointRadius: 5

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    labels: {

                        color: "#080808"

                    }

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "#030303"

                    },

                    grid: {

                        color: "rgba(255,255,255,0.05)"

                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        color: "#080808"

                    },

                    grid: {

                        color: "rgba(255,255,255,0.05)"

                    }

                }

            }

        }

    });

}


// ========================================
// GRÁFICA CIRCULAR
// ========================================

const graficaCircular = document.getElementById("graficaCircular");

if (graficaCircular) {

    new Chart(graficaCircular, {

        type: "doughnut",

        data: {

            labels: [
                "Completados",
                "Pendientes"
            ],

            datasets: [{

                data: [
                    88,
                    12
                ],

                backgroundColor: [
                    "#6e71f1",
                    "#e6cbff"
                ],

                borderColor: "#fbfbfc",

                borderWidth: 3

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        color: "#0a0a0a",

                        padding: 20

                    }

                }

            }

        }

    });

}


// ========================================
// BUSCADOR
// ========================================

const buscador = document.querySelector(".buscador input");

if (buscador) {

    buscador.addEventListener("keyup", function() {

        const texto = buscador.value.toLowerCase();

        const filas = document.querySelectorAll(".tabla tbody tr");

        filas.forEach(function(fila) {

            const contenido = fila.textContent.toLowerCase();

            if (contenido.includes(texto)) {

                fila.style.display = "";

            } else {

                fila.style.display = "none";

            }

        });

    });

}


// ========================================
// NOTIFICACIÓN
// ========================================

const campana = document.querySelector(".usuario i");

if (campana) {

    campana.addEventListener("click", function() {

        alert("Tienes 3 notificaciones nuevas.");

    });

}