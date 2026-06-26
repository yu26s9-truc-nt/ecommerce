package org.yearup.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.yearup.model.Rule;
import org.yearup.repository.RuleRepository;

import java.util.List;

@Service
public class RuleService {

    private final RuleRepository ruleRepository;

    public RuleService(RuleRepository ruleRepository) {
        this.ruleRepository = ruleRepository;
    }

    public List<Rule> getAll() {
        return ruleRepository.findAll();
    }

    public Rule getById(int optionRuleId) {
        return ruleRepository.findById(optionRuleId).orElseThrow(() -> new EntityNotFoundException("Rule not found"));
    }

    public Rule create(Rule rule) {
        return ruleRepository.save(rule);
    }

    public Rule update(int optionRuleId, Rule updatingRule) {
        Rule rule = getById(optionRuleId);
        rule.setTargetId(updatingRule.getTargetId());
        rule.setTarget(updatingRule.getTarget());
        rule.setType(updatingRule.getType());
        rule.setMode(updatingRule.getMode());
        rule.setConditionMap(updatingRule.getConditionMap());
        rule.setConfig(updatingRule.getConfig());

        return ruleRepository.save(rule);
    }

    public void delete(int id) {
        ruleRepository.deleteById(id);
    }
}