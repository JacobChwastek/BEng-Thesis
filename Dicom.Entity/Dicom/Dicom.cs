using System;
using System.Collections.Generic;
using Dicom.Entity.Common;
using Dicom.Entity.Identity;

namespace Dicom.Entity.Dicom
{
    public class Dicom : AuditableEntity, IEntity, IDeletableEntity
    {
        public Guid Id { get; set; }

        public string FileName { get; set; }

        public long FileSize { get; set; }

        public string Path { get; set; }

        #region IDeletable

        public bool Deleted { get; set; }

        public DateTime? DeletedAt { get; set; }

        #endregion


        public User User { get; set; }

        public Guid UserId { get; set; }
        
        public ICollection<DwvConfiguration> DwvConfigurations { get; set; }
    }
}