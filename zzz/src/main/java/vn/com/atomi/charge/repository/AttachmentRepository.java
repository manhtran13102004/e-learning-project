package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Attachment;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
}
