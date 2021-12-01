using System;
using System.IO;
using System.Threading.Tasks;
using Dicom.Application.Commands.Documentation.Generate;
using Dicom.Application.Commands.Documentation.UploadDocumentationImages;
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

            await Mediator.Send(new UploadDocumentationImagesCommandRequest()
            {
                DicomId = request.DicomId,
                DrawLayerImgBase64 = request.DrawLayerImgBase64,
                ViewLayerImageBase64 = request.ViewLayerImageBase64
            });
            
            return Ok();
        }
    }
}