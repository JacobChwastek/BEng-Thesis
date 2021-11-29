using System;
using System.Collections.Generic;
using Dicom.Entity.Common;

namespace Dicom.Entity.Dicom
{
    public class DicomDocumentation : AuditableEntity, IEntity, IDeletableEntity
    {
        public Guid Id { get; set; }
        
        public Dicom Dicom { get; set; }
        
        public Guid DicomId { get; set; }

        public ICollection<DocumentationImage> DocumentationImages { get; set; }
        
        #region Deletable

        public bool Deleted { get; set; }

        public DateTime? DeletedAt { get; set; }

        #endregion
    }
}