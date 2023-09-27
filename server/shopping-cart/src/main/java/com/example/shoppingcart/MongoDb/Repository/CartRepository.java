package com.example.shoppingcart.MongoDb.Repository;

import org.bson.types.ObjectId;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.shoppingcart.MongoDb.Model.Cart;

@Profile("mongodb")
public interface CartRepository extends MongoRepository<Cart, ObjectId> {

}
