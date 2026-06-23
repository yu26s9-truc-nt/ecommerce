CREATE TABLE option_groups (
    option_group_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (option_group_id)
);

CREATE TABLE options (
    option_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (option_id)
);

CREATE TABLE option_group_options (
    option_group_id INT NOT NULL,
    option_id INT NOT NULL,
    PRIMARY KEY (option_group_id, option_id),
    FOREIGN KEY (option_group_id) REFERENCES option_groups(option_group_id),
    FOREIGN KEY (option_id) REFERENCES options(option_id)
);

CREATE TABLE option_group_rules (
    option_group_rule_id INT NOT NULL AUTO_INCREMENT,
    target_id INT NULL,
    target VARCHAR(10) NULL,
    option_group_id INT NOT NULL,
    option_id INT NULL,
    type VARCHAR(100) NOT NULL,
    mode VARCHAR(100),
    condition_map JSON,
    config JSON,
    FOREIGN KEY (option_group_id) REFERENCES option_groups(option_group_id),
    FOREIGN KEY (option_id) REFERENCES options(option_id)
);