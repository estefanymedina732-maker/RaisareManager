function crearTarjetaBoleto(boleto, index) {

    return `

<div class="card shadow border-0 mb-4">

    <div class="card-header d-flex justify-content-between align-items-center">

        <div>

            <h5 class="mb-0">
                🎟 ${CONFIG.EVENTO.nombre}
            </h5>

            <small class="text-muted">

                ${CONFIG.EVENTO.subtitulo}

            </small>

        </div>

        <span class="badge bg-success">

            ${boleto.estado}

        </span>

    </div>

    <div class="card-body">

        <div class="mb-3">

            <label class="fw-bold">

                Código

            </label>

            <div class="text-muted">

                ${boleto.codigoInterno}

            </div>

        </div>

        <div class="mb-3">

            <label class="fw-bold">

                Invitado

            </label>

            <input

                class="form-control"

                id="invitado-${index}"

                value="${boleto.invitado || ""}"

                placeholder="Nombre del invitado">

        </div>

        <div class="d-flex justify-content-end gap-2 mt-3">

            <button

                class="btn-raisare"

                onclick="guardarNombreInvitado('${boleto.codigoInterno}','invitado-${index}','mensaje-${index}')">

                💾 Guardar

            </button>

            <button

                class="btn-raisare-outline"

                id="btnQR-${index}"

                disabled

                onclick="mostrarBoleto(${index})">

                🎟 Ver boleto

            </button>

        </div>

        <div

            id="mensaje-${index}"

            class="mt-3"

            style="display:none;">

        </div>

    </div>

</div>

`;

}