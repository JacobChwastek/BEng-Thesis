using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dicom.Infrastructure.EntityTypeConfiguration.Dicom
{
    public class DicomEntityTypeConfiguration : IEntityTypeConfiguration<Entity.Dicom.Dicom>
    {
        public void Configure(EntityTypeBuilder<Entity.Dicom.Dicom> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder
                .Property(x => x.FileName)
                .IsRequired()
                .HasMaxLength(100);

            builder
                .Property(x => x.FileSize)
                .IsRequired();

            builder
                .HasMany(x => x.DwvConfigurations)
                .WithOne(x => x.Dicom)
                .HasForeignKey(x => x.DicomId);

            builder.Property(x => x.UserId).IsRequired();
            
            builder.HasOne(x => x.User)
                .WithMany(x => x.Dicoms)
                .HasForeignKey(x => x.UserId);
        }
    }
}
