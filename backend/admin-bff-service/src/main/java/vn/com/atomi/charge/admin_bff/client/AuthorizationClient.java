package vn.com.atomi.charge.admin_bff.client;

import vn.com.atomi.charge.admin_bff.config.FeignClientConfig;
import vn.com.atomi.charge.admin_bff.dto.PermissionDto;
import vn.com.atomi.charge.admin_bff.dto.RoleDto;
import vn.com.atomi.charge.base.model.request.BaseRequest;
import vn.com.atomi.charge.base.model.response.BaseResponse;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import java.util.List;
import java.util.UUID;

@FeignClient(
    name = "authorization-service",
    configuration = FeignClientConfig.class
)
public interface AuthorizationClient{

    //permissions
    @GetMapping("/api/v1/internal/roles")
    ResponseEntity<BaseResponse<Page<RoleDto>>> getAllRoles();

    @PostMapping("/api/v1/internal/roles")
    ResponseEntity<BaseResponse<RoleDto>>createRole(@RequestBody BaseRequest<RoleDto>roleDto);

    @PutMapping("/api/v1/internal/roles/{id}")
    ResponseEntity<BaseResponse<RoleDto>>updateRole(@PathVariable("id") UUID id, @RequestBody BaseRequest<RoleDto>roleDto);

    @DeleteMapping("/api/v1/internal/roles/{id}")
    ResponseEntity<BaseResponse<Void>> deleteRole(@PathVariable("id") UUID id);

    //PERMISSIONS
    @GetMapping("/api/v1/internal/permissions")
    ResponseEntity<BaseResponse<Page<PermissionDto>>> getAllpermissions();

    @PostMapping("/api/v1/internal/permissions")
    ResponseEntity<BaseResponse<PermissionDto>>createPermission(@RequestBody BaseRequest<PermissionDto>permissionDto);

    @PutMapping("/api/v1/internal/permissions/{id}")
    ResponseEntity<BaseResponse<PermissionDto>>updatePermission(@PathVariable("id") UUID id, @RequestBody BaseRequest<PermissionDto>permissionDto);

    @DeleteMapping("/api/v1/internal/permissions/{id}")
    ResponseEntity<BaseResponse<Void>> deletePermission(@PathVariable("id") UUID id);

    @DeleteMapping("/api/v1/internal/permissions")
    ResponseEntity<BaseResponse<Void>> deletePermissions(@RequestBody List<UUID> ids);


}