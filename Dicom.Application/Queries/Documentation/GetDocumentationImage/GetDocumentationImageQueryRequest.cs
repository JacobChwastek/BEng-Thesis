using System;
using MediatR;

namespace Dicom.Application.Queries.Documentation.GetDocumentationImage
{
    public class GetDocumentationImageQueryRequest : IRequest<GetDocumentationImageResponse>
    {
        public Guid Id { get; set; }
        
        public string Type { get; set; }


        public void Deconstruct(out Guid id, out string type)
        {
            id = Id;
            type = Type;
        }
    }
}