package com.Grocery.controller;

import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Grocery.model.*;
import com.Grocery.repository.*;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class userController {

	@Autowired
	private userRepo repo;
	@Autowired
	private categoryRepo categoryRepo;
	@Autowired
	private groceryRepo groceryRepo;
	@Autowired
	private orderItemRepo orderItemRepo;
	@Autowired
	private cartRepo cartRepo;
	@Autowired
	private serviceRepo serviceRepo;
	@Autowired
	private orderRepo orderRepo;
	@Autowired
	private teamRepo teamRepo;

	// -------- REGISTER ----------
	@PostMapping("/saveUser")
	public user saveUser(@RequestBody user u) {
		return repo.save(u);
	}

	// -------- LOGIN ----------
	@RestController
	@RequestMapping("/api/user")
	@CrossOrigin(origins = "http://localhost:3000")
	public class UserController {

		@Autowired
		private userRepo repo;

		// -------- LOGIN ----------
		@PostMapping("/login")
		public ResponseEntity<?> loginUser(@RequestBody user u, HttpSession session) {

			user existingUser = repo.findByMobileAndPassword(u.getMobile(), u.getPassword());

			if (existingUser != null) {

				session.setAttribute("loginUser", existingUser);

				return ResponseEntity.ok(existingUser);

			} else {

				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Mobile or Password");

			}
		}

	}

	// -------- CATEGORIES ----------
	@GetMapping("/categories")
	public List<category> showCategoriesPage() {
		return categoryRepo.findByIsDeleteFalse();
	}

	// -------- HOME OFFERS ----------
	@GetMapping("/home")
	public List<grocery> userHome() {
		return groceryRepo.findTop8ByDeleteFalseAndCategoryIsDeleteFalseOrderByDiscountPercentDesc();
	}

	// -------- ITEMS BY CATEGORY ----------
	@GetMapping("/category/{id}/items")
	public List<grocery> showItemsByCategory(@PathVariable Long id) {
		return groceryRepo.findByCategoryIdAndDeleteFalseAndCategoryIsDeleteFalse(id);
	}

	@GetMapping("/check-session")
    public ResponseEntity<?> checkSession(HttpSession session) {
        Object user = session.getAttribute("loginUser");
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged In");
    }

	// -------- ADD TO CART ----------
	// 3. ADD TO CART FUNCTION (Updated)
    @PostMapping("/addToCart")
    public ResponseEntity<?> addToCart(@RequestParam Long groceryId, @RequestParam int quantity, HttpSession session) {
        user loggedInUser = (user) session.getAttribute("loginUser");
        
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("LOGIN_REQUIRED");
        }

        grocery item = groceryRepo.findById(groceryId).orElse(null);
        if (item != null) {
            cart existingCartItem = cartRepo.findByGroceryItemIdAndUser(groceryId, loggedInUser);
            if (existingCartItem != null) {
                existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity);
                existingCartItem.setSubtotal(existingCartItem.getQuantity() * existingCartItem.getGroceryItem().getPrice());
                cartRepo.save(existingCartItem);
            } else {
                cart newCart = new cart();
                newCart.setGroceryItem(item);
                newCart.setUser(loggedInUser);
                newCart.setQuantity(quantity);
                newCart.setSubtotal(item.getPrice() * quantity);
                cartRepo.save(newCart);
            }
        }
        return ResponseEntity.ok("ADDED");
    }


	// -------- SHOW CART ----------
	@GetMapping("/cart")
	public List<cart> showCart(HttpSession session) {

		user loggedInUser = (user) session.getAttribute("loginUser");

		if (loggedInUser == null) {
			return null;
		}

		return cartRepo.findByUserId(loggedInUser.getId());
	}

	// -------- UPDATE CART ----------
	@PostMapping("/cart/updateQuantity")
	public String updateCartQuantity(@RequestParam("cartId") List<Long> cartIds,
			@RequestParam("quantity") List<Integer> quantities) {

		for (int i = 0; i < cartIds.size(); i++) {

			cart cartItem = cartRepo.findById(cartIds.get(i)).orElse(null);

			if (cartItem != null) {
				int qty = quantities.get(i);
				cartItem.setQuantity(qty);
				cartItem.setSubtotal(cartItem.getGroceryItem().getPrice() * qty);
				cartRepo.save(cartItem);
			}
		}
		return "UPDATED";
	}

	// -------- REMOVE CART ----------
	@DeleteMapping("/cart/{id}")
	public String removeCartItem(@PathVariable Long id) {
		cartRepo.deleteById(id);
		return "REMOVED";
	}

	// -------- SERVICES ----------
	@GetMapping("/services")
	public List<service> contactForm() {
		return serviceRepo.findAll();
	}

	// -------- TEAM ----------
	@GetMapping("/team")
	public List<teamMember> showAboutPage() {
		return teamRepo.findAll();
	}

	// -------- SHOP ----------
	@GetMapping("/shop")
	public List<grocery> showShopPage() {
		return groceryRepo.findByDeleteFalseAndCategoryIsDeleteFalse();
	}

	// -------- MY ORDERS ----------
	@GetMapping("/order")
	public List<order> myOrders(HttpSession session) {

		user loggedInUser = (user) session.getAttribute("loginUser");

		if (loggedInUser == null) {
			return null;
		}

		return orderRepo.findByUser(loggedInUser);
	}

	// -------- CHECKOUT ----------
	@Transactional
	@PostMapping("/checkout")
	public order placeOrder(HttpSession session) {

		user u = (user) session.getAttribute("loginUser");

		List<cart> cartItems = cartRepo.findByUserId(u.getId());

		double total = cartItems.stream().mapToDouble(cart::getSubtotal).sum();

		order o = new order();
		o.setOrderId("ORD" + new Random().nextInt(10000));
		o.setCustomerName(u.getUserName());
		o.setTotalAmount(total);
		o.setDate(LocalDate.now());
		o.setStatus("Pending");
		o.setUser(u);

		order savedOrder = orderRepo.save(o);

		for (cart c : cartItems) {
			orderItem oi = new orderItem();
			oi.setGroceryItem(c.getGroceryItem());
			oi.setQuantity(c.getQuantity());
			oi.setOrder(savedOrder);
			orderItemRepo.save(oi);
		}

		cartRepo.deleteByUserId(u.getId());

		return savedOrder;
	}
}
