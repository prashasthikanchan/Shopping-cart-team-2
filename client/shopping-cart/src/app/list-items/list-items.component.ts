import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ClothingDataService } from '../service/clothing-data.service';
import { Router } from '@angular/router';
import { ClothItem } from '../models/clothItem.model';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FilterSearchUpdateService } from '../filter-search-update.service';
import { LocalstorageService } from '../localstorage.service';
import { CartItem } from '../models/cartItem.model';
@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {
  starsArray: number[] = Array(5).fill(0);
  clothDataList: ClothItem[] = [];
  sizeOptions: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  selectedSize: string | null = null;
  selectedQuantity = 1;
  selectedProduct: ClothItem | null = null;
  filteredClothDataList: ClothItem[] = [];
  filteredList: ClothItem[] = [];
  searchParameters: any;
  searchresult: string = '';
  sizeForm: FormGroup;
  notSelected: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  breakpoint: number = 4;
  rowHeight: string = ``;
  showAddToCart = true;
  pincode: number | null = null;
  invalidPincode = false;
  randomSearch: boolean = false;


  @Output() filterUpdateFromSearch = new EventEmitter<any>();

  constructor(private clothingDataService: ClothingDataService, private router: ActivatedRoute,
    private router2: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private filterSearchUpdateService: FilterSearchUpdateService, private localStorageService: LocalstorageService) {
    this.selectedSize = '';
    this.sizeForm = this.formBuilder.group({
      selectedSize: new FormControl('', Validators.required)
    });
  }
  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 1254) ? ((window.innerWidth <= 650) ? 2 : 3) : 4;
    this.rowHeight = (window.innerWidth <= 1254) ? ((window.innerWidth <= 650) ? `${18}rem` : `${19}rem`) : `${21}rem`;
    this.router.queryParams.subscribe(params => {
      var parameters = params['q'];
      var filters = params['f'];
      if (parameters && filters) {
        this.clothingDataService.getSearchClothingUpdate(parameters, filters).subscribe((response) => {
          this.filteredClothDataList = response[0];
          this.clothingDataService.setAggregations(response[1]);

        })
      }
      else if (parameters) {
        this.clothingDataService.getSearchClothing(parameters).subscribe((response) => {
          this.filteredClothDataList = response[0];
          this.clothingDataService.setAggregations(response[1]);

        })
      }
    });

  }
  onResize(event: any) {
    this.breakpoint = (window.innerWidth <= 1254) ? ((window.innerWidth <= 650) ? 2 : 3) : 4;
    this.rowHeight = (window.innerWidth <= 1254) ? ((window.innerWidth <= 650) ? `${18}rem` : `${19}rem`) : `${21}rem`;
  }
  showItem(id: number, sidenav: MatSidenav): void {
    this.selectedSize = null;
    this.selectedProduct = this.clothDataList.find(item => item.id === id) as ClothItem;
    this.selectedQuantity = 1;
    this.showAddToCart = true;
    sidenav.open();
  }
  selectSize(size: string) {
    this.selectedSize = size;
  }
  selectQuantity(event: any) {
    this.selectedQuantity = event.value;
  }

  arrToLower(arr: string[]): string[] {
    return arr.map(item => item.toLowerCase());
  }
  onSortOptionChange(event: any) {
    const sortBy = event.target.value;
    if (sortBy == 'AscendPrice') {
      this.sortAscendPrice();
    }
    if (sortBy == 'DescendPrice') {
      this.sortDescendPrice();
    }
    if (sortBy == 'AscendRating') {
      this.sortAscendRating();
    }
    if (sortBy == 'DescendRating') {
      this.sortDescendRating();
    }

  }
  sortAscendPrice() {
    const sortedProducts = this.filteredClothDataList.slice().sort((a, b) => a.price - b.price);
    this.filteredClothDataList = sortedProducts;
  }
  sortDescendPrice() {
    const sortedProducts = this.filteredClothDataList.slice().sort((a, b) => b.price - a.price);
    this.filteredClothDataList = sortedProducts;
  }

  sortAscendRating() {
    const sortedProducts = this.filteredClothDataList.slice().sort((a, b) => a.rating - b.rating);
    this.filteredClothDataList = sortedProducts;
  }
  sortDescendRating() {
    const sortedProducts = this.filteredClothDataList.slice().sort((a, b) => b.rating - a.rating);
    this.filteredClothDataList = sortedProducts;
  }

  signIn() {
    if (this.selectedSize == '' || !this.selectedSize) {
      this.notSelected = true;
      return;
    }

    this.router.paramMap.subscribe(params => {
      var parameters = params.get('parameters');
      if (parameters) {
        this.localStorageService.setLocalStorageItem('previousState', parameters as string);
      }
      else {
        this.localStorageService.setLocalStorageItem('previousState', '');
      }
    });
    this.router2.navigate(['/signin']);
    this.addToCart();
  }
  addToCart() {
    const currentUser = this.localStorageService.getLocalStorageItem('currentUser');
    const userInfo = JSON.parse(this.localStorageService.getLocalStorageItem(currentUser as string) as string)
    const alreadyPresentItem = userInfo.cartItems.find((cartItem: CartItem) =>
      cartItem.item && cartItem.item.id === this.selectedProduct!.id &&
      cartItem.size === this.selectedSize)
    if (alreadyPresentItem) {
      const indexToUpdate = userInfo.cartItems.findIndex((cartItem: CartItem) => cartItem.item.id === alreadyPresentItem.item.id);
      userInfo.cartItems[indexToUpdate].quantity += this.selectedQuantity;
    }
    else {
      const cartItem = {
        "item": this.selectedProduct,
        "quantity": this.selectedQuantity,
        "size": this.selectedSize
      }
      userInfo.cartItems.push(cartItem);
    }
    this.localStorageService.setLocalStorageItem(currentUser as string, JSON.stringify(userInfo))
    this.openSnackBar();
  }
  openSnackBar() {
    this.snackBar.open('Item added to cart', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition, duration: 1000,
    });
  }
  takePincode(event: any) {
    this.pincode = event.target.value;
    event.target.value = null;
    this.invalidPincode = false;
    if (this.pincode && this.pincode.toString().length != 6) {
      this.invalidPincode = true;
    }
  }
  checkIfAvailable(item: ClothItem): boolean {
    if (item.pincode && this.pincode) {
      if (this.pincode <= item.pincode + 10 && this.pincode >= item.pincode - 10) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  }
  decrement() {
    this.selectedQuantity--;
  }

  increment() {
    this.selectedQuantity++;
  }
}








