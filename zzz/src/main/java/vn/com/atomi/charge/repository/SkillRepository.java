package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
}
