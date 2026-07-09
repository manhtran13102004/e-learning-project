package vn.com.atomi.charge.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import vn.com.atomi.charge.dto.response.AdminUserResponse;
import vn.com.atomi.charge.entity.Role;
import vn.com.atomi.charge.entity.User;
import vn.com.atomi.charge.entity.UserRole;
import vn.com.atomi.charge.exception.AppException;
import vn.com.atomi.charge.exception.ErrorCode;
import vn.com.atomi.charge.repository.RoleRepository;
import vn.com.atomi.charge.repository.UserRepository;
import vn.com.atomi.charge.repository.UserRoleRepository;

@Service //AdminUserService
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository,
                             UserRoleRepository userRoleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }

    public List<AdminUserResponse> getAll() {
        return userRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public Page<AdminUserResponse> getAllWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userRepository.findAll(pageable);
        return users.map(this::toResponse);
    }

    public AdminUserResponse addRole(Long userId, String roleName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));

        if (userRoleRepository.existsByUser_IdAndRole_Name(userId, roleName)) {
                throw new AppException(ErrorCode.USER_ROLE_ALREADY_EXISTS);
        }

        userRoleRepository.save(UserRole.builder().user(user).role(role).build());
        return toResponse(user);
    }

    public AdminUserResponse removeRole(Long userId, String roleName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));

        userRoleRepository.deleteByUser_IdAndRole_Name(userId, roleName);
        return toResponse(user);
    }

    private AdminUserResponse toResponse(User user) {
        List<String> roles = userRoleRepository.findByUser_Id(user.getId()).stream()
                .map(userRole -> userRole.getRole().getName())
                .toList();

        return AdminUserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .avatarUrl(user.getAvatarUrl())
                .roles(roles)
                .createdAt(user.getCreatedAt())
                .build();
    }

    public void delete(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
                
        userRepository.deleteById(id);
    }
}
