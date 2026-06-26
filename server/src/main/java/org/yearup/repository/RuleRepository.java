package org.yearup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yearup.model.Rule;

@Repository
public interface RuleRepository extends JpaRepository<Rule, Integer> {
}

