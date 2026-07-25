function crearBoletoDigital(boleto){

    return `

<div class="boleto-digital">

    <div class="ticket-header">

        <img
            src="${CONFIG.EVENTO.logo}"
            alt="Raisare">

        <h2>${CONFIG.EVENTO.nombre}</h2>

        <p>${CONFIG.EVENTO.subtitulo}</p>

    </div>

    <div class="ticket-body">

<div

    class="ticket-qr"

    id="qr-${boleto.codigoInterno}">

</div>

        <div class="ticket-name">

            ${boleto.invitado || "Sin asignar"}

        </div>

        <div class="ticket-code">

            ${boleto.codigoInterno}

        </div>

        <div class="ticket-badges">

            <div class="ticket-badge badge-general">

                GENERAL

            </div>

            <div class="ticket-badge badge-disponible">

                DISPONIBLE

            </div>

        </div>

    </div>

    <div class="ticket-footer">

        <div class="ticket-info">

            <div class="ticket-item">

                📅

                <br>

                ${CONFIG.EVENTO.fecha}

            </div>

            <div class="ticket-item">

                🕖

                <br>

                ${CONFIG.EVENTO.hora}

            </div>

            <div class="ticket-item">

                📍

                <br>

                Salones MH

            </div>

        </div>

        <div class="ticket-phrase">

            Celebremos lo que somos. ♡

        </div>

    </div>

</div>

`;

}