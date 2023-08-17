import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Auth } from 'src/app/models/auth';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;
  loginError: string | null = null;
  constructor(private authService:AuthService,private formBuilder: FormBuilder,private http: HttpClient,private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit(): void {

  }

  login(): void {
    if (this.loginForm.invalid) {
      // Form is invalid, return or show an error message
      return;
    }

    const email = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    // Make the API POST request to the login endpoint using the AuthService
    this.authService.login(email, password).subscribe(
      (response : any) => {
        // Check if the response contains the token (adjust the token key if needed)
        if (response.success ) {
          localStorage.setItem('user',JSON.stringify(response.user))
          localStorage.setItem('profile',response.user.profil.nom)
        }
        if (response.token ) {
          // Handle the successful login response
          // Save the token to localStorage and redirect to the dashboard/home page
          localStorage.setItem('userToken', 'Bearer ' + response.token);
          localStorage.setItem('userToken', 'Bearer ' + response.token);

          this.router.navigate(['/dashboard']); // Redirect to the dashboard/home page
        } else {
          // If the response does not contain a valid token, handle the error
          this.loginError = 'Invalid username or password'; // Set the error message
          console.error('Login failed: Invalid response from the server');
          // Optionally, show an error message to the user on the login form
        }
        console.log(response);
      },
      (error) => {
        // Handle the login error (e.g., show an error message)
        this.loginError = 'An error occurred during login'; // Set the error message
        console.error('Login failed:', error);
        // Optionally, show an error message to the user on the login form
      }
    );
  }

}
