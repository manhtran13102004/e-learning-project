package vn.com.atomi.charge.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import vn.com.atomi.charge.dto.response.UserResponse;
import vn.com.atomi.charge.entity.Course;
import vn.com.atomi.charge.entity.User;
import vn.com.atomi.charge.dto.request.AdminUpdateCourseRequest;
import vn.com.atomi.charge.dto.request.CreateCourseRequest;
import vn.com.atomi.charge.dto.request.CreateUserRequest;
import vn.com.atomi.charge.dto.request.UpdateCourseRequest;
import vn.com.atomi.charge.dto.request.UpdateUserRequest;
import vn.com.atomi.charge.dto.response.AdminUserResponse;

@Mapper(componentModel = "spring")
public interface UserMapper extends BaseMapper<User, UserResponse> {

    User toEntity(CreateUserRequest request);

    
    // 2. Hàm dùng cho CẬP NHẬT (Đè dữ liệu từ Update Request lên Entity có sẵn)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromRequest(UpdateUserRequest request, @MappingTarget User User);
  

    // 3. Hàm dùng cho ADMIN UPDATE (Đè dữ liệu từ Update Request Admin lên Entity có sẵn)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromAdminRequest(AdminUpdateUserRequest request, @MappingTarget User User);


    @Mapping(target = "avatarFileId", source = "avatarFile.id")
    @Mapping(target = "avatarUrl", source = "avatarFile.fileUrl")
    @Override
    UserResponse toDto(User user);

    @Mapping(target = "avatarFileId", source = "avatarFile.id")
    @Mapping(target = "avatarUrl", source = "avatarFile.fileUrl")
    AdminUserResponse toAdminDto(User user);

    
}
