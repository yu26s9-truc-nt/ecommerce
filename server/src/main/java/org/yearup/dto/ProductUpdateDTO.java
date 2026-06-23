package org.yearup.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import org.yearup.model.Product;

import java.math.BigDecimal;

public class ProductUpdateDTO {
    @Size(min = 1, max = 100)
    private String name;

    @PositiveOrZero
    private BigDecimal price;

    private Integer categoryId;

    @Size(max = 500)
    private String description;

    @Size(max = 100)
    private String subCategory;

    @PositiveOrZero
    private Integer stock;

    private Boolean featured;

    @Size(max = 255)
    private String imageUrl;

    public ProductUpdateDTO(Product product) {
        this.name = product.getName();
        this.price = product.getPrice();
        this.categoryId = product.getCategoryId();
        this.description = product.getDescription();
        this.subCategory = product.getSubCategory();
        this.stock = product.getStock();
        this.featured = product.getFeatured();
        this.imageUrl = product.getImageUrl();
    }

    public String getName() {
        return name;
    }

    public BigDecimal getPrice() {
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
