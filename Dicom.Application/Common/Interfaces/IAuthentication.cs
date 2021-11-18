using System.Threading.Tasks;
using Dicom.Application.Commands.CreateUser;
using Dicom.Application.Commands.Login;
using Dicom.Application.Responses;

namespace Dicom.Application.Common.Interfaces
{
    public interface IAuthentication
    {
        Task<AuthenticationResponse> LoginAsync(LoginCommand user);
        Task<AuthenticationResponse> RegisterAsync(CreateUserCommand user);
    }
}
