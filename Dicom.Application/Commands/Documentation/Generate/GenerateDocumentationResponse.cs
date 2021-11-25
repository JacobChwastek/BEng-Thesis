using Microsoft.AspNetCore.Mvc;

namespace Dicom.Application.Commands.Documentation.Generate
{
    public class GenerateDocumentationResponse
    {
        public FileContentResult FileContentResult { get; set; }
    }
}