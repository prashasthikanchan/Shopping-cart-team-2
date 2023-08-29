import { Component, OnInit, ViewChild } from '@angular/core';
import { ClothingDataService } from 'src/app/clothing-data.service';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ClothItem } from 'src/app/models/clothItem.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentUser: string | null = null;
  cartItems: any[] = [];
  clothDataList: ClothItem[] = [];
  filteredClothDataList: ClothItem[] = [];
  cartItemDetails: any[] = [];
  cartItemIndex: any[] = [];
  total: number = 0;
  displayedColumns: string[] = ['position', 'name', 'quantity', 'total', 'button'];
  emptyCart:boolean=false;

  constructor(private clothingDataService: ClothingDataService, private router: Router) {

  }
  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      this.cartItems = JSON.parse(localStorage.getItem(this.currentUser) as string).cartItems;
    }
    if(this.cartItems.length===0){
      this.emptyCart=true;
    }
    this.calculateTotal()
  }
  decrement(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateLocalStorage();
      this.calculateTotal()
    }
  }

  increment(item: any) {
    item.quantity++;
    this.updateLocalStorage();
    this.calculateTotal()
  }

  deleteItem(item: any) {
    const confirmDelete = confirm("Do you want to delete this item?");
    if (confirmDelete) {
      const index = this.cartItems.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        this.updateLocalStorage();
        this.calculateTotal()
      }
    }
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      this.cartItems = JSON.parse(localStorage.getItem(this.currentUser) as string).cartItems;
    }
  }

  updateLocalStorage() {
    if (this.currentUser) {
      const userData = JSON.parse(localStorage.getItem(this.currentUser) || '');
      userData.cartItems = this.cartItems;
      localStorage.setItem(this.currentUser, JSON.stringify(userData));
    }
  }
  calculateTotal() {
    this.total = 0;
    for (const item of this.cartItems) {
      this.total += item.item.price * item.quantity;
    }
    if(this.total===0){
      this.emptyCart=true;
    }
  }
}



