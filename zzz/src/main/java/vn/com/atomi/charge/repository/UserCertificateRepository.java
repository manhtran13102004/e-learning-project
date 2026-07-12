package vn.com.atomi.charge.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.UserCertificate;

public interface UserCertificateRepository extends JpaRepository<UserCertificate, Long> {

    List<UserCertificate> findByUser_Id(Long userId);

    List<UserCertificate> findByCertificate_Id(Long certificateId);

    Optional<UserCertificate> findByCertificateCode(String certificateCode);

    boolean existsByUser_IdAndCertificate_Id(Long userId, Long certificateId);
}
