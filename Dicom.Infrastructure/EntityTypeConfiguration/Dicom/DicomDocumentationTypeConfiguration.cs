using Dicom.Entity.Dicom;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dicom.Infrastructure.EntityTypeConfiguration.Dicom
{
    public class DicomDocumentationTypeConfiguration: IEntityTypeConfiguration<DicomDocumentation>
    {
        public void Configure(EntityTypeBuilder<DicomDocumentation> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder
                .HasMany(x => x.DocumentationImages)
                .WithOne(x => x.DicomDocumentation)
                .HasForeignKey(x => x.DicomDocumentationId);

            builder.Property(x => x.DeletedAt);

        }
    }
}