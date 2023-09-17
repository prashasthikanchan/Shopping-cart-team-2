package com.example.shoppingcart.Model;

import java.util.Collection;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@Document(collection = "users")
public class UserModel implements UserDetails {

  private String name;

  @Id
  private String email;

  private String password;

  private List<CartItem> cartItem;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public List<CartItem> getCartItem() {
    return cartItem;
  }

  public void setCartItem(List<CartItem> cartItem) {
    this.cartItem = cartItem;
  }

  public void addToCart(CartItem cartItem) {
    this.cartItem.add(cartItem);
  }

  public void removeFromCart(CartItem cartItem) {
    this.cartItem.remove(cartItem);
  }

  public UserModel(
    String name,
    String email,
    String password,
    List<CartItem> cartItem
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.cartItem = cartItem;
  }

  public UserModel() {}

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  @Override
  public String getUsername() {
    return this.email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
