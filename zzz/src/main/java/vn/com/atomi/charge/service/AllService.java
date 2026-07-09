package vn.com.atomi.charge.service;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCrypt;

import vn.com.atomi.charge.entity.User;
import vn.com.atomi.charge.exception.ErrorCode;
import vn.com.atomi.charge.repository.UserRepository;
import org.springframework.stereotype.Service;
import vn.com.atomi.charge.exception.AppException;

@Service
public class AllService {
    
    private final UserRepository userRepository;

    public AllService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String login(String email, String password) {

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        User userEntity = user.get();
        if (!BCrypt.checkpw(password, userEntity.getPasswordHash())) {
            throw new AppException(ErrorCode.WRONG_PASSWORD);
        }

        return "Login thanh cong";
    }


    public String register(String email, String password, String fullName)
    {
        String passwordHash = BCrypt.hashpw(password, BCrypt.gensalt());
        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordHash);
        user.setFullName(fullName);
        userRepository.save(user);
        return "register thanh cong";
    }


    //helper
    
    
    
}
