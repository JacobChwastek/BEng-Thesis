using System;
using Dicom.Entity.Common;

namespace Dicom.Entity.Dicom
{
    public class DocumentationImage : AuditableEntity, IEntity
    {
        public Guid Id { get; set; }

        public string ViewLayerImage { get; set; }

        public string DrawLayerImage { get; set; }


        public DicomDocumentation DicomDocumentation { get; set; }

        public Guid? DicomDocumentationId { get; set; }
        
    }
}