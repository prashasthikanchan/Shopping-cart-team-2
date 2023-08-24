import { Component, OnInit } from '@angular/core';
import { ClothingDataService } from 'src/app/clothing-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentUser: string | null = null;
  cartItems: any[] = [];
  clothDataList: any[] = [];
  filteredClothDataList: any[] = [];
  cartItemDetails: any[] = [];
  cartItemIndex: any[] = [];
  ct: any[] = [];
  displayedColumns: string[] = ['position', 'name', 'quantity', 'total', 'button'];

  constructor(private clothingDataService: ClothingDataService, private router: Router) {

  }
  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      this.cartItems = JSON.parse(localStorage.getItem(this.currentUser) as string).cartItems;
      console.log("jhkjhdkjhsadkjsah", this.cartItems)
    }

  }

  getcartItemDetails(): any {
    this.cartItems.forEach((value: any) => {
      this.cartItemIndex.push(value.id);
    });

    console.log("cart", this.cartItems);
    this.cartItemDetails = this.clothDataList.filter((cloth: any) => {

      if (this.cartItemIndex.includes(cloth.id)) {
        return true;
      }
      return false;
    });
    console.log('aaaa', this.cartItemDetails)
  }

  decrement(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateLocalStorage();
    }
  }

  increment(item: any) {
    item.quantity++;
    this.updateLocalStorage();
  }

  deleteItem(item: any) {
    const confirmDelete = confirm("Do you want to delete this item?");
    if (confirmDelete) {
      const index = this.cartItems.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        this.updateLocalStorage();
      }
    }
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      this.cartItems = JSON.parse(localStorage.getItem(this.currentUser) as string).cartItems;
      console.log("jhkjhdkjhsadkjsah", this.cartItems)
    }
  }

  updateLocalStorage() {
    if (this.currentUser) {
      const userData = JSON.parse(localStorage.getItem(this.currentUser) || '');
      userData.cartItems = this.cartItems;
      localStorage.setItem(this.currentUser, JSON.stringify(userData));
    }
  }

}
