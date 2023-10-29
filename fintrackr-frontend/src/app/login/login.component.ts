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
    this.authService.loginApi(this.username, this.password).subscribe(
      (response: any) => {
        const jwtToken = response.access_token;
        this.authService.login(this.username, jwtToken);

        console.log('Connexion réussie');
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });

      },
      (error) => {
        console.error('Erreur lors de la connexion:', error);
      }
    );
  }
}
