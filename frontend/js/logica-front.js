//import * as pdf from "pdf-lib"




// Obtener elementos del DOM
var modal = document.getElementById('rankingModal');
var btn = document.getElementById('openModal');
var span = document.querySelector('.close');
var form = document.getElementById('rankingForm');
var confirmModal = document.getElementById('confirmModal');
var cancelButton = document.getElementById('cancelButton');
var continueButton = document.getElementById('continueButton');
var generandoMensaje = document.getElementById('generandoMensaje');
var botonGenerar = document.getElementById('botonGenerar'); // Nuevo: Obtener el botón Generar

// Abrir modal al hacer clic en el botón
btn.onclick = function () {
    modal.style.display = 'block';
    document.body.classList.add('modal-open'); // Agregar la clase al body
}

// Cerrar modal al hacer clic en la span (x)
span.onclick = function () {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Quitar la clase del body
}

// Validar fechas en tiempo real
var fechaDesdeInput = document.getElementById('fechaDesde');
var fechaHastaInput = document.getElementById('fechaHasta');
var fechaInvalidaMsg = document.getElementById('fecha-invalida');

fechaDesdeInput.addEventListener('input', validarFechas);
fechaHastaInput.addEventListener('input', validarFechas);

// Función para habilitar/deshabilitar el botón Generar
function habilitarBoton(cliqueable) {
    if (cliqueable) {
        botonGenerar.disabled = false;
    } else {
        botonGenerar.disabled = true;
    }
}

// Validar fechas en tiempo real
function validarFechas() {
    var fechaDesde = new Date(fechaDesdeInput.value);
    var fechaHasta = new Date(fechaHastaInput.value);

    if (fechaDesde > fechaHasta) {
        fechaInvalidaMsg.style.display = 'block';
        habilitarBoton(false); // Deshabilitar el botón
    } else {
        fechaInvalidaMsg.style.display = 'none';
        habilitarBoton(true); // Habilitar el botón
    }
}

// Función para formatear la fecha a mm-dd-yyyy
function formatearFecha(fecha) {
    var partes = fecha.split('-');
    console.log(partes);
    let anio = partes[0]
    let mes = partes[1]
    let dia = partes[2]
    return mes + "-" + dia + "-" + anio
}

// Abrir modal de confirmación al enviar el formulario
form.onsubmit = function (event) {
    event.preventDefault();
    confirmModal.style.display = 'block';
    document.body.classList.add('modal-open'); // Agregar la clase al body
}

// Botón de cancelar en el modal de confirmación
cancelButton.onclick = function () {
    confirmModal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Quitar la clase del body
}

// Botón de continuar en el modal de confirmación
// Botón de continuar en el modal de confirmación
continueButton.onclick = async function () {
    confirmModal.style.display = 'none';
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Quitar la clase del body

    try {
        const response = await fetch('http://localhost:3000/generar-ranking', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fechaDesde: formatearFecha(fechaDesdeInput.value),
                fechaHasta: formatearFecha(fechaHastaInput.value),
                tipoResena: document.getElementById("tipoResena").value,
                formatoArchivo: document.getElementById("formatoArchivo").value
            })
        });

        let text = await response.text()

        if (!response.ok) {
            alert("No hay vinos con esa fecha ingresada")
            //throw new Error('Error al enviar los datos del formulario');}
            return
        }


        // Esto basicamente es para descargar el CSV, SOLO PARA DESCARGAR
        if (response.ok) {
            if (formatoArchivo.value == 'excel') {
                
                alert('Entro al excel')
                // Crear un Blob a partir del contenido del archivo
                const blob = new Blob([text], { type: 'text/csv' });

                // Crear una URL para el Blob
                const url = window.URL.createObjectURL(blob);

                // Crear un enlace para descargar el archivo
                const a = document.createElement('a');
                a.href = url;
                a.download = 'ranking.csv';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);

                // Liberar los recursos del objeto URL
                window.URL.revokeObjectURL(url);
            }
            
            if (formatoArchivo.value == 'pdf') {

                console.log(text)
                let textoDecodeado = atob(text)
                
                const textBlob = new Blob([text], { type: 'text/plain' });
                // Crear una URL para el Blob
                const url = window.URL.createObjectURL(textBlob);
                // Crear un enlace para descargar el archivo
                const a = document.createElement('a');
                a.href = url;

                a.download = 'ranking.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                // Liberar los recursos del objeto URL
                window.URL.revokeObjectURL(url);
            }
            
            alert("Reporte generado con exito")

        }

    } catch (error) {
        console.error(error);
    }

}

// Evitar que la cruz del modal de confirmación lo cierre
confirmModal.onclick = function (event) {
    if (event.target === confirmModal) {
        confirmModal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Quitar la clase del body
    }
}