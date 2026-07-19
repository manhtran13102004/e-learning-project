package vn.com.atomi.charge.user.service.interfaces;

import vn.com.atomi.charge.user.model.dto.AdminUserDto;
import vn.com.atomi.charge.user.model.entity.UserEntity;
import vn.com.atomi.charge.user.repository.UserRepo;
import vn.com.atomi.charge.base.service.IBaseService;
import vn.com.atomi.charge.user.mapper.AdminUserMapper;
import java.util.UUID;

public interface AdminUserService extends IBaseService<UserRepo, AdminUserDto, UserEntity, AdminUserMapper, UUID> {

}
