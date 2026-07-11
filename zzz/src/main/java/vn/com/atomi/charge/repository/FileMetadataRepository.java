package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.FileMetadata;

import java.util.Optional;

public interface FileMetadataRepository extends JpaRepository<FileMetadata, Long> {
    // Các phương thức truy vấn tùy chỉnh có thể được định nghĩa ở đây nếu cần
    Optional<FileMetadata> findByStoredFileName(String fileName);

}

