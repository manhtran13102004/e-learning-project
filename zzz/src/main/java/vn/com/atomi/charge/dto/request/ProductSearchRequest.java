package vn.com.atomi.charge.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import vn.com.atomi.charge.enums.ActiveStatus;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ProductSearchRequest {

    private String keyword;

    @Size(max = 50, message = "SKU_FILTER_TOO_LONG")
    private String sku;

    @Positive(message = "PRICE_FILTER_INVALID")
    private BigDecimal minPrice;

    @Positive(message = "PRICE_FILTER_INVALID")
    private BigDecimal maxPrice;

    private ActiveStatus status;

    // @Min(0)
    // @Max(100)
    // private Integer discountRateFrom; // % min discount rate

    // @Min(0)
    // @Max(100)
    // private Integer discountRateTo;   // % max discount rate
}
