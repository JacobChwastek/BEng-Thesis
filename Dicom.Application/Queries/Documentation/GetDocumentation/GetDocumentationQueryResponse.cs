using Microsoft.AspNetCore.Mvc;

namespace Dicom.Application.Queries.Documentation.GetDocumentation
{
    public class GetDocumentationQueryResponse
    {
        public FileContentResult FileContentResult { get; set; }
    }
}