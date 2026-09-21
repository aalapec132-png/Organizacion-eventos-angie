

//==============================
// BUSCADOR
//==============================

const buscador = document.getElementById("buscar");
const clientes = document.querySelectorAll(".cliente");

buscador.addEventListener("keyup", function () {

    let texto = buscador.value.toLowerCase();

    clientes.forEach(cliente => {

        let contenido = cliente.textContent.toLowerCase();

        if (contenido.includes(texto)) {

            cliente.style.display = "block";

        } else {

            cliente.style.display = "none";

        }

    });

});


//==============================
// MODAL
//==============================

const modal = document.querySelector(".modal");
const cerrar = document.querySelector(".cerrar");
const botones = document.querySelectorAll(".detalle");

botones.forEach(function(boton){

    boton.addEventListener("click",function(){

        modal.style.display="flex";

    });

});

cerrar.addEventListener("click",function(){

    modal.style.display="none";

});

window.addEventListener("click",function(e){

    if(e.target==modal){

        modal.style.display="none";

    }

});


//==============================
// DATOS DE LOS CLIENTES
//==============================

const datos = [

{
nombre:"Laura Gómez",
evento:"Boda Campestre",
fecha:"10 Agosto 2026",
lugar:"Hacienda San José",
descripcion:"Decoración elegante, DJ, fotografía y catering.",
cotizacion:"$9.200.000",
imagen:"boda campestre.png"
},

{
nombre:"Carlos Pérez",
evento:"Cumpleaños",
fecha:"18 Agosto 2026",
lugar:"Hotel Dann",
descripcion:"Decoración temática, animador y sonido.",
cotizacion:"$3.500.000",
imagen:"cumpleaños niño.png"
},

{
nombre:"María Rodríguez",
evento:"Graduación",
fecha:"22 Agosto 2026",
lugar:"Club El Nogal",
descripcion:"Decoración, fotógrafo y buffet.",
cotizacion:"$6.100.000",
imagen:"graduacion.png"
},

{
nombre:"Empresa XYZ",
evento:"Empresarial",
fecha:"30 Agosto 2026",
lugar:"Corferias",
descripcion:"Pantallas LED, sonido y logística.",
cotizacion:"$12.500.000",
imagen:"empresarial.png"
},

{
nombre:"Valentina López",
evento:"15 Años",
fecha:"05 Septiembre 2026",
lugar:"Salón Imperial",
descripcion:"Decoración, DJ, luces y fotografía.",
cotizacion:"$8.700.000",
imagen:"quince.png"
}

];


//==============================
// CAMBIAR DATOS DEL MODAL
//==============================

const foto = document.getElementById("fotoCliente");
const nombre = document.getElementById("nombreCliente");

const tituloEvento = document.querySelector(".contenido-modal h3");
const parrafos = document.querySelectorAll(".contenido-modal p");

botones.forEach((boton,indice)=>{

    boton.addEventListener("click",()=>{

        foto.src = datos[indice].imagen;

        nombre.textContent = datos[indice].nombre;

        tituloEvento.textContent = datos[indice].evento;

        parrafos[0].innerHTML="<strong>Fecha:</strong> "+datos[indice].fecha;

        parrafos[1].innerHTML="<strong>Lugar:</strong> "+datos[indice].lugar;

        parrafos[2].innerHTML="<strong>Descripción:</strong>";

        parrafos[3].textContent=datos[indice].descripcion;

        document.querySelector("table tr:last-child th:last-child").textContent=datos[indice].cotizacion;

    });

});