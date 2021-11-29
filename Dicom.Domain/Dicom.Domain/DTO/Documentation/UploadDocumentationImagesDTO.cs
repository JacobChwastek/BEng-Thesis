using System;

namespace Dicom.Domain.DTO.Documentation
{
    public class UploadDocumentationImagesDto
    {
        public Guid DicomId { get; set; }

        public string DrawLayerImgBase64 { get; set; }

        public string ViewLayerImageBase64 { get; set; }
    }
}