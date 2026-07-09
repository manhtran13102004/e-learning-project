package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.SubscriptionPlanProduct;
import vn.com.atomi.charge.entity.SubscriptionPlanProductId;

public interface SubscriptionPlanProductRepository extends JpaRepository<SubscriptionPlanProduct, SubscriptionPlanProductId> {
}
