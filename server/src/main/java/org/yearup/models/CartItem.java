package org.yearup.models;

import jakarta.persistence.*;

@Entity
@Table(name = "shopping_cart")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    private int cartItemId;

    @Column(name = "user_id")
    private int userId;

    @ManyToOne()
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "quantity")
    private int quantity = 1;

    public int getCartItemId()
    {
        return cartItemId;
    }

    public void setCartItemId(int cartItemId)
    {
        this.cartItemId = cartItemId;
    }

    public int getUserId()
    {
        return userId;
    }

    public void setUserId(int userId)
    {
        this.userId = userId;
    }

    public Product getProduct()
    {
        return product;
    }

    public void setProduct(Product product)
    {
        this.product = product;
    }

    public int getQuantity()
    {
        return quantity;
    }

    public void setQuantity(int quantity)
    {
        this.quantity = quantity;
    }

    public void increaseQuantity() {
        increaseQuantity(1);
    }

    public void decreaseQuantity() {
        decreaseQuantity(1);
    }

    public void increaseQuantity(int quantity) {
        if (this.quantity + quantity > product.getStock()) {
            throw new IllegalStateException(
                    "Requested quantity exceeds available stock.");
        }

        this.quantity += quantity;
    }

    public void decreaseQuantity(int quantity) {
        this.quantity = Math.max(0, this.quantity - quantity);
    }
}
