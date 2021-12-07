using System;
using System.Threading;
using System.Threading.Tasks;
using Dicom.Application.Services;
using MediatR;

namespace Dicom.Application.Queries.Documentation.GetDocumentationImage
{
    public class GetDocumentationImageQueryHandler: IRequestHandler<GetDocumentationImageQueryRequest, GetDocumentationImageResponse>
    {
        private readonly IDocumentationService _documentationService;
        private readonly IFileService _fileService;

        public GetDocumentationImageQueryHandler(IDocumentationService documentationService, IFileService fileService)
        {
            _documentationService = documentationService;
            _fileService = fileService;
        }

        public async Task<GetDocumentationImageResponse> Handle(GetDocumentationImageQueryRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var (id, type) = request;
                var xd = await _documentationService.GetDocumentationImage(id, type);

                var file = await _fileService.GetFileAsync(xd);
                
                return new GetDocumentationImageResponse()
                {
                    File = file
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