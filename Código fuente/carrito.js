// Actualiza el contador del carrito en el header
function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    const contador = document.getElementById('contador-carrito');
    if (contador) contador.textContent = totalItems;
}

// Agrega un producto al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const index = carrito.findIndex(item => item.nombre === nombre);

    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({
            nombre: nombre,
            precio: parseFloat(precio),
            imagen: imagen,
            cantidad: 1
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    alert(`${nombre} fue agregado al carrito`);
}

// Espera que cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();

    const botones = document.querySelectorAll('.agregar-carrito');

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const nombre = boton.dataset.nombre;
            const precio = boton.dataset.precio;
            const imagen = boton.dataset.imagen;

            agregarAlCarrito(nombre, precio, imagen);
        });
    });
});
