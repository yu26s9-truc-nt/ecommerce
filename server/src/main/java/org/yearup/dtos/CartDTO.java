package org.yearup.dtos;


import java.util.HashMap;
import java.util.Map;

public class CartDTO {
    private Map<Integer, CartItemDTO> items = new HashMap<>();

    public Map<Integer, CartItemDTO> getItems()
    {
        return items;
    }

    public void setItems(Map<Integer, CartItemDTO> items)
    {
        this.items = items;
    }

    public boolean contains(int productId) {
        return items.containsKey(productId);
    }

    public void add(CartItemDTO item)
    {
        items.put(item.getProductId(), item);
    }

    public CartItemDTO get(int productId)
    {
        return items.get(productId);
    }

    public double getTotal() {
        double total = items.values()
                            .stream()
                            .mapToDouble(i -> i.getLineTotal())
                            .sum();

        return total;
    }

}
