const fs = require("fs");
const path = require("path");

const archivo = path.join(__dirname, "clientes.json");

function listarClientes() {
    const datos = fs.readFileSync(archivo, "utf8");
    return JSON.parse(datos);
}
// Ejemplo para agregar al clienmte: console.log(agregarCliente("Carlos Ruiz"));
function agregarCliente(nombre) {
    if (typeof nombre !== "string" || nombre.trim() === "") {
        throw new Error("El nombre del cliente es obligatorio");
    }

    const clientes = listarClientes();

    const nuevoCliente = {
        id: clientes.length > 0
            ? Math.max(...clientes.map(cliente => cliente.id)) + 1
            : 1,
        nombre: nombre.trim()
    };

    clientes.push(nuevoCliente);

    fs.writeFileSync(
        archivo,
        JSON.stringify(clientes, null, 2),
        "utf8"
    );

    return nuevoCliente;
}

// Nueva funcion: buscar cliente por ID
function buscarCliente(id) {
    const clientes = listarClientes();
    const cliente = clientes.find(cliente => cliente.id === Number(id));

    if (!cliente) {
        return null;
    }

    return cliente;
}

module.exports = {
    listarClientes,
    agregarCliente,
    buscarCliente
};