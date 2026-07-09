package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.UserPermission;
import vn.com.atomi.charge.entity.UserPermissionId;

public interface UserPermissionRepository extends JpaRepository<UserPermission, UserPermissionId> {
}
