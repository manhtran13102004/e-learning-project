package vn.com.atomi.charge.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vn.com.atomi.charge.dto.request.AdminPermissionRequest;
import vn.com.atomi.charge.dto.response.AdminPermissionResponse;
import vn.com.atomi.charge.dto.response.BaseResponse;
import vn.com.atomi.charge.service.PermissionService;
import java.util.List;

@RestController
@RequestMapping("/api/admin/permissions")
public class AdminPermissionController {

    private final PermissionService permissionService;

    public AdminPermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    
    @GetMapping
    public ResponseEntity<BaseResponse<List<AdminPermissionResponse>>> getAll() {
        BaseResponse<List<AdminPermissionResponse>> response = BaseResponse.<List<AdminPermissionResponse>>builder()
                .code(200)
                .message("OK")
                .result(permissionService.getAll())
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/page")
    public ResponseEntity<BaseResponse<Page<AdminPermissionResponse>>> getAllWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<AdminPermissionResponse> permissionsPage = permissionService.getAllWithPagination(page, size);

        BaseResponse<Page<AdminPermissionResponse>> response = BaseResponse.<Page<AdminPermissionResponse>>builder()
                .code(200)
                .message("Lấy danh sách quyền thành công")
                .result(permissionsPage)
                .build();

        return ResponseEntity.ok(response);
    }

    // Add new permission
    @PostMapping
    public ResponseEntity<BaseResponse<AdminPermissionResponse>> addPermission(
            @RequestBody AdminPermissionRequest request) {

        AdminPermissionResponse permissionResponse = permissionService.addPermission(request);

        BaseResponse<AdminPermissionResponse> response = BaseResponse.<AdminPermissionResponse>builder()
                .code(201)
                .message("Thêm quyền thành công")
                .result(permissionResponse)
                .build();

        return ResponseEntity.ok(response);
    }

    // Update permission
    @PutMapping("{id}")
    public ResponseEntity<BaseResponse<AdminPermissionResponse>> updatePermission(
            @PathVariable Long id,
            @RequestBody AdminPermissionRequest request) {

        AdminPermissionResponse permissionResponse = permissionService.updatePermission(id, request);

        BaseResponse<AdminPermissionResponse> response = BaseResponse.<AdminPermissionResponse>builder()
                .code(200)
                .message("Cập nhật quyền thành công")
                .result(permissionResponse)
                .build();

        return ResponseEntity.ok(response);
    }

    // Delete permission
    @DeleteMapping("{id}")
    public ResponseEntity<BaseResponse<Void>> deletePermission(@PathVariable Long id) {

        permissionService.deletePermission(id);

        BaseResponse<Void> response = BaseResponse.<Void>builder()
                .code(200)
                .message("Xóa quyền thành công")
                .build();

        return ResponseEntity.ok(response);
    }
}
