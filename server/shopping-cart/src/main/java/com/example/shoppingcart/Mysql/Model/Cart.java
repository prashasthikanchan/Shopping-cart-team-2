package com.example.shoppingcart.Mysql.Model;

import java.util.List;

import org.springframework.context.annotation.Profile;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart")
@Profile("mysql")
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@OneToOne
	private User user;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "cart")
	@JsonIgnore
	private List<CartItem> cartItem;

	public List<CartItem> getCartItem() {
		return this.cartItem;
	}

	public void setCartItem(List<CartItem> cartItem) {
		this.cartItem = cartItem;
	}

	public void addToCart(CartItem cartItem) {
		cartItem.setCart(this);
		this.cartItem.add(cartItem);
	}

	public void removeFromCart(CartItem cartItem) {
		this.cartItem.remove(cartItem);
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
