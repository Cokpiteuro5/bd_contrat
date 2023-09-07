import { Entite } from "./entite.model";

export interface BudgetCtb {
  id?: number;
  entite_id?:number;
  projet_id?:number;
  nom: string;
  sans_interne?: number;
}

export interface APIBudgetctb {
  budget_ctb: BudgetCtb;
  success?: boolean;
}




