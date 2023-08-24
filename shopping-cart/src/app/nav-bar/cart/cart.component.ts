import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentUser: string | null = null;
  cartItems = [];
  constructor() {
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      this.cartItems = JSON.parse(localStorage.getItem(this.currentUser) as string).cartItems
    }
  }
  ngOnInit(): void {
  }

}
