package vn.com.atomi.charge.user.model.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.com.atomi.charge.base.model.dto.BaseDto;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserDto extends BaseDto<UUID> {

    private String fullName;

    private String bio;
}
