import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Morass, Pagination, ResMorass, ResMorasses, ResOneMorass } from '../models/morass';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as saveAs from 'file-saver';
import { query } from '@angular/animations';
import { tap } from 'rxjs/operators';
import { Entite } from '../models/entite.model';
import { BudgetCtb } from '../models/BudgetCtb.model';
import { Projet } from '../models/projet.model';
import { Lead } from '../models/Lead.model';
import { Enjeux } from '../models/enjeux.model';
import { Priorite } from '../models/Priorite.model';
import { NatureProgramme } from '../models/NatureProgramme.model';
import { TypeAgile } from '../models/TypeAgile.model';
import { Programme } from '../models/Programme.model';
import { TypeInvestisement } from '../models/TypeInvestisement.model';


@Injectable({
  providedIn: 'root'
})
export class MorassService {
  private readonly apiUrl ="http://localhost:4000/api/v1/budgetaire"
  private backendUrl ='http://localhost:5000/api';


  constructor(private http: HttpClient) { }

  private projectSubject: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);

  setProjectId(id: number) {
    this.projectSubject.next(id);
  }

  getProjectId() {
    return this.projectSubject.asObservable();
  }
  getAllEntiteofOneProjet(id:number){
    return this.http.get(`http://localhost:5000/api/entite/getallinone/${id}`)
  }



  getInvestisementById(id:number){
    return this.http.get(`http://localhost:5000/api/type_investisement/${id}`)

  }

  gettypeAgileById(id:number){
    return this.http.get(`http://localhost:5000/api/type_agile/${id}`)

  }



    getleadById(id:number){
      return this.http.get(`http://localhost:5000/api/lead/${id}`)

    }

    getenjeuxById(id:number){
      return this.http.get(`http://localhost:5000/api/enjeux/${id}`)

    }

    getnatureById(id:number){
      return this.http.get(`http://localhost:5000/api/nature_programme/${id}`)

    }

    getprioriteById(id:number){
      return this.http.get(`http://localhost:5000/api/priorite)/${id}`)

    }



  updateBudgetCtb(id: number, data: any) {
    const apiUrli = `${this.backendUrl}/budget_ctb/${id}`; // Assuming id is the resource identifier
    return this.http.patch(apiUrli, data);
  }




  getentiteById(projectId: number): Observable<any> {

    return this.http.get(`${this.backendUrl}/entite/${projectId}`);
  }








  getMBall(): Observable<{ budgetaires: Morass[] }> {
    const url = `${this.apiUrl}`;
    return this.http.get<{ budgetaires: Morass[] }>(url);
  }

  getMorassesByCategory(category: string): Observable<ResMorasses> {
    const params = new HttpParams()
      .set('category', category)

    const url = `${this.apiUrl}/sheet`;
    return this.http.get<ResMorasses>(url, { params }).pipe(
      tap((response: ResMorasses) => {
        console.log(response); // Check the response data
      })
    );
  }




addMorass(data: Morass): Observable<Morass> {
  return this.http.post<Morass>('http://localhost:4000/api/v1/budgetaire', data);
}

getMorasses():Observable<ResMorass>{
  return this.http.get<ResMorass>('http://localhost:4000/api/v1/budgetaire');
}


  downloadExcel(): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return this.http.get('http://localhost:4000/api/v1/budgetaire/sample/templateExcel', {
      headers: headers,
      responseType: 'blob'
    });
  }

  saveExcelFile(blob: Blob, filename: string): void {
    saveAs(blob, filename);
  }

  // searchMorasse(search:string):Observable<ResMorasses>{
  //   return this.http.get<ResMorasses>(`http://localhost:4000/api/v1/budgetaire/search/by?query=${search}`)
  // }

  deleteMorass(id:string):Observable<ResMorass>{
    return this.http.delete<ResMorass>(`http://localhost:4000/api/v1/budgetaire/${id}`)
  }

  editmorass(id:string|undefined,data:Morass):Observable<ResOneMorass>{
    return this.http.put<ResOneMorass>(`http://localhost:4000/api/v1/budgetaire/${id}`,data)
  }

  getOneMorass(id:string| undefined ):Observable<ResOneMorass> {
    return this.http.get<ResOneMorass>(`http://localhost:4000/api/v1/budgetaire/${id}`)
  }





  getTemplateData(): Observable<Entite[]>  {
    return this.http.get<Entite[]>(`${this.backendUrl}/entite`)
  }



  getOneEntite(id: any): Observable<Entite> {
    return this.http.get<Entite>(`${this.backendUrl}/entite/${id}`);
  }
  updateTemplateDataById(id: any, data: any): Observable<any> {
    return this.http.patch(`${this.backendUrl}/entite/${id}`, data);
  }



  getBudgetCtb(): Observable<BudgetCtb[]> {
    return this.http.get<BudgetCtb[]>(`${this.backendUrl}/budget_ctb`);
  }
  // getMontantById(id : number): Observable<Montant> {
  //   return this.http.get<Montant>(`${this.backendUrl}/montant/${id}`);
  // }

  createProjet(projet: any): Observable<Projet> {
    return this.http.post<Projet>(`${this.backendUrl}/projet`, projet);
  }

  getProjet(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.backendUrl}/projet`);
  }

  getlead(): Observable<Lead[]> {
    return this.http.get<Lead[]>(`${this.backendUrl}/lead`)
  }

  getenjeux(): Observable<Enjeux[]> {
    return this.http.get<Enjeux[]>(`${this.backendUrl}/enjeux`)
  }
  getpriorite(): Observable<Priorite[]> {
    return this.http.get<Priorite[]>(`${this.backendUrl}/priorite`)
  }
  getnature(): Observable<NatureProgramme[]> {
    return this.http.get<NatureProgramme[]>(`${this.backendUrl}/nature_programme`)
  }
  gettypeAgile(): Observable<TypeAgile[]> {
    return this.http.get<TypeAgile[]>(`${this.backendUrl}/type_agile`)
  }

  getprogramme(): Observable<Programme[]> {
    return this.http.get<Programme[]>(`${this.backendUrl}/programme`)
  }

  getinvestisement(): Observable<TypeInvestisement[]> {
    return this.http.get<TypeInvestisement[]>(`${this.backendUrl}/type_investisement`)
  }



    saveBudgetsData(data: any): Observable<any> {
      const saveUrl = `${this.backendUrl}/entite`; // Replace with your actual save endpoint URL
      return this.http.post<any>(saveUrl, data);
    }








}

