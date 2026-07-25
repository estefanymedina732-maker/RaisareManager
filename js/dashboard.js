document.addEventListener("DOMContentLoaded", () => {
    cargarDashboard();
});

async function cargarDashboard() {

    const compras = await obtenerCompras();

    const totalCompras = compras.length;

    const totalBoletos = compras.reduce((total, compra) => {
        return total + Number(compra.cantidad || 0);
    }, 0);

    const pagosConfirmados = compras.filter(compra =>
        compra.estado === "Confirmado"
    ).length;

    const pagosPendientes = compras.filter(compra =>
        compra.estado === "Pendiente"
    ).length;

    document.getElementById("totalCompras").textContent = totalCompras;

    document.getElementById("totalBoletos").textContent = totalBoletos;

    document.getElementById("pagosConfirmados").textContent = pagosConfirmados;

    document.getElementById("pagosPendientes").textContent = pagosPendientes;

}