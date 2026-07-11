package vn.com.atomi.charge.dto.request;

import lombok.Data;
import lombok.experimental.SuperBuilder;
import vn.com.atomi.charge.enums.ContentStatus;
import vn.com.atomi.charge.enums.DurationUnit;
import vn.com.atomi.charge.enums.Level;


@SuperBuilder
@Data
public class AdminCourseSearchRequest extends AdminProductSearchRequest{
    private String keyword;
    private Level level;
    private ContentStatus contentStatus;
    private Boolean certificateEnabled;
    private DurationUnit estimatedDurationUnit;
    private Integer estimatedDurationValue;
}
