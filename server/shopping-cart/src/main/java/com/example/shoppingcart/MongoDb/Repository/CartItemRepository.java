package com.example.shoppingcart.MongoDb.Repository;

import org.bson.types.ObjectId;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.shoppingcart.MongoDb.Model.CartItem;
import com.example.shoppingcart.MongoDb.Model.CartItemDTO;

@Profile("mongodb")
public interface CartItemRepository extends MongoRepository<CartItem, ObjectId> {

}
