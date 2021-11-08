using System.Threading.Tasks;

namespace Dicom.Infrastructure.Persistence
{
    public interface IUnitOfWork
    {
        Task<int> SaveChangesAsync();
        void SaveChanges();
    }
}
