import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
      (response) => {
        localStorage.setItem('jwt', response.access_token);
        console.log('Connexion réussie');
      },
      (error) => {
        console.error('Erreur lors de la connexion:', error);
      }
    );
  }

}
