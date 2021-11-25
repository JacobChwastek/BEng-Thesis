using System.IO;
using System.Threading.Tasks;
using Dicom.Application.Commands.Documentation.Generate;
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
    }
}