import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private clothingUrl = 'http://localhost:8080';
  getUserdetails(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.clothingUrl}` + `/auth/${email}`);
  }

  createUserdetails(user: User): Observable<User> {
    return this.http.post<User>(
      `${this.clothingUrl}` + '/auth/createUser',
      user
    );
  }

  validatePassword(email: string, password: string): Observable<string> {
    return this.http.get<string>(
      `${this.clothingUrl}` + `/auth/${email}/${password}`
    );
  }
}
