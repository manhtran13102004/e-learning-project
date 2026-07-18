package vn.com.atomi.charge.authorization.service.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;

import vn.com.atomi.charge.authorization.mapper.UserMapper;
import vn.com.atomi.charge.authorization.model.dto.UserDto;
import vn.com.atomi.charge.authorization.model.entity.UserEntity;
import vn.com.atomi.charge.authorization.repository.UserRepo;
import vn.com.atomi.charge.authorization.service.interfaces.UserService;
import vn.com.atomi.charge.base.service.BaseService;

@Service
public class UserServiceImpl extends BaseService<UserRepo, UserDto, UserEntity, UserMapper> implements UserService {

}
