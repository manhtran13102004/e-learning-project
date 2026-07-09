package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
}
