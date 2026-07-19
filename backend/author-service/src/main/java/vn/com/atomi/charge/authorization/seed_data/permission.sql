-- 1. Đảm bảo bảng có ràng buộc UNIQUE cho cột name (nếu chưa có)
ALTER TABLE permissions ADD CONSTRAINT unique_permission_name UNIQUE (name);

-- 2. Seed dữ liệu permissions sử dụng UUID ngẫu nhiên
INSERT INTO permissions (id, name, description, version, created_date, last_modified_date) VALUES
-- Quản lý Hệ thống (System/Admin)
(gen_random_uuid(), 'SYSTEM_DASHBOARD_VIEW', 'Xem bảng điều khiển tổng quan hệ thống', 0, NOW(), NOW()),
(gen_random_uuid(), 'SYSTEM_SETTING_UPDATE', 'Cập nhật cấu hình hệ thống', 0, NOW(), NOW()),

-- Quản lý Người dùng (User Management)
(gen_random_uuid(), 'USER_CREATE', 'Tạo mới người dùng (Học viên, Giảng viên, Admin)', 0, NOW(), NOW()),
(gen_random_uuid(), 'USER_VIEW', 'Xem thông tin chi tiết người dùng', 0, NOW(), NOW()),
(gen_random_uuid(), 'USER_UPDATE', 'Cập nhật thông tin người dùng', 0, NOW(), NOW()),
(gen_random_uuid(), 'USER_DELETE', 'Xóa hoặc vô hiệu hóa người dùng', 0, NOW(), NOW()),

-- Quản lý Khóa học (Course Management)
(gen_random_uuid(), 'COURSE_CREATE', 'Tạo mới khóa học', 0, NOW(), NOW()),
(gen_random_uuid(), 'COURSE_VIEW', 'Xem danh sách và chi tiết khóa học (bao gồm cả khóa ẩn)', 0, NOW(), NOW()),
(gen_random_uuid(), 'COURSE_UPDATE', 'Chỉnh sửa thông tin khóa học, chương mục', 0, NOW(), NOW()),
(gen_random_uuid(), 'COURSE_DELETE', 'Xóa khóa học', 0, NOW(), NOW()),
(gen_random_uuid(), 'COURSE_APPROVE', 'Phê duyệt khóa học để xuất bản (Publish)', 0, NOW(), NOW()),

-- Quản lý Bài học & Tài liệu (Lesson & Content Management)
(gen_random_uuid(), 'CONTENT_CREATE', 'Tải lên bài học, video, tài liệu', 0, NOW(), NOW()),
(gen_random_uuid(), 'CONTENT_UPDATE', 'Chỉnh sửa nội dung bài học', 0, NOW(), NOW()),
(gen_random_uuid(), 'CONTENT_DELETE', 'Xóa bài học, tài liệu', 0, NOW(), NOW()),

-- Quản lý Bài kiểm tra & Điểm số (Quiz & Assessment)
(gen_random_uuid(), 'QUIZ_CREATE', 'Tạo bài trắc nghiệm, bài tập về nhà', 0, NOW(), NOW()),
(gen_random_uuid(), 'QUIZ_GRADE', 'Chấm điểm bài tập tự luận của học viên', 0, NOW(), NOW()),
(gen_random_uuid(), 'QUIZ_VIEW_RESULT', 'Xem kết quả làm bài của học viên', 0, NOW(), NOW()),

-- Quản lý Đăng ký & Học tập (Enrollment & Progress)
(gen_random_uuid(), 'ENROLLMENT_CREATE', 'Đăng ký khóa học cho học viên (thủ công hoặc qua cổng thanh toán)', 0, NOW(), NOW()),
(gen_random_uuid(), 'ENROLLMENT_VIEW', 'Xem tiến độ học tập của học viên', 0, NOW(), NOW()),
(gen_random_uuid(), 'ENROLLMENT_CANCEL', 'Hủy đăng ký khóa học của học viên', 0, NOW(), NOW()),

-- Quản lý Tương tác (Forum/Comment)
(gen_random_uuid(), 'COMMENT_MODERATE', 'Ẩn/Hiện hoặc xóa bình luận của học viên vi phạm', 0, NOW(), NOW()),

-- Quản lý Tài chính & Báo cáo (Finance & Analytics)
(gen_random_uuid(), 'REPORT_VIEW', 'Xem báo cáo doanh thu, số lượng học viên, tỷ lệ hoàn thành khóa học', 0, NOW(), NOW())
ON CONFLICT (name) DO NOTHING;