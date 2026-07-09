package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
