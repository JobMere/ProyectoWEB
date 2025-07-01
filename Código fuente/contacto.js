document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año de copyright
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Simular items en el carrito (esto normalmente vendría de tu sistema)
    const cartCount = Math.floor(Math.random() * 5); // Número aleatorio para demostración
    document.getElementById('cart-count').textContent = `Carrito (${cartCount})`;
    
    // Seleccionar elementos del DOM
    const formulario = document.getElementById('formulario-contacto');
    const loader = document.getElementById('form-loader');
    const mensajeEnviado = document.getElementById('mensaje-enviado');
    const nuevoMensajeBtn = document.getElementById('nuevo-mensaje-btn');
    
    // Campos del formulario
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    
    // Elementos de error
    const nombreError = document.getElementById('nombre-error');
    const emailError = document.getElementById('email-error');
    const mensajeError = document.getElementById('mensaje-error');
    
    // Validación en tiempo real
    nombreInput.addEventListener('input', validateNombre);
    emailInput.addEventListener('input', validateEmail);
    mensajeInput.addEventListener('input', validateMensaje);
    
    // Funciones de validación
    function validateNombre() {
        const nombre = nombreInput.value.trim();
        const campo = nombreInput.parentElement;
        
        if (nombre === '') {
            showError(campo, nombreError, 'Por favor ingresa tu nombre completo');
            return false;
        } else if (nombre.length < 3) {
            showError(campo, nombreError, 'El nombre debe tener al menos 3 caracteres');
            return false;
        } else {
            showSuccess(campo, nombreError);
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const campo = emailInput.parentElement;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(campo, emailError, 'Por favor ingresa tu correo electrónico');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(campo, emailError, 'Por favor ingresa un correo válido');
            return false;
        } else {
            showSuccess(campo, emailError);
            return true;
        }
    }
    
    function validateMensaje() {
        const mensaje = mensajeInput.value.trim();
        const campo = mensajeInput.parentElement;
        
        if (mensaje === '') {
            showError(campo, mensajeError, 'Por favor escribe tu mensaje');
            return false;
        } else if (mensaje.length < 10) {
            showError(campo, mensajeError, 'El mensaje debe tener al menos 10 caracteres');
            return false;
        } else {
            showSuccess(campo, mensajeError);
            return true;
        }
    }
    
    function showError(campo, errorElement, message) {
        campo.classList.add('error');
        campo.classList.remove('success');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function showSuccess(campo, errorElement) {
        campo.classList.remove('error');
        campo.classList.add('success');
        errorElement.style.display = 'none';
    }
    
    // Manejar el envío del formulario
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar todos los campos
        const isNombreValid = validateNombre();
        const isEmailValid = validateEmail();
        const isMensajeValid = validateMensaje();
        
        if (isNombreValid && isEmailValid && isMensajeValid) {
            // Mostrar loader
            loader.style.display = 'block';
            formulario.style.opacity = '0.5';
            
            // Simular envío al servidor (en un caso real, usarías fetch o AJAX)
            setTimeout(function() {
                // Ocultar loader
                loader.style.display = 'none';
                
                // Ocultar formulario y mostrar mensaje de éxito
                formulario.style.display = 'none';
                mensajeEnviado.style.display = 'block';
                
                // Aquí normalmente enviarías los datos al servidor
                console.log('Formulario enviado:', {
                    nombre: nombreInput.value.trim(),
                    email: emailInput.value.trim(),
                    mensaje: mensajeInput.value.trim()
                });
                
                // Opcional: Limpiar el formulario
                formulario.reset();
            }, 2000);
        }
    });
    
    // Botón para enviar nuevo mensaje
    nuevoMensajeBtn.addEventListener('click', function() {
        mensajeEnviado.style.display = 'none';
        formulario.style.display = 'flex';
        formulario.style.opacity = '1';
    });
    
    // Efecto de focus para campos con floating label
    const campos = document.querySelectorAll('.campo input, .campo textarea');
    campos.forEach(campo => {
        const campoContenedor = campo.parentElement;
        
        campo.addEventListener('focus', function() {
            campoContenedor.classList.add('focused');
        });
        
        campo.addEventListener('blur', function() {
            if (campo.value === '') {
                campoContenedor.classList.remove('focused');
            }
        });
    });
    
    // Animación para elementos de contacto al hacer hover
    const contactoItems = document.querySelectorAll('.contacto-info-item');
    contactoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(10deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(0)';
        });
    });
});