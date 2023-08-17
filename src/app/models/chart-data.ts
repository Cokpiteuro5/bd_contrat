import { Departement } from "./departement";

// In your chart-data.ts file, update the ChartData interface as follows:
export interface ChartData {
  nomDprt: string;
  codeDprt: string; // Change the type to string if it should be a string
  SUMTOTAL: number;
  backgroundColor: string; // Add this property to store the background color
}


export interface ResDeparTop5{
  success?: boolean;
  result: ChartData[];
  codeDprt: number; // Make sure the type matches correctly with the ChartData interface
  nomDprt: string;
  SUMTOTAL: number;
}

  export interface DepartmentSum {
    sumCrdPersonnel: number;
    sumCrdMateriel: number;
    sumCrdPaiement: number;
    sumCrdEngagement: number;
  }
