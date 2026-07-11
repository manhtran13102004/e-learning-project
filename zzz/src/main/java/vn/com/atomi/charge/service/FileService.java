package vn.com.atomi.charge.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.SetBucketPolicyArgs;
import jakarta.annotation.PostConstruct;
import vn.com.atomi.charge.dto.response.FileMetadataResponse;
import vn.com.atomi.charge.entity.FileMetadata;
import vn.com.atomi.charge.repository.FileMetadataRepository;
import vn.com.atomi.charge.exception.AppException;
import vn.com.atomi.charge.exception.ErrorCode;
import vn.com.atomi.charge.enums.FileVisibility;
import vn.com.atomi.charge.enums.FileStatus;
import vn.com.atomi.charge.enums.StorageProvider;

@Service
public class FileService {

    private final MinioClient minioClient;

    @Value("${atomi-learn-storage.minio.bucketName}")
    private String bucketName;
    private StorageProvider storageProvider;

    private final FileMetadataRepository fileMetadataRepository;

    // Tiêm Bean MinioClient đã đúc ở bước trước vào đây
    public FileService(MinioClient minioClient, FileMetadataRepository fileMetadataRepository) {
        this.minioClient = minioClient;
        this.fileMetadataRepository = fileMetadataRepository;
        this.storageProvider = StorageProvider.MINIO;
    }


    @PostConstruct
    public void initBucket() {
        try {
            boolean exists = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
            if (!exists) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
            }

            // Cho phép đọc file công khai (anonymous GET) để <img src="..."> ở FE tải được trực tiếp
            String publicReadPolicy = """
                    {
                      "Version": "2012-10-17",
                      "Statement": [
                        {
                          "Effect": "Allow",
                          "Principal": {"AWS": ["*"]},
                          "Action": ["s3:GetObject"],
                          "Resource": ["arn:aws:s3:::%s/*"]
                        }
                      ]
                    }
                    """.formatted(bucketName);

            minioClient.setBucketPolicy(
                    SetBucketPolicyArgs.builder().bucket(bucketName).config(publicReadPolicy).build());
        } catch (Exception e) {
            throw new RuntimeException("Không thể khởi tạo bucket MinIO: " + e.getMessage(), e);
        }
    }

    public FileMetadata uploadFile(MultipartFile file) {
        
        try {

            // 1. Tạo một cái tên file ngẫu nhiên (UUID) để không bao giờ bị trùng đè file cũ
            String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
            String fileName = UUID.randomUUID().toString() + extension;

            // 2. Đẩy file lên "Thùng chứa" MinIO
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(fileName) // Tên file trên hệ thống MinIO
                            .stream(file.getInputStream(), file.getSize(), -1)
                            .contentType(file.getContentType()) // Định dạng file (png, jpg, pdf...)
                            .build()
            );

            FileMetadata fileMetadata = FileMetadata.builder()
                .storageProvider(storageProvider)
                .fileKey(fileName)
                .fileUrl("http://localhost:9000/" + bucketName + "/" + fileName)
                .originalFileName(file.getOriginalFilename())
                .storedFileName(fileName)
                .mimeType(file.getContentType())
                .extension(extension)
                .fileSize(file.getSize())
                .visibility(FileVisibility.PUBLIC)
                .status(FileStatus.ACTIVE)
                .build();

            // 2.5. Lưu metadata của file vào cơ sở dữ liệu
            fileMetadataRepository.save(fileMetadata);

            // 3. Trả về tên file đã lưu thành công để lưu vào DB ở các bài sau
            return fileMetadata;

        } catch (Exception e) {
            throw new RuntimeException("Lỗi upload file lên hệ thống lưu trữ: " + e.getMessage());
        }
    }

    public FileMetadata getFileMetadata(String storedFileName) {

        return fileMetadataRepository.findByStoredFileName(storedFileName).orElseThrow(() -> new AppException(ErrorCode.FILE_NOT_FOUND));

    }

    public FileMetadataResponse toResponse(FileMetadata fileMetadata) {
        return FileMetadataResponse.builder()
                .id(fileMetadata.getId())
                .fileUrl(fileMetadata.getFileUrl())
                .originalFileName(fileMetadata.getOriginalFileName())
                .mimeType(fileMetadata.getMimeType())
                .fileSize(fileMetadata.getFileSize())
                .createdAt(fileMetadata.getCreatedAt())
                .build();
    }
}