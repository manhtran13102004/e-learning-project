package vn.com.atomi.charge.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.com.atomi.charge.enums.CertificateStatus;

// UserCertificate (chứng chỉ đã cấp cho 1 user): id, user_id (FK), certificate_id (FK),
// certificate_code (unique), pdf_file_id (FK), status (Valid/Revoked), issued_at,
// revoked_at (nullable), revoked_reason (nullable), created_at, updated_at
// UNIQUE(user_id, certificate_id)

@Entity
@Table(name = "user_certificates", uniqueConstraints = @UniqueConstraint(columnNames = { "user_id", "certificate_id" }))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCertificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "certificate_id", nullable = false)
    private Certificate certificate;

    @Column(name = "certificate_code", nullable = false, unique = true, length = 100)
    private String certificateCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pdf_file_id")
    private FileMetadata pdfFile;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private CertificateStatus status;

    @Column(name = "issued_at")
    private LocalDateTime issuedAt;

    @Column(name = "revoked_at")
    private LocalDateTime revokedAt;

    @Column(name = "revoked_reason", length = 500)
    private String revokedReason;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
