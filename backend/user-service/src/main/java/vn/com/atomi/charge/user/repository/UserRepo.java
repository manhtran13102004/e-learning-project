package vn.com.atomi.charge.user.repository;

import java.util.UUID;

import vn.com.atomi.charge.base.repository.BaseRepository;
import vn.com.atomi.charge.user.model.entity.UserEntity;

public interface UserRepo extends BaseRepository<UserEntity, UUID> {
}
