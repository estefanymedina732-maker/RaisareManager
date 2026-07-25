document.addEventListener("DOMContentLoaded", iniciarScanner);

function iniciarScanner() {

    const scanner = new Html5QrcodeScanner(
        "reader",
        {
            fps: 10,
            qrbox: 250
        }
    );

    scanner.render(
        qrDetectado,
        errorScanner
    );

}

async function qrDetectado(texto) {

    const resultado = await validarIngreso(texto);

    const div = document.getElementById("resultado");

    if(resultado.ok){

        div.className = "alert alert-success mt-4";

        div.innerHTML = `
            <h4>✅ BOLETO VÁLIDO</h4>
            <strong>${resultado.nombre}</strong><br>
            ${resultado.tipo}
        `;

    }else{

        div.className = "alert alert-danger mt-4";

        div.innerHTML = `
            <h4>🚫 ESTE BOLETO YA FUE UTILIZADO</h4>
            <strong>${resultado.nombre}</strong><br>
            Hora: ${resultado.hora}
        `;

    }

}

function errorScanner(error) {
    // Ignoramos los errores mientras busca un QR
}