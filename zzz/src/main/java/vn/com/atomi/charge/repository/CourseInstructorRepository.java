package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.CourseInstructor;
import vn.com.atomi.charge.entity.CourseInstructorId;

public interface CourseInstructorRepository extends JpaRepository<CourseInstructor, CourseInstructorId> {
}
