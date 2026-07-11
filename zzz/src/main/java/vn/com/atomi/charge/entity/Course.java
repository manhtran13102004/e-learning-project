package vn.com.atomi.charge.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import vn.com.atomi.charge.enums.ContentStatus;
import vn.com.atomi.charge.enums.DurationUnit;
import vn.com.atomi.charge.enums.Level;

// Course (Khóa học):
// product_id (PK, FK), specialization_id (FK, null nếu là khóa học đơn lẻ), level,
// status (Draft/Published/Archived), estimated_duration_unit, estimated_duration_value,
// certificate_enabled
//
// Lưu ý: field Java đặt tên "contentStatus" (thay vì "status") để tránh đụng tên với
// Product.status (ActiveStatus) đã có sẵn qua kế thừa - cột DB vẫn là "status".

@Entity
@Table(name = "courses")
@DiscriminatorValue("COURSE")
@PrimaryKeyJoinColumn(name = "product_id")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Course extends Product {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specialization_id")
    private Specialization specialization;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Level level;

    @Enumerated(EnumType.STRING)
    @Column(name = "content_status", nullable = false, length = 30)
    private ContentStatus contentStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "estimated_duration_unit", nullable = false, length = 30)
    private DurationUnit estimatedDurationUnit;

    @Column(name = "estimated_duration_value")
    private Integer estimatedDurationValue;

    @Column(name = "certificate_enabled")
    private Boolean certificateEnabled;
}
