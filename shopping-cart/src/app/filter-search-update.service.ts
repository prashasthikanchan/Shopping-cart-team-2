import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterSearchUpdateService {

  private filterDataSubject = new BehaviorSubject<any>(null);
  filterData$ = this.filterDataSubject.asObservable();

  updateFilterData(data: any) {
    this.filterDataSubject.next(data);
  }
}
