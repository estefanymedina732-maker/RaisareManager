let vipGlobal = [];

document.addEventListener("DOMContentLoaded", () => {

    cargarVIP();

});

async function cargarVIP() {

    vipGlobal = await obtenerVIP();

    mostrarVIP(vipGlobal);

}

function mostrarVIP(lista) {

    const tabla = document.getElementById("tablaVIP");

    tabla.innerHTML = "";

    lista.forEach(vip => {

        tabla.innerHTML += `
        <tr>

            <td><strong>${vip.codigo}</strong></td>

            <td>${vip.nombre}</td>

            <td>${vip.telefono}</td>

            <td>-</td>

            <td class="text-end">

                <button
                    class="btn-raisare"
                    onclick="verVIP('${vip.codigo}')">

                    🎟 Ver boleto

                </button>

            </td>

        </tr>
        `;

    });

}

function nuevoVIP(){

    const modal = new bootstrap.Modal(
        document.getElementById("modalVIP")
    );

    modal.show();

}

async function crearNuevoVIP(){

    const nombre = document.getElementById("vipNombre").value.trim();
    const telefono = document.getElementById("vipTelefono").value.trim();

    if(nombre === ""){

        alert("Ingresa el nombre.");

        return;

    }

    const resultado = await crearVIP(nombre, telefono);

    if(!resultado.ok){

        alert("No se pudo crear el VIP.");

        return;

    }

    location.reload();

}

function verVIP(codigo){

    window.location.href =
        `detalle-boletos.html?codigo=${encodeURIComponent(codigo)}`;

}