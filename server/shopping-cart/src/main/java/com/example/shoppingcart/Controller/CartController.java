package com.example.shoppingcart.Controller;

import com.example.shoppingcart.Model.CartItem;
import com.example.shoppingcart.Model.Cloth;
import com.example.shoppingcart.Model.UserModel;
import com.example.shoppingcart.Repository.UserRepository;
import com.example.shoppingcart.sercurity.JwtHelper;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart")
public class CartController {

  @Autowired
  private JwtHelper jwtHelper;

  @Autowired
  private UserRepository userRepository;

  @GetMapping("/getCartItems/{token}")
  public List<CartItem> getCartItems(@PathVariable String token) {
    String userName = jwtHelper.getUsernameFromToken(token);
    UserModel userModel = userRepository
      .findByEmail(userName)
      .orElseThrow(null);
    List<CartItem> userCartItems = userModel.getCartItem();
    if (userCartItems == null) {
      return null;
    }
    return userCartItems;
  }

  @PutMapping("/addCartItem/{token}")
  public ResponseEntity<Boolean> addItemToCart(
    @PathVariable String token,
    @RequestBody CartItem cartItem
  ) {
    try {
      String userNameString = jwtHelper.getUsernameFromToken(token);
      UserModel userModel = userRepository
        .findByEmail(userNameString)
        .orElse(null);

      if (userModel == null) {
        return ResponseEntity.notFound().build();
      }
      List<CartItem> userCartItems = userModel.getCartItem();

      if (userCartItems == null) {
        userCartItems = new ArrayList<>();
      }

      boolean itemExists = false;

      for (CartItem userItem : userCartItems) {
        if (
          userItem.getItem() != null &&
          userItem.getItem().getId() == cartItem.getItem().getId()
        ) {
          userItem.setQuantity(userItem.getQuantity() + cartItem.getQuantity());
          itemExists = true;
          break;
        }
      }

      if (!itemExists) {
        userCartItems.add(cartItem);
      }

      userModel.setCartItem(userCartItems);
      userRepository.save(userModel);

      return ResponseEntity.ok(true);
    } catch (Exception e) {
      System.out.print(e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  @PutMapping("/changeQuantity/{token}/{actionToPerform}")
  public ResponseEntity<Boolean> changeQuantity(
    @PathVariable String token,
    @RequestBody CartItem item,
    @PathVariable String actionToPerform
  ) {
    try {
      String email = jwtHelper.getUsernameFromToken(token);
      UserModel userModel = userRepository
        .findByEmail(email)
        .orElseThrow(() -> new NoSuchElementException("User not found"));
      List<CartItem> userCartItems = userModel.getCartItem();
      for (CartItem userItem : userCartItems) {
        Cloth userCloth = userItem.getItem();
        if (userCloth.getId() == item.getItem().getId()) {
          if ("increase".equals(actionToPerform)) {
            userItem.setQuantity(userItem.getQuantity() + 1);
          } else if ("decrease".equals(actionToPerform)) {
            if (userItem.getQuantity() > 0) {
              userItem.setQuantity(userItem.getQuantity() - 1);
            }
          }
          break;
        }
      }
      userModel.setCartItem(userCartItems);
      userRepository.save(userModel);
      return ResponseEntity.ok(false);
    } catch (Exception e) {
      System.out.println(e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  @DeleteMapping("/deleteCartItem/{token}/{itemId}")
  public void deleteItem(
    @PathVariable String token,
    @PathVariable Long itemId
  ) {
    try {
      String email = jwtHelper.getUsernameFromToken(token);
      UserModel userModel = userRepository
        .findByEmail(email)
        .orElseThrow(() -> new NoSuchElementException("User not found"));

      List<CartItem> userCartItems = userModel.getCartItem();

      if (userCartItems != null) {
        userCartItems.removeIf(userItem -> {
          Cloth userCloth = userItem.getItem();
          return userCloth.getId() == itemId;
        });

        userModel.setCartItem(userCartItems);
        userRepository.save(userModel);
      }
    } catch (Exception e) {
      System.out.println(e);
    }
  }
}
