let boletos = [];

let boletoActual = null;

document.addEventListener("DOMContentLoaded", cargarDetalle);

async function cargarDetalle() {

    const parametros = new URLSearchParams(window.location.search);

const idCompra = parametros.get("idCompra");
const codigo = parametros.get("codigo");

if (idCompra) {

    document.getElementById("tituloCompra").textContent =
        `Compra ${idCompra}`;

    boletos = await obtenerBoletos(idCompra);

} else if (codigo) {

    document.getElementById("tituloCompra").textContent =
        `VIP ${codigo}`;

    const boleto = await obtenerBoleto(codigo);
    console.log("Boleto VIP:", boleto);

    boletos = [boleto];

}

    const lista = document.getElementById("listaBoletos");

    lista.innerHTML = "";

    boletos.forEach((boleto, index) => {

    lista.innerHTML += crearTarjetaBoleto(boleto, index);

});

}

async function guardarNombreInvitado(codigo, idInput, idMensaje) {

    const nombre = document.getElementById(idInput).value.trim();

    if (!nombre) {

        mostrarMensaje(idMensaje, "Escribe un nombre.", "danger");
        return;

    }

    const ok = await guardarInvitado(codigo, nombre);

    if (ok) {

        mostrarMensaje(idMensaje, "✓ Guardado correctamente", "success");

        // Activar botón de QR
        const indice = idInput.replace("invitado-", "");
        document.getElementById(`btnQR-${indice}`).disabled = false;

    } else {

        mostrarMensaje(idMensaje, "❌ Error al guardar.", "danger");

    }

}

function mostrarMensaje(id, texto, tipo) {

    const mensaje = document.getElementById(id);

    mensaje.className = `alert alert-${tipo} mt-2 py-2`;

    mensaje.innerHTML = texto;

    mensaje.style.display = "block";

    setTimeout(() => {

        mensaje.style.display = "none";
        mensaje.innerHTML = "";

    }, 2000);

}

function mostrarQR(codigo, idContenedor, boton) {

    const contenedor = document.getElementById(idContenedor);

    if (contenedor.innerHTML !== "") {

        contenedor.innerHTML = "";

        boton.innerHTML = "📷 Generar QR";

        return;

    }

    const qr = new QRCodeStyling({

        width: 220,
        height: 220,

        data: codigo,

        dotsOptions: {

            color: "#1d1d1d",
            type: "rounded"

        },

        cornersSquareOptions: {

            type: "extra-rounded"

        },

        backgroundOptions: {

            color: "#ffffff"

        }

    });

    qr.append(contenedor);

    contenedor.innerHTML += `

        <div class="mt-3 fw-semibold">
            ${codigo}
        </div>

    `;

    boton.innerHTML = "Ocultar QR";

}

function mostrarBoleto(index){

    const boleto = boletos[index];

    boletoActual = boleto;

    const input = document.getElementById(`invitado-${index}`);

    if(input){
        boleto.invitado = input.value || "Sin asignar";
    }

    document.getElementById("contenidoBoleto").innerHTML =
        crearBoletoDigital(boleto);

    const modal = new bootstrap.Modal(
        document.getElementById("modalBoleto")
    );

    modal.show();

    setTimeout(() => {

        generarQR(
            `qr-${boleto.codigoInterno}`,
            boleto.codigoInterno
        );

    }, 200);

}

async function descargarBoleto(){

    const boleto = document.querySelector(".boleto-digital");

    if(!boleto) return;

    const canvas = await html2canvas(boleto,{

        scale:3,

        backgroundColor:null,

        useCORS:true

    });

    const link = document.createElement("a");

    link.download = `${boletoActual.codigoInterno}.png`;

    link.href = canvas.toDataURL("image/png");

    link.click();

}

async function enviarWhatsApp() {

    if (!boletoActual) return;

    const telefono = "504" + boletoActual.telefono;

    const mensaje =
`¡Hola! ${boletoActual.comprador} 
Te saludamos de parte de Raisare.

¡Gracias por ser parte de la Pink Pony Club Party!
Tu compra ha sido confirmada.

Adjunto encontrarás tu boleto de ingreso. 
No lo compartas con nadie, ya que cada boleto es único y será escaneado al entrar al evento. 
Si otra persona utiliza tu QR antes que tú, no podremos permitir un segundo ingreso.

Aquí está la ubicación del evento:
https://maps.app.goo.gl/bgaZ2qrrFG2CVKoT8?g_st=aw

Te recomendamos tener el boleto listo al llegar para que tu ingreso sea más rápido.

¡Nos vemos en la fiesta!`;

    const url =
`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    console.log("Código:", boletoActual.codigoInterno);

    console.log("URL API:",
`${CONFIG.API_URL}?accion=marcarEnviado&codigoInterno=${encodeURIComponent(boletoActual.codigoInterno)}`);

    window.open(url, "_blank");

try {

    const urlApi =
`${CONFIG.API_URL}?accion=marcarEnviado&codigoInterno=${encodeURIComponent(boletoActual.codigoInterno)}`;

    console.log("URL completa:", urlApi);

    alert(urlApi);

    const respuesta = await fetch(urlApi);

    console.log("Status:", respuesta.status);

    const texto = await respuesta.text();

    console.log("Respuesta:", texto);

} catch (error) {

    console.error(error);

}

}