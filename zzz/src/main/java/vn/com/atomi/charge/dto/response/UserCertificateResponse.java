package vn.com.atomi.charge.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.com.atomi.charge.enums.CertificateStatus;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserCertificateResponse {
    private Long id;
    private Long userId;
    private Long certificateId;
    private String certificateTitle;
    private String certificateCode;
    private Long pdfFileId;
    private String pdfFileUrl;
    private CertificateStatus status;
    private LocalDateTime issuedAt;
    private LocalDateTime revokedAt;
    private String revokedReason;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
