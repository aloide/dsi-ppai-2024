// Obtener elementos del DOM
var modal = document.getElementById('rankingModal');
var btn = document.getElementById('openModal');
var span = document.querySelector('.close');
var form = document.getElementById('rankingForm');
var confirmModal = document.getElementById('confirmModal');
var cancelButton = document.getElementById('cancelButton');
var continueButton = document.getElementById('continueButton');
var generandoMensaje = document.getElementById('generandoMensaje');

// Abrir modal al hacer clic en el botón
btn.onclick = function() {
    modal.style.display = 'block';
    document.body.classList.add('modal-open'); // Agregar la clase al body
}

// Cerrar modal al hacer clic en la span (x)
span.onclick = function() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Quitar la clase del body
}

// Validar fechas en tiempo real
var fechaDesdeInput = document.getElementById('fecha-desde');
var fechaHastaInput = document.getElementById('fecha-hasta');
var fechaInvalidaMsg = document.getElementById('fecha-invalida');

fechaDesdeInput.addEventListener('input', validarFechas);
fechaHastaInput.addEventListener('input', validarFechas);

// Validar fechas en tiempo real
function validarFechas() {
    var fechaDesde = new Date(fechaDesdeInput.value);
    var fechaHasta = new Date(fechaHastaInput.value);

    if (fechaDesde > fechaHasta) {
        fechaInvalidaMsg.style.display = 'block';
        btn.onclick = null; // Deshabilitar el evento click del botón
    } else {
        fechaInvalidaMsg.style.display = 'none';
        btn.onclick = function() {
            modal.style.display = 'block';
            document.body.classList.add('modal-open'); // Agregar la clase al body
        };
    }
}

// Función para formatear la fecha a dd-mm-yyyy
function formatearFecha(fecha) {
    var partes = fecha.split('-');
    return partes[2] + '-' + partes[1] + '-' + partes[0];
}

// Abrir modal de confirmación al enviar el formulario
form.onsubmit = function(event) {
    event.preventDefault();
    confirmModal.style.display = 'block';
    document.body.classList.add('modal-open'); // Agregar la clase al body
}

// Botón de cancelar en el modal de confirmación
cancelButton.onclick = function() {
    confirmModal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Quitar la clase del body
}

// Botón de continuar en el modal de confirmación
continueButton.onclick = async function() {
    confirmModal.style.display = 'none';
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Quitar la clase del body
    generandoMensaje.style.display = 'block';
    try {
        var formData = new FormData(form);
        
        // Formatear fechas antes de enviarlas
        formData.set('fecha-desde', formatearFecha(fechaDesdeInput.value));
        formData.set('fecha-hasta', formatearFecha(fechaHastaInput.value));
        
        const response = await fetch('http://localhost:3000/generar-ranking', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al enviar los datos del formulario');
        }
        const data = await response.json();
        console.log(data); // Muestra la respuesta del servidor
    } catch (error) {
        console.error(error);
    }
    // Cerrar todos los modales y esperar 3.5 segundos antes de enviar el POST
    setTimeout(async () => {
        // Mostrar el mensaje de "Generando..."
        // Llamar a la función cargarVinos después de 3.5 segundos
        
        setTimeout(cargarVinos, 1500);
    }, 3500);
}

// Evitar que la cruz del modal de confirmación lo cierre
confirmModal.onclick = function(event) {
    if (event.target === confirmModal) {
        confirmModal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Quitar la clase del body
    }
}

// Función para cargar los vinos
const cargarVinos = () => {
    fetch("http://localhost:3000/api/vinos")
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
        })
        .catch((error) => {
            console.log("Error al cargar los vinos: ", error);
            generandoMensaje.style.display = 'none'; // Ocultar el mensaje en caso de error
        });

    console.log("Carga pendiente de vinos...");
};
