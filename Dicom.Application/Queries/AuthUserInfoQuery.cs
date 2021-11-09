using System;
using Dicom.Application.Responses;
using MediatR;

namespace Dicom.Application.Queries
{
    public class AuthUserInfoQuery : IRequest<AuthUserInfoResponse>
    {
        public Guid UserId { get; set; }
    }
}
