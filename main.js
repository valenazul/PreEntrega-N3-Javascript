// Array de productos
const productos = [
    { id: 1, nombre: 'Mopa', precio: 1000, imagen: 'mi_mopa.jpg' },
    { id: 2, nombre: 'Shampoo', precio: 2000, imagen: 'shampoo.jpg' },
    { id: 3, nombre: 'Silicona', precio: 3500, imagen: 'silicona.jpg' },
    { id: 4, nombre: 'Cuero', precio: 5000, imagen: 'cuero.jpg' },
    { id: 5, nombre: 'Cera', precio: 500, imagen: 'cera.jpg' },
    { id: 6, nombre: 'Brochas', precio: 120, imagen: 'brochas.jpg' }
];

// Obtener el carrito del almacenamiento local o crear uno nuevo
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar un producto al carrito
function agregarProducto(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
    alert(`Producto agregado: ${producto.nombre}`);
}

// Función para finalizar la compra y mostrar el total
function finalizarCompra() {
    let total = 0;
    for (const producto of carrito) {
        total += producto.precio;
    }
    alert(`El total de la compra es: $${total}`);
    // Vaciar el carrito y actualizar en el almacenamiento local
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Función para actualizar la lista del carrito en el DOM
function actualizarCarrito() {
    const carritoList = document.getElementById("carritoList");
    carritoList.innerHTML = ''; // Limpiar lista

    carrito.forEach(function (producto) {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - Precio: $${producto.precio}`;
        carritoList.appendChild(li);
    });
}

// Función para mostrar los productos en el catálogo
function mostrarCatalogo() {
    const productCatalog = document.getElementById("productCatalog");
    productos.forEach(function (producto) {
        const div = document.createElement("div");
        div.classList.add("producto");

        const img = document.createElement("img");
        img.src = `images/${producto.imagen}`;
        img.alt = producto.nombre;
        div.appendChild(img);

        const boton = document.createElement("button");
        boton.textContent = `Añadir al carrito`;
        boton.addEventListener("click", function () {
            agregarProducto(producto.id);
        });
        div.appendChild(boton);

        productCatalog.appendChild(div);
    });
}

// Mostrar el catálogo al cargar la página
mostrarCatalogo();
