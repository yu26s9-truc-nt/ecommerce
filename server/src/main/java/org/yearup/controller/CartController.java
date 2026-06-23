package org.yearup.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.yearup.dto.CartDTO;
import org.yearup.dto.CartItemUpdateDTO;
import org.yearup.model.User;
import org.yearup.service.CartService;
import org.yearup.service.UserService;

import java.security.Principal;

@RestController
@RequestMapping("cart")
@CrossOrigin
public class CartController {
    private final CartService cartService;
    private final UserService userService;

    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    @GetMapping()
    @PreAuthorize("isAuthenticated()")
    public CartDTO getCart(Principal principal) {
        // get the currently logged in username
        String userName = principal.getName();
        // find database user by username
        User user = userService.getByUserName(userName);
        int userId = user.getId();

        return cartService.getCart(userId);
    }

    @PostMapping("/products/{productId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CartDTO> addCartItem(Principal principal, @PathVariable int productId) {
        String userName = principal.getName();
        User user = userService.getByUserName(userName);
        int userId = user.getId();

        CartDTO cart = cartService.addCartItem(userId, productId);
        return ResponseEntity.status(HttpStatus.CREATED).body(cart);
    }

    @PutMapping("/products/{productId}")
    @PreAuthorize("isAuthenticated()")
    public CartDTO updateCartItem(Principal principal, @PathVariable int productId, @Valid @RequestBody CartItemUpdateDTO updatingCartItem) {
        String userName = principal.getName();
        User user = userService.getByUserName(userName);
        int userId = user.getId();

        return cartService.updateCartItem(userId, productId, updatingCartItem);
    }

    @DeleteMapping("")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteCart(Principal principal) {
        String userName = principal.getName();
        User user = userService.getByUserName(userName);
        int userId = user.getId();

        cartService.deleteCart(userId);
        return ResponseEntity.ok().build();
    }
}
