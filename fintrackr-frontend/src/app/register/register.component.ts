import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  username!: string;
  constructor(private userService : UserService,private _snackBar: MatSnackBar){

  }
  comfirmPWD = ''
  user: User = {
    username: '',
    password: '',
    balance: 0,
    expenses : []
  };
  
  register(){
   
      this.userService.addUser(this.user).subscribe(
        ()=>{
          this._snackBar.open('Votre compte a été bien créé', 'Fermer', {
            duration: 3000,
          });
        },(error) => {
          if (error.status === 409) {
            this._snackBar.open("Il existe déjà un compte avec ce Nom d'utilisteur", 'Fermer', {
              duration: 3000,
            });
          }
        }
      )
    
    
  }

  checkPWD(){
    if( this.user.password === this.comfirmPWD) return true
    return false
  }

}
