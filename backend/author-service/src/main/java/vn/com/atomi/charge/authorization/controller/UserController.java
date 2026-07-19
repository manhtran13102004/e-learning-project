package vn.com.atomi.charge.authorization.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.com.atomi.charge.base.controller.BaseController;
import vn.com.atomi.charge.authorization.model.dto.UserDto;
import vn.com.atomi.charge.authorization.service.interfaces.UserService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/internal/authoizations")
public class UserController extends BaseController<UserService, UserDto, UUID> {

}
