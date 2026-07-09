package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
}
