package vn.com.atomi.charge.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseMemberResponse {

    private AdminUserResponse user;
    private AdminRoleResponse role;

}
