package org.yearup.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.yearup.dto.CategoryUpdateDTO;
import org.yearup.dto.ProductFilterDTO;
import org.yearup.model.Category;
import org.yearup.model.Product;
import org.yearup.service.CategoryService;
import org.yearup.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final ProductService productService;

    public CategoryController(CategoryService categoryService, ProductService productService) {
        this.categoryService = categoryService;
        this.productService = productService;
    }

    @GetMapping()
    @PreAuthorize("permitAll()")
    public List<Category> get() {
        return categoryService.get();
    }

    @GetMapping("/{categoryId}")
    @PreAuthorize("permitAll()")
    public Category getById(@PathVariable int categoryId) {
        return categoryService.getById(categoryId);
    }

    @GetMapping("{categoryId}/products")
    @PreAuthorize("permitAll()")
    public List<Product> getProductsById(@PathVariable int categoryId) {
        ProductFilterDTO filter = new ProductFilterDTO();
        filter.setCategoryId(categoryId);
        return productService.get(filter);
    }

    @PostMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Category> create(@Valid @RequestBody Category creatingCategory) {
        Category createdCategory = categoryService.create(creatingCategory);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
    }

    @PutMapping("/{categoryId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Category updateFull(@PathVariable int categoryId, @Valid @RequestBody Category updatingCategory) {
        return categoryService.update(categoryId, new CategoryUpdateDTO(updatingCategory));
    }

    @PatchMapping("/{categoryId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Category updatePartial(@PathVariable int categoryId, @Valid @RequestBody CategoryUpdateDTO updatingCategory) {
        return categoryService.update(categoryId, updatingCategory);
    }


    @DeleteMapping("/{categoryId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable int categoryId) {
        categoryService.delete(categoryId);
        return ResponseEntity.noContent().build();
    }
}
