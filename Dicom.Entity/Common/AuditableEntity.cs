using System;

namespace Dicom.Entity.Common
{
    public abstract class AuditableEntity
    {

        public DateTime CreatedAt { get; set; }

        public DateTime? LastModifiedAt { get; set; }
    }
}
