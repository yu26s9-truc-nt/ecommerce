package org.yearup.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.yearup.dto.ProductFilterDTO;
import org.yearup.dto.ProductUpdateDTO;
import org.yearup.model.Product;
import org.yearup.repository.ProductRepository;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }

    public List<Product> get(ProductFilterDTO filter) {
        List<Product> products = filter.getCategoryId() != null
                ? productRepository.getByCategoryId(filter.getCategoryId())
                : productRepository.findAll();

        List<Product> filteredProducts = products.stream()
                .filter(p -> filter.getMinPrice() == null || p.getPrice().compareTo(filter.getMinPrice()) >= 0)
                .filter(p -> filter.getMaxPrice() == null || p.getPrice().compareTo(filter.getMaxPrice()) <= 0)
                .filter(p -> filter.getSearch() == null ||
                        (p.getName() != null && p.getName().toLowerCase().contains(filter.getSearch().toLowerCase())) ||
                        (p.getDescription() != null && p.getDescription().toLowerCase().contains(filter.getSearch().toLowerCase())))
                .filter(p -> filter.getFeatured() == null || filter.getFeatured().equals(p.getFeatured()))
                .toList();


        if (filter.getSort() == null || !filter.getSort().startsWith("price")) {
            return filteredProducts;
        }

        Comparator<Product> comparator = Comparator.comparing(Product::getPrice);

        if (filter.getSort().endsWith("desc")) {
            comparator = comparator.reversed();
        }

        return filteredProducts.stream().sorted(comparator).toList();
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
