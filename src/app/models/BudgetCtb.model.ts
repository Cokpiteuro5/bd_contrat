import { Entite } from "./entite.model";

export interface BudgetCtb {
  id?: number;
  entite_id?:Entite[];
  nom: string;
  sans_interne?: number;
}

export interface APIBudgetctb {
  budget_ctb: BudgetCtb;
  success?: boolean;
}




