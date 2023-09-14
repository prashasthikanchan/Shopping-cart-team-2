package com.example.shoppingcart.Repository;

import com.example.shoppingcart.Model.UserModel;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserModel, String> {
  public Optional<UserModel> findByEmail(String email);
}
