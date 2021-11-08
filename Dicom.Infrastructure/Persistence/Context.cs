using Dicom.Entity.Identity;
using Dicom.Infrastructure.Common;
using Dicom.Infrastructure.EntityTypeConfiguration.Identity;
using Microsoft.EntityFrameworkCore;

namespace Dicom.Infrastructure.Persistence
{
    public class Context: DbContext
    {
        private static string GetConnectionString() => ConfigurationConstants.DBConnectionString;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
                .UseNpgsql(GetConnectionString())
                .UseSnakeCaseNamingConvention();

        protected override void OnModelCreating(ModelBuilder builder)
        {

            //users
            new UserEntityTypeConfiguration().Configure(builder.Entity<User>());

            //roles
            new RoleEntityTypeConfiguration().Configure(builder.Entity<Role>());
        }
    }
}
