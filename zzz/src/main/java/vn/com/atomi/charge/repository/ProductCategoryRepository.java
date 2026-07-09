package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.ProductCategory;
import vn.com.atomi.charge.entity.ProductCategoryId;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, ProductCategoryId> {
}
