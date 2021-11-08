using System;
using System.Collections.Generic;
using Dicom.Entity;
using Dicom.Entity.Identity;
using Dicom.Infrastructure.Persistence;

namespace Dicom.Infrastructure.Repositories
{
    public abstract class DAL
    {
        private readonly Context _context = null;

        protected DAL()
        {
            this._context = new Context();
        }

        private readonly Dictionary<Type, object> _genericRepos = new();

        public GenericRepositoryAsync<T> RepositoryAsync<T>() where T : class, IEntity
        {
            if (!_genericRepos.TryGetValue(typeof(T), out object result))
            {
                result = new GenericRepositoryAsync<T>(_context);
                _genericRepos.Add(typeof(T), result);
            }
            return result as GenericRepositoryAsync<T>;
        }
    }

    public class DicomRepositories: DAL
    {
        public DicomRepositories() : base()
        {

        }
        public GenericRepositoryAsync<User> UserRepositoryAsync => base.RepositoryAsync<User>();
        public GenericRepositoryAsync<Role> RoleRepositoryAsync => base.RepositoryAsync<Role>();
    }
}
