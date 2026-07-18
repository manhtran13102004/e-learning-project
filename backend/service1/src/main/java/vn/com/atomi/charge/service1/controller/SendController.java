package vn.com.atomi.charge.service1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/send")
public class SendController {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @PostMapping("/register")
    public String registerUser() {
        // 1. Logic lưu email, password hash vào DB của Auth MS ở đây...
        String userId = "usr_888"; // Giả lập UUID sinh ra sau khi lưu DB

        // 2. Bắn tin nhắn lên Kafka topic tên là "user-created-topic"
        // Nội dung tin nhắn là UUID của user vừa tạo
        kafkaTemplate.send("user-created-topic", userId);

        return "Đăng ký thành công! Đang xử lý tạo profile...";
    }
}
