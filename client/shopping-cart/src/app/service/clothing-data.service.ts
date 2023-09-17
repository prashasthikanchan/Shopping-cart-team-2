import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClothingDataService {
  private clothingUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.clothingUrl}` + '/clothingUrl');
  }

  getIndexPageItems(): Observable<any> {
    return this.http.get<any>(`${this.clothingUrl}` + '/indexPageItems');
  }
}
