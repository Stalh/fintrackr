import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface CustomJwtPayload {
  username: string;
  // autres champs du token
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        const jwtToken = response.access_token;

        localStorage.setItem('jwt', jwtToken);
        localStorage.setItem('username', this.username);
        console.log('Connexion réussie');

        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erreur lors de la connexion:', error);
      }
    );
  }
}

