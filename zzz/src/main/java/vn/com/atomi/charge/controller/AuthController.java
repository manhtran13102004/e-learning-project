package vn.com.atomi.charge.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import vn.com.atomi.charge.dto.request.LoginRequest;
import vn.com.atomi.charge.dto.request.RegisterRequest;
import vn.com.atomi.charge.dto.response.BaseResponse;
import vn.com.atomi.charge.service.AuthService;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    private final AuthService authenticationService;

    public AuthController(AuthService authenticationService) {
        this.authenticationService = authenticationService;
    }
    @PostMapping("login")
    public ResponseEntity<BaseResponse<String>> login(@Valid @RequestBody LoginRequest request) {
        BaseResponse<String> resposne = BaseResponse.<String>builder()
            .code(200)
            .message("Login thanh cong")
            .result(authenticationService.login(request.getEmail(), request.getPassword()))
            .build();
        return ResponseEntity.ok(resposne);
    }

    @PostMapping("register")
    public ResponseEntity<BaseResponse<String>> register(@Valid @RequestBody RegisterRequest request) {
        BaseResponse<String> response = BaseResponse.<String>builder()
            .code(200)
            .message("Đăng ký thành công")
            .result(authenticationService.register(request.getEmail(), request.getPassword(), request.getFullName()))
            .build();
        return ResponseEntity.ok(response);
    }
}
