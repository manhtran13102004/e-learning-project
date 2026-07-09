package vn.com.atomi.charge.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long> {

    public Optional<Permission> findByName(String name);
    public boolean existsByName(String name);


}
