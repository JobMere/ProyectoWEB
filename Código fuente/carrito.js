document.addEventListener('DOMContentLoaded', () => {
    const carritoIcono = document.querySelector('.carrito a');
    const carritoPanel = document.getElementById('carrito-panel');
    const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
    const contadorCarrito = document.getElementById('contador-carrito');
    const carritoPanelBody = document.querySelector('.carrito-panel-body');
    const carritoTotalEl = document.getElementById('carrito-total');
    const btnContinuarCompra = document.querySelector('.btn-continuar-compra');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const actualizarCarrito = () => {
        if (carritoPanelBody) {
            carritoPanelBody.innerHTML = '';

            if (carrito.length === 0) {
                carritoPanelBody.innerHTML = '<p class="carrito-vacio-msg">Tu carrito está vacío.</p>';
            } else {
                carrito.forEach((producto, index) => {
                    const itemHTML = `
                        <div class="carrito-item" data-id="${index}">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                            <div class="carrito-item-info">
                                <h4>${producto.nombre}</h4>
                                <p>S/ ${parseFloat(producto.precio).toFixed(2)}</p>
                            </div>
                            <div class="carrito-item-cantidad">
                                <button class="btn-restar">-</button>
                                <span>${producto.cantidad}</span>
                                <button class="btn-sumar">+</button>
                            </div>
                            <button class="btn-eliminar"><i class="fas fa-trash"></i></button>
                        </div>`;
                    carritoPanelBody.innerHTML += itemHTML;
                });
            }
        }

        const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
        const totalPrecio = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

        if (contadorCarrito) contadorCarrito.textContent = totalItems;
        if (carritoTotalEl) carritoTotalEl.textContent = `S/ ${totalPrecio.toFixed(2)}`;

        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    const agregarProductoAlCarrito = ({ nombre, precio, imagen }) => {
        let index = carrito.findIndex(p => p.nombre === nombre);
        if (index !== -1) {
            carrito[index].cantidad++;
        } else {
            carrito.push({ nombre, precio: parseFloat(precio), imagen, cantidad: 1 });
        }
        actualizarCarrito();

        if (carritoPanelBody) {
            const itemEl = carritoPanelBody.querySelector(`.carrito-item[data-id="${index}"]`);
            if (itemEl) {
                itemEl.classList.add('item-agregado');
                setTimeout(() => itemEl.classList.remove('item-agregado'), 500);
            }
        }
    };

    const manejarClickPanel = (e) => {
        const item = e.target.closest('.carrito-item');
        if (!item) return;
        const id = parseInt(item.dataset.id);

        if (e.target.classList.contains('btn-sumar')) {
            carrito[id].cantidad++;
        } else if (e.target.classList.contains('btn-restar')) {
            carrito[id].cantidad--;
            if (carrito[id].cantidad <= 0) carrito.splice(id, 1);
        } else if (e.target.closest('.btn-eliminar')) {
            carrito.splice(id, 1);
        }

        actualizarCarrito();
    };

    // Listeners para el panel lateral
    if (carritoIcono && carritoPanel) {
        carritoIcono.addEventListener('click', e => {
            e.preventDefault();
            carritoPanel.classList.add('activo');
        });
    }

    if (cerrarCarritoBtn && carritoPanel) {
        cerrarCarritoBtn.addEventListener('click', () => carritoPanel.classList.remove('activo'));
    }

    if (carritoPanelBody) {
        carritoPanelBody.addEventListener('click', manejarClickPanel);
    }

    if (btnContinuarCompra) {
        btnContinuarCompra.addEventListener('click', (e) => {
            if (carrito.length === 0) {
                e.preventDefault();
                Swal.fire({
                    icon: 'warning',
                    title: 'Carrito Vacío',
                    text: 'No puedes continuar con la compra porque tu carrito está vacío.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Entendido'
                });
            }
        });
    }

    // Botones con clase `agregar-carrito` (para ofertas.html)
    document.querySelectorAll('.agregar-carrito').forEach(btn => {
        btn.addEventListener('click', () => {
            const nombre = btn.dataset.nombre;
            const precio = btn.dataset.precio;
            const imagen = btn.dataset.imagen;

            agregarProductoAlCarrito({ nombre, precio, imagen });
            if (carritoPanel) carritoPanel.classList.add('activo');
        });
    });

    actualizarCarrito();

    function abrirCarrito() {
  document.getElementById('carrito-panel').classList.add('activo');
}

function cerrarCarrito() {
  document.getElementById('carrito-panel').classList.remove('activo');
}

function continuarCompra() {
  alert("¡Gracias por tu compra!");
}

});
