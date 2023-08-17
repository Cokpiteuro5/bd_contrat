import { Etiquette } from "./etiquette";
import { Odd } from "./odd";

export interface Objectif {
    id: number;
    label: string;
    etiquettes: Etiquette[];
    id_odd: Odd;
}
