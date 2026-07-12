package vn.com.atomi.charge.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminUpdatePermissionRequest {

    @NotBlank(message = "PERMISSION_NAME_REQUIRED")
    @Size(max = 50, message = "PERMISSION_NAME_TOO_LONG")
    private String name;

    @Size(max = 255, message = "PERMISSION_DESCRIPTION_TOO_LONG")
    private String description;
}
