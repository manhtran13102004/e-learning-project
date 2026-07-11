package vn.com.atomi.charge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.CourseMemberRole;

public interface CourseMemberRoleRepository extends JpaRepository<CourseMemberRole, Long> {

    List<CourseMemberRole> findByCourseId(Long courseId);

    List<CourseMemberRole> findByUserId(Long userId);

    List<CourseMemberRole> findByRoleId(Long roleId);

    List<CourseMemberRole> findByCourseIdAndUserId(Long courseId, Long userId);

    List<CourseMemberRole> findByCourseIdAndRoleId(Long courseId, Long roleId);

    List<CourseMemberRole> findByUserIdAndRoleId(Long userId, Long roleId);

}
