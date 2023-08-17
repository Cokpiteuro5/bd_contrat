import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResOdd, ResOddBudget } from '../models/odd';
import { TypeInvestisement } from '../models/TypeInvestisement.model';
import { NatureProgramme } from '../models/NatureProgramme.model';
import { Priorite } from '../models/Priorite.model';
import { Enjeux } from '../models/enjeux.model';
import { Lead } from '../models/Lead.model';
import { TypeAgile } from '../models/TypeAgile.model';
import { Programme } from '../models/Programme.model';
import { Entite } from '../models/entite.model';
import { BudgetCtb } from '../models/BudgetCtb.model';
import { Auth } from '../models/auth';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {


  // downloadOddExcel() {
  //   throw new Error('Method not implemented.');
  // }
  // saveExcelFile(blob: any, arg1: string) {
  //   throw new Error('Method not implemented.');
  // }

  // baseUrl: string = 'http://localhost:4000/api/v1/odd/odd-calc'
  private backendUrl ='http://localhost:5000/api';


  constructor(private http: HttpClient) { }


//   getOddBudegt():Observable<ResOddBudget> {
//     return this.http.get<ResOddBudget>('http://localhost:4000/api/v1/odd/odd-calc')
// }

createTypeAgile(typeAgile: TypeAgile): Observable<TypeAgile> {
  return this.http.post<TypeAgile>(`${this.backendUrl}/type_agile`, typeAgile);
}
createlead(LeaD: Lead): Observable<Lead> {
  return this.http.post<Lead>(`${this.backendUrl}/lead`, LeaD);
}

createenjeux(enjeux: Enjeux): Observable<Enjeux> {
  return this.http.post<Enjeux>(`${this.backendUrl}/enjeux`, enjeux);
}

createPriorite(priorite: Priorite): Observable<Priorite> {
  return this.http.post<Priorite>(`${this.backendUrl}/priorite`, priorite);
}

createNature(nature: NatureProgramme): Observable<NatureProgramme> {
  return this.http.post<NatureProgramme>(`${this.backendUrl}/nature_programme`, nature);
}


createInvestisement(Investisement: TypeInvestisement): Observable<TypeInvestisement> {
  return this.http.post<TypeInvestisement>(`${this.backendUrl}/type_investisement`, Investisement);
}


createprogramme(Programme: Programme): Observable<Programme> {
  return this.http.post<Programme>(`${this.backendUrl}/programme`, Programme);
}

saveTemplateData(data: any): Observable<Entite> {
  return this.http.post<Entite>('http://localhost:5000/api/entite', data)
}
saveBudgetCtb(data: BudgetCtb): Observable<BudgetCtb> {
  return this.http.post<BudgetCtb>('http://localhost:5000/api/budget_ctb', data);
}
}
