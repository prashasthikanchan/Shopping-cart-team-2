package com.example.Shoppingsql.Service;

import com.example.Shoppingsql.Model.User;
import com.example.Shoppingsql.Repository.UserRepository;
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

	public List<User> getUsers() {
		return userRepository.findAll();
	}

	public User createUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}
}
