using Dicom.Entity.Dicom;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dicom.Infrastructure.EntityTypeConfiguration.Dicom
{
    public class DocumentationImageTypeConfiguration: IEntityTypeConfiguration<DocumentationImage>
    {
        public void Configure(EntityTypeBuilder<DocumentationImage> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.DrawLayerImage).IsRequired();
            
            builder.Property(x => x.ViewLayerImage).IsRequired();
            
        }
    }
}