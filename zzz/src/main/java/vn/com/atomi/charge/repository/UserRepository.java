package vn.com.atomi.charge.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.com.atomi.charge.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
