package vn.com.atomi.charge.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import vn.com.atomi.charge.enums.ContentStatus;
import vn.com.atomi.charge.enums.DurationUnit;
import vn.com.atomi.charge.enums.Level;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UpdateCourseRequest {
    @NotBlank(message = "COURSE_NAME_REQUIRED")
    @Size(max = 255, message = "COURSE_NAME_TOO_LONG")
    private String name;

    @Size(max = 500, message = "COURSE_SHORT_DESCRIPTION_TOO_LONG")
    private String shortDescription;

    @Size(max = 2000, message = "COURSE_DESCRIPTION_TOO_LONG")
    private String description;

    @NotBlank(message = "COURSE_SLUG_REQUIRED")
    @Size(max = 255, message = "COURSE_SLUG_TOO_LONG")
    private String slug;

    @NotNull(message = "COURSE_PRICE_REQUIRED")
    @PositiveOrZero(message = "COURSE_PRICE_INVALID")
    private BigDecimal price;

    @Size(max = 10, message = "COURSE_CURRENCY_TOO_LONG")
    private String currency;

    private Long thumbnailFileId;

    @NotNull(message = "COURSE_LEVEL_REQUIRED")
    private Level level;

    @NotNull(message = "COURSE_CONTENT_STATUS_REQUIRED")
    private ContentStatus contentStatus;

    @NotNull(message = "COURSE_DURATION_UNIT_REQUIRED")
    private DurationUnit estimatedDurationUnit;

    @Positive(message = "COURSE_DURATION_VALUE_INVALID")
    private Integer estimatedDurationValue;

    private Boolean certificateEnabled;
}
