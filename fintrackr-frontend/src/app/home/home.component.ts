import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

interface CustomJwtPayload {
  username: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (username) {
      console.log(`Stored username in localStorage: ${username}`);
      const apiUrl = 'http://localhost:3000';
      this.http.get(`${apiUrl}/users/${username}`).subscribe(data => {
        console.log(`Received user data:`, data);
        this.user = data;
      }, error => {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
      });
    } else {
      console.warn('No username found in localStorage.');
    }
  }


}
