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
            <h4>✅ ACCESO PERMITIDO</h4>

            <strong>${resultado.nombre}</strong><br>

            Tipo: ${resultado.tipo}<br>

            Hora: ${resultado.hora}
        `;

    }else{

        if(resultado.motivo === "YA_INGRESO"){

            div.className = "alert alert-danger mt-4";

            div.innerHTML = `
                <h4>🚫 ESTE BOLETO YA INGRESÓ</h4>

                <strong>${resultado.nombre}</strong><br>

                Hora de ingreso: ${resultado.hora}
            `;

        }else{

            div.className = "alert alert-warning mt-4";

            div.innerHTML = `
                <h4>❌ BOLETO INVÁLIDO</h4>
            `;

        }

    }

}

function errorScanner(error) {
    // Ignoramos los errores mientras busca un QR
}