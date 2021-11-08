using Dicom.Entity.Identity;
using Dicom.Infrastructure.Common;
using Dicom.Infrastructure.EntityTypeConfiguration.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;

namespace Dicom.Infrastructure.Persistence
{
    public class Context: DbContext
    {
        private static string GetConnectionString() => ConfigurationConstants.DBConnectionString;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
                .UseNpgsql(GetConnectionString())
                .UseLoggerFactory(LoggerFactory.Create(builder => builder.AddConsole()))
                .UseSnakeCaseNamingConvention();

        protected override void OnModelCreating(ModelBuilder builder)
        {

            //users
            new UserEntityTypeConfiguration().Configure(builder.Entity<User>());

            //roles
            new RoleEntityTypeConfiguration().Configure(builder.Entity<Role>());
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
    }
}
