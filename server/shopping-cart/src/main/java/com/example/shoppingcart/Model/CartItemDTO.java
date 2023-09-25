package com.example.shoppingcart.Model;

public class CartItemDTO {

	private Cloth item;

	private int quantity;
	private String size;

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
