import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ClothingDataService } from '../service/clothing-data.service';
import { Router } from '@angular/router';
import { ClothItem } from '../models/clothItem.model';
import { MatSidenav } from '@angular/material/sidenav';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { FilterSearchUpdateService } from '../filter-search-update.service';
import { CartItem } from '../models/cartItem.model';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../service/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerService } from "ngx-spinner";
import { state } from '@angular/animations';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css'],
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
  searchresult: string  | null = '';
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
  loading: boolean = true;
  @Output() filterUpdateFromSearch = new EventEmitter<any>();
  constructor(
    private clothingDataService: ClothingDataService,
    private router: ActivatedRoute,
    private router2: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private filterSearchUpdateService: FilterSearchUpdateService,
    private cookieService: CookieService,
    private cartService: CartService,
    private spinner: NgxSpinnerService
  ) {
    this.selectedSize = '';
    this.sizeForm = this.formBuilder.group({
      selectedSize: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 1254) ? ((window.innerWidth <= 650) ? 2 : 3) : 4;
    this.rowHeight = (window.innerWidth <= 1254) ? ((window.innerWidth <= 650) ? `${18}rem` : `${19}rem`) : `${21}rem`;
    this.loading = true;
    this.searchresult = this.router.snapshot.queryParamMap.get('q');
    this.spinner.show();
    this.router.queryParams.subscribe(params => {
      this.spinner.show();
      var parameters = params['q'];
      var filters = params['f'];
      if (parameters && filters) {
        this.clothingDataService.getSearchClothingUpdate(parameters, filters).subscribe((response) => {
          this.filteredClothDataList = response[0];
          this.clothingDataService.setAggregations(response[1]);
          this.loading = false;
          this.spinner.hide();
        })
      }
      else if (parameters) {
        this.clothingDataService.getSearchClothing(parameters).subscribe((response) => {
          this.filteredClothDataList = response[0];
          this.clothingDataService.setAggregations(response[1]);
          this.loading = false;
          this.spinner.hide();
        })
      }
    });
  }
  onResize(event: any) {
    this.breakpoint =
      window.innerWidth <= 1254 ? (window.innerWidth <= 650 ? 2 : 3) : 4;
    this.rowHeight =
      window.innerWidth <= 1254
        ? window.innerWidth <= 650
          ? `${18}rem`
          : `${19}rem`
        : `${21}rem`;
  }
  showItem(id: number, sidenav: MatSidenav): void {
    this.selectedSize = null;
    this.selectedProduct = this.filteredClothDataList.find(
      (item) => item.id === id
    ) as ClothItem;
    this.selectedQuantity = 1;
    this.showAddToCart = true;
    // this.showAddToCart = !this.checkIfAvailable(
      this.selectedProduct as ClothItem
    // );
    sidenav.open();
  }

  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }

    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
  selectSize(size: string) {
    this.selectedSize = size;
  }
  selectQuantity(event: any) {
    this.selectedQuantity = event.value;
  }
  arrToLower(arr: string[]): string[] {
    return arr.map((item) => item.toLowerCase());
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
    const sortedProducts = this.filteredClothDataList
      .slice()
      .sort((a, b) => a.price - b.price);
    this.filteredClothDataList = sortedProducts;
  }
  sortDescendPrice() {
    const sortedProducts = this.filteredClothDataList
      .slice()
      .sort((a, b) => b.price - a.price);
    this.filteredClothDataList = sortedProducts;
  }
  sortAscendRating() {
    const sortedProducts = this.filteredClothDataList
      .slice()
      .sort((a, b) => a.rating - b.rating);
    this.filteredClothDataList = sortedProducts;
  }
  sortDescendRating() {
    const sortedProducts = this.filteredClothDataList
      .slice()
      .sort((a, b) => b.rating - a.rating);
    this.filteredClothDataList = sortedProducts;
  }
  signIn() {
    if (this.selectedSize == '' || !this.selectedSize) {
      this.notSelected = true;
      return;
    }
    this.router.paramMap.subscribe((params) => {
      var parameters = params.get('parameters');
      if (parameters) {
        this.cookieService.set('previousState', parameters as string);
      } else {
        this.cookieService.set('previousState', '');
      }
    });
    if (this.cookieService.get('currentUser')) {
      this.addToCart();
    } else {
      this.router2.navigate(['/signin']);
    }
  }

  async navigateToCart(): Promise<void> {
    if (this.selectedSize == '' || !this.selectedSize) {
      this.notSelected = true;
      return;
    }
    this.router.paramMap.subscribe(async (params) => {
      var parameters = params.get('parameters');
      if (parameters) {
        this.cookieService.set('previousState', parameters as string);
      } else {
        this.cookieService.set('previousState', '');
      }
      const currentUser = this.cookieService.get('currentUser');
          const cartItem = {
        item: this.selectedProduct,
        quantity: this.selectedQuantity,
        size: this.selectedSize,
      };
      try {
        const response = this.cartService
          .addToCart(cartItem as CartItem, currentUser)
          .subscribe();
      } catch (error) {
        console.error('Error:', error);
      }
      if (currentUser) {
        this.addToCart();
        this.router2.navigate(['/cart']);
      } else {
        this.router2.navigate(['/signin'],{state:{cartItem}});
      }
    });
  }

  async addToCart() {
    const currentUser = this.cookieService.get('currentUser');
        const cartItem = {
      item: this.selectedProduct,
      quantity: this.selectedQuantity,
      size: this.selectedSize,

    };

    try {
      const response = this.cartService
        .addToCart(cartItem as CartItem, currentUser)
        .subscribe();
    } catch (error) {
      console.error('Error:', error);
    }
    this.openSnackBar();
  }
  openSnackBar() {
    this.snackBar.open('Item added to cart', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1000,
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
      if (
        this.pincode <= item.pincode + 10 &&
        this.pincode >= item.pincode - 10
      ) {
        return false;
      } else {
        return true;
      }
    } else {
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