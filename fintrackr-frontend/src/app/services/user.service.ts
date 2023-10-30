import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }



  addExpense(userId: string, expenseData: any): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}/users/${userId}/add_expense`, expenseData);
  }

  refreshUserData(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${username}`);
  }
  addUser(user : User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/`,user);
  }
}
