package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
