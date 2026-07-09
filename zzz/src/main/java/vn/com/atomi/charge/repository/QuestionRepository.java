package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
