using System;

namespace Dicom.Entity.Identity
{
    public class User : IEntity
    {
        public Guid Id { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public string Role { get; set; }
    }
}
