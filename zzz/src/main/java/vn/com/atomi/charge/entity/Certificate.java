package vn.com.atomi.charge.entity;

import java.time.LocalDateTime;

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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.com.atomi.charge.enums.CertificateStatus;

// Certificate (Chứng chỉ): id, user_id, product_id, verification_url, certificate_code,
// pdf_file_id (FK), status (Valid/Revoked), issued_at

@Entity
@Table(name = "certificates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "verification_url", length = 500)
    private String verificationUrl;

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
}
