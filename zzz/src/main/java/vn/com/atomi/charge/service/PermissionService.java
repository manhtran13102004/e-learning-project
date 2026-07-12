package vn.com.atomi.charge.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import vn.com.atomi.charge.dto.request.AdminCreatePermissionRequest;
import vn.com.atomi.charge.dto.request.AdminUpdatePermissionRequest;
import vn.com.atomi.charge.dto.response.AdminPermissionResponse;
import vn.com.atomi.charge.entity.Permission;
import vn.com.atomi.charge.exception.AppException;
import vn.com.atomi.charge.exception.ErrorCode;
import vn.com.atomi.charge.mapper.PermissionMapper;
import vn.com.atomi.charge.repository.PermissionRepository;

@RequiredArgsConstructor
@Service
public class PermissionService {

    private final PermissionRepository permissionRepository;
    private final PermissionMapper permissionMapper;


    public List<AdminPermissionResponse> getAll(){
        return permissionRepository.findAll().stream().map(this::toResponse).toList();
    }

    public Page<AdminPermissionResponse> getAllWithPagination(Pageable pageable) {
        Page<Permission> permissions = permissionRepository.findAll(pageable);
        return permissions.map(this::toResponse);
    }

    public AdminPermissionResponse addPermission(AdminCreatePermissionRequest permissionRequest) {
        Permission permission = Permission.builder()
                .name(permissionRequest.getName())
                .description(permissionRequest.getDescription())
                .build();
        return toResponse(permissionRepository.save(permission));
    }

    public AdminPermissionResponse updatePermission(Long id, AdminUpdatePermissionRequest permissionRequest) {
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
        return permissionMapper.toAdminDto(permission);
    }

}
