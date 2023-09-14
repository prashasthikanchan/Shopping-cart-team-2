import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClothingDataService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>('/clothingUrl');
  }

  getIndexPageItems(): Observable<any> {
    return this.http.get<any>('/indexPageItems');
  }
}
