package com.example.Shoppingsql.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cartItem")
public class CartItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	private Cloth item;
	@Column
	private int quantity;
	@Column
	private String size;
	@ManyToOne
	@JsonIgnore
	private Cart cart;

	public Cart getCart() {
		return cart;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public CartItem(Cloth item, int quantity, String size) {
		this.item = item;
		this.quantity = quantity;
		this.size = size;
	}

	public CartItem() {
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
