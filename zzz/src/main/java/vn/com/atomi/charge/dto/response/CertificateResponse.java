package vn.com.atomi.charge.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.com.atomi.charge.enums.ActiveStatus;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CertificateResponse {
    private Long id;
    private Long productId;
    private String title;
    private String description;
    private Long backgroundFileId;
    private String backgroundFileUrl;
    private ActiveStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
