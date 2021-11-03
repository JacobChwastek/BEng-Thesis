using System;

namespace Dicom.Entity
{
    public interface IEntity
    {
        Guid Id { get; set; }
    }
}
