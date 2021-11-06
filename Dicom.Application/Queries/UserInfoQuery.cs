using System;
using Dicom.Application.Responses;
using MediatR;

namespace Dicom.Application.Queries
{
    public class UserInfoQuery : IRequest<UserInfoQueryResponse>
    {
        public Guid UserId { get; set; }
    }
}
