import { Pais } from "../src/models/pais"

export function getPais() {
    return[
        new Pais("Argentina", 1),
        new Pais("Francia", 2),
        new Pais("Italia", 3),
        new Pais("Chile", 4),
        new Pais("Uruguay", 5),
    ]
}