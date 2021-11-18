using System.Threading;
using System.Threading.Tasks;
using Dicom.Application.Common.Interfaces;
using Dicom.Application.Responses;
using MediatR;

namespace Dicom.Application.Commands.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, AuthenticationResponse>
    {
        private readonly IAuthentication _authentication;
        
        public CreateUserCommandHandler(IAuthentication authentication) => _authentication = authentication;

        public async Task<AuthenticationResponse> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            return await _authentication.RegisterAsync(request);
        }
    }
}
