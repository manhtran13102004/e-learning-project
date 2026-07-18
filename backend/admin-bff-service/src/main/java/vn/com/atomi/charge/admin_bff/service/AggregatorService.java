package vn.com.atomi.charge.admin_bff.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import vn.com.atomi.charge.base.model.exception.BusinessException;
import vn.com.atomi.charge.base.model.response.BaseResponse;
import org.springframework.data.domain.Page;

@Service
public class AggregatorService<D> {

    public D getData(ResponseEntity<BaseResponse<D>> responseEntity) {
        // 1. Gọi FeignClient sang service con
      

        // 2. Kiểm tra lớp vỏ ngoài (HTTP Status của gói tin)
        if (responseEntity == null || !responseEntity.getStatusCode().is2xxSuccessful()) {
            throw new BusinessException("Lỗi kết nối API nội bộ hoặc Service con phản hồi lỗi HTTP");
        }

        // 3. Trích xuất lớp bọc BaseResponse
        BaseResponse<D> baseResponse = responseEntity.getBody();
        if (baseResponse == null) {
            throw new BusinessException("Phản hồi từ Service con rỗng (Empty Body)");
        }

        // 4. Kiểm tra Business Code bên trong (Ví dụ hệ thống quy định "00" hoặc "SUCCESS" là thành công)
        // Lưu ý: Tùy thuộc vào thiết kế lớp BaseResponse của dự án bạn xem trường code này là String hay Int nhé
        if (!"00".equals(baseResponse.getErrorCode()) && !"SUCCESS".equals(baseResponse.getErrorCode())) {
            throw new BusinessException("Service con xử lý thất bại: " + baseResponse.getMessage());
        }

        // 5. Lấy lõi dữ liệu DTO thực sự ra ngoài
        D data = baseResponse.getData();
        if (data == null) {
            throw new BusinessException("Không tìm thấy dữ liệu yêu cầu");
        }

        return data;
    }

    public Page<D> getPageData(ResponseEntity<BaseResponse<Page<D>>> responseEntity) {
        // 1. Gọi FeignClient sang service con
      

        // 2. Kiểm tra lớp vỏ ngoài (HTTP Status của gói tin)
        if (responseEntity == null || !responseEntity.getStatusCode().is2xxSuccessful()) {
            throw new BusinessException("Lỗi kết nối API nội bộ hoặc Service con phản hồi lỗi HTTP");
        }

        // 3. Trích xuất lớp bọc BaseResponse
        BaseResponse<Page<D>> baseResponse = responseEntity.getBody();
        if (baseResponse == null) {
            throw new BusinessException("Phản hồi từ Service con rỗng (Empty Body)");
        }

        // 4. Kiểm tra Business Code bên trong (Ví dụ hệ thống quy định "00" hoặc "SUCCESS" là thành công)
        // Lưu ý: Tùy thuộc vào thiết kế lớp BaseResponse của dự án bạn xem trường code này là String hay Int nhé
        if (!"00".equals(baseResponse.getErrorCode()) && !"SUCCESS".equals(baseResponse.getErrorCode())) {
            throw new BusinessException("Service con xử lý thất bại: " + baseResponse.getMessage());
        }

        // 5. Lấy lõi dữ liệu DTO thực sự ra ngoài
        Page<D> data = baseResponse.getData();
        if (data == null) {
            throw new BusinessException("Không tìm thấy dữ liệu yêu cầu");
        }

        return data;
    }
} 

