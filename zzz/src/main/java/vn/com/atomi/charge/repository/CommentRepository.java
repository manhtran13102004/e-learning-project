package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
