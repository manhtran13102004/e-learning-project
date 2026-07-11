package vn.com.atomi.charge.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import vn.com.atomi.charge.enums.UserStatus;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserResponse {
    private Long id;
    private String email;
    private String fullName;
    private Long avatarFileId;
    private String avatarUrl;
    private String bio;
    private UserStatus userStatus;
    private LocalDateTime createdAt;
    private List<RoleResponse> roles; 
}
