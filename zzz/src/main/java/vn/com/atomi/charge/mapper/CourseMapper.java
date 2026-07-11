package vn.com.atomi.charge.mapper;

import org.mapstruct.Mapper;

import vn.com.atomi.charge.dto.response.AdminCourseResponse;
import vn.com.atomi.charge.dto.response.CourseResponse;
import vn.com.atomi.charge.entity.Course;


@Mapper(componentModel = "spring")
public interface CourseMapper extends BaseMapper<Course, CourseResponse> {
  
    AdminCourseResponse toAdminDto(Course course);
}
