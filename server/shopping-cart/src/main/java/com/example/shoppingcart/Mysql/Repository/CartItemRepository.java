package com.example.shoppingcart.Mysql.Repository;

import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shoppingcart.Mysql.Model.CartItem;

@Profile("mysql")
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

}
