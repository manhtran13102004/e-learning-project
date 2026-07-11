package vn.com.atomi.charge.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import vn.com.atomi.charge.dto.response.BaseResponse;
import vn.com.atomi.charge.dto.response.FileMetadataResponse;
import vn.com.atomi.charge.entity.FileMetadata;
import vn.com.atomi.charge.service.FileService;

@RestController
@RequestMapping("api/admin/files")
public class AdminFileController {

    private final FileService fileService;

    public AdminFileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping
    public ResponseEntity<BaseResponse<FileMetadataResponse>> uploadFile(@RequestParam("file") MultipartFile file) {
        FileMetadata fileMetadata = fileService.uploadFile(file);

        BaseResponse<FileMetadataResponse> response = BaseResponse.<FileMetadataResponse>builder()
                .code(201)
                .message("Upload file thành công")
                .result(fileService.toResponse(fileMetadata))
                .build();
        return ResponseEntity.status(201).body(response);
    }
}
