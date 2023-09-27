package com.example.shoppingcart.MongoDb.Model;

import org.bson.types.ObjectId;
import org.springframework.context.annotation.Profile;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Component
@Document(collection = "cartItems")
@Profile("mongodb")
public class CartItem {

	@Id
	private ObjectId id;
	private clothResult item;
	private int quantity;
	private String size;

	public CartItem(clothResult item, int quantity, String size) {
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
