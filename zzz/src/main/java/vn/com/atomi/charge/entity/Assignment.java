package vn.com.atomi.charge.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
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
import vn.com.atomi.charge.enums.DraftPublishedStatus;

// Assignment: id, lesson_id, description, instruction, max_score, allow_late_submission,
// deadline, max_file_size_mb, allowed_file_types (vd: ["pdf","zip","docx"]), status, created_at, updated_at

@Entity
@Table(name = "assignments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @Column(length = 1000)
    private String description;

    @Column(columnDefinition = "TEXT")
    private String instruction;

    @Column(name = "max_score")
    private Integer maxScore;

    @Column(name = "allow_late_submission")
    private Boolean allowLateSubmission;

    @Column
    private LocalDateTime deadline;

    @Column(name = "max_file_size_mb")
    private Integer maxFileSizeMb;

    @ElementCollection
    @Column(name = "file_type")
    private List<String> allowedFileTypes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private DraftPublishedStatus status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
