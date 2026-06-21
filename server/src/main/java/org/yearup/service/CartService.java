package org.yearup.service;

import org.springframework.stereotype.Service;
import org.yearup.dtos.CartItemDTO;
import org.yearup.models.CartItem;
import org.yearup.dtos.CartDTO;
import org.yearup.models.Product;
import org.yearup.repository.ShoppingCartRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    // a shopping cart is built from cart rows plus a product lookup for each row
    private final ShoppingCartRepository shoppingCartRepository;
    private final ProductService productService;

    public CartService(ShoppingCartRepository shoppingCartRepository, ProductService productService) {
        this.shoppingCartRepository = shoppingCartRepository;
        this.productService = productService;
    }

    public List<CartItem> getByUserId(int userId) {
        return shoppingCartRepository.findByUserId(userId);
    }

    public CartDTO getCart(int userId) {
        List<CartItem> cartItems = shoppingCartRepository.findByUserId(userId);

        CartDTO cart = new CartDTO();

        for (CartItem cartItem : cartItems) {
            cart.add(new CartItemDTO(cartItem.getProduct(), cartItem.getQuantity()));
        }

        return cart;
    }

    public CartDTO addCartItem(int userId, int productId) {
        Optional<CartItem> existingCartItem = shoppingCartRepository.findByUserIdAndProduct_ProductId(userId, productId);
        existingCartItem.ifPresentOrElse(
                cartItem -> {
                    cartItem.increaseQuantity();
                    shoppingCartRepository.save(cartItem);
                },
                () -> {
                    Product product = productService.getById(productId)
                            .orElseThrow();

                    CartItem cartItem = new CartItem();
                    cartItem.setUserId(userId);
                    cartItem.setProduct(product);

                    shoppingCartRepository.save(cartItem);
                }
        );

        return getCart(userId);
    }

    // add additional methods here
}
