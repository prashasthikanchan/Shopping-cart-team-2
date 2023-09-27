package com.example.shoppingcart.MongoDb.Repository;

import com.example.shoppingcart.MongoDb.Model.Cloth;

import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

@Profile("mongodb")
public interface ClothRepository extends MongoRepository<Cloth, Integer> {
}
