package org.yearup.service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.yearup.dto.CartItemDTO;
import org.yearup.dto.CartItemUpdateDTO;
import org.yearup.model.CartItem;
import org.yearup.dto.CartDTO;
import org.yearup.model.Product;
import org.yearup.repository.CartItemRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    // a shopping cart is built from cart rows plus a product lookup for each row
    private final CartItemRepository cartItemRepository;
    private final ProductService productService;

    public CartService(CartItemRepository cartItemRepository, ProductService productService) {
        this.cartItemRepository = cartItemRepository;
        this.productService = productService;
    }

    public List<CartItem> getByUserId(int userId) {
        return cartItemRepository.getByUserId(userId);
    }

    public CartDTO getCart(int userId) {
        List<CartItem> cartItems = this.getByUserId(userId);

        CartDTO cart = new CartDTO();

        for (CartItem cartItem : cartItems) {
            cart.add(new CartItemDTO(cartItem.getProduct(), cartItem.getQuantity()));
        }

        return cart;
    }

    public CartDTO addCartItem(int userId, int productId) {
        CartItem cartItem = cartItemRepository
                .getByUserIdAndProduct_ProductId(userId, productId)
                .orElseGet(() -> {
                    Product product = productService.getById(productId);
                    return new CartItem(userId, product, 0);
                });
        cartItem.setQuantity(cartItem.getQuantity() + 1);
        cartItemRepository.save(cartItem);

        return getCart(userId);
    }

    public CartDTO updateCartItem(int userId, int productId, CartItemUpdateDTO updatingCartItem) {
        int newQuantity = updatingCartItem.getQuantity();

        Optional<CartItem> existingCartItem = cartItemRepository.getByUserIdAndProduct_ProductId(userId, productId);

        if (existingCartItem.isPresent()) {
            CartItem cartItem = existingCartItem.get();
            if (newQuantity <= 0) {
                cartItemRepository.delete(cartItem);
            } else {
                cartItem.setQuantity(newQuantity);
                cartItemRepository.save(cartItem);
            }
        } else if (newQuantity > 0) {
            Product product = productService.getById(productId);
            CartItem cartItem = new CartItem(userId, product, newQuantity);
            cartItemRepository.save(cartItem);
        }

        return getCart(userId);
    }

    @Transactional
    public void deleteCart(int userId) {
        cartItemRepository.deleteByUserId(userId);
    }
}
