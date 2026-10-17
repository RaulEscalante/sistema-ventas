Sistema de Ventas

Proyecto colaborativo básico para practicar Git y GitHub entre tres integrantes.

1. Integrantes y responsabilidades
Integrante 1: Matías — Catálogo de clientes

Rama: feature/catalogo-clientes

Tareas:

Trabajar en clientes/clientes.js.
Crear la función listarClientes().
Crear la función agregarCliente(nombre).
Guardar algunos clientes de prueba en clientes/clientes.json.

Objetivo: tener un catálogo básico que permita listar y agregar clientes.

Integrante 2: De Paz — Carrito de ventas

Rama: feature/carrito

Tareas:

Trabajar en carrito/carrito.js.
Crear la función agregarAlCarrito(item).
Crear la función listarCarrito().
Agregar algunos productos de prueba al carrito.

Objetivo: tener un carrito básico que permita agregar y listar productos.

Integrante 3: Responsable del repositorio — Estructura e integración

Ramas principales: main y develop

Tareas:

Organizar las carpetas y archivos iniciales.
Mantener actualizado el repositorio remoto en GitHub.
Revisar los cambios de Matías y De Paz.
Integrar las funcionalidades en develop.
Comprobar que el proyecto funcione y preparar la versión v1.0.

Objetivo: coordinar el trabajo colaborativo y mantener organizado el proyecto.

2. Estructura del proyecto
sistema-ventas/
├── README.md
├── clientes/
│   ├── clientes.json
│   └── clientes.js
└── carrito/
    └── carrito.js

3. Flujo de trabajo con Git
main: versión estable del proyecto.
develop: integración de las funcionalidades.
feature/catalogo-clientes: trabajo de Matías.
feature/carrito: trabajo de De Paz.
4. Reglas de trabajo
Cada integrante debe trabajar en su propia rama.
Antes de empezar, actualizar la rama develop.
Guardar avances con commits descriptivos.
Subir las ramas de trabajo a GitHub.
Revisar e integrar los cambios en develop.
Probar el proyecto antes de preparar la versión final.
5. Commits sugeridos

Matías

feat(clientes): crear funcion para listar clientes
feat(clientes): agregar cliente

De Paz

feat(carrito): crear estructura inicial
feat(carrito): agregar productos al carrito

Responsable del repositorio

chore: preparar estructura inicial
docs: documentar responsabilidades del equipo
chore: preparar version 1.0
6. Resultado esperado

Al finalizar, el proyecto deberá permitir listar y agregar clientes, agregar y listar productos en un carrito y demostrar el uso de ramas, commits y fusiones con Git.
