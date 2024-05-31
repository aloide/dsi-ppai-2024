import { Resena } from "../src/models/resena";

export function getResenas(): Resena[] {

    return [
        new Resena(true, new Date("31-05-2023"), 4),
        new Resena(true, new Date("30-05-2022"), 2),
        new Resena(false, new Date("30-06-2003"), 3),
        new Resena(false, new Date("07-06-2023"), 3),
    ]


}
