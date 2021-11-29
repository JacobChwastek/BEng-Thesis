using System;
using MediatR;

namespace Dicom.Application.Commands.Dicom.RemoveDicom
{
    public class RemoveDicomCommandRequest :  IRequest
    {
        public Guid Id { get; set; }
    }
}