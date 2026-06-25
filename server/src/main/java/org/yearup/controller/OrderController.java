package org.yearup.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.yearup.dto.OrderCreateRequestDTO;
import org.yearup.model.Order;
import org.yearup.model.User;
import org.yearup.service.OrderService;
import org.yearup.service.UserService;

import java.security.Principal;

@RestController
@RequestMapping("orders")
public class OrderController {
    private final OrderService orderService;
    private final UserService userService;

    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping()
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createOrder(Principal principal, @Valid @RequestBody OrderCreateRequestDTO orderCreateRequestDTO) {
        try {
            String userName = principal.getName();
            int userId = userService.getIdByUsername(userName);

            Order createdOrder = orderService.create(userId, orderCreateRequestDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
        } catch (IllegalStateException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
