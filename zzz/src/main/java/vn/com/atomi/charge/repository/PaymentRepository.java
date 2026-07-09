package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
