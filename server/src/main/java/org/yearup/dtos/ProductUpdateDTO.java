package org.yearup.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public class ProductUpdateDTO {
    @Size(min = 1, max = 100)
    private String name;

    @PositiveOrZero
    private Double price;

    private Integer categoryId;

    @Size(max = 500)
    private String description;

    private String subCategory;

    @Min(0)
    private Integer stock;

    private Boolean featured;

    private String imageUrl;

    public String getName() {
        return name;
    }

    public Double getPrice() {
        return price;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public String getDescription() {
        return description;
    }

    public String getSubCategory() {
        return subCategory;
    }

    public Integer getStock() {
        return stock;
    }

    public Boolean getFeatured() {
        return featured;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}
