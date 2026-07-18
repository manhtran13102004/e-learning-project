package vn.com.atomi.charge.user.model.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.com.atomi.charge.base.model.entity.BaseEntity;

@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(callSuper = true)
public class UserEntity extends BaseEntity {
    private String fullName;

    @Size(max = 1000, message = "Bio tối đa 1000 ký tự")
    @Column(length = 1000)
    private String bio;
}
