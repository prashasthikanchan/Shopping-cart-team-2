package com.example.shoppingcart.Controller;

import com.example.shoppingcart.Model.UserModel;
import com.example.shoppingcart.Service.UserService;
import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/home")
public class HomeController {

  @Autowired
  private UserService userService;

  @GetMapping(value = { "/", "/{path:[^\\.]*}" })
  public String redirectToAngularRoute() {
    return "index";
  }

  @GetMapping("/users")
  public List<UserModel> getUsers() {
    System.out.print("getting User");
    return userService.getUsers();
  }

  @GetMapping("/currentUser")
  public String getLoggedString(Principal principal) {
    return principal.getName();
  }
}
