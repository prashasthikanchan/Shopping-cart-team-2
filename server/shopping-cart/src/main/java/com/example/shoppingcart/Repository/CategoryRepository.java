package com.example.shoppingcart.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.shoppingcart.Model.Category;

public interface CategoryRepository extends MongoRepository<Category, ObjectId> {

}
