package com.example.Shoppingsql.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Shoppingsql.Model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

}
