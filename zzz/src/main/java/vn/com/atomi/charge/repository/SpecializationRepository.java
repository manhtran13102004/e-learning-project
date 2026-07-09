package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Specialization;

public interface SpecializationRepository extends JpaRepository<Specialization, Long> {
}
