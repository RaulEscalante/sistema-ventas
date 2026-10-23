
const CARRITO_STORAGE_KEY = "sistemaVentasCarrito";

// Recuperar los productos guardados en el navegador.
function obtenerProductos() {
    const datos = localStorage.getItem(CARRITO_STORAGE_KEY);

    if (datos === null) {
        return [];
    }

    const productos = JSON.parse(datos);

    if (!Array.isArray(productos)) {
        throw new Error("Los datos del carrito no son válidos.");
    }

    return productos;
}

// Guardar los productos en localStorage.
function guardarProductos(productos) {
    localStorage.setItem(
        CARRITO_STORAGE_KEY,
        JSON.stringify(productos)
    );
}

// Agregar un producto al carrito.
export function agregarAlCarrito(item) {
    if (
        !item ||
        typeof item.nombre !== "string" ||
        item.nombre.trim() === ""
    ) {
        throw new Error("El nombre del producto es obligatorio.");
    }

    const precio = Number(item.precio);

    if (!Number.isFinite(precio) || precio <= 0) {
        throw new Error("El precio debe ser mayor que cero.");
    }

    const productos = obtenerProductos();

    const nuevoProducto = {
        nombre: item.nombre.trim(),
        precio: Math.round((precio + Number.EPSILON) * 100) / 100
    };

    productos.push(nuevoProducto);
    guardarProductos(productos);

    return nuevoProducto;
}

// Listar los productos para mostrarlos en la tabla.
export function listarCarrito() {
    return obtenerProductos();
}

// Vaciar el carrito, por si necesitan esta función más adelante.
export function vaciarCarrito() {
    guardarProductos([]);
}

export function eliminarDelCarrito(indice) {
    const productos = obtenerProductos();

    if (
        !Number.isInteger(indice) ||
        indice < 0 ||
        indice >= productos.length
    ) {
        throw new Error("El producto que deseas eliminar no existe.");
    }

    const [productoEliminado] = productos.splice(indice, 1);

    guardarProductos(productos);

    return productoEliminado;
}


export function modificarProducto(indice, nuevosDatos) {
    const productos = obtenerProductos();

    if (
        !Number.isInteger(indice) ||
        indice < 0 ||
        indice >= productos.length
    ) {
        throw new Error("El producto que deseas modificar no existe.");
    }

    if (
        !nuevosDatos ||
        typeof nuevosDatos.nombre !== "string" ||
        nuevosDatos.nombre.trim() === ""
    ) {
        throw new Error("El nombre del producto es obligatorio.");
    }

    const precio = Number(nuevosDatos.precio);

    if (!Number.isFinite(precio) || precio <= 0) {
        throw new Error("El precio debe ser mayor que cero.");
    }

    productos[indice] = {
        nombre: nuevosDatos.nombre.trim(),
        precio: Math.round((precio + Number.EPSILON) * 100) / 100
    };

    guardarProductos(productos);

    return productos[indice];
}
