package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
