import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cartItem.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ClothItem } from '../models/clothItem.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  addToCart(cartItem: CartItem, currentUser: string): Observable<boolean> {
    return this.http.put<boolean>(
      `${this.baseUrl}` + '/cart/addCartItem' + `/${currentUser}`,
      cartItem
    );
  }

  getCartItems(currentUser: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(
      `${this.baseUrl}` + '/cart/getCartItems' + `/${currentUser}`
    );
  }

  changeQuantity(
    item: CartItem,
    action: string,
    currentUser: string
  ): Observable<boolean> {
    return this.http.put<boolean>(
      `${this.baseUrl}` +
        '/cart/changeQuantity' +
        `/${currentUser}/${action}`,
      item
    );
  }

  deleteCartItem(token: string, itemId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/cart/deleteCartItem/${token}/${itemId}`
    );
  }
}
