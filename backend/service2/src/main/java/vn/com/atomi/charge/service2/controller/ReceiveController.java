package vn.com.atomi.charge.service2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/receive")
public class ReceiveController {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @KafkaListener(topics = "user-created-topic", groupId = "user-service-group")
    public void handleUserCreated(String userId) {
        System.out.println("Đã nhận được tin nhắn từ Kafka! User ID mới là: " + userId);

        int a = 4;
        // Logic tự động tạo một dòng trống trong DB User Profile với ID = userId
        // userProfileRepository.save(new UserProfile(userId, ...));
    }

}

