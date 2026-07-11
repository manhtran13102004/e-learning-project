package vn.com.atomi.charge.dto.request;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserSearchRequest {
    private String keyword;    // Tìm theo tên hoặc email
    private String userStatus;     // Lọc theo trạng thái ACTIVE/INACTIVE
    private List<Long> roleIds;    // Lọc theo quyền
    private LocalDate fromCreatedDate;
    private LocalDate toCreatedDate;

    // Getter, Setter hoặc @Data của Lombok
}