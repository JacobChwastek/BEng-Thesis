using System.Threading.Tasks;

namespace Dicom.Infrastructure.Persistence
{
    public interface IUnitOfWork
    {
        Task SaveChangesAsync();
        void SaveChanges();
    }
}
