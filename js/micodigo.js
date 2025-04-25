// Mostrar tarjetas de productos desde localStorage
function imprimirProducto() {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    console.log("Productos cargados:", productosGuardados); // Verifica si los productos se cargan correctamente
    const productContainer = document.getElementById("productContainer");

    productosGuardados.forEach(producto => {
        const col = document.createElement("div");
        col.classList.add("col-12", "col-md-4", "mb-4");

        // Crear tarjeta
        const card = document.createElement("div");
        card.classList.add("card");

        // Agregar imagen del producto
        const img = document.createElement("img");
        img.classList.add("card-img-top", "img-fluid");
        img.src = producto.imagen;
        img.alt = producto.nombre;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const titulo = document.createElement("h5");
        titulo.classList.add("card-title");
        titulo.textContent = producto.nombre;

        const stock = document.createElement("p");
        stock.classList.add("card-text");
        stock.textContent = "Stock: " + producto.stock;

        const precio = document.createElement("p");
        precio.classList.add("card-text");
        precio.textContent = "Precio: $" + producto.precio;

        const btnVenta = document.createElement("button");
        btnVenta.classList.add("btn", "btn-primary");
        btnVenta.textContent = "Registrar Venta";

        // Evento para mostrar modal
        btnVenta.addEventListener("click", () => mostrarModalVenta(producto));

        cardBody.appendChild(titulo);
        cardBody.appendChild(precio);
        cardBody.appendChild(stock);
        cardBody.appendChild(btnVenta);

        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        productContainer.appendChild(col);
    });
}

// Mostrar el modal para registrar una venta
function mostrarModalVenta(producto) {
    const modal = new bootstrap.Modal(document.getElementById('modalVenta'));
    modal.show();

    const cantidadInput = document.getElementById('cantidadVenta');
    const fechaInput = document.getElementById('fechaVenta');
    const btnVenta = document.getElementById('botonVenta');

    // Verifica si los elementos existen antes de añadirles eventos
    if (cantidadInput && fechaInput && btnVenta) {
        btnVenta.addEventListener('click', () => guardarVentas(producto));
    } else {
        console.log("Error: No se pudieron encontrar los elementos del formulario.");
    }

    // Guardar la venta
    function guardarVentas(producto) {
        const cantidad = parseInt(cantidadInput.value);
        const fecha = fechaInput.value;

        if (producto.stock >= cantidad && cantidad > 0) {
            producto.stock -= cantidad;
            producto.vendido = (producto.vendido || 0) + cantidad;
            const totalVenta = producto.precio * cantidad;

            const venta = {
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: cantidad,
                fecha: fecha,
                totalVenta: totalVenta
            };

            let ventas = JSON.parse(localStorage.getItem('ventas')) || [];
            ventas.push(venta);
            localStorage.setItem('ventas', JSON.stringify(ventas));

            let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
            productosGuardados = productosGuardados.map(p =>
                p.nombre === producto.nombre ? producto : p
            );
            localStorage.setItem('productos', JSON.stringify(productosGuardados));

            modal.hide();
            alert("Venta registrada exitosamente.");

            const totalAcumulado = ventas.reduce((acc, v) => acc + v.totalVenta, 0);

            window.location.reload();
        } else {
            alert("No hay suficiente stock o la cantidad no es válida.");
        }
    }
}

// Mostrar total de materiales
function spanMaterial() {
    const materialCantidad = document.getElementById("totalMateriales");
    const materiales = JSON.parse(localStorage.getItem('materiales')) || [];

    console.log("Materiales:", materiales); // Verifica que los materiales estén siendo cargados correctamente

    let totalCantidad = materiales.reduce((acc, mat) => acc + (parseInt(mat.cantidad) || 0), 0);
    materialCantidad.textContent = totalCantidad;
}

// Mostrar stock total de productos
function spanProducto() {
    const productosStock = document.getElementById("totalProductos");
    const productos = JSON.parse(localStorage.getItem('productos')) || [];

    console.log("Productos para stock:", productos); // Verifica que los productos estén siendo cargados correctamente

    let totalStock = productos.reduce((acc, prod) => acc + (parseInt(prod.stock) || 0), 0);
    productosStock.textContent = totalStock;
}

// Mostrar cantidad de productos vendidos
function spanVendidos() {
    const vendidosSpan = document.getElementById("totalVentas");
    const productos = JSON.parse(localStorage.getItem('productos')) || [];

    console.log("Productos vendidos:", productos); // Verifica si se cargan correctamente los productos vendidos

    let totalVendidos = productos.reduce((acc, prod) => acc + (parseInt(prod.vendido) || 0), 0);
    vendidosSpan.textContent = totalVendidos;
}

// Mostrar total acumulado de ventas
function spanVentas() {
    const totalSpan = document.getElementById("productosVendidos");
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];

    console.log("Ventas cargadas:", ventas); // Verifica que las ventas se carguen correctamente

    const totalAcumulado = ventas.reduce((acc, venta) => acc + (parseFloat(venta.totalVenta) || 0), 0);
    totalSpan.textContent = totalAcumulado;
}

// Generar gráfica de stock por producto
function generarGrafica() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const nombres = productos.map(p => p.nombre + " (" + p.stock + ")");
    const stocks = productos.map(p => p.stock);

    const canvas = document.getElementById('graficaStock');
    const ctx = canvas.getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombres,
            datasets: [{
                label: 'Stock por Producto',
                data: stocks,
                backgroundColor: 'rgba(236, 29, 29, 0.88)',
                borderColor: 'rgb(211, 40, 40)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const producto = productos[context.dataIndex];
                            return "Stock: " + producto.stock;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

// Ejecutar funciones al cargar la página
window.onload = function () {
    generarGrafica();
    spanVentas();
    spanVendidos();
    spanProducto();
    spanMaterial();
    imprimirProducto();
};
