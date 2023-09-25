package com.example.shoppingcart.Repository;

import com.example.shoppingcart.Model.IndexPageItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IndexPageRepository extends MongoRepository<IndexPageItem, String> {
}
