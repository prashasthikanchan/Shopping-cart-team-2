package com.example.shoppingcart.Service;

import com.example.shoppingcart.Model.UserModel;
import com.example.shoppingcart.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username)
    throws UsernameNotFoundException {
    UserModel user = userRepository
      .findByEmail(username)
      .orElseThrow(() -> new RuntimeException("User not found"));
    return user;
  }
}
