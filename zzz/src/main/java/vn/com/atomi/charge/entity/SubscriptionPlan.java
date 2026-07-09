package vn.com.atomi.charge.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import vn.com.atomi.charge.enums.DurationUnit;
import vn.com.atomi.charge.enums.SubscriptionPlanType;

// SubscriptionPlan:
// product_id (PK, FK), type (Monthly/Yearly), duration_value, duration_unit,
// status (Active/Inactive - dùng lại Product.status kế thừa, không khai báo lại)
//
// Lưu ý: cột "type" (Monthly/Yearly) đổi tên DB thành "plan_type" vì Hibernate không cho phép
// một cột tên "type" trùng với discriminator column "type" của Product trong cùng persistent
// class model của JOINED inheritance (dù ở 2 bảng khác nhau).

@Entity
@Table(name = "subscription_plans")
@DiscriminatorValue("SUBSCRIPTION")
@PrimaryKeyJoinColumn(name = "product_id")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class SubscriptionPlan extends Product {

    @Enumerated(EnumType.STRING)
    @Column(name = "plan_type", nullable = false, length = 30)
    private SubscriptionPlanType planType;

    @Column(name = "duration_value", nullable = false)
    private Integer durationValue;

    @Enumerated(EnumType.STRING)
    @Column(name = "duration_unit", nullable = false, length = 30)
    private DurationUnit durationUnit;
}
