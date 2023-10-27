import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  username!: string;
  constructor(private userService : UserService){

  }

  checkUser() {
    this.userService.getUser(this.username).subscribe(
      (response) => {
        console.log(response.password);
        
        
      },
      (error) => {
        console.error('Erreur lors de la connexion:', error);
      }
    );
  }
}
