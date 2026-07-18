package vn.com.atomi.charge.authorization.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.com.atomi.charge.authorization.model.dto.PermissionDto;
import vn.com.atomi.charge.authorization.service.interfaces.PermissionService;

import vn.com.atomi.charge.base.controller.BaseController;


@RestController
@RequestMapping("/api/v1/internal/permissions")
public class PermissionController extends BaseController<PermissionService, PermissionDto>{
    
}
