package com.example.shoppingcart.MongoDb.Controller;

import com.example.shoppingcart.MongoDb.Model.Cart;
import com.example.shoppingcart.MongoDb.Model.CartItem;
import com.example.shoppingcart.MongoDb.Model.CartItemDTO;
import com.example.shoppingcart.MongoDb.Model.Cloth;
import com.example.shoppingcart.MongoDb.Model.User;
import com.example.shoppingcart.MongoDb.Model.clothResult;
import com.example.shoppingcart.MongoDb.Repository.CartItemRepository;
import com.example.shoppingcart.MongoDb.Repository.CartRepository;
import com.example.shoppingcart.MongoDb.Repository.UserRepository;
import com.example.shoppingcart.MongoDb.sercurity.JwtHelper;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
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
@CrossOrigin(origins = "http://localhost:5000")
@Profile("mongodb")
public class CartController {

	@Autowired
	private JwtHelper jwtHelper;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CartItemRepository cartItemRepository;

	@Autowired
	private CartRepository cartRepository;

	@GetMapping("/getCartItems/{token}")
	public ResponseEntity<List<CartItemDTO>> getCartItems(@PathVariable String token) {
		List<CartItemDTO> items = new ArrayList<>();
		try {
			String userName = jwtHelper.getUsernameFromToken(token);
			User user = userRepository.findUserCart(userName);
			if (user != null) {
				Cart cart = user.getCart();
				if (cart != null) {
					List<CartItem> cartItems = cart.getCartItem();
					if (cartItems != null && cartItems.size() > 0) {
						for (CartItem cartItem : cartItems) {
							CartItemDTO cartItemDTO = new CartItemDTO();
							cartItemDTO.setItem(cartItem.getItem());
							cartItemDTO.setQuantity(cartItem.getQuantity());
							cartItemDTO.setSize(cartItem.getSize());
							items.add(cartItemDTO);
						}
					}
				}
			}
			return ResponseEntity.ok(items);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(items);
		}
	}

	@PutMapping("/addCartItem/{token}")
	public ResponseEntity<Boolean> addItemToCart(@PathVariable String token, @RequestBody CartItem cartItem) {
		try {
			String userNameString = jwtHelper.getUsernameFromToken(token);
			User userModel = userRepository.findUserCart(userNameString);
			Cart userCart = userModel.getCart();
			if (userCart != null) {
				List<CartItem> userCartItems = userCart.getCartItem();

				if (userCartItems == null) {
					userCartItems = new ArrayList<>();
				}

				boolean itemExists = false;

				for (CartItem userItem : userCartItems) {
					if (userItem.getItem() != null && userItem.getItem().getId() == cartItem.getItem().getId()) {
						userItem.setQuantity(userItem.getQuantity() + cartItem.getQuantity());
						cartItemRepository.save(userItem);
						itemExists = true;
						break;
					}
				}

				if (!itemExists) {
					cartItemRepository.save(cartItem);
					userCartItems.add(cartItem);
				}
				userCart.setCartItem(userCartItems);
				cartRepository.save(userCart);
				userModel.setCart(userCart);
				userRepository.save(userModel);
			}
			return ResponseEntity.ok(true);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/changeQuantity/{token}/{actionToPerform}")
	public ResponseEntity<Boolean> changeQuantity(@PathVariable String token, @RequestBody CartItem item,
			@PathVariable String actionToPerform) {
		try {
			String email = jwtHelper.getUsernameFromToken(token);
			User userModel = userRepository.findUserCart(email);
			Cart cart = userModel.getCart();
			List<CartItem> userCartItems = cart.getCartItem();
			for (CartItem userItem : userCartItems) {
				clothResult userCloth = userItem.getItem();
				if (userCloth.getId() == item.getItem().getId()) {
					if ("increase".equals(actionToPerform)) {

						userItem.setQuantity(userItem.getQuantity() + 1);
						cartItemRepository.save(userItem);
					} else if ("decrease".equals(actionToPerform)) {
						if (userItem.getQuantity() > 0) {
							userItem.setQuantity(userItem.getQuantity() - 1);
							cartItemRepository.save(userItem);
						}
					}
					break;
				}
			}
			cart.setCartItem(userCartItems);
			userModel.setCart(cart);
			userRepository.save(userModel);
			return ResponseEntity.ok(false);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@DeleteMapping("/deleteCartItem/{token}/{itemId}")
	public void deleteItem(@PathVariable String token, @PathVariable Long itemId) {
		try {
			String email = jwtHelper.getUsernameFromToken(token);
			User userModel = userRepository.findUserCart(email);

			Cart cart = userModel.getCart();
			List<CartItem> userCartItems = cart.getCartItem();

			if (userCartItems != null) {
				userCartItems.removeIf(userItem -> {
					clothResult userCloth = userItem.getItem();
					return userCloth.getId() == itemId;
				});

				cart.setCartItem(userCartItems);
				cartRepository.save(cart);
				userModel.setCart(cart);
				userRepository.save(userModel);
			}
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
