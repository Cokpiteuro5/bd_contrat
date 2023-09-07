import { Projet } from "./projet.model";

export interface Entite {
  nom?: string;
  id?:string;
  interne?: number;
  externe?: number ;
  type: string;
  forfait?:number;
  regie?: number ;
  TJM_interne?:number;
  TJM_externe?:number;
  TJM_regie?:number;
  projet_id?: Projet[];
  updatedAt?:Date;
  createdAt?:Date;
  entite_id?:number;

};
export interface APIBudget {
  entite?: Entite | undefined;
  success?: boolean;
}



