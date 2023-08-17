import { Entite } from "./entite.model";

interface EntiteWithCalculatedValues extends Entite {
  calculatedTjmInterneValue: number;
  calculatedTjmExterneValue: number;
  calculatedSum: number;
}
