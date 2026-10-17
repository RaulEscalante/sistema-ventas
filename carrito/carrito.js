
let carrito = [];

// Funcion para agregar un producto al carrito
function agregarAlCarrito(item) {
    carrito.push(item);
    console.log("Producto agregado:", item.nombre);
}

// Funcion para listar los productos del carrito
function listarCarrito() {
    console.log("Productos en el carrito:");

    if (carrito.length === 0) {
        console.log("El carrito esta vacio.");
        return;
    }

    carrito.forEach((item, indice) => {
        console.log(
            `${indice + 1}. ${item.nombre} - S/ ${item.precio}`
        );
    });
}

// Productos de prueba
agregarAlCarrito({ nombre: "Laptop", precio: 2500 });
agregarAlCarrito({ nombre: "Mouse", precio: 150 });
agregarAlCarrito({ nombre: "Teclado", precio: 120 });

// Mostrar los productos
listarCarrito();
