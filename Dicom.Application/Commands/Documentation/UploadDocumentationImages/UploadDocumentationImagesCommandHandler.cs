using System;
using System.Threading;
using System.Threading.Tasks;
using Dicom.Application.Common.Exceptions;
using Dicom.Application.Services;
using MediatR;

namespace Dicom.Application.Commands.Documentation.UploadDocumentationImages
{
    public class UploadDocumentationImagesCommandHandler : IRequestHandler<UploadDocumentationImagesCommandRequest, UploadDocumentationImagesResponse>
    {
        private readonly IDicomService _dicomService;
        private readonly IDocumentationService _documentationService;

        public UploadDocumentationImagesCommandHandler(IDicomService dicomService,
            IDocumentationService documentationService)
        {
            _dicomService = dicomService;
            _documentationService = documentationService;
        }

        public async Task<UploadDocumentationImagesResponse> Handle(UploadDocumentationImagesCommandRequest request, CancellationToken cancellationToken)
        {
            try
            {
                if (!_dicomService.Exists(request.DicomId))
                    throw new NotFoundException();

                var documentationId =request.DocumentationId ?? await _documentationService.CreateDocumentation(request.DicomId);

                var id = await _documentationService.AddDocumentationImages(documentationId, request.DrawLayerImgBase64, request.ViewLayerImageBase64);

                return new UploadDocumentationImagesResponse()
                {
                    Id = id
                };
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}