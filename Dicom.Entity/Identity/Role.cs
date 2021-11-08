using System;
using System.Collections.Generic;

namespace Dicom.Entity.Identity
{
    public class Role : IEntity
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public ICollection<User> Users { get; set; }
    }
}
