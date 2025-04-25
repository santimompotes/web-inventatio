// Función para imprimir materiales en una tabla
function imprimirMaterial() {
    // Recuperamos los materiales guardados en localStorage
    const materialesGuardados = JSON.parse(localStorage.getItem('materiales')) || [];
    const tablaDeMateriales = document.getElementById("tablaMateriales");

    // Recorremos cada material para crear una fila en la tabla
    materialesGuardados.forEach(material => {
        const fila = document.createElement("tr");

        // Creamos las celdas para cada propiedad del material
        const tdNombre = document.createElement("td");
        const tdProveedor = document.createElement("td");
        const tdPrecio = document.createElement("td");
        const tdCantidad = document.createElement("td");
        const tdFecha = document.createElement("td");

        // Asignamos los valores a cada celda
        tdNombre.textContent = material.nombre;
        tdProveedor.textContent = material.proveedor;
        tdPrecio.textContent = material.precio;
        tdCantidad.textContent = material.cantidad;
        tdFecha.textContent = material.fecha;

        // Agregamos las celdas a la fila
        fila.appendChild(tdNombre);
        fila.appendChild(tdProveedor);
        fila.appendChild(tdPrecio);
        fila.appendChild(tdCantidad);
        fila.appendChild(tdFecha);

        // Finalmente agregamos la fila a la tabla
        tablaDeMateriales.appendChild(fila);
    });
}

// Función para imprimir productos en una tabla
function imprimirProducto() {
    // Recuperamos los productos guardados en localStorage
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    const tablaDeProductos = document.getElementById("tablaProductos");

    // Recorremos cada producto para crear una fila en la tabla
    productosGuardados.forEach(producto => {
        const fila = document.createElement("tr");

        const tdNombre = document.createElement("td");
        const tdprecio = document.createElement("td");
        const tdDescripcion = document.createElement("td");
        const tdMateriales = document.createElement("td");
        const tdStock = document.createElement("td");

        tdNombre.textContent = producto.nombre;
        tdprecio.textContent = producto.precio;
        tdDescripcion.textContent = producto.descripcion;
        tdMateriales.textContent = producto.materiales;
        tdStock.textContent = producto.stock;

        fila.appendChild(tdNombre);
        fila.appendChild(tdprecio);
        fila.appendChild(tdDescripcion);
        fila.appendChild(tdMateriales);
        fila.appendChild(tdStock);

        tablaDeProductos.appendChild(fila);
    });
}

// Ejecutamos la funciones cuando la página se ha cargado
window.onload = function() {
    imprimirMaterial();   
    imprimirProducto();   
    imprimirVentas();    
};

// Borrar todos los datos de localStorage y recargar la página
const borrarLocal = document.getElementById("borrarLocal");
borrarLocal.addEventListener('click', () => {
    // Limpiar el localStorage
    localStorage.clear();
    // Y recargar la página para reflejar los cambios
    window.location.reload();
});

// Función para imprimir ventas en una tabla
function imprimirVentas() {
    // Recuperamos las ventas guardadas en localStorage
    const ventasGuardadas = JSON.parse(localStorage.getItem('ventas')) || [];
    const tablaDeVentas = document.getElementById("tablaVentas");

    // Recorremos cada venta para crear una fila en la tabla
    ventasGuardadas.forEach(venta => {
        const fila = document.createElement("tr");

        const tdProducto = document.createElement("td");
        tdProducto.textContent = venta.nombre;
        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = `$${venta.precio}`;
        const tdCantidad = document.createElement("td");
        tdCantidad.textContent = venta.cantidad;
        const tdFecha = document.createElement("td");
        tdFecha.textContent = venta.fecha;

        fila.appendChild(tdProducto);
        fila.appendChild(tdPrecio);
        fila.appendChild(tdCantidad);
        fila.appendChild(tdFecha);

        tablaDeVentas.appendChild(fila);
    });
}
