package vn.com.atomi.charge.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import vn.com.atomi.charge.dto.request.CreateCourseRequest;
import vn.com.atomi.charge.dto.request.UpdateCourseRequest;
import vn.com.atomi.charge.dto.response.CourseResponse;
import vn.com.atomi.charge.entity.Course;
import vn.com.atomi.charge.enums.ActiveStatus;
import vn.com.atomi.charge.exception.AppException;
import vn.com.atomi.charge.exception.ErrorCode;
import vn.com.atomi.charge.repository.CourseRepository;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<CourseResponse> getAll() {
        return courseRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public Page<CourseResponse> getAllWithPagination(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Course> courses = courseRepository.findAll(pageable);
        return courses.map(this::toResponse);
    }

    public CourseResponse createCourse(CreateCourseRequest request) {
        Course course = Course.builder()
                .name(request.getName())
                .shortDescription(request.getShortDescription())
                .description(request.getDescription())
                .slug(request.getSlug())
                .price(request.getPrice())
                .currency(request.getCurrency())
                .thumbnailUrl(request.getThumbnailUrl())
                .status(ActiveStatus.ACTIVE)
                .level(request.getLevel())
                .contentStatus(request.getStatus())
                .estimatedDurationUnit(request.getEstimatedDurationUnit())
                .estimatedDurationValue(request.getEstimatedDurationValue())
                .certificateEnabled(request.getCertificateEnabled())
                .build();

        return toResponse(courseRepository.save(course));
    }

    public CourseResponse updateCourse(Long id, UpdateCourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        course.setName(request.getName());
        course.setShortDescription(request.getShortDescription());
        course.setDescription(request.getDescription());
        course.setSlug(request.getSlug());
        course.setPrice(request.getPrice());
        course.setCurrency(request.getCurrency());
        course.setThumbnailUrl(request.getThumbnailUrl());
        course.setLevel(request.getLevel());
        course.setContentStatus(request.getStatus());
        course.setEstimatedDurationUnit(request.getEstimatedDurationUnit());
        course.setEstimatedDurationValue(request.getEstimatedDurationValue());
        course.setCertificateEnabled(request.getCertificateEnabled());

        return toResponse(courseRepository.save(course));
    }

    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new AppException(ErrorCode.COURSE_NOT_FOUND);
        }
        courseRepository.deleteById(id);
    }

    private CourseResponse toResponse(Course course) {
        return CourseResponse.builder()
                .id(course.getId())
                .name(course.getName())
                .shortDescription(course.getShortDescription())
                .description(course.getDescription())
                .slug(course.getSlug())
                .price(course.getPrice())
                .currency(course.getCurrency())
                .thumbnailUrl(course.getThumbnailUrl())
                .level(course.getLevel())
                .status(course.getContentStatus())
                .estimatedDurationUnit(course.getEstimatedDurationUnit())
                .estimatedDurationValue(course.getEstimatedDurationValue())
                .certificateEnabled(course.getCertificateEnabled())
                .createdAt(course.getCreatedAt())
                .updatedAt(course.getUpdatedAt())
                .build();
    }
}
