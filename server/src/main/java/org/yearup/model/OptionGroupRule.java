package org.yearup.model;

import jakarta.persistence.*;

@Entity
@Table(name = "option_group_rules")
public class OptionGroupRule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_group_rule_id")
    private Integer optionGroupRuleId;

    @Column(name = "target_id")
    private Integer targetId;

    @Column(name = "target", length = 10)
    private String target;

    @Column(name = "option_group_id", nullable = false)
    private Integer optionGroupId;

    @Column(name = "option_id")
    private Integer optionId;

    @Column(name = "type", length = 100, nullable = false)
    private String type;

    @Column(name = "mode", length = 100)
    private String mode;

    @Column(name = "condition_map", columnDefinition = "JSON")
    private String conditionMap;

    @Column(name = "config", columnDefinition = "JSON")
    private String config;

    public OptionGroupRule() {
    }

    public Integer getOptionGroupRuleId() {
        return optionGroupRuleId;
    }

    public void setOptionGroupRuleId(Integer optionGroupRuleId) {
        this.optionGroupRuleId = optionGroupRuleId;
    }

    public Integer getTargetId() {
        return targetId;
    }

    public void setTargetId(Integer targetId) {
        this.targetId = targetId;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public Integer getOptionGroupId() {
        return optionGroupId;
    }

    public void setOptionGroupId(Integer optionGroupId) {
        this.optionGroupId = optionGroupId;
    }

    public Integer getOptionId() {
        return optionId;
    }

    public void setOptionId(Integer optionId) {
        this.optionId = optionId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public String getConditionMap() {
        return conditionMap;
    }

    public void setConditionMap(String conditionMap) {
        this.conditionMap = conditionMap;
    }

    public String getConfig() {
        return config;
    }

    public void setConfig(String config) {
        this.config = config;
    }
}