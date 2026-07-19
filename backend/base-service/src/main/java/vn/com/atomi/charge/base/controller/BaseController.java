package vn.com.atomi.charge.base.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.com.atomi.charge.base.model.dto.BaseDto;
import vn.com.atomi.charge.base.model.request.BaseRequest;
import vn.com.atomi.charge.base.model.response.BaseResponse;
import vn.com.atomi.charge.base.service.IBaseService;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Validated
public abstract class BaseController<S extends IBaseService<?, D, ?, ?, ID>, D extends BaseDto<ID>, ID extends Serializable> {

  @Autowired
  protected S service;

  @GetMapping
  public ResponseEntity<?> getAll(@RequestParam Map<String, String> params, Pageable pageable) {
    BaseResponse<Page<D>> dtos = service.getAll(params, pageable);
    return ResponseEntity.ok(dtos);
  }

  @GetMapping(value = {"/{id}"})
  public ResponseEntity<?> getDetails(@PathVariable("id") ID id) {
    BaseResponse<D> dto = service.getDetails(id);
    return ResponseEntity.ok(dto);
  }

  @PostMapping
  @Validated(BaseDto.Create.class)
  public ResponseEntity<?> create(@RequestBody @Valid BaseRequest<D> dto) {
    return ResponseEntity.ok(service.create(dto));
  }

  @Validated(BaseDto.Update.class)
  @PostMapping(value = {"/{id}"})
  public ResponseEntity<?> update(@RequestBody @Valid BaseRequest<D> dto,
                                  @PathVariable ID id) {
    dto.getData().setId(id);
    return ResponseEntity.ok(service.update(dto));
  }

  @DeleteMapping(value = {"/{id}"})
  public ResponseEntity<?> delete(@PathVariable ID id) {
    return ResponseEntity.ok(service.delete(id));
  }

  @DeleteMapping
  public ResponseEntity<?> deleteMany(@RequestBody List<ID> ids) {
    return ResponseEntity.ok(service.delete(ids));
  }
}
