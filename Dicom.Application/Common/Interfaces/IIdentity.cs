using System.Threading.Tasks;
using Dicom.Domain.Entities;

namespace Dicom.Application.Common.Interfaces
{
    public interface IIdentity
    {
        Task<User> FindUserByIdAsync(string userId);
        Task<bool> CreateUserAsync(User user);
    }
}
