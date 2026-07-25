let comprasGlobal = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarCompras();
});

async function cargarCompras() {

    comprasGlobal = await obtenerCompras();

    mostrarCompras(comprasGlobal);

}

async function accionCompra(fila, estado){

if (estado === "Confirmado") {

    const compras = await obtenerCompras();

    const compra = compras.find(c => c.fila == fila);

    if (!compra) {
        alert("No se encontró la compra.");
        return;
    }

    window.location.href =
        `detalle-boletos.html?idCompra=${encodeURIComponent(compra.idCompra)}`;

    return;

}

    const confirmar = confirm("¿Confirmar este pago?");

    if(!confirmar) return;

    await fetch(`${CONFIG.API_URL}?accion=confirmarPago&fila=${fila}`);

    await cargarCompras();

}

function mostrarCompras(compras) {

    const tabla = document.getElementById("tablaCompras");

    tabla.innerHTML = "";

    compras.forEach(compra => {

        let colorEstado = "warning";

        if (compra.estado === "Confirmado") colorEstado = "success";
        if (compra.estado === "Rechazado") colorEstado = "danger";

        const textoBoton =
            compra.estado === "Confirmado"
                ? "🎟 Ver boletos"
                : "✓ Confirmar";

        tabla.innerHTML += `
        <tr>

            <td>
                <span class="badge bg-${colorEstado}">
                    ${compra.estado}
                </span>
            </td>

            <td><strong>${compra.comprador}</strong></td>

            <td>${compra.telefono}</td>

            <td>
                <span class="badge-boletos">
                    🎟 ${compra.cantidad}
                </span>
            </td>

            <td>@${compra.instagram.replace("@","")}</td>

            <td class="text-end">

                <button
                    class="btn-raisare"
                    onclick="accionCompra(${compra.fila}, '${compra.estado}')">

                    ${textoBoton}

                </button>

                

            </td>

        </tr>
        `;

    });

}

const buscador = document.getElementById("buscador");

buscador.addEventListener("input", () => {

    const texto = buscador.value.toLowerCase().trim();

const filtradas = comprasGlobal.filter(compra => {

    return (
        String(compra.comprador || "").toLowerCase().includes(texto) ||
        String(compra.telefono || "").toLowerCase().includes(texto) ||
        String(compra.instagram || "").toLowerCase().includes(texto) ||
        String(compra.idCompra || "").toLowerCase().includes(texto)
    );

});

    mostrarCompras(filtradas);

});