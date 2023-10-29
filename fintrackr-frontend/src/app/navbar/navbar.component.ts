import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('jwt');
    this.username = localStorage.getItem('username');
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
