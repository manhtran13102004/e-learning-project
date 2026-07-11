package vn.com.atomi.charge.specification;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class GenericSpecification<T> implements Specification<T> {
    private final String key;
    private final String operator;
    private final Object value;

    public GenericSpecification(String key, String operator, Object value) {
        this.key = key;
        this.operator = operator;
        this.value = value;
    }

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        if (value == null) return null;
        
        switch (operator.toUpperCase()) {
            case "LIKE":
                return cb.like(root.get(key), "%" + value + "%");
            case "EQUAL":
                return cb.equal(root.get(key), value);
            case "GREATER_THAN":
                return cb.greaterThan(root.get(key), (Comparable) value);
            case "LESS_THAN":
                return cb.lessThan(root.get(key), (Comparable) value);
            case "GREATER_THAN_OR_EQUAL":
                return cb.greaterThanOrEqualTo(root.get(key), (Comparable) value);
            case "LESS_THAN_OR_EQUAL":
                return cb.lessThanOrEqualTo(root.get(key), (Comparable) value);
            case "IN":
                List<Object> inValues = (List<Object>) value;
                return root.get(key).in(inValues);
            case "BETWEEN":
                List<Object> betweenValues = (List<Object>) value;
                return cb.between(root.get(key), (Comparable) betweenValues.get(0), (Comparable) betweenValues.get(1));
            case "IS_NULL":
                return cb.isNull(root.get(key));
            case "IS_NOT_NULL":
                return cb.isNotNull(root.get(key));
            default:
                return null;
        }
    }
}