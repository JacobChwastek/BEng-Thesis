using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Dicom.Application.Services;
using MediatR;

namespace Dicom.Application.Commands.Dicom.UploadDicom
{

    public class UploadDicomCommandHandler : IRequestHandler<UploadDicomCommand, UploadDicomResponse>
    {
        private readonly IDicomService _dicomService;

        public UploadDicomCommandHandler(IDicomService dicomService)
        {
            _dicomService = dicomService;
        }

        public async Task<UploadDicomResponse> Handle(UploadDicomCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var dicomId = await _dicomService.SaveDicom(request.File, request.UserId);

                return new UploadDicomResponse()
                {
                    Id = dicomId
                };
            }
            catch (Exception e)
            {
                throw new HttpRequestException("Unable to save dicom file", e, HttpStatusCode.BadRequest);
            }
        }
    }
}
