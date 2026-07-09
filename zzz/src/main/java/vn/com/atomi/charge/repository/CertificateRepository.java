package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Certificate;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {
}
