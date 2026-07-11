package vn.com.atomi.charge.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import vn.com.atomi.charge.dto.response.AdminCourseResponse;
import vn.com.atomi.charge.dto.response.CourseResponse;
import vn.com.atomi.charge.dto.response.SpecializationResponse;
import vn.com.atomi.charge.entity.Course;
import vn.com.atomi.charge.entity.Specialization;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-11T16:42:27+0700",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class CourseMapperImpl implements CourseMapper {

    @Override
    public CourseResponse toDto(Course entity) {
        if ( entity == null ) {
            return null;
        }

        CourseResponse.CourseResponseBuilder<?, ?> courseResponse = CourseResponse.builder();

        courseResponse.id( entity.getId() );
        courseResponse.name( entity.getName() );
        courseResponse.shortDescription( entity.getShortDescription() );
        courseResponse.description( entity.getDescription() );
        courseResponse.slug( entity.getSlug() );
        courseResponse.sku( entity.getSku() );
        courseResponse.price( entity.getPrice() );
        courseResponse.currency( entity.getCurrency() );
        courseResponse.averageRating( entity.getAverageRating() );
        courseResponse.ratingCount( entity.getRatingCount() );
        courseResponse.status( entity.getStatus() );
        courseResponse.publishedAt( entity.getPublishedAt() );
        courseResponse.createdAt( entity.getCreatedAt() );
        courseResponse.updatedAt( entity.getUpdatedAt() );
        courseResponse.createdBy( entity.getCreatedBy() );
        courseResponse.specialization( specializationToSpecializationResponse( entity.getSpecialization() ) );
        courseResponse.level( entity.getLevel() );
        courseResponse.contentStatus( entity.getContentStatus() );
        courseResponse.estimatedDurationUnit( entity.getEstimatedDurationUnit() );
        courseResponse.estimatedDurationValue( entity.getEstimatedDurationValue() );
        courseResponse.certificateEnabled( entity.getCertificateEnabled() );

        return courseResponse.build();
    }

    @Override
    public Course toEntity(CourseResponse dto) {
        if ( dto == null ) {
            return null;
        }

        Course.CourseBuilder<?, ?> course = Course.builder();

        course.id( dto.getId() );
        course.name( dto.getName() );
        course.shortDescription( dto.getShortDescription() );
        course.description( dto.getDescription() );
        course.slug( dto.getSlug() );
        course.sku( dto.getSku() );
        course.price( dto.getPrice() );
        course.currency( dto.getCurrency() );
        course.averageRating( dto.getAverageRating() );
        course.ratingCount( dto.getRatingCount() );
        course.status( dto.getStatus() );
        course.createdBy( dto.getCreatedBy() );
        course.createdAt( dto.getCreatedAt() );
        course.updatedAt( dto.getUpdatedAt() );
        course.publishedAt( dto.getPublishedAt() );
        course.specialization( specializationResponseToSpecialization( dto.getSpecialization() ) );
        course.level( dto.getLevel() );
        course.contentStatus( dto.getContentStatus() );
        course.estimatedDurationUnit( dto.getEstimatedDurationUnit() );
        course.estimatedDurationValue( dto.getEstimatedDurationValue() );
        course.certificateEnabled( dto.getCertificateEnabled() );

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
    public AdminCourseResponse toAdminDto(Course course) {
        if ( course == null ) {
            return null;
        }

        AdminCourseResponse.AdminCourseResponseBuilder<?, ?> adminCourseResponse = AdminCourseResponse.builder();

        adminCourseResponse.id( course.getId() );
        adminCourseResponse.name( course.getName() );
        adminCourseResponse.shortDescription( course.getShortDescription() );
        adminCourseResponse.description( course.getDescription() );
        adminCourseResponse.slug( course.getSlug() );
        adminCourseResponse.sku( course.getSku() );
        adminCourseResponse.price( course.getPrice() );
        adminCourseResponse.currency( course.getCurrency() );
        adminCourseResponse.averageRating( course.getAverageRating() );
        adminCourseResponse.ratingCount( course.getRatingCount() );
        adminCourseResponse.status( course.getStatus() );
        adminCourseResponse.publishedAt( course.getPublishedAt() );
        adminCourseResponse.createdAt( course.getCreatedAt() );
        adminCourseResponse.updatedAt( course.getUpdatedAt() );
        adminCourseResponse.createdBy( course.getCreatedBy() );
        adminCourseResponse.specialization( specializationToSpecializationResponse( course.getSpecialization() ) );
        adminCourseResponse.level( course.getLevel() );
        adminCourseResponse.contentStatus( course.getContentStatus() );
        adminCourseResponse.estimatedDurationUnit( course.getEstimatedDurationUnit() );
        adminCourseResponse.estimatedDurationValue( course.getEstimatedDurationValue() );
        adminCourseResponse.certificateEnabled( course.getCertificateEnabled() );

        return adminCourseResponse.build();
    }

    protected SpecializationResponse specializationToSpecializationResponse(Specialization specialization) {
        if ( specialization == null ) {
            return null;
        }

        SpecializationResponse.SpecializationResponseBuilder<?, ?> specializationResponse = SpecializationResponse.builder();

        specializationResponse.id( specialization.getId() );
        specializationResponse.name( specialization.getName() );
        specializationResponse.shortDescription( specialization.getShortDescription() );
        specializationResponse.description( specialization.getDescription() );
        specializationResponse.slug( specialization.getSlug() );
        specializationResponse.sku( specialization.getSku() );
        specializationResponse.price( specialization.getPrice() );
        specializationResponse.currency( specialization.getCurrency() );
        specializationResponse.averageRating( specialization.getAverageRating() );
        specializationResponse.ratingCount( specialization.getRatingCount() );
        specializationResponse.status( specialization.getStatus() );
        specializationResponse.publishedAt( specialization.getPublishedAt() );
        specializationResponse.createdAt( specialization.getCreatedAt() );
        specializationResponse.updatedAt( specialization.getUpdatedAt() );
        specializationResponse.createdBy( specialization.getCreatedBy() );
        specializationResponse.level( specialization.getLevel() );
        specializationResponse.contentStatus( specialization.getContentStatus() );
        specializationResponse.estimatedDurationUnit( specialization.getEstimatedDurationUnit() );
        specializationResponse.estimatedDurationValue( specialization.getEstimatedDurationValue() );
        specializationResponse.certificateEnabled( specialization.getCertificateEnabled() );

        return specializationResponse.build();
    }

    protected Specialization specializationResponseToSpecialization(SpecializationResponse specializationResponse) {
        if ( specializationResponse == null ) {
            return null;
        }

        Specialization.SpecializationBuilder<?, ?> specialization = Specialization.builder();

        specialization.id( specializationResponse.getId() );
        specialization.name( specializationResponse.getName() );
        specialization.shortDescription( specializationResponse.getShortDescription() );
        specialization.description( specializationResponse.getDescription() );
        specialization.slug( specializationResponse.getSlug() );
        specialization.sku( specializationResponse.getSku() );
        specialization.price( specializationResponse.getPrice() );
        specialization.currency( specializationResponse.getCurrency() );
        specialization.averageRating( specializationResponse.getAverageRating() );
        specialization.ratingCount( specializationResponse.getRatingCount() );
        specialization.status( specializationResponse.getStatus() );
        specialization.createdBy( specializationResponse.getCreatedBy() );
        specialization.createdAt( specializationResponse.getCreatedAt() );
        specialization.updatedAt( specializationResponse.getUpdatedAt() );
        specialization.publishedAt( specializationResponse.getPublishedAt() );
        specialization.level( specializationResponse.getLevel() );
        specialization.contentStatus( specializationResponse.getContentStatus() );
        specialization.estimatedDurationUnit( specializationResponse.getEstimatedDurationUnit() );
        specialization.estimatedDurationValue( specializationResponse.getEstimatedDurationValue() );
        specialization.certificateEnabled( specializationResponse.getCertificateEnabled() );

        return specialization.build();
    }
}
