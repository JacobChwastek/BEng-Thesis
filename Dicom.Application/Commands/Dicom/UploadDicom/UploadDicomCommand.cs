using System;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Dicom.Application.Commands.Dicom.UploadDicom
{
    public class UploadDicomCommand: IRequest<UploadDicomResponse>
    {
        public IFormFile File { get; set; }
        public Guid UserId { get; set; }
    }
}
