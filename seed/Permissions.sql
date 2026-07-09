INSERT INTO public.permissions (name, description, created_at, updated_at) VALUES
-- Quản lý Khóa học (Courses)
('course:create', 'Cho phép tạo khóa học mới', NOW(), NOW()),
('course:edit', 'Cho phép chỉnh sửa thông tin khóa học', NOW(), NOW()),
('course:delete', 'Cho phép xóa khóa học', NOW(), NOW()),
('course:view', 'Cho phép xem danh sách và chi tiết khóa học', NOW(), NOW()),

-- Quản lý Bài trắc nghiệm (Quizzes)
('quiz:create', 'Cho phép tạo bài trắc nghiệm', NOW(), NOW()),
('quiz:edit', 'Cho phép chỉnh sửa bài trắc nghiệm', NOW(), NOW()),
('quiz:delete', 'Cho phép xóa bài trắc nghiệm', NOW(), NOW()),
('quiz:grade', 'Cho phép chấm điểm bài trắc nghiệm', NOW(), NOW()),

-- Quản lý Doanh thu & Báo cáo (Revenue & Reports)
('revenue:view', 'Cho phép xem báo cáo doanh thu', NOW(), NOW()),
('report:export', 'Cho phép xuất báo cáo tài chính', NOW(), NOW()),

-- Quản lý Người dùng (Users)
('user:view', 'Cho phép xem danh sách người dùng', NOW(), NOW()),
('user:edit', 'Cho phép chỉnh sửa thông tin người dùng', NOW(), NOW()),
('user:ban', 'Cho phép khóa tài khoản người dùng', NOW(), NOW());