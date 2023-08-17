import { Etiquette } from './etiquette';
import { Objectif } from "./objectif";

export interface Odd {
    id: number;
    odd: string;
    objectif: Objectif;
    etiquette: Etiquette;
    occurrences_etq: number;

}

export interface ResOdd{
    success: boolean,
    oddsLst: Odd[]
}

export interface OddBudget{
    id: number;
    label: string;
    code_odd: string,
    scr_finance: number;
    bs_finance: number;
    ecart: number;
}

export interface ResOddBudget{
    success: boolean;
    odds: OddBudget[]

}

export interface ResOneOdd {
  success: boolean;
  odd: OddBudget[];
}

export interface OddResponse {
  odd: Odd;
  success: boolean;
}

export interface Odd {
  id: number;
  odd: string;
}

export interface Odd {
  id: number;
  scr_finance: number;
  bs_finance: number;
  ecart: number;
}
