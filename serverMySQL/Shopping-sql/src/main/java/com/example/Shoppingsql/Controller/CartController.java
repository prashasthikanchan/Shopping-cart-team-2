package com.example.Shoppingsql.Controller;

import com.example.Shoppingsql.Model.Cart;
import com.example.Shoppingsql.Model.CartItem;
import com.example.Shoppingsql.Model.Cloth;
import com.example.Shoppingsql.Model.User;
import com.example.Shoppingsql.Repository.CartItemRepository;
import com.example.Shoppingsql.Repository.CartRepository;
import com.example.Shoppingsql.Repository.ClothResultRepository;
import com.example.Shoppingsql.Repository.UserRepository;
import com.example.Shoppingsql.Security.JwtHelper;

import net.bytebuddy.utility.nullability.AlwaysNull;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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
@CrossOrigin(origins = "http://localhost:5000")
public class CartController {

	@Autowired
	private JwtHelper jwtHelper;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CartItemRepository cartItemRepository;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private ClothResultRepository clothResultRepository;

	@GetMapping("/getCartItems/{token}")
	public List<CartItem> getCartItemsByUserEmail(@PathVariable String token) {
		String email = jwtHelper.getUsernameFromToken(token);

		Optional<User> userModelOptional = userRepository.findByEmail(email);
		if (userModelOptional.isPresent()) {
			User userModel = userModelOptional.get();
			Cart cart = userModel.getCart();
			if (cart != null) {
				List<CartItem> cartItems = cart.getCartItem();
				return cartItems;
			} else {
				return List.of();
			}
		} else {
			return List.of();
		}
	}

	@PutMapping("/addCartItem/{token}")
	public ResponseEntity<Boolean> addItemToCart(@PathVariable String token, @RequestBody CartItem cartItem) {
		try {
			String userNameString = jwtHelper.getUsernameFromToken(token);
			User userModel = userRepository.findByEmail(userNameString).orElse(null);

			if (userModel == null) {
				return ResponseEntity.notFound().build();
			}

			Cart userCart = userModel.getCart();
			if (userCart == null) {
				userCart = new Cart();
				userCart.setUser(userModel);
			}

			List<CartItem> cartItems = userCart.getCartItem();
			if (cartItems == null) {
				cartItems = new ArrayList<>();
			}

			boolean itemAlreadyExists = false;

			for (CartItem existingCartItem : cartItems) {
				if (existingCartItem.getItem().getId() == cartItem.getItem().getId()) {

					existingCartItem.setQuantity(existingCartItem.getQuantity() + cartItem.getQuantity());
					cartItemRepository.save(existingCartItem);
					itemAlreadyExists = true;
					break;
				}
			}

			if (!itemAlreadyExists) {
				cartItem.setCart(userCart);
				cartItems.add(cartItem);
				cartRepository.save(userCart);
				clothResultRepository.save(cartItem.getItem());
			}

			userModel.setCart(userCart);
			userRepository.save(userModel);

			return ResponseEntity.ok(true);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
		}
	}

	@Transactional
	@PutMapping("/changeQuantity/{token}/{actionToPerform}")
	public ResponseEntity<Boolean> changeQuantity(@PathVariable String token, @RequestBody CartItem item,
			@PathVariable String actionToPerform) {
		try {
			String email = jwtHelper.getUsernameFromToken(token);
			User userModel = userRepository.findByEmail(email)
					.orElseThrow(() -> new NoSuchElementException("User not found"));
			Cart userCart = userModel.getCart();
			List<CartItem> userCartItems = userCart.getCartItem();
			CartItem targetCartItem = null;
			for (CartItem userItem : userCartItems) {
				if (userItem.getItem().getId() == item.getItem().getId()) {
					targetCartItem = userItem;
					break;
				}
			}
			if (targetCartItem != null) {
				int currentQuantity = targetCartItem.getQuantity();
				if ("increase".equals(actionToPerform)) {
					targetCartItem.setQuantity(currentQuantity + 1);
					cartItemRepository.save(targetCartItem);
				} else if ("decrease".equals(actionToPerform)) {
					if (currentQuantity > 0) {
						targetCartItem.setQuantity(currentQuantity - 1);
						cartItemRepository.save(targetCartItem);
					}
				}
				return ResponseEntity.ok(true);
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (NoSuchElementException e) {
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@DeleteMapping("/deleteCartItem/{token}/{itemId}")
	public void deleteItem(@PathVariable String token, @PathVariable int itemId) {
		try {
			String email = jwtHelper.getUsernameFromToken(token);
			User userModel = userRepository.findByEmail(email)
					.orElseThrow(() -> new NoSuchElementException("User not found"));

			Cart cart = userModel.getCart();

			if (cart != null) {
				List<CartItem> cartItems = cart.getCartItem();
				CartItem itemToDelete = null;

				for (CartItem cartItem : cartItems) {
					if (cartItem.getItem().getId() == itemId) {
						itemToDelete = cartItem;
						break;
					}
				}

				if (itemToDelete != null) {
					cartItems.remove(itemToDelete);
					cartItemRepository.delete(itemToDelete);
					userRepository.save(userModel);
					System.out.println("Item with ID " + itemId + " has been deleted from the user's cart.");
				}
			}
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
