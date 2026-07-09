package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.CouponProduct;
import vn.com.atomi.charge.entity.CouponProductId;

public interface CouponProductRepository extends JpaRepository<CouponProduct, CouponProductId> {
}
