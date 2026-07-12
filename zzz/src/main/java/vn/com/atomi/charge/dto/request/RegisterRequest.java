package vn.com.atomi.charge.dto.request;

import jakarta.validation.constraints.Email;
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
public class RegisterRequest {

    @Email(message = "EMAIL_INVALID")
    @NotBlank(message = "EMAIL_REQUIRED")
    private String email;

    @NotBlank(message = "PASSWORD_REQUIRED")
    @Size(min = 6, message = "PASSWORD_TOO_SHORT")
    private String password;

    @NotBlank(message = "FULL_NAME_REQUIRED")
    @Size(max = 150, message = "FULL_NAME_TOO_LONG")
    private String fullName;
}
