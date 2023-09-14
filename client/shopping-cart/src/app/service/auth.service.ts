import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  getUserdetails(email: string): Observable<boolean> {
    return this.http.get<boolean>(`/auth/${email}`);
  }

  createUserdetails(user: User): Observable<string> {
    return this.http.post<string>('/auth/createUser', user);
  }

  validatePassword(email: string, password: string): Observable<string> {
    return this.http.get<string>(`/auth/${email}/${password}`);
  }
}
