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

    console.log("QR:", texto);

    try {

        const resultado = await validarIngreso(texto);

        console.log(resultado);

    } catch(error){

        console.error(error);

    }

}

function errorScanner(error) {
    // Ignoramos los errores mientras busca un QR
}