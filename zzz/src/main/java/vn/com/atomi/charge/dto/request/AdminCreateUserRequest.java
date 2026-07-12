package vn.com.atomi.charge.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class AdminCreateUserRequest extends CreateUserRequest{

    @NotEmpty(message = "ROLE_REQUIRED")
    private List<Long> roleIds;
}
