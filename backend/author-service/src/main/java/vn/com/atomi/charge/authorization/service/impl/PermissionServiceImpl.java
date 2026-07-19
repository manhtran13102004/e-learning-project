package vn.com.atomi.charge.authorization.service.impl;

import org.springframework.stereotype.Service;

import vn.com.atomi.charge.authorization.mapper.PermissionMapper;
import vn.com.atomi.charge.authorization.model.dto.PermissionDto;
import vn.com.atomi.charge.authorization.model.entity.PermissionEntity;
import vn.com.atomi.charge.authorization.repository.PermissionRepo;
import vn.com.atomi.charge.authorization.service.interfaces.PermissionService;
import vn.com.atomi.charge.base.service.BaseService;

import java.util.UUID;


@Service
public class PermissionServiceImpl extends BaseService<PermissionRepo, PermissionDto, PermissionEntity, PermissionMapper, UUID> implements PermissionService{
    
}
