using System;

namespace Dicom.Domain.Common
{
    public abstract class EntityBase : AuditableEntity
    {
        public Guid Id { get; set; }
    }
}
