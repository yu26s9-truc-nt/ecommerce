package org.yearup.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.yearup.dtos.CartDTO;
import org.yearup.dtos.CartItemDTO;
import org.yearup.dtos.CartItemUpdateDTO;
import org.yearup.models.CartItem;
import org.yearup.models.User;
import org.yearup.service.CartService;
import org.yearup.service.UserService;

import java.security.Principal;
import java.util.List;

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
    @PreAuthorize("hasRole('ROLE_USER')")
    public CartDTO getCart(Principal principal) {
        // get the currently logged in username
        String userName = principal.getName();
        // find database user by username
        User user = userService.getByUserName(userName);
        int userId = user.getId();

        return cartService.getCart(userId);
    }

    @PostMapping("/products/{productId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<CartDTO> addCartItem(Principal principal, @PathVariable int productId) {
        String userName = principal.getName();
        User user = userService.getByUserName(userName);
        int userId = user.getId();

        CartDTO cart = cartService.addCartItem(userId, productId);

        return ResponseEntity.status(HttpStatus.CREATED).body(cart);
    }

    @PatchMapping("/products/{productId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public CartDTO updateCartItem(Principal principal, @PathVariable int productId, @Valid @RequestBody CartItemUpdateDTO updatingCartItem) {
        String userName = principal.getName();
        User user = userService.getByUserName(userName);
        int userId = user.getId();

        return cartService.updateCartItem(userId, productId, updatingCartItem);
    }

    @DeleteMapping("")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Void> deleteCart(Principal principal) {
        String userName = principal.getName();
        User user = userService.getByUserName(userName);
        int userId = user.getId();

        cartService.deleteCart(userId);
        return ResponseEntity.noContent().build();
    }
}
