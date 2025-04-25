// Botón para agregar material
const btnMaterial = document.getElementById("botonMaterial");

// Recuperamos los materiales guardados en localStorage (o vacío si no hay)
let materialesGuardados = JSON.parse(localStorage.getItem('materiales')) || [];

// Agregamos el evento para ingresar material
btnMaterial.addEventListener('click', () => ingresarMaterial());

// Función para agregar material
function ingresarMaterial() {
    const nombre = document.getElementById("iNombre").value;
    const proveedor = document.getElementById("iProveedor").value;
    const precio = parseFloat(document.getElementById("iPrecio").value);
    const cantidad = parseFloat(document.getElementById("iCant").value); 
    const fecha = document.getElementById("iFecha").value;

    let coincidencia = false;

    materialesGuardados.forEach(material => {
        if (material.nombre === nombre && material.proveedor === proveedor) {
            // Actualizamos los datos del material si existe
            material.cantidad += cantidad;
            material.precio = precio;
            material.fecha = fecha;
            coincidencia = true;
        }
    });

    // Si no existe, lo agregamos como nuevo
    if (coincidencia==false) {
        const datos = { 
            nombre: nombre,
            proveedor: proveedor,
            precio: precio,
            cantidad: cantidad, 
            fecha: fecha 
        };
        materialesGuardados.push(datos);
    }

    // Guardamos la lista actualizada en localStorage
    localStorage.setItem('materiales', JSON.stringify(materialesGuardados));

    // Calculamos y guardamos el total de materiales
    let totalCantidad = materialesGuardados.reduce((total, material) => total + material.cantidad, 0);
    localStorage.setItem('totalCantidad', totalCantidad);

    alert("Material agregado exitosamente");
    window.location.reload(); 
}

// Botón para agregar producto
const btnProducto = document.getElementById("botonProducto");

// Recuperamos los productos guardados en localStorage
let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

// Agregamos el evento para guardar producto
btnProducto.addEventListener('click', () => guardarProducto());

// Función para guardar o actualizar producto
function guardarProducto() {
    const nombre = document.getElementById("nomProd").value;
    const precio = document.getElementById("precioProducto").value;
    const descripcion = document.getElementById("descripProducto").value;
    const materiales = document.getElementById("materialesProducto").value;
    const stock = parseInt(document.getElementById("stockProducto").value);
    const imagenInput = document.getElementById("imgProducto");

    const imagen = imagenInput.files[0];
    const reader = new FileReader();

    // Al cargar la imagen, guardamos el producto
    reader.onload = function(event) {
        const imagenBase64 = event.target.result;

        let coincidencia = false;

        productosGuardados.forEach(producto => {
            if (producto.nombre === nombre) {
                producto.stock += stock; 
                producto.precio = precio;
                producto.descripcion = descripcion;
                producto.materiales = materiales;
                producto.imagen = imagenBase64;
                coincidencia = true;
            }
        });

        // Si el producto no existe, lo agregamos como nuevo
        if (coincidencia==false) {
            const nuevoProducto = { nombre, precio, descripcion, materiales, stock, imagen: imagenBase64 };
            productosGuardados.push(nuevoProducto);
        }

        // Guardamos la lista de productos en localStorage
        localStorage.setItem('productos', JSON.stringify(productosGuardados));

        alert("Producto guardado exitosamente");
        window.location.reload();
    };

    // Solo se ejecuta si hay imagen
    if (imagen) {
        reader.readAsDataURL(imagen);
    } else {
        alert("Por favor, selecciona una imagen.");
    }
}

// Función para cargar proveedores desde una API
function cargarName() {
    const select = document.getElementById("iProveedor");
    const urlApi = 'https://jsonplaceholder.typicode.com/users';
    
    fetch(urlApi)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        // Añadimos los proveedores al select
        data.forEach(function(proveedor) {
            const opcion = document.createElement("option");
            opcion.textContent = proveedor.name;
            opcion.value = proveedor.name;
            select.appendChild(opcion);
        });
    });
}

// Llamamos a la función para cargar los proveedores
cargarName();

// Función para actualizar el select
function actualizarSelect() {
    const select = document.getElementById("materialesProducto");

    // Añadimos los materiales disponibles al select
    materialesGuardados.forEach(material => {
        const option = document.createElement("option");
        option.textContent = material.nombre;
        select.appendChild(option);
    });
}

// Actualizamos el select al cargar la página
actualizarSelect();