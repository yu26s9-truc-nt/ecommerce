package org.yearup.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.yearup.dto.ProductUpdateDTO;
import org.yearup.model.Product;
import org.yearup.repository.ProductRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }

    public List<Product> get(Integer categoryId, BigDecimal minPrice, BigDecimal maxPrice, String subCategory) {
        List<Product> products = categoryId != null
                ? productRepository.getByCategoryId(categoryId)
                : productRepository.findAll();

        return products.stream()
                       .filter(p -> minPrice == null || p.getPrice().compareTo(minPrice) >= 0)
                       .filter(p -> maxPrice == null || p.getPrice().compareTo(maxPrice) <= 0)
                       .filter(p -> subCategory == null || subCategory.equalsIgnoreCase(p.getSubCategory()))
                       .toList();
    }

    public Product getById(int productId) {
        return productRepository.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found"));
    }

    public Product create(Product creatingProduct) {
        return productRepository.save(creatingProduct);
    }

    public Product update(int productId, ProductUpdateDTO updatingProduct) {
        Product product = this.getById(productId);
        product.applyUpdate(updatingProduct);
        return productRepository.save(product);
    }

    public void delete(int productId) {
        productRepository.deleteById(productId);
    }
}
