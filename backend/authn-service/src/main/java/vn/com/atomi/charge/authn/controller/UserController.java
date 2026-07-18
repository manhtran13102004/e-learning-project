package vn.com.atomi.charge.authn.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.com.atomi.charge.authn.service.interfaces.UserService;
import vn.com.atomi.charge.base.controller.BaseController;
import vn.com.atomi.charge.authn.model.dto.UserDto;

@RestController
@RequestMapping("/api/v1/internal/credentials")
public class UserController extends BaseController<UserService, UserDto> {

}
