package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.LessonProgress;
import vn.com.atomi.charge.entity.LessonProgressId;

public interface LessonProgressRepository extends JpaRepository<LessonProgress, LessonProgressId> {
}
