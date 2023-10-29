import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../services/user.service';

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
  newExpenseDescription: string = '';
  newExpenseAmount: number = 0;
  newExpenseDate: Date = new Date();

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    const username = localStorage.getItem('username');
    if (username) {
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

  onAddExpense(): void {
    const expenseData = {
      description: this.newExpenseDescription,
      amount: this.newExpenseAmount,
      date: this.newExpenseDate
    };

    this.userService.addExpense(this.user._id, expenseData).subscribe(response => {
      console.log('Dépense ajoutée avec succès:', response);
      this.fetchUserData();
    }, error => {
      console.error('Erreur lors de l\'ajout de la dépense:', error);
    });
  }

  onExpenseDeleted(): void {
    this.fetchUserData();
  }

  onExpenseUpdated(): void {
    this.fetchUserData();
  }

}
