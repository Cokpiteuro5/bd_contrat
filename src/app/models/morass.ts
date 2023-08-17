import { Departement } from 'src/app/models/departement';
export interface Morass {
  id?: number,
  codeFonc?: string;
  codeEco?: string;
  prog?: string;
  reg?: string;
  proj?: string;
  lig?: string;
  rubriques?:string;
  creditsDePaiemant?: string;
  category?: string;
  sheetName?:string;
  Departement_id?:Departement;
  code_odd?: string;
  etiquette?: string;
  // type?:string;
  // pays?: string;
  // annee?: string;
}

export interface ResMorass{
  success?: boolean;
  budgetaires:Morass[];
  category?: string;
}
export interface ResMorasses{
  success?: boolean;
  budgetaires:Morass[];
  paginations: Pagination;
}
export interface ResOneMorass {
  success?: boolean;
  budgetaire: Morass;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  nextPage: number;
}

