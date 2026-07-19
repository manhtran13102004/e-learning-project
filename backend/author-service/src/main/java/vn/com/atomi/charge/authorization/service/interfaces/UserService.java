package vn.com.atomi.charge.authorization.service.interfaces;

import java.util.UUID;

import vn.com.atomi.charge.authorization.mapper.UserMapper;
import vn.com.atomi.charge.authorization.model.dto.UserDto;
import vn.com.atomi.charge.authorization.model.entity.UserEntity;
import vn.com.atomi.charge.authorization.repository.UserRepo;
import vn.com.atomi.charge.base.service.IBaseService;

public interface UserService extends IBaseService<UserRepo, UserDto, UserEntity, UserMapper, UUID> {
}
