import { Component, OnInit } from '@angular/core';
import { ClothingDataService } from '../clothing-data.service';
import { Router } from '@angular/router';
import { ClothItem } from '../models/clothItem.model';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {
  starsArray: number[] = Array(5).fill(0);
  clothDataList: any[] = [];
  sizeOptions: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  selectedSize: string | null = null;
  quantityOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedQuantity: number = this.quantityOptions[0];
  selectedProduct: ClothItem | null = null;
  filteredClothDataList: any[] = [];
  searchParameters: any;
  clothParameters: any[] = [];

  constructor(private clothingDataService: ClothingDataService, private router: ActivatedRoute) { }

  ngOnInit(): void {

    this.clothingDataService.getProducts().subscribe(data => {
      this.clothDataList = data;
      this.filteredClothDataList = data;

      this.router.paramMap.subscribe(params => {
        var parameters = params.get('parameters');
        if (parameters && parameters.length > 0) {
          this.searchParameters = this.convertStringToObject(parameters);
          this.addSearchFilter(this.clothDataList, this.searchParameters);
        }
      });
    });


  }

  showItem(id: number, sidenav: MatSidenav): void {
    this.selectedSize = null;
    this.selectedProduct = this.clothDataList.find(item => item.id === id);
    console.log(this.selectedProduct)
    sidenav.open();
  }
  selectSize(size: string) {
    this.selectedSize = size;
  }
  selectQuantity(event: any) {
    this.selectedQuantity = event.value;
    console.log(this.selectedQuantity)
  }

  convertStringToObject(parameter: string): { [key: string]: string[] } {
    const keyValuePairs = parameter.split('+');
    const result: { [key: string]: string[] } = {};

    keyValuePairs.forEach(pair => {
      const [key, values] = pair.split('=');
      const parsedValues = values.split(',');

      if (!result[key]) {
        result[key] = [];
      }

      parsedValues.forEach(value => {
        result[key].push(value);
      });
    });

    return result;
  }

  arrToLower(arr: string[]): string[] {
    return arr.map(item => item.toLowerCase());
  }

  addFilter($event: any) {
    let checkedBoxFilter = $event;
    let colorFilter = checkedBoxFilter['color'];
    let brandFilter = checkedBoxFilter['brand'];
    let genderFilter = checkedBoxFilter['gender'];
    let ratingFilterString = checkedBoxFilter['rating'];
    let ratingFilter = ratingFilterString ? ratingFilterString.map(Number) : [];
    this.filteredClothDataList = this.clothDataList.filter((cloth: any) => {
      let colorMatches = colorFilter ? (colorFilter.length > 0 ? colorFilter.includes(cloth.color) : true) : true;
      let brandMatches = brandFilter ? (brandFilter.length > 0 ? brandFilter.includes(cloth.brand) : true) : true;
      let genderMatches = genderFilter ? (genderFilter.length > 0 ? genderFilter.includes(cloth.gender) : true) : true;
      let ratingMatches = ratingFilter ? (ratingFilter.length > 0 ? ratingFilter.includes(cloth.rating) : true) : true;

      if (colorMatches && brandMatches && genderMatches && ratingMatches) {
        return true;
      }
      return false;
    });

  }

  addSearchFilter(clothDataListInput: any[] = [], searchParameter: any) {
    let checkedBoxFilter = searchParameter;
    let colorFilter = checkedBoxFilter['color'];
    let brandFilter = checkedBoxFilter['brand'];
    let genderFilter = checkedBoxFilter['gender'];
    this.filteredClothDataList = clothDataListInput.filter((cloth: any) => {
      let colorMatches = colorFilter ? (colorFilter.length > 0 ? colorFilter.includes(cloth.color.toLowerCase()) : true) : true;
      let brandMatches = brandFilter ? (brandFilter.length > 0 ? brandFilter.includes(cloth.brand.toLowerCase()) : true) : true;
      let genderMatches = genderFilter ? (genderFilter.length > 0 ? genderFilter.includes(cloth.gender.toLowerCase()) : true) : true;

      if (colorMatches && brandMatches && genderMatches) {
        return true;
      }
      return false;
    });
  }

}

