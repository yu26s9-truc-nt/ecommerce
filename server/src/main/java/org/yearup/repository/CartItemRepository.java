package org.yearup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yearup.model.CartItem;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    List<CartItem> getByUserId(int userId);

    Optional<CartItem> getByUserIdAndProduct_ProductId(int userId, int productId);

    void deleteByUserId(int userId);
}
