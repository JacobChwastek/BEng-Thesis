using System;
using Dicom.Entity.Common;

namespace Dicom.Entity.Identity
{
    public class User : AuditableEntity, IEntity
    {
        public Guid Id { get; set; }

        public string Password { get; set; }

        public string Salt { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        public Role Role { get; set; }

        public Guid RoleId { get; set; }
    }
}
