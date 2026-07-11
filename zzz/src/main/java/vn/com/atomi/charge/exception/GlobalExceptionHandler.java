package vn.com.atomi.charge.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import vn.com.atomi.charge.dto.response.BaseResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<BaseResponse<Object>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        FieldError fieldError = e.getFieldError();
        String enumKey = fieldError != null ? fieldError.getDefaultMessage() : null;
        ErrorCode errorCode = ErrorCode.INVALID_KEY;

        try {
            if (enumKey != null) {
                errorCode = ErrorCode.valueOf(enumKey);
            }
        } catch (IllegalArgumentException e1) {
            
        }

        BaseResponse<Object> apiResponse = BaseResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();

        return ResponseEntity.status(errorCode.getHttpStatus()).body(apiResponse);
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<BaseResponse<Object>> handleAppException(AppException e) {
        BaseResponse<Object> apiResponse = BaseResponse.builder()
                .code(e.getErrorCode().getCode())
                .message(e.getErrorCode().getMessage())
                .build();
        return ResponseEntity.status(e.getErrorCode().getHttpStatus()).body(apiResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponse<Object>> handleException(Exception e) {
        BaseResponse<Object> apiResponse = BaseResponse.builder()
                .code(ErrorCode.UNKNOWN_ERROR.getCode())
                .message(ErrorCode.UNKNOWN_ERROR.getMessage())
                .build();
        return ResponseEntity.status(ErrorCode.UNKNOWN_ERROR.getHttpStatus()).body(apiResponse);
    }
}
