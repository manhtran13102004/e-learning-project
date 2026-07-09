package vn.com.atomi.charge.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import vn.com.atomi.charge.dto.request.CreateRoleRequest;
import vn.com.atomi.charge.dto.request.UpdateRoleRequest;
import vn.com.atomi.charge.dto.response.AdminRoleResponse;
import vn.com.atomi.charge.entity.Permission;
import vn.com.atomi.charge.entity.Role;
import vn.com.atomi.charge.entity.RolePermission;
import vn.com.atomi.charge.exception.AppException;
import vn.com.atomi.charge.exception.ErrorCode;
import vn.com.atomi.charge.repository.PermissionRepository;
import vn.com.atomi.charge.repository.RolePermissionRepository;
import vn.com.atomi.charge.repository.RoleRepository;

@Service
public class RoleService {
    
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final RolePermissionRepository rolePermissionRepository;
    
    public RoleService(RoleRepository roleRepository, PermissionRepository permissionRepository, 
            RolePermissionRepository rolePermissionRepository) {
                this.roleRepository = roleRepository;
                this.permissionRepository = permissionRepository;
                this.rolePermissionRepository = rolePermissionRepository;
            }

    public AdminRoleResponse createRole(CreateRoleRequest request) {
        Role role = Role.builder() 
            .name(request.getName())
            .description(request.getDescription())
            .build();
        
        if (roleRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.ROLE_ALREADY_EXISTS);
        }
        roleRepository.save(role);

        List<Long> permissionIds = request.getPermissionIds();
        if (permissionIds != null) {
            permissionIds.forEach(p_id -> {
            Permission permission = permissionRepository.findById(p_id).orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_FOUND));
            rolePermissionRepository.save(RolePermission.builder()
                .role(role)
                .permission(permission)
                .build());
            });
        }
        return toResponse(role);

    }

    public List<AdminRoleResponse> getAll() {
        return roleRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public Page<AdminRoleResponse> getAllWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Role> roles = roleRepository.findAll(pageable);
        return roles.map(this::toResponse);
    }

    public AdminRoleResponse updateRole(Long id, UpdateRoleRequest request) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        role.setName(request.getName());
        role.setDescription(request.getDescription());
        return toResponse(roleRepository.save(role));
    }

    public void deleteRole(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new AppException(ErrorCode.ROLE_NOT_FOUND);
        }
        roleRepository.deleteById(id);
    }

    public void addRolePermission(Long roleId, Long permissionId) {
        Role role = roleRepository.findById(roleId).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        Permission permission = permissionRepository.findById(permissionId).orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_FOUND));
        if (rolePermissionRepository.existsByRole_IdAndPermission_Id(roleId, permissionId)) {
            throw new AppException(ErrorCode.ROLE_PERMISSION_ALREADY_EXISTS);
        }
        rolePermissionRepository.save(RolePermission.builder().role(role).permission(permission).build());
    }

    public void removeRolePermission(Long roleId, Long permissionId) {
        
        if (!rolePermissionRepository.existsByRole_IdAndPermission_Id(roleId, permissionId)) {
            throw new AppException(ErrorCode.ROLE_PERMISSION_NOT_FOUND);
        }

        rolePermissionRepository.deleteByRole_IdAndPermission_Id(roleId, permissionId);
    }

    private AdminRoleResponse toResponse(Role role) {
        List<String> permissions = rolePermissionRepository.findByRole_Id(role.getId()).stream()
                .map(rolePermission -> rolePermission.getPermission().getName())
                .toList();
        return AdminRoleResponse.builder()
                .id(role.getId())
                .name(role.getName())
                .description(role.getDescription())
                .permissions(permissions)
                .createdAt(role.getCreatedAt())
                .updatedAt(role.getUpdatedAt())
                .build();
    }
}
