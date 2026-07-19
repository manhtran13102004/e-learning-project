package vn.com.atomi.charge.authn.service.interfaces;

import vn.com.atomi.charge.authn.mapper.UserMapper;
import vn.com.atomi.charge.authn.model.dto.UserDto;
import vn.com.atomi.charge.authn.repository.UserRepo;
import vn.com.atomi.charge.authn.model.entity.UserEntity;
import vn.com.atomi.charge.base.service.IBaseService;
import java.util.UUID;

public interface UserService extends IBaseService<UserRepo, UserDto, UserEntity, UserMapper, UUID> {
}
