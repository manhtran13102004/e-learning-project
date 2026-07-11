package vn.com.atomi.charge.dto.request;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.com.atomi.charge.entity.Role;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequest {

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    @Column(nullable = false, unique = true, length = 255)
    private String email;

    private String password;

    @NotBlank(message = "Họ tên không được để trống")
    @Size(max = 150, message = "Họ tên tối đa 150 ký tự")
    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;

    private Long avatarFileId;

    @Size(max = 1000, message = "Bio tối đa 1000 ký tự")
    @Column(length = 1000)
    private String bio;

    private List<Role> roles;

}
