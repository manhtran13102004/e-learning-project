package vn.com.atomi.charge.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import vn.com.atomi.charge.dto.request.AdminPermissionRequest;
import vn.com.atomi.charge.dto.response.AdminPermissionResponse;
import vn.com.atomi.charge.entity.Permission;
import vn.com.atomi.charge.exception.AppException;
import vn.com.atomi.charge.exception.ErrorCode;
import vn.com.atomi.charge.repository.PermissionRepository;

@Service
public class PermissionService {

    private final PermissionRepository permissionRepository;

    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public List<AdminPermissionResponse> getAll(){
        return permissionRepository.findAll().stream().map(this::toResponse).toList();
    }

    public Page<AdminPermissionResponse> getAllWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Permission> permissions = permissionRepository.findAll(pageable);
        return permissions.map(this::toResponse);
    }

    public AdminPermissionResponse addPermission(AdminPermissionRequest permissionRequest) {
        Permission permission = Permission.builder()
                .name(permissionRequest.getName())
                .description(permissionRequest.getDescription())
                .build();
        return toResponse(permissionRepository.save(permission));
    }

    public List<AdminPermissionResponse> listPermissions() {
        return permissionRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public AdminPermissionResponse updatePermission(Long id, AdminPermissionRequest permissionRequest) {
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_FOUND));
        permission.setName(permissionRequest.getName());
        permission.setDescription(permissionRequest.getDescription());
        return toResponse(permissionRepository.save(permission));
    }

    public void deletePermission(Long id) {
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_FOUND));
        permissionRepository.delete(permission);
    }

    private AdminPermissionResponse toResponse(Permission permission) {
        return AdminPermissionResponse.builder()
                .id(permission.getId())
                .name(permission.getName())
                .description(permission.getDescription())
                .createdAt(permission.getCreatedAt())
                .updatedAt(permission.getUpdatedAt())
                .build();
    }

}
