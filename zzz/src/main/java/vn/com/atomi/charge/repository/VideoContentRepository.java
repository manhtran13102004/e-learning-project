package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.VideoContent;

public interface VideoContentRepository extends JpaRepository<VideoContent, Long> {
}
