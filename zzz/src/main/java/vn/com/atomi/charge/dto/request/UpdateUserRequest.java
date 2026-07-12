package vn.com.atomi.charge.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {

    @NotBlank(message = "FULL_NAME_REQUIRED")
    @Size(max = 150, message = "FULL_NAME_TOO_LONG")
    private String fullName;

    private Long avatarFileId;

    @Size(max = 1000, message = "BIO_TOO_LONG")
    private String bio;

    private String password;
}
