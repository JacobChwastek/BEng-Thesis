using System;
using System.Threading;
using System.Threading.Tasks;
using Dicom.Application.Services;
using MediatR;

namespace Dicom.Application.Commands.Documentation.Generate
{
    public class GenerateDocumentationCommandHandler : IRequestHandler<GenerateDocumentationCommand, GenerateDocumentationResponse>
    {
        private readonly IPdfService _pdfService;

        public GenerateDocumentationCommandHandler(IPdfService pdfService)
        {
            _pdfService = pdfService;
        }

        public async Task<GenerateDocumentationResponse> Handle(GenerateDocumentationCommand request, CancellationToken cancellationToken)
        {
            var result = await _pdfService.GeneratePdf();
            return new GenerateDocumentationResponse()
            {
                FileContentResult = result
            };
        }
    }
}