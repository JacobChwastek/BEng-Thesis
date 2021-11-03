using System.Threading;
using System.Threading.Tasks;
using Dicom.Application.Common.Interfaces;
using Dicom.Application.Responses;
using MediatR;

namespace Dicom.Application.Commands
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, AuthenticationResponse>
    {
        private readonly IAuthentication _authentication;
        public LoginCommandHandler(IAuthentication authentication) => _authentication = authentication;

        public async Task<AuthenticationResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            return await _authentication.LoginAsync(request);
        }
    }
}
