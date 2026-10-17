
const readline = require("readline");
const clientes = require("./clientes/clientes");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu() {
    console.log("\n================================");
    console.log("       SISTEMA DE VENTAS");
    console.log("================================");
    console.log("1. Listar clientes");
    console.log("2. Agregar cliente");
    console.log("3. Buscar cliente por ID");
    console.log("4. Salir");
    console.log("================================");

    rl.question("Seleccione una opcion: ", procesarOpcion);
}

function procesarOpcion(opcion) {
    try {
        switch (opcion.trim()) {
            case "1": {
                const lista = clientes.listarClientes();

                console.log("\n--- LISTA DE CLIENTES ---");

                if (lista.length === 0) {
                    console.log("No hay clientes registrados.");
                } else {
                    lista.forEach(cliente => {
                        console.log(
                            `ID: ${cliente.id} | Nombre: ${cliente.nombre}`
                        );
                    });
                }

                break;
            }

            case "2": {
                rl.question("Ingrese el nombre del cliente: ", nombre => {
                    try {
                        const nuevo = clientes.agregarCliente(nombre);
                        console.log("\nCliente agregado correctamente:");
                        console.log(nuevo);
                    } catch (error) {
                        console.log("Error: " + error.message);
                    }

                    mostrarMenu();
                });

                return;
            }

            case "3": {
                rl.question("Ingrese el ID del cliente: ", id => {
                    const cliente = clientes.buscarCliente(id);

                    if (cliente) {
                        console.log("\nCliente encontrado:");
                        console.log(
                            `ID: ${cliente.id} | Nombre: ${cliente.nombre}`
                        );
                    } else {
                        console.log("No se encontro el cliente.");
                    }

                    mostrarMenu();
                });

                return;
            }

            case "4":
                console.log("Gracias por utilizar el sistema.");
                rl.close();
                return;

            default:
                console.log("Opcion no valida. Intente nuevamente.");
        }
    } catch (error) {
        console.log("Ocurrio un error: " + error.message);
    }

    mostrarMenu();
}

mostrarMenu();
