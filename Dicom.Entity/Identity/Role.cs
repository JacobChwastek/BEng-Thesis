using System;
using System.Collections.Generic;
using Dicom.Entity.Common;

namespace Dicom.Entity.Identity
{
    public class Role : AuditableEntity, IEntity
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public ICollection<User> Users { get; set; }
    }

    public static class RoleNames
    {
        public static string Admin = "Admin";

        public static string User = "User";
    }
}
