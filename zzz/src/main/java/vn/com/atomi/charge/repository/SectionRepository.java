package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Section;

public interface SectionRepository extends JpaRepository<Section, Long> {
}
