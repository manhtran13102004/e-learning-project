package vn.com.atomi.charge.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.com.atomi.charge.dto.request.AdminUpdateCourseRequest;
import vn.com.atomi.charge.dto.request.CreateCourseRequest;
import vn.com.atomi.charge.dto.request.UpdateCourseRequest;
import vn.com.atomi.charge.dto.response.AdminCourseResponse;
import vn.com.atomi.charge.dto.response.CourseResponse;
import vn.com.atomi.charge.dto.response.SpecializationResponse;
import vn.com.atomi.charge.entity.Course;
import vn.com.atomi.charge.entity.FileMetadata;
import vn.com.atomi.charge.entity.Specialization;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-12T11:28:10+0700",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class CourseMapperImpl implements CourseMapper {

    @Autowired
    private UserMapper userMapper;

    @Override
    public Course toEntity(CourseResponse dto) {
        if ( dto == null ) {
            return null;
        }

        Course.CourseBuilder<?, ?> course = Course.builder();

        course.averageRating( dto.getAverageRating() );
        course.createdAt( dto.getCreatedAt() );
        course.createdBy( userMapper.toEntity( dto.getCreatedBy() ) );
        course.currency( dto.getCurrency() );
        course.description( dto.getDescription() );
        course.id( dto.getId() );
        course.name( dto.getName() );
        course.price( dto.getPrice() );
        course.publishedAt( dto.getPublishedAt() );
        course.ratingCount( dto.getRatingCount() );
        course.shortDescription( dto.getShortDescription() );
        course.sku( dto.getSku() );
        course.slug( dto.getSlug() );
        course.status( dto.getStatus() );
        course.updatedAt( dto.getUpdatedAt() );
        course.certificateEnabled( dto.getCertificateEnabled() );
        course.contentStatus( dto.getContentStatus() );
        course.estimatedDurationUnit( dto.getEstimatedDurationUnit() );
        course.estimatedDurationValue( dto.getEstimatedDurationValue() );
        course.level( dto.getLevel() );
        course.specialization( specializationResponseToSpecialization( dto.getSpecialization() ) );

        return course.build();
    }

    @Override
    public List<CourseResponse> toDtoList(List<Course> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<CourseResponse> list = new ArrayList<CourseResponse>( entityList.size() );
        for ( Course course : entityList ) {
            list.add( toDto( course ) );
        }

        return list;
    }

    @Override
    public List<Course> toEntityList(List<CourseResponse> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Course> list = new ArrayList<Course>( dtoList.size() );
        for ( CourseResponse courseResponse : dtoList ) {
            list.add( toEntity( courseResponse ) );
        }

        return list;
    }

    @Override
    public Course toEntity(CreateCourseRequest request) {
        if ( request == null ) {
            return null;
        }

        Course.CourseBuilder<?, ?> course = Course.builder();

        course.currency( request.getCurrency() );
        course.description( request.getDescription() );
        course.name( request.getName() );
        course.price( request.getPrice() );
        course.shortDescription( request.getShortDescription() );
        course.slug( request.getSlug() );
        course.certificateEnabled( request.getCertificateEnabled() );
        course.contentStatus( request.getContentStatus() );
        course.estimatedDurationUnit( request.getEstimatedDurationUnit() );
        course.estimatedDurationValue( request.getEstimatedDurationValue() );
        course.level( request.getLevel() );

        return course.build();
    }

    @Override
    public void updateEntityFromRequest(UpdateCourseRequest request, Course course) {
        if ( request == null ) {
            return;
        }

        if ( request.getCurrency() != null ) {
            course.setCurrency( request.getCurrency() );
        }
        if ( request.getDescription() != null ) {
            course.setDescription( request.getDescription() );
        }
        if ( request.getName() != null ) {
            course.setName( request.getName() );
        }
        if ( request.getPrice() != null ) {
            course.setPrice( request.getPrice() );
        }
        if ( request.getShortDescription() != null ) {
            course.setShortDescription( request.getShortDescription() );
        }
        if ( request.getSlug() != null ) {
            course.setSlug( request.getSlug() );
        }
        if ( request.getCertificateEnabled() != null ) {
            course.setCertificateEnabled( request.getCertificateEnabled() );
        }
        if ( request.getContentStatus() != null ) {
            course.setContentStatus( request.getContentStatus() );
        }
        if ( request.getEstimatedDurationUnit() != null ) {
            course.setEstimatedDurationUnit( request.getEstimatedDurationUnit() );
        }
        if ( request.getEstimatedDurationValue() != null ) {
            course.setEstimatedDurationValue( request.getEstimatedDurationValue() );
        }
        if ( request.getLevel() != null ) {
            course.setLevel( request.getLevel() );
        }
    }

    @Override
    public void updateEntityFromAdminRequest(AdminUpdateCourseRequest request, Course course) {
        if ( request == null ) {
            return;
        }

        if ( request.getCurrency() != null ) {
            course.setCurrency( request.getCurrency() );
        }
        if ( request.getDescription() != null ) {
            course.setDescription( request.getDescription() );
        }
        if ( request.getName() != null ) {
            course.setName( request.getName() );
        }
        if ( request.getPrice() != null ) {
            course.setPrice( request.getPrice() );
        }
        if ( request.getShortDescription() != null ) {
            course.setShortDescription( request.getShortDescription() );
        }
        if ( request.getSlug() != null ) {
            course.setSlug( request.getSlug() );
        }
        if ( request.getCertificateEnabled() != null ) {
            course.setCertificateEnabled( request.getCertificateEnabled() );
        }
        if ( request.getContentStatus() != null ) {
            course.setContentStatus( request.getContentStatus() );
        }
        if ( request.getEstimatedDurationUnit() != null ) {
            course.setEstimatedDurationUnit( request.getEstimatedDurationUnit() );
        }
        if ( request.getEstimatedDurationValue() != null ) {
            course.setEstimatedDurationValue( request.getEstimatedDurationValue() );
        }
        if ( request.getLevel() != null ) {
            course.setLevel( request.getLevel() );
        }
    }

    @Override
    public CourseResponse toDto(Course course) {
        if ( course == null ) {
            return null;
        }

        CourseResponse.CourseResponseBuilder<?, ?> courseResponse = CourseResponse.builder();

        courseResponse.thumbnailFileId( courseThumbnailFileId( course ) );
        courseResponse.thumbnailFileUrl( courseThumbnailFileFileUrl( course ) );
        courseResponse.createdBy( userMapper.toDto( course.getCreatedBy() ) );
        courseResponse.averageRating( course.getAverageRating() );
        courseResponse.createdAt( course.getCreatedAt() );
        courseResponse.currency( course.getCurrency() );
        courseResponse.description( course.getDescription() );
        courseResponse.id( course.getId() );
        courseResponse.name( course.getName() );
        courseResponse.price( course.getPrice() );
        courseResponse.publishedAt( course.getPublishedAt() );
        courseResponse.ratingCount( course.getRatingCount() );
        courseResponse.shortDescription( course.getShortDescription() );
        courseResponse.sku( course.getSku() );
        courseResponse.slug( course.getSlug() );
        courseResponse.status( course.getStatus() );
        courseResponse.updatedAt( course.getUpdatedAt() );
        courseResponse.certificateEnabled( course.getCertificateEnabled() );
        courseResponse.contentStatus( course.getContentStatus() );
        courseResponse.estimatedDurationUnit( course.getEstimatedDurationUnit() );
        courseResponse.estimatedDurationValue( course.getEstimatedDurationValue() );
        courseResponse.level( course.getLevel() );
        courseResponse.specialization( specializationToSpecializationResponse( course.getSpecialization() ) );

        return courseResponse.build();
    }

    @Override
    public AdminCourseResponse toAdminDto(Course course) {
        if ( course == null ) {
            return null;
        }

        AdminCourseResponse.AdminCourseResponseBuilder<?, ?> adminCourseResponse = AdminCourseResponse.builder();

        adminCourseResponse.thumbnailFileId( courseThumbnailFileId( course ) );
        adminCourseResponse.thumbnailFileUrl( courseThumbnailFileFileUrl( course ) );
        adminCourseResponse.createdBy( userMapper.toDto( course.getCreatedBy() ) );
        adminCourseResponse.averageRating( course.getAverageRating() );
        adminCourseResponse.createdAt( course.getCreatedAt() );
        adminCourseResponse.currency( course.getCurrency() );
        adminCourseResponse.description( course.getDescription() );
        adminCourseResponse.id( course.getId() );
        adminCourseResponse.name( course.getName() );
        adminCourseResponse.price( course.getPrice() );
        adminCourseResponse.publishedAt( course.getPublishedAt() );
        adminCourseResponse.ratingCount( course.getRatingCount() );
        adminCourseResponse.shortDescription( course.getShortDescription() );
        adminCourseResponse.sku( course.getSku() );
        adminCourseResponse.slug( course.getSlug() );
        adminCourseResponse.status( course.getStatus() );
        adminCourseResponse.updatedAt( course.getUpdatedAt() );
        adminCourseResponse.certificateEnabled( course.getCertificateEnabled() );
        adminCourseResponse.contentStatus( course.getContentStatus() );
        adminCourseResponse.estimatedDurationUnit( course.getEstimatedDurationUnit() );
        adminCourseResponse.estimatedDurationValue( course.getEstimatedDurationValue() );
        adminCourseResponse.level( course.getLevel() );
        adminCourseResponse.specialization( specializationToSpecializationResponse( course.getSpecialization() ) );

        return adminCourseResponse.build();
    }

    protected Specialization specializationResponseToSpecialization(SpecializationResponse specializationResponse) {
        if ( specializationResponse == null ) {
            return null;
        }

        Specialization.SpecializationBuilder<?, ?> specialization = Specialization.builder();

        specialization.averageRating( specializationResponse.getAverageRating() );
        specialization.createdAt( specializationResponse.getCreatedAt() );
        specialization.createdBy( userMapper.toEntity( specializationResponse.getCreatedBy() ) );
        specialization.currency( specializationResponse.getCurrency() );
        specialization.description( specializationResponse.getDescription() );
        specialization.id( specializationResponse.getId() );
        specialization.name( specializationResponse.getName() );
        specialization.price( specializationResponse.getPrice() );
        specialization.publishedAt( specializationResponse.getPublishedAt() );
        specialization.ratingCount( specializationResponse.getRatingCount() );
        specialization.shortDescription( specializationResponse.getShortDescription() );
        specialization.sku( specializationResponse.getSku() );
        specialization.slug( specializationResponse.getSlug() );
        specialization.status( specializationResponse.getStatus() );
        specialization.updatedAt( specializationResponse.getUpdatedAt() );
        specialization.certificateEnabled( specializationResponse.getCertificateEnabled() );
        specialization.contentStatus( specializationResponse.getContentStatus() );
        specialization.estimatedDurationUnit( specializationResponse.getEstimatedDurationUnit() );
        specialization.estimatedDurationValue( specializationResponse.getEstimatedDurationValue() );
        specialization.level( specializationResponse.getLevel() );

        return specialization.build();
    }

    private Long courseThumbnailFileId(Course course) {
        FileMetadata thumbnailFile = course.getThumbnailFile();
        if ( thumbnailFile == null ) {
            return null;
        }
        return thumbnailFile.getId();
    }

    private String courseThumbnailFileFileUrl(Course course) {
        FileMetadata thumbnailFile = course.getThumbnailFile();
        if ( thumbnailFile == null ) {
            return null;
        }
        return thumbnailFile.getFileUrl();
    }

    protected SpecializationResponse specializationToSpecializationResponse(Specialization specialization) {
        if ( specialization == null ) {
            return null;
        }

        SpecializationResponse.SpecializationResponseBuilder<?, ?> specializationResponse = SpecializationResponse.builder();

        specializationResponse.averageRating( specialization.getAverageRating() );
        specializationResponse.createdAt( specialization.getCreatedAt() );
        specializationResponse.createdBy( userMapper.toDto( specialization.getCreatedBy() ) );
        specializationResponse.currency( specialization.getCurrency() );
        specializationResponse.description( specialization.getDescription() );
        specializationResponse.id( specialization.getId() );
        specializationResponse.name( specialization.getName() );
        specializationResponse.price( specialization.getPrice() );
        specializationResponse.publishedAt( specialization.getPublishedAt() );
        specializationResponse.ratingCount( specialization.getRatingCount() );
        specializationResponse.shortDescription( specialization.getShortDescription() );
        specializationResponse.sku( specialization.getSku() );
        specializationResponse.slug( specialization.getSlug() );
        specializationResponse.status( specialization.getStatus() );
        specializationResponse.updatedAt( specialization.getUpdatedAt() );
        specializationResponse.certificateEnabled( specialization.getCertificateEnabled() );
        specializationResponse.contentStatus( specialization.getContentStatus() );
        specializationResponse.estimatedDurationUnit( specialization.getEstimatedDurationUnit() );
        specializationResponse.estimatedDurationValue( specialization.getEstimatedDurationValue() );
        specializationResponse.level( specialization.getLevel() );

        return specializationResponse.build();
    }
}
