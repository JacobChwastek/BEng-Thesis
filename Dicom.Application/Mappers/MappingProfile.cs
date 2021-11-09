using AutoMapper;
using Dicom.Application.DTO;
using Dicom.Entity.Identity;

namespace Dicom.Application.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Role, RoleDto>().ReverseMap();
            CreateMap<User, UserDto>().ForMember(x => x.Role, y => y.Ignore());

        }
    }
}
