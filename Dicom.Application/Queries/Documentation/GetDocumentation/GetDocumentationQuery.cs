using System;
using MediatR;

namespace Dicom.Application.Queries.Documentation.GetDocumentation
{
    public class GetDocumentationQuery: IRequest<GetDocumentationQueryResponse>
    {
        public Guid DicomId { get; set; }
        
    }
}