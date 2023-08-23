import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClothingDataService {

  private clothingUrl = 'assets/clothing.json'; 
  private indexPageItems = 'assets/indexPage.json'; 
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.clothingUrl);
  }
  getIndexPageItems(): Observable<any> {
    return this.http.get<any>(this.indexPageItems);
  }
}
