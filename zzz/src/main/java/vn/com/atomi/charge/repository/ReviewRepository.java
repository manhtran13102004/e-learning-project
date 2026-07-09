package vn.com.atomi.charge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.atomi.charge.entity.Review;
import vn.com.atomi.charge.entity.ReviewId;

public interface ReviewRepository extends JpaRepository<Review, ReviewId> {
}
