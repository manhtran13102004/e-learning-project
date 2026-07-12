package vn.com.atomi.charge.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.com.atomi.charge.enums.ActiveStatus;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UpdateCertificateRequest {

    @NotNull(message = "PRODUCT_ID_REQUIRED")
    private Long productId;

    @NotBlank(message = "TITLE_REQUIRED")
    private String title;

    private String description;

    private Long backgroundFileId;

    @NotNull(message = "STATUS_REQUIRED")
    private ActiveStatus status;
}
