package vn.com.atomi.charge.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import vn.com.atomi.charge.dto.response.AdminPermissionResponse;
import vn.com.atomi.charge.entity.Permission;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-11T16:24:52+0700",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class PermissionMapperImpl implements PermissionMapper {

    @Override
    public AdminPermissionResponse toAdminDto(Permission permission) {
        if ( permission == null ) {
            return null;
        }

        AdminPermissionResponse.AdminPermissionResponseBuilder<?, ?> adminPermissionResponse = AdminPermissionResponse.builder();

        adminPermissionResponse.createdAt( permission.getCreatedAt() );
        adminPermissionResponse.description( permission.getDescription() );
        adminPermissionResponse.id( permission.getId() );
        adminPermissionResponse.name( permission.getName() );
        adminPermissionResponse.updatedAt( permission.getUpdatedAt() );

        return adminPermissionResponse.build();
    }
}
