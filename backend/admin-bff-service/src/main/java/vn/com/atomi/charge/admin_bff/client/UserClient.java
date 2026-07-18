package vn.com.atomi.charge.admin_bff.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import vn.com.atomi.charge.admin_bff.config.FeignClientConfig;

@FeignClient(name = "user-service", configuration = FeignClientConfig.class)
public interface UserClient {
    
}
