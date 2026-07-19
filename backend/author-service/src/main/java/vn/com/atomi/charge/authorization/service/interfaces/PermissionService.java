package vn.com.atomi.charge.authorization.service.interfaces;

import java.util.UUID;

import vn.com.atomi.charge.authorization.mapper.PermissionMapper;
import vn.com.atomi.charge.authorization.model.dto.PermissionDto;
import vn.com.atomi.charge.authorization.model.entity.PermissionEntity;
import vn.com.atomi.charge.authorization.repository.PermissionRepo;
import vn.com.atomi.charge.base.service.IBaseService;


public interface PermissionService
        extends IBaseService<PermissionRepo, PermissionDto, PermissionEntity, PermissionMapper, UUID> {

}
