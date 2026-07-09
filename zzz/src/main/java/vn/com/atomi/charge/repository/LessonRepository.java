package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Lesson;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
}
