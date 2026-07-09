package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
