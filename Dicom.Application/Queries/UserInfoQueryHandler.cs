using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Dicom.Application.Common.Interfaces;
using Dicom.Application.Responses;
using Dicom.Domain.Entities;
using MediatR;

namespace Dicom.Application.Queries
{
    public class UserInfoQueryHandler : IRequestHandler<UserInfoQuery, UserInfoQueryResponse>
    {
        private readonly IIdentity _identity;
        private readonly IMapper _mapper;

        public UserInfoQueryHandler(IIdentity identity, IMapper mapper)
        {
            _identity = identity;
            _mapper = mapper;
        }

        public async Task<UserInfoQueryResponse> Handle(UserInfoQuery request, CancellationToken cancellationToken)
        {
            /* Just for testing only**/
            var result = await _identity.FindUserByIdAsync(request.UserId);
            return result != null ? _mapper.Map<User, UserInfoQueryResponse>(result) : new UserInfoQueryResponse();
        }
    }
}
