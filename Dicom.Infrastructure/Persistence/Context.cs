using Dicom.Infrastructure.Common;
using Microsoft.EntityFrameworkCore;

namespace Dicom.Infrastructure.Persistence
{
    public class Context: DbContext
    {
        private string GetConnectionString() => ConfigurationConstants.DBConnectionString;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql(GetConnectionString());

        protected override void OnModelCreating(ModelBuilder builder)
        {
        }
    }
}
