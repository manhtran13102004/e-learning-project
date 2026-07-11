package vn.com.atomi.charge.specification;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Join;
import vn.com.atomi.charge.entity.User;

public class UserSpecification extends GenericSpecification<Object>{
    public UserSpecification(String key, String operator, Object value) {
        super(key, operator, value);
    }


    public static Specification<User> hasRolesIn(List<Long> roleIds) {
        return (root, query, criteriaBuilder) -> {
            if (roleIds == null || roleIds.isEmpty()) {
                return criteriaBuilder.conjunction(); // Tương đương với không lọc gì (1=1)
            }
            
            // Thực hiện câu lệnh JOIN động từ User sang bảng Roles trong Java
            // "roles" chính là tên trường List<Role> roles trong Entity User của bạn
            Join<Object, Object> rolesJoin = root.join("roles");
            
            // Tạo câu lệnh IN: rolesJoin.get("id") IN (:roleIds)
            return rolesJoin.get("id").in(roleIds);
        };
    }
}
