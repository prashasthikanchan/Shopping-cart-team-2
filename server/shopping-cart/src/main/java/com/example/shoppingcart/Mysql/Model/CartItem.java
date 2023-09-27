package com.example.shoppingcart.Mysql.Model;

import org.springframework.context.annotation.Profile;

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
@Profile("mysql")
public class CartItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	private clothResult item;
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
