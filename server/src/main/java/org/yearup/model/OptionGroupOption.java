package org.yearup.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "option_group_options")
public class OptionGroupOption {
    @EmbeddedId
    private OptionGroupOptionId optionGroupOptionId = new OptionGroupOptionId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("optionGroupId")
    @JoinColumn(name = "option_group_id")
    private OptionGroup optionGroup;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("optionId")
    @JoinColumn(name = "option_id")
    private Option option;

    public OptionGroupOption() {
    }

    public OptionGroupOption(OptionGroup optionGroup, Option option) {
        this.optionGroup = optionGroup;
        this.option = option;
        this.optionGroupOptionId = new OptionGroupOptionId(optionGroup.getOptionGroupId(), option.getOptionId());
    }

    public OptionGroupOptionId getOptionGroupOptionId() {
        return optionGroupOptionId;
    }

    public void setOptionGroupOptionId(OptionGroupOptionId optionGroupOptionId) {
        this.optionGroupOptionId = optionGroupOptionId;
    }

    public OptionGroup getOptionGroup() {
        return optionGroup;
    }

    public void setOptionGroup(OptionGroup optionGroup) {
        this.optionGroup = optionGroup;
    }

    public Option getOption() {
        return option;
    }

    public void setOption(Option option) {
        this.option = option;
    }

    @Embeddable
    public static class OptionGroupOptionId implements Serializable {

        @Column(name = "option_group_id")
        private Integer optionGroupId;

        @Column(name = "option_id")
        private Integer optionId;

        public OptionGroupOptionId() {
        }

        public OptionGroupOptionId(Integer optionGroupId, Integer optionId) {
            this.optionGroupId = optionGroupId;
            this.optionId = optionId;
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

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            OptionGroupOptionId that = (OptionGroupOptionId) o;
            return Objects.equals(optionGroupId, that.optionGroupId)
                    && Objects.equals(optionId, that.optionId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(optionGroupId, optionId);
        }
    }
}