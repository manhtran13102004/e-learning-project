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
public class AdminPermissionResponse {
    
    private Long id;
    
    private String name;

    private String description;

    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
