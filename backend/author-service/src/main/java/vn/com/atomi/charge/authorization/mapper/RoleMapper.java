package vn.com.atomi.charge.authorization.mapper;

import java.util.UUID;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import vn.com.atomi.charge.authorization.model.dto.RoleDto;
import vn.com.atomi.charge.authorization.model.entity.RoleEntity;
import vn.com.atomi.charge.base.mapper.EntityMapper;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RoleMapper extends EntityMapper<UUID, RoleDto, RoleEntity> {

}
