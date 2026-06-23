package org.yearup.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.yearup.repository.OptionRepository;
import org.yearup.model.Option;

import java.util.List;

@Service
public class OptionService {
    private final OptionRepository optionRepository;

    public OptionService(OptionRepository optionRepository) {
        this.optionRepository = optionRepository;
    }

    public List<Option> getAll() {
        return optionRepository.findAll();
    }

    public Option getById(int optionId) {
        return optionRepository.findById(optionId)
                .orElseThrow(() -> new EntityNotFoundException("Option not found"));
    }

    public Option create(Option option) {
        return optionRepository.save(option);
    }

    public Option update(int optionId, Option dto) {
        Option option = getById(optionId);

        if (dto.getName() != null) {
            option.setName(dto.getName());
        }

        return optionRepository.save(option);
    }

    public void delete(int optionId) {
        optionRepository.deleteById(optionId);
    }
}