package vn.com.atomi.charge.authn.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.com.atomi.charge.authn.model.enums.UserStatus;
import vn.com.atomi.charge.base.model.entity.BaseEntity;

@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(callSuper = true)
public class UserEntity extends BaseEntity {

    private String username;
    private String email;
    private String password;
    private UserStatus userStatus;
    
}
