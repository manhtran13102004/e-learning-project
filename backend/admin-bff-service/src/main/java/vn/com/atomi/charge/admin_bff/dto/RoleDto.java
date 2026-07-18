package vn.com.atomi.charge.admin_bff.dto;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.com.atomi.charge.base.model.dto.BaseDto;
import jakarta.validation.Valid;
import vn.com.atomi.charge.admin_bff.dto.PermissionDto;


@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class RoleDto extends BaseDto<UUID> {

    @NotBlank(groups = { Create.class, Update.class })
    @Size(max = 50, groups = { Create.class, Update.class })
    private String name;

    @Size(max = 500, groups = { Create.class, Update.class })
    private String description;

    @NotEmpty(groups = { Create.class, Update.class })
    @Valid
    private List<PermissionDto> permissions;
}
