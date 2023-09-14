package com.example.shoppingcart.Service;

import com.example.shoppingcart.Model.UserModel;
import com.example.shoppingcart.Repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public List<UserModel> getUsers() {
    return userRepository.findAll();
  }

  public UserModel createUser(UserModel user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
  }
}
