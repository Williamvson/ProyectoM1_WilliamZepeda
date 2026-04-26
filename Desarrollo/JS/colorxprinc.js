
let paletaActual = [];
let temporizadorToast;

function mostrarToast(mensaje) {
    const toast = document.getElementById("toastFeedback");

    if (!toast) {
        return;
    }

    clearTimeout(temporizadorToast);
    toast.textContent = mensaje;
    toast.classList.add("visible");

    temporizadorToast = setTimeout(() => {
        toast.classList.remove("visible");
    }, 2200);
}

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

    return generarColor();
}

function crearTarjeta(color, indice, bloqueado = false) {
    const tarjeta = document.createElement("div");

    tarjeta.className = "tarjeta-color";
    tarjeta.style.backgroundColor = color;
    tarjeta.textContent = color;
    tarjeta.dataset.color = color;
    tarjeta.dataset.indice = indice;
    tarjeta.dataset.bloqueado = bloqueado;

    if (bloqueado) {
        tarjeta.classList.add("bloqueada");
    }

    tarjeta.addEventListener("click", () => alternarBloqueo(tarjeta));

    return tarjeta;
}

function alternarBloqueo(tarjeta) {
    const indice = Number(tarjeta.dataset.indice);
    const nuevoEstado = tarjeta.dataset.bloqueado !== "true";
    const color = tarjeta.dataset.color;

    tarjeta.dataset.bloqueado = nuevoEstado;
    tarjeta.classList.toggle("bloqueada", nuevoEstado);

    if (!Number.isNaN(indice) && paletaActual[indice]) {
        paletaActual[indice].bloqueado = nuevoEstado;
    }

    mostrarToast(
        nuevoEstado
            ? `Color ${color} bloqueado en la paleta`
            : `Color ${color} desbloqueado`
    );
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
        mostrarToast("Selecciona 6, 8 o 9 colores para continuar");
        return;
    }

    const nuevaPaleta = [];

    for (let i = 0; i < cantidad; i++) {
        const tarjetaAnterior = paletaActual[i];
        const estaBloqueada = tarjetaAnterior?.bloqueado === true;
        const nuevoColor = estaBloqueada
            ? tarjetaAnterior.color
            : obtenerColorSegunFormato(formato);
        const tarjeta = crearTarjeta(nuevoColor, i, estaBloqueada);

        nuevaPaleta.push({
            color: nuevoColor,
            bloqueado: estaBloqueada
        });
        contenedor.appendChild(tarjeta);
    }

    paletaActual = nuevaPaleta;
    mostrarToast(`Paleta generada con ${cantidad} colores en formato ${formato.toUpperCase()}`);
}
