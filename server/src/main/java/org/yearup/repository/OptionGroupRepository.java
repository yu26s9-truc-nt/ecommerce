package org.yearup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yearup.model.CartItem;
import org.yearup.model.Option;
import org.yearup.model.OptionGroup;
import org.yearup.model.OptionGroupRule;

import java.util.List;
import java.util.Optional;

@Repository
public interface OptionGroupRepository extends JpaRepository<OptionGroup, Integer> {
}