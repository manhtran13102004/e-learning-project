package vn.com.atomi.charge.dto.request;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import vn.com.atomi.charge.entity.Role;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequest {

    @NotBlank(message = "EMAIL_REQUIRED")
    @Email(message = "EMAIL_INVALID")
    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @NotBlank(message = "PASSWORD_REQUIRED")
    @Size(min = 6, message = "PASSWORD_TOO_SHORT")
    private String password;

    @NotBlank(message = "FULL_NAME_REQUIRED")
    @Size(max = 150, message = "FULL_NAME_TOO_LONG")
    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;


}
