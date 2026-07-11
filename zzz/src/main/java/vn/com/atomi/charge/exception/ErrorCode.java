package vn.com.atomi.charge.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    USER_NOT_FOUND(1000, "User not found",HttpStatus.BAD_REQUEST),
    USER_ALREADY_EXISTS(1001, "User already exists",HttpStatus.BAD_REQUEST),
    INVALID_KEY(500, "Invalid key", HttpStatus.BAD_REQUEST),
    WRONG_PASSWORD(2000, "Wrong password", HttpStatus.UNAUTHORIZED),
    ROLE_NOT_FOUND(2001, "Role not found", HttpStatus.BAD_REQUEST),
    COURSE_NOT_FOUND(3000, "Course not found", HttpStatus.BAD_REQUEST),
    ROLE_ALREADY_EXISTS(2002, "Role already exists", HttpStatus.BAD_REQUEST),
    USER_ROLE_ALREADY_EXISTS(1002, "User already has this role", HttpStatus.BAD_REQUEST),
    PERMISSION_NOT_FOUND(2003, "Permission not found", HttpStatus.BAD_REQUEST),
    ROLE_PERMISSION_ALREADY_EXISTS(2004, "Role permission already exists", HttpStatus.BAD_REQUEST),
    ROLE_PERMISSION_NOT_FOUND(2005, "Role permission not found", HttpStatus.BAD_REQUEST),
    FILE_NOT_FOUND(4000, "File not found", HttpStatus.BAD_REQUEST),
    UNKNOWN_ERROR(9999, "Lỗi hệ thống", HttpStatus.INTERNAL_SERVER_ERROR),
    ROLE_ALREADY_IN_USE(2006, "Role already in use", HttpStatus.BAD_REQUEST),
    ;


    private final int code;
    private final String message;
    private final HttpStatus httpStatus;


}
