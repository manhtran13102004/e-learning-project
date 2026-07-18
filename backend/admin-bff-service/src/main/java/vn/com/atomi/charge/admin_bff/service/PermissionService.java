package vn.com.atomi.charge.admin_bff.service;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import vn.com.atomi.charge.base.model.response.BaseResponse;
import vn.com.atomi.charge.base.model.request.BaseRequest;
import vn.com.atomi.charge.admin_bff.client.AuthorizationClient;
import vn.com.atomi.charge.admin_bff.dto.PermissionDto;

@RequiredArgsConstructor
@Service
public class PermissionService {
    
    private final AuthorizationClient authorizationClient;
    private final AggregatorService<PermissionDto> aggregatorService;

    @Transactional(rollbackFor = Exception.class)
    public BaseResponse<PermissionDto> create(BaseRequest<PermissionDto> dto) {

        return aggregatorService.getData(authorizationClient.createpermission(null))

    }

    
}
