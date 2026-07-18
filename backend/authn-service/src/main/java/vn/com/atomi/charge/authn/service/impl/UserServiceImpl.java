package vn.com.atomi.charge.authn.service.impl;

import org.springframework.stereotype.Service;
import vn.com.atomi.charge.authn.mapper.UserMapper;
import vn.com.atomi.charge.authn.model.dto.UserDto;
import vn.com.atomi.charge.authn.repository.UserRepo;
import vn.com.atomi.charge.authn.service.interfaces.UserService;
import vn.com.atomi.charge.authn.model.entity.UserEntity;
import vn.com.atomi.charge.base.model.request.BaseRequest;
import vn.com.atomi.charge.base.service.BaseService;

@Service
public class UserServiceImpl
        extends BaseService<UserRepo, UserDto, UserEntity, UserMapper>
        implements UserService {

    @Override
    protected boolean isDuplicate(BaseRequest<UserDto> dto) {
        UserDto data = dto.getData();
        return repository.existsByUsernameAndDeletedAtIsNull(data.getUsername());
    }
}
