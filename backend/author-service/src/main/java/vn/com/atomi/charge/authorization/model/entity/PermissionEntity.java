package vn.com.atomi.charge.authorization.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.com.atomi.charge.base.model.entity.BaseEntity;

@Entity
@Table(name = "permissions")
@Data
@EqualsAndHashCode(callSuper = true)
public class PermissionEntity extends BaseEntity {
    private String name;
    private String description;
}
