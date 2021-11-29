using Dicom.Entity.Dicom;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dicom.Infrastructure.EntityTypeConfiguration.Dicom
{
    public class DwvConfigurationEntityTypeConfiguration : IEntityTypeConfiguration<DwvConfiguration>
    {
        public void Configure(EntityTypeBuilder<DwvConfiguration> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Configuration).IsRequired();
        }
    }
}
