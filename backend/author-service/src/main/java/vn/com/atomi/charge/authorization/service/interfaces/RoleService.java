package vn.com.atomi.charge.authorization.service.interfaces;

import vn.com.atomi.charge.authorization.mapper.RoleMapper;
import vn.com.atomi.charge.authorization.model.dto.RoleDto;
import vn.com.atomi.charge.authorization.model.entity.RoleEntity;
import vn.com.atomi.charge.authorization.repository.RoleRepo;
import vn.com.atomi.charge.base.service.IBaseService;

public interface RoleService extends IBaseService<RoleRepo, RoleDto, RoleEntity, RoleMapper> {

}
