package vn.com.atomi.charge.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import jakarta.persistence.*;
import lombok.*;
import vn.com.atomi.charge.enums.ActiveStatus;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @Column(length = 1000)
    private String description;

    // Liên kết One-to-Many để lấy nhanh các danh mục con trực thuộc (Dùng Set để tối ưu)
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Category> children = new HashSet<>();

    // Danh sách sản phẩm thuộc danh mục này
    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Product> products = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ActiveStatus status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent; // Đệ quy để tạo cây danh mục cha - con
}
