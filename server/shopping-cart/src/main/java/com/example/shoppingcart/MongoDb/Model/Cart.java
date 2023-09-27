package com.example.shoppingcart.MongoDb.Model;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.context.annotation.Profile;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Component
@Document(collection = "carts")
@Profile("mongodb")
public class Cart {
	@Id
	private ObjectId id;
	@DBRef
	private List<CartItem> cartItem;

	public ObjectId getId() {
		return id;
	}

	public void setId(ObjectId id) {
		this.id = id;
	}

	public List<CartItem> getCartItem() {
		return cartItem;
	}

	public void setCartItem(List<CartItem> cartItem) {
		this.cartItem = cartItem;
	}

}