package com.example.shoppingcart.MongoDb.Controller;

import com.example.shoppingcart.MongoDb.Model.User;
import com.example.shoppingcart.MongoDb.Service.UserService;
import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "http://localhost:5000")
@Profile("mongodb")
public class HomeController {

	@Autowired
	private UserService userService;

	@GetMapping(value = { "/", "/{path:[^\\.]*}" })
	public String redirectToAngularRoute() {
		return "index";
	}

	@GetMapping("/users")
	public List<User> getUsers() {
		return userService.getUsers();
	}

	@GetMapping("/currentUser")
	public String getLoggedString(Principal principal) {
		return principal.getName();
	}
}
