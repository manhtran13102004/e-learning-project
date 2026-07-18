package vn.com.atomi.charge.admin_bff.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.com.atomi.charge.base.model.dto.BaseDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
@EqualsAndHashCode(callSuper = true)
public class PermissionDto extends BaseDto<UUID> {
    
    @NotBlank(groups = { Create.class, Update.class })
    @Size(max = 50, groups = { Create.class, Update.class })
    private String name;

    @Size(max = 500, groups = { Create.class, Update.class })
    private String description;
}
