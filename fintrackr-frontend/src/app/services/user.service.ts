import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<User> {
    console.log(`Fetching user with username: ${username}`);
    return this.http.get<User>(`${this.apiUrl}/users/${username}`);
  }

  addExpense(userId: string, expenseData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/add_expense`, expenseData);
  }

  refreshUserData(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${username}`);
  }

}
