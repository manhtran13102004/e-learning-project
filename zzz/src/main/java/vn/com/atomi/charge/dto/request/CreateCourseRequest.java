package vn.com.atomi.charge.dto.request;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.com.atomi.charge.enums.ContentStatus;
import vn.com.atomi.charge.enums.DurationUnit;
import vn.com.atomi.charge.enums.Level;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateCourseRequest {
    private String name;
    private String shortDescription;
    private String description;
    private String slug;
    private BigDecimal price;
    private String currency;
    private Long thumbnailFileId;
    private Level level;
    private ContentStatus contentStatus;
    private DurationUnit estimatedDurationUnit;
    private Integer estimatedDurationValue;
    private Boolean certificateEnabled;
}
