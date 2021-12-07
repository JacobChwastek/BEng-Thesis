using System;
using System.IO;
using System.Threading.Tasks;
using Dicom.Application.Commands.Documentation.Generate;
using Dicom.Application.Commands.Documentation.UploadDocumentationImages;
using Dicom.Application.Queries.Documentation.GetDocumentation;
using Dicom.Application.Queries.Documentation.GetDocumentationImage;
using Dicom.Domain.DTO.Documentation;
using Microsoft.AspNetCore.Mvc;

namespace Dicom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentationController : ApiController
    {
        [HttpPost("generate-pdf")]
        public async Task<IActionResult> GeneratePdf()
        {
            var file = await Mediator.Send(new GenerateDocumentationCommand());

            var ms = new MemoryStream(file.FileContentResult.FileContents);

            return new FileStreamResult(ms, System.Net.Mime.MediaTypeNames.Application.Pdf)
            {
                FileDownloadName = "Invoice.pdf"
            };
        }


        [HttpPost("upload-documentation-images")]
        public async Task<IActionResult> UploadDocumentationImages(UploadDocumentationImagesDto request)
        {
            if (request is null)
                return BadRequest();

            if (request.DicomId == Guid.Empty)
                return BadRequest();

            if (request.DrawLayerImgBase64 is null || request.ViewLayerImageBase64 is null)
                return BadRequest();

            if (request.DrawLayerImgBase64.Length == 0 || request.ViewLayerImageBase64.Length == 0)
                return BadRequest();

            var documentationId = await Mediator.Send(new UploadDocumentationImagesCommandRequest()
            {
                DocumentationId = request.DocumentationId,
                DicomId = request.DicomId,
                DrawLayerImgBase64 = request.DrawLayerImgBase64,
                ViewLayerImageBase64 = request.ViewLayerImageBase64
            });

            return Ok(documentationId);
        }

        [HttpGet("documentation-image")]
        public async Task<IActionResult> GetDocumentationImage([FromQuery] Guid id, [FromQuery] string type)
        {
            if (id == Guid.Empty || type.Length == 0)
                return NotFound();

            var result = await Mediator.Send(new GetDocumentationImageQueryRequest()
            {
                Id = id,
                Type = type
            });

            return File(result.File, "image/png", Path.GetFileName(result.Path));
        }

        [HttpGet]
        public async Task<IActionResult> GetDocumentation([FromQuery] Guid id)
        {

            if (id == Guid.Empty)
                return BadRequest();

            var file = await Mediator.Send(new GetDocumentationQuery()
            {
                DicomId = id,
            });

            var ms = new MemoryStream(file.FileContentResult.FileContents);
            
            const string mimeType = "application/pdf";
            return new FileStreamResult(ms, mimeType)
            {
                FileDownloadName = "FileasStream.pdf"
            };
        }
    }
}