## Yêu cầu cốt lõi của dự án (E-learning Project)

Dự án này là một sản phẩm thực tập yêu cầu sự chặt chẽ và tuân thủ các quy tắc kiến trúc sau:

1. **Phân công vai trò:** AI chỉ tập trung hoàn toàn vào việc xây dựng giao diện người dùng (UI - Frontend bằng React).
2. **Kiến trúc hệ thống:** Hệ thống tổng thể sử dụng kiến trúc **Microservices**.
3. **Backend:** Backend được viết bằng **Java** và sử dụng framework **Spring Boot**.
4. **Tích hợp:** UI phải được thiết kế dạng decoupled (tách rời), chuẩn bị sẵn các service layer rõ ràng để dễ dàng tích hợp với các API Gateway và các endpoints của Spring Boot sau này.
5. **Mục tiêu:** Mọi quyết định thiết kế Frontend phải tạo điều kiện để tận dụng tối đa hệ sinh thái của Spring ở dưới Backend.
6. **Dữ liệu giả lập (Mock Data):** Mọi hình ảnh, text, hay thông tin liên quan đến các đối tượng (entity) trong quá trình thiết kế UI hiện tại chỉ mang tính chất demo (placeholder). Các thành phần này phải được thiết kế dưới dạng biến hoặc props linh hoạt để sau này thay thế hoàn toàn bằng dữ liệu thật thông qua API gọi từ backend Spring Boot.
