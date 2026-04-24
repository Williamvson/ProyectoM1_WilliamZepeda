function generarColor() {
    const numerosYletras = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        const posicion = Math.floor(Math.random() * numerosYletras.length);
        color = color + numerosYletras[posicion];
    }

    return color;
}

function generarColorRGB() {
    const rojo = Math.floor(Math.random() * 256);
    const verde = Math.floor(Math.random() * 256);
    const azul = Math.floor(Math.random() * 256);

    return `rgb(${rojo}, ${verde}, ${azul})`;
}

function obtenerColorSegunFormato(formato) {
    if (formato === "rgb") {
        return generarColorRGB();
    }

    if (formato === "hsl") {
        return generarColorHSL();
    }

    return generarColor();
}

function crearColores() {
    const cajaCantidad = document.getElementById("cantidad");
    const cajaFormato = document.getElementById("formatoColor");
    const contenedor = document.getElementById("contenedorColores");
    const cantidad = Number(cajaCantidad.value);
    const formato = cajaFormato.value;
    const opcionesValidas = [6, 8, 9];

    contenedor.innerHTML = "";

    if (isNaN(cantidad) || !opcionesValidas.includes(cantidad)) {
        contenedor.innerHTML = "<p>Elige 6, 8 o 9 colores.</p>";
        return;
    }

    for (let i = 0; i < cantidad; i++) {
        const nuevoColor = obtenerColorSegunFormato(formato);
        const tarjeta = document.createElement("div");

        tarjeta.className = "tarjeta-color";
        tarjeta.style.backgroundColor = nuevoColor;
        tarjeta.textContent = nuevoColor;

        contenedor.appendChild(tarjeta);
    }
}

function decorarTitulos() {
    const titulos = document.querySelectorAll("header h1, header h2, main h1");

    titulos.forEach((titulo) => {
        const texto = titulo.textContent;
        titulo.innerHTML = "";

        for (const letra of texto) {
            const span = document.createElement("span");
            span.className = "letra-color";
            span.innerHTML = letra === " " ? "&nbsp;" : letra;
            titulo.appendChild(span);
        }
    });
}

document.addEventListener("DOMContentLoaded", decorarTitulos);
