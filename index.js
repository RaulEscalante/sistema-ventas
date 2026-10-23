
import * as clientesApi from "./clientes/clientes.js";

const CLIENTES_STORAGE_KEY = "sistemaVentasClientes";

const elementos = {
    formularioCliente: document.getElementById("form-cliente"),
    nombreCliente: document.getElementById("nombre-cliente"),
    dniCliente: document.getElementById("dni-cliente"),
    formularioBusqueda: document.getElementById("form-buscar-cliente"),
    idBusqueda: document.getElementById("buscar-cliente"),
    limpiarBusqueda: document.getElementById("limpiar-busqueda"),
    listaClientes: document.getElementById("lista-clientes"),
    mensajeClientes: document.getElementById("mensaje-clientes"),
    dialogoEditarCliente: document.getElementById("dialogo-editar-cliente"),
    formularioEditarCliente: document.getElementById("form-editar-cliente"),
    nombreEditarCliente: document.getElementById("nombre-editar-cliente"),
    dniEditarCliente: document.getElementById("dni-editar-cliente"),
    cancelarEdicionCliente: document.getElementById("cancelar-edicion-cliente"),

    formularioProducto: document.getElementById("form-producto"),
    nombreProducto: document.getElementById("nombre-producto"),
    precioProducto: document.getElementById("precio-producto"),
    listaCarrito: document.getElementById("lista-carrito"),
    mensajeCarrito: document.getElementById("mensaje-carrito"),

    totalClientes: document.getElementById("total-clientes"),
    totalProductos: document.getElementById("total-productos"),
    subtotalCarrito: document.getElementById("subtotal-carrito"),
    subtotalTabla: document.getElementById("subtotal-tabla")
};

let moduloClientes = null;
let moduloCarrito = null;
let clientesVisibles = null;
let idClienteEnEdicion = null;

// Muestra mensajes sin interpretar el contenido como HTML.
function mostrarMensaje(elemento, mensaje, tipo = "success") {
    elemento.textContent = mensaje;
    elemento.className = `FrontEnd-message FrontEnd-message-${tipo}`;
}

// Crea una fila vacía cuando no existen resultados.
function mostrarFilaVacia(tbody, columnas, mensaje) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");

    celda.colSpan = columnas;
    celda.className = "FrontEnd-empty";
    celda.textContent = mensaje;

    fila.appendChild(celda);
    tbody.replaceChildren(fila);
}

// Prepara los datos iniciales del archivo JSON.
// El módulo de clientes deberá utilizar la misma clave
// de localStorage para conservar los cambios.
async function prepararDatosIniciales() {
    if (localStorage.getItem(CLIENTES_STORAGE_KEY) !== null) {
        return;
    }

    const respuesta = await fetch("./clientes/clientes.json");

    if (!respuesta.ok) {
        throw new Error("No se pudo cargar clientes.json.");
    }

    const clientesIniciales = await respuesta.json();

    if (!Array.isArray(clientesIniciales)) {
        throw new Error("El archivo de clientes debe contener un arreglo.");
    }

    localStorage.setItem(CLIENTES_STORAGE_KEY, JSON.stringify(clientesIniciales));
}


async function prepararCarritoInicial() {
    const clave = "sistemaVentasCarrito";

    // Si ya existen datos, no sobrescribirlos.
    if (localStorage.getItem(clave) !== null) {
        return;
    }

    const respuesta = await fetch("./carrito/carrito.json");

    if (!respuesta.ok) {
        throw new Error("No se pudo cargar carrito.json.");
    }

    const productosIniciales = await respuesta.json();

    if (!Array.isArray(productosIniciales)) {
        throw new Error(
            "El archivo del carrito debe contener un arreglo."
        );
    }

    localStorage.setItem(
        clave,
        JSON.stringify(productosIniciales)
    );
}


