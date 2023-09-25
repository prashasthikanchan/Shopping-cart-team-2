package com.example.shoppingcart.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Component
@Document(collection = "cartItems")
public class CartItem {

	@Id
	private ObjectId id;
	@DBRef
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

	public ObjectId getId() {
		return id;
	}

	public void setId(ObjectId id) {
		this.id = id;
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
