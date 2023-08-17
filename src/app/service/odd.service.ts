import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OddResponse, ResOdd, ResOddBudget } from '../models/odd';
import { Observable } from 'rxjs';
import * as saveAs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class OddService {

  baseUrl: string = 'http://localhost:4000/api/v1/odd'

  constructor(private http: HttpClient) { }

  getOdds():Observable<ResOdd> {
      return this.http.get<ResOdd>('http://localhost:4000/api/v1/odd')
  }

  updateOddAndCalculateEcart(id: number, data: any): Observable<any> {
    return new Observable((observer) => {
      this.patchOdd(id, data).subscribe(
        (response: OddResponse) => {
          observer.next(response);
          this.calculateAndUpdateEcart(id, data).subscribe(
            (ecartResponse: any) => {
              observer.next(ecartResponse);
              observer.complete();
            },
            (error) => {
              observer.error(error);
            }
          );

        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  public patchOdd(id: number, data: any) {
    const url = `${this.baseUrl}/${id}`; // Replace "odd" with the appropriate API endpoint for updating an odd
    return this.http.patch<OddResponse>(url, data);
  }

  public calculateAndUpdateEcart(id: number, data: any): Observable<any> {
    const url = `http://localhost:4000/api/v1/odd/ecart-calc`;
    return this.http.post<any>(url, data);
  }

  getOddBudget(): Observable<ResOddBudget> {
    return this.http.get<ResOddBudget>(`${this.baseUrl}/budget-list`);
  }


  downloadOddExcel(): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return this.http.get('http://localhost:4000/api/v1/odd/sample/templateExcel', {
      headers: headers,
      responseType: 'blob'
    });
  }

  saveExcelFile(blob: Blob, filename: string): void {
    saveAs(blob, filename);
  }

}