// Carga los módulos de forma independiente.
// Así, un módulo pendiente no impide que se cargue el otro.
async function cargarModulos() {
    try {
        moduloClientes = {
            listarClientes: clientesApi.listarClientes,
            agregarCliente: clientesApi.agregarCliente,
            buscarCliente: clientesApi.buscarCliente,
            eliminarCliente: clientesApi.eliminarCliente,
            editarCliente: clientesApi.editarCliente
        };
        await actualizarClientes();
    } catch (error) {
        console.warn("No se pudieron cargar los clientes:", error.message);
        mostrarFilaVacia(elementos.listaClientes, 4, "No se pudieron cargar los clientes.");
        mostrarMensaje(elementos.mensajeClientes, error.message, "error");
    }

    try {
        const modulo = await import("./carrito/carrito.js");

        if (
            typeof modulo.agregarAlCarrito !== "function" ||
            typeof modulo.listarCarrito !== "function" ||
            typeof modulo.eliminarDelCarrito !== "function"
        ) {
            throw new Error("Faltan funciones requeridas en carrito.js.");
        }

        moduloCarrito = modulo;
        await actualizarCarrito();

        await prepararCarritoInicial();

        moduloCarrito = modulo;
        await actualizarCarrito();
    } catch (error) {
        console.warn("Módulo de carrito pendiente:", error.message);

        mostrarFilaVacia(elementos.listaCarrito, 3, "El módulo del carrito está pendiente de integración.");

        mostrarMensaje(elementos.mensajeCarrito, "De Paz debe adaptar y exportar las funciones del carrito.", "error");
    }
}

// Actualiza la tabla de clientes y su indicador.
async function actualizarClientes(clientes = null) {
    if (!moduloClientes) return;

    const resultado = clientes ?? await moduloClientes.listarClientes();

    if (!Array.isArray(resultado)) {
        throw new Error("listarClientes() debe devolver un arreglo.");
    }

    clientesVisibles = clientes;
    elementos.listaClientes.replaceChildren();
    elementos.totalClientes.textContent = resultado.length;

    if (resultado.length === 0) {
        mostrarFilaVacia(elementos.listaClientes, 4, "No hay clientes registrados.");
        return;
    }

    resultado.forEach(cliente => {
        const fila = document.createElement("tr");
        const celdaId = document.createElement("td");
        const celdaNombre = document.createElement("td");
        const celdaDni = document.createElement("td");
        const celdaAcciones = document.createElement("td");
        const botonEditar = document.createElement("button");
        const botonEliminar = document.createElement("button");

        celdaId.textContent = cliente.id;
        celdaNombre.textContent = cliente.nombre;
        celdaDni.textContent = cliente.dni ?? "";
        botonEditar.type = "button";
        botonEditar.className = "FrontEnd-button-secondary";
        botonEditar.dataset.accion = "editar-cliente";
        botonEditar.dataset.clienteId = cliente.id;
        botonEditar.textContent = "Editar";
        botonEditar.setAttribute("aria-label", `Editar cliente ${cliente.nombre}`);

        botonEliminar.type = "button";
        botonEliminar.className = "FrontEnd-button-danger";
        botonEliminar.dataset.accion = "eliminar-cliente";
        botonEliminar.dataset.clienteId = cliente.id;
        botonEliminar.textContent = "Eliminar";
        botonEliminar.setAttribute("aria-label", `Eliminar cliente ${cliente.nombre}`);
        celdaAcciones.append(botonEditar, botonEliminar);

        fila.append(celdaId, celdaNombre, celdaDni, celdaAcciones);
        elementos.listaClientes.appendChild(fila);
    });
}

// Actualiza la tabla del carrito y calcula su subtotal.

async function actualizarCarrito() {
    if (!moduloCarrito) return;

    const productos = await moduloCarrito.listarCarrito();

    if (!Array.isArray(productos)) {
        throw new Error("listarCarrito() debe devolver un arreglo.");
    }

    elementos.listaCarrito.replaceChildren();
    let subtotal = 0;

    productos.forEach((producto, indice) => {
        const fila = document.createElement("tr");
        const celdaNumero = document.createElement("td");
        const celdaNombre = document.createElement("td");
        const celdaPrecio = document.createElement("td");
        const celdaAcciones = document.createElement("td");
        const botonEliminar = document.createElement("button");

        const precio = Number(producto.precio);

        celdaNumero.textContent = indice + 1;
        celdaNombre.textContent = producto.nombre;
        celdaPrecio.textContent = formatearPrecio(precio);

        botonEliminar.type = "button";
        botonEliminar.className = "FrontEnd-button-danger";
        botonEliminar.dataset.indice = indice;
        botonEliminar.textContent = "Eliminar";
        botonEliminar.setAttribute(
            "aria-label",
            `Eliminar producto ${producto.nombre}`
        );

        celdaAcciones.appendChild(botonEliminar);

        subtotal += precio;

        fila.append(
            celdaNumero,
            celdaNombre,
            celdaPrecio,
            celdaAcciones
        );

        elementos.listaCarrito.appendChild(fila);
    });

    if (productos.length === 0) {
        mostrarFilaVacia(
            elementos.listaCarrito,
            4,
            "Tu carrito está vacío."
        );
    }

    elementos.totalProductos.textContent = productos.length;
    elementos.subtotalCarrito.textContent = formatearPrecio(subtotal);
    elementos.subtotalTabla.textContent = formatearPrecio(subtotal);
}


