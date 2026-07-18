package vn.com.atomi.charge.authn.controller;

public class AuthController {
    
}
// POST/api/v1/auth/registerĐăng ký tài khoản mớiTạo mới user dạng cơ bản.POST/api/v1/auth/loginĐăng nhập hệ thốngTrả về Access Token (JWT) & Refresh Token.POST/api/v1/auth/logoutĐăng xuấtThu hồi/vô hiệu hóa JWT Token hiện tại.POST/api/v1/auth/refreshLàm mới Access TokenGửi kèm Refresh Token để lấy Access Token mới.POST/api/v1/auth/forgot-passwordYêu cầu quên mật khẩuGửi link/mã OTP qua email.POST/api/v1/auth/reset-passwordKhôi phục mật khẩuSử dụng token/OTP đã nhận để đổi mật khẩu mới.