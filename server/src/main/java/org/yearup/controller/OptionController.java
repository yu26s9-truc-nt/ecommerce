package org.yearup.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.yearup.model.Option;
import org.yearup.service.OptionService;

import java.util.List;

@RestController
@RequestMapping("options")
@CrossOrigin
public class OptionController {

    private final OptionService optionService;

    public OptionController(OptionService optionService) {
        this.optionService = optionService;
    }

    @GetMapping("")
    @PreAuthorize("permitAll()")
    public List<Option> get() {
        return optionService.getAll();
    }

    @GetMapping("{optionId}")
    @PreAuthorize("permitAll()")
    public Option getById(@PathVariable int optionId) {
        return optionService.getById(optionId);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Option> create(@Valid @RequestBody Option option) {
        Option createdOption = optionService.create(option);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOption);
    }

    @PutMapping("{optionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Option updateFull(@PathVariable int optionId, @Valid @RequestBody Option option) {
        return optionService.update(optionId, option);
    }

    @PatchMapping("{optionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Option updatePartial(@PathVariable int optionId, @RequestBody Option option) {
        return optionService.update(optionId, option);
    }

    @DeleteMapping("{optionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable int optionId) {
        optionService.delete(optionId);
        return ResponseEntity.noContent().build();
    }
}