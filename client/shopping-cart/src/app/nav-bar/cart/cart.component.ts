import { Component, OnInit } from '@angular/core';
import { ClothItem } from 'src/app/models/clothItem.model';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/service/cart.service';
import { CartItem } from 'src/app/models/cartItem.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  currentUser: string | null = null;
  cartItems: CartItem[] = [];
  clothDataList: ClothItem[] = [];
  filteredClothDataList: ClothItem[] = [];
  total: number = 0;
  displayedColumns: string[] = [
    'position',
    'name',
    'quantity',
    'total',
    'button',
  ];
  emptyCart: boolean = false;

  constructor(
    private cookieService: CookieService,
    private cartService: CartService
  ) {}
  async ngOnInit(): Promise<void> {
    this.currentUser = this.cookieService.get('currentUser');
    if (this.currentUser) {
      try {
        const response = await this.cartService
          .getCartItems(this.currentUser)
          .subscribe(
            (data: CartItem[]) => {
              this.cartItems = data;
              localStorage.setItem('cart', JSON.stringify(this.cartItems));
              if (this.cartItems.length > 0) {
                this.emptyCart = false;
              }
              this.calculateTotal();
            },
            (error) => {
              console.error('Error fetching cart items:', error);
            }
          );
      } catch (error) {
        console.error('Error:', error);
      }
    }
    else if (this.cartItems.length === 0) {
      this.emptyCart = true;
    }
  }

  changeQuantity(item: CartItem, action: string) {
    const currentUser = this.cookieService.get('currentUser');
    this.cartService.changeQuantity(item, action, currentUser).subscribe();
    const index = this.cartItems.findIndex(
      (cartItem) => cartItem.item.id === item.item.id
    );
    if (index !== -1) {
      if (action == 'increase') {
        this.cartItems[index].quantity++;
      } else if (action == 'decrease') {
        if (this.cartItems[index].quantity > 0) {
          this.cartItems[index].quantity--;
        }
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotal();
  }

  deleteItem(item: CartItem) {
    const confirmDelete = confirm('Do you want to delete this item?');
    this.currentUser = this.cookieService.get('currentUser');
    if (confirmDelete) {
      this.cartService
        .deleteCartItem(this.currentUser, item.item.id)
        .subscribe();
      const index = this.cartItems.findIndex(
        
        (cartItem) => cartItem.item.id === item.item.id
      );
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.cartItems = JSON.parse(localStorage.getItem('cart') as string);
        this.emptyCart = this.cartItems.length>0?false:true;
        this.calculateTotal();
      }
    }
  }
  async calculateTotal() {
    this.total = 0;
    for (const item of this.cartItems) {
      this.total += item.item.price * item.quantity;
    }
    if (this.total === 0) {
      this.emptyCart = true;
    }
  }
}
