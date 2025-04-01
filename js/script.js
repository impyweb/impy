document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const submitButton = document.querySelector('form button[type="submit"]');
    const nameInput = document.querySelector('input[name="nombre"]');
    const emailInput = document.querySelector('input[name="correo"]');
    const whatsappInput = document.querySelector('input[name="whatsapp"]');
    
    let selectedCount = 0;
    let maxClasses;

    // Lógica para determinar el número máximo de clases
    if (document.body.classList.contains('plan-avanzado')) {
        maxClasses = 12;
    } else if (document.body.classList.contains('plan-intensivo')) {
        maxClasses = 16;
    } else if (document.body.classList.contains('plan-basico')) {
        maxClasses = 8;
    } else if (document.body.classList.contains('clase-prueba')) {
        maxClasses = 1; // Para la clase de prueba solo se puede seleccionar 1
    }

    // Función para contar los checkboxes seleccionados
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                selectedCount++;
            } else {
                selectedCount--;
            }

            // Si estamos en la clase de prueba, solo permitir seleccionar 1 checkbox
            if (maxClasses === 1) {
                if (selectedCount >= 1) {
                    checkboxes.forEach(cb => {
                        if (!cb.checked) {
                            cb.disabled = true; // Deshabilita los checkboxes no marcados
                        }
                    });
                } else {
                    checkboxes.forEach(cb => {
                        cb.disabled = false;
                    });
                }
            } else {
                // Si se seleccionan el número máximo de clases, deshabilitar el resto
                if (selectedCount >= maxClasses) {
                    checkboxes.forEach(cb => {
                        if (!cb.checked) {
                            cb.disabled = true; // Deshabilita los checkboxes no marcados
                        }
                    });
                } else {
                    // Si hay menos de las clases permitidas seleccionadas, habilitar todos los checkboxes
                    checkboxes.forEach(cb => {
                        cb.disabled = false;
                    });
                }
            }

            // Habilitar o deshabilitar el botón de envío en función del número de clases seleccionadas
            checkFormValidity();
        });
    });

    // Función para validar que todos los campos del formulario estén completos
    function checkFormValidity() {
        // Comprobar si el número de clases es el correcto
        const isClassesValid = selectedCount === maxClasses;

        // Comprobar si todos los campos del formulario están completos
        const isNameValid = nameInput.value.trim() !== '';
        const isEmailValid = emailInput.value.trim() !== '' && /\S+@\S+\.\S+/.test(emailInput.value);
        const isWhatsappValid = whatsappInput.value.trim() !== '';

        // Habilitar el botón de envío solo si se cumplen todas las condiciones
        if (isClassesValid && isNameValid && isEmailValid && isWhatsappValid) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    // Llamar a la función de validación en caso de que el usuario ya haya ingresado datos
    nameInput.addEventListener('input', checkFormValidity);
    emailInput.addEventListener('input', checkFormValidity);
    whatsappInput.addEventListener('input', checkFormValidity);

    // Inicializar la validación del formulario
    checkFormValidity();
});
