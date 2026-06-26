package org.yearup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yearup.model.OptionGroup;

@Repository
public interface OptionGroupRepository extends JpaRepository<OptionGroup, Integer> {
}