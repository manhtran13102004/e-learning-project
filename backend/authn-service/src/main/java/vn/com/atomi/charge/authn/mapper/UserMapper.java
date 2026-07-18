package vn.com.atomi.charge.authn.mapper;

import java.util.UUID;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import vn.com.atomi.charge.authn.model.dto.UserDto;
import vn.com.atomi.charge.authn.model.entity.UserEntity;
import vn.com.atomi.charge.base.mapper.EntityMapper;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper extends EntityMapper<UUID, UserDto, UserEntity> {
}
