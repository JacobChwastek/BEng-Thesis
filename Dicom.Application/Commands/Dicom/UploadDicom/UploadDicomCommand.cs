using MediatR;
using Microsoft.AspNetCore.Http;

namespace Dicom.Application.Commands.Dicom.UploadDicom
{
    public class UploadDicomCommand: IRequest
    {
        public IFormFile File { get; set; }
    }
}
