using System;
using System.Threading;
using System.Threading.Tasks;
using Dicom.Application.Common.Exceptions;
using Dicom.Application.Services;
using MediatR;

namespace Dicom.Application.Commands.Dicom.RemoveDicom
{
    public class RemoveDicomCommandHandler : IRequestHandler<RemoveDicomCommandRequest>
    {
        private readonly IDicomService _dicomService;

        public RemoveDicomCommandHandler(IDicomService dicomService)
        {
            _dicomService = dicomService;
        }

        public async Task<Unit> Handle(RemoveDicomCommandRequest request, CancellationToken cancellationToken)
        {
            try
            {
                await _dicomService.RemoveDicomAsync(request.Id);
                
                return Unit.Value;
            }
            catch (Exception e)
            {
                throw new NotFoundException();
            }
        }
    }
}