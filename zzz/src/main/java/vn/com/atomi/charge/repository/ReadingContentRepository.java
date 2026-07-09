package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.ReadingContent;

public interface ReadingContentRepository extends JpaRepository<ReadingContent, Long> {
}
