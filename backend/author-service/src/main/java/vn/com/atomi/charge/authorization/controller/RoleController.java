package vn.com.atomi.charge.authorization.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.com.atomi.charge.authorization.model.dto.RoleDto;
import vn.com.atomi.charge.authorization.service.interfaces.RoleService;
import vn.com.atomi.charge.base.controller.BaseController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/internal/roles")
public class RoleController extends BaseController<RoleService, RoleDto, UUID> {
    
}
