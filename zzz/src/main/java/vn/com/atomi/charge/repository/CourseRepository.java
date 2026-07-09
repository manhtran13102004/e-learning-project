package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
