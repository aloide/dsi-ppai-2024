export class Varietal {

    // no se aplican para este caso de uso
    // private descripcion: String = ""
    // private porcentajeComposicion = 0.0
    private nombre: string = ""

    // private tipoDeUva : TipoDeUva

    constructor(unNombre: string) {
        this.nombre = unNombre
    }

    getNombre(){
        return this.nombre
    }

}