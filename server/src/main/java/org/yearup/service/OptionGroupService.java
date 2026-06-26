package org.yearup.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.yearup.dto.OptionGroupCreateDTO;
import org.yearup.dto.OptionGroupUpdateDTO;
import org.yearup.model.OptionGroup;
import org.yearup.repository.OptionGroupRepository;

import java.util.List;

@Service
public class OptionGroupService {
    private final OptionGroupRepository optionGroupRepository;

    public OptionGroupService(OptionGroupRepository optionGroupRepository) {
        this.optionGroupRepository = optionGroupRepository;
    }

    public List<OptionGroup> getAll() {
        return optionGroupRepository.findAll();
    }

    public OptionGroup getById(int optionGroupId) {
        return optionGroupRepository.findById(optionGroupId).orElseThrow(() -> new EntityNotFoundException("Option group not found"));
    }

    @Transactional
    public OptionGroup create(OptionGroup creatingOptionGroup) {
        return optionGroupRepository.save(creatingOptionGroup);
    }

    @Transactional
    public OptionGroup update(int optionGroupId, OptionGroup updatingOptionGroup) {
        OptionGroup optionGroup = this.getById(optionGroupId);

        if (updatingOptionGroup.getName()!= null) {
            optionGroup.setName(updatingOptionGroup.getName());
        }

        if (!updatingOptionGroup.getOptions().isEmpty()) {
            optionGroup.setOptions(updatingOptionGroup.getOptions());
        }
        return optionGroupRepository.save(optionGroup);
    }

    public void delete(int optionGroupId) {
        optionGroupRepository.deleteById(optionGroupId);
    }
}
