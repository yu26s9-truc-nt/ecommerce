package org.yearup.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.yearup.dto.CartDTO;
import org.yearup.dto.CartItemDTO;
import org.yearup.model.Order;
import org.yearup.model.OrderLineItem;
import org.yearup.model.Profile;
import org.yearup.repository.OrderRepository;
import org.yearup.repository.OrderLineItemRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderLineItemRepository orderLineItemRepository;
    private final CartService cartService;
    private final ProfileService profileService;

    public OrderService(
            OrderRepository orderRepository,
            OrderLineItemRepository orderLineItemRepository,
            CartService cartService,
            ProfileService profileService
    ) {
        this.orderRepository = orderRepository;
        this.orderLineItemRepository = orderLineItemRepository;
        this.cartService = cartService;
        this.profileService = profileService;
    }

    @Transactional
    public Order create(int userId) {
        CartDTO cart = cartService.getCart(userId);

        if(cart.getItems().isEmpty()){
            throw new IllegalStateException("Cart is empty");
        }

        Profile profile = profileService.getByUserId(userId);

        Order order = new Order(
                userId,
                LocalDateTime.now(),
                profile.getAddress(),
                profile.getCity(),
                profile.getState(),
                profile.getZip(),
                BigDecimal.valueOf(0)
        );
        Order saved = orderRepository.save(order);

        for(CartItemDTO item: cart.getItems().values()){
            OrderLineItem newItem = new OrderLineItem(
                    saved.getOrderId(),
                    item.getProductId(),
                    item.getLineTotal(),
                    item.getQuantity(),
                    BigDecimal.valueOf(0)
            );
            orderLineItemRepository.save(newItem);
        }

        cartService.deleteCart(userId);
        return saved;

    }
}
