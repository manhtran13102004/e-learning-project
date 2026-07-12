package vn.com.atomi.charge.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class AdminCreateCourseRequest extends CreateCourseRequest {
    @Size(max = 50, message = "COURSE_SKU_TOO_LONG")
    private String sku;
}
