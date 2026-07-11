package vn.com.atomi.charge.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import vn.com.atomi.charge.dto.request.CreateCourseRequest;
import vn.com.atomi.charge.dto.request.UpdateCourseRequest;
import vn.com.atomi.charge.dto.response.AdminCourseResponse;
import vn.com.atomi.charge.dto.response.CourseMemberResponse;
import vn.com.atomi.charge.dto.response.CourseResponse;
import vn.com.atomi.charge.entity.Course;
import vn.com.atomi.charge.entity.CourseMemberRole;
import vn.com.atomi.charge.entity.FileMetadata;
import vn.com.atomi.charge.enums.ActiveStatus;
import vn.com.atomi.charge.exception.AppException;
import vn.com.atomi.charge.exception.ErrorCode;
import vn.com.atomi.charge.mapper.CourseMapper;
import vn.com.atomi.charge.mapper.RoleMapper;
import vn.com.atomi.charge.mapper.UserMapper;
import vn.com.atomi.charge.repository.CourseMemberRoleRepository;
import vn.com.atomi.charge.repository.CourseRepository;
import vn.com.atomi.charge.repository.FileMetadataRepository;
import vn.com.atomi.charge.specification.GenericSpecification;
import vn.com.atomi.charge.dto.request.AdminCourseSearchRequest;

import org.springframework.data.jpa.domain.Specification;
import java.math.BigDecimal;




@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final FileMetadataRepository fileMetadataRepository;
    private final CourseMemberRoleRepository courseMemberRoleRepository;
    private final RoleMapper roleMapper;
    private final UserMapper userMapper;
    private final CourseMapper courseMapper;
    


    private FileMetadata resolveThumbnailFile(Long thumbnailFileId) {
        if (thumbnailFileId == null) {
            return null;
        }
        return fileMetadataRepository.findById(thumbnailFileId)
                .orElseThrow(() -> new AppException(ErrorCode.FILE_NOT_FOUND));
    }

    public List<CourseResponse> getAll() {
        return courseRepository.findAll().stream()
                .map(courseMapper::toDto)
                .toList();
    }

    public Page<CourseResponse> getAllWithPagination(Pageable pageable){
        
        Page<Course> courses = courseRepository.findAll(pageable);
        return courses.map(courseMapper::toDto);
    }

    public Page<AdminCourseResponse> search(AdminCourseSearchRequest request, Pageable pageable){
        
        Specification<Course> spec = Specification.where(null);
        if (request.getKeyword () != null && !request.getKeyword().isEmpty()) {
            spec = spec.or(new GenericSpecification<>("name", "LIKE", request.getKeyword()));
            spec = spec.or(new GenericSpecification<>("shortDescription", "LIKE", request.getKeyword()));
            spec = spec.or(new GenericSpecification<>("description", "LIKE", request.getKeyword()));
            spec = spec.or(new GenericSpecification<>("slug", "LIKE", request.getKeyword()));
        }
        if (request.getSku () != null && !request.getSku().isEmpty()) {
            spec = spec.and(new GenericSpecification<>("sku", "LIKE", request.getSku()));
        }
        if (request.getMinPrice () != null && request.getMinPrice().compareTo(BigDecimal.ZERO) > 0) {
            spec = spec.and(new GenericSpecification<>("price", "GREATER_THAN_OR_EQUAL", request.getMinPrice()));
        }
        if (request.getMaxPrice () != null && request.getMaxPrice().compareTo(BigDecimal.ZERO) > 0) {
            spec = spec.and(new GenericSpecification<>("price", "LESS_THAN_OR_EQUAL", request.getMaxPrice()));
        }
        if (request.getStatus () != null) {
            spec = spec.and(new GenericSpecification<>("status", "EQUAL", request.getStatus()));
        }
        if (request.getLevel () != null) {
            spec = spec.and(new GenericSpecification<>("level", "EQUAL", request.getLevel()));
        }
        if (request.getContentStatus () != null) {
            spec = spec.and(new GenericSpecification<>("contentStatus", "EQUAL", request.getContentStatus()));
        }
        if (request.getEstimatedDurationUnit () != null) {
            spec = spec.and(new GenericSpecification<>("estimatedDurationUnit", "EQUAL", request.getEstimatedDurationUnit()));
        }
        if (request.getEstimatedDurationValue () != null) {
            spec = spec.and(new GenericSpecification<>("estimatedDurationValue", "EQUAL", request.getEstimatedDurationValue()));
        }
        if (request.getCertificateEnabled () != null) {
            spec = spec.and(new GenericSpecification<>("certificateEnabled", "EQUAL", request.getCertificateEnabled()));
        }
         
    }

    @Transactional
    public CourseResponse createCourse(CreateCourseRequest request) {
        Course course = Course.builder()
                .name(request.getName())
                .shortDescription(request.getShortDescription())
                .description(request.getDescription())
                .slug(request.getSlug())
                .price(request.getPrice())
                .currency(request.getCurrency())
                .thumbnailFile(resolveThumbnailFile(request.getThumbnailFileId()))
                .status(ActiveStatus.ACTIVE)
                .level(request.getLevel())
                .contentStatus(request.getContentStatus())
                .estimatedDurationUnit(request.getEstimatedDurationUnit())
                .estimatedDurationValue(request.getEstimatedDurationValue())
                .certificateEnabled(request.getCertificateEnabled())
                .build();

        return courseMapper.toDto(courseRepository.save(course));
    }

    @Transactional
    public CourseResponse updateCourse(Long id, UpdateCourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        course.setName(request.getName());
        course.setShortDescription(request.getShortDescription());
        course.setDescription(request.getDescription());
        course.setSlug(request.getSlug());
        course.setPrice(request.getPrice());
        course.setCurrency(request.getCurrency());
        course.setThumbnailFile(resolveThumbnailFile(request.getThumbnailFileId()));
        course.setLevel(request.getLevel());
        course.setContentStatus(request.getContentStatus());
        course.setEstimatedDurationUnit(request.getEstimatedDurationUnit());
        course.setEstimatedDurationValue(request.getEstimatedDurationValue());
        course.setCertificateEnabled(request.getCertificateEnabled());

        return courseMapper.toDto(courseRepository.save(course));
    }

    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new AppException(ErrorCode.COURSE_NOT_FOUND);
        }
        courseRepository.deleteById(id);
    }




    //____________________________User__________________________________

    public List<CourseMemberResponse> getCourseParticipants(Long courseId) {
        return courseMemberRoleRepository.findByCourseId(courseId)
                .stream()
                .map(this::toCourseMemberResponse)
                .toList();
    }
    //____________________________Helper________________________________


    private CourseMemberResponse toCourseMemberResponse(CourseMemberRole courseMemberRole){
        return CourseMemberResponse.builder()
                .user(userMapper.toAdminDto(courseMemberRole.getUser()))
                .role(roleMapper.toAdminDto(courseMemberRole.getRole()))
                .build();
    }

    private CourseResponse toResponse(Course course){
        return courseMapper.toDto(course);
    }

    private AdminCourseResponse toAdminResponse(Course course) {
        return courseMapper.toAdminDto(course);
    }
}
