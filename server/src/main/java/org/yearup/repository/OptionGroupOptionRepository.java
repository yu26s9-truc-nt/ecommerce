package org.yearup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yearup.model.OptionGroupOption;

import java.util.List;
import java.util.Optional;

@Repository
public interface OptionGroupOptionRepository extends JpaRepository<OptionGroupOption, OptionGroupOption.OptionGroupOptionId> {
    void deleteByOptionGroupId(int optionGroupId);
}