package vn.com.atomi.charge.authn.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.com.atomi.charge.authn.model.enums.UserStatus;
import vn.com.atomi.charge.base.model.dto.BaseDto;
import vn.com.atomi.charge.base.util.DateUtil;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;
import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserDto extends BaseDto<UUID> {
    
    private String username;
    private String email;
    private String password;

    // Dùng redis để lưu
    private Set<String> roles;

    private UserStatus userStatus;  


    // private String organizationId;

    // private String departmentId;

    // private String positionId;

    // private String addressId;

    // private String username;

    // private String email;

    // private String phone;

    // private String fullName;

    // @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DateUtil.YMD_HMS_DASH_PATTERN)
    // private Date dateOfBirth;

    // private String gender;

    // private String profilePhotoUrl;

    // private String language;

    // private String status;

    // private Boolean noticeStatus;

    // @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DateUtil.YMD_HMS_DASH_PATTERN)
    // private LocalDateTime lastLoginAt;

    // private String contactId;

    // private String userType;

    // private String identityNumber;

    // @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DateUtil.YMD_HMS_DASH_PATTERN)
    // private LocalDateTime identityNumberExpiredAt;
}
