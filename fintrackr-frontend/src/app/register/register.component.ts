import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  userForm: FormGroup;

  
constructor(private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar) {
  this.userForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    confirmPassword: ['', Validators.required],
    balance: [0, Validators.required],
  });
}

  
  register() {
    if (this.checkPWD()) {
      let user :User  = {
        username: this.userForm.get('username')!.value,
        password: this.userForm.get('password')!.value,
        balance: this.userForm.get('balance')!.value,
        expenses : []
      } 
      const userData = this.userForm.value;

      this.userService.addUser(userData).subscribe(
        (response) => {
          this.snackBar.open('Inscription réussie!', 'Fermer', {
            duration: 3000,
          });

          this.userForm.reset();
        },
        (error) => {
          if (error.status === 409) {
            this.snackBar.open('Conflit: L\'utilisateur existe déjà.', 'Fermer', {
              duration: 3000,
            });
          } else {
            this.snackBar.open('Une erreur est survenue. Veuillez réessayer plus tard.', 'Fermer', {
              duration: 3000,
            });
          }
        }
      );
    } else {
      this.snackBar.open('Les mots de passe ne correspondent pas.', 'Fermer', {
        duration: 3000,
      });
    }
  }
  isUsernameDirty(): boolean {
    return this.userForm.get('username')!.dirty;
  }

  isPasswordDirty(): boolean {
    return this.userForm.get('password')!.dirty;
  }

  isConfirmPasswordDirty(): boolean {
    return this.userForm.get('confirmPassword')!.dirty;
  }

  isBalanceDirty(): boolean {
    return this.userForm.get('balance')!.dirty;
  }

  isFormValid(): boolean {
    return this.userForm.valid;
  }
  checkPWD(): boolean {
    return this.userForm.get('password')!.value === this.userForm.get('confirmPassword')!.value;
  }



}
