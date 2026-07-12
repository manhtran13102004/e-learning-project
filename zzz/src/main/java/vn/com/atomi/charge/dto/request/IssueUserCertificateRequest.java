package vn.com.atomi.charge.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class IssueUserCertificateRequest {

    @NotNull(message = "USER_ID_REQUIRED")
    private Long userId;

    @NotNull(message = "CERTIFICATE_ID_REQUIRED")
    private Long certificateId;

    private String certificateCode;

    private Long pdfFileId;
}
