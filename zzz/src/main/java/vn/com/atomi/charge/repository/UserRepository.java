package vn.com.atomi.charge.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import vn.com.atomi.charge.entity.User;
import org.springframework.data.domain.Pageable;

public interface UserRepository extends JpaRepository<User, Long> , JpaSpecificationExecutor<User> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByRoles_Id(Long roleId);


    @Query("SELECT DISTINCT u FROM User u JOIN u.roles r WHERE r.id IN :roleIds")
    Page<User> findByRoleIdIn(@Param("roleIds") List<Long> roleIds, Pageable pageable);

    @Query("SELECT DISTINCT u FROM User u JOIN u.roles r WHERE r.id = :roleId")
    Page<User> findByRoleId(@Param("roleId") Long roleId, Pageable pageable);


    
}
