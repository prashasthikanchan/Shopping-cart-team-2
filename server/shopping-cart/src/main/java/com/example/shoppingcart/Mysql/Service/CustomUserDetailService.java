package com.example.shoppingcart.Mysql.Service;

import com.example.shoppingcart.Mysql.Model.User;
import com.example.shoppingcart.Mysql.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Profile("mysql")
public class CustomUserDetailService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));
		return user;
	}
}
