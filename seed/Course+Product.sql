-- ============================================================================
-- SCRIPT SEED 50 COURSES TỰ ĐỘNG BẰNG GENERATE_SERIES (JOINED INHERITANCE)
-- ============================================================================

WITH random_products AS (
    INSERT INTO public.products (
        name, 
        short_description, 
        description, 
        slug, 
        price, 
        currency, 
        average_rating, 
        rating_count, 
        status, 
        type, 
        created_at, 
        updated_at, 
        published_at
    )
    SELECT 
        -- 1. Trộn ngẫu nhiên tên môn học để tạo ra 50 đầu sách không trùng
        (ARRAY['Lập trình', 'Làm chủ', 'Chinh phục', 'Xây dựng hệ thống', 'Kiến trúc', 'Thực chiến', 'Tối ưu', 'Thiết kế'])[mod(i, 8) + 1] || ' ' ||
        (ARRAY['Angular', 'Vue.js', 'Python Django', 'Golang Enterprise', 'Kubernetes', 'AWS Cloud', 'C# .NET Core', 'Data Science', 'Machine Learning', 'Cyber Security'])[mod(i, 10) + 1] || ' ' ||
        (ARRAY['từ cơ bản đến nâng cao', 'cho chuyên viên', 'thực tế 2026', 'cấp tốc', 'toàn tập', 'chuyên sâu'])[mod(i * 3, 6) + 1] AS name,
        
        -- 2. Mô tả ngắn
        'Khóa học cung cấp kiến thức nền tảng và kỹ năng thực hành chuyên sâu về công nghệ mục thứ ' || i || '.' AS short_description,
        
        -- 3. Mô tả chi tiết
        'Nội dung chi tiết bao gồm hơn 50 bài giảng chất lượng cao, tài liệu đính kèm đầy đủ và các dự án thực tế giúp bạn làm chủ công nghệ ngay lập tức.' AS description,
        
        -- 4. Tạo slug duy nhất bằng cách gắn số index phía sau
        'course-slug-learning-tech-' || i AS slug,
        
        -- 5. Giá tiền ngẫu nhiên từ 299k đến 1tr990k
        (ARRAY[299000.00, 499000.00, 699000.00, 999000.00, 1490000.00, 1990000.00])[mod(i, 6) + 1] AS price,
        
        'VND' AS currency,
        
        -- 6. Rating ngẫu nhiên từ 4.0 đến 5.0
        (ARRAY[4.0, 4.2, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0])[mod(i * 2, 8) + 1] AS average_rating,
        
        -- 7. Số lượt đánh giá ngẫu nhiên
        mod(i * 11, 300) + 5 AS rating_count,
        
        'ACTIVE' AS status,
        'COURSE' AS type,
        NOW() - (i || ' days')::INTERVAL AS created_at,
        NOW() - (i || ' days')::INTERVAL AS updated_at,
        NOW() - (i || ' days')::INTERVAL AS published_at
    FROM generate_series(11, 60) AS i -- Chạy từ 11 đến 60 để không trùng 10 khóa học đã tạo trước đó
    RETURNING id, name -- Trả về ID vừa sinh của bảng products để map sang bảng courses
)
INSERT INTO public.courses (
    product_id, 
    specialization_id, 
    level, 
    status, 
    estimated_duration_unit, 
    estimated_duration_value, 
    certificate_enabled
)
SELECT 
    id, -- Lấy từ bảng products vừa được sinh ở trên
    NULL,
    -- Phân bổ ngẫu nhiên Level (BEGINNER, INTERMEDIATE, ADVANCED)
    (ARRAY['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])[mod(id::int, 3) + 1]::varchar,
    -- Trạng thái mặc định PUBLISHED
    'PUBLISHED',
    -- Đơn vị thời gian ngẫu nhiên
    (ARRAY['HOUR', 'WEEK', 'MONTH'])[mod(id::int, 3) + 1]::varchar,
    -- Giá trị thời gian ngẫu nhiên từ 10 - 50
    mod(id::int * 7, 40) + 10,
    -- Bật/tắt chứng chỉ ngẫu nhiên
    (ARRAY[TRUE, FALSE])[mod(id::int, 2) + 1]
FROM random_products;