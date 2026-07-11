package vn.com.atomi.charge.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import vn.com.atomi.charge.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import vn.com.atomi.charge.enums.ActiveStatus;
import vn.com.atomi.charge.enums.ProductType;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductResponse {
    
    private Long id;
    private ProductType type;
    private String name;
    private String shortDescription;
    private String description;
    private String slug;
    private String sku;
    private BigDecimal price;
    private String currency;
    private Long thumbnailFileId;
    private String thumbnailFileUrl;
    private Double averageRating;
    private Integer ratingCount;
    private ActiveStatus status;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private User createdBy;
}
