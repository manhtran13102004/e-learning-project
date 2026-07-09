package vn.com.atomi.charge.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateRoleRequest {
    private String name;
    private String description;
    private List<Long> permissionIds;
}
