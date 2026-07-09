## Yêu cầu cốt lõi của dự án (E-learning Project)

Dự án này là một sản phẩm thực tập yêu cầu sự chặt chẽ và tuân thủ các quy tắc kiến trúc sau:

1. **Phân công vai trò:** AI chỉ tập trung hoàn toàn vào việc xây dựng giao diện người dùng (UI - Frontend bằng React).
2. **Kiến trúc hệ thống:** Hệ thống tổng thể sử dụng kiến trúc **Microservices**.
3. **Backend:** Backend được viết bằng **Java** và sử dụng framework **Spring Boot**.
4. **Tích hợp:** UI phải được thiết kế dạng decoupled (tách rời), chuẩn bị sẵn các service layer rõ ràng để dễ dàng tích hợp với các API Gateway và các endpoints của Spring Boot sau này.
5. **Mục tiêu:** Mọi quyết định thiết kế Frontend phải tạo điều kiện để tận dụng tối đa hệ sinh thái của Spring ở dưới Backend.
6. **Dữ liệu giả lập (Mock Data):** Mọi hình ảnh, text, hay thông tin liên quan đến các đối tượng (entity) trong quá trình thiết kế UI hiện tại chỉ mang tính chất demo (placeholder). Các thành phần này phải được thiết kế dưới dạng biến hoặc props linh hoạt để sau này thay thế hoàn toàn bằng dữ liệu thật thông qua API gọi từ backend Spring Boot.
7. **Xóa file/thư mục:** Luôn phải hỏi ý kiến người dùng trước khi xóa bất kỳ file hoặc thư mục nào, không tự ý xóa.
8. **Không đụng vào backend:** Không bao giờ được sửa, tạo, hay thay đổi code trong thư mục `zzz/` (backend), **trừ khi người dùng yêu cầu trực tiếp**. Người dùng muốn tự code backend bằng thực lực của mình. Nếu người dùng cần hỗ trợ về backend, mặc định chỉ được gợi ý và hướng dẫn (giải thích, chỉ ra hướng đi, review code), không tự ý viết hay sửa code thay họ trong thư mục này trừ khi được yêu cầu rõ ràng.
