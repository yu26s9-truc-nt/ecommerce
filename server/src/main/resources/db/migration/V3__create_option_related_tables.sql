CREATE TABLE option_groups (
    option_group_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    options JSON NOT NULL,
    PRIMARY KEY (option_group_id)
);

CREATE TABLE rules (
    rule_id INT NOT NULL AUTO_INCREMENT,
    /*target_type VARCHAR(20) NULL,*/
    target_id INT NULL,
    target VARCHAR(20) NULL,
    type VARCHAR(20) NOT NULL,
    mode VARCHAR(20),
    condition_map JSON,
    config JSON,
    PRIMARY KEY (rule_id),
    INDEX idx_target_id_target (target_id, target)
);
/*
    target_type: category, target_id: drink, type: _, mode: _, config: { option_groups: [size, swirl] }

    target_type: option_group, target_id: size, type: _, mode: _, config: { rules: [{type: price, mode: diff}], minSelection, maxSelection }
    target_type: option_group, target_id: swirl, type: _, mode: _, config: { rules: [{type: price, mode: same}, {type: price, mode: free_threshold}], minSelection, maxSelection }

    target_type: option_group, target_id: swirl, type: price, mode: same, config: { price: ... }
    target_type: option_group, target_id: swirl, type: price, mode: free_threshold, config: { { size: 'S', delta: ' '}, {....} }


    target_type: product, target_id: coffee, type: price, mode: diff, config: { S: 10, L: 10 }
*/

