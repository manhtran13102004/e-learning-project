package vn.com.atomi.charge.admin_bff.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.com.atomi.charge.admin_bff.service.PermissionService;
import vn.com.atomi.charge.base.model.request.BaseRequest;
import vn.com.atomi.charge.base.model.response.BaseResponse;
import vn.com.atomi.charge.admin_bff.dto.PermissionDto;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/permissions")
@RequiredArgsConstructor

public class PermissionController {
    
    
    private final PermissionService permissionService;
    
    @GetMapping()
    public ResponseEntity<BaseResponse<Page<PermissionDto>>> getAll() {
        return ResponseEntity.ok(permissionService.getAll());
    }

    @PostMapping()
    public ResponseEntity<BaseResponse<PermissionDto>> create(@RequestBody BaseRequest<PermissionDto> dto) {
        return ResponseEntity.ok(permissionService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse<PermissionDto>> update(@PathVariable("id") UUID id, @RequestBody BaseRequest<PermissionDto> dto) {
        dto.getData().setId(id);
        return ResponseEntity.ok(permissionService.update(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse<Void>> delete(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(permissionService.delete(id));
    }

    @DeleteMapping
    public ResponseEntity<BaseResponse<Void>> delete(@RequestBody List<UUID> ids) {
        return ResponseEntity.ok(permissionService.delete(ids));
    }

    
    
}
