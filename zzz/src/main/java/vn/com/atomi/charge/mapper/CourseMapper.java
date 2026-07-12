package vn.com.atomi.charge.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import vn.com.atomi.charge.dto.request.CreateCourseRequest;
import vn.com.atomi.charge.dto.request.AdminUpdateCourseRequest;
import vn.com.atomi.charge.dto.request.UpdateCourseRequest;
import vn.com.atomi.charge.dto.response.AdminCourseResponse;
import vn.com.atomi.charge.dto.response.CourseResponse;
import vn.com.atomi.charge.entity.Course;


@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface CourseMapper extends BaseMapper<Course, CourseResponse> {

    // 1. Hàm dùng cho TẠO MỚI (Từ Create Request đặc thù thành Entity)
    Course toEntity(CreateCourseRequest request);

    
    // 2. Hàm dùng cho CẬP NHẬT (Đè dữ liệu từ Update Request lên Entity có sẵn)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromRequest(UpdateCourseRequest request, @MappingTarget Course course);
  

    // 3. Hàm dùng cho ADMIN UPDATE (Đè dữ liệu từ Update Request Admin lên Entity có sẵn)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromAdminRequest(AdminUpdateCourseRequest request, @MappingTarget Course course);


    @Mapping(target = "thumbnailFileId", source = "thumbnailFile.id")
    @Mapping(target = "thumbnailFileUrl", source = "thumbnailFile.fileUrl")
    @Mapping(target = "createdBy", source = "createdBy")
    @Override
    CourseResponse toDto(Course course);

    @Mapping(target = "thumbnailFileId", source = "thumbnailFile.id")
    @Mapping(target = "thumbnailFileUrl", source = "thumbnailFile.fileUrl")
    @Mapping(target = "createdBy", source = "createdBy")
    AdminCourseResponse toAdminDto(Course course);
}
