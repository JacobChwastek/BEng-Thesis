using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Dicom.Application.Services;
using MediatR;

namespace Dicom.Application.Commands.Dicom.UploadDicom
{

    public class UploadDicomCommandHandler : IRequestHandler<UploadDicomCommand>
    {
        private readonly IDicomService _dicomService;

        public UploadDicomCommandHandler(IDicomService dicomService)
        {
            _dicomService = dicomService;
        }

        public async Task<Unit> Handle(UploadDicomCommand request, CancellationToken cancellationToken)
        {

            await _dicomService.SaveDicom(request.File);

            return new Unit();
        }
    }
}
