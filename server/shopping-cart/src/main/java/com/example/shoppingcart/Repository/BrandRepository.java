package com.example.shoppingcart.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.shoppingcart.Model.Brand;

public interface BrandRepository extends MongoRepository<Brand, ObjectId> {

}
