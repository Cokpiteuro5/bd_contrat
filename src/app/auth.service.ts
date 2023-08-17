import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from './models/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:5000/api/users'; // Adjust the URL to match your API endpoint

  private userSubject = new BehaviorSubject<Auth | null>(null); // Update the type to Auth | null
  userinfo = this.userSubject.asObservable();

  getAuth(): Auth | null { // Rename the method to getAuth
    return this.userSubject.getValue();
  }
  constructor(private http: HttpClient) {}

  // Login method to make the API POST request
  login(email: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(`${this.authUrl}/login`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('Name');
    localStorage.removeItem('Email');

  }
  // Check if the user is authenticated based on the presence of the user token in localStorage
  isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    return !!token;
  }
}
