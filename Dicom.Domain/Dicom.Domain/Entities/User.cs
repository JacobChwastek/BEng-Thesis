using Dicom.Domain.Common;

namespace Dicom.Domain.Entities
{
    public class User : EntityBase
    {
        public string Id { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public string Role { get; set; }
    }
}
