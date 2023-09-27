package com.example.shoppingcart.MongoDb.Model;

public class CartItemDTO {

	private clothResult item;

	private int quantity;
	private String size;

	public clothResult getItem() {
		return item;
	}

	public void setItem(clothResult item) {
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
