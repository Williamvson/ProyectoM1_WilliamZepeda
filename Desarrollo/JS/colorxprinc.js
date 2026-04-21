
function generarColorHexadecimal() {
    const caracteres = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * 16);
        color += caracteres[indiceAleatorio];
    }

    return color;
}

function crearColores() {
    const inputCantidad = document.getElementById("cantidad");
    const contenedor = document.getElementById("contenedorColores");
    const cantidad = parseInt(inputCantidad.value, 10);

    contenedor.innerHTML = "";

    if (isNaN(cantidad) || cantidad < 1 || cantidad > 9) {
        contenedor.innerHTML = "<p>Ingresa una cantidad entre 1 y 9.</p>";
        return;
    }

    for (let i = 0; i < cantidad; i++) {
        const color = generarColorHexadecimal();

        const tarjetaColor = document.createElement("div");
        tarjetaColor.style.backgroundColor = color;
        tarjetaColor.style.width = "120px";
        tarjetaColor.style.height = "120px";
        tarjetaColor.style.display = "inline-flex";
        tarjetaColor.style.alignItems = "center";
        tarjetaColor.style.justifyContent = "center";
        tarjetaColor.style.margin = "10px";
        tarjetaColor.style.borderRadius = "12px";
        tarjetaColor.style.fontWeight = "bold";
        tarjetaColor.style.color = "#ffffff";
        tarjetaColor.textContent = color;

        contenedor.appendChild(tarjetaColor);
    }
}