package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.CourseSkill;
import vn.com.atomi.charge.entity.CourseSkillId;

public interface CourseSkillRepository extends JpaRepository<CourseSkill, CourseSkillId> {
}
