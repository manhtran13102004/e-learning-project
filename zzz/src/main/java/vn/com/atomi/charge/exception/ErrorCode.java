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

    // ---- Validation error codes (input validation on request DTOs) ----
    EMAIL_REQUIRED(5000, "Email không được để trống", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(5001, "Email không đúng định dạng", HttpStatus.BAD_REQUEST),
    PASSWORD_REQUIRED(5002, "Mật khẩu không được để trống", HttpStatus.BAD_REQUEST),
    PASSWORD_TOO_SHORT(5003, "Mật khẩu tối thiểu 6 ký tự", HttpStatus.BAD_REQUEST),
    FULL_NAME_REQUIRED(5004, "Họ tên không được để trống", HttpStatus.BAD_REQUEST),
    FULL_NAME_TOO_LONG(5005, "Họ tên tối đa 150 ký tự", HttpStatus.BAD_REQUEST),
    BIO_TOO_LONG(5006, "Bio tối đa 1000 ký tự", HttpStatus.BAD_REQUEST),
    ROLE_REQUIRED(5007, "Vui lòng chọn ít nhất 1 role", HttpStatus.BAD_REQUEST),
    ROLE_ID_REQUIRED(5008, "Role ID không được để trống", HttpStatus.BAD_REQUEST),
    ROLE_NAME_REQUIRED(5009, "Tên role không được để trống", HttpStatus.BAD_REQUEST),
    ROLE_NAME_TOO_LONG(5010, "Tên role tối đa 50 ký tự", HttpStatus.BAD_REQUEST),
    ROLE_DESCRIPTION_TOO_LONG(5011, "Mô tả role tối đa 255 ký tự", HttpStatus.BAD_REQUEST),
    PERMISSION_NAME_REQUIRED(5012, "Tên permission không được để trống", HttpStatus.BAD_REQUEST),
    PERMISSION_NAME_TOO_LONG(5013, "Tên permission tối đa 50 ký tự", HttpStatus.BAD_REQUEST),
    PERMISSION_DESCRIPTION_TOO_LONG(5014, "Mô tả permission tối đa 255 ký tự", HttpStatus.BAD_REQUEST),
    COURSE_NAME_REQUIRED(5015, "Tên khóa học không được để trống", HttpStatus.BAD_REQUEST),
    COURSE_NAME_TOO_LONG(5016, "Tên khóa học tối đa 255 ký tự", HttpStatus.BAD_REQUEST),
    COURSE_SHORT_DESCRIPTION_TOO_LONG(5017, "Mô tả ngắn tối đa 500 ký tự", HttpStatus.BAD_REQUEST),
    COURSE_DESCRIPTION_TOO_LONG(5018, "Mô tả tối đa 2000 ký tự", HttpStatus.BAD_REQUEST),
    COURSE_SLUG_REQUIRED(5019, "Slug không được để trống", HttpStatus.BAD_REQUEST),
    COURSE_SLUG_TOO_LONG(5020, "Slug tối đa 255 ký tự", HttpStatus.BAD_REQUEST),
    COURSE_PRICE_REQUIRED(5021, "Giá khóa học không được để trống", HttpStatus.BAD_REQUEST),
    COURSE_PRICE_INVALID(5022, "Giá khóa học không được âm", HttpStatus.BAD_REQUEST),
    COURSE_CURRENCY_TOO_LONG(5023, "Đơn vị tiền tệ tối đa 10 ký tự", HttpStatus.BAD_REQUEST),
    COURSE_LEVEL_REQUIRED(5024, "Level khóa học không được để trống", HttpStatus.BAD_REQUEST),
    COURSE_CONTENT_STATUS_REQUIRED(5025, "Trạng thái nội dung không được để trống", HttpStatus.BAD_REQUEST),
    COURSE_DURATION_UNIT_REQUIRED(5026, "Đơn vị thời lượng không được để trống", HttpStatus.BAD_REQUEST),
    COURSE_DURATION_VALUE_INVALID(5027, "Giá trị thời lượng phải lớn hơn 0", HttpStatus.BAD_REQUEST),
    COURSE_SKU_TOO_LONG(5028, "SKU tối đa 50 ký tự", HttpStatus.BAD_REQUEST),
    PRICE_FILTER_INVALID(5029, "Giá lọc phải lớn hơn 0", HttpStatus.BAD_REQUEST),
    SKU_FILTER_TOO_LONG(5030, "SKU lọc tối đa 50 ký tự", HttpStatus.BAD_REQUEST),
    ;


    private final int code;
    private final String message;
    private final HttpStatus httpStatus;


}
