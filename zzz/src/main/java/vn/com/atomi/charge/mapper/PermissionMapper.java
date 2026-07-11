package vn.com.atomi.charge.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import vn.com.atomi.charge.dto.response.AdminPermissionResponse;
import vn.com.atomi.charge.entity.Permission;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PermissionMapper {

    AdminPermissionResponse toAdminDto(Permission permission);
    
}
