function generarQR(idContenedor, codigo) {

    const contenedor = document.getElementById(idContenedor);

    if (!contenedor) return;

    // Limpiar si ya existe un QR
    contenedor.innerHTML = "";

    const qr = new QRCodeStyling({

        width: 185,
        height: 185,

        type: "canvas",

        data: codigo,

        image: "../assets/images/Color_Vertical isotipo.png",

        dotsOptions: {

            color: "#d6007d",
            type: "rounded"

        },

        cornersSquareOptions: {

            color: "#8d0067",
            type: "extra-rounded"

        },

        cornersDotOptions: {

            color: "#8d0067"

        },

        backgroundOptions: {

            color: "#ffffff"

        },

        imageOptions: {

            crossOrigin: "anonymous",
            margin: 8,
            imageSize: 0.30

        }

    });

    qr.append(contenedor);

}