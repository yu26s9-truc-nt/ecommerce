package org.yearup.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.yearup.dto.CategoryUpdateDTO;
import org.yearup.dto.ProductFilterDTO;
import org.yearup.dto.ProductUpdateDTO;
import org.yearup.model.Category;
import org.yearup.model.Product;
import org.yearup.service.ProductService;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService)
    {
        this.productService = productService;
    }

    @GetMapping("")
    @PreAuthorize("permitAll()")
    public List<Product> get(@ModelAttribute ProductFilterDTO filter) {
        return productService.get(filter);
    }

    @GetMapping("{productId}")
    @PreAuthorize("permitAll()")
    public Product getById(@PathVariable int productId) {
        return productService.getById(productId);
    }

    @PostMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> create(@Valid @RequestBody Product creatingProduct) {
        Product createdProduct = productService.create(creatingProduct);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/{productId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Product updateFull(@PathVariable int productId, @Valid @RequestBody Product updatingProduct) {
        return productService.update(productId, new ProductUpdateDTO(updatingProduct));
    }

    @PatchMapping("{productId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Product updatePartial(@PathVariable int productId, @Valid @RequestBody ProductUpdateDTO updatingProduct) {
        return productService.update(productId, updatingProduct);
    }

    @DeleteMapping("{productId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable int productId) {
        productService.delete(productId);
        return ResponseEntity.noContent().build();
    }
}
