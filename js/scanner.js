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

function qrDetectado(texto) {

    document.getElementById("resultado").className =
        "alert alert-success mt-4";

    document.getElementById("resultado").innerHTML = `
        <strong>QR detectado</strong><br>
        ${texto}
    `;

}

function errorScanner(error) {
    // Ignoramos los errores mientras busca un QR
}