package org.yearup.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.yearup.model.OptionGroupRule;
import org.yearup.repository.OptionGroupRuleRepository;

import java.util.List;

@Service
public class OptionGroupRuleService {

    private final OptionGroupRuleRepository optionGroupRuleRepository;

    public OptionGroupRuleService(OptionGroupRuleRepository optionGroupRuleRepository) {
        this.optionGroupRuleRepository = optionGroupRuleRepository;
    }

    public List<OptionGroupRule> getAll() {
        return optionGroupRuleRepository.findAll();
    }

    public OptionGroupRule getById(int optionRuleId) {
        return optionGroupRuleRepository.findById(optionRuleId).orElseThrow(() -> new EntityNotFoundException("OptionGroupRule not found"));
    }

    public OptionGroupRule create(OptionGroupRule optionGroupRule) {
        return optionGroupRuleRepository.save(optionGroupRule);
    }

    public OptionGroupRule update(int optionRuleId, OptionGroupRule updatingOptionGroupRule) {
        OptionGroupRule optionGroupRule = getById(optionRuleId);
        optionGroupRule.setTargetId(updatingOptionGroupRule.getTargetId());
        optionGroupRule.setTarget(updatingOptionGroupRule.getTarget());
        optionGroupRule.setOptionGroupId(updatingOptionGroupRule.getOptionGroupId());
        optionGroupRule.setOptionId(updatingOptionGroupRule.getOptionId());
        optionGroupRule.setType(updatingOptionGroupRule.getType());
        optionGroupRule.setMode(updatingOptionGroupRule.getMode());
        optionGroupRule.setConditionMap(updatingOptionGroupRule.getConditionMap());
        optionGroupRule.setConfig(updatingOptionGroupRule.getConfig());

        return optionGroupRuleRepository.save(optionGroupRule);
    }

    public void delete(int id) {
        optionGroupRuleRepository.deleteById(id);
    }
}