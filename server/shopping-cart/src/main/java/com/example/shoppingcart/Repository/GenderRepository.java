package com.example.shoppingcart.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.shoppingcart.Model.Gender;

public interface GenderRepository extends MongoRepository<Gender, ObjectId> {

}
