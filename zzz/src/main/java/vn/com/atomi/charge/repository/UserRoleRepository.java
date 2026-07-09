package vn.com.atomi.charge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import vn.com.atomi.charge.entity.UserRole;
import vn.com.atomi.charge.entity.UserRoleId;

public interface UserRoleRepository extends JpaRepository<UserRole, UserRoleId> {

    List<UserRole> findByUser_Id(Long userId);

    @Transactional
    void deleteByUser_IdAndRole_Name(Long userId, String roleName);

    boolean existsByUser_IdAndRole_Name(Long userId, String roleName);
}
