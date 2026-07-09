package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Refund;

public interface RefundRepository extends JpaRepository<Refund, Long> {
}
