using Dicom.Application.Responses;
using MediatR;

namespace Dicom.Application.Queries
{
    public class UserInfoQuery : IRequest<UserInfoQueryResponse>
    {
        public string UserId { get; set; }
    }
}
