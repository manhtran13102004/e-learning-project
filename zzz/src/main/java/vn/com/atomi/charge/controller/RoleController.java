package vn.com.atomi.charge.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import vn.com.atomi.charge.dto.request.AdminCreateRoleRequest;
import vn.com.atomi.charge.dto.request.AdminUpdateRoleRequest;
import vn.com.atomi.charge.dto.response.AdminRoleResponse;
import vn.com.atomi.charge.dto.response.BaseResponse;
import vn.com.atomi.charge.service.RoleService;

@RestController
@RequestMapping("api/admin/roles")
public class RoleController {
    
    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<BaseResponse<List<AdminRoleResponse>>> getAll() {
        BaseResponse<List<AdminRoleResponse>> response = BaseResponse.<List<AdminRoleResponse>>builder()
                .code(200)
                .message("OK")
                .result(roleService.getAll())
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/page")
    public ResponseEntity<BaseResponse<Page<AdminRoleResponse>>> getAllWithPagination(Pageable pageable) {
        BaseResponse<Page<AdminRoleResponse>> response = BaseResponse.<Page<AdminRoleResponse>>builder()
                .code(200)
                .message("OK")
                .result(roleService.getAllWithPagination(pageable))
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<BaseResponse<AdminRoleResponse>> createRole(@Valid @RequestBody AdminCreateRoleRequest request) {
        BaseResponse<AdminRoleResponse> response = BaseResponse.<AdminRoleResponse>builder()
                .code(201)
                .message("Tạo role thành công")
                .result(roleService.createRole(request))
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("{id}")
    public ResponseEntity<BaseResponse<AdminRoleResponse>> updateRole(@PathVariable Long id, @Valid @RequestBody AdminUpdateRoleRequest request) {
        BaseResponse<AdminRoleResponse> response = BaseResponse.<AdminRoleResponse>builder()
                .code(200)
                .message("Cập nhật role thành công")
                .result(roleService.updateRole(id, request))
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<BaseResponse<Void>> deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        BaseResponse<Void> response = BaseResponse.<Void>builder()
                .code(200)
                .message("Xóa role thành công")
                .build();
        return ResponseEntity.ok(response);
    }
}
