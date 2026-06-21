package org.yearup.service;

import org.springframework.stereotype.Service;
import org.yearup.dtos.ProductUpdateDTO;
import org.yearup.models.Product;
import org.yearup.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }

    public List<Product> get(Integer categoryId, Double minPrice, Double maxPrice, String subCategory) {
        List<Product> products = categoryId != null
                ? productRepository.findByCategoryId(categoryId)
                : productRepository.findAll();

        return products.stream()
                       .filter(p -> minPrice == null || p.getPrice() >= minPrice)
                       .filter(p -> maxPrice == null || p.getPrice() <= maxPrice)
                       .filter(p -> subCategory == null || subCategory.equalsIgnoreCase(p.getSubCategory()))
                       .toList();
    }

    public List<Product> listByCategoryId(int categoryId)
    {
        return productRepository.findByCategoryId(categoryId);
    }

    public Optional<Product> getById(int productId) {
        return productRepository.findById(productId);
    }

    public Product create(Product creatingProduct) {
        return productRepository.save(creatingProduct);
    }

    public Optional<Product> update(int productId, ProductUpdateDTO updatingProduct) {
        return productRepository.findById(productId).map(product -> {
            if (updatingProduct.getName() != null) product.setName(updatingProduct.getName());
            if (updatingProduct.getPrice() != null) product.setPrice(updatingProduct.getPrice());
            if (updatingProduct.getCategoryId() != null) product.setCategoryId(updatingProduct.getCategoryId());
            if (updatingProduct.getDescription() != null) product.setDescription(updatingProduct.getDescription());
            if (updatingProduct.getSubCategory() != null) product.setSubCategory(updatingProduct.getSubCategory());
            if (updatingProduct.getStock() != null) product.setStock(updatingProduct.getStock());
            if (updatingProduct.getSubCategory() != null) product.setFeatured(updatingProduct.getFeatured());
            if (updatingProduct.getImageUrl() != null) product.setImageUrl(updatingProduct.getImageUrl());
            return productRepository.save(product);
        });
    }

    public void delete(int productId)
    {
        productRepository.deleteById(productId);
    }
}