// Presenta los importes en soles peruanos.
function formatearPrecio(precio) {
    return new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN"
    }).format(precio);
}

// Registra un cliente desde el formulario.
elementos.formularioCliente.addEventListener("submit", async evento => {
    evento.preventDefault();

    if (!moduloClientes) {
        mostrarMensaje(elementos.mensajeClientes, "El módulo de clientes todavía no está integrado.", "error");
        return;
    }

    try {
        const nombre = elementos.nombreCliente.value.trim();
        const dni = elementos.dniCliente.value.trim();
        await moduloClientes.agregarCliente(nombre, dni);
        elementos.formularioCliente.reset();
        await actualizarClientes();

        mostrarMensaje(elementos.mensajeClientes, "Cliente agregado correctamente.");
    } catch (error) {
        mostrarMensaje(elementos.mensajeClientes, error.message || "No se pudo agregar el cliente.", "error");
    }
});

elementos.listaClientes.addEventListener("click", async evento => {
    const objetivo = evento.target;

    if (!(objetivo instanceof Element)) return;

    const botonEditar = objetivo.closest("button[data-accion='editar-cliente']");

    if (botonEditar) {
        const id = Number(botonEditar.dataset.clienteId);

        try {
            const cliente = await moduloClientes.buscarCliente(id);

            if (!cliente) {
                throw new Error("No se encontró el cliente que deseas editar.");
            }

            idClienteEnEdicion = id;
            elementos.nombreEditarCliente.value = cliente.nombre;
            elementos.dniEditarCliente.value = cliente.dni ?? "";
            elementos.dialogoEditarCliente.showModal();
            elementos.nombreEditarCliente.focus();
        } catch (error) {
            mostrarMensaje(elementos.mensajeClientes, error.message || "No se pudo abrir la edición.", "error");
        }

        return;
    }

    const botonEliminar = objetivo.closest("button[data-accion='eliminar-cliente']");

    if (!botonEliminar) return;

    const id = Number(botonEliminar.dataset.clienteId);

    if (!confirm("¿Seguro que deseas eliminar este cliente?")) return;

    try {
        const clienteEliminado = await moduloClientes.eliminarCliente(id);

        if (!clienteEliminado) {
            throw new Error("No se encontró el cliente que deseas eliminar.");
        }

        const clientesActualizados = clientesVisibles === null
            ? null
            : clientesVisibles.filter(cliente => cliente.id !== id);
        await actualizarClientes(clientesActualizados);
        mostrarMensaje(elementos.mensajeClientes, `Se eliminó a ${clienteEliminado.nombre}.`);
    } catch (error) {
        mostrarMensaje(elementos.mensajeClientes, error.message || "No se pudo eliminar el cliente.", "error");
    }
});

elementos.formularioEditarCliente.addEventListener("submit", async evento => {
    evento.preventDefault();

    if (idClienteEnEdicion === null) return;

    try {
        const clienteActualizado = await moduloClientes.editarCliente(
            idClienteEnEdicion,
            elementos.nombreEditarCliente.value,
            elementos.dniEditarCliente.value.trim()
        );

        if (!clienteActualizado) {
            throw new Error("No se encontró el cliente que deseas editar.");
        }

        const clientesActualizados = clientesVisibles === null
            ? null
            : clientesVisibles.map(cliente =>
                cliente.id === clienteActualizado.id ? clienteActualizado : cliente
            );
        elementos.dialogoEditarCliente.close();
        await actualizarClientes(clientesActualizados);
        mostrarMensaje(elementos.mensajeClientes, `Se actualizaron los datos de ${clienteActualizado.nombre}.`);
    } catch (error) {
        mostrarMensaje(elementos.mensajeClientes, error.message || "No se pudo editar el cliente.", "error");
    }
});

