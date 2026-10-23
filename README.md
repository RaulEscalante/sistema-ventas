# Sistema de Ventas

Prototipo web colaborativo desarrollado para practicar el uso de Git y GitHub, incluyendo ramas, commits, integración de funcionalidades y Pull Requests.

## 1. Objetivo del proyecto

Desarrollar una aplicación web sencilla que permita gestionar un catálogo de clientes y un carrito de ventas mediante una interfaz visual.

El proyecto se divide en tres responsabilidades: catálogo de clientes, carrito de ventas e integración de la interfaz.

## 2. Tecnologías utilizadas

- HTML5 para la estructura de la interfaz.
- CSS3 para los estilos visuales.
- JavaScript para la lógica de los módulos.
- JSON para los datos iniciales de clientes.
- Git y GitHub para el control de versiones y el trabajo colaborativo.

No se utilizarán frameworks ni bases de datos en esta primera versión.

## 3. Estructura del proyecto

```text
sistema-ventas/
├── README.md
├── index.html
├── index.js
├── styles.css
├── clientes/
│   ├── clientes.js
│   └── clientes.json
└── carrito/
    └── carrito.js
```

### Responsabilidades por archivo

- `index.html`: estructura de la interfaz web.
- `styles.css`: diseño visual y estilos de los componentes.
- `index.js`: integración de los módulos, eventos de los formularios y actualización de la interfaz.
- `clientes/clientes.js`: funciones para administrar los clientes.
- `clientes/clientes.json`: datos iniciales de prueba.
- `carrito/carrito.js`: funciones para administrar los productos del carrito.
- `README.md`: documentación y reglas de colaboración.

## 4. Integrante 1: Matías — Catálogo de clientes

**Rama:** `feature/catalogo-clientes`

**Archivos de trabajo:**
- `clientes/clientes.js`
- `clientes/clientes.json`

### Funcionalidades requeridas

1. Implementar `listarClientes()`, que devuelva un arreglo con los clientes registrados.
2. Implementar `agregarCliente(nombre, dni)`, que valide el nombre y un DNI numérico de hasta 8 dígitos, registre al cliente y devuelva el nuevo registro.
3. Mantener un identificador único y autoincremental para cada cliente.
4. Implementar `buscarCliente(id)`, que devuelva el cliente encontrado o `null` si no existe.
5. Implementar `eliminarCliente(id)`, que elimine y devuelva el cliente encontrado o `null` si no existe.
6. Implementar `editarCliente(id, nombre, dni)`, que valide y devuelva los datos actualizados, o `null` si el cliente no existe.
7. Preparar datos iniciales de prueba en `clientes.json`.

### Integración con la interfaz

Las funciones deben poder utilizarse desde `index.js` mediante exportaciones de JavaScript ES Modules.

Ejemplo del formato de un cliente:

```javascript
{
    id: 1,
    nombre: "Carlos Ruiz",
    dni: "12345678"
}
```

### Requisitos técnicos

- Utilizar `export` para exponer las funciones.
- No utilizar `require()`, `module.exports`, `fs` ni `__dirname` en la versión destinada al navegador.
- No depender exclusivamente de `console.log()` para mostrar resultados.
- Devolver los datos para que `index.js` pueda representarlos en la tabla.
- Utilizar `localStorage` para conservar los cambios durante las pruebas.
- Mantener `clientes.json` como fuente de los datos iniciales.

La carga inicial del archivo JSON y la conexión con la interfaz serán coordinadas desde `index.js`.

### Commits sugeridos

```text
feat(clientes): adaptar modulo al navegador
feat(clientes): implementar listado y registro
feat(clientes): agregar busqueda por id
test(clientes): preparar datos de prueba
```

## 5. Integrante 2: De Paz — Carrito de ventas

**Rama:** `feature/carrito`

**Archivo de trabajo:** `carrito/carrito.js`

### Funcionalidades requeridas

1. Implementar `agregarAlCarrito(item)`.
2. Implementar `listarCarrito()`.
3. Preparar productos de prueba.
4. Validar que el nombre del producto no esté vacío y que su precio sea un número mayor que cero.
5. Permitir que la interfaz consulte los productos agregados.
6. Calcular el subtotal de los productos del carrito.

### Integración con la interfaz

Las funciones deben poder utilizarse desde `index.js` mediante exportaciones de JavaScript ES Modules.

