package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
}
