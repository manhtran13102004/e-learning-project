package vn.com.atomi.charge.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import vn.com.atomi.charge.dto.request.CreateCourseRequest;
import vn.com.atomi.charge.dto.request.UpdateCourseRequest;
import vn.com.atomi.charge.dto.response.BaseResponse;
import vn.com.atomi.charge.dto.response.CourseResponse;
import vn.com.atomi.charge.service.CourseService;
import vn.com.atomi.charge.dto.request.CourseSearchRequest;
import vn.com.atomi.charge.dto.response.CourseResponse;

@RestController
@RequestMapping("api//courses")
public class CourseController {

    private final CourseService CourseService;

    public CourseController(CourseService CourseService) {
        this.CourseService = CourseService;
    }

    @GetMapping
    public ResponseEntity<BaseResponse<List<CourseResponse>>> getAll() {
        BaseResponse<List<CourseResponse>> response = BaseResponse.<List<CourseResponse>>builder()
                .code(200)
                .message("OK")
                .result(CourseService.getAll())
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/page")
    public ResponseEntity<BaseResponse<Page<CourseResponse>>> getAllWithPagination(Pageable pageable) {
        BaseResponse<Page<CourseResponse>> response = BaseResponse.<Page<CourseResponse>>builder()
                .code(200)
                .message("OK")
                .result(CourseService.getAllWithPagination(pageable))
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<BaseResponse<Page<CourseResponse>>> search(
        @ModelAttribute @Valid CourseSearchRequest request, 
        Pageable pageable
        ) {
            BaseResponse<Page<CourseResponse>> response = BaseResponse.<Page<CourseResponse>>builder()
                    .code(200)
                    .message("OK")
                    .result(CourseService.search(request, pageable))
                    .build();
            return ResponseEntity.ok(response);
        }

    @PostMapping
    public ResponseEntity<BaseResponse<CourseResponse>> createCourse(@Valid @RequestBody CreateCourseRequest request) {
        BaseResponse<CourseResponse> response = BaseResponse.<CourseResponse>builder()
                .code(201)
                .message("Tạo khóa học thành công")
                .result(CourseService.createCourse(request))
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("{id}")
    public ResponseEntity<BaseResponse<CourseResponse>> updateCourse(@PathVariable Long id,
                                                                      @RequestBody @Valid UpdateCourseRequest request) {
        BaseResponse<CourseResponse> response = BaseResponse.<CourseResponse>builder()
                .code(200)
                .message("Cập nhật khóa học thành công")
                .result(CourseService.updateCourse(id, request))
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<BaseResponse<Void>> deleteCourse(@PathVariable Long id) {
        CourseService.deleteCourse(id);
        BaseResponse<Void> response = BaseResponse.<Void>builder()
                .code(200)
                .message("Xóa khóa học thành công")
                .build();
        return ResponseEntity.ok(response);
    }
}
