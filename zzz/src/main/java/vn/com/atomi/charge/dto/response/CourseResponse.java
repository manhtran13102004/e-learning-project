package vn.com.atomi.charge.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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
public class CourseResponse {
    private Long id;
    private String name;
    private String shortDescription;
    private String description;
    private String slug;
    private BigDecimal price;
    private String currency;
    private String thumbnailUrl;
    private Level level;
    private ContentStatus status;
    private DurationUnit estimatedDurationUnit;
    private Integer estimatedDurationValue;
    private Boolean certificateEnabled;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