Ejemplo del formato de un producto:

```javascript
{
    nombre: "Laptop",
    precio: 2500
}
```

`listarCarrito()` debe devolver un arreglo de productos. `agregarAlCarrito(item)` debe incorporar el producto y devolver un resultado que permita actualizar la interfaz.

### Requisitos técnicos

- Utilizar `export` para exponer las funciones.
- No utilizar `require()` ni `module.exports`.
- No depender de `console.log()` para presentar los productos.
- Mantener el carrito en memoria durante esta primera versión.
- No modificar `index.html`, `index.js` ni `styles.css`.
- Conservar los productos de prueba solicitados para demostrar el funcionamiento.

El subtotal será calculado a partir de los precios de los productos que devuelve el módulo.

### Commits sugeridos

```text
feat(carrito): adaptar modulo al navegador
feat(carrito): implementar agregado de productos
feat(carrito): implementar listado y subtotal
test(carrito): preparar productos de prueba
```

## 6. Responsable del repositorio — Interfaz e integración

**Rama de trabajo:** `feature/interfaz-visual`

**Archivos de trabajo:**
- `index.html`
- `index.js`
- `styles.css`
- `README.md`

### Responsabilidades

1. Preparar la interfaz visual de la aplicación.
2. Conectar los formularios con las funciones de clientes y carrito.
3. Mostrar los clientes en una tabla.
4. Permitir buscar clientes por ID y mostrar los resultados.
5. Mostrar los productos del carrito en una tabla.
6. Actualizar los indicadores de clientes registrados, productos agregados y subtotal.
7. Mostrar mensajes de confirmación y validación.
8. Revisar los Pull Requests de los integrantes.
9. Integrar las funcionalidades en `develop`.
10. Probar el sistema completo y preparar la versión estable `v1.0`.

### Contrato de integración

La interfaz espera las siguientes funciones:

**Módulo de clientes**
- `listarClientes()`
- `agregarCliente(nombre, dni)`
- `buscarCliente(id)`
- `eliminarCliente(id)`
- `editarCliente(id, nombre, dni)`

**Módulo de carrito**
- `agregarAlCarrito(item)`
- `listarCarrito()`

Las funciones deben devolver los datos o resultados necesarios para que la interfaz actualice sus elementos sin depender de la consola.

## 7. Reglas de trabajo colaborativo

1. Cada integrante debe trabajar en su propia rama.
2. Antes de empezar, actualizar la rama de trabajo desde `develop`.
3. No realizar cambios directamente en `main`.
4. Guardar los avances con commits descriptivos.
5. Subir la rama de trabajo a GitHub.
6. Abrir un Pull Request hacia `develop`.
7. Revisar los cambios antes de aprobarlos.
8. Resolver conflictos de integración cuando sea necesario.
9. Probar el proyecto después de cada integración.
10. Fusionar `develop` con `main` cuando el sistema esté funcionando correctamente.

## 8. Flujo de ramas

- `main`: versión estable del proyecto.
- `develop`: integración y pruebas.
- `feature/catalogo-clientes`: desarrollo del catálogo de clientes.
- `feature/carrito`: desarrollo del carrito de ventas.
- `feature/interfaz-visual`: desarrollo de la interfaz y su integración.

## 9. Pruebas de aceptación

Antes de publicar la versión final, se comprobará que:

- La página se abra correctamente en el navegador.
- Los clientes iniciales se carguen desde el JSON.
- Se pueda registrar un cliente y visualizarlo en la tabla.
- Se pueda buscar un cliente por ID.
- Los cambios de clientes se conserven al recargar la página.
- Se puedan agregar productos al carrito.
- Los productos aparezcan en la tabla.
- El subtotal se calcule correctamente.
- Los formularios validen los datos ingresados.
- Los mensajes de confirmación y error sean visibles.
- Los módulos se comuniquen correctamente con la interfaz.
- La consola del navegador no presente errores que impidan el funcionamiento.

## 10. Resultado esperado

Una aplicación web funcional que permita registrar y consultar clientes, agregar y listar productos en un carrito y calcular el subtotal de la compra.

El proyecto debe demostrar la colaboración entre tres integrantes mediante ramas independientes, commits descriptivos, Pull Requests, revisión de cambios e integración en GitHub.