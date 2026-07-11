package vn.com.atomi.charge.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import vn.com.atomi.charge.dto.response.AdminUserResponse;
import vn.com.atomi.charge.dto.response.PermissionResponse;
import vn.com.atomi.charge.dto.response.RoleResponse;
import vn.com.atomi.charge.dto.response.UserResponse;
import vn.com.atomi.charge.entity.Permission;
import vn.com.atomi.charge.entity.Role;
import vn.com.atomi.charge.entity.User;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-11T16:24:52+0700",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserResponse toDto(User entity) {
        if ( entity == null ) {
            return null;
        }

        UserResponse.UserResponseBuilder<?, ?> userResponse = UserResponse.builder();

        userResponse.bio( entity.getBio() );
        userResponse.createdAt( entity.getCreatedAt() );
        userResponse.email( entity.getEmail() );
        userResponse.fullName( entity.getFullName() );
        userResponse.id( entity.getId() );
        userResponse.roles( roleListToRoleResponseList( entity.getRoles() ) );
        userResponse.userStatus( entity.getUserStatus() );

        return userResponse.build();
    }

    @Override
    public User toEntity(UserResponse dto) {
        if ( dto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.bio( dto.getBio() );
        user.createdAt( dto.getCreatedAt() );
        user.email( dto.getEmail() );
        user.fullName( dto.getFullName() );
        user.id( dto.getId() );
        user.roles( roleResponseListToRoleList( dto.getRoles() ) );
        user.userStatus( dto.getUserStatus() );

        return user.build();
    }

    @Override
    public List<UserResponse> toDtoList(List<User> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<UserResponse> list = new ArrayList<UserResponse>( entityList.size() );
        for ( User user : entityList ) {
            list.add( toDto( user ) );
        }

        return list;
    }

    @Override
    public List<User> toEntityList(List<UserResponse> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<User> list = new ArrayList<User>( dtoList.size() );
        for ( UserResponse userResponse : dtoList ) {
            list.add( toEntity( userResponse ) );
        }

        return list;
    }

    @Override
    public AdminUserResponse toAdminDto(User user) {
        if ( user == null ) {
            return null;
        }

        AdminUserResponse.AdminUserResponseBuilder<?, ?> adminUserResponse = AdminUserResponse.builder();

        adminUserResponse.bio( user.getBio() );
        adminUserResponse.createdAt( user.getCreatedAt() );
        adminUserResponse.email( user.getEmail() );
        adminUserResponse.fullName( user.getFullName() );
        adminUserResponse.id( user.getId() );
        adminUserResponse.roles( roleListToRoleResponseList( user.getRoles() ) );
        adminUserResponse.userStatus( user.getUserStatus() );

        return adminUserResponse.build();
    }

    protected PermissionResponse permissionToPermissionResponse(Permission permission) {
        if ( permission == null ) {
            return null;
        }

        PermissionResponse.PermissionResponseBuilder<?, ?> permissionResponse = PermissionResponse.builder();

        permissionResponse.createdAt( permission.getCreatedAt() );
        permissionResponse.description( permission.getDescription() );
        permissionResponse.id( permission.getId() );
        permissionResponse.name( permission.getName() );
        permissionResponse.updatedAt( permission.getUpdatedAt() );

        return permissionResponse.build();
    }

    protected List<PermissionResponse> permissionListToPermissionResponseList(List<Permission> list) {
        if ( list == null ) {
            return null;
        }

        List<PermissionResponse> list1 = new ArrayList<PermissionResponse>( list.size() );
        for ( Permission permission : list ) {
            list1.add( permissionToPermissionResponse( permission ) );
        }

        return list1;
    }

    protected RoleResponse roleToRoleResponse(Role role) {
        if ( role == null ) {
            return null;
        }

        RoleResponse.RoleResponseBuilder<?, ?> roleResponse = RoleResponse.builder();

        roleResponse.createdAt( role.getCreatedAt() );
        roleResponse.description( role.getDescription() );
        roleResponse.id( role.getId() );
        roleResponse.name( role.getName() );
        roleResponse.permissions( permissionListToPermissionResponseList( role.getPermissions() ) );
        roleResponse.updatedAt( role.getUpdatedAt() );

        return roleResponse.build();
    }

    protected List<RoleResponse> roleListToRoleResponseList(List<Role> list) {
        if ( list == null ) {
            return null;
        }

        List<RoleResponse> list1 = new ArrayList<RoleResponse>( list.size() );
        for ( Role role : list ) {
            list1.add( roleToRoleResponse( role ) );
        }

        return list1;
    }

    protected Permission permissionResponseToPermission(PermissionResponse permissionResponse) {
        if ( permissionResponse == null ) {
            return null;
        }

        Permission.PermissionBuilder permission = Permission.builder();

        permission.createdAt( permissionResponse.getCreatedAt() );
        permission.description( permissionResponse.getDescription() );
        permission.id( permissionResponse.getId() );
        permission.name( permissionResponse.getName() );
        permission.updatedAt( permissionResponse.getUpdatedAt() );

        return permission.build();
    }

    protected List<Permission> permissionResponseListToPermissionList(List<PermissionResponse> list) {
        if ( list == null ) {
            return null;
        }

        List<Permission> list1 = new ArrayList<Permission>( list.size() );
        for ( PermissionResponse permissionResponse : list ) {
            list1.add( permissionResponseToPermission( permissionResponse ) );
        }

        return list1;
    }

    protected Role roleResponseToRole(RoleResponse roleResponse) {
        if ( roleResponse == null ) {
            return null;
        }

        Role.RoleBuilder role = Role.builder();

        role.createdAt( roleResponse.getCreatedAt() );
        role.description( roleResponse.getDescription() );
        role.id( roleResponse.getId() );
        role.name( roleResponse.getName() );
        role.permissions( permissionResponseListToPermissionList( roleResponse.getPermissions() ) );
        role.updatedAt( roleResponse.getUpdatedAt() );

        return role.build();
    }

    protected List<Role> roleResponseListToRoleList(List<RoleResponse> list) {
        if ( list == null ) {
            return null;
        }

        List<Role> list1 = new ArrayList<Role>( list.size() );
        for ( RoleResponse roleResponse : list ) {
            list1.add( roleResponseToRole( roleResponse ) );
        }

        return list1;
    }
}
