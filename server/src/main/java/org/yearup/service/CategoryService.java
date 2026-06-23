package org.yearup.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.yearup.dto.CategoryUpdateDTO;
import org.yearup.model.Category;
import org.yearup.repository.CategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> get() {
        return categoryRepository.findAll();
    }

    public Category getById(int categoryId) {
        return categoryRepository.findById(categoryId).orElseThrow(() -> new EntityNotFoundException("Category not found"));
    }

    public Category create(Category creatingCategory) {
        return categoryRepository.save(creatingCategory);
    }

    public Category update(int categoryId, CategoryUpdateDTO updatingCategory) {
        Category category = this.getById(categoryId);
        category.applyUpdate(updatingCategory);
        return categoryRepository.save(category);
    }

    public void delete(int categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
