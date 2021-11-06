using System;

namespace Dicom.Entity.Identity
{
    public class Role : IEntity
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
    }
}
