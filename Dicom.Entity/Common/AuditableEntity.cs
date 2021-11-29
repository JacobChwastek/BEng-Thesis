using System;

namespace Dicom.Entity.Common
{
    public class AuditableEntity
    {

        public DateTime CreatedAt { get; set; }

        public DateTime? LastModifiedAt { get; set; }
    }


    public interface IDeletableEntity
    {
        public bool Deleted { get; set; }

        public DateTime? DeletedAt { get; set; }
        
    }
}
