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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.com.atomi.charge.enums.FileStatus;
import vn.com.atomi.charge.enums.FileVisibility;
import vn.com.atomi.charge.enums.StorageProvider;

// FileMetadata: id, storage_provider, file_key, file_url, original_file_name, stored_file_name,
// mime_type, extension, file_size, checksum (nullable), uploaded_by (FK User), visibility,
// status, created_at, updated_at

@Entity
@Table(name = "file_metadata")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileMetadata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "storage_provider", nullable = false, length = 30)
    private StorageProvider storageProvider;

    @Column(name = "file_key", nullable = false, length = 500)
    private String fileKey;

    @Column(name = "file_url", nullable = false, length = 500)
    private String fileUrl;

    @Column(name = "original_file_name", nullable = false, length = 255)
    private String originalFileName;

    @Column(name = "stored_file_name", nullable = false, length = 255)
    private String storedFileName;

    @Column(name = "mime_type", length = 150)
    private String mimeType;

    @Column(length = 20)
    private String extension;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(length = 255)
    private String checksum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by")
    private User uploadedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private FileVisibility visibility;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private FileStatus status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
