using System;
using MediatR;

namespace Dicom.Application.Commands.Documentation.UploadDocumentationImages
{
    public class UploadDocumentationImagesCommandRequest: IRequest<UploadDocumentationImagesResponse>
    {
        public Guid? DocumentationId { get; set; }
        
        public Guid DicomId { get; set; }

        public string DrawLayerImgBase64 { get; set; }

        public string ViewLayerImageBase64 { get; set; }
    }
}