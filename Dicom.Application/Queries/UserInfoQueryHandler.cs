using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Dicom.Application.Responses;
using Dicom.Entity.Identity;
using Dicom.Infrastructure.Repositories;
using MediatR;

namespace Dicom.Application.Queries
{
    public class UserInfoQueryHandler : IRequestHandler<UserInfoQuery, UserInfoQueryResponse>
    {
        private readonly DicomRepositories _dal;
        private readonly IMapper _mapper;

        public UserInfoQueryHandler(IMapper mapper, DicomRepositories dal)
        {
            _mapper = mapper;
            _dal = dal;
        }

        public async Task<UserInfoQueryResponse> Handle(UserInfoQuery request, CancellationToken cancellationToken)
        {
            var result = await _dal.UserRepositoryAsync.GetByIDAsync(request.UserId);

            return result != null ? _mapper.Map<User, UserInfoQueryResponse>(result) : new UserInfoQueryResponse();
        }
    }
}
