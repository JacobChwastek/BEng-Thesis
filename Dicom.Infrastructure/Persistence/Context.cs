using Dicom.Entity;
using Dicom.Entity.Dicom;
using Dicom.Entity.Identity;
using Dicom.Infrastructure.Common;
using Dicom.Infrastructure.EntityTypeConfiguration;
using Dicom.Infrastructure.EntityTypeConfiguration.Dicom;
using Dicom.Infrastructure.EntityTypeConfiguration.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;

namespace Dicom.Infrastructure.Persistence
{
    public class Context: DbContext
    {
        // private static string GetConnectionString() => ConfigurationConstants.DbConnectionString;
        private static string GetConnectionString() =>
            "Host=localhost;Database=dicom;Username=postgres;Password=password;";

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

            //volumes
            new VolumeEntityTypeConfiguration().Configure(builder.Entity<Volume>());

            //dicom
            new DicomEntityTypeConfiguration().Configure(builder.Entity<Entity.Dicom.Dicom>());

            //dwvConfiguration
            new DwvConfigurationEntityTypeConfiguration().Configure(builder.Entity<DwvConfiguration>());
        }


        public DbSet<Volume> Volumes { get; set; }
        public DbSet<DwvConfiguration> DwvConfigurations { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
    }
}
