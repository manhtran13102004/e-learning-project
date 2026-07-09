package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
}
