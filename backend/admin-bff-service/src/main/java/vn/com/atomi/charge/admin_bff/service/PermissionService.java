package vn.com.atomi.charge.admin_bff.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import vn.com.atomi.charge.base.model.response.BaseResponse;
import vn.com.atomi.charge.base.model.enums.BaseErrorCode;
import vn.com.atomi.charge.base.model.request.BaseRequest;
import vn.com.atomi.charge.admin_bff.client.AuthorizationClient;
import vn.com.atomi.charge.admin_bff.dto.PermissionDto;

import java.util.List;


import java.util.UUID;

import org.springframework.data.domain.Page;
import vn.com.atomi.charge.base.util.StringUtil;
@RequiredArgsConstructor
@Service
public class PermissionService {
    
    private final AuthorizationClient authorizationClient;
    private final AggregatorService<PermissionDto> aggregatorService;

    @Transactional(rollbackFor = Exception.class)
    public BaseResponse<Page<PermissionDto>> getAll() {

        BaseResponse<Page<PermissionDto>> response = new BaseResponse<>();
        
        try {
            response.setStatus(HttpStatus.OK);
            response.setData(aggregatorService.getPageData(authorizationClient.getAllpermissions()));
        } catch (Exception e) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setErrorCode(BaseErrorCode.FAILURE.getErrorCode());
            response.setMessage(StringUtil.beautyError(e));
        }
        return response;

    }

    @Transactional(rollbackFor = Exception.class)
    public BaseResponse<PermissionDto> create(BaseRequest<PermissionDto> dto) {

        BaseResponse<PermissionDto> response = new BaseResponse<>();
        
        try {
            response.setStatus(HttpStatus.OK);
            response.setData(aggregatorService.getData(authorizationClient.createPermission(dto)));
        } catch (Exception e) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setErrorCode(BaseErrorCode.FAILURE.getErrorCode());
            response.setMessage(StringUtil.beautyError(e));
        }
        return response;

    }

    @Transactional(rollbackFor = Exception.class)
    public BaseResponse<PermissionDto> update(BaseRequest<PermissionDto> dto) {

        BaseResponse<PermissionDto> response = new BaseResponse<>();
        
        try {
            response.setStatus(HttpStatus.OK);
            response.setData(aggregatorService.getData(authorizationClient.updatePermission(dto.getData().getId(), dto)));
        } catch (Exception e) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setErrorCode(BaseErrorCode.FAILURE.getErrorCode());
            response.setMessage(StringUtil.beautyError(e));
        }
        return response;

    }

    @Transactional(rollbackFor = Exception.class)
    public BaseResponse<Void> delete(UUID id) {

        BaseResponse<Void> response = new BaseResponse<>();
        try{
            authorizationClient.deletePermission(id);
            response.setStatus(HttpStatus.OK);
        }catch(Exception e){
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setErrorCode(BaseErrorCode.FAILURE.getErrorCode());
            response.setMessage(StringUtil.beautyError(e));
        }
        return response;

    }

    @Transactional(rollbackFor = Exception.class)
    public BaseResponse<Void> delete(List<UUID> ids) {

        BaseResponse<Void> response = new BaseResponse<>();
        try{
            authorizationClient.deletePermissions(ids);
            response.setStatus(HttpStatus.OK);
        }catch(Exception e){
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setErrorCode(BaseErrorCode.FAILURE.getErrorCode());
            response.setMessage(StringUtil.beautyError(e));
        }
        return response;

    }

    

    
}
