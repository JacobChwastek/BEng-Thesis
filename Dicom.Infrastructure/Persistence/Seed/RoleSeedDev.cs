using System;
using System.Collections.Generic;
using Dicom.Entity.Identity;

namespace Dicom.Infrastructure.Persistence.Seed
{
    public class RoleSeedDev
    {
        public static readonly Role[] RoleSeed = new[]
        {
            new Role()
            {
                Id = new Guid("94af0035-4e04-4954-87cc-e0be6e3205a2"),
                Name = "Admin",
                Users = new List<User>()
            },
            new Role()
            {
                Id = new Guid("60242c1e-0048-48fc-84bd-e42f708f1b46"),
                Name = "User",
                Users = new List<User>()
            }
        };
    }
}
