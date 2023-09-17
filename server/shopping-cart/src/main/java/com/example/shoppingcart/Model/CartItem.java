package com.example.shoppingcart.Model;

import org.springframework.stereotype.Component;

@Component
public class CartItem {

  private Cloth item;
  private int quantity;
  private String size;

  public CartItem(Cloth item, int quantity, String size) {
    super();
    this.item = item;
    this.quantity = quantity;
    this.size = size;
  }

  public CartItem() {
    super();
  }

  public Cloth getItem() {
    return item;
  }

  public void setItem(Cloth item) {
    this.item = item;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public String getSize() {
    return size;
  }

  public void setSize(String size) {
    this.size = size;
  }
}
