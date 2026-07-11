package vn.com.atomi.charge.dto.response;

import lombok.Data;  
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class AdminUserResponse extends UserResponse {
    
}
