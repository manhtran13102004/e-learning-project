package vn.com.atomi.charge.user.service.interfaces;

import vn.com.atomi.charge.user.model.dto.UserDto;
import vn.com.atomi.charge.user.model.entity.UserEntity;
import vn.com.atomi.charge.user.repository.UserRepo;
import vn.com.atomi.charge.base.service.IBaseService;
import vn.com.atomi.charge.user.mapper.UserMapper;
import java.util.UUID;

public interface UserService extends IBaseService<UserRepo, UserDto, UserEntity, UserMapper, UUID> {

}
