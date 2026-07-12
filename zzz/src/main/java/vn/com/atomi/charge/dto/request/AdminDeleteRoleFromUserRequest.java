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
public class AdminDeleteRoleFromUserRequest {
    @NotNull(message = "ROLE_ID_REQUIRED")
    private Long roleId;
}
