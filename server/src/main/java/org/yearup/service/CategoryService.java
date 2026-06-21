package org.yearup.service;

import org.springframework.stereotype.Service;
import org.yearup.models.Category;
import org.yearup.repository.CategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getById(int categoryId) {
        return categoryRepository.findById(categoryId);
    }

    public Category create(Category creatingCategory) {
        return categoryRepository.save(creatingCategory);
    }

    public Optional<Category> update(int categoryId, Category updatingCategory) {
        return categoryRepository.findById(categoryId).map(category -> {
            if (updatingCategory.getName() != null) category.setName(updatingCategory.getName());
            if (updatingCategory.getDescription() != null) category.setDescription(updatingCategory.getDescription());
            return categoryRepository.save(category);
        });
    }

    public boolean delete(int categoryId) {
        if (categoryRepository.existsById(categoryId)) {
            categoryRepository.deleteById(categoryId);
            return true;
        }
        return false;
    }
}
