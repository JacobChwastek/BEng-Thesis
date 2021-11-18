using Dicom.Entity;
using Dicom.Infrastructure.Persistence.Seed;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dicom.Infrastructure.EntityTypeConfiguration
{
    public class VolumeEntityTypeConfiguration : IEntityTypeConfiguration<Volume>
    {
        public void Configure(EntityTypeBuilder<Volume> builder)
        {
            builder.ToTable("volumes");

            builder.HasKey(x => x.Id);

            builder
                .Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder
                .Property(x => x.Path)
                .IsRequired()
                .HasMaxLength(100);

            builder.HasData(VolumeSeedDev.VolumeSeed);
        }
    }
}
