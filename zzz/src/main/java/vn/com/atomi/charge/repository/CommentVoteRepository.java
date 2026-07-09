package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.CommentVote;
import vn.com.atomi.charge.entity.CommentVoteId;

public interface CommentVoteRepository extends JpaRepository<CommentVote, CommentVoteId> {
}
