document.addEventListener('DOMContentLoaded', () => {
    const carritoIcono = document.querySelector('.carrito a');
    const carritoPanel = document.getElementById('carrito-panel');
    const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
    const contadorCarrito = document.getElementById('contador-carrito');
    const carritoPanelBody = document.querySelector('.carrito-panel-body');
    const carritoTotalEl = document.getElementById('carrito-total');
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    const btnContinuarCompra = document.querySelector('.btn-continuar-compra');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

   

    const actualizarCarrito = () => {
        carritoPanelBody.innerHTML = '';
        if (carrito.length === 0) {
            carritoPanelBody.innerHTML = '<p class="carrito-vacio-msg">Tu carrito está vacío.</p>';
        } else {
            carrito.forEach(producto => {
                const itemHTML = `
                    <div class="carrito-item" data-id="${producto.id}">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <div class="carrito-item-info">
                            <h4>${producto.nombre}</h4>
                            <p>${producto.precio}</p>
                        </div>
                        <div class="carrito-item-cantidad">
                            <button class="btn-restar">-</button>
                            <span>${producto.cantidad}</span>
                            <button class="btn-sumar">+</button>
                        </div>
                        <button class="btn-eliminar"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                carritoPanelBody.innerHTML += itemHTML;
            });
        }

        // Actualizar contador y total
        const totalItems = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
        const totalPrecio = carrito.reduce((acc, prod) => acc + (parseFloat(prod.precio.replace('S/ ', '').replace(',', '')) * prod.cantidad), 0);

        if (contadorCarrito) {
            contadorCarrito.textContent = totalItems;
        }
        carritoTotalEl.textContent = `S/ ${totalPrecio.toFixed(2)}`;

        // Guardar en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    const agregarAlCarrito = (producto) => {
        const productoExistente = carrito.find(p => p.id === producto.id);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        actualizarCarrito();


        const itemEl = carritoPanelBody.querySelector(`.carrito-item[data-id="${producto.id}"]`);
        if (itemEl) {
            itemEl.classList.add('item-agregado');
            setTimeout(() => {
                itemEl.classList.remove('item-agregado');
            }, 700);
        }
    };

    const manejarClickPanel = (e) => {
        const target = e.target;
        const itemEl = target.closest('.carrito-item');
        if (!itemEl) return;

        const id = itemEl.dataset.id;
        let playAnimation = false;

        if (target.classList.contains('btn-sumar')) {
            const producto = carrito.find(p => p.id === id);
            if (producto) {
                producto.cantidad++;
                playAnimation = true;
            }
        }

        if (target.classList.contains('btn-restar')) {
            const producto = carrito.find(p => p.id === id);
            if (producto && producto.cantidad > 1) {
                producto.cantidad--;
            } else if (producto && producto.cantidad === 1) {
                carrito = carrito.filter(p => p.id !== id);
            }
        }

        if (target.closest('.btn-eliminar')) {
            carrito = carrito.filter(p => p.id !== id);
        }

        actualizarCarrito();

        if (playAnimation) {
            const updatedItemEl = carritoPanelBody.querySelector(`.carrito-item[data-id="${id}"]`);
            if (updatedItemEl) {
                updatedItemEl.classList.add('item-agregado');
                setTimeout(() => {
                    updatedItemEl.classList.remove('item-agregado');
                }, 700);
            }
        }
    };

    // --- EVENT LISTENERS ---

    carritoIcono.addEventListener('click', (e) => {
        e.preventDefault();
        carritoPanel.classList.add('activo');
    });

    cerrarCarritoBtn.addEventListener('click', () => {
        carritoPanel.classList.remove('activo');
    });

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const productoEl = boton.closest('.producto');
            const producto = {
                id: productoEl.querySelector('h3').textContent, 
                nombre: productoEl.querySelector('h3').textContent,
                precio: productoEl.querySelector('.precio').textContent,
                imagen: productoEl.querySelector('img').src
            };
            agregarAlCarrito(producto);
            carritoPanel.classList.add('activo');
        });
    });

    carritoPanelBody.addEventListener('click', manejarClickPanel);

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

    
    actualizarCarrito();
});