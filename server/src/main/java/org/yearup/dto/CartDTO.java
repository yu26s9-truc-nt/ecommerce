package org.yearup.dto;


import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

public class CartDTO {
    private Map<Integer, CartItemDTO> items = new HashMap<>();

    public Map<Integer, CartItemDTO> getItems() {
        return items;
    }

    public void setItems(Map<Integer, CartItemDTO> items) {
        this.items = items;
    }

    public boolean contains(int productId) {
        return items.containsKey(productId);
    }

    public void add(CartItemDTO item) {
        items.put(item.getProductId(), item);
    }

    public CartItemDTO get(int productId) {
        return items.get(productId);
    }

    public BigDecimal getTotal() {
        return items.values()
                .stream()
                .map(CartItemDTO::getLineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

}
