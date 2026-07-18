package vn.com.atomi.charge.user.service.impl;

import org.springframework.stereotype.Service;

import vn.com.atomi.charge.base.service.BaseService;
import vn.com.atomi.charge.user.model.dto.UserDto;
import vn.com.atomi.charge.user.model.entity.UserEntity;
import vn.com.atomi.charge.user.repository.UserRepo;
import vn.com.atomi.charge.user.mapper.UserMapper;
import vn.com.atomi.charge.user.service.interfaces.UserService;

@Service
public class UserServiceImpl extends BaseService<UserRepo, UserDto, UserEntity, UserMapper> implements UserService {

}
