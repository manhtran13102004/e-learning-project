package vn.com.atomi.charge.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FileMetadataResponse {
    private Long id;
    private String fileUrl;
    private String originalFileName;
    private String mimeType;
    private Long fileSize;
    private LocalDateTime createdAt;
}
