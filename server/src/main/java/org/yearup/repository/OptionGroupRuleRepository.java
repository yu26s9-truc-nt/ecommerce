package org.yearup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yearup.model.OptionGroupOption;
import org.yearup.model.OptionGroupRule;

@Repository
public interface OptionGroupRuleRepository extends JpaRepository<OptionGroupRule, Integer> {
}

