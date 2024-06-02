@startuml Diagrama de Secuencia CU 25

title Diagrama de Secuencia cu 25

actor ":Enófilo" as EN
boundary ":PantallaGenerarReporte" as PGR
control ":GestorDeRanking" as GR
entity ":Reseña" as RE
entity ":TipoReseña" as TRE
entity ":Reporte" as REP
entity ":FormasVisualizacion" as FVIS
entity ":Vino" as VI
entity ":Sommelier" as SOM
entity "unoDe:Vino" as UNVI

'PASO 2

EN->PGR:opcionGenerarRanking()
PGR->PGR:habilitarVentana()
EN->PGR:tomarSeleccionFechaDesde()
PGR->GR:tomarFechaDesde()

'PASO 3
EN->PGR:tomarSeleccionFechaHasta()
PGR->GR:tomarFechaHasta()

'PASO 4
GR->GR:esFechaValida()
GR->RE:esTuFecha()

'PASO 5
GR->TRE:getNombre()
GR->PGR:mostrarTipoReseñas()

'PASO 6
EN->PGR:tomarSeleccionTipoReseña()
PGR->GR:tomarTipoReseña()

'PASO 7
GR->FVIS:getTipoVisualizacion()
GR->PGR:mostrarTipoVisualizacion()

'PASO8
EN->PGR:tomarSeleccionDeTipoExcel()

'PASO9
GR->GR:solicitarConfirmacion()
GR->PGR:solicitarConfirmacion()

'PASO10
EN->PGR:tomarConfirmacion()
PGR->GR:tomarConfirmacion()

'PASO11
group loop Buscar Vinos ["Mientras haya vinos para buscar"]
GR->RE:buscarSegunPeriodo()
RE->SOM:sosDeSomelier()
SOM->SOM:validarSommelier()
end

'PASO 12
group loop Buscar reseñas ["Mientras haya reseñas de sommeliers"]
GR->RE:getVino()
RE->VI: sosDeSomelier()
VI->SOM:getPuntaje()
end
VI->VI:calcularPromedio()

'PASO 13
GR->GR:sort()

'PASO 14
GR->GR:generarArchivo()
GR->PGR:mostrarArchivo()
GR->GR:finCU()

@enduml