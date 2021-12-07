using System.IO;

namespace Dicom.Application.Queries.Documentation.GetDocumentationImage
{
    public class GetDocumentationImageResponse
    {
        public MemoryStream File { get; set; }
        public string Path { get; set; }
    }
}