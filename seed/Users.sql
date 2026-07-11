-- ============================================================================
-- SCRIPT SEED 50 USERS SỬ DỤNG GENERATE_SERIES TRONG POSTGRESQL
-- ============================================================================

INSERT INTO public.users (email, password_hash, full_name, bio, avatar_file_id, created_at, updated_at)
SELECT 
    -- 1. Tạo email duy nhất từ số index (ví dụ: user1@atomi.com.vn)
    'user' || i || '@atomi.com.vn' AS email,
    
    -- 2. Password hash mẫu giống định dạng BCrypt (Password gốc giả định là "Password@123")
    '$2a$12$ExR8/U7.VvHpyQ6p.pbyOeb6XfL3tSjREn3LzW9M3WwzH5H.qfWqC' AS password_hash,
    
    -- 3. Trộn ngẫu nhiên Họ, Đệm, Tên để ra 50 tên tiếng Việt thực tế
    (ARRAY['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng'])[mod(i, 10) + 1] || ' ' ||
    (ARRAY['Văn', 'Thị', 'Đức', 'Minh', 'Hồng', 'Anh', 'Tuấn', 'Quang', 'Ngọc', 'Hoài'])[mod(i + 3, 10) + 1] || ' ' ||
    (ARRAY['Hùng', 'Dũng', 'Lan', 'Mai', 'Nam', 'Bình', 'Sơn', 'Hải', 'Trang', 'Tú'])[mod(i * 7, 10) + 1] AS full_name,
    
    -- 4. Tạo tiểu sử (Bio) ngẫu nhiên theo số thứ tự
    'Xin chào, tôi là thành viên thứ ' || i || ' của hệ thống Atomi Learning. Đam mê lập trình và chia sẻ kiến thức.' AS bio,
    
    -- 5. Avatar để null vì chưa seed bảng FileMetadata giống thực thể JPA cấu hình
    NULL AS avatar_file_id,
    
    -- 6. Thời gian tạo lùi dần về quá khứ để dữ liệu nhìn thật hơn (ví dụ: mỗi user cách nhau 2 tiếng)
    NOW() - (i || ' hours')::INTERVAL AS created_at,
    NOW() - (i || ' hours')::INTERVAL AS updated_at

FROM generate_series(1, 50) AS i;