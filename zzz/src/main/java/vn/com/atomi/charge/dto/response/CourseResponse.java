package vn.com.atomi.charge.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import vn.com.atomi.charge.enums.ContentStatus;
import vn.com.atomi.charge.enums.DurationUnit;
import vn.com.atomi.charge.enums.Level;


@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CourseResponse extends ProductResponse{
    private SpecializationResponse specialization;
    private Level level;
    private ContentStatus contentStatus;
    private DurationUnit estimatedDurationUnit;
    private Integer estimatedDurationValue;
    private Boolean certificateEnabled;
}
