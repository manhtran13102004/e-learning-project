package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Thread;

public interface ThreadRepository extends JpaRepository<Thread, Long> {
}
