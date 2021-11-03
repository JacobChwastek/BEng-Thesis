using Dicom.Application.Responses;
using MediatR;

namespace Dicom.Application.Commands
{
    public class LoginCommand : IRequest<AuthenticationResponse>
    {
        public string UserId { get; set; }
        public string Password { get; set; }
    }
}
