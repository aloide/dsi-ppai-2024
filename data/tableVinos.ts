import { Vino } from "../src/models/vino";

export function getVinos(){

    return [
        new Vino("Malbec", 1000),
        new Vino("Toro", 1200),
        new Vino("Santa julia", 2000),
        new Vino("Tetra Prision Break", 5000),

    ]

}