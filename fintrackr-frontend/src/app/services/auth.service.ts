import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/';

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient) {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      this._isLoggedIn.next(true);
    }
  }

  loginApi(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}auth/login`, body);
  }

  login(username: string, jwtToken: string) {
    localStorage.setItem('jwt', jwtToken);
    localStorage.setItem('username', username);
    this._isLoggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    this._isLoggedIn.next(false);
  }
}
