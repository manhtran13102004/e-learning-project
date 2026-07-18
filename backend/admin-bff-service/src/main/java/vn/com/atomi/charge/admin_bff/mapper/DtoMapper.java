package vn.com.atomi.charge.admin_bff.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import java.util.List;

/**
 * Interface cơ sở cho việc mapping giữa DTO nhận từ các Service con (Client DTO)
 * và DTO trả ra ngoài cho Frontend (BFF Response/Request DTO).
 * 
 * @param <C> Client DTO (Dữ liệu từ Service nội bộ)
 * @param <R> Response DTO (Dữ liệu trả về cho Frontend)
 */
public interface DtoMapper<C, R> {

    R toResponse(C clientDto);

    C toClientDto(R responseDto);

    List<R> toResponse(List<C> clientDtoList);

    List<C> toClientDto(List<R> responseDtoList);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromResponse(R responseDto, @MappingTarget C clientDto);
}