package vn.com.atomi.charge.user.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.com.atomi.charge.user.service.interfaces.UserService;
import vn.com.atomi.charge.base.controller.BaseController;
import vn.com.atomi.charge.user.model.dto.UserDto;

@RestController
@RequestMapping("/api/v1/internal/profiles")
public class UserController extends BaseController<UserService, UserDto> {

}
