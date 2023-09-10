import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private http: HttpClient) {}

  getCurrentUserFlag(): Observable<boolean> {
    // Assuming that the API endpoint '/currentUser' returns a boolean value.
    return this.http.get<boolean>('/currentUser').pipe(
      map((response: boolean) => {
        // Transform the response to a boolean value.
        return response;
      })
    );
  }

  updateCurrentUserFlag(currentUser: string, flag: boolean): Observable<string> {
    return this.http.put<string>(`/editCurrentUser`, currentUser);
  }

  getUserdetails(username: string): Observable<User[]> {
    return this.http.get<User[]>('/user');
  }

  createUserdetails(user: User): Observable<User> {
    return this.http.post<User>('/createUser', user);
  }
}
