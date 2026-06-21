package org.yearup.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.yearup.models.Product;
import org.yearup.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("products")
@CrossOrigin
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService)
    {
        this.productService = productService;
    }

    @GetMapping("")
    @PreAuthorize("permitAll()")
    public List<Product> get(@RequestParam(name="categoryId", required = false) Integer categoryId,
                                @RequestParam(name="minPrice", required = false) Double minPrice,
                                @RequestParam(name="maxPrice", required = false) Double maxPrice,
                                @RequestParam(name="subCategory", required = false) String subCategory) {
        return productService.get(categoryId, minPrice, maxPrice, subCategory);
    }

    @GetMapping("{productId}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Product> getById(@PathVariable int productId) {
        return productService.getById(productId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping()
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Product> createProduct(@RequestBody Product creatingProduct) {
        Product createdProduct = productService.create(creatingProduct);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Product updateProduct(@PathVariable int id, @RequestBody Product product) {
        if (productService.getById(id) == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return productService.update(id, product);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id)
    {
        if (productService.getById(id) == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
