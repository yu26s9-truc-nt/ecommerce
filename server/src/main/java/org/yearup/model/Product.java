package org.yearup.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.yearup.dto.CategoryUpdateDTO;
import org.yearup.dto.ProductUpdateDTO;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private int productId;

    @NotBlank
    @Size(min = 1, max = 100)
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @PositiveOrZero
    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @NotNull
    @Column(name = "category_id", nullable = false)
    private Integer categoryId;

    @Size(max = 500)
    @Column(name = "description", length = 500)
    private String description;

    @Size(max = 100)
    @Column(name = "subcategory", length = 100)
    private String subCategory;

    @PositiveOrZero
    @Column(name = "stock")
    private int stock;

    @Column(name = "featured")
    private boolean featured;

    @Size(max = 255)
    @Column(name = "image_url")
    private String imageUrl;

    public Product() {
    }

    public Product(int productId, String name, BigDecimal price, int categoryId, String description, String subCategory, int stock, boolean featured, String imageUrl) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.description = description;
        this.subCategory = subCategory;
        this.stock = stock;
        this.featured = featured;
        this.imageUrl = imageUrl;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public boolean getFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void applyUpdate(ProductUpdateDTO updatingProduct) {
        if (updatingProduct.getName() != null) this.name = updatingProduct.getName();
        if (updatingProduct.getPrice() != null) this.price = updatingProduct.getPrice();
        if (updatingProduct.getCategoryId() != null) this.categoryId = updatingProduct.getCategoryId();
        if (updatingProduct.getDescription() != null) this.description = updatingProduct.getDescription();
        if (updatingProduct.getSubCategory() != null) this.subCategory = updatingProduct.getSubCategory();
        if (updatingProduct.getStock() != null) this.stock = updatingProduct.getStock();
        if (updatingProduct.getSubCategory() != null) this.featured = updatingProduct.getFeatured();
        if (updatingProduct.getImageUrl() != null) this.imageUrl = updatingProduct.getImageUrl();
    }
}
