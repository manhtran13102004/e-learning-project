package vn.com.atomi.charge.user.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.com.atomi.charge.base.controller.BaseController;
import vn.com.atomi.charge.user.model.dto.AdminUserDto;
import vn.com.atomi.charge.user.service.interfaces.AdminUserService;

@RestController
@RequestMapping("/api/v1/admin/users")
public class AdminUserController extends BaseController<AdminUserService, AdminUserDto> {

}
