package vn.com.atomi.charge.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import vn.com.atomi.charge.dto.response.AdminRoleResponse;
import vn.com.atomi.charge.dto.response.PermissionResponse;
import vn.com.atomi.charge.dto.response.RoleResponse;
import vn.com.atomi.charge.entity.Permission;
import vn.com.atomi.charge.entity.Role;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-11T16:24:52+0700",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class RoleMapperImpl implements RoleMapper {

    @Override
    public RoleResponse toDto(Role entity) {
        if ( entity == null ) {
            return null;
        }

        RoleResponse.RoleResponseBuilder<?, ?> roleResponse = RoleResponse.builder();

        roleResponse.createdAt( entity.getCreatedAt() );
        roleResponse.description( entity.getDescription() );
        roleResponse.id( entity.getId() );
        roleResponse.name( entity.getName() );
        roleResponse.permissions( permissionListToPermissionResponseList( entity.getPermissions() ) );
        roleResponse.updatedAt( entity.getUpdatedAt() );

        return roleResponse.build();
    }

    @Override
    public Role toEntity(RoleResponse dto) {
        if ( dto == null ) {
            return null;
        }

        Role.RoleBuilder role = Role.builder();

        role.createdAt( dto.getCreatedAt() );
        role.description( dto.getDescription() );
        role.id( dto.getId() );
        role.name( dto.getName() );
        role.permissions( permissionResponseListToPermissionList( dto.getPermissions() ) );
        role.updatedAt( dto.getUpdatedAt() );

        return role.build();
    }

    @Override
    public List<RoleResponse> toDtoList(List<Role> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<RoleResponse> list = new ArrayList<RoleResponse>( entityList.size() );
        for ( Role role : entityList ) {
            list.add( toDto( role ) );
        }

        return list;
    }

    @Override
    public List<Role> toEntityList(List<RoleResponse> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Role> list = new ArrayList<Role>( dtoList.size() );
        for ( RoleResponse roleResponse : dtoList ) {
            list.add( toEntity( roleResponse ) );
        }

        return list;
    }

    @Override
    public AdminRoleResponse toAdminDto(Role role) {
        if ( role == null ) {
            return null;
        }

        AdminRoleResponse.AdminRoleResponseBuilder<?, ?> adminRoleResponse = AdminRoleResponse.builder();

        adminRoleResponse.createdAt( role.getCreatedAt() );
        adminRoleResponse.description( role.getDescription() );
        adminRoleResponse.id( role.getId() );
        adminRoleResponse.name( role.getName() );
        adminRoleResponse.permissions( permissionListToPermissionResponseList( role.getPermissions() ) );
        adminRoleResponse.updatedAt( role.getUpdatedAt() );

        return adminRoleResponse.build();
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
}
