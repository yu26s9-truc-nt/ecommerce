package org.yearup.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class CartItemUpdateDTO {
    @NotNull
    @PositiveOrZero
    private Integer quantity;

    public Integer getQuantity() {
        return quantity;
    }
}
