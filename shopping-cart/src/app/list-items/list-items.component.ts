import { Component, OnInit } from '@angular/core';
import { ClothingDataService } from '../clothing-data.service';
import { Router } from '@angular/router';
import { ClothItem } from '../models/clothItem.model';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
  filteredList: any[] = [];
  searchParameters: any;
  clothParameters: any[] = [];
  searchresult: string = '';
  sizeForm: FormGroup;

  constructor(private clothingDataService: ClothingDataService, private router: ActivatedRoute,
    private router2: Router, private formBuilder: FormBuilder) {
    this.selectedSize = '';
    this.sizeForm = this.formBuilder.group({
      selectedSize: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

    this.clothingDataService.getProducts().subscribe(data => {
      this.clothDataList = data;
      this.filteredClothDataList = data;
      this.filteredList = data;

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
    sidenav.open();
  }
  selectSize(size: string) {
    this.selectedSize = size;
  }
  selectQuantity(event: any) {
    this.selectedQuantity = event.value;
  }

  convertStringToObject(parameter: string): { [key: string]: string[] } {
    this.searchresult = '';
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
        this.searchresult = this.searchresult + ' ' + value;
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
    this.filteredClothDataList = this.filteredList.filter((cloth: any) => {
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
    let categoryFilter = checkedBoxFilter['category'];
    this.filteredList = clothDataListInput.filter((cloth: any) => {
      let colorMatches = colorFilter ? (colorFilter.length > 0 ? colorFilter.includes(cloth.color.toLowerCase()) : true) : true;
      let brandMatches = brandFilter ? (brandFilter.length > 0 ? brandFilter.includes(cloth.brand.toLowerCase()) : true) : true;
      let genderMatches = genderFilter ? (genderFilter.length > 0 ? genderFilter.includes(cloth.gender.toLowerCase()) : true) : true;
      let categoryMatches = categoryFilter ? (categoryFilter.length > 0 ? categoryFilter.includes(cloth.category.toLowerCase()) : true) : true;

      if (colorMatches && brandMatches && genderMatches && categoryMatches) {
        return true;
      }
      return false;
    });
    this.filteredClothDataList = this.filteredList;
  }

  onSortOptionChange(event: any) {
    const sortBy = event.target.value;
    if (sortBy == 'Ascend') {
      this.sortAscendPrice();
    }
    if (sortBy == 'Descend') {
      this.sortDescendPrice();
    }
    if (sortBy == 'Rating') {
      this.sortRating();
    }

  }

  sortAscendPrice() {
    const sortedProducts = this.filteredList.slice().sort((a, b) => a.price - b.price);
    this.filteredClothDataList = sortedProducts;
  }
  sortDescendPrice() {
    const sortedProducts = this.filteredList.slice().sort((a, b) => b.price - a.price);
    this.filteredClothDataList = sortedProducts;
  }

  sortRating() {
    const sortedProducts = this.filteredList.slice().sort((a, b) => b.rating - a.rating);
    this.filteredClothDataList = sortedProducts;
  }
  signIn() {
    localStorage.setItem('accountIcon', 'false');
    this.router.paramMap.subscribe(params => {
      var parameters = params.get('parameters');
      if (parameters) {
        localStorage.setItem('previousState', parameters as string);
      }
      else {
        localStorage.setItem('previousState', '');
      }
    });
    this.router2.navigate(['/signin']);
    this.addToCart();

  }
  addToCart() {
    const currentUser = localStorage.getItem('currentUser');
    const userInfo = JSON.parse(localStorage.getItem(currentUser as string) as string)
    const alreadyPresentItem = userInfo.cartItems.find((item: cartItem) =>
      item.id === this.selectedProduct!.id &&
      item.size === this.selectedSize)
    if (alreadyPresentItem) {
      const indexToUpdate = userInfo.cartItems.findIndex((item: cartItem) => item.id === alreadyPresentItem.id);
      userInfo.cartItems[indexToUpdate].quantity += this.selectedQuantity;
    }
    else {
      const cartItem = {
        "id": this.selectedProduct!.id,
        "quantity": this.selectedQuantity,
        "size": this.selectedSize
      }
      userInfo.cartItems.push(cartItem);
    }
    localStorage.setItem(currentUser as string, JSON.stringify(userInfo))
  }
}
interface cartItem {
  "id": number,
  "quantity": number,
  "size": string
}
