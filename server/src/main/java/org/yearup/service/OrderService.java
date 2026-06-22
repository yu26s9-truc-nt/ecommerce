package org.yearup.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.yearup.dtos.CartDTO;
import org.yearup.dtos.CartItemDTO;
import org.yearup.models.Order;
import org.yearup.models.OrderLineItem;
import org.yearup.models.Profile;
import org.yearup.repository.OrderRepository;
import org.yearup.repository.OrderLineItemRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
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

        Optional<Profile> profile = profileService.getByUserId(userId);

        Order order = new Order();
        order.setUserId(userId);
        order.setDate(LocalDate.now());
        if (profile.isPresent()) {
            order.setAddress(profile.get().getAddress());
            order.setCity(profile.get().getCity());
            order.setState(profile.get().getState());
            order.setZip(profile.get().getZip());
        }
        order.setShippingAmount(BigDecimal.valueOf(0));
        Order saved = orderRepository.save(order);

        for(CartItemDTO item: cart.getItems().values()){
            OrderLineItem newItem = new OrderLineItem();
            newItem.setOrderId(saved.getOrderId());
            newItem.setProductId(item.getProductId());
            newItem.setQuantity(item.getQuantity());
            newItem.setSalesPrice(BigDecimal.valueOf(item.getLineTotal()));
            newItem.setDiscount(BigDecimal.valueOf(0));
            orderLineItemRepository.save(newItem);
        }

        cartService.deleteCart(userId);
        return saved;

    }
}
