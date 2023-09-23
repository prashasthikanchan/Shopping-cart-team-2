package com.example.shoppingcart.Repository;

import com.example.shoppingcart.Model.User;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String> {
  @Query(
    value = "{'email': ?0}",
    fields = "{'name': 1, 'email': 1, 'password': 1, 'cartItem':1}"
  )
  public Optional<User> findByEmail(String email);
}
