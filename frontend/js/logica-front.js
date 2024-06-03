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
                let textoDecodeado = atob(text)
                const textBlob = new Blob([textoDecodeado], { type: 'text/plain' });
                // Crear una URL para el Blob
                const url = window.URL.createObjectURL(textBlob);
                // Crear un enlace para descargar el archivo
                const a = document.createElement('a');
                a.href = url;
                a.download = 'ranking.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);

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

















/*
// Función para cargar los vinos
const cargarVinos = () => {
    fetch("http://localhost:3000/vinos")
        .then((respuesta) => respuesta.json())
        .then((vinos) => {
            // Carga filas de la tabla con los datos de los vinos
            const listaVinos = document.getElementById("top");
            listaVinos.innerHTML = ''; // Limpiar lista existente antes de añadir nuevas entradas

            // Agregar título "Top 10" antes de la tabla con la clase "top10"
            const titulo = document.createElement('h2');
            titulo.textContent = 'Top 10';
            titulo.classList.add('top10');
            listaVinos.parentNode.insertBefore(titulo, listaVinos);

            for (let vino of vinos) {
                const row = `
                    <tr>
                        <td>${vino.nombre}</td>
                        <td>${vino.calificacionSommelier}</td>
                        <td>${vino.calificacionGeneral}</td>
                        <td>${vino.precio}</td>
                        <td>${vino.bodega}</td>
                        <td>${vino.varietal}</td>
                        <td>${vino.region}</td>
                        <td>${vino.pais}</td>
                    </tr>
                `;
                listaVinos.innerHTML += row; // Agregar fila a la tabla
                console.log(row); // Imprimir vino en consola
            }

            // Agregar botón de descarga y estilos después de cargar los vinos
            const contentContainer = document.querySelector(".content-container");
            const buttonHTML = `<button id="descargarButton">Descargar</button>`;
            const buttonElement = document.createElement("div");
            buttonElement.innerHTML = buttonHTML;
            const table = document.querySelector("table");
            contentContainer.insertBefore(buttonElement.firstChild, table);

            // Estilos para el botón de descarga
            const buttonStyle = document.createElement("style");
            buttonStyle.textContent = `
                #descargarButton {
                    color: #a06a65;
                    border: none;
                    cursor: pointer;
                    padding: 20px 56px;
                    font-size: 20px;
                    border-radius: 20px;
                    z-index: 2;
                    position: relative;
                    top: 200px  ;
                }
                
                #descargarButton:hover {
                    background-color: #555;
                }
            `;
            document.head.appendChild(buttonStyle);

            // Aplicar estilos para el efecto de empañado después de cargar la tabla
            const tableAfterStyle = document.createElement("style");
            tableAfterStyle.textContent = `
                table:after {
                    content: '';
                    position: absolute;
                    left: 0px;
                    bottom: -40px;
                    width: 100%;
                    height: 323px;
                    background: linear-gradient(to bottom, rgba(215, 216, 213, 0), #000);
                    pointer-events: none;
                }
            `;
            document.head.appendChild(tableAfterStyle);

            // Ocultar el mensaje de "Generando..." después de un tiempo
            setTimeout(() => {
                generandoMensaje.style.display = 'none';
            }, 2000); // Ajusta el tiempo según sea necesario

            // Habilitar el botón Generar después de cargar los vinos
            habilitarBoton(true);
        })
        .catch((error) => {
            console.log("Error al cargar los vinos: ", error);
            generandoMensaje.style.display = 'none'; // Ocultar el mensaje en caso de error
        });

    console.log("Carga pendiente de vinos...");
};
*/

