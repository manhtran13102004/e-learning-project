package vn.com.atomi.charge.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import vn.com.atomi.charge.entity.Category;
import vn.com.atomi.charge.enums.ActiveStatus;
import vn.com.atomi.charge.repository.CategoryRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {
            log.info("Bắt đầu seed dữ liệu mẫu cho danh mục (Categories)...");

            // 1. Khởi tạo Danh mục cha cấp 1 (Root Categories)
            Category itCategory = Category.builder()
                    .name("Công nghệ thông tin")
                    .slug("cong-nghe-thong-tin")
                    .description("Các khóa học về lập trình, mạng máy tính và khoa học dữ liệu")
                    .status(ActiveStatus.ACTIVE)
                    .build();

            Category businessCategory = Category.builder()
                    .name("Kinh doanh & Khởi nghiệp")
                    .slug("kinh-doanh-va-khoi-nghiep")
                    .description("Kiến thức quản trị, tài chính, marketing và vận hành doanh nghiệp")
                    .status(ActiveStatus.ACTIVE)
                    .build();

            // Lưu danh mục cha trước để có ID
            categoryRepository.saveAll(List.of(itCategory, businessCategory));

            // 2. Khởi tạo Danh mục con cấp 2 thuộc "Công nghệ thông tin"
            Category backendCategory = Category.builder()
                    .name("Lập trình Backend")
                    .slug("lap-trinh-backend")
                    .description("Xây dựng kiến trúc hệ thống, API và quản trị cơ sở dữ liệu")
                    .status(ActiveStatus.ACTIVE)
                    .parent(itCategory) // Gắn cha
                    .build();

            Category frontendCategory = Category.builder()
                    .name("Lập trình Frontend")
                    .slug("lap-trinh-frontend")
                    .description("Thiết kế giao diện, trải nghiệm người dùng Web/Mobile")
                    .status(ActiveStatus.ACTIVE)
                    .parent(itCategory) // Gắn cha
                    .build();

            // 3. Khởi tạo Danh mục con cấp 2 thuộc "Kinh doanh & Khởi nghiệp"
            Category marketingCategory = Category.builder()
                    .name("Digital Marketing")
                    .slug("digital-marketing")
                    .description("Tối ưu hóa công cụ tìm kiếm, quảng cáo trực tuyến và thương hiệu")
                    .status(ActiveStatus.ACTIVE)
                    .parent(businessCategory) // Gắn cha
                    .build();

            categoryRepository.saveAll(List.of(backendCategory, frontendCategory, marketingCategory));

            // 4. Khởi tạo Danh mục con sâu nhất cấp 3 thuộc "Lập trình Backend"
            Category javaCategory = Category.builder()
                    .name("Lập trình Java")
                    .slug("lap-trinh-java")
                    .description("Hệ sinh thái Java từ cơ bản đến nâng cao, Spring Boot framework")
                    .status(ActiveStatus.ACTIVE)
                    .parent(backendCategory) // Gắn cha cấp 2
                    .build();

            Category nodejsCategory = Category.builder()
                    .name("Lập trình Node.js")
                    .slug("lap-trinh-node-js")
                    .description("Xây dựng ứng dụng real-time tốc độ cao với JavaScript/TypeScript")
                    .status(ActiveStatus.ACTIVE)
                    .parent(backendCategory) // Gắn cha cấp 2
                    .build();

            categoryRepository.saveAll(List.of(javaCategory, nodejsCategory));

            log.info("Seed dữ liệu danh mục thành công!");
        } else {
            log.info("Bảng categories đã có dữ liệu, bỏ qua bước seeder.");
        }
    }
}