package vn.com.atomi.charge.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginRequest {

    @Email(message = "EMAIL_INVALID")
    @NotBlank(message = "EMAIL_REQUIRED")
    private String email;
    @NotBlank(message = "PASSWORD_REQUIRED")
    private String password;
}
