package vn.com.atomi.charge.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Video_Resume: user_id, video_content_id, current_time_seconds, last_watched_at
// Composite PK (user_id, video_content_id)

@Entity
@Table(name = "video_resumes")
@IdClass(VideoResumeId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VideoResume {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_content_id")
    private VideoContent videoContent;

    @Column(name = "current_time_seconds")
    private Integer currentTimeSeconds;

    @Column(name = "last_watched_at")
    private LocalDateTime lastWatchedAt;
}
