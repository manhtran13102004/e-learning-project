package vn.com.atomi.charge.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vn.com.atomi.charge.dto.request.AddRoleToUserRequest;
import vn.com.atomi.charge.dto.request.DeleteRoleFromUserRequest;
import vn.com.atomi.charge.dto.response.AdminUserResponse;
import vn.com.atomi.charge.dto.response.BaseResponse;
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
    public ResponseEntity<BaseResponse<Page<AdminUserResponse>>> getAllWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<AdminUserResponse> usersPage = userService.getAllWithPagination(page, size);

        BaseResponse<Page<AdminUserResponse>> response = BaseResponse.<Page<AdminUserResponse>>builder()
                .code(200)
                .message("OK")
                .result(usersPage)
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
                .result(userService.addRole(id, request.getName()))
                .build();
        return ResponseEntity.ok(response);
    }


    @DeleteMapping("{id}/roles")
    public ResponseEntity<BaseResponse<AdminUserResponse>> deleteRole(@PathVariable Long id,
                                                                        @RequestBody DeleteRoleFromUserRequest request) {

         BaseResponse<AdminUserResponse> response = BaseResponse.<AdminUserResponse>builder()
            .code(200)
            .message("Xóa role thành công")                                                                   
            .result(userService.removeRole(id, request.getRoleName()))
            .build();
        return ResponseEntity.ok(response);
    }
    
}
