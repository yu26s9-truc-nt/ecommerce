package org.yearup.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.yearup.dto.OptionGroupCreateDTO;
import org.yearup.dto.OptionGroupUpdateDTO;
import org.yearup.model.OptionGroup;
import org.yearup.service.OptionGroupService;

import java.util.List;

@RestController
@RequestMapping("option-groups")
@CrossOrigin
public class OptionGroupController {
    private final OptionGroupService optionGroupService;

    public OptionGroupController(OptionGroupService optionGroupService) {
        this.optionGroupService = optionGroupService;
    }

    @GetMapping()
    @PreAuthorize("permitAll()")
    public List<OptionGroup> get() {
        return optionGroupService.getAll();
    }

    @GetMapping("{optionGroupId}")
    @PreAuthorize("permitAll()")
    public OptionGroup getById(@PathVariable int optionGroupId) {
        return optionGroupService.getById(optionGroupId);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OptionGroup> create(@Valid @RequestBody OptionGroup creatingOptionGroup) {
        OptionGroup createdOptionGroup = optionGroupService.create(creatingOptionGroup);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOptionGroup);
    }

    @PutMapping("{optionGroupId}")
    @PreAuthorize("hasRole('ADMIN')")
    public OptionGroup updatePartial(
            @PathVariable int optionGroupId,
            @Valid @RequestBody OptionGroup updatingOptionGroup) {

        return optionGroupService.update(optionGroupId, updatingOptionGroup);
    }

    @DeleteMapping("{optionGroupId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable int optionGroupId) {
        optionGroupService.delete(optionGroupId);
        return ResponseEntity.noContent().build();
    }
}