elementos.cancelarEdicionCliente.addEventListener("click", () => {
    elementos.dialogoEditarCliente.close();
});

elementos.dialogoEditarCliente.addEventListener("close", () => {
    idClienteEnEdicion = null;
    elementos.formularioEditarCliente.reset();
});

// Busca un cliente por su ID.
elementos.formularioBusqueda.addEventListener("submit", async evento => {
    evento.preventDefault();

    if (!moduloClientes) {
        mostrarMensaje(elementos.mensajeClientes, "El módulo de clientes todavía no está integrado.", "error");
        return;
    }

    const id = elementos.idBusqueda.value.trim();

    if (!id || Number(id) < 1) {
        mostrarMensaje(elementos.mensajeClientes, "Ingresa un ID válido.", "error");
        return;
    }

    try {
        const cliente = await moduloClientes.buscarCliente(id);

        if (cliente) {
            await actualizarClientes([cliente]);
            mostrarMensaje(elementos.mensajeClientes, `Cliente encontrado: ${cliente.nombre}.`);
        } else {
            await actualizarClientes([]);
            mostrarMensaje(elementos.mensajeClientes, "No se encontró un cliente con ese ID.", "error");
        }
    } catch (error) {
        mostrarMensaje(elementos.mensajeClientes, error.message || "No se pudo realizar la búsqueda.", "error");
    }
});

// Restablece el listado completo.
elementos.limpiarBusqueda.addEventListener("click", async () => {
    elementos.idBusqueda.value = "";
    clientesVisibles = null;

    try {
        await actualizarClientes();
        mostrarMensaje(elementos.mensajeClientes, "");
    } catch (error) {
        mostrarMensaje(elementos.mensajeClientes, error.message, "error");
    }
});

// Agrega productos al carrito.
elementos.formularioProducto.addEventListener("submit", async evento => {
    evento.preventDefault();

    if (!moduloCarrito) {
        mostrarMensaje(elementos.mensajeCarrito, "El módulo del carrito todavía no está integrado.", "error");
        return;
    }

    const nombre = elementos.nombreProducto.value.trim();
    const precio = Number(elementos.precioProducto.value);

    if (!nombre || !Number.isFinite(precio) || precio <= 0) {
        mostrarMensaje(elementos.mensajeCarrito, "Ingresa un nombre y un precio mayor que cero.", "error");
        return;
    }

    try {
        await moduloCarrito.agregarAlCarrito({ nombre, precio });
        elementos.formularioProducto.reset();
        await actualizarCarrito();
        mostrarMensaje(elementos.mensajeCarrito, "Producto agregado correctamente.");
    } catch (error) {
        mostrarMensaje(elementos.mensajeCarrito, error.message || "No se pudo agregar el producto.", "error");
    }
});

elementos.listaCarrito.addEventListener("click", async evento => {
    const objetivo = evento.target;

    if (!(objetivo instanceof Element)) return;

    const botonEliminar = objetivo.closest(
        "button[data-indice]"
    );

    if (!botonEliminar || !moduloCarrito) return;

    const indice = Number(botonEliminar.dataset.indice);

    if (!confirm("¿Seguro que deseas eliminar este producto?")) {
        return;
    }

    try {
        const productoEliminado =
            await moduloCarrito.eliminarDelCarrito(indice);

        await actualizarCarrito();

        mostrarMensaje(
            elementos.mensajeCarrito,
            `Se eliminó ${productoEliminado.nombre} del carrito.`
        );
    } catch (error) {
        mostrarMensaje(
            elementos.mensajeCarrito,
            error.message || "No se pudo eliminar el producto.",
            "error"
        );
    }
});


// Inicializa los datos y los módulos al cargar la página.
async function iniciarSistema() {
    try {
        await prepararDatosIniciales();
    } catch (error) {
        console.error("Error al preparar los clientes:", error);

        mostrarMensaje(
            elementos.mensajeClientes,
            "No se pudieron preparar los datos iniciales. Comprueba el servidor local y clientes.json.",
            "error"
        );
    }

    await cargarModulos();
}

iniciarSistema();