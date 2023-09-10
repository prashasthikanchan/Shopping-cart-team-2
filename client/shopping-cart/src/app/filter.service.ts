import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  selectedPriceRange: { min: number, max: number } = { min: 0, max: 1000 };
  selectedBrands: string[] = [];

  constructor() { }
}

