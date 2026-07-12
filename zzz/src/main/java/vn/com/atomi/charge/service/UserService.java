package vn.com.atomi.charge.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import vn.com.atomi.charge.dto.request.CreateUserRequest;
import vn.com.atomi.charge.dto.request.UpdateUserRequest;
import vn.com.atomi.charge.dto.request.AdminCreateUserRequest;
import vn.com.atomi.charge.dto.request.AdminUserSearchRequest;
import vn.com.atomi.charge.dto.response.AdminUserResponse;
import vn.com.atomi.charge.entity.FileMetadata;
import vn.com.atomi.charge.entity.Role;
import vn.com.atomi.charge.entity.User;
import vn.com.atomi.charge.exception.AppException;
import vn.com.atomi.charge.exception.ErrorCode;
import vn.com.atomi.charge.repository.FileMetadataRepository;
import vn.com.atomi.charge.repository.RoleRepository;
import vn.com.atomi.charge.repository.UserRepository;
import vn.com.atomi.charge.specification.GenericSpecification;
import org.springframework.data.jpa.domain.Specification;
import vn.com.atomi.charge.enums.UserStatus;
import vn.com.atomi.charge.mapper.UserMapper;
import vn.com.atomi.charge.specification.UserSpecification;
import vn.com.atomi.charge.dto.response.UserResponse;



@Service //AdminUserService
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileService fileService;
    private final FileMetadataRepository fileMetadataRepository;
    private final UserMapper userMapper;

    private FileMetadata resolveAvatarFile(Long avatarFileId) {
        if (avatarFileId == null) {
            return null;
        }
        return fileMetadataRepository.findById(avatarFileId)
                .orElseThrow(() -> new AppException(ErrorCode.FILE_NOT_FOUND));
    }

    public List<AdminUserResponse> getAll() {
        return userRepository.findAll().stream()
                .map(this::toAdminResponse)
                .toList();
    }

    public Page<AdminUserResponse> getAllWithPagination(Pageable pageable) {

        Page<User> users = userRepository.findAll(pageable);
        return users.map(this::toAdminResponse);
    }

    public Page<AdminUserResponse> searchForAdmin(AdminUserSearchRequest request, Pageable pageable) {
        
        Specification<User> specification = Specification.where(null);
        if (request.getKeyword() != null && !request.getKeyword().isEmpty()) {
            specification = specification.or(new GenericSpecification<>("fullName", "LIKE", request.getKeyword()));
            specification = specification.or(new GenericSpecification<>("email", "LIKE", request.getKeyword()));
        }

        if (request.getUserStatus() != null && !request.getUserStatus().isEmpty()) {
            specification = specification.and(new GenericSpecification<>("userStatus", "EQUAL", request.getUserStatus()));
        }

        if (request.getRoleIds() != null && !request.getRoleIds().isEmpty()) {
            specification = specification.and(UserSpecification.hasRolesIn(request.getRoleIds()));
        }

        if (request.getFromCreatedDate() != null) {
            specification = specification.and(new GenericSpecification<>("createdAt", "GREATER_THAN_OR_EQUAL", request.getFromCreatedDate().atStartOfDay()));
        }

        if (request.getToCreatedDate() != null) {
            specification = specification.and(new GenericSpecification<>("createdAt", "LESS_THAN_OR_EQUAL", request.getToCreatedDate().atTime(23, 59, 59)));
        }

        return userRepository.findAll(specification, pageable).map(this::toAdminResponse);
    }

    

    @Transactional
    public AdminUserResponse create(AdminCreateUserRequest request){

        if(userRepository.existsByEmail(request.getEmail()))
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);

        User user = userMapper.toEntity(request);

        userRepository.save(user);

        return toAdminResponse(user);
    }

    @Transactional
    public AdminUserResponse update(Long id, UpdateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        userMapper.updateEntityFromRequest(request, user);

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        }

        userRepository.save(user);
        return toAdminResponse(user);
    }

    public AdminUserResponse getById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return toAdminResponse(user);
    }

    public void delete(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
                
        userRepository.deleteById(id);
    }

    @Transactional
    public FileMetadata updateAvatarFile(Long userId, MultipartFile multipartFile){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        FileMetadata fileMetadata = fileService.uploadFile(multipartFile);
        user.setAvatarFile(fileMetadata);
        userRepository.save(user);
        return fileMetadata;
    }

    public void updatePassword(Long userId, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public AdminUserResponse ban(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        user.setUserStatus(UserStatus.BANNED);
        userRepository.save(user);
        return toAdminResponse(user);
    }

    public AdminUserResponse unban(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        user.setUserStatus(UserStatus.ACTIVE);
        userRepository.save(user);
        return toAdminResponse(user);
    }

    //______________________role ____________________________________________
    
    public AdminUserResponse addRole(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));

        if (user.getRoles().contains(role)) {
                throw new AppException(ErrorCode.USER_ROLE_ALREADY_EXISTS);
        }

        user.getRoles().add(role);
        userRepository.save(user);
        return toAdminResponse(user);
    }

    public AdminUserResponse removeRole(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));

        user.getRoles().remove(role);
        userRepository.save(user);
        return toAdminResponse(user);
    }

    

    //______________________HELPER____________________________

    private UserResponse toUserResponse(User user) {
        UserResponse userResponse = userMapper.toDto(user);

        if (user.getAvatarFile() != null) {
            userResponse.setAvatarUrl(user.getAvatarFile().getFileUrl());
        }

        if (user.getAvatarFile() != null) {
            userResponse.setAvatarFileId(user.getAvatarFile().getId());
        }
        return userResponse;
    }
    
    private AdminUserResponse toAdminResponse(User user) {
        AdminUserResponse userResponse = userMapper.toAdminDto(user);

        if (user.getAvatarFile() != null) {
            userResponse.setAvatarUrl(user.getAvatarFile().getFileUrl());
        }

        if (user.getAvatarFile() != null) {
            userResponse.setAvatarFileId(user.getAvatarFile().getId());
        }
        
        return userResponse;
    }

}
