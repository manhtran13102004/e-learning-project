package vn.com.atomi.charge.admin_bff.config;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class FeignClientConfig implements RequestInterceptor {

    private static final String AUTHORIZATION_HEADER = "Authorization";

    @Override
    public void apply(RequestTemplate template) {
        // Lấy thông tin request hiện tại mà BFF nhận được từ Admin
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            String authorizationHeader = request.getHeader(AUTHORIZATION_HEADER);
            
            // Nếu có token, đính kèm nó vào request gửi sang các service con
            if (authorizationHeader != null && !authorizationHeader.isEmpty()) {
                template.header(AUTHORIZATION_HEADER, authorizationHeader);
            }
        }
    }
}