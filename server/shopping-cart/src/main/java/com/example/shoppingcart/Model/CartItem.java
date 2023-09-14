package com.example.shoppingcart.Model;

import java.util.List;

public class CartItem {

  private List<Cloth> items;
  private int quantity;
  private String size;

  public List<Cloth> getItems() {
    return items;
  }

  public void setItems(List<Cloth> items) {
    this.items = items;
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
