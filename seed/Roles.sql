INSERT INTO public.roles (name, description, created_at, updated_at) VALUES
('GUESS', 'Khách vãng lai, chưa đăng nhập hoặc tài khoản mới tạo', NOW(), NOW()),
('LEARNER', 'Học viên tham gia các khóa học thông thường', NOW(), NOW()),
('VIP_MEMBER', 'Học viên cao cấp, có quyền truy cập đặc biệt', NOW(), NOW()),
('INSTRUCTOR', 'Giảng viên, người tạo và quản lý khóa học, chấm điểm', NOW(), NOW()),
('ADMIN', 'Quản trị viên toàn hệ thống, có mọi quyền', NOW(), NOW());