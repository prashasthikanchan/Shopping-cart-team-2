package com.example.Shoppingsql.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Shoppingsql.Model.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {

}
