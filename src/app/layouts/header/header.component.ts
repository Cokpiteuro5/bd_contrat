import { AuthService } from 'src/app/auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string | null | undefined
  userEmail: string |null | undefined
  constructor(@Inject(DOCUMENT) private document: Document,private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('Name')
    this.userEmail = localStorage.getItem('Email')

  }
  sidebarToggle()
  {
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logout(): void {
    // Call the logout method from the AuthService
    this.authService.logout();
    // Redirect the user to the login page
    this.router.navigate(['/pages-login']);
  }
}
