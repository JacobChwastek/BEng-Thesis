using System;

namespace Dicom.Application.DTO
{
    public class UserDto
    {
        public Guid Id { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        public RoleDto Role { get; set; }
    }
};
