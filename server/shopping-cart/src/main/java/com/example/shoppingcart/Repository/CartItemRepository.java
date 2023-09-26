package com.example.shoppingcart.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.shoppingcart.Model.CartItem;
import com.example.shoppingcart.Model.CartItemDTO;

public interface CartItemRepository extends MongoRepository<CartItem, ObjectId> {

}
