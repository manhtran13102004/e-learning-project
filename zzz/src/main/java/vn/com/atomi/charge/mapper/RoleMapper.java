package vn.com.atomi.charge.mapper;

import org.mapstruct.Mapper;

import vn.com.atomi.charge.dto.response.AdminRoleResponse;
import vn.com.atomi.charge.dto.response.RoleResponse;
import vn.com.atomi.charge.entity.Role;


@Mapper(componentModel = "spring")
public interface RoleMapper extends BaseMapper<Role, RoleResponse> {
    
    AdminRoleResponse toAdminDto(Role role);
}
