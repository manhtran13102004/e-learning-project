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

@FeignClient(
    name = "authorization-service",
    configuration = FeignClientConfig.class
)
public interface AuthorizationClient {

    //permissions
    @GetMapping("/api/v1/internal/roles")
    ResponseEntity<Page<RoleDto>> getAllRoles();

    @PostMapping("/api/v1/internal/roles")
    ResponseEntity<RoleDto>createRole(@RequestBody BaseRequest<RoleDto>roleDto);

    @PutMapping("/api/v1/internal/roles/{id}")
    ResponseEntity<RoleDto>updateRole(@PathVariable("id") String id, @RequestBody BaseRequest<RoleDto>roleDto);

    @DeleteMapping("/api/v1/internal/roles/{id}")
    BaseResponse<Void> deleteRole(@PathVariable("id") String id);

    //PERMISSIONS
    @GetMapping("/api/v1/internal/permissions")
    ResponseEntity<Page<PermissionDto>> getAllpermissions();

    @PostMapping("/api/v1/internal/permissions")
    ResponseEntity<PermissionDto>createpermission(@RequestBody BaseRequest<PermissionDto>permissionDto);

    @PutMapping("/api/v1/internal/permissions/{id}")
    ResponseEntity<PermissionDto>updatepermission(@PathVariable("id") String id, @RequestBody BaseRequest<PermissionDto>permissionDto);

    @DeleteMapping("/api/v1/internal/permissions/{id}")
    BaseResponse<Void> deletepermission(@PathVariable("id") String id);


}