package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.SubmissionFile;

public interface SubmissionFileRepository extends JpaRepository<SubmissionFile, Long> {
}
