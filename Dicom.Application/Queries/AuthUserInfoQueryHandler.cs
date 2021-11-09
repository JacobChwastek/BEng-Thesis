using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Dicom.Application.DTO;
using Dicom.Application.Responses;
using Dicom.Entity.Identity;
using Dicom.Infrastructure.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Dicom.Application.Queries
{
    public class AuthUserInfoQueryHandler : IRequestHandler<AuthUserInfoQuery, AuthUserInfoResponse>
    {
        private readonly DicomRepositories _dal;
        private readonly IMapper _mapper;

        public AuthUserInfoQueryHandler(DicomRepositories dal, IMapper mapper)
        {
            _dal = dal;
            _mapper = mapper;
        }

        public async Task<AuthUserInfoResponse> Handle(AuthUserInfoQuery request, CancellationToken cancellationToken)
        {
            var result = await _dal.UserRepositoryAsync
                .GetQuerable()
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Id == request.UserId, cancellationToken: cancellationToken);

            if (result == null)
                return new AuthUserInfoResponse();

            var role = _mapper.Map<Role, RoleDto>(result.Role);
            var user = _mapper.Map<User, UserDto>(result);

            user.Role = role;

            return new AuthUserInfoResponse()
            {
                User = user,
                Id = result.Id
            };
        }
    }
}
