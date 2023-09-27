package com.example.shoppingcart.MongoDb.Repository;

import org.bson.types.ObjectId;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.shoppingcart.MongoDb.Model.Category;
@Profile("mongodb")
public interface CategoryRepository extends MongoRepository<Category, ObjectId> {

}
