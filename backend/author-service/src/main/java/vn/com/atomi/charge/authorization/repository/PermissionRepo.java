package vn.com.atomi.charge.authorization.repository;

import java.util.UUID;

import org.springframework.stereotype.Repository;

import vn.com.atomi.charge.authorization.model.entity.PermissionEntity;
import vn.com.atomi.charge.base.repository.BaseRepository;

@Repository
public interface PermissionRepo extends BaseRepository<PermissionEntity, UUID> {

}
