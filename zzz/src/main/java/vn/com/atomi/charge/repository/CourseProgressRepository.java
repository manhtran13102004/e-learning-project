package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.CourseProgress;
import vn.com.atomi.charge.entity.CourseProgressId;

public interface CourseProgressRepository extends JpaRepository<CourseProgress, CourseProgressId> {
}
