using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dicom.Entity;
using Dicom.Entity.Dicom;
using Dicom.Entity.Identity;
using Dicom.Infrastructure.Persistence;

namespace Dicom.Infrastructure.Repositories
{
    public abstract class DAL
    {
        private readonly Context _context = null;

        protected DAL()
        {
            _context = new Context();
        }

        private readonly Dictionary<Type, object> _genericRepos = new();

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        protected GenericRepositoryAsync<T> RepositoryAsync<T>() where T : class, IEntity
        {
            if (_genericRepos.TryGetValue(typeof(T), out var result)) 
                return result as GenericRepositoryAsync<T>;
            
            result = new GenericRepositoryAsync<T>(_context);
            _genericRepos.Add(typeof(T), result);
            return result as GenericRepositoryAsync<T>;
        }
    }

    public class DicomRepositories: DAL
    {
        public GenericRepositoryAsync<User> UserRepositoryAsync => RepositoryAsync<User>();
        public GenericRepositoryAsync<Role> RoleRepositoryAsync => RepositoryAsync<Role>();
        public GenericRepositoryAsync<Entity.Dicom.Dicom> DicomRepositoryAsync => RepositoryAsync<Entity.Dicom.Dicom>();
        public GenericRepositoryAsync<Volume> VolumeRepositoryAsync => RepositoryAsync<Volume>();
        public GenericRepositoryAsync<DwvConfiguration> DwvConfigurationAsync => RepositoryAsync<DwvConfiguration>();
        public GenericRepositoryAsync<DicomDocumentation> DicomDocumentationRepositoryAsync => RepositoryAsync<DicomDocumentation>();
        public GenericRepositoryAsync<DocumentationImage> DocumentationImageRepositoryAsync => RepositoryAsync<DocumentationImage>();
    }
}
