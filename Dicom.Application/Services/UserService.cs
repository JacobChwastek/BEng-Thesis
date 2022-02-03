using Dicom.Entity.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dicom.Infrastructure.Repositories;

namespace Dicom.Application.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetUsers();
    }

    public class UserService : IUserService
    {
        private readonly DicomRepositories _dal;

        public UserService(DicomRepositories dal)
        {
            _dal = dal;
        }

        public async Task<IEnumerable<User>> GetUsers() => await _dal.UserRepositoryAsync.GetAllAsync();
        
    }
}
