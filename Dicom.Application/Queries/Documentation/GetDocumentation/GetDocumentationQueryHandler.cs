using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Dicom.Application.Services;
using Dicom.Domain.DicomModel.Html;
using Dicom.Infrastructure.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Dicom.Application.Queries.Documentation.GetDocumentation
{
    public class GetDocumentationQueryHandler: IRequestHandler<GetDocumentationQuery, GetDocumentationQueryResponse>
    {
        private readonly IDocumentationService _documentationService;
        private readonly IFileService _fileService;
        private readonly IDicomService _dicomService;
        private readonly DicomRepositories _dal;
        private readonly IPdfService _pdfService;
        private readonly IHtmlService _htmlService;

        public GetDocumentationQueryHandler(IDocumentationService documentationService, IFileService fileService, IDicomService dicomService, DicomRepositories dal, IPdfService pdfService, IHtmlService htmlService)
        {
            _documentationService = documentationService;
            _fileService = fileService;
            _dicomService = dicomService;
            _dal = dal;
            _pdfService = pdfService;
            _htmlService = htmlService;
        }

        public async Task<GetDocumentationQueryResponse> Handle(GetDocumentationQuery request, CancellationToken cancellationToken)
        {
            var dicomQuery = _dal.DicomRepositoryAsync.GetQuerable();
            await dicomQuery.Select(x => x.Documentations).LoadAsync(cancellationToken);
            await dicomQuery.Select(x => x.Documentations.Select(y => y.DocumentationImages)).LoadAsync(cancellationToken: cancellationToken);

            var dicom = await dicomQuery.FirstOrDefaultAsync(x => x.Id == request.DicomId, cancellationToken: cancellationToken);

            var documentationImages = dicom.Documentations.OrderByDescending(x => x.CreatedAt).FirstOrDefault()?.DocumentationImages.Select(x => new DocumentationImageUrl
            {
                ViewUrl = $"https://localhost:5001/api/documentation/documentation-image?id={x.Id}&type=view",
                DrawUrl = $"https://localhost:5001/api/documentation/documentation-image?id={x.Id}&type=draw",
            });

            var tags = await _dicomService.GetMetaTags(dicom.Id);
            
            var template = _htmlService.GenerateHtml(documentationImages, tags);

           
            var pdf = await _pdfService.GeneratePdf(template);

            return new GetDocumentationQueryResponse()
            {
                FileContentResult = pdf
            };
        }
    }
}