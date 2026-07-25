/*
==========================================
RAISARE MANAGER
Comunicación con la API
==========================================
*/

async function obtenerCompras() {

    try {

        const respuesta = await fetch(
            CONFIG.API_URL + "?accion=compras"
        );

        const datos = await respuesta.json();

        return datos;

    } catch (error) {

        console.error("Error al obtener compras:", error);

        return [];

    }

}

async function obtenerBoletos(idCompra) {

    const respuesta = await fetch(
        `${CONFIG.API_URL}?accion=obtenerBoletos&idCompra=${encodeURIComponent(idCompra)}`
    );

    return await respuesta.json();

}

async function guardarInvitado(codigo, invitado) {

    try {

        const respuesta = await fetch(
            `${CONFIG.API_URL}?accion=guardarInvitado&codigo=${encodeURIComponent(codigo)}&invitado=${encodeURIComponent(invitado)}`
        );

        return respuesta.ok;

    } catch (error) {

        console.error("Error al guardar invitado:", error);

        return false;

    }

}

async function obtenerVIP() {

    try {

        const respuesta = await fetch(
            CONFIG.API_URL + "?accion=obtenerVIP"
        );

        return await respuesta.json();

    } catch (error) {

        console.error("Error al obtener VIP:", error);

        return [];

    }

}

async function crearVIP(nombre, telefono) {

    const url =
        `${CONFIG.API_URL}?accion=crearVIP&nombre=${encodeURIComponent(nombre)}&telefono=${encodeURIComponent(telefono)}`;

    console.log("URL:", url);

    const respuesta = await fetch(url);

    const texto = await respuesta.text();

    console.log("Respuesta:", texto);

    return JSON.parse(texto);

}

async function obtenerBoleto(codigo) {

    const respuesta = await fetch(
        `${CONFIG.API_URL}?accion=obtenerBoleto&codigo=${encodeURIComponent(codigo)}`
    );

    return await respuesta.json();

}

async function validarIngreso(codigo){

    const respuesta = await fetch(
        `${CONFIG.API_URL}?accion=validarIngreso&codigo=${encodeURIComponent(codigo)}`
    );

    return await respuesta.json();

}