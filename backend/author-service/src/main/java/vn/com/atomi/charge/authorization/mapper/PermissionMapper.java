package vn.com.atomi.charge.authorization.mapper;

import java.util.UUID;

import org.mapstruct.Mapper;

import vn.com.atomi.charge.authorization.model.dto.PermissionDto;
import vn.com.atomi.charge.authorization.model.entity.PermissionEntity;
import vn.com.atomi.charge.base.mapper.EntityMapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper extends EntityMapper<UUID, PermissionDto, PermissionEntity> {

}
