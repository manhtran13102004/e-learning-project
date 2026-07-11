package vn.com.atomi.charge.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import vn.com.atomi.charge.enums.ActiveStatus;
import java.util.Set;
// Product:
// id, type (COURSE|SPECIALIZATION|SUBSCRIPTION) là discriminator -> Course/Specialization/SubscriptionPlan
// kế thừa bảng này (JOINED inheritance), name, short_description, description, slug, price,
// thumbnail_file_id (FK nullable), currency, average_rating, rating_count, status, created_at,
// updated_at, created_by, published_at

@Entity
@Table(name = "products")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING, length = 30)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(name = "short_description", length = 500)
    private String shortDescription;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false, unique = true, length = 255)
    private String slug;

    @Column(name = "sku", unique = true, length = 50)
    private String sku;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "thumbnail_file_id")
    private FileMetadata thumbnailFile;

    @Column(length = 10)
    private String currency;

    @Column(name = "average_rating")
    private Double averageRating;

    @Column(name = "rating_count")
    private Integer ratingCount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ActiveStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @ManyToMany(mappedBy = "products") // Trỏ đúng tên field bên lớp Coupon
    private Set<Coupon> coupons = new HashSet<>();
}
