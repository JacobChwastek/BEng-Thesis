using Dicom.Entity.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dicom.Infrastructure.EntityTypeConfiguration.Identity
{
    public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("users");

            builder.HasKey(x => x.Id);

            builder.HasIndex(x => x.Email).IsUnique();

            builder.Property(x => x.Password).HasMaxLength(200);
            
            builder.Property(x => x.Email).HasMaxLength(40);

            builder.Property(x => x.FirstName).HasMaxLength(40);
            
            builder.Property(x => x.LastName).HasMaxLength(40);            
            
            builder.Property(x => x.PhoneNumber).HasMaxLength(40);

            builder
                .HasOne(x => x.Role)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.RoleId);
        }
    }
}
