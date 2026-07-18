package vn.com.atomi.charge.authorization.model.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.com.atomi.charge.base.model.dto.BaseDto;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class PermissionDto extends BaseDto<UUID> {
    private String name;
    private String description;
}
