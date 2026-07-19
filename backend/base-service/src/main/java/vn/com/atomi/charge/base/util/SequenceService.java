package vn.com.atomi.charge.base.util;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(name = "atomi.sequence.enabled", havingValue = "true")
public class SequenceService {
    @PersistenceContext
    private EntityManager em;

    public Long getNextSequence(String schemaName, String sequenceName) {
        String sql = String.format("SELECT %s.%s.NEXTVAL FROM dual", schemaName, sequenceName);
        return ((Number) em
                .createNativeQuery(sql)
                .getSingleResult()).longValue();
    }

    public Long getNextSequence(String sequenceName) {
        String sql = "SELECT " + sequenceName + ".NEXTVAL FROM dual";
        return ((Number) em
                .createNativeQuery(sql)
                .getSingleResult()).longValue();
    }
}
