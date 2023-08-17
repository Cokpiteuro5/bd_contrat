export interface Departement {
  id?: number;
  codeDprt?: number;
  nomDprt?: string;
  crdPersonnel?: number;
  crdMateriel?: number;
  crdPaiement?: number;
  crdEngagement?: number;
  Name?: string; // Add Name property
}


export interface ResDepar{
  success?: boolean;
  departements:Departement[]
}

export interface ResDepars{
  success?: boolean;
  departements:Departement[]
}

export interface ResOneDepar{
  success?: boolean;
  departement:Departement
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  nextPage: number;
}


export interface BudgetResponse {
  success?: boolean;
  result: BudgetData[];
}

export interface BudgetData {
  Name: string;
  crdPersonnel: number;
  crdInvestment: number;
  crdDiverse: number;
  crEngagement: number;
}


