package org.yearup.dto;

import jakarta.validation.constraints.Size;
import org.yearup.model.Category;

public class CategoryUpdateDTO {
    @Size(max = 100)
    private String name;

    @Size(max = 100)
    private String description;

    public CategoryUpdateDTO() {
    }

    public CategoryUpdateDTO(Category category) {
        this.name = category.getName();
        this.description = category.getDescription();
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
