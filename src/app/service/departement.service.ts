import { BudgetResponse, BudgetData } from './../models/departement';
import { ChartData, ResDeparTop5, DepartmentSum } from './../models/chart-data';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement, ResDepar, ResDepars, ResOneDepar } from '../models/departement';
import * as saveAs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  // baseUrl:'http://localhost:4000/api/v1/departement' | undefined

  baseUrl: string = 'http://localhost:4000/api/v1/departement';
  private readonly apiUrl2 ="http://localhost:4000/api/v1/budgetaire/calculatValue";
  private readonly apiUrl3 =   "http://localhost:4000/api/v1/budgetaire/calculateValueTop5"
  private apiUrl4 = 'http://localhost:4000/api/v1/departement/creditSum';

  constructor(private http: HttpClient) { }

  getGlobalSum(): Observable<DepartmentSum> {
    return this.http.get<DepartmentSum>(`${this.apiUrl4}`);
  }

  getTop5Departements(): Observable<ResDeparTop5> { // Use the ResDeparTop5 interface
    return this.http.get<ResDeparTop5>(this.apiUrl3);
  }

  // calculatValue
  getBudgetData(): Observable<BudgetResponse> {
    return this.http.get<BudgetResponse>(this.apiUrl2);
  }

  getDepartement(): Observable<{ departements: Departement[]}> {
    const url = `${this.baseUrl}`;
    return this.http.get<{ departements: Departement[]}>(url);
  }

  addDepart(data: Departement): Observable<Departement> {
    return this.http.post<Departement>('http://localhost:4000/api/v1/departement', data);
  }

  getDeparts():Observable<ResDepar>{
    return this.http.get<ResDepar>(`${this.baseUrl}`);
  }



  downloadExcel(): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return this.http.get('http://localhost:4000/api/v1/departement/sample/templateExcel', {
      headers: headers,
      responseType: 'blob'
    });
  }

  saveExcelFile(blob: Blob, filename: string): void {
    saveAs(blob, filename);
  }

  searchDepart(search:string):Observable<ResDepars>{
    return this.http.get<ResDepars>(`http://localhost:4000/api/v1/departement/search/by?query=${search}`)
  }
  deleteDepart(id:string):Observable<ResDepar>{
    return this.http.delete<ResDepar>(`${this.baseUrl}/${id}`)
  }
  editDepart(id:string|undefined,data:Departement):Observable<ResOneDepar>{
    return this.http.put<ResOneDepar>(`http://localhost:4000/api/v1/departement/${id}`,data)
  }
  getOneDepart(id:string| undefined ):Observable<ResOneDepar> {
    return this.http.get<ResOneDepar>(`http://localhost:4000/api/v1/departement/${id}`)
  }

}
