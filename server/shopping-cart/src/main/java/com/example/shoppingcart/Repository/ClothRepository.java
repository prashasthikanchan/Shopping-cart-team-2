package com.example.shoppingcart.Repository;

import com.example.shoppingcart.Model.Cloth;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClothRepository extends MongoRepository<Cloth, Integer> {}
