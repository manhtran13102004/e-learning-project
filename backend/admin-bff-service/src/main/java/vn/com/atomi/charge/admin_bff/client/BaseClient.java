package vn.com.atomi.charge.admin_bff.client;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import vn.com.atomi.charge.base.model.response.BaseResponse;

public interface BaseClient<D> {
    
    @GetMapping("/{id}")
    ResponseEntity<BaseResponse<D>> getDetails(@PathVariable("id") String id);
}