import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClothingDataService {

  private clothingUrl = "http://localhost:8080";
  private aggregationsSubject = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.clothingUrl}`+"/clothingUrl");
  }

  getIndexPageItems(): Observable<any> {
    
    return this.http.get<any>(`${this.clothingUrl}`+"/indexPageItems");
  }

  getSearchClothing(query: string): Observable<any> {
    const params = new HttpParams().set('q', query);
    return this.http.get(`${this.clothingUrl}`+"/search", { params });
  }

  getSearchClothingUpdate(query: string, filter:string): Observable<any> {
    let params = new HttpParams()
    .set('q', query)
    .set('f', filter);

    return this.http.get(`${this.clothingUrl}/updateSearch`, { params });
  }
  
  aggregations$ = this.aggregationsSubject.asObservable();

  setAggregations(data: any) {
    this.aggregationsSubject.next(data);
  }
}
