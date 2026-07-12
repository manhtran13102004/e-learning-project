package vn.com.atomi.charge.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AdminUpdateRoleRequest {
    @NotBlank(message = "ROLE_NAME_REQUIRED")
    @Size(max = 50, message = "ROLE_NAME_TOO_LONG")
    private String name;

    @Size(max = 255, message = "ROLE_DESCRIPTION_TOO_LONG")
    private String description;

    private List<Long> permissionIds;
}
