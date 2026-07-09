package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.RolePermission;
import vn.com.atomi.charge.entity.RolePermissionId;

import java.util.List;

public interface RolePermissionRepository extends JpaRepository<RolePermission, RolePermissionId> {
    
    boolean existsByRole_IdAndPermission_Id(Long roleId, Long permissionId);

    void deleteByRole_IdAndPermission_Id(Long roleId, Long permissionId);

    List<RolePermission> findByRole_Id(Long roleId);
    
}
