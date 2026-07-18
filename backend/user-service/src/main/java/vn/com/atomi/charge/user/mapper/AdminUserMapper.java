package vn.com.atomi.charge.user.mapper;

import java.util.UUID;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import vn.com.atomi.charge.base.mapper.EntityMapper;
import vn.com.atomi.charge.user.model.dto.AdminUserDto;
import vn.com.atomi.charge.user.model.entity.UserEntity;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AdminUserMapper extends EntityMapper<UUID, AdminUserDto, UserEntity> {
}
