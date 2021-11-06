using System;
using Dicom.Application.Responses;
using MediatR;

namespace Dicom.Application.Commands
{
    public class CreateUserCommand : IRequest<AuthenticationResponse>
    {
        public Guid UserId { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
