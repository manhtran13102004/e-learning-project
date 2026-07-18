package vn.com.atomi.charge.authorization.model.dto;

import java.util.List;
import java.util.UUID;

import vn.com.atomi.charge.authorization.model.entity.RoleEntity;
import vn.com.atomi.charge.base.model.dto.BaseDto;

public class UserDto extends BaseDto<UUID> {
    private List<RoleEntity> roles;
}
