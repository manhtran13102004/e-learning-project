package vn.com.atomi.charge.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Video_Content (Chi tiết bài học Video): lesson_id (PK, FK - quan hệ 1-1 chia sẻ PK với
// Lesson), video_file_id (FK), duration_seconds, subtitle_file_id (FK), thumbnail_file_id (FK),
// created_at, updated_at

@Entity
@Table(name = "video_contents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VideoContent {

    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_file_id", nullable = false)
    private FileMetadata videoFile;

    @Column(name = "duration_seconds")
    private Integer durationSeconds;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subtitle_file_id")
    private FileMetadata subtitleFile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "thumbnail_file_id")
    private FileMetadata thumbnailFile;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
