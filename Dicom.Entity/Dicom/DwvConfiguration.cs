using System;
using System.ComponentModel.DataAnnotations.Schema;
using Dicom.Entity.Common;

namespace Dicom.Entity.Dicom
{
    public class DwvConfiguration : AuditableEntity, IEntity
    {
        public Guid Id { get; set; }

        public string Configuration { get; set; }

        public Dicom Dicom { get; set; }

        public Guid? DicomId { get; set; }
    }
}
