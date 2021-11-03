using System.Threading.Tasks;
using Dicom.Application.Common.Interfaces;
using Dicom.Domain.Entities;
using Dicom.Infrastructure.Persistence;

namespace Dicom.Infrastructure.Repositories
{
    public class UserRepository: IIdentity
    {
        private readonly Context _context;

        public UserRepository(Context context)
        {
            _context = context;
        }

        public Task<User> FindUserByIdAsync(string userId)
        {
            return default;
        }

        public Task<bool> CreateUserAsync(User user)
        {
            throw new System.NotImplementedException();
        }
    }
}
