import { Region } from "../src/models/region";

export function getRegiones(): Region[]{

    return[

        new Region("Norte"),
        new Region("Sur"),
        new Region("Este"),
        new Region("Oeste")

    ]

}