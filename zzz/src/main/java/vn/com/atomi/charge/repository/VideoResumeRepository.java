package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.VideoResumeId;
import vn.com.atomi.charge.entity.VideoResume;

public interface VideoResumeRepository extends JpaRepository<VideoResume, VideoResumeId> {
}
