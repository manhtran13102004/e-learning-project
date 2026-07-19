package vn.com.atomi.charge.authorization.service.impl;

import org.springframework.stereotype.Service;

import vn.com.atomi.charge.authorization.mapper.RoleMapper;
import vn.com.atomi.charge.authorization.model.dto.RoleDto;
import vn.com.atomi.charge.authorization.model.entity.RoleEntity;
import vn.com.atomi.charge.authorization.repository.RoleRepo;
import vn.com.atomi.charge.authorization.service.interfaces.RoleService;
import vn.com.atomi.charge.base.service.BaseService;

import java.util.UUID;


@Service
public class RoleServiceImpl extends BaseService<RoleRepo, RoleDto, RoleEntity, RoleMapper, UUID> implements RoleService {

}
