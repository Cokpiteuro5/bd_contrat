import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(private http: HttpClient) { }

  uploadDepartementFile(formData: FormData): Observable<any>  {
    const url = 'http://localhost:4000/api/v1/departement/uploadexlsx'
    return this.http.post(url, formData);
  }


  uploadEmployees(formData: FormData): Observable<any> {
    const uploadUrl = 'http://localhost:4000/api/v1/budgetaire/uploadexlsx';
  return this.http.post(uploadUrl, formData);   }

}
