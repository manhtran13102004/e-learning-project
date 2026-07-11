package vn.com.atomi.charge.mapper;

import org.mapstruct.Mapper;

import vn.com.atomi.charge.dto.response.UserResponse;
import vn.com.atomi.charge.entity.User;
import vn.com.atomi.charge.dto.response.AdminUserResponse;

@Mapper(componentModel = "spring")
public interface UserMapper extends BaseMapper<User, UserResponse> {

    AdminUserResponse toAdminDto(User user);
}
