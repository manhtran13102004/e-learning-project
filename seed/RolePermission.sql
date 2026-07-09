-- ============================================================================
-- 1. Phân quyền cho ADMIN (Admin có tất cả các quyền trong hệ thống)
-- ============================================================================
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM public.roles r, public.permissions p
WHERE r.name = 'ADMIN';

-- ============================================================================
-- 2. Phân quyền cho INSTRUCTOR (Giảng viên)
-- Giảng viên quản lý khóa học, bài quiz của họ, chấm điểm và xem doanh thu
-- ============================================================================
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM public.roles r, public.permissions p
WHERE r.name = 'INSTRUCTOR' 
  AND p.name IN (
    'course:create', 'course:edit', 'course:view',
    'quiz:create', 'quiz:edit', 'quiz:delete', 'quiz:grade',
    'revenue:view'
  );

-- ============================================================================
-- 3. Phân quyền cho VIP_MEMBER (Học viên VIP)
-- Được xem khóa học và nâng cao hơn có thể có một số quyền (ở đây chỉ có course:view)
-- ============================================================================
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM public.roles r, public.permissions p
WHERE r.name = 'VIP_MEMBER' 
  AND p.name IN ('course:view');

-- ============================================================================
-- 4. Phân quyền cho LEARNER (Học viên thông thường)
-- Học viên chỉ có quyền xem thông tin khóa học
-- ============================================================================
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM public.roles r, public.permissions p
WHERE r.name = 'LEARNER' 
  AND p.name IN ('course:view');

-- ============================================================================
-- 5. Phân quyền cho GUESS (Khách vãng lai)
-- Tùy thuộc vào thiết kế hệ thống, nếu cho phép xem danh sách khóa học công khai:
-- ============================================================================
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM public.roles r, public.permissions p
WHERE r.name = 'GUESS' 
  AND p.name IN ('course:view');