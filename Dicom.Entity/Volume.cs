using System;
using Dicom.Entity.Common;

namespace Dicom.Entity
{
    public class Volume: AuditableEntity, IEntity
    {
        public Guid Id { get; set; }

        public string Host { get; set; }
        
        public string Path { get; set; }
    }
}
