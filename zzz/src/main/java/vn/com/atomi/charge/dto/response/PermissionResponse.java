package vn.com.atomi.charge.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PermissionResponse {
    
    private Long id;
    
    private String name;

    private String description;

    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
