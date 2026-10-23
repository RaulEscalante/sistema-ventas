const CLIENTES_STORAGE_KEY = "sistemaVentasClientes";

export function listarClientes() {
    const datos = localStorage.getItem(CLIENTES_STORAGE_KEY);
    return datos === null ? [] : JSON.parse(datos);
}

export function agregarCliente(nombre, dni) {
    if (typeof nombre !== "string" || nombre.trim() === "") {
        throw new Error("El nombre del cliente es obligatorio.");
    }

    if (typeof dni !== "string" || !/^[0-9]{1,8}$/.test(dni)) {
        throw new Error("El DNI es obligatorio y debe contener entre 1 y 8 números.");
    }

    const clientes = listarClientes();
    const nuevoCliente = {
        id: clientes.length > 0
            ? Math.max(...clientes.map(cliente => cliente.id)) + 1
            : 1,
        nombre: nombre.trim(),
        dni
    };

    clientes.push(nuevoCliente);
    localStorage.setItem(CLIENTES_STORAGE_KEY, JSON.stringify(clientes));

    return nuevoCliente;
}

export function buscarCliente(id) {
    const clientes = listarClientes();
    return clientes.find(cliente => cliente.id === Number(id)) ?? null;
}

export function eliminarCliente(id) {
    const idCliente = Number(id);

    if (!Number.isInteger(idCliente) || idCliente < 1) {
        throw new Error("Ingresa un ID de cliente válido.");
    }

    const clientes = listarClientes();
    const indiceCliente = clientes.findIndex(cliente => cliente.id === idCliente);

    if (indiceCliente === -1) {
        return null;
    }

    const [clienteEliminado] = clientes.splice(indiceCliente, 1);
    localStorage.setItem(CLIENTES_STORAGE_KEY, JSON.stringify(clientes));

    return clienteEliminado;
}

export function editarCliente(id, nombre, dni) {
    const idCliente = Number(id);

    if (!Number.isInteger(idCliente) || idCliente < 1) {
        throw new Error("Ingresa un ID de cliente válido.");
    }

    if (typeof nombre !== "string" || nombre.trim() === "") {
        throw new Error("El nombre del cliente es obligatorio.");
    }

    if (typeof dni !== "string" || !/^[0-9]{1,8}$/.test(dni)) {
        throw new Error("El DNI es obligatorio y debe contener entre 1 y 8 números.");
    }

    const clientes = listarClientes();
    const indiceCliente = clientes.findIndex(cliente => cliente.id === idCliente);

    if (indiceCliente === -1) {
        return null;
    }

    const clienteActualizado = {
        ...clientes[indiceCliente],
        nombre: nombre.trim(),
        dni
    };

    clientes[indiceCliente] = clienteActualizado;
    localStorage.setItem(CLIENTES_STORAGE_KEY, JSON.stringify(clientes));

    return clienteActualizado;
}
