package vn.com.atomi.charge.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AdminUserResponse {
    private Long id;
    private String email;
    private String fullName;
    private String avatarUrl;
    private List<String> roles;
    private LocalDateTime createdAt;
}
