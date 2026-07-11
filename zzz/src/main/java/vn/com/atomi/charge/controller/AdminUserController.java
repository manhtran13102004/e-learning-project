package vn.com.atomi.charge.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import vn.com.atomi.charge.dto.request.AddRoleToUserRequest;
import vn.com.atomi.charge.dto.request.CreateUserRequest;
import vn.com.atomi.charge.dto.request.DeleteRoleFromUserRequest;
import vn.com.atomi.charge.dto.request.UpdateUserRequest;
import vn.com.atomi.charge.dto.request.UserSearchRequest;
import vn.com.atomi.charge.dto.response.AdminUserResponse;
import vn.com.atomi.charge.dto.response.BaseResponse;
import vn.com.atomi.charge.entity.Role;
import vn.com.atomi.charge.service.UserService;



@RestController
@RequestMapping("api/admin/users")
public class AdminUserController {

    private final UserService userService;

    public AdminUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<BaseResponse<List<AdminUserResponse>>> getAll() {
        BaseResponse<List<AdminUserResponse>> response = BaseResponse.<List<AdminUserResponse>>builder()
                .code(200)
                .message("OK")
                .result(userService.getAll())
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/page")
    public ResponseEntity<BaseResponse<Page<AdminUserResponse>>> getAllWithPagination(Pageable pageable) {
        // Spring tự bóc tách page, size, sort trên URL truyền vào pageable
        Page<AdminUserResponse> usersPage = userService.getAllWithPagination(pageable);

        return ResponseEntity.ok(BaseResponse.<Page<AdminUserResponse>>builder()
                .code(200)
                .message("OK")
                .result(usersPage)
                .build());
    }

    @GetMapping("/search")
    public ResponseEntity<BaseResponse<Page<AdminUserResponse>>> search(
        @ModelAttribute UserSearchRequest request,
        Pageable pageable
    ){
        Page<AdminUserResponse> usersPage = userService.search(request, pageable);
        BaseResponse<Page<AdminUserResponse>> response = BaseResponse.<Page<AdminUserResponse>>builder()
                .code(200)
                .message("OK")
                .result(usersPage)
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("{id}/ban")
    public ResponseEntity<BaseResponse<AdminUserResponse>> banUser(@PathVariable Long id) {
        AdminUserResponse userResponse = userService.ban(id);
        return ResponseEntity.ok(BaseResponse.<AdminUserResponse>builder()
                .code(200)
                .message("Khóa tài khoản thành công")
                .result(userResponse)
                .build());
    }

    @PutMapping("{id}/unban")
    public ResponseEntity<BaseResponse<AdminUserResponse>> unbanUser(@PathVariable Long id) {
        AdminUserResponse userResponse = userService.unban(id);
        return ResponseEntity.ok(BaseResponse.<AdminUserResponse>builder()
                .code(200)
                .message("Mở khóa tài khoản thành công")
                .result(userResponse)
                .build());
    }
    
    
    @PostMapping
    public ResponseEntity<BaseResponse<AdminUserResponse>>createUser(@Valid @RequestBody CreateUserRequest request){

        if (request.getRoles() == null || request.getRoles().isEmpty()) {
            request.setRoles(List.of(Role.builder().name("LEARNER").build()));
        }
        AdminUserResponse userResponse = userService.create(request);
        BaseResponse<AdminUserResponse> response = BaseResponse.<AdminUserResponse>builder()
                .code(201)
                .message("Tạo tài khoản thành công")
                .result(userResponse)
                .build();
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("{id}")
    public ResponseEntity<BaseResponse<AdminUserResponse>> getById(@PathVariable Long id){

        AdminUserResponse userResponse = userService.getById(id);

        BaseResponse<AdminUserResponse> response = BaseResponse.<AdminUserResponse>builder()
                .code(200)
                .message("OK")
                .result(userResponse)
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("{id}")
    public ResponseEntity<BaseResponse<AdminUserResponse>> updateUser(@PathVariable Long id,
                                                                        @Valid @RequestBody UpdateUserRequest request){

        AdminUserResponse userResponse = userService.update(id, request);
        BaseResponse<AdminUserResponse> response = BaseResponse.<AdminUserResponse>builder()
                .code(200)
                .message("Cập nhật người dùng thành công")
                .result(userResponse)
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<BaseResponse<AdminUserResponse>> deleteUser(@PathVariable Long id){

        userService.delete(id);

        BaseResponse<AdminUserResponse> response = BaseResponse.<AdminUserResponse>builder()
                .code(200)
                .message("Xóa thành công")
                .build();
        return ResponseEntity.ok(response);
    }

    //---------------------------------ROLE-------------------------------------------------------

    @PostMapping("{id}/roles")
    public ResponseEntity<BaseResponse<AdminUserResponse>> addRole(@PathVariable Long id,
                                                                       @RequestBody AddRoleToUserRequest request) {
        BaseResponse<AdminUserResponse> response = BaseResponse.<AdminUserResponse>builder()
                .code(200)
                .message("Cập nhật role thành công")
                .result(userService.addRole(id, request.getRoleId()))
                .build();
        return ResponseEntity.ok(response);
    }


    @DeleteMapping("{id}/roles")
    public ResponseEntity<BaseResponse<AdminUserResponse>> deleteRole(@PathVariable Long id,
                                                                        @RequestBody DeleteRoleFromUserRequest request) {

         BaseResponse<AdminUserResponse> response = BaseResponse.<AdminUserResponse>builder()
            .code(200)
            .message("Xóa role thành công")                                                                   
            .result(userService.removeRole(id, request.getRoleId()))
            .build();
        return ResponseEntity.ok(response);
    }
    
}
