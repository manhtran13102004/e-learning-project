package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.ThreadVote;
import vn.com.atomi.charge.entity.ThreadVoteId;

public interface ThreadVoteRepository extends JpaRepository<ThreadVote, ThreadVoteId> {
}
