package vn.com.atomi.charge.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import vn.com.atomi.charge.dto.request.AdminCreateRoleRequest;
import vn.com.atomi.charge.dto.request.AdminUpdateRoleRequest;
import vn.com.atomi.charge.dto.response.AdminRoleResponse;
import vn.com.atomi.charge.entity.Permission;
import vn.com.atomi.charge.entity.Role;
import vn.com.atomi.charge.exception.AppException;
import vn.com.atomi.charge.exception.ErrorCode;
import vn.com.atomi.charge.mapper.RoleMapper;
import vn.com.atomi.charge.repository.PermissionRepository;
import vn.com.atomi.charge.repository.RoleRepository;
import vn.com.atomi.charge.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class RoleService {
    
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UserRepository userRepository;
    private final RoleMapper roleMapper;
    
    

    @Transactional
    public AdminRoleResponse createRole(AdminCreateRoleRequest request) {
        
        if (roleRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.ROLE_ALREADY_EXISTS);
        }
        
        Role role = Role.builder() 
            .name(request.getName())
            .description(request.getDescription())
            .build();
        


        roleRepository.save(role);
        List<Long> permissionIds = request.getPermissionIds();
        if (permissionIds != null) {
            permissionIds.forEach(p_id -> {
            Permission permission = permissionRepository.findById(p_id).orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_FOUND));
            role.getPermissions().add(permission);
            });
        }

        
        return roleMapper.toAdminDto(role);

    }

    public List<AdminRoleResponse> getAll() {
        return roleRepository.findAll().stream()
                .map(roleMapper::toAdminDto)
                .toList();
    }

    public Page<AdminRoleResponse> getAllWithPagination(Pageable pageable) {
        
        Page<Role> roles = roleRepository.findAll(pageable);
        return roles.map(roleMapper::toAdminDto);
    }

    public AdminRoleResponse updateRole(Long id, AdminUpdateRoleRequest request) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        role.setName(request.getName());
        role.setDescription(request.getDescription());
        return roleMapper.toAdminDto(roleRepository.save(role));
    }

    @Transactional
    public void deleteRole(Long id) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        

        if(userRepository.existsByRoles_Id(id)){
            throw new AppException(ErrorCode.ROLE_ALREADY_IN_USE);
        }
        
        roleRepository.deleteById(id);
    }

    public void addPermission(Long roleId, Long permissionId) {
        Role role = roleRepository.findById(roleId).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        Permission permission = permissionRepository.findById(permissionId).orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_FOUND));
        if (role.getPermissions().contains(permission)) {
            throw new AppException(ErrorCode.ROLE_PERMISSION_ALREADY_EXISTS);
        }
        role.getPermissions().add(permission);
        roleRepository.save(role);
    }

    public void removePermission(Long roleId, Long permissionId) {
        
        Role role = roleRepository.findById(roleId).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        Permission permission = permissionRepository.findById(permissionId).orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_FOUND));
        if (!role.getPermissions().contains(permission)) {
            throw new AppException(ErrorCode.ROLE_PERMISSION_NOT_FOUND);
        }
        role.getPermissions().remove(permission);
        roleRepository.save(role);
    }

}
