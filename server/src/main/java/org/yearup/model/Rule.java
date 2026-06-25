package org.yearup.model;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;

@Entity
@Table(name = "rules")
public class Rule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rule_id")
    private Integer ruleId;

    @Column(name = "target_id")
    private Integer targetId;

    @Column(name = "target", length = 20)
    private String target;

    @Column(name = "type", length = 20, nullable = false)
    private String type;

    @Column(name = "mode", length = 20)
    private String mode;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "condition_map", columnDefinition = "JSON")
    private Map<String, Object> conditionMap;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "config", columnDefinition = "JSON")
    private Map<String, Object> config;

    public Rule() {
    }

    public Integer getRuleId() {
        return ruleId;
    }

    public void setRuleId(Integer ruleId) {
        this.ruleId = ruleId;
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

    public Map<String, Object> getConditionMap() {
        return conditionMap;
    }

    public void setConditionMap(Map<String, Object> conditionMap) {
        this.conditionMap = conditionMap;
    }

    public Map<String, Object> getConfig() {
        return config;
    }

    public void setConfig(Map<String, Object> config) {
        this.config = config;
    }
}