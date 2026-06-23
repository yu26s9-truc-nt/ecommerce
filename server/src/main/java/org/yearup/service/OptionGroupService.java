package org.yearup.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.yearup.dto.OptionGroupCreateDTO;
import org.yearup.dto.OptionGroupUpdateDTO;
import org.yearup.model.Option;
import org.yearup.model.OptionGroup;
import org.yearup.model.OptionGroupOption;
import org.yearup.repository.OptionGroupOptionRepository;
import org.yearup.repository.OptionGroupRepository;

import java.util.List;

@Service
public class OptionGroupService {
    private final OptionGroupRepository optionGroupRepository;
    private final OptionGroupOptionRepository optionGroupOptionRepository;
    private final OptionService optionService;

    public OptionGroupService(OptionGroupRepository optionGroupRepository, OptionGroupOptionRepository optionGroupOptionRepository, OptionService optionService) {
        this.optionGroupRepository = optionGroupRepository;
        this.optionGroupOptionRepository = optionGroupOptionRepository;
        this.optionService = optionService;
    }

    public List<OptionGroup> getAll() {
        return optionGroupRepository.findAll();
    }

    public OptionGroup getById(int optionGroupId) {
        return optionGroupRepository.findById(optionGroupId).orElseThrow(() -> new EntityNotFoundException("Option group not found"));
    }

    @Transactional
    public OptionGroup create(OptionGroupCreateDTO creatingOptionGroupCreate) {
        OptionGroup optionGroup = new OptionGroup();
        optionGroup.setName(creatingOptionGroupCreate.getName());

        optionGroup = optionGroupRepository.save(optionGroup);

        for (Integer optionId : creatingOptionGroupCreate.getOptionIds()) {
            Option option = optionService.getById(optionId);

            OptionGroupOption optionGroupOption = new OptionGroupOption(optionGroup, option);
            optionGroupOptionRepository.save(optionGroupOption);
        }

        return optionGroup;
    }

    @Transactional
    public OptionGroup update(int optionGroupId, OptionGroupUpdateDTO updatingOptionGroupUpdate) {
        OptionGroup optionGroup = this.getById(optionGroupId);

        if (updatingOptionGroupUpdate.getName() != null) {
            optionGroup.setName(updatingOptionGroupUpdate.getName());
        }

        if (updatingOptionGroupUpdate.getOptionIds() != null) {
            // remove existing links
            optionGroupOptionRepository.deleteByOptionGroupId(optionGroupId);

            for (Integer optionId : updatingOptionGroupUpdate.getOptionIds()) {
                Option option = optionService.getById(optionId);

                OptionGroupOption optionGroupOption = new OptionGroupOption(optionGroup, option);
                optionGroupOptionRepository.save(optionGroupOption);
            }
        }
        return optionGroupRepository.save(optionGroup);
    }

    public void delete(int optionGroupId) {
        optionGroupRepository.deleteById(optionGroupId);
    }
}
