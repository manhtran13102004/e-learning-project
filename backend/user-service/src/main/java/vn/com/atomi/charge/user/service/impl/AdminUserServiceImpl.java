package vn.com.atomi.charge.user.service.impl;

import org.springframework.stereotype.Service;

import vn.com.atomi.charge.base.service.BaseService;
import vn.com.atomi.charge.user.model.dto.UserDto;
import vn.com.atomi.charge.user.model.entity.UserEntity;
import vn.com.atomi.charge.user.repository.UserRepo;
import vn.com.atomi.charge.user.mapper.AdminUserMapper;
import vn.com.atomi.charge.user.service.interfaces.AdminUserService;
import vn.com.atomi.charge.user.model.dto.AdminUserDto;
import java.util.UUID;

@Service
public class AdminUserServiceImpl extends BaseService<UserRepo, AdminUserDto, UserEntity, AdminUserMapper, UUID>
        implements AdminUserService {

}
