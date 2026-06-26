CREATE TABLE option_groups (
    option_group_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    options JSON NOT NULL,
    PRIMARY KEY (option_group_id)
);

CREATE TABLE rules (
    rule_id INT NOT NULL AUTO_INCREMENT,
    target_id INT NULL,
    target VARCHAR(20) NULL,
    type VARCHAR(20) NOT NULL,
    mode VARCHAR(20),
    condition_map JSON,
    config JSON,
    PRIMARY KEY (rule_id),
    INDEX idx_target_id_target (target_id, target)
